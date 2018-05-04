/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.YYIMChat = exports.YYIMManager = undefined;

var _classCallCheck2 = __webpack_require__(2);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _YYIMConnection = __webpack_require__(8);

var _YYIMConsoleLogger = __webpack_require__(33);

var _YYIMJIDUtil = __webpack_require__(12);

var _config = __webpack_require__(4);

var _constant = __webpack_require__(13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var YYIMManager = function () {
	function YYIMManager() {
		(0, _classCallCheck3.default)(this, YYIMManager);

		this._user;
		this._token = {};
		this.appkey;
		this.connectStatus = _constant.CONNECT_STATUS.INIT;
		this.offlineStatus = [_constant.CONNECT_STATUS.ERROR, _constant.CONNECT_STATUS.OFFLINE, _constant.CONNECT_STATUS.CONFLICT, _constant.CONNECT_STATUS.AUTHERROR, _constant.CONNECT_STATUS.ONCLIENTKICKOUT, _constant.CONNECT_STATUS.INIT, _constant.CONNECT_STATUS.ONUPDATEPASSWORD];

		this.onlineStatus = [_constant.CONNECT_STATUS.CONNECTED, _constant.CONNECT_STATUS.PROCESSING];

		this.apiKey;
		this.init();
	}

	(0, _createClass3.default)(YYIMManager, [{
		key: 'log',
		value: function log(groupname, level, obj1, obj2) {
			this._logger = this._logger || new _YYIMConsoleLogger.YYIMConsoleLogger(_config.YYIMConfiguration.LOG.FILTER_LEVEL);
			this._logger.log(groupname, level, obj1, obj2);
		}
	}, {
		key: 'init',
		value: function init(options) {
			var _this = this;

			options = options || {};

			this.onConnectStatusChanged = function (status) {
				_this.connectStatus = status || _this.connectStatus;
				_this.log('connectStatus: ', 3, _this.connectStatus);
			};

			this.onClosed = function (arg) {
				_this.onConnectStatusChanged(_constant.CONNECT_STATUS.OFFLINE);
				options.onClosed && options.onClosed(arg);
			};

			this.onAuthError = function (arg) {
				_this.onConnectStatusChanged(_constant.CONNECT_STATUS.AUTHERROR);
				options.onAuthError && options.onAuthError(arg);
			};

			this.onStatusChanged = function (status) {
				if (YYIMCommonUtil.isStringAndNotEmpty(status)) {
					_this.onConnectStatusChanged(status);
				}
			};

			this.onOpened = function (arg) {
				_this.onConnectStatusChanged(_constant.CONNECT_STATUS.CONNECTED);
				_this.getTimeCorrection && _this.getTimeCorrection();
				options.onOpened && options.onOpened(arg);
			};

			this.onUpdatePassword = function (arg) {
				_this.disConnect(_constant.CONNECT_STATUS.ONUPDATEPASSWORD);
				options.onUpdatePassword && options.onUpdatePassword(arg);
			};

			this.onClientKickout = function (arg) {
				_this.disConnect(_constant.CONNECT_STATUS.ONCLIENTKICKOUT);
				options.onClientKickout && options.onClientKickout(arg);
			};

			this.onConflicted = function (arg) {
				_this.disConnect(_constant.CONNECT_STATUS.CONFLICT);
				options.onConflicted && options.onConflicted(arg);
			};

			this.onConnectError = function (arg) {
				if (_this.connectStatus == _constant.CONNECT_STATUS.OFFLINE || _this.connectStatus == _constant.CONNECT_STATUS.INIT || _this.connectStatus == _constant.CONNECT_STATUS.CONFLICT || _this.connectStatus == _constant.CONNECT_STATUS.AUTHERROR || _this.connectStatus == _constant.CONNECT_STATUS.ONCLIENTKICKOUT || _this.connectStatus == _constant.CONNECT_STATUS.ONUPDATEPASSWORD) {
					if (_this.ConnectErrorTimer) {
						clearInterval(_this.ConnectErrorTimer);
						_this.ConnectErrorTimer = null;
					}
				} else {
					_this.onConnectStatusChanged(_constant.CONNECT_STATUS.ERROR);
					if (!_this.ConnectErrorTimer) {
						_this.ConnectErrorTimer = setInterval(function () {
							if (_this.connectStatus == _constant.CONNECT_STATUS.CONNECTED || _this.connectStatus == _constant.CONNECT_STATUS.PROCESSING || _this.connectStatus == _constant.CONNECT_STATUS.OFFLINE || _this.connectStatus == _constant.CONNECT_STATUS.INIT) {
								clearInterval(_this.ConnectErrorTimer);
								_this.ConnectErrorTimer = null;
							} else if (_this.connectStatus == _constant.CONNECT_STATUS.ERROR) {
								_this.log('连接出现异常，正在尝试重连！', 3, arg);
								_this.connect();
								_this.onConnectStatusChanged(_constant.CONNECT_STATUS.CONNECTING);
							}
						}, 500);
					}
					options.onConnectError && options.onConnectError(arg);
				}
			};

			this.onUserBind = options.onUserBind || function () {};

			this.onExpiration = options.onExpiration;

			this.exeBackhander('initCallback', options);

			(function () {
				jQuery(window).on({
					'unload offline': function unloadOffline() {
						if (_this.connectStatus != _constant.CONNECT_STATUS.INIT) {
							_this.disConnect();
						}
					},
					'online': function online() {
						if (_this.connectStatus != _constant.CONNECT_STATUS.INIT && _this.connectStatus != _constant.CONNECT_STATUS.CONFLICT && _this.connectStatus != _constant.CONNECT_STATUS.AUTHERROR && _this.connectStatus != _constant.CONNECT_STATUS.ONCLIENTKICKOUT && _this.connectStatus != _constant.CONNECT_STATUS.ONUPDATEPASSWORD) {
							_this.connect();
						}
					}
				});
			})();

			jQuery.ajaxSetup({
				statusCode: {
					401: function _() {
						options.onExpirationed && options.onExpirationed();
					}
				}
			});
		}
	}, {
		key: 'initSDK',
		value: function initSDK(options) {
			_config.ConfigSetting.init(options);
			var conf = _config.YYIMConfiguration.MULTI_TENANCY;
			this.appkey = conf.SEPARATOR + conf.APP_KEY + conf.SEPARATOR + conf.ETP_KEY;

			this.apiKey = options.apiKey;
		}
	}, {
		key: 'logEnable',
		value: function logEnable(_logEnable) {
			if (YYIMUtil['isWhateType'](_logEnable, 'Boolean')) {
				_config.YYIMConfiguration.LOG.ENABLE = _logEnable;
			} else {
				_config.YYIMConfiguration.LOG.ENABLE = !_config.YYIMConfiguration.LOG.ENABLE;
			}
		}
	}, {
		key: 'getTenancy',
		value: function getTenancy() {
			return _config.YYIMConfiguration.MULTI_TENANCY;
		}
	}, {
		key: 'getAppkey',
		value: function getAppkey() {
			return this.appkey;
		}
	}, {
		key: 'getApiKey',
		value: function getApiKey() {
			return this.apiKey;
		}
	}, {
		key: 'isOnline',
		value: function isOnline() {
			if (this.onlineStatus.indexOf(this.connectStatus) > -1) {
				return true;
			}
			return false;
		}
	}, {
		key: 'disConnect',
		value: function disConnect(status) {
			if (this.getExpirationTimer) {
				clearInterval(this.getExpirationTimer);
				this.getExpirationTimer = 0;
			}

			_YYIMConnection.YYIMConnection.getInstance().disconnect();

			this.onConnectStatusChanged(status || _constant.CONNECT_STATUS.OFFLINE);
		}
	}, {
		key: 'connect',
		value: function connect() {
			if (!this.isOnline()) {
				_YYIMConnection.YYIMConnection.getInstance().connect();
			}
		}
	}, {
		key: 'getToken',
		value: function getToken() {
			var _this2 = this;

			try {
				if (this.getExpiration() && YYIMUtil['isWhateType'](this.onExpiration, 'Function')) {
					if (this.getExpiration() - this.getServerNow() <= _config.YYIMConfiguration.EXPIRATION.INVALID) {
						this.onExpiration(function (token, expiration) {
							if (token) {
								_this2._token.token = token;
							}
							if (expiration) {
								_this2._token.expiration = expiration;
							}
						});
					}
				}
			} catch (e) {
				this.log('Token winll Invalid. Auto Get Token Error.', 0);
			}
			return this._token.token;
		}
	}, {
		key: 'getExpiration',
		value: function getExpiration() {
			return this._token.expiration;
		}
	}, {
		key: 'login',
		value: function login(options) {
			var _this3 = this;

			options = options || {};
			this._token = {
				token: options.token,
				expiration: options.expiration
			};
			if (options.username && options.token) {
				if (!this.isOnline()) {
					_YYIMConnection.YYIMConnection.getInstance().connect({
						username: _YYIMJIDUtil.YYIMJIDUtil.getNode(options.username),
						token: options.token,
						appType: options.appType,
						identify: options.identify
					});
				}
				if (YYIMUtil['isWhateType'](this.onExpiration, 'Function')) {
					if (!this.getExpirationTimer) {
						this.getExpirationTimer = setInterval(function () {
							_this3.getToken();
						}, _config.YYIMConfiguration.EXPIRATION.INSPECTION_INTERVAL);
					}
				}
			} else {
				this.log((!options.username ? 'Username ' : '') + (!options.token ? 'Token ' : '') + ' Illegal.', 0);
			}
		}
	}, {
		key: 'getConnectStatus',
		value: function getConnectStatus() {
			return this.connectStatus;
		}
	}, {
		key: 'logout',
		value: function logout() {
			this.disConnect.apply(this, arguments);
			this.onConnectStatusChanged(_constant.CONNECT_STATUS.INIT);
		}
	}, {
		key: 'getUserBareJID',
		value: function getUserBareJID() {
			return this._user.jid.getBareJID();
		}
	}, {
		key: 'getUserFullJID',
		value: function getUserFullJID() {
			return this._user.jid.toString();
		}
	}, {
		key: 'getUserNode',
		value: function getUserNode() {
			return _YYIMJIDUtil.YYIMJIDUtil.getNode(this.getUserBareJID());
		}
	}, {
		key: 'getUserID',
		value: function getUserID() {
			return _YYIMJIDUtil.YYIMJIDUtil.getID(this.getUserBareJID());
		}
	}, {
		key: 'getResource',
		value: function getResource() {
			return _config.YYIMConfiguration.RESOURCE;
		}
	}, {
		key: 'getServerName',
		value: function getServerName() {
			return _config.YYIMConfiguration.CONNECTION.SERVER_NAME;
		}
	}, {
		key: 'getServletPath',
		value: function getServletPath() {
			return _config.YYIMConfiguration.SERVLET;
		}
	}, {
		key: 'getJIDUtil',
		value: function getJIDUtil() {
			return _YYIMJIDUtil.YYIMJIDUtil;
		}
	}, {
		key: 'getServerNow',
		value: function getServerNow() {
			return _config.YYIMConfiguration.TIMECORRECTION.AUTOCORRECTION ? new Date().getTime() + YYIMManager.getInstance().getConfig().TIMECORRECTION.RESULT : new Date().getTime();
		}
	}, {
		key: 'getBrowser',
		value: function getBrowser() {
			return _config.YYIMConfiguration.BROWSER;
		}
	}, {
		key: 'getConstants',
		value: function getConstants() {
			return {
				FAVORITE_TYPE: _constant.FAVORITE_TYPE,
				STATUS: _constant.STATUS,
				TYPE: _constant.TYPE,
				PRESENCE_TYPE: _constant.PRESENCE_TYPE,
				COLLECT_TYPE: _constant.COLLECT_TYPE,
				CHAT_TYPE: _constant.CHAT_TYPE,
				MESSAGE_CONTENT_TYPE: _constant.MESSAGE_CONTENT_TYPE
			};
		}
	}, {
		key: 'getConfig',
		value: function getConfig() {
			return _config.YYIMConfiguration;
		}
	}, {
		key: 'getConnection',
		value: function getConnection() {
			return _YYIMConnection.YYIMConnection.getInstance();
		}
	}, {
		key: 'getJIDUtil',
		value: function getJIDUtil() {
			return _YYIMJIDUtil.YYIMJIDUtil;
		}
	}, {
		key: 'getUtil',
		value: function getUtil() {
			return YYIMUtil;
		}
	}, {
		key: 'setBackhander',
		value: function setBackhander(arg) {
			if (arg) {
				this.backhanders = this.backhanders || {};
				for (var x in arg) {
					this.backhanders[x] = this.backhanders[x] || {};
					window.jQuery.extend(this.backhanders[x], arg[x]);
				}
			}
		}
	}, {
		key: 'exeBackhander',
		value: function exeBackhander(type, options) {
			this.backhanders = this.backhanders || {};
			if (type && this.backhanders[type]) {
				for (var y in this.backhanders[type]) {
					if (YYIMUtil['isWhateType'](this.backhanders[type][y], 'Function')) {
						try {
							this.backhanders[type][y](options || {});
						} catch (e) {
							this.log('exeBackhander: ' + type + ' ' + y + ' Error.', 0);
						}
					}
				}
			}
		}
	}]);
	return YYIMManager;
}();

YYIMManager.getInstance = function () {
	if (!YYIMManager._instance) {
		YYIMManager._instance = new YYIMManager();
	}
	return YYIMManager._instance;
};

var YYIMChat = YYIMManager.getInstance();

exports.YYIMManager = YYIMManager;
exports.YYIMChat = YYIMChat;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(36), __esModule: true };

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(18);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
jQuery.support.cors = true;

var YYIMConfiguration = {};

var ConfigSetting = function () {

	var YY_IM_DOMAIN = 'im.yyuap.com';
	var YY_IM_ADDRESS = 'stellar.yyuap.com';
	var YY_IM_WSPORT = 5227;
	var YY_IM_HTTPBIND_PORT = 7075;
	var YY_IM_SERVLET_ADDRESS = 'http://im.yyuap.com/';
	var YY_IM_CLIENT_MARK = 'web';

	var TODO_SERVLET_ADDRESS = 'https://pubaccount.yonyoucloud.com/';

	var init = function init(options) {
		options = options || {};

		YY_IM_CLIENT_MARK = options.clientMark || YY_IM_CLIENT_MARK;
		YY_IM_ADDRESS = options.wsurl || YY_IM_ADDRESS;
		YY_IM_WSPORT = options.wsport || YY_IM_WSPORT;
		YY_IM_HTTPBIND_PORT = options.hbport || YY_IM_HTTPBIND_PORT;
		YY_IM_SERVLET_ADDRESS = options.servlet || YY_IM_SERVLET_ADDRESS;

		TODO_SERVLET_ADDRESS = options.todoServlet || TODO_SERVLET_ADDRESS;

		var getBrowser = function getBrowser() {
			var userAgent = navigator.userAgent.toLowerCase();

			return {
				version: (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
				webkit: /webkit/.test(userAgent),
				opera: /opera/.test(userAgent),
				msie: /msie/.test(userAgent) && !/opera/.test(userAgent),
				mozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent)
			};
		};

		var isMsielt10 = function isMsielt10() {
			var browser = getBrowser();
			if (browser.msie && window.parseInt(browser.version) < 10) {
				return true;
			}
			return false;
		};

		var getClientMark = function getClientMark() {
			return YY_IM_CLIENT_MARK;
		};

		if (isMsielt10()) {
			YY_IM_SERVLET_ADDRESS = YY_IM_SERVLET_ADDRESS.replace(/^https?:\/\//, window.location.protocol + '//');
		}

		if (/https/.test(window.location.protocol) || options.useHttps === true) {
			YY_IM_WSPORT = 5225;
		}

		exports.YYIMConfiguration = YYIMConfiguration = {
			YY_IM_DOMAIN: YY_IM_DOMAIN,

			RESOURCE: YY_IM_CLIENT_MARK + '-v2.6',

			MULTI_TENANCY: {
				ENABLE: true,
				ETP_KEY: options.etp || 'etp',
				APP_KEY: options.app || 'app',
				SEPARATOR: '.'
			},

			SENDINTERVAL: 30,

			GROUP: {
				MEMBERSLIMIT: 5 },

			BETCH_MAXLIMIT: {
				ROSTER: 50,
				PUBACCOUNT: 50
			},

			INPUT_STATE: {
				INTERVAL: 2 * 1000
			},

			UPLOAD: {
				AUTO_SEND: true,
				MULTI_SELECTION: false,
				PREVENT_DUPLICATES: false,
				PREVIEW_SIZE: {
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
				AUTOCORRECTION: true,
				TIMES: 3,
				RESIDUAL: 50,
				RESULT: 0,
				LOAD: false },

			MULTIPARTYCALL: {
				ADDRESS: 'http://dudu.yonyoutelecom.cn/httpIntf/createConference.do',
				ACCOUNT: '',
				KEY: '',
				PHONESMAXLENGTH: 200 },

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
				isWebSocketSupport: function () {
					window.WebSocket = window.WebSocket || window.MozWebSocket;
					if (window.WebSocket) {
						return true;
					}
					return false;
				}()
			},

			CONNECTION: {
				TIMERVAL: 2000,
				WAIT: 300,
				SECURE: false,
				ALLOW_PLAIN: true,
				ENABLE_WEBSOCKET: true,
				ENABLE_LOCAL_CONNECTION: true,
				USE_HTTPS: function () {
					if (/https/.test(window.location.protocol) || options.useHttps === true) {
						return true;
					}
					return false;
				}(),
				SERVER_NAME: YY_IM_DOMAIN,
				HTTP_BASE: YY_IM_ADDRESS,
				HTTP_BIND_PORT: YY_IM_HTTPBIND_PORT,
				WS_PORT: YY_IM_WSPORT
			},

			PING: {
				INTERVAL: 10 * 1000,

				SLOW_INTERVAL: 30 * 1000,

				TIMEOUT: 10 * 1000
			},

			DOMAIN: {
				CHATROOM: 'conference.' + YY_IM_DOMAIN,
				SEARCH: 'search.' + YY_IM_DOMAIN,
				PUBACCOUNT: 'pubaccount.' + YY_IM_DOMAIN
			},

			EXPIRATION: {
				INVALID: 6 * 60 * 60 * 1000,
				INSPECTION_INTERVAL: 30 * 60 * 1000 },

			LOG: {
				ENABLE: !!options.logEnable,
				FILTER_LEVEL: 3
			},

			BROWSER: getBrowser()
		};

		YYIMConfiguration.getHttpBindUrl = function () {
			var prefix = YYIMConfiguration.CONNECTION.USE_HTTPS ? 'https://' : 'http://';
			return prefix + YYIMConfiguration.CONNECTION.HTTP_BASE + ':' + YYIMConfiguration.CONNECTION.HTTP_BIND_PORT + '/http-bind/';
		};

		YYIMConfiguration.getWebSocketUrl = function () {
			var prefix = YYIMConfiguration.CONNECTION.USE_HTTPS ? 'wss://' : 'ws://';
			return prefix + YYIMConfiguration.CONNECTION.HTTP_BASE + ':' + YYIMConfiguration.CONNECTION.WS_PORT;
		};

		YYIMConfiguration.useWebSocket = function () {
			return YYIMConfiguration.SUPPORT.isWebSocketSupport && YYIMConfiguration.CONNECTION.ENABLE_WEBSOCKET;
		};

		YYIMConfiguration.getConnectionArgObj = function () {
			return {
				domain: YYIMConfiguration.CONNECTION.SERVER_NAME,
				resource: YYIMConfiguration.RESOURCE,
				allow_plain: YYIMConfiguration.CONNECTION.ALLOW_PLAIN,
				secure: YYIMConfiguration.CONNECTION.SECURE,
				register: false
			};
		};

		YYIMConfiguration.getLocationOrigin = function () {
			return window.location.origin ? window.location.origin : window.location.protocol + '//' + window.location.host;
		};

		YYIMConfiguration.getClientMark = getClientMark;
	};

	return { init: init };
}();

ConfigSetting.init();

exports.YYIMConfiguration = YYIMConfiguration;
exports.ConfigSetting = ConfigSetting;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(11)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 6 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.YYIMConnection = undefined;

var _classCallCheck2 = __webpack_require__(2);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _config = __webpack_require__(4);

var _YYIMJIDUtil = __webpack_require__(12);

var _manager = __webpack_require__(0);

var _YYIMConnectDaemon = __webpack_require__(31);

var _YYIMConnectEventHandler = __webpack_require__(32);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var YYIMConnection = function () {
	function YYIMConnection() {
		(0, _classCallCheck3.default)(this, YYIMConnection);

		this.daemon = new _YYIMConnectDaemon.YYIMConnectDaemon();
		this.eventHandler = new _YYIMConnectEventHandler.YYIMConnectEventHandler();
		this.connection = this.getConnection();
		this.connectArg;
		this.waitingList = [];
		this.sending = false;
		this.lastSendTime = 0;
	}

	(0, _createClass3.default)(YYIMConnection, [{
		key: 'getDaemon',
		value: function getDaemon() {
			return this.daemon;
		}
	}, {
		key: '_init',
		value: function _init() {
			_manager.YYIMManager.getInstance().exeBackhander('monitor');
			this.eventHandler._init();
			this.registerHandler(OPCODE.AUTH.KEY, function (userBindPacket) {
				var jid = new JSJaCJID(userBindPacket.jid),
				    id = _YYIMJIDUtil.YYIMJIDUtil.getID(userBindPacket.jid);

				_manager.YYIMManager.getInstance()._user = {
					jid: jid,
					name: id
				};
				_manager.YYIMManager.getInstance().onUserBind(id, jid.getResource());
			});
		}
	}, {
		key: 'registerHandler',
		value: function registerHandler(event, ns, type, handler) {
			if (this.connection) {
				this.connection.registerHandler.apply(this.connection, arguments);
				return;
			}
			throw "connection is undefined!";
		}
	}, {
		key: 'connected',
		value: function connected() {
			if (this.connection && this.connection.connected()) {
				return true;
			}
			return false;
		}
	}, {
		key: 'getConnection',
		value: function getConnection() {
			if (!this.connection) {
				if (_config.YYIMConfiguration.useWebSocket()) {
					this.connection = new JSJaCWebSocketConnection({
						httpbase: _config.YYIMConfiguration.getWebSocketUrl()
					});
				} else {
					this.connection = new JSJaCHttpBindingConnection({
						httpbase: _config.YYIMConfiguration.getHttpBindUrl(),
						timerval: _config.YYIMConfiguration.CONNECTION.TIMERVAL,
						wait: _config.YYIMConfiguration.CONNECTION.WAIT
					});
				}
			}

			return this.connection;
		}
	}, {
		key: 'connect',
		value: function connect(options) {
			options = options || {};
			if (!this.connectArg) {
				this.connectArg = _config.YYIMConfiguration.getConnectionArgObj();
			}
			if (options.username) {
				this.connectArg.username = options.username;
			}
			if (options.token) {
				this.connectArg.password = options.token;
			}
			if (options.appType) {
				this.connectArg.appType = options.appType;
			}
			if (options.identify) {
				this.connectArg.clientIdentify = options.identify;
			}
			_manager.YYIMManager.getInstance()._user = {
				jid: new JSJaCJID(this.connectArg.username + '@' + _config.YYIMConfiguration.YY_IM_DOMAIN + '/' + this.connectArg.resource),
				name: this.connectArg.username
			};
			this.connection.connect(this.connectArg);
		}
	}, {
		key: 'disconnect',
		value: function disconnect() {
			this.daemon.stopPing(false);
			if (this.connection) {
				this.connection.disconnect();
			}
		}
	}, {
		key: 'send',
		value: function send(packet, callback, data, callbackContext) {
			this.waitingList.push({
				packet: packet,
				callback: callback,
				data: data,
				callbackContext: callbackContext
			});
			if (!this.sending) {
				this.sendInterval();
			}
		}
	}, {
		key: 'sendInterval',
		value: function sendInterval() {
			var _this = this;

			if (this.waitingList.length) {
				this.sending = true;
				var timespan = new Date().getTime() - this.lastSendTime;

				if (timespan >= _config.YYIMConfiguration.SENDINTERVAL) {
					var data = this.waitingList.shift();
					this.sendJumpPacket(data);

					if (data.packet && data.packet.opcode != OPCODE.PING.SEND) {
						this.getDaemon().startPing();
					}

					if (data.packet && data.packet.opcode == OPCODE.PING.SEND) {
						this.getDaemon().setTimeout();
					}

					this.lastSendTime = new Date().getTime();
					this.sendInterval();
				} else {
					setTimeout(function () {
						_this.sendInterval();
					}, _config.YYIMConfiguration.SENDINTERVAL - timespan);
				}
			} else {
				this.sending = false;
			}
		}
	}, {
		key: 'sendJumpPacket',
		value: function sendJumpPacket(arg) {
			if (arg) {
				if (arg.callbackContext) {
					return this.connection.sendJumpPacket(arg.packet, arg.callback.bind(arg.callbackContext), arg.data);
				}
				return this.connection.sendJumpPacket(arg.packet, arg.callback, arg.data);
			}
		}
	}]);
	return YYIMConnection;
}();

YYIMConnection.getInstance = function () {
	if (!YYIMConnection._instance) {
		YYIMConnection._instance = new YYIMConnection();
		YYIMConnection._instance._init();
	}
	return YYIMConnection._instance;
};

exports.YYIMConnection = YYIMConnection;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(25);
var IE8_DOM_DEFINE = __webpack_require__(26);
var toPrimitive = __webpack_require__(28);
var dP = Object.defineProperty;

exports.f = __webpack_require__(5) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.YYIMJIDUtil = undefined;

var _constant = __webpack_require__(13);

var _config = __webpack_require__(4);

var _manager = __webpack_require__(0);

var getBareJID = function getBareJID(jid) {
	var userBareJid = _manager.YYIMManager.getInstance().getUserBareJID();
	var tmpJid = void 0;
	if (jid) {
		if (jid instanceof JSJaCJID) {
			if (jid.getBareJID() == userBareJid) return jid.toString();
			return jid.getBareJID();
		} else if (typeof jid == "string") {
			tmpJid = new JSJaCJID(jid);
			if (tmpJid.getBareJID() == userBareJid) return tmpJid.toString();
			return tmpJid.getBareJID();
		} else if (jid.jid && jid.jid instanceof JSJaCJID) {
			tmpJid = jid.jid;
			if (tmpJid.getBareJID() == userBareJid) return tmpJid.toString();
			return tmpJid.getBareJID();
		}
	}
	throw new JSJaCJIDInvalidException("invalid jid: " + jid);
};

var getID = function getID(jid) {
	var appkey = void 0,
	    tmp = void 0,
	    index = void 0,
	    id = void 0;
	id = YYIMCommonUtil.isStringAndNotEmpty(jid) ? (appkey = _manager.YYIMManager.getInstance().getAppkey(), index = jid.indexOf('@'), index != -1 ? (tmp = jid.substring(0, index), tmp.indexOf(appkey) > 0 ? tmp.replace(appkey, '') : tmp) : jid.indexOf(appkey) > 0 ? jid.replace(appkey, '') : jid) : null;
	return id ? id.toString() : id;
};

var YYIMJIDUtil = {
	getNode: function getNode(jid) {
		jid = jid.toString();
		if (YYIMCommonUtil.isStringAndNotEmpty(jid)) {
			var appkey = _manager.YYIMManager.getInstance().getAppkey();
			var node = jid;

			if (node.indexOf('\@') > -1) {
				if (node.indexOf('\@') === 0) {
					throw "\"" + jid + "\" Can't start with  \"@\"!";
				} else {
					node = node.substring(0, node.indexOf('\@'));
				}
			}

			if (node.indexOf('\.') > -1) {
				if (node.indexOf('\.') === 0) {
					throw "\"" + jid + "\" Can't start with \".\"!";
				} else {
					node = node.substring(0, node.indexOf('\.'));
				}
			}
			return node ? node + appkey : node;
		} else {
			throw "\"" + jid + "\" Can't be Number Or Empty!";
		}
	},
	getResource: function getResource(jid) {
		return YYIMCommonUtil.isStringAndNotEmpty(jid) ? jid.indexOf('/') != -1 ? jid.substring(jid.indexOf('/') + 1) : null : null;
	},
	buildUserJID: function buildUserJID(idOrJid, resource) {
		return YYIMCommonUtil.isStringAndNotEmpty(idOrJid) ? idOrJid.indexOf('@') != -1 ? idOrJid : idOrJid + '@' + _config.YYIMConfiguration.YY_IM_DOMAIN + (resource ? '/' + resource : '') : null;
	},
	getDomain: function getDomain(jid) {
		return YYIMCommonUtil.isStringAndNotEmpty(jid) ? jid.indexOf('@') != -1 ? jid.substring(jid.indexOf('@') + 1) : null : null;
	},
	buildChatGroupJID: function buildChatGroupJID(idOrJid) {
		return YYIMCommonUtil.isStringAndNotEmpty(idOrJid) ? idOrJid.indexOf('@') != -1 ? idOrJid : idOrJid + '@' + _config.YYIMConfiguration.DOMAIN.CHATROOM : null;
	},
	buildPubAccountJID: function buildPubAccountJID(idOrJid) {
		return YYIMCommonUtil.isStringAndNotEmpty(idOrJid) ? idOrJid.indexOf('@') != -1 ? idOrJid : idOrJid + '@' + _config.YYIMConfiguration.DOMAIN.PUBACCOUNT : null;
	},
	getChatTypeByJid: function getChatTypeByJid(Jid) {
		if (!!Jid) {
			switch (YYIMJIDUtil.getDomain(Jid)) {
				case _config.YYIMConfiguration.DOMAIN.CHATROOM:
					return _constant.CHAT_TYPE.GROUP_CHAT;
				case _config.YYIMConfiguration.DOMAIN.PUBACCOUNT:
					return _constant.CHAT_TYPE.PUB_ACCOUNT;
				default:
					return _constant.CHAT_TYPE.CHAT;
			}
		}
	},

	getBareJID: getBareJID,
	getID: getID
};

exports.YYIMJIDUtil = YYIMJIDUtil;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var CONNECT_STATUS = exports.CONNECT_STATUS = {
	INIT: 'init',
	OFFLINE: 'offline',
	CONNECTING: 'connecting',
	PROCESSING: 'processing',
	CONFLICT: 'conflict',
	CONNECTED: 'connected',
	ERROR: 'error',
	AUTHERROR: 'AuthError',
	ONCLIENTKICKOUT: 'onClientKickout',
	ONUPDATEPASSWORD: 'onUpdatePassword'
};

var FAVORITE_TYPE = exports.FAVORITE_TYPE = {
	FAVORITE: 'favorite',
	REMOVE: 'remove',
	NONE: 'none'
};

var STATUS = exports.STATUS = {
	CHAT: 'chat',
	AWAY: 'away',
	XA: 'xa',
	DND: 'dnd',
	UNAVAILABLE: 'unavailable' };

var TYPE = exports.TYPE = {
	SET: 'set',
	RESULT: 'result',
	GET: 'get',
	SUBMIT: 'submit',
	UNAVAILABLE: 'unavailable'
};

var PRESENCE_TYPE = exports.PRESENCE_TYPE = {
	SUBSCRIBE: 'subscribe',
	UNSUBSCRIBE: 'unsubscribe',
	SUBSCRIBED: 'subscribed',
	UNSUBSCRIBED: 'unsubscribed',
	PROBE: 'probe',
	UNAVAILABLE: 'unavailable',
	COLLECT: 'collect' };

var COLLECT_TYPE = exports.COLLECT_TYPE = {
	ADD: 'add',
	REMOVE: 'remove'
};

var CHAT_TYPE = exports.CHAT_TYPE = {
	CHAT: 'chat',
	GROUP_CHAT: 'groupchat',
	PUB_ACCOUNT: 'pubaccount'
};

var MESSAGE_CONTENT_TYPE = exports.MESSAGE_CONTENT_TYPE = {
	TEXT: 2,
	FILE: 4,
	IMAGE: 8,
	REDPACKET: 9,
	SMALLVIDEO: 10,
	REVOCATION: 13,
	MERGEFORWARD: 15,
	SINGLEGRAPHIC: 16,
	MOREGRAPHIC: 32,
	AUDO: 64,
	LOCATION: 128,
	SHARE: 256,
	WHITEBOARD: 1024
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(2);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var YYIMAINode = function () {
    function YYIMAINode(_byte) {
        (0, _classCallCheck3.default)(this, YYIMAINode);

        this.childs = {};
        this._byte = _byte || null;
        this._isWord = false;
        this._count = 0;
    }

    (0, _createClass3.default)(YYIMAINode, [{
        key: 'isWord',
        value: function isWord() {
            return this._isWord && this._count == 0;
        }
    }, {
        key: 'asWord',
        value: function asWord() {
            this._isWord = true;
        }
    }, {
        key: 'addCount',
        value: function addCount() {
            this._count++;
        }
    }, {
        key: 'getCount',
        value: function getCount() {
            return this._count;
        }
    }]);
    return YYIMAINode;
}();

var YYIMAITrie = function () {
    function YYIMAITrie() {
        (0, _classCallCheck3.default)(this, YYIMAITrie);

        this.root = new YYIMAINode(null);
    }

    (0, _createClass3.default)(YYIMAITrie, [{
        key: 'toBytes',
        value: function toBytes(word) {
            var result = [];
            for (var i = 0; i < word.length; i++) {
                var code = word.charCodeAt(i);

                if (code < 0x80) {
                    result.push(code);
                } else {
                    result = result.concat(this.toUTF8(code));
                }
            }
            return result;
        }
    }, {
        key: 'toUTF8',
        value: function toUTF8(c) {
            var byte1 = 0xE0 | c >> 12 & 0x0F;

            var byte2 = 0x80 | c >> 6 & 0x3F;

            var byte3 = 0x80 | c & 0x3F;

            return [byte1, byte2, byte3];
        }
    }, {
        key: 'toUTF16',
        value: function toUTF16(b1, b2, b3) {
            var byte1 = b1 << 4 | b2 >> 2 & 0x0F;
            var byte2 = (b2 & 0x03) << 6 | b3 & 0x3F;
            var utf16 = (byte1 & 0x00FF) << 8 | byte2;

            return utf16;
        }
    }, {
        key: 'add',
        value: function add(word) {
            var node = this.root,
                bytes = this.toBytes(word),
                len = bytes.length;
            for (var i = 0; i < len; i++) {
                var c = bytes[i];

                if (!(c in node.childs)) {
                    node.childs[c] = new YYIMAINode(c);
                }
                node = node.childs[c];
            }
            node.asWord();
        }
    }, {
        key: 'search',
        value: function search(bytes) {
            var node = this.root,
                len = bytes.length,
                result = [];
            var word = [],
                j = 0;
            for (var i = 0; i < len; i++) {
                var c = bytes[i],
                    childs = node.childs;
                if (!(c in childs)) {
                    return result;
                }

                if (c < 0x80) {
                    word.push(String.fromCharCode(c));
                } else {
                    j++;
                    if (j % 3 == 0) {
                        var b1 = bytes[i - 2];
                        var b2 = bytes[i - 1];
                        var b3 = c;
                        word.push(String.fromCharCode(this.toUTF16(b1, b2, b3)));
                    }
                }

                if (word.join('') in stop) {
                    return result;
                }

                var cnode = childs[c];
                if (cnode.isWord()) {
                    cnode.addCount();
                    result.push(word.join(''));
                }
                node = cnode;
            }

            return result;
        }
    }, {
        key: 'splitWords',
        value: function splitWords(words) {
            var bytes = this.toBytes(words);
            var start = 0,
                end = bytes.length - 1,
                result = [];

            while (start != end) {
                var word = [];
                for (var i = start; i <= end; i++) {
                    var b = bytes[i];
                    word.push(b);

                    var finds = this.search(word);
                    if (finds !== false && finds.length > 0) {
                        result = result.concat(finds);
                    }
                }
                start++;
            }

            return result;
        }
    }, {
        key: 'init',
        value: function init(dict) {
            for (var i = 0; i < dict.length; i++) {
                this.add(dict[i]);
            }
        }
    }]);
    return YYIMAITrie;
}();

var YYAIAbility = function () {
    function YYAIAbility() {
        (0, _classCallCheck3.default)(this, YYAIAbility);

        this.dicts = [];
        this.stopKeyword = { "的": 1 };

        this.isOpenFilter = false;

        this.isAIAbility = true;
    }

    (0, _createClass3.default)(YYAIAbility, [{
        key: 'openAIAbility',
        value: function openAIAbility(isAIAbility) {
            this.isAIAbility = isAIAbility;
        }
    }, {
        key: 'openFilterWords',
        value: function openFilterWords(isOpenFilter) {
            this.isOpenFilter = isOpenFilter;
        }
    }, {
        key: 'setDictionaries',
        value: function setDictionaries(dictArray) {
            if (dictArray) {
                for (var i = 0; i < dictArray.length; i++) {
                    this.dicts.push(dictArray[i]);
                }
            }
        }
    }, {
        key: 'intelligentAnalysis',
        value: function intelligentAnalysis(keyword) {
            if (!this.isOpenFilter) {
                return true;
            }
            if (keyword && this.isAIAbility) {
                var trie = new YYIMAITrie();
                trie.init(this.dicts);
                var result = trie.splitWords(keyword);
                return result.length > 0;
            }
            return false;
        }
    }]);
    return YYAIAbility;
}();

exports.default = new YYAIAbility();

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.FileUpload = undefined;

var _manager = __webpack_require__(0);

function FileUpload() {}

FileUpload.prototype = new BaseList();

FileUpload.getInstance = function () {
	if (!this._instance) {
		this._instance = new FileUpload();
	}
	return this._instance;
};

FileUpload.prototype.init = function (options, events) {
	var settings = {
		browse_button: 'fileUpload',
		file_data_name: 'file',
		url: this.getBaseUrl(),
		filters: {
			max_file_size: '100mb',
			prevent_duplicates: !!_manager.YYIMChat.getConfig().UPLOAD.PREVENT_DUPLICATES },
		flash_swf_url: _manager.YYIMChat.getConfig().UPLOAD.FLASH_SWF_URL,
		silverlight_xap_url: _manager.YYIMChat.getConfig().UPLOAD.SILVERLIGHT_XAP_URL,
		multi_selection: !!_manager.YYIMChat.getConfig().UPLOAD.MULTI_SELECTION,
		multipart: true,
		max_retries: 1,
		chunk_size: 0,
		runtimes: 'gears,html5,flash,silverlight,browserplus'
	};

	if (options['mediaType'] == _manager.YYIMChat.getConfig().UPLOAD.MEDIATYPE.IMAGE) {
		settings['filters']['mime_types'] = [{ title: "Image files", extensions: "jpg,gif,png,jpeg,bmp" }];
	} else {
		settings['filters']['mime_types'] = undefined;
	}

	jQuery.extend(settings, options);
	var id = settings['browse_button'];
	var uploader = new plupload.Uploader(settings);
	uploader.init();
	uploader.refresh();
	this.bindEvents(uploader, events);
};

FileUpload.prototype.getBaseUrl = function () {
	return _manager.YYIMChat.getServletPath().REST_RESOURCE_SERVLET + _manager.YYIMChat.getTenancy().ETP_KEY + '/' + _manager.YYIMChat.getTenancy().APP_KEY + '/upload';
};

FileUpload.prototype.getUploadingSize = function () {
	var size = 0;
	for (var x in this.list) {
		if (this.list.hasOwnProperty(x)) {
			var uploader = this.list[x];
			if (uploader) {
				var file = uploader.getFile(x);

				if (file.status != plupload.FAILED && file.status != plupload.STOPPED) {
					size++;
				}
			}
		}
	}
	return size;
};

FileUpload.prototype.start = function (file) {
	var uploader;
	if (file) {
		uploader = this.get(file.id || file);
		if (uploader) {
			file = uploader.getFile(file.id || file);
			if (file) {
				file.status = 1;
			}
			uploader.start();
		}
	}
};

FileUpload.prototype.end = function (file) {
	var uploader;
	if (file) {
		var fileId = file.id || file;
		uploader = this.get(fileId);
		if (uploader) {
			file = uploader.getFile(fileId);
			if (file) {
				uploader.removeFile(file);
			}
			this.remove(fileId);
		}
	} else {
		this.forEach(function (uploader) {
			uploader.splice(0);
			uploader.destroy();
		});
		this.clear();
	}
};

FileUpload.prototype.bindEvents = function (uploader, arg) {
	var that = this;

	uploader.bind('init', function (uploader) {
		arg && arg.init && arg.init(uploader);
	});

	uploader.bind('PostInit', function (uploader) {
		arg && arg.PostInit && arg.PostInit(uploader);
	});

	uploader.bind('Refresh', function (uploader) {
		arg && arg.Refresh && arg.Refresh(uploader);
	});

	uploader.bind('StateChanged', function (uploader) {
		arg && arg.StateChanged && arg.StateChanged(uploader);
	});

	uploader.bind('UploadFile', function (uploader, file) {
		arg && arg.StateChanged && arg.UploadFile(uploader, file);
	});

	uploader.bind('BeforeUpload', function (uploader, file) {
		arg && arg.BeforeUpload && arg.BeforeUpload(uploader, file);
	});

	uploader.bind('QueueChanged', function (uploader) {
		arg && arg.QueueChanged && arg.QueueChanged(uploader);
	});

	uploader.bind('OptionChanged', function (uploader, option_name, new_value, old_value) {
		arg && arg.OptionChanged && arg.OptionChanged(uploader, option_name, new_value, old_value);
	});

	uploader.bind('UploadProgress', function (uploader, file) {
		arg && arg.UploadProgress && arg.UploadProgress(uploader, file);
	});

	uploader.bind('FilesAdded', function (uploader, files) {
		arg && arg.FilesAdded && arg.FilesAdded(uploader, files);
	});

	uploader.bind('FilesRemoved', function (uploader, files) {
		files.forEach(function (file, index) {
			that.remove(file.id);
		});
		arg && arg.FilesRemoved && arg.FilesRemoved(uploader, files);
	});

	uploader.bind('FileFiltered', function (uploader, file) {
		that.set(file.id, uploader);
		arg && arg.FileFiltered && arg.FileFiltered(uploader, file);
	});

	uploader.bind('FileUploaded', function (uploader, file, responseObject) {
		arg && arg.FileUploaded && arg.FileUploaded(uploader, file, responseObject);
	});

	uploader.bind('ChunkUploaded', function (uploader, file, responseObject) {
		arg && arg.ChunkUploaded && arg.ChunkUploaded(uploader, file, responseObject);
	});

	uploader.bind('UploadComplete', function (uploader, files) {
		arg && arg.UploadComplete && arg.UploadComplete(uploader, files);
	});

	uploader.bind('Error', function (uploader, errObject) {
		arg && arg.Error && arg.Error(uploader, errObject);
	});

	uploader.bind('Destroy', function (uploader) {
		arg && arg.Destroy && arg.Destroy(uploader);
	});
};

exports.FileUpload = FileUpload;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(17);


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _manager = __webpack_require__(0);

__webpack_require__(34);

__webpack_require__(37);

__webpack_require__(39);

__webpack_require__(41);

__webpack_require__(43);

__webpack_require__(45);

__webpack_require__(47);

__webpack_require__(49);

__webpack_require__(51);

__webpack_require__(53);

__webpack_require__(55);

__webpack_require__(57);

window.YYIMChat = _manager.YYIMChat;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(19), __esModule: true };

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(20);
var $Object = __webpack_require__(6).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(21);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(5), 'Object', { defineProperty: __webpack_require__(10).f });


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(9);
var core = __webpack_require__(6);
var ctx = __webpack_require__(22);
var hide = __webpack_require__(24);
var has = __webpack_require__(30);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(23);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(10);
var createDesc = __webpack_require__(29);
module.exports = __webpack_require__(5) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(7);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(5) && !__webpack_require__(11)(function () {
  return Object.defineProperty(__webpack_require__(27)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(7);
var document = __webpack_require__(9).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(7);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.YYIMConnectDaemon = undefined;

var _classCallCheck2 = __webpack_require__(2);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _config = __webpack_require__(4);

var _YYIMConnection = __webpack_require__(8);

var _manager = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var YYIMConnectDaemon = function () {
	function YYIMConnectDaemon() {
		(0, _classCallCheck3.default)(this, YYIMConnectDaemon);

		this.lastPongTime = Date.now();

		this.pingInterval;

		this.pingTimeout;

		this.interval = 0;
	}

	(0, _createClass3.default)(YYIMConnectDaemon, [{
		key: 'startPing',
		value: function startPing(isOnline) {
			if (isOnline === true) {
				this.isOnline = isOnline;
			}
			if (_YYIMConnection.YYIMConnection.getInstance().connected()) {
				this.interval = !this.interval ? _config.YYIMConfiguration.PING.SLOW_INTERVAL : _config.YYIMConfiguration.PING.INTERVAL;
				this.ping();
			} else {
				this.stopPing();
			}
		}
	}, {
		key: 'stopPing',
		value: function stopPing(isOnline) {
			if (isOnline === false) {
				this.isOnline = isOnline;
			}

			clearTimeout(this.pingTimeout);
			clearTimeout(this.pingInterval);
		}
	}, {
		key: 'ping',
		value: function ping() {
			if (!this.isOnline) {
				this.stopPing();
			} else {
				if (!this.sending) {
					this.stopPing();
					this.interval = this.interval || _config.YYIMConfiguration.PING.SLOW_INTERVAL;

					var duration = Date.now() - (this.lastPongTime + this.interval);
					if (duration >= 0) {
						try {
							this.sending = true;
							this.interval = _config.YYIMConfiguration.PING.SLOW_INTERVAL;
							_YYIMConnection.YYIMConnection.getInstance().send(new JumpPacket(null, OPCODE.PING.SEND));
						} catch (e) {
							this.stopPing();
							_manager.YYIMManager.getInstance().log("Ping_Error.", 0, e);
							_manager.YYIMManager.getInstance().onConnectError({
								errorCode: 408,
								message: '连接失败'
							});
						}
					} else {
						this.pingInterval = setTimeout(this.ping.bind(this), -duration);
					}
				}
			}
		}
	}, {
		key: 'pong',
		value: function pong() {
			this.lastPongTime = Date.now();
			if (!this.isOnline) {
				this.stopPing();
			} else {
				_manager.YYIMManager.getInstance().log('【pong】\t' + new Date(this.lastPongTime), 3, this.lastPongTime);
				this.sending = false;
				this.ping();
			}
		}
	}, {
		key: 'setTimeout',
		value: function (_setTimeout) {
			function setTimeout() {
				return _setTimeout.apply(this, arguments);
			}

			setTimeout.toString = function () {
				return _setTimeout.toString();
			};

			return setTimeout;
		}(function () {
			if (!this.isOnline) {
				this.stopPing();
			} else {
				var now = Date.now();
				_manager.YYIMManager.getInstance().log('【setPingTimeout】\t' + new Date(now), 3, now);
				clearTimeout(this.pingTimeout);
				this.pingTimeout = setTimeout(this.timeoutHandler.bind(this), _config.YYIMConfiguration.PING.TIMEOUT);
			}
		})
	}, {
		key: 'timeoutHandler',
		value: function timeoutHandler() {
			this.sending = false;
			this.stopPing();
			_manager.YYIMManager.getInstance().log("Ping_Timeout.", 0);
			_manager.YYIMManager.getInstance().onConnectError({
				errorCode: 408,
				message: '连接失败'
			});
		}
	}]);
	return YYIMConnectDaemon;
}();

exports.YYIMConnectDaemon = YYIMConnectDaemon;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.YYIMConnectEventHandler = undefined;

var _classCallCheck2 = __webpack_require__(2);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(3);

var _createClass3 = _interopRequireDefault(_createClass2);

var _manager = __webpack_require__(0);

var _YYIMConnection = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var YYIMConnectEventHandler = function () {
	function YYIMConnectEventHandler() {
		(0, _classCallCheck3.default)(this, YYIMConnectEventHandler);

		this._inited = false;
	}

	(0, _createClass3.default)(YYIMConnectEventHandler, [{
		key: '_init',
		value: function _init() {
			_manager.YYIMManager.getInstance().log("YYIMConnectEventHandler.prototype.registerHandler", 3);
			if (this._inited) {
				return;
			}
			var conn = _YYIMConnection.YYIMConnection.getInstance();
			conn.registerHandler('onConnect', this.onConnected);
			conn.registerHandler('onError', this.onConnectError);
			conn.registerHandler('onDisconnect', this.onDisConnect);
			conn.registerHandler("onStatusChanged", this.connectStatusChangeHandler);

			conn.registerHandler(OPCODE.STREAM_ERROR.KEY, this.onStreamError);
			conn.registerHandler(OPCODE.PACKET_ERROR.KEY, this.onPacketError);

			conn.registerHandler("packet_in", conn.getDaemon().pong.bind(conn.getDaemon()));

			this._inited = true;
		}
	}, {
		key: 'onConnected',
		value: function onConnected() {
			_manager.YYIMManager.getInstance().onOpened();
			_YYIMConnection.YYIMConnection.getInstance().getDaemon().startPing(true);
		}
	}, {
		key: 'onConnectError',
		value: function onConnectError(e) {
			_manager.YYIMManager.getInstance().log("YYIMConnectEventHandler.prototype.onConnectError ", 0, e);
			var errorCode = e.getAttribute("code");
			_YYIMConnection.YYIMConnection.getInstance().getDaemon().stopPing(false);
			if (errorCode == 401) {
				_manager.YYIMManager.getInstance().onAuthError({
					errorCode: 401,
					message: '用户名或密码错误'
				});
			} else if (errorCode == 409) {
				_manager.YYIMManager.getInstance().onConflicted({
					errorCode: 409,
					message: '连接冲突'
				});
			} else if (errorCode == 4010) {
				_manager.YYIMManager.getInstance().onClientKickout({
					errorCode: 4010,
					message: '被客户端踢掉'
				});
			} else if (errorCode == 4011) {
				_manager.YYIMManager.getInstance().onUpdatePassword({
					errorCode: 4011,
					message: '修改密码'
				});
			} else {
				_manager.YYIMManager.getInstance().onConnectError({
					errorCode: errorCode,
					message: '连接失败'
				});
			}
		}
	}, {
		key: 'onStreamError',
		value: function onStreamError(packet) {
			_manager.YYIMManager.getInstance().log("YYIMConnectEventHandler.prototype.onPacketError ", 0, packet);
			_YYIMConnection.YYIMConnection.getInstance().getDaemon().stopPing(false);
			var errorCode = packet.code;
			if (errorCode == 401) {
				_manager.YYIMManager.getInstance().onAuthError({
					errorCode: 401,
					message: '用户名或密码错误'
				});
			} else if (errorCode == 409) {
				_manager.YYIMManager.getInstance().onConflicted({
					errorCode: 409,
					message: '连接冲突'
				});
			} else if (errorCode == 4010) {
				_manager.YYIMManager.getInstance().onClientKickout({
					errorCode: 4010,
					message: '被客户端踢掉'
				});
			} else if (errorCode == 4011) {
				_manager.YYIMManager.getInstance().onUpdatePassword({
					errorCode: 4011,
					message: '修改密码'
				});
			} else {
				_manager.YYIMManager.getInstance().onConnectError({
					errorCode: errorCode,
					message: '连接失败'
				});
			}
		}
	}, {
		key: 'onPacketError',
		value: function onPacketError(packet) {
			_manager.YYIMManager.getInstance().log("YYIMConnectEventHandler.prototype.onPacketError ", 0, packet);
		}
	}, {
		key: 'onDisConnect',
		value: function onDisConnect() {
			_manager.YYIMManager.getInstance().onClosed();
			_YYIMConnection.YYIMConnection.getInstance().getDaemon().stopPing(false);
		}
	}, {
		key: 'connectStatusChangeHandler',
		value: function connectStatusChangeHandler(status) {
			_manager.YYIMManager.getInstance().onStatusChanged(status);
		}
	}]);
	return YYIMConnectEventHandler;
}();

exports.YYIMConnectEventHandler = YYIMConnectEventHandler;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.YYIMConsoleLogger = undefined;

var _classCallCheck2 = __webpack_require__(2);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _config = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var YYIMConsoleLogger = function YYIMConsoleLogger(level) {
	var _this = this,
	    _arguments = arguments;

	(0, _classCallCheck3.default)(this, YYIMConsoleLogger);

	this.level = !level ? level == 0 ? 0 : 3 : level;
	this.start = function () {};

	this.log = function (groupname, level, obj1, obj2) {
		if (!_config.YYIMConfiguration.LOG.ENABLE) {
			return;
		}
		level = !level ? level == 0 ? 0 : 3 : level;
		if (level > _this.level) {
			return;
		}
		if (typeof console == 'undefined' || typeof console.group == 'undefined') {
			return;
		}
		try {
			console.group(groupname);
			switch (level) {
				case 0:
					console.error(groupname);
					console.trace();
					break;
				case 1:
					console.warn(groupname);
					console.trace();
					break;
				case 2:
					console.info(groupname);
					break;
				case 4:
					console.debug(groupname);
					break;
				default:
					console.log(groupname);
					break;
			}
			var argLength = _arguments.length;
			if (argLength > 2) {
				for (var i = 2; i < argLength; i++) {
					var obj = _arguments[i];
					if (obj) {
						if (obj instanceof JSJaCPacket) {
							console.info(obj.doc.xml);
						} else {
							console.debug(obj);
						}
					}
				}
			}
			console.groupEnd();
		} catch (e1) {
			try {
				console.error(e1);
			} catch (e2) {}
		}
	};
	this.logParam = function (level) {
		level = level || 3;
		var caller = _this.logParam.caller;
		_this.log("arguments:", level, caller.arguments);
	};
	this.setLevel = function (level) {
		_this.level = level;
		return _this;
	};
	this.getLevel = function () {
		return _this.level;
	};
};

exports.YYIMConsoleLogger = YYIMConsoleLogger;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _YYAIAbility = __webpack_require__(14);

var _YYAIAbility2 = _interopRequireDefault(_YYAIAbility);

var _manager = __webpack_require__(0);

var _Manager = __webpack_require__(35);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_manager.YYIMManager.prototype.setAIAbility = function (arg) {
    arg = arg || {};
    if (!!arg.intelligentable) {
        (0, _Manager.setAIAbility)(arg);
    } else {
        arg.error && arg.error();
    }
};

_manager.YYIMManager.prototype.getAIWords = function (arg) {
    (0, _Manager.getAIWords)(arg || {});
};

_manager.YYIMManager.prototype.openAIAbility = function (isAIAbility) {
    this.isAIAbility = isAIAbility;
};

_manager.YYIMManager.prototype.openFilterWords = function (isOpenFilter) {
    _YYAIAbility2.default.openFilterWords(isOpenFilter);
};

_manager.YYIMManager.prototype.setDictionaries = function (intelligentWordsTime) {
    var storageWordsTime = window.localStorage.intelligentWordsTime;
    if (storageWordsTime != intelligentWordsTime) {
        _manager.YYIMChat.getAIWords({
            success: function success(data) {
                _YYAIAbility2.default.setDictionaries(data.intelligentWords || []);

                window.localStorage.intelligentWordsTime = intelligentWordsTime;
            },
            error: function error(xhr) {
                try {
                    arg.error && arg.error(JSON.parse(xhr.responseText));
                    arg = null;
                } catch (e) {
                    arg.error && arg.error();
                    arg = null;
                }
            }
        });
    }
};

_manager.YYIMManager.prototype.intelligentAnalysis = function (keyword) {
    _YYAIAbility2.default.intelligentAnalysis(keyword);
};

_manager.YYIMManager.prototype.getMultiTerminals = function (arg) {
    (0, _Manager.getMultiTerminals)(arg || {});
};

_manager.YYIMManager.prototype.sendMultiTerminalsCommand = function (arg) {
    (0, _Manager.sendMultiTerminalsCommand)(arg || {});
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sendMultiTerminalsCommand = exports.getMultiTerminals = exports.getAIWords = exports.setAIAbility = undefined;

var _stringify = __webpack_require__(1);

var _stringify2 = _interopRequireDefault(_stringify);

var _manager = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setAIAbility(arg) {
    var config = _manager.YYIMChat.getConfig();
    jQuery.ajax({
        url: config.SERVLET.REST_USER_SERVLET + config.MULTI_TENANCY.ETP_KEY + '/' + config.MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMChat.getUserID() + '/profile/intelligentable?token=' + _manager.YYIMChat.getToken(),
        type: 'post',
        data: (0, _stringify2.default)(arg),
        dataType: 'json',
        cache: false,
        processData: false,
        contentType: "application/json",
        success: function success(data) {
            arg.success && arg.success(data);
            arg = null;
        },
        error: function error(xhr) {
            try {
                arg.error && arg.error(JSON.parse(xhr.responseText));
                arg = null;
            } catch (e) {
                arg.error && arg.error();
                arg = null;
            }
        }
    });
}

function getAIWords(arg) {
    var config = _manager.YYIMChat.getConfig();
    jQuery.ajax({
        url: config.SERVLET.REST_USER_SERVLET + config.MULTI_TENANCY.ETP_KEY + '/' + config.MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMChat.getUserID() + '/intelligent/words?token=' + _manager.YYIMChat.getToken() + '&apiKey=' + _manager.YYIMChat.getApiKey(),
        type: 'get',
        data: '',
        dataType: 'json',
        cache: false,
        processData: false,
        contentType: "application/json",
        success: function success(data) {
            arg.success && arg.success(data);
            arg = null;
        },
        error: function error(xhr) {
            try {
                arg.error && arg.error(JSON.parse(xhr.responseText));
                arg = null;
            } catch (e) {
                arg.error && arg.error();
                arg = null;
            }
        }
    });
}

function getMultiTerminals(arg) {
    var config = _manager.YYIMChat.getConfig();
    jQuery.ajax({
        url: config.SERVLET.REST_USER_SERVLET + config.MULTI_TENANCY.ETP_KEY + '/' + config.MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMChat.getUserID() + '/multiterminals?token=' + _manager.YYIMChat.getToken(),
        type: 'get',
        data: '',
        dataType: 'json',
        cache: false,
        processData: false,
        contentType: "application/json",
        success: function success(data) {
            arg.success && arg.success(data);
            arg = null;
        },
        error: function error(xhr) {
            try {
                arg.error && arg.error(JSON.parse(xhr.responseText));
                arg = null;
            } catch (e) {
                arg.error && arg.error();
                arg = null;
            }
        }
    });
}

function sendMultiTerminalsCommand(arg) {
    var config = _manager.YYIMChat.getConfig();
    jQuery.ajax({
        url: config.SERVLET.REST_USER_SERVLET + config.MULTI_TENANCY.ETP_KEY + '/' + config.MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMChat.getUserID() + '/multiterminals/command?token=' + _manager.YYIMChat.getToken(),
        type: 'POST',
        data: arg.data,
        dataType: 'json',
        cache: false,
        processData: false,
        contentType: "application/json",
        success: function success(data) {
            arg.success && arg.success(data);
            arg = null;
        },
        error: function error(xhr) {
            try {
                arg.error && arg.error(JSON.parse(xhr.responseText));
                arg = null;
            } catch (e) {
                arg.error && arg.error();
                arg = null;
            }
        }
    });
}

exports.setAIAbility = setAIAbility;
exports.getAIWords = getAIWords;
exports.getMultiTerminals = getMultiTerminals;
exports.sendMultiTerminalsCommand = sendMultiTerminalsCommand;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(6);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _manager = __webpack_require__(0);

var _Manager = __webpack_require__(38);

_manager.YYIMManager.prototype.getRecentDigset = function (arg) {
  arg.startDate = YYIMUtil['isWhateType'](arg.startDate, 'Number') && arg.startDate > 0 ? arg.startDate : 0;
  if (!(YYIMUtil['isWhateType'](arg.size, 'Number') && arg.size > 0)) {
    delete arg.size;
  }
  (0, _Manager.getRecentDigset)(arg);
};

_manager.YYIMManager.prototype.removeRecentDigest = function (arg) {
  if (arg.id) {
    (0, _Manager.removeRecentDigest)(arg);
  } else {
    arg && arg.error && arg.error();
  }
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.removeRecentDigest = exports.getRecentDigset = undefined;

var _manager = __webpack_require__(0);

function getRecentDigset(arg) {
	var config = _manager.YYIMChat.getConfig();
	var param = {
		startDate: arg.startDate
	};
	if (arg.size) {
		param.size = arg.size;
	}
	jQuery.ajax({
		url: config.SERVLET.REST_USER_SERVLET + config.MULTI_TENANCY.ETP_KEY + '/' + config.MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMChat.getUserID() + '/contactsmessage/digests?token=' + _manager.YYIMChat.getToken(),
		type: 'get',
		data: param,
		dataType: 'json',
		cache: false,
		success: function success(data) {
			for (var x in data.list) {
				if (data.list.hasOwnProperty(x)) {
					var item = data.list[x];

					item.id = _manager.YYIMChat.getJIDUtil().getID(item.jid);
					item.type = _manager.YYIMChat.getJIDUtil().getChatTypeByJid(item.jid);

					try {
						if (item.lastMessage) {
							item.lastMessage = messageParser(JSON.parse(item.lastMessage), item.type);
						}
					} catch (e) {}
				}
			}
			arg.success && arg.success(data);
			arg = null;
		},
		error: function error(xhr) {
			try {
				arg.error && arg.error(JSON.parse(xhr.responseText));
				arg = null;
			} catch (e) {
				arg.error && arg.error();
				arg = null;
			}
		}
	});
}

function parseContent(content, contentType) {
	if (content) {
		var body = JSON.parse(content);
		try {
			if (isNaN(Number(body.content)) && contentType != _manager.YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.TEXT) {
				body.content = JSON.parse(body.content);
				if (body.content.content) {
					body.content = body.content.content;
				}
			}
		} catch (e) {}
		return body;
	} else {
		return null;
	}
}

function messageParser(packet, type) {

	var message = {
		from: _manager.YYIMChat.getJIDUtil().getID(packet.sender),
		to: _manager.YYIMChat.getJIDUtil().getID(packet.receiver || _manager.YYIMChat.getUserID()),
		id: packet.packetId,
		dateline: packet.dateline || packet.ts,
		type: type,
		sessionVersion: packet.sessionVersion
	};

	if (type) {
		if (type == _manager.YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT) {
			message.from = {
				room: _manager.YYIMChat.getJIDUtil().getID(packet.mucid),
				roster: _manager.YYIMChat.getJIDUtil().getID(packet.sender)
			};
		} else if (type == _manager.YYIMChat.getConstants().CHAT_TYPE.PUB_ACCOUNT) {
			message.from = {
				room: _manager.YYIMChat.getJIDUtil().getID(packet.sender),
				roster: _manager.YYIMChat.getJIDUtil().getID(_manager.YYIMChat.getJIDUtil().getResource(packet.sender))
			};
		}
	}

	if (packet.content) {
		message.data = message.data || {};
		try {
			var content = parseContent(packet.content, packet.contentType);
			if (!!content && (!!content.content || content.content === '')) {
				message.data = content;
			} else {
				message.data.content = content;
			}
		} catch (e) {}

		message.data.contentType = packet.contentType;
		message.data.dateline = packet.dateline || packet.ts;

		if (message.data.content && message.data.contentType && (message.data.contentType == _manager.YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.IMAGE || message.data.contentType == _manager.YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.FILE)) {

			message.data.content.attachId = message.data.content.path;
			message.data.content.path = _manager.YYIMChat.getFileUrl(message.data.content.path);
		}

		if (_manager.YYIMChat.getJIDUtil().getID(packet.sender) != _manager.YYIMChat.getUserID()) {
			var receipt = {
				to: _manager.YYIMChat.getJIDUtil().getID(packet.mucid || packet.sender),
				id: message.id,
				type: message.type,
				sessionVersion: message.sessionVersion
			};
			message.data.receipt = receipt;
		}
	}
	return message;
}

function removeRecentDigest(arg) {
	var config = _manager.YYIMChat.getConfig();
	var typeRelation = {
		'chat': 'user',
		'groupchat': 'room',
		'pubaccount': 'pub'
	};

	jQuery.ajax({
		url: config.SERVLET.REST_USER_SERVLET + config.MULTI_TENANCY.ETP_KEY + '/' + config.MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMChat.getUserID() + '/contacts/' + (typeRelation[arg.type] || typeRelation['chat']) + '/' + arg.id + '?token=' + _manager.YYIMChat.getToken(),
		type: 'DELETE',
		dataType: 'json',
		cache: false,
		success: function success(data) {
			arg.success && arg.success(data);
			arg = null;
		},
		error: function error(xhr) {
			try {
				arg.error && arg.error(JSON.parse(xhr.responseText));
				arg = null;
			} catch (e) {
				arg.error && arg.error();
				arg = null;
			}
		}
	});
}

exports.getRecentDigset = getRecentDigset;
exports.removeRecentDigest = removeRecentDigest;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _manager = __webpack_require__(0);

var _Manager = __webpack_require__(40);

_manager.YYIMManager.prototype.getTransformFileList = function (arg) {
  if (arg && arg.attachId) {
    (0, _Manager.getTransformFileList)(arg);
  } else {
    arg && arg.error && arg.error();
  }
};

_manager.YYIMManager.prototype.getFileUrl = function (attachId, mediaType) {
  if (attachId) {
    return (0, _Manager.getFileUrl)(attachId, mediaType);
  }
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getFileUrl = exports.getTransformFileList = undefined;

var _manager = __webpack_require__(0);

function getTransformFileList(arg) {
	jQuery.ajax({
		url: _manager.YYIMChat.getConfig().SERVLET.REST_TRANSFORM_SERVLET + 'docInfo',
		type: 'get',
		data: {
			attachId: arg.attachId,
			token: _manager.YYIMChat.getToken(),
			downloader: _manager.YYIMChat.getUserNode()
		},
		dataType: 'json',
		cache: false,
		success: function success(data) {
			arg.success && arg.success(data);
			arg = null;
		},
		error: function error(xhr) {
			try {
				arg.error && arg.error(JSON.parse(xhr.responseText));
				arg = null;
			} catch (e) {
				arg.error && arg.error();
				arg = null;
			}
		}
	});
}

function getFileUrl(attachId, mediaType) {
	var config = _manager.YYIMChat.getConfig();
	if (attachId) {
		if (/^https?:\/\/|^data:image\/jpeg;/.test(attachId)) {
			return attachId;
		}
		var url = config.SERVLET.REST_RESOURCE_SERVLET + config.MULTI_TENANCY.ETP_KEY + '/' + config.MULTI_TENANCY.APP_KEY + '/download';
		return url + '?' + jQuery.param({
			attachId: attachId,
			downloader: _manager.YYIMChat.getUserNode(),
			token: _manager.YYIMChat.getToken(),
			mediaType: mediaType === 1 ? mediaType : 2
		});
	}
}

exports.getTransformFileList = getTransformFileList;
exports.getFileUrl = getFileUrl;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _manager = __webpack_require__(0);

var _Manager = __webpack_require__(42);

_manager.YYIMManager.prototype.multiPartyCall = function (arg) {
	if (typeof arg === 'undefined' || typeof arg.caller === 'undefined' || !YYIMArrayUtil.isArray(arg.phones) || !arg.phones.length) {
		arg.error && arg.error();
		return;
	}

	if (!YYIMRegExp.phone.test(arg.caller)) {
		arg.error && arg.error();
		return;
	}

	var phones = [];
	for (var x in arg.phones) {
		var phone = arg.phones[x].toString();
		if (YYIMRegExp.phone.test(phone)) {
			if (phones.indexOf(phone) === -1) {
				phones.push(phone);
				var tempCondition = phones.join(",");
				if (phones.length > _manager.YYIMChat.getConfig().MULTIPARTYCALL.PARTYMAXLENGTH || tempCondition.length > _manager.YYIMChat.getConfig().MULTIPARTYCALL.PHONESMAXLENGTH) {
					phones.pop();
					break;
				}
			}
		}
	}

	if (!phones.length) {
		arg.error && arg.error();
		return;
	}

	arg.caller = arg.caller.toString();
	arg.phones = phones;

	if (arg.accountMmanaged !== true) {
		arg.phones = phones.join(',');
		arg.account = arg.account ? arg.account : _manager.YYIMChat.getConfig().MULTIPARTYCALL.ACCOUNT;
		arg.key = arg.key ? arg.key : _manager.YYIMChat.getConfig().MULTIPARTYCALL.KEY;

		if (typeof arg.account === 'undefined' || typeof arg.key === 'undefined') {
			arg.error && arg.error();
			return;
		}
	}

	(0, _Manager.multiPartyCall)(arg);
};

_manager.YYIMManager.prototype.getTimeCorrection = function (callback) {
	(0, _Manager.getTimeCorrection)(callback);
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getTimeCorrection = exports.multiPartyCall = undefined;

var _stringify = __webpack_require__(1);

var _stringify2 = _interopRequireDefault(_stringify);

var _manager = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function multiPartyCall(arg) {

	if (arg.accountMmanaged === true) {
		var data = {
			etpId: _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY,
			appId: _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY,
			caller: arg.caller,
			phones: arg.phones,
			username: _manager.YYIMManager.getInstance().getUserNode() };

		jQuery.ajax({
			url: _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + 'voip/make?token=' + _manager.YYIMManager.getInstance().getToken(),
			type: 'post',
			data: (0, _stringify2.default)(data),
			dataType: 'json',
			cache: false,
			processData: false,
			contentType: "application/json",
			headers: {},
			success: arg.success,
			error: function error(xhr) {
				try {
					arg.error && arg.error(JSON.parse(xhr.responseText));
					arg = null;
				} catch (e) {
					arg.error && arg.error();
					arg = null;
				}
			}
		});
	} else {
		var timestamp = new Date().getTime();
		var data = {
			caller: arg.caller,
			phones: arg.phones,
			account_identify: arg.account,
			userId: _manager.YYIMManager.getInstance().getUserBareJID(),
			timestamp: timestamp,
			sign: hex_sha1(arg.account + arg.key + timestamp)
		};

		jQuery.ajax({
			url: _manager.YYIMChat.getConfig().MULTIPARTYCALL.ADDRESS,
			type: 'get',
			data: data,
			dataType: 'jsonp',
			cache: false,
			jsonp: 'callback',
			success: arg.success,
			error: function error(xhr) {
				try {
					arg.error && arg.error(JSON.parse(xhr.responseText));
					arg = null;
				} catch (e) {
					arg.error && arg.error();
					arg = null;
				}
			}
		});
	}
}

function getServerCorrection(arg) {
	var start,
	    end = 0;
	jQuery.ajax({
		url: _manager.YYIMChat.getConfig().SERVLET.REST_SYSTEM_SERVLET + 'time',
		type: 'get',
		cache: false,
		beforeSend: function beforeSend() {
			start = new Date().getTime();
		},
		success: function success(serverTime) {
			end = new Date().getTime();
			arg && arg.success && arg.success(serverTime - (start + end) / 2, end - start);
			arg = null;
		},
		error: function error(xhr) {
			try {
				arg.error && arg.error(JSON.parse(xhr.responseText));
				arg = null;
			} catch (e) {
				arg.error && arg.error();
				arg = null;
			}
		}
	});
}

var corrections = [];
function getTimeCorrection(callback) {
	if (_manager.YYIMChat.getConfig().TIMECORRECTION.LOAD) {
		callback && callback(_manager.YYIMChat.getConfig().TIMECORRECTION.RESULT);
	} else {
		getServerCorrection({
			success: function success(correct, intervcal) {
				if (intervcal < _manager.YYIMChat.getConfig().TIMECORRECTION.RESIDUAL) {
					_manager.YYIMChat.getConfig().TIMECORRECTION.LOAD = true;
					_manager.YYIMChat.getConfig().TIMECORRECTION.RESULT = Math.round(correct);
					return callback && callback(_manager.YYIMChat.getConfig().TIMECORRECTION.RESULT);;
				} else {
					corrections.push(correct);

					if (corrections.length < _manager.YYIMChat.getConfig().TIMECORRECTION.TIMES) {
						getTimeCorrection(callback);
					} else {
						var sum = 0;
						for (var x in corrections) {
							if (YYIMUtil['isWhateType'](corrections[x], 'Number')) {
								sum += corrections[x];
							}
						}
						corrections.length = 0;
						_manager.YYIMChat.getConfig().TIMECORRECTION.LOAD = true;
						_manager.YYIMChat.getConfig().TIMECORRECTION.RESULT = Math.round(sum / _manager.YYIMChat.getConfig().TIMECORRECTION.TIMES);
						callback && callback(_manager.YYIMChat.getConfig().TIMECORRECTION.RESULT);
					}
				}
			}
		});
	}
}

exports.multiPartyCall = multiPartyCall;
exports.getTimeCorrection = getTimeCorrection;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _manager = __webpack_require__(0);

var _Manager = __webpack_require__(44);

_manager.YYIMChat.setBackhander({
  'monitor': {
    'groupMonitor': _Manager.monitor
  },
  'initCallback': {
    'group': function group(options) {
      _manager.YYIMChat.onGroupUpdate = options.onGroupUpdate || function () {};
      _manager.YYIMChat.onTransferGroupOwner = options.onTransferGroupOwner || function () {};
      _manager.YYIMChat.onKickedOutGroup = options.onKickedOutGroup || function () {};
    }
  }
});

_manager.YYIMManager.prototype.getChatGroups = function (arg) {
  arg = arg || {};
  arg.startDate = YYIMUtil['isWhateType'](arg.startDate, 'Number') && arg.startDate > 0 ? arg.startDate : 0;
  arg.membersLimit = YYIMCommonUtil.isNumber(arg.membersLimit) && arg.membersLimit > 0 ? arg.membersLimit : _manager.YYIMChat.getConfig().GROUP.MEMBERSLIMIT;
  (0, _Manager.getChatGroups)(arg);
};

_manager.YYIMManager.prototype.queryChatGroup = function (arg) {
  if (YYIMCommonUtil.isStringAndNotEmpty(arg.keyword)) {
    (0, _Manager.queryChatGroup)(arg);
  } else {
    arg && arg.error && arg.error();
  }
};

_manager.YYIMManager.prototype.joinChatGroup = function (arg) {
  if (YYIMCommonUtil.isStringAndNotEmpty(arg.id)) {
    (0, _Manager.joinChatGroup)({
      jid: _manager.YYIMChat.getJIDUtil().buildChatGroupJID(_manager.YYIMChat.getJIDUtil().getNode(arg.id)),
      success: arg.success,
      error: arg.error
    });
  } else {
    arg && arg.error && arg.error();
  }
};

_manager.YYIMManager.prototype.getChatGroupInfo = function (arg) {
  if (YYIMCommonUtil.isStringAndNotEmpty(arg.id)) {
    (0, _Manager.getChatGroupInfo)({
      jid: _manager.YYIMChat.getJIDUtil().buildChatGroupJID(_manager.YYIMChat.getJIDUtil().getNode(arg.id)),
      membersLimit: YYIMCommonUtil.isNumber(arg.membersLimit) && arg.membersLimit > 0 ? arg.membersLimit : _manager.YYIMChat.getConfig().GROUP.MEMBERSLIMIT,
      success: arg.success,
      error: arg.error
    });
  } else {
    arg && arg.error && arg.error();
  }
};

_manager.YYIMManager.prototype.createChatGroup = function (arg) {
  if (!YYIMArrayUtil.isArray(arg.members)) {
    delete arg.members;
  }
  if (arg.members) {
    (0, _Manager.createChatGroup)(arg);
  } else {
    arg && arg.error && arg.error();
  }
};

_manager.YYIMManager.prototype.transferChatGroup = function (arg) {
  if (arg && typeof arg.newOwner == 'string' && arg.to) {
    arg.to = _manager.YYIMChat.getJIDUtil().buildChatGroupJID(_manager.YYIMChat.getJIDUtil().getNode(arg.to));
    (0, _Manager.transferChatGroup)(arg);
  } else {
    arg && arg.error && arg.error();
  }
};

_manager.YYIMManager.prototype.dismissChatGroup = function (arg) {
  if (arg && arg.to) {
    arg.to = _manager.YYIMChat.getJIDUtil().buildChatGroupJID(_manager.YYIMChat.getJIDUtil().getNode(arg.to));
    (0, _Manager.dismissChatGroup)(arg);
  } else {
    arg && arg.error && arg.error();
  }
};

_manager.YYIMManager.prototype.inviteGroupMember = function (arg) {
  if (arg.members && YYIMArrayUtil.isArray(arg.members) && arg.members.length && arg.to) {
    arg.to = _manager.YYIMChat.getJIDUtil().buildChatGroupJID(_manager.YYIMChat.getJIDUtil().getNode(arg.to));
    (0, _Manager.inviteGroupMember)(arg);
  } else {
    arg && arg.error && arg.error();
  }
};

_manager.YYIMManager.prototype.modifyChatGroupInfo = function (arg) {
  if (arg.name && arg.to) {
    arg.to = _manager.YYIMChat.getJIDUtil().buildChatGroupJID(_manager.YYIMChat.getJIDUtil().getNode(arg.to));
    (0, _Manager.modifyChatGroupInfo)(arg);
  } else {
    arg && arg.error && arg.error();
  }
};

_manager.YYIMManager.prototype.kickGroupMember = function (arg) {
  if (arg.member && typeof arg.member == 'string' && arg.to) {
    arg.to = _manager.YYIMChat.getJIDUtil().buildChatGroupJID(_manager.YYIMChat.getJIDUtil().getNode(arg.to));
    (0, _Manager.kickGroupMember)(arg);
  } else {
    arg && arg.error && arg.error();
  }
};

_manager.YYIMManager.prototype.exitChatGroup = function (arg) {
  if (arg.to) {
    arg.to = _manager.YYIMChat.getJIDUtil().buildChatGroupJID(_manager.YYIMChat.getJIDUtil().getNode(arg.to));
    (0, _Manager.exitChatGroup)(arg);
  } else {
    arg && arg.error && arg.error();
  }
};

_manager.YYIMManager.prototype.collectGroup = function (arg) {
  if (arg.to) {
    arg.to = _manager.YYIMChat.getJIDUtil().buildChatGroupJID(_manager.YYIMChat.getJIDUtil().getNode(arg.to));
    arg.type = this.getConstants().COLLECT_TYPE.ADD;
    (0, _Manager.collectChatGroup)(arg);
  } else {
    arg && arg.error && arg.error();
  }
};

_manager.YYIMManager.prototype.removeCollectGroup = function (arg) {
  if (arg.to) {
    arg.to = _manager.YYIMChat.getJIDUtil().buildChatGroupJID(_manager.YYIMChat.getJIDUtil().getNode(arg.to));
    arg.type = this.getConstants().COLLECT_TYPE.REMOVE;
    (0, _Manager.collectChatGroup)(arg);
  } else {
    arg && arg.error && arg.error();
  }
};

_manager.YYIMManager.prototype.getSharedFiles = function (arg) {
  if (arg && arg.id) {
    (0, _Manager.getSharedFiles)(arg);
  } else {
    arg && arg.error && arg.error();
  }
};

_manager.YYIMManager.prototype.getGroupMembers = function (arg) {
  if (arg && arg.id) {
    if (YYIMCommonUtil.isStringAndNotEmpty(arg.id)) {
      (0, _Manager.getGroupMembers)(arg);
    }
  } else {
    arg && arg.error && arg.error();
  }
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.collectChatGroup = exports.exitChatGroup = exports.kickGroupMember = exports.modifyChatGroupInfo = exports.inviteGroupMember = exports.getSharedFiles = exports.dismissChatGroup = exports.transferChatGroup = exports.createChatGroup = exports.getChatGroups = exports.getChatGroupInfo = exports.joinChatGroup = exports.getGroupMembers = exports.queryChatGroup = exports.monitor = undefined;

var _manager = __webpack_require__(0);

function getChatGroups(arg) {
	var config = _manager.YYIMChat.getConfig();
	jQuery.ajax({
		url: config.SERVLET.REST_USER_SERVLET + config.MULTI_TENANCY.ETP_KEY + '/' + config.MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMChat.getUserID() + '/room/contacts/increment?timestamp=' + arg.startDate + '&token=' + _manager.YYIMChat.getToken() + '&membersLimit=' + arg.membersLimit,
		type: 'get',
		dataType: 'json',
		cache: false,
		success: function success(chatGroupList) {
			if (!!chatGroupList) {
				chatGroupList.roomItems = chatGroupList.roomItems || [];
				chatGroupList.roomNames = chatGroupList.roomNames || [];
				chatGroupList.leftRooms = chatGroupList.leftRooms || [];

				var i = chatGroupList.roomItems.length || 0;
				while (i--) {
					chatGroupList.roomItems[i] = handleChatGroup(chatGroupList.roomItems[i]);
				}

				var j = chatGroupList.roomNames.length || 0;
				while (j--) {
					chatGroupList.roomNames[j] = _manager.YYIMChat.getJIDUtil().getID(chatGroupList.roomNames[j]);
				}

				var z = chatGroupList.leftRooms.length || 0;
				while (z--) {
					chatGroupList.leftRooms[z] = _manager.YYIMChat.getJIDUtil().getID(chatGroupList.leftRooms[z]);
				}
			}
			arg.success && arg.success(chatGroupList || {});
			arg = null;
		},
		error: function error(xhr) {
			try {
				arg.error && arg.error(JSON.parse(xhr.responseText));
				arg = null;
			} catch (e) {
				arg.error && arg.error();
				arg = null;
			}
		}
	});
}

function queryChatGroup(arg) {
	var iqBody = {
		start: YYIMCommonUtil.isNumber(arg.start) ? arg.start : 0,
		size: YYIMCommonUtil.isNumber(arg.size) ? arg.size : 20,
		search: arg.keyword
	};
	_manager.YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.QUERY_CHATGROUP.SEND), function (queryResult, _arg) {
		var items = queryResult.items || [],
		    i = items.length;
		while (i--) {
			var item = items[i];
			items[i].id = _manager.YYIMChat.getJIDUtil().getID(item.jid);
			items[i].name = items[i].name || items[i].id;
		}
		_arg.complete && _arg.complete();
		_arg.success && _arg.success({
			start: queryResult.start,
			total: queryResult.total,
			items: items
		});
	}, arg);
}

function joinChatGroup(arg) {
	var presenceBody = {
		to: arg.jid + "/" + _manager.YYIMChat.getUserNode()
	};

	_manager.YYIMChat.getConnection().send(new JumpPacket(presenceBody, OPCODE.CHATGROUP.SEND), function (joinResult, _arg) {
		if (joinResult && joinResult.code == '40301') {
			_arg.error && _arg.error({
				code: joinResult.code,
				message: joinResult.message
			});
		} else if (joinResult) {
			joinResult.id = _manager.YYIMChat.getJIDUtil().getID(joinResult.from);
			_arg.success && _arg.success(joinResult);
		}
	}, arg);
}

function getChatGroupInfo(arg) {
	var config = _manager.YYIMChat.getConfig();
	jQuery.ajax({
		url: config.SERVLET.REST_USER_SERVLET + config.MULTI_TENANCY.ETP_KEY + '/' + config.MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMChat.getUserID() + '/room/info?membersLimit=' + arg.membersLimit + '&mucId=' + arg.jid + '&token=' + _manager.YYIMChat.getToken(),
		type: 'get',
		dataType: 'json',
		cache: false,
		success: function success(result) {
			var group = handleChatGroup(result);
			arg.success && arg.success(group);
			arg = null;
		},
		error: function error(xhr) {
			try {
				arg.error && arg.error(JSON.parse(xhr.responseText));
				arg = null;
			} catch (e) {
				arg.error && arg.error();
				arg = null;
			}
		}
	});
}

function createChatGroup(arg) {
	var iqBody = {
		id: Math.uuid(),
		to: arg.to,
		naturalLanguageName: arg.name,
		from: _manager.YYIMChat.getUserBareJID(),
		invitees: arg.members
	};

	_manager.YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.CREATE_GROUP.SEND), function (result, _arg) {
		_arg.complete && _arg.complete();
		_arg.success && _arg.success(handleChatGroup(result));
	}, arg);
}

function transferChatGroup(arg) {
	var iqBody = {
		id: Math.uuid(),
		to: arg.to,
		from: _manager.YYIMChat.getUserBareJID(),
		newOwner: arg.newOwner
	};

	_manager.YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.TRANSFER_GROUP.SEND), function (result, _arg) {
		_arg.complete && _arg.complete();
		_arg.success && _arg.success(transferChatGroupOwner(result));
	}, arg);
}

function dismissChatGroup(arg) {
	var iqBody = {
		id: Math.uuid(),
		to: arg.to,
		from: _manager.YYIMChat.getUserBareJID()
	};

	_manager.YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.DISMISS_GROUP.SEND), function (result, _arg) {
		_arg.complete && _arg.complete();
		_arg.success && _arg.success({
			id: result.id,
			from: _manager.YYIMChat.getJIDUtil().getID(result.from),
			to: _manager.YYIMChat.getJIDUtil().getID(result.to)
		});
	}, arg);
}

function inviteGroupMember(arg) {
	var iqBody = {
		id: Math.uuid(),
		to: arg.to,
		from: _manager.YYIMChat.getUserBareJID(),
		invitees: arg.members
	};

	_manager.YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.INVITE_GROUP_MEMBER.SEND), function (result, _arg) {
		_arg.complete && _arg.complete();
		_arg.success && _arg.success(handleChatGroup(result));
	}, arg);
}

function modifyChatGroupInfo(arg) {
	var iqBody = {
		id: Math.uuid(),
		naturalLanguageName: arg.name,
		from: _manager.YYIMChat.getUserBareJID(),
		to: arg.to
	};

	_manager.YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.MODIFY_GROUP_INFO.SEND), function (result, _arg) {
		_arg.complete && _arg.complete();
		_arg.success && _arg.success(handleChatGroup(result));
	}, arg);
}

function kickGroupMember(arg) {
	var iqBody = {
		id: Math.uuid(),
		member: arg.member,
		from: _manager.YYIMChat.getUserBareJID(),
		to: arg.to
	};

	_manager.YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.KICK_GROUP_MEMBER.SEND), function (result, _arg) {
		_arg.complete && _arg.complete();
		_arg.success && _arg.success(handleChatGroup(result));
	}, arg);
}

function exitChatGroup(arg) {
	var iqBody = {
		id: Math.uuid(),
		from: _manager.YYIMChat.getUserBareJID(),
		to: arg.to
	};

	_manager.YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.EXIT_GROUP.SEND), function (result, _arg) {
		_arg.complete && _arg.complete();
		_arg.success && _arg.success({
			from: _manager.YYIMChat.getJIDUtil().getID(result.from),
			id: result.id,
			to: _manager.YYIMChat.getJIDUtil().getID(result.to)
		});
	}, arg);
}

function handleChatGroup(result) {
	if (!result) {
		return;
	}

	var j = result.members.length;
	var members = [];
	while (j--) {
		var member = result.members[j];
		member.id = _manager.YYIMChat.getJIDUtil().getID(member.jid);
		members.push(member);
	}
	var chatGroup = {
		id: _manager.YYIMChat.getJIDUtil().getID(result.from || result.jid),
		name: result.naturalLanguageName || result.roomname || result.name,
		photo: result.photo,
		numberOfMembers: result.numberOfMembers,
		superLarge: result.superLarge,
		collected: result.collected,
		type: result.type,
		safeModel: result.safeModel,
		creationdate: result.creationdate,
		creater: _manager.YYIMChat.getJIDUtil().getID(result.operator),
		members: members,
		owners: result.owners,
		tag: result.tag
	};
	return chatGroup;
}

function transferChatGroupOwner(result) {
	if (!result) {
		return;
	}

	var j = result.memberItems.length;
	var members = [];
	while (j--) {
		var member = result.memberItems[j];
		member.id = _manager.YYIMChat.getJIDUtil().getID(member.jid);
		members.push(member);
	}
	var chatGroup = {
		id: _manager.YYIMChat.getJIDUtil().getID(result.from),
		members: members
	};
	return chatGroup;
}

function collectChatGroup(arg) {
	var iqBody = {
		id: Math.uuid(),
		from: _manager.YYIMChat.getUserBareJID(),
		to: arg.to,
		type: arg.type
	};

	_manager.YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.COLLECT_GROUP.SEND), function (result, _arg) {
		_arg.complete && _arg.complete();
		_arg.success && _arg.success({
			from: _manager.YYIMChat.getJIDUtil().getID(_arg.to),
			id: result.id,
			to: _manager.YYIMChat.getUserID(),
			type: _arg.type,
			code: result.code,
			message: result.message
		});
	}, arg);
}

function getSharedFiles(arg) {
	var contacts = _manager.YYIMChat.getConstants();
	var config = _manager.YYIMChat.getConfig();
	var type = [contacts.CHAT_TYPE.CHAT, contacts.CHAT_TYPE.GROUP_CHAT, contacts.CHAT_TYPE.PUB_ACCOUNT].indexOf(arg.type) > -1 ? arg.type : contacts.CHAT_TYPE.CHAT;

	var url = config.SERVLET.REST_USER_SERVLET + config.MULTI_TENANCY.ETP_KEY + '/' + config.MULTI_TENANCY.APP_KEY + '/shareattachment/persional/attachment/' + _manager.YYIMChat.getUserID() + '/' + arg.id;
	if (type == contacts.CHAT_TYPE.GROUP_CHAT) {
		url = config.SERVLET.REST_USER_SERVLET + config.MULTI_TENANCY.ETP_KEY + '/' + config.MULTI_TENANCY.APP_KEY + '/shareattachment/room/attachment/' + arg.id + '/' + _manager.YYIMChat.getUserID();
	}

	jQuery.ajax({
		url: url,
		data: {
			token: _manager.YYIMChat.getToken(),
			fileType: ['file', 'image', 'microvideo'].indexOf(arg.fileType) > -1 ? arg.fileType : 'file',
			start: parseInt(arg.start) || 0,
			size: parseInt(arg.size) || 20
		},
		type: 'get',
		dataType: 'json',
		cache: false,
		success: function success(data) {
			var items = data.list || [];
			i = items.length;
			while (i--) {
				var item = items[i];
				item.id = item.packetId;
				item.creator = _manager.YYIMChat.getJIDUtil().getID(item.creator);
				item.owner = [];
				if (type == _manager.YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT) {
					item.owner.push({
						id: _manager.YYIMChat.getJIDUtil().getID(item.ownerId),
						type: type
					});
				} else {
					var temp = item.ownerId.split('::');
					temp[0] = _manager.YYIMChat.getJIDUtil().getID(temp[0]);
					temp[1] = _manager.YYIMChat.getJIDUtil().getID(temp[1]);
					item.owner.push({
						id: temp[0],
						type: type
					}, {
						id: temp[1],
						type: type
					});
				}
				delete item.ownerId;
			}
			arg.success && arg.success(data);
			arg = null;
		},
		error: function error(xhr) {
			try {
				arg.error && arg.error(JSON.parse(xhr.responseText));
				arg = null;
			} catch (e) {
				arg.error && arg.error();
				arg = null;
			}
		}
	});
}

function getGroupMembers(arg) {
	var config = _manager.YYIMChat.getConfig();
	jQuery.ajax({
		url: config.SERVLET.REST_USER_SERVLET + config.MULTI_TENANCY.ETP_KEY + '/' + config.MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMChat.getUserID() + '/room/members?mucId=' + arg.id + '&token=' + _manager.YYIMChat.getToken(),
		type: 'get',
		dataType: 'json',
		cache: false,
		success: function success(result) {
			if (result && result.length) {
				var index = result.length;
				while (index--) {
					result[index].id = _manager.YYIMChat.getJIDUtil().getID(result[index].jid);
				}
			}
			arg.success && arg.success(result || []);
			arg = null;
		},
		error: function error() {
			try {
				arg.error && arg.error(JSON.parse(xhr.responseText));
				arg = null;
			} catch (e) {
				arg.error && arg.error();
				arg = null;
			}
		}
	});
}

function monitor() {
	_manager.YYIMChat.getConnection().registerHandler(OPCODE.ON_GROUP_UPDATE.KEY, function (packet) {
		var chatgroup = handleChatGroup(packet);
		if (chatgroup) {
			_manager.YYIMChat.onGroupUpdate(chatgroup);
		}
	});

	_manager.YYIMChat.getConnection().registerHandler(OPCODE.ON_GROUP_TRANSFER.KEY, function (packet) {
		var chatgroup = transferChatGroupOwner(packet);
		if (chatgroup) {
			_manager.YYIMChat.onTransferGroupOwner(chatgroup);
		}
	});

	_manager.YYIMChat.getConnection().registerHandler(OPCODE.KICKED_GROUP.KEY, function (packet) {
		var result = {
			id: packet.id,
			from: _manager.YYIMChat.getJIDUtil().getID(packet.from),
			to: _manager.YYIMChat.getJIDUtil().getID(packet.to)
		};
		if (result) {
			_manager.YYIMChat.onKickedOutGroup(result);
		}
	});
}

exports.monitor = monitor;
exports.queryChatGroup = queryChatGroup;
exports.getGroupMembers = getGroupMembers;
exports.joinChatGroup = joinChatGroup;
exports.getChatGroupInfo = getChatGroupInfo;
exports.getChatGroups = getChatGroups;
exports.createChatGroup = createChatGroup;
exports.transferChatGroup = transferChatGroup;
exports.dismissChatGroup = dismissChatGroup;
exports.getSharedFiles = getSharedFiles;
exports.inviteGroupMember = inviteGroupMember;
exports.modifyChatGroupInfo = modifyChatGroupInfo;
exports.kickGroupMember = kickGroupMember;
exports.exitChatGroup = exitChatGroup;
exports.collectChatGroup = collectChatGroup;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _manager = __webpack_require__(0);

var _Manager = __webpack_require__(46);

_manager.YYIMChat.setBackhander({
	'monitor': {
		'inputStateMonitor': _Manager.monitor
	}
});

_manager.YYIMManager.prototype.inputStateChange = function (arg) {
	if (arg && arg.to) {
		arg.contentType = arg.contentType || _manager.YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.TEXT;
		(0, _Manager.inputStateChange)(arg);
	} else {
		arg && arg.error && arg.error();
	}
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.inputStateChange = exports.monitor = undefined;

var _manager = __webpack_require__(0);

function monitor() {
	_manager.YYIMChat.getConnection().registerHandler(OPCODE.INPUT_STATE.KEY, function (state) {
		if (state && state.from) {
			state.from = _manager.YYIMChat.getJIDUtil().getID(state.from);
		}
		if (state && state.to) {
			state.to = _manager.YYIMChat.getJIDUtil().getID(state.to);
		}
		onInputStateChanged(state);
	});
}

var onInputState = {};
function onInputStateChanged(arg) {
	onInputState[arg.from] = onInputState[arg.from] || {
		timer: 0,
		param: arg
	};

	onInputState[arg.from].param = arg;

	if (onInputState[arg.from].timer) {
		clearTimeout(onInputState[arg.from].timer);
		onInputState[arg.from].timer = 0;
	}

	if (arg.typing == 0) {
		var param = onInputState[arg.from].param;
		onInputState[arg.from] = null;
		_manager.YYIMChat.onInputStateChanged(param);
	} else {
		_manager.YYIMChat.onInputStateChanged(onInputState[arg.from].param);
		onInputState[arg.from].timer = setTimeout(function () {
			var param = onInputState[arg.from].param;
			param.typing = 0;
			onInputState[arg.from] = null;
			_manager.YYIMChat.onInputStateChanged(param);
		}, onInputState[arg.from].param.timeout || _manager.YYIMChat.getConfig().INPUT_STATE.INTERVAL);
	}
}

function sendInputState(arg) {
	var msgBody = {
		"id": Math.uuid(),
		"to": _manager.YYIMChat.getJIDUtil().buildUserJID(_manager.YYIMChat.getJIDUtil().getNode(arg.to)),
		"contentType": arg.contentType,
		"typing": arg.typing
	};

	_manager.YYIMChat.getConnection().send(new JumpPacket(msgBody, OPCODE.INPUT_STATE.SEND));
}

var inputState = {};
function inputStateChange(arg) {
	inputState[arg.to] = inputState[arg.to] || {
		timer: 0,
		param: arg,
		lastUpdateTime: 0,
		lastSendTime: 0
	};

	if (inputState[arg.to].timer) {
		clearTimeout(inputState[arg.to].timer);
		inputState[arg.to].timer = 0;
	}

	inputState[arg.to].lastUpdateTime = new Date().getTime();

	if (inputState[arg.to].lastUpdateTime - inputState[arg.to].lastSendTime > _manager.YYIMChat.getConfig().INPUT_STATE.INTERVAL || arg.contentType != inputState[arg.to].param.contentType) {

		inputState[arg.to].param = arg;
		inputState[arg.to].param.typing = 1;
		inputState[arg.to].lastSendTime = inputState[arg.to].lastUpdateTime;
		sendInputState(inputState[arg.to].param);
	}

	inputState[arg.to].timer = setTimeout(function () {
		var param = inputState[arg.to].param;
		param.typing = 0;
		inputState[arg.to] = null;

		sendInputState(param);
	}, _manager.YYIMChat.getConfig().INPUT_STATE.INTERVAL);
}

exports.monitor = monitor;
exports.inputStateChange = inputStateChange;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _manager = __webpack_require__(0);

var _Manager = __webpack_require__(48);

_manager.YYIMChat.setBackhander({
	'monitor': {
		'messageMonitor': _Manager.monitor
	},
	'initCallback': {
		'message': function message(options) {
			_manager.YYIMChat.onReceipts = options.onReceipts || function () {};
			_manager.YYIMChat.onMessage = options.onMessage || function () {};
			_manager.YYIMChat.onTransparentMessage = options.onTransparentMessage || function () {};
		}
	}
});

_manager.YYIMManager.prototype.getHistoryMessage = function (arg) {
	arg = arg || {};

	if (!YYIMUtil['isWhateType'](arg.start, 'Number')) {
		arg.start = 0;
	}

	if (!YYIMUtil['isWhateType'](arg.size, 'Number')) {
		arg.size = 100;
	}

	(0, _Manager.getHistoryMessage)(arg);
};

_manager.YYIMManager.prototype.sendReadedReceiptsPacket = function (arg) {
	if (arg && arg.id) {
		arg.state = 2;
		(0, _Manager.sendReceiptsPacket)(arg);
	}
};

_manager.YYIMManager.prototype.sendTextMessage = function (arg) {
	arg.content = arg.msg || arg.content;
	arg.contentType = _manager.YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.TEXT;
	this.sendMessage(arg);
};

_manager.YYIMManager.prototype.sendPic = function (arg) {
	arg = arg || {};
	if (YYIMUtil['isWhateType'](arg.chatInfo, 'Function')) {
		this.uploader(jQuery('#' + arg.fileInputId)[0] || arg.fileInputId, {
			drop_element: arg.drop_element,
			chatInfo: arg.chatInfo,
			fileFiltered: arg.fileFiltered,
			beforeUpload: arg.beforeUpload,
			mediaType: 1,
			success: function success(result) {
				(0, _Manager.sendMessage)({
					id: result.chatInfo.messageId || Math.uuid(),
					spaceId: result.chatInfo.spaceId,
					body: {
						extend: result.chatInfo.extend,
						content: new IMFile({
							id: result.file.id,
							name: result.file.name,
							path: result.data && result.data.attachId,
							size: result.file.size,
							original: 1
						}),
						contentType: _manager.YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.IMAGE
					},
					to: result.chatInfo.to,
					type: result.chatInfo.type,
					success: function success(data) {
						arg.success && arg.success(data);
					}
				});
				arg.fileUploaded && arg.fileUploaded(result);
			},
			error: arg.error,
			progress: arg.progress
		});
	} else {
		arg && arg.error && arg.error();
	}
};

_manager.YYIMManager.prototype.sendFile = function (arg) {
	var that = this;
	arg = arg || {};
	if (YYIMUtil['isWhateType'](arg.chatInfo, 'Function')) {
		this.uploader(jQuery('#' + arg.fileInputId)[0] || arg.fileInputId, {
			drop_element: arg.drop_element,
			chatInfo: arg.chatInfo,
			fileFiltered: arg.fileFiltered,
			beforeUpload: arg.beforeUpload,
			mediaType: 3,
			success: function success(result) {
				var mediaType = 3;

				if (_manager.YYIMChat.getConfig().UPLOAD.IMAGE_TYPES.test(result.file.name)) {
					mediaType = 1;
				}

				var file = new IMFile({
					id: result.file.id,
					name: result.file.name,
					path: result.data && result.data.attachId,
					size: result.file.size
				});

				if (mediaType === 1) {
					file.build({
						original: 1
					});
				}

				if (result && result['data'] && result['data']['data'] && result['data']['data']['fileUrl']) {
					file.build({
						path: result['data']['data']['fileUrl'],
						fid: result['data']['data']['fid']
					});
				}

				if (YYIMUtil['isWhateType'](result['data'], 'Array')) {
					file = new IMFile({
						id: result.file.id,
						name: result.file.name,
						path: result['data'][4],
						size: result.file.size,
						fid: result['data'][0]
					});
				}

				(0, _Manager.sendMessage)({
					id: result.chatInfo.messageId || Math.uuid(),
					spaceId: result.chatInfo.spaceId,
					body: {
						extend: result.chatInfo.extend,
						content: file,
						contentType: mediaType === 1 ? that.getConstants().MESSAGE_CONTENT_TYPE.IMAGE : that.getConstants().MESSAGE_CONTENT_TYPE.FILE
					},
					to: result.chatInfo.to,
					type: result.chatInfo.type,
					success: function success(data) {
						arg.success && arg.success(data);
					}
				});

				arg.fileUploaded && arg.fileUploaded(result);
			},
			error: arg.error,
			progress: arg.progress
		});
	} else {
		arg && arg.error && arg.error();
	}
};

_manager.YYIMManager.prototype.sendShareMessage = function (arg) {
	arg.contentType = _manager.YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.SHARE;
	this.sendMessage(arg);
};

_manager.YYIMManager.prototype.sendFormMessage = function (arg) {
	var that = this;
	var file = arg.file;

	var param = {
		token: this.getToken(),
		creator: this.getUserNode(),
		receiver: this.getJIDUtil().getNode(arg.to),
		mediaType: arg.mediaType || 2,
		randomId: Math.uuid(),
		name: file.name,
		size: file.size
	};
	var url = _manager.YYIMChat.getConfig().SERVLET.REST_RESOURCE_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/upload';
	url += '?' + jQuery.param(param);

	jQuery.ajax({
		xhr: function xhr() {
			var xhr = new window.XMLHttpRequest();

			xhr.upload.addEventListener("progress", function (evt) {
				if (evt.lengthComputable) {
					var percentComplete = evt.loaded / evt.total;
					arg.progress && arg.progress({
						loaded: evt.loaded,
						total: evt.total,
						percent: percentComplete
					});
				}
			}, false);

			xhr.addEventListener("progress", function (evt) {
				if (evt.lengthComputable) {
					var percentComplete = evt.loaded / evt.total;
					arg.progress && arg.progress({
						loaded: evt.loaded,
						total: evt.total,
						percent: percentComplete
					});
				}
			}, false);
			return xhr;
		},
		url: url,
		type: 'post',
		dataType: 'json',
		data: arg.data,
		processData: false,
		contentType: false,
		success: function success(result) {
			if (result && result.attachId) {
				var CONTENT_TYPE = _manager.YYIMChat.getConstants().MESSAGE_CONTENT_TYPE;
				arg.fileUploaded && arg.fileUploaded(result);
				that.sendMessage({
					id: arg.id,
					to: arg.to,
					spaceId: arg.spaceId,
					type: arg.type,
					content: new IMFile({
						name: file.name,
						path: result.attachId,
						size: file.size,
						original: param.mediaType === 1 ? 1 : null
					}),
					contentType: param.mediaType === 1 ? CONTENT_TYPE.IMAGE : CONTENT_TYPE.FILE,
					success: arg.success,
					error: arg.error
				});
			} else {
				arg.error && arg.error();
			}
			arg = null;
		},
		error: arg.error
	});
};

_manager.YYIMManager.prototype.sendMessage = function (arg) {
	arg.id = arg.id || Math.uuid();
	arg.type = arg.type || _manager.YYIMChat.getConstants().CHAT_TYPE.CHAT;
	arg.body = {
		dateline: arg.dateline,
		extend: arg.extend,
		content: arg.content,
		contentType: arg.contentType,
		sceneParams: arg.sceneParams
	};

	if (arg.type === _manager.YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT && YYIMArrayUtil.isArray(arg.atuser)) {
		arg.body.atuser = arg.atuser;
	}

	(0, _Manager.sendMessage)(arg);
};

_manager.YYIMManager.prototype.revokeMessage = function (arg) {
	if (arg && arg.id) {
		(0, _Manager.revokeMessage)(arg);
	} else {
		arg && arg.error && arg.error();
	}
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.sendReceiptsPacket = exports.revokeMessage = exports.getHistoryMessage = exports.sendMessage = exports.monitor = undefined;

var _stringify = __webpack_require__(1);

var _stringify2 = _interopRequireDefault(_stringify);

var _YYAIAbility = __webpack_require__(14);

var _YYAIAbility2 = _interopRequireDefault(_YYAIAbility);

var _manager = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var receivedMsgIds = new BaseList();

function monitor() {
	_manager.YYIMChat.getConnection().registerHandler(OPCODE.USER_MESSAGE.KEY, function (packet) {
		parseMessage(packet, _manager.YYIMChat.getConstants().CHAT_TYPE.CHAT);
	});

	_manager.YYIMChat.getConnection().registerHandler(OPCODE.CHATGROUP_MESSAGE.KEY, function (packet) {
		parseMessage(packet, _manager.YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT);
	});

	_manager.YYIMChat.getConnection().registerHandler(OPCODE.PUBACCOUNT_MESSAGE.KEY, function (packet) {
		parseMessage(packet, _manager.YYIMChat.getConstants().CHAT_TYPE.PUB_ACCOUNT);
	});

	_manager.YYIMChat.getConnection().registerHandler(OPCODE.RECEIPTS.KEY, function (receipts) {
		receipts.type = _manager.YYIMChat.getJIDUtil().getChatTypeByJid(receipts.to);
		receipts.from = _manager.YYIMChat.getJIDUtil().getID(receipts.from);
		receipts.to = _manager.YYIMChat.getJIDUtil().getID(receipts.to);

		_manager.YYIMChat.onReceipts(receipts);
	});

	_manager.YYIMChat.getConnection().registerHandler(OPCODE.SYNC_MESSAGE.KEY, function (packet) {
		parseMessage(packet, packet.type);
	});

	_manager.YYIMChat.getConnection().registerHandler(OPCODE.USERONLINEDELIVERPACKET.KEY, function (packet) {
		parseTransparentMessage(packet, _manager.YYIMChat.getConstants().CHAT_TYPE.CHAT);
	});

	_manager.YYIMChat.getConnection().registerHandler(OPCODE.MUCONLINEDELIVERPACKET.KEY, function (packet) {
		parseTransparentMessage(packet, _manager.YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT);
	});

	_manager.YYIMChat.getConnection().registerHandler(OPCODE.PUBONLINEDELIVERPACKET.KEY, function (packet) {
		parseTransparentMessage(packet, _manager.YYIMChat.getConstants().CHAT_TYPE.PUB_ACCOUNT);
	});

	_manager.YYIMChat.getConnection().registerHandler(OPCODE.REMINDSETTINGONLINEDELIVERPACKET.KEY, function (packet) {
		parseTransparentMessage(packet);
	});
};

function parseTransparentMessage(packet, type) {
	if (receivedMsgIds.get(packet.id)) {
		return;
	}
	receivedMsgIds.set(packet.id, packet);

	packet.type = type || _manager.YYIMChat.getJIDUtil().getChatTypeByJid(packet.from);

	packet.to = _manager.YYIMChat.getJIDUtil().getID(packet.to) || _manager.YYIMChat.getUserID();

	packet.from = packet.type != _manager.YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT ? _manager.YYIMChat.getJIDUtil().getID(packet.from) : {
		room: _manager.YYIMChat.getJIDUtil().getID(packet.from),
		roster: _manager.YYIMChat.getJIDUtil().getID(_manager.YYIMChat.getJIDUtil().getResource(packet.from))
	};

	if (packet.attributes) {
		if (packet.attributes.receiver) {
			packet.attributes.receiver = _manager.YYIMChat.getJIDUtil().getID(packet.attributes.receiver);
		}

		if (packet.attributes.bareJID) {
			packet.attributes.bareJID = {
				id: _manager.YYIMChat.getJIDUtil().getID(packet.attributes.bareJID),
				type: _manager.YYIMChat.getJIDUtil().getChatTypeByJid(packet.attributes.bareJID)
			};
		}

		if (packet.attributes.userJids && _manager.YYIMChat.getUtil()['isWhateType'](packet.attributes.userJids, 'Array')) {
			for (var x in packet.attributes.userJids) {
				if (packet.attributes.userJids.hasOwnProperty(x)) {
					packet.attributes.userJids[x] = _manager.YYIMChat.getJIDUtil().getID(packet.attributes.userJids[x]);
				}
			}
		}
	}
	try {
		_manager.YYIMChat.onTransparentMessage(packet);
	} catch (e) {
		_manager.YYIMChat.log("TransparentMessHandleError:", 0, packet);
	}
}

function parseMessageBody(packet, type) {

	var packetContent;
	try {
		packetContent = JSON.parse(packet.content);

		if (packetContent && packetContent.content) {
			try {
				if (isNaN(Number(packetContent.content)) && packet.contentType != _manager.YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.TEXT) {
					packetContent.content = JSON.parse(packetContent.content);
				}
			} catch (e) {}
		}
	} catch (e) {
		packetContent = packet.content;
	}

	var content = packetContent;

	if (typeof packetContent.content != 'undefined') {
		content = packetContent.content;
	}

	var body = {
		content: content,
		contentType: packet.contentType,
		dateline: packet.dateline || packet.ts,
		atuser: packetContent.atuser,
		extend: packetContent.extend };

	if (packet.contentType == _manager.YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.MERGEFORWARD) {
		body.title = packetContent.title;
		body.containfileNum = packetContent.containfileNum;
		body.safeMode = packetContent.safeMode;

		if (packetContent.messages) {
			body.messages = [];
			for (var x in packetContent.messages) {
				if (packetContent.messages.hasOwnProperty(x)) {
					var item = arguments.callee(packetContent.messages[x], type);
					if (item) {
						body.messages.push(item);
					}
				}
			}
		}
	}

	var from = type == _manager.YYIMChat.getConstants().CHAT_TYPE.CHAT ? _manager.YYIMChat.getJIDUtil().getID(packet.sender || packet.from) : {
		room: _manager.YYIMChat.getJIDUtil().getID(packet.mucid || packet.sender || packet.from),
		roster: _manager.YYIMChat.getJIDUtil().getID(_manager.YYIMChat.getJIDUtil().getResource(packet.sender || packet.from) || packet.sender)
	};

	var result = {
		id: packet.id || packet.packetId,
		type: type,
		from: from,
		dateline: body.dateline,
		sessionVersion: packet.sessionVersion,
		data: body
	};

	if (type == _manager.YYIMChat.getConstants().CHAT_TYPE.CHAT) {
		result.resource = _manager.YYIMChat.getJIDUtil().getResource(packet.sender || packet.from);
		result.to = _manager.YYIMChat.getJIDUtil().getID(packet.receiver || packet.to);
	} else {
		result.to = _manager.YYIMChat.getUserID();
	}

	if (body.contentType) {
		if (result.data.content && result.data.content.path) {
			result.data.content.attachId = result.data.content.path;
			result.data.content.path = _manager.YYIMChat.getFileUrl(result.data.content.path);

			if (body.contentType == _manager.YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.FILE || body.contentType == _manager.YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.IMAGE) {
				result.data.content.size = result.data.content.size || 0;
			}
		}

		if (result.data && (packet.receipts === true || _manager.YYIMChat.getJIDUtil().getID(packet.sender || packet.from) != _manager.YYIMChat.getUserID())) {

			result.data.receipt = {
				to: packet.mucid || packet.sender || packet.from,
				id: packet.id || packet.packetId,
				type: type,
				sessionVersion: packet.sessionVersion
			};

			if (packet.receipts === true) {
				sendReceiptsPacket(result.data.receipt);
			}
		}
		return result;
	}
}

function parseMessage(packet, type) {
	if (receivedMsgIds.get(packet.id)) {
		return;
	}
	receivedMsgIds.set(packet.id, packet);

	var message = parseMessageBody(packet, type);

	if (message) {
		try {
			_manager.YYIMChat.onMessage(message);
		} catch (e) {
			_manager.YYIMChat.log("ParseMessageError:", 0, message, e);
		}
	}
}

function handleRequestParams(body) {
	var messageExtend = {
		intelligentAnalysis: {}
	};

	if (body.contentType && body.contentType == _manager.YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.TEXT) {
		if (body.extend && typeof body.extend != 'string') {
			messageExtend = body.extend;
		}
		if (_YYAIAbility2.default.intelligentAnalysis(body.content)) {
			messageExtend.intelligentAnalysis.intelligentable = true;
			if (body.sceneParams) {
				messageExtend.intelligentAnalysis.params = body.sceneParams;
				delete body.sceneParams;
			}
		}
	}
	return messageExtend;
}

function handleSendMessage(arg, body, receipts) {
	var result = {
		id: arg.id,
		type: arg.type,
		sessionVersion: receipts.sessionVersion || 0,
		data: {
			content: body.content,
			contentType: body.contentType,
			dateline: receipts.dateline,
			extend: body.extend
		}
	};

	if (result.type != _manager.YYIMChat.getConstants().CHAT_TYPE.CHAT) {
		result.to = _manager.YYIMChat.getUserID();
		result.from = {
			room: _manager.YYIMChat.getJIDUtil().getID(arg.to),
			roster: _manager.YYIMChat.getUserID()
		};
	} else {
		result.to = _manager.YYIMChat.getJIDUtil().getID(arg.to);
		result.from = _manager.YYIMChat.getUserID();
		result.resource = _manager.YYIMChat.getResource();
	}

	if (result.data.content.path) {
		result.data.content.attachId = result.data.content.path;
		result.data.content.path = _manager.YYIMChat.getFileUrl(result.data.content.path);
	}
	return result;
}

function sendMessage(arg) {
	var body = arg.body || {};

	body.extend = handleRequestParams(body);

	if (body.extend && typeof body.extend != 'string') {
		try {
			body.extend = (0, _stringify2.default)(body.extend);
		} catch (e) {
			delete body.extend;
			_manager.YYIMChat.log('ExtendIllegal', 0, e.message);
		}
	}

	var to,
	    msgBody = {
		id: arg.id,
		spaceId: arg.spaceId,
		type: arg.type || _manager.YYIMChat.getConstants().CHAT_TYPE.CHAT,
		contentType: body.contentType || _manager.YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.TEXT,
		dateline: body.dateline || (_manager.YYIMChat.getConfig().TIMECORRECTION.AUTOCORRECTION ? new Date().getTime() + _manager.YYIMChat.getConfig().TIMECORRECTION.RESULT : new Date().getTime()),
		content: (0, _stringify2.default)({
			atuser: body.atuser,
			extend: body.extend,
			content: body.content
		})
	},
	    opcode = OPCODE.USER_MESSAGE.SEND;

	if ((!body.contentType || body.contentType == _manager.YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.TEXT) && arg.type == _manager.YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT) {
		if (YYIMUtil['isWhateType'](body.atuser, 'Array') && body.atuser.length) {
			if (body.atuser.indexOf('im_atall') != -1) {
				msgBody.statRead = 1;
			} else {
				msgBody.statRead = 2;
				msgBody.statMem = body.atuser;
			}
		}
	}

	if (arg.type == _manager.YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT) {
		to = _manager.YYIMChat.getJIDUtil().buildChatGroupJID(_manager.YYIMChat.getJIDUtil().getNode(arg.to));
		opcode = OPCODE.CHATGROUP_MESSAGE.SEND;
	} else if (arg.type == _manager.YYIMChat.getConstants().CHAT_TYPE.PUB_ACCOUNT) {
		to = _manager.YYIMChat.getJIDUtil().buildPubAccountJID(_manager.YYIMChat.getJIDUtil().getNode(arg.to));
		opcode = OPCODE.PUBACCOUNT_MESSAGE.SEND;
	} else {
		msgBody.receipts = '1';
		if (arg.resource) {
			if (arg.to == _manager.YYIMChat.getUserID()) {
				to = _manager.YYIMChat.getJIDUtil().buildUserJID(_manager.YYIMChat.getJIDUtil().getNode(arg.to), arg.resource);
			} else {
				to = _manager.YYIMChat.getJIDUtil().buildUserJID(_manager.YYIMChat.getJIDUtil().getNode(arg.to));
			}
		} else {
			to = _manager.YYIMChat.getJIDUtil().buildUserJID(_manager.YYIMChat.getJIDUtil().getNode(arg.to));
		}
	}

	msgBody.to = to;

	_manager.YYIMChat.getConnection().send(new JumpPacket(msgBody, opcode), function (receipts) {
		if (receipts.code == 40302) {
			arg.error && arg.error();
			arg = null;
		} else {
			if (!!_manager.YYIMChat.getConfig().TIMECORRECTION.AUTOCORRECTION) {
				if (receipts && receipts.state == 1) {
					_manager.YYIMChat.onReceipts(receipts);
				}
			} else {
				arg.success && arg.success(handleSendMessage(arg, body, receipts));
				arg = null;
			}
		}
	});

	if (!!_manager.YYIMChat.getConfig().TIMECORRECTION.AUTOCORRECTION) {
		arg.success && arg.success(handleSendMessage(arg, body, {
			dateline: msgBody.dateline
		}));
	}
}

function sendReceiptsPacket(arg) {
	arg = arg || {};
	var Jid = _manager.YYIMChat.getJIDUtil().buildUserJID(_manager.YYIMChat.getJIDUtil().getNode(arg.to));
	if (arg.type == _manager.YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT) {
		Jid = _manager.YYIMChat.getJIDUtil().buildChatGroupJID(_manager.YYIMChat.getJIDUtil().getNode(arg.to));
	} else if (arg.type == _manager.YYIMChat.getConstants().CHAT_TYPE.PUB_ACCOUNT) {
		Jid = _manager.YYIMChat.getJIDUtil().buildPubAccountJID(_manager.YYIMChat.getJIDUtil().getNode(arg.to));
	}
	var receiptsPacket = new JumpPacket({
		to: Jid,
		dateline: new Date().getTime(),
		sessionVersion: arg.sessionVersion,
		id: arg.id,
		state: arg.state
	}, OPCODE.RECEIPTS.SEND);
	_manager.YYIMChat.getConnection().send(receiptsPacket);
}

function getHistoryMessage(arg) {
	var requestUrl,
	    route,
	    params = {
		token: _manager.YYIMChat.getToken(),
		start: arg.start || 0,
		size: arg.size || 100
	};

	if (arg.type == _manager.YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT) {
		route = 'groupchat';
	} else if (arg.type == _manager.YYIMChat.getConstants().CHAT_TYPE.PUB_ACCOUNT) {
		route = 'pubaccount';
	} else {
		route = 'user';
		if (arg.contentType) {
			var typelist = _manager.YYIMChat.getConstants().MESSAGE_CONTENT_TYPE;
			for (var x in typelist) {
				if (arg.contentType == typelist[x]) {
					params.contentType = arg.contentType;
					break;
				}
			}
		}
	}

	requestUrl = _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMChat.getUserID() + '/msghistory/' + route + '/' + arg.id + '/version/' + (arg.startVersion || 0) + '/' + arg.endVersion;
	requestUrl += '?' + jQuery.param(params);

	_manager.YYIMChat.log("历史记录：request URL", 2, requestUrl);
	jQuery.ajax({
		url: requestUrl,
		dataType: "json",
		cache: false,
		success: function success(data) {
			_historyMessageProcessor(data, arg);
			arg = null;
		},
		error: function error(xhr) {
			_manager.YYIMChat.log("getHistoryMessage_error:", 0, xhr.statusText);
			try {
				arg.error && arg.error(JSON.parse(xhr.responseText));
				arg = null;
			} catch (e) {
				arg.error && arg.error();
				arg = null;
			}
		}
	});
};

function _historyMessageProcessor(data, arg) {
	_manager.YYIMChat.log("历史记录：data", 2, data);
	var hisMsgArr = [];
	for (var i in data.list) {
		if (data.list.hasOwnProperty(i)) {
			var item = data.list[i];
			var message = parseMessageBody(item, arg.type);
			hisMsgArr.push(message);
		}
	}

	arg.success && arg.success({
		contactReadVersion: data.contactReadVersion,
		total: data.total,
		result: hisMsgArr
	});
};

function revokeMessage(arg) {
	var url, param;
	if (arg.type == _manager.YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT) {
		url = _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/revokeservice/groupmessage/' + arg.id;
		param = {
			token: _manager.YYIMChat.getToken(),
			userid: _manager.YYIMChat.getUserNode(),
			mucid: _manager.YYIMChat.getJIDUtil().getNode(arg.to)
		};
	} else {
		url = _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/revokeservice/personalmessage/' + arg.id;
		param = {
			token: _manager.YYIMChat.getToken(),
			fromuserid: _manager.YYIMChat.getUserNode(),
			touserid: _manager.YYIMChat.getJIDUtil().getNode(arg.to)
		};
	}

	url += '?' + jQuery.param(param);

	jQuery.ajax({
		url: url,
		type: 'post',
		cache: false,
		success: function success(data) {
			arg.success && arg.success({
				id: arg.id
			});
			arg = null;
		},
		error: function error(xhr) {
			try {
				arg.error && arg.error(JSON.parse(xhr.responseText));
				arg = null;
			} catch (e) {
				arg.error && arg.error();
				arg = null;
			}
		}
	});
}

exports.monitor = monitor;
exports.sendMessage = sendMessage;
exports.getHistoryMessage = getHistoryMessage;
exports.revokeMessage = revokeMessage;
exports.sendReceiptsPacket = sendReceiptsPacket;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _manager = __webpack_require__(0);

var _Manager = __webpack_require__(50);

_manager.YYIMManager.prototype.getProfile = function (arg) {
	(0, _Manager.getProfile)({
		success: function success(data) {
			var intelligentable = data.intelligentable;
			var intelligentWordsTime = data.intelligentWordsTime;
			if (intelligentable != 'undefined') {}
			if (intelligentWordsTime) {
				_manager.YYIMChat.setDictionaries(intelligentWordsTime);
			}

			arg.success && arg.success(data);
		},
		error: function error(_error) {
			arg.error && arg.error(errot);
		}
	});
};

_manager.YYIMManager.prototype.mute = function (arg) {
	arg = arg || {};
	if (!!arg.to) {
		arg.handle = 'mute';
		(0, _Manager.muteStick)(arg);
	} else {
		arg.error && arg.error();
	}
};

_manager.YYIMManager.prototype.stick = function (arg) {
	arg = arg || {};
	if (!!arg.to) {
		arg.handle = 'stick';
		(0, _Manager.muteStick)(arg);
	} else {
		arg.error && arg.error();
	}
};

_manager.YYIMManager.prototype.cancelMute = function (arg) {
	var that = this;
	if (arg && arg.to) {
		(0, _Manager.cancelMuteStick)({
			to: arg.to,
			type: arg.type,
			handle: 'mute',
			success: function success(data) {
				if (arg.type == that.getConstants().CHAT_TYPE.GROUP_CHAT) {
					that.removeGroupAssistant({
						id: arg.to,
						success: function success() {
							arg.success && arg.success(data);
						},
						error: arg.error
					});
				} else {
					arg.success && arg.success(data);
				}
			},
			error: arg.error
		});
	} else {
		arg && arg.error && arg.error();
	}
};

_manager.YYIMManager.prototype.cancelStick = function (arg) {
	if (arg && arg.to) {
		arg.handle = 'stick';
		(0, _Manager.cancelMuteStick)(arg);
	} else {
		arg && arg.error && arg.error();
	}
};

_manager.YYIMManager.prototype.createProfile = function (arg) {
	arg = arg || {};
	if (!!arg.profile) {
		(0, _Manager.createProfile)(arg);
	} else {
		arg.error && arg.error();
	}
};

_manager.YYIMManager.prototype.removeProfile = function (arg) {
	arg = arg || {};
	if (YYIMArrayUtil.isArray(arg.profiles)) {
		(0, _Manager.removeProfile)(arg);
	} else {
		arg.error && arg.error();
	}
};

_manager.YYIMManager.prototype.clearProfile = function (arg) {
	(0, _Manager.clearProfile)(arg || {});
};

_manager.YYIMManager.prototype.removeGroupAssistant = function (arg) {
	if (arg && arg.id) {
		(0, _Manager.removeGroupAssistant)(arg);
	} else {
		arg && arg.error && arg.error();
	}
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.removeGroupAssistant = exports.clearProfile = exports.removeProfile = exports.createProfile = exports.cancelMuteStick = exports.muteStick = exports.getProfile = undefined;

var _stringify = __webpack_require__(1);

var _stringify2 = _interopRequireDefault(_stringify);

var _manager = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getProfile(arg) {
	var apiKeyParam = _manager.YYIMManager.getInstance().getApiKey();
	if (apiKeyParam) {
		apiKeyParam = '&apiKey=' + apiKeyParam;
	}
	jQuery.ajax({
		url: _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMManager.getInstance().getUserID() + '/profile?token=' + _manager.YYIMManager.getInstance().getToken() + apiKeyParam,
		type: 'get',
		cache: false,
		datatype: 'json',
		success: function success(data) {
			if (data.muteItems) {
				var temp = {};
				for (var x in data.muteItems) {
					var id = _manager.YYIMChat.getJIDUtil().getID(data.muteItems[x]);
					var type = _manager.YYIMChat.getJIDUtil().getChatTypeByJid(data.muteItems[x]);
					temp[id] = {
						id: id,
						type: type
					};
				}
				data.muteItems = temp;
			}

			if (data.stickItems) {
				var temp = {};
				for (var x in data.stickItems) {
					var id = _manager.YYIMChat.getJIDUtil().getID(data.stickItems[x]);
					var type = _manager.YYIMChat.getJIDUtil().getChatTypeByJid(data.stickItems[x]);
					temp[id] = {
						id: id,
						type: type
					};
				}
				data.stickItems = temp;
			}
			if (data.userId) {
				data.userId = _manager.YYIMChat.getJIDUtil().getID(data.userId);
			}
			arg.success && arg.success(data);
			arg = null;
		},
		error: function error(xhr) {
			try {
				arg.error && arg.error(JSON.parse(xhr.responseText));
				arg = null;
			} catch (e) {
				arg.error && arg.error();
				arg = null;
			}
		}
	});
}

function muteStick(arg) {
	var to;
	if (arg.type == _manager.YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT) {
		to = _manager.YYIMChat.getJIDUtil().buildChatGroupJID(_manager.YYIMChat.getJIDUtil().getNode(arg.to));
	} else if (arg.type == _manager.YYIMChat.getConstants().CHAT_TYPE.PUB_ACCOUNT) {
		to = _manager.YYIMChat.getJIDUtil().buildPubAccountJID(_manager.YYIMChat.getJIDUtil().getNode(arg.to));
	} else {
		to = _manager.YYIMChat.getJIDUtil().buildUserJID(_manager.YYIMChat.getJIDUtil().getNode(arg.to));
	}
	arg.handle = arg.handle === 'mute' ? arg.handle : 'stick';
	jQuery.ajax({
		url: _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMManager.getInstance().getUserID() + '/profile/' + arg.handle + '?token=' + _manager.YYIMManager.getInstance().getToken(),
		type: 'post',
		data: (0, _stringify2.default)({ bareJID: to }),
		dataType: 'json',
		cache: false,
		processData: false,
		contentType: "application/json",
		success: function success(data) {
			arg.success && arg.success({
				id: arg.to,
				type: arg.type
			});
			arg = null;
		},
		error: function error(xhr) {
			try {
				arg.error && arg.error(JSON.parse(xhr.responseText));
				arg = null;
			} catch (e) {
				arg.error && arg.error();
				arg = null;
			}
		}
	});
}

function cancelMuteStick(arg) {
	var to;
	if (arg.type == _manager.YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT) {
		to = _manager.YYIMChat.getJIDUtil().buildChatGroupJID(_manager.YYIMChat.getJIDUtil().getNode(arg.to));
	} else if (arg.type == _manager.YYIMChat.getConstants().CHAT_TYPE.PUB_ACCOUNT) {
		to = _manager.YYIMChat.getJIDUtil().buildPubAccountJID(_manager.YYIMChat.getJIDUtil().getNode(arg.to));
	} else {
		to = _manager.YYIMChat.getJIDUtil().buildUserJID(_manager.YYIMChat.getJIDUtil().getNode(arg.to));
	}
	jQuery.ajax({
		url: _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMManager.getInstance().getUserID() + '/profile/' + (arg.handle === 'mute' ? 'mute' : 'stick') + '?token=' + _manager.YYIMManager.getInstance().getToken() + '&bareJID=' + to,
		type: 'DELETE',
		dataType: 'json',
		success: function success(data) {
			arg.success && arg.success({
				id: arg.to,
				type: arg.type
			});
			arg = null;
		},
		error: function error(xhr) {
			try {
				arg.error && arg.error(JSON.parse(xhr.responseText));
				arg = null;
			} catch (e) {
				arg.error && arg.error();
				arg = null;
			}
		}
	});
}

function createProfile(arg) {
	jQuery.ajax({
		url: _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMManager.getInstance().getUserID() + '/profile?token=' + _manager.YYIMManager.getInstance().getToken(),
		type: 'post',
		data: (0, _stringify2.default)(arg.profile),
		dataType: 'json',
		cache: false,
		processData: false,
		contentType: "application/json",
		success: function success(data) {
			arg.success && arg.success(arg.profile);
			arg = null;
		},
		error: function error(xhr) {
			try {
				arg.error && arg.error(JSON.parse(xhr.responseText));
				arg = null;
			} catch (e) {
				arg.error && arg.error();
				arg = null;
			}
		}
	});
}

function removeProfile(arg) {
	jQuery.ajax({
		url: _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMManager.getInstance().getUserID() + '/profile?token=' + _manager.YYIMManager.getInstance().getToken(),
		type: 'PUT',
		data: (0, _stringify2.default)(arg.profiles),
		dataType: 'json',
		cache: false,
		processData: false,
		contentType: "application/json",
		success: function success(data) {
			arg.success && arg.success(arg.profiles);
			arg = null;
		},
		error: function error(xhr) {
			try {
				arg.error && arg.error(JSON.parse(xhr.responseText));
				arg = null;
			} catch (e) {
				arg.error && arg.error();
				arg = null;
			}
		}
	});
}

function clearProfile(arg) {
	jQuery.ajax({
		url: _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMManager.getInstance().getUserID() + '/profile?token=' + _manager.YYIMManager.getInstance().getToken(),
		type: 'DELETE',
		dataType: 'json',
		cache: false,
		success: function success(data) {
			arg.success && arg.success();
			arg = null;
		},
		error: function error(xhr) {
			try {
				arg.error && arg.error(JSON.parse(xhr.responseText));
				arg = null;
			} catch (e) {
				arg.error && arg.error();
				arg = null;
			}
		}
	});
}

function removeGroupAssistant(arg) {
	jQuery.ajax({
		url: _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMManager.getInstance().getUserID() + '/profile/groupassistant?token=' + _manager.YYIMManager.getInstance().getToken() + '&bareJID=' + _manager.YYIMChat.getJIDUtil().buildChatGroupJID(_manager.YYIMChat.getJIDUtil().getNode(arg.id)),
		type: 'DELETE',
		dataType: 'json',
		cache: false,
		success: function success(data) {
			arg.success && arg.success();
			arg = null;
		},
		error: function error(xhr) {
			try {
				arg.error && arg.error(JSON.parse(xhr.responseText));
				arg = null;
			} catch (e) {
				arg.error && arg.error();
				arg = null;
			}
		}
	});
}

exports.getProfile = getProfile;
exports.muteStick = muteStick;
exports.cancelMuteStick = cancelMuteStick;
exports.createProfile = createProfile;
exports.removeProfile = removeProfile;
exports.clearProfile = clearProfile;
exports.removeGroupAssistant = removeGroupAssistant;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _manager = __webpack_require__(0);

var _Manager = __webpack_require__(52);

_manager.YYIMChat.setBackhander({
  'monitor': {
    'pubaccountMonitor': _Manager.monitor
  },
  'initCallback': {
    'pubaccount': function pubaccount(options) {
      _manager.YYIMChat.onPubaccountUpdate = options.onPubaccountUpdate || function () {};
    }
  }
});

_manager.YYIMManager.prototype.getPubAccount = function (arg) {
  (0, _Manager.getPubAccountItems)(arg);
};

_manager.YYIMManager.prototype.getPubAccounts = function (arg) {
  if (YYIMUtil['isWhateType'](arg.ids, 'Array')) {
    (0, _Manager.getPubAccounts)(arg);
  } else {
    arg && arg.error && arg.error();
  }
};

var batchInfosList = new BaseList();
var batchInfosTimer;
var getBatchInfos = function getBatchInfos() {
  var handler = batchInfosList;
  batchInfosList = new BaseList();
  (0, _Manager.getPubAccounts)({
    ids: handler.keys(),
    success: function success(list, data) {
      handler.forEach(function (item, index) {
        try {
          item && item.success && item.success(data[item.id]);
        } catch (e) {
          _manager.YYIMChat.log('SuccessHandleBatchPubaccountInfoError.', 0, e);
        }
      });
      handler.clear();
      handler = null;
    },
    error: function error(err) {
      handler.forEach(function (item, index) {
        try {
          item && item.error && item.error(err);
        } catch (e) {
          _manager.YYIMChat.log('ErrorHandleBatchPubaccountInfoError.', 0, e);
        }
      });
      handler.clear();
      handler = null;
    }
  });
};

_manager.YYIMManager.prototype.getBatchPubInfos = function (arg) {
  if (arg && arg.id && !batchInfosList.get(arg.id)) {
    batchInfosList.set(arg.id, arg);
    clearTimeout(batchInfosTimer);
    if (batchInfosList.length() >= this.getConfig().BETCH_MAXLIMIT.PUBACCOUNT) {
      getBatchInfos();
    } else {
      batchInfosTimer = setTimeout(function () {
        getBatchInfos();
      }, 200);
    }
  } else {
    arg.error && arg.error();
  }
};

_manager.YYIMManager.prototype.getPubAccountInfo = function (arg) {
  if (YYIMCommonUtil.isStringAndNotEmpty(arg.id)) {
    (0, _Manager.getPubAccountInfo)(arg);
  } else {
    arg && arg.error && arg.error();
  }
};

_manager.YYIMManager.prototype.addPubaccount = function (arg) {
  if (YYIMCommonUtil.isStringAndNotEmpty(arg.id)) {
    (0, _Manager.addPubAccount)({
      jid: _manager.YYIMChat.getJIDUtil().buildPubAccountJID(_manager.YYIMChat.getJIDUtil().getNode(arg.id)),
      success: arg.success,
      error: arg.error
    });
  } else {
    arg && arg.error && arg.error();
  }
};

_manager.YYIMManager.prototype.removePubaccount = function (arg) {
  if (YYIMCommonUtil.isStringAndNotEmpty(arg.id)) {
    (0, _Manager.removePubAccount)({
      id: Math.uuid(),
      to: _manager.YYIMChat.getJIDUtil().buildPubAccountJID(_manager.YYIMChat.getJIDUtil().getNode(arg.id)),
      success: arg.success,
      error: arg.error
    });
  } else {
    arg && arg.error && arg.error();
  }
};

_manager.YYIMManager.prototype.queryPubaccount = function (arg) {
  if (YYIMCommonUtil.isStringAndNotEmpty(arg.keyword)) {
    (0, _Manager.queryPubaccount)(arg);
  } else {
    arg && arg.error && arg.error();
  }
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.queryPubaccount = exports.removePubAccount = exports.getPubAccountInfo = exports.getPubAccountItems = exports.getPubAccounts = exports.addPubAccount = exports.monitor = undefined;

var _stringify = __webpack_require__(1);

var _stringify2 = _interopRequireDefault(_stringify);

var _manager = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getPubAccountItems(arg) {
    var jumpPacket = new JumpPacket({
        type: _manager.YYIMChat.getConstants().TYPE.GET,
        ns: NS_PUBACCOUNT,
        to: _manager.YYIMChat.getConfig().DOMAIN.PUBACCOUNT
    }, OPCODE.PUBACCOUNT_LIST.SEND);

    _manager.YYIMChat.getConnection().send(jumpPacket, function (pubaccountListResult, _arg) {
        if (!_arg) return;

        _arg.complete && _arg.complete();
        var items = pubaccountListResult.items || [];
        var i = items.length || 0;
        while (i--) {
            items[i].id = _manager.YYIMChat.getJIDUtil().getID(items[i].jid);
        }
        _arg.success && _arg.success((0, _stringify2.default)(items));
    }, arg);
}

function getPubAccounts(arg) {
    jQuery.ajax({
        url: _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/pubaccount/' + _manager.YYIMChat.getUserID() + '/items',
        dataType: 'json',
        data: {
            token: _manager.YYIMChat.getToken(),
            pubIds: (0, _stringify2.default)(arg.ids)
        },
        cache: false,
        success: function success(result) {
            var data = {};
            result = result || [];
            var i = result.length || 0;
            while (i--) {
                result[i].id = _manager.YYIMChat.getJIDUtil().getID(result[i].jid);
                data[result[i].id] = result[i];
            }
            arg.success && arg.success(result, data);
            arg = null;
        },
        error: function error(xhr) {
            try {
                arg.error && arg.error(JSON.parse(xhr.responseText));
                arg = null;
            } catch (e) {
                arg.error && arg.error();
                arg = null;
            }
        }
    });
}

function getPubAccountInfo(arg) {
    jQuery.ajax({
        url: _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + arg.id + '/' + _manager.YYIMChat.getUserID() + '/pubaccount/info',
        dataType: 'json',
        data: {
            token: _manager.YYIMChat.getToken()
        },
        cache: false,
        success: function success(result) {
            if (result && result.data) {
                result.data.id = _manager.YYIMChat.getJIDUtil().getID(result.data.jid);
                arg.success && arg.success(result.data);
                arg = null;
            }
        },
        error: function error(xhr) {
            try {
                arg.error && arg.error(JSON.parse(xhr.responseText));
                arg = null;
            } catch (e) {
                arg.error && arg.error();
                arg = null;
            }
        }
    });
}

function queryPubaccount(arg) {
    var iqBody = {
        start: YYIMCommonUtil.isNumber(arg.start) ? arg.start : 0,
        size: YYIMCommonUtil.isNumber(arg.size) ? arg.size : 20,
        fields: ["Accountname", "Name"],
        search: arg.keyword
    };
    _manager.YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.QUERY_PUBACCOUNT.SEND), function (queryResult, _arg) {
        var items = queryResult.items || [],
            result = [],
            i = items.length;
        while (i--) {
            var item = items[i],
                jid = item.jid;
            result.push({
                id: _manager.YYIMChat.getJIDUtil().getID(jid),
                name: YYIMCommonUtil.isStringAndNotEmpty(item.name) ? item.name : _manager.YYIMChat.getJIDUtil().getID(jid),
                type: item.type
            });
        }
        _arg.complete && _arg.complete();
        _arg.success && _arg.success({
            start: queryResult.start,
            total: queryResult.total,
            items: result
        });
    }, arg);
}

function addPubAccount(arg) {
    _manager.YYIMChat.getConnection().send(new JumpPacket({
        type: _manager.YYIMChat.getConstants().PRESENCE_TYPE.SUBSCRIBE,
        to: arg.jid
    }, OPCODE.PRESENCE.SEND), function (addResult, _arg) {
        _arg.complete && _arg.complete();
        addResult.from = _manager.YYIMChat.getJIDUtil().getID(addResult.from);
        addResult.to = _manager.YYIMChat.getJIDUtil().getID(addResult.to);
        _arg.success && _arg.success(addResult);
    }, arg);
}

function removePubAccount(arg) {
    _manager.YYIMChat.getConnection().send(new JumpPacket({
        id: arg.id,
        type: _manager.YYIMChat.getConstants().PRESENCE_TYPE.UNSUBSCRIBE,
        to: arg.to
    }, OPCODE.PRESENCE.SEND), function (addResult, _arg) {
        _arg.complete && _arg.complete();
        addResult.from = _manager.YYIMChat.getJIDUtil().getID(addResult.from);
        addResult.to = _manager.YYIMChat.getJIDUtil().getID(addResult.to) || _manager.YYIMChat.getUserID();
        _arg.success && _arg.success(addResult);
    }, arg);
}

function monitor() {
    _manager.YYIMChat.getConnection().registerHandler(OPCODE.PUBACCOUNT_LIST.KEY, function (packet) {
        var items = packet.items;
        if ((items && items.length || 0) === 0) return;
        var pubaccounts = [],
            i = items.length;
        while (i--) {
            var item = items[i];
            item.id = _manager.YYIMChat.getJIDUtil().getID(item.jid), pubaccounts.push(item);
        }
        _manager.YYIMChat.onPubaccountUpdate(pubaccounts);
    });
}

exports.monitor = monitor;
exports.addPubAccount = addPubAccount;
exports.getPubAccounts = getPubAccounts;
exports.getPubAccountItems = getPubAccountItems;
exports.getPubAccountInfo = getPubAccountInfo;
exports.removePubAccount = removePubAccount;
exports.queryPubaccount = queryPubaccount;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__(1);

var _stringify2 = _interopRequireDefault(_stringify);

var _manager = __webpack_require__(0);

var _Manager = __webpack_require__(54);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_manager.YYIMChat.setBackhander({
	'monitor': {
		'rosterMonitor': _Manager.monitor
	},
	'initCallback': {
		'roster': function roster(options) {
			_manager.YYIMChat.onPresence = options.onPresence || function () {};
			_manager.YYIMChat.onSubscribe = options.onSubscribe || function () {};
			_manager.YYIMChat.onRosterDeleted = options.onRosterDeleted || function () {};
			_manager.YYIMChat.onRosterUpdateded = options.onRosterUpdateded || function () {};
			_manager.YYIMChat.onRosterFavorited = options.onRosterFavorited || function () {};
		}
	}
});

_manager.YYIMManager.prototype.setPresence = function (arg) {
	var presence = {};
	if (arg && arg.show && this.getConstants().STATUS[arg.show.toUpperCase()]) {
		presence.show = arg.show;
	}
	if (arg && arg.status) {
		presence.status = arg.status;
	}
	(0, _Manager.setPresence)(presence);
};

_manager.YYIMManager.prototype.getVCard = function (arg) {
	arg = arg || {};
	if (arg) {
		(0, _Manager.getVCard)({
			id: arg.id,
			success: arg.success,
			error: arg.error
		});
	} else {
		arg.error && arg.error();
	}
};

var batchVcardsList = new BaseList();
var batchVcardsTimer = void 0;
var _getBatchVCards = function _getBatchVCards() {
	var handler = batchVcardsList;
	batchVcardsList = new BaseList();
	(0, _Manager.getBatchVCards)({
		ids: (0, _stringify2.default)(handler.keys()),
		success: function success(vcards) {
			handler.forEach(function (item, index) {
				try {
					item && item.success && item.success(vcards[item.id]);
				} catch (e) {
					_manager.YYIMChat.log('SuccessHandleBatchVCardsError.', 0, e);
				}
			});
			handler.clear();
			handler = null;
		},
		error: function error(err) {
			handler.forEach(function (item, index) {
				try {
					item && item.error && item.error(err);
				} catch (e) {
					_manager.YYIMChat.log('ErrorHandleBatchVCardsError.', 0, e);
				}
			});
			handler.clear();
			handler = null;
		}
	});
};

_manager.YYIMManager.prototype.getBatchVCards = function (arg) {
	if (arg && arg.id && !batchVcardsList.get(arg.id)) {
		batchVcardsList.set(arg.id, arg);
		clearTimeout(batchVcardsTimer);
		if (batchVcardsList.length() >= this.getConfig().BETCH_MAXLIMIT.ROSTER) {
			_getBatchVCards();
		} else {
			batchVcardsTimer = setTimeout(function () {
				_getBatchVCards();
			}, 200);
		}
	} else {
		arg.error && arg.error();
	}
};

_manager.YYIMManager.prototype.getVCards = function (arg) {
	if (arg) {
		(0, _Manager.getVCards)({
			success: arg.success,
			error: arg.error,
			complete: arg.complete
		});
	} else {
		arg.error && arg.error();
	}
};

_manager.YYIMManager.prototype.setVCard = function (arg) {
	(0, _Manager.setVCard)({
		vcard: {
			nickname: arg.nickname,
			photo: arg.photo,
			email: arg.email,
			mobile: arg.mobile,
			telephone: arg.telephone,
			organization: arg.organization,
			gender: arg.gender,
			number: arg.number,
			remarks: arg.remarks,
			location: arg.location,
			position: arg.position
		},
		success: arg.success,
		error: arg.error
	});
};

_manager.YYIMManager.prototype.setVCardTag = function (arg) {
	arg = arg || {};
	if (YYIMArrayUtil.isArray(arg.tag)) {
		var that = this;
		(0, _Manager.setTag)({
			tag: arg.tag,
			success: function success(targetId) {
				that.getVCard({
					id: targetId,
					success: function success(vcard) {
						arg.success && arg.success(vcard);
					}
				});
			},
			error: arg.error
		});
	} else {
		arg.error && arg.error();
	}
};

_manager.YYIMManager.prototype.removeVCardTag = function (arg) {
	arg = arg || {};
	if (YYIMArrayUtil.isArray(arg.tag)) {
		var that = this;
		(0, _Manager.removeTag)({
			tag: arg.tag,
			success: function success(targetId) {
				that.getVCard({
					id: targetId,
					success: function success(vcard) {
						arg.success && arg.success(vcard);
					}
				});
			},
			error: arg.error
		});
	} else {
		arg.error && arg.error();
	}
};

_manager.YYIMManager.prototype.setRosterTag = function (arg) {
	arg = arg || {};
	if (arg.id && YYIMArrayUtil.isArray(arg.tag) && arg.id != this.getUserID()) {
		(0, _Manager.setTag)({
			id: arg.id,
			tag: arg.tag,
			success: function success(targetId) {
				arg.success && arg.success(targetId);
			},
			error: arg.error
		});
	} else {
		arg.error && arg.error();
	}
};

_manager.YYIMManager.prototype.removeRosterTag = function (arg) {
	arg = arg || {};
	if (arg.id && YYIMArrayUtil.isArray(arg.tag) && arg.id != this.getUserID()) {
		(0, _Manager.removeTag)({
			id: arg.id,
			tag: arg.tag,
			success: function success(targetId) {
				arg.success && arg.success(targetId);
			},
			error: arg.error
		});
	} else {
		arg.error && arg.error();
	}
};

_manager.YYIMManager.prototype.getRosterItems = function (arg) {
	(0, _Manager.getRosterItems)(arg);
};

_manager.YYIMManager.prototype.addRosterItem = function (id) {
	if (YYIMCommonUtil.isStringAndNotEmpty(id)) {
		(0, _Manager.addRosterItem)(_manager.YYIMChat.getJIDUtil().buildUserJID(_manager.YYIMChat.getJIDUtil().getNode(id)));
	}
};

_manager.YYIMManager.prototype.approveSubscribe = function (id) {
	if (YYIMCommonUtil.isStringAndNotEmpty(id)) {
		(0, _Manager.approveSubscribe)(_manager.YYIMChat.getJIDUtil().buildUserJID(_manager.YYIMChat.getJIDUtil().getNode(id)));
	}
};

_manager.YYIMManager.prototype.rejectSubscribe = function (id) {
	if (YYIMCommonUtil.isStringAndNotEmpty(id)) {
		(0, _Manager.rejectSubscribe)(_manager.YYIMChat.getJIDUtil().buildUserJID(_manager.YYIMChat.getJIDUtil().getNode(id)));
	}
};

_manager.YYIMManager.prototype.deleteRosterItem = function (arg) {
	if (YYIMCommonUtil.isStringAndNotEmpty(arg.id)) {
		(0, _Manager.deleteRosterItem)({
			jid: _manager.YYIMChat.getJIDUtil().buildUserJID(_manager.YYIMChat.getJIDUtil().getNode(arg.id)),
			success: arg.success,
			error: arg.error
		});
	}
};

_manager.YYIMManager.prototype.queryRosterItem = function (arg) {
	if (YYIMCommonUtil.isStringAndNotEmpty(arg.keyword)) {
		(0, _Manager.queryRosterItem)(arg);
	}
};

_manager.YYIMManager.prototype.getRostersPresence = function (arg) {
	if (YYIMArrayUtil.isArray(arg.username)) {
		arg.username = (0, _stringify2.default)(arg.username);
		(0, _Manager.getRostersPresence)(arg);
	}
};

_manager.YYIMManager.prototype.updateRosterItem = function (arg) {
	if (arg && arg.roster && YYIMCommonUtil.isStringAndNotEmpty(arg.roster.id)) {
		(0, _Manager.updateRosterItem)({
			roster: {
				jid: _manager.YYIMChat.getJIDUtil().buildUserJID(_manager.YYIMChat.getJIDUtil().getNode(arg.roster.id)),
				name: arg.roster.name,
				groups: arg.roster.groups
			},
			success: arg.success,
			error: arg.error
		});
	}
};

_manager.YYIMManager.prototype.favoriteRoster = function (id, type) {
	if (YYIMUtil['isWhateType'](id, 'String')) {
		var jid = _manager.YYIMChat.getJIDUtil().buildUserJID(_manager.YYIMChat.getJIDUtil().getNode(id));
		if (type == _manager.YYIMChat.getConstants().FAVORITE_TYPE.REMOVE) {
			(0, _Manager.cancelFavoriteRoster)(jid);
		} else {
			(0, _Manager.favoriteRoster)(jid);
		}
	}
};

_manager.YYIMManager.prototype.updateFavoriteRoster = function (id, name) {
	if (YYIMUtil['isWhateType'](id, 'String') && YYIMUtil['isWhateType'](name, 'String')) {
		var jid = _manager.YYIMChat.getJIDUtil().buildUserJID(_manager.YYIMChat.getJIDUtil().getNode(id));
		(0, _Manager.updateFavoriteRoster)(jid, name);
	}
};

_manager.YYIMManager.prototype.getFavoriteRosterList = function (arg) {
	arg = arg || {};
	(0, _Manager.getFavoriteRosterList)({
		success: arg.success,
		error: arg.error
	});
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.removeTag = exports.setTag = exports.getRosterItems = exports.getFavoriteRosterList = exports.updateFavoriteRoster = exports.cancelFavoriteRoster = exports.favoriteRoster = exports.addRosterItem = exports.setVCard = exports.getVCards = exports.getBatchVCards = exports.getVCard = exports.setPresence = exports.updateRosterItem = exports.getRostersPresence = exports.queryRosterItem = exports.deleteRosterItem = exports.rejectSubscribe = exports.approveSubscribe = exports.monitor = undefined;

var _stringify = __webpack_require__(1);

var _stringify2 = _interopRequireDefault(_stringify);

var _manager = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getVCard(arg) {
	var vcardBody = {
		type: _manager.YYIMChat.getConstants().TYPE.GET
	};

	if (arg && arg.id) {
		vcardBody.to = _manager.YYIMChat.getJIDUtil().buildUserJID(_manager.YYIMChat.getJIDUtil().getNode(arg.id));
	}

	_manager.YYIMChat.getConnection().send(new JumpPacket(vcardBody, OPCODE.VCARD.SEND), function (vcardResult, _arg) {
		_arg.complete && _arg.complete();
		var vcard = vcardResult.vcard || {};
		vcard.id = vcard.userId = _manager.YYIMChat.getJIDUtil().getID(vcard.username);
		if (!!vcardResult.enableFields) {
			vcard.enableFields = !!vcardResult.enableFields;
		}
		_arg.success && _arg.success(vcard);
	}, arg);
}

function getBatchVCards(arg) {
	var url = _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMChat.getUserID() + '/vcard?token=' + _manager.YYIMChat.getToken() + '&userids=' + arg.ids;
	jQuery.ajax({
		url: url,
		type: 'get',
		dataType: 'json',
		cache: false,
		success: function success(result) {
			var map = {};
			if (result && result.list) {
				for (var x in result.list) {
					if (result.list.hasOwnProperty(x)) {
						var vcard = result.list[x];
						vcard.id = _manager.YYIMChat.getJIDUtil().getID(vcard.username);
						map[vcard.id] = vcard;
					}
				}
			}
			arg.success && arg.success(map);
			arg = null;
		},
		error: function error(xhr) {
			try {
				arg.error && arg.error(JSON.parse(xhr.responseText));
				arg = null;
			} catch (e) {
				arg.error && arg.error();
				arg = null;
			}
		}
	});
}

function getVCards(arg) {
	var iqBody = {
		type: 'roster'
	};

	_manager.YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.VCARDS.SEND), function (vcardsResult, _arg) {
		var results = vcardsResult.vcards || [];
		vcards = [], i = results.length;
		while (i--) {
			var vcard = results[i];
			vcard.id = vcard.userId = _manager.YYIMChat.getJIDUtil().getID(vcard.username);
			vcards.push(vcard);
		}
		_arg.complete && _arg.complete();
		_arg.success && _arg.success(vcards);
	}, arg);
}

function setVCard(arg) {
	_manager.YYIMChat.getConnection().send(new JumpPacket({
		type: _manager.YYIMChat.getConstants().TYPE.SET,
		vcard: arg.vcard
	}, OPCODE.VCARD.SEND), function (vcardResult, _arg) {
		_arg.complete && _arg.complete();
		_arg.success && _arg.success();
	}, arg);
}

function setTag(arg) {
	var url;
	if (!arg.id || arg.id === _manager.YYIMChat.getUserID()) {
		url = _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMChat.getUserID() + '/vcard/tag?token=' + _manager.YYIMChat.getToken();
	} else {
		url = _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMChat.getUserID() + '/' + arg.id + '/roster/tag?token=' + _manager.YYIMChat.getToken();
	}

	jQuery.ajax({
		url: url,
		type: 'post',
		data: (0, _stringify2.default)({
			tag: arg.tag
		}),
		dataType: 'json',
		cache: false,
		processData: false,
		contentType: "application/json",
		success: function success(data) {
			arg.success && arg.success(arg.id);
			arg = null;
		},
		error: function error(xhr) {
			try {
				arg.error && arg.error(JSON.parse(xhr.responseText));
				arg = null;
			} catch (e) {
				arg.error && arg.error();
				arg = null;
			}
		}
	});
};

function removeTag(arg) {
	var url;
	if (!arg.id || arg.id === _manager.YYIMChat.getUserID()) {
		url = _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMChat.getUserID() + '/vcard/tag?token=' + _manager.YYIMChat.getToken() + '&tag=' + (0, _stringify2.default)(arg.tag);
	} else {
		url = _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMChat.getUserID() + '/' + arg.id + '/roster/tag?token=' + _manager.YYIMChat.getToken() + '&tag=' + (0, _stringify2.default)(arg.tag);
	}
	jQuery.ajax({
		url: url,
		type: 'delete',
		dataType: 'json',
		cache: false,
		success: function success(data) {
			arg.success && arg.success(arg.id);
			arg = null;
		},
		error: function error(xhr) {
			try {
				arg.error && arg.error(JSON.parse(xhr.responseText));
				arg = null;
			} catch (e) {
				arg.error && arg.error();
				arg = null;
			}
		}
	});
};

function getRostersPresence(arg) {
	jQuery.ajax({
		url: _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMChat.getUserID() + '/presence/detail?token=' + _manager.YYIMChat.getToken() + '&username=' + arg.username,
		type: 'get',
		dataType: 'json',
		cache: false,
		timeout: 5000,
		success: function success(data) {
			arg.success && arg.success(data);
			arg = null;
		},
		error: function error(xhr) {
			try {
				arg.error && arg.error(JSON.parse(xhr.responseText));
				arg = null;
			} catch (e) {
				arg.error && arg.error();
				arg = null;
			}
		}
	});
}

function getRosterItems(arg) {
	var jumpPacket = new JumpPacket({}, OPCODE.ROSTER_LIST.SEND);

	_manager.YYIMChat.getConnection().send(jumpPacket, function (rosterListPacket, _arg) {
		if (!_arg) return;

		_arg.complete && _arg.complete();

		var items = rosterListPacket.items || [];

		var rosters = [],
		    i = items.length || 0,
		    friquest = {};

		while (i--) {
			var item = items[i],
			    jid = item.jid,
			    roster = {
				id: _manager.YYIMChat.getJIDUtil().getID(jid),
				resource: _manager.YYIMChat.getJIDUtil().getResource(jid),
				ask: item.ask,
				recv: item.recv,
				name: item.name,
				photo: item.photo,
				subscription: item.subscription,
				group: item.groups,
				tag: item.tag
			};

			if (_manager.YYIMChat.getJIDUtil().getDomain(jid) !== _manager.YYIMChat.getConfig().DOMAIN.PUBACCOUNT) {
				rosters.push(roster);

				if (!friquest[roster.id] && roster.subscription === 'none') {
					if (roster.recv === 1) {
						friquest[roster.id] = roster;
					} else if (roster.ask === 1) {}
				}
			}
		}

		for (var x in friquest) {
			if (friquest[x].id) {
				_manager.YYIMChat.onSubscribe({
					from: friquest[x].id,
					type: _manager.YYIMChat.getConstants().PRESENCE_TYPE.SUBSCRIBE
				});
			}
		}

		_arg.success && _arg.success((0, _stringify2.default)(rosters));
	}, arg);
}

function deleteRosterItem(arg) {
	var iqBody = {
		type: _manager.YYIMChat.getConstants().TYPE.SET,
		ns: NS_ROSTER,
		item: {
			jid: arg.jid,
			subscription: 'remove'
		}
	};

	_manager.YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.UPDATE_ROSTER.SEND), function (deleteResult, _arg) {
		_arg.complete && _arg.complete();
		_arg.success && _arg.success(_manager.YYIMChat.getJIDUtil().getID(_arg.jid));
	}, arg);
}

function updateRosterItem(arg) {
	var roster = arg.roster,
	    iqBody = {
		item: {
			jid: roster.jid,
			name: roster.name,
			groups: []
		}
	},
	    groups = roster.groups,
	    i = groups ? groups.length : 0;
	while (i-- && YYIMCommonUtil.isStringAndNotEmpty(groups[i])) {
		iqBody.item.groups = iqBody.item.groups.concat(groups[i]);
	}_manager.YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.UPDATE_ROSTER.SEND), function (updateResult, _arg) {
		_arg.complete && _arg.complete();

		if (updateResult.code === 400) {
			_arg.error && _arg.error(updateResult);
		} else {
			updateResult.to = _manager.YYIMChat.getJIDUtil().getID(updateResult.to);
			_arg.success && _arg.success(updateResult);
		}
	}, arg);
}

function queryRosterItem(arg) {
	var iqBody = {
		start: YYIMCommonUtil.isNumber(arg.start) ? arg.start : 0,
		size: YYIMCommonUtil.isNumber(arg.size) ? arg.size : 20,
		fields: ["Username", "Name"],
		search: arg.keyword
	};
	_manager.YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.QUERY_USER.SEND), function (queryResult, _arg) {
		var items = queryResult.items || [],
		    result = [],
		    i = items.length;
		while (i--) {
			var item = items[i],
			    jid = item.jid;
			if (jid === _manager.YYIMChat.getUserBareJID()) continue;
			result.push({
				id: _manager.YYIMChat.getJIDUtil().getID(jid),
				name: YYIMCommonUtil.isStringAndNotEmpty(item.name) ? item.name : _manager.YYIMChat.getJIDUtil().getID(jid),
				photo: item.photo,
				email: item.email
			});
		}
		_arg.complete && _arg.complete();
		_arg.success && _arg.success({
			start: queryResult.start,
			total: queryResult.total,
			items: result
		});
	}, arg);
}

function getFavoriteRosterList(arg) {
	jQuery.ajax({
		url: _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMChat.getUserID() + '/favoritedRosters',
		type: 'get',
		data: {
			token: _manager.YYIMChat.getToken()
		},
		dataType: 'json',
		cache: false,
		success: function success(data) {
			if (data && data.items) {
				var i = data.items.length;
				while (i--) {
					data.items[i].id = _manager.YYIMChat.getJIDUtil().getID(data.items[i].jid);
				}
			}
			arg.success && arg.success(data.items);
			arg = null;
		},
		error: function error(xhr) {
			try {
				arg.error && arg.error(JSON.parse(xhr.responseText));
				arg = null;
			} catch (e) {
				arg.error && arg.error();
				arg = null;
			}
		}
	});
}

function setPresence(arg) {
	_manager.YYIMChat.getConnection().send(new JumpPacket(arg, OPCODE.PRESENCE.SEND));
}

function favoriteRoster(jid) {
	_manager.YYIMChat.getConnection().send(new JumpPacket({
		type: _manager.YYIMChat.getConstants().PRESENCE_TYPE.COLLECT,
		to: jid
	}, OPCODE.PRESENCE.SEND));
}

function cancelFavoriteRoster(jid) {
	_manager.YYIMChat.getConnection().send(new JumpPacket({
		favoritedRosterItem: {
			jid: jid,
			subscription: _manager.YYIMChat.getConstants().FAVORITE_TYPE.REMOVE
		},
		from: _manager.YYIMChat.getUserFullJID()
	}, OPCODE.FAVORITED_ROSTERT.SEND));
}

function updateFavoriteRoster(jid, name) {
	_manager.YYIMChat.getConnection().send(new JumpPacket({
		favoritedRosterItem: {
			jid: jid,
			name: name,
			subscription: _manager.YYIMChat.getConstants().FAVORITE_TYPE.FAVORITE
		},
		from: _manager.YYIMChat.getUserFullJID()
	}, OPCODE.FAVORITED_ROSTERT.SEND));
}

function addRosterItem(jid) {
	_manager.YYIMChat.getConnection().send(new JumpPacket({
		type: _manager.YYIMChat.getConstants().PRESENCE_TYPE.SUBSCRIBE,
		to: jid
	}, OPCODE.PRESENCE.SEND));
}

function approveSubscribe(jid) {
	_manager.YYIMChat.getConnection().send(new JumpPacket({
		type: _manager.YYIMChat.getConstants().PRESENCE_TYPE.SUBSCRIBED,
		to: jid
	}, OPCODE.PRESENCE.SEND));
}

function rejectSubscribe(jid) {
	_manager.YYIMChat.getConnection().send(new JumpPacket({
		type: _manager.YYIMChat.getConstants().PRESENCE_TYPE.UNSUBSCRIBED,
		to: jid
	}, OPCODE.PRESENCE.SEND));
}

function monitor() {
	_manager.YYIMChat.getConnection().registerHandler(OPCODE.FAVORITED_ROSTERT.KEY, function (packet) {
		if (packet && packet.favoritedRosterItem) {
			packet.favoritedRosterItem.id = _manager.YYIMChat.getJIDUtil().getID(packet.favoritedRosterItem.jid);
		}
		if (packet && packet.to) {
			packet.to = _manager.YYIMChat.getJIDUtil().getID(packet.to);
		}
		_manager.YYIMChat.onRosterFavorited(packet);
	});

	_manager.YYIMChat.getConnection().registerHandler(OPCODE.UPDATE_ROSTER.KEY, function (packet) {
		var item = packet.item,
		    id = _manager.YYIMChat.getJIDUtil().getID(packet.item.jid);

		if (item.subscription === 'both') {
			_manager.YYIMChat.log('update or add: ' + (0, _stringify2.default)(item));
			item.id = id;
			_manager.YYIMChat.onRosterUpdateded(item);
		} else if (item.subscription === 'none') {
				_manager.YYIMChat.log('delete: ' + (0, _stringify2.default)(item));
				item.id = id;
				_manager.YYIMChat.onRosterDeleted(item);
			} else if (item.subscription === 'remove') {}
	});

	_manager.YYIMChat.getConnection().registerHandler(OPCODE.PRESENCE.KEY, function (packet) {
		if (packet.type && packet.type != _manager.YYIMChat.getConstants().TYPE.UNAVAILABLE) {
			_manager.YYIMChat.onSubscribe({
				from: _manager.YYIMChat.getJIDUtil().getID(packet.from),
				type: packet.type
			});
			return;
		}

		var ps = {
			from: _manager.YYIMChat.getJIDUtil().getID(packet.from),
			resource: _manager.YYIMChat.getJIDUtil().getResource(packet.from),
			type: packet.type,
			show: packet.show,
			status: packet.status
		};
		if (packet.type && packet.type == _manager.YYIMChat.getConstants().TYPE.UNAVAILABLE) {
			ps.show = _manager.YYIMChat.getConstants().STATUS.UNAVAILABLE;
			ps.status = _manager.YYIMChat.getConstants().STATUS.UNAVAILABLE;
			removeFromOnline(ps.from);
		}

		if (!YYIMCommonUtil.isStringAndNotEmpty(ps.status)) {
			ps.show = _manager.YYIMChat.getConstants().STATUS.CHAT;
			ps.status = _manager.YYIMChat.getConstants().STATUS.CHAT;
		};
		_manager.YYIMChat.onPresence(ps);
	});
}

exports.monitor = monitor;
exports.approveSubscribe = approveSubscribe;
exports.rejectSubscribe = rejectSubscribe;
exports.deleteRosterItem = deleteRosterItem;
exports.queryRosterItem = queryRosterItem;
exports.getRostersPresence = getRostersPresence;
exports.updateRosterItem = updateRosterItem;
exports.setPresence = setPresence;
exports.getVCard = getVCard;
exports.getBatchVCards = getBatchVCards;
exports.getVCards = getVCards;
exports.setVCard = setVCard;
exports.addRosterItem = addRosterItem;
exports.favoriteRoster = favoriteRoster;
exports.cancelFavoriteRoster = cancelFavoriteRoster;
exports.updateFavoriteRoster = updateFavoriteRoster;
exports.getFavoriteRosterList = getFavoriteRosterList;
exports.getRosterItems = getRosterItems;
exports.setTag = setTag;
exports.removeTag = removeTag;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _manager = __webpack_require__(0);

var _Manager = __webpack_require__(56);

_manager.YYIMManager.prototype.getTodoDigset = function (arg) {
  (0, _Manager.getTodoDigset)(arg);
};

_manager.YYIMManager.prototype.sendToDoReceipts = function (arg) {
  (0, _Manager.sendToDoReceipts)(arg);
};

_manager.YYIMManager.prototype.getHistoryTodo = function (arg) {
  (0, _Manager.getHistoryTodo)(arg);
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.sendToDoReceipts = exports.getHistoryTodo = exports.getTodoDigset = undefined;

var _stringify = __webpack_require__(1);

var _stringify2 = _interopRequireDefault(_stringify);

var _manager = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sendToDoReceipts(arg) {
	jQuery.ajax({
		url: _manager.YYIMChat.getConfig().SERVLET.REST_TODO_USER + 'read/latest?token=' + _manager.YYIMChat.getToken() + '&userId=' + _manager.YYIMChat.getUserID(),
		type: 'post',
		data: (0, _stringify2.default)({
			latestReadTs: arg.latestReadTs || 0
		}),
		dataType: 'json',
		cache: false,
		processData: false,
		contentType: "application/json",
		success: function success() {
			arg && arg.success && arg.success();
			arg && (arg = null);
		},
		error: function error(xhr) {
			try {
				arg && arg.error && arg.error(JSON.parse(xhr.responseText));
				arg && (arg = null);
			} catch (e) {
				arg && arg.error && arg.error();
				arg && (arg = null);
			}
		}
	});
}

function getTodoDigset(arg) {
	jQuery.ajax({
		url: _manager.YYIMChat.getConfig().SERVLET.REST_TODO_USER + 'abstract',
		type: 'get',
		data: {
			token: _manager.YYIMChat.getToken(),
			userId: _manager.YYIMChat.getUserID()
		},
		dataType: 'json',
		cache: false,
		success: function success(data) {
			var result;
			if (data && data.result && data.result['abstractItem']) {

				result = data.result['abstractItem'] || {};
				result['todoCount'] = data.result['todoCount'] || 0;
				result['unReadCount'] = data.result['unReadCount'] || 0;
				result['latestReadTs'] = data.result['latestReadTs'] || 0;
			}
			arg && arg.success && arg.success(result);
			arg && (arg = null);
		},
		error: function error(xhr) {
			try {
				arg && arg.error && arg.error(JSON.parse(xhr.responseText));
				arg && (arg = null);
			} catch (e) {
				arg && arg.error && arg.error();
				arg && (arg = null);
			}
		}
	});
}

function getHistoryTodo(arg) {
	jQuery.ajax({
		url: _manager.YYIMChat.getConfig().SERVLET.REST_TODO_USER + 'items',
		type: 'get',
		data: {
			token: _manager.YYIMChat.getToken(),
			userId: _manager.YYIMChat.getUserID(),
			beforeTs: arg && Number(arg.beforeTs) || '',
			todoState: arg && arg.todoState || '',
			pageSize: arg && Number(arg.pageSize) || 10
		},
		dataType: 'json',
		cache: false,
		success: function success(data) {
			var result = [];
			if (data && data.result && data.result.length) {

				result = data.result;
			}
			arg && arg.success && arg.success(result);
			arg && (arg = null);
		},
		error: function error(xhr) {
			try {
				arg && arg.error && arg.error(JSON.parse(xhr.responseText));
				arg && (arg = null);
			} catch (e) {
				arg && arg.error && arg.error();
				arg && (arg = null);
			}
		}
	});
}

exports.getTodoDigset = getTodoDigset;
exports.getHistoryTodo = getHistoryTodo;
exports.sendToDoReceipts = sendToDoReceipts;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _manager = __webpack_require__(0);

var _FileUpload = __webpack_require__(15);

__webpack_require__(58);

_manager.YYIMManager.prototype.startUpload = function (file) {
	_FileUpload.FileUpload.getInstance().start(file);
};

_manager.YYIMManager.prototype.cancelUpload = function (file) {
	_FileUpload.FileUpload.getInstance().end(file);
};

_manager.YYIMManager.prototype.getUploadingSize = function () {
	return _FileUpload.FileUpload.getInstance().getUploadingSize();
};

_manager.YYIMManager.prototype.previewLocalImage = function (arg) {
	arg = arg || {};
	var file = arg.file;
	if (file && /image\//.test(file.type)) {
		var that = this;
		try {
			if (file.type == 'image/gif') {
				var fr = new moxie.file.FileReader();
				fr.onload = function () {
					arg.success && arg.success(fr.result);
					fr.destroy();
					fr = null;
				};
				fr.readAsDataURL(file.getSource());
			} else {
				var preloader = new moxie.image.Image();
				preloader.onload = function () {
					var imgsrc = preloader.type == 'image/jpeg' ? preloader.getAsDataURL('image/jpeg', 80) : preloader.getAsDataURL();
					arg.success && arg.success(imgsrc);
					preloader.destroy();
					preloader = null;
				};
				preloader.load(file.getSource());
			}
		} catch (e) {
			arg.error && arg.error('Local address parsing errors.');
		}
	} else {
		arg.error && arg.error('The file isn`t Image.');
	}
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _manager = __webpack_require__(0);

var _FileUpload = __webpack_require__(15);

_manager.YYIMManager.getInstance().uploader = function (obj, arg) {
	arg = arg || {};

	if (typeof obj == 'string') {
		obj = document.getElementById(obj);
	}

	if (!YYIMUtil['isWhateType'](arg.chatInfo, 'Function')) {
		arg.error && arg.error('chatInfo isn`t Function.');
		return;
	}

	_FileUpload.FileUpload.getInstance().init({
		'mediaType': arg.mediaType || YYIMChat.getConfig().UPLOAD.MEDIATYPE.DOC,
		'browse_button': obj.id,
		'drop_element': arg.drop_element
	}, {
		'init': function init(uploader) {
			uploader.addFile(obj);
			obj = null;
		},

		'PostInit': function PostInit(uploader) {},

		'Refresh': function Refresh(uploader) {},

		'StateChanged': function StateChanged(uploader) {},

		'UploadFile': function UploadFile(uploader, file) {},

		'BeforeUpload': function BeforeUpload(uploader, file) {
			var chatInfo = uploader.getOption('chatInfo');
			if (chatInfo) {
				var info = chatInfo[file.id];
				if (info) {
					try {
						arg.beforeUpload && arg.beforeUpload({
							file: file,
							chatInfo: info
						});
					} catch (e) {}

					var mediaType = uploader.getOption('mediaType');

					if (YYIMChat.getConfig().UPLOAD.IMAGE_TYPES.test(file.name)) {
						mediaType = 1;
					}

					if (info['file_data_name']) {
						uploader.setOption('file_data_name', info['file_data_name']);
					}

					if (info['required_features']) {
						uploader.setOption('required_features', info['required_features']);
					}

					if (mediaType === 1 || !info.uploadUrl) {
						var to = YYIMChat.getJIDUtil().buildUserJID(YYIMChat.getJIDUtil().getNode(info.to));
						if (info.type && info.type == YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT) {
							to = YYIMChat.getJIDUtil().buildChatGroupJID(YYIMChat.getJIDUtil().getNode(info.to));
						}
						uploader.setOption('url', _FileUpload.FileUpload.getInstance().getBaseUrl() + '?' + jQuery.param({
							token: YYIMChat.getToken(),
							name: file.name,
							mediaType: mediaType,
							creator: YYIMChat.getUserNode(),
							receiver: to,
							type: file.type,
							size: file.size,
							original: 1
						}));
					} else {
						uploader.setOption('url', info.uploadUrl);
					}
				}
			}
		},

		'QueueChanged': function QueueChanged(uploader) {},

		'OptionChanged': function OptionChanged(uploader, option_name, new_value, old_value) {},

		'UploadProgress': function UploadProgress(uploader, file) {
			var chatInfo = uploader.getOption('chatInfo'),
			    info;
			if (chatInfo) {
				info = chatInfo[file.id];
			}

			arg && arg.progress && arg.progress({
				uploaded: uploader.total.uploaded,
				queued: uploader.total.queued,
				bytesPerSec: uploader.total.bytesPerSec,
				percent: uploader.total.percent,
				size: uploader.total.size,
				loaded: uploader.total.loaded,
				file: file,
				chatInfo: info
			});
		},

		'FilesAdded': function FilesAdded(uploader, files) {
			if (YYIMChat.getConfig().UPLOAD.AUTO_SEND) {
				uploader.start();
			}
		},

		'FilesRemoved': function FilesRemoved(uploader, files) {},

		'FileFiltered': function FileFiltered(uploader, file) {
			var info = arg.chatInfo({
				fileName: file.name
			});
			if (info && info.to) {
				if (!YYIMUtil['isWhateType'](info.checkType, 'Function') || info.checkType(file.getSource().type)) {
					var chatInfo = uploader.getOption('chatInfo') || {};
					chatInfo[file.id] = info;
					uploader.setOption('chatInfo', chatInfo);

					arg && arg.fileFiltered && arg.fileFiltered({
						file: file,
						chatInfo: info
					});
				} else {
					uploader.removeFile(file);
					arg && arg.error && arg.error({
						file: file,
						chatInfo: info,
						error: '格式不支持'
					});
				}
			} else {
				uploader.removeFile(file);
				arg && arg.error && arg.error({
					file: file,
					chatInfo: info,
					error: '请指定接收方'
				});
			}
		},

		'FileUploaded': function FileUploaded(uploader, file, responseObject) {
			if (responseObject.status === 200) {
				var chatInfo = uploader.getOption('chatInfo');
				if (file && file.getNative()) {
					file.path = file.getNative().path;
				}
				var info = chatInfo[file.id];
				try {
					var response = JSON.parse(responseObject.response);
					if (response.code === 0 || response.attachId || response[0]) {
						delete chatInfo[file.id];
						uploader.setOption('chatInfo', chatInfo);
						uploader.removeFile(file);
						_FileUpload.FileUpload.getInstance().remove(file.id);
						arg && arg.success && arg.success({
							data: response,
							file: file,
							chatInfo: info
						});
					} else {
						arg && arg.error && arg.error({
							data: response,
							file: file,
							chatInfo: info
						});
					}
				} catch (e) {
					arg && arg.error && arg.error({
						data: e.message,
						file: file,
						chatInfo: info
					});
				}
			}
		},

		'ChunkUploaded': function ChunkUploaded(uploader, file, responseObject) {},

		'UploadComplete': function UploadComplete(uploader, files) {},

		'Error': function Error(uploader, errObject) {
			var file = errObject.file;
			var chatInfo = uploader.getOption('chatInfo');
			if (chatInfo) {
				errObject.chatInfo = chatInfo[file.id];
			}
			arg && arg.error && arg.error(errObject);
		},

		'Destroy': function Destroy(uploader) {}
	});
};

/***/ })
/******/ ]);