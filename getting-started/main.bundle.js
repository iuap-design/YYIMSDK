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
    var endVersion = sessionVersion;
    var start = endVersion > 20 ? endVersion - 20 : 0;
    //获取历史聊天信息
    YYIMChat.getHistoryMessage({
        id: id,
        type: type,
        startVersion: start,
        endVersion: endVersion,
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
            lastmsgStr = '';
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
        digStr += '<li class="' + (targetuserid && targetuserid === res.id ? 'active' : '') + '" data-sessionVersion="' + res.sessionVersion + '" data-id="' + res.id + '" data-type="' + res.type + '" data-nickname="' + (res.nickname || res.id) + '">\n                    <i data-id="' + res.id + '" class="close">\xD7</i>\n                    <div class="avatar">\n                        <img src="' + (YYIMChat.getFileUrl(res.photo) || './imgs/avatar.jpg') + '" alt="">\n                    </div>\n                    <div class="detail">\n                        <h3 class="name cuttxt">' + (res.nickname || res.id) + '</h3>\n                        <p class="msg cuttxt">' + replaceEmoji(lastmsgStr) + '</p>\n                    </div>\n                    <i class="newtip cuttxt">2</i>\n                </li>';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbnRyb2xFdmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZ2V0SGlzdG9yeU1lc3NhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2dldFJlY2VudERpZ3NldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvanFlbGVtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcmVuZGVySGlzdG9yeU1lc3NhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3JlbmRlclJlY2VudERpZ3NldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXNlckxvZ2luLmpzIl0sIm5hbWVzIjpbIllZSU1DaGF0IiwiaW5pdFNESyIsImFwcCIsImV0cCIsIndzdXJsIiwid3Nwb3J0IiwiaGJwb3J0Iiwic2VydmxldCIsImZsYXNoX3N3Zl91cmwiLCJsb2dFbmFibGUiLCJjbGllbnRNYXJrIiwiYXBpS2V5IiwiaW5pdCIsIm9uT3BlbmVkIiwic2V0UHJlc2VuY2UiLCJsb2NhbFN0b3JhZ2UiLCJyZW1vdmVJdGVtIiwiZ2V0VkNhcmQiLCJzdWNjZXNzIiwicmVzIiwic2V0SXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJvbkV4cGlyYXRpb24iLCJjYWxsYmFjayIsIm9uQ2xvc2VkIiwiYXJnIiwib25Db25mbGljdGVkIiwib25DbGllbnRLaWNrb3V0Iiwib25VcGRhdGVQYXNzd29yZCIsIm9uQXV0aEVycm9yIiwib25Db25uZWN0RXJyb3IiLCJvblJlY2VpcHRzIiwib25TdWJzY3JpYmUiLCJvblJvc3RlckZhdm9yaXRlZCIsIm9uUm9zdGVyVXBkYXRlZGVkIiwib25NZXNzYWdlIiwibXNnIiwib25Hcm91cFVwZGF0ZSIsIm9uS2lja2VkT3V0R3JvdXAiLCJvblRyYW5zZmVyR3JvdXBPd25lciIsIm9uUHJlc2VuY2UiLCJvblJvc3RlckRlbGV0ZWQiLCJvblB1YmFjY291bnRVcGRhdGUiLCJwdWJhY2NvdW50cyIsIm9uVHJhbnNwYXJlbnRNZXNzYWdlIiwiZXhwcmVzc2lvbkxpc3QiLCJwYXRoIiwiZGF0YSIsImFjdGlvbkRhdGEiLCJodG1sIiwibWFwIiwidCIsInVybCIsImdldEl0ZW0iLCJwYXJzZSIsInVzZXJuYW1lIiwiY2xpY2siLCJ2YWwiLCJwYXNzd29yZCIsInRlc3QiLCIkIiwiaGFzQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwiY3NzIiwibGVmdCIsInRvcCIsImNsZWFyIiwiaGlkZSIsInNob3ciLCJvbiIsImUiLCJvcmlnaW5YIiwiY2xpZW50WCIsIm9yaWdpblkiLCJjbGllbnRZIiwiYm94UG9zIiwicG9zaXRpb24iLCJvZmYiLCJrZXl3b3JkIiwia2V5Q29kZSIsImdldFJvc3Rlckl0ZW1zIiwiY29uc29sZSIsImxvZyIsInNpYmxpbmdzIiwiYXR0ciIsInBpY3VybCIsImhvdmVyIiwidG9nZ2xlIiwidG8iLCJzZW5kUGljIiwiZmlsZUlucHV0SWQiLCJjaGF0SW5mbyIsInR5cGUiLCJleHRlbmQiLCJmaWxlRmlsdGVyZWQiLCJmaWxlVXBsb2FkZWQiLCJiZWZvcmVVcGxvYWQiLCJlcnJvciIsImVyciIsInByb2dyZXNzIiwicHJvIiwic2VuZEZpbGUiLCJzZW5kVGV4dE1lc3NhZ2UiLCJjb250ZW50Iiwic2Vzc2lvblZlcnNpb24iLCJpZCIsImVuZFZlcnNpb24iLCJzdGFydCIsImdldEhpc3RvcnlNZXNzYWdlIiwic3RhcnRWZXJzaW9uIiwiaGlzdG9yeWNoYXRzIiwicmVzdWx0IiwicmV2ZXJzZSIsImdldFJlY2VudERpZ3NldCIsImxpc3QiLCJsZW5ndGgiLCJyZWNlbnREaWdzZXQiLCJmb3JFYWNoIiwiaSIsInB1c2giLCJyZWFkZWRWZXJzaW9uIiwicGhvdG8iLCJuaWNrbmFtZSIsImxhc3RNZXNzYWdlIiwibGFzdENvbnRhY3RUaW1lIiwiJHl5aW1faW9naW4iLCIkbG9naW5fdXNlcm5hbWUiLCIkbG9naW5fcGFzcyIsIiRsb2dpbl9idG4iLCIkeXlpbV9ib3giLCIkeXlpbV9tYWluIiwiJGpfbW92ZSIsIiRoY29udGFjdHMiLCIkY2hhdHMiLCIkal9icV9ib3giLCIkeXlpbV9lZGl0b3IiLCIkYnRuX3NlbmQiLCIkY2hhdF9ib3giLCIkY2hhdHNfbGlzdCIsIiRwaWN2aWV3ZXIiLCJwaWN2aWV3ZXIiLCJWaWV3ZXIiLCJuYXZiYXIiLCJ0aXRsZSIsInJlcGxhY2VFbW9qaSIsInN0ciIsInJlcGxhY2UiLCJ0YXJnZXR1c2VyaWQiLCJteWlkIiwiZnJvbSIsImRpZ2VzdCIsImRhdGVsaW5lIiwiaXNkaWdzZXQiLCJjaGF0c1N0ciIsImNoYXQiLCJpc2Zyb21tZSIsImNvbnRlbnRUeXBlIiwiRGF0ZSIsInRvTG9jYWxlVGltZVN0cmluZyIsImdldEZpbGVVcmwiLCJhdHRhY2hJZCIsImZpbGVuYW1lIiwibmFtZSIsInNsaWNlIiwic2l6ZSIsInNjcm9sbFRvcCIsInNjcm9sbEhlaWdodCIsImRpZ3NldHMiLCJkaWdTdHIiLCJzb3J0IiwiYSIsImIiLCJsYXN0bXNnIiwibGFzdG1zZ1N0ciIsImFqYXgiLCJkYXRhVHlwZSIsImhlYWRlcnMiLCJjbGllbnRJZGVudGlmeSIsIlN0cmluZyIsImdldFRpbWUiLCJsb2dpbiIsInRva2VuIiwiZXhwaXJhdGlvbiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBC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QUFPQyxPQUFPLElBQUlyQixJQUFKLEdBQVdzQixPQUFYLEVBQVAsQ0FBNUI7QUFDQSxvQ0FBWWhILElBQVo7QUFDQSxrQ0FBVUMsSUFBVjtBQUNBO0FBQ0F0RSxxQkFBU3NMLEtBQVQsQ0FBZTtBQUNYLDRCQUFZOUgsUUFERDtBQUVYLHlCQUFTeUQsT0FBT3NFLEtBRkw7QUFHWCw4QkFBY3RFLE9BQU91RSxVQUhWO0FBSVgsMkJBQVcsQ0FKQTtBQUtYLDRCQUFZTDtBQUxELGFBQWY7QUFPSCxTQXRCRTtBQXVCSGhGLGVBQU8sZUFBVXpFLEdBQVYsRUFBZTtBQUNsQnlELG9CQUFRQyxHQUFSLENBQVkxRCxHQUFaO0FBQ0g7QUF6QkUsS0FBUDtBQTJCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNILEMsRUE3REQsSSIsImZpbGUiOiJtYWluLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIi8v5Yqg6L295LqL5Lu25pON5L2cXHJcbmltcG9ydCAnLi9qcy9jb250cm9sRXZlbnQnO1xyXG5cclxuLy/ojrflj5bmnIDov5HogZTns7vkurpcclxuaW1wb3J0IGdldFJlY2VudERpZ3NldCBmcm9tICcuL2pzL2dldFJlY2VudERpZ3NldCc7XHJcblxyXG4vL+a4suafk+WOhuWPsuiBiuWkqeiusOW9lVxyXG5pbXBvcnQgcmVuZGVySGlzdG9yeU1lc3NhZ2UgZnJvbSAnLi9qcy9yZW5kZXJIaXN0b3J5TWVzc2FnZSc7XHJcblxyXG4vL+WIneWni+WMllNES++8jOato+W8j+eOr+Wig1xyXG5ZWUlNQ2hhdC5pbml0U0RLKHtcclxuICAgIGFwcDogJ3VkbicsIC8vYXBwSWRcclxuICAgIGV0cDogJ3lvbnlvdScsIC8vZXRwSWRcclxuICAgIHdzdXJsOiAnc3RlbGxhci55eXVhcC5jb20nLCAvL3dlYnNvY2tldCBVcmxcclxuICAgIHdzcG9ydDogNTIyNywgLy93ZWJzb2NrZXQgcG9ydCA1MjI3LzUyMjIvNTIyNVxyXG4gICAgaGJwb3J0OiA3MDc1LCAvL2h0dHBiaW5kICBwb3J0IDcwNzUvNzA3MFxyXG4gICAgc2VydmxldDogJ2h0dHBzOi8vaW0ueXl1YXAuY29tLycsIC8vcmVzdCBVcmxcclxuICAgIGZsYXNoX3N3Zl91cmw6ICd4eHgveC9Nb3hpZS5zd2YnLCAvL2ZsYXNoIOS4iuS8oCBzd2bmlofku7bkvY3nva5cclxuICAgIGxvZ0VuYWJsZTogdHJ1ZSwgLy9jbGllbnQgbG9nXHJcbiAgICBjbGllbnRNYXJrOiAnd2ViJywgLy9jbGllbnQgbWFyayAnd2ViJyBvciAncGMnXHJcbiAgICBhcGlLZXk6IFwiODVkZTc5YjlmN2UzNGMzN2E5OWFjY2FkZGIyNTY5OTBcIlxyXG59KTtcclxuLy/liJ3lp4vljJZTREvvvIzmtYvor5Xnjq/looNcclxuLy8gWVlJTUNoYXQuaW5pdFNESyh7XHJcbi8vICAgICBhcHA6ICdpbV9wcmUnLCAvL2FwcElkXHJcbi8vICAgICBldHA6ICd5b255b3UnLCAvL2V0cElkXHJcbi8vICAgICB3c3VybDogJzE3Mi4yMC4xNS42MCcsIC8vd2Vic29ja2V0IFVybFxyXG4vLyAgICAgd3Nwb3J0OiA1MjI3LCAvL3dlYnNvY2tldCBwb3J0IDUyMjcvNTIyMi81MjI1XHJcbi8vICAgICBoYnBvcnQ6IDcwNzUsIC8vaHR0cGJpbmQgIHBvcnQgNzA3NS83MDcwXHJcbi8vICAgICBzZXJ2bGV0OiAnaHR0cDovLzE3Mi4yMC4xNS42MC8nLCAvL3Jlc3QgVXJsXHJcbi8vICAgICBmbGFzaF9zd2ZfdXJsOiAneHh4L3gvTW94aWUuc3dmJywgLy9mbGFzaCDkuIrkvKAgc3dm5paH5Lu25L2N572uXHJcbi8vICAgICBsb2dFbmFibGU6IHRydWUsIC8vY2xpZW50IGxvZ1xyXG4vLyAgICAgY2xpZW50TWFyazogJ3dlYicsIC8vY2xpZW50IG1hcmsgJ3dlYicgb3IgJ3BjJ1xyXG4vLyAgICAgYXBpS2V5OiBcIjg1ZGU3OWI5ZjdlMzRjMzdhOTlhY2NhZGRiMjU2OTkwXCJcclxuLy8gfSk7XHJcblxyXG4vL+WIneWni+WMluWbnuiwg+aWueazlVxyXG5ZWUlNQ2hhdC5pbml0KHtcclxuICAgIG9uT3BlbmVkOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDnmbvlvZXmiJDlip/orr7nva7lnKjnur/nirbmgIFcclxuICAgICAgICBZWUlNQ2hhdC5zZXRQcmVzZW5jZSgpO1xyXG4gICAgICAgIC8v56e76Zmk5L+d5a2Y55qE6YCa6K6v5a+55pa5aWTvvIzpgb/lhY3pobXpnaLliLfmlrDlkI7mnIDov5HogZTns7vkurrogZTns7vnirbmgIHov5jorrDlvZXnnYBcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndGFyZ2V0dXNlcmlkJyk7XHJcbiAgICAgICAgLy8g6I635Y+W6Ieq5bex5L+h5oGvXHJcbiAgICAgICAgWVlJTUNoYXQuZ2V0VkNhcmQoe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAvL+S/neWtmOiHquW3seeahOS/oeaBr1xyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2N1cnJlbnR1c2VyaW5mbycsIEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy/ojrflj5bmnIDov5HogZTns7vkurpcclxuICAgICAgICBnZXRSZWNlbnREaWdzZXQoKTtcclxuICAgIH0sXHJcbiAgICBvbkV4cGlyYXRpb246IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgLy/oh6rliqjmm7TmlrB0b2tlblxyXG4gICAgICAgIC8vIGNhbGxiYWNrKHRva2VuLCBleHBpcmF0aW9uKTtcclxuICAgIH0sXHJcbiAgICBvbkNsb3NlZDogZnVuY3Rpb24oYXJnKSB7XHJcbiAgICAgICAgLy/ov57mjqXlhbPpl61cclxuICAgIH0sXHJcbiAgICBvbkNvbmZsaWN0ZWQ6IGZ1bmN0aW9uKGFyZykge1xyXG4gICAgICAgIC8v55m76ZmG5Yay56qBXHJcbiAgICB9LFxyXG4gICAgb25DbGllbnRLaWNrb3V0OiBmdW5jdGlvbihhcmcpIHtcclxuICAgICAgICAvL+iiq+S7luerr+i4ouaOiVxyXG4gICAgfSxcclxuICAgIG9uVXBkYXRlUGFzc3dvcmQ6IGZ1bmN0aW9uKGFyZykge1xyXG4gICAgICAgIC8v5pu05pS55a+G56CB77yM6KKr6Lii5o6JXHJcbiAgICB9LFxyXG4gICAgb25BdXRoRXJyb3I6IGZ1bmN0aW9uKGFyZykge1xyXG4gICAgICAgIC8v55m76ZmG6K6k6K+B5aSx6LSlXHJcbiAgICB9LFxyXG4gICAgb25Db25uZWN0RXJyb3I6IGZ1bmN0aW9uKGFyZykge1xyXG4gICAgICAgIC8v6L+e5o6l5aSx6LSlXHJcbiAgICB9LFxyXG4gICAgb25SZWNlaXB0czogZnVuY3Rpb24oYXJnKSB7XHJcbiAgICAgICAgLy/mtojmga/lm57miadcclxuICAgIH0sXHJcbiAgICBvblN1YnNjcmliZTogZnVuY3Rpb24oYXJnKSB7XHJcbiAgICAgICAgLy/lj5HnlJ/orqLpmIVcclxuICAgIH0sXHJcbiAgICBvblJvc3RlckZhdm9yaXRlZDogZnVuY3Rpb24oYXJnKSB7XHJcbiAgICAgICAgLy/ooqvmlLbol49cclxuICAgIH0sXHJcbiAgICBvblJvc3RlclVwZGF0ZWRlZDogZnVuY3Rpb24oYXJnKSB7XHJcbiAgICAgICAgLy/lpb3lj4vkv6Hmga/mm7TmlLlcclxuICAgIH0sXHJcbiAgICBvbk1lc3NhZ2U6IGZ1bmN0aW9uKG1zZykge1xyXG4gICAgICAgIC8v5riy5p+T5Y6G5Y+y6IGK5aSp6K6w5b2VXHJcbiAgICAgICAgcmVuZGVySGlzdG9yeU1lc3NhZ2UobXNnKTtcclxuICAgIH0sXHJcbiAgICBvbkdyb3VwVXBkYXRlOiBmdW5jdGlvbihhcmcpIHtcclxuICAgICAgICAvL+e+pOe7hOabtOaWsFxyXG4gICAgfSxcclxuICAgIG9uS2lja2VkT3V0R3JvdXA6IGZ1bmN0aW9uKGFyZykge1xyXG4gICAgICAgIC8v576k5oiQ5ZGY6KKr576k5Li75o+Q5Ye6XHJcbiAgICB9LFxyXG4gICAgb25UcmFuc2Zlckdyb3VwT3duZXI6IGZ1bmN0aW9uKGFyZyl7XHJcbiAgICAgICAgLy/nvqTkuLvovazorqlcclxuICAgIH0sXHJcbiAgICBvblByZXNlbmNlOiBmdW5jdGlvbihhcmcpIHtcclxuICAgICAgICAvL+WlveWPi3ByZXNlbmNl5pS55Y+YXHJcbiAgICB9LFxyXG4gICAgb25Sb3N0ZXJEZWxldGVkOiBmdW5jdGlvbihhcmcpIHtcclxuICAgICAgICAvL+WlveWPi+iiq+WIoOmZpFxyXG4gICAgfSxcclxuICAgIG9uUHViYWNjb3VudFVwZGF0ZTogZnVuY3Rpb24ocHViYWNjb3VudHMpIHtcclxuICAgICAgICAvL+WFrOWFseWPt+S/oeaBr+abtOaWsFxyXG4gICAgfSxcclxuICAgIG9uVHJhbnNwYXJlbnRNZXNzYWdlOiBmdW5jdGlvbihhcmcpIHtcclxuICAgICAgICAvL+mAj+S8oOS4muWKoea2iOaBr1xyXG4gICAgfVxyXG59KTtcclxuXHJcbiIsImV4cG9ydCBjb25zdCBleHByZXNzaW9uTGlzdCA9IHtcclxuICAgIHBhdGg6IFwiLi9pbWdzL2JxL1wiLFxyXG4gICAgZGF0YTogW1xyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6b6H54mZXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fY2l5YUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5ZOI5ZOIXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25faGFoYUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5pmVXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25feXVuQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmsZddXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9oYW5iQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlrrPnvp5dXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9oYWl4QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvosIPnmq5dXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl90aWFvcEAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb55aR6ZeuXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25feWl3QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmjYLohLhdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl93dWxpYW5AMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WluOeskV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2ppYW54aWFvQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmnLrmmbpdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9zbWFydEAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5b6X5oSPXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fZGV5aUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb56yRY3J5XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fbGF1Z2hpbmdfdGVhcnNAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+a1geazql1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2NyeWluZ0AyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5aWL5paXXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fZmVuZG91QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmirHmirFdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9odWdAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+eUn+eXhV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2lsbEAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5bC05bCsXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fZ2FuZ2FAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WBt+eskV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3RvdXhAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+i1nl1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3phbkAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5o+h5omLXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fd29zQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIltPS11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX29rQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlt5ZWFrXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25feWVha0AyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6byT5o6MXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fZ3V6QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmi7PlpLRdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9xdWFudG91QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvogozogoldXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9qaXJvdUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5o+h5ouzXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fd29xQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmi5zmiZhdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9iYWl0QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmhInlv6tdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl95dWtAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+mavui/h11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX25hbmd1b0AyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6Zet5Zi0XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fYml6dWlAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WbsF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2t1bkAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb54yq5aS0XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fcGlnQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvniLHlv4NdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9oZWFydEAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5b+D56KOXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25feGluc3VpQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvnpLznm5JdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9ib3hAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WQu11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2tpc3NhQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvnjqvnkbDoirFdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9yb3NlQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmo5Lmo5Lns5ZdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9jYW5keUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5pma5a6JXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fbmlnaHRAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+eliOelt11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3ByYXlAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+e7meWKm11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2dlaWxpQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvouKldXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9jYWlAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+S6suS6sl1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2tpc3NiQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlmJhdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl94dUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6ImyXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fc2VAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WPr+aAnF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2tlbGlhbkAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5Y+R5ZGGXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fZmFkYWlAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+Wkp+WTrV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2NyeWFAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WbsFp6el1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3p6ekAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5oCd6ICDXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fc2lrYW9AMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+eZveecvF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2JhaXlAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WCsuaFol1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2FvbWFuQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvphbddXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9rdUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5ZunXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25famlvbmdAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+mEmeinhl1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2Jpc0AyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6aWl6aW/XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25famllQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlkJNdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl94aWFAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+aKoOm8u11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2tvdWJpQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmg4rorrZdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9qaW5neUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5Y+R5oCSXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fYW5ncnlAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+aDiuaBkF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2ppbmdrQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlkJBdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl90dUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5ouc5oucXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fYnllQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlkpbllaFdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9jb2ZmZWVAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WVpOmFkl1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2JlZXJAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+S4i+mbqF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3JhaW5AMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+mXqueUtV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3NoYW5kQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvkuIvpm6pdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9zbm93QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvotrPnkINdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9iYWxsQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvnr67nkINdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9iYXNrZXRAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+mjnuacul1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3BsYW5lQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvpgq7ku7ZdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9tYWlsQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvpm6jkvJ5dXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl95dXNhbkAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5aWW5p2vXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25famlhbmdiQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmgKrnialdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9ndWFpd3VAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+iNr11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX21lZEAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb54K45by5XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25femhhZEAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6JuL57OVXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fY2FrZUAyeC5wbmdcIiB9XHJcbiAgICBdXHJcbn07IiwiLy9kb23lhYPntKBcclxuaW1wb3J0IHtcclxuICAgICR5eWltX2lvZ2luLFxyXG4gICAgJHl5aW1fYm94LFxyXG4gICAgJHl5aW1fbWFpbixcclxuICAgICRqX21vdmUsXHJcbiAgICAkal9icV9ib3gsXHJcbiAgICAkeXlpbV9lZGl0b3IsXHJcbiAgICAkYnRuX3NlbmQsXHJcbiAgICAkbG9naW5fdXNlcm5hbWUsXHJcbiAgICAkbG9naW5fcGFzcyxcclxuICAgICRsb2dpbl9idG4sXHJcbiAgICAkaGNvbnRhY3RzLFxyXG4gICAgJGNoYXRzX2xpc3QsXHJcbiAgICAkcGljdmlld2VyLFxyXG4gICAgcGljdmlld2VyXHJcbn0gZnJvbSAnLi9qcWVsZW1lbnRzJztcclxuXHJcbi8v6KGo5oOF5pWw5o2uXHJcbmltcG9ydCB7IGV4cHJlc3Npb25MaXN0IH0gZnJvbSAnLi9jb25zdGFudHMnO1xyXG5cclxuLy/nlKjmiLfnmbvpmYZcclxuaW1wb3J0IHVzZXJMb2dpbiBmcm9tICcuL3VzZXJMb2dpbic7XHJcblxyXG4vL+iOt+WPluWOhuWPsuiBiuWkqeiusOW9lVxyXG5pbXBvcnQgZ2V0SGlzdG9yeU1lc3NhZ2UgZnJvbSAnLi9nZXRIaXN0b3J5TWVzc2FnZSc7XHJcblxyXG4vL+a4suafk+WOhuWPsuiBiuWkqeiusOW9lVxyXG5pbXBvcnQgcmVuZGVySGlzdG9yeU1lc3NhZ2UgZnJvbSAnLi9yZW5kZXJIaXN0b3J5TWVzc2FnZSc7XHJcblxyXG4vL+aUvue9ruihqOaDheWIl+ihqFxyXG4kal9icV9ib3guaHRtbChleHByZXNzaW9uTGlzdC5kYXRhLm1hcCgodCkgPT4ge1xyXG4gICAgcmV0dXJuIGA8bGkgZGF0YS1jb2RlPVwiJHt0LmFjdGlvbkRhdGF9XCI+PGltZyBzcmM9XCIke2V4cHJlc3Npb25MaXN0LnBhdGgrdC51cmx9XCIgdGl0bGU9XCIke3QuYWN0aW9uRGF0YX1cIiBhbHQ9XCJcIj48L2xpPmA7XHJcbn0pKTtcclxuXHJcbi8v5Li05pe26Ieq5Yqo55m75b2V55qEXHJcbmlmKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50dXNlcmluZm8nKSl7XHJcbiAgICB1c2VyTG9naW4oSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudHVzZXJpbmZvJykpLnVzZXJuYW1lKTtcclxufVxyXG4vL+eUqOaIt+eZu+mZhlxyXG4kbG9naW5fYnRuLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCB1c2VybmFtZSA9ICRsb2dpbl91c2VybmFtZS52YWwoKTtcclxuICAgIGxldCBwYXNzd29yZCA9ICRsb2dpbl9wYXNzLnZhbCgpO1xyXG4gICAgaWYoL15bYS16XVthLXpfMC05XSokLy50ZXN0KHVzZXJuYW1lKSl7XHJcbiAgICAgICAgdXNlckxvZ2luKHVzZXJuYW1lLCBwYXNzd29yZCk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLy/mnIDlpKfljJbmjInpkq7ngrnlh7tcclxuJCgnLnNjYWxlY2hhdCcpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICR5eWltX21haW4uaGFzQ2xhc3MoJ21heHdpbmRvdycpID8gJHl5aW1fbWFpbi5yZW1vdmVDbGFzcygnbWF4d2luZG93JykgOiAkeXlpbV9tYWluLmFkZENsYXNzKCdtYXh3aW5kb3cnKTtcclxuICAgICR5eWltX21haW4uY3NzKHtsZWZ0OiAnMCcsIHRvcDogJzAnfSk7XHJcbn0pO1xyXG5cclxuLy/lhbPpl63nqpflj6PmjInpkq7ngrnlh7tcclxuJCgnLmNsb3NlY2hhdCcpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xyXG4gICAgJHl5aW1fYm94LmhpZGUoKTtcclxuICAgICR5eWltX2lvZ2luLnNob3coKTtcclxufSk7XHJcblxyXG4vL+enu+WKqOS6i+S7tlxyXG4kal9tb3ZlLm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgbGV0IG9yaWdpblggPSBlLmNsaWVudFg7XHJcbiAgICBsZXQgb3JpZ2luWSA9IGUuY2xpZW50WTtcclxuICAgIGxldCBib3hQb3MgPSAkeXlpbV9tYWluLnBvc2l0aW9uKCk7XHJcbiAgICAkeXlpbV9ib3gub24oJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgJHl5aW1fbWFpbi5jc3Moe2xlZnQ6IChib3hQb3MubGVmdCArIGUuY2xpZW50WCAtIG9yaWdpblgpICsgJ3B4JywgdG9wOiAoYm94UG9zLnRvcCArIGUuY2xpZW50WSAtIG9yaWdpblkpICsgJ3B4J30pO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4keXlpbV9ib3gub24oJ21vdXNldXAnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAkKHRoaXMpLm9mZignbW91c2Vtb3ZlJyk7XHJcbn0pO1xyXG5cclxuXHJcbi8v5pCc57Si5aW95Y+LXHJcbiQoJy55eWltLXNlYXJjaCcpLm9uKCdrZXlkb3duJyxmdW5jdGlvbiAoZSkge1xyXG4gICAgbGV0IGtleXdvcmQgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgaWYoZS5rZXlDb2RlID09PSAxMyAmJiBrZXl3b3JkKXtcclxuICAgICAgICAvL1xyXG4gICAgICAgIFlZSU1DaGF0LmdldFJvc3Rlckl0ZW1zKHtcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5wYXJzZShyZXMpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8v54K55Ye75pyA6L+R6IGU57O75Lq6XHJcbiRoY29udGFjdHMub24oJ2NsaWNrJywnbGknLGZ1bmN0aW9uICgpIHtcclxuICAgICRjaGF0c19saXN0Lmh0bWwoJycpO1xyXG4gICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAkKHRoaXMpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgJGpfbW92ZS5odG1sKCQodGhpcykuYXR0cignZGF0YS1uaWNrbmFtZScpKTtcclxuICAgIC8v5oqK6YCJ5oup55qE6IGK5aSp5a+55pa5aWTkv53lrZjotbfmnaUs55So5LqO57uZ5LuW5Y+R6YCB5raI5oGvXHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndGFyZ2V0dXNlcmlkJywgJCh0aGlzKS5hdHRyKCdkYXRhLWlkJykpO1xyXG4gICAgLy/liKDpmaTkv53lrZjnmoTogYrlpKnljoblj7JcclxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdoaXN0b3J5Y2hhdHMnKTtcclxuICAgIC8v6I635Y+W5Y6G5Y+y6IGK5aSp5L+h5oGvXHJcbiAgICBnZXRIaXN0b3J5TWVzc2FnZSgkKHRoaXMpLmF0dHIoJ2RhdGEtc2Vzc2lvblZlcnNpb24nKSwgJCh0aGlzKS5hdHRyKCdkYXRhLWlkJyksICQodGhpcykuYXR0cignZGF0YS10eXBlJykpO1xyXG59KTtcclxuXHJcbi8v5YWz6Zet6IGU57O75Lq654K55Ye7XHJcbiRoY29udGFjdHMub24oJ2NsaWNrJywnLmNsb3NlJyxmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zb2xlLmxvZygn5YWz6ZetJysgJCh0aGlzKS5hdHRyKCdkYXRhLWlkJykpO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59KTtcclxuXHJcbi8v5p+l55yL6IGK5aSp5raI5oGv5Zu+54mHXHJcbiRjaGF0c19saXN0Lm9uKCdjbGljaycsICcuY2hhdHBpYycsIGZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgcGljdXJsID0gJCh0aGlzKS5hdHRyKCdkYXRhLXVybCcpO1xyXG4gICAgJHBpY3ZpZXdlci5odG1sKCc8bGk+PGltZyBkYXRhLW9yaWdpbmFsPVwiJysgcGljdXJsICsnXCIgc3JjPVwiJysgcGljdXJsICsnXCIgYWx0PVwiXCI+PC9saT4nKVxyXG4gICAgcGljdmlld2VyLnNob3coe3VybDogcGljdXJsfSk7XHJcbn0pO1xyXG5cclxuXHJcblxyXG4vL+ihqOaDheaMiemSrueCueWHu1xyXG4kKCcual9tZW51X2JxJykuaG92ZXIoZnVuY3Rpb24gKCkge1xyXG4gICAgJCh0aGlzKS5hZGRDbGFzcygnaG92ZXInKTtcclxuICAgICQoJy5icV90aXAnKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxufSxmdW5jdGlvbiAoKSB7XHJcbiAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdob3ZlcicpO1xyXG4gICAgJCgnLmJxX3RpcCcpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbn0pLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICRqX2JxX2JveC50b2dnbGUoKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxufSk7XHJcblxyXG4vL+ihqOaDheeCueWHu1xyXG4kal9icV9ib3gub24oJ2NsaWNrJywgJ2xpJywgZnVuY3Rpb24gKCkge1xyXG4gICAgJHl5aW1fZWRpdG9yLnZhbCgkeXlpbV9lZGl0b3IudmFsKCkgKyAkKHRoaXMpLmF0dHIoJ2RhdGEtY29kZScpKTtcclxuICAgIGlmKCR5eWltX2VkaXRvci52YWwoKSl7XHJcbiAgICAgICAgJGJ0bl9zZW5kLnJlbW92ZUNsYXNzKCdhZGl0LWJ0bi1zZW5kLWRpc2FibGVkJyk7XHJcbiAgICB9ZWxzZSB7XHJcbiAgICAgICAgJGJ0bl9zZW5kLmFkZENsYXNzKCdhZGl0LWJ0bi1zZW5kLWRpc2FibGVkJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn0pO1xyXG5cclxuLy/mjInopoHmsYLpmpDol4/ooajmg4XmoYZcclxuJGpfYnFfYm94LmhvdmVyKGZ1bmN0aW9uIChlKSB7fSxmdW5jdGlvbigpeyQodGhpcykuaGlkZSgpfSk7XHJcblxyXG4vL+WPkemAgeWbvueJh+aMiemSrueCueWHu1xyXG4kKCcual9tZW51X3RwJykuaG92ZXIoZnVuY3Rpb24gKCkge1xyXG4gICAgJCh0aGlzKS5hZGRDbGFzcygnaG92ZXInKTtcclxuICAgICQoJy50cF90aXAnKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxufSxmdW5jdGlvbiAoKSB7XHJcbiAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdob3ZlcicpO1xyXG4gICAgJCgnLnRwX3RpcCcpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbn0pLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICQoJyN1cGxvYWRQaWMnKS5jbGljaygpO1xyXG59KTtcclxuXHJcbiQoJyN1cGxvYWRQaWMnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcclxuICAgIC8v6I635Y+W5a+56K+d5Lq6aWRcclxuICAgIGxldCB0byA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0YXJnZXR1c2VyaWQnKTtcclxuICAgIFlZSU1DaGF0LnNlbmRQaWMoe1xyXG4gICAgICAgIGZpbGVJbnB1dElkOid1cGxvYWRQaWMnLCAvL+aWh+S7tuWfn2lkIFxyXG4gICAgICAgIC8vIGRyb3BfZWxlbWVudDogW2Ryb3BJRF0sIC8v5ouW5ou95LiK5Lyg5YWD57SgaWTvvIzmiJbogIXmlbDnu4RcclxuICAgICAgICBjaGF0SW5mbzogZnVuY3Rpb24oKXsgLy/nlKjmiLflj5HpgIHmtojmga/ml7bojrflj5blr7nor53kurrkv6Hmga9cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHRvOiB0bywgLy/lr7nor53kurppZFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2NoYXQnLCAvL2NoYXQvZ3JvdXBjaGF0L3B1YmFjY291bnRcclxuICAgICAgICAgICAgICAgIGV4dGVuZDogJycgLy/mianlsZXlrZfmrrVcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZpbGVGaWx0ZXJlZDogZnVuY3Rpb24oKXt9LCAvL+aWh+S7tuiiq+a3u+WKoOWIsOS4iuS8oOmYn+WIl1xyXG4gICAgICAgIGZpbGVVcGxvYWRlZDogZnVuY3Rpb24oKXt9LCAvL+S4iuS8oOmYn+WIl+afkOS4gOS4quaWh+S7tuS4iuS8oOWujOavlVxyXG4gICAgICAgIGJlZm9yZVVwbG9hZDogZnVuY3Rpb24oKXt9LCAvL+aWh+S7tuS4iuS8oOS5i+WJjeinpuWPkVxyXG4gICAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24obXNnKXtcclxuICAgICAgICAgICAgLy/muLLmn5Pljoblj7Lkv6Hmga9cclxuICAgICAgICAgICAgcmVuZGVySGlzdG9yeU1lc3NhZ2UobXNnKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihlcnIpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcHJvZ3Jlc3M6IGZ1bmN0aW9uKHBybyl7XHJcbiAgICAgICAgICAgIC8v5LiK5Lyg6L+b5bqmXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHBybyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufSk7XHJcblxyXG4vL+aWh+S7tuaMiemSrueCueWHu1xyXG4kKCcual9tZW51X3dqJykuaG92ZXIoZnVuY3Rpb24gKCkge1xyXG4gICAgJCh0aGlzKS5hZGRDbGFzcygnaG92ZXInKTtcclxuICAgICQoJy53al90aXAnKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxufSxmdW5jdGlvbiAoKSB7XHJcbiAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdob3ZlcicpO1xyXG4gICAgJCgnLndqX3RpcCcpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbn0pLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICQoJyN1cGxvYWRGaWxlJykuY2xpY2soKTtcclxufSk7XHJcblxyXG4kKCcjdXBsb2FkRmlsZScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xyXG4gICAgLy/ojrflj5blr7nor53kurppZFxyXG4gICAgbGV0IHRvID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RhcmdldHVzZXJpZCcpO1xyXG4gICAgWVlJTUNoYXQuc2VuZEZpbGUoe1xyXG4gICAgICAgIGZpbGVJbnB1dElkOid1cGxvYWRGaWxlJywgLy/mlofku7bln59pZCBcclxuICAgICAgICAvLyBkcm9wX2VsZW1lbnQ6IFtkcm9wSURdLCAvL+aLluaLveS4iuS8oOWFg+e0oGlk77yM5oiW6ICF5pWw57uEXHJcbiAgICAgICAgY2hhdEluZm86IGZ1bmN0aW9uKCl7IC8v55So5oi35Y+R6YCB5raI5oGv5pe26I635Y+W5a+56K+d5Lq65L+h5oGvXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB0bzogdG8sIC8v5a+56K+d5Lq6aWRcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdjaGF0JywgLy9jaGF0L2dyb3VwY2hhdC9wdWJhY2NvdW50XHJcbiAgICAgICAgICAgICAgICBleHRlbmQ6ICcnIC8v5omp5bGV5a2X5q61XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSxcclxuICAgICAgICBmaWxlRmlsdGVyZWQ6IGZ1bmN0aW9uKCl7fSwgLy/mlofku7booqvmt7vliqDliLDkuIrkvKDpmJ/liJdcclxuICAgICAgICBmaWxlVXBsb2FkZWQ6IGZ1bmN0aW9uKCl7fSwgLy/kuIrkvKDpmJ/liJfmn5DkuIDkuKrmlofku7bkuIrkvKDlrozmr5VcclxuICAgICAgICBiZWZvcmVVcGxvYWQ6IGZ1bmN0aW9uKCl7fSwgLy/mlofku7bkuIrkvKDkuYvliY3op6blj5FcclxuICAgICAgICBzdWNjZXNzOmZ1bmN0aW9uKG1zZyl7XHJcbiAgICAgICAgICAgIC8v5riy5p+T5Y6G5Y+y5L+h5oGvXHJcbiAgICAgICAgICAgIHJlbmRlckhpc3RvcnlNZXNzYWdlKG1zZyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHByb2dyZXNzOiBmdW5jdGlvbihwcm8pe1xyXG4gICAgICAgICAgICAvL+S4iuS8oOi/m+W6plxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwcm8pO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn0pO1xyXG5cclxuXHJcbi8v5o6n5Yi25piv5ZCm5Y+v5Lul5Y+R6YCBXHJcbiR5eWltX2VkaXRvci5vbignaW5wdXQgcHJvcGVydHljaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZigkKHRoaXMpLnZhbCgpKXtcclxuICAgICAgICAkYnRuX3NlbmQucmVtb3ZlQ2xhc3MoJ2FkaXQtYnRuLXNlbmQtZGlzYWJsZWQnKTtcclxuICAgIH1lbHNlIHtcclxuICAgICAgICAkYnRuX3NlbmQuYWRkQ2xhc3MoJ2FkaXQtYnRuLXNlbmQtZGlzYWJsZWQnKTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vL+WPkemAgeaMiemSrueCueWHu1xyXG4kYnRuX3NlbmQub24oJ2NsaWNrJyxmdW5jdGlvbiAoKSB7XHJcbiAgICBpZigkeXlpbV9lZGl0b3IudmFsKCkpe1xyXG4gICAgICAgIC8v5LuO5pys5Zyw5ou/5Y+W6IGK5aSp5a+55pa5aWRcclxuICAgICAgICBsZXQgdG8gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGFyZ2V0dXNlcmlkJyk7XHJcbiAgICAgICAgLy/osIPnlKjlj5HpgIHmlofmnKzmtojmga/mjqXlj6NcclxuICAgICAgICBZWUlNQ2hhdC5zZW5kVGV4dE1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICB0bzogdG8sIC8v5a+56K+d5Lq6aWRcclxuICAgICAgICAgICAgdHlwZTogXCJjaGF0XCIsICAvL2NoYXQ65Y2V6IGK77yMZ3JvdXBjZ2F0Oue+pOiBiixwdWJhY2NvdW50OuWFrOS8l+WPt1xyXG4gICAgICAgICAgICBjb250ZW50OiR5eWltX2VkaXRvci52YWwoKSwgLy/mtojmga/mlofmnKxcclxuICAgICAgICAgICAgZXh0ZW5kOiAnJywgIC8v5omp5bGV5a2X5q61XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChtc2cpIHtcclxuICAgICAgICAgICAgICAgIC8v5Y+R6YCB5oiQ5Yqf5LmL5ZCO5riF56m66L6T5YWl5qGGXHJcbiAgICAgICAgICAgICAgICAkeXlpbV9lZGl0b3IudmFsKCcnKTtcclxuICAgICAgICAgICAgICAgICRidG5fc2VuZC5hZGRDbGFzcygnYWRpdC1idG4tc2VuZC1kaXNhYmxlZCcpO1xyXG4gICAgICAgICAgICAgICAgLy/muLLmn5Pljoblj7Lkv6Hmga9cclxuICAgICAgICAgICAgICAgIHJlbmRlckhpc3RvcnlNZXNzYWdlKG1zZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vL+aMieS4i2VudGVy5Lmf5Y+v5Lul5Y+R6YCBXHJcbiR5eWltX2VkaXRvci5vbigna2V5ZG93bicsZnVuY3Rpb24oZSl7XHJcbiAgICBpZihlLmtleUNvZGUgPT09IDEzICYmICR5eWltX2VkaXRvci52YWwoKSl7XHJcbiAgICAgICAgLy/ku47mnKzlnLDmi7/lj5bogYrlpKnlr7nmlrlpZFxyXG4gICAgICAgIGxldCB0byA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0YXJnZXR1c2VyaWQnKTtcclxuICAgICAgICAvL+iwg+eUqOWPkemAgeaWh+acrOa2iOaBr+aOpeWPo1xyXG4gICAgICAgIFlZSU1DaGF0LnNlbmRUZXh0TWVzc2FnZSh7XHJcbiAgICAgICAgICAgIHRvOiB0bywgLy/lr7nor53kurppZFxyXG4gICAgICAgICAgICB0eXBlOiBcImNoYXRcIiwgIC8vY2hhdDrljZXogYrvvIxncm91cGNnYXQ6576k6IGKLHB1YmFjY291bnQ65YWs5LyX5Y+3XHJcbiAgICAgICAgICAgIGNvbnRlbnQ6JHl5aW1fZWRpdG9yLnZhbCgpLCAvL+a2iOaBr+aWh+acrFxyXG4gICAgICAgICAgICBleHRlbmQ6ICcnLCAgLy/mianlsZXlrZfmrrVcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKG1zZykge1xyXG4gICAgICAgICAgICAgICAgLy/lj5HpgIHmiJDlip/kuYvlkI7muIXnqbrovpPlhaXmoYZcclxuICAgICAgICAgICAgICAgICR5eWltX2VkaXRvci52YWwoJycpO1xyXG4gICAgICAgICAgICAgICAgJGJ0bl9zZW5kLmFkZENsYXNzKCdhZGl0LWJ0bi1zZW5kLWRpc2FibGVkJyk7XHJcbiAgICAgICAgICAgICAgICAvL+a4suafk+WOhuWPsuS/oeaBr1xyXG4gICAgICAgICAgICAgICAgcmVuZGVySGlzdG9yeU1lc3NhZ2UobXNnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KSIsIi8vZG9t5YWD57SgXHJcbmltcG9ydCB7XHJcbiAgICAkY2hhdF9ib3gsXHJcbiAgICAkY2hhdHNfbGlzdFxyXG59IGZyb20gJy4vanFlbGVtZW50cyc7XHJcblxyXG4vL+a4suafk+iBiuWkqeiusOW9lVxyXG5pbXBvcnQgcmVuZGVySGlzdG9yeU1lc3NhZ2UgZnJvbSAnLi9yZW5kZXJIaXN0b3J5TWVzc2FnZSc7XHJcblxyXG4vL+iOt+WPluiBiuWkqeWOhuWPsizkvKDlhaVzZXNzaW9uVmVyc2lvbizlr7nmlrlpZOWSjHR5cGXlj4LmlbBcclxuZXhwb3J0IGRlZmF1bHQgKHNlc3Npb25WZXJzaW9uLCBpZCwgdHlwZSkgPT4ge1xyXG4gICAgbGV0IGVuZFZlcnNpb24gPSBzZXNzaW9uVmVyc2lvbjtcclxuICAgIGxldCBzdGFydCA9IGVuZFZlcnNpb24gPiAyMCA/IGVuZFZlcnNpb24gLSAyMCA6IDA7XHJcbiAgICAvL+iOt+WPluWOhuWPsuiBiuWkqeS/oeaBr1xyXG4gICAgWVlJTUNoYXQuZ2V0SGlzdG9yeU1lc3NhZ2Uoe1xyXG4gICAgICAgIGlkOiBpZCxcclxuICAgICAgICB0eXBlOiB0eXBlLFxyXG4gICAgICAgIHN0YXJ0VmVyc2lvbjogc3RhcnQsXHJcbiAgICAgICAgZW5kVmVyc2lvbjogZW5kVmVyc2lvbixcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgIGxldCBoaXN0b3J5Y2hhdHMgPSByZXMucmVzdWx0IHx8IFtdO1xyXG4gICAgICAgICAgICAkY2hhdF9ib3guc2hvdygpO1xyXG4gICAgICAgICAgICBoaXN0b3J5Y2hhdHMucmV2ZXJzZSgpO1xyXG4gICAgICAgICAgICAvL+aKiuiBiuWkqeiusOW9lee8k+WtmOWIsOacrOWcsFxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaGlzdG9yeWNoYXRzJywgSlNPTi5zdHJpbmdpZnkoaGlzdG9yeWNoYXRzKSk7XHJcbiAgICAgICAgICAgIC8v5riy5p+T6IGK5aSp5L+h5oGvXHJcbiAgICAgICAgICAgIHJlbmRlckhpc3RvcnlNZXNzYWdlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07IiwiXHJcbi8v5a+85YWl5pyA6L+R6IGU57O75Lq65riy5p+T5Ye95pWwXHJcbmltcG9ydCByZW5kZXJSZWNlbnREaWdzZXQgZnJvbSAnLi9yZW5kZXJSZWNlbnREaWdzZXQnO1xyXG5cclxuLy/ojrflj5bmnIDov5HogZTns7vkurpcclxuZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xyXG4gICAgLy8g6I635Y+W5pyA6L+R6IGU57O75Lq6QVBJXHJcbiAgICBZWUlNQ2hhdC5nZXRSZWNlbnREaWdzZXQoe1xyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5saXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlY2VudERpZ3NldCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0Lmxpc3QuZm9yRWFjaChmdW5jdGlvbihlLCBpKXtcclxuICAgICAgICAgICAgICAgICAgICAvL+ebruWJjea1i+ivleWPquaYvuekuuS4quS6uuiBiuWkqe+8jOS4jeaYvuekuue+pOaIluWFtuS7liBcclxuICAgICAgICAgICAgICAgICAgICBpZihlLnR5cGUgIT09ICdjaGF0Jyl7cmV0dXJuO31cclxuICAgICAgICAgICAgICAgICAgICAvL+mAmui/h2lk6I635Y+W5Liq5Lq65L+h5oGvXHJcbiAgICAgICAgICAgICAgICAgICAgWVlJTUNoYXQuZ2V0VkNhcmQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogZS5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5pW055CG5pyA6L+R6IGU57O75Lq65YiX6KGo5Yiw5LiA5Liq5paw5pWw57uEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNlbnREaWdzZXQucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHJlcy5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkZWRWZXJzaW9uOiBlLnJlYWRlZFZlcnNpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vzc2lvblZlcnNpb246IGUuc2Vzc2lvblZlcnNpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZS50eXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBob3RvOiByZXMucGhvdG8gfHwgJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmlja25hbWU6IHJlcy5uaWNrbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0TWVzc2FnZTogZS5sYXN0TWVzc2FnZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0Q29udGFjdFRpbWU6IGUubGFzdENvbnRhY3RUaW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5oqK5pyA6L+R6IGU57O75Lq65YiX6KGo5L+d5a2Y5Yiw5pys5ZywXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncmVjZW50ZGlnc2V0JywgSlNPTi5zdHJpbmdpZnkocmVjZW50RGlnc2V0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJSZWNlbnREaWdzZXQocmVjZW50RGlnc2V0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yOmZ1bmN0aW9uIChlcnIpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59IiwiXHJcbmV4cG9ydCBjb25zdCAkeXlpbV9pb2dpbiA9ICQoJy55eWltLWlvZ2luJyk7Ly/nmbvpmYbmoYZcclxuZXhwb3J0IGNvbnN0ICRsb2dpbl91c2VybmFtZSA9ICQoJy5sb2dpbi11c2VybmFtZScpOy8v55m76ZmG55So5oi35ZCNXHJcbmV4cG9ydCBjb25zdCAkbG9naW5fcGFzcyA9ICQoJy5sb2dpbi1wYXNzJyk7Ly/nmbvpmYbnlKjmiLflr4bnoIFcclxuZXhwb3J0IGNvbnN0ICRsb2dpbl9idG4gPSAkKCcubG9naW4tYnRuJyk7Ly/nmbvpmYbmjInpkq5cclxuZXhwb3J0IGNvbnN0ICR5eWltX2JveCA9ICQoJy55eWltLWJveCcpOy8v6IGK5aSp5qGG55qE6YGu572pXHJcbmV4cG9ydCBjb25zdCAkeXlpbV9tYWluID0gJCgnLnl5aW0tbWFpbicpOy8v6IGK5aSp5pyA5aSW5bGC56qX5Y+jXHJcbmV4cG9ydCBjb25zdCAkal9tb3ZlID0gJCgnLmpfbW92ZScpOy8v6IGK5aSp56qX5Y+j5aS0XHJcbmV4cG9ydCBjb25zdCAkaGNvbnRhY3RzID0gJCgnLmhjb250YWN0cycpOy8v5pyA6L+R6IGU57O75Lq65qGGXHJcbmV4cG9ydCBjb25zdCAkY2hhdHMgPSAkKCcuY2hhdHMnKTsvL+iBiuWkqeS/oeaBr+a7keWKqOWuueWZqFxyXG5leHBvcnQgY29uc3QgJGpfYnFfYm94ID0gJCgnLmpfYnFfYm94Jyk7Ly/ooajmg4Xnm5LlrZBcclxuZXhwb3J0IGNvbnN0ICR5eWltX2VkaXRvciA9ICQoJy55eWltLWVkaXRvcicpOy8v6IGK5aSp6L6T5YWl5qGGXHJcbmV4cG9ydCBjb25zdCAkYnRuX3NlbmQgPSAkKCcuYWRpdC1idG4tc2VuZCcpOyAvL+WPkemAgeaMiemSrlxyXG5leHBvcnQgY29uc3QgJGNoYXRfYm94ID0gJCgnLmNoYXQtYm94Jyk7IC8v5o6n5Yi25piv5ZCm5YW35pyJ6IGK5aSp5YaF5a65XHJcbmV4cG9ydCBjb25zdCAkY2hhdHNfbGlzdCA9ICQoJy5jaGF0cy1saXN0Jyk7IC8v6IGK5aSp5L+h5oGv5YiX6KGoXHJcbmV4cG9ydCBjb25zdCAkcGljdmlld2VyID0gJCgnI3BpY3ZpZXdlcicpOyAvL+WbvueJh+afpeeci+ahhlxyXG5cclxuLy/lrp7kvovljJZ2aWV3ZXJcclxuZXhwb3J0IGNvbnN0IHBpY3ZpZXdlciA9IG5ldyBWaWV3ZXIoJHBpY3ZpZXdlclswXSwge25hdmJhcjpmYWxzZSwgdGl0bGU6IGZhbHNlfSk7XHJcbi8vIHZpZXdlci5zaG93KHtcclxuLy8gICAgIHVybDogJ2h0dHBzOi8vd3d3LmJhaWR1LmNvbS9pbWcvYmRfbG9nbzEucG5nJ1xyXG4vLyB9KVxyXG4vLyAkcGljdmlld2VyLnZpZXdlcih7XHJcbi8vICAgICB1cmw6ICdodHRwczovL3d3dy5iYWlkdS5jb20vaW1nL2JkX2xvZ28xLnBuZycsIC8v6K6+572u5aSn5Zu+54mH55qEIHVybFxyXG4vLyAgICAgbmF2YmFyOnRydWUsIC8v5piv5ZCm5pi+56S657yp55Wl5Zu+5a+86IiqXHJcbi8vICAgICB0b29sYmFyOnRydWUsIC8v5pi+56S65bel5YW35qCPXHJcbi8vICAgICB0aXRsZTp0cnVlLCAvL+aYvuekuuW9k+WJjeWbvueJh+agh+mimChhbHTlsZ7mgKflkozlsLrlr7gpXHJcbi8vICAgICB0b29sdGlwOnRydWUsIC8v5pi+56S657yp5pS+55m+5YiG5q+UXHJcbi8vICAgICBtb3ZhYmxlOnRydWUsIC8v5Zu+54mH5piv5ZCm5Y+v56e75YqoXHJcbi8vICAgICB6b29tYWJsZTp0cnVlLCAvL+WbvueJh+aYr+WQpuWPr+e8qeaUvlxyXG4vLyAgICAgcm90YXRhYmxlOnRydWUsIC8v5Zu+54mH5piv5ZCm5Y+v5peL6L2sXHJcbi8vICAgICBzY2FsYWJsZTp0cnVlLCAvL+WbvueJh+aYr+WQpuWPr+e/u+i9rFxyXG4vLyAgICAgdHJhbnNpdGlvbjp0cnVlLCAvL+S9v+eUqCBDU1MzIOi/h+W6plxyXG4vLyAgICAgZnVsbHNjcmVlbjp0cnVlLCAvL+aSreaUvuaXtuaYr+WQpuWFqOWxj1xyXG4vLyAgICAga2V5Ym9hcmQ6dHJ1ZSwgLy/mmK/lkKbmlK/mjIHplK7nm5hcclxuLy8gICAgIGludGVydmFsOjUwMDAsIC8v5pKt5pS+6Ze06ZqU77yM5Y2V5L2N5Li65q+r56eSXHJcbi8vICAgICB6b29tUmF0aW86MC4xLCAvL+m8oOagh+a7muWKqOaXtueahOe8qeaUvuavlOS+i1xyXG4vLyAgICAgbWluWm9vbVJhdGlvOjAuMDEsIC8v5pyA5bCP57yp5pS+5q+U5L6LXHJcbi8vICAgICBtYXhab29tUmF0aW86MTAwLCAvL+acgOWkp+e8qeaUvuavlOS+i1xyXG4vLyAgICAgekluZGV4OjIwMTUsIC8v6K6+572u5Zu+54mH5p+l55yL5ZmoIG1vZGFsIOaooeW8j+aXtueahCB6LWluZGV4XHJcbi8vICAgICB6SW5kZXhJbmxpbmU6MCwgLy/orr7nva7lm77niYfmn6XnnIvlmaggaW5saW5lIOaooeW8j+aXtueahCB6LWluZGV4XHJcbi8vIH0pLnNob3coKTsiLCJcclxuLy9kb23lhYPntKBcclxuaW1wb3J0IHtcclxuICAgICRjaGF0cyxcclxuICAgICRjaGF0c19saXN0XHJcbn0gZnJvbSAnLi9qcWVsZW1lbnRzJztcclxuXHJcbi8v5riy5p+T5pyA6L+R6IGU57O75Lq65Ye95pWwXHJcbmltcG9ydCBnZXRSZWNlbnREaWdzZXQgZnJvbSAnLi9nZXRSZWNlbnREaWdzZXQnO1xyXG5cclxuLy/muLLmn5PmnIDov5HogZTns7vkurrlh73mlbBcclxuaW1wb3J0IHJlbmRlclJlY2VudERpZ3NldCBmcm9tICcuL3JlbmRlclJlY2VudERpZ3NldCc7XHJcblxyXG4vL+ihqOaDheaVsOaNrlxyXG5pbXBvcnQgeyBleHByZXNzaW9uTGlzdCB9IGZyb20gJy4vY29uc3RhbnRzJztcclxuXHJcbi8v55So5Zu+54mH5pu/5o2i5paH5pys5raI5oGv5Lit6KGo5oOF5L+h5oGvXHJcbmNvbnN0IHJlcGxhY2VFbW9qaSA9IChzdHIpID0+IHtcclxuICAgIHJldHVybiBzdHIucmVwbGFjZSgvXFxbW15cXFtcXF1dK1xcXS9nLChlKSA9PiB7XHJcbiAgICAgICAgZm9yIChsZXQgaT0wO2k8ZXhwcmVzc2lvbkxpc3QuZGF0YS5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgaWYoZXhwcmVzc2lvbkxpc3QuZGF0YVtpXS5hY3Rpb25EYXRhID09PSBlKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBgPGltZyBjbGFzcz1cImVtb2ppXCIgc3JjPVwiJHtleHByZXNzaW9uTGlzdC5wYXRoICsgZXhwcmVzc2lvbkxpc3QuZGF0YVtpXS51cmx9XCIgYWx0PVwiXCIgLz5gO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGU7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8v5riy5p+T6IGK5aSp6K6w5b2VLOS8oOWFpeS4gOadoeiBiuWkqeiusOW9leWvueixoeWNs+WPr1xyXG5leHBvcnQgZGVmYXVsdCAobXNnKSA9PiB7XHJcbiAgICAvL+aLv+WPluacrOWcsOS/neWtmOeahOWOhuWPsuiBiuWkqeS/oeaBr1xyXG4gICAgbGV0IGhpc3RvcnljaGF0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2hpc3RvcnljaGF0cycpIHx8IFwiW11cIik7XHJcbiAgICAvL+S7juacrOWcsOaLv+WPluiBiuWkqeWvueaWuWlkXHJcbiAgICBsZXQgdGFyZ2V0dXNlcmlkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RhcmdldHVzZXJpZCcpO1xyXG4gICAgLy/mi7/miJHoh6rlt7HnmoRpZFxyXG4gICAgbGV0IG15aWQgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50dXNlcmluZm8nKSkuaWQ7XHJcblxyXG4gICAgLy/lpoLmnpxtc2flrZjlnKjvvIzor7TmmI7kuI3mmK/liJ3mrKHmuLLmn5NcclxuICAgIGlmKG1zZyl7XHJcbiAgICAgICAgLy/mi7/lj5bmnKzlnLDkv53lrZjnmoTmnIDov5HogZTns7vkurrmlbDnu4RcclxuICAgICAgICBsZXQgcmVjZW50RGlnc2V0ID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncmVjZW50ZGlnc2V0JykgfHwgXCJbXVwiKTtcclxuXHJcbiAgICAgICAgaWYobXNnLmZyb20gPT09IG15aWQpeyAvL+a2iOaBr+aYr+aIkeWPkee7meWIq+S6uueahFxyXG4gICAgICAgICAgICByZWNlbnREaWdzZXQuZm9yRWFjaChmdW5jdGlvbihkaWdlc3QsIGkpe1xyXG4gICAgICAgICAgICAgICAgaWYoZGlnZXN0LmlkID09PSB0YXJnZXR1c2VyaWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlY2VudERpZ3NldFtpXS5sYXN0Q29udGFjdFRpbWUgPSBtc2cuZGF0YS5kYXRlbGluZTtcclxuICAgICAgICAgICAgICAgICAgICByZWNlbnREaWdzZXRbaV0ubGFzdE1lc3NhZ2UgPSBtc2c7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/kv53lrZjkv67mlLnlkI7nmoTmnIDov5HogZTns7vkurrmlbDnu4RcclxuICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncmVjZW50ZGlnc2V0JywgSlNPTi5zdHJpbmdpZnkocmVjZW50RGlnc2V0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/muLLmn5PmnIDov5HogZTns7vkurpcclxuICAgICAgICAgICAgICAgICAgICByZW5kZXJSZWNlbnREaWdzZXQocmVjZW50RGlnc2V0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8v5L+u5pS55Y6G5Y+y5raI5oGvXHJcbiAgICAgICAgICAgIGhpc3RvcnljaGF0cy5wdXNoKG1zZyk7XHJcbiAgICAgICAgICAgIC8v5L+u5pS55ZCO5L+d5a2YXHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdoaXN0b3J5Y2hhdHMnLEpTT04uc3RyaW5naWZ5KGhpc3RvcnljaGF0cykpO1xyXG4gICAgICAgIH0gZWxzZSB7IC8v5raI5oGv5p2l6Ieq5LqO5LuW5Lq657uZ5oiR5Y+R55qEXHJcbiAgICAgICAgICAgIGxldCBpc2RpZ3NldCA9IGZhbHNlOyAvL+WIpOaWreWvueaWueWcqOS4jeWcqOaIkeeahOacgOi/keiBlOezu+S6uumHjFxyXG4gICAgICAgICAgICByZWNlbnREaWdzZXQuZm9yRWFjaChmdW5jdGlvbihkaWdlc3QsIGkpe1xyXG4gICAgICAgICAgICAgICAgaWYoZGlnZXN0LmlkID09PSBtc2cuZnJvbSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNkaWdzZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlY2VudERpZ3NldFtpXS5sYXN0Q29udGFjdFRpbWUgPSBtc2cuZGF0YS5kYXRlbGluZTtcclxuICAgICAgICAgICAgICAgICAgICByZWNlbnREaWdzZXRbaV0ubGFzdE1lc3NhZ2UgPSBtc2c7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/kv53lrZjkv67mlLnlkI7nmoTmnIDov5HogZTns7vkurrmlbDnu4RcclxuICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncmVjZW50ZGlnc2V0JywgSlNPTi5zdHJpbmdpZnkocmVjZW50RGlnc2V0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/muLLmn5PmnIDov5HogZTns7vkurpcclxuICAgICAgICAgICAgICAgICAgICByZW5kZXJSZWNlbnREaWdzZXQocmVjZW50RGlnc2V0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8v5LiN5Zyo5pyA6L+R6IGU57O75Lq65Lit77yM5Yi35paw5pyA6L+R6IGU57O75Lq65YiX6KGoXHJcbiAgICAgICAgICAgIGlmKCFpc2RpZ3NldCl7Z2V0UmVjZW50RGlnc2V0KCk7fVxyXG4gICAgICAgICAgICAvL+aIkeato+WcqOWSjOS7luiBiuWkqVxyXG4gICAgICAgICAgICBpZihtc2cuZnJvbSA9PT0gdGFyZ2V0dXNlcmlkKXtcclxuICAgICAgICAgICAgICAgIC8v5L+u5pS55Y6G5Y+y5raI5oGvXHJcbiAgICAgICAgICAgICAgICBoaXN0b3J5Y2hhdHMucHVzaChtc2cpO1xyXG4gICAgICAgICAgICAgICAgLy/kv67mlLnlkI7kv53lrZhcclxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdoaXN0b3J5Y2hhdHMnLEpTT04uc3RyaW5naWZ5KGhpc3RvcnljaGF0cykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/lpoLmnpzmiJHmsqHlkozlr7nmlrnogYrlpKnvvIzliJnkuI3muLLmn5Pljoblj7Lkv6Hmga9cclxuICAgIGlmKG1zZyAmJiBtc2cuZnJvbSAhPT0gbXlpZCAmJiBtc2cuZnJvbSAhPT0gdGFyZ2V0dXNlcmlkKSByZXR1cm47XHJcblxyXG4gICAgbGV0IGNoYXRzU3RyID0gJyc7XHJcbiAgICBoaXN0b3J5Y2hhdHMuZm9yRWFjaChmdW5jdGlvbihjaGF0LCBpKXtcclxuICAgICAgICBsZXQgaXNmcm9tbWUgPSBteWlkID09PSBjaGF0LmZyb207XHJcbiAgICAgICAgLy/mlofmnKzmtojmga9cclxuICAgICAgICBpZihjaGF0LmRhdGEuY29udGVudFR5cGUgPT09IDIpe1xyXG4gICAgICAgICAgICBjaGF0c1N0ciArPSBgPGxpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoYXQtdGlwXCI+JHtuZXcgRGF0ZShjaGF0LmRhdGEuZGF0ZWxpbmUpLnRvTG9jYWxlVGltZVN0cmluZygpfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoYXQtY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCIkeyBpc2Zyb21tZT8gJ2NoYXQtYXZhdGFyIGNoYXQtYXZhdGFyLXNlbmQnIDonY2hhdC1hdmF0YXInfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vaW1ncy9hdmF0YXIuanBnXCIgYWx0PVwiXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiR7IGlzZnJvbW1lPyAnY2hhdC10eHQgY2hhdC10eHQtc2VuZCcgOidjaGF0LXR4dCd9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08ZGl2IGNsYXNzPVwiY2hhdC11c2VyLW5hbWVcIj4ke2NoYXQuZnJvbX08L2Rpdj4tLT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoYXQtbXNnXCI+JHtyZXBsYWNlRW1vamkoY2hhdC5kYXRhLmNvbnRlbnQpfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+IGA7XHJcbiAgICAgICAgfWVsc2UgaWYoY2hhdC5kYXRhLmNvbnRlbnRUeXBlID09PSA4KXsgIC8v5Zu+54mH5raI5oGvXHJcbiAgICAgICAgICAgIGxldCBwaWN1cmwgPSBZWUlNQ2hhdC5nZXRGaWxlVXJsKGNoYXQuZGF0YS5jb250ZW50LmF0dGFjaElkKTtcclxuICAgICAgICAgICAgY2hhdHNTdHIgKz0gYDxsaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGF0LXRpcFwiPiR7bmV3IERhdGUoY2hhdC5kYXRhLmRhdGVsaW5lKS50b0xvY2FsZVRpbWVTdHJpbmcoKX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGF0LWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHsgaXNmcm9tbWU/ICdjaGF0LWF2YXRhciBjaGF0LWF2YXRhci1zZW5kJyA6J2NoYXQtYXZhdGFyJ31cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2ltZ3MvYXZhdGFyLmpwZ1wiIGFsdD1cIlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCIkeyBpc2Zyb21tZT8gJ2NoYXQtdHh0IGNoYXQtdHh0LXNlbmQnIDonY2hhdC10eHQnfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tPGRpdiBjbGFzcz1cImNoYXQtdXNlci1uYW1lXCI+JHtjaGF0LmZyb219PC9kaXY+LS0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGF0LW1zZ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cImNoYXRwaWNcIiBkYXRhLXVybD1cIiR7cGljdXJsfVwiIHNyYz1cIiR7cGljdXJsfVwiIHRpdGxlPVwi54K55Ye75p+l55yL5Zu+54mHXCIgYWx0PVwiXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT4gYDtcclxuICAgICAgICB9ZWxzZSBpZihjaGF0LmRhdGEuY29udGVudFR5cGUgPT09IDQpe1xyXG4gICAgICAgICAgICBsZXQgcGljdXJsID0gWVlJTUNoYXQuZ2V0RmlsZVVybChjaGF0LmRhdGEuY29udGVudC5hdHRhY2hJZCk7XHJcbiAgICAgICAgICAgIGxldCBmaWxlbmFtZSA9IGNoYXQuZGF0YS5jb250ZW50Lm5hbWUuc2xpY2UoMCwgMjApO1xyXG4gICAgICAgICAgICBjaGF0c1N0ciArPSBgPGxpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoYXQtdGlwXCI+JHtuZXcgRGF0ZShjaGF0LmRhdGEuZGF0ZWxpbmUpLnRvTG9jYWxlVGltZVN0cmluZygpfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoYXQtY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCIkeyBpc2Zyb21tZT8gJ2NoYXQtYXZhdGFyIGNoYXQtYXZhdGFyLXNlbmQnIDonY2hhdC1hdmF0YXInfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vaW1ncy9hdmF0YXIuanBnXCIgYWx0PVwiXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiR7IGlzZnJvbW1lPyAnY2hhdC10eHQgY2hhdC10eHQtc2VuZCcgOidjaGF0LXR4dCd9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08ZGl2IGNsYXNzPVwiY2hhdC11c2VyLW5hbWVcIj4ke2NoYXQuZnJvbX08L2Rpdj4tLT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoYXQtbXNnXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cImNoYXRmaWxlXCIgaHJlZj1cIiR7cGljdXJsfVwiIHRpdGxlPVwi54K55Ye75LiL6L295paH5Lu2XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmaWxlbmFtZVwiPiR7ZmlsZW5hbWV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmlsZXNpemVcIj4ke2NoYXQuZGF0YS5jb250ZW50LnNpemV9Qjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT4gYDtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgICRjaGF0c19saXN0Lmh0bWwoY2hhdHNTdHIpO1xyXG4gICAgJGNoYXRzLnNjcm9sbFRvcCgkY2hhdHNbMF0uc2Nyb2xsSGVpZ2h0KTtcclxufTsiLCJcclxuLy9kb23lhYPntKBcclxuaW1wb3J0IHtcclxuICAgICRoY29udGFjdHNcclxufSBmcm9tICcuL2pxZWxlbWVudHMnO1xyXG4vL+ihqOaDheaVsOaNrlxyXG5pbXBvcnQgeyBleHByZXNzaW9uTGlzdCB9IGZyb20gJy4vY29uc3RhbnRzJztcclxuXHJcbi8v55So5Zu+54mH5pu/5o2i5paH5pys5raI5oGv5Lit6KGo5oOF5L+h5oGvXHJcbmNvbnN0IHJlcGxhY2VFbW9qaSA9IChzdHIpID0+IHtcclxuICAgIHJldHVybiBzdHIucmVwbGFjZSgvXFxbW15cXFtcXF1dK1xcXS9nLChlKSA9PiB7XHJcbiAgICAgICAgZm9yIChsZXQgaT0wO2k8ZXhwcmVzc2lvbkxpc3QuZGF0YS5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgaWYoZXhwcmVzc2lvbkxpc3QuZGF0YVtpXS5hY3Rpb25EYXRhID09PSBlKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBgPGltZyBjbGFzcz1cImVtb2ppXCIgc3JjPVwiJHtleHByZXNzaW9uTGlzdC5wYXRoICsgZXhwcmVzc2lvbkxpc3QuZGF0YVtpXS51cmx9XCIgYWx0PVwiXCIgLz5gO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGU7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IChkaWdzZXRzKSA9PiB7XHJcbiAgICAvL+aLv+WPluiBiuWkqeWvueaWuWlkXHJcbiAgICBsZXQgdGFyZ2V0dXNlcmlkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RhcmdldHVzZXJpZCcpO1xyXG4gICAgbGV0IGRpZ1N0ciA9ICcnO1xyXG4gICAgZGlnc2V0cy5zb3J0KGZ1bmN0aW9uKGEsIGIpe3JldHVybiBiLmxhc3RDb250YWN0VGltZSAtIGEubGFzdENvbnRhY3RUaW1lfSk7XHJcbiAgICBkaWdzZXRzLmZvckVhY2goZnVuY3Rpb24ocmVzKXtcclxuICAgICAgICBsZXQgbGFzdG1zZyA9IHJlcy5sYXN0TWVzc2FnZSwgbGFzdG1zZ1N0ciA9ICcnO1xyXG4gICAgICAgIGlmKGxhc3Rtc2cpe1xyXG4gICAgICAgICAgICBzd2l0Y2gobGFzdG1zZy5kYXRhLmNvbnRlbnRUeXBlKXtcclxuICAgICAgICAgICAgICAgIGNhc2UgMjogbGFzdG1zZ1N0ciA9IHJlcy5sYXN0TWVzc2FnZS5kYXRhLmNvbnRlbnQ7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBsYXN0bXNnU3RyID0gJ1vmlofku7bmtojmga9dJzsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDg6IGxhc3Rtc2dTdHIgPSAnW+WbvueJh+a2iOaBr10nO2JyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRpZ1N0ciArPSBgPGxpIGNsYXNzPVwiJHt0YXJnZXR1c2VyaWQgJiYgdGFyZ2V0dXNlcmlkID09PSByZXMuaWQgPyAnYWN0aXZlJyA6ICcnfVwiIGRhdGEtc2Vzc2lvblZlcnNpb249XCIke3Jlcy5zZXNzaW9uVmVyc2lvbn1cIiBkYXRhLWlkPVwiJHtyZXMuaWR9XCIgZGF0YS10eXBlPVwiJHtyZXMudHlwZX1cIiBkYXRhLW5pY2tuYW1lPVwiJHtyZXMubmlja25hbWUgfHwgcmVzLmlkfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpIGRhdGEtaWQ9XCIke3Jlcy5pZH1cIiBjbGFzcz1cImNsb3NlXCI+w5c8L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImF2YXRhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7WVlJTUNoYXQuZ2V0RmlsZVVybChyZXMucGhvdG8pIHx8ICcuL2ltZ3MvYXZhdGFyLmpwZyd9XCIgYWx0PVwiXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRldGFpbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJuYW1lIGN1dHR4dFwiPiR7cmVzLm5pY2tuYW1lIHx8IHJlcy5pZH08L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIm1zZyBjdXR0eHRcIj4ke3JlcGxhY2VFbW9qaShsYXN0bXNnU3RyKX08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJuZXd0aXAgY3V0dHh0XCI+MjwvaT5cclxuICAgICAgICAgICAgICAgIDwvbGk+YDtcclxuICAgIH0pO1xyXG4gICAgJGhjb250YWN0cy5odG1sKGRpZ1N0cik7XHJcbn0iLCIvL+WFg+e0oFxyXG5pbXBvcnQgeyAkeXlpbV9pb2dpbiwgJHl5aW1fYm94IH0gZnJvbSAnLi9qcWVsZW1lbnRzJztcclxuXHJcbi8v55So5oi355m76ZmGXHJcbmV4cG9ydCBkZWZhdWx0ICh1c2VybmFtZSwgcGFzc3dvcmQpID0+IHtcclxuICAgIC8v5q2j5byP546v5aKDXHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogJ2h0dHBzOi8vaW0ueXl1YXAuY29tL3N5c2FkbWluL3Jlc3QveW9ueW91L3Vkbi90b2tlbicsXHJcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgaGVhZGVyczoge1wiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwifSxcclxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIFwidXNlcm5hbWVcIjp1c2VybmFtZSxcclxuICAgICAgICAgICAgXCJjbGllbnRJZFwiOlwiYzg1MTMwYWMyYzgwZDgzYjg2ZmMxYmMzNDRhYzEyMTFcIixcclxuICAgICAgICAgICAgXCJjbGllbnRTZWNyZXRcIjpcIkNFRDE0NjEzNUE1ODRENUYyRUFCMzM2MzVEMTlBRTk5XCJcclxuICAgICAgICB9KSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGxldCBjbGllbnRJZGVudGlmeSA9IFwicGNcIiArIFN0cmluZyhuZXcgRGF0ZSgpLmdldFRpbWUoKSk7XHJcbiAgICAgICAgICAgICR5eWltX2lvZ2luLmhpZGUoKTtcclxuICAgICAgICAgICAgJHl5aW1fYm94LnNob3coKTtcclxuICAgICAgICAgICAgLy/nmbvpmYZZWUlNU0RLXHJcbiAgICAgICAgICAgIFlZSU1DaGF0LmxvZ2luKHtcclxuICAgICAgICAgICAgICAgIFwidXNlcm5hbWVcIjogdXNlcm5hbWUsXHJcbiAgICAgICAgICAgICAgICBcInRva2VuXCI6IHJlc3VsdC50b2tlbixcclxuICAgICAgICAgICAgICAgIFwiZXhwaXJhdGlvblwiOiByZXN1bHQuZXhwaXJhdGlvbixcclxuICAgICAgICAgICAgICAgIFwiYXBwVHlwZVwiOiA0LFxyXG4gICAgICAgICAgICAgICAgXCJpZGVudGlmeVwiOiBjbGllbnRJZGVudGlmeVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoYXJnKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGFyZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAvL+a1i+ivleeOr+Wig1xyXG4gICAgLy8gJC5hamF4KHtcclxuICAgIC8vICAgICB1cmw6ICdodHRwOi8vMTcyLjIwLjE1LjYwL3N5c2FkbWluL3Jlc3QveW9ueW91L2ltX3ByZS90b2tlbicsXHJcbiAgICAvLyAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgLy8gICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAvLyAgICAgaGVhZGVyczoge1wiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwifSxcclxuICAgIC8vICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAvLyAgICAgICAgIFwidXNlcm5hbWVcIjp1c2VybmFtZSxcclxuICAgIC8vICAgICAgICAgXCJjbGllbnRJZFwiOlwiYjI2YmE1MTA1OGVlZTlkYjRmODhhN2EyYjFiZDFiMDZcIixcclxuICAgIC8vICAgICAgICAgXCJjbGllbnRTZWNyZXRcIjpcIkNDOUE3MUUwQzI1MjhFREIxNjUyREZCMThFQ0U4RERGXCJcclxuICAgIC8vICAgICB9KSxcclxuICAgIC8vICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAvLyAgICAgICAgIGxldCBjbGllbnRJZGVudGlmeSA9IFwicGNcIiArIFN0cmluZyhuZXcgRGF0ZSgpLmdldFRpbWUoKSk7XHJcbiAgICAvLyAgICAgICAgICR5eWltX2lvZ2luLmhpZGUoKTtcclxuICAgIC8vICAgICAgICAgJHl5aW1fYm94LnNob3coKTtcclxuICAgIC8vICAgICAgICAgLy/nmbvpmYZZWUlNU0RLXHJcbiAgICAvLyAgICAgICAgIFlZSU1DaGF0LmxvZ2luKHtcclxuICAgIC8vICAgICAgICAgICAgIFwidXNlcm5hbWVcIjogdXNlcm5hbWUsXHJcbiAgICAvLyAgICAgICAgICAgICBcInRva2VuXCI6IHJlc3VsdC50b2tlbixcclxuICAgIC8vICAgICAgICAgICAgIFwiZXhwaXJhdGlvblwiOiByZXN1bHQuZXhwaXJhdGlvbixcclxuICAgIC8vICAgICAgICAgICAgIFwiYXBwVHlwZVwiOiA0LFxyXG4gICAgLy8gICAgICAgICAgICAgXCJpZGVudGlmeVwiOiBjbGllbnRJZGVudGlmeVxyXG4gICAgLy8gICAgICAgICB9KTtcclxuICAgIC8vICAgICB9LFxyXG4gICAgLy8gICAgIGVycm9yOiBmdW5jdGlvbiAoYXJnKSB7XHJcbiAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKGFyZyk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfSk7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==