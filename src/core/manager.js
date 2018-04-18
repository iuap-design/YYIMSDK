function YYIMManager() {
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
};

YYIMManager.getInstance = function() {
	if(!YYIMManager._instance) {
		YYIMManager._instance = new YYIMManager();
	}
	return YYIMManager._instance;
};

YYIMManager.prototype.log = function(groupname, level, obj1, obj2) {
	this._logger = this._logger || new YYIMConsoleLogger(YYIMConfiguration.LOG.FILTER_LEVEL);
	this._logger.log(groupname, level, obj1, obj2);
};

/**
 * [INIT] 初始化，回调方法的设置
 * @param options
 */
YYIMManager.prototype.init = function(options) {
	var that = this;
	options = options || {};

	//系统回调
	this.onClosed = function(arg) {
		this.onConnectStatusChanged(CONNECT_STATUS.OFFLINE);
		options.onClosed && options.onClosed(arg);
	};

	this.onAuthError = function(arg){
		this.onConnectStatusChanged(CONNECT_STATUS.AUTHERROR);
		options.onAuthError && options.onAuthError(arg);
	};
	
	this.onStatusChanged = function(status) {
		if(YYIMCommonUtil.isStringAndNotEmpty(status)) {
			this.onConnectStatusChanged(status);
		}
	};
	
	this.onConnectStatusChanged = function(status) {
		this.connectStatus = status || this.connectStatus;
		this.log('connectStatus: ', 3, this.connectStatus);
	};
	
	this.onOpened = function(arg) {
		this.onConnectStatusChanged(CONNECT_STATUS.CONNECTED);
		this.getTimeCorrection && this.getTimeCorrection();
		options.onOpened && options.onOpened(arg);
	};
	
	//rongqb 20170227
	this.onUpdatePassword = function(arg){
		this.disConnect(CONNECT_STATUS.ONUPDATEPASSWORD);
		options.onUpdatePassword && options.onUpdatePassword(arg);
	};
	
	//rongqb 20170227
	this.onClientKickout = function(arg){
		this.disConnect(CONNECT_STATUS.ONCLIENTKICKOUT);
		options.onClientKickout && options.onClientKickout(arg);
	};
	
	this.onConflicted = function(arg){
		this.disConnect(CONNECT_STATUS.CONFLICT);
		options.onConflicted && options.onConflicted(arg);
	};
	
	this.onConnectError = function(arg) {
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
				this.ConnectErrorTimer = setInterval(function() {
					if(that.connectStatus == CONNECT_STATUS.CONNECTED 
					|| that.connectStatus == CONNECT_STATUS.PROCESSING
					|| that.connectStatus == CONNECT_STATUS.OFFLINE
					|| that.connectStatus == CONNECT_STATUS.INIT) {
						clearInterval(that.ConnectErrorTimer);
						that.ConnectErrorTimer = null;
					} else if(that.connectStatus == CONNECT_STATUS.ERROR) {
						that.log('连接出现异常，正在尝试重连！', 3, arg);
						that.connect();
						that.onConnectStatusChanged(CONNECT_STATUS.CONNECTING);
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
	
	(function() {
		jQuery(window).on({
			'unload offline': function() {
				if(that.connectStatus != CONNECT_STATUS.INIT){
					that.disConnect();
				}
			},
			'online': function() {
				if(that.connectStatus != CONNECT_STATUS.INIT
				&& that.connectStatus != CONNECT_STATUS.CONFLICT
				&& that.connectStatus != CONNECT_STATUS.AUTHERROR
				&& that.connectStatus != CONNECT_STATUS.ONCLIENTKICKOUT
				&& that.connectStatus != CONNECT_STATUS.ONUPDATEPASSWORD){
					that.connect();
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
			401: function(){
				//token Expirationed
				options.onExpirationed && options.onExpirationed();
			}
		}
	});
};

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
YYIMManager.prototype.initSDK = function(options) {
	ConfigSetting.init(options);
	var conf = YYIMConfiguration.MULTI_TENANCY;
	this.appkey = conf.SEPARATOR + conf.APP_KEY + conf.SEPARATOR + conf.ETP_KEY;
	// 存储AI Key yaoleib20171212
	this.apiKey = options.apiKey;
};

YYIMManager.prototype.logEnable = function(logEnable) {
	if(YYIMUtil['isWhateType'](logEnable, 'Boolean')) {
		YYIMConfiguration.LOG.ENABLE = logEnable;
	}else{
		YYIMConfiguration.LOG.ENABLE = !YYIMConfiguration.LOG.ENABLE;
	}
};

YYIMManager.prototype.getTenancy = function() {
	return YYIMConfiguration.MULTI_TENANCY;
};

/**
 * 获取appKey 
 * @returns '.app.etp'
 */
YYIMManager.prototype.getAppkey = function() {
	return this.appkey;
};

/**
 * 获取apiKey yaoleib20171212
 * @returns '85de79b9f7e34c37a99accaddb256990'
 */
YYIMManager.prototype.getApiKey = function() {
    return this.apiKey;
};

YYIMManager.prototype.isOnline = function() {
	if(this.onlineStatus.indexOf(this.connectStatus) > -1){
		return true;
	}
	return false;
};

/**
 * 主动断开连接
 */
YYIMManager.prototype.disConnect = function(status) {
	if(this.getExpirationTimer){
		clearInterval(this.getExpirationTimer);
		this.getExpirationTimer = 0;
	}
	
	YYIMConnection.getInstance().disconnect();
	
	this.onConnectStatusChanged(status || CONNECT_STATUS.OFFLINE);
};

/**
 * 根据之前的连接参数进行连接
 */
YYIMManager.prototype.connect = function() {
	if(!this.isOnline()){
		YYIMConnection.getInstance().connect();
	}
};

/**
 * 获取当前用户的Token
 * @returns
 */
YYIMManager.prototype.getToken = function() {
	try{
		if(this.getExpiration() && YYIMUtil['isWhateType'](this.onExpiration,'Function')){
			if((this.getExpiration() - this.getServerNow()) <= YYIMConfiguration.EXPIRATION.INVALID){
				var that = this;
				this.onExpiration(function(token,expiration){
					if(token){
						that._token.token = token;
					}
					if(expiration){
						that._token.expiration = expiration;
					}
				});
			}
		}
	}catch(e){
		this.log('Token winll Invalid. Auto Get Token Error.', 0);
	}
	return this._token.token;
};

/**
 * 获取当前用户的token过期时间
 * @returns
 */
YYIMManager.prototype.getExpiration = function() {
	return this._token.expiration;
};

/**
 * 登录
 * @param name
 * @param password
 */
YYIMManager.prototype.login = function(options) {
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
				var that = this;
				this.getExpirationTimer = setInterval(function(){
					that.getToken();
				},YYIMConfiguration.EXPIRATION.INSPECTION_INTERVAL);
			}
		}
	}else{
		this.log((!options.username? 'Username ':'') + (!options.token? 'Token ':'') + ' Illegal.', 0);	
	}
};

/**
 * 获取 sdk 当前的连接状态
 */
YYIMManager.prototype.getConnectStatus = function(){
	return this.connectStatus;
};

/**
 * 退出登录, 仅负责断开连接
 */
YYIMManager.prototype.logout = function() {
	this.disConnect.apply(this,arguments);
	this.onConnectStatusChanged(CONNECT_STATUS.INIT);
};

/**
 * 获取当前登录用户的bareJid
 */
YYIMManager.prototype.getUserBareJID = function() {
	return this._user.jid.getBareJID();
};

/**
 * 获取当前登录用户的全jid
 */
YYIMManager.prototype.getUserFullJID = function() {
	return this._user.jid.toString();
};

/**
 * 获取当前用户登录的node
 */
YYIMManager.prototype.getUserNode = function() {
	return YYIMJIDUtil.getNode(this.getUserBareJID());
};

/**
 * 获取当前登录用户的id
 */
YYIMManager.prototype.getUserID = function() {
	return YYIMJIDUtil.getID(this.getUserBareJID());
};

/**
 * 获取当前的resource rongqb20151206
 */
YYIMManager.prototype.getResource = function() {
	return YYIMConfiguration.RESOURCE;
};

// get config
YYIMManager.prototype.getServerName = function() {
	return YYIMConfiguration.CONNECTION.SERVER_NAME;
};

YYIMManager.prototype.getServletPath = function() {
	return YYIMConfiguration.SERVLET;
};

YYIMManager.prototype.getJIDUtil = function() {
	return YYIMJIDUtil;
};

YYIMManager.prototype.getServerNow = function() {
	return YYIMConfiguration.TIMECORRECTION.AUTOCORRECTION? (new Date().getTime() + YYIMChat.getConfig().TIMECORRECTION.RESULT): new Date().getTime();
};

YYIMManager.prototype.getBrowser = function() {
	return YYIMConfiguration.BROWSER;
};

/**
 * 获得sdk 的常量
 * @returns {//...}
 */
YYIMManager.prototype.getConstants = function() {
	return {
		FAVORITE_TYPE: FAVORITE_TYPE,
		STATUS: STATUS,
		TYPE: TYPE,
		PRESENCE_TYPE: PRESENCE_TYPE,
		COLLECT_TYPE: COLLECT_TYPE,
		CHAT_TYPE: CHAT_TYPE,
		MESSAGE_CONTENT_TYPE: MESSAGE_CONTENT_TYPE
	};
};

/**
 * 获得sdk的配置信息
 */
YYIMManager.prototype.getConfig = function() {
	return YYIMConfiguration;
};

YYIMManager.prototype.getConnection = function() {
	return YYIMConnection.getInstance();
};

YYIMManager.prototype.getJIDUtil = function() {
	return YYIMJIDUtil;
};

YYIMManager.prototype.getUtil = function() {
	return YYIMUtil;
};

/**
 * Extend 追加执行函数  rongqb 20161028
 * @param {Object} arg {
 * 	type: {
 * 		key: backhander
 *  }
 * }
 */
YYIMManager.prototype.setBackhander = function(arg) {
	if(arg){
		this.backhanders = this.backhanders || {};
		for(var x in arg){
			this.backhanders[x] = this.backhanders[x] || {};
			jQuery.extend(this.backhanders[x],arg[x]);
		}
	}
};

/**
 * 执行 Extend 追加函数   rongqb 20161028
 * @param {Object} type
 * }
 */
YYIMManager.prototype.exeBackhander = function(type,options) {
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
};