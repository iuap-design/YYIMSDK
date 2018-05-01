import { YYIMConnection } from '../connection/YYIMConnection';
import { YYIMConsoleLogger } from '../util/YYIMConsoleLogger';
import { YYIMJIDUtil } from '../util/YYIMJIDUtil';
import { YYIMConfiguration, ConfigSetting } from '../config/config';
import { 
	CONNECT_STATUS,
	FAVORITE_TYPE,
	STATUS,
	TYPE,
	PRESENCE_TYPE,
	COLLECT_TYPE,
	CHAT_TYPE,
	MESSAGE_CONTENT_TYPE
} from '../config/constant';

class YYIMManager {
	constructor(){
		this._user;
		this._token = {};
		this.appkey;
		this.connectStatus = CONNECT_STATUS.INIT;
		this.offlineStatus = [CONNECT_STATUS.ERROR,
			CONNECT_STATUS.OFFLINE,
			CONNECT_STATUS.CONFLICT,
			CONNECT_STATUS.AUTHERROR,
			CONNECT_STATUS.ONCLIENTKICKOUT,
			CONNECT_STATUS.INIT,
			CONNECT_STATUS.ONUPDATEPASSWORD];

		this.onlineStatus = [CONNECT_STATUS.CONNECTED,
			CONNECT_STATUS.PROCESSING];

		// 定义AI Key变量 yaoleib20171212
		this.apiKey;
		this.init();
	}
	log(groupname, level, obj1, obj2){
		this._logger = this._logger || new YYIMConsoleLogger(YYIMConfiguration.LOG.FILTER_LEVEL);
		this._logger.log(groupname, level, obj1, obj2);
	}
	/**
	 * [INIT] 初始化，回调方法的设置
	 * @param options
	 */
	init(options){
		options = options || {};

		//系统回调
		this.onConnectStatusChanged = (status) => {
			this.connectStatus = status || this.connectStatus;
			this.log('connectStatus: ', 3, this.connectStatus);
		};

		this.onClosed = (arg) => {
			this.onConnectStatusChanged(CONNECT_STATUS.OFFLINE);
			options.onClosed && options.onClosed(arg);
		};

		this.onAuthError = (arg) => {
			this.onConnectStatusChanged(CONNECT_STATUS.AUTHERROR);
			options.onAuthError && options.onAuthError(arg);
		};

		this.onStatusChanged = (status) => {
			if(YYIMCommonUtil.isStringAndNotEmpty(status)) {
				this.onConnectStatusChanged(status);
			}
		};

		this.onOpened = (arg) => {
			this.onConnectStatusChanged(CONNECT_STATUS.CONNECTED);
			this.getTimeCorrection && this.getTimeCorrection();
			options.onOpened && options.onOpened(arg);
		};

		//rongqb 20170227
		this.onUpdatePassword = (arg) => {
			this.disConnect(CONNECT_STATUS.ONUPDATEPASSWORD);
			options.onUpdatePassword && options.onUpdatePassword(arg);
		};

		//rongqb 20170227
		this.onClientKickout = (arg) =>{
			this.disConnect(CONNECT_STATUS.ONCLIENTKICKOUT);
			options.onClientKickout && options.onClientKickout(arg);
		};

		this.onConflicted = (arg) => {
			this.disConnect(CONNECT_STATUS.CONFLICT);
			options.onConflicted && options.onConflicted(arg);
		};

		this.onConnectError = (arg) => {
			if(this.connectStatus == CONNECT_STATUS.OFFLINE
			|| this.connectStatus == CONNECT_STATUS.INIT
			|| this.connectStatus == CONNECT_STATUS.CONFLICT
			|| this.connectStatus == CONNECT_STATUS.AUTHERROR
			|| this.connectStatus == CONNECT_STATUS.ONCLIENTKICKOUT
			|| this.connectStatus == CONNECT_STATUS.ONUPDATEPASSWORD){
				if(this.ConnectErrorTimer){
					clearInterval(this.ConnectErrorTimer);
					this.ConnectErrorTimer = null;
				}
			}else{
				this.onConnectStatusChanged(CONNECT_STATUS.ERROR);
				if(!this.ConnectErrorTimer){
					this.ConnectErrorTimer = setInterval(() => {
						if(this.connectStatus == CONNECT_STATUS.CONNECTED 
						|| this.connectStatus == CONNECT_STATUS.PROCESSING
						|| this.connectStatus == CONNECT_STATUS.OFFLINE
						|| this.connectStatus == CONNECT_STATUS.INIT) {
							clearInterval(this.ConnectErrorTimer);
							this.ConnectErrorTimer = null;
						} else if(this.connectStatus == CONNECT_STATUS.ERROR) {
							this.log('连接出现异常，正在尝试重连！', 3, arg);
							this.connect();
							this.onConnectStatusChanged(CONNECT_STATUS.CONNECTING);
						}
					}, 500);
				}
				options.onConnectError && options.onConnectError(arg);
			}
		};

		this.onUserBind = options.onUserBind || function(){};

		//token即将过期 通过此获取有效的 token
		this.onExpiration = options.onExpiration;

		//注册各模块回调处理函数
		this.exeBackhander('initCallback',options);

		(() => {
			jQuery(window).on({
				'unload offline': () => {
					if(this.connectStatus != CONNECT_STATUS.INIT){
						this.disConnect();
					}
				},
				'online': () => {
					if(this.connectStatus != CONNECT_STATUS.INIT
					&& this.connectStatus != CONNECT_STATUS.CONFLICT
					&& this.connectStatus != CONNECT_STATUS.AUTHERROR
					&& this.connectStatus != CONNECT_STATUS.ONCLIENTKICKOUT
					&& this.connectStatus != CONNECT_STATUS.ONUPDATEPASSWORD){
						this.connect();
					}
				}
			});
		})();

		/**
		 * 接口状态批处理
		 * rongqb 20170808
		 */
		jQuery.ajaxSetup({
			statusCode: {
				401: () => {
					//token Expirationed
					options.onExpirationed && options.onExpirationed();
				}
			}
		});
	}
	/**
	 * [INIT] 设置多租户参数, 非多租户环境可不设置
	 * arg {
	 * 	app: String, //必须
	 *  etp: String, //必须
	 * 	wsurl: String,
	 *  wsport: String,
	 *  hbport: String,
	 *  servlet: String,
	 *  logEnable: Boolean,
	 *  clientMark: clientMark
	 * }
	 */
	initSDK(options){
		ConfigSetting.init(options);
		let conf = YYIMConfiguration.MULTI_TENANCY;
		this.appkey = conf.SEPARATOR + conf.APP_KEY + conf.SEPARATOR + conf.ETP_KEY;
		// 存储AI Key yaoleib20171212
		this.apiKey = options.apiKey;
	}
	logEnable(logEnable){
		if(YYIMUtil['isWhateType'](logEnable, 'Boolean')) {
			YYIMConfiguration.LOG.ENABLE = logEnable;
		}else{
			YYIMConfiguration.LOG.ENABLE = !YYIMConfiguration.LOG.ENABLE;
		}
	}
	getTenancy(){
		return YYIMConfiguration.MULTI_TENANCY;
	}
	/**
	 * 获取appKey 
	 * @returns '.app.etp'
	 */
	getAppkey(){
		return this.appkey;
	}
	/**
	 * 获取apiKey yaoleib20171212
	 * @returns '85de79b9f7e34c37a99accaddb256990'
	 */
	getApiKey(){
		return this.apiKey;
	}
	isOnline(){
		if(this.onlineStatus.indexOf(this.connectStatus) > -1){
			return true;
		}
		return false;
	}
	/**
	 * 主动断开连接
	 */
	disConnect(status){
		if(this.getExpirationTimer){
			clearInterval(this.getExpirationTimer);
			this.getExpirationTimer = 0;
		}
		
		YYIMConnection.getInstance().disconnect();
		
		this.onConnectStatusChanged(status || CONNECT_STATUS.OFFLINE);
	}
	/**
	 * 根据之前的连接参数进行连接
	 */
	connect(){
		if(!this.isOnline()){
			YYIMConnection.getInstance().connect();
		}
	}
	/**
	 * 获取当前用户的Token
	 * @returns
	 */
	getToken(){
		try{
			if(this.getExpiration() && YYIMUtil['isWhateType'](this.onExpiration,'Function')){
				if((this.getExpiration() - this.getServerNow()) <= YYIMConfiguration.EXPIRATION.INVALID){
					this.onExpiration((token,expiration) => {
						if(token){
							this._token.token = token;
						}
						if(expiration){
							this._token.expiration = expiration;
						}
					});
				}
			}
		}catch(e){
			this.log('Token winll Invalid. Auto Get Token Error.', 0);
		}
		return this._token.token;
	}
	/**
	 * 获取当前用户的token过期时间
	 * @returns
	 */
	getExpiration(){
		return this._token.expiration;
	}
	/**
	 * 登录
	 * @param name
	 * @param password
	 */
	login(options){
		options = options || {};
		this._token = {
			token: options.token,
			expiration: options.expiration
		};
		if(options.username && options.token){
			if(!this.isOnline()){
				YYIMConnection.getInstance().connect({
					username: YYIMJIDUtil.getNode(options.username), 
					token: options.token, 
					appType: options.appType, 
					identify: options.identify
				});
			}
			if(YYIMUtil['isWhateType'](this.onExpiration,'Function')){
				if(!this.getExpirationTimer){
					this.getExpirationTimer = setInterval(() => {
						this.getToken();
					},YYIMConfiguration.EXPIRATION.INSPECTION_INTERVAL);
				}
			}
		}else{
			this.log((!options.username? 'Username ':'') + (!options.token? 'Token ':'') + ' Illegal.', 0);	
		}
	}
	/**
	 * 获取 sdk 当前的连接状态
	 */
	getConnectStatus(){
		return this.connectStatus;
	}
	/**
	 * 退出登录, 仅负责断开连接
	 */
	logout(){
		this.disConnect.apply(this,arguments);
		this.onConnectStatusChanged(CONNECT_STATUS.INIT);
	}
	/**
	 * 获取当前登录用户的bareJid
	 */
	getUserBareJID(){
		return this._user.jid.getBareJID();
	}
	/**
	 * 获取当前登录用户的全jid
	 */
	getUserFullJID(){
		return this._user.jid.toString();
	}
	/**
	 * 获取当前用户登录的node
	 */
	getUserNode(){
		return YYIMJIDUtil.getNode(this.getUserBareJID());
	}
	/**
	 * 获取当前登录用户的id
	 */
	getUserID(){
		return YYIMJIDUtil.getID(this.getUserBareJID());
	}
	/**
	 * 获取当前的resource rongqb20151206
	 */
	getResource(){
		return YYIMConfiguration.RESOURCE;
	}
	// get config
	getServerName(){
		return YYIMConfiguration.CONNECTION.SERVER_NAME;
	}
	getServletPath(){
		return YYIMConfiguration.SERVLET;
	}
	getJIDUtil(){
		return YYIMJIDUtil;
	}
	getServerNow(){
		return YYIMConfiguration.TIMECORRECTION.AUTOCORRECTION? (new Date().getTime() + YYIMManager.getInstance().getConfig().TIMECORRECTION.RESULT): new Date().getTime();
	}
	getBrowser(){
		return YYIMConfiguration.BROWSER;
	}
	/**
	 * 获得sdk 的常量
	 * @returns {//...}
	 */
	getConstants(){
		return {
			FAVORITE_TYPE: FAVORITE_TYPE,
			STATUS: STATUS,
			TYPE: TYPE,
			PRESENCE_TYPE: PRESENCE_TYPE,
			COLLECT_TYPE: COLLECT_TYPE,
			CHAT_TYPE: CHAT_TYPE,
			MESSAGE_CONTENT_TYPE: MESSAGE_CONTENT_TYPE
		};
	}
	/**
	 * 获得sdk的配置信息
	 */
	getConfig(){
		return YYIMConfiguration;
	}
	getConnection(){
		return YYIMConnection.getInstance();
	}
	getJIDUtil(){
		return YYIMJIDUtil;
	}
	getUtil(){
		return YYIMUtil;
	}
	/**
	 * Extend 追加执行函数  rongqb 20161028
	 * @param {Object} arg {
	 * 	type: {
	 * 		key: backhander
	 *  }
	 * }
	 */
	setBackhander(arg){
		if(arg){
			this.backhanders = this.backhanders || {};
			for(var x in arg){
				this.backhanders[x] = this.backhanders[x] || {};
				window.jQuery.extend(this.backhanders[x],arg[x]);
			}
		}
	}
	/**
	 * 执行 Extend 追加函数   rongqb 20161028
	 * @param {Object} type
	 * }
	 */
	exeBackhander(type,options){
		this.backhanders = this.backhanders || {};
		if(type && this.backhanders[type]){
			for(var y in this.backhanders[type]){
				if(YYIMUtil['isWhateType'](this.backhanders[type][y],'Function')){
					try{
						this.backhanders[type][y](options || {});
					}catch(e){
						this.log('exeBackhander: ' + type + ' ' + y + ' Error.',0);
					}
				}
			}
		}
	}
}

/*
*获取YYIMManager的实例
*/
YYIMManager.getInstance = () => {
	if(!YYIMManager._instance) {
		YYIMManager._instance = new YYIMManager();
	}
	return YYIMManager._instance;
}

const YYIMChat = YYIMManager.getInstance();

export { YYIMManager, YYIMChat };