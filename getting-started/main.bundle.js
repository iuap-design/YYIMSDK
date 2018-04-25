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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbnRyb2xFdmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZ2V0SGlzdG9yeU1lc3NhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2dldFJlY2VudERpZ3NldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvanFlbGVtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcmVuZGVySGlzdG9yeU1lc3NhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3JlbmRlclJlY2VudERpZ3NldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXNlckxvZ2luLmpzIl0sIm5hbWVzIjpbIllZSU1DaGF0IiwiaW5pdFNESyIsImFwcCIsImV0cCIsIndzdXJsIiwid3Nwb3J0IiwiaGJwb3J0Iiwic2VydmxldCIsImZsYXNoX3N3Zl91cmwiLCJsb2dFbmFibGUiLCJjbGllbnRNYXJrIiwiYXBpS2V5IiwiaW5pdCIsIm9uT3BlbmVkIiwic2V0UHJlc2VuY2UiLCJsb2NhbFN0b3JhZ2UiLCJyZW1vdmVJdGVtIiwiZ2V0VkNhcmQiLCJzdWNjZXNzIiwicmVzIiwic2V0SXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJvbkV4cGlyYXRpb24iLCJjYWxsYmFjayIsIm9uQ2xvc2VkIiwiYXJnIiwib25Db25mbGljdGVkIiwib25DbGllbnRLaWNrb3V0Iiwib25VcGRhdGVQYXNzd29yZCIsIm9uQXV0aEVycm9yIiwib25Db25uZWN0RXJyb3IiLCJvblJlY2VpcHRzIiwib25TdWJzY3JpYmUiLCJvblJvc3RlckZhdm9yaXRlZCIsIm9uUm9zdGVyVXBkYXRlZGVkIiwib25NZXNzYWdlIiwibXNnIiwib25Hcm91cFVwZGF0ZSIsIm9uS2lja2VkT3V0R3JvdXAiLCJvblRyYW5zZmVyR3JvdXBPd25lciIsIm9uUHJlc2VuY2UiLCJvblJvc3RlckRlbGV0ZWQiLCJvblB1YmFjY291bnRVcGRhdGUiLCJwdWJhY2NvdW50cyIsIm9uVHJhbnNwYXJlbnRNZXNzYWdlIiwiZXhwcmVzc2lvbkxpc3QiLCJwYXRoIiwiZGF0YSIsImFjdGlvbkRhdGEiLCJodG1sIiwibWFwIiwidCIsInVybCIsImdldEl0ZW0iLCJwYXJzZSIsInVzZXJuYW1lIiwiY2xpY2siLCJ2YWwiLCJwYXNzd29yZCIsInRlc3QiLCIkIiwiaGFzQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwiY3NzIiwibGVmdCIsInRvcCIsImNsZWFyIiwiaGlkZSIsInNob3ciLCJvbiIsImUiLCJvcmlnaW5YIiwiY2xpZW50WCIsIm9yaWdpblkiLCJjbGllbnRZIiwiYm94UG9zIiwicG9zaXRpb24iLCJvZmYiLCJrZXl3b3JkIiwia2V5Q29kZSIsImdldFJvc3Rlckl0ZW1zIiwiY29uc29sZSIsImxvZyIsInNpYmxpbmdzIiwiYXR0ciIsInBpY3VybCIsImhvdmVyIiwidG9nZ2xlIiwidG8iLCJzZW5kUGljIiwiZmlsZUlucHV0SWQiLCJjaGF0SW5mbyIsInR5cGUiLCJleHRlbmQiLCJmaWxlRmlsdGVyZWQiLCJmaWxlVXBsb2FkZWQiLCJiZWZvcmVVcGxvYWQiLCJlcnJvciIsImVyciIsInByb2dyZXNzIiwicHJvIiwic2VuZEZpbGUiLCJzZW5kVGV4dE1lc3NhZ2UiLCJjb250ZW50Iiwic2Vzc2lvblZlcnNpb24iLCJpZCIsImVuZFZlcnNpb24iLCJzdGFydCIsImdldEhpc3RvcnlNZXNzYWdlIiwic3RhcnRWZXJzaW9uIiwiaGlzdG9yeWNoYXRzIiwicmVzdWx0IiwicmV2ZXJzZSIsImdldFJlY2VudERpZ3NldCIsImxpc3QiLCJsZW5ndGgiLCJyZWNlbnREaWdzZXQiLCJmb3JFYWNoIiwiaSIsInB1c2giLCJyZWFkZWRWZXJzaW9uIiwicGhvdG8iLCJuaWNrbmFtZSIsImxhc3RNZXNzYWdlIiwibGFzdENvbnRhY3RUaW1lIiwiJHl5aW1faW9naW4iLCIkbG9naW5fdXNlcm5hbWUiLCIkbG9naW5fcGFzcyIsIiRsb2dpbl9idG4iLCIkeXlpbV9ib3giLCIkeXlpbV9tYWluIiwiJGpfbW92ZSIsIiRoY29udGFjdHMiLCIkY2hhdHMiLCIkal9icV9ib3giLCIkeXlpbV9lZGl0b3IiLCIkYnRuX3NlbmQiLCIkY2hhdF9ib3giLCIkY2hhdHNfbGlzdCIsIiRwaWN2aWV3ZXIiLCJwaWN2aWV3ZXIiLCJWaWV3ZXIiLCJuYXZiYXIiLCJ0aXRsZSIsInJlcGxhY2VFbW9qaSIsInN0ciIsInJlcGxhY2UiLCJ0YXJnZXR1c2VyaWQiLCJteWlkIiwiZnJvbSIsImRpZ2VzdCIsImRhdGVsaW5lIiwiaXNkaWdzZXQiLCJjaGF0c1N0ciIsImNoYXQiLCJpc2Zyb21tZSIsImNvbnRlbnRUeXBlIiwiRGF0ZSIsInRvTG9jYWxlVGltZVN0cmluZyIsImdldEZpbGVVcmwiLCJhdHRhY2hJZCIsImZpbGVuYW1lIiwibmFtZSIsInNsaWNlIiwic2l6ZSIsInNjcm9sbFRvcCIsInNjcm9sbEhlaWdodCIsImRpZ3NldHMiLCJkaWdTdHIiLCJzb3J0IiwiYSIsImIiLCJsYXN0bXNnIiwibGFzdG1zZ1N0ciIsImFqYXgiLCJkYXRhVHlwZSIsImhlYWRlcnMiLCJjbGllbnRJZGVudGlmeSIsIlN0cmluZyIsImdldFRpbWUiLCJsb2dpbiIsInRva2VuIiwiZXhwaXJhdGlvbiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBC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QUFQLENBQTVCO0FBQ0Esb0NBQVloSCxJQUFaO0FBQ0Esa0NBQVVDLElBQVY7QUFDQTtBQUNBdEUscUJBQVNzTCxLQUFULENBQWU7QUFDWCw0QkFBWTlILFFBREQ7QUFFWCx5QkFBU3lELE9BQU9zRSxLQUZMO0FBR1gsOEJBQWN0RSxPQUFPdUUsVUFIVjtBQUlYLDJCQUFXLENBSkE7QUFLWCw0QkFBWUw7QUFMRCxhQUFmO0FBT0gsU0F0QkU7QUF1QkhoRixlQUFPLGVBQVV6RSxHQUFWLEVBQWU7QUFDbEJ5RCxvQkFBUUMsR0FBUixDQUFZMUQsR0FBWjtBQUNIO0FBekJFLEtBQVA7QUEyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSCxDLEVBN0RELEkiLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIvL+WKoOi9veS6i+S7tuaTjeS9nFxyXG5pbXBvcnQgJy4vanMvY29udHJvbEV2ZW50JztcclxuXHJcbi8v6I635Y+W5pyA6L+R6IGU57O75Lq6XHJcbmltcG9ydCBnZXRSZWNlbnREaWdzZXQgZnJvbSAnLi9qcy9nZXRSZWNlbnREaWdzZXQnO1xyXG5cclxuLy/muLLmn5Pljoblj7LogYrlpKnorrDlvZVcclxuaW1wb3J0IHJlbmRlckhpc3RvcnlNZXNzYWdlIGZyb20gJy4vanMvcmVuZGVySGlzdG9yeU1lc3NhZ2UnO1xyXG5cclxuLy/liJ3lp4vljJZTREvvvIzmraPlvI/njq/looNcclxuWVlJTUNoYXQuaW5pdFNESyh7XHJcbiAgICBhcHA6ICd1ZG4nLCAvL2FwcElkXHJcbiAgICBldHA6ICd5b255b3UnLCAvL2V0cElkXHJcbiAgICB3c3VybDogJ3N0ZWxsYXIueXl1YXAuY29tJywgLy93ZWJzb2NrZXQgVXJsXHJcbiAgICB3c3BvcnQ6IDUyMjcsIC8vd2Vic29ja2V0IHBvcnQgNTIyNy81MjIyLzUyMjVcclxuICAgIGhicG9ydDogNzA3NSwgLy9odHRwYmluZCAgcG9ydCA3MDc1LzcwNzBcclxuICAgIHNlcnZsZXQ6ICdodHRwczovL2ltLnl5dWFwLmNvbS8nLCAvL3Jlc3QgVXJsXHJcbiAgICBmbGFzaF9zd2ZfdXJsOiAneHh4L3gvTW94aWUuc3dmJywgLy9mbGFzaCDkuIrkvKAgc3dm5paH5Lu25L2N572uXHJcbiAgICBsb2dFbmFibGU6IHRydWUsIC8vY2xpZW50IGxvZ1xyXG4gICAgY2xpZW50TWFyazogJ3dlYicsIC8vY2xpZW50IG1hcmsgJ3dlYicgb3IgJ3BjJ1xyXG4gICAgYXBpS2V5OiBcIjg1ZGU3OWI5ZjdlMzRjMzdhOTlhY2NhZGRiMjU2OTkwXCJcclxufSk7XHJcbi8v5Yid5aeL5YyWU0RL77yM5rWL6K+V546v5aKDXHJcbi8vIFlZSU1DaGF0LmluaXRTREsoe1xyXG4vLyAgICAgYXBwOiAnaW1fcHJlJywgLy9hcHBJZFxyXG4vLyAgICAgZXRwOiAneW9ueW91JywgLy9ldHBJZFxyXG4vLyAgICAgd3N1cmw6ICcxNzIuMjAuMTUuNjAnLCAvL3dlYnNvY2tldCBVcmxcclxuLy8gICAgIHdzcG9ydDogNTIyNywgLy93ZWJzb2NrZXQgcG9ydCA1MjI3LzUyMjIvNTIyNVxyXG4vLyAgICAgaGJwb3J0OiA3MDc1LCAvL2h0dHBiaW5kICBwb3J0IDcwNzUvNzA3MFxyXG4vLyAgICAgc2VydmxldDogJ2h0dHA6Ly8xNzIuMjAuMTUuNjAvJywgLy9yZXN0IFVybFxyXG4vLyAgICAgZmxhc2hfc3dmX3VybDogJ3h4eC94L01veGllLnN3ZicsIC8vZmxhc2gg5LiK5LygIHN3ZuaWh+S7tuS9jee9rlxyXG4vLyAgICAgbG9nRW5hYmxlOiB0cnVlLCAvL2NsaWVudCBsb2dcclxuLy8gICAgIGNsaWVudE1hcms6ICd3ZWInLCAvL2NsaWVudCBtYXJrICd3ZWInIG9yICdwYydcclxuLy8gICAgIGFwaUtleTogXCI4NWRlNzliOWY3ZTM0YzM3YTk5YWNjYWRkYjI1Njk5MFwiXHJcbi8vIH0pO1xyXG5cclxuLy/liJ3lp4vljJblm57osIPmlrnms5VcclxuWVlJTUNoYXQuaW5pdCh7XHJcbiAgICBvbk9wZW5lZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g55m75b2V5oiQ5Yqf6K6+572u5Zyo57q/54q25oCBXHJcbiAgICAgICAgWVlJTUNoYXQuc2V0UHJlc2VuY2UoKTtcclxuICAgICAgICAvL+enu+mZpOS/neWtmOeahOmAmuiur+WvueaWuWlk77yM6YG/5YWN6aG16Z2i5Yi35paw5ZCO5pyA6L+R6IGU57O75Lq66IGU57O754q25oCB6L+Y6K6w5b2V552AXHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3RhcmdldHVzZXJpZCcpO1xyXG4gICAgICAgIC8vIOiOt+WPluiHquW3seS/oeaBr1xyXG4gICAgICAgIFlZSU1DaGF0LmdldFZDYXJkKHtcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICAgLy/kv53lrZjoh6rlt7HnmoTkv6Hmga9cclxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50dXNlcmluZm8nLCBKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8v6I635Y+W5pyA6L+R6IGU57O75Lq6XHJcbiAgICAgICAgZ2V0UmVjZW50RGlnc2V0KCk7XHJcbiAgICB9LFxyXG4gICAgb25FeHBpcmF0aW9uOiBmdW5jdGlvbihjYWxsYmFjaykge1xyXG4gICAgICAgIC8v6Ieq5Yqo5pu05pawdG9rZW5cclxuICAgICAgICAvLyBjYWxsYmFjayh0b2tlbiwgZXhwaXJhdGlvbik7XHJcbiAgICB9LFxyXG4gICAgb25DbG9zZWQ6IGZ1bmN0aW9uKGFyZykge1xyXG4gICAgICAgIC8v6L+e5o6l5YWz6ZetXHJcbiAgICB9LFxyXG4gICAgb25Db25mbGljdGVkOiBmdW5jdGlvbihhcmcpIHtcclxuICAgICAgICAvL+eZu+mZhuWGsueqgVxyXG4gICAgfSxcclxuICAgIG9uQ2xpZW50S2lja291dDogZnVuY3Rpb24oYXJnKSB7XHJcbiAgICAgICAgLy/ooqvku5bnq6/ouKLmjolcclxuICAgIH0sXHJcbiAgICBvblVwZGF0ZVBhc3N3b3JkOiBmdW5jdGlvbihhcmcpIHtcclxuICAgICAgICAvL+abtOaUueWvhuegge+8jOiiq+i4ouaOiVxyXG4gICAgfSxcclxuICAgIG9uQXV0aEVycm9yOiBmdW5jdGlvbihhcmcpIHtcclxuICAgICAgICAvL+eZu+mZhuiupOivgeWksei0pVxyXG4gICAgfSxcclxuICAgIG9uQ29ubmVjdEVycm9yOiBmdW5jdGlvbihhcmcpIHtcclxuICAgICAgICAvL+i/nuaOpeWksei0pVxyXG4gICAgfSxcclxuICAgIG9uUmVjZWlwdHM6IGZ1bmN0aW9uKGFyZykge1xyXG4gICAgICAgIC8v5raI5oGv5Zue5omnXHJcbiAgICB9LFxyXG4gICAgb25TdWJzY3JpYmU6IGZ1bmN0aW9uKGFyZykge1xyXG4gICAgICAgIC8v5Y+R55Sf6K6i6ZiFXHJcbiAgICB9LFxyXG4gICAgb25Sb3N0ZXJGYXZvcml0ZWQ6IGZ1bmN0aW9uKGFyZykge1xyXG4gICAgICAgIC8v6KKr5pS26JePXHJcbiAgICB9LFxyXG4gICAgb25Sb3N0ZXJVcGRhdGVkZWQ6IGZ1bmN0aW9uKGFyZykge1xyXG4gICAgICAgIC8v5aW95Y+L5L+h5oGv5pu05pS5XHJcbiAgICB9LFxyXG4gICAgb25NZXNzYWdlOiBmdW5jdGlvbihtc2cpIHtcclxuICAgICAgICAvL+a4suafk+WOhuWPsuiBiuWkqeiusOW9lVxyXG4gICAgICAgIHJlbmRlckhpc3RvcnlNZXNzYWdlKG1zZyk7XHJcbiAgICB9LFxyXG4gICAgb25Hcm91cFVwZGF0ZTogZnVuY3Rpb24oYXJnKSB7XHJcbiAgICAgICAgLy/nvqTnu4Tmm7TmlrBcclxuICAgIH0sXHJcbiAgICBvbktpY2tlZE91dEdyb3VwOiBmdW5jdGlvbihhcmcpIHtcclxuICAgICAgICAvL+e+pOaIkOWRmOiiq+e+pOS4u+aPkOWHulxyXG4gICAgfSxcclxuICAgIG9uVHJhbnNmZXJHcm91cE93bmVyOiBmdW5jdGlvbihhcmcpe1xyXG4gICAgICAgIC8v576k5Li76L2s6K6pXHJcbiAgICB9LFxyXG4gICAgb25QcmVzZW5jZTogZnVuY3Rpb24oYXJnKSB7XHJcbiAgICAgICAgLy/lpb3lj4twcmVzZW5jZeaUueWPmFxyXG4gICAgfSxcclxuICAgIG9uUm9zdGVyRGVsZXRlZDogZnVuY3Rpb24oYXJnKSB7XHJcbiAgICAgICAgLy/lpb3lj4vooqvliKDpmaRcclxuICAgIH0sXHJcbiAgICBvblB1YmFjY291bnRVcGRhdGU6IGZ1bmN0aW9uKHB1YmFjY291bnRzKSB7XHJcbiAgICAgICAgLy/lhazlhbHlj7fkv6Hmga/mm7TmlrBcclxuICAgIH0sXHJcbiAgICBvblRyYW5zcGFyZW50TWVzc2FnZTogZnVuY3Rpb24oYXJnKSB7XHJcbiAgICAgICAgLy/pgI/kvKDkuJrliqHmtojmga9cclxuICAgIH1cclxufSk7XHJcblxyXG4iLCJleHBvcnQgY29uc3QgZXhwcmVzc2lvbkxpc3QgPSB7XHJcbiAgICBwYXRoOiBcIi4vaW1ncy9icS9cIixcclxuICAgIGRhdGE6IFtcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+m+h+eJmV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2NpeWFAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WTiOWTiF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2hhaGFAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+aZlV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3l1bkAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5rGXXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25faGFuYkAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5a6z576eXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25faGFpeEAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6LCD55quXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fdGlhb3BAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+eWkemXrl1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3lpd0AyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5o2C6IS4XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fd3VsaWFuQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlpbjnrJFdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9qaWFueGlhb0AyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5py65pm6XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fc21hcnRAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+W+l+aEj11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2RleWlAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+eskWNyeV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2xhdWdoaW5nX3RlYXJzQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmtYHms6pdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9jcnlpbmdAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+Wli+aWl11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2ZlbmRvdUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5oqx5oqxXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25faHVnQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvnlJ/nl4VdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9pbGxAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WwtOWwrF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2dhbmdhQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlgbfnrJFdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl90b3V4QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvotZ5dXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl96YW5AMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+aPoeaJi11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3dvc0AyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJbT0tdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9va0AyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJbeWVha11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3llYWtAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+m8k+aOjF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2d1ekAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5ouz5aS0XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fcXVhbnRvdUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6IKM6IKJXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25famlyb3VAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+aPoeaLs11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3dvcUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5ouc5omYXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fYmFpdEAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5oSJ5b+rXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25feXVrQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvpmr7ov4ddXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9uYW5ndW9AMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+mXreWYtF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2JpenVpQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlm7BdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9rdW5AMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+eMquWktF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3BpZ0AyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb54ix5b+DXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25faGVhcnRAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+W/g+eijl1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3hpbnN1aUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb56S855uSXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fYm94QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlkLtdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9raXNzYUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb546r55Gw6IqxXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fcm9zZUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5qOS5qOS57OWXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fY2FuZHlAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+aZmuWuiV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX25pZ2h0QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvnpYjnpbddXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9wcmF5QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvnu5nliptdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9nZWlsaUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6LipXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fY2FpQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvkurLkurJdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9raXNzYkAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5ZiYXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25feHVAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+iJsl1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3NlQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlj6/mgJxdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9rZWxpYW5AMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WPkeWRhl1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2ZhZGFpQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlpKflk61dXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9jcnlhQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlm7BaenpdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl96enpAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+aAneiAg11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3Npa2FvQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvnmb3nnLxdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9iYWl5QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlgrLmhaJdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9hb21hbkAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6YW3XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fa3VAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+Wbp11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2ppb25nQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvphJnop4ZdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9iaXNAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+mlpemlv11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2ppZUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5ZCTXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25feGlhQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmiqDpvLtdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9rb3ViaUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5oOK6K62XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25famluZ3lAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WPkeaAkl1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2FuZ3J5QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmg4rmgZBdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9qaW5na0AyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5ZCQXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fdHVAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+aLnOaLnF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2J5ZUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5ZKW5ZWhXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fY29mZmVlQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvllaTphZJdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9iZWVyQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvkuIvpm6hdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9yYWluQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvpl6rnlLVdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9zaGFuZEAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5LiL6ZuqXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fc25vd0AyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6Laz55CDXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fYmFsbEAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb56+u55CDXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fYmFza2V0QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvpo57mnLpdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9wbGFuZUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6YKu5Lu2XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fbWFpbEAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6Zuo5LyeXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25feXVzYW5AMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+Wlluadr11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2ppYW5nYkAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5oCq54mpXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fZ3VhaXd1QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvoja9dXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9tZWRAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+eCuOW8uV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3poYWRAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+ibi+ezlV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2Nha2VAMngucG5nXCIgfVxyXG4gICAgXVxyXG59OyIsIi8vZG9t5YWD57SgXHJcbmltcG9ydCB7XHJcbiAgICAkeXlpbV9pb2dpbixcclxuICAgICR5eWltX2JveCxcclxuICAgICR5eWltX21haW4sXHJcbiAgICAkal9tb3ZlLFxyXG4gICAgJGpfYnFfYm94LFxyXG4gICAgJHl5aW1fZWRpdG9yLFxyXG4gICAgJGJ0bl9zZW5kLFxyXG4gICAgJGxvZ2luX3VzZXJuYW1lLFxyXG4gICAgJGxvZ2luX3Bhc3MsXHJcbiAgICAkbG9naW5fYnRuLFxyXG4gICAgJGhjb250YWN0cyxcclxuICAgICRjaGF0c19saXN0LFxyXG4gICAgJHBpY3ZpZXdlcixcclxuICAgIHBpY3ZpZXdlclxyXG59IGZyb20gJy4vanFlbGVtZW50cyc7XHJcblxyXG4vL+ihqOaDheaVsOaNrlxyXG5pbXBvcnQgeyBleHByZXNzaW9uTGlzdCB9IGZyb20gJy4vY29uc3RhbnRzJztcclxuXHJcbi8v55So5oi355m76ZmGXHJcbmltcG9ydCB1c2VyTG9naW4gZnJvbSAnLi91c2VyTG9naW4nO1xyXG5cclxuLy/ojrflj5bljoblj7LogYrlpKnorrDlvZVcclxuaW1wb3J0IGdldEhpc3RvcnlNZXNzYWdlIGZyb20gJy4vZ2V0SGlzdG9yeU1lc3NhZ2UnO1xyXG5cclxuLy/muLLmn5Pljoblj7LogYrlpKnorrDlvZVcclxuaW1wb3J0IHJlbmRlckhpc3RvcnlNZXNzYWdlIGZyb20gJy4vcmVuZGVySGlzdG9yeU1lc3NhZ2UnO1xyXG5cclxuLy/mlL7nva7ooajmg4XliJfooahcclxuJGpfYnFfYm94Lmh0bWwoZXhwcmVzc2lvbkxpc3QuZGF0YS5tYXAoKHQpID0+IHtcclxuICAgIHJldHVybiBgPGxpIGRhdGEtY29kZT1cIiR7dC5hY3Rpb25EYXRhfVwiPjxpbWcgc3JjPVwiJHtleHByZXNzaW9uTGlzdC5wYXRoK3QudXJsfVwiIHRpdGxlPVwiJHt0LmFjdGlvbkRhdGF9XCIgYWx0PVwiXCI+PC9saT5gO1xyXG59KSk7XHJcblxyXG4vL+S4tOaXtuiHquWKqOeZu+W9leeahFxyXG5pZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudHVzZXJpbmZvJykpe1xyXG4gICAgdXNlckxvZ2luKEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnR1c2VyaW5mbycpKS51c2VybmFtZSk7XHJcbn1cclxuLy/nlKjmiLfnmbvpmYZcclxuJGxvZ2luX2J0bi5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgdXNlcm5hbWUgPSAkbG9naW5fdXNlcm5hbWUudmFsKCk7XHJcbiAgICBsZXQgcGFzc3dvcmQgPSAkbG9naW5fcGFzcy52YWwoKTtcclxuICAgIGlmKC9eW2Etel1bYS16XzAtOV0qJC8udGVzdCh1c2VybmFtZSkpe1xyXG4gICAgICAgIHVzZXJMb2dpbih1c2VybmFtZSwgcGFzc3dvcmQpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8v5pyA5aSn5YyW5oyJ6ZKu54K55Ye7XHJcbiQoJy5zY2FsZWNoYXQnKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAkeXlpbV9tYWluLmhhc0NsYXNzKCdtYXh3aW5kb3cnKSA/ICR5eWltX21haW4ucmVtb3ZlQ2xhc3MoJ21heHdpbmRvdycpIDogJHl5aW1fbWFpbi5hZGRDbGFzcygnbWF4d2luZG93Jyk7XHJcbiAgICAkeXlpbV9tYWluLmNzcyh7bGVmdDogJzAnLCB0b3A6ICcwJ30pO1xyXG59KTtcclxuXHJcbi8v5YWz6Zet56qX5Y+j5oyJ6ZKu54K55Ye7XHJcbiQoJy5jbG9zZWNoYXQnKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcclxuICAgICR5eWltX2JveC5oaWRlKCk7XHJcbiAgICAkeXlpbV9pb2dpbi5zaG93KCk7XHJcbn0pO1xyXG5cclxuLy/np7vliqjkuovku7ZcclxuJGpfbW92ZS5vbignbW91c2Vkb3duJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIGxldCBvcmlnaW5YID0gZS5jbGllbnRYO1xyXG4gICAgbGV0IG9yaWdpblkgPSBlLmNsaWVudFk7XHJcbiAgICBsZXQgYm94UG9zID0gJHl5aW1fbWFpbi5wb3NpdGlvbigpO1xyXG4gICAgJHl5aW1fYm94Lm9uKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICR5eWltX21haW4uY3NzKHtsZWZ0OiAoYm94UG9zLmxlZnQgKyBlLmNsaWVudFggLSBvcmlnaW5YKSArICdweCcsIHRvcDogKGJveFBvcy50b3AgKyBlLmNsaWVudFkgLSBvcmlnaW5ZKSArICdweCd9KTtcclxuICAgIH0pO1xyXG59KTtcclxuJHl5aW1fYm94Lm9uKCdtb3VzZXVwJywgZnVuY3Rpb24gKCkge1xyXG4gICAgJCh0aGlzKS5vZmYoJ21vdXNlbW92ZScpO1xyXG59KTtcclxuXHJcblxyXG4vL+aQnOe0ouWlveWPi1xyXG4kKCcueXlpbS1zZWFyY2gnKS5vbigna2V5ZG93bicsZnVuY3Rpb24gKGUpIHtcclxuICAgIGxldCBrZXl3b3JkID0gJCh0aGlzKS52YWwoKTtcclxuICAgIGlmKGUua2V5Q29kZSA9PT0gMTMgJiYga2V5d29yZCl7XHJcbiAgICAgICAgLy9cclxuICAgICAgICBZWUlNQ2hhdC5nZXRSb3N0ZXJJdGVtcyh7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04ucGFyc2UocmVzKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vL+eCueWHu+acgOi/keiBlOezu+S6ulxyXG4kaGNvbnRhY3RzLm9uKCdjbGljaycsJ2xpJyxmdW5jdGlvbiAoKSB7XHJcbiAgICAkY2hhdHNfbGlzdC5odG1sKCcnKTtcclxuICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgJCh0aGlzKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICRqX21vdmUuaHRtbCgkKHRoaXMpLmF0dHIoJ2RhdGEtbmlja25hbWUnKSk7XHJcbiAgICAvL+aKiumAieaLqeeahOiBiuWkqeWvueaWuWlk5L+d5a2Y6LW35p2lLOeUqOS6jue7meS7luWPkemAgea2iOaBr1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RhcmdldHVzZXJpZCcsICQodGhpcykuYXR0cignZGF0YS1pZCcpKTtcclxuICAgIC8v5Yig6Zmk5L+d5a2Y55qE6IGK5aSp5Y6G5Y+yXHJcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnaGlzdG9yeWNoYXRzJyk7XHJcbiAgICAvL+iOt+WPluWOhuWPsuiBiuWkqeS/oeaBr1xyXG4gICAgZ2V0SGlzdG9yeU1lc3NhZ2UoJCh0aGlzKS5hdHRyKCdkYXRhLXNlc3Npb25WZXJzaW9uJyksICQodGhpcykuYXR0cignZGF0YS1pZCcpLCAkKHRoaXMpLmF0dHIoJ2RhdGEtdHlwZScpKTtcclxufSk7XHJcblxyXG4vL+WFs+mXreiBlOezu+S6uueCueWHu1xyXG4kaGNvbnRhY3RzLm9uKCdjbGljaycsJy5jbG9zZScsZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc29sZS5sb2coJ+WFs+mXrScrICQodGhpcykuYXR0cignZGF0YS1pZCcpKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxufSk7XHJcblxyXG4vL+afpeeci+iBiuWkqea2iOaBr+WbvueJh1xyXG4kY2hhdHNfbGlzdC5vbignY2xpY2snLCAnLmNoYXRwaWMnLCBmdW5jdGlvbigpe1xyXG4gICAgbGV0IHBpY3VybCA9ICQodGhpcykuYXR0cignZGF0YS11cmwnKTtcclxuICAgICRwaWN2aWV3ZXIuaHRtbCgnPGxpPjxpbWcgZGF0YS1vcmlnaW5hbD1cIicrIHBpY3VybCArJ1wiIHNyYz1cIicrIHBpY3VybCArJ1wiIGFsdD1cIlwiPjwvbGk+JylcclxuICAgIHBpY3ZpZXdlci5zaG93KHt1cmw6IHBpY3VybH0pO1xyXG59KTtcclxuXHJcblxyXG4vL+mZpOS6huiHquW3sSzngrnlh7vlhbbku5bpg6jliIbpmpDol4/ooajmg4XmoYZcclxuJCgnYm9keScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICRqX2JxX2JveC5oaWRlKCk7XHJcbn0pO1xyXG5cclxuLy/ooajmg4XmjInpkq7ngrnlh7tcclxuJCgnLmpfbWVudV9icScpLmhvdmVyKGZ1bmN0aW9uICgpIHtcclxuICAgICQodGhpcykuYWRkQ2xhc3MoJ2hvdmVyJyk7XHJcbiAgICAkKCcuYnFfdGlwJykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbn0sZnVuY3Rpb24gKCkge1xyXG4gICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaG92ZXInKTtcclxuICAgICQoJy5icV90aXAnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG59KS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAkal9icV9ib3gudG9nZ2xlKCk7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn0pO1xyXG5cclxuLy/ooajmg4Xngrnlh7tcclxuJGpfYnFfYm94Lm9uKCdjbGljaycsICdsaScsIGZ1bmN0aW9uICgpIHtcclxuICAgICR5eWltX2VkaXRvci52YWwoJHl5aW1fZWRpdG9yLnZhbCgpICsgJCh0aGlzKS5hdHRyKCdkYXRhLWNvZGUnKSk7XHJcbiAgICBpZigkeXlpbV9lZGl0b3IudmFsKCkpe1xyXG4gICAgICAgICRidG5fc2VuZC5yZW1vdmVDbGFzcygnYWRpdC1idG4tc2VuZC1kaXNhYmxlZCcpO1xyXG4gICAgfWVsc2Uge1xyXG4gICAgICAgICRidG5fc2VuZC5hZGRDbGFzcygnYWRpdC1idG4tc2VuZC1kaXNhYmxlZCcpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59KTtcclxuXHJcbi8v5Y+R6YCB5Zu+54mH5oyJ6ZKu54K55Ye7XHJcbiQoJy5qX21lbnVfdHAnKS5ob3ZlcihmdW5jdGlvbiAoKSB7XHJcbiAgICAkKHRoaXMpLmFkZENsYXNzKCdob3ZlcicpO1xyXG4gICAgJCgnLnRwX3RpcCcpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG59LGZ1bmN0aW9uICgpIHtcclxuICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2hvdmVyJyk7XHJcbiAgICAkKCcudHBfdGlwJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxufSkuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgJCgnI3VwbG9hZFBpYycpLmNsaWNrKCk7XHJcbn0pO1xyXG5cclxuJCgnI3VwbG9hZFBpYycpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xyXG4gICAgLy/ojrflj5blr7nor53kurppZFxyXG4gICAgbGV0IHRvID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RhcmdldHVzZXJpZCcpO1xyXG4gICAgWVlJTUNoYXQuc2VuZFBpYyh7XHJcbiAgICAgICAgZmlsZUlucHV0SWQ6J3VwbG9hZFBpYycsIC8v5paH5Lu25Z+faWQgXHJcbiAgICAgICAgLy8gZHJvcF9lbGVtZW50OiBbZHJvcElEXSwgLy/mi5bmi73kuIrkvKDlhYPntKBpZO+8jOaIluiAheaVsOe7hFxyXG4gICAgICAgIGNoYXRJbmZvOiBmdW5jdGlvbigpeyAvL+eUqOaIt+WPkemAgea2iOaBr+aXtuiOt+WPluWvueivneS6uuS/oeaBr1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdG86IHRvLCAvL+WvueivneS6umlkXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnY2hhdCcsIC8vY2hhdC9ncm91cGNoYXQvcHViYWNjb3VudFxyXG4gICAgICAgICAgICAgICAgZXh0ZW5kOiAnJyAvL+aJqeWxleWtl+autVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZmlsZUZpbHRlcmVkOiBmdW5jdGlvbigpe30sIC8v5paH5Lu26KKr5re75Yqg5Yiw5LiK5Lyg6Zif5YiXXHJcbiAgICAgICAgZmlsZVVwbG9hZGVkOiBmdW5jdGlvbigpe30sIC8v5LiK5Lyg6Zif5YiX5p+Q5LiA5Liq5paH5Lu25LiK5Lyg5a6M5q+VXHJcbiAgICAgICAgYmVmb3JlVXBsb2FkOiBmdW5jdGlvbigpe30sIC8v5paH5Lu25LiK5Lyg5LmL5YmN6Kem5Y+RXHJcbiAgICAgICAgc3VjY2VzczpmdW5jdGlvbihtc2cpe1xyXG4gICAgICAgICAgICAvL+a4suafk+WOhuWPsuS/oeaBr1xyXG4gICAgICAgICAgICByZW5kZXJIaXN0b3J5TWVzc2FnZShtc2cpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGVycil7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBwcm9ncmVzczogZnVuY3Rpb24ocHJvKXtcclxuICAgICAgICAgICAgLy/kuIrkvKDov5vluqZcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocHJvKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59KTtcclxuXHJcbi8v5paH5Lu25oyJ6ZKu54K55Ye7XHJcbiQoJy5qX21lbnVfd2onKS5ob3ZlcihmdW5jdGlvbiAoKSB7XHJcbiAgICAkKHRoaXMpLmFkZENsYXNzKCdob3ZlcicpO1xyXG4gICAgJCgnLndqX3RpcCcpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG59LGZ1bmN0aW9uICgpIHtcclxuICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2hvdmVyJyk7XHJcbiAgICAkKCcud2pfdGlwJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxufSkuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgJCgnI3VwbG9hZEZpbGUnKS5jbGljaygpO1xyXG59KTtcclxuXHJcbiQoJyN1cGxvYWRGaWxlJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XHJcbiAgICAvL+iOt+WPluWvueivneS6umlkXHJcbiAgICBsZXQgdG8gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGFyZ2V0dXNlcmlkJyk7XHJcbiAgICBZWUlNQ2hhdC5zZW5kRmlsZSh7XHJcbiAgICAgICAgZmlsZUlucHV0SWQ6J3VwbG9hZEZpbGUnLCAvL+aWh+S7tuWfn2lkIFxyXG4gICAgICAgIC8vIGRyb3BfZWxlbWVudDogW2Ryb3BJRF0sIC8v5ouW5ou95LiK5Lyg5YWD57SgaWTvvIzmiJbogIXmlbDnu4RcclxuICAgICAgICBjaGF0SW5mbzogZnVuY3Rpb24oKXsgLy/nlKjmiLflj5HpgIHmtojmga/ml7bojrflj5blr7nor53kurrkv6Hmga9cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHRvOiB0bywgLy/lr7nor53kurppZFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2NoYXQnLCAvL2NoYXQvZ3JvdXBjaGF0L3B1YmFjY291bnRcclxuICAgICAgICAgICAgICAgIGV4dGVuZDogJycgLy/mianlsZXlrZfmrrVcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZpbGVGaWx0ZXJlZDogZnVuY3Rpb24oKXt9LCAvL+aWh+S7tuiiq+a3u+WKoOWIsOS4iuS8oOmYn+WIl1xyXG4gICAgICAgIGZpbGVVcGxvYWRlZDogZnVuY3Rpb24oKXt9LCAvL+S4iuS8oOmYn+WIl+afkOS4gOS4quaWh+S7tuS4iuS8oOWujOavlVxyXG4gICAgICAgIGJlZm9yZVVwbG9hZDogZnVuY3Rpb24oKXt9LCAvL+aWh+S7tuS4iuS8oOS5i+WJjeinpuWPkVxyXG4gICAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24obXNnKXtcclxuICAgICAgICAgICAgLy/muLLmn5Pljoblj7Lkv6Hmga9cclxuICAgICAgICAgICAgcmVuZGVySGlzdG9yeU1lc3NhZ2UobXNnKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihlcnIpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcHJvZ3Jlc3M6IGZ1bmN0aW9uKHBybyl7XHJcbiAgICAgICAgICAgIC8v5LiK5Lyg6L+b5bqmXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHBybyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufSk7XHJcblxyXG5cclxuLy/mjqfliLbmmK/lkKblj6/ku6Xlj5HpgIFcclxuJHl5aW1fZWRpdG9yLm9uKCdpbnB1dCBwcm9wZXJ0eWNoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgIGlmKCQodGhpcykudmFsKCkpe1xyXG4gICAgICAgICRidG5fc2VuZC5yZW1vdmVDbGFzcygnYWRpdC1idG4tc2VuZC1kaXNhYmxlZCcpO1xyXG4gICAgfWVsc2Uge1xyXG4gICAgICAgICRidG5fc2VuZC5hZGRDbGFzcygnYWRpdC1idG4tc2VuZC1kaXNhYmxlZCcpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8v5Y+R6YCB5oyJ6ZKu54K55Ye7XHJcbiRidG5fc2VuZC5vbignY2xpY2snLGZ1bmN0aW9uICgpIHtcclxuICAgIGlmKCR5eWltX2VkaXRvci52YWwoKSl7XHJcbiAgICAgICAgLy/ku47mnKzlnLDmi7/lj5bogYrlpKnlr7nmlrlpZFxyXG4gICAgICAgIGxldCB0byA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0YXJnZXR1c2VyaWQnKTtcclxuICAgICAgICAvL+iwg+eUqOWPkemAgeaWh+acrOa2iOaBr+aOpeWPo1xyXG4gICAgICAgIFlZSU1DaGF0LnNlbmRUZXh0TWVzc2FnZSh7XHJcbiAgICAgICAgICAgIHRvOiB0bywgLy/lr7nor53kurppZFxyXG4gICAgICAgICAgICB0eXBlOiBcImNoYXRcIiwgIC8vY2hhdDrljZXogYrvvIxncm91cGNnYXQ6576k6IGKLHB1YmFjY291bnQ65YWs5LyX5Y+3XHJcbiAgICAgICAgICAgIGNvbnRlbnQ6JHl5aW1fZWRpdG9yLnZhbCgpLCAvL+a2iOaBr+aWh+acrFxyXG4gICAgICAgICAgICBleHRlbmQ6ICcnLCAgLy/mianlsZXlrZfmrrVcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKG1zZykge1xyXG4gICAgICAgICAgICAgICAgLy/lj5HpgIHmiJDlip/kuYvlkI7muIXnqbrovpPlhaXmoYZcclxuICAgICAgICAgICAgICAgICR5eWltX2VkaXRvci52YWwoJycpO1xyXG4gICAgICAgICAgICAgICAgJGJ0bl9zZW5kLmFkZENsYXNzKCdhZGl0LWJ0bi1zZW5kLWRpc2FibGVkJyk7XHJcbiAgICAgICAgICAgICAgICAvL+a4suafk+WOhuWPsuS/oeaBr1xyXG4gICAgICAgICAgICAgICAgcmVuZGVySGlzdG9yeU1lc3NhZ2UobXNnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8v5oyJ5LiLZW50ZXLkuZ/lj6/ku6Xlj5HpgIFcclxuJHl5aW1fZWRpdG9yLm9uKCdrZXlkb3duJyxmdW5jdGlvbihlKXtcclxuICAgIGlmKGUua2V5Q29kZSA9PT0gMTMgJiYgJHl5aW1fZWRpdG9yLnZhbCgpKXtcclxuICAgICAgICAvL+S7juacrOWcsOaLv+WPluiBiuWkqeWvueaWuWlkXHJcbiAgICAgICAgbGV0IHRvID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RhcmdldHVzZXJpZCcpO1xyXG4gICAgICAgIC8v6LCD55So5Y+R6YCB5paH5pys5raI5oGv5o6l5Y+jXHJcbiAgICAgICAgWVlJTUNoYXQuc2VuZFRleHRNZXNzYWdlKHtcclxuICAgICAgICAgICAgdG86IHRvLCAvL+WvueivneS6umlkXHJcbiAgICAgICAgICAgIHR5cGU6IFwiY2hhdFwiLCAgLy9jaGF0OuWNleiBiu+8jGdyb3VwY2dhdDrnvqTogYoscHViYWNjb3VudDrlhazkvJflj7dcclxuICAgICAgICAgICAgY29udGVudDokeXlpbV9lZGl0b3IudmFsKCksIC8v5raI5oGv5paH5pysXHJcbiAgICAgICAgICAgIGV4dGVuZDogJycsICAvL+aJqeWxleWtl+autVxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAobXNnKSB7XHJcbiAgICAgICAgICAgICAgICAvL+WPkemAgeaIkOWKn+S5i+WQjua4heepuui+k+WFpeahhlxyXG4gICAgICAgICAgICAgICAgJHl5aW1fZWRpdG9yLnZhbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAkYnRuX3NlbmQuYWRkQ2xhc3MoJ2FkaXQtYnRuLXNlbmQtZGlzYWJsZWQnKTtcclxuICAgICAgICAgICAgICAgIC8v5riy5p+T5Y6G5Y+y5L+h5oGvXHJcbiAgICAgICAgICAgICAgICByZW5kZXJIaXN0b3J5TWVzc2FnZShtc2cpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pIiwiLy9kb23lhYPntKBcclxuaW1wb3J0IHtcclxuICAgICRjaGF0X2JveCxcclxuICAgICRjaGF0c19saXN0XHJcbn0gZnJvbSAnLi9qcWVsZW1lbnRzJztcclxuXHJcbi8v5riy5p+T6IGK5aSp6K6w5b2VXHJcbmltcG9ydCByZW5kZXJIaXN0b3J5TWVzc2FnZSBmcm9tICcuL3JlbmRlckhpc3RvcnlNZXNzYWdlJztcclxuXHJcbi8v6I635Y+W6IGK5aSp5Y6G5Y+yLOS8oOWFpXNlc3Npb25WZXJzaW9uLOWvueaWuWlk5ZKMdHlwZeWPguaVsFxyXG5leHBvcnQgZGVmYXVsdCAoc2Vzc2lvblZlcnNpb24sIGlkLCB0eXBlKSA9PiB7XHJcbiAgICBsZXQgZW5kVmVyc2lvbiA9IHNlc3Npb25WZXJzaW9uO1xyXG4gICAgbGV0IHN0YXJ0ID0gZW5kVmVyc2lvbiA+IDIwID8gZW5kVmVyc2lvbiAtIDIwIDogMDtcclxuICAgIC8v6I635Y+W5Y6G5Y+y6IGK5aSp5L+h5oGvXHJcbiAgICBZWUlNQ2hhdC5nZXRIaXN0b3J5TWVzc2FnZSh7XHJcbiAgICAgICAgaWQ6IGlkLFxyXG4gICAgICAgIHR5cGU6IHR5cGUsXHJcbiAgICAgICAgc3RhcnRWZXJzaW9uOiBzdGFydCxcclxuICAgICAgICBlbmRWZXJzaW9uOiBlbmRWZXJzaW9uLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgbGV0IGhpc3RvcnljaGF0cyA9IHJlcy5yZXN1bHQgfHwgW107XHJcbiAgICAgICAgICAgICRjaGF0X2JveC5zaG93KCk7XHJcbiAgICAgICAgICAgIGhpc3RvcnljaGF0cy5yZXZlcnNlKCk7XHJcbiAgICAgICAgICAgIC8v5oqK6IGK5aSp6K6w5b2V57yT5a2Y5Yiw5pys5ZywXHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdoaXN0b3J5Y2hhdHMnLCBKU09OLnN0cmluZ2lmeShoaXN0b3J5Y2hhdHMpKTtcclxuICAgICAgICAgICAgLy/muLLmn5PogYrlpKnkv6Hmga9cclxuICAgICAgICAgICAgcmVuZGVySGlzdG9yeU1lc3NhZ2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTsiLCJcclxuLy/lr7zlhaXmnIDov5HogZTns7vkurrmuLLmn5Plh73mlbBcclxuaW1wb3J0IHJlbmRlclJlY2VudERpZ3NldCBmcm9tICcuL3JlbmRlclJlY2VudERpZ3NldCc7XHJcblxyXG4vL+iOt+WPluacgOi/keiBlOezu+S6ulxyXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XHJcbiAgICAvLyDojrflj5bmnIDov5HogZTns7vkurpBUElcclxuICAgIFlZSU1DaGF0LmdldFJlY2VudERpZ3NldCh7XHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0Lmxpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVjZW50RGlnc2V0ID0gW107XHJcbiAgICAgICAgICAgICAgICByZXN1bHQubGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGUsIGkpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8v55uu5YmN5rWL6K+V5Y+q5pi+56S65Liq5Lq66IGK5aSp77yM5LiN5pi+56S6576k5oiW5YW25LuWIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGUudHlwZSAhPT0gJ2NoYXQnKXtyZXR1cm47fVxyXG4gICAgICAgICAgICAgICAgICAgIC8v6YCa6L+HaWTojrflj5bkuKrkurrkv6Hmga9cclxuICAgICAgICAgICAgICAgICAgICBZWUlNQ2hhdC5nZXRWQ2FyZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBlLmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/mlbTnkIbmnIDov5HogZTns7vkurrliJfooajliLDkuIDkuKrmlrDmlbDnu4RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY2VudERpZ3NldC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogcmVzLmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRlZFZlcnNpb246IGUucmVhZGVkVmVyc2lvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXNzaW9uVmVyc2lvbjogZS5zZXNzaW9uVmVyc2lvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBlLnR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGhvdG86IHJlcy5waG90byB8fCAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuaWNrbmFtZTogcmVzLm5pY2tuYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RNZXNzYWdlOiBlLmxhc3RNZXNzYWdlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RDb250YWN0VGltZTogZS5sYXN0Q29udGFjdFRpbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/miormnIDov5HogZTns7vkurrliJfooajkv53lrZjliLDmnKzlnLBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyZWNlbnRkaWdzZXQnLCBKU09OLnN0cmluZ2lmeShyZWNlbnREaWdzZXQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlclJlY2VudERpZ3NldChyZWNlbnREaWdzZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6ZnVuY3Rpb24gKGVycil7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0iLCJcclxuZXhwb3J0IGNvbnN0ICR5eWltX2lvZ2luID0gJCgnLnl5aW0taW9naW4nKTsvL+eZu+mZhuahhlxyXG5leHBvcnQgY29uc3QgJGxvZ2luX3VzZXJuYW1lID0gJCgnLmxvZ2luLXVzZXJuYW1lJyk7Ly/nmbvpmYbnlKjmiLflkI1cclxuZXhwb3J0IGNvbnN0ICRsb2dpbl9wYXNzID0gJCgnLmxvZ2luLXBhc3MnKTsvL+eZu+mZhueUqOaIt+WvhueggVxyXG5leHBvcnQgY29uc3QgJGxvZ2luX2J0biA9ICQoJy5sb2dpbi1idG4nKTsvL+eZu+mZhuaMiemSrlxyXG5leHBvcnQgY29uc3QgJHl5aW1fYm94ID0gJCgnLnl5aW0tYm94Jyk7Ly/ogYrlpKnmoYbnmoTpga7nvalcclxuZXhwb3J0IGNvbnN0ICR5eWltX21haW4gPSAkKCcueXlpbS1tYWluJyk7Ly/ogYrlpKnmnIDlpJblsYLnqpflj6NcclxuZXhwb3J0IGNvbnN0ICRqX21vdmUgPSAkKCcual9tb3ZlJyk7Ly/ogYrlpKnnqpflj6PlpLRcclxuZXhwb3J0IGNvbnN0ICRoY29udGFjdHMgPSAkKCcuaGNvbnRhY3RzJyk7Ly/mnIDov5HogZTns7vkurrmoYZcclxuZXhwb3J0IGNvbnN0ICRjaGF0cyA9ICQoJy5jaGF0cycpOy8v6IGK5aSp5L+h5oGv5ruR5Yqo5a655ZmoXHJcbmV4cG9ydCBjb25zdCAkal9icV9ib3ggPSAkKCcual9icV9ib3gnKTsvL+ihqOaDheebkuWtkFxyXG5leHBvcnQgY29uc3QgJHl5aW1fZWRpdG9yID0gJCgnLnl5aW0tZWRpdG9yJyk7Ly/ogYrlpKnovpPlhaXmoYZcclxuZXhwb3J0IGNvbnN0ICRidG5fc2VuZCA9ICQoJy5hZGl0LWJ0bi1zZW5kJyk7IC8v5Y+R6YCB5oyJ6ZKuXHJcbmV4cG9ydCBjb25zdCAkY2hhdF9ib3ggPSAkKCcuY2hhdC1ib3gnKTsgLy/mjqfliLbmmK/lkKblhbfmnInogYrlpKnlhoXlrrlcclxuZXhwb3J0IGNvbnN0ICRjaGF0c19saXN0ID0gJCgnLmNoYXRzLWxpc3QnKTsgLy/ogYrlpKnkv6Hmga/liJfooahcclxuZXhwb3J0IGNvbnN0ICRwaWN2aWV3ZXIgPSAkKCcjcGljdmlld2VyJyk7IC8v5Zu+54mH5p+l55yL5qGGXHJcblxyXG4vL+WunuS+i+WMlnZpZXdlclxyXG5leHBvcnQgY29uc3QgcGljdmlld2VyID0gbmV3IFZpZXdlcigkcGljdmlld2VyWzBdLCB7bmF2YmFyOmZhbHNlLCB0aXRsZTogZmFsc2V9KTtcclxuLy8gdmlld2VyLnNob3coe1xyXG4vLyAgICAgdXJsOiAnaHR0cHM6Ly93d3cuYmFpZHUuY29tL2ltZy9iZF9sb2dvMS5wbmcnXHJcbi8vIH0pXHJcbi8vICRwaWN2aWV3ZXIudmlld2VyKHtcclxuLy8gICAgIHVybDogJ2h0dHBzOi8vd3d3LmJhaWR1LmNvbS9pbWcvYmRfbG9nbzEucG5nJywgLy/orr7nva7lpKflm77niYfnmoQgdXJsXHJcbi8vICAgICBuYXZiYXI6dHJ1ZSwgLy/mmK/lkKbmmL7npLrnvKnnlaXlm77lr7zoiKpcclxuLy8gICAgIHRvb2xiYXI6dHJ1ZSwgLy/mmL7npLrlt6XlhbfmoI9cclxuLy8gICAgIHRpdGxlOnRydWUsIC8v5pi+56S65b2T5YmN5Zu+54mH5qCH6aKYKGFsdOWxnuaAp+WSjOWwuuWvuClcclxuLy8gICAgIHRvb2x0aXA6dHJ1ZSwgLy/mmL7npLrnvKnmlL7nmb7liIbmr5RcclxuLy8gICAgIG1vdmFibGU6dHJ1ZSwgLy/lm77niYfmmK/lkKblj6/np7vliqhcclxuLy8gICAgIHpvb21hYmxlOnRydWUsIC8v5Zu+54mH5piv5ZCm5Y+v57yp5pS+XHJcbi8vICAgICByb3RhdGFibGU6dHJ1ZSwgLy/lm77niYfmmK/lkKblj6/ml4vovaxcclxuLy8gICAgIHNjYWxhYmxlOnRydWUsIC8v5Zu+54mH5piv5ZCm5Y+v57+76L2sXHJcbi8vICAgICB0cmFuc2l0aW9uOnRydWUsIC8v5L2/55SoIENTUzMg6L+H5bqmXHJcbi8vICAgICBmdWxsc2NyZWVuOnRydWUsIC8v5pKt5pS+5pe25piv5ZCm5YWo5bGPXHJcbi8vICAgICBrZXlib2FyZDp0cnVlLCAvL+aYr+WQpuaUr+aMgemUruebmFxyXG4vLyAgICAgaW50ZXJ2YWw6NTAwMCwgLy/mkq3mlL7pl7TpmpTvvIzljZXkvY3kuLrmr6vnp5JcclxuLy8gICAgIHpvb21SYXRpbzowLjEsIC8v6byg5qCH5rua5Yqo5pe255qE57yp5pS+5q+U5L6LXHJcbi8vICAgICBtaW5ab29tUmF0aW86MC4wMSwgLy/mnIDlsI/nvKnmlL7mr5TkvotcclxuLy8gICAgIG1heFpvb21SYXRpbzoxMDAsIC8v5pyA5aSn57yp5pS+5q+U5L6LXHJcbi8vICAgICB6SW5kZXg6MjAxNSwgLy/orr7nva7lm77niYfmn6XnnIvlmaggbW9kYWwg5qih5byP5pe255qEIHotaW5kZXhcclxuLy8gICAgIHpJbmRleElubGluZTowLCAvL+iuvue9ruWbvueJh+afpeeci+WZqCBpbmxpbmUg5qih5byP5pe255qEIHotaW5kZXhcclxuLy8gfSkuc2hvdygpOyIsIlxyXG4vL2RvbeWFg+e0oFxyXG5pbXBvcnQge1xyXG4gICAgJGNoYXRzLFxyXG4gICAgJGNoYXRzX2xpc3RcclxufSBmcm9tICcuL2pxZWxlbWVudHMnO1xyXG5cclxuLy/muLLmn5PmnIDov5HogZTns7vkurrlh73mlbBcclxuaW1wb3J0IGdldFJlY2VudERpZ3NldCBmcm9tICcuL2dldFJlY2VudERpZ3NldCc7XHJcblxyXG4vL+a4suafk+acgOi/keiBlOezu+S6uuWHveaVsFxyXG5pbXBvcnQgcmVuZGVyUmVjZW50RGlnc2V0IGZyb20gJy4vcmVuZGVyUmVjZW50RGlnc2V0JztcclxuXHJcbi8v6KGo5oOF5pWw5o2uXHJcbmltcG9ydCB7IGV4cHJlc3Npb25MaXN0IH0gZnJvbSAnLi9jb25zdGFudHMnO1xyXG5cclxuLy/nlKjlm77niYfmm7/mjaLmlofmnKzmtojmga/kuK3ooajmg4Xkv6Hmga9cclxuY29uc3QgcmVwbGFjZUVtb2ppID0gKHN0cikgPT4ge1xyXG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXFtbXlxcW1xcXV0rXFxdL2csKGUpID0+IHtcclxuICAgICAgICBmb3IgKGxldCBpPTA7aTxleHByZXNzaW9uTGlzdC5kYXRhLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICBpZihleHByZXNzaW9uTGlzdC5kYXRhW2ldLmFjdGlvbkRhdGEgPT09IGUpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGA8aW1nIGNsYXNzPVwiZW1vamlcIiBzcmM9XCIke2V4cHJlc3Npb25MaXN0LnBhdGggKyBleHByZXNzaW9uTGlzdC5kYXRhW2ldLnVybH1cIiBhbHQ9XCJcIiAvPmA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuLy/muLLmn5PogYrlpKnorrDlvZUs5Lyg5YWl5LiA5p2h6IGK5aSp6K6w5b2V5a+56LGh5Y2z5Y+vXHJcbmV4cG9ydCBkZWZhdWx0IChtc2cpID0+IHtcclxuICAgIC8v5ou/5Y+W5pys5Zyw5L+d5a2Y55qE5Y6G5Y+y6IGK5aSp5L+h5oGvXHJcbiAgICBsZXQgaGlzdG9yeWNoYXRzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaGlzdG9yeWNoYXRzJykgfHwgXCJbXVwiKTtcclxuICAgIC8v5LuO5pys5Zyw5ou/5Y+W6IGK5aSp5a+55pa5aWRcclxuICAgIGxldCB0YXJnZXR1c2VyaWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGFyZ2V0dXNlcmlkJyk7XHJcbiAgICAvL+aLv+aIkeiHquW3seeahGlkXHJcbiAgICBsZXQgbXlpZCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnR1c2VyaW5mbycpKS5pZDtcclxuXHJcbiAgICAvL+WmguaenG1zZ+WtmOWcqO+8jOivtOaYjuS4jeaYr+WIneasoea4suafk1xyXG4gICAgaWYobXNnKXtcclxuICAgICAgICAvL+aLv+WPluacrOWcsOS/neWtmOeahOacgOi/keiBlOezu+S6uuaVsOe7hFxyXG4gICAgICAgIGxldCByZWNlbnREaWdzZXQgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdyZWNlbnRkaWdzZXQnKSB8fCBcIltdXCIpO1xyXG5cclxuICAgICAgICBpZihtc2cuZnJvbSA9PT0gbXlpZCl7IC8v5raI5oGv5piv5oiR5Y+R57uZ5Yir5Lq655qEXHJcbiAgICAgICAgICAgIHJlY2VudERpZ3NldC5mb3JFYWNoKGZ1bmN0aW9uKGRpZ2VzdCwgaSl7XHJcbiAgICAgICAgICAgICAgICBpZihkaWdlc3QuaWQgPT09IHRhcmdldHVzZXJpZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVjZW50RGlnc2V0W2ldLmxhc3RDb250YWN0VGltZSA9IG1zZy5kYXRhLmRhdGVsaW5lO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlY2VudERpZ3NldFtpXS5sYXN0TWVzc2FnZSA9IG1zZztcclxuICAgICAgICAgICAgICAgICAgICAvL+S/neWtmOS/ruaUueWQjueahOacgOi/keiBlOezu+S6uuaVsOe7hFxyXG4gICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyZWNlbnRkaWdzZXQnLCBKU09OLnN0cmluZ2lmeShyZWNlbnREaWdzZXQpKTtcclxuICAgICAgICAgICAgICAgICAgICAvL+a4suafk+acgOi/keiBlOezu+S6ulxyXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlclJlY2VudERpZ3NldChyZWNlbnREaWdzZXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy/kv67mlLnljoblj7Lmtojmga9cclxuICAgICAgICAgICAgaGlzdG9yeWNoYXRzLnB1c2gobXNnKTtcclxuICAgICAgICAgICAgLy/kv67mlLnlkI7kv53lrZhcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2hpc3RvcnljaGF0cycsSlNPTi5zdHJpbmdpZnkoaGlzdG9yeWNoYXRzKSk7XHJcbiAgICAgICAgfSBlbHNlIHsgLy/mtojmga/mnaXoh6rkuo7ku5bkurrnu5nmiJHlj5HnmoRcclxuICAgICAgICAgICAgbGV0IGlzZGlnc2V0ID0gZmFsc2U7IC8v5Yik5pat5a+55pa55Zyo5LiN5Zyo5oiR55qE5pyA6L+R6IGU57O75Lq66YeMXHJcbiAgICAgICAgICAgIHJlY2VudERpZ3NldC5mb3JFYWNoKGZ1bmN0aW9uKGRpZ2VzdCwgaSl7XHJcbiAgICAgICAgICAgICAgICBpZihkaWdlc3QuaWQgPT09IG1zZy5mcm9tKXtcclxuICAgICAgICAgICAgICAgICAgICBpc2RpZ3NldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVjZW50RGlnc2V0W2ldLmxhc3RDb250YWN0VGltZSA9IG1zZy5kYXRhLmRhdGVsaW5lO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlY2VudERpZ3NldFtpXS5sYXN0TWVzc2FnZSA9IG1zZztcclxuICAgICAgICAgICAgICAgICAgICAvL+S/neWtmOS/ruaUueWQjueahOacgOi/keiBlOezu+S6uuaVsOe7hFxyXG4gICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyZWNlbnRkaWdzZXQnLCBKU09OLnN0cmluZ2lmeShyZWNlbnREaWdzZXQpKTtcclxuICAgICAgICAgICAgICAgICAgICAvL+a4suafk+acgOi/keiBlOezu+S6ulxyXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlclJlY2VudERpZ3NldChyZWNlbnREaWdzZXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy/kuI3lnKjmnIDov5HogZTns7vkurrkuK3vvIzliLfmlrDmnIDov5HogZTns7vkurrliJfooahcclxuICAgICAgICAgICAgaWYoIWlzZGlnc2V0KXtnZXRSZWNlbnREaWdzZXQoKTt9XHJcbiAgICAgICAgICAgIC8v5oiR5q2j5Zyo5ZKM5LuW6IGK5aSpXHJcbiAgICAgICAgICAgIGlmKG1zZy5mcm9tID09PSB0YXJnZXR1c2VyaWQpe1xyXG4gICAgICAgICAgICAgICAgLy/kv67mlLnljoblj7Lmtojmga9cclxuICAgICAgICAgICAgICAgIGhpc3RvcnljaGF0cy5wdXNoKG1zZyk7XHJcbiAgICAgICAgICAgICAgICAvL+S/ruaUueWQjuS/neWtmFxyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2hpc3RvcnljaGF0cycsSlNPTi5zdHJpbmdpZnkoaGlzdG9yeWNoYXRzKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WmguaenOaIkeayoeWSjOWvueaWueiBiuWkqe+8jOWImeS4jea4suafk+WOhuWPsuS/oeaBr1xyXG4gICAgaWYobXNnICYmIG1zZy5mcm9tICE9PSBteWlkICYmIG1zZy5mcm9tICE9PSB0YXJnZXR1c2VyaWQpIHJldHVybjtcclxuXHJcbiAgICBsZXQgY2hhdHNTdHIgPSAnJztcclxuICAgIGhpc3RvcnljaGF0cy5mb3JFYWNoKGZ1bmN0aW9uKGNoYXQsIGkpe1xyXG4gICAgICAgIGxldCBpc2Zyb21tZSA9IG15aWQgPT09IGNoYXQuZnJvbTtcclxuICAgICAgICAvL+aWh+acrOa2iOaBr1xyXG4gICAgICAgIGlmKGNoYXQuZGF0YS5jb250ZW50VHlwZSA9PT0gMil7XHJcbiAgICAgICAgICAgIGNoYXRzU3RyICs9IGA8bGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hhdC10aXBcIj4ke25ldyBEYXRlKGNoYXQuZGF0YS5kYXRlbGluZSkudG9Mb2NhbGVUaW1lU3RyaW5nKCl9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hhdC1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiR7IGlzZnJvbW1lPyAnY2hhdC1hdmF0YXIgY2hhdC1hdmF0YXItc2VuZCcgOidjaGF0LWF2YXRhcid9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9pbWdzL2F2YXRhci5qcGdcIiBhbHQ9XCJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHsgaXNmcm9tbWU/ICdjaGF0LXR4dCBjaGF0LXR4dC1zZW5kJyA6J2NoYXQtdHh0J31cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTxkaXYgY2xhc3M9XCJjaGF0LXVzZXItbmFtZVwiPiR7Y2hhdC5mcm9tfTwvZGl2Pi0tPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hhdC1tc2dcIj4ke3JlcGxhY2VFbW9qaShjaGF0LmRhdGEuY29udGVudCl9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT4gYDtcclxuICAgICAgICB9ZWxzZSBpZihjaGF0LmRhdGEuY29udGVudFR5cGUgPT09IDgpeyAgLy/lm77niYfmtojmga9cclxuICAgICAgICAgICAgbGV0IHBpY3VybCA9IFlZSU1DaGF0LmdldEZpbGVVcmwoY2hhdC5kYXRhLmNvbnRlbnQuYXR0YWNoSWQpO1xyXG4gICAgICAgICAgICBjaGF0c1N0ciArPSBgPGxpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoYXQtdGlwXCI+JHtuZXcgRGF0ZShjaGF0LmRhdGEuZGF0ZWxpbmUpLnRvTG9jYWxlVGltZVN0cmluZygpfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoYXQtY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCIkeyBpc2Zyb21tZT8gJ2NoYXQtYXZhdGFyIGNoYXQtYXZhdGFyLXNlbmQnIDonY2hhdC1hdmF0YXInfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vaW1ncy9hdmF0YXIuanBnXCIgYWx0PVwiXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiR7IGlzZnJvbW1lPyAnY2hhdC10eHQgY2hhdC10eHQtc2VuZCcgOidjaGF0LXR4dCd9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08ZGl2IGNsYXNzPVwiY2hhdC11c2VyLW5hbWVcIj4ke2NoYXQuZnJvbX08L2Rpdj4tLT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoYXQtbXNnXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwiY2hhdHBpY1wiIGRhdGEtdXJsPVwiJHtwaWN1cmx9XCIgc3JjPVwiJHtwaWN1cmx9XCIgdGl0bGU9XCLngrnlh7vmn6XnnIvlm77niYdcIiBhbHQ9XCJcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPiBgO1xyXG4gICAgICAgIH1lbHNlIGlmKGNoYXQuZGF0YS5jb250ZW50VHlwZSA9PT0gNCl7XHJcbiAgICAgICAgICAgIGxldCBwaWN1cmwgPSBZWUlNQ2hhdC5nZXRGaWxlVXJsKGNoYXQuZGF0YS5jb250ZW50LmF0dGFjaElkKTtcclxuICAgICAgICAgICAgbGV0IGZpbGVuYW1lID0gY2hhdC5kYXRhLmNvbnRlbnQubmFtZS5zbGljZSgwLCAyMCk7XHJcbiAgICAgICAgICAgIGNoYXRzU3RyICs9IGA8bGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hhdC10aXBcIj4ke25ldyBEYXRlKGNoYXQuZGF0YS5kYXRlbGluZSkudG9Mb2NhbGVUaW1lU3RyaW5nKCl9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hhdC1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiR7IGlzZnJvbW1lPyAnY2hhdC1hdmF0YXIgY2hhdC1hdmF0YXItc2VuZCcgOidjaGF0LWF2YXRhcid9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9pbWdzL2F2YXRhci5qcGdcIiBhbHQ9XCJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHsgaXNmcm9tbWU/ICdjaGF0LXR4dCBjaGF0LXR4dC1zZW5kJyA6J2NoYXQtdHh0J31cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLTxkaXYgY2xhc3M9XCJjaGF0LXVzZXItbmFtZVwiPiR7Y2hhdC5mcm9tfTwvZGl2Pi0tPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hhdC1tc2dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwiY2hhdGZpbGVcIiBocmVmPVwiJHtwaWN1cmx9XCIgdGl0bGU9XCLngrnlh7vkuIvovb3mlofku7ZcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZpbGVuYW1lXCI+JHtmaWxlbmFtZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmaWxlc2l6ZVwiPiR7Y2hhdC5kYXRhLmNvbnRlbnQuc2l6ZX1CPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPiBgO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgJGNoYXRzX2xpc3QuaHRtbChjaGF0c1N0cik7XHJcbiAgICAkY2hhdHMuc2Nyb2xsVG9wKCRjaGF0c1swXS5zY3JvbGxIZWlnaHQpO1xyXG59OyIsIlxyXG4vL2RvbeWFg+e0oFxyXG5pbXBvcnQge1xyXG4gICAgJGhjb250YWN0c1xyXG59IGZyb20gJy4vanFlbGVtZW50cyc7XHJcbi8v6KGo5oOF5pWw5o2uXHJcbmltcG9ydCB7IGV4cHJlc3Npb25MaXN0IH0gZnJvbSAnLi9jb25zdGFudHMnO1xyXG5cclxuLy/nlKjlm77niYfmm7/mjaLmlofmnKzmtojmga/kuK3ooajmg4Xkv6Hmga9cclxuY29uc3QgcmVwbGFjZUVtb2ppID0gKHN0cikgPT4ge1xyXG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXFtbXlxcW1xcXV0rXFxdL2csKGUpID0+IHtcclxuICAgICAgICBmb3IgKGxldCBpPTA7aTxleHByZXNzaW9uTGlzdC5kYXRhLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICBpZihleHByZXNzaW9uTGlzdC5kYXRhW2ldLmFjdGlvbkRhdGEgPT09IGUpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGA8aW1nIGNsYXNzPVwiZW1vamlcIiBzcmM9XCIke2V4cHJlc3Npb25MaXN0LnBhdGggKyBleHByZXNzaW9uTGlzdC5kYXRhW2ldLnVybH1cIiBhbHQ9XCJcIiAvPmA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgKGRpZ3NldHMpID0+IHtcclxuICAgIC8v5ou/5Y+W6IGK5aSp5a+55pa5aWRcclxuICAgIGxldCB0YXJnZXR1c2VyaWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGFyZ2V0dXNlcmlkJyk7XHJcbiAgICBsZXQgZGlnU3RyID0gJyc7XHJcbiAgICBkaWdzZXRzLnNvcnQoZnVuY3Rpb24oYSwgYil7cmV0dXJuIGIubGFzdENvbnRhY3RUaW1lIC0gYS5sYXN0Q29udGFjdFRpbWV9KTtcclxuICAgIGRpZ3NldHMuZm9yRWFjaChmdW5jdGlvbihyZXMpe1xyXG4gICAgICAgIGxldCBsYXN0bXNnID0gcmVzLmxhc3RNZXNzYWdlLCBsYXN0bXNnU3RyID0gJyc7XHJcbiAgICAgICAgaWYobGFzdG1zZyl7XHJcbiAgICAgICAgICAgIHN3aXRjaChsYXN0bXNnLmRhdGEuY29udGVudFR5cGUpe1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOiBsYXN0bXNnU3RyID0gcmVzLmxhc3RNZXNzYWdlLmRhdGEuY29udGVudDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IGxhc3Rtc2dTdHIgPSAnW+aWh+S7tua2iOaBr10nOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgODogbGFzdG1zZ1N0ciA9ICdb5Zu+54mH5raI5oGvXSc7YnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZGlnU3RyICs9IGA8bGkgY2xhc3M9XCIke3RhcmdldHVzZXJpZCAmJiB0YXJnZXR1c2VyaWQgPT09IHJlcy5pZCA/ICdhY3RpdmUnIDogJyd9XCIgZGF0YS1zZXNzaW9uVmVyc2lvbj1cIiR7cmVzLnNlc3Npb25WZXJzaW9ufVwiIGRhdGEtaWQ9XCIke3Jlcy5pZH1cIiBkYXRhLXR5cGU9XCIke3Jlcy50eXBlfVwiIGRhdGEtbmlja25hbWU9XCIke3Jlcy5uaWNrbmFtZSB8fCByZXMuaWR9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGkgZGF0YS1pZD1cIiR7cmVzLmlkfVwiIGNsYXNzPVwiY2xvc2VcIj7DlzwvaT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXZhdGFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtZWUlNQ2hhdC5nZXRGaWxlVXJsKHJlcy5waG90bykgfHwgJy4vaW1ncy9hdmF0YXIuanBnJ31cIiBhbHQ9XCJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGV0YWlsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cIm5hbWUgY3V0dHh0XCI+JHtyZXMubmlja25hbWUgfHwgcmVzLmlkfTwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwibXNnIGN1dHR4dFwiPiR7cmVwbGFjZUVtb2ppKGxhc3Rtc2dTdHIpfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cIm5ld3RpcCBjdXR0eHRcIj4yPC9pPlxyXG4gICAgICAgICAgICAgICAgPC9saT5gO1xyXG4gICAgfSk7XHJcbiAgICAkaGNvbnRhY3RzLmh0bWwoZGlnU3RyKTtcclxufSIsIi8v5YWD57SgXHJcbmltcG9ydCB7ICR5eWltX2lvZ2luLCAkeXlpbV9ib3ggfSBmcm9tICcuL2pxZWxlbWVudHMnO1xyXG5cclxuLy/nlKjmiLfnmbvpmYZcclxuZXhwb3J0IGRlZmF1bHQgKHVzZXJuYW1lLCBwYXNzd29yZCkgPT4ge1xyXG4gICAgLy/mraPlvI/njq/looNcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnaHR0cHM6Ly9pbS55eXVhcC5jb20vc3lzYWRtaW4vcmVzdC95b255b3UvdWRuL3Rva2VuJyxcclxuICAgICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICBoZWFkZXJzOiB7XCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJ9LFxyXG4gICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgXCJ1c2VybmFtZVwiOnVzZXJuYW1lLFxyXG4gICAgICAgICAgICBcImNsaWVudElkXCI6XCJjODUxMzBhYzJjODBkODNiODZmYzFiYzM0NGFjMTIxMVwiLFxyXG4gICAgICAgICAgICBcImNsaWVudFNlY3JldFwiOlwiQ0VEMTQ2MTM1QTU4NEQ1RjJFQUIzMzYzNUQxOUFFOTlcIlxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgbGV0IGNsaWVudElkZW50aWZ5ID0gXCJwY1wiICsgU3RyaW5nKG5ldyBEYXRlKCkuZ2V0VGltZSgpKTtcclxuICAgICAgICAgICAgJHl5aW1faW9naW4uaGlkZSgpO1xyXG4gICAgICAgICAgICAkeXlpbV9ib3guc2hvdygpO1xyXG4gICAgICAgICAgICAvL+eZu+mZhllZSU1TREtcclxuICAgICAgICAgICAgWVlJTUNoYXQubG9naW4oe1xyXG4gICAgICAgICAgICAgICAgXCJ1c2VybmFtZVwiOiB1c2VybmFtZSxcclxuICAgICAgICAgICAgICAgIFwidG9rZW5cIjogcmVzdWx0LnRva2VuLFxyXG4gICAgICAgICAgICAgICAgXCJleHBpcmF0aW9uXCI6IHJlc3VsdC5leHBpcmF0aW9uLFxyXG4gICAgICAgICAgICAgICAgXCJhcHBUeXBlXCI6IDQsXHJcbiAgICAgICAgICAgICAgICBcImlkZW50aWZ5XCI6IGNsaWVudElkZW50aWZ5XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChhcmcpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYXJnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIC8v5rWL6K+V546v5aKDXHJcbiAgICAvLyAkLmFqYXgoe1xyXG4gICAgLy8gICAgIHVybDogJ2h0dHA6Ly8xNzIuMjAuMTUuNjAvc3lzYWRtaW4vcmVzdC95b255b3UvaW1fcHJlL3Rva2VuJyxcclxuICAgIC8vICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAvLyAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgIC8vICAgICBoZWFkZXJzOiB7XCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJ9LFxyXG4gICAgLy8gICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgIC8vICAgICAgICAgXCJ1c2VybmFtZVwiOnVzZXJuYW1lLFxyXG4gICAgLy8gICAgICAgICBcImNsaWVudElkXCI6XCJiMjZiYTUxMDU4ZWVlOWRiNGY4OGE3YTJiMWJkMWIwNlwiLFxyXG4gICAgLy8gICAgICAgICBcImNsaWVudFNlY3JldFwiOlwiQ0M5QTcxRTBDMjUyOEVEQjE2NTJERkIxOEVDRThEREZcIlxyXG4gICAgLy8gICAgIH0pLFxyXG4gICAgLy8gICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgIC8vICAgICAgICAgbGV0IGNsaWVudElkZW50aWZ5ID0gXCJwY1wiICsgU3RyaW5nKG5ldyBEYXRlKCkuZ2V0VGltZSgpKTtcclxuICAgIC8vICAgICAgICAgJHl5aW1faW9naW4uaGlkZSgpO1xyXG4gICAgLy8gICAgICAgICAkeXlpbV9ib3guc2hvdygpO1xyXG4gICAgLy8gICAgICAgICAvL+eZu+mZhllZSU1TREtcclxuICAgIC8vICAgICAgICAgWVlJTUNoYXQubG9naW4oe1xyXG4gICAgLy8gICAgICAgICAgICAgXCJ1c2VybmFtZVwiOiB1c2VybmFtZSxcclxuICAgIC8vICAgICAgICAgICAgIFwidG9rZW5cIjogcmVzdWx0LnRva2VuLFxyXG4gICAgLy8gICAgICAgICAgICAgXCJleHBpcmF0aW9uXCI6IHJlc3VsdC5leHBpcmF0aW9uLFxyXG4gICAgLy8gICAgICAgICAgICAgXCJhcHBUeXBlXCI6IDQsXHJcbiAgICAvLyAgICAgICAgICAgICBcImlkZW50aWZ5XCI6IGNsaWVudElkZW50aWZ5XHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgIH0sXHJcbiAgICAvLyAgICAgZXJyb3I6IGZ1bmN0aW9uIChhcmcpIHtcclxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coYXJnKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9KTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9