jQuery.support.cors = true; //ie浏览器跨域支持

var YYIMConfiguration;

var ConfigSetting = (function(){
	
	var YY_IM_DOMAIN = 'im.yyuap.com';
	var YY_IM_ADDRESS = 'stellar.yyuap.com'; //websocket url
	var YY_IM_WSPORT = 5227; 				 //websocket port
	var YY_IM_HTTPBIND_PORT = 7075;          //httpbind port
	var YY_IM_SERVLET_ADDRESS = 'http://im.yyuap.com/';
	var YY_IM_CLIENT_MARK = 'web';
	
	//for esn todo 20170831 
	var TODO_SERVLET_ADDRESS = 'https://pubaccount.yonyoucloud.com/';
	
	/**
	 * @param {Object} options {
	 *  app: String,
	 *  etp: String,
	 * 	wsurl: String,
	 * 	wsport: Number,
	 * 	wsport: Number,
	 * 	servlet: String,
	 *  logEnable: Boolean
	 * }
	 */
	function init(options){
		options = options || {};
		
		YY_IM_CLIENT_MARK = options.clientMark || YY_IM_CLIENT_MARK;
		YY_IM_ADDRESS = options.wsurl || YY_IM_ADDRESS;
		YY_IM_WSPORT = options.wsport || YY_IM_WSPORT;
		YY_IM_HTTPBIND_PORT = options.hbport || YY_IM_HTTPBIND_PORT;
		YY_IM_SERVLET_ADDRESS = options.servlet || YY_IM_SERVLET_ADDRESS;
		
		TODO_SERVLET_ADDRESS = options.todoServlet || TODO_SERVLET_ADDRESS;
		
		if(isMsielt10()){ // add for ie < 10 rongqb 20170412
			YY_IM_SERVLET_ADDRESS = YY_IM_SERVLET_ADDRESS.replace(/^https?:\/\//,location.protocol + '//');
		}
		
		if(/https/.test(location.protocol) || (options.useHttps === true)){//add for https location rongqb 20170412
			YY_IM_WSPORT = 5225;
		}
		
		YYIMConfiguration = {
			YY_IM_DOMAIN: YY_IM_DOMAIN, //固定
			
			RESOURCE: YY_IM_CLIENT_MARK + '-v2.6',
		
			MULTI_TENANCY: {
				ENABLE: true,
				ETP_KEY: options.etp || 'etp',
				APP_KEY: options.app || 'app',
				SEPARATOR: '.'
			},
		
			SENDINTERVAL: 30, //两次发送报文的时间间隔 rongqb 20151124
		
			GROUP: {
				MEMBERSLIMIT: 5 //默认最多拉取5个群成员
			},
			
			ROSTER: {
				BATCHVCRADMAXLIMIT: 50 //批量vcard 最大个数
			},
		
			INPUT_STATE: {
				INTERVAL: 2 * 1000
			},
		
			UPLOAD: {
				AUTO_SEND: true, //是否自动上传
				MULTI_SELECTION: false, //是否可以在文件浏览对话框中选择多个文件
				PREVENT_DUPLICATES: false, //是否重复上传
				PREVIEW_SIZE: { //预览图片的压缩尺寸
					WIDTH: 100,
					HEIGHT: 100
				},
				FLASH_SWF_URL: options.flash_swf_url || './Moxie.swf',
				SILVERLIGHT_XAP_URL: options.silverlight_xap_url || './Moxie.xap',
				MEDIATYPE: {
					IMAGE: 1,
					FILE: 2,
					DOC: 3
				},
				IMAGE_TYPES: /\.(png|jpe?g|gif)$/i
			},
		
			TIMECORRECTION: {
				AUTOCORRECTION: true, //自动时间校正
				TIMES: 3, //超出误差 校正次数
				RESIDUAL: 50, //校正误差
				RESULT: 0,
				LOAD: false //是否加载过此值
			},
		
			MULTIPARTYCALL: {
				ADDRESS: 'http://dudu.yonyoutelecom.cn/httpIntf/createConference.do', //多端通话接口地址 20160104
				ACCOUNT: '', //账号
				KEY: '', //密码
				PHONESMAXLENGTH: 200 //最大被叫字符数
			},
		
			SERVLET: {
				REST_RESOURCE_SERVLET: YY_IM_SERVLET_ADDRESS + 'sysadmin/rest/resource/',
				REST_VERSION_SERVLET: YY_IM_SERVLET_ADDRESS + 'sysadmin/rest/version/',
				REST_USER_SERVLET: YY_IM_SERVLET_ADDRESS + 'sysadmin/rest/user/',
				REST_UPLOAD_SERVLET: YY_IM_SERVLET_ADDRESS + 'im_upload/rest/resource/',
				REST_DOWNLOAD_SERVLET: YY_IM_SERVLET_ADDRESS + 'im_download/rest/resource/',
				REST_TRANSFORM_SERVLET: YY_IM_SERVLET_ADDRESS + 'im_download/rest/transform/resource/',
				REST_SYSTEM_SERVLET: YY_IM_SERVLET_ADDRESS + 'sysadmin/rest/system/',
				REST_SYSTEM_CUSTOMER_USER: YY_IM_SERVLET_ADDRESS + 'sysadmin/rest/customer/user/',
				
				REST_TODO_USER: TODO_SERVLET_ADDRESS + 'todocenter/user/todo/'
			},
		
			SUPPORT: {
				isWebSocketSupport: (function() {
					window.WebSocket = window.WebSocket || window.MozWebSocket;
					if(window.WebSocket) {
						return true;
					}
					return false;
				})()
			},
		
			CONNECTION: {
				TIMERVAL: 2000,
				WAIT: 300,
				SECURE: false,
				ALLOW_PLAIN: true,
				ENABLE_WEBSOCKET: true,
				ENABLE_LOCAL_CONNECTION: true,
				USE_HTTPS: (function(){
					if(/https/.test(location.protocol) || (options.useHttps === true)){
						return true;
					}
					return false;
				})(),
				SERVER_NAME: YY_IM_DOMAIN,
				HTTP_BASE: YY_IM_ADDRESS,
				HTTP_BIND_PORT: YY_IM_HTTPBIND_PORT,
				WS_PORT: YY_IM_WSPORT
			},
		
			PING: {
				/**
				 * 两个ping之间的间隔毫秒数(快节奏ping)
				 * @Type {Number}
				 */
				INTERVAL: 10 * 1000,
				
				/**
				 * 两个ping之间的间隔毫秒数（慢节奏ping）
				 * @Type {Number}
				 */
				SLOW_INTERVAL: 30 * 1000,
		
				/**
				 * 当指定的毫秒数内服务器没有回复报文，则认为已断开连接
				 *  @Type {Number}
				 */
				TIMEOUT: 10 * 1000
			},
		
			DOMAIN: {
				CHATROOM: 'conference.' + YY_IM_DOMAIN,
				SEARCH: 'search.' + YY_IM_DOMAIN,
				PUBACCOUNT: 'pubaccount.' + YY_IM_DOMAIN
			},
		
			EXPIRATION: {
				INVALID: 6 * 60 * 60 * 1000, //token失效的最小安全期
				INSPECTION_INTERVAL: 30 * 60 * 1000 //定时检测时长			
			},
		
			LOG: {
				ENABLE: !!options.logEnable,
				FILTER_LEVEL: 3
			},
		
			BROWSER: getBrowser()
		};
		
		YYIMConfiguration.getHttpBindUrl = function() {
			var prefix = this.CONNECTION.USE_HTTPS ? 'https://' : 'http://';
			return prefix + this.CONNECTION.HTTP_BASE + ':' + this.CONNECTION.HTTP_BIND_PORT + '/http-bind/';
		};
		
		YYIMConfiguration.getWebSocketUrl = function() {
			var prefix = this.CONNECTION.USE_HTTPS ? 'wss://' : 'ws://';
			return prefix + this.CONNECTION.HTTP_BASE + ':' + this.CONNECTION.WS_PORT;
		};
		
		YYIMConfiguration.useWebSocket = function() {
			return this.SUPPORT.isWebSocketSupport && this.CONNECTION.ENABLE_WEBSOCKET;
		};
		
		YYIMConfiguration.getConnectionArgObj = function() {
			return {
				domain: this.CONNECTION.SERVER_NAME,
				resource: this.RESOURCE,
				allow_plain: this.CONNECTION.ALLOW_PLAIN,
				secure: this.CONNECTION.SECURE,
				register: false
			};
		};
		
		YYIMConfiguration.getLocationOrigin = function(){
			return location.origin? location.origin: (location.protocol + '//'+ location.host);
		};
		
		YYIMConfiguration.getClientMark = getClientMark;
	}
	
	function getBrowser() {
		var userAgent = navigator.userAgent.toLowerCase();
		// Figure out what browser is being used 
		return {
			version: (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
			webkit: /webkit/.test(userAgent),
			opera: /opera/.test(userAgent),
			msie: /msie/.test(userAgent) && !/opera/.test(userAgent),
			mozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent)
		};
	}
	
	function isMsielt10(){
		var browser = getBrowser();
		if(browser.msie 
		&& parseInt(browser.version) < 10){
			return true;
		}
		return false;
	}
	
	function getClientMark(){
		return YY_IM_CLIENT_MARK;
	}
	
	return {
		init: init
	};
})();

ConfigSetting.init();
