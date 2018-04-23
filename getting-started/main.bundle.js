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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ./js/controlEvent */ "./src/js/controlEvent.js");

var _getRecentDigset = __webpack_require__(/*! ./js/getRecentDigset */ "./src/js/getRecentDigset.js");

var _getRecentDigset2 = _interopRequireDefault(_getRecentDigset);

var _renderHistoryMessage = __webpack_require__(/*! ./js/renderHistoryMessage */ "./src/js/renderHistoryMessage.js");

var _renderHistoryMessage2 = _interopRequireDefault(_renderHistoryMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//初始化SDK，正式环境


//获取最近联系人
YYIMChat.initSDK({
    app: 'udn', //appId
    etp: 'yonyou', //etpId
    wsurl: 'stellar.yyuap.com', //websocket Url
    wsport: 5227, //websocket port 5227/5222/5225
    hbport: 7075, //httpbind  port 7075/7070
    servlet: 'https://im.yyuap.com/', //rest Url
    flash_swf_url: 'xxx/x/Moxie.swf', //flash 上传 swf文件位置
    logEnable: true, //client log
    clientMark: 'web', //client mark 'web' or 'pc'
    apiKey: "85de79b9f7e34c37a99accaddb256990"
});
//初始化SDK，测试环境
// YYIMChat.initSDK({
//     app: 'im_pre', //appId
//     etp: 'yonyou', //etpId
//     wsurl: '172.20.15.60', //websocket Url
//     wsport: 5227, //websocket port 5227/5222/5225
//     hbport: 7075, //httpbind  port 7075/7070
//     servlet: 'http://172.20.15.60/', //rest Url
//     flash_swf_url: 'xxx/x/Moxie.swf', //flash 上传 swf文件位置
//     logEnable: true, //client log
//     clientMark: 'web', //client mark 'web' or 'pc'
//     apiKey: "85de79b9f7e34c37a99accaddb256990"
// });

//初始化回调方法


//渲染历史聊天记录
//加载事件操作
YYIMChat.init({
    onOpened: function onOpened() {
        // 登录成功
        YYIMChat.setPresence();
        localStorage.removeItem('targetuserid');
        // 获取自己信息
        YYIMChat.getVCard({
            success: function success(res) {
                //保存自己的信息
                localStorage.setItem('currentuserinfo', JSON.stringify(res));
            }
        });
        //获取最近联系人
        (0, _getRecentDigset2.default)();
    },
    onExpiration: function onExpiration(callback) {
        //自动更新token
        // callback(token, expiration);
    },
    onClosed: function onClosed(arg) {
        //连接关闭
    },
    onConflicted: function onConflicted(arg) {
        //登陆冲突
    },
    onClientKickout: function onClientKickout(arg) {
        //被他端踢掉
    },
    onUpdatePassword: function onUpdatePassword(arg) {
        //更改密码，被踢掉
    },
    onAuthError: function onAuthError(arg) {
        //登陆认证失败
    },
    onConnectError: function onConnectError(arg) {
        //连接失败
    },
    onReceipts: function onReceipts(arg) {
        //消息回执
    },
    onSubscribe: function onSubscribe(arg) {
        //发生订阅
    },
    onRosterFavorited: function onRosterFavorited(arg) {
        //被收藏
    },
    onRosterUpdateded: function onRosterUpdateded(arg) {
        //好友信息更改
    },
    onMessage: function onMessage(arg) {
        //收到消息后更新最近联系人列表
        (0, _getRecentDigset2.default)();
        //更新聊天信息，如果我正在和别人聊天，那么不跟新
        var target = localStorage.getItem('targetuserid');
        if (target && target === arg.from) {
            (0, _renderHistoryMessage2.default)(arg);
        }
    },
    onGroupUpdate: function onGroupUpdate(arg) {
        //群组更新
    },
    onKickedOutGroup: function onKickedOutGroup(arg) {
        //群成员被群主提出
    },
    onTransferGroupOwner: function onTransferGroupOwner(arg) {
        //群主转让
    },
    onPresence: function onPresence(arg) {
        //好友presence改变
    },
    onRosterDeleted: function onRosterDeleted(arg) {
        //好友被删除
    },
    onPubaccountUpdate: function onPubaccountUpdate(pubaccounts) {
        //公共号信息更新
    },
    onTransparentMessage: function onTransparentMessage(arg) {
        //透传业务消息
    }
});

/***/ }),

/***/ "./src/js/constants.js":
/*!*****************************!*\
  !*** ./src/js/constants.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var expressionList = exports.expressionList = {
    path: "./imgs/bq/",
    data: [{ actionData: "[龇牙]", "url": "expression_ciya@2x.png" }, { actionData: "[哈哈]", "url": "expression_haha@2x.png" }, { actionData: "[晕]", "url": "expression_yun@2x.png" }, { actionData: "[汗]", "url": "expression_hanb@2x.png" }, { actionData: "[害羞]", "url": "expression_haix@2x.png" }, { actionData: "[调皮]", "url": "expression_tiaop@2x.png" }, { actionData: "[疑问]", "url": "expression_yiw@2x.png" }, { actionData: "[捂脸]", "url": "expression_wulian@2x.png" }, { actionData: "[奸笑]", "url": "expression_jianxiao@2x.png" }, { actionData: "[机智]", "url": "expression_smart@2x.png" }, { actionData: "[得意]", "url": "expression_deyi@2x.png" }, { actionData: "[笑cry]", "url": "expression_laughing_tears@2x.png" }, { actionData: "[流泪]", "url": "expression_crying@2x.png" }, { actionData: "[奋斗]", "url": "expression_fendou@2x.png" }, { actionData: "[抱抱]", "url": "expression_hug@2x.png" }, { actionData: "[生病]", "url": "expression_ill@2x.png" }, { actionData: "[尴尬]", "url": "expression_ganga@2x.png" }, { actionData: "[偷笑]", "url": "expression_toux@2x.png" }, { actionData: "[赞]", "url": "expression_zan@2x.png" }, { actionData: "[握手]", "url": "expression_wos@2x.png" }, { actionData: "[OK]", "url": "expression_ok@2x.png" }, { actionData: "[yeak]", "url": "expression_yeak@2x.png" }, { actionData: "[鼓掌]", "url": "expression_guz@2x.png" }, { actionData: "[拳头]", "url": "expression_quantou@2x.png" }, { actionData: "[肌肉]", "url": "expression_jirou@2x.png" }, { actionData: "[握拳]", "url": "expression_woq@2x.png" }, { actionData: "[拜托]", "url": "expression_bait@2x.png" }, { actionData: "[愉快]", "url": "expression_yuk@2x.png" }, { actionData: "[难过]", "url": "expression_nanguo@2x.png" }, { actionData: "[闭嘴]", "url": "expression_bizui@2x.png" }, { actionData: "[困]", "url": "expression_kun@2x.png" }, { actionData: "[猪头]", "url": "expression_pig@2x.png" }, { actionData: "[爱心]", "url": "expression_heart@2x.png" }, { actionData: "[心碎]", "url": "expression_xinsui@2x.png" }, { actionData: "[礼盒]", "url": "expression_box@2x.png" }, { actionData: "[吻]", "url": "expression_kissa@2x.png" }, { actionData: "[玫瑰花]", "url": "expression_rose@2x.png" }, { actionData: "[棒棒糖]", "url": "expression_candy@2x.png" }, { actionData: "[晚安]", "url": "expression_night@2x.png" }, { actionData: "[祈祷]", "url": "expression_pray@2x.png" }, { actionData: "[给力]", "url": "expression_geili@2x.png" }, { actionData: "[踩]", "url": "expression_cai@2x.png" }, { actionData: "[亲亲]", "url": "expression_kissb@2x.png" }, { actionData: "[嘘]", "url": "expression_xu@2x.png" }, { actionData: "[色]", "url": "expression_se@2x.png" }, { actionData: "[可怜]", "url": "expression_kelian@2x.png" }, { actionData: "[发呆]", "url": "expression_fadai@2x.png" }, { actionData: "[大哭]", "url": "expression_crya@2x.png" }, { actionData: "[困Zzz]", "url": "expression_zzz@2x.png" }, { actionData: "[思考]", "url": "expression_sikao@2x.png" }, { actionData: "[白眼]", "url": "expression_baiy@2x.png" }, { actionData: "[傲慢]", "url": "expression_aoman@2x.png" }, { actionData: "[酷]", "url": "expression_ku@2x.png" }, { actionData: "[囧]", "url": "expression_jiong@2x.png" }, { actionData: "[鄙视]", "url": "expression_bis@2x.png" }, { actionData: "[饥饿]", "url": "expression_jie@2x.png" }, { actionData: "[吓]", "url": "expression_xia@2x.png" }, { actionData: "[抠鼻]", "url": "expression_koubi@2x.png" }, { actionData: "[惊讶]", "url": "expression_jingy@2x.png" }, { actionData: "[发怒]", "url": "expression_angry@2x.png" }, { actionData: "[惊恐]", "url": "expression_jingk@2x.png" }, { actionData: "[吐]", "url": "expression_tu@2x.png" }, { actionData: "[拜拜]", "url": "expression_bye@2x.png" }, { actionData: "[咖啡]", "url": "expression_coffee@2x.png" }, { actionData: "[啤酒]", "url": "expression_beer@2x.png" }, { actionData: "[下雨]", "url": "expression_rain@2x.png" }, { actionData: "[闪电]", "url": "expression_shand@2x.png" }, { actionData: "[下雪]", "url": "expression_snow@2x.png" }, { actionData: "[足球]", "url": "expression_ball@2x.png" }, { actionData: "[篮球]", "url": "expression_basket@2x.png" }, { actionData: "[飞机]", "url": "expression_plane@2x.png" }, { actionData: "[邮件]", "url": "expression_mail@2x.png" }, { actionData: "[雨伞]", "url": "expression_yusan@2x.png" }, { actionData: "[奖杯]", "url": "expression_jiangb@2x.png" }, { actionData: "[怪物]", "url": "expression_guaiwu@2x.png" }, { actionData: "[药]", "url": "expression_med@2x.png" }, { actionData: "[炸弹]", "url": "expression_zhad@2x.png" }, { actionData: "[蛋糕]", "url": "expression_cake@2x.png" }]
};

/***/ }),

/***/ "./src/js/controlEvent.js":
/*!********************************!*\
  !*** ./src/js/controlEvent.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jqelements = __webpack_require__(/*! ./jqelements */ "./src/js/jqelements.js");

var _userLogin = __webpack_require__(/*! ./userLogin */ "./src/js/userLogin.js");

var _userLogin2 = _interopRequireDefault(_userLogin);

var _getRecentDigset = __webpack_require__(/*! ./getRecentDigset */ "./src/js/getRecentDigset.js");

var _getRecentDigset2 = _interopRequireDefault(_getRecentDigset);

var _getHistoryMessage = __webpack_require__(/*! ./getHistoryMessage */ "./src/js/getHistoryMessage.js");

var _getHistoryMessage2 = _interopRequireDefault(_getHistoryMessage);

var _renderHistoryMessage = __webpack_require__(/*! ./renderHistoryMessage */ "./src/js/renderHistoryMessage.js");

var _renderHistoryMessage2 = _interopRequireDefault(_renderHistoryMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//临时自动登录的


//获取历史聊天记录


//用户登陆
if (localStorage.getItem('currentuserinfo')) {
    (0, _userLogin2.default)(JSON.parse(localStorage.getItem('currentuserinfo')).username);
}
//用户登陆


//渲染历史聊天记录


//获取获取最近联系人
//dom元素
_jqelements.$login_btn.click(function () {
    var username = _jqelements.$login_username.val();
    var password = _jqelements.$login_pass.val();
    if (/^[a-z][a-z_0-9]*$/.test(username)) {
        (0, _userLogin2.default)(username, password);
    }
});

//最大化按钮点击
$('.scalechat').click(function () {
    _jqelements.$yyim_main.hasClass('maxwindow') ? _jqelements.$yyim_main.removeClass('maxwindow') : _jqelements.$yyim_main.addClass('maxwindow');
    _jqelements.$yyim_main.css({ left: '0', top: '0' });
});

//关闭窗口按钮点击
$('.closechat').click(function () {
    localStorage.clear();
    _jqelements.$yyim_box.hide();
    _jqelements.$yyim_iogin.show();
});

//移动事件
_jqelements.$j_move.on('mousedown', function (e) {
    var originX = e.clientX;
    var originY = e.clientY;
    var boxPos = _jqelements.$yyim_main.position();
    _jqelements.$yyim_box.on('mousemove', function (e) {
        _jqelements.$yyim_main.css({ left: boxPos.left + e.clientX - originX + 'px', top: boxPos.top + e.clientY - originY + 'px' });
    });
});
_jqelements.$yyim_box.on('mouseup', function () {
    $(this).off('mousemove');
});

//搜索好友
$('.yyim-search').on('keydown', function (e) {
    var keyword = $(this).val();
    if (e.keyCode === 13 && keyword) {
        //搜索联系人
        YYIMChat.queryRosterItem({
            keyword: keyword,
            success: function success(res) {
                console.log(res);
            }
        });
    }
});

//联系人点击
_jqelements.$hcontacts.on('click', 'li', function () {
    $(this).addClass('active');
    $(this).siblings().removeClass('active');
    _jqelements.$j_move.html($(this).attr('data-id'));
    localStorage.setItem('targetuserid', $(this).attr('data-id')); //保存聊天对方id，用于给他发送消息
    (0, _getHistoryMessage2.default)($(this).attr('data-sessionVersion'), $(this).attr('data-id'), $(this).attr('data-type'));
});

//关闭联系人点击
_jqelements.$hcontacts.on('click', '.close', function () {
    console.log('关闭' + $(this).attr('data-id'));
    return false;
});

//除了自己,点击其他部分隐藏表情框
$('body').click(function () {
    _jqelements.$j_bq_box.hide();
});

//表情按钮点击
$('.j_menu_bq').hover(function () {
    $(this).addClass('hover');
    $('.bq_tip').css('display', 'block');
}, function () {
    $(this).removeClass('hover');
    $('.bq_tip').css('display', 'none');
}).click(function () {
    _jqelements.$j_bq_box.toggle();
    return false;
});

//表情点击
_jqelements.$j_bq_box.on('click', 'li', function () {
    _jqelements.$yyim_editor.val(_jqelements.$yyim_editor.val() + $(this).attr('data-code'));
    if (_jqelements.$yyim_editor.val()) {
        _jqelements.$btn_send.removeClass('adit-btn-send-disabled');
    } else {
        _jqelements.$btn_send.addClass('adit-btn-send-disabled');
    }
    return false;
});

//图片按钮点击
$('.j_menu_tp').hover(function () {
    $(this).addClass('hover');
    $('.tp_tip').css('display', 'block');
}, function () {
    $(this).removeClass('hover');
    $('.tp_tip').css('display', 'none');
}).click(function () {
    $('#uploadfile').click();
});

//控制是否可以发送
_jqelements.$yyim_editor.on('input propertychange', function () {
    if ($(this).val()) {
        _jqelements.$btn_send.removeClass('adit-btn-send-disabled');
    } else {
        _jqelements.$btn_send.addClass('adit-btn-send-disabled');
    }
});

//文件按钮点击
$('.j_menu_wj').hover(function () {
    $(this).addClass('hover');
    $('.wj_tip').css('display', 'block');
}, function () {
    $(this).removeClass('hover');
    $('.wj_tip').css('display', 'none');
}).click(function () {
    console.log('发送文件');
});

//发送按钮点击
_jqelements.$btn_send.on('click', function () {
    var to = localStorage.getItem('targetuserid');
    if (_jqelements.$yyim_editor.val()) {
        YYIMChat.sendTextMessage({
            to: to, //对话人id
            type: "chat", //chat:单聊，groupcgat:群聊,pubaccount:公众号
            content: _jqelements.$yyim_editor.val(), //消息文本
            extend: '', //扩展字段
            success: function success(msg) {
                _jqelements.$yyim_editor.val('');
                _jqelements.$btn_send.addClass('adit-btn-send-disabled');
                (0, _getRecentDigset2.default)();
                (0, _renderHistoryMessage2.default)(msg);
            }
        });
    }
});

//按下enter也可以发送
_jqelements.$yyim_editor.on('keydown', function (e) {
    if (e.keyCode === 13 && _jqelements.$yyim_editor.val()) {
        var to = localStorage.getItem('targetuserid');
        YYIMChat.sendTextMessage({
            to: to, //对话人id
            type: "chat", //chat:单聊，groupcgat:群聊,pubaccount:公众号
            content: _jqelements.$yyim_editor.val(), //消息文本
            extend: '', //扩展字段
            success: function success(msg) {
                _jqelements.$yyim_editor.val('');
                _jqelements.$btn_send.addClass('adit-btn-send-disabled');
                (0, _getRecentDigset2.default)();
                (0, _renderHistoryMessage2.default)(msg);
            }
        });
    }
});

/***/ }),

/***/ "./src/js/getHistoryMessage.js":
/*!*************************************!*\
  !*** ./src/js/getHistoryMessage.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jqelements = __webpack_require__(/*! ./jqelements */ "./src/js/jqelements.js");

var _renderHistoryMessage = __webpack_require__(/*! ./renderHistoryMessage */ "./src/js/renderHistoryMessage.js");

var _renderHistoryMessage2 = _interopRequireDefault(_renderHistoryMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//获取聊天历史,传入sessionVersion,对方id和type参数
//dom元素
exports.default = function (sessionVersion, id, type) {
    var endVersion = sessionVersion;
    var start = endVersion > 20 ? endVersion - 20 : 0;
    YYIMChat.getHistoryMessage({
        id: id,
        type: type,
        startVersion: start,
        endVersion: endVersion,
        success: function success(res) {
            _jqelements.$chats_list.html('');
            _jqelements.$chat_box.show();
            if (res.result.length > 0) {
                //把聊天记录缓存到本地
                localStorage.setItem('historychats', JSON.stringify(res.result));
                (0, _renderHistoryMessage2.default)();
            }
        }
    });
};

//渲染聊天记录

/***/ }),

/***/ "./src/js/getRecentDigset.js":
/*!***********************************!*\
  !*** ./src/js/getRecentDigset.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jqelements = __webpack_require__(/*! ./jqelements */ "./src/js/jqelements.js");

//获取最近联系人
exports.default = function () {
    _jqelements.$hcontacts.html('');
    // 拉取摘要
    YYIMChat.getRecentDigset({
        success: function success(result) {
            var targetuserid = localStorage.getItem('targetuserid');
            //result.list是最近联系人
            if (result.list.length) {
                var contactStr = '';
                result.list.forEach(function (e, i) {
                    //目前测试只显示个人聊天，不显示群或其他
                    if (e.type !== 'chat') {
                        return;
                    }
                    _jqelements.$hcontacts.html('');
                    contactStr += '<li class="' + (targetuserid && targetuserid === e.id ? 'active' : '') + '" data-sessionVersion="' + e.sessionVersion + '" data-id="' + e.id + '" data-type="' + e.type + '">\n                                        <i data-id="' + e.id + '" class="close">\xD7</i>\n                                        <div class="avatar">\n                                            <img src="./imgs/avatar.jpg" alt="">\n                                        </div>\n                                        <div class="detail">\n                                            <h3 class="name cuttxt">' + (e.name || e.id) + '</h3>\n                                            <p class="msg cuttxt">' + (e.lastMessage && e.lastMessage.data.contentType === 2 ? e.lastMessage.data.content : '') + '</p>\n                                        </div>\n                                        <i class="newtip cuttxt">2</i>\n                                    </li>';
                    _jqelements.$hcontacts.html(contactStr);
                });
            }
        },
        error: function error(err) {
            console.log(err);
        }
    });
}; //dom元素

/***/ }),

/***/ "./src/js/jqelements.js":
/*!******************************!*\
  !*** ./src/js/jqelements.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var $yyim_iogin = exports.$yyim_iogin = $('.yyim-iogin'); //登陆框
var $login_username = exports.$login_username = $('.login-username'); //登陆用户名
var $login_pass = exports.$login_pass = $('.login-pass'); //登陆用户密码
var $login_btn = exports.$login_btn = $('.login-btn'); //登陆按钮
var $yyim_box = exports.$yyim_box = $('.yyim-box'); //聊天框的遮罩
var $yyim_main = exports.$yyim_main = $('.yyim-main'); //聊天最外层窗口
var $j_move = exports.$j_move = $('.j_move'); //聊天窗口头
var $hcontacts = exports.$hcontacts = $('.hcontacts'); //最近联系人框
var $chats = exports.$chats = $('.chats'); //聊天信息滑动容器
var $j_bq_box = exports.$j_bq_box = $('.j_bq_box'); //表情盒子
var $yyim_editor = exports.$yyim_editor = $('.yyim-editor'); //聊天输入框
var $btn_send = exports.$btn_send = $('.adit-btn-send'); //发送按钮
var $chat_box = exports.$chat_box = $('.chat-box'); //控制是否具有聊天内容
var $chats_list = exports.$chats_list = $('.chats-list'); //聊天信息列表

/***/ }),

/***/ "./src/js/renderHistoryMessage.js":
/*!****************************************!*\
  !*** ./src/js/renderHistoryMessage.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jqelements = __webpack_require__(/*! ./jqelements */ "./src/js/jqelements.js");

var _constants = __webpack_require__(/*! ./constants */ "./src/js/constants.js");

//放置表情列表
//dom元素
_jqelements.$j_bq_box.html(_constants.expressionList.data.map(function (t) {
    return '<li data-code="' + t.actionData + '"><img src="' + (_constants.expressionList.path + t.url) + '" title="' + t.actionData + '" alt=""></li>';
}));

//用图片替换文本消息中表情信息
var replaceEmoji = function replaceEmoji(str) {
    return str.replace(/\[[^\[\]]+\]/g, function (e) {
        var i = -1;
        do {
            i++;
        } while (e !== _constants.expressionList.data[i].actionData);
        return '<img src="' + (_constants.expressionList.path + _constants.expressionList.data[i].url) + '" alt="" />';
    });
};

//渲染聊天记录,直接传入聊天记录列表即可

exports.default = function (arg) {
    var historychats = localStorage.getItem('historychats') || "[]";
    historychats = JSON.parse(historychats);
    if (arg) {
        historychats.unshift(arg);
        localStorage.setItem('historychats', JSON.stringify(historychats));
    };
    historychats.reverse();
    var chatsStr = '';
    var myid = JSON.parse(localStorage.getItem('currentuserinfo')).id;

    historychats.forEach(function (chat, i) {
        var isfromme = myid === chat.from;
        if (chat.data.contentType === 2) {
            chatsStr += '<li>\n                            <div class="chat-tip">' + new Date(chat.data.dateline).toLocaleTimeString() + '</div>\n                            <div class="chat-content">\n                                <div class="' + (isfromme ? 'chat-avatar chat-avatar-send' : 'chat-avatar') + '">\n                                    <img src="./imgs/avatar.jpg" alt="">\n                                </div>\n                                <div class="' + (isfromme ? 'chat-txt chat-txt-send' : 'chat-txt') + '">\n                                    <div class="chat-user-name">' + chat.from + '</div>\n                                    <div class="chat-msg">' + replaceEmoji(chat.data.content) + '</div>\n                                </div>\n                            </div>\n                        </li> ';
        }
    });
    _jqelements.$chats_list.html(chatsStr);
    _jqelements.$chats.scrollTop(_jqelements.$chats[0].scrollHeight);
};

/***/ }),

/***/ "./src/js/userLogin.js":
/*!*****************************!*\
  !*** ./src/js/userLogin.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jqelements = __webpack_require__(/*! ./jqelements */ "./src/js/jqelements.js");

//用户登陆，传入用户名(暂时写死为zongtf，因为其他的注册不成功)
exports.default = function (username, password) {
    //正式环境
    $.ajax({
        url: 'https://im.yyuap.com/sysadmin/rest/yonyou/udn/token',
        type: 'POST',
        dataType: 'json',
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({
            "username": username,
            "clientId": "c85130ac2c80d83b86fc1bc344ac1211",
            "clientSecret": "CED146135A584D5F2EAB33635D19AE99"
        }),
        success: function success(result) {
            var clientIdentify = "pc" + String(new Date().getTime());
            _jqelements.$yyim_iogin.hide();
            _jqelements.$yyim_box.show();
            //登陆YYIMSDK
            YYIMChat.login({
                "username": username,
                "token": result.token,
                "expiration": result.expiration,
                "appType": 4,
                "identify": clientIdentify
            });
        },
        error: function error(arg) {
            console.log(arg);
        }
    });
    //测试环境
    // $.ajax({
    //     url: 'http://172.20.15.60/sysadmin/rest/yonyou/im_pre/token',
    //     type: 'POST',
    //     dataType: 'json',
    //     headers: {"Content-Type": "application/json"},
    //     data: JSON.stringify({
    //         "username":username,
    //         "clientId":"b26ba51058eee9db4f88a7a2b1bd1b06",
    //         "clientSecret":"CC9A71E0C2528EDB1652DFB18ECE8DDF"
    //     }),
    //     success: function (result) {
    //         let clientIdentify = "pc" + String(new Date().getTime());
    //         $yyim_iogin.hide();
    //         $yyim_box.show();
    //         //登陆YYIMSDK
    //         YYIMChat.login({
    //             "username": username,
    //             "token": result.token,
    //             "expiration": result.expiration,
    //             "appType": 4,
    //             "identify": clientIdentify
    //         });
    //     },
    //     error: function (arg) {
    //         console.log(arg);
    //     }
    // });
}; //元素

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbnRyb2xFdmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZ2V0SGlzdG9yeU1lc3NhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2dldFJlY2VudERpZ3NldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvanFlbGVtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcmVuZGVySGlzdG9yeU1lc3NhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VzZXJMb2dpbi5qcyJdLCJuYW1lcyI6WyJZWUlNQ2hhdCIsImluaXRTREsiLCJhcHAiLCJldHAiLCJ3c3VybCIsIndzcG9ydCIsImhicG9ydCIsInNlcnZsZXQiLCJmbGFzaF9zd2ZfdXJsIiwibG9nRW5hYmxlIiwiY2xpZW50TWFyayIsImFwaUtleSIsImluaXQiLCJvbk9wZW5lZCIsInNldFByZXNlbmNlIiwibG9jYWxTdG9yYWdlIiwicmVtb3ZlSXRlbSIsImdldFZDYXJkIiwic3VjY2VzcyIsInJlcyIsInNldEl0ZW0iLCJKU09OIiwic3RyaW5naWZ5Iiwib25FeHBpcmF0aW9uIiwiY2FsbGJhY2siLCJvbkNsb3NlZCIsImFyZyIsIm9uQ29uZmxpY3RlZCIsIm9uQ2xpZW50S2lja291dCIsIm9uVXBkYXRlUGFzc3dvcmQiLCJvbkF1dGhFcnJvciIsIm9uQ29ubmVjdEVycm9yIiwib25SZWNlaXB0cyIsIm9uU3Vic2NyaWJlIiwib25Sb3N0ZXJGYXZvcml0ZWQiLCJvblJvc3RlclVwZGF0ZWRlZCIsIm9uTWVzc2FnZSIsInRhcmdldCIsImdldEl0ZW0iLCJmcm9tIiwib25Hcm91cFVwZGF0ZSIsIm9uS2lja2VkT3V0R3JvdXAiLCJvblRyYW5zZmVyR3JvdXBPd25lciIsIm9uUHJlc2VuY2UiLCJvblJvc3RlckRlbGV0ZWQiLCJvblB1YmFjY291bnRVcGRhdGUiLCJwdWJhY2NvdW50cyIsIm9uVHJhbnNwYXJlbnRNZXNzYWdlIiwiZXhwcmVzc2lvbkxpc3QiLCJwYXRoIiwiZGF0YSIsImFjdGlvbkRhdGEiLCJwYXJzZSIsInVzZXJuYW1lIiwiY2xpY2siLCJ2YWwiLCJwYXNzd29yZCIsInRlc3QiLCIkIiwiaGFzQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwiY3NzIiwibGVmdCIsInRvcCIsImNsZWFyIiwiaGlkZSIsInNob3ciLCJvbiIsImUiLCJvcmlnaW5YIiwiY2xpZW50WCIsIm9yaWdpblkiLCJjbGllbnRZIiwiYm94UG9zIiwicG9zaXRpb24iLCJvZmYiLCJrZXl3b3JkIiwia2V5Q29kZSIsInF1ZXJ5Um9zdGVySXRlbSIsImNvbnNvbGUiLCJsb2ciLCJzaWJsaW5ncyIsImh0bWwiLCJhdHRyIiwiaG92ZXIiLCJ0b2dnbGUiLCJ0byIsInNlbmRUZXh0TWVzc2FnZSIsInR5cGUiLCJjb250ZW50IiwiZXh0ZW5kIiwibXNnIiwic2Vzc2lvblZlcnNpb24iLCJpZCIsImVuZFZlcnNpb24iLCJzdGFydCIsImdldEhpc3RvcnlNZXNzYWdlIiwic3RhcnRWZXJzaW9uIiwicmVzdWx0IiwibGVuZ3RoIiwiZ2V0UmVjZW50RGlnc2V0IiwidGFyZ2V0dXNlcmlkIiwibGlzdCIsImNvbnRhY3RTdHIiLCJmb3JFYWNoIiwiaSIsIm5hbWUiLCJsYXN0TWVzc2FnZSIsImNvbnRlbnRUeXBlIiwiZXJyb3IiLCJlcnIiLCIkeXlpbV9pb2dpbiIsIiRsb2dpbl91c2VybmFtZSIsIiRsb2dpbl9wYXNzIiwiJGxvZ2luX2J0biIsIiR5eWltX2JveCIsIiR5eWltX21haW4iLCIkal9tb3ZlIiwiJGhjb250YWN0cyIsIiRjaGF0cyIsIiRqX2JxX2JveCIsIiR5eWltX2VkaXRvciIsIiRidG5fc2VuZCIsIiRjaGF0X2JveCIsIiRjaGF0c19saXN0IiwibWFwIiwidCIsInVybCIsInJlcGxhY2VFbW9qaSIsInN0ciIsInJlcGxhY2UiLCJoaXN0b3J5Y2hhdHMiLCJ1bnNoaWZ0IiwicmV2ZXJzZSIsImNoYXRzU3RyIiwibXlpZCIsImNoYXQiLCJpc2Zyb21tZSIsIkRhdGUiLCJkYXRlbGluZSIsInRvTG9jYWxlVGltZVN0cmluZyIsInNjcm9sbFRvcCIsInNjcm9sbEhlaWdodCIsImFqYXgiLCJkYXRhVHlwZSIsImhlYWRlcnMiLCJjbGllbnRJZGVudGlmeSIsIlN0cmluZyIsImdldFRpbWUiLCJsb2dpbiIsInRva2VuIiwiZXhwaXJhdGlvbiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2xFQTs7QUFHQTs7OztBQUdBOzs7Ozs7QUFFQTs7O0FBTkE7QUFPQUEsU0FBU0MsT0FBVCxDQUFpQjtBQUNiQyxTQUFLLEtBRFEsRUFDRDtBQUNaQyxTQUFLLFFBRlEsRUFFRTtBQUNmQyxXQUFPLG1CQUhNLEVBR2U7QUFDNUJDLFlBQVEsSUFKSyxFQUlDO0FBQ2RDLFlBQVEsSUFMSyxFQUtDO0FBQ2RDLGFBQVMsdUJBTkksRUFNcUI7QUFDbENDLG1CQUFlLGlCQVBGLEVBT3FCO0FBQ2xDQyxlQUFXLElBUkUsRUFRSTtBQUNqQkMsZ0JBQVksS0FUQyxFQVNNO0FBQ25CQyxZQUFRO0FB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QUFmO0FBT0gsU0F0QkU7QUF1QkhyQyxlQUFPLGVBQVVwRixHQUFWLEVBQWU7QUFDbEJzRCxvQkFBUUMsR0FBUixDQUFZdkQsR0FBWjtBQUNIO0FBekJFLEtBQVA7QUEyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSCxDLEVBN0RELEkiLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIvL+WKoOi9veS6i+S7tuaTjeS9nFxyXG5pbXBvcnQgJy4vanMvY29udHJvbEV2ZW50JztcclxuXHJcbi8v6I635Y+W5pyA6L+R6IGU57O75Lq6XHJcbmltcG9ydCBnZXRSZWNlbnREaWdzZXQgZnJvbSAnLi9qcy9nZXRSZWNlbnREaWdzZXQnO1xyXG5cclxuLy/muLLmn5Pljoblj7LogYrlpKnorrDlvZVcclxuaW1wb3J0IHJlbmRlckhpc3RvcnlNZXNzYWdlIGZyb20gJy4vanMvcmVuZGVySGlzdG9yeU1lc3NhZ2UnO1xyXG5cclxuLy/liJ3lp4vljJZTREvvvIzmraPlvI/njq/looNcclxuWVlJTUNoYXQuaW5pdFNESyh7XHJcbiAgICBhcHA6ICd1ZG4nLCAvL2FwcElkXHJcbiAgICBldHA6ICd5b255b3UnLCAvL2V0cElkXHJcbiAgICB3c3VybDogJ3N0ZWxsYXIueXl1YXAuY29tJywgLy93ZWJzb2NrZXQgVXJsXHJcbiAgICB3c3BvcnQ6IDUyMjcsIC8vd2Vic29ja2V0IHBvcnQgNTIyNy81MjIyLzUyMjVcclxuICAgIGhicG9ydDogNzA3NSwgLy9odHRwYmluZCAgcG9ydCA3MDc1LzcwNzBcclxuICAgIHNlcnZsZXQ6ICdodHRwczovL2ltLnl5dWFwLmNvbS8nLCAvL3Jlc3QgVXJsXHJcbiAgICBmbGFzaF9zd2ZfdXJsOiAneHh4L3gvTW94aWUuc3dmJywgLy9mbGFzaCDkuIrkvKAgc3dm5paH5Lu25L2N572uXHJcbiAgICBsb2dFbmFibGU6IHRydWUsIC8vY2xpZW50IGxvZ1xyXG4gICAgY2xpZW50TWFyazogJ3dlYicsIC8vY2xpZW50IG1hcmsgJ3dlYicgb3IgJ3BjJ1xyXG4gICAgYXBpS2V5OiBcIjg1ZGU3OWI5ZjdlMzRjMzdhOTlhY2NhZGRiMjU2OTkwXCJcclxufSk7XHJcbi8v5Yid5aeL5YyWU0RL77yM5rWL6K+V546v5aKDXHJcbi8vIFlZSU1DaGF0LmluaXRTREsoe1xyXG4vLyAgICAgYXBwOiAnaW1fcHJlJywgLy9hcHBJZFxyXG4vLyAgICAgZXRwOiAneW9ueW91JywgLy9ldHBJZFxyXG4vLyAgICAgd3N1cmw6ICcxNzIuMjAuMTUuNjAnLCAvL3dlYnNvY2tldCBVcmxcclxuLy8gICAgIHdzcG9ydDogNTIyNywgLy93ZWJzb2NrZXQgcG9ydCA1MjI3LzUyMjIvNTIyNVxyXG4vLyAgICAgaGJwb3J0OiA3MDc1LCAvL2h0dHBiaW5kICBwb3J0IDcwNzUvNzA3MFxyXG4vLyAgICAgc2VydmxldDogJ2h0dHA6Ly8xNzIuMjAuMTUuNjAvJywgLy9yZXN0IFVybFxyXG4vLyAgICAgZmxhc2hfc3dmX3VybDogJ3h4eC94L01veGllLnN3ZicsIC8vZmxhc2gg5LiK5LygIHN3ZuaWh+S7tuS9jee9rlxyXG4vLyAgICAgbG9nRW5hYmxlOiB0cnVlLCAvL2NsaWVudCBsb2dcclxuLy8gICAgIGNsaWVudE1hcms6ICd3ZWInLCAvL2NsaWVudCBtYXJrICd3ZWInIG9yICdwYydcclxuLy8gICAgIGFwaUtleTogXCI4NWRlNzliOWY3ZTM0YzM3YTk5YWNjYWRkYjI1Njk5MFwiXHJcbi8vIH0pO1xyXG5cclxuLy/liJ3lp4vljJblm57osIPmlrnms5VcclxuWVlJTUNoYXQuaW5pdCh7XHJcbiAgICBvbk9wZW5lZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g55m75b2V5oiQ5YqfXHJcbiAgICAgICAgWVlJTUNoYXQuc2V0UHJlc2VuY2UoKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndGFyZ2V0dXNlcmlkJyk7XHJcbiAgICAgICAgLy8g6I635Y+W6Ieq5bex5L+h5oGvXHJcbiAgICAgICAgWVlJTUNoYXQuZ2V0VkNhcmQoe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAvL+S/neWtmOiHquW3seeahOS/oeaBr1xyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2N1cnJlbnR1c2VyaW5mbycsIEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy/ojrflj5bmnIDov5HogZTns7vkurpcclxuICAgICAgICBnZXRSZWNlbnREaWdzZXQoKTtcclxuICAgIH0sXHJcbiAgICBvbkV4cGlyYXRpb246IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgLy/oh6rliqjmm7TmlrB0b2tlblxyXG4gICAgICAgIC8vIGNhbGxiYWNrKHRva2VuLCBleHBpcmF0aW9uKTtcclxuICAgIH0sXHJcbiAgICBvbkNsb3NlZDogZnVuY3Rpb24oYXJnKSB7XHJcbiAgICAgICAgLy/ov57mjqXlhbPpl61cclxuICAgIH0sXHJcbiAgICBvbkNvbmZsaWN0ZWQ6IGZ1bmN0aW9uKGFyZykge1xyXG4gICAgICAgIC8v55m76ZmG5Yay56qBXHJcbiAgICB9LFxyXG4gICAgb25DbGllbnRLaWNrb3V0OiBmdW5jdGlvbihhcmcpIHtcclxuICAgICAgICAvL+iiq+S7luerr+i4ouaOiVxyXG4gICAgfSxcclxuICAgIG9uVXBkYXRlUGFzc3dvcmQ6IGZ1bmN0aW9uKGFyZykge1xyXG4gICAgICAgIC8v5pu05pS55a+G56CB77yM6KKr6Lii5o6JXHJcbiAgICB9LFxyXG4gICAgb25BdXRoRXJyb3I6IGZ1bmN0aW9uKGFyZykge1xyXG4gICAgICAgIC8v55m76ZmG6K6k6K+B5aSx6LSlXHJcbiAgICB9LFxyXG4gICAgb25Db25uZWN0RXJyb3I6IGZ1bmN0aW9uKGFyZykge1xyXG4gICAgICAgIC8v6L+e5o6l5aSx6LSlXHJcbiAgICB9LFxyXG4gICAgb25SZWNlaXB0czogZnVuY3Rpb24oYXJnKSB7XHJcbiAgICAgICAgLy/mtojmga/lm57miadcclxuICAgIH0sXHJcbiAgICBvblN1YnNjcmliZTogZnVuY3Rpb24oYXJnKSB7XHJcbiAgICAgICAgLy/lj5HnlJ/orqLpmIVcclxuICAgIH0sXHJcbiAgICBvblJvc3RlckZhdm9yaXRlZDogZnVuY3Rpb24oYXJnKSB7XHJcbiAgICAgICAgLy/ooqvmlLbol49cclxuICAgIH0sXHJcbiAgICBvblJvc3RlclVwZGF0ZWRlZDogZnVuY3Rpb24oYXJnKSB7XHJcbiAgICAgICAgLy/lpb3lj4vkv6Hmga/mm7TmlLlcclxuICAgIH0sXHJcbiAgICBvbk1lc3NhZ2U6IGZ1bmN0aW9uKGFyZykge1xyXG4gICAgICAgIC8v5pS25Yiw5raI5oGv5ZCO5pu05paw5pyA6L+R6IGU57O75Lq65YiX6KGoXHJcbiAgICAgICAgZ2V0UmVjZW50RGlnc2V0KCk7XHJcbiAgICAgICAgLy/mm7TmlrDogYrlpKnkv6Hmga/vvIzlpoLmnpzmiJHmraPlnKjlkozliKvkurrogYrlpKnvvIzpgqPkuYjkuI3ot5/mlrBcclxuICAgICAgICBsZXQgdGFyZ2V0ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RhcmdldHVzZXJpZCcpO1xyXG4gICAgICAgIGlmKHRhcmdldCAmJiB0YXJnZXQgPT09IGFyZy5mcm9tKSB7XHJcbiAgICAgICAgICAgIHJlbmRlckhpc3RvcnlNZXNzYWdlKGFyZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG9uR3JvdXBVcGRhdGU6IGZ1bmN0aW9uKGFyZykge1xyXG4gICAgICAgIC8v576k57uE5pu05pawXHJcbiAgICB9LFxyXG4gICAgb25LaWNrZWRPdXRHcm91cDogZnVuY3Rpb24oYXJnKSB7XHJcbiAgICAgICAgLy/nvqTmiJDlkZjooqvnvqTkuLvmj5Dlh7pcclxuICAgIH0sXHJcbiAgICBvblRyYW5zZmVyR3JvdXBPd25lcjogZnVuY3Rpb24oYXJnKXtcclxuICAgICAgICAvL+e+pOS4u+i9rOiuqVxyXG4gICAgfSxcclxuICAgIG9uUHJlc2VuY2U6IGZ1bmN0aW9uKGFyZykge1xyXG4gICAgICAgIC8v5aW95Y+LcHJlc2VuY2XmlLnlj5hcclxuICAgIH0sXHJcbiAgICBvblJvc3RlckRlbGV0ZWQ6IGZ1bmN0aW9uKGFyZykge1xyXG4gICAgICAgIC8v5aW95Y+L6KKr5Yig6ZmkXHJcbiAgICB9LFxyXG4gICAgb25QdWJhY2NvdW50VXBkYXRlOiBmdW5jdGlvbihwdWJhY2NvdW50cykge1xyXG4gICAgICAgIC8v5YWs5YWx5Y+35L+h5oGv5pu05pawXHJcbiAgICB9LFxyXG4gICAgb25UcmFuc3BhcmVudE1lc3NhZ2U6IGZ1bmN0aW9uKGFyZykge1xyXG4gICAgICAgIC8v6YCP5Lyg5Lia5Yqh5raI5oGvXHJcbiAgICB9XHJcbn0pO1xyXG5cclxuIiwiZXhwb3J0IGNvbnN0IGV4cHJlc3Npb25MaXN0ID0ge1xyXG4gICAgcGF0aDogXCIuL2ltZ3MvYnEvXCIsXHJcbiAgICBkYXRhOiBbXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvpvofniZldXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9jaXlhQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlk4jlk4hdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9oYWhhQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmmZVdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl95dW5AMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+axl11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2hhbmJAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+Wus+e+nl1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2hhaXhAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+iwg+earl1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3RpYW9wQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvnlpHpl65dXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl95aXdAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+aNguiEuF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3d1bGlhbkAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5aW456yRXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25famlhbnhpYW9AMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+acuuaZul1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3NtYXJ0QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlvpfmhI9dXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9kZXlpQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvnrJFjcnldXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9sYXVnaGluZ190ZWFyc0AyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5rWB5rOqXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fY3J5aW5nQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlpYvmlpddXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9mZW5kb3VAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+aKseaKsV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2h1Z0AyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb55Sf55eFXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25faWxsQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlsLTlsKxdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9nYW5nYUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5YG356yRXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fdG91eEAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6LWeXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25femFuQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmj6HmiYtdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl93b3NAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW09LXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fb2tAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW3llYWtdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl95ZWFrQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvpvJPmjoxdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9ndXpAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+aLs+WktF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3F1YW50b3VAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+iCjOiCiV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2ppcm91QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmj6Hmi7NdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl93b3FAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+aLnOaJmF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2JhaXRAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+aEieW/q11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3l1a0AyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6Zq+6L+HXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fbmFuZ3VvQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvpl63lmLRdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9iaXp1aUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5ZuwXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fa3VuQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvnjKrlpLRdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9waWdAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+eIseW/g11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2hlYXJ0QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlv4Pnoo5dXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl94aW5zdWlAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+ekvOebkl1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2JveEAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5ZC7XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fa2lzc2FAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+eOq+eRsOiKsV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3Jvc2VAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+ajkuajkuezll1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2NhbmR5QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmmZrlroldXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9uaWdodEAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb56WI56W3XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fcHJheUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb57uZ5YqbXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fZ2VpbGlAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+i4qV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2NhaUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5Lqy5LqyXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fa2lzc2JAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WYmF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3h1QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvoibJdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9zZUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5Y+v5oCcXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fa2VsaWFuQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlj5HlkYZdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9mYWRhaUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5aSn5ZOtXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fY3J5YUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5ZuwWnp6XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fenp6QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmgJ3ogINdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9zaWthb0AyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb55m955y8XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fYmFpeUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5YKy5oWiXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fYW9tYW5AMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+mFt11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2t1QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlm6ddXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9qaW9uZ0AyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6YSZ6KeGXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fYmlzQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvppaXppb9dXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9qaWVAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WQk11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3hpYUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5oqg6by7XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fa291YmlAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+aDiuiutl1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2ppbmd5QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlj5HmgJJdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9hbmdyeUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5oOK5oGQXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25famluZ2tAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WQkF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3R1QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmi5zmi5xdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9ieWVAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WSluWVoV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2NvZmZlZUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5ZWk6YWSXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fYmVlckAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5LiL6ZuoXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fcmFpbkAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6Zeq55S1XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fc2hhbmRAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+S4i+mbql1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3Nub3dAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+i2s+eQg11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2JhbGxAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+evrueQg11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2Jhc2tldEAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6aOe5py6XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fcGxhbmVAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+mCruS7tl1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX21haWxAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+mbqOS8nl1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3l1c2FuQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlpZbmna9dXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9qaWFuZ2JAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+aAqueJqV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2d1YWl3dUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6I2vXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fbWVkQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvngrjlvLldXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl96aGFkQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvom4vns5VdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9jYWtlQDJ4LnBuZ1wiIH1cclxuICAgIF1cclxufTsiLCIvL2RvbeWFg+e0oFxyXG5pbXBvcnQge1xyXG4gICAgJHl5aW1faW9naW4sXHJcbiAgICAkeXlpbV9ib3gsXHJcbiAgICAkeXlpbV9tYWluLFxyXG4gICAgJGpfbW92ZSxcclxuICAgICRqX2JxX2JveCxcclxuICAgICR5eWltX2VkaXRvcixcclxuICAgICRidG5fc2VuZCxcclxuICAgICRsb2dpbl91c2VybmFtZSxcclxuICAgICRsb2dpbl9wYXNzLFxyXG4gICAgJGxvZ2luX2J0bixcclxuICAgICRoY29udGFjdHNcclxufSBmcm9tICcuL2pxZWxlbWVudHMnO1xyXG5cclxuLy/nlKjmiLfnmbvpmYZcclxuaW1wb3J0IHVzZXJMb2dpbiBmcm9tICcuL3VzZXJMb2dpbic7XHJcblxyXG4vL+iOt+WPluiOt+WPluacgOi/keiBlOezu+S6ulxyXG5pbXBvcnQgZ2V0UmVjZW50RGlnc2V0IGZyb20gJy4vZ2V0UmVjZW50RGlnc2V0JztcclxuXHJcbi8v6I635Y+W5Y6G5Y+y6IGK5aSp6K6w5b2VXHJcbmltcG9ydCBnZXRIaXN0b3J5TWVzc2FnZSBmcm9tICcuL2dldEhpc3RvcnlNZXNzYWdlJztcclxuXHJcbi8v5riy5p+T5Y6G5Y+y6IGK5aSp6K6w5b2VXHJcbmltcG9ydCByZW5kZXJIaXN0b3J5TWVzc2FnZSBmcm9tICcuL3JlbmRlckhpc3RvcnlNZXNzYWdlJztcclxuXHJcblxyXG4vL+S4tOaXtuiHquWKqOeZu+W9leeahFxyXG5pZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudHVzZXJpbmZvJykpe1xyXG4gICAgdXNlckxvZ2luKEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnR1c2VyaW5mbycpKS51c2VybmFtZSk7XHJcbn1cclxuLy/nlKjmiLfnmbvpmYZcclxuJGxvZ2luX2J0bi5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgdXNlcm5hbWUgPSAkbG9naW5fdXNlcm5hbWUudmFsKCk7XHJcbiAgICBsZXQgcGFzc3dvcmQgPSAkbG9naW5fcGFzcy52YWwoKTtcclxuICAgIGlmKC9eW2Etel1bYS16XzAtOV0qJC8udGVzdCh1c2VybmFtZSkpe1xyXG4gICAgICAgIHVzZXJMb2dpbih1c2VybmFtZSwgcGFzc3dvcmQpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8v5pyA5aSn5YyW5oyJ6ZKu54K55Ye7XHJcbiQoJy5zY2FsZWNoYXQnKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAkeXlpbV9tYWluLmhhc0NsYXNzKCdtYXh3aW5kb3cnKSA/ICR5eWltX21haW4ucmVtb3ZlQ2xhc3MoJ21heHdpbmRvdycpIDogJHl5aW1fbWFpbi5hZGRDbGFzcygnbWF4d2luZG93Jyk7XHJcbiAgICAkeXlpbV9tYWluLmNzcyh7bGVmdDogJzAnLCB0b3A6ICcwJ30pO1xyXG59KTtcclxuXHJcbi8v5YWz6Zet56qX5Y+j5oyJ6ZKu54K55Ye7XHJcbiQoJy5jbG9zZWNoYXQnKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcclxuICAgICR5eWltX2JveC5oaWRlKCk7XHJcbiAgICAkeXlpbV9pb2dpbi5zaG93KCk7XHJcbn0pO1xyXG5cclxuLy/np7vliqjkuovku7ZcclxuJGpfbW92ZS5vbignbW91c2Vkb3duJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIGxldCBvcmlnaW5YID0gZS5jbGllbnRYO1xyXG4gICAgbGV0IG9yaWdpblkgPSBlLmNsaWVudFk7XHJcbiAgICBsZXQgYm94UG9zID0gJHl5aW1fbWFpbi5wb3NpdGlvbigpO1xyXG4gICAgJHl5aW1fYm94Lm9uKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICR5eWltX21haW4uY3NzKHtsZWZ0OiAoYm94UG9zLmxlZnQgKyBlLmNsaWVudFggLSBvcmlnaW5YKSArICdweCcsIHRvcDogKGJveFBvcy50b3AgKyBlLmNsaWVudFkgLSBvcmlnaW5ZKSArICdweCd9KTtcclxuICAgIH0pO1xyXG59KTtcclxuJHl5aW1fYm94Lm9uKCdtb3VzZXVwJywgZnVuY3Rpb24gKCkge1xyXG4gICAgJCh0aGlzKS5vZmYoJ21vdXNlbW92ZScpO1xyXG59KTtcclxuXHJcblxyXG4vL+aQnOe0ouWlveWPi1xyXG4kKCcueXlpbS1zZWFyY2gnKS5vbigna2V5ZG93bicsZnVuY3Rpb24gKGUpIHtcclxuICAgIGxldCBrZXl3b3JkID0gJCh0aGlzKS52YWwoKTtcclxuICAgIGlmKGUua2V5Q29kZSA9PT0gMTMgJiYga2V5d29yZCl7XHJcbiAgICAgICAgLy/mkJzntKLogZTns7vkurpcclxuICAgICAgICBZWUlNQ2hhdC5xdWVyeVJvc3Rlckl0ZW0oe1xyXG4gICAgICAgICAgICBrZXl3b3JkOiBrZXl3b3JkLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLy/ogZTns7vkurrngrnlh7tcclxuJGhjb250YWN0cy5vbignY2xpY2snLCdsaScsZnVuY3Rpb24gKCkge1xyXG4gICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAkKHRoaXMpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgJGpfbW92ZS5odG1sKCQodGhpcykuYXR0cignZGF0YS1pZCcpKTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0YXJnZXR1c2VyaWQnLCAkKHRoaXMpLmF0dHIoJ2RhdGEtaWQnKSk7Ly/kv53lrZjogYrlpKnlr7nmlrlpZO+8jOeUqOS6jue7meS7luWPkemAgea2iOaBr1xyXG4gICAgZ2V0SGlzdG9yeU1lc3NhZ2UoJCh0aGlzKS5hdHRyKCdkYXRhLXNlc3Npb25WZXJzaW9uJyksICQodGhpcykuYXR0cignZGF0YS1pZCcpLCAkKHRoaXMpLmF0dHIoJ2RhdGEtdHlwZScpKTtcclxufSk7XHJcblxyXG4vL+WFs+mXreiBlOezu+S6uueCueWHu1xyXG4kaGNvbnRhY3RzLm9uKCdjbGljaycsJy5jbG9zZScsZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc29sZS5sb2coJ+WFs+mXrScrICQodGhpcykuYXR0cignZGF0YS1pZCcpKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxufSk7XHJcblxyXG4vL+mZpOS6huiHquW3sSzngrnlh7vlhbbku5bpg6jliIbpmpDol4/ooajmg4XmoYZcclxuJCgnYm9keScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICRqX2JxX2JveC5oaWRlKCk7XHJcbn0pO1xyXG5cclxuLy/ooajmg4XmjInpkq7ngrnlh7tcclxuJCgnLmpfbWVudV9icScpLmhvdmVyKGZ1bmN0aW9uICgpIHtcclxuICAgICQodGhpcykuYWRkQ2xhc3MoJ2hvdmVyJyk7XHJcbiAgICAkKCcuYnFfdGlwJykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbn0sZnVuY3Rpb24gKCkge1xyXG4gICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaG92ZXInKTtcclxuICAgICQoJy5icV90aXAnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG59KS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAkal9icV9ib3gudG9nZ2xlKCk7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn0pO1xyXG5cclxuLy/ooajmg4Xngrnlh7tcclxuJGpfYnFfYm94Lm9uKCdjbGljaycsICdsaScsIGZ1bmN0aW9uICgpIHtcclxuICAgICR5eWltX2VkaXRvci52YWwoJHl5aW1fZWRpdG9yLnZhbCgpICsgJCh0aGlzKS5hdHRyKCdkYXRhLWNvZGUnKSk7XHJcbiAgICBpZigkeXlpbV9lZGl0b3IudmFsKCkpe1xyXG4gICAgICAgICRidG5fc2VuZC5yZW1vdmVDbGFzcygnYWRpdC1idG4tc2VuZC1kaXNhYmxlZCcpO1xyXG4gICAgfWVsc2Uge1xyXG4gICAgICAgICRidG5fc2VuZC5hZGRDbGFzcygnYWRpdC1idG4tc2VuZC1kaXNhYmxlZCcpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59KTtcclxuXHJcbi8v5Zu+54mH5oyJ6ZKu54K55Ye7XHJcbiQoJy5qX21lbnVfdHAnKS5ob3ZlcihmdW5jdGlvbiAoKSB7XHJcbiAgICAkKHRoaXMpLmFkZENsYXNzKCdob3ZlcicpO1xyXG4gICAgJCgnLnRwX3RpcCcpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG59LGZ1bmN0aW9uICgpIHtcclxuICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2hvdmVyJyk7XHJcbiAgICAkKCcudHBfdGlwJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxufSkuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgJCgnI3VwbG9hZGZpbGUnKS5jbGljaygpO1xyXG59KTtcclxuXHJcbi8v5o6n5Yi25piv5ZCm5Y+v5Lul5Y+R6YCBXHJcbiR5eWltX2VkaXRvci5vbignaW5wdXQgcHJvcGVydHljaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZigkKHRoaXMpLnZhbCgpKXtcclxuICAgICAgICAkYnRuX3NlbmQucmVtb3ZlQ2xhc3MoJ2FkaXQtYnRuLXNlbmQtZGlzYWJsZWQnKTtcclxuICAgIH1lbHNlIHtcclxuICAgICAgICAkYnRuX3NlbmQuYWRkQ2xhc3MoJ2FkaXQtYnRuLXNlbmQtZGlzYWJsZWQnKTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vL+aWh+S7tuaMiemSrueCueWHu1xyXG4kKCcual9tZW51X3dqJykuaG92ZXIoZnVuY3Rpb24gKCkge1xyXG4gICAgJCh0aGlzKS5hZGRDbGFzcygnaG92ZXInKTtcclxuICAgICQoJy53al90aXAnKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxufSxmdW5jdGlvbiAoKSB7XHJcbiAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdob3ZlcicpO1xyXG4gICAgJCgnLndqX3RpcCcpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbn0pLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnNvbGUubG9nKCflj5HpgIHmlofku7YnKTtcclxufSk7XHJcblxyXG4vL+WPkemAgeaMiemSrueCueWHu1xyXG4kYnRuX3NlbmQub24oJ2NsaWNrJyxmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgdG8gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGFyZ2V0dXNlcmlkJyk7XHJcbiAgICBpZigkeXlpbV9lZGl0b3IudmFsKCkpe1xyXG4gICAgICAgIFlZSU1DaGF0LnNlbmRUZXh0TWVzc2FnZSh7XHJcbiAgICAgICAgICAgIHRvOiB0bywgLy/lr7nor53kurppZFxyXG4gICAgICAgICAgICB0eXBlOiBcImNoYXRcIiwgIC8vY2hhdDrljZXogYrvvIxncm91cGNnYXQ6576k6IGKLHB1YmFjY291bnQ65YWs5LyX5Y+3XHJcbiAgICAgICAgICAgIGNvbnRlbnQ6JHl5aW1fZWRpdG9yLnZhbCgpLCAvL+a2iOaBr+aWh+acrFxyXG4gICAgICAgICAgICBleHRlbmQ6ICcnLCAgLy/mianlsZXlrZfmrrVcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKG1zZykge1xyXG4gICAgICAgICAgICAgICAgJHl5aW1fZWRpdG9yLnZhbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAkYnRuX3NlbmQuYWRkQ2xhc3MoJ2FkaXQtYnRuLXNlbmQtZGlzYWJsZWQnKTtcclxuICAgICAgICAgICAgICAgIGdldFJlY2VudERpZ3NldCgpO1xyXG4gICAgICAgICAgICAgICAgcmVuZGVySGlzdG9yeU1lc3NhZ2UobXNnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8v5oyJ5LiLZW50ZXLkuZ/lj6/ku6Xlj5HpgIFcclxuJHl5aW1fZWRpdG9yLm9uKCdrZXlkb3duJyxmdW5jdGlvbihlKXtcclxuICAgIGlmKGUua2V5Q29kZSA9PT0gMTMgJiYgJHl5aW1fZWRpdG9yLnZhbCgpKXtcclxuICAgICAgICBsZXQgdG8gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGFyZ2V0dXNlcmlkJyk7XHJcbiAgICAgICAgWVlJTUNoYXQuc2VuZFRleHRNZXNzYWdlKHtcclxuICAgICAgICAgICAgdG86IHRvLCAvL+WvueivneS6umlkXHJcbiAgICAgICAgICAgIHR5cGU6IFwiY2hhdFwiLCAgLy9jaGF0OuWNleiBiu+8jGdyb3VwY2dhdDrnvqTogYoscHViYWNjb3VudDrlhazkvJflj7dcclxuICAgICAgICAgICAgY29udGVudDokeXlpbV9lZGl0b3IudmFsKCksIC8v5raI5oGv5paH5pysXHJcbiAgICAgICAgICAgIGV4dGVuZDogJycsICAvL+aJqeWxleWtl+autVxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAobXNnKSB7XHJcbiAgICAgICAgICAgICAgICAkeXlpbV9lZGl0b3IudmFsKCcnKTtcclxuICAgICAgICAgICAgICAgICRidG5fc2VuZC5hZGRDbGFzcygnYWRpdC1idG4tc2VuZC1kaXNhYmxlZCcpO1xyXG4gICAgICAgICAgICAgICAgZ2V0UmVjZW50RGlnc2V0KCk7XHJcbiAgICAgICAgICAgICAgICByZW5kZXJIaXN0b3J5TWVzc2FnZShtc2cpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pIiwiLy9kb23lhYPntKBcclxuaW1wb3J0IHtcclxuICAgICRjaGF0X2JveCxcclxuICAgICRjaGF0c19saXN0XHJcbn0gZnJvbSAnLi9qcWVsZW1lbnRzJztcclxuXHJcbi8v5riy5p+T6IGK5aSp6K6w5b2VXHJcbmltcG9ydCByZW5kZXJIaXN0b3J5TWVzc2FnZSBmcm9tICcuL3JlbmRlckhpc3RvcnlNZXNzYWdlJztcclxuXHJcbi8v6I635Y+W6IGK5aSp5Y6G5Y+yLOS8oOWFpXNlc3Npb25WZXJzaW9uLOWvueaWuWlk5ZKMdHlwZeWPguaVsFxyXG5leHBvcnQgZGVmYXVsdCAoc2Vzc2lvblZlcnNpb24sIGlkLCB0eXBlKSA9PiB7XHJcbiAgICBsZXQgZW5kVmVyc2lvbiA9IHNlc3Npb25WZXJzaW9uO1xyXG4gICAgbGV0IHN0YXJ0ID0gZW5kVmVyc2lvbiA+IDIwID8gZW5kVmVyc2lvbiAtIDIwIDogMDtcclxuICAgIFlZSU1DaGF0LmdldEhpc3RvcnlNZXNzYWdlKHtcclxuICAgICAgICBpZDogaWQsXHJcbiAgICAgICAgdHlwZTogdHlwZSxcclxuICAgICAgICBzdGFydFZlcnNpb246IHN0YXJ0LFxyXG4gICAgICAgIGVuZFZlcnNpb246IGVuZFZlcnNpb24sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAkY2hhdHNfbGlzdC5odG1sKCcnKTtcclxuICAgICAgICAgICAgJGNoYXRfYm94LnNob3coKTtcclxuICAgICAgICAgICAgaWYgKHJlcy5yZXN1bHQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgLy/miorogYrlpKnorrDlvZXnvJPlrZjliLDmnKzlnLBcclxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdoaXN0b3J5Y2hhdHMnLCBKU09OLnN0cmluZ2lmeShyZXMucmVzdWx0KSk7XHJcbiAgICAgICAgICAgICAgICByZW5kZXJIaXN0b3J5TWVzc2FnZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07IiwiLy9kb23lhYPntKBcclxuaW1wb3J0IHtcclxuICAgICRoY29udGFjdHNcclxufSBmcm9tICcuL2pxZWxlbWVudHMnO1xyXG5cclxuLy/ojrflj5bmnIDov5HogZTns7vkurpcclxuZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xyXG4gICAgJGhjb250YWN0cy5odG1sKCcnKTtcclxuICAgIC8vIOaLieWPluaRmOimgVxyXG4gICAgWVlJTUNoYXQuZ2V0UmVjZW50RGlnc2V0KHtcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXR1c2VyaWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGFyZ2V0dXNlcmlkJyk7XHJcbiAgICAgICAgICAgIC8vcmVzdWx0Lmxpc3TmmK/mnIDov5HogZTns7vkurpcclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5saXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbnRhY3RTdHIgPSAnJztcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5saXN0LmZvckVhY2goZnVuY3Rpb24oZSwgaSl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/nm67liY3mtYvor5Xlj6rmmL7npLrkuKrkurrogYrlpKnvvIzkuI3mmL7npLrnvqTmiJblhbbku5ZcclxuICAgICAgICAgICAgICAgICAgICBpZihlLnR5cGUgIT09ICdjaGF0Jyl7cmV0dXJuO31cclxuICAgICAgICAgICAgICAgICAgICAkaGNvbnRhY3RzLmh0bWwoJycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhY3RTdHIgKz0gYDxsaSBjbGFzcz1cIiR7dGFyZ2V0dXNlcmlkICYmIHRhcmdldHVzZXJpZCA9PT0gZS5pZCA/ICdhY3RpdmUnIDogJyd9XCIgZGF0YS1zZXNzaW9uVmVyc2lvbj1cIiR7ZS5zZXNzaW9uVmVyc2lvbn1cIiBkYXRhLWlkPVwiJHtlLmlkfVwiIGRhdGEtdHlwZT1cIiR7ZS50eXBlfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgZGF0YS1pZD1cIiR7ZS5pZH1cIiBjbGFzcz1cImNsb3NlXCI+w5c8L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXZhdGFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2ltZ3MvYXZhdGFyLmpwZ1wiIGFsdD1cIlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGV0YWlsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwibmFtZSBjdXR0eHRcIj4ke2UubmFtZSB8fCBlLmlkfTwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJtc2cgY3V0dHh0XCI+JHtlLmxhc3RNZXNzYWdlICYmIGUubGFzdE1lc3NhZ2UuZGF0YS5jb250ZW50VHlwZSA9PT0gMiA/IGUubGFzdE1lc3NhZ2UuZGF0YS5jb250ZW50IDogJyd9PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cIm5ld3RpcCBjdXR0eHRcIj4yPC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgJGhjb250YWN0cy5odG1sKGNvbnRhY3RTdHIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yOmZ1bmN0aW9uIChlcnIpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59IiwiXHJcbmV4cG9ydCBjb25zdCAkeXlpbV9pb2dpbiA9ICQoJy55eWltLWlvZ2luJyk7Ly/nmbvpmYbmoYZcclxuZXhwb3J0IGNvbnN0ICRsb2dpbl91c2VybmFtZSA9ICQoJy5sb2dpbi11c2VybmFtZScpOy8v55m76ZmG55So5oi35ZCNXHJcbmV4cG9ydCBjb25zdCAkbG9naW5fcGFzcyA9ICQoJy5sb2dpbi1wYXNzJyk7Ly/nmbvpmYbnlKjmiLflr4bnoIFcclxuZXhwb3J0IGNvbnN0ICRsb2dpbl9idG4gPSAkKCcubG9naW4tYnRuJyk7Ly/nmbvpmYbmjInpkq5cclxuZXhwb3J0IGNvbnN0ICR5eWltX2JveCA9ICQoJy55eWltLWJveCcpOy8v6IGK5aSp5qGG55qE6YGu572pXHJcbmV4cG9ydCBjb25zdCAkeXlpbV9tYWluID0gJCgnLnl5aW0tbWFpbicpOy8v6IGK5aSp5pyA5aSW5bGC56qX5Y+jXHJcbmV4cG9ydCBjb25zdCAkal9tb3ZlID0gJCgnLmpfbW92ZScpOy8v6IGK5aSp56qX5Y+j5aS0XHJcbmV4cG9ydCBjb25zdCAkaGNvbnRhY3RzID0gJCgnLmhjb250YWN0cycpOy8v5pyA6L+R6IGU57O75Lq65qGGXHJcbmV4cG9ydCBjb25zdCAkY2hhdHMgPSAkKCcuY2hhdHMnKTsvL+iBiuWkqeS/oeaBr+a7keWKqOWuueWZqFxyXG5leHBvcnQgY29uc3QgJGpfYnFfYm94ID0gJCgnLmpfYnFfYm94Jyk7Ly/ooajmg4Xnm5LlrZBcclxuZXhwb3J0IGNvbnN0ICR5eWltX2VkaXRvciA9ICQoJy55eWltLWVkaXRvcicpOy8v6IGK5aSp6L6T5YWl5qGGXHJcbmV4cG9ydCBjb25zdCAkYnRuX3NlbmQgPSAkKCcuYWRpdC1idG4tc2VuZCcpOyAvL+WPkemAgeaMiemSrlxyXG5leHBvcnQgY29uc3QgJGNoYXRfYm94ID0gJCgnLmNoYXQtYm94Jyk7IC8v5o6n5Yi25piv5ZCm5YW35pyJ6IGK5aSp5YaF5a65XHJcbmV4cG9ydCBjb25zdCAkY2hhdHNfbGlzdCA9ICQoJy5jaGF0cy1saXN0Jyk7IC8v6IGK5aSp5L+h5oGv5YiX6KGoIiwiLy9kb23lhYPntKBcclxuaW1wb3J0IHtcclxuICAgICRjaGF0cyxcclxuICAgICRqX2JxX2JveCxcclxuICAgICRjaGF0c19saXN0XHJcbn0gZnJvbSAnLi9qcWVsZW1lbnRzJztcclxuaW1wb3J0IHsgZXhwcmVzc2lvbkxpc3QgfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcblxyXG4vL+aUvue9ruihqOaDheWIl+ihqFxyXG4kal9icV9ib3guaHRtbChleHByZXNzaW9uTGlzdC5kYXRhLm1hcCgodCkgPT4ge1xyXG4gICAgcmV0dXJuIGA8bGkgZGF0YS1jb2RlPVwiJHt0LmFjdGlvbkRhdGF9XCI+PGltZyBzcmM9XCIke2V4cHJlc3Npb25MaXN0LnBhdGgrdC51cmx9XCIgdGl0bGU9XCIke3QuYWN0aW9uRGF0YX1cIiBhbHQ9XCJcIj48L2xpPmA7XHJcbn0pKTtcclxuXHJcbi8v55So5Zu+54mH5pu/5o2i5paH5pys5raI5oGv5Lit6KGo5oOF5L+h5oGvXHJcbmNvbnN0IHJlcGxhY2VFbW9qaSA9IChzdHIpID0+IHtcclxuICAgIHJldHVybiBzdHIucmVwbGFjZSgvXFxbW15cXFtcXF1dK1xcXS9nLChlKSA9PiB7XHJcbiAgICAgICAgbGV0IGkgPSAtMTtcclxuICAgICAgICBkb3tcclxuICAgICAgICAgICAgaSArKztcclxuICAgICAgICB9d2hpbGUgKGUgIT09IGV4cHJlc3Npb25MaXN0LmRhdGFbaV0uYWN0aW9uRGF0YSk7XHJcbiAgICAgICAgcmV0dXJuIGA8aW1nIHNyYz1cIiR7ZXhwcmVzc2lvbkxpc3QucGF0aCArIGV4cHJlc3Npb25MaXN0LmRhdGFbaV0udXJsfVwiIGFsdD1cIlwiIC8+YDtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuLy/muLLmn5PogYrlpKnorrDlvZUs55u05o6l5Lyg5YWl6IGK5aSp6K6w5b2V5YiX6KGo5Y2z5Y+vXHJcbmV4cG9ydCBkZWZhdWx0IChhcmcpID0+IHtcclxuICAgIGxldCBoaXN0b3J5Y2hhdHMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaGlzdG9yeWNoYXRzJykgfHwgXCJbXVwiO1xyXG4gICAgaGlzdG9yeWNoYXRzID0gSlNPTi5wYXJzZShoaXN0b3J5Y2hhdHMpO1xyXG4gICAgaWYoYXJnKXtcclxuICAgICAgICBoaXN0b3J5Y2hhdHMudW5zaGlmdChhcmcpO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdoaXN0b3J5Y2hhdHMnLEpTT04uc3RyaW5naWZ5KGhpc3RvcnljaGF0cykpO1xyXG4gICAgfTtcclxuICAgIGhpc3RvcnljaGF0cy5yZXZlcnNlKCk7XHJcbiAgICBsZXQgY2hhdHNTdHIgPSAnJztcclxuICAgIGxldCBteWlkID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudHVzZXJpbmZvJykpLmlkO1xyXG5cclxuICAgIGhpc3RvcnljaGF0cy5mb3JFYWNoKGZ1bmN0aW9uKGNoYXQsIGkpe1xyXG4gICAgICAgIGxldCBpc2Zyb21tZSA9IG15aWQgPT09IGNoYXQuZnJvbTtcclxuICAgICAgICBpZihjaGF0LmRhdGEuY29udGVudFR5cGUgPT09IDIpe1xyXG4gICAgICAgICAgICBjaGF0c1N0ciArPSBgPGxpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoYXQtdGlwXCI+JHtuZXcgRGF0ZShjaGF0LmRhdGEuZGF0ZWxpbmUpLnRvTG9jYWxlVGltZVN0cmluZygpfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoYXQtY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCIkeyBpc2Zyb21tZT8gJ2NoYXQtYXZhdGFyIGNoYXQtYXZhdGFyLXNlbmQnIDonY2hhdC1hdmF0YXInfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vaW1ncy9hdmF0YXIuanBnXCIgYWx0PVwiXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiR7IGlzZnJvbW1lPyAnY2hhdC10eHQgY2hhdC10eHQtc2VuZCcgOidjaGF0LXR4dCd9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGF0LXVzZXItbmFtZVwiPiR7Y2hhdC5mcm9tfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hhdC1tc2dcIj4ke3JlcGxhY2VFbW9qaShjaGF0LmRhdGEuY29udGVudCl9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT4gYDtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgICRjaGF0c19saXN0Lmh0bWwoY2hhdHNTdHIpO1xyXG4gICAgJGNoYXRzLnNjcm9sbFRvcCgkY2hhdHNbMF0uc2Nyb2xsSGVpZ2h0KTtcclxufTsiLCIvL+WFg+e0oFxyXG5pbXBvcnQgeyAkeXlpbV9pb2dpbiwgJHl5aW1fYm94IH0gZnJvbSAnLi9qcWVsZW1lbnRzJztcclxuXHJcbi8v55So5oi355m76ZmG77yM5Lyg5YWl55So5oi35ZCNKOaaguaXtuWGmeatu+S4unpvbmd0Zu+8jOWboOS4uuWFtuS7lueahOazqOWGjOS4jeaIkOWKnylcclxuZXhwb3J0IGRlZmF1bHQgKHVzZXJuYW1lLCBwYXNzd29yZCkgPT4ge1xyXG4gICAgLy/mraPlvI/njq/looNcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnaHR0cHM6Ly9pbS55eXVhcC5jb20vc3lzYWRtaW4vcmVzdC95b255b3UvdWRuL3Rva2VuJyxcclxuICAgICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICBoZWFkZXJzOiB7XCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJ9LFxyXG4gICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgXCJ1c2VybmFtZVwiOnVzZXJuYW1lLFxyXG4gICAgICAgICAgICBcImNsaWVudElkXCI6XCJjODUxMzBhYzJjODBkODNiODZmYzFiYzM0NGFjMTIxMVwiLFxyXG4gICAgICAgICAgICBcImNsaWVudFNlY3JldFwiOlwiQ0VEMTQ2MTM1QTU4NEQ1RjJFQUIzMzYzNUQxOUFFOTlcIlxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgbGV0IGNsaWVudElkZW50aWZ5ID0gXCJwY1wiICsgU3RyaW5nKG5ldyBEYXRlKCkuZ2V0VGltZSgpKTtcclxuICAgICAgICAgICAgJHl5aW1faW9naW4uaGlkZSgpO1xyXG4gICAgICAgICAgICAkeXlpbV9ib3guc2hvdygpO1xyXG4gICAgICAgICAgICAvL+eZu+mZhllZSU1TREtcclxuICAgICAgICAgICAgWVlJTUNoYXQubG9naW4oe1xyXG4gICAgICAgICAgICAgICAgXCJ1c2VybmFtZVwiOiB1c2VybmFtZSxcclxuICAgICAgICAgICAgICAgIFwidG9rZW5cIjogcmVzdWx0LnRva2VuLFxyXG4gICAgICAgICAgICAgICAgXCJleHBpcmF0aW9uXCI6IHJlc3VsdC5leHBpcmF0aW9uLFxyXG4gICAgICAgICAgICAgICAgXCJhcHBUeXBlXCI6IDQsXHJcbiAgICAgICAgICAgICAgICBcImlkZW50aWZ5XCI6IGNsaWVudElkZW50aWZ5XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChhcmcpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYXJnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIC8v5rWL6K+V546v5aKDXHJcbiAgICAvLyAkLmFqYXgoe1xyXG4gICAgLy8gICAgIHVybDogJ2h0dHA6Ly8xNzIuMjAuMTUuNjAvc3lzYWRtaW4vcmVzdC95b255b3UvaW1fcHJlL3Rva2VuJyxcclxuICAgIC8vICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAvLyAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgIC8vICAgICBoZWFkZXJzOiB7XCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJ9LFxyXG4gICAgLy8gICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgIC8vICAgICAgICAgXCJ1c2VybmFtZVwiOnVzZXJuYW1lLFxyXG4gICAgLy8gICAgICAgICBcImNsaWVudElkXCI6XCJiMjZiYTUxMDU4ZWVlOWRiNGY4OGE3YTJiMWJkMWIwNlwiLFxyXG4gICAgLy8gICAgICAgICBcImNsaWVudFNlY3JldFwiOlwiQ0M5QTcxRTBDMjUyOEVEQjE2NTJERkIxOEVDRThEREZcIlxyXG4gICAgLy8gICAgIH0pLFxyXG4gICAgLy8gICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgIC8vICAgICAgICAgbGV0IGNsaWVudElkZW50aWZ5ID0gXCJwY1wiICsgU3RyaW5nKG5ldyBEYXRlKCkuZ2V0VGltZSgpKTtcclxuICAgIC8vICAgICAgICAgJHl5aW1faW9naW4uaGlkZSgpO1xyXG4gICAgLy8gICAgICAgICAkeXlpbV9ib3guc2hvdygpO1xyXG4gICAgLy8gICAgICAgICAvL+eZu+mZhllZSU1TREtcclxuICAgIC8vICAgICAgICAgWVlJTUNoYXQubG9naW4oe1xyXG4gICAgLy8gICAgICAgICAgICAgXCJ1c2VybmFtZVwiOiB1c2VybmFtZSxcclxuICAgIC8vICAgICAgICAgICAgIFwidG9rZW5cIjogcmVzdWx0LnRva2VuLFxyXG4gICAgLy8gICAgICAgICAgICAgXCJleHBpcmF0aW9uXCI6IHJlc3VsdC5leHBpcmF0aW9uLFxyXG4gICAgLy8gICAgICAgICAgICAgXCJhcHBUeXBlXCI6IDQsXHJcbiAgICAvLyAgICAgICAgICAgICBcImlkZW50aWZ5XCI6IGNsaWVudElkZW50aWZ5XHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgIH0sXHJcbiAgICAvLyAgICAgZXJyb3I6IGZ1bmN0aW9uIChhcmcpIHtcclxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coYXJnKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9KTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9