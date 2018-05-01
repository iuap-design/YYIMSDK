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
        // 登录成功设置在线状态
        YYIMChat.setPresence();
        //移除保存的通讯对方id，避免页面刷新后最近联系人联系状态还记录着
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
    onMessage: function onMessage(msg) {
        //渲染历史聊天记录
        (0, _renderHistoryMessage2.default)(msg);
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

var _constants = __webpack_require__(/*! ./constants */ "./src/js/constants.js");

var _userLogin = __webpack_require__(/*! ./userLogin */ "./src/js/userLogin.js");

var _userLogin2 = _interopRequireDefault(_userLogin);

var _getHistoryMessage = __webpack_require__(/*! ./getHistoryMessage */ "./src/js/getHistoryMessage.js");

var _getHistoryMessage2 = _interopRequireDefault(_getHistoryMessage);

var _renderHistoryMessage = __webpack_require__(/*! ./renderHistoryMessage */ "./src/js/renderHistoryMessage.js");

var _renderHistoryMessage2 = _interopRequireDefault(_renderHistoryMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//放置表情列表


//获取历史聊天记录


//表情数据
_jqelements.$j_bq_box.html(_constants.expressionList.data.map(function (t) {
    return '<li data-code="' + t.actionData + '"><img src="' + (_constants.expressionList.path + t.url) + '" title="' + t.actionData + '" alt=""></li>';
}));

//临时自动登录的


//渲染历史聊天记录


//用户登陆
//dom元素
if (localStorage.getItem('currentuserinfo')) {
    (0, _userLogin2.default)(JSON.parse(localStorage.getItem('currentuserinfo')).username);
}
//用户登陆
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
        //
        YYIMChat.getRosterItems({
            success: function success(res) {
                console.log(JSON.parse(res));
            }
        });
    }
});

//点击最近联系人
_jqelements.$hcontacts.on('click', 'li', function () {
    _jqelements.$chats_list.html('');
    $(this).addClass('active');
    $(this).siblings().removeClass('active');
    _jqelements.$j_move.html($(this).attr('data-nickname'));
    //把选择的聊天对方id保存起来,用于给他发送消息
    localStorage.setItem('targetuserid', $(this).attr('data-id'));
    //删除保存的聊天历史
    localStorage.removeItem('historychats');
    //获取历史聊天信息
    (0, _getHistoryMessage2.default)($(this).attr('data-sessionVersion'), $(this).attr('data-id'), $(this).attr('data-type'));
});

//关闭联系人点击
_jqelements.$hcontacts.on('click', '.close', function () {
    console.log('关闭' + $(this).attr('data-id'));
    return false;
});

//查看聊天消息图片
_jqelements.$chats_list.on('click', '.chatpic', function () {
    var picurl = $(this).attr('data-url');
    _jqelements.$picviewer.html('<li><img data-original="' + picurl + '" src="' + picurl + '" alt=""></li>');
    _jqelements.picviewer.show({ url: picurl });
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

//按要求隐藏表情框
_jqelements.$j_bq_box.hover(function (e) {}, function () {
    $(this).hide();
});

//发送图片按钮点击
$('.j_menu_tp').hover(function () {
    $(this).addClass('hover');
    $('.tp_tip').css('display', 'block');
}, function () {
    $(this).removeClass('hover');
    $('.tp_tip').css('display', 'none');
}).click(function () {
    $('#uploadPic').click();
});

$('#uploadPic').on('change', function () {
    //获取对话人id
    var to = localStorage.getItem('targetuserid');
    YYIMChat.sendPic({
        fileInputId: 'uploadPic', //文件域id 
        // drop_element: [dropID], //拖拽上传元素id，或者数组
        chatInfo: function chatInfo() {
            //用户发送消息时获取对话人信息
            return {
                to: to, //对话人id
                type: 'chat', //chat/groupchat/pubaccount
                extend: '' //扩展字段
            };
        },
        fileFiltered: function fileFiltered() {}, //文件被添加到上传队列
        fileUploaded: function fileUploaded() {}, //上传队列某一个文件上传完毕
        beforeUpload: function beforeUpload() {}, //文件上传之前触发
        success: function success(msg) {
            //渲染历史信息
            (0, _renderHistoryMessage2.default)(msg);
        },
        error: function error(err) {
            console.log(err);
        },
        progress: function progress(pro) {
            //上传进度
            console.log(pro);
        }
    });
});

//文件按钮点击
$('.j_menu_wj').hover(function () {
    $(this).addClass('hover');
    $('.wj_tip').css('display', 'block');
}, function () {
    $(this).removeClass('hover');
    $('.wj_tip').css('display', 'none');
}).click(function () {
    $('#uploadFile').click();
});

$('#uploadFile').on('change', function () {
    //获取对话人id
    var to = localStorage.getItem('targetuserid');
    YYIMChat.sendFile({
        fileInputId: 'uploadFile', //文件域id 
        // drop_element: [dropID], //拖拽上传元素id，或者数组
        chatInfo: function chatInfo() {
            //用户发送消息时获取对话人信息
            return {
                to: to, //对话人id
                type: 'chat', //chat/groupchat/pubaccount
                extend: '' //扩展字段
            };
        },
        fileFiltered: function fileFiltered() {}, //文件被添加到上传队列
        fileUploaded: function fileUploaded() {}, //上传队列某一个文件上传完毕
        beforeUpload: function beforeUpload() {}, //文件上传之前触发
        success: function success(msg) {
            //渲染历史信息
            (0, _renderHistoryMessage2.default)(msg);
        },
        error: function error(err) {
            console.log(err);
        },
        progress: function progress(pro) {
            //上传进度
            console.log(pro);
        }
    });
});

//控制是否可以发送
_jqelements.$yyim_editor.on('input propertychange', function () {
    if ($(this).val()) {
        _jqelements.$btn_send.removeClass('adit-btn-send-disabled');
    } else {
        _jqelements.$btn_send.addClass('adit-btn-send-disabled');
    }
});

//发送按钮点击
_jqelements.$btn_send.on('click', function () {
    if (_jqelements.$yyim_editor.val()) {
        //从本地拿取聊天对方id
        var to = localStorage.getItem('targetuserid');
        //调用发送文本消息接口
        YYIMChat.sendTextMessage({
            to: to, //对话人id
            type: "chat", //chat:单聊，groupcgat:群聊,pubaccount:公众号
            content: _jqelements.$yyim_editor.val(), //消息文本
            extend: '', //扩展字段
            success: function success(msg) {
                //发送成功之后清空输入框
                _jqelements.$yyim_editor.val('');
                _jqelements.$btn_send.addClass('adit-btn-send-disabled');
                //渲染历史信息
                (0, _renderHistoryMessage2.default)(msg);
            }
        });
    }
});

//按下enter也可以发送
_jqelements.$yyim_editor.on('keydown', function (e) {
    if (e.keyCode === 13 && _jqelements.$yyim_editor.val()) {
        //从本地拿取聊天对方id
        var to = localStorage.getItem('targetuserid');
        //调用发送文本消息接口
        YYIMChat.sendTextMessage({
            to: to, //对话人id
            type: "chat", //chat:单聊，groupcgat:群聊,pubaccount:公众号
            content: _jqelements.$yyim_editor.val(), //消息文本
            extend: '', //扩展字段
            success: function success(msg) {
                //发送成功之后清空输入框
                _jqelements.$yyim_editor.val('');
                _jqelements.$btn_send.addClass('adit-btn-send-disabled');
                //渲染历史信息
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
    var start = sessionVersion > 20 ? sessionVersion - 20 : 0;
    //获取历史聊天信息
    YYIMChat.getHistoryMessage({
        id: id,
        type: type,
        startVersion: start,
        endVersion: sessionVersion,
        success: function success(res) {
            var historychats = res.result || [];
            _jqelements.$chat_box.show();
            historychats.reverse();
            //把聊天记录缓存到本地
            localStorage.setItem('historychats', JSON.stringify(historychats));
            //渲染聊天信息
            (0, _renderHistoryMessage2.default)();
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

var _renderRecentDigset = __webpack_require__(/*! ./renderRecentDigset */ "./src/js/renderRecentDigset.js");

var _renderRecentDigset2 = _interopRequireDefault(_renderRecentDigset);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//获取最近联系人
exports.default = function () {
    // 获取最近联系人API
    YYIMChat.getRecentDigset({
        success: function success(result) {
            if (result.list.length) {
                var recentDigset = [];
                result.list.forEach(function (e, i) {
                    //目前测试只显示个人聊天，不显示群或其他 
                    if (e.type !== 'chat') {
                        return;
                    }
                    //通过id获取个人信息
                    YYIMChat.getVCard({
                        id: e.id,
                        success: function success(res) {
                            //整理最近联系人列表到一个新数组
                            recentDigset.push({
                                id: res.id,
                                readedVersion: e.readedVersion,
                                sessionVersion: e.sessionVersion,
                                type: e.type,
                                photo: res.photo || '',
                                nickname: res.nickname,
                                lastMessage: e.lastMessage,
                                lastContactTime: e.lastContactTime
                            });
                            //把最近联系人列表保存到本地
                            localStorage.setItem('recentdigset', JSON.stringify(recentDigset));
                            (0, _renderRecentDigset2.default)(recentDigset);
                        }
                    });
                });
            }
        },
        error: function error(err) {
            console.log(err);
        }
    });
};
//导入最近联系人渲染函数

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
var $picviewer = exports.$picviewer = $('#picviewer'); //图片查看框

//实例化viewer
var picviewer = exports.picviewer = new Viewer($picviewer[0], { navbar: false, title: false });
// viewer.show({
//     url: 'https://www.baidu.com/img/bd_logo1.png'
// })
// $picviewer.viewer({
//     url: 'https://www.baidu.com/img/bd_logo1.png', //设置大图片的 url
//     navbar:true, //是否显示缩略图导航
//     toolbar:true, //显示工具栏
//     title:true, //显示当前图片标题(alt属性和尺寸)
//     tooltip:true, //显示缩放百分比
//     movable:true, //图片是否可移动
//     zoomable:true, //图片是否可缩放
//     rotatable:true, //图片是否可旋转
//     scalable:true, //图片是否可翻转
//     transition:true, //使用 CSS3 过度
//     fullscreen:true, //播放时是否全屏
//     keyboard:true, //是否支持键盘
//     interval:5000, //播放间隔，单位为毫秒
//     zoomRatio:0.1, //鼠标滚动时的缩放比例
//     minZoomRatio:0.01, //最小缩放比例
//     maxZoomRatio:100, //最大缩放比例
//     zIndex:2015, //设置图片查看器 modal 模式时的 z-index
//     zIndexInline:0, //设置图片查看器 inline 模式时的 z-index
// }).show();

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

var _getRecentDigset = __webpack_require__(/*! ./getRecentDigset */ "./src/js/getRecentDigset.js");

var _getRecentDigset2 = _interopRequireDefault(_getRecentDigset);

var _renderRecentDigset = __webpack_require__(/*! ./renderRecentDigset */ "./src/js/renderRecentDigset.js");

var _renderRecentDigset2 = _interopRequireDefault(_renderRecentDigset);

var _constants = __webpack_require__(/*! ./constants */ "./src/js/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//用图片替换文本消息中表情信息


//渲染最近联系人函数

//dom元素
var replaceEmoji = function replaceEmoji(str) {
    return str.replace(/\[[^\[\]]+\]/g, function (e) {
        for (var i = 0; i < _constants.expressionList.data.length; i++) {
            if (_constants.expressionList.data[i].actionData === e) {
                return '<img class="emoji" src="' + (_constants.expressionList.path + _constants.expressionList.data[i].url) + '" alt="" />';
                break;
            }
        }
        return e;
    });
};

//渲染聊天记录,传入一条聊天记录对象即可


//表情数据


//渲染最近联系人函数

exports.default = function (msg) {
    //拿取本地保存的历史聊天信息
    var historychats = JSON.parse(localStorage.getItem('historychats') || "[]");
    //从本地拿取聊天对方id
    var targetuserid = localStorage.getItem('targetuserid');
    //拿我自己的id
    var myid = JSON.parse(localStorage.getItem('currentuserinfo')).id;

    //如果msg存在，说明不是初次渲染
    if (msg) {
        //拿取本地保存的最近联系人数组
        var recentDigset = JSON.parse(localStorage.getItem('recentdigset') || "[]");

        if (msg.from === myid) {
            //消息是我发给别人的
            recentDigset.forEach(function (digest, i) {
                if (digest.id === targetuserid) {
                    recentDigset[i].lastContactTime = msg.data.dateline;
                    recentDigset[i].lastMessage = msg;
                    recentDigset[i].sessionVersion++;
                    recentDigset[i].readedVersion++;
                    //保存修改后的最近联系人数组
                    localStorage.setItem('recentdigset', JSON.stringify(recentDigset));
                    //渲染最近联系人
                    (0, _renderRecentDigset2.default)(recentDigset);
                }
            });
            //修改历史消息
            historychats.push(msg);
            //修改后保存
            localStorage.setItem('historychats', JSON.stringify(historychats));
        } else {
            //消息来自于他人给我发的
            var isdigset = false; //判断对方在不在我的最近联系人里
            recentDigset.forEach(function (digest, i) {
                if (digest.id === msg.from) {
                    isdigset = true;
                    recentDigset[i].lastContactTime = msg.data.dateline;
                    recentDigset[i].lastMessage = msg;
                    recentDigset[i].sessionVersion++;
                    recentDigset[i].readedVersion++;
                    //保存修改后的最近联系人数组
                    localStorage.setItem('recentdigset', JSON.stringify(recentDigset));
                    //渲染最近联系人
                    (0, _renderRecentDigset2.default)(recentDigset);
                }
            });
            //不在最近联系人中，刷新最近联系人列表
            if (!isdigset) {
                (0, _getRecentDigset2.default)();
            }
            //我正在和他聊天
            if (msg.from === targetuserid) {
                //修改历史消息
                historychats.push(msg);
                //修改后保存
                localStorage.setItem('historychats', JSON.stringify(historychats));
            }
        }
    }
    //如果我没和对方聊天，则不渲染历史信息
    if (msg && msg.from !== myid && msg.from !== targetuserid) return;

    var chatsStr = '';
    historychats.forEach(function (chat, i) {
        var isfromme = myid === chat.from;
        //文本消息
        if (chat.data.contentType === 2) {
            chatsStr += '<li>\n                            <div class="chat-tip">' + new Date(chat.data.dateline).toLocaleTimeString() + '</div>\n                            <div class="chat-content">\n                                <div class="' + (isfromme ? 'chat-avatar chat-avatar-send' : 'chat-avatar') + '">\n                                    <img src="./imgs/avatar.jpg" alt="">\n                                </div>\n                                <div class="' + (isfromme ? 'chat-txt chat-txt-send' : 'chat-txt') + '">\n                                    <!--<div class="chat-user-name">' + chat.from + '</div>-->\n                                    <div class="chat-msg">' + replaceEmoji(chat.data.content) + '</div>\n                                </div>\n                            </div>\n                        </li> ';
        } else if (chat.data.contentType === 8) {
            //图片消息
            var picurl = YYIMChat.getFileUrl(chat.data.content.attachId);
            chatsStr += '<li>\n                            <div class="chat-tip">' + new Date(chat.data.dateline).toLocaleTimeString() + '</div>\n                            <div class="chat-content">\n                                <div class="' + (isfromme ? 'chat-avatar chat-avatar-send' : 'chat-avatar') + '">\n                                    <img src="./imgs/avatar.jpg" alt="">\n                                </div>\n                                <div class="' + (isfromme ? 'chat-txt chat-txt-send' : 'chat-txt') + '">\n                                    <!--<div class="chat-user-name">' + chat.from + '</div>-->\n                                    <div class="chat-msg">\n                                        <img class="chatpic" data-url="' + picurl + '" src="' + picurl + '" title="\u70B9\u51FB\u67E5\u770B\u56FE\u7247" alt="" />\n                                    </div>\n                                </div>\n                            </div>\n                        </li> ';
        } else if (chat.data.contentType === 4) {
            var _picurl = YYIMChat.getFileUrl(chat.data.content.attachId);
            var filename = chat.data.content.name.slice(0, 20);
            chatsStr += '<li>\n                            <div class="chat-tip">' + new Date(chat.data.dateline).toLocaleTimeString() + '</div>\n                            <div class="chat-content">\n                                <div class="' + (isfromme ? 'chat-avatar chat-avatar-send' : 'chat-avatar') + '">\n                                    <img src="./imgs/avatar.jpg" alt="">\n                                </div>\n                                <div class="' + (isfromme ? 'chat-txt chat-txt-send' : 'chat-txt') + '">\n                                    <!--<div class="chat-user-name">' + chat.from + '</div>-->\n                                    <div class="chat-msg">\n                                        <a class="chatfile" href="' + _picurl + '" title="\u70B9\u51FB\u4E0B\u8F7D\u6587\u4EF6">\n                                            <span class="filename">' + filename + '</span>\n                                            <span class="filesize">' + chat.data.content.size + 'B</span>\n                                        </a>\n                                    </div>\n                                </div>\n                            </div>\n                        </li> ';
        }
    });
    _jqelements.$chats_list.html(chatsStr);
    _jqelements.$chats.scrollTop(_jqelements.$chats[0].scrollHeight);
};

/***/ }),

/***/ "./src/js/renderRecentDigset.js":
/*!**************************************!*\
  !*** ./src/js/renderRecentDigset.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jqelements = __webpack_require__(/*! ./jqelements */ "./src/js/jqelements.js");

var _constants = __webpack_require__(/*! ./constants */ "./src/js/constants.js");

//用图片替换文本消息中表情信息

//dom元素
var replaceEmoji = function replaceEmoji(str) {
    return str.replace(/\[[^\[\]]+\]/g, function (e) {
        for (var i = 0; i < _constants.expressionList.data.length; i++) {
            if (_constants.expressionList.data[i].actionData === e) {
                return '<img class="emoji" src="' + (_constants.expressionList.path + _constants.expressionList.data[i].url) + '" alt="" />';
                break;
            }
        }
        return e;
    });
};
//表情数据

exports.default = function (digsets) {
    //拿取聊天对方id
    var targetuserid = localStorage.getItem('targetuserid');
    var digStr = '';
    digsets.sort(function (a, b) {
        return b.lastContactTime - a.lastContactTime;
    });
    digsets.forEach(function (res) {
        var lastmsg = res.lastMessage,
            lastmsgStr = '',
            newtipStr = '';
        var noreadno = res.sessionVersion - res.readedVersion;
        if (lastmsg) {
            switch (lastmsg.data.contentType) {
                case 2:
                    lastmsgStr = res.lastMessage.data.content;break;
                case 4:
                    lastmsgStr = '[文件消息]';break;
                case 8:
                    lastmsgStr = '[图片消息]';break;
            }
        }
        if (noreadno) {
            newtipStr = '<i class="newtip cuttxt">' + noreadno + '</i>';
        }
        digStr += '<li class="' + (targetuserid && targetuserid === res.id ? 'active' : '') + '" data-sessionVersion="' + res.sessionVersion + '" data-id="' + res.id + '" data-type="' + res.type + '" data-nickname="' + (res.nickname || res.id) + '">\n                    <i data-id="' + res.id + '" class="close">\xD7</i>\n                    <div class="avatar">\n                        <img src="' + (YYIMChat.getFileUrl(res.photo) || './imgs/avatar.jpg') + '" alt="">\n                    </div>\n                    <div class="detail">\n                        <h3 class="name cuttxt">' + (res.nickname || res.id) + '</h3>\n                        <p class="msg cuttxt">' + replaceEmoji(lastmsgStr) + '</p>\n                    </div>' + newtipStr + '\n                </li>';
    });
    _jqelements.$hcontacts.html(digStr);
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

//用户登陆
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbnRyb2xFdmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZ2V0SGlzdG9yeU1lc3NhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2dldFJlY2VudERpZ3NldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvanFlbGVtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcmVuZGVySGlzdG9yeU1lc3NhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3JlbmRlclJlY2VudERpZ3NldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXNlckxvZ2luLmpzIl0sIm5hbWVzIjpbIllZSU1DaGF0IiwiaW5pdFNESyIsImFwcCIsImV0cCIsIndzdXJsIiwid3Nwb3J0IiwiaGJwb3J0Iiwic2VydmxldCIsImZsYXNoX3N3Zl91cmwiLCJsb2dFbmFibGUiLCJjbGllbnRNYXJrIiwiYXBpS2V5IiwiaW5pdCIsIm9uT3BlbmVkIiwic2V0UHJlc2VuY2UiLCJsb2NhbFN0b3JhZ2UiLCJyZW1vdmVJdGVtIiwiZ2V0VkNhcmQiLCJzdWNjZXNzIiwicmVzIiwic2V0SXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJvbkV4cGlyYXRpb24iLCJjYWxsYmFjayIsIm9uQ2xvc2VkIiwiYXJnIiwib25Db25mbGljdGVkIiwib25DbGllbnRLaWNrb3V0Iiwib25VcGRhdGVQYXNzd29yZCIsIm9uQXV0aEVycm9yIiwib25Db25uZWN0RXJyb3IiLCJvblJlY2VpcHRzIiwib25TdWJzY3JpYmUiLCJvblJvc3RlckZhdm9yaXRlZCIsIm9uUm9zdGVyVXBkYXRlZGVkIiwib25NZXNzYWdlIiwibXNnIiwib25Hcm91cFVwZGF0ZSIsIm9uS2lja2VkT3V0R3JvdXAiLCJvblRyYW5zZmVyR3JvdXBPd25lciIsIm9uUHJlc2VuY2UiLCJvblJvc3RlckRlbGV0ZWQiLCJvblB1YmFjY291bnRVcGRhdGUiLCJwdWJhY2NvdW50cyIsIm9uVHJhbnNwYXJlbnRNZXNzYWdlIiwiZXhwcmVzc2lvbkxpc3QiLCJwYXRoIiwiZGF0YSIsImFjdGlvbkRhdGEiLCJodG1sIiwibWFwIiwidCIsInVybCIsImdldEl0ZW0iLCJwYXJzZSIsInVzZXJuYW1lIiwiY2xpY2siLCJ2YWwiLCJwYXNzd29yZCIsInRlc3QiLCIkIiwiaGFzQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwiY3NzIiwibGVmdCIsInRvcCIsImNsZWFyIiwiaGlkZSIsInNob3ciLCJvbiIsImUiLCJvcmlnaW5YIiwiY2xpZW50WCIsIm9yaWdpblkiLCJjbGllbnRZIiwiYm94UG9zIiwicG9zaXRpb24iLCJvZmYiLCJrZXl3b3JkIiwia2V5Q29kZSIsImdldFJvc3Rlckl0ZW1zIiwiY29uc29sZSIsImxvZyIsInNpYmxpbmdzIiwiYXR0ciIsInBpY3VybCIsImhvdmVyIiwidG9nZ2xlIiwidG8iLCJzZW5kUGljIiwiZmlsZUlucHV0SWQiLCJjaGF0SW5mbyIsInR5cGUiLCJleHRlbmQiLCJmaWxlRmlsdGVyZWQiLCJmaWxlVXBsb2FkZWQiLCJiZWZvcmVVcGxvYWQiLCJlcnJvciIsImVyciIsInByb2dyZXNzIiwicHJvIiwic2VuZEZpbGUiLCJzZW5kVGV4dE1lc3NhZ2UiLCJjb250ZW50Iiwic2Vzc2lvblZlcnNpb24iLCJpZCIsInN0YXJ0IiwiZ2V0SGlzdG9yeU1lc3NhZ2UiLCJzdGFydFZlcnNpb24iLCJlbmRWZXJzaW9uIiwiaGlzdG9yeWNoYXRzIiwicmVzdWx0IiwicmV2ZXJzZSIsImdldFJlY2VudERpZ3NldCIsImxpc3QiLCJsZW5ndGgiLCJyZWNlbnREaWdzZXQiLCJmb3JFYWNoIiwiaSIsInB1c2giLCJyZWFkZWRWZXJzaW9uIiwicGhvdG8iLCJuaWNrbmFtZSIsImxhc3RNZXNzYWdlIiwibGFzdENvbnRhY3RUaW1lIiwiJHl5aW1faW9naW4iLCIkbG9naW5fdXNlcm5hbWUiLCIkbG9naW5fcGFzcyIsIiRsb2dpbl9idG4iLCIkeXlpbV9ib3giLCIkeXlpbV9tYWluIiwiJGpfbW92ZSIsIiRoY29udGFjdHMiLCIkY2hhdHMiLCIkal9icV9ib3giLCIkeXlpbV9lZGl0b3IiLCIkYnRuX3NlbmQiLCIkY2hhdF9ib3giLCIkY2hhdHNfbGlzdCIsIiRwaWN2aWV3ZXIiLCJwaWN2aWV3ZXIiLCJWaWV3ZXIiLCJuYXZiYXIiLCJ0aXRsZSIsInJlcGxhY2VFbW9qaSIsInN0ciIsInJlcGxhY2UiLCJ0YXJnZXR1c2VyaWQiLCJteWlkIiwiZnJvbSIsImRpZ2VzdCIsImRhdGVsaW5lIiwiaXNkaWdzZXQiLCJjaGF0c1N0ciIsImNoYXQiLCJpc2Zyb21tZSIsImNvbnRlbnRUeXBlIiwiRGF0ZSIsInRvTG9jYWxlVGltZVN0cmluZyIsImdldEZpbGVVcmwiLCJhdHRhY2hJZCIsImZpbGVuYW1lIiwibmFtZSIsInNsaWNlIiwic2l6ZSIsInNjcm9sbFRvcCIsInNjcm9sbEhlaWdodCIsImRpZ3NldHMiLCJkaWdTdHIiLCJzb3J0IiwiYSIsImIiLCJsYXN0bXNnIiwibGFzdG1zZ1N0ciIsIm5ld3RpcFN0ciIsIm5vcmVhZG5vIiwiYWpheCIsImRhdGFUeXBlIiwiaGVhZGVycyIsImNsaWVudElkZW50aWZ5IiwiU3RyaW5nIiwiZ2V0VGltZSIsImxvZ2luIiwidG9rZW4iLCJleHBpcmF0aW9uIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtB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QUQsRUFBV0csUUFBWCxFQUF3QjtBQUNuQztBQUNBRSxNQUFFcUgsSUFBRixDQUFPO0FBQ0g3SCxhQUFLLHFEQURGO0FBRUh5QyxjQUFNLE1BRkg7QUFHSHFGLGtCQUFVLE1BSFA7QUFJSEMsaUJBQVMsRUFBQyxnQkFBZ0Isa0JBQWpCLEVBSk47QUFLSHBJLGNBQU0zQixLQUFLQyxTQUFMLENBQWU7QUFDakIsd0JBQVdrQyxRQURNO0FBRWpCLHdCQUFXLGtDQUZNO0FBR2pCLDRCQUFlO0FBSEUsU0FBZixDQUxIO0FBVUh0QyxpQkFBUyxpQkFBVStGLE1BQVYsRUFBa0I7QUFDdkIsZ0JBQUlvRSxpQkFBaUIsT0FBT0MsT0FBTyxJQUFJdkIsSUFBSixHQUFXd0IsT0FBWCxFQUFQLENBQTVCO0FBQ0Esb0NBQVlsSCxJQUFaO0FBQ0Esa0NBQVVDLElBQVY7QUFDQTtBQUNBdEUscUJBQVN3TCxLQUFULENBQWU7QUFDWCw0QkFBWWhJLFFBREQ7QUFFWCx5QkFBU3lELE9BQU93RSxLQUZMO0FBR1gsOEJBQWN4RSxPQUFPeUUsVUFIVjtBQUlYLDJCQUFXLENBSkE7QUFLWCw0QkFBWUw7QUFMRCxhQUFmO0FBT0gsU0F0QkU7QUF1QkhsRixlQUFPLGVBQVV6RSxHQUFWLEVBQWU7QUFDbEJ5RCxvQkFBUUMsR0FBUixDQUFZMUQsR0FBWjtBQUNIO0FBekJFLEtBQVA7QUEyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSCxDLEVBN0RELEkiLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIvL+WKoOi9veS6i+S7tuaTjeS9nFxyXG5pbXBvcnQgJy4vanMvY29udHJvbEV2ZW50JztcclxuXHJcbi8v6I635Y+W5pyA6L+R6IGU57O75Lq6XHJcbmltcG9ydCBnZXRSZWNlbnREaWdzZXQgZnJvbSAnLi9qcy9nZXRSZWNlbnREaWdzZXQnO1xyXG5cclxuLy/muLLmn5Pljoblj7LogYrlpKnorrDlvZVcclxuaW1wb3J0IHJlbmRlckhpc3RvcnlNZXNzYWdlIGZyb20gJy4vanMvcmVuZGVySGlzdG9yeU1lc3NhZ2UnO1xyXG5cclxuLy/liJ3lp4vljJZTREvvvIzmraPlvI/njq/looNcclxuWVlJTUNoYXQuaW5pdFNESyh7XHJcbiAgICBhcHA6ICd1ZG4nLCAvL2FwcElkXHJcbiAgICBldHA6ICd5b255b3UnLCAvL2V0cElkXHJcbiAgICB3c3VybDogJ3N0ZWxsYXIueXl1YXAuY29tJywgLy93ZWJzb2NrZXQgVXJsXHJcbiAgICB3c3BvcnQ6IDUyMjcsIC8vd2Vic29ja2V0IHBvcnQgNTIyNy81MjIyLzUyMjVcclxuICAgIGhicG9ydDogNzA3NSwgLy9odHRwYmluZCAgcG9ydCA3MDc1LzcwNzBcclxuICAgIHNlcnZsZXQ6ICdodHRwczovL2ltLnl5dWFwLmNvbS8nLCAvL3Jlc3QgVXJsXHJcbiAgICBmbGFzaF9zd2ZfdXJsOiAneHh4L3gvTW94aWUuc3dmJywgLy9mbGFzaCDkuIrkvKAgc3dm5paH5Lu25L2N572uXHJcbiAgICBsb2dFbmFibGU6IHRydWUsIC8vY2xpZW50IGxvZ1xyXG4gICAgY2xpZW50TWFyazogJ3dlYicsIC8vY2xpZW50IG1hcmsgJ3dlYicgb3IgJ3BjJ1xyXG4gICAgYXBpS2V5OiBcIjg1ZGU3OWI5ZjdlMzRjMzdhOTlhY2NhZGRiMjU2OTkwXCJcclxufSk7XHJcbi8v5Yid5aeL5YyWU0RL77yM5rWL6K+V546v5aKDXHJcbi8vIFlZSU1DaGF0LmluaXRTREsoe1xyXG4vLyAgICAgYXBwOiAnaW1fcHJlJywgLy9hcHBJZFxyXG4vLyAgICAgZXRwOiAneW9ueW91JywgLy9ldHBJZFxyXG4vLyAgICAgd3N1cmw6ICcxNzIuMjAuMTUuNjAnLCAvL3dlYnNvY2tldCBVcmxcclxuLy8gICAgIHdzcG9ydDogNTIyNywgLy93ZWJzb2NrZXQgcG9ydCA1MjI3LzUyMjIvNTIyNVxyXG4vLyAgICAgaGJwb3J0OiA3MDc1LCAvL2h0dHBiaW5kICBwb3J0IDcwNzUvNzA3MFxyXG4vLyAgICAgc2VydmxldDogJ2h0dHA6Ly8xNzIuMjAuMTUuNjAvJywgLy9yZXN0IFVybFxyXG4vLyAgICAgZmxhc2hfc3dmX3VybDogJ3h4eC94L01veGllLnN3ZicsIC8vZmxhc2gg5LiK5LygIHN3ZuaWh+S7tuS9jee9rlxyXG4vLyAgICAgbG9nRW5hYmxlOiB0cnVlLCAvL2NsaWVudCBsb2dcclxuLy8gICAgIGNsaWVudE1hcms6ICd3ZWInLCAvL2NsaWVudCBtYXJrICd3ZWInIG9yICdwYydcclxuLy8gICAgIGFwaUtleTogXCI4NWRlNzliOWY3ZTM0YzM3YTk5YWNjYWRkYjI1Njk5MFwiXHJcbi8vIH0pO1xyXG5cclxuLy/liJ3lp4vljJblm57osIPmlrnms5VcclxuWVlJTUNoYXQuaW5pdCh7XHJcbiAgICBvbk9wZW5lZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g55m75b2V5oiQ5Yqf6K6+572u5Zyo57q/54q25oCBXHJcbiAgICAgICAgWVlJTUNoYXQuc2V0UHJlc2VuY2UoKTtcclxuICAgICAgICAvL+enu+mZpOS/neWtmOeahOmAmuiur+WvueaWuWlk77yM6YG/5YWN6aG16Z2i5Yi35paw5ZCO5pyA6L+R6IGU57O75Lq66IGU57O754q25oCB6L+Y6K6w5b2V552AXHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3RhcmdldHVzZXJpZCcpO1xyXG4gICAgICAgIC8vIOiOt+WPluiHquW3seS/oeaBr1xyXG4gICAgICAgIFlZSU1DaGF0LmdldFZDYXJkKHtcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICAgLy/kv53lrZjoh6rlt7HnmoTkv6Hmga9cclxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50dXNlcmluZm8nLCBKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8v6I635Y+W5pyA6L+R6IGU57O75Lq6XHJcbiAgICAgICAgZ2V0UmVjZW50RGlnc2V0KCk7XHJcbiAgICB9LFxyXG4gICAgb25FeHBpcmF0aW9uOiBmdW5jdGlvbihjYWxsYmFjaykge1xyXG4gICAgICAgIC8v6Ieq5Yqo5pu05pawdG9rZW5cclxuICAgICAgICAvLyBjYWxsYmFjayh0b2tlbiwgZXhwaXJhdGlvbik7XHJcbiAgICB9LFxyXG4gICAgb25DbG9zZWQ6IGZ1bmN0aW9uKGFyZykge1xyXG4gICAgICAgIC8v6L+e5o6l5YWz6ZetXHJcbiAgICB9LFxyXG4gICAgb25Db25mbGljdGVkOiBmdW5jdGlvbihhcmcpIHtcclxuICAgICAgICAvL+eZu+mZhuWGsueqgVxyXG4gICAgfSxcclxuICAgIG9uQ2xpZW50S2lja291dDogZnVuY3Rpb24oYXJnKSB7XHJcbiAgICAgICAgLy/ooqvku5bnq6/ouKLmjolcclxuICAgIH0sXHJcbiAgICBvblVwZGF0ZVBhc3N3b3JkOiBmdW5jdGlvbihhcmcpIHtcclxuICAgICAgICAvL+abtOaUueWvhuegge+8jOiiq+i4ouaOiVxyXG4gICAgfSxcclxuICAgIG9uQXV0aEVycm9yOiBmdW5jdGlvbihhcmcpIHtcclxuICAgICAgICAvL+eZu+mZhuiupOivgeWksei0pVxyXG4gICAgfSxcclxuICAgIG9uQ29ubmVjdEVycm9yOiBmdW5jdGlvbihhcmcpIHtcclxuICAgICAgICAvL+i/nuaOpeWksei0pVxyXG4gICAgfSxcclxuICAgIG9uUmVjZWlwdHM6IGZ1bmN0aW9uKGFyZykge1xyXG4gICAgICAgIC8v5raI5oGv5Zue5omnXHJcbiAgICB9LFxyXG4gICAgb25TdWJzY3JpYmU6IGZ1bmN0aW9uKGFyZykge1xyXG4gICAgICAgIC8v5Y+R55Sf6K6i6ZiFXHJcbiAgICB9LFxyXG4gICAgb25Sb3N0ZXJGYXZvcml0ZWQ6IGZ1bmN0aW9uKGFyZykge1xyXG4gICAgICAgIC8v6KKr5pS26JePXHJcbiAgICB9LFxyXG4gICAgb25Sb3N0ZXJVcGRhdGVkZWQ6IGZ1bmN0aW9uKGFyZykge1xyXG4gICAgICAgIC8v5aW95Y+L5L+h5oGv5pu05pS5XHJcbiAgICB9LFxyXG4gICAgb25NZXNzYWdlOiBmdW5jdGlvbihtc2cpIHtcclxuICAgICAgICAvL+a4suafk+WOhuWPsuiBiuWkqeiusOW9lVxyXG4gICAgICAgIHJlbmRlckhpc3RvcnlNZXNzYWdlKG1zZyk7XHJcbiAgICB9LFxyXG4gICAgb25Hcm91cFVwZGF0ZTogZnVuY3Rpb24oYXJnKSB7XHJcbiAgICAgICAgLy/nvqTnu4Tmm7TmlrBcclxuICAgIH0sXHJcbiAgICBvbktpY2tlZE91dEdyb3VwOiBmdW5jdGlvbihhcmcpIHtcclxuICAgICAgICAvL+e+pOaIkOWRmOiiq+e+pOS4u+aPkOWHulxyXG4gICAgfSxcclxuICAgIG9uVHJhbnNmZXJHcm91cE93bmVyOiBmdW5jdGlvbihhcmcpe1xyXG4gICAgICAgIC8v576k5Li76L2s6K6pXHJcbiAgICB9LFxyXG4gICAgb25QcmVzZW5jZTogZnVuY3Rpb24oYXJnKSB7XHJcbiAgICAgICAgLy/lpb3lj4twcmVzZW5jZeaUueWPmFxyXG4gICAgfSxcclxuICAgIG9uUm9zdGVyRGVsZXRlZDogZnVuY3Rpb24oYXJnKSB7XHJcbiAgICAgICAgLy/lpb3lj4vooqvliKDpmaRcclxuICAgIH0sXHJcbiAgICBvblB1YmFjY291bnRVcGRhdGU6IGZ1bmN0aW9uKHB1YmFjY291bnRzKSB7XHJcbiAgICAgICAgLy/lhazlhbHlj7fkv6Hmga/mm7TmlrBcclxuICAgIH0sXHJcbiAgICBvblRyYW5zcGFyZW50TWVzc2FnZTogZnVuY3Rpb24oYXJnKSB7XHJcbiAgICAgICAgLy/pgI/kvKDkuJrliqHmtojmga9cclxuICAgIH1cclxufSk7XHJcblxyXG4iLCJleHBvcnQgY29uc3QgZXhwcmVzc2lvbkxpc3QgPSB7XHJcbiAgICBwYXRoOiBcIi4vaW1ncy9icS9cIixcclxuICAgIGRhdGE6IFtcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+m+h+eJmV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2NpeWFAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WTiOWTiF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2hhaGFAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+aZlV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3l1bkAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5rGXXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25faGFuYkAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5a6z576eXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25faGFpeEAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6LCD55quXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fdGlhb3BAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+eWkemXrl1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3lpd0AyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5o2C6IS4XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fd3VsaWFuQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlpbjnrJFdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9qaWFueGlhb0AyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5py65pm6XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fc21hcnRAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+W+l+aEj11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2RleWlAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+eskWNyeV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2xhdWdoaW5nX3RlYXJzQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmtYHms6pdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9jcnlpbmdAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+Wli+aWl11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2ZlbmRvdUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5oqx5oqxXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25faHVnQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvnlJ/nl4VdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9pbGxAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WwtOWwrF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2dhbmdhQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlgbfnrJFdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl90b3V4QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvotZ5dXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl96YW5AMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+aPoeaJi11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3dvc0AyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJbT0tdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9va0AyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJbeWVha11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3llYWtAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+m8k+aOjF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2d1ekAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5ouz5aS0XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fcXVhbnRvdUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6IKM6IKJXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25famlyb3VAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+aPoeaLs11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3dvcUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5ouc5omYXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fYmFpdEAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5oSJ5b+rXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25feXVrQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvpmr7ov4ddXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9uYW5ndW9AMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+mXreWYtF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2JpenVpQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlm7BdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9rdW5AMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+eMquWktF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3BpZ0AyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb54ix5b+DXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25faGVhcnRAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+W/g+eijl1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3hpbnN1aUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb56S855uSXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fYm94QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlkLtdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9raXNzYUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb546r55Gw6IqxXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fcm9zZUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5qOS5qOS57OWXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fY2FuZHlAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+aZmuWuiV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX25pZ2h0QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvnpYjnpbddXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9wcmF5QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvnu5nliptdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9nZWlsaUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6LipXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fY2FpQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvkurLkurJdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9raXNzYkAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5ZiYXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25feHVAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+iJsl1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3NlQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlj6/mgJxdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9rZWxpYW5AMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WPkeWRhl1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2ZhZGFpQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlpKflk61dXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9jcnlhQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlm7BaenpdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl96enpAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+aAneiAg11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3Npa2FvQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvnmb3nnLxdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9iYWl5QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlgrLmhaJdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9hb21hbkAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6YW3XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fa3VAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+Wbp11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2ppb25nQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvphJnop4ZdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9iaXNAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+mlpemlv11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2ppZUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5ZCTXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25feGlhQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmiqDpvLtdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9rb3ViaUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5oOK6K62XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25famluZ3lAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WPkeaAkl1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2FuZ3J5QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmg4rmgZBdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9qaW5na0AyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5ZCQXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fdHVAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+aLnOaLnF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2J5ZUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5ZKW5ZWhXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fY29mZmVlQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvllaTphZJdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9iZWVyQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvkuIvpm6hdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9yYWluQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvpl6rnlLVdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9zaGFuZEAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5LiL6ZuqXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fc25vd0AyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6Laz55CDXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fYmFsbEAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb56+u55CDXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fYmFza2V0QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvpo57mnLpdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9wbGFuZUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6YKu5Lu2XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fbWFpbEAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6Zuo5LyeXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25feXVzYW5AMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+Wlluadr11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2ppYW5nYkAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5oCq54mpXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fZ3VhaXd1QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvoja9dXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9tZWRAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+eCuOW8uV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3poYWRAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+ibi+ezlV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2Nha2VAMngucG5nXCIgfVxyXG4gICAgXVxyXG59OyIsIi8vZG9t5YWD57SgXHJcbmltcG9ydCB7XHJcbiAgICAkeXlpbV9pb2dpbixcclxuICAgICR5eWltX2JveCxcclxuICAgICR5eWltX21haW4sXHJcbiAgICAkal9tb3ZlLFxyXG4gICAgJGpfYnFfYm94LFxyXG4gICAgJHl5aW1fZWRpdG9yLFxyXG4gICAgJGJ0bl9zZW5kLFxyXG4gICAgJGxvZ2luX3VzZXJuYW1lLFxyXG4gICAgJGxvZ2luX3Bhc3MsXHJcbiAgICAkbG9naW5fYnRuLFxyXG4gICAgJGhjb250YWN0cyxcclxuICAgICRjaGF0c19saXN0LFxyXG4gICAgJHBpY3ZpZXdlcixcclxuICAgIHBpY3ZpZXdlclxyXG59IGZyb20gJy4vanFlbGVtZW50cyc7XHJcblxyXG4vL+ihqOaDheaVsOaNrlxyXG5pbXBvcnQgeyBleHByZXNzaW9uTGlzdCB9IGZyb20gJy4vY29uc3RhbnRzJztcclxuXHJcbi8v55So5oi355m76ZmGXHJcbmltcG9ydCB1c2VyTG9naW4gZnJvbSAnLi91c2VyTG9naW4nO1xyXG5cclxuLy/ojrflj5bljoblj7LogYrlpKnorrDlvZVcclxuaW1wb3J0IGdldEhpc3RvcnlNZXNzYWdlIGZyb20gJy4vZ2V0SGlzdG9yeU1lc3NhZ2UnO1xyXG5cclxuLy/muLLmn5Pljoblj7LogYrlpKnorrDlvZVcclxuaW1wb3J0IHJlbmRlckhpc3RvcnlNZXNzYWdlIGZyb20gJy4vcmVuZGVySGlzdG9yeU1lc3NhZ2UnO1xyXG5cclxuLy/mlL7nva7ooajmg4XliJfooahcclxuJGpfYnFfYm94Lmh0bWwoZXhwcmVzc2lvbkxpc3QuZGF0YS5tYXAoKHQpID0+IHtcclxuICAgIHJldHVybiBgPGxpIGRhdGEtY29kZT1cIiR7dC5hY3Rpb25EYXRhfVwiPjxpbWcgc3JjPVwiJHtleHByZXNzaW9uTGlzdC5wYXRoK3QudXJsfVwiIHRpdGxlPVwiJHt0LmFjdGlvbkRhdGF9XCIgYWx0PVwiXCI+PC9saT5gO1xyXG59KSk7XHJcblxyXG4vL+S4tOaXtuiHquWKqOeZu+W9leeahFxyXG5pZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudHVzZXJpbmZvJykpe1xyXG4gICAgdXNlckxvZ2luKEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnR1c2VyaW5mbycpKS51c2VybmFtZSk7XHJcbn1cclxuLy/nlKjmiLfnmbvpmYZcclxuJGxvZ2luX2J0bi5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgdXNlcm5hbWUgPSAkbG9naW5fdXNlcm5hbWUudmFsKCk7XHJcbiAgICBsZXQgcGFzc3dvcmQgPSAkbG9naW5fcGFzcy52YWwoKTtcclxuICAgIGlmKC9eW2Etel1bYS16XzAtOV0qJC8udGVzdCh1c2VybmFtZSkpe1xyXG4gICAgICAgIHVzZXJMb2dpbih1c2VybmFtZSwgcGFzc3dvcmQpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8v5pyA5aSn5YyW5oyJ6ZKu54K55Ye7XHJcbiQoJy5zY2FsZWNoYXQnKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAkeXlpbV9tYWluLmhhc0NsYXNzKCdtYXh3aW5kb3cnKSA/ICR5eWltX21haW4ucmVtb3ZlQ2xhc3MoJ21heHdpbmRvdycpIDogJHl5aW1fbWFpbi5hZGRDbGFzcygnbWF4d2luZG93Jyk7XHJcbiAgICAkeXlpbV9tYWluLmNzcyh7bGVmdDogJzAnLCB0b3A6ICcwJ30pO1xyXG59KTtcclxuXHJcbi8v5YWz6Zet56qX5Y+j5oyJ6ZKu54K55Ye7XHJcbiQoJy5jbG9zZWNoYXQnKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcclxuICAgICR5eWltX2JveC5oaWRlKCk7XHJcbiAgICAkeXlpbV9pb2dpbi5zaG93KCk7XHJcbn0pO1xyXG5cclxuLy/np7vliqjkuovku7ZcclxuJGpfbW92ZS5vbignbW91c2Vkb3duJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIGxldCBvcmlnaW5YID0gZS5jbGllbnRYO1xyXG4gICAgbGV0IG9yaWdpblkgPSBlLmNsaWVudFk7XHJcbiAgICBsZXQgYm94UG9zID0gJHl5aW1fbWFpbi5wb3NpdGlvbigpO1xyXG4gICAgJHl5aW1fYm94Lm9uKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICR5eWltX21haW4uY3NzKHtsZWZ0OiAoYm94UG9zLmxlZnQgKyBlLmNsaWVudFggLSBvcmlnaW5YKSArICdweCcsIHRvcDogKGJveFBvcy50b3AgKyBlLmNsaWVudFkgLSBvcmlnaW5ZKSArICdweCd9KTtcclxuICAgIH0pO1xyXG59KTtcclxuJHl5aW1fYm94Lm9uKCdtb3VzZXVwJywgZnVuY3Rpb24gKCkge1xyXG4gICAgJCh0aGlzKS5vZmYoJ21vdXNlbW92ZScpO1xyXG59KTtcclxuXHJcblxyXG4vL+aQnOe0ouWlveWPi1xyXG4kKCcueXlpbS1zZWFyY2gnKS5vbigna2V5ZG93bicsZnVuY3Rpb24gKGUpIHtcclxuICAgIGxldCBrZXl3b3JkID0gJCh0aGlzKS52YWwoKTtcclxuICAgIGlmKGUua2V5Q29kZSA9PT0gMTMgJiYga2V5d29yZCl7XHJcbiAgICAgICAgLy9cclxuICAgICAgICBZWUlNQ2hhdC5nZXRSb3N0ZXJJdGVtcyh7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04ucGFyc2UocmVzKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vL+eCueWHu+acgOi/keiBlOezu+S6ulxyXG4kaGNvbnRhY3RzLm9uKCdjbGljaycsJ2xpJyxmdW5jdGlvbiAoKSB7XHJcbiAgICAkY2hhdHNfbGlzdC5odG1sKCcnKTtcclxuICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgJCh0aGlzKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICRqX21vdmUuaHRtbCgkKHRoaXMpLmF0dHIoJ2RhdGEtbmlja25hbWUnKSk7XHJcbiAgICAvL+aKiumAieaLqeeahOiBiuWkqeWvueaWuWlk5L+d5a2Y6LW35p2lLOeUqOS6jue7meS7luWPkemAgea2iOaBr1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RhcmdldHVzZXJpZCcsICQodGhpcykuYXR0cignZGF0YS1pZCcpKTtcclxuICAgIC8v5Yig6Zmk5L+d5a2Y55qE6IGK5aSp5Y6G5Y+yXHJcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnaGlzdG9yeWNoYXRzJyk7XHJcbiAgICAvL+iOt+WPluWOhuWPsuiBiuWkqeS/oeaBr1xyXG4gICAgZ2V0SGlzdG9yeU1lc3NhZ2UoJCh0aGlzKS5hdHRyKCdkYXRhLXNlc3Npb25WZXJzaW9uJyksICQodGhpcykuYXR0cignZGF0YS1pZCcpLCAkKHRoaXMpLmF0dHIoJ2RhdGEtdHlwZScpKTtcclxufSk7XHJcblxyXG4vL+WFs+mXreiBlOezu+S6uueCueWHu1xyXG4kaGNvbnRhY3RzLm9uKCdjbGljaycsJy5jbG9zZScsZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc29sZS5sb2coJ+WFs+mXrScrICQodGhpcykuYXR0cignZGF0YS1pZCcpKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxufSk7XHJcblxyXG4vL+afpeeci+iBiuWkqea2iOaBr+WbvueJh1xyXG4kY2hhdHNfbGlzdC5vbignY2xpY2snLCAnLmNoYXRwaWMnLCBmdW5jdGlvbigpe1xyXG4gICAgbGV0IHBpY3VybCA9ICQodGhpcykuYXR0cignZGF0YS11cmwnKTtcclxuICAgICRwaWN2aWV3ZXIuaHRtbCgnPGxpPjxpbWcgZGF0YS1vcmlnaW5hbD1cIicrIHBpY3VybCArJ1wiIHNyYz1cIicrIHBpY3VybCArJ1wiIGFsdD1cIlwiPjwvbGk+JylcclxuICAgIHBpY3ZpZXdlci5zaG93KHt1cmw6IHBpY3VybH0pO1xyXG59KTtcclxuXHJcblxyXG5cclxuLy/ooajmg4XmjInpkq7ngrnlh7tcclxuJCgnLmpfbWVudV9icScpLmhvdmVyKGZ1bmN0aW9uICgpIHtcclxuICAgICQodGhpcykuYWRkQ2xhc3MoJ2hvdmVyJyk7XHJcbiAgICAkKCcuYnFfdGlwJykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbn0sZnVuY3Rpb24gKCkge1xyXG4gICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaG92ZXInKTtcclxuICAgICQoJy5icV90aXAnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG59KS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAkal9icV9ib3gudG9nZ2xlKCk7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn0pO1xyXG5cclxuLy/ooajmg4Xngrnlh7tcclxuJGpfYnFfYm94Lm9uKCdjbGljaycsICdsaScsIGZ1bmN0aW9uICgpIHtcclxuICAgICR5eWltX2VkaXRvci52YWwoJHl5aW1fZWRpdG9yLnZhbCgpICsgJCh0aGlzKS5hdHRyKCdkYXRhLWNvZGUnKSk7XHJcbiAgICBpZigkeXlpbV9lZGl0b3IudmFsKCkpe1xyXG4gICAgICAgICRidG5fc2VuZC5yZW1vdmVDbGFzcygnYWRpdC1idG4tc2VuZC1kaXNhYmxlZCcpO1xyXG4gICAgfWVsc2Uge1xyXG4gICAgICAgICRidG5fc2VuZC5hZGRDbGFzcygnYWRpdC1idG4tc2VuZC1kaXNhYmxlZCcpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59KTtcclxuXHJcbi8v5oyJ6KaB5rGC6ZqQ6JeP6KGo5oOF5qGGXHJcbiRqX2JxX2JveC5ob3ZlcihmdW5jdGlvbiAoZSkge30sZnVuY3Rpb24oKXskKHRoaXMpLmhpZGUoKX0pO1xyXG5cclxuLy/lj5HpgIHlm77niYfmjInpkq7ngrnlh7tcclxuJCgnLmpfbWVudV90cCcpLmhvdmVyKGZ1bmN0aW9uICgpIHtcclxuICAgICQodGhpcykuYWRkQ2xhc3MoJ2hvdmVyJyk7XHJcbiAgICAkKCcudHBfdGlwJykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbn0sZnVuY3Rpb24gKCkge1xyXG4gICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaG92ZXInKTtcclxuICAgICQoJy50cF90aXAnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG59KS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAkKCcjdXBsb2FkUGljJykuY2xpY2soKTtcclxufSk7XHJcblxyXG4kKCcjdXBsb2FkUGljJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XHJcbiAgICAvL+iOt+WPluWvueivneS6umlkXHJcbiAgICBsZXQgdG8gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGFyZ2V0dXNlcmlkJyk7XHJcbiAgICBZWUlNQ2hhdC5zZW5kUGljKHtcclxuICAgICAgICBmaWxlSW5wdXRJZDondXBsb2FkUGljJywgLy/mlofku7bln59pZCBcclxuICAgICAgICAvLyBkcm9wX2VsZW1lbnQ6IFtkcm9wSURdLCAvL+aLluaLveS4iuS8oOWFg+e0oGlk77yM5oiW6ICF5pWw57uEXHJcbiAgICAgICAgY2hhdEluZm86IGZ1bmN0aW9uKCl7IC8v55So5oi35Y+R6YCB5raI5oGv5pe26I635Y+W5a+56K+d5Lq65L+h5oGvXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB0bzogdG8sIC8v5a+56K+d5Lq6aWRcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdjaGF0JywgLy9jaGF0L2dyb3VwY2hhdC9wdWJhY2NvdW50XHJcbiAgICAgICAgICAgICAgICBleHRlbmQ6ICcnIC8v5omp5bGV5a2X5q61XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSxcclxuICAgICAgICBmaWxlRmlsdGVyZWQ6IGZ1bmN0aW9uKCl7fSwgLy/mlofku7booqvmt7vliqDliLDkuIrkvKDpmJ/liJdcclxuICAgICAgICBmaWxlVXBsb2FkZWQ6IGZ1bmN0aW9uKCl7fSwgLy/kuIrkvKDpmJ/liJfmn5DkuIDkuKrmlofku7bkuIrkvKDlrozmr5VcclxuICAgICAgICBiZWZvcmVVcGxvYWQ6IGZ1bmN0aW9uKCl7fSwgLy/mlofku7bkuIrkvKDkuYvliY3op6blj5FcclxuICAgICAgICBzdWNjZXNzOmZ1bmN0aW9uKG1zZyl7XHJcbiAgICAgICAgICAgIC8v5riy5p+T5Y6G5Y+y5L+h5oGvXHJcbiAgICAgICAgICAgIHJlbmRlckhpc3RvcnlNZXNzYWdlKG1zZyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHByb2dyZXNzOiBmdW5jdGlvbihwcm8pe1xyXG4gICAgICAgICAgICAvL+S4iuS8oOi/m+W6plxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwcm8pO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn0pO1xyXG5cclxuLy/mlofku7bmjInpkq7ngrnlh7tcclxuJCgnLmpfbWVudV93aicpLmhvdmVyKGZ1bmN0aW9uICgpIHtcclxuICAgICQodGhpcykuYWRkQ2xhc3MoJ2hvdmVyJyk7XHJcbiAgICAkKCcud2pfdGlwJykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbn0sZnVuY3Rpb24gKCkge1xyXG4gICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaG92ZXInKTtcclxuICAgICQoJy53al90aXAnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG59KS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAkKCcjdXBsb2FkRmlsZScpLmNsaWNrKCk7XHJcbn0pO1xyXG5cclxuJCgnI3VwbG9hZEZpbGUnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcclxuICAgIC8v6I635Y+W5a+56K+d5Lq6aWRcclxuICAgIGxldCB0byA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0YXJnZXR1c2VyaWQnKTtcclxuICAgIFlZSU1DaGF0LnNlbmRGaWxlKHtcclxuICAgICAgICBmaWxlSW5wdXRJZDondXBsb2FkRmlsZScsIC8v5paH5Lu25Z+faWQgXHJcbiAgICAgICAgLy8gZHJvcF9lbGVtZW50OiBbZHJvcElEXSwgLy/mi5bmi73kuIrkvKDlhYPntKBpZO+8jOaIluiAheaVsOe7hFxyXG4gICAgICAgIGNoYXRJbmZvOiBmdW5jdGlvbigpeyAvL+eUqOaIt+WPkemAgea2iOaBr+aXtuiOt+WPluWvueivneS6uuS/oeaBr1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdG86IHRvLCAvL+WvueivneS6umlkXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnY2hhdCcsIC8vY2hhdC9ncm91cGNoYXQvcHViYWNjb3VudFxyXG4gICAgICAgICAgICAgICAgZXh0ZW5kOiAnJyAvL+aJqeWxleWtl+autVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZmlsZUZpbHRlcmVkOiBmdW5jdGlvbigpe30sIC8v5paH5Lu26KKr5re75Yqg5Yiw5LiK5Lyg6Zif5YiXXHJcbiAgICAgICAgZmlsZVVwbG9hZGVkOiBmdW5jdGlvbigpe30sIC8v5LiK5Lyg6Zif5YiX5p+Q5LiA5Liq5paH5Lu25LiK5Lyg5a6M5q+VXHJcbiAgICAgICAgYmVmb3JlVXBsb2FkOiBmdW5jdGlvbigpe30sIC8v5paH5Lu25LiK5Lyg5LmL5YmN6Kem5Y+RXHJcbiAgICAgICAgc3VjY2VzczpmdW5jdGlvbihtc2cpe1xyXG4gICAgICAgICAgICAvL+a4suafk+WOhuWPsuS/oeaBr1xyXG4gICAgICAgICAgICByZW5kZXJIaXN0b3J5TWVzc2FnZShtc2cpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGVycil7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBwcm9ncmVzczogZnVuY3Rpb24ocHJvKXtcclxuICAgICAgICAgICAgLy/kuIrkvKDov5vluqZcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocHJvKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59KTtcclxuXHJcblxyXG4vL+aOp+WItuaYr+WQpuWPr+S7peWPkemAgVxyXG4keXlpbV9lZGl0b3Iub24oJ2lucHV0IHByb3BlcnR5Y2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgaWYoJCh0aGlzKS52YWwoKSl7XHJcbiAgICAgICAgJGJ0bl9zZW5kLnJlbW92ZUNsYXNzKCdhZGl0LWJ0bi1zZW5kLWRpc2FibGVkJyk7XHJcbiAgICB9ZWxzZSB7XHJcbiAgICAgICAgJGJ0bl9zZW5kLmFkZENsYXNzKCdhZGl0LWJ0bi1zZW5kLWRpc2FibGVkJyk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLy/lj5HpgIHmjInpkq7ngrnlh7tcclxuJGJ0bl9zZW5kLm9uKCdjbGljaycsZnVuY3Rpb24gKCkge1xyXG4gICAgaWYoJHl5aW1fZWRpdG9yLnZhbCgpKXtcclxuICAgICAgICAvL+S7juacrOWcsOaLv+WPluiBiuWkqeWvueaWuWlkXHJcbiAgICAgICAgbGV0IHRvID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RhcmdldHVzZXJpZCcpO1xyXG4gICAgICAgIC8v6LCD55So5Y+R6YCB5paH5pys5raI5oGv5o6l5Y+jXHJcbiAgICAgICAgWVlJTUNoYXQuc2VuZFRleHRNZXNzYWdlKHtcclxuICAgICAgICAgICAgdG86IHRvLCAvL+WvueivneS6umlkXHJcbiAgICAgICAgICAgIHR5cGU6IFwiY2hhdFwiLCAgLy9jaGF0OuWNleiBiu+8jGdyb3VwY2dhdDrnvqTogYoscHViYWNjb3VudDrlhazkvJflj7dcclxuICAgICAgICAgICAgY29udGVudDokeXlpbV9lZGl0b3IudmFsKCksIC8v5raI5oGv5paH5pysXHJcbiAgICAgICAgICAgIGV4dGVuZDogJycsICAvL+aJqeWxleWtl+autVxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAobXNnKSB7XHJcbiAgICAgICAgICAgICAgICAvL+WPkemAgeaIkOWKn+S5i+WQjua4heepuui+k+WFpeahhlxyXG4gICAgICAgICAgICAgICAgJHl5aW1fZWRpdG9yLnZhbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAkYnRuX3NlbmQuYWRkQ2xhc3MoJ2FkaXQtYnRuLXNlbmQtZGlzYWJsZWQnKTtcclxuICAgICAgICAgICAgICAgIC8v5riy5p+T5Y6G5Y+y5L+h5oGvXHJcbiAgICAgICAgICAgICAgICByZW5kZXJIaXN0b3J5TWVzc2FnZShtc2cpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLy/mjInkuItlbnRlcuS5n+WPr+S7peWPkemAgVxyXG4keXlpbV9lZGl0b3Iub24oJ2tleWRvd24nLGZ1bmN0aW9uKGUpe1xyXG4gICAgaWYoZS5rZXlDb2RlID09PSAxMyAmJiAkeXlpbV9lZGl0b3IudmFsKCkpe1xyXG4gICAgICAgIC8v5LuO5pys5Zyw5ou/5Y+W6IGK5aSp5a+55pa5aWRcclxuICAgICAgICBsZXQgdG8gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGFyZ2V0dXNlcmlkJyk7XHJcbiAgICAgICAgLy/osIPnlKjlj5HpgIHmlofmnKzmtojmga/mjqXlj6NcclxuICAgICAgICBZWUlNQ2hhdC5zZW5kVGV4dE1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICB0bzogdG8sIC8v5a+56K+d5Lq6aWRcclxuICAgICAgICAgICAgdHlwZTogXCJjaGF0XCIsICAvL2NoYXQ65Y2V6IGK77yMZ3JvdXBjZ2F0Oue+pOiBiixwdWJhY2NvdW50OuWFrOS8l+WPt1xyXG4gICAgICAgICAgICBjb250ZW50OiR5eWltX2VkaXRvci52YWwoKSwgLy/mtojmga/mlofmnKxcclxuICAgICAgICAgICAgZXh0ZW5kOiAnJywgIC8v5omp5bGV5a2X5q61XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChtc2cpIHtcclxuICAgICAgICAgICAgICAgIC8v5Y+R6YCB5oiQ5Yqf5LmL5ZCO5riF56m66L6T5YWl5qGGXHJcbiAgICAgICAgICAgICAgICAkeXlpbV9lZGl0b3IudmFsKCcnKTtcclxuICAgICAgICAgICAgICAgICRidG5fc2VuZC5hZGRDbGFzcygnYWRpdC1idG4tc2VuZC1kaXNhYmxlZCcpO1xyXG4gICAgICAgICAgICAgICAgLy/muLLmn5Pljoblj7Lkv6Hmga9cclxuICAgICAgICAgICAgICAgIHJlbmRlckhpc3RvcnlNZXNzYWdlKG1zZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSkiLCIvL2RvbeWFg+e0oFxyXG5pbXBvcnQge1xyXG4gICAgJGNoYXRfYm94LFxyXG4gICAgJGNoYXRzX2xpc3RcclxufSBmcm9tICcuL2pxZWxlbWVudHMnO1xyXG5cclxuLy/muLLmn5PogYrlpKnorrDlvZVcclxuaW1wb3J0IHJlbmRlckhpc3RvcnlNZXNzYWdlIGZyb20gJy4vcmVuZGVySGlzdG9yeU1lc3NhZ2UnO1xyXG5cclxuLy/ojrflj5bogYrlpKnljoblj7Is5Lyg5YWlc2Vzc2lvblZlcnNpb24s5a+55pa5aWTlkox0eXBl5Y+C5pWwXHJcbmV4cG9ydCBkZWZhdWx0IChzZXNzaW9uVmVyc2lvbiwgaWQsIHR5cGUpID0+IHtcclxuICAgIGxldCBzdGFydCA9IHNlc3Npb25WZXJzaW9uID4gMjAgPyBzZXNzaW9uVmVyc2lvbiAtIDIwIDogMDtcclxuICAgIC8v6I635Y+W5Y6G5Y+y6IGK5aSp5L+h5oGvXHJcbiAgICBZWUlNQ2hhdC5nZXRIaXN0b3J5TWVzc2FnZSh7XHJcbiAgICAgICAgaWQ6IGlkLFxyXG4gICAgICAgIHR5cGU6IHR5cGUsXHJcbiAgICAgICAgc3RhcnRWZXJzaW9uOiBzdGFydCxcclxuICAgICAgICBlbmRWZXJzaW9uOiBzZXNzaW9uVmVyc2lvbixcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgIGxldCBoaXN0b3J5Y2hhdHMgPSByZXMucmVzdWx0IHx8IFtdO1xyXG4gICAgICAgICAgICAkY2hhdF9ib3guc2hvdygpO1xyXG4gICAgICAgICAgICBoaXN0b3J5Y2hhdHMucmV2ZXJzZSgpO1xyXG4gICAgICAgICAgICAvL+aKiuiBiuWkqeiusOW9lee8k+WtmOWIsOacrOWcsFxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaGlzdG9yeWNoYXRzJywgSlNPTi5zdHJpbmdpZnkoaGlzdG9yeWNoYXRzKSk7XHJcbiAgICAgICAgICAgIC8v5riy5p+T6IGK5aSp5L+h5oGvXHJcbiAgICAgICAgICAgIHJlbmRlckhpc3RvcnlNZXNzYWdlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07IiwiXHJcbi8v5a+85YWl5pyA6L+R6IGU57O75Lq65riy5p+T5Ye95pWwXHJcbmltcG9ydCByZW5kZXJSZWNlbnREaWdzZXQgZnJvbSAnLi9yZW5kZXJSZWNlbnREaWdzZXQnO1xyXG5cclxuLy/ojrflj5bmnIDov5HogZTns7vkurpcclxuZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xyXG4gICAgLy8g6I635Y+W5pyA6L+R6IGU57O75Lq6QVBJXHJcbiAgICBZWUlNQ2hhdC5nZXRSZWNlbnREaWdzZXQoe1xyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5saXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlY2VudERpZ3NldCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0Lmxpc3QuZm9yRWFjaChmdW5jdGlvbihlLCBpKXtcclxuICAgICAgICAgICAgICAgICAgICAvL+ebruWJjea1i+ivleWPquaYvuekuuS4quS6uuiBiuWkqe+8jOS4jeaYvuekuue+pOaIluWFtuS7liBcclxuICAgICAgICAgICAgICAgICAgICBpZihlLnR5cGUgIT09ICdjaGF0Jyl7cmV0dXJuO31cclxuICAgICAgICAgICAgICAgICAgICAvL+mAmui/h2lk6I635Y+W5Liq5Lq65L+h5oGvXHJcbiAgICAgICAgICAgICAgICAgICAgWVlJTUNoYXQuZ2V0VkNhcmQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogZS5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5pW055CG5pyA6L+R6IGU57O75Lq65YiX6KGo5Yiw5LiA5Liq5paw5pWw57uEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNlbnREaWdzZXQucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHJlcy5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkZWRWZXJzaW9uOiBlLnJlYWRlZFZlcnNpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vzc2lvblZlcnNpb246IGUuc2Vzc2lvblZlcnNpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZS50eXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBob3RvOiByZXMucGhvdG8gfHwgJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmlja25hbWU6IHJlcy5uaWNrbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0TWVzc2FnZTogZS5sYXN0TWVzc2FnZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0Q29udGFjdFRpbWU6IGUubGFzdENvbnRhY3RUaW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5oqK5pyA6L+R6IGU57O75Lq65YiX6KGo5L+d5a2Y5Yiw5pys5ZywXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncmVjZW50ZGlnc2V0JywgSlNPTi5zdHJpbmdpZnkocmVjZW50RGlnc2V0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJSZWNlbnREaWdzZXQocmVjZW50RGlnc2V0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yOmZ1bmN0aW9uIChlcnIpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59IiwiXHJcbmV4cG9ydCBjb25zdCAkeXlpbV9pb2dpbiA9ICQoJy55eWltLWlvZ2luJyk7Ly/nmbvpmYbmoYZcclxuZXhwb3J0IGNvbnN0ICRsb2dpbl91c2VybmFtZSA9ICQoJy5sb2dpbi11c2VybmFtZScpOy8v55m76ZmG55So5oi35ZCNXHJcbmV4cG9ydCBjb25zdCAkbG9naW5fcGFzcyA9ICQoJy5sb2dpbi1wYXNzJyk7Ly/nmbvpmYbnlKjmiLflr4bnoIFcclxuZXhwb3J0IGNvbnN0ICRsb2dpbl9idG4gPSAkKCcubG9naW4tYnRuJyk7Ly/nmbvpmYbmjInpkq5cclxuZXhwb3J0IGNvbnN0ICR5eWltX2JveCA9ICQoJy55eWltLWJveCcpOy8v6IGK5aSp5qGG55qE6YGu572pXHJcbmV4cG9ydCBjb25zdCAkeXlpbV9tYWluID0gJCgnLnl5aW0tbWFpbicpOy8v6IGK5aSp5pyA5aSW5bGC56qX5Y+jXHJcbmV4cG9ydCBjb25zdCAkal9tb3ZlID0gJCgnLmpfbW92ZScpOy8v6IGK5aSp56qX5Y+j5aS0XHJcbmV4cG9ydCBjb25zdCAkaGNvbnRhY3RzID0gJCgnLmhjb250YWN0cycpOy8v5pyA6L+R6IGU57O75Lq65qGGXHJcbmV4cG9ydCBjb25zdCAkY2hhdHMgPSAkKCcuY2hhdHMnKTsvL+iBiuWkqeS/oeaBr+a7keWKqOWuueWZqFxyXG5leHBvcnQgY29uc3QgJGpfYnFfYm94ID0gJCgnLmpfYnFfYm94Jyk7Ly/ooajmg4Xnm5LlrZBcclxuZXhwb3J0IGNvbnN0ICR5eWltX2VkaXRvciA9ICQoJy55eWltLWVkaXRvcicpOy8v6IGK5aSp6L6T5YWl5qGGXHJcbmV4cG9ydCBjb25zdCAkYnRuX3NlbmQgPSAkKCcuYWRpdC1idG4tc2VuZCcpOyAvL+WPkemAgeaMiemSrlxyXG5leHBvcnQgY29uc3QgJGNoYXRfYm94ID0gJCgnLmNoYXQtYm94Jyk7IC8v5o6n5Yi25piv5ZCm5YW35pyJ6IGK5aSp5YaF5a65XHJcbmV4cG9ydCBjb25zdCAkY2hhdHNfbGlzdCA9ICQoJy5jaGF0cy1saXN0Jyk7IC8v6IGK5aSp5L+h5oGv5YiX6KGoXHJcbmV4cG9ydCBjb25zdCAkcGljdmlld2VyID0gJCgnI3BpY3ZpZXdlcicpOyAvL+WbvueJh+afpeeci+ahhlxyXG5cclxuLy/lrp7kvovljJZ2aWV3ZXJcclxuZXhwb3J0IGNvbnN0IHBpY3ZpZXdlciA9IG5ldyBWaWV3ZXIoJHBpY3ZpZXdlclswXSwge25hdmJhcjpmYWxzZSwgdGl0bGU6IGZhbHNlfSk7XHJcbi8vIHZpZXdlci5zaG93KHtcclxuLy8gICAgIHVybDogJ2h0dHBzOi8vd3d3LmJhaWR1LmNvbS9pbWcvYmRfbG9nbzEucG5nJ1xyXG4vLyB9KVxyXG4vLyAkcGljdmlld2VyLnZpZXdlcih7XHJcbi8vICAgICB1cmw6ICdodHRwczovL3d3dy5iYWlkdS5jb20vaW1nL2JkX2xvZ28xLnBuZycsIC8v6K6+572u5aSn5Zu+54mH55qEIHVybFxyXG4vLyAgICAgbmF2YmFyOnRydWUsIC8v5piv5ZCm5pi+56S657yp55Wl5Zu+5a+86IiqXHJcbi8vICAgICB0b29sYmFyOnRydWUsIC8v5pi+56S65bel5YW35qCPXHJcbi8vICAgICB0aXRsZTp0cnVlLCAvL+aYvuekuuW9k+WJjeWbvueJh+agh+mimChhbHTlsZ7mgKflkozlsLrlr7gpXHJcbi8vICAgICB0b29sdGlwOnRydWUsIC8v5pi+56S657yp5pS+55m+5YiG5q+UXHJcbi8vICAgICBtb3ZhYmxlOnRydWUsIC8v5Zu+54mH5piv5ZCm5Y+v56e75YqoXHJcbi8vICAgICB6b29tYWJsZTp0cnVlLCAvL+WbvueJh+aYr+WQpuWPr+e8qeaUvlxyXG4vLyAgICAgcm90YXRhYmxlOnRydWUsIC8v5Zu+54mH5piv5ZCm5Y+v5peL6L2sXHJcbi8vICAgICBzY2FsYWJsZTp0cnVlLCAvL+WbvueJh+aYr+WQpuWPr+e/u+i9rFxyXG4vLyAgICAgdHJhbnNpdGlvbjp0cnVlLCAvL+S9v+eUqCBDU1MzIOi/h+W6plxyXG4vLyAgICAgZnVsbHNjcmVlbjp0cnVlLCAvL+aSreaUvuaXtuaYr+WQpuWFqOWxj1xyXG4vLyAgICAga2V5Ym9hcmQ6dHJ1ZSwgLy/mmK/lkKbmlK/mjIHplK7nm5hcclxuLy8gICAgIGludGVydmFsOjUwMDAsIC8v5pKt5pS+6Ze06ZqU77yM5Y2V5L2N5Li65q+r56eSXHJcbi8vICAgICB6b29tUmF0aW86MC4xLCAvL+m8oOagh+a7muWKqOaXtueahOe8qeaUvuavlOS+i1xyXG4vLyAgICAgbWluWm9vbVJhdGlvOjAuMDEsIC8v5pyA5bCP57yp5pS+5q+U5L6LXHJcbi8vICAgICBtYXhab29tUmF0aW86MTAwLCAvL+acgOWkp+e8qeaUvuavlOS+i1xyXG4vLyAgICAgekluZGV4OjIwMTUsIC8v6K6+572u5Zu+54mH5p+l55yL5ZmoIG1vZGFsIOaooeW8j+aXtueahCB6LWluZGV4XHJcbi8vICAgICB6SW5kZXhJbmxpbmU6MCwgLy/orr7nva7lm77niYfmn6XnnIvlmaggaW5saW5lIOaooeW8j+aXtueahCB6LWluZGV4XHJcbi8vIH0pLnNob3coKTsiLCJcclxuLy9kb23lhYPntKBcclxuaW1wb3J0IHtcclxuICAgICRjaGF0cyxcclxuICAgICRjaGF0c19saXN0XHJcbn0gZnJvbSAnLi9qcWVsZW1lbnRzJztcclxuXHJcbi8v5riy5p+T5pyA6L+R6IGU57O75Lq65Ye95pWwXHJcbmltcG9ydCBnZXRSZWNlbnREaWdzZXQgZnJvbSAnLi9nZXRSZWNlbnREaWdzZXQnO1xyXG5cclxuLy/muLLmn5PmnIDov5HogZTns7vkurrlh73mlbBcclxuaW1wb3J0IHJlbmRlclJlY2VudERpZ3NldCBmcm9tICcuL3JlbmRlclJlY2VudERpZ3NldCc7XHJcblxyXG4vL+ihqOaDheaVsOaNrlxyXG5pbXBvcnQgeyBleHByZXNzaW9uTGlzdCB9IGZyb20gJy4vY29uc3RhbnRzJztcclxuXHJcbi8v55So5Zu+54mH5pu/5o2i5paH5pys5raI5oGv5Lit6KGo5oOF5L+h5oGvXHJcbmNvbnN0IHJlcGxhY2VFbW9qaSA9IChzdHIpID0+IHtcclxuICAgIHJldHVybiBzdHIucmVwbGFjZSgvXFxbW15cXFtcXF1dK1xcXS9nLChlKSA9PiB7XHJcbiAgICAgICAgZm9yIChsZXQgaT0wO2k8ZXhwcmVzc2lvbkxpc3QuZGF0YS5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgaWYoZXhwcmVzc2lvbkxpc3QuZGF0YVtpXS5hY3Rpb25EYXRhID09PSBlKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBgPGltZyBjbGFzcz1cImVtb2ppXCIgc3JjPVwiJHtleHByZXNzaW9uTGlzdC5wYXRoICsgZXhwcmVzc2lvbkxpc3QuZGF0YVtpXS51cmx9XCIgYWx0PVwiXCIgLz5gO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGU7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8v5riy5p+T6IGK5aSp6K6w5b2VLOS8oOWFpeS4gOadoeiBiuWkqeiusOW9leWvueixoeWNs+WPr1xyXG5leHBvcnQgZGVmYXVsdCAobXNnKSA9PiB7XHJcbiAgICAvL+aLv+WPluacrOWcsOS/neWtmOeahOWOhuWPsuiBiuWkqeS/oeaBr1xyXG4gICAgbGV0IGhpc3RvcnljaGF0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2hpc3RvcnljaGF0cycpIHx8IFwiW11cIik7XHJcbiAgICAvL+S7juacrOWcsOaLv+WPluiBiuWkqeWvueaWuWlkXHJcbiAgICBsZXQgdGFyZ2V0dXNlcmlkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RhcmdldHVzZXJpZCcpO1xyXG4gICAgLy/mi7/miJHoh6rlt7HnmoRpZFxyXG4gICAgbGV0IG15aWQgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50dXNlcmluZm8nKSkuaWQ7XHJcblxyXG4gICAgLy/lpoLmnpxtc2flrZjlnKjvvIzor7TmmI7kuI3mmK/liJ3mrKHmuLLmn5NcclxuICAgIGlmKG1zZyl7XHJcbiAgICAgICAgLy/mi7/lj5bmnKzlnLDkv53lrZjnmoTmnIDov5HogZTns7vkurrmlbDnu4RcclxuICAgICAgICBsZXQgcmVjZW50RGlnc2V0ID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncmVjZW50ZGlnc2V0JykgfHwgXCJbXVwiKTtcclxuXHJcbiAgICAgICAgaWYobXNnLmZyb20gPT09IG15aWQpeyAvL+a2iOaBr+aYr+aIkeWPkee7meWIq+S6uueahFxyXG4gICAgICAgICAgICByZWNlbnREaWdzZXQuZm9yRWFjaChmdW5jdGlvbihkaWdlc3QsIGkpe1xyXG4gICAgICAgICAgICAgICAgaWYoZGlnZXN0LmlkID09PSB0YXJnZXR1c2VyaWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlY2VudERpZ3NldFtpXS5sYXN0Q29udGFjdFRpbWUgPSBtc2cuZGF0YS5kYXRlbGluZTtcclxuICAgICAgICAgICAgICAgICAgICByZWNlbnREaWdzZXRbaV0ubGFzdE1lc3NhZ2UgPSBtc2c7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVjZW50RGlnc2V0W2ldLnNlc3Npb25WZXJzaW9uKys7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVjZW50RGlnc2V0W2ldLnJlYWRlZFZlcnNpb24rKztcclxuICAgICAgICAgICAgICAgICAgICAvL+S/neWtmOS/ruaUueWQjueahOacgOi/keiBlOezu+S6uuaVsOe7hFxyXG4gICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyZWNlbnRkaWdzZXQnLCBKU09OLnN0cmluZ2lmeShyZWNlbnREaWdzZXQpKTtcclxuICAgICAgICAgICAgICAgICAgICAvL+a4suafk+acgOi/keiBlOezu+S6ulxyXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlclJlY2VudERpZ3NldChyZWNlbnREaWdzZXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy/kv67mlLnljoblj7Lmtojmga9cclxuICAgICAgICAgICAgaGlzdG9yeWNoYXRzLnB1c2gobXNnKTtcclxuICAgICAgICAgICAgLy/kv67mlLnlkI7kv53lrZhcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2hpc3RvcnljaGF0cycsSlNPTi5zdHJpbmdpZnkoaGlzdG9yeWNoYXRzKSk7XHJcbiAgICAgICAgfSBlbHNlIHsgLy/mtojmga/mnaXoh6rkuo7ku5bkurrnu5nmiJHlj5HnmoRcclxuICAgICAgICAgICAgbGV0IGlzZGlnc2V0ID0gZmFsc2U7IC8v5Yik5pat5a+55pa55Zyo5LiN5Zyo5oiR55qE5pyA6L+R6IGU57O75Lq66YeMXHJcbiAgICAgICAgICAgIHJlY2VudERpZ3NldC5mb3JFYWNoKGZ1bmN0aW9uKGRpZ2VzdCwgaSl7XHJcbiAgICAgICAgICAgICAgICBpZihkaWdlc3QuaWQgPT09IG1zZy5mcm9tKXtcclxuICAgICAgICAgICAgICAgICAgICBpc2RpZ3NldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVjZW50RGlnc2V0W2ldLmxhc3RDb250YWN0VGltZSA9IG1zZy5kYXRhLmRhdGVsaW5lO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlY2VudERpZ3NldFtpXS5sYXN0TWVzc2FnZSA9IG1zZztcclxuICAgICAgICAgICAgICAgICAgICByZWNlbnREaWdzZXRbaV0uc2Vzc2lvblZlcnNpb24rKztcclxuICAgICAgICAgICAgICAgICAgICByZWNlbnREaWdzZXRbaV0ucmVhZGVkVmVyc2lvbisrO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5L+d5a2Y5L+u5pS55ZCO55qE5pyA6L+R6IGU57O75Lq65pWw57uEXHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3JlY2VudGRpZ3NldCcsIEpTT04uc3RyaW5naWZ5KHJlY2VudERpZ3NldCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5riy5p+T5pyA6L+R6IGU57O75Lq6XHJcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyUmVjZW50RGlnc2V0KHJlY2VudERpZ3NldCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvL+S4jeWcqOacgOi/keiBlOezu+S6uuS4re+8jOWIt+aWsOacgOi/keiBlOezu+S6uuWIl+ihqFxyXG4gICAgICAgICAgICBpZighaXNkaWdzZXQpe2dldFJlY2VudERpZ3NldCgpO31cclxuICAgICAgICAgICAgLy/miJHmraPlnKjlkozku5bogYrlpKlcclxuICAgICAgICAgICAgaWYobXNnLmZyb20gPT09IHRhcmdldHVzZXJpZCl7XHJcbiAgICAgICAgICAgICAgICAvL+S/ruaUueWOhuWPsua2iOaBr1xyXG4gICAgICAgICAgICAgICAgaGlzdG9yeWNoYXRzLnB1c2gobXNnKTtcclxuICAgICAgICAgICAgICAgIC8v5L+u5pS55ZCO5L+d5a2YXHJcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaGlzdG9yeWNoYXRzJyxKU09OLnN0cmluZ2lmeShoaXN0b3J5Y2hhdHMpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5aaC5p6c5oiR5rKh5ZKM5a+55pa56IGK5aSp77yM5YiZ5LiN5riy5p+T5Y6G5Y+y5L+h5oGvXHJcbiAgICBpZihtc2cgJiYgbXNnLmZyb20gIT09IG15aWQgJiYgbXNnLmZyb20gIT09IHRhcmdldHVzZXJpZCkgcmV0dXJuO1xyXG5cclxuICAgIGxldCBjaGF0c1N0ciA9ICcnO1xyXG4gICAgaGlzdG9yeWNoYXRzLmZvckVhY2goZnVuY3Rpb24oY2hhdCwgaSl7XHJcbiAgICAgICAgbGV0IGlzZnJvbW1lID0gbXlpZCA9PT0gY2hhdC5mcm9tO1xyXG4gICAgICAgIC8v5paH5pys5raI5oGvXHJcbiAgICAgICAgaWYoY2hhdC5kYXRhLmNvbnRlbnRUeXBlID09PSAyKXtcclxuICAgICAgICAgICAgY2hhdHNTdHIgKz0gYDxsaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGF0LXRpcFwiPiR7bmV3IERhdGUoY2hhdC5kYXRhLmRhdGVsaW5lKS50b0xvY2FsZVRpbWVTdHJpbmcoKX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGF0LWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHsgaXNmcm9tbWU/ICdjaGF0LWF2YXRhciBjaGF0LWF2YXRhci1zZW5kJyA6J2NoYXQtYXZhdGFyJ31cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2ltZ3MvYXZhdGFyLmpwZ1wiIGFsdD1cIlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCIkeyBpc2Zyb21tZT8gJ2NoYXQtdHh0IGNoYXQtdHh0LXNlbmQnIDonY2hhdC10eHQnfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tPGRpdiBjbGFzcz1cImNoYXQtdXNlci1uYW1lXCI+JHtjaGF0LmZyb219PC9kaXY+LS0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGF0LW1zZ1wiPiR7cmVwbGFjZUVtb2ppKGNoYXQuZGF0YS5jb250ZW50KX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPiBgO1xyXG4gICAgICAgIH1lbHNlIGlmKGNoYXQuZGF0YS5jb250ZW50VHlwZSA9PT0gOCl7ICAvL+WbvueJh+a2iOaBr1xyXG4gICAgICAgICAgICBsZXQgcGljdXJsID0gWVlJTUNoYXQuZ2V0RmlsZVVybChjaGF0LmRhdGEuY29udGVudC5hdHRhY2hJZCk7XHJcbiAgICAgICAgICAgIGNoYXRzU3RyICs9IGA8bGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hhdC10aXBcIj4ke25ldyBEYXRlKGNoYXQuZGF0YS5kYXRlbGluZSkudG9Mb2NhbGVUaW1lU3RyaW5nKCl9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hhdC1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiR7IGlzZnJvbW1lPyAnY2hhdC1hdmF0YXIgY2hhdC1hdmF0YXItc2VuZCcgOidjaGF0LWF2YXRhcid9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9pbWdzL2F2YXRhci5qcGdcIiBhbHQ9XCJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHsgaXNmcm9tbWU/ICdjaGF0LXR4dCBjaGF0LXR4dC1zZW5kJyA6J2NoYXQtdHh0J31cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTxkaXYgY2xhc3M9XCJjaGF0LXVzZXItbmFtZVwiPiR7Y2hhdC5mcm9tfTwvZGl2Pi0tPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hhdC1tc2dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJjaGF0cGljXCIgZGF0YS11cmw9XCIke3BpY3VybH1cIiBzcmM9XCIke3BpY3VybH1cIiB0aXRsZT1cIueCueWHu+afpeeci+WbvueJh1wiIGFsdD1cIlwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+IGA7XHJcbiAgICAgICAgfWVsc2UgaWYoY2hhdC5kYXRhLmNvbnRlbnRUeXBlID09PSA0KXtcclxuICAgICAgICAgICAgbGV0IHBpY3VybCA9IFlZSU1DaGF0LmdldEZpbGVVcmwoY2hhdC5kYXRhLmNvbnRlbnQuYXR0YWNoSWQpO1xyXG4gICAgICAgICAgICBsZXQgZmlsZW5hbWUgPSBjaGF0LmRhdGEuY29udGVudC5uYW1lLnNsaWNlKDAsIDIwKTtcclxuICAgICAgICAgICAgY2hhdHNTdHIgKz0gYDxsaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGF0LXRpcFwiPiR7bmV3IERhdGUoY2hhdC5kYXRhLmRhdGVsaW5lKS50b0xvY2FsZVRpbWVTdHJpbmcoKX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGF0LWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHsgaXNmcm9tbWU/ICdjaGF0LWF2YXRhciBjaGF0LWF2YXRhci1zZW5kJyA6J2NoYXQtYXZhdGFyJ31cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2ltZ3MvYXZhdGFyLmpwZ1wiIGFsdD1cIlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCIkeyBpc2Zyb21tZT8gJ2NoYXQtdHh0IGNoYXQtdHh0LXNlbmQnIDonY2hhdC10eHQnfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tPGRpdiBjbGFzcz1cImNoYXQtdXNlci1uYW1lXCI+JHtjaGF0LmZyb219PC9kaXY+LS0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGF0LW1zZ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJjaGF0ZmlsZVwiIGhyZWY9XCIke3BpY3VybH1cIiB0aXRsZT1cIueCueWHu+S4i+i9veaWh+S7tlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmlsZW5hbWVcIj4ke2ZpbGVuYW1lfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZpbGVzaXplXCI+JHtjaGF0LmRhdGEuY29udGVudC5zaXplfUI8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+IGA7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAkY2hhdHNfbGlzdC5odG1sKGNoYXRzU3RyKTtcclxuICAgICRjaGF0cy5zY3JvbGxUb3AoJGNoYXRzWzBdLnNjcm9sbEhlaWdodCk7XHJcbn07IiwiXHJcbi8vZG9t5YWD57SgXHJcbmltcG9ydCB7XHJcbiAgICAkaGNvbnRhY3RzXHJcbn0gZnJvbSAnLi9qcWVsZW1lbnRzJztcclxuLy/ooajmg4XmlbDmja5cclxuaW1wb3J0IHsgZXhwcmVzc2lvbkxpc3QgfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcblxyXG4vL+eUqOWbvueJh+abv+aNouaWh+acrOa2iOaBr+S4reihqOaDheS/oeaBr1xyXG5jb25zdCByZXBsYWNlRW1vamkgPSAoc3RyKSA9PiB7XHJcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1xcW1teXFxbXFxdXStcXF0vZywoZSkgPT4ge1xyXG4gICAgICAgIGZvciAobGV0IGk9MDtpPGV4cHJlc3Npb25MaXN0LmRhdGEubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIGlmKGV4cHJlc3Npb25MaXN0LmRhdGFbaV0uYWN0aW9uRGF0YSA9PT0gZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYDxpbWcgY2xhc3M9XCJlbW9qaVwiIHNyYz1cIiR7ZXhwcmVzc2lvbkxpc3QucGF0aCArIGV4cHJlc3Npb25MaXN0LmRhdGFbaV0udXJsfVwiIGFsdD1cIlwiIC8+YDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCAoZGlnc2V0cykgPT4ge1xyXG4gICAgLy/mi7/lj5bogYrlpKnlr7nmlrlpZFxyXG4gICAgbGV0IHRhcmdldHVzZXJpZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0YXJnZXR1c2VyaWQnKTtcclxuICAgIGxldCBkaWdTdHIgPSAnJztcclxuICAgIGRpZ3NldHMuc29ydChmdW5jdGlvbihhLCBiKXtyZXR1cm4gYi5sYXN0Q29udGFjdFRpbWUgLSBhLmxhc3RDb250YWN0VGltZX0pO1xyXG4gICAgZGlnc2V0cy5mb3JFYWNoKGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgICAgbGV0IGxhc3Rtc2cgPSByZXMubGFzdE1lc3NhZ2UsIGxhc3Rtc2dTdHIgPSAnJywgbmV3dGlwU3RyID0gJyc7XHJcbiAgICAgICAgbGV0IG5vcmVhZG5vID0gcmVzLnNlc3Npb25WZXJzaW9uIC0gcmVzLnJlYWRlZFZlcnNpb247XHJcbiAgICAgICAgaWYobGFzdG1zZyl7XHJcbiAgICAgICAgICAgIHN3aXRjaChsYXN0bXNnLmRhdGEuY29udGVudFR5cGUpe1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOiBsYXN0bXNnU3RyID0gcmVzLmxhc3RNZXNzYWdlLmRhdGEuY29udGVudDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IGxhc3Rtc2dTdHIgPSAnW+aWh+S7tua2iOaBr10nOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgODogbGFzdG1zZ1N0ciA9ICdb5Zu+54mH5raI5oGvXSc7YnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYobm9yZWFkbm8pe1xyXG4gICAgICAgICAgICBuZXd0aXBTdHIgPSAnPGkgY2xhc3M9XCJuZXd0aXAgY3V0dHh0XCI+Jysgbm9yZWFkbm8gKyc8L2k+JztcclxuICAgICAgICB9XHJcbiAgICAgICAgZGlnU3RyICs9IGA8bGkgY2xhc3M9XCIke3RhcmdldHVzZXJpZCAmJiB0YXJnZXR1c2VyaWQgPT09IHJlcy5pZCA/ICdhY3RpdmUnIDogJyd9XCIgZGF0YS1zZXNzaW9uVmVyc2lvbj1cIiR7cmVzLnNlc3Npb25WZXJzaW9ufVwiIGRhdGEtaWQ9XCIke3Jlcy5pZH1cIiBkYXRhLXR5cGU9XCIke3Jlcy50eXBlfVwiIGRhdGEtbmlja25hbWU9XCIke3Jlcy5uaWNrbmFtZSB8fCByZXMuaWR9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGkgZGF0YS1pZD1cIiR7cmVzLmlkfVwiIGNsYXNzPVwiY2xvc2VcIj7DlzwvaT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXZhdGFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtZWUlNQ2hhdC5nZXRGaWxlVXJsKHJlcy5waG90bykgfHwgJy4vaW1ncy9hdmF0YXIuanBnJ31cIiBhbHQ9XCJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGV0YWlsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cIm5hbWUgY3V0dHh0XCI+JHtyZXMubmlja25hbWUgfHwgcmVzLmlkfTwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwibXNnIGN1dHR4dFwiPiR7cmVwbGFjZUVtb2ppKGxhc3Rtc2dTdHIpfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj4ke25ld3RpcFN0cn1cclxuICAgICAgICAgICAgICAgIDwvbGk+YDtcclxuICAgIH0pO1xyXG4gICAgJGhjb250YWN0cy5odG1sKGRpZ1N0cik7XHJcbn0iLCIvL+WFg+e0oFxyXG5pbXBvcnQgeyAkeXlpbV9pb2dpbiwgJHl5aW1fYm94IH0gZnJvbSAnLi9qcWVsZW1lbnRzJztcclxuXHJcbi8v55So5oi355m76ZmGXHJcbmV4cG9ydCBkZWZhdWx0ICh1c2VybmFtZSwgcGFzc3dvcmQpID0+IHtcclxuICAgIC8v5q2j5byP546v5aKDXHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogJ2h0dHBzOi8vaW0ueXl1YXAuY29tL3N5c2FkbWluL3Jlc3QveW9ueW91L3Vkbi90b2tlbicsXHJcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgaGVhZGVyczoge1wiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwifSxcclxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIFwidXNlcm5hbWVcIjp1c2VybmFtZSxcclxuICAgICAgICAgICAgXCJjbGllbnRJZFwiOlwiYzg1MTMwYWMyYzgwZDgzYjg2ZmMxYmMzNDRhYzEyMTFcIixcclxuICAgICAgICAgICAgXCJjbGllbnRTZWNyZXRcIjpcIkNFRDE0NjEzNUE1ODRENUYyRUFCMzM2MzVEMTlBRTk5XCJcclxuICAgICAgICB9KSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGxldCBjbGllbnRJZGVudGlmeSA9IFwicGNcIiArIFN0cmluZyhuZXcgRGF0ZSgpLmdldFRpbWUoKSk7XHJcbiAgICAgICAgICAgICR5eWltX2lvZ2luLmhpZGUoKTtcclxuICAgICAgICAgICAgJHl5aW1fYm94LnNob3coKTtcclxuICAgICAgICAgICAgLy/nmbvpmYZZWUlNU0RLXHJcbiAgICAgICAgICAgIFlZSU1DaGF0LmxvZ2luKHtcclxuICAgICAgICAgICAgICAgIFwidXNlcm5hbWVcIjogdXNlcm5hbWUsXHJcbiAgICAgICAgICAgICAgICBcInRva2VuXCI6IHJlc3VsdC50b2tlbixcclxuICAgICAgICAgICAgICAgIFwiZXhwaXJhdGlvblwiOiByZXN1bHQuZXhwaXJhdGlvbixcclxuICAgICAgICAgICAgICAgIFwiYXBwVHlwZVwiOiA0LFxyXG4gICAgICAgICAgICAgICAgXCJpZGVudGlmeVwiOiBjbGllbnRJZGVudGlmeVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoYXJnKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGFyZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAvL+a1i+ivleeOr+Wig1xyXG4gICAgLy8gJC5hamF4KHtcclxuICAgIC8vICAgICB1cmw6ICdodHRwOi8vMTcyLjIwLjE1LjYwL3N5c2FkbWluL3Jlc3QveW9ueW91L2ltX3ByZS90b2tlbicsXHJcbiAgICAvLyAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgLy8gICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAvLyAgICAgaGVhZGVyczoge1wiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwifSxcclxuICAgIC8vICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAvLyAgICAgICAgIFwidXNlcm5hbWVcIjp1c2VybmFtZSxcclxuICAgIC8vICAgICAgICAgXCJjbGllbnRJZFwiOlwiYjI2YmE1MTA1OGVlZTlkYjRmODhhN2EyYjFiZDFiMDZcIixcclxuICAgIC8vICAgICAgICAgXCJjbGllbnRTZWNyZXRcIjpcIkNDOUE3MUUwQzI1MjhFREIxNjUyREZCMThFQ0U4RERGXCJcclxuICAgIC8vICAgICB9KSxcclxuICAgIC8vICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAvLyAgICAgICAgIGxldCBjbGllbnRJZGVudGlmeSA9IFwicGNcIiArIFN0cmluZyhuZXcgRGF0ZSgpLmdldFRpbWUoKSk7XHJcbiAgICAvLyAgICAgICAgICR5eWltX2lvZ2luLmhpZGUoKTtcclxuICAgIC8vICAgICAgICAgJHl5aW1fYm94LnNob3coKTtcclxuICAgIC8vICAgICAgICAgLy/nmbvpmYZZWUlNU0RLXHJcbiAgICAvLyAgICAgICAgIFlZSU1DaGF0LmxvZ2luKHtcclxuICAgIC8vICAgICAgICAgICAgIFwidXNlcm5hbWVcIjogdXNlcm5hbWUsXHJcbiAgICAvLyAgICAgICAgICAgICBcInRva2VuXCI6IHJlc3VsdC50b2tlbixcclxuICAgIC8vICAgICAgICAgICAgIFwiZXhwaXJhdGlvblwiOiByZXN1bHQuZXhwaXJhdGlvbixcclxuICAgIC8vICAgICAgICAgICAgIFwiYXBwVHlwZVwiOiA0LFxyXG4gICAgLy8gICAgICAgICAgICAgXCJpZGVudGlmeVwiOiBjbGllbnRJZGVudGlmeVxyXG4gICAgLy8gICAgICAgICB9KTtcclxuICAgIC8vICAgICB9LFxyXG4gICAgLy8gICAgIGVycm9yOiBmdW5jdGlvbiAoYXJnKSB7XHJcbiAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKGFyZyk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfSk7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==