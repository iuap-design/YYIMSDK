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

var _jqelements = __webpack_require__(/*! ./js/jqelements */ "./src/js/jqelements.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//初始化SDK，正式环境


//渲染历史聊天记录
//加载事件操作
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


//获取最近联系人
YYIMChat.init({
    onOpened: function onOpened() {
        // 登录成功设置在线状态
        YYIMChat.setPresence();
        //移除保存的通讯对方id，避免页面刷新后最近联系人联系状态还记录着
        localStorage.removeItem('targetuserid');
        // 获取自己信息
        YYIMChat.getVCard({
            success: function success(res) {
                if (res.photo) _jqelements.$own_avatar.find('img').attr('src', YYIMChat.getFileUrl(res.photo));
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
        //从本地拿取聊天类型
        var chattype = localStorage.getItem('chattype');
        if (chattype == 'chat') {
            //如果给群组发消息会出发此回调
            //渲染历史聊天记录
            (0, _renderHistoryMessage2.default)(msg);
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

var _constants = __webpack_require__(/*! ./constants */ "./src/js/constants.js");

var _userLogin = __webpack_require__(/*! ./userLogin */ "./src/js/userLogin.js");

var _userLogin2 = _interopRequireDefault(_userLogin);

var _getRecentDigset = __webpack_require__(/*! ./getRecentDigset */ "./src/js/getRecentDigset.js");

var _getRecentDigset2 = _interopRequireDefault(_getRecentDigset);

var _renderRecentDigset = __webpack_require__(/*! ./renderRecentDigset */ "./src/js/renderRecentDigset.js");

var _renderRecentDigset2 = _interopRequireDefault(_renderRecentDigset);

var _getChatGroups = __webpack_require__(/*! ./getChatGroups */ "./src/js/getChatGroups.js");

var _getChatGroups2 = _interopRequireDefault(_getChatGroups);

var _renderChatGroups = __webpack_require__(/*! ./renderChatGroups */ "./src/js/renderChatGroups.js");

var _renderChatGroups2 = _interopRequireDefault(_renderChatGroups);

var _getHistoryMessage = __webpack_require__(/*! ./getHistoryMessage */ "./src/js/getHistoryMessage.js");

var _getHistoryMessage2 = _interopRequireDefault(_getHistoryMessage);

var _renderHistoryMessage = __webpack_require__(/*! ./renderHistoryMessage */ "./src/js/renderHistoryMessage.js");

var _renderHistoryMessage2 = _interopRequireDefault(_renderHistoryMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//放置表情列表

//获取历史聊天记录

//获取群组

//获取最近联系人

//表情数据
_jqelements.$j_bq_box.html(_constants.expressionList.data.map(function (t) {
    return '<li data-code="' + t.actionData + '"><img src="' + (_constants.expressionList.path + t.url) + '" title="' + t.actionData + '" alt=""></li>';
}));

//临时自动登录的

//渲染历史聊天记录

//渲染群组

//渲染最近联系人

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
        //查询好友
        YYIMChat.queryRosterItem({
            keyword: keyword,
            success: function success(data) {
                console.log(data);
            },
            error: function error(err) {
                console.log(err);
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
    //保存聊天类型
    localStorage.setItem('chattype', $(this).attr('data-type'));
    //删除保存的聊天历史
    localStorage.removeItem('historychats');
    //获取历史聊天信息
    (0, _getHistoryMessage2.default)($(this).attr('data-sessionVersion'), $(this).attr('data-id'), $(this).attr('data-type'));
});

//删除最近联系人
_jqelements.$hcontacts.on('click', '.close', function () {
    var curid = $(this).attr('data-id');
    YYIMChat.removeRecentDigest({
        id: curid,
        type: $(this).attr('data-type'),
        success: function success(data) {
            //从本地拿取聊天对方id
            var toid = localStorage.getItem('targetuserid');
            //拿取本地保存的最近联系人数组
            var recentDigset = JSON.parse(localStorage.getItem('recentdigset') || "[]");
            recentDigset.forEach(function (digest, i) {
                if (digest.id === curid) {
                    recentDigset.splice(i, 1);
                }
            });
            //保存修改后的最近联系人数组
            localStorage.setItem('recentdigset', JSON.stringify(recentDigset));
            //保存聊天类型
            localStorage.setItem('chattype', 'groupchat');
            //渲染最近联系人
            (0, _renderRecentDigset2.default)(recentDigset);
        },
        error: function error(err) {
            console.log(err);
        }
    });
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
        //从本地拿取聊天类型
        var chattype = localStorage.getItem('chattype');
        //调用发送文本消息接口
        YYIMChat.sendTextMessage({
            to: to, //对话人id
            type: chattype, //chat:单聊，groupcgat:群聊,pubaccount:公众号
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
        //从本地拿取聊天类型
        var chattype = localStorage.getItem('chattype');
        //调用发送文本消息接口
        YYIMChat.sendTextMessage({
            to: to, //对话人id
            type: chattype, //chat:单聊，groupchat:群聊,pubaccount:公众号
            content: _jqelements.$yyim_editor.val(), //消息文本
            body: '', //扩展字段
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

//头像点击
_jqelements.$own_avatar.on('click', function () {
    var userVcard = JSON.parse(localStorage.getItem('currentuserinfo') || "{}");
    _jqelements.$personinfo.html('\n            <div class="site">\n                <div class="hd">\n                    <div class="hdpic">\n                        <img src="' + (userVcard.photo ? YYIMChat.getFileUrl(userVcard.photo) : '') + '" alt="">\n                    </div>\n                    <h3 class="nickname">' + (userVcard.nickname || userVcard.id) + '</h3>\n                </div>\n                <ul class="infolist">\n                    <li><label>\u90AE\u7BB1</label>' + (userVcard.email || '') + '</li>\n                    <li><label>\u6027\u522B</label>' + (userVcard.gender || '') + '</li>\n                    <li><label>\u624B\u673A</label>' + (userVcard.mobile || '') + '</li>\n                </ul>\n                <span class="close_chatmsk">\xD7</span>\n            </div>\n    ').show();
});
//关闭个人信息
_jqelements.$personinfo.on('click', '.close_chatmsk', function () {
    _jqelements.$personinfo.hide();
});

//菜单-聊天
_jqelements.$smchat.on('click', function () {
    if ($(this).hasClass('active')) {
        return;
    }
    $(this).addClass('active');
    $(this).siblings().removeClass('active');

    _jqelements.$hgroups.hide();
    _jqelements.$hcontacts.show();
    //移除保存的通讯对方id，避免页面刷新后最近联系人联系状态还记录着
    localStorage.removeItem('targetuserid');
    //本地拉取获取最近联系人
    var recentdigset = localStorage.getItem('recentdigset') || "[]";
    (0, _renderRecentDigset2.default)(JSON.parse(recentdigset));
});
//菜单-好友
_jqelements.$smfriend.on('click', function () {
    if ($(this).hasClass('active')) {
        return;
    }
    $(this).addClass('active');
    $(this).siblings().removeClass('active');
});
//菜单-群组
_jqelements.$smgroup.on('click', function () {
    if ($(this).hasClass('active')) {
        return;
    }
    $(this).addClass('active');
    $(this).siblings().removeClass('active');
    //清空聊天头部名称
    _jqelements.$j_move.html('');
    //隐藏最近联系人列表
    _jqelements.$hcontacts.hide();
    //隐藏聊天框
    _jqelements.$chat_box.hide();
    //显示群组列表
    _jqelements.$hgroups.html('');
    _jqelements.$hgroups.show();

    var roomItems = localStorage.getItem('roomItems');
    if (roomItems) {
        //使用本地保存的群组渲染
        (0, _renderChatGroups2.default)(JSON.parse(roomItems));
    } else {
        //重新获取群组
        (0, _getChatGroups2.default)();
    }
});
//菜单-公众号
_jqelements.$smpubcount.on('click', function () {
    if ($(this).hasClass('active')) {
        return;
    }

    $(this).addClass('active');
    $(this).siblings().removeClass('active');
});

_jqelements.$hgroups.on('click', 'li', function () {
    _jqelements.$smchat.addClass('active');
    _jqelements.$smchat.siblings().removeClass('active');
    _jqelements.$hgroups.hide();
    _jqelements.$hcontacts.html('');
    _jqelements.$hcontacts.show();

    //修改当前联系人id
    localStorage.setItem('targetuserid', $(this).attr('data-id'));

    var that = $(this);
    //拿取本地保存的最近联系人数组
    var recentDigset = JSON.parse(localStorage.getItem('recentdigset') || "[]");
    var isdigset = false; //判断该公众号在不在我的最近联系人里
    recentDigset.forEach(function (digest, i) {
        if (digest.id === that.attr('data-id')) {
            isdigset = true;
        }
    });
    //不在最近联系人中，刷新最近联系人列表
    if (!isdigset) {
        recentDigset.push({
            id: that.attr('data-id'),
            readedVersion: 0,
            sessionVersion: 0,
            type: 'groupchat',
            photo: that.attr('data-photo'),
            nickname: that.attr('data-name'),
            lastMessage: null,
            lastContactTime: new Date().getTime()
        });
        //保存修改后的最近联系人数组
        localStorage.setItem('recentdigset', JSON.stringify(recentDigset));
        //保存聊天类型
        localStorage.setItem('chattype', 'groupchat');
    }
    //渲染最近联系人
    (0, _renderRecentDigset2.default)(recentDigset);
    //换个聊天的头部名称
    _jqelements.$j_move.html($(this).attr('data-name'));
    //删除保存的聊天历史
    localStorage.removeItem('historychats');
    //获取历史聊天信息
    (0, _getHistoryMessage2.default)(0, $(this).attr('data-id'), 'groupchat');
});

/***/ }),

/***/ "./src/js/getChatGroups.js":
/*!*********************************!*\
  !*** ./src/js/getChatGroups.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _renderChatGroups = __webpack_require__(/*! ./renderChatGroups */ "./src/js/renderChatGroups.js");

var _renderChatGroups2 = _interopRequireDefault(_renderChatGroups);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {

    //获取群组列表
    YYIMChat.getChatGroups({
        success: function success(data) {
            //保存群列表数组
            localStorage.setItem('roomItems', JSON.stringify(data.roomItems));
            (0, _renderChatGroups2.default)(data.roomItems);
        },
        error: function error(err) {
            console.log(err);
        }
    });
};

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
                    if (e.type !== 'chat' && e.type !== 'groupchat') {
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
var $hgroups = exports.$hgroups = $('.hgroups'); //我的群组框
var $chats = exports.$chats = $('.chats'); //聊天信息滑动容器
var $j_bq_box = exports.$j_bq_box = $('.j_bq_box'); //表情盒子
var $yyim_editor = exports.$yyim_editor = $('.yyim-editor'); //聊天输入框
var $btn_send = exports.$btn_send = $('.adit-btn-send'); //发送按钮
var $chat_box = exports.$chat_box = $('.chat-box'); //控制是否具有聊天内容
var $chats_list = exports.$chats_list = $('.chats-list'); //聊天信息列表
var $picviewer = exports.$picviewer = $('#picviewer'); //图片查看框

var $own_avatar = exports.$own_avatar = $('.own_avatar'); //个人头像框
var $personinfo = exports.$personinfo = $('.personinfo'); //个人信息框

var $smchat = exports.$smchat = $('.smchat'); //菜单-聊天
var $smfriend = exports.$smfriend = $('.smfriend'); //菜单-好友
var $smgroup = exports.$smgroup = $('.smgroup'); //菜单-群组
var $smpubcount = exports.$smpubcount = $('.smpubcount'); //菜单-公众号

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

/***/ "./src/js/renderChatGroups.js":
/*!************************************!*\
  !*** ./src/js/renderChatGroups.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jqelements = __webpack_require__(/*! ./jqelements */ "./src/js/jqelements.js");

exports.default = function (groups) {
    var groupStr = '';
    groups.forEach(function (group) {
        groupStr += '<li data-id="' + group.id + '" data-name="' + group.name + '" data-photo="' + (group.photo || '') + '">\n                    <div class="avatar">\n                        <img src="' + (YYIMChat.getFileUrl(group.photo) || './imgs/avatar.jpg') + '" alt="">\n                    </div>\n                    <div class="detail dingyue">\n                        <h3 class="name cuttxt">' + (group.name || '群组') + '</h3>\n                    </div>\n                </li>';
    });
    _jqelements.$hgroups.html(groupStr);
};
//dom元素

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

//渲染聊天记录,如果需要新加入一条聊天信息，传入一条聊天记录对象即可。


//表情数据


//获取最近联系人函数

exports.default = function (msg) {
    //拿取本地保存的历史聊天信息
    var historychats = JSON.parse(localStorage.getItem('historychats') || "[]");
    //拿取本地保存的最近联系人数组
    var recentDigset = JSON.parse(localStorage.getItem('recentdigset') || "[]");
    //从本地拿取聊天对方id
    var targetuserid = localStorage.getItem('targetuserid');
    //拿我自己的id
    var myid = JSON.parse(localStorage.getItem('currentuserinfo')).id;
    //拿当前的聊天类型
    var chattype = localStorage.getItem('chattype');

    //消息来源id
    var msgfromid = '';

    //如果msg存在，说明我正在发送消息或者我接收到了别人的消息
    if (msg) {
        msgfromid = chattype === 'chat' ? msg.from : msg.from.roster;
        var isfromme = myid === msgfromid;
        if (isfromme) {
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
                if (digest.id === msgfromid) {
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
            if (msgfromid === targetuserid) {
                //修改历史消息
                historychats.push(msg);
                //修改后保存
                localStorage.setItem('historychats', JSON.stringify(historychats));
            }
        }
    }
    //如果我没和对方聊天，则不渲染历史信息
    if (msg && msgfromid !== myid && msgfromid !== targetuserid) return;

    var chatsStr = '';
    historychats.forEach(function (chat, i) {
        var isfromme = chattype === 'chat' ? myid === chat.from : myid === chat.from.roster;
        var chatfrom = chattype === 'chat' ? '' : '<div class="chat-user-name">' + chat.from.roster + '</div>';
        //文本消息
        if (chat.data.contentType === 2) {
            chatsStr += '<li>\n                            <div class="chat-tip">' + new Date(chat.data.dateline).toLocaleTimeString() + '</div>\n                            <div class="chat-content">\n                                <div class="' + (isfromme ? 'chat-avatar chat-avatar-send' : 'chat-avatar') + '">\n                                    <img src="./imgs/avatar.jpg" alt="">\n                                </div>\n                                <div class="' + (isfromme ? 'chat-txt chat-txt-send' : 'chat-txt') + '">\n                                    ' + chatfrom + '\n                                    <div class="chat-msg">' + replaceEmoji(chat.data.content) + '</div>\n                                </div>\n                            </div>\n                        </li> ';
        } else if (chat.data.contentType === 8) {
            //图片消息
            var picurl = YYIMChat.getFileUrl(chat.data.content.attachId);
            chatsStr += '<li>\n                            <div class="chat-tip">' + new Date(chat.data.dateline).toLocaleTimeString() + '</div>\n                            <div class="chat-content">\n                                <div class="' + (isfromme ? 'chat-avatar chat-avatar-send' : 'chat-avatar') + '">\n                                    <img src="./imgs/avatar.jpg" alt="">\n                                </div>\n                                <div class="' + (isfromme ? 'chat-txt chat-txt-send' : 'chat-txt') + '">\n                                    ' + chatfrom + '\n                                    <div class="chat-msg">\n                                        <img class="chatpic" data-url="' + picurl + '" src="' + picurl + '" title="\u70B9\u51FB\u67E5\u770B\u56FE\u7247" alt="" />\n                                    </div>\n                                </div>\n                            </div>\n                        </li> ';
        } else if (chat.data.contentType === 4) {
            var _picurl = YYIMChat.getFileUrl(chat.data.content.attachId);
            var filename = chat.data.content.name.slice(0, 14);
            chatsStr += '<li>\n                            <div class="chat-tip">' + new Date(chat.data.dateline).toLocaleTimeString() + '</div>\n                            <div class="chat-content">\n                                <div class="' + (isfromme ? 'chat-avatar chat-avatar-send' : 'chat-avatar') + '">\n                                    <img src="./imgs/avatar.jpg" alt="">\n                                </div>\n                                <div class="' + (isfromme ? 'chat-txt chat-txt-send' : 'chat-txt') + '">\n                                    ' + chatfrom + '\n                                    <div class="chat-msg">\n                                        <a class="chatfile" href="' + _picurl + '" title="\u70B9\u51FB\u4E0B\u8F7D\u6587\u4EF6">\n                                            <span class="filename">' + filename + '</span>\n                                            <span class="filesize">' + chat.data.content.size + 'B</span>\n                                        </a>\n                                    </div>\n                                </div>\n                            </div>\n                        </li> ';
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
        digStr += '<li class="' + (targetuserid && targetuserid === res.id ? 'active' : '') + '" data-sessionVersion="' + res.sessionVersion + '" data-id="' + res.id + '" data-type="' + res.type + '" data-nickname="' + (res.nickname || res.id) + '">\n                    <i data-id="' + res.id + '" data-type="' + res.type + '" class="close">\xD7</i>\n                    <div class="avatar">\n                        <img src="' + (YYIMChat.getFileUrl(res.photo) || './imgs/avatar.jpg') + '" alt="">\n                    </div>\n                    <div class="detail">\n                        <h3 class="name cuttxt">' + (res.nickname || res.id) + '</h3>\n                        <p class="msg cuttxt">' + replaceEmoji(lastmsgStr) + '</p>\n                    </div>' + newtipStr + '\n                </li>';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbnRyb2xFdmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZ2V0Q2hhdEdyb3Vwcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZ2V0SGlzdG9yeU1lc3NhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2dldFJlY2VudERpZ3NldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvanFlbGVtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcmVuZGVyQ2hhdEdyb3Vwcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcmVuZGVySGlzdG9yeU1lc3NhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3JlbmRlclJlY2VudERpZ3NldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXNlckxvZ2luLmpzIl0sIm5hbWVzIjpbIllZSU1DaGF0IiwiaW5pdFNESyIsImFwcCIsImV0cCIsIndzdXJsIiwid3Nwb3J0IiwiaGJwb3J0Iiwic2VydmxldCIsImZsYXNoX3N3Zl91cmwiLCJsb2dFbmFibGUiLCJjbGllbnRNYXJrIiwiYXBpS2V5IiwiaW5pdCIsIm9uT3BlbmVkIiwic2V0UHJlc2VuY2UiLCJsb2NhbFN0b3JhZ2UiLCJyZW1vdmVJdGVtIiwiZ2V0VkNhcmQiLCJzdWNjZXNzIiwicmVzIiwicGhvdG8iLCJmaW5kIiwiYXR0ciIsImdldEZpbGVVcmwiLCJzZXRJdGVtIiwiSlNPTiIsInN0cmluZ2lmeSIsIm9uRXhwaXJhdGlvbiIsImNhbGxiYWNrIiwib25DbG9zZWQiLCJhcmciLCJvbkNvbmZsaWN0ZWQiLCJvbkNsaWVudEtpY2tvdXQiLCJvblVwZGF0ZVBhc3N3b3JkIiwib25BdXRoRXJyb3IiLCJvbkNvbm5lY3RFcnJvciIsIm9uUmVjZWlwdHMiLCJvblN1YnNjcmliZSIsIm9uUm9zdGVyRmF2b3JpdGVkIiwib25Sb3N0ZXJVcGRhdGVkZWQiLCJvbk1lc3NhZ2UiLCJtc2ciLCJjaGF0dHlwZSIsImdldEl0ZW0iLCJvbkdyb3VwVXBkYXRlIiwib25LaWNrZWRPdXRHcm91cCIsIm9uVHJhbnNmZXJHcm91cE93bmVyIiwib25QcmVzZW5jZSIsIm9uUm9zdGVyRGVsZXRlZCIsIm9uUHViYWNjb3VudFVwZGF0ZSIsInB1YmFjY291bnRzIiwib25UcmFuc3BhcmVudE1lc3NhZ2UiLCJleHByZXNzaW9uTGlzdCIsInBhdGgiLCJkYXRhIiwiYWN0aW9uRGF0YSIsImh0bWwiLCJtYXAiLCJ0IiwidXJsIiwicGFyc2UiLCJ1c2VybmFtZSIsImNsaWNrIiwidmFsIiwicGFzc3dvcmQiLCJ0ZXN0IiwiJCIsImhhc0NsYXNzIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsImNzcyIsImxlZnQiLCJ0b3AiLCJjbGVhciIsImhpZGUiLCJzaG93Iiwib24iLCJlIiwib3JpZ2luWCIsImNsaWVudFgiLCJvcmlnaW5ZIiwiY2xpZW50WSIsImJveFBvcyIsInBvc2l0aW9uIiwib2ZmIiwia2V5d29yZCIsImtleUNvZGUiLCJxdWVyeVJvc3Rlckl0ZW0iLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJlcnIiLCJzaWJsaW5ncyIsImN1cmlkIiwicmVtb3ZlUmVjZW50RGlnZXN0IiwiaWQiLCJ0eXBlIiwidG9pZCIsInJlY2VudERpZ3NldCIsImZvckVhY2giLCJkaWdlc3QiLCJpIiwic3BsaWNlIiwicGljdXJsIiwiaG92ZXIiLCJ0b2dnbGUiLCJ0byIsInNlbmRQaWMiLCJmaWxlSW5wdXRJZCIsImNoYXRJbmZvIiwiZXh0ZW5kIiwiZmlsZUZpbHRlcmVkIiwiZmlsZVVwbG9hZGVkIiwiYmVmb3JlVXBsb2FkIiwicHJvZ3Jlc3MiLCJwcm8iLCJzZW5kRmlsZSIsInNlbmRUZXh0TWVzc2FnZSIsImNvbnRlbnQiLCJib2R5IiwidXNlclZjYXJkIiwibmlja25hbWUiLCJlbWFpbCIsImdlbmRlciIsIm1vYmlsZSIsInJlY2VudGRpZ3NldCIsInJvb21JdGVtcyIsInRoYXQiLCJpc2RpZ3NldCIsInB1c2giLCJyZWFkZWRWZXJzaW9uIiwic2Vzc2lvblZlcnNpb24iLCJsYXN0TWVzc2FnZSIsImxhc3RDb250YWN0VGltZSIsIkRhdGUiLCJnZXRUaW1lIiwiZ2V0Q2hhdEdyb3VwcyIsInN0YXJ0IiwiZ2V0SGlzdG9yeU1lc3NhZ2UiLCJzdGFydFZlcnNpb24iLCJlbmRWZXJzaW9uIiwiaGlzdG9yeWNoYXRzIiwicmVzdWx0IiwicmV2ZXJzZSIsImdldFJlY2VudERpZ3NldCIsImxpc3QiLCJsZW5ndGgiLCIkeXlpbV9pb2dpbiIsIiRsb2dpbl91c2VybmFtZSIsIiRsb2dpbl9wYXNzIiwiJGxvZ2luX2J0biIsIiR5eWltX2JveCIsIiR5eWltX21haW4iLCIkal9tb3ZlIiwiJGhjb250YWN0cyIsIiRoZ3JvdXBzIiwiJGNoYXRzIiwiJGpfYnFfYm94IiwiJHl5aW1fZWRpdG9yIiwiJGJ0bl9zZW5kIiwiJGNoYXRfYm94IiwiJGNoYXRzX2xpc3QiLCIkcGljdmlld2VyIiwiJG93bl9hdmF0YXIiLCIkcGVyc29uaW5mbyIsIiRzbWNoYXQiLCIkc21mcmllbmQiLCIkc21ncm91cCIsIiRzbXB1YmNvdW50IiwicGljdmlld2VyIiwiVmlld2VyIiwibmF2YmFyIiwidGl0bGUiLCJncm91cHMiLCJncm91cFN0ciIsImdyb3VwIiwibmFtZSIsInJlcGxhY2VFbW9qaSIsInN0ciIsInJlcGxhY2UiLCJ0YXJnZXR1c2VyaWQiLCJteWlkIiwibXNnZnJvbWlkIiwiZnJvbSIsInJvc3RlciIsImlzZnJvbW1lIiwiZGF0ZWxpbmUiLCJjaGF0c1N0ciIsImNoYXQiLCJjaGF0ZnJvbSIsImNvbnRlbnRUeXBlIiwidG9Mb2NhbGVUaW1lU3RyaW5nIiwiYXR0YWNoSWQiLCJmaWxlbmFtZSIsInNsaWNlIiwic2l6ZSIsInNjcm9sbFRvcCIsInNjcm9sbEhlaWdodCIsImRpZ3NldHMiLCJkaWdTdHIiLCJzb3J0IiwiYSIsImIiLCJsYXN0bXNnIiwibGFzdG1zZ1N0ciIsIm5ld3RpcFN0ciIsIm5vcmVhZG5vIiwiYWpheCIsImRhdGFUeXBlIiwiaGVhZGVycyIsImNsaWVudElkZW50aWZ5IiwiU3RyaW5nIiwibG9naW4iLCJ0b2tlbiIsImV4cGlyYXRpb24iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsRUE7O0FBR0E7Ozs7QUFHQTs7OztBQUVBOzs7O0FBRUE7OztBQUxBO0FBTkE7QUFZQUEsU0FBU0MsT0FBVCxDQUFpQjtBQUNiQyxTQUFLLEtBRFEsRUFDRDtBQUNaQyxTQUFLLFFBRlEsRUFFRTtBQUNmQyxXQUFPLG1CQUhNLEVBR2U7QUFDNUJDLFlBQVEsSUFKSyxFQUlDO0FBQ2RDLFlBQVEsSUFMSyxFQUtDO0FBQ2RDLGFBQVMsdUJBTkksRUFNcUI7QUFDbENDLG1CQUFlLGlCQVBGLEVBT3FCO0FBQ2xDQyxlQUFXLElBUkUsRUFRSTtBQUNqQkMsZ0JBQVksS0FUQyxFQVNNO0FBQ25CQyxZQUFRO0FBVkssQ0FBakI7QUFZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBbkNBO0FBb0NBWCxTQUFT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LENBSkE7QUFLWCw0QkFBWUo7QUFMRCxhQUFmO0FBT0gsU0F0QkU7QUF1Qkh4SCxlQUFPLGVBQVU1RCxHQUFWLEVBQWU7QUFDbEIwRCxvQkFBUUMsR0FBUixDQUFZM0QsR0FBWjtBQUNIO0FBekJFLEtBQVA7QUEyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSCxDLEVBN0RELEkiLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIvL+WKoOi9veS6i+S7tuaTjeS9nFxyXG5pbXBvcnQgJy4vanMvY29udHJvbEV2ZW50JztcclxuXHJcbi8v6I635Y+W5pyA6L+R6IGU57O75Lq6XHJcbmltcG9ydCBnZXRSZWNlbnREaWdzZXQgZnJvbSAnLi9qcy9nZXRSZWNlbnREaWdzZXQnO1xyXG5cclxuLy/muLLmn5Pljoblj7LogYrlpKnorrDlvZVcclxuaW1wb3J0IHJlbmRlckhpc3RvcnlNZXNzYWdlIGZyb20gJy4vanMvcmVuZGVySGlzdG9yeU1lc3NhZ2UnO1xyXG5cclxuaW1wb3J0IHsgJG93bl9hdmF0YXIgfSBmcm9tICcuL2pzL2pxZWxlbWVudHMnO1xyXG5cclxuLy/liJ3lp4vljJZTREvvvIzmraPlvI/njq/looNcclxuWVlJTUNoYXQuaW5pdFNESyh7XHJcbiAgICBhcHA6ICd1ZG4nLCAvL2FwcElkXHJcbiAgICBldHA6ICd5b255b3UnLCAvL2V0cElkXHJcbiAgICB3c3VybDogJ3N0ZWxsYXIueXl1YXAuY29tJywgLy93ZWJzb2NrZXQgVXJsXHJcbiAgICB3c3BvcnQ6IDUyMjcsIC8vd2Vic29ja2V0IHBvcnQgNTIyNy81MjIyLzUyMjVcclxuICAgIGhicG9ydDogNzA3NSwgLy9odHRwYmluZCAgcG9ydCA3MDc1LzcwNzBcclxuICAgIHNlcnZsZXQ6ICdodHRwczovL2ltLnl5dWFwLmNvbS8nLCAvL3Jlc3QgVXJsXHJcbiAgICBmbGFzaF9zd2ZfdXJsOiAneHh4L3gvTW94aWUuc3dmJywgLy9mbGFzaCDkuIrkvKAgc3dm5paH5Lu25L2N572uXHJcbiAgICBsb2dFbmFibGU6IHRydWUsIC8vY2xpZW50IGxvZ1xyXG4gICAgY2xpZW50TWFyazogJ3dlYicsIC8vY2xpZW50IG1hcmsgJ3dlYicgb3IgJ3BjJ1xyXG4gICAgYXBpS2V5OiBcIjg1ZGU3OWI5ZjdlMzRjMzdhOTlhY2NhZGRiMjU2OTkwXCJcclxufSk7XHJcbi8v5Yid5aeL5YyWU0RL77yM5rWL6K+V546v5aKDXHJcbi8vIFlZSU1DaGF0LmluaXRTREsoe1xyXG4vLyAgICAgYXBwOiAnaW1fcHJlJywgLy9hcHBJZFxyXG4vLyAgICAgZXRwOiAneW9ueW91JywgLy9ldHBJZFxyXG4vLyAgICAgd3N1cmw6ICcxNzIuMjAuMTUuNjAnLCAvL3dlYnNvY2tldCBVcmxcclxuLy8gICAgIHdzcG9ydDogNTIyNywgLy93ZWJzb2NrZXQgcG9ydCA1MjI3LzUyMjIvNTIyNVxyXG4vLyAgICAgaGJwb3J0OiA3MDc1LCAvL2h0dHBiaW5kICBwb3J0IDcwNzUvNzA3MFxyXG4vLyAgICAgc2VydmxldDogJ2h0dHA6Ly8xNzIuMjAuMTUuNjAvJywgLy9yZXN0IFVybFxyXG4vLyAgICAgZmxhc2hfc3dmX3VybDogJ3h4eC94L01veGllLnN3ZicsIC8vZmxhc2gg5LiK5LygIHN3ZuaWh+S7tuS9jee9rlxyXG4vLyAgICAgbG9nRW5hYmxlOiB0cnVlLCAvL2NsaWVudCBsb2dcclxuLy8gICAgIGNsaWVudE1hcms6ICd3ZWInLCAvL2NsaWVudCBtYXJrICd3ZWInIG9yICdwYydcclxuLy8gICAgIGFwaUtleTogXCI4NWRlNzliOWY3ZTM0YzM3YTk5YWNjYWRkYjI1Njk5MFwiXHJcbi8vIH0pO1xyXG5cclxuLy/liJ3lp4vljJblm57osIPmlrnms5VcclxuWVlJTUNoYXQuaW5pdCh7XHJcbiAgICBvbk9wZW5lZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g55m75b2V5oiQ5Yqf6K6+572u5Zyo57q/54q25oCBXHJcbiAgICAgICAgWVlJTUNoYXQuc2V0UHJlc2VuY2UoKTtcclxuICAgICAgICAvL+enu+mZpOS/neWtmOeahOmAmuiur+WvueaWuWlk77yM6YG/5YWN6aG16Z2i5Yi35paw5ZCO5pyA6L+R6IGU57O75Lq66IGU57O754q25oCB6L+Y6K6w5b2V552AXHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3RhcmdldHVzZXJpZCcpO1xyXG4gICAgICAgIC8vIOiOt+WPluiHquW3seS/oeaBr1xyXG4gICAgICAgIFlZSU1DaGF0LmdldFZDYXJkKHtcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICAgaWYocmVzLnBob3RvKSRvd25fYXZhdGFyLmZpbmQoJ2ltZycpLmF0dHIoJ3NyYycsWVlJTUNoYXQuZ2V0RmlsZVVybChyZXMucGhvdG8pKTtcclxuICAgICAgICAgICAgICAgIC8v5L+d5a2Y6Ieq5bex55qE5L+h5oGvXHJcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY3VycmVudHVzZXJpbmZvJywgSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvL+iOt+WPluacgOi/keiBlOezu+S6ulxyXG4gICAgICAgIGdldFJlY2VudERpZ3NldCgpO1xyXG4gICAgfSxcclxuICAgIG9uRXhwaXJhdGlvbjogZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuICAgICAgICAvL+iHquWKqOabtOaWsHRva2VuXHJcbiAgICAgICAgLy8gY2FsbGJhY2sodG9rZW4sIGV4cGlyYXRpb24pO1xyXG4gICAgfSxcclxuICAgIG9uQ2xvc2VkOiBmdW5jdGlvbihhcmcpIHtcclxuICAgICAgICAvL+i/nuaOpeWFs+mXrVxyXG4gICAgfSxcclxuICAgIG9uQ29uZmxpY3RlZDogZnVuY3Rpb24oYXJnKSB7XHJcbiAgICAgICAgLy/nmbvpmYblhrLnqoFcclxuICAgIH0sXHJcbiAgICBvbkNsaWVudEtpY2tvdXQ6IGZ1bmN0aW9uKGFyZykge1xyXG4gICAgICAgIC8v6KKr5LuW56uv6Lii5o6JXHJcbiAgICB9LFxyXG4gICAgb25VcGRhdGVQYXNzd29yZDogZnVuY3Rpb24oYXJnKSB7XHJcbiAgICAgICAgLy/mm7TmlLnlr4bnoIHvvIzooqvouKLmjolcclxuICAgIH0sXHJcbiAgICBvbkF1dGhFcnJvcjogZnVuY3Rpb24oYXJnKSB7XHJcbiAgICAgICAgLy/nmbvpmYborqTor4HlpLHotKVcclxuICAgIH0sXHJcbiAgICBvbkNvbm5lY3RFcnJvcjogZnVuY3Rpb24oYXJnKSB7XHJcbiAgICAgICAgLy/ov57mjqXlpLHotKVcclxuICAgIH0sXHJcbiAgICBvblJlY2VpcHRzOiBmdW5jdGlvbihhcmcpIHtcclxuICAgICAgICAvL+a2iOaBr+WbnuaJp1xyXG4gICAgfSxcclxuICAgIG9uU3Vic2NyaWJlOiBmdW5jdGlvbihhcmcpIHtcclxuICAgICAgICAvL+WPkeeUn+iuoumYhVxyXG4gICAgfSxcclxuICAgIG9uUm9zdGVyRmF2b3JpdGVkOiBmdW5jdGlvbihhcmcpIHtcclxuICAgICAgICAvL+iiq+aUtuiXj1xyXG4gICAgfSxcclxuICAgIG9uUm9zdGVyVXBkYXRlZGVkOiBmdW5jdGlvbihhcmcpIHtcclxuICAgICAgICAvL+WlveWPi+S/oeaBr+abtOaUuVxyXG4gICAgfSxcclxuICAgIG9uTWVzc2FnZTogZnVuY3Rpb24obXNnKSB7XHJcbiAgICAgICAgLy/ku47mnKzlnLDmi7/lj5bogYrlpKnnsbvlnotcclxuICAgICAgICBsZXQgY2hhdHR5cGUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2hhdHR5cGUnKTtcclxuICAgICAgICBpZihjaGF0dHlwZSA9PSAnY2hhdCcpeyAgIC8v5aaC5p6c57uZ576k57uE5Y+R5raI5oGv5Lya5Ye65Y+R5q2k5Zue6LCDXHJcbiAgICAgICAgICAgIC8v5riy5p+T5Y6G5Y+y6IGK5aSp6K6w5b2VXHJcbiAgICAgICAgICAgIHJlbmRlckhpc3RvcnlNZXNzYWdlKG1zZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG9uR3JvdXBVcGRhdGU6IGZ1bmN0aW9uKGFyZykge1xyXG4gICAgICAgIC8v576k57uE5pu05pawXHJcbiAgICB9LFxyXG4gICAgb25LaWNrZWRPdXRHcm91cDogZnVuY3Rpb24oYXJnKSB7XHJcbiAgICAgICAgLy/nvqTmiJDlkZjooqvnvqTkuLvmj5Dlh7pcclxuICAgIH0sXHJcbiAgICBvblRyYW5zZmVyR3JvdXBPd25lcjogZnVuY3Rpb24oYXJnKXtcclxuICAgICAgICAvL+e+pOS4u+i9rOiuqVxyXG4gICAgfSxcclxuICAgIG9uUHJlc2VuY2U6IGZ1bmN0aW9uKGFyZykge1xyXG4gICAgICAgIC8v5aW95Y+LcHJlc2VuY2XmlLnlj5hcclxuICAgIH0sXHJcbiAgICBvblJvc3RlckRlbGV0ZWQ6IGZ1bmN0aW9uKGFyZykge1xyXG4gICAgICAgIC8v5aW95Y+L6KKr5Yig6ZmkIFxyXG4gICAgfSxcclxuICAgIG9uUHViYWNjb3VudFVwZGF0ZTogZnVuY3Rpb24ocHViYWNjb3VudHMpIHtcclxuICAgICAgICAvL+WFrOWFseWPt+S/oeaBr+abtOaWsFxyXG4gICAgfSxcclxuICAgIG9uVHJhbnNwYXJlbnRNZXNzYWdlOiBmdW5jdGlvbihhcmcpIHtcclxuICAgICAgICAvL+mAj+S8oOS4muWKoea2iOaBr1xyXG4gICAgfVxyXG59KTtcclxuXHJcbiIsImV4cG9ydCBjb25zdCBleHByZXNzaW9uTGlzdCA9IHtcclxuICAgIHBhdGg6IFwiLi9pbWdzL2JxL1wiLFxyXG4gICAgZGF0YTogW1xyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6b6H54mZXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fY2l5YUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5ZOI5ZOIXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25faGFoYUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5pmVXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25feXVuQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmsZddXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9oYW5iQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlrrPnvp5dXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9oYWl4QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvosIPnmq5dXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl90aWFvcEAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb55aR6ZeuXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25feWl3QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmjYLohLhdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl93dWxpYW5AMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WluOeskV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2ppYW54aWFvQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmnLrmmbpdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9zbWFydEAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5b6X5oSPXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fZGV5aUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb56yRY3J5XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fbGF1Z2hpbmdfdGVhcnNAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+a1geazql1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2NyeWluZ0AyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5aWL5paXXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fZmVuZG91QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmirHmirFdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9odWdAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+eUn+eXhV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2lsbEAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5bC05bCsXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fZ2FuZ2FAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WBt+eskV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3RvdXhAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+i1nl1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3phbkAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5o+h5omLXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fd29zQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIltPS11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX29rQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlt5ZWFrXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25feWVha0AyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6byT5o6MXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fZ3V6QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmi7PlpLRdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9xdWFudG91QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvogozogoldXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9qaXJvdUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5o+h5ouzXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fd29xQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmi5zmiZhdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9iYWl0QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmhInlv6tdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl95dWtAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+mavui/h11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX25hbmd1b0AyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6Zet5Zi0XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fYml6dWlAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WbsF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2t1bkAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb54yq5aS0XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fcGlnQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvniLHlv4NdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9oZWFydEAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5b+D56KOXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25feGluc3VpQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvnpLznm5JdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9ib3hAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WQu11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2tpc3NhQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvnjqvnkbDoirFdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9yb3NlQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmo5Lmo5Lns5ZdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9jYW5keUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5pma5a6JXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fbmlnaHRAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+eliOelt11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3ByYXlAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+e7meWKm11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2dlaWxpQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvouKldXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9jYWlAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+S6suS6sl1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2tpc3NiQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlmJhdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl94dUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6ImyXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fc2VAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WPr+aAnF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2tlbGlhbkAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5Y+R5ZGGXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fZmFkYWlAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+Wkp+WTrV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2NyeWFAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WbsFp6el1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3p6ekAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5oCd6ICDXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fc2lrYW9AMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+eZveecvF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2JhaXlAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WCsuaFol1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2FvbWFuQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvphbddXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9rdUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5ZunXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25famlvbmdAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+mEmeinhl1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2Jpc0AyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6aWl6aW/XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25famllQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlkJNdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl94aWFAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+aKoOm8u11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2tvdWJpQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmg4rorrZdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9qaW5neUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5Y+R5oCSXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fYW5ncnlAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+aDiuaBkF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2ppbmdrQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlkJBdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl90dUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5ouc5oucXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fYnllQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlkpbllaFdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9jb2ZmZWVAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WVpOmFkl1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2JlZXJAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+S4i+mbqF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3JhaW5AMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+mXqueUtV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3NoYW5kQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvkuIvpm6pdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9zbm93QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvotrPnkINdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9iYWxsQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvnr67nkINdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9iYXNrZXRAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+mjnuacul1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3BsYW5lQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvpgq7ku7ZdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9tYWlsQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvpm6jkvJ5dXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl95dXNhbkAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5aWW5p2vXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25famlhbmdiQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmgKrnialdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9ndWFpd3VAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+iNr11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX21lZEAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb54K45by5XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25femhhZEAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6JuL57OVXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fY2FrZUAyeC5wbmdcIiB9XHJcbiAgICBdXHJcbn07IiwiLy9kb23lhYPntKBcclxuaW1wb3J0IHtcclxuICAgICR5eWltX2lvZ2luLFxyXG4gICAgJHl5aW1fYm94LFxyXG4gICAgJHl5aW1fbWFpbixcclxuICAgICRqX21vdmUsXHJcbiAgICAkal9icV9ib3gsXHJcbiAgICAkeXlpbV9lZGl0b3IsXHJcbiAgICAkYnRuX3NlbmQsXHJcbiAgICAkbG9naW5fdXNlcm5hbWUsXHJcbiAgICAkbG9naW5fcGFzcyxcclxuICAgICRsb2dpbl9idG4sXHJcbiAgICAkaGNvbnRhY3RzLFxyXG4gICAgJGhncm91cHMsXHJcbiAgICAkY2hhdF9ib3gsXHJcbiAgICAkY2hhdHNfbGlzdCxcclxuICAgICRwaWN2aWV3ZXIsXHJcbiAgICBwaWN2aWV3ZXIsXHJcbiAgICAkcGVyc29uaW5mbyxcclxuICAgICRvd25fYXZhdGFyLFxyXG4gICAgJHNtY2hhdCxcclxuICAgICRzbWZyaWVuZCxcclxuICAgICRzbWdyb3VwLFxyXG4gICAgJHNtcHViY291bnRcclxufSBmcm9tICcuL2pxZWxlbWVudHMnO1xyXG4vL+ihqOaDheaVsOaNrlxyXG5pbXBvcnQgeyBleHByZXNzaW9uTGlzdCB9IGZyb20gJy4vY29uc3RhbnRzJztcclxuLy/nlKjmiLfnmbvpmYZcclxuaW1wb3J0IHVzZXJMb2dpbiBmcm9tICcuL3VzZXJMb2dpbic7XHJcbi8v6I635Y+W5pyA6L+R6IGU57O75Lq6XHJcbmltcG9ydCBnZXRSZWNlbnREaWdzZXQgZnJvbSAnLi9nZXRSZWNlbnREaWdzZXQnO1xyXG4vL+a4suafk+acgOi/keiBlOezu+S6ulxyXG5pbXBvcnQgcmVuZGVyUmVjZW50RGlnc2V0IGZyb20gJy4vcmVuZGVyUmVjZW50RGlnc2V0JztcclxuLy/ojrflj5bnvqTnu4RcclxuaW1wb3J0IGdldENoYXRHcm91cHMgZnJvbSAnLi9nZXRDaGF0R3JvdXBzJztcclxuLy/muLLmn5PnvqTnu4RcclxuaW1wb3J0IHJlbmRlckNoYXRHcm91cHMgZnJvbSAnLi9yZW5kZXJDaGF0R3JvdXBzJztcclxuLy/ojrflj5bljoblj7LogYrlpKnorrDlvZVcclxuaW1wb3J0IGdldEhpc3RvcnlNZXNzYWdlIGZyb20gJy4vZ2V0SGlzdG9yeU1lc3NhZ2UnO1xyXG4vL+a4suafk+WOhuWPsuiBiuWkqeiusOW9lVxyXG5pbXBvcnQgcmVuZGVySGlzdG9yeU1lc3NhZ2UgZnJvbSAnLi9yZW5kZXJIaXN0b3J5TWVzc2FnZSc7XHJcblxyXG4vL+aUvue9ruihqOaDheWIl+ihqFxyXG4kal9icV9ib3guaHRtbChleHByZXNzaW9uTGlzdC5kYXRhLm1hcCgodCkgPT4ge1xyXG4gICAgcmV0dXJuIGA8bGkgZGF0YS1jb2RlPVwiJHt0LmFjdGlvbkRhdGF9XCI+PGltZyBzcmM9XCIke2V4cHJlc3Npb25MaXN0LnBhdGgrdC51cmx9XCIgdGl0bGU9XCIke3QuYWN0aW9uRGF0YX1cIiBhbHQ9XCJcIj48L2xpPmA7XHJcbn0pKTtcclxuXHJcbi8v5Li05pe26Ieq5Yqo55m75b2V55qEXHJcbmlmKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50dXNlcmluZm8nKSl7XHJcbiAgICB1c2VyTG9naW4oSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudHVzZXJpbmZvJykpLnVzZXJuYW1lKTtcclxufVxyXG4vL+eUqOaIt+eZu+mZhlxyXG4kbG9naW5fYnRuLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCB1c2VybmFtZSA9ICRsb2dpbl91c2VybmFtZS52YWwoKTtcclxuICAgIGxldCBwYXNzd29yZCA9ICRsb2dpbl9wYXNzLnZhbCgpO1xyXG4gICAgaWYoL15bYS16XVthLXpfMC05XSokLy50ZXN0KHVzZXJuYW1lKSl7XHJcbiAgICAgICAgdXNlckxvZ2luKHVzZXJuYW1lLCBwYXNzd29yZCk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLy/mnIDlpKfljJbmjInpkq7ngrnlh7tcclxuJCgnLnNjYWxlY2hhdCcpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICR5eWltX21haW4uaGFzQ2xhc3MoJ21heHdpbmRvdycpID8gJHl5aW1fbWFpbi5yZW1vdmVDbGFzcygnbWF4d2luZG93JykgOiAkeXlpbV9tYWluLmFkZENsYXNzKCdtYXh3aW5kb3cnKTtcclxuICAgICR5eWltX21haW4uY3NzKHtsZWZ0OiAnMCcsIHRvcDogJzAnfSk7XHJcbn0pO1xyXG5cclxuLy/lhbPpl63nqpflj6PmjInpkq7ngrnlh7tcclxuJCgnLmNsb3NlY2hhdCcpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xyXG4gICAgJHl5aW1fYm94LmhpZGUoKTtcclxuICAgICR5eWltX2lvZ2luLnNob3coKTtcclxufSk7XHJcblxyXG4vL+enu+WKqOS6i+S7tlxyXG4kal9tb3ZlLm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgbGV0IG9yaWdpblggPSBlLmNsaWVudFg7XHJcbiAgICBsZXQgb3JpZ2luWSA9IGUuY2xpZW50WTtcclxuICAgIGxldCBib3hQb3MgPSAkeXlpbV9tYWluLnBvc2l0aW9uKCk7XHJcbiAgICAkeXlpbV9ib3gub24oJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgJHl5aW1fbWFpbi5jc3Moe2xlZnQ6IChib3hQb3MubGVmdCArIGUuY2xpZW50WCAtIG9yaWdpblgpICsgJ3B4JywgdG9wOiAoYm94UG9zLnRvcCArIGUuY2xpZW50WSAtIG9yaWdpblkpICsgJ3B4J30pO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4keXlpbV9ib3gub24oJ21vdXNldXAnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAkKHRoaXMpLm9mZignbW91c2Vtb3ZlJyk7XHJcbn0pO1xyXG5cclxuXHJcbi8v5pCc57Si5aW95Y+LXHJcbiQoJy55eWltLXNlYXJjaCcpLm9uKCdrZXlkb3duJyxmdW5jdGlvbiAoZSkge1xyXG4gICAgbGV0IGtleXdvcmQgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgaWYoZS5rZXlDb2RlID09PSAxMyAmJiBrZXl3b3JkKXtcclxuICAgICAgICAvL+afpeivouWlveWPi1xyXG4gICAgICAgIFlZSU1DaGF0LnF1ZXJ5Um9zdGVySXRlbSh7XHJcbiAgICAgICAgICAgIGtleXdvcmQ6IGtleXdvcmQsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihlcnIpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8v54K55Ye75pyA6L+R6IGU57O75Lq6XHJcbiRoY29udGFjdHMub24oJ2NsaWNrJywnbGknLGZ1bmN0aW9uICgpIHtcclxuICAgICRjaGF0c19saXN0Lmh0bWwoJycpO1xyXG4gICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAkKHRoaXMpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgJGpfbW92ZS5odG1sKCQodGhpcykuYXR0cignZGF0YS1uaWNrbmFtZScpKTtcclxuICAgIC8v5oqK6YCJ5oup55qE6IGK5aSp5a+55pa5aWTkv53lrZjotbfmnaUs55So5LqO57uZ5LuW5Y+R6YCB5raI5oGvXHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndGFyZ2V0dXNlcmlkJywgJCh0aGlzKS5hdHRyKCdkYXRhLWlkJykpO1xyXG4gICAgLy/kv53lrZjogYrlpKnnsbvlnotcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjaGF0dHlwZScsICQodGhpcykuYXR0cignZGF0YS10eXBlJykpO1xyXG4gICAgLy/liKDpmaTkv53lrZjnmoTogYrlpKnljoblj7JcclxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdoaXN0b3J5Y2hhdHMnKTtcclxuICAgIC8v6I635Y+W5Y6G5Y+y6IGK5aSp5L+h5oGvXHJcbiAgICBnZXRIaXN0b3J5TWVzc2FnZSgkKHRoaXMpLmF0dHIoJ2RhdGEtc2Vzc2lvblZlcnNpb24nKSwgJCh0aGlzKS5hdHRyKCdkYXRhLWlkJyksICQodGhpcykuYXR0cignZGF0YS10eXBlJykpO1xyXG59KTtcclxuXHJcbi8v5Yig6Zmk5pyA6L+R6IGU57O75Lq6XHJcbiRoY29udGFjdHMub24oJ2NsaWNrJywnLmNsb3NlJyxmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zdCBjdXJpZCA9ICQodGhpcykuYXR0cignZGF0YS1pZCcpO1xyXG4gICAgWVlJTUNoYXQucmVtb3ZlUmVjZW50RGlnZXN0KHtcclxuICAgICAgICBpZDogY3VyaWQsXHJcbiAgICAgICAgdHlwZTogJCh0aGlzKS5hdHRyKCdkYXRhLXR5cGUnKSxcclxuICAgICAgICBzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgICAvL+S7juacrOWcsOaLv+WPluiBiuWkqeWvueaWuWlkXHJcbiAgICAgICAgICAgIGxldCB0b2lkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RhcmdldHVzZXJpZCcpO1xyXG4gICAgICAgICAgICAvL+aLv+WPluacrOWcsOS/neWtmOeahOacgOi/keiBlOezu+S6uuaVsOe7hFxyXG4gICAgICAgICAgICBsZXQgcmVjZW50RGlnc2V0ID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncmVjZW50ZGlnc2V0JykgfHwgXCJbXVwiKTtcclxuICAgICAgICAgICAgcmVjZW50RGlnc2V0LmZvckVhY2goZnVuY3Rpb24oZGlnZXN0LCBpKXtcclxuICAgICAgICAgICAgICAgIGlmKGRpZ2VzdC5pZCA9PT0gY3VyaWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlY2VudERpZ3NldC5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvL+S/neWtmOS/ruaUueWQjueahOacgOi/keiBlOezu+S6uuaVsOe7hFxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncmVjZW50ZGlnc2V0JywgSlNPTi5zdHJpbmdpZnkocmVjZW50RGlnc2V0KSk7XHJcbiAgICAgICAgICAgIC8v5L+d5a2Y6IGK5aSp57G75Z6LXHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjaGF0dHlwZScsICdncm91cGNoYXQnKTtcclxuICAgICAgICAgICAgLy/muLLmn5PmnIDov5HogZTns7vkurpcclxuICAgICAgICAgICAgcmVuZGVyUmVjZW50RGlnc2V0KHJlY2VudERpZ3NldCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvcjpmdW5jdGlvbihlcnIpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59KTtcclxuXHJcbi8v5p+l55yL6IGK5aSp5raI5oGv5Zu+54mHXHJcbiRjaGF0c19saXN0Lm9uKCdjbGljaycsICcuY2hhdHBpYycsIGZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgcGljdXJsID0gJCh0aGlzKS5hdHRyKCdkYXRhLXVybCcpO1xyXG4gICAgJHBpY3ZpZXdlci5odG1sKCc8bGk+PGltZyBkYXRhLW9yaWdpbmFsPVwiJysgcGljdXJsICsnXCIgc3JjPVwiJysgcGljdXJsICsnXCIgYWx0PVwiXCI+PC9saT4nKVxyXG4gICAgcGljdmlld2VyLnNob3coe3VybDogcGljdXJsfSk7XHJcbn0pO1xyXG5cclxuXHJcblxyXG4vL+ihqOaDheaMiemSrueCueWHu1xyXG4kKCcual9tZW51X2JxJykuaG92ZXIoZnVuY3Rpb24gKCkge1xyXG4gICAgJCh0aGlzKS5hZGRDbGFzcygnaG92ZXInKTtcclxuICAgICQoJy5icV90aXAnKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxufSxmdW5jdGlvbiAoKSB7XHJcbiAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdob3ZlcicpO1xyXG4gICAgJCgnLmJxX3RpcCcpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbn0pLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICRqX2JxX2JveC50b2dnbGUoKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxufSk7XHJcblxyXG4vL+ihqOaDheeCueWHu1xyXG4kal9icV9ib3gub24oJ2NsaWNrJywgJ2xpJywgZnVuY3Rpb24gKCkge1xyXG4gICAgJHl5aW1fZWRpdG9yLnZhbCgkeXlpbV9lZGl0b3IudmFsKCkgKyAkKHRoaXMpLmF0dHIoJ2RhdGEtY29kZScpKTtcclxuICAgIGlmKCR5eWltX2VkaXRvci52YWwoKSl7XHJcbiAgICAgICAgJGJ0bl9zZW5kLnJlbW92ZUNsYXNzKCdhZGl0LWJ0bi1zZW5kLWRpc2FibGVkJyk7XHJcbiAgICB9ZWxzZSB7XHJcbiAgICAgICAgJGJ0bl9zZW5kLmFkZENsYXNzKCdhZGl0LWJ0bi1zZW5kLWRpc2FibGVkJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn0pO1xyXG5cclxuLy/mjInopoHmsYLpmpDol4/ooajmg4XmoYZcclxuJGpfYnFfYm94LmhvdmVyKGZ1bmN0aW9uIChlKSB7fSxmdW5jdGlvbigpeyQodGhpcykuaGlkZSgpfSk7XHJcblxyXG4vL+WPkemAgeWbvueJh+aMiemSrueCueWHu1xyXG4kKCcual9tZW51X3RwJykuaG92ZXIoZnVuY3Rpb24gKCkge1xyXG4gICAgJCh0aGlzKS5hZGRDbGFzcygnaG92ZXInKTtcclxuICAgICQoJy50cF90aXAnKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxufSxmdW5jdGlvbiAoKSB7XHJcbiAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdob3ZlcicpO1xyXG4gICAgJCgnLnRwX3RpcCcpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbn0pLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICQoJyN1cGxvYWRQaWMnKS5jbGljaygpO1xyXG59KTtcclxuXHJcbiQoJyN1cGxvYWRQaWMnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcclxuICAgIC8v6I635Y+W5a+56K+d5Lq6aWRcclxuICAgIGxldCB0byA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0YXJnZXR1c2VyaWQnKTtcclxuICAgIFlZSU1DaGF0LnNlbmRQaWMoe1xyXG4gICAgICAgIGZpbGVJbnB1dElkOid1cGxvYWRQaWMnLCAvL+aWh+S7tuWfn2lkIFxyXG4gICAgICAgIC8vIGRyb3BfZWxlbWVudDogW2Ryb3BJRF0sIC8v5ouW5ou95LiK5Lyg5YWD57SgaWTvvIzmiJbogIXmlbDnu4RcclxuICAgICAgICBjaGF0SW5mbzogZnVuY3Rpb24oKXsgLy/nlKjmiLflj5HpgIHmtojmga/ml7bojrflj5blr7nor53kurrkv6Hmga9cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHRvOiB0bywgLy/lr7nor53kurppZFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2NoYXQnLCAvL2NoYXQvZ3JvdXBjaGF0L3B1YmFjY291bnRcclxuICAgICAgICAgICAgICAgIGV4dGVuZDogJycgLy/mianlsZXlrZfmrrVcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZpbGVGaWx0ZXJlZDogZnVuY3Rpb24oKXt9LCAvL+aWh+S7tuiiq+a3u+WKoOWIsOS4iuS8oOmYn+WIl1xyXG4gICAgICAgIGZpbGVVcGxvYWRlZDogZnVuY3Rpb24oKXt9LCAvL+S4iuS8oOmYn+WIl+afkOS4gOS4quaWh+S7tuS4iuS8oOWujOavlVxyXG4gICAgICAgIGJlZm9yZVVwbG9hZDogZnVuY3Rpb24oKXt9LCAvL+aWh+S7tuS4iuS8oOS5i+WJjeinpuWPkVxyXG4gICAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24obXNnKXtcclxuICAgICAgICAgICAgLy/muLLmn5Pljoblj7Lkv6Hmga9cclxuICAgICAgICAgICAgcmVuZGVySGlzdG9yeU1lc3NhZ2UobXNnKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihlcnIpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcHJvZ3Jlc3M6IGZ1bmN0aW9uKHBybyl7XHJcbiAgICAgICAgICAgIC8v5LiK5Lyg6L+b5bqmXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHBybyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufSk7XHJcblxyXG4vL+aWh+S7tuaMiemSrueCueWHu1xyXG4kKCcual9tZW51X3dqJykuaG92ZXIoZnVuY3Rpb24gKCkge1xyXG4gICAgJCh0aGlzKS5hZGRDbGFzcygnaG92ZXInKTtcclxuICAgICQoJy53al90aXAnKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxufSxmdW5jdGlvbiAoKSB7XHJcbiAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdob3ZlcicpO1xyXG4gICAgJCgnLndqX3RpcCcpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbn0pLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICQoJyN1cGxvYWRGaWxlJykuY2xpY2soKTtcclxufSk7XHJcblxyXG4kKCcjdXBsb2FkRmlsZScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xyXG4gICAgLy/ojrflj5blr7nor53kurppZFxyXG4gICAgbGV0IHRvID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RhcmdldHVzZXJpZCcpO1xyXG4gICAgWVlJTUNoYXQuc2VuZEZpbGUoe1xyXG4gICAgICAgIGZpbGVJbnB1dElkOid1cGxvYWRGaWxlJywgLy/mlofku7bln59pZCBcclxuICAgICAgICAvLyBkcm9wX2VsZW1lbnQ6IFtkcm9wSURdLCAvL+aLluaLveS4iuS8oOWFg+e0oGlk77yM5oiW6ICF5pWw57uEXHJcbiAgICAgICAgY2hhdEluZm86IGZ1bmN0aW9uKCl7IC8v55So5oi35Y+R6YCB5raI5oGv5pe26I635Y+W5a+56K+d5Lq65L+h5oGvXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB0bzogdG8sIC8v5a+56K+d5Lq6aWRcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdjaGF0JywgLy9jaGF0L2dyb3VwY2hhdC9wdWJhY2NvdW50XHJcbiAgICAgICAgICAgICAgICBleHRlbmQ6ICcnIC8v5omp5bGV5a2X5q61XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSxcclxuICAgICAgICBmaWxlRmlsdGVyZWQ6IGZ1bmN0aW9uKCl7fSwgLy/mlofku7booqvmt7vliqDliLDkuIrkvKDpmJ/liJdcclxuICAgICAgICBmaWxlVXBsb2FkZWQ6IGZ1bmN0aW9uKCl7fSwgLy/kuIrkvKDpmJ/liJfmn5DkuIDkuKrmlofku7bkuIrkvKDlrozmr5VcclxuICAgICAgICBiZWZvcmVVcGxvYWQ6IGZ1bmN0aW9uKCl7fSwgLy/mlofku7bkuIrkvKDkuYvliY3op6blj5FcclxuICAgICAgICBzdWNjZXNzOmZ1bmN0aW9uKG1zZyl7XHJcbiAgICAgICAgICAgIC8v5riy5p+T5Y6G5Y+y5L+h5oGvXHJcbiAgICAgICAgICAgIHJlbmRlckhpc3RvcnlNZXNzYWdlKG1zZyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHByb2dyZXNzOiBmdW5jdGlvbihwcm8pe1xyXG4gICAgICAgICAgICAvL+S4iuS8oOi/m+W6plxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwcm8pO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn0pO1xyXG5cclxuXHJcbi8v5o6n5Yi25piv5ZCm5Y+v5Lul5Y+R6YCBXHJcbiR5eWltX2VkaXRvci5vbignaW5wdXQgcHJvcGVydHljaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZigkKHRoaXMpLnZhbCgpKXtcclxuICAgICAgICAkYnRuX3NlbmQucmVtb3ZlQ2xhc3MoJ2FkaXQtYnRuLXNlbmQtZGlzYWJsZWQnKTtcclxuICAgIH1lbHNlIHtcclxuICAgICAgICAkYnRuX3NlbmQuYWRkQ2xhc3MoJ2FkaXQtYnRuLXNlbmQtZGlzYWJsZWQnKTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vL+WPkemAgeaMiemSrueCueWHu1xyXG4kYnRuX3NlbmQub24oJ2NsaWNrJyxmdW5jdGlvbiAoKSB7XHJcbiAgICBpZigkeXlpbV9lZGl0b3IudmFsKCkpe1xyXG4gICAgICAgIC8v5LuO5pys5Zyw5ou/5Y+W6IGK5aSp5a+55pa5aWRcclxuICAgICAgICBsZXQgdG8gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGFyZ2V0dXNlcmlkJyk7XHJcbiAgICAgICAgLy/ku47mnKzlnLDmi7/lj5bogYrlpKnnsbvlnotcclxuICAgICAgICBsZXQgY2hhdHR5cGUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2hhdHR5cGUnKTtcclxuICAgICAgICAvL+iwg+eUqOWPkemAgeaWh+acrOa2iOaBr+aOpeWPo1xyXG4gICAgICAgIFlZSU1DaGF0LnNlbmRUZXh0TWVzc2FnZSh7XHJcbiAgICAgICAgICAgIHRvOiB0bywgLy/lr7nor53kurppZFxyXG4gICAgICAgICAgICB0eXBlOiBjaGF0dHlwZSwgIC8vY2hhdDrljZXogYrvvIxncm91cGNnYXQ6576k6IGKLHB1YmFjY291bnQ65YWs5LyX5Y+3XHJcbiAgICAgICAgICAgIGNvbnRlbnQ6JHl5aW1fZWRpdG9yLnZhbCgpLCAvL+a2iOaBr+aWh+acrFxyXG4gICAgICAgICAgICBleHRlbmQ6ICcnLCAgLy/mianlsZXlrZfmrrVcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKG1zZykge1xyXG4gICAgICAgICAgICAgICAgLy/lj5HpgIHmiJDlip/kuYvlkI7muIXnqbrovpPlhaXmoYZcclxuICAgICAgICAgICAgICAgICR5eWltX2VkaXRvci52YWwoJycpO1xyXG4gICAgICAgICAgICAgICAgJGJ0bl9zZW5kLmFkZENsYXNzKCdhZGl0LWJ0bi1zZW5kLWRpc2FibGVkJyk7XHJcbiAgICAgICAgICAgICAgICAvL+a4suafk+WOhuWPsuS/oeaBr1xyXG4gICAgICAgICAgICAgICAgcmVuZGVySGlzdG9yeU1lc3NhZ2UobXNnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8v5oyJ5LiLZW50ZXLkuZ/lj6/ku6Xlj5HpgIFcclxuJHl5aW1fZWRpdG9yLm9uKCdrZXlkb3duJyxmdW5jdGlvbihlKXtcclxuICAgIGlmKGUua2V5Q29kZSA9PT0gMTMgJiYgJHl5aW1fZWRpdG9yLnZhbCgpKXtcclxuICAgICAgICAvL+S7juacrOWcsOaLv+WPluiBiuWkqeWvueaWuWlkXHJcbiAgICAgICAgbGV0IHRvID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RhcmdldHVzZXJpZCcpO1xyXG4gICAgICAgIC8v5LuO5pys5Zyw5ou/5Y+W6IGK5aSp57G75Z6LXHJcbiAgICAgICAgbGV0IGNoYXR0eXBlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NoYXR0eXBlJyk7XHJcbiAgICAgICAgLy/osIPnlKjlj5HpgIHmlofmnKzmtojmga/mjqXlj6NcclxuICAgICAgICBZWUlNQ2hhdC5zZW5kVGV4dE1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICB0bzogdG8sIC8v5a+56K+d5Lq6aWRcclxuICAgICAgICAgICAgdHlwZTogY2hhdHR5cGUsICAvL2NoYXQ65Y2V6IGK77yMZ3JvdXBjaGF0Oue+pOiBiixwdWJhY2NvdW50OuWFrOS8l+WPt1xyXG4gICAgICAgICAgICBjb250ZW50OiR5eWltX2VkaXRvci52YWwoKSwgLy/mtojmga/mlofmnKxcclxuICAgICAgICAgICAgYm9keTogJycsICAvL+aJqeWxleWtl+autVxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAobXNnKSB7XHJcbiAgICAgICAgICAgICAgICAvL+WPkemAgeaIkOWKn+S5i+WQjua4heepuui+k+WFpeahhlxyXG4gICAgICAgICAgICAgICAgJHl5aW1fZWRpdG9yLnZhbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAkYnRuX3NlbmQuYWRkQ2xhc3MoJ2FkaXQtYnRuLXNlbmQtZGlzYWJsZWQnKTtcclxuICAgICAgICAgICAgICAgIC8v5riy5p+T5Y6G5Y+y5L+h5oGvXHJcbiAgICAgICAgICAgICAgICByZW5kZXJIaXN0b3J5TWVzc2FnZShtc2cpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLy/lpLTlg4/ngrnlh7tcclxuJG93bl9hdmF0YXIub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xyXG4gICAgbGV0IHVzZXJWY2FyZCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnR1c2VyaW5mbycpIHx8IFwie31cIik7XHJcbiAgICAkcGVyc29uaW5mby5odG1sKGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNpdGVcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoZFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoZHBpY1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7dXNlclZjYXJkLnBob3RvPyBZWUlNQ2hhdC5nZXRGaWxlVXJsKHVzZXJWY2FyZC5waG90bykgOiAnJ31cIiBhbHQ9XCJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJuaWNrbmFtZVwiPiR7dXNlclZjYXJkLm5pY2tuYW1lIHx8IHVzZXJWY2FyZC5pZH08L2gzPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJpbmZvbGlzdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsaT48bGFiZWw+6YKu566xPC9sYWJlbD4ke3VzZXJWY2FyZC5lbWFpbCB8fCAnJ308L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsaT48bGFiZWw+5oCn5YirPC9sYWJlbD4ke3VzZXJWY2FyZC5nZW5kZXIgfHwgJyd9PC9saT5cclxuICAgICAgICAgICAgICAgICAgICA8bGk+PGxhYmVsPuaJi+acujwvbGFiZWw+JHt1c2VyVmNhcmQubW9iaWxlIHx8ICcnfTwvbGk+XHJcbiAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjbG9zZV9jaGF0bXNrXCI+w5c8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgYCkuc2hvdygpO1xyXG59KTtcclxuLy/lhbPpl63kuKrkurrkv6Hmga9cclxuJHBlcnNvbmluZm8ub24oJ2NsaWNrJywnLmNsb3NlX2NoYXRtc2snLGZ1bmN0aW9uKCl7XHJcbiAgICAkcGVyc29uaW5mby5oaWRlKCk7XHJcbn0pO1xyXG5cclxuLy/oj5zljZUt6IGK5aSpXHJcbiRzbWNoYXQub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xyXG4gICAgaWYoJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykpe3JldHVybjt9XHJcbiAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICQodGhpcykuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblxyXG4gICAgJGhncm91cHMuaGlkZSgpO1xyXG4gICAgJGhjb250YWN0cy5zaG93KCk7XHJcbiAgICAvL+enu+mZpOS/neWtmOeahOmAmuiur+WvueaWuWlk77yM6YG/5YWN6aG16Z2i5Yi35paw5ZCO5pyA6L+R6IGU57O75Lq66IGU57O754q25oCB6L+Y6K6w5b2V552AXHJcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndGFyZ2V0dXNlcmlkJyk7XHJcbiAgICAvL+acrOWcsOaLieWPluiOt+WPluacgOi/keiBlOezu+S6ulxyXG4gICAgbGV0IHJlY2VudGRpZ3NldCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdyZWNlbnRkaWdzZXQnKSB8fCBcIltdXCI7XHJcbiAgICByZW5kZXJSZWNlbnREaWdzZXQoSlNPTi5wYXJzZShyZWNlbnRkaWdzZXQpKTtcclxufSk7XHJcbi8v6I+c5Y2VLeWlveWPi1xyXG4kc21mcmllbmQub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xyXG4gICAgaWYoJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykpe3JldHVybjt9XHJcbiAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICQodGhpcykuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbn0pO1xyXG4vL+iPnOWNlS3nvqTnu4RcclxuJHNtZ3JvdXAub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xyXG4gICAgaWYoJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykpe3JldHVybjt9XHJcbiAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICQodGhpcykuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAvL+a4heepuuiBiuWkqeWktOmDqOWQjeensFxyXG4gICAgJGpfbW92ZS5odG1sKCcnKTtcclxuICAgIC8v6ZqQ6JeP5pyA6L+R6IGU57O75Lq65YiX6KGoXHJcbiAgICAkaGNvbnRhY3RzLmhpZGUoKTtcclxuICAgIC8v6ZqQ6JeP6IGK5aSp5qGGXHJcbiAgICAkY2hhdF9ib3guaGlkZSgpO1xyXG4gICAgLy/mmL7npLrnvqTnu4TliJfooahcclxuICAgICRoZ3JvdXBzLmh0bWwoJycpO1xyXG4gICAgJGhncm91cHMuc2hvdygpO1xyXG5cclxuICAgIGxldCByb29tSXRlbXMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncm9vbUl0ZW1zJyk7XHJcbiAgICBpZihyb29tSXRlbXMpe1xyXG4gICAgICAgIC8v5L2/55So5pys5Zyw5L+d5a2Y55qE576k57uE5riy5p+TXHJcbiAgICAgICAgcmVuZGVyQ2hhdEdyb3VwcyhKU09OLnBhcnNlKHJvb21JdGVtcykpO1xyXG4gICAgfWVsc2Uge1xyXG4gICAgICAgIC8v6YeN5paw6I635Y+W576k57uEXHJcbiAgICAgICAgZ2V0Q2hhdEdyb3VwcygpO1xyXG4gICAgfVxyXG59KTtcclxuLy/oj5zljZUt5YWs5LyX5Y+3XHJcbiRzbXB1YmNvdW50Lm9uKCdjbGljaycsZnVuY3Rpb24oKXtcclxuICAgIGlmKCQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZScpKXtyZXR1cm47fVxyXG5cclxuICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgJCh0aGlzKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxufSk7XHJcblxyXG4kaGdyb3Vwcy5vbignY2xpY2snLCAnbGknLCBmdW5jdGlvbigpe1xyXG4gICAgJHNtY2hhdC5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAkc21jaGF0LnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgJGhncm91cHMuaGlkZSgpO1xyXG4gICAgJGhjb250YWN0cy5odG1sKCcnKTtcclxuICAgICRoY29udGFjdHMuc2hvdygpO1xyXG5cclxuICAgIC8v5L+u5pS55b2T5YmN6IGU57O75Lq6aWRcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0YXJnZXR1c2VyaWQnLCAkKHRoaXMpLmF0dHIoJ2RhdGEtaWQnKSk7XHJcblxyXG4gICAgbGV0IHRoYXQgPSAkKHRoaXMpO1xyXG4gICAgLy/mi7/lj5bmnKzlnLDkv53lrZjnmoTmnIDov5HogZTns7vkurrmlbDnu4RcclxuICAgIGxldCByZWNlbnREaWdzZXQgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdyZWNlbnRkaWdzZXQnKSB8fCBcIltdXCIpO1xyXG4gICAgbGV0IGlzZGlnc2V0ID0gZmFsc2U7IC8v5Yik5pat6K+l5YWs5LyX5Y+35Zyo5LiN5Zyo5oiR55qE5pyA6L+R6IGU57O75Lq66YeMXHJcbiAgICByZWNlbnREaWdzZXQuZm9yRWFjaChmdW5jdGlvbihkaWdlc3QsIGkpe1xyXG4gICAgICAgIGlmKGRpZ2VzdC5pZCA9PT0gdGhhdC5hdHRyKCdkYXRhLWlkJykpe1xyXG4gICAgICAgICAgICBpc2RpZ3NldCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAvL+S4jeWcqOacgOi/keiBlOezu+S6uuS4re+8jOWIt+aWsOacgOi/keiBlOezu+S6uuWIl+ihqFxyXG4gICAgaWYoIWlzZGlnc2V0KXtcclxuICAgICAgICByZWNlbnREaWdzZXQucHVzaCh7XHJcbiAgICAgICAgICAgIGlkOiB0aGF0LmF0dHIoJ2RhdGEtaWQnKSxcclxuICAgICAgICAgICAgcmVhZGVkVmVyc2lvbjogMCxcclxuICAgICAgICAgICAgc2Vzc2lvblZlcnNpb246IDAsXHJcbiAgICAgICAgICAgIHR5cGU6ICdncm91cGNoYXQnLFxyXG4gICAgICAgICAgICBwaG90bzogdGhhdC5hdHRyKCdkYXRhLXBob3RvJyksXHJcbiAgICAgICAgICAgIG5pY2tuYW1lOiAgdGhhdC5hdHRyKCdkYXRhLW5hbWUnKSxcclxuICAgICAgICAgICAgbGFzdE1lc3NhZ2U6IG51bGwsXHJcbiAgICAgICAgICAgIGxhc3RDb250YWN0VGltZTogbmV3IERhdGUoKS5nZXRUaW1lKClcclxuICAgICAgICB9KTtcclxuICAgICAgICAvL+S/neWtmOS/ruaUueWQjueahOacgOi/keiBlOezu+S6uuaVsOe7hFxyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyZWNlbnRkaWdzZXQnLCBKU09OLnN0cmluZ2lmeShyZWNlbnREaWdzZXQpKTtcclxuICAgICAgICAvL+S/neWtmOiBiuWkqeexu+Wei1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjaGF0dHlwZScsICdncm91cGNoYXQnKTtcclxuICAgIH1cclxuICAgIC8v5riy5p+T5pyA6L+R6IGU57O75Lq6XHJcbiAgICByZW5kZXJSZWNlbnREaWdzZXQocmVjZW50RGlnc2V0KTtcclxuICAgIC8v5o2i5Liq6IGK5aSp55qE5aS06YOo5ZCN56ewXHJcbiAgICAkal9tb3ZlLmh0bWwoJCh0aGlzKS5hdHRyKCdkYXRhLW5hbWUnKSk7XHJcbiAgICAvL+WIoOmZpOS/neWtmOeahOiBiuWkqeWOhuWPslxyXG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2hpc3RvcnljaGF0cycpO1xyXG4gICAgLy/ojrflj5bljoblj7LogYrlpKnkv6Hmga9cclxuICAgIGdldEhpc3RvcnlNZXNzYWdlKDAsICQodGhpcykuYXR0cignZGF0YS1pZCcpLCAnZ3JvdXBjaGF0Jyk7XHJcbn0pO1xyXG4iLCJpbXBvcnQgcmVuZGVyQ2hhdEdyb3VwcyBmcm9tICcuL3JlbmRlckNoYXRHcm91cHMnO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0ICgpID0+IHtcclxuXHJcbiAgICAvL+iOt+WPlue+pOe7hOWIl+ihqFxyXG4gICAgWVlJTUNoYXQuZ2V0Q2hhdEdyb3Vwcyh7XHJcbiAgICAgICAgc3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgICAgLy/kv53lrZjnvqTliJfooajmlbDnu4RcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Jvb21JdGVtcycsIEpTT04uc3RyaW5naWZ5KGRhdGEucm9vbUl0ZW1zKSk7XHJcbiAgICAgICAgICAgIHJlbmRlckNoYXRHcm91cHMoZGF0YS5yb29tSXRlbXMpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6ZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSIsIi8vZG9t5YWD57SgXHJcbmltcG9ydCB7XHJcbiAgICAkY2hhdF9ib3gsXHJcbiAgICAkY2hhdHNfbGlzdFxyXG59IGZyb20gJy4vanFlbGVtZW50cyc7XHJcblxyXG4vL+a4suafk+iBiuWkqeiusOW9lVxyXG5pbXBvcnQgcmVuZGVySGlzdG9yeU1lc3NhZ2UgZnJvbSAnLi9yZW5kZXJIaXN0b3J5TWVzc2FnZSc7XHJcblxyXG4vL+iOt+WPluiBiuWkqeWOhuWPsizkvKDlhaVzZXNzaW9uVmVyc2lvbizlr7nmlrlpZOWSjHR5cGXlj4LmlbBcclxuZXhwb3J0IGRlZmF1bHQgKHNlc3Npb25WZXJzaW9uLCBpZCwgdHlwZSkgPT4ge1xyXG4gICAgbGV0IHN0YXJ0ID0gc2Vzc2lvblZlcnNpb24gPiAyMCA/IHNlc3Npb25WZXJzaW9uIC0gMjAgOiAwO1xyXG4gICAgLy/ojrflj5bljoblj7LogYrlpKnkv6Hmga9cclxuICAgIFlZSU1DaGF0LmdldEhpc3RvcnlNZXNzYWdlKHtcclxuICAgICAgICBpZDogaWQsXHJcbiAgICAgICAgdHlwZTogdHlwZSxcclxuICAgICAgICBzdGFydFZlcnNpb246IHN0YXJ0LFxyXG4gICAgICAgIGVuZFZlcnNpb246IHNlc3Npb25WZXJzaW9uLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgbGV0IGhpc3RvcnljaGF0cyA9IHJlcy5yZXN1bHQgfHwgW107XHJcbiAgICAgICAgICAgICRjaGF0X2JveC5zaG93KCk7XHJcbiAgICAgICAgICAgIGhpc3RvcnljaGF0cy5yZXZlcnNlKCk7XHJcbiAgICAgICAgICAgIC8v5oqK6IGK5aSp6K6w5b2V57yT5a2Y5Yiw5pys5ZywXHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdoaXN0b3J5Y2hhdHMnLCBKU09OLnN0cmluZ2lmeShoaXN0b3J5Y2hhdHMpKTtcclxuICAgICAgICAgICAgLy/muLLmn5PogYrlpKnkv6Hmga9cclxuICAgICAgICAgICAgcmVuZGVySGlzdG9yeU1lc3NhZ2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTsiLCJcclxuLy/lr7zlhaXmnIDov5HogZTns7vkurrmuLLmn5Plh73mlbBcclxuaW1wb3J0IHJlbmRlclJlY2VudERpZ3NldCBmcm9tICcuL3JlbmRlclJlY2VudERpZ3NldCc7XHJcblxyXG4vL+iOt+WPluacgOi/keiBlOezu+S6ulxyXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XHJcbiAgICAvLyDojrflj5bmnIDov5HogZTns7vkurpBUElcclxuICAgIFlZSU1DaGF0LmdldFJlY2VudERpZ3NldCh7XHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0Lmxpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVjZW50RGlnc2V0ID0gW107XHJcbiAgICAgICAgICAgICAgICByZXN1bHQubGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGUsIGkpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8v55uu5YmN5rWL6K+V5Y+q5pi+56S65Liq5Lq66IGK5aSp77yM5LiN5pi+56S6576k5oiW5YW25LuWIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGUudHlwZSAhPT0gJ2NoYXQnICYmIGUudHlwZSAhPT0gJ2dyb3VwY2hhdCcpe3JldHVybjt9XHJcbiAgICAgICAgICAgICAgICAgICAgLy/pgJrov4dpZOiOt+WPluS4quS6uuS/oeaBr1xyXG4gICAgICAgICAgICAgICAgICAgIFlZSU1DaGF0LmdldFZDYXJkKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGUuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+aVtOeQhuacgOi/keiBlOezu+S6uuWIl+ihqOWIsOS4gOS4quaWsOaVsOe7hFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjZW50RGlnc2V0LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiByZXMuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZGVkVmVyc2lvbjogZS5yZWFkZWRWZXJzaW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlc3Npb25WZXJzaW9uOiBlLnNlc3Npb25WZXJzaW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGUudHlwZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaG90bzogcmVzLnBob3RvIHx8ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5pY2tuYW1lOiByZXMubmlja25hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdE1lc3NhZ2U6IGUubGFzdE1lc3NhZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdENvbnRhY3RUaW1lOiBlLmxhc3RDb250YWN0VGltZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+aKiuacgOi/keiBlOezu+S6uuWIl+ihqOS/neWtmOWIsOacrOWcsFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3JlY2VudGRpZ3NldCcsIEpTT04uc3RyaW5naWZ5KHJlY2VudERpZ3NldCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyUmVjZW50RGlnc2V0KHJlY2VudERpZ3NldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvcjpmdW5jdGlvbiAoZXJyKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSIsIlxyXG5leHBvcnQgY29uc3QgJHl5aW1faW9naW4gPSAkKCcueXlpbS1pb2dpbicpOy8v55m76ZmG5qGGXHJcbmV4cG9ydCBjb25zdCAkbG9naW5fdXNlcm5hbWUgPSAkKCcubG9naW4tdXNlcm5hbWUnKTsvL+eZu+mZhueUqOaIt+WQjVxyXG5leHBvcnQgY29uc3QgJGxvZ2luX3Bhc3MgPSAkKCcubG9naW4tcGFzcycpOy8v55m76ZmG55So5oi35a+G56CBXHJcbmV4cG9ydCBjb25zdCAkbG9naW5fYnRuID0gJCgnLmxvZ2luLWJ0bicpOy8v55m76ZmG5oyJ6ZKuXHJcbmV4cG9ydCBjb25zdCAkeXlpbV9ib3ggPSAkKCcueXlpbS1ib3gnKTsvL+iBiuWkqeahhueahOmBrue9qVxyXG5leHBvcnQgY29uc3QgJHl5aW1fbWFpbiA9ICQoJy55eWltLW1haW4nKTsvL+iBiuWkqeacgOWkluWxgueql+WPo1xyXG5leHBvcnQgY29uc3QgJGpfbW92ZSA9ICQoJy5qX21vdmUnKTsvL+iBiuWkqeeql+WPo+WktFxyXG5leHBvcnQgY29uc3QgJGhjb250YWN0cyA9ICQoJy5oY29udGFjdHMnKTsvL+acgOi/keiBlOezu+S6uuahhlxyXG5leHBvcnQgY29uc3QgJGhncm91cHMgPSAkKCcuaGdyb3VwcycpOy8v5oiR55qE576k57uE5qGGXHJcbmV4cG9ydCBjb25zdCAkY2hhdHMgPSAkKCcuY2hhdHMnKTsvL+iBiuWkqeS/oeaBr+a7keWKqOWuueWZqFxyXG5leHBvcnQgY29uc3QgJGpfYnFfYm94ID0gJCgnLmpfYnFfYm94Jyk7Ly/ooajmg4Xnm5LlrZBcclxuZXhwb3J0IGNvbnN0ICR5eWltX2VkaXRvciA9ICQoJy55eWltLWVkaXRvcicpOy8v6IGK5aSp6L6T5YWl5qGGXHJcbmV4cG9ydCBjb25zdCAkYnRuX3NlbmQgPSAkKCcuYWRpdC1idG4tc2VuZCcpOyAvL+WPkemAgeaMiemSrlxyXG5leHBvcnQgY29uc3QgJGNoYXRfYm94ID0gJCgnLmNoYXQtYm94Jyk7IC8v5o6n5Yi25piv5ZCm5YW35pyJ6IGK5aSp5YaF5a65XHJcbmV4cG9ydCBjb25zdCAkY2hhdHNfbGlzdCA9ICQoJy5jaGF0cy1saXN0Jyk7IC8v6IGK5aSp5L+h5oGv5YiX6KGoXHJcbmV4cG9ydCBjb25zdCAkcGljdmlld2VyID0gJCgnI3BpY3ZpZXdlcicpOyAvL+WbvueJh+afpeeci+ahhlxyXG5cclxuZXhwb3J0IGNvbnN0ICRvd25fYXZhdGFyID0gJCgnLm93bl9hdmF0YXInKTsgLy/kuKrkurrlpLTlg4/moYZcclxuZXhwb3J0IGNvbnN0ICRwZXJzb25pbmZvID0gJCgnLnBlcnNvbmluZm8nKTsgLy/kuKrkurrkv6Hmga/moYZcclxuXHJcbmV4cG9ydCBjb25zdCAkc21jaGF0ID0gJCgnLnNtY2hhdCcpOyAvL+iPnOWNlS3ogYrlpKlcclxuZXhwb3J0IGNvbnN0ICRzbWZyaWVuZCA9ICQoJy5zbWZyaWVuZCcpOyAvL+iPnOWNlS3lpb3lj4tcclxuZXhwb3J0IGNvbnN0ICRzbWdyb3VwID0gJCgnLnNtZ3JvdXAnKTsgLy/oj5zljZUt576k57uEXHJcbmV4cG9ydCBjb25zdCAkc21wdWJjb3VudCA9ICQoJy5zbXB1YmNvdW50Jyk7IC8v6I+c5Y2VLeWFrOS8l+WPt1xyXG5cclxuLy/lrp7kvovljJZ2aWV3ZXJcclxuZXhwb3J0IGNvbnN0IHBpY3ZpZXdlciA9IG5ldyBWaWV3ZXIoJHBpY3ZpZXdlclswXSwge25hdmJhcjpmYWxzZSwgdGl0bGU6IGZhbHNlfSk7XHJcbi8vIHZpZXdlci5zaG93KHtcclxuLy8gICAgIHVybDogJ2h0dHBzOi8vd3d3LmJhaWR1LmNvbS9pbWcvYmRfbG9nbzEucG5nJ1xyXG4vLyB9KVxyXG4vLyAkcGljdmlld2VyLnZpZXdlcih7XHJcbi8vICAgICB1cmw6ICdodHRwczovL3d3dy5iYWlkdS5jb20vaW1nL2JkX2xvZ28xLnBuZycsIC8v6K6+572u5aSn5Zu+54mH55qEIHVybFxyXG4vLyAgICAgbmF2YmFyOnRydWUsIC8v5piv5ZCm5pi+56S657yp55Wl5Zu+5a+86IiqXHJcbi8vICAgICB0b29sYmFyOnRydWUsIC8v5pi+56S65bel5YW35qCPXHJcbi8vICAgICB0aXRsZTp0cnVlLCAvL+aYvuekuuW9k+WJjeWbvueJh+agh+mimChhbHTlsZ7mgKflkozlsLrlr7gpXHJcbi8vICAgICB0b29sdGlwOnRydWUsIC8v5pi+56S657yp5pS+55m+5YiG5q+UXHJcbi8vICAgICBtb3ZhYmxlOnRydWUsIC8v5Zu+54mH5piv5ZCm5Y+v56e75YqoXHJcbi8vICAgICB6b29tYWJsZTp0cnVlLCAvL+WbvueJh+aYr+WQpuWPr+e8qeaUvlxyXG4vLyAgICAgcm90YXRhYmxlOnRydWUsIC8v5Zu+54mH5piv5ZCm5Y+v5peL6L2sXHJcbi8vICAgICBzY2FsYWJsZTp0cnVlLCAvL+WbvueJh+aYr+WQpuWPr+e/u+i9rFxyXG4vLyAgICAgdHJhbnNpdGlvbjp0cnVlLCAvL+S9v+eUqCBDU1MzIOi/h+W6plxyXG4vLyAgICAgZnVsbHNjcmVlbjp0cnVlLCAvL+aSreaUvuaXtuaYr+WQpuWFqOWxj1xyXG4vLyAgICAga2V5Ym9hcmQ6dHJ1ZSwgLy/mmK/lkKbmlK/mjIHplK7nm5hcclxuLy8gICAgIGludGVydmFsOjUwMDAsIC8v5pKt5pS+6Ze06ZqU77yM5Y2V5L2N5Li65q+r56eSXHJcbi8vICAgICB6b29tUmF0aW86MC4xLCAvL+m8oOagh+a7muWKqOaXtueahOe8qeaUvuavlOS+i1xyXG4vLyAgICAgbWluWm9vbVJhdGlvOjAuMDEsIC8v5pyA5bCP57yp5pS+5q+U5L6LXHJcbi8vICAgICBtYXhab29tUmF0aW86MTAwLCAvL+acgOWkp+e8qeaUvuavlOS+i1xyXG4vLyAgICAgekluZGV4OjIwMTUsIC8v6K6+572u5Zu+54mH5p+l55yL5ZmoIG1vZGFsIOaooeW8j+aXtueahCB6LWluZGV4XHJcbi8vICAgICB6SW5kZXhJbmxpbmU6MCwgLy/orr7nva7lm77niYfmn6XnnIvlmaggaW5saW5lIOaooeW8j+aXtueahCB6LWluZGV4XHJcbi8vIH0pLnNob3coKTsiLCJcclxuLy9kb23lhYPntKBcclxuaW1wb3J0IHtcclxuICAgICRoZ3JvdXBzXHJcbn0gZnJvbSAnLi9qcWVsZW1lbnRzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IChncm91cHMpID0+IHtcclxuICAgIGxldCBncm91cFN0ciA9ICcnO1xyXG4gICAgZ3JvdXBzLmZvckVhY2goZnVuY3Rpb24oZ3JvdXApe1xyXG4gICAgICAgIGdyb3VwU3RyICs9IGA8bGkgZGF0YS1pZD1cIiR7Z3JvdXAuaWR9XCIgZGF0YS1uYW1lPVwiJHtncm91cC5uYW1lfVwiIGRhdGEtcGhvdG89XCIke2dyb3VwLnBob3RvIHx8ICcnfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhdmF0YXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke1lZSU1DaGF0LmdldEZpbGVVcmwoZ3JvdXAucGhvdG8pIHx8ICcuL2ltZ3MvYXZhdGFyLmpwZyd9XCIgYWx0PVwiXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRldGFpbCBkaW5neXVlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cIm5hbWUgY3V0dHh0XCI+JHtncm91cC5uYW1lIHx8ICfnvqTnu4QnfTwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2xpPmA7XHJcbiAgICB9KTtcclxuICAgICRoZ3JvdXBzLmh0bWwoZ3JvdXBTdHIpO1xyXG59IiwiXHJcbi8vZG9t5YWD57SgXHJcbmltcG9ydCB7XHJcbiAgICAkY2hhdHMsXHJcbiAgICAkY2hhdHNfbGlzdFxyXG59IGZyb20gJy4vanFlbGVtZW50cyc7XHJcblxyXG4vL+iOt+WPluacgOi/keiBlOezu+S6uuWHveaVsFxyXG5pbXBvcnQgZ2V0UmVjZW50RGlnc2V0IGZyb20gJy4vZ2V0UmVjZW50RGlnc2V0JztcclxuXHJcbi8v5riy5p+T5pyA6L+R6IGU57O75Lq65Ye95pWwXHJcbmltcG9ydCByZW5kZXJSZWNlbnREaWdzZXQgZnJvbSAnLi9yZW5kZXJSZWNlbnREaWdzZXQnO1xyXG5cclxuLy/ooajmg4XmlbDmja5cclxuaW1wb3J0IHsgZXhwcmVzc2lvbkxpc3QgfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcblxyXG4vL+eUqOWbvueJh+abv+aNouaWh+acrOa2iOaBr+S4reihqOaDheS/oeaBr1xyXG5jb25zdCByZXBsYWNlRW1vamkgPSAoc3RyKSA9PiB7XHJcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1xcW1teXFxbXFxdXStcXF0vZywoZSkgPT4ge1xyXG4gICAgICAgIGZvciAobGV0IGk9MDtpPGV4cHJlc3Npb25MaXN0LmRhdGEubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIGlmKGV4cHJlc3Npb25MaXN0LmRhdGFbaV0uYWN0aW9uRGF0YSA9PT0gZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYDxpbWcgY2xhc3M9XCJlbW9qaVwiIHNyYz1cIiR7ZXhwcmVzc2lvbkxpc3QucGF0aCArIGV4cHJlc3Npb25MaXN0LmRhdGFbaV0udXJsfVwiIGFsdD1cIlwiIC8+YDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vL+a4suafk+iBiuWkqeiusOW9lSzlpoLmnpzpnIDopoHmlrDliqDlhaXkuIDmnaHogYrlpKnkv6Hmga/vvIzkvKDlhaXkuIDmnaHogYrlpKnorrDlvZXlr7nosaHljbPlj6/jgIJcclxuZXhwb3J0IGRlZmF1bHQgKG1zZykgPT4ge1xyXG4gICAgLy/mi7/lj5bmnKzlnLDkv53lrZjnmoTljoblj7LogYrlpKnkv6Hmga9cclxuICAgIGxldCBoaXN0b3J5Y2hhdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdoaXN0b3J5Y2hhdHMnKSB8fCBcIltdXCIpO1xyXG4gICAgLy/mi7/lj5bmnKzlnLDkv53lrZjnmoTmnIDov5HogZTns7vkurrmlbDnu4RcclxuICAgIGxldCByZWNlbnREaWdzZXQgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdyZWNlbnRkaWdzZXQnKSB8fCBcIltdXCIpO1xyXG4gICAgLy/ku47mnKzlnLDmi7/lj5bogYrlpKnlr7nmlrlpZFxyXG4gICAgbGV0IHRhcmdldHVzZXJpZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0YXJnZXR1c2VyaWQnKTtcclxuICAgIC8v5ou/5oiR6Ieq5bex55qEaWRcclxuICAgIGxldCBteWlkID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudHVzZXJpbmZvJykpLmlkO1xyXG4gICAgLy/mi7/lvZPliY3nmoTogYrlpKnnsbvlnotcclxuICAgIGxldCBjaGF0dHlwZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjaGF0dHlwZScpO1xyXG5cclxuICAgIC8v5raI5oGv5p2l5rqQaWRcclxuICAgIGxldCBtc2dmcm9taWQgPSAnJztcclxuXHJcbiAgICAvL+WmguaenG1zZ+WtmOWcqO+8jOivtOaYjuaIkeato+WcqOWPkemAgea2iOaBr+aIluiAheaIkeaOpeaUtuWIsOS6huWIq+S6uueahOa2iOaBr1xyXG4gICAgaWYobXNnKXtcclxuICAgICAgICBtc2dmcm9taWQgPSBjaGF0dHlwZSA9PT0gJ2NoYXQnID8gbXNnLmZyb20gOiBtc2cuZnJvbS5yb3N0ZXI7XHJcbiAgICAgICAgbGV0IGlzZnJvbW1lID0gbXlpZCA9PT0gbXNnZnJvbWlkO1xyXG4gICAgICAgIGlmKGlzZnJvbW1lKXsgLy/mtojmga/mmK/miJHlj5Hnu5nliKvkurrnmoRcclxuICAgICAgICAgICAgcmVjZW50RGlnc2V0LmZvckVhY2goZnVuY3Rpb24oZGlnZXN0LCBpKXtcclxuICAgICAgICAgICAgICAgIGlmKGRpZ2VzdC5pZCA9PT0gdGFyZ2V0dXNlcmlkKXtcclxuICAgICAgICAgICAgICAgICAgICByZWNlbnREaWdzZXRbaV0ubGFzdENvbnRhY3RUaW1lID0gbXNnLmRhdGEuZGF0ZWxpbmU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVjZW50RGlnc2V0W2ldLmxhc3RNZXNzYWdlID0gbXNnO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlY2VudERpZ3NldFtpXS5zZXNzaW9uVmVyc2lvbisrO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlY2VudERpZ3NldFtpXS5yZWFkZWRWZXJzaW9uKys7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/kv53lrZjkv67mlLnlkI7nmoTmnIDov5HogZTns7vkurrmlbDnu4RcclxuICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncmVjZW50ZGlnc2V0JywgSlNPTi5zdHJpbmdpZnkocmVjZW50RGlnc2V0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/muLLmn5PmnIDov5HogZTns7vkurpcclxuICAgICAgICAgICAgICAgICAgICByZW5kZXJSZWNlbnREaWdzZXQocmVjZW50RGlnc2V0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8v5L+u5pS55Y6G5Y+y5raI5oGvXHJcbiAgICAgICAgICAgIGhpc3RvcnljaGF0cy5wdXNoKG1zZyk7XHJcbiAgICAgICAgICAgIC8v5L+u5pS55ZCO5L+d5a2YXHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdoaXN0b3J5Y2hhdHMnLEpTT04uc3RyaW5naWZ5KGhpc3RvcnljaGF0cykpO1xyXG4gICAgICAgIH0gZWxzZSB7IC8v5raI5oGv5p2l6Ieq5LqO5LuW5Lq657uZ5oiR5Y+R55qEXHJcbiAgICAgICAgICAgIGxldCBpc2RpZ3NldCA9IGZhbHNlOyAvL+WIpOaWreWvueaWueWcqOS4jeWcqOaIkeeahOacgOi/keiBlOezu+S6uumHjFxyXG4gICAgICAgICAgICByZWNlbnREaWdzZXQuZm9yRWFjaChmdW5jdGlvbihkaWdlc3QsIGkpe1xyXG4gICAgICAgICAgICAgICAgaWYoZGlnZXN0LmlkID09PSBtc2dmcm9taWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlzZGlnc2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICByZWNlbnREaWdzZXRbaV0ubGFzdENvbnRhY3RUaW1lID0gbXNnLmRhdGEuZGF0ZWxpbmU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVjZW50RGlnc2V0W2ldLmxhc3RNZXNzYWdlID0gbXNnO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlY2VudERpZ3NldFtpXS5zZXNzaW9uVmVyc2lvbisrO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlY2VudERpZ3NldFtpXS5yZWFkZWRWZXJzaW9uKys7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/kv53lrZjkv67mlLnlkI7nmoTmnIDov5HogZTns7vkurrmlbDnu4RcclxuICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncmVjZW50ZGlnc2V0JywgSlNPTi5zdHJpbmdpZnkocmVjZW50RGlnc2V0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/muLLmn5PmnIDov5HogZTns7vkurpcclxuICAgICAgICAgICAgICAgICAgICByZW5kZXJSZWNlbnREaWdzZXQocmVjZW50RGlnc2V0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8v5LiN5Zyo5pyA6L+R6IGU57O75Lq65Lit77yM5Yi35paw5pyA6L+R6IGU57O75Lq65YiX6KGoXHJcbiAgICAgICAgICAgIGlmKCFpc2RpZ3NldCl7Z2V0UmVjZW50RGlnc2V0KCk7fVxyXG4gICAgICAgICAgICAvL+aIkeato+WcqOWSjOS7luiBiuWkqVxyXG4gICAgICAgICAgICBpZihtc2dmcm9taWQgPT09IHRhcmdldHVzZXJpZCl7XHJcbiAgICAgICAgICAgICAgICAvL+S/ruaUueWOhuWPsua2iOaBr1xyXG4gICAgICAgICAgICAgICAgaGlzdG9yeWNoYXRzLnB1c2gobXNnKTtcclxuICAgICAgICAgICAgICAgIC8v5L+u5pS55ZCO5L+d5a2YXHJcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaGlzdG9yeWNoYXRzJyxKU09OLnN0cmluZ2lmeShoaXN0b3J5Y2hhdHMpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5aaC5p6c5oiR5rKh5ZKM5a+55pa56IGK5aSp77yM5YiZ5LiN5riy5p+T5Y6G5Y+y5L+h5oGvXHJcbiAgICBpZihtc2cgJiYgbXNnZnJvbWlkICE9PSBteWlkICYmIG1zZ2Zyb21pZCAhPT0gdGFyZ2V0dXNlcmlkKSByZXR1cm47XHJcblxyXG4gICAgbGV0IGNoYXRzU3RyID0gJyc7XHJcbiAgICBoaXN0b3J5Y2hhdHMuZm9yRWFjaChmdW5jdGlvbihjaGF0LCBpKXtcclxuICAgICAgICBsZXQgaXNmcm9tbWUgPSBjaGF0dHlwZSA9PT0gJ2NoYXQnID8gbXlpZCA9PT0gY2hhdC5mcm9tIDogbXlpZCA9PT0gY2hhdC5mcm9tLnJvc3RlcjtcclxuICAgICAgICBsZXQgY2hhdGZyb20gPSBjaGF0dHlwZSA9PT0gJ2NoYXQnID8gJycgOiBgPGRpdiBjbGFzcz1cImNoYXQtdXNlci1uYW1lXCI+JHtjaGF0LmZyb20ucm9zdGVyfTwvZGl2PmA7XHJcbiAgICAgICAgLy/mlofmnKzmtojmga9cclxuICAgICAgICBpZihjaGF0LmRhdGEuY29udGVudFR5cGUgPT09IDIpe1xyXG4gICAgICAgICAgICBjaGF0c1N0ciArPSBgPGxpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoYXQtdGlwXCI+JHtuZXcgRGF0ZShjaGF0LmRhdGEuZGF0ZWxpbmUpLnRvTG9jYWxlVGltZVN0cmluZygpfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoYXQtY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCIkeyBpc2Zyb21tZT8gJ2NoYXQtYXZhdGFyIGNoYXQtYXZhdGFyLXNlbmQnIDonY2hhdC1hdmF0YXInfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vaW1ncy9hdmF0YXIuanBnXCIgYWx0PVwiXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiR7IGlzZnJvbW1lPyAnY2hhdC10eHQgY2hhdC10eHQtc2VuZCcgOidjaGF0LXR4dCd9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7Y2hhdGZyb219XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGF0LW1zZ1wiPiR7cmVwbGFjZUVtb2ppKGNoYXQuZGF0YS5jb250ZW50KX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPiBgO1xyXG4gICAgICAgIH1lbHNlIGlmKGNoYXQuZGF0YS5jb250ZW50VHlwZSA9PT0gOCl7ICAvL+WbvueJh+a2iOaBr1xyXG4gICAgICAgICAgICBsZXQgcGljdXJsID0gWVlJTUNoYXQuZ2V0RmlsZVVybChjaGF0LmRhdGEuY29udGVudC5hdHRhY2hJZCk7XHJcbiAgICAgICAgICAgIGNoYXRzU3RyICs9IGA8bGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hhdC10aXBcIj4ke25ldyBEYXRlKGNoYXQuZGF0YS5kYXRlbGluZSkudG9Mb2NhbGVUaW1lU3RyaW5nKCl9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hhdC1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiR7IGlzZnJvbW1lPyAnY2hhdC1hdmF0YXIgY2hhdC1hdmF0YXItc2VuZCcgOidjaGF0LWF2YXRhcid9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9pbWdzL2F2YXRhci5qcGdcIiBhbHQ9XCJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHsgaXNmcm9tbWU/ICdjaGF0LXR4dCBjaGF0LXR4dC1zZW5kJyA6J2NoYXQtdHh0J31cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtjaGF0ZnJvbX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoYXQtbXNnXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwiY2hhdHBpY1wiIGRhdGEtdXJsPVwiJHtwaWN1cmx9XCIgc3JjPVwiJHtwaWN1cmx9XCIgdGl0bGU9XCLngrnlh7vmn6XnnIvlm77niYdcIiBhbHQ9XCJcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPiBgO1xyXG4gICAgICAgIH1lbHNlIGlmKGNoYXQuZGF0YS5jb250ZW50VHlwZSA9PT0gNCl7XHJcbiAgICAgICAgICAgIGxldCBwaWN1cmwgPSBZWUlNQ2hhdC5nZXRGaWxlVXJsKGNoYXQuZGF0YS5jb250ZW50LmF0dGFjaElkKTtcclxuICAgICAgICAgICAgbGV0IGZpbGVuYW1lID0gY2hhdC5kYXRhLmNvbnRlbnQubmFtZS5zbGljZSgwLCAxNCk7XHJcbiAgICAgICAgICAgIGNoYXRzU3RyICs9IGA8bGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hhdC10aXBcIj4ke25ldyBEYXRlKGNoYXQuZGF0YS5kYXRlbGluZSkudG9Mb2NhbGVUaW1lU3RyaW5nKCl9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hhdC1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiR7IGlzZnJvbW1lPyAnY2hhdC1hdmF0YXIgY2hhdC1hdmF0YXItc2VuZCcgOidjaGF0LWF2YXRhcid9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9pbWdzL2F2YXRhci5qcGdcIiBhbHQ9XCJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHsgaXNmcm9tbWU/ICdjaGF0LXR4dCBjaGF0LXR4dC1zZW5kJyA6J2NoYXQtdHh0J31cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtjaGF0ZnJvbX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoYXQtbXNnXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cImNoYXRmaWxlXCIgaHJlZj1cIiR7cGljdXJsfVwiIHRpdGxlPVwi54K55Ye75LiL6L295paH5Lu2XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmaWxlbmFtZVwiPiR7ZmlsZW5hbWV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmlsZXNpemVcIj4ke2NoYXQuZGF0YS5jb250ZW50LnNpemV9Qjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT4gYDtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgICRjaGF0c19saXN0Lmh0bWwoY2hhdHNTdHIpO1xyXG4gICAgJGNoYXRzLnNjcm9sbFRvcCgkY2hhdHNbMF0uc2Nyb2xsSGVpZ2h0KTtcclxufTsiLCJcclxuLy9kb23lhYPntKBcclxuaW1wb3J0IHtcclxuICAgICRoY29udGFjdHNcclxufSBmcm9tICcuL2pxZWxlbWVudHMnO1xyXG4vL+ihqOaDheaVsOaNrlxyXG5pbXBvcnQgeyBleHByZXNzaW9uTGlzdCB9IGZyb20gJy4vY29uc3RhbnRzJztcclxuXHJcbi8v55So5Zu+54mH5pu/5o2i5paH5pys5raI5oGv5Lit6KGo5oOF5L+h5oGvXHJcbmNvbnN0IHJlcGxhY2VFbW9qaSA9IChzdHIpID0+IHtcclxuICAgIHJldHVybiBzdHIucmVwbGFjZSgvXFxbW15cXFtcXF1dK1xcXS9nLChlKSA9PiB7XHJcbiAgICAgICAgZm9yIChsZXQgaT0wO2k8ZXhwcmVzc2lvbkxpc3QuZGF0YS5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgaWYoZXhwcmVzc2lvbkxpc3QuZGF0YVtpXS5hY3Rpb25EYXRhID09PSBlKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBgPGltZyBjbGFzcz1cImVtb2ppXCIgc3JjPVwiJHtleHByZXNzaW9uTGlzdC5wYXRoICsgZXhwcmVzc2lvbkxpc3QuZGF0YVtpXS51cmx9XCIgYWx0PVwiXCIgLz5gO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGU7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IChkaWdzZXRzKSA9PiB7XHJcbiAgICAvL+aLv+WPluiBiuWkqeWvueaWuWlkXHJcbiAgICBsZXQgdGFyZ2V0dXNlcmlkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RhcmdldHVzZXJpZCcpO1xyXG4gICAgbGV0IGRpZ1N0ciA9ICcnO1xyXG4gICAgZGlnc2V0cy5zb3J0KGZ1bmN0aW9uKGEsIGIpe3JldHVybiBiLmxhc3RDb250YWN0VGltZSAtIGEubGFzdENvbnRhY3RUaW1lfSk7XHJcbiAgICBkaWdzZXRzLmZvckVhY2goZnVuY3Rpb24ocmVzKXtcclxuICAgICAgICBsZXQgbGFzdG1zZyA9IHJlcy5sYXN0TWVzc2FnZSwgbGFzdG1zZ1N0ciA9ICcnLCBuZXd0aXBTdHIgPSAnJztcclxuICAgICAgICBsZXQgbm9yZWFkbm8gPSByZXMuc2Vzc2lvblZlcnNpb24gLSByZXMucmVhZGVkVmVyc2lvbjtcclxuICAgICAgICBpZihsYXN0bXNnKXtcclxuICAgICAgICAgICAgc3dpdGNoKGxhc3Rtc2cuZGF0YS5jb250ZW50VHlwZSl7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6IGxhc3Rtc2dTdHIgPSByZXMubGFzdE1lc3NhZ2UuZGF0YS5jb250ZW50OyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogbGFzdG1zZ1N0ciA9ICdb5paH5Lu25raI5oGvXSc7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA4OiBsYXN0bXNnU3RyID0gJ1vlm77niYfmtojmga9dJzticmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihub3JlYWRubyl7XHJcbiAgICAgICAgICAgIG5ld3RpcFN0ciA9ICc8aSBjbGFzcz1cIm5ld3RpcCBjdXR0eHRcIj4nKyBub3JlYWRubyArJzwvaT4nO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkaWdTdHIgKz0gYDxsaSBjbGFzcz1cIiR7dGFyZ2V0dXNlcmlkICYmIHRhcmdldHVzZXJpZCA9PT0gcmVzLmlkID8gJ2FjdGl2ZScgOiAnJ31cIiBkYXRhLXNlc3Npb25WZXJzaW9uPVwiJHtyZXMuc2Vzc2lvblZlcnNpb259XCIgZGF0YS1pZD1cIiR7cmVzLmlkfVwiIGRhdGEtdHlwZT1cIiR7cmVzLnR5cGV9XCIgZGF0YS1uaWNrbmFtZT1cIiR7cmVzLm5pY2tuYW1lIHx8IHJlcy5pZH1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aSBkYXRhLWlkPVwiJHtyZXMuaWR9XCIgZGF0YS10eXBlPVwiJHtyZXMudHlwZX1cIiBjbGFzcz1cImNsb3NlXCI+w5c8L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImF2YXRhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7WVlJTUNoYXQuZ2V0RmlsZVVybChyZXMucGhvdG8pIHx8ICcuL2ltZ3MvYXZhdGFyLmpwZyd9XCIgYWx0PVwiXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRldGFpbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJuYW1lIGN1dHR4dFwiPiR7cmVzLm5pY2tuYW1lIHx8IHJlcy5pZH08L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIm1zZyBjdXR0eHRcIj4ke3JlcGxhY2VFbW9qaShsYXN0bXNnU3RyKX08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+JHtuZXd0aXBTdHJ9XHJcbiAgICAgICAgICAgICAgICA8L2xpPmA7XHJcbiAgICB9KTtcclxuICAgICRoY29udGFjdHMuaHRtbChkaWdTdHIpO1xyXG59IiwiLy/lhYPntKBcclxuaW1wb3J0IHsgJHl5aW1faW9naW4sICR5eWltX2JveCB9IGZyb20gJy4vanFlbGVtZW50cyc7XHJcblxyXG4vL+eUqOaIt+eZu+mZhlxyXG5leHBvcnQgZGVmYXVsdCAodXNlcm5hbWUsIHBhc3N3b3JkKSA9PiB7XHJcbiAgICAvL+ato+W8j+eOr+Wig1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICdodHRwczovL2ltLnl5dWFwLmNvbS9zeXNhZG1pbi9yZXN0L3lvbnlvdS91ZG4vdG9rZW4nLFxyXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIn0sXHJcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICBcInVzZXJuYW1lXCI6dXNlcm5hbWUsXHJcbiAgICAgICAgICAgIFwiY2xpZW50SWRcIjpcImM4NTEzMGFjMmM4MGQ4M2I4NmZjMWJjMzQ0YWMxMjExXCIsXHJcbiAgICAgICAgICAgIFwiY2xpZW50U2VjcmV0XCI6XCJDRUQxNDYxMzVBNTg0RDVGMkVBQjMzNjM1RDE5QUU5OVwiXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBsZXQgY2xpZW50SWRlbnRpZnkgPSBcInBjXCIgKyBTdHJpbmcobmV3IERhdGUoKS5nZXRUaW1lKCkpO1xyXG4gICAgICAgICAgICAkeXlpbV9pb2dpbi5oaWRlKCk7XHJcbiAgICAgICAgICAgICR5eWltX2JveC5zaG93KCk7XHJcbiAgICAgICAgICAgIC8v55m76ZmGWVlJTVNES1xyXG4gICAgICAgICAgICBZWUlNQ2hhdC5sb2dpbih7XHJcbiAgICAgICAgICAgICAgICBcInVzZXJuYW1lXCI6IHVzZXJuYW1lLFxyXG4gICAgICAgICAgICAgICAgXCJ0b2tlblwiOiByZXN1bHQudG9rZW4sXHJcbiAgICAgICAgICAgICAgICBcImV4cGlyYXRpb25cIjogcmVzdWx0LmV4cGlyYXRpb24sXHJcbiAgICAgICAgICAgICAgICBcImFwcFR5cGVcIjogNCxcclxuICAgICAgICAgICAgICAgIFwiaWRlbnRpZnlcIjogY2xpZW50SWRlbnRpZnlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGFyZykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhcmcpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgLy/mtYvor5Xnjq/looNcclxuICAgIC8vICQuYWpheCh7XHJcbiAgICAvLyAgICAgdXJsOiAnaHR0cDovLzE3Mi4yMC4xNS42MC9zeXNhZG1pbi9yZXN0L3lvbnlvdS9pbV9wcmUvdG9rZW4nLFxyXG4gICAgLy8gICAgIHR5cGU6ICdQT1NUJyxcclxuICAgIC8vICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgLy8gICAgIGhlYWRlcnM6IHtcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIn0sXHJcbiAgICAvLyAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgLy8gICAgICAgICBcInVzZXJuYW1lXCI6dXNlcm5hbWUsXHJcbiAgICAvLyAgICAgICAgIFwiY2xpZW50SWRcIjpcImIyNmJhNTEwNThlZWU5ZGI0Zjg4YTdhMmIxYmQxYjA2XCIsXHJcbiAgICAvLyAgICAgICAgIFwiY2xpZW50U2VjcmV0XCI6XCJDQzlBNzFFMEMyNTI4RURCMTY1MkRGQjE4RUNFOERERlwiXHJcbiAgICAvLyAgICAgfSksXHJcbiAgICAvLyAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgLy8gICAgICAgICBsZXQgY2xpZW50SWRlbnRpZnkgPSBcInBjXCIgKyBTdHJpbmcobmV3IERhdGUoKS5nZXRUaW1lKCkpO1xyXG4gICAgLy8gICAgICAgICAkeXlpbV9pb2dpbi5oaWRlKCk7XHJcbiAgICAvLyAgICAgICAgICR5eWltX2JveC5zaG93KCk7XHJcbiAgICAvLyAgICAgICAgIC8v55m76ZmGWVlJTVNES1xyXG4gICAgLy8gICAgICAgICBZWUlNQ2hhdC5sb2dpbih7XHJcbiAgICAvLyAgICAgICAgICAgICBcInVzZXJuYW1lXCI6IHVzZXJuYW1lLFxyXG4gICAgLy8gICAgICAgICAgICAgXCJ0b2tlblwiOiByZXN1bHQudG9rZW4sXHJcbiAgICAvLyAgICAgICAgICAgICBcImV4cGlyYXRpb25cIjogcmVzdWx0LmV4cGlyYXRpb24sXHJcbiAgICAvLyAgICAgICAgICAgICBcImFwcFR5cGVcIjogNCxcclxuICAgIC8vICAgICAgICAgICAgIFwiaWRlbnRpZnlcIjogY2xpZW50SWRlbnRpZnlcclxuICAgIC8vICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgfSxcclxuICAgIC8vICAgICBlcnJvcjogZnVuY3Rpb24gKGFyZykge1xyXG4gICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhhcmcpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH0pO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=