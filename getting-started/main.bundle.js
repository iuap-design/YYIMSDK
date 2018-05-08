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
    flash_swf_url: './lib/upload/Moxie.swf', //flash 上传 swf文件位置
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
            readedVersion: 10000,
            sessionVersion: 10000,
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
    (0, _getHistoryMessage2.default)(10000, $(this).attr('data-id'), 'groupchat');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbnRyb2xFdmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZ2V0Q2hhdEdyb3Vwcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZ2V0SGlzdG9yeU1lc3NhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2dldFJlY2VudERpZ3NldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvanFlbGVtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcmVuZGVyQ2hhdEdyb3Vwcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcmVuZGVySGlzdG9yeU1lc3NhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3JlbmRlclJlY2VudERpZ3NldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXNlckxvZ2luLmpzIl0sIm5hbWVzIjpbIllZSU1DaGF0IiwiaW5pdFNESyIsImFwcCIsImV0cCIsIndzdXJsIiwid3Nwb3J0IiwiaGJwb3J0Iiwic2VydmxldCIsImZsYXNoX3N3Zl91cmwiLCJsb2dFbmFibGUiLCJjbGllbnRNYXJrIiwiYXBpS2V5IiwiaW5pdCIsIm9uT3BlbmVkIiwic2V0UHJlc2VuY2UiLCJsb2NhbFN0b3JhZ2UiLCJyZW1vdmVJdGVtIiwiZ2V0VkNhcmQiLCJzdWNjZXNzIiwicmVzIiwicGhvdG8iLCJmaW5kIiwiYXR0ciIsImdldEZpbGVVcmwiLCJzZXRJdGVtIiwiSlNPTiIsInN0cmluZ2lmeSIsIm9uRXhwaXJhdGlvbiIsImNhbGxiYWNrIiwib25DbG9zZWQiLCJhcmciLCJvbkNvbmZsaWN0ZWQiLCJvbkNsaWVudEtpY2tvdXQiLCJvblVwZGF0ZVBhc3N3b3JkIiwib25BdXRoRXJyb3IiLCJvbkNvbm5lY3RFcnJvciIsIm9uUmVjZWlwdHMiLCJvblN1YnNjcmliZSIsIm9uUm9zdGVyRmF2b3JpdGVkIiwib25Sb3N0ZXJVcGRhdGVkZWQiLCJvbk1lc3NhZ2UiLCJtc2ciLCJjaGF0dHlwZSIsImdldEl0ZW0iLCJvbkdyb3VwVXBkYXRlIiwib25LaWNrZWRPdXRHcm91cCIsIm9uVHJhbnNmZXJHcm91cE93bmVyIiwib25QcmVzZW5jZSIsIm9uUm9zdGVyRGVsZXRlZCIsIm9uUHViYWNjb3VudFVwZGF0ZSIsInB1YmFjY291bnRzIiwib25UcmFuc3BhcmVudE1lc3NhZ2UiLCJleHByZXNzaW9uTGlzdCIsInBhdGgiLCJkYXRhIiwiYWN0aW9uRGF0YSIsImh0bWwiLCJtYXAiLCJ0IiwidXJsIiwicGFyc2UiLCJ1c2VybmFtZSIsImNsaWNrIiwidmFsIiwicGFzc3dvcmQiLCJ0ZXN0IiwiJCIsImhhc0NsYXNzIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsImNzcyIsImxlZnQiLCJ0b3AiLCJjbGVhciIsImhpZGUiLCJzaG93Iiwib24iLCJlIiwib3JpZ2luWCIsImNsaWVudFgiLCJvcmlnaW5ZIiwiY2xpZW50WSIsImJveFBvcyIsInBvc2l0aW9uIiwib2ZmIiwia2V5d29yZCIsImtleUNvZGUiLCJxdWVyeVJvc3Rlckl0ZW0iLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJlcnIiLCJzaWJsaW5ncyIsImN1cmlkIiwicmVtb3ZlUmVjZW50RGlnZXN0IiwiaWQiLCJ0eXBlIiwidG9pZCIsInJlY2VudERpZ3NldCIsImZvckVhY2giLCJkaWdlc3QiLCJpIiwic3BsaWNlIiwicGljdXJsIiwiaG92ZXIiLCJ0b2dnbGUiLCJ0byIsInNlbmRQaWMiLCJmaWxlSW5wdXRJZCIsImNoYXRJbmZvIiwiZXh0ZW5kIiwiZmlsZUZpbHRlcmVkIiwiZmlsZVVwbG9hZGVkIiwiYmVmb3JlVXBsb2FkIiwicHJvZ3Jlc3MiLCJwcm8iLCJzZW5kRmlsZSIsInNlbmRUZXh0TWVzc2FnZSIsImNvbnRlbnQiLCJib2R5IiwidXNlclZjYXJkIiwibmlja25hbWUiLCJlbWFpbCIsImdlbmRlciIsIm1vYmlsZSIsInJlY2VudGRpZ3NldCIsInJvb21JdGVtcyIsInRoYXQiLCJpc2RpZ3NldCIsInB1c2giLCJyZWFkZWRWZXJzaW9uIiwic2Vzc2lvblZlcnNpb24iLCJsYXN0TWVzc2FnZSIsImxhc3RDb250YWN0VGltZSIsIkRhdGUiLCJnZXRUaW1lIiwiZ2V0Q2hhdEdyb3VwcyIsInN0YXJ0IiwiZ2V0SGlzdG9yeU1lc3NhZ2UiLCJzdGFydFZlcnNpb24iLCJlbmRWZXJzaW9uIiwiaGlzdG9yeWNoYXRzIiwicmVzdWx0IiwicmV2ZXJzZSIsImdldFJlY2VudERpZ3NldCIsImxpc3QiLCJsZW5ndGgiLCIkeXlpbV9pb2dpbiIsIiRsb2dpbl91c2VybmFtZSIsIiRsb2dpbl9wYXNzIiwiJGxvZ2luX2J0biIsIiR5eWltX2JveCIsIiR5eWltX21haW4iLCIkal9tb3ZlIiwiJGhjb250YWN0cyIsIiRoZ3JvdXBzIiwiJGNoYXRzIiwiJGpfYnFfYm94IiwiJHl5aW1fZWRpdG9yIiwiJGJ0bl9zZW5kIiwiJGNoYXRfYm94IiwiJGNoYXRzX2xpc3QiLCIkcGljdmlld2VyIiwiJG93bl9hdmF0YXIiLCIkcGVyc29uaW5mbyIsIiRzbWNoYXQiLCIkc21mcmllbmQiLCIkc21ncm91cCIsIiRzbXB1YmNvdW50IiwicGljdmlld2VyIiwiVmlld2VyIiwibmF2YmFyIiwidGl0bGUiLCJncm91cHMiLCJncm91cFN0ciIsImdyb3VwIiwibmFtZSIsInJlcGxhY2VFbW9qaSIsInN0ciIsInJlcGxhY2UiLCJ0YXJnZXR1c2VyaWQiLCJteWlkIiwibXNnZnJvbWlkIiwiZnJvbSIsInJvc3RlciIsImlzZnJvbW1lIiwiZGF0ZWxpbmUiLCJjaGF0c1N0ciIsImNoYXQiLCJjaGF0ZnJvbSIsImNvbnRlbnRUeXBlIiwidG9Mb2NhbGVUaW1lU3RyaW5nIiwiYXR0YWNoSWQiLCJmaWxlbmFtZSIsInNsaWNlIiwic2l6ZSIsInNjcm9sbFRvcCIsInNjcm9sbEhlaWdodCIsImRpZ3NldHMiLCJkaWdTdHIiLCJzb3J0IiwiYSIsImIiLCJsYXN0bXNnIiwibGFzdG1zZ1N0ciIsIm5ld3RpcFN0ciIsIm5vcmVhZG5vIiwiYWpheCIsImRhdGFUeXBlIiwiaGVhZGVycyIsImNsaWVudElkZW50aWZ5IiwiU3RyaW5nIiwibG9naW4iLCJ0b2tlbiIsImV4cGlyYXRpb24iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsRUE7O0FBR0E7Ozs7QUFHQTs7OztBQUVBOzs7O0FBRUE7OztBQUxBO0FBTkE7QUFZQUEsU0FBU0MsT0FBVCxDQUFpQjtBQUNiQyxTQUFLLEtBRFEsRUFDRDtBQUNaQyxTQUFLLFFBRlEsRUFFRTtBQUNmQyxXQUFPLG1CQUhNLEVBR2U7QUFDNUJDLFlBQVEsSUFKSyxFQUlDO0FBQ2RDLFlBQVEsSUFMSyxFQUtDO0FBQ2RDLGFBQVMsdUJBTkksRUFNcUI7QUFDbENDLG1CQUFlLHdCQVBGLEVBTzRCO0FBQ3pDQyxlQUFXLElBUkUsRUFRSTtBQUNqQkMsZ0JBQVksS0FUQyxFQVNNO0FBQ25CQyxZQUFRO0FBVkssQ0FBakI7QUFZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBbkNBO0FBb0NBWCxTQUFTWSxJQUFULENBQWM7QUFDVkMsY0FBVSxvQkFBVztBQUNqQjtBQUNBYixpQkFBU2MsV0FBVDtBQUNBO0FBQ0FDLHFCQUFhQyxVQUFiLENBQXdCLGNBQXhCO0FBQ0E7QUFDQWhCLGlCQUFTaUIsUUFBVCxDQUFrQjtBQUNkQyxxQkFBUyxpQkFBVUMsR0FBVixFQUFlO0FBQ3BCLG9CQUFHQSxJQUFJQyxLQUFQLEVBQWEsd0JBQVlDLElBQVosQ0FBaUIsS0FBakIsRUFBd0JDLElBQXhCLENBQTZCLEtBQTdCLEVBQW1DdEIsU0FBU3VCLFVBQVQsQ0FBb0JKLElBQUlDLEtBQXhCLENBQW5DO0FBQ2I7QUFDQUwsNkJBQWFTLE9BQWIsQ0FBcUIsaUJBQXJCLEVBQXdDQyxLQUFLQyxTQUFMLENBQWVQLEdBQWYsQ0FBeEM7QUFDSDtBQUxhLFNBQWxCO0FBT0E7QUFDQTtBQUNILEtBaEJTO0FBaUJWUSxrQkFBYyxzQkFBU0MsUUFBVCxFQUFtQjtBQUM3QjtBQUNBO0FBQ0gsS0FwQlM7QUFxQlZDLGNBQVUsa0JBQVNDLEdBQVQsRUFBYztBQUNwQjtBQUNILEtBdkJTO0FBd0JWQyxrQkFBYyxzQkFBU0QsR0FBVCxFQUFjO0FBQ3hCO0FBQ0gsS0ExQlM7QUEyQlZFLHFCQUFpQix5QkFBU0YsR0FBVCxFQUFjO0FBQzNCO0FBQ0gsS0E3QlM7QUE4QlZHLHNCQUFrQiwwQkFBU0gsR0FBVCxFQUFjO0FBQzVCO0FBQ0gsS0FoQ1M7QUFpQ1ZJLGlCQUFhLHFCQUFTSixHQUFULEVBQWM7QUFDdkI7QUFDSCxLQW5DUztBQW9DVkssb0JBQWdCLHdCQUFTTCxHQUFULEVBQWM7QUFDMUI7QUFDSCxLQXRDUztBQXVDVk0sZ0JBQVksb0JBQVNOLEdBQVQsRUFBYztBQUN0QjtBQUNILEtBekNTO0FBMENWTyxpQkFBYSxxQkFBU1AsR0FBVCxFQUFjO0FBQ3ZCO0FBQ0gsS0E1Q1M7QUE2Q1ZRLHVCQUFtQiwyQkFBU1IsR0FBVCxFQUFjO0FBQzdCO0FBQ0gsS0EvQ1M7QUFnRFZTLHVCQUFtQiwyQkFBU1QsR0FBVCxFQUFjO0FBQzdCO0FBQ0gsS0FsRFM7QUFtRFZVLGVBQVcsbUJBQVNDLEdBQVQsRUFBYztBQUNyQjtBQUNBLFlBQUlDLFdBQVczQixhQUFhNEIsT0FBYixDQUFxQixVQUFyQixDQUFmO0FBQ0EsWUFBR0QsWUFBWSxNQUFmLEVBQXNCO0FBQUk7QUFDdEI7QUFDQSxnREFBcUJELEdBQXJCO0FBQ0g7QUFDSixLQTFEUztBQTJEVkcsbUJBQWUsdUJBQVNkLEdBQVQsRUFBYztBQUN6QjtBQUNILEtBN0RTO0FBOERWZSxzQkFBa0IsMEJBQVNmLEdBQVQsRUFBYztBQUM1QjtBQUNILEtBaEVTO0FBaUVWZ0IsMEJBQXNCLDhCQUFTaEIsR0FBVCxFQUFhO0FBQy9CO0FBQ0gsS0FuRVM7QUFvRVZpQixnQkFBWSxvQkFBU2pCLEdBQVQsRUFBYztBQUN0QjtBQUNILEtBdEVTO0FBdUVWa0IscUJBQWlCLHlCQUFTbEIsR0FBVCxFQUFjO0FBQzNCO0FBQ0gsS0F6RVM7QUEwRVZtQix3QkFBb0IsNEJBQVNDLFdBQVQsRUFBc0I7QUFDdEM7QUFDSCxLQTVFUztBQTZFVkMsMEJBQXNCLDhCQUFTckIsR0FBVCxFQUFjO0FBQ2hDO0FBQ0g7QUEvRVMsQ0FBZCxFOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZDTyxJQUFNc0IsMENBQWlCO0FBQzFCQyxVQUFNLFlBRG9CO0FBRTFCQyxVQUFNLENBQ0YsRUFBRUMsWUFBWSxNQUFkLEVBQXNCLE9BQU8sd0JBQTdCLEVBREUsRUFFRixFQUFFQSxZQUFZLE1BQWQsRUFBc0IsT0FBTyx3QkFBN0IsRUFGRSxFQUdGLEVBQUVBLFlBQVksS0FBZCxFQUFxQixPQUFPLHVCQUE1QixFQUhFLEVBSUYsRUFBRUEsWUFBWSxLQUFkLEVBQXFCLE9BQU8sd0JBQTVCLEVBSkUsRUFLRixFQUFFQSxZQUFZLE1BQWQsRUFBc0IsT0FBTyx3QkFBN0IsRUFMRSxFQU1GLEVBQUVBLFlBQVksTUFBZCxFQUFzQixPQUFPLHlCQUE3QixFQU5FLEVBT0YsRUFBRUEsWUFBWSxNQUFkLEVBQXNCLE9BQU8sdUJBQTdCLEVBUEUsRUFRRixFQUFFQSxZQUFZLE1BQWQsRUFBc0IsT0FBTywwQkFBN0IsRUFSRSxFQVNGLEVBQUVBLFlBQVksTUFBZCxFQUFzQixPQUFPLDRCQUE3QixFQVRFLEVBVUYsRUFBRUEsWUFBWSxNQUFkLEVBQXNCLE9BQU8seUJBQTdCLEVBVkUsRUFXRixFQUFFQSxZQUFZLE1BQWQsRUFBc0IsT0FBTyx3QkFBN0IsRUFYRSxFQVlGLEVBQUVBLFlBQVksUUFBZCxFQUF3QixPQUFPLGtDQUEvQixFQVpFLEVBYUYsRUFBRUEsWUFBWSxNQUFkLEVBQXNCLE9BQU8sMEJBQTdCLEVBYkUsRUFjRixFQUFFQSxZQUFZLE1BQWQsRUFBc0IsT0FBTywwQkFBN0IsRUFkRSxFQWVGLEVBQUVBLFlBQVksTUFBZCxFQUFzQixPQUFPLHVCQUE3QixFQWZFLEVBZ0JGLEVBQUVBLFlBQVksTUFBZCxFQUFzQixPQUFPLHVCQUE3QixFQWhCRSxFQWlCRixFQUFFQSxZQUFZLE1BQWQsRUFBc0IsT0FBTyx5QkFBN0IsRUFqQkUsRUFrQkYsRUFBRUEsWUFBWSxNQUFkLEVBQXNCLE9BQU8sd0JBQTdCLEVBbEJFLEVBbUJGLEVBQUVBLFlBQVksS0FBZCxFQUFxQixPQUFPLHVCQUE1QixFQW5CRSxFQW9CRixFQUFFQSxZQUFZLE1BQWQsRUFBc0IsT0FBTyx1QkFBN0IsRUFwQkUsRUFxQkYsRUFBRUEsWUFBWSxNQUFkLEVBQXNCLE9BQU8sc0JBQTdCLEVBckJFLEVBc0JGLEVBQUVBLFlBQVksUUFBZCxFQUF3QixPQUFPLHdCQUEvQixFQXRCRSxFQXVCRixFQUFFQSxZQUFZLE1BQWQsRUFBc0IsT0FBTyx1QkFBN0IsRUF2QkUsRUF3QkYsRUFBRUEsWUFBWSxNQUFkLEVBQXNCLE9BQU8sMkJBQTdCLEVBeEJFLEVBeUJGLEVBQUVBLFlBQVksTUFBZCxFQUFzQixPQUFPLHlCQUE3QixFQXpCRSxFQTBCRixFQUFFQSxZQUFZLE1BQWQsRUFBc0IsT0FBTyx1QkFBN0IsRUExQkUsRUEyQkYsRUFBRUEsWUFBWSxNQUFkLEVBQXNCLE9BQU8sd0JBQTdCLEVBM0JFLEVBNEJGLEVBQUVBLFlBQVksTUFBZCxFQUFzQixPQUFPLHVCQUE3QixFQTVCRSxFQTZCRixFQUFFQSxZQUFZLE1BQWQsRUFBc0IsT0FBTywwQkFBN0IsRUE3QkUsRUE4QkYsRUFBRUEsWUFBWSxNQUFkLEVBQXNCLE9BQU8seUJBQTdCLEVBOUJFLEVBK0JGLEVBQUVBLFlBQVksS0FBZCxFQUFxQixPQUFPLHVCQUE1QixFQS9CRSxFQWdDRixFQUFFQSxZQUFZLE1BQWQsRUFBc0IsT0FBTyx1QkFBN0IsRUFoQ0UsRUFpQ0YsRUFBRUEsWUFBWSxNQUFkLEVBQXNCLE9BQU8seUJBQTdCLEVBakNFLEVBa0NGLEVBQUVBLFlBQVksTUFBZCxFQUFzQixPQUFPLDBCQUE3QixFQWxDRSxFQW1DRixFQUFFQSxZQUFZLE1BQWQsRUFBc0IsT0FBTyx1QkFBN0IsRUFuQ0UsRUFvQ0YsRUFBRUEsWUFBWSxLQUFkLEVBQXFCLE9BQU8seUJBQTVCLEVBcENFLEVBcUNGLEVBQUVBLFlBQVksT0FBZCxFQUF1QixPQUFPLHdCQUE5QixFQXJDRSxFQXNDRixFQUFFQSxZQUFZLE9BQWQsRUFBdUIsT0FBTyx5QkFBOUIsRUF0Q0UsRUF1Q0YsRUFBRUEsWUFBWSxNQUFkLEVBQXNCLE9BQU8seUJBQTdCLEVBdkNFLEVBd0NGLEVBQUVBLFlBQVksTUFBZCxFQUFzQixPQUFPLHdCQUE3QixFQXhDRSxFQXlDRixFQUFFQSxZQUFZLE1BQWQsRUFBc0IsT0FBTyx5QkFBN0IsRUF6Q0UsRUEwQ0YsRUFBRUEsWUFBWSxLQUFkLEVBQXFCLE9BQU8sdUJBQTVCLEVBMUNFLEVBMkNGLEVBQUVBLFlBQVksTUFBZCxFQUFzQixPQUFPLHlCQUE3QixFQTNDRSxFQTRDRixFQUFFQSxZQUFZLEtBQWQsRUFBcUIsT0FBTyxzQkFBNUIsRUE1Q0UsRUE2Q0YsRUFBRUEsWUFBWSxLQUFkLEVBQXFCLE9BQU8sc0JBQTVCLEVBN0NFLEVBOENGLEVBQUVBLFlBQVksTUFBZCxFQUFzQixPQUFPLDBCQUE3QixFQTlDRSxFQStDRixFQUFFQSxZQUFZLE1BQWQsRUFBc0IsT0FBTyx5QkFBN0IsRUEvQ0UsRUFnREYsRUFBRUEsWUFBWSxNQUFkLEVBQXNCLE9BQU8sd0JBQTdCLEVBaERFLEVBaURGLEVBQUVBLFlBQVksUUFBZCxFQUF3QixPQUFPLHVCQUEvQixFQWpERSxFQWtERixFQUFFQSxZQUFZLE1BQWQsRUFBc0IsT0FBTyx5QkFBN0IsRUFsREUsRUFtREYsRUFBRUEsWUFBWSxNQUFkLEVBQXNCLE9BQU8sd0JBQTdCLEVBbkRFLEVBb0RGLEVBQUVBLFlBQVksTUFBZCxFQUFzQixPQUFPLHlCQUE3QixFQXBERSxFQXFERixFQUFFQSxZQUFZLEtBQWQsRUFBcUIsT0FBTyxzQkFBNUIsRUFyREUsRUFzREYsRUFBRUEsWUFBWSxLQUFkLEVBQXFCLE9BQU8seUJBQTVCLEVBdERFLEVBdURGLEVBQUVBLFlBQVksTUFBZCxFQUFzQixPQUFPLHVCQUE3QixFQXZERSxFQXdERixFQUFFQSxZQUFZLE1BQWQsRUFBc0IsT0FBTyx1QkFBN0IsRUF4REUsRUF5REYsRUFBRUEsWUFBWSxLQUFkLEVBQXFCLE9BQU8sdUJBQTVCLEVBekRFLEVBMERGLEVBQUVBLFlBQVksTUFBZCxFQUFzQixPQUFPLHlCQUE3QixFQTFERSxFQTJERixFQUFFQSxZQUFZLE1BQWQsRUFBc0IsT0FBTyx5QkFBN0IsRUEzREUsRUE0REYsRUFBRUEsWUFBWSxNQUFkLEVBQXNCLE9BQU8seUJBQTdCLEVBNURFLEVBNkRGLEVBQUVBLFlBQVksTUFBZCxFQUFzQixPQUFPLHlCQUE3QixFQTdERSxFQThERixFQUFFQSxZQUFZLEtBQWQsRUFBcUIsT0FBTyxzQkFBNUIsRUE5REUsRUErREYsRUFBRUEsWUFBWSxNQUFkLEVBQXNCLE9BQU8sdUJBQTdCLEVBL0RFLEVBZ0VGLEVBQUVBLFlBQVksTUFBZCxFQUFzQixPQUFPLDBCQUE3QixFQWhFRSxFQWlFRixFQUFFQSxZQUFZLE1BQWQsRUFBc0IsT0FBTyx3QkFBN0IsRUFqRUUsRUFrRUYsRUFBRUEsWUFBWSxNQUFkLEVBQXNCLE9BQU8sd0JBQTdCLEVBbEVFLEVBbUVGLEVBQUVBLFlBQVksTUFBZCxFQUFzQixPQUFPLHlCQUE3QixFQW5FRSxFQW9FRixFQUFFQSxZQUFZLE1BQWQsRUFBc0IsT0FBTyx3QkFBN0IsRUFwRUUsRUFxRUYsRUFBRUEsWUFBWSxNQUFkLEVBQXNCLE9BQU8sd0JBQTdCLEVBckVFLEVBc0VGLEVBQUVBLFlBQVksTUFBZCxFQUFzQixPQUFPLDBCQUE3QixFQXRFRSxFQXVFRixFQUFFQSxZQUFZLE1BQWQsRUFBc0IsT0FBTyx5QkFBN0IsRUF2RUUsRUF3RUYsRUFBRUEsWUFBWSxNQUFkLEVBQXNCLE9BQU8sd0JBQTdCLEVBeEVFLEVBeUVGLEVBQUVBLFlBQVksTUFBZCxFQUFzQixPQUFPLHlCQUE3QixFQXpFRSxFQTBFRixFQUFFQSxZQUFZLE1BQWQsRUFBc0IsT0FBTywwQkFBN0IsRUExRUUsRUEyRUYsRUFBRUEsWUFBWSxNQUFkLEVBQXNCLE9BQU8sMEJBQTdCLEVBM0VFLEVBNEVGLEVBQUVBLFlBQVksS0FBZCxFQUFxQixPQUFPLHVCQUE1QixFQTVFRSxFQTZFRixFQUFFQSxZQUFZLE1BQWQsRUFBc0IsT0FBTyx3QkFBN0IsRUE3RUUsRUE4RUYsRUFBRUEsWUFBWSxNQUFkLEVBQXNCLE9BQU8sd0JBQTdCLEVBOUVFO0FBRm9CLENBQXZCLEM7Ozs7Ozs7Ozs7Ozs7O0FDQ1A7O0FBeUJBOztBQUVBOzs7O0FBRUE7Ozs7QUFFQTs7OztBQUVBOzs7O0FBRUE7Ozs7QUFFQTs7OztBQUVBOzs7Ozs7QUFFQTs7QUFMQTs7QUFKQTs7QUFKQTs7QUFKQTtBQWtCQSxzQkFBVUMsSUFBVixDQUFlLDBCQUFlRixJQUFmLENBQW9CRyxHQUFwQixDQUF3QixVQUFDQyxDQUFELEVBQU87QUFDMUMsK0JBQXlCQSxFQUFFSCxVQUEzQixxQkFBb0QsMEJBQWVGLElBQWYsR0FBb0JLLEVBQUVDLEdBQTFFLGtCQUF5RkQsRUFBRUgsVUFBM0Y7QUFDSCxDQUZjLENBQWY7O0FBSUE7O0FBUkE7O0FBSkE7O0FBSkE7O0FBSkE7QUEzQkE7QUFnREEsSUFBR3hDLGFBQWE0QixPQUFiLENBQXFCLGlCQUFyQixDQUFILEVBQTJDO0FBQ3ZDLDZCQUFVbEIsS0FBS21DLEtBQUwsQ0FBVzdDLGFBQWE0QixPQUFiLENBQXFCLGlCQUFyQixDQUFYLEVBQW9Ea0IsUUFBOUQ7QUFDSDtBQUNEO0FBQ0EsdUJBQVdDLEtBQVgsQ0FBaUIsWUFBWTtBQUN6QixRQUFJRCxXQUFXLDRCQUFnQkUsR0FBaEIsRUFBZjtBQUNBLFFBQUlDLFdBQVcsd0JBQVlELEdBQVosRUFBZjtBQUNBLFFBQUcsb0JBQW9CRSxJQUFwQixDQUF5QkosUUFBekIsQ0FBSCxFQUFzQztBQUNsQyxpQ0FBVUEsUUFBVixFQUFvQkcsUUFBcEI7QUFDSDtBQUNKLENBTkQ7O0FBUUE7QUFDQUUsRUFBRSxZQUFGLEVBQWdCSixLQUFoQixDQUFzQixZQUFZO0FBQzlCLDJCQUFXSyxRQUFYLENBQW9CLFdBQXBCLElBQW1DLHVCQUFXQyxXQUFYLENBQXVCLFdBQXZCLENBQW5DLEdBQXlFLHVCQUFXQyxRQUFYLENBQW9CLFdBQXBCLENBQXpFO0FBQ0EsMkJBQVdDLEdBQVgsQ0FBZSxFQUFDQyxNQUFNLEdBQVAsRUFBWUMsS0FBSyxHQUFqQixFQUFmO0FBQ0gsQ0FIRDs7QUFLQTtBQUNBTixFQUFFLFlBQUYsRUFBZ0JKLEtBQWhCLENBQXNCLFlBQVk7QUFDOUIvQyxpQkFBYTBELEtBQWI7QUFDQSwwQkFBVUMsSUFBVjtBQUNBLDRCQUFZQyxJQUFaO0FBQ0gsQ0FKRDs7QUFNQTtBQUNBLG9CQUFRQyxFQUFSLENBQVcsV0FBWCxFQUF3QixVQUFVQyxDQUFWLEVBQWE7QUFDakMsUUFBSUMsVUFBVUQsRUFBRUUsT0FBaEI7QUFDQSxRQUFJQyxVQUFVSCxFQUFFSSxPQUFoQjtBQUNBLFFBQUlDLFNBQVMsdUJBQVdDLFFBQVgsRUFBYjtBQUNBLDBCQUFVUCxFQUFWLENBQWEsV0FBYixFQUEwQixVQUFVQyxDQUFWLEVBQWE7QUFDbkMsK0JBQVdQLEdBQVgsQ0FBZSxFQUFDQyxNQUFPVyxPQUFPWCxJQUFQLEdBQWNNLEVBQUVFLE9BQWhCLEdBQTBCRCxPQUEzQixHQUFzQyxJQUE3QyxFQUFtRE4sS0FBTVUsT0FBT1YsR0FBUCxHQUFhSyxFQUFFSSxPQUFmLEdBQXlCRCxPQUExQixHQUFxQyxJQUE3RixFQUFmO0FBQ0gsS0FGRDtBQUdILENBUEQ7QUFRQSxzQkFBVUosRUFBVixDQUFhLFNBQWIsRUFBd0IsWUFBWTtBQUNoQ1YsTUFBRSxJQUFGLEVBQVFrQixHQUFSLENBQVksV0FBWjtBQUNILENBRkQ7O0FBS0E7QUFDQWxCLEVBQUUsY0FBRixFQUFrQlUsRUFBbEIsQ0FBcUIsU0FBckIsRUFBK0IsVUFBVUMsQ0FBVixFQUFhO0FBQ3hDLFFBQUlRLFVBQVVuQixFQUFFLElBQUYsRUFBUUgsR0FBUixFQUFkO0FBQ0EsUUFBR2MsRUFBRVMsT0FBRixLQUFjLEVBQWQsSUFBb0JELE9BQXZCLEVBQStCO0FBQzNCO0FBQ0FyRixpQkFBU3VGLGVBQVQsQ0FBeUI7QUFDckJGLHFCQUFTQSxPQURZO0FBRXJCbkUscUJBQVMsaUJBQVNvQyxJQUFULEVBQWM7QUFDbkJrQyx3QkFBUUMsR0FBUixDQUFZbkMsSUFBWjtBQUNILGFBSm9CO0FBS3JCb0MsbUJBQU8sZUFBU0MsR0FBVCxFQUFhO0FBQ2hCSCx3QkFBUUMsR0FBUixDQUFZRSxHQUFaO0FBQ0g7QUFQb0IsU0FBekI7QUFTSDtBQUNKLENBZEQ7O0FBZ0JBO0FBQ0EsdUJBQVdmLEVBQVgsQ0FBYyxPQUFkLEVBQXNCLElBQXRCLEVBQTJCLFlBQVk7QUFDbkMsNEJBQVlwQixJQUFaLENBQWlCLEVBQWpCO0FBQ0FVLE1BQUUsSUFBRixFQUFRRyxRQUFSLENBQWlCLFFBQWpCO0FBQ0FILE1BQUUsSUFBRixFQUFRMEIsUUFBUixHQUFtQnhCLFdBQW5CLENBQStCLFFBQS9CO0FBQ0Esd0JBQVFaLElBQVIsQ0FBYVUsRUFBRSxJQUFGLEVBQVE1QyxJQUFSLENBQWEsZUFBYixDQUFiO0FBQ0E7QUFDQVAsaUJBQWFTLE9BQWIsQ0FBcUIsY0FBckIsRUFBcUMwQyxFQUFFLElBQUYsRUFBUTVDLElBQVIsQ0FBYSxTQUFiLENBQXJDO0FBQ0E7QUFDQVAsaUJBQWFTLE9BQWIsQ0FBcUIsVUFBckIsRUFBaUMwQyxFQUFFLElBQUYsRUFBUTVDLElBQVIsQ0FBYSxXQUFiLENBQWpDO0FBQ0E7QUFDQVAsaUJBQWFDLFVBQWIsQ0FBd0IsY0FBeEI7QUFDQTtBQUNBLHFDQUFrQmtELEVBQUUsSUFBRixFQUFRNUMsSUFBUixDQUFhLHFCQUFiLENBQWxCLEVBQXVENEMsRUFBRSxJQUFGLEVBQVE1QyxJQUFSLENBQWEsU0FBYixDQUF2RCxFQUFnRjRDLEVBQUUsSUFBRixFQUFRNUMsSUFBUixDQUFhLFdBQWIsQ0FBaEY7QUFDSCxDQWJEOztBQWVBO0FBQ0EsdUJBQVdzRCxFQUFYLENBQWMsT0FBZCxFQUFzQixRQUF0QixFQUErQixZQUFZO0FBQ3ZDLFFBQU1pQixRQUFRM0IsRUFBRSxJQUFGLEVBQVE1QyxJQUFSLENBQWEsU0FBYixDQUFkO0FBQ0F0QixhQUFTOEYsa0JBQVQsQ0FBNEI7QUFDeEJDLFlBQUlGLEtBRG9CO0FBRXhCRyxjQUFNOUIsRUFBRSxJQUFGLEVBQVE1QyxJQUFSLENBQWEsV0FBYixDQUZrQjtBQUd4QkosaUJBQVEsaUJBQVNvQyxJQUFULEVBQWM7QUFDbEI7QUFDQSxnQkFBSTJDLE9BQU9sRixhQUFhNEIsT0FBYixDQUFxQixjQUFyQixDQUFYO0FBQ0E7QUFDQSxnQkFBSXVELGVBQWV6RSxLQUFLbUMsS0FBTCxDQUFXN0MsYUFBYTRCLE9BQWIsQ0FBcUIsY0FBckIsS0FBd0MsSUFBbkQsQ0FBbkI7QUFDQXVELHlCQUFhQyxPQUFiLENBQXFCLFVBQVNDLE1BQVQsRUFBaUJDLENBQWpCLEVBQW1CO0FBQ3BDLG9CQUFHRCxPQUFPTCxFQUFQLEtBQWNGLEtBQWpCLEVBQXVCO0FBQ25CSyxpQ0FBYUksTUFBYixDQUFvQkQsQ0FBcEIsRUFBdUIsQ0FBdkI7QUFDSDtBQUNKLGFBSkQ7QUFLQTtBQUNBdEYseUJBQWFTLE9BQWIsQ0FBcUIsY0FBckIsRUFBcUNDLEtBQUtDLFNBQUwsQ0FBZXdFLFlBQWYsQ0FBckM7QUFDQTtBQUNBbkYseUJBQWFTLE9BQWIsQ0FBcUIsVUFBckIsRUFBaUMsV0FBakM7QUFDQTtBQUNBLDhDQUFtQjBFLFlBQW5CO0FBQ0gsU0FuQnVCO0FBb0J4QlIsZUFBTSxlQUFTQyxHQUFULEVBQWE7QUFDZkgsb0JBQVFDLEdBQVIsQ0FBWUUsR0FBWjtBQUNIO0FBdEJ1QixLQUE1QjtBQXdCQSxXQUFPLEtBQVA7QUFDSCxDQTNCRDs7QUE2QkE7QUFDQSx3QkFBWWYsRUFBWixDQUFlLE9BQWYsRUFBd0IsVUFBeEIsRUFBb0MsWUFBVTtBQUMxQyxRQUFJMkIsU0FBU3JDLEVBQUUsSUFBRixFQUFRNUMsSUFBUixDQUFhLFVBQWIsQ0FBYjtBQUNBLDJCQUFXa0MsSUFBWCxDQUFnQiw2QkFBNEIrQyxNQUE1QixHQUFvQyxTQUFwQyxHQUErQ0EsTUFBL0MsR0FBdUQsZ0JBQXZFO0FBQ0EsMEJBQVU1QixJQUFWLENBQWUsRUFBQ2hCLEtBQUs0QyxNQUFOLEVBQWY7QUFDSCxDQUpEOztBQVFBO0FBQ0FyQyxFQUFFLFlBQUYsRUFBZ0JzQyxLQUFoQixDQUFzQixZQUFZO0FBQzlCdEMsTUFBRSxJQUFGLEVBQVFHLFFBQVIsQ0FBaUIsT0FBakI7QUFDQUgsTUFBRSxTQUFGLEVBQWFJLEdBQWIsQ0FBaUIsU0FBakIsRUFBNEIsT0FBNUI7QUFDSCxDQUhELEVBR0UsWUFBWTtBQUNWSixNQUFFLElBQUYsRUFBUUUsV0FBUixDQUFvQixPQUFwQjtBQUNBRixNQUFFLFNBQUYsRUFBYUksR0FBYixDQUFpQixTQUFqQixFQUE0QixNQUE1QjtBQUNILENBTkQsRUFNR1IsS0FOSCxDQU1TLFlBQVk7QUFDakIsMEJBQVUyQyxNQUFWO0FBQ0EsV0FBTyxLQUFQO0FBQ0gsQ0FURDs7QUFXQTtBQUNBLHNCQUFVN0IsRUFBVixDQUFhLE9BQWIsRUFBc0IsSUFBdEIsRUFBNEIsWUFBWTtBQUNwQyw2QkFBYWIsR0FBYixDQUFpQix5QkFBYUEsR0FBYixLQUFxQkcsRUFBRSxJQUFGLEVBQVE1QyxJQUFSLENBQWEsV0FBYixDQUF0QztBQUNBLFFBQUcseUJBQWF5QyxHQUFiLEVBQUgsRUFBc0I7QUFDbEIsOEJBQVVLLFdBQVYsQ0FBc0Isd0JBQXRCO0FBQ0gsS0FGRCxNQUVNO0FBQ0YsOEJBQVVDLFFBQVYsQ0FBbUIsd0JBQW5CO0FBQ0g7QUFDRCxXQUFPLEtBQVA7QUFDSCxDQVJEOztBQVVBO0FBQ0Esc0JBQVVtQyxLQUFWLENBQWdCLFVBQVUzQixDQUFWLEVBQWEsQ0FBRSxDQUEvQixFQUFnQyxZQUFVO0FBQUNYLE1BQUUsSUFBRixFQUFRUSxJQUFSO0FBQWUsQ0FBMUQ7O0FBRUE7QUFDQVIsRUFBRSxZQUFGLEVBQWdCc0MsS0FBaEIsQ0FBc0IsWUFBWTtBQUM5QnRDLE1BQUUsSUFBRixFQUFRRyxRQUFSLENBQWlCLE9BQWpCO0FBQ0FILE1BQUUsU0FBRixFQUFhSSxHQUFiLENBQWlCLFNBQWpCLEVBQTRCLE9BQTVCO0FBQ0gsQ0FIRCxFQUdFLFlBQVk7QUFDVkosTUFBRSxJQUFGLEVBQVFFLFdBQVIsQ0FBb0IsT0FBcEI7QUFDQUYsTUFBRSxTQUFGLEVBQWFJLEdBQWIsQ0FBaUIsU0FBakIsRUFBNEIsTUFBNUI7QUFDSCxDQU5ELEVBTUdSLEtBTkgsQ0FNUyxZQUFZO0FBQ2pCSSxNQUFFLFlBQUYsRUFBZ0JKLEtBQWhCO0FBQ0gsQ0FSRDs7QUFVQUksRUFBRSxZQUFGLEVBQWdCVSxFQUFoQixDQUFtQixRQUFuQixFQUE2QixZQUFVO0FBQ25DO0FBQ0EsUUFBSThCLEtBQUszRixhQUFhNEIsT0FBYixDQUFxQixjQUFyQixDQUFUO0FBQ0EzQyxhQUFTMkcsT0FBVCxDQUFpQjtBQUNiQyxxQkFBWSxXQURDLEVBQ1k7QUFDekI7QUFDQUMsa0JBQVUsb0JBQVU7QUFBRTtBQUNsQixtQkFBTztBQUNISCxvQkFBSUEsRUFERCxFQUNLO0FBQ1JWLHNCQUFNLE1BRkgsRUFFVztBQUNkYyx3QkFBUSxFQUhMLENBR1E7QUFIUixhQUFQO0FBS0gsU0FUWTtBQVViQyxzQkFBYyx3QkFBVSxDQUFFLENBVmIsRUFVZTtBQUM1QkMsc0JBQWMsd0JBQVUsQ0FBRSxDQVhiLEVBV2U7QUFDNUJDLHNCQUFjLHdCQUFVLENBQUUsQ0FaYixFQVllO0FBQzVCL0YsaUJBQVEsaUJBQVN1QixHQUFULEVBQWE7QUFDakI7QUFDQSxnREFBcUJBLEdBQXJCO0FBQ0gsU0FoQlk7QUFpQmJpRCxlQUFPLGVBQVNDLEdBQVQsRUFBYTtBQUNoQkgsb0JBQVFDLEdBQVIsQ0FBWUUsR0FBWjtBQUNILFNBbkJZO0FBb0JidUIsa0JBQVUsa0JBQVNDLEdBQVQsRUFBYTtBQUNuQjtBQUNBM0Isb0JBQVFDLEdBQVIsQ0FBWTBCLEdBQVo7QUFDSDtBQXZCWSxLQUFqQjtBQXlCSCxDQTVCRDs7QUE4QkE7QUFDQWpELEVBQUUsWUFBRixFQUFnQnNDLEtBQWhCLENBQXNCLFlBQVk7QUFDOUJ0QyxNQUFFLElBQUYsRUFBUUcsUUFBUixDQUFpQixPQUFqQjtBQUNBSCxNQUFFLFNBQUYsRUFBYUksR0FBYixDQUFpQixTQUFqQixFQUE0QixPQUE1QjtBQUNILENBSEQsRUFHRSxZQUFZO0FBQ1ZKLE1BQUUsSUFBRixFQUFRRSxXQUFSLENBQW9CLE9BQXBCO0FBQ0FGLE1BQUUsU0FBRixFQUFhSSxHQUFiLENBQWlCLFNBQWpCLEVBQTRCLE1BQTVCO0FBQ0gsQ0FORCxFQU1HUixLQU5ILENBTVMsWUFBWTtBQUNqQkksTUFBRSxhQUFGLEVBQWlCSixLQUFqQjtBQUNILENBUkQ7O0FBVUFJLEVBQUUsYUFBRixFQUFpQlUsRUFBakIsQ0FBb0IsUUFBcEIsRUFBOEIsWUFBVTtBQUNwQztBQUNBLFFBQUk4QixLQUFLM0YsYUFBYTRCLE9BQWIsQ0FBcUIsY0FBckIsQ0FBVDtBQUNBM0MsYUFBU29ILFFBQVQsQ0FBa0I7QUFDZFIscUJBQVksWUFERSxFQUNZO0FBQzFCO0FBQ0FDLGtCQUFVLG9CQUFVO0FBQUU7QUFDbEIsbUJBQU87QUFDSEgsb0JBQUlBLEVBREQsRUFDSztBQUNSVixzQkFBTSxNQUZILEVBRVc7QUFDZGMsd0JBQVEsRUFITCxDQUdRO0FBSFIsYUFBUDtBQUtILFNBVGE7QUFVZEMsc0JBQWMsd0JBQVUsQ0FBRSxDQVZaLEVBVWM7QUFDNUJDLHNCQUFjLHdCQUFVLENBQUUsQ0FYWixFQVdjO0FBQzVCQyxzQkFBYyx3QkFBVSxDQUFFLENBWlosRUFZYztBQUM1Qi9GLGlCQUFRLGlCQUFTdUIsR0FBVCxFQUFhO0FBQ2pCO0FBQ0EsZ0RBQXFCQSxHQUFyQjtBQUNILFNBaEJhO0FBaUJkaUQsZUFBTyxlQUFTQyxHQUFULEVBQWE7QUFDaEJILG9CQUFRQyxHQUFSLENBQVlFLEdBQVo7QUFDSCxTQW5CYTtBQW9CZHVCLGtCQUFVLGtCQUFTQyxHQUFULEVBQWE7QUFDbkI7QUFDQTNCLG9CQUFRQyxHQUFSLENBQVkwQixHQUFaO0FBQ0g7QUF2QmEsS0FBbEI7QUF5QkgsQ0E1QkQ7O0FBK0JBO0FBQ0EseUJBQWF2QyxFQUFiLENBQWdCLHNCQUFoQixFQUF3QyxZQUFZO0FBQ2hELFFBQUdWLEVBQUUsSUFBRixFQUFRSCxHQUFSLEVBQUgsRUFBaUI7QUFDYiw4QkFBVUssV0FBVixDQUFzQix3QkFBdEI7QUFDSCxLQUZELE1BRU07QUFDRiw4QkFBVUMsUUFBVixDQUFtQix3QkFBbkI7QUFDSDtBQUNKLENBTkQ7O0FBUUE7QUFDQSxzQkFBVU8sRUFBVixDQUFhLE9BQWIsRUFBcUIsWUFBWTtBQUM3QixRQUFHLHlCQUFhYixHQUFiLEVBQUgsRUFBc0I7QUFDbEI7QUFDQSxZQUFJMkMsS0FBSzNGLGFBQWE0QixPQUFiLENBQXFCLGNBQXJCLENBQVQ7QUFDQTtBQUNBLFlBQUlELFdBQVczQixhQUFhNEIsT0FBYixDQUFxQixVQUFyQixDQUFmO0FBQ0E7QUFDQTNDLGlCQUFTcUgsZUFBVCxDQUF5QjtBQUNyQlgsZ0JBQUlBLEVBRGlCLEVBQ2I7QUFDUlYsa0JBQU10RCxRQUZlLEVBRUo7QUFDakI0RSxxQkFBUSx5QkFBYXZELEdBQWIsRUFIYSxFQUdPO0FBQzVCK0Msb0JBQVEsRUFKYSxFQUlSO0FBQ2I1RixxQkFBUyxpQkFBVXVCLEdBQVYsRUFBZTtBQUNwQjtBQUNBLHlDQUFhc0IsR0FBYixDQUFpQixFQUFqQjtBQUNBLHNDQUFVTSxRQUFWLENBQW1CLHdCQUFuQjtBQUNBO0FBQ0Esb0RBQXFCNUIsR0FBckI7QUFDSDtBQVhvQixTQUF6QjtBQWFIO0FBQ0osQ0FyQkQ7O0FBdUJBO0FBQ0EseUJBQWFtQyxFQUFiLENBQWdCLFNBQWhCLEVBQTBCLFVBQVNDLENBQVQsRUFBVztBQUNqQyxRQUFHQSxFQUFFUyxPQUFGLEtBQWMsRUFBZCxJQUFvQix5QkFBYXZCLEdBQWIsRUFBdkIsRUFBMEM7QUFDdEM7QUFDQSxZQUFJMkMsS0FBSzNGLGFBQWE0QixPQUFiLENBQXFCLGNBQXJCLENBQVQ7QUFDQTtBQUNBLFlBQUlELFdBQVczQixhQUFhNEIsT0FBYixDQUFxQixVQUFyQixDQUFmO0FBQ0E7QUFDQTNDLGlCQUFTcUgsZUFBVCxDQUF5QjtBQUNyQlgsZ0JBQUlBLEVBRGlCLEVBQ2I7QUFDUlYsa0JBQU10RCxRQUZlLEVBRUo7QUFDakI0RSxxQkFBUSx5QkFBYXZELEdBQWIsRUFIYSxFQUdPO0FBQzVCd0Qsa0JBQU0sRUFKZSxFQUlWO0FBQ1hyRyxxQkFBUyxpQkFBVXVCLEdBQVYsRUFBZTtBQUNwQjtBQUNBLHlDQUFhc0IsR0FBYixDQUFpQixFQUFqQjtBQUNBLHNDQUFVTSxRQUFWLENBQW1CLHdCQUFuQjtBQUNBO0FBQ0Esb0RBQXFCNUIsR0FBckI7QUFDSDtBQVhvQixTQUF6QjtBQWFIO0FBQ0osQ0FyQkQ7O0FBdUJBO0FBQ0Esd0JBQVltQyxFQUFaLENBQWUsT0FBZixFQUF1QixZQUFVO0FBQzdCLFFBQUk0QyxZQUFZL0YsS0FBS21DLEtBQUwsQ0FBVzdDLGFBQWE0QixPQUFiLENBQXFCLGlCQUFyQixLQUEyQyxJQUF0RCxDQUFoQjtBQUNBLDRCQUFZYSxJQUFaLHNKQUlnQ2dFLFVBQVVwRyxLQUFWLEdBQWlCcEIsU0FBU3VCLFVBQVQsQ0FBb0JpRyxVQUFVcEcsS0FBOUIsQ0FBakIsR0FBd0QsRUFKeEYsMEZBTXVDb0csVUFBVUMsUUFBVixJQUFzQkQsVUFBVXpCLEVBTnZFLG1JQVN1Q3lCLFVBQVVFLEtBQVYsSUFBbUIsRUFUMUQsb0VBVXVDRixVQUFVRyxNQUFWLElBQW9CLEVBVjNELG9FQVd1Q0gsVUFBVUksTUFBVixJQUFvQixFQVgzRCx1SEFlR2pELElBZkg7QUFnQkgsQ0FsQkQ7QUFtQkE7QUFDQSx3QkFBWUMsRUFBWixDQUFlLE9BQWYsRUFBdUIsZ0JBQXZCLEVBQXdDLFlBQVU7QUFDOUMsNEJBQVlGLElBQVo7QUFDSCxDQUZEOztBQUlBO0FBQ0Esb0JBQVFFLEVBQVIsQ0FBVyxPQUFYLEVBQW1CLFlBQVU7QUFDekIsUUFBR1YsRUFBRSxJQUFGLEVBQVFDLFFBQVIsQ0FBaUIsUUFBakIsQ0FBSCxFQUE4QjtBQUFDO0FBQVE7QUFDdkNELE1BQUUsSUFBRixFQUFRRyxRQUFSLENBQWlCLFFBQWpCO0FBQ0FILE1BQUUsSUFBRixFQUFRMEIsUUFBUixHQUFtQnhCLFdBQW5CLENBQStCLFFBQS9COztBQUVBLHlCQUFTTSxJQUFUO0FBQ0EsMkJBQVdDLElBQVg7QUFDQTtBQUNBNUQsaUJBQWFDLFVBQWIsQ0FBd0IsY0FBeEI7QUFDQTtBQUNBLFFBQUk2RyxlQUFlOUcsYUFBYTRCLE9BQWIsQ0FBcUIsY0FBckIsS0FBd0MsSUFBM0Q7QUFDQSxzQ0FBbUJsQixLQUFLbUMsS0FBTCxDQUFXaUUsWUFBWCxDQUFuQjtBQUNILENBWkQ7QUFhQTtBQUNBLHNCQUFVakQsRUFBVixDQUFhLE9BQWIsRUFBcUIsWUFBVTtBQUMzQixRQUFHVixFQUFFLElBQUYsRUFBUUMsUUFBUixDQUFpQixRQUFqQixDQUFILEVBQThCO0FBQUM7QUFBUTtBQUN2Q0QsTUFBRSxJQUFGLEVBQVFHLFFBQVIsQ0FBaUIsUUFBakI7QUFDQUgsTUFBRSxJQUFGLEVBQVEwQixRQUFSLEdBQW1CeEIsV0FBbkIsQ0FBK0IsUUFBL0I7QUFDSCxDQUpEO0FBS0E7QUFDQSxxQkFBU1EsRUFBVCxDQUFZLE9BQVosRUFBb0IsWUFBVTtBQUMxQixRQUFHVixFQUFFLElBQUYsRUFBUUMsUUFBUixDQUFpQixRQUFqQixDQUFILEVBQThCO0FBQUM7QUFBUTtBQUN2Q0QsTUFBRSxJQUFGLEVBQVFHLFFBQVIsQ0FBaUIsUUFBakI7QUFDQUgsTUFBRSxJQUFGLEVBQVEwQixRQUFSLEdBQW1CeEIsV0FBbkIsQ0FBK0IsUUFBL0I7QUFDQTtBQUNBLHdCQUFRWixJQUFSLENBQWEsRUFBYjtBQUNBO0FBQ0EsMkJBQVdrQixJQUFYO0FBQ0E7QUFDQSwwQkFBVUEsSUFBVjtBQUNBO0FBQ0EseUJBQVNsQixJQUFULENBQWMsRUFBZDtBQUNBLHlCQUFTbUIsSUFBVDs7QUFFQSxRQUFJbUQsWUFBWS9HLGFBQWE0QixPQUFiLENBQXFCLFdBQXJCLENBQWhCO0FBQ0EsUUFBR21GLFNBQUgsRUFBYTtBQUNUO0FBQ0Esd0NBQWlCckcsS0FBS21DLEtBQUwsQ0FBV2tFLFNBQVgsQ0FBakI7QUFDSCxLQUhELE1BR007QUFDRjtBQUNBO0FBQ0g7QUFDSixDQXRCRDtBQXVCQTtBQUNBLHdCQUFZbEQsRUFBWixDQUFlLE9BQWYsRUFBdUIsWUFBVTtBQUM3QixRQUFHVixFQUFFLElBQUYsRUFBUUMsUUFBUixDQUFpQixRQUFqQixDQUFILEVBQThCO0FBQUM7QUFBUTs7QUFFdkNELE1BQUUsSUFBRixFQUFRRyxRQUFSLENBQWlCLFFBQWpCO0FBQ0FILE1BQUUsSUFBRixFQUFRMEIsUUFBUixHQUFtQnhCLFdBQW5CLENBQStCLFFBQS9CO0FBQ0gsQ0FMRDs7QUFPQSxxQkFBU1EsRUFBVCxDQUFZLE9BQVosRUFBcUIsSUFBckIsRUFBMkIsWUFBVTtBQUNqQyx3QkFBUVAsUUFBUixDQUFpQixRQUFqQjtBQUNBLHdCQUFRdUIsUUFBUixHQUFtQnhCLFdBQW5CLENBQStCLFFBQS9CO0FBQ0EseUJBQVNNLElBQVQ7QUFDQSwyQkFBV2xCLElBQVgsQ0FBZ0IsRUFBaEI7QUFDQSwyQkFBV21CLElBQVg7O0FBRUE7QUFDQTVELGlCQUFhUyxPQUFiLENBQXFCLGNBQXJCLEVBQXFDMEMsRUFBRSxJQUFGLEVBQVE1QyxJQUFSLENBQWEsU0FBYixDQUFyQzs7QUFFQSxRQUFJeUcsT0FBTzdELEVBQUUsSUFBRixDQUFYO0FBQ0E7QUFDQSxRQUFJZ0MsZUFBZXpFLEtBQUttQyxLQUFMLENBQVc3QyxhQUFhNEIsT0FBYixDQUFxQixjQUFyQixLQUF3QyxJQUFuRCxDQUFuQjtBQUNBLFFBQUlxRixXQUFXLEtBQWYsQ0FiaUMsQ0FhWDtBQUN0QjlCLGlCQUFhQyxPQUFiLENBQXFCLFVBQVNDLE1BQVQsRUFBaUJDLENBQWpCLEVBQW1CO0FBQ3BDLFlBQUdELE9BQU9MLEVBQVAsS0FBY2dDLEtBQUt6RyxJQUFMLENBQVUsU0FBVixDQUFqQixFQUFzQztBQUNsQzBHLHVCQUFXLElBQVg7QUFDSDtBQUNKLEtBSkQ7QUFLQTtBQUNBLFFBQUcsQ0FBQ0EsUUFBSixFQUFhO0FBQ1Q5QixxQkFBYStCLElBQWIsQ0FBa0I7QUFDZGxDLGdCQUFJZ0MsS0FBS3pHLElBQUwsQ0FBVSxTQUFWLENBRFU7QUFFZDRHLDJCQUFlLEtBRkQ7QUFHZEMsNEJBQWdCLEtBSEY7QUFJZG5DLGtCQUFNLFdBSlE7QUFLZDVFLG1CQUFPMkcsS0FBS3pHLElBQUwsQ0FBVSxZQUFWLENBTE87QUFNZG1HLHNCQUFXTSxLQUFLekcsSUFBTCxDQUFVLFdBQVYsQ0FORztBQU9kOEcseUJBQWEsSUFQQztBQVFkQyw2QkFBaUIsSUFBSUMsSUFBSixHQUFXQyxPQUFYO0FBUkgsU0FBbEI7QUFVQTtBQUNBeEgscUJBQWFTLE9BQWIsQ0FBcUIsY0FBckIsRUFBcUNDLEtBQUtDLFNBQUwsQ0FBZXdFLFlBQWYsQ0FBckM7QUFDQTtBQUNBbkYscUJBQWFTLE9BQWIsQ0FBcUIsVUFBckIsRUFBaUMsV0FBakM7QUFDSDtBQUNEO0FBQ0Esc0NBQW1CMEUsWUFBbkI7QUFDQTtBQUNBLHdCQUFRMUMsSUFBUixDQUFhVSxFQUFFLElBQUYsRUFBUTVDLElBQVIsQ0FBYSxXQUFiLENBQWI7QUFDQTtBQUNBUCxpQkFBYUMsVUFBYixDQUF3QixjQUF4QjtBQUNBO0FBQ0EscUNBQWtCLEtBQWxCLEVBQXlCa0QsRUFBRSxJQUFGLEVBQVE1QyxJQUFSLENBQWEsU0FBYixDQUF6QixFQUFrRCxXQUFsRDtBQUNILENBNUNELEU7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xaQTs7Ozs7O2tCQUdlLFlBQU07O0FBRWpCO0FBQ0F0QixhQUFTd0ksYUFBVCxDQUF1QjtBQUNuQnRILGlCQUFRLGlCQUFTb0MsSUFBVCxFQUFjO0FBQ2xCO0FBQ0F2Qyx5QkFBYVMsT0FBYixDQUFxQixXQUFyQixFQUFrQ0MsS0FBS0MsU0FBTCxDQUFlNEIsS0FBS3dFLFNBQXBCLENBQWxDO0FBQ0EsNENBQWlCeEUsS0FBS3dFLFNBQXRCO0FBQ0gsU0FMa0I7QUFNbkJwQyxlQUFNLGVBQVNDLEdBQVQsRUFBYTtBQUNmSCxvQkFBUUMsR0FBUixDQUFZRSxHQUFaO0FBQ0g7QUFSa0IsS0FBdkI7QUFVSCxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNmRDs7QUFNQTs7Ozs7O0FBRUE7QUFUQTtrQkFVZSxVQUFDd0MsY0FBRCxFQUFpQnBDLEVBQWpCLEVBQXFCQyxJQUFyQixFQUE4QjtBQUN6QyxRQUFJeUMsUUFBUU4saUJBQWlCLEVBQWpCLEdBQXNCQSxpQkFBaUIsRUFBdkMsR0FBNEMsQ0FBeEQ7QUFDQTtBQUNBbkksYUFBUzBJLGlCQUFULENBQTJCO0FBQ3ZCM0MsWUFBSUEsRUFEbUI7QUFFdkJDLGNBQU1BLElBRmlCO0FBR3ZCMkMsc0JBQWNGLEtBSFM7QUFJdkJHLG9CQUFZVCxjQUpXO0FBS3ZCakgsaUJBQVMsaUJBQVVDLEdBQVYsRUFBZTtBQUNwQixnQkFBSTBILGVBQWUxSCxJQUFJMkgsTUFBSixJQUFjLEVBQWpDO0FBQ0Esa0NBQVVuRSxJQUFWO0FBQ0FrRSx5QkFBYUUsT0FBYjtBQUNBO0FBQ0FoSSx5QkFBYVMsT0FBYixDQUFxQixjQUFyQixFQUFxQ0MsS0FBS0MsU0FBTCxDQUFlbUgsWUFBZixDQUFyQztBQUNBO0FBQ0E7QUFDSDtBQWJzQixLQUEzQjtBQWVILEM7O0FBdEJELFE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0pBOzs7Ozs7QUFFQTtrQkFDZSxZQUFNO0FBQ2pCO0FBQ0E3SSxhQUFTZ0osZUFBVCxDQUF5QjtBQUNyQjlILGlCQUFTLGlCQUFVNEgsTUFBVixFQUFrQjtBQUN2QixnQkFBSUEsT0FBT0csSUFBUCxDQUFZQyxNQUFoQixFQUF3QjtBQUNwQixvQkFBSWhELGVBQWUsRUFBbkI7QUFDQTRDLHVCQUFPRyxJQUFQLENBQVk5QyxPQUFaLENBQW9CLFVBQVN0QixDQUFULEVBQVl3QixDQUFaLEVBQWM7QUFDOUI7QUFDQSx3QkFBR3hCLEVBQUVtQixJQUFGLEtBQVcsTUFBWCxJQUFxQm5CLEVBQUVtQixJQUFGLEtBQVcsV0FBbkMsRUFBK0M7QUFBQztBQUFRO0FBQ3hEO0FBQ0FoRyw2QkFBU2lCLFFBQVQsQ0FBa0I7QUFDZDhFLDRCQUFJbEIsRUFBRWtCLEVBRFE7QUFFZDdFLGlDQUFTLGlCQUFTQyxHQUFULEVBQWE7QUFDbEI7QUFDQStFLHlDQUFhK0IsSUFBYixDQUFrQjtBQUNkbEMsb0NBQUk1RSxJQUFJNEUsRUFETTtBQUVkbUMsK0NBQWVyRCxFQUFFcUQsYUFGSDtBQUdkQyxnREFBZ0J0RCxFQUFFc0QsY0FISjtBQUlkbkMsc0NBQU1uQixFQUFFbUIsSUFKTTtBQUtkNUUsdUNBQU9ELElBQUlDLEtBQUosSUFBYSxFQUxOO0FBTWRxRywwQ0FBVXRHLElBQUlzRyxRQU5BO0FBT2RXLDZDQUFhdkQsRUFBRXVELFdBUEQ7QUFRZEMsaURBQWlCeEQsRUFBRXdEO0FBUkwsNkJBQWxCO0FBVUE7QUFDQXRILHlDQUFhUyxPQUFiLENBQXFCLGNBQXJCLEVBQXFDQyxLQUFLQyxTQUFMLENBQWV3RSxZQUFmLENBQXJDO0FBQ0EsOERBQW1CQSxZQUFuQjtBQUNIO0FBakJhLHFCQUFsQjtBQW1CSCxpQkF2QkQ7QUF3Qkg7QUFDSixTQTdCb0I7QUE4QnJCUixlQUFNLGVBQVVDLEdBQVYsRUFBYztBQUNoQkgsb0JBQVFDLEdBQVIsQ0FBWUUsR0FBWjtBQUNIO0FBaENvQixLQUF6QjtBQWtDSCxDO0FBeENELGE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQU8sSUFBTXdELG9DQUFjakYsRUFBRSxhQUFGLENBQXBCLEMsQ0FBcUM7QUFDckMsSUFBTWtGLDRDQUFrQmxGLEVBQUUsaUJBQUYsQ0FBeEIsQyxDQUE2QztBQUM3QyxJQUFNbUYsb0NBQWNuRixFQUFFLGFBQUYsQ0FBcEIsQyxDQUFxQztBQUNyQyxJQUFNb0Ysa0NBQWFwRixFQUFFLFlBQUYsQ0FBbkIsQyxDQUFtQztBQUNuQyxJQUFNcUYsZ0NBQVlyRixFQUFFLFdBQUYsQ0FBbEIsQyxDQUFpQztBQUNqQyxJQUFNc0Ysa0NBQWF0RixFQUFFLFlBQUYsQ0FBbkIsQyxDQUFtQztBQUNuQyxJQUFNdUYsNEJBQVV2RixFQUFFLFNBQUYsQ0FBaEIsQyxDQUE2QjtBQUM3QixJQUFNd0Ysa0NBQWF4RixFQUFFLFlBQUYsQ0FBbkIsQyxDQUFtQztBQUNuQyxJQUFNeUYsOEJBQVd6RixFQUFFLFVBQUYsQ0FBakIsQyxDQUErQjtBQUMvQixJQUFNMEYsMEJBQVMxRixFQUFFLFFBQUYsQ0FBZixDLENBQTJCO0FBQzNCLElBQU0yRixnQ0FBWTNGLEVBQUUsV0FBRixDQUFsQixDLENBQWlDO0FBQ2pDLElBQU00RixzQ0FBZTVGLEVBQUUsY0FBRixDQUFyQixDLENBQXVDO0FBQ3ZDLElBQU02RixnQ0FBWTdGLEVBQUUsZ0JBQUYsQ0FBbEIsQyxDQUF1QztBQUN2QyxJQUFNOEYsZ0NBQVk5RixFQUFFLFdBQUYsQ0FBbEIsQyxDQUFrQztBQUNsQyxJQUFNK0Ysb0NBQWMvRixFQUFFLGFBQUYsQ0FBcEIsQyxDQUFzQztBQUN0QyxJQUFNZ0csa0NBQWFoRyxFQUFFLFlBQUYsQ0FBbkIsQyxDQUFvQzs7QUFFcEMsSUFBTWlHLG9DQUFjakcsRUFBRSxhQUFGLENBQXBCLEMsQ0FBc0M7QUFDdEMsSUFBTWtHLG9DQUFjbEcsRUFBRSxhQUFGLENBQXBCLEMsQ0FBc0M7O0FBRXRDLElBQU1tRyw0QkFBVW5HLEVBQUUsU0FBRixDQUFoQixDLENBQThCO0FBQzlCLElBQU1vRyxnQ0FBWXBHLEVBQUUsV0FBRixDQUFsQixDLENBQWtDO0FBQ2xDLElBQU1xRyw4QkFBV3JHLEVBQUUsVUFBRixDQUFqQixDLENBQWdDO0FBQ2hDLElBQU1zRyxvQ0FBY3RHLEVBQUUsYUFBRixDQUFwQixDLENBQXNDOztBQUU3QztBQUNPLElBQU11RyxnQ0FBWSxJQUFJQyxNQUFKLENBQVdSLFdBQVcsQ0FBWCxDQUFYLEVBQTBCLEVBQUNTLFFBQU8sS0FBUixFQUFlQyxPQUFPLEtBQXRCLEVBQTFCLENBQWxCO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoREE7O2tCQUllLFVBQUNDLE1BQUQsRUFBWTtBQUN2QixRQUFJQyxXQUFXLEVBQWY7QUFDQUQsV0FBTzFFLE9BQVAsQ0FBZSxVQUFTNEUsS0FBVCxFQUFlO0FBQzFCRCxzQ0FBNEJDLE1BQU1oRixFQUFsQyxxQkFBb0RnRixNQUFNQyxJQUExRCx1QkFBK0VELE1BQU0zSixLQUFOLElBQWUsRUFBOUYsMEZBRTRCcEIsU0FBU3VCLFVBQVQsQ0FBb0J3SixNQUFNM0osS0FBMUIsS0FBb0MsbUJBRmhFLG1KQUswQzJKLE1BQU1DLElBQU4sSUFBYyxJQUx4RDtBQVFILEtBVEQ7QUFVQSx5QkFBU3hILElBQVQsQ0FBY3NILFFBQWQ7QUFDSCxDO0FBbEJELE87Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0NBOztBQU1BOzs7O0FBR0E7Ozs7QUFHQTs7OztBQUVBOzs7QUFOQTs7QUFUQTtBQWdCQSxJQUFNRyxlQUFlLFNBQWZBLFlBQWUsQ0FBQ0MsR0FBRCxFQUFTO0FBQzFCLFdBQU9BLElBQUlDLE9BQUosQ0FBWSxlQUFaLEVBQTRCLFVBQUN0RyxDQUFELEVBQU87QUFDdEMsYUFBSyxJQUFJd0IsSUFBRSxDQUFYLEVBQWFBLElBQUUsMEJBQWUvQyxJQUFmLENBQW9CNEYsTUFBbkMsRUFBMEM3QyxHQUExQyxFQUE4QztBQUMxQyxnQkFBRywwQkFBZS9DLElBQWYsQ0FBb0IrQyxDQUFwQixFQUF1QjlDLFVBQXZCLEtBQXNDc0IsQ0FBekMsRUFBMkM7QUFDdkMscURBQWtDLDBCQUFleEIsSUFBZixHQUFzQiwwQkFBZUMsSUFBZixDQUFvQitDLENBQXBCLEVBQXVCMUMsR0FBL0U7QUFDQTtBQUNIO0FBQ0o7QUFDRCxlQUFPa0IsQ0FBUDtBQUNILEtBUk0sQ0FBUDtBQVNILENBVkQ7O0FBWUE7OztBQWhCQTs7O0FBTkE7O2tCQXVCZSxVQUFDcEMsR0FBRCxFQUFTO0FBQ3BCO0FBQ0EsUUFBSW9HLGVBQWVwSCxLQUFLbUMsS0FBTCxDQUFXN0MsYUFBYTRCLE9BQWIsQ0FBcUIsY0FBckIsS0FBd0MsSUFBbkQsQ0FBbkI7QUFDQTtBQUNBLFFBQUl1RCxlQUFlekUsS0FBS21DLEtBQUwsQ0FBVzdDLGFBQWE0QixPQUFiLENBQXFCLGNBQXJCLEtBQXdDLElBQW5ELENBQW5CO0FBQ0E7QUFDQSxRQUFJeUksZUFBZXJLLGFBQWE0QixPQUFiLENBQXFCLGNBQXJCLENBQW5CO0FBQ0E7QUFDQSxRQUFJMEksT0FBTzVKLEtBQUttQyxLQUFMLENBQVc3QyxhQUFhNEIsT0FBYixDQUFxQixpQkFBckIsQ0FBWCxFQUFvRG9ELEVBQS9EO0FBQ0E7QUFDQSxRQUFJckQsV0FBVzNCLGFBQWE0QixPQUFiLENBQXFCLFVBQXJCLENBQWY7O0FBRUE7QUFDQSxRQUFJMkksWUFBWSxFQUFoQjs7QUFFQTtBQUNBLFFBQUc3SSxHQUFILEVBQU87QUFDSDZJLG9CQUFZNUksYUFBYSxNQUFiLEdBQXNCRCxJQUFJOEksSUFBMUIsR0FBaUM5SSxJQUFJOEksSUFBSixDQUFTQyxNQUF0RDtBQUNBLFlBQUlDLFdBQVdKLFNBQVNDLFNBQXhCO0FBQ0EsWUFBR0csUUFBSCxFQUFZO0FBQUU7QUFDVnZGLHlCQUFhQyxPQUFiLENBQXFCLFVBQVNDLE1BQVQsRUFBaUJDLENBQWpCLEVBQW1CO0FBQ3BDLG9CQUFHRCxPQUFPTCxFQUFQLEtBQWNxRixZQUFqQixFQUE4QjtBQUMxQmxGLGlDQUFhRyxDQUFiLEVBQWdCZ0MsZUFBaEIsR0FBa0M1RixJQUFJYSxJQUFKLENBQVNvSSxRQUEzQztBQUNBeEYsaUNBQWFHLENBQWIsRUFBZ0IrQixXQUFoQixHQUE4QjNGLEdBQTlCO0FBQ0F5RCxpQ0FBYUcsQ0FBYixFQUFnQjhCLGNBQWhCO0FBQ0FqQyxpQ0FBYUcsQ0FBYixFQUFnQjZCLGFBQWhCO0FBQ0E7QUFDQW5ILGlDQUFhUyxPQUFiLENBQXFCLGNBQXJCLEVBQXFDQyxLQUFLQyxTQUFMLENBQWV3RSxZQUFmLENBQXJDO0FBQ0E7QUFDQSxzREFBbUJBLFlBQW5CO0FBQ0g7QUFDSixhQVhEO0FBWUE7QUFDQTJDLHlCQUFhWixJQUFiLENBQWtCeEYsR0FBbEI7QUFDQTtBQUNBMUIseUJBQWFTLE9BQWIsQ0FBcUIsY0FBckIsRUFBb0NDLEtBQUtDLFNBQUwsQ0FBZW1ILFlBQWYsQ0FBcEM7QUFDSCxTQWpCRCxNQWlCTztBQUFFO0FBQ0wsZ0JBQUliLFdBQVcsS0FBZixDQURHLENBQ21CO0FBQ3RCOUIseUJBQWFDLE9BQWIsQ0FBcUIsVUFBU0MsTUFBVCxFQUFpQkMsQ0FBakIsRUFBbUI7QUFDcEMsb0JBQUdELE9BQU9MLEVBQVAsS0FBY3VGLFNBQWpCLEVBQTJCO0FBQ3ZCdEQsK0JBQVcsSUFBWDtBQUNBOUIsaUNBQWFHLENBQWIsRUFBZ0JnQyxlQUFoQixHQUFrQzVGLElBQUlhLElBQUosQ0FBU29JLFFBQTNDO0FBQ0F4RixpQ0FBYUcsQ0FBYixFQUFnQitCLFdBQWhCLEdBQThCM0YsR0FBOUI7QUFDQXlELGlDQUFhRyxDQUFiLEVBQWdCOEIsY0FBaEI7QUFDQWpDLGlDQUFhRyxDQUFiLEVBQWdCNkIsYUFBaEI7QUFDQTtBQUNBbkgsaUNBQWFTLE9BQWIsQ0FBcUIsY0FBckIsRUFBcUNDLEtBQUtDLFNBQUwsQ0FBZXdFLFlBQWYsQ0FBckM7QUFDQTtBQUNBLHNEQUFtQkEsWUFBbkI7QUFDSDtBQUNKLGFBWkQ7QUFhQTtBQUNBLGdCQUFHLENBQUM4QixRQUFKLEVBQWE7QUFBQztBQUFtQjtBQUNqQztBQUNBLGdCQUFHc0QsY0FBY0YsWUFBakIsRUFBOEI7QUFDMUI7QUFDQXZDLDZCQUFhWixJQUFiLENBQWtCeEYsR0FBbEI7QUFDQTtBQUNBMUIsNkJBQWFTLE9BQWIsQ0FBcUIsY0FBckIsRUFBb0NDLEtBQUtDLFNBQUwsQ0FBZW1ILFlBQWYsQ0FBcEM7QUFDSDtBQUNKO0FBQ0o7QUFDRDtBQUNBLFFBQUdwRyxPQUFPNkksY0FBY0QsSUFBckIsSUFBNkJDLGNBQWNGLFlBQTlDLEVBQTREOztBQUU1RCxRQUFJTyxXQUFXLEVBQWY7QUFDQTlDLGlCQUFhMUMsT0FBYixDQUFxQixVQUFTeUYsSUFBVCxFQUFldkYsQ0FBZixFQUFpQjtBQUNsQyxZQUFJb0YsV0FBVy9JLGFBQWEsTUFBYixHQUFzQjJJLFNBQVNPLEtBQUtMLElBQXBDLEdBQTJDRixTQUFTTyxLQUFLTCxJQUFMLENBQVVDLE1BQTdFO0FBQ0EsWUFBSUssV0FBV25KLGFBQWEsTUFBYixHQUFzQixFQUF0QixvQ0FBMERrSixLQUFLTCxJQUFMLENBQVVDLE1BQXBFLFdBQWY7QUFDQTtBQUNBLFlBQUdJLEtBQUt0SSxJQUFMLENBQVV3SSxXQUFWLEtBQTBCLENBQTdCLEVBQStCO0FBQzNCSCxxRkFDd0MsSUFBSXJELElBQUosQ0FBU3NELEtBQUt0SSxJQUFMLENBQVVvSSxRQUFuQixFQUE2Qkssa0JBQTdCLEVBRHhDLHFIQUdtQ04sV0FBVSw4QkFBVixHQUEwQyxhQUg3RSw0S0FNbUNBLFdBQVUsd0JBQVYsR0FBb0MsVUFOdkUsaURBTzBCSSxRQVAxQixvRUFRZ0RaLGFBQWFXLEtBQUt0SSxJQUFMLENBQVVnRSxPQUF2QixDQVJoRDtBQVlILFNBYkQsTUFhTSxJQUFHc0UsS0FBS3RJLElBQUwsQ0FBVXdJLFdBQVYsS0FBMEIsQ0FBN0IsRUFBK0I7QUFBRztBQUNwQyxnQkFBSXZGLFNBQVN2RyxTQUFTdUIsVUFBVCxDQUFvQnFLLEtBQUt0SSxJQUFMLENBQVVnRSxPQUFWLENBQWtCMEUsUUFBdEMsQ0FBYjtBQUNBTCxxRkFDd0MsSUFBSXJELElBQUosQ0FBU3NELEtBQUt0SSxJQUFMLENBQVVvSSxRQUFuQixFQUE2Qkssa0JBQTdCLEVBRHhDLHFIQUdtQ04sV0FBVSw4QkFBVixHQUEwQyxhQUg3RSw0S0FNbUNBLFdBQVUsd0JBQVYsR0FBb0MsVUFOdkUsaURBTzBCSSxRQVAxQiw2SUFTNkR0RixNQVQ3RCxlQVM2RUEsTUFUN0U7QUFjSCxTQWhCSyxNQWdCQSxJQUFHcUYsS0FBS3RJLElBQUwsQ0FBVXdJLFdBQVYsS0FBMEIsQ0FBN0IsRUFBK0I7QUFDakMsZ0JBQUl2RixVQUFTdkcsU0FBU3VCLFVBQVQsQ0FBb0JxSyxLQUFLdEksSUFBTCxDQUFVZ0UsT0FBVixDQUFrQjBFLFFBQXRDLENBQWI7QUFDQSxnQkFBSUMsV0FBV0wsS0FBS3RJLElBQUwsQ0FBVWdFLE9BQVYsQ0FBa0IwRCxJQUFsQixDQUF1QmtCLEtBQXZCLENBQTZCLENBQTdCLEVBQWdDLEVBQWhDLENBQWY7QUFDQVAscUZBQ3dDLElBQUlyRCxJQUFKLENBQVNzRCxLQUFLdEksSUFBTCxDQUFVb0ksUUFBbkIsRUFBNkJLLGtCQUE3QixFQUR4QyxxSEFHbUNOLFdBQVUsOEJBQVYsR0FBMEMsYUFIN0UsNEtBTW1DQSxXQUFVLHdCQUFWLEdBQW9DLFVBTnZFLGlEQU8wQkksUUFQMUIsd0lBU3dEdEYsT0FUeEQsNEhBVXlEMEYsUUFWekQsb0ZBV3lETCxLQUFLdEksSUFBTCxDQUFVZ0UsT0FBVixDQUFrQjZFLElBWDNFO0FBaUJIO0FBQ0osS0F0REQ7QUF1REEsNEJBQVkzSSxJQUFaLENBQWlCbUksUUFBakI7QUFDQSx1QkFBT1MsU0FBUCxDQUFpQixtQkFBTyxDQUFQLEVBQVVDLFlBQTNCO0FBQ0gsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkpEOztBQUlBOztBQUVBOztBQVBBO0FBUUEsSUFBTXBCLGVBQWUsU0FBZkEsWUFBZSxDQUFDQyxHQUFELEVBQVM7QUFDMUIsV0FBT0EsSUFBSUMsT0FBSixDQUFZLGVBQVosRUFBNEIsVUFBQ3RHLENBQUQsRUFBTztBQUN0QyxhQUFLLElBQUl3QixJQUFFLENBQVgsRUFBYUEsSUFBRSwwQkFBZS9DLElBQWYsQ0FBb0I0RixNQUFuQyxFQUEwQzdDLEdBQTFDLEVBQThDO0FBQzFDLGdCQUFHLDBCQUFlL0MsSUFBZixDQUFvQitDLENBQXBCLEVBQXVCOUMsVUFBdkIsS0FBc0NzQixDQUF6QyxFQUEyQztBQUN2QyxxREFBa0MsMEJBQWV4QixJQUFmLEdBQXNCLDBCQUFlQyxJQUFmLENBQW9CK0MsQ0FBcEIsRUFBdUIxQyxHQUEvRTtBQUNBO0FBQ0g7QUFDSjtBQUNELGVBQU9rQixDQUFQO0FBQ0gsS0FSTSxDQUFQO0FBU0gsQ0FWRDtBQUpBOztrQkFnQmUsVUFBQ3lILE9BQUQsRUFBYTtBQUN4QjtBQUNBLFFBQUlsQixlQUFlckssYUFBYTRCLE9BQWIsQ0FBcUIsY0FBckIsQ0FBbkI7QUFDQSxRQUFJNEosU0FBUyxFQUFiO0FBQ0FELFlBQVFFLElBQVIsQ0FBYSxVQUFTQyxDQUFULEVBQVlDLENBQVosRUFBYztBQUFDLGVBQU9BLEVBQUVyRSxlQUFGLEdBQW9Cb0UsRUFBRXBFLGVBQTdCO0FBQTZDLEtBQXpFO0FBQ0FpRSxZQUFRbkcsT0FBUixDQUFnQixVQUFTaEYsR0FBVCxFQUFhO0FBQ3pCLFlBQUl3TCxVQUFVeEwsSUFBSWlILFdBQWxCO0FBQUEsWUFBK0J3RSxhQUFhLEVBQTVDO0FBQUEsWUFBZ0RDLFlBQVksRUFBNUQ7QUFDQSxZQUFJQyxXQUFXM0wsSUFBSWdILGNBQUosR0FBcUJoSCxJQUFJK0csYUFBeEM7QUFDQSxZQUFHeUUsT0FBSCxFQUFXO0FBQ1Asb0JBQU9BLFFBQVFySixJQUFSLENBQWF3SSxXQUFwQjtBQUNJLHFCQUFLLENBQUw7QUFBUWMsaUNBQWF6TCxJQUFJaUgsV0FBSixDQUFnQjlFLElBQWhCLENBQXFCZ0UsT0FBbEMsQ0FBMkM7QUFDbkQscUJBQUssQ0FBTDtBQUFRc0YsaUNBQWEsUUFBYixDQUF1QjtBQUMvQixxQkFBSyxDQUFMO0FBQVFBLGlDQUFhLFFBQWIsQ0FBc0I7QUFIbEM7QUFLSDtBQUNELFlBQUdFLFFBQUgsRUFBWTtBQUNSRCx3QkFBWSw4QkFBNkJDLFFBQTdCLEdBQXVDLE1BQW5EO0FBQ0g7QUFDRFAsbUNBQXdCbkIsZ0JBQWdCQSxpQkFBaUJqSyxJQUFJNEUsRUFBckMsR0FBMEMsUUFBMUMsR0FBcUQsRUFBN0UsZ0NBQXlHNUUsSUFBSWdILGNBQTdHLG1CQUF5SWhILElBQUk0RSxFQUE3SSxxQkFBK0o1RSxJQUFJNkUsSUFBbkssMEJBQTJMN0UsSUFBSXNHLFFBQUosSUFBZ0J0RyxJQUFJNEUsRUFBL00sNkNBQzBCNUUsSUFBSTRFLEVBRDlCLHFCQUNnRDVFLElBQUk2RSxJQURwRCwrR0FHNEJoRyxTQUFTdUIsVUFBVCxDQUFvQkosSUFBSUMsS0FBeEIsS0FBa0MsbUJBSDlELDJJQU0wQ0QsSUFBSXNHLFFBQUosSUFBZ0J0RyxJQUFJNEUsRUFOOUQsOERBT3dDa0YsYUFBYTJCLFVBQWIsQ0FQeEMsd0NBUW9CQyxTQVJwQjtBQVVILEtBdkJEO0FBd0JBLDJCQUFXckosSUFBWCxDQUFnQitJLE1BQWhCO0FBQ0gsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEREOztBQUVBO2tCQUNlLFVBQUMxSSxRQUFELEVBQVdHLFFBQVgsRUFBd0I7QUFDbkM7QUFDQUUsTUFBRTZJLElBQUYsQ0FBTztBQUNIcEosYUFBSyxxREFERjtBQUVIcUMsY0FBTSxNQUZIO0FBR0hnSCxrQkFBVSxNQUhQO0FBSUhDLGlCQUFTLEVBQUMsZ0JBQWdCLGtCQUFqQixFQUpOO0FBS0gzSixjQUFNN0IsS0FBS0MsU0FBTCxDQUFlO0FBQ2pCLHdCQUFXbUMsUUFETTtBQUVqQix3QkFBVyxrQ0FGTTtBQUdqQiw0QkFBZTtBQUhFLFNBQWYsQ0FMSDtBQVVIM0MsaUJBQVMsaUJBQVU0SCxNQUFWLEVBQWtCO0FBQ3ZCLGdCQUFJb0UsaUJBQWlCLE9BQU9DLE9BQU8sSUFBSTdFLElBQUosR0FBV0MsT0FBWCxFQUFQLENBQTVCO0FBQ0Esb0NBQVk3RCxJQUFaO0FBQ0Esa0NBQVVDLElBQVY7QUFDQTtBQUNBM0UscUJBQVNvTixLQUFULENBQWU7QUFDWCw0QkFBWXZKLFFBREQ7QUFFWCx5QkFBU2lGLE9BQU91RSxLQUZMO0FBR1gsOEJBQWN2RSxPQUFPd0UsVUFIVjtBQUlYLDJCQUFXLENBSkE7QUFLWCw0QkFBWUo7QUFMRCxhQUFmO0FBT0gsU0F0QkU7QUF1Qkh4SCxlQUFPLGVBQVU1RCxHQUFWLEVBQWU7QUFDbEIwRCxvQkFBUUMsR0FBUixDQUFZM0QsR0FBWjtBQUNIO0FBekJFLEtBQVA7QUEyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSCxDLEVBN0RELEkiLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIvL+WKoOi9veS6i+S7tuaTjeS9nFxyXG5pbXBvcnQgJy4vanMvY29udHJvbEV2ZW50JztcclxuXHJcbi8v6I635Y+W5pyA6L+R6IGU57O75Lq6XHJcbmltcG9ydCBnZXRSZWNlbnREaWdzZXQgZnJvbSAnLi9qcy9nZXRSZWNlbnREaWdzZXQnO1xyXG5cclxuLy/muLLmn5Pljoblj7LogYrlpKnorrDlvZVcclxuaW1wb3J0IHJlbmRlckhpc3RvcnlNZXNzYWdlIGZyb20gJy4vanMvcmVuZGVySGlzdG9yeU1lc3NhZ2UnO1xyXG5cclxuaW1wb3J0IHsgJG93bl9hdmF0YXIgfSBmcm9tICcuL2pzL2pxZWxlbWVudHMnO1xyXG5cclxuLy/liJ3lp4vljJZTREvvvIzmraPlvI/njq/looNcclxuWVlJTUNoYXQuaW5pdFNESyh7XHJcbiAgICBhcHA6ICd1ZG4nLCAvL2FwcElkXHJcbiAgICBldHA6ICd5b255b3UnLCAvL2V0cElkXHJcbiAgICB3c3VybDogJ3N0ZWxsYXIueXl1YXAuY29tJywgLy93ZWJzb2NrZXQgVXJsXHJcbiAgICB3c3BvcnQ6IDUyMjcsIC8vd2Vic29ja2V0IHBvcnQgNTIyNy81MjIyLzUyMjVcclxuICAgIGhicG9ydDogNzA3NSwgLy9odHRwYmluZCAgcG9ydCA3MDc1LzcwNzBcclxuICAgIHNlcnZsZXQ6ICdodHRwczovL2ltLnl5dWFwLmNvbS8nLCAvL3Jlc3QgVXJsXHJcbiAgICBmbGFzaF9zd2ZfdXJsOiAnLi9saWIvdXBsb2FkL01veGllLnN3ZicsIC8vZmxhc2gg5LiK5LygIHN3ZuaWh+S7tuS9jee9rlxyXG4gICAgbG9nRW5hYmxlOiB0cnVlLCAvL2NsaWVudCBsb2dcclxuICAgIGNsaWVudE1hcms6ICd3ZWInLCAvL2NsaWVudCBtYXJrICd3ZWInIG9yICdwYydcclxuICAgIGFwaUtleTogXCI4NWRlNzliOWY3ZTM0YzM3YTk5YWNjYWRkYjI1Njk5MFwiXHJcbn0pO1xyXG4vL+WIneWni+WMllNES++8jOa1i+ivleeOr+Wig1xyXG4vLyBZWUlNQ2hhdC5pbml0U0RLKHtcclxuLy8gICAgIGFwcDogJ2ltX3ByZScsIC8vYXBwSWRcclxuLy8gICAgIGV0cDogJ3lvbnlvdScsIC8vZXRwSWRcclxuLy8gICAgIHdzdXJsOiAnMTcyLjIwLjE1LjYwJywgLy93ZWJzb2NrZXQgVXJsXHJcbi8vICAgICB3c3BvcnQ6IDUyMjcsIC8vd2Vic29ja2V0IHBvcnQgNTIyNy81MjIyLzUyMjVcclxuLy8gICAgIGhicG9ydDogNzA3NSwgLy9odHRwYmluZCAgcG9ydCA3MDc1LzcwNzBcclxuLy8gICAgIHNlcnZsZXQ6ICdodHRwOi8vMTcyLjIwLjE1LjYwLycsIC8vcmVzdCBVcmxcclxuLy8gICAgIGZsYXNoX3N3Zl91cmw6ICd4eHgveC9Nb3hpZS5zd2YnLCAvL2ZsYXNoIOS4iuS8oCBzd2bmlofku7bkvY3nva5cclxuLy8gICAgIGxvZ0VuYWJsZTogdHJ1ZSwgLy9jbGllbnQgbG9nXHJcbi8vICAgICBjbGllbnRNYXJrOiAnd2ViJywgLy9jbGllbnQgbWFyayAnd2ViJyBvciAncGMnXHJcbi8vICAgICBhcGlLZXk6IFwiODVkZTc5YjlmN2UzNGMzN2E5OWFjY2FkZGIyNTY5OTBcIlxyXG4vLyB9KTtcclxuXHJcbi8v5Yid5aeL5YyW5Zue6LCD5pa55rOVXHJcbllZSU1DaGF0LmluaXQoe1xyXG4gICAgb25PcGVuZWQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIOeZu+W9leaIkOWKn+iuvue9ruWcqOe6v+eKtuaAgVxyXG4gICAgICAgIFlZSU1DaGF0LnNldFByZXNlbmNlKCk7XHJcbiAgICAgICAgLy/np7vpmaTkv53lrZjnmoTpgJrorq/lr7nmlrlpZO+8jOmBv+WFjemhtemdouWIt+aWsOWQjuacgOi/keiBlOezu+S6uuiBlOezu+eKtuaAgei/mOiusOW9leedgFxyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCd0YXJnZXR1c2VyaWQnKTtcclxuICAgICAgICAvLyDojrflj5boh6rlt7Hkv6Hmga9cclxuICAgICAgICBZWUlNQ2hhdC5nZXRWQ2FyZCh7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICAgIGlmKHJlcy5waG90bykkb3duX2F2YXRhci5maW5kKCdpbWcnKS5hdHRyKCdzcmMnLFlZSU1DaGF0LmdldEZpbGVVcmwocmVzLnBob3RvKSk7XHJcbiAgICAgICAgICAgICAgICAvL+S/neWtmOiHquW3seeahOS/oeaBr1xyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2N1cnJlbnR1c2VyaW5mbycsIEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy/ojrflj5bmnIDov5HogZTns7vkurpcclxuICAgICAgICBnZXRSZWNlbnREaWdzZXQoKTtcclxuICAgIH0sXHJcbiAgICBvbkV4cGlyYXRpb246IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgLy/oh6rliqjmm7TmlrB0b2tlblxyXG4gICAgICAgIC8vIGNhbGxiYWNrKHRva2VuLCBleHBpcmF0aW9uKTtcclxuICAgIH0sXHJcbiAgICBvbkNsb3NlZDogZnVuY3Rpb24oYXJnKSB7XHJcbiAgICAgICAgLy/ov57mjqXlhbPpl61cclxuICAgIH0sXHJcbiAgICBvbkNvbmZsaWN0ZWQ6IGZ1bmN0aW9uKGFyZykge1xyXG4gICAgICAgIC8v55m76ZmG5Yay56qBXHJcbiAgICB9LFxyXG4gICAgb25DbGllbnRLaWNrb3V0OiBmdW5jdGlvbihhcmcpIHtcclxuICAgICAgICAvL+iiq+S7luerr+i4ouaOiVxyXG4gICAgfSxcclxuICAgIG9uVXBkYXRlUGFzc3dvcmQ6IGZ1bmN0aW9uKGFyZykge1xyXG4gICAgICAgIC8v5pu05pS55a+G56CB77yM6KKr6Lii5o6JXHJcbiAgICB9LFxyXG4gICAgb25BdXRoRXJyb3I6IGZ1bmN0aW9uKGFyZykge1xyXG4gICAgICAgIC8v55m76ZmG6K6k6K+B5aSx6LSlXHJcbiAgICB9LFxyXG4gICAgb25Db25uZWN0RXJyb3I6IGZ1bmN0aW9uKGFyZykge1xyXG4gICAgICAgIC8v6L+e5o6l5aSx6LSlXHJcbiAgICB9LFxyXG4gICAgb25SZWNlaXB0czogZnVuY3Rpb24oYXJnKSB7XHJcbiAgICAgICAgLy/mtojmga/lm57miadcclxuICAgIH0sXHJcbiAgICBvblN1YnNjcmliZTogZnVuY3Rpb24oYXJnKSB7XHJcbiAgICAgICAgLy/lj5HnlJ/orqLpmIVcclxuICAgIH0sXHJcbiAgICBvblJvc3RlckZhdm9yaXRlZDogZnVuY3Rpb24oYXJnKSB7XHJcbiAgICAgICAgLy/ooqvmlLbol49cclxuICAgIH0sXHJcbiAgICBvblJvc3RlclVwZGF0ZWRlZDogZnVuY3Rpb24oYXJnKSB7XHJcbiAgICAgICAgLy/lpb3lj4vkv6Hmga/mm7TmlLlcclxuICAgIH0sXHJcbiAgICBvbk1lc3NhZ2U6IGZ1bmN0aW9uKG1zZykge1xyXG4gICAgICAgIC8v5LuO5pys5Zyw5ou/5Y+W6IGK5aSp57G75Z6LXHJcbiAgICAgICAgbGV0IGNoYXR0eXBlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NoYXR0eXBlJyk7XHJcbiAgICAgICAgaWYoY2hhdHR5cGUgPT0gJ2NoYXQnKXsgICAvL+WmguaenOe7mee+pOe7hOWPkea2iOaBr+S8muWHuuWPkeatpOWbnuiwg1xyXG4gICAgICAgICAgICAvL+a4suafk+WOhuWPsuiBiuWkqeiusOW9lVxyXG4gICAgICAgICAgICByZW5kZXJIaXN0b3J5TWVzc2FnZShtc2cpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBvbkdyb3VwVXBkYXRlOiBmdW5jdGlvbihhcmcpIHtcclxuICAgICAgICAvL+e+pOe7hOabtOaWsFxyXG4gICAgfSxcclxuICAgIG9uS2lja2VkT3V0R3JvdXA6IGZ1bmN0aW9uKGFyZykge1xyXG4gICAgICAgIC8v576k5oiQ5ZGY6KKr576k5Li75o+Q5Ye6XHJcbiAgICB9LFxyXG4gICAgb25UcmFuc2Zlckdyb3VwT3duZXI6IGZ1bmN0aW9uKGFyZyl7XHJcbiAgICAgICAgLy/nvqTkuLvovazorqlcclxuICAgIH0sXHJcbiAgICBvblByZXNlbmNlOiBmdW5jdGlvbihhcmcpIHtcclxuICAgICAgICAvL+WlveWPi3ByZXNlbmNl5pS55Y+YXHJcbiAgICB9LFxyXG4gICAgb25Sb3N0ZXJEZWxldGVkOiBmdW5jdGlvbihhcmcpIHtcclxuICAgICAgICAvL+WlveWPi+iiq+WIoOmZpCBcclxuICAgIH0sXHJcbiAgICBvblB1YmFjY291bnRVcGRhdGU6IGZ1bmN0aW9uKHB1YmFjY291bnRzKSB7XHJcbiAgICAgICAgLy/lhazlhbHlj7fkv6Hmga/mm7TmlrBcclxuICAgIH0sXHJcbiAgICBvblRyYW5zcGFyZW50TWVzc2FnZTogZnVuY3Rpb24oYXJnKSB7XHJcbiAgICAgICAgLy/pgI/kvKDkuJrliqHmtojmga9cclxuICAgIH1cclxufSk7XHJcblxyXG4iLCJleHBvcnQgY29uc3QgZXhwcmVzc2lvbkxpc3QgPSB7XHJcbiAgICBwYXRoOiBcIi4vaW1ncy9icS9cIixcclxuICAgIGRhdGE6IFtcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+m+h+eJmV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2NpeWFAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WTiOWTiF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2hhaGFAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+aZlV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3l1bkAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5rGXXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25faGFuYkAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5a6z576eXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25faGFpeEAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6LCD55quXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fdGlhb3BAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+eWkemXrl1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3lpd0AyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5o2C6IS4XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fd3VsaWFuQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlpbjnrJFdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9qaWFueGlhb0AyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5py65pm6XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fc21hcnRAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+W+l+aEj11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2RleWlAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+eskWNyeV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2xhdWdoaW5nX3RlYXJzQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmtYHms6pdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9jcnlpbmdAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+Wli+aWl11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2ZlbmRvdUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5oqx5oqxXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25faHVnQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvnlJ/nl4VdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9pbGxAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WwtOWwrF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2dhbmdhQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlgbfnrJFdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl90b3V4QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvotZ5dXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl96YW5AMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+aPoeaJi11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3dvc0AyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJbT0tdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9va0AyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJbeWVha11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3llYWtAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+m8k+aOjF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2d1ekAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5ouz5aS0XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fcXVhbnRvdUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6IKM6IKJXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25famlyb3VAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+aPoeaLs11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3dvcUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5ouc5omYXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fYmFpdEAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5oSJ5b+rXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25feXVrQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvpmr7ov4ddXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9uYW5ndW9AMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+mXreWYtF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2JpenVpQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlm7BdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9rdW5AMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+eMquWktF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3BpZ0AyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb54ix5b+DXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25faGVhcnRAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+W/g+eijl1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3hpbnN1aUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb56S855uSXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fYm94QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlkLtdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9raXNzYUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb546r55Gw6IqxXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fcm9zZUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5qOS5qOS57OWXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fY2FuZHlAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+aZmuWuiV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX25pZ2h0QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvnpYjnpbddXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9wcmF5QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvnu5nliptdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9nZWlsaUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6LipXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fY2FpQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvkurLkurJdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9raXNzYkAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5ZiYXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25feHVAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+iJsl1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3NlQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlj6/mgJxdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9rZWxpYW5AMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WPkeWRhl1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2ZhZGFpQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlpKflk61dXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9jcnlhQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlm7BaenpdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl96enpAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+aAneiAg11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3Npa2FvQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvnmb3nnLxdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9iYWl5QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlgrLmhaJdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9hb21hbkAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6YW3XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fa3VAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+Wbp11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2ppb25nQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvphJnop4ZdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9iaXNAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+mlpemlv11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2ppZUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5ZCTXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25feGlhQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmiqDpvLtdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9rb3ViaUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5oOK6K62XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25famluZ3lAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WPkeaAkl1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2FuZ3J5QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmg4rmgZBdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9qaW5na0AyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5ZCQXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fdHVAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+aLnOaLnF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2J5ZUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5ZKW5ZWhXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fY29mZmVlQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvllaTphZJdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9iZWVyQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvkuIvpm6hdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9yYWluQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvpl6rnlLVdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9zaGFuZEAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5LiL6ZuqXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fc25vd0AyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6Laz55CDXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fYmFsbEAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb56+u55CDXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fYmFza2V0QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvpo57mnLpdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9wbGFuZUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6YKu5Lu2XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fbWFpbEAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6Zuo5LyeXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25feXVzYW5AMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+Wlluadr11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2ppYW5nYkAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5oCq54mpXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fZ3VhaXd1QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvoja9dXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9tZWRAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+eCuOW8uV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3poYWRAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+ibi+ezlV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2Nha2VAMngucG5nXCIgfVxyXG4gICAgXVxyXG59OyIsIi8vZG9t5YWD57SgXHJcbmltcG9ydCB7XHJcbiAgICAkeXlpbV9pb2dpbixcclxuICAgICR5eWltX2JveCxcclxuICAgICR5eWltX21haW4sXHJcbiAgICAkal9tb3ZlLFxyXG4gICAgJGpfYnFfYm94LFxyXG4gICAgJHl5aW1fZWRpdG9yLFxyXG4gICAgJGJ0bl9zZW5kLFxyXG4gICAgJGxvZ2luX3VzZXJuYW1lLFxyXG4gICAgJGxvZ2luX3Bhc3MsXHJcbiAgICAkbG9naW5fYnRuLFxyXG4gICAgJGhjb250YWN0cyxcclxuICAgICRoZ3JvdXBzLFxyXG4gICAgJGNoYXRfYm94LFxyXG4gICAgJGNoYXRzX2xpc3QsXHJcbiAgICAkcGljdmlld2VyLFxyXG4gICAgcGljdmlld2VyLFxyXG4gICAgJHBlcnNvbmluZm8sXHJcbiAgICAkb3duX2F2YXRhcixcclxuICAgICRzbWNoYXQsXHJcbiAgICAkc21mcmllbmQsXHJcbiAgICAkc21ncm91cCxcclxuICAgICRzbXB1YmNvdW50XHJcbn0gZnJvbSAnLi9qcWVsZW1lbnRzJztcclxuLy/ooajmg4XmlbDmja5cclxuaW1wb3J0IHsgZXhwcmVzc2lvbkxpc3QgfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcbi8v55So5oi355m76ZmGXHJcbmltcG9ydCB1c2VyTG9naW4gZnJvbSAnLi91c2VyTG9naW4nO1xyXG4vL+iOt+WPluacgOi/keiBlOezu+S6ulxyXG5pbXBvcnQgZ2V0UmVjZW50RGlnc2V0IGZyb20gJy4vZ2V0UmVjZW50RGlnc2V0JztcclxuLy/muLLmn5PmnIDov5HogZTns7vkurpcclxuaW1wb3J0IHJlbmRlclJlY2VudERpZ3NldCBmcm9tICcuL3JlbmRlclJlY2VudERpZ3NldCc7XHJcbi8v6I635Y+W576k57uEXHJcbmltcG9ydCBnZXRDaGF0R3JvdXBzIGZyb20gJy4vZ2V0Q2hhdEdyb3Vwcyc7XHJcbi8v5riy5p+T576k57uEXHJcbmltcG9ydCByZW5kZXJDaGF0R3JvdXBzIGZyb20gJy4vcmVuZGVyQ2hhdEdyb3Vwcyc7XHJcbi8v6I635Y+W5Y6G5Y+y6IGK5aSp6K6w5b2VXHJcbmltcG9ydCBnZXRIaXN0b3J5TWVzc2FnZSBmcm9tICcuL2dldEhpc3RvcnlNZXNzYWdlJztcclxuLy/muLLmn5Pljoblj7LogYrlpKnorrDlvZVcclxuaW1wb3J0IHJlbmRlckhpc3RvcnlNZXNzYWdlIGZyb20gJy4vcmVuZGVySGlzdG9yeU1lc3NhZ2UnO1xyXG5cclxuLy/mlL7nva7ooajmg4XliJfooahcclxuJGpfYnFfYm94Lmh0bWwoZXhwcmVzc2lvbkxpc3QuZGF0YS5tYXAoKHQpID0+IHtcclxuICAgIHJldHVybiBgPGxpIGRhdGEtY29kZT1cIiR7dC5hY3Rpb25EYXRhfVwiPjxpbWcgc3JjPVwiJHtleHByZXNzaW9uTGlzdC5wYXRoK3QudXJsfVwiIHRpdGxlPVwiJHt0LmFjdGlvbkRhdGF9XCIgYWx0PVwiXCI+PC9saT5gO1xyXG59KSk7XHJcblxyXG4vL+S4tOaXtuiHquWKqOeZu+W9leeahFxyXG5pZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudHVzZXJpbmZvJykpe1xyXG4gICAgdXNlckxvZ2luKEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnR1c2VyaW5mbycpKS51c2VybmFtZSk7XHJcbn1cclxuLy/nlKjmiLfnmbvpmYZcclxuJGxvZ2luX2J0bi5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgdXNlcm5hbWUgPSAkbG9naW5fdXNlcm5hbWUudmFsKCk7XHJcbiAgICBsZXQgcGFzc3dvcmQgPSAkbG9naW5fcGFzcy52YWwoKTtcclxuICAgIGlmKC9eW2Etel1bYS16XzAtOV0qJC8udGVzdCh1c2VybmFtZSkpe1xyXG4gICAgICAgIHVzZXJMb2dpbih1c2VybmFtZSwgcGFzc3dvcmQpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8v5pyA5aSn5YyW5oyJ6ZKu54K55Ye7XHJcbiQoJy5zY2FsZWNoYXQnKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAkeXlpbV9tYWluLmhhc0NsYXNzKCdtYXh3aW5kb3cnKSA/ICR5eWltX21haW4ucmVtb3ZlQ2xhc3MoJ21heHdpbmRvdycpIDogJHl5aW1fbWFpbi5hZGRDbGFzcygnbWF4d2luZG93Jyk7XHJcbiAgICAkeXlpbV9tYWluLmNzcyh7bGVmdDogJzAnLCB0b3A6ICcwJ30pO1xyXG59KTtcclxuXHJcbi8v5YWz6Zet56qX5Y+j5oyJ6ZKu54K55Ye7XHJcbiQoJy5jbG9zZWNoYXQnKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcclxuICAgICR5eWltX2JveC5oaWRlKCk7XHJcbiAgICAkeXlpbV9pb2dpbi5zaG93KCk7XHJcbn0pO1xyXG5cclxuLy/np7vliqjkuovku7ZcclxuJGpfbW92ZS5vbignbW91c2Vkb3duJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIGxldCBvcmlnaW5YID0gZS5jbGllbnRYO1xyXG4gICAgbGV0IG9yaWdpblkgPSBlLmNsaWVudFk7XHJcbiAgICBsZXQgYm94UG9zID0gJHl5aW1fbWFpbi5wb3NpdGlvbigpO1xyXG4gICAgJHl5aW1fYm94Lm9uKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICR5eWltX21haW4uY3NzKHtsZWZ0OiAoYm94UG9zLmxlZnQgKyBlLmNsaWVudFggLSBvcmlnaW5YKSArICdweCcsIHRvcDogKGJveFBvcy50b3AgKyBlLmNsaWVudFkgLSBvcmlnaW5ZKSArICdweCd9KTtcclxuICAgIH0pO1xyXG59KTtcclxuJHl5aW1fYm94Lm9uKCdtb3VzZXVwJywgZnVuY3Rpb24gKCkge1xyXG4gICAgJCh0aGlzKS5vZmYoJ21vdXNlbW92ZScpO1xyXG59KTtcclxuXHJcblxyXG4vL+aQnOe0ouWlveWPi1xyXG4kKCcueXlpbS1zZWFyY2gnKS5vbigna2V5ZG93bicsZnVuY3Rpb24gKGUpIHtcclxuICAgIGxldCBrZXl3b3JkID0gJCh0aGlzKS52YWwoKTtcclxuICAgIGlmKGUua2V5Q29kZSA9PT0gMTMgJiYga2V5d29yZCl7XHJcbiAgICAgICAgLy/mn6Xor6Llpb3lj4tcclxuICAgICAgICBZWUlNQ2hhdC5xdWVyeVJvc3Rlckl0ZW0oe1xyXG4gICAgICAgICAgICBrZXl3b3JkOiBrZXl3b3JkLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vL+eCueWHu+acgOi/keiBlOezu+S6ulxyXG4kaGNvbnRhY3RzLm9uKCdjbGljaycsJ2xpJyxmdW5jdGlvbiAoKSB7XHJcbiAgICAkY2hhdHNfbGlzdC5odG1sKCcnKTtcclxuICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgJCh0aGlzKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICRqX21vdmUuaHRtbCgkKHRoaXMpLmF0dHIoJ2RhdGEtbmlja25hbWUnKSk7XHJcbiAgICAvL+aKiumAieaLqeeahOiBiuWkqeWvueaWuWlk5L+d5a2Y6LW35p2lLOeUqOS6jue7meS7luWPkemAgea2iOaBr1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RhcmdldHVzZXJpZCcsICQodGhpcykuYXR0cignZGF0YS1pZCcpKTtcclxuICAgIC8v5L+d5a2Y6IGK5aSp57G75Z6LXHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY2hhdHR5cGUnLCAkKHRoaXMpLmF0dHIoJ2RhdGEtdHlwZScpKTtcclxuICAgIC8v5Yig6Zmk5L+d5a2Y55qE6IGK5aSp5Y6G5Y+yXHJcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnaGlzdG9yeWNoYXRzJyk7XHJcbiAgICAvL+iOt+WPluWOhuWPsuiBiuWkqeS/oeaBr1xyXG4gICAgZ2V0SGlzdG9yeU1lc3NhZ2UoJCh0aGlzKS5hdHRyKCdkYXRhLXNlc3Npb25WZXJzaW9uJyksICQodGhpcykuYXR0cignZGF0YS1pZCcpLCAkKHRoaXMpLmF0dHIoJ2RhdGEtdHlwZScpKTtcclxufSk7XHJcblxyXG4vL+WIoOmZpOacgOi/keiBlOezu+S6ulxyXG4kaGNvbnRhY3RzLm9uKCdjbGljaycsJy5jbG9zZScsZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc3QgY3VyaWQgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtaWQnKTtcclxuICAgIFlZSU1DaGF0LnJlbW92ZVJlY2VudERpZ2VzdCh7XHJcbiAgICAgICAgaWQ6IGN1cmlkLFxyXG4gICAgICAgIHR5cGU6ICQodGhpcykuYXR0cignZGF0YS10eXBlJyksXHJcbiAgICAgICAgc3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgICAgLy/ku47mnKzlnLDmi7/lj5bogYrlpKnlr7nmlrlpZFxyXG4gICAgICAgICAgICBsZXQgdG9pZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0YXJnZXR1c2VyaWQnKTtcclxuICAgICAgICAgICAgLy/mi7/lj5bmnKzlnLDkv53lrZjnmoTmnIDov5HogZTns7vkurrmlbDnu4RcclxuICAgICAgICAgICAgbGV0IHJlY2VudERpZ3NldCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3JlY2VudGRpZ3NldCcpIHx8IFwiW11cIik7XHJcbiAgICAgICAgICAgIHJlY2VudERpZ3NldC5mb3JFYWNoKGZ1bmN0aW9uKGRpZ2VzdCwgaSl7XHJcbiAgICAgICAgICAgICAgICBpZihkaWdlc3QuaWQgPT09IGN1cmlkKXtcclxuICAgICAgICAgICAgICAgICAgICByZWNlbnREaWdzZXQuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy/kv53lrZjkv67mlLnlkI7nmoTmnIDov5HogZTns7vkurrmlbDnu4RcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3JlY2VudGRpZ3NldCcsIEpTT04uc3RyaW5naWZ5KHJlY2VudERpZ3NldCkpO1xyXG4gICAgICAgICAgICAvL+S/neWtmOiBiuWkqeexu+Wei1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY2hhdHR5cGUnLCAnZ3JvdXBjaGF0Jyk7XHJcbiAgICAgICAgICAgIC8v5riy5p+T5pyA6L+R6IGU57O75Lq6XHJcbiAgICAgICAgICAgIHJlbmRlclJlY2VudERpZ3NldChyZWNlbnREaWdzZXQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6ZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBmYWxzZTtcclxufSk7XHJcblxyXG4vL+afpeeci+iBiuWkqea2iOaBr+WbvueJh1xyXG4kY2hhdHNfbGlzdC5vbignY2xpY2snLCAnLmNoYXRwaWMnLCBmdW5jdGlvbigpe1xyXG4gICAgbGV0IHBpY3VybCA9ICQodGhpcykuYXR0cignZGF0YS11cmwnKTtcclxuICAgICRwaWN2aWV3ZXIuaHRtbCgnPGxpPjxpbWcgZGF0YS1vcmlnaW5hbD1cIicrIHBpY3VybCArJ1wiIHNyYz1cIicrIHBpY3VybCArJ1wiIGFsdD1cIlwiPjwvbGk+JylcclxuICAgIHBpY3ZpZXdlci5zaG93KHt1cmw6IHBpY3VybH0pO1xyXG59KTtcclxuXHJcblxyXG5cclxuLy/ooajmg4XmjInpkq7ngrnlh7tcclxuJCgnLmpfbWVudV9icScpLmhvdmVyKGZ1bmN0aW9uICgpIHtcclxuICAgICQodGhpcykuYWRkQ2xhc3MoJ2hvdmVyJyk7XHJcbiAgICAkKCcuYnFfdGlwJykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbn0sZnVuY3Rpb24gKCkge1xyXG4gICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaG92ZXInKTtcclxuICAgICQoJy5icV90aXAnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG59KS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAkal9icV9ib3gudG9nZ2xlKCk7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn0pO1xyXG5cclxuLy/ooajmg4Xngrnlh7tcclxuJGpfYnFfYm94Lm9uKCdjbGljaycsICdsaScsIGZ1bmN0aW9uICgpIHtcclxuICAgICR5eWltX2VkaXRvci52YWwoJHl5aW1fZWRpdG9yLnZhbCgpICsgJCh0aGlzKS5hdHRyKCdkYXRhLWNvZGUnKSk7XHJcbiAgICBpZigkeXlpbV9lZGl0b3IudmFsKCkpe1xyXG4gICAgICAgICRidG5fc2VuZC5yZW1vdmVDbGFzcygnYWRpdC1idG4tc2VuZC1kaXNhYmxlZCcpO1xyXG4gICAgfWVsc2Uge1xyXG4gICAgICAgICRidG5fc2VuZC5hZGRDbGFzcygnYWRpdC1idG4tc2VuZC1kaXNhYmxlZCcpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59KTtcclxuXHJcbi8v5oyJ6KaB5rGC6ZqQ6JeP6KGo5oOF5qGGXHJcbiRqX2JxX2JveC5ob3ZlcihmdW5jdGlvbiAoZSkge30sZnVuY3Rpb24oKXskKHRoaXMpLmhpZGUoKX0pO1xyXG5cclxuLy/lj5HpgIHlm77niYfmjInpkq7ngrnlh7tcclxuJCgnLmpfbWVudV90cCcpLmhvdmVyKGZ1bmN0aW9uICgpIHtcclxuICAgICQodGhpcykuYWRkQ2xhc3MoJ2hvdmVyJyk7XHJcbiAgICAkKCcudHBfdGlwJykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbn0sZnVuY3Rpb24gKCkge1xyXG4gICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaG92ZXInKTtcclxuICAgICQoJy50cF90aXAnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG59KS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAkKCcjdXBsb2FkUGljJykuY2xpY2soKTtcclxufSk7XHJcblxyXG4kKCcjdXBsb2FkUGljJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XHJcbiAgICAvL+iOt+WPluWvueivneS6umlkXHJcbiAgICBsZXQgdG8gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGFyZ2V0dXNlcmlkJyk7XHJcbiAgICBZWUlNQ2hhdC5zZW5kUGljKHtcclxuICAgICAgICBmaWxlSW5wdXRJZDondXBsb2FkUGljJywgLy/mlofku7bln59pZCBcclxuICAgICAgICAvLyBkcm9wX2VsZW1lbnQ6IFtkcm9wSURdLCAvL+aLluaLveS4iuS8oOWFg+e0oGlk77yM5oiW6ICF5pWw57uEXHJcbiAgICAgICAgY2hhdEluZm86IGZ1bmN0aW9uKCl7IC8v55So5oi35Y+R6YCB5raI5oGv5pe26I635Y+W5a+56K+d5Lq65L+h5oGvXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB0bzogdG8sIC8v5a+56K+d5Lq6aWRcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdjaGF0JywgLy9jaGF0L2dyb3VwY2hhdC9wdWJhY2NvdW50XHJcbiAgICAgICAgICAgICAgICBleHRlbmQ6ICcnIC8v5omp5bGV5a2X5q61XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSxcclxuICAgICAgICBmaWxlRmlsdGVyZWQ6IGZ1bmN0aW9uKCl7fSwgLy/mlofku7booqvmt7vliqDliLDkuIrkvKDpmJ/liJdcclxuICAgICAgICBmaWxlVXBsb2FkZWQ6IGZ1bmN0aW9uKCl7fSwgLy/kuIrkvKDpmJ/liJfmn5DkuIDkuKrmlofku7bkuIrkvKDlrozmr5VcclxuICAgICAgICBiZWZvcmVVcGxvYWQ6IGZ1bmN0aW9uKCl7fSwgLy/mlofku7bkuIrkvKDkuYvliY3op6blj5FcclxuICAgICAgICBzdWNjZXNzOmZ1bmN0aW9uKG1zZyl7XHJcbiAgICAgICAgICAgIC8v5riy5p+T5Y6G5Y+y5L+h5oGvXHJcbiAgICAgICAgICAgIHJlbmRlckhpc3RvcnlNZXNzYWdlKG1zZyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHByb2dyZXNzOiBmdW5jdGlvbihwcm8pe1xyXG4gICAgICAgICAgICAvL+S4iuS8oOi/m+W6plxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwcm8pO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn0pO1xyXG5cclxuLy/mlofku7bmjInpkq7ngrnlh7tcclxuJCgnLmpfbWVudV93aicpLmhvdmVyKGZ1bmN0aW9uICgpIHtcclxuICAgICQodGhpcykuYWRkQ2xhc3MoJ2hvdmVyJyk7XHJcbiAgICAkKCcud2pfdGlwJykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbn0sZnVuY3Rpb24gKCkge1xyXG4gICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaG92ZXInKTtcclxuICAgICQoJy53al90aXAnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG59KS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAkKCcjdXBsb2FkRmlsZScpLmNsaWNrKCk7XHJcbn0pO1xyXG5cclxuJCgnI3VwbG9hZEZpbGUnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcclxuICAgIC8v6I635Y+W5a+56K+d5Lq6aWRcclxuICAgIGxldCB0byA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0YXJnZXR1c2VyaWQnKTtcclxuICAgIFlZSU1DaGF0LnNlbmRGaWxlKHtcclxuICAgICAgICBmaWxlSW5wdXRJZDondXBsb2FkRmlsZScsIC8v5paH5Lu25Z+faWQgXHJcbiAgICAgICAgLy8gZHJvcF9lbGVtZW50OiBbZHJvcElEXSwgLy/mi5bmi73kuIrkvKDlhYPntKBpZO+8jOaIluiAheaVsOe7hFxyXG4gICAgICAgIGNoYXRJbmZvOiBmdW5jdGlvbigpeyAvL+eUqOaIt+WPkemAgea2iOaBr+aXtuiOt+WPluWvueivneS6uuS/oeaBr1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdG86IHRvLCAvL+WvueivneS6umlkXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnY2hhdCcsIC8vY2hhdC9ncm91cGNoYXQvcHViYWNjb3VudFxyXG4gICAgICAgICAgICAgICAgZXh0ZW5kOiAnJyAvL+aJqeWxleWtl+autVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZmlsZUZpbHRlcmVkOiBmdW5jdGlvbigpe30sIC8v5paH5Lu26KKr5re75Yqg5Yiw5LiK5Lyg6Zif5YiXXHJcbiAgICAgICAgZmlsZVVwbG9hZGVkOiBmdW5jdGlvbigpe30sIC8v5LiK5Lyg6Zif5YiX5p+Q5LiA5Liq5paH5Lu25LiK5Lyg5a6M5q+VXHJcbiAgICAgICAgYmVmb3JlVXBsb2FkOiBmdW5jdGlvbigpe30sIC8v5paH5Lu25LiK5Lyg5LmL5YmN6Kem5Y+RXHJcbiAgICAgICAgc3VjY2VzczpmdW5jdGlvbihtc2cpe1xyXG4gICAgICAgICAgICAvL+a4suafk+WOhuWPsuS/oeaBr1xyXG4gICAgICAgICAgICByZW5kZXJIaXN0b3J5TWVzc2FnZShtc2cpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGVycil7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBwcm9ncmVzczogZnVuY3Rpb24ocHJvKXtcclxuICAgICAgICAgICAgLy/kuIrkvKDov5vluqZcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocHJvKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59KTtcclxuXHJcblxyXG4vL+aOp+WItuaYr+WQpuWPr+S7peWPkemAgVxyXG4keXlpbV9lZGl0b3Iub24oJ2lucHV0IHByb3BlcnR5Y2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgaWYoJCh0aGlzKS52YWwoKSl7XHJcbiAgICAgICAgJGJ0bl9zZW5kLnJlbW92ZUNsYXNzKCdhZGl0LWJ0bi1zZW5kLWRpc2FibGVkJyk7XHJcbiAgICB9ZWxzZSB7XHJcbiAgICAgICAgJGJ0bl9zZW5kLmFkZENsYXNzKCdhZGl0LWJ0bi1zZW5kLWRpc2FibGVkJyk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLy/lj5HpgIHmjInpkq7ngrnlh7tcclxuJGJ0bl9zZW5kLm9uKCdjbGljaycsZnVuY3Rpb24gKCkge1xyXG4gICAgaWYoJHl5aW1fZWRpdG9yLnZhbCgpKXtcclxuICAgICAgICAvL+S7juacrOWcsOaLv+WPluiBiuWkqeWvueaWuWlkXHJcbiAgICAgICAgbGV0IHRvID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RhcmdldHVzZXJpZCcpO1xyXG4gICAgICAgIC8v5LuO5pys5Zyw5ou/5Y+W6IGK5aSp57G75Z6LXHJcbiAgICAgICAgbGV0IGNoYXR0eXBlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NoYXR0eXBlJyk7XHJcbiAgICAgICAgLy/osIPnlKjlj5HpgIHmlofmnKzmtojmga/mjqXlj6NcclxuICAgICAgICBZWUlNQ2hhdC5zZW5kVGV4dE1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICB0bzogdG8sIC8v5a+56K+d5Lq6aWRcclxuICAgICAgICAgICAgdHlwZTogY2hhdHR5cGUsICAvL2NoYXQ65Y2V6IGK77yMZ3JvdXBjZ2F0Oue+pOiBiixwdWJhY2NvdW50OuWFrOS8l+WPt1xyXG4gICAgICAgICAgICBjb250ZW50OiR5eWltX2VkaXRvci52YWwoKSwgLy/mtojmga/mlofmnKxcclxuICAgICAgICAgICAgZXh0ZW5kOiAnJywgIC8v5omp5bGV5a2X5q61XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChtc2cpIHtcclxuICAgICAgICAgICAgICAgIC8v5Y+R6YCB5oiQ5Yqf5LmL5ZCO5riF56m66L6T5YWl5qGGXHJcbiAgICAgICAgICAgICAgICAkeXlpbV9lZGl0b3IudmFsKCcnKTtcclxuICAgICAgICAgICAgICAgICRidG5fc2VuZC5hZGRDbGFzcygnYWRpdC1idG4tc2VuZC1kaXNhYmxlZCcpO1xyXG4gICAgICAgICAgICAgICAgLy/muLLmn5Pljoblj7Lkv6Hmga9cclxuICAgICAgICAgICAgICAgIHJlbmRlckhpc3RvcnlNZXNzYWdlKG1zZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vL+aMieS4i2VudGVy5Lmf5Y+v5Lul5Y+R6YCBXHJcbiR5eWltX2VkaXRvci5vbigna2V5ZG93bicsZnVuY3Rpb24oZSl7XHJcbiAgICBpZihlLmtleUNvZGUgPT09IDEzICYmICR5eWltX2VkaXRvci52YWwoKSl7XHJcbiAgICAgICAgLy/ku47mnKzlnLDmi7/lj5bogYrlpKnlr7nmlrlpZFxyXG4gICAgICAgIGxldCB0byA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0YXJnZXR1c2VyaWQnKTtcclxuICAgICAgICAvL+S7juacrOWcsOaLv+WPluiBiuWkqeexu+Wei1xyXG4gICAgICAgIGxldCBjaGF0dHlwZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjaGF0dHlwZScpO1xyXG4gICAgICAgIC8v6LCD55So5Y+R6YCB5paH5pys5raI5oGv5o6l5Y+jXHJcbiAgICAgICAgWVlJTUNoYXQuc2VuZFRleHRNZXNzYWdlKHtcclxuICAgICAgICAgICAgdG86IHRvLCAvL+WvueivneS6umlkXHJcbiAgICAgICAgICAgIHR5cGU6IGNoYXR0eXBlLCAgLy9jaGF0OuWNleiBiu+8jGdyb3VwY2hhdDrnvqTogYoscHViYWNjb3VudDrlhazkvJflj7dcclxuICAgICAgICAgICAgY29udGVudDokeXlpbV9lZGl0b3IudmFsKCksIC8v5raI5oGv5paH5pysXHJcbiAgICAgICAgICAgIGJvZHk6ICcnLCAgLy/mianlsZXlrZfmrrVcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKG1zZykge1xyXG4gICAgICAgICAgICAgICAgLy/lj5HpgIHmiJDlip/kuYvlkI7muIXnqbrovpPlhaXmoYZcclxuICAgICAgICAgICAgICAgICR5eWltX2VkaXRvci52YWwoJycpO1xyXG4gICAgICAgICAgICAgICAgJGJ0bl9zZW5kLmFkZENsYXNzKCdhZGl0LWJ0bi1zZW5kLWRpc2FibGVkJyk7XHJcbiAgICAgICAgICAgICAgICAvL+a4suafk+WOhuWPsuS/oeaBr1xyXG4gICAgICAgICAgICAgICAgcmVuZGVySGlzdG9yeU1lc3NhZ2UobXNnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8v5aS05YOP54K55Ye7XHJcbiRvd25fYXZhdGFyLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcclxuICAgIGxldCB1c2VyVmNhcmQgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50dXNlcmluZm8nKSB8fCBcInt9XCIpO1xyXG4gICAgJHBlcnNvbmluZm8uaHRtbChgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzaXRlXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGRwaWNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke3VzZXJWY2FyZC5waG90bz8gWVlJTUNoYXQuZ2V0RmlsZVVybCh1c2VyVmNhcmQucGhvdG8pIDogJyd9XCIgYWx0PVwiXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwibmlja25hbWVcIj4ke3VzZXJWY2FyZC5uaWNrbmFtZSB8fCB1c2VyVmNhcmQuaWR9PC9oMz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwiaW5mb2xpc3RcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bGk+PGxhYmVsPumCrueusTwvbGFiZWw+JHt1c2VyVmNhcmQuZW1haWwgfHwgJyd9PC9saT5cclxuICAgICAgICAgICAgICAgICAgICA8bGk+PGxhYmVsPuaAp+WIqzwvbGFiZWw+JHt1c2VyVmNhcmQuZ2VuZGVyIHx8ICcnfTwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxpPjxsYWJlbD7miYvmnLo8L2xhYmVsPiR7dXNlclZjYXJkLm1vYmlsZSB8fCAnJ308L2xpPlxyXG4gICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2xvc2VfY2hhdG1za1wiPsOXPC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgIGApLnNob3coKTtcclxufSk7XHJcbi8v5YWz6Zet5Liq5Lq65L+h5oGvXHJcbiRwZXJzb25pbmZvLm9uKCdjbGljaycsJy5jbG9zZV9jaGF0bXNrJyxmdW5jdGlvbigpe1xyXG4gICAgJHBlcnNvbmluZm8uaGlkZSgpO1xyXG59KTtcclxuXHJcbi8v6I+c5Y2VLeiBiuWkqVxyXG4kc21jaGF0Lm9uKCdjbGljaycsZnVuY3Rpb24oKXtcclxuICAgIGlmKCQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZScpKXtyZXR1cm47fVxyXG4gICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAkKHRoaXMpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuICAgICRoZ3JvdXBzLmhpZGUoKTtcclxuICAgICRoY29udGFjdHMuc2hvdygpO1xyXG4gICAgLy/np7vpmaTkv53lrZjnmoTpgJrorq/lr7nmlrlpZO+8jOmBv+WFjemhtemdouWIt+aWsOWQjuacgOi/keiBlOezu+S6uuiBlOezu+eKtuaAgei/mOiusOW9leedgFxyXG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3RhcmdldHVzZXJpZCcpO1xyXG4gICAgLy/mnKzlnLDmi4nlj5bojrflj5bmnIDov5HogZTns7vkurpcclxuICAgIGxldCByZWNlbnRkaWdzZXQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncmVjZW50ZGlnc2V0JykgfHwgXCJbXVwiO1xyXG4gICAgcmVuZGVyUmVjZW50RGlnc2V0KEpTT04ucGFyc2UocmVjZW50ZGlnc2V0KSk7XHJcbn0pO1xyXG4vL+iPnOWNlS3lpb3lj4tcclxuJHNtZnJpZW5kLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcclxuICAgIGlmKCQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZScpKXtyZXR1cm47fVxyXG4gICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAkKHRoaXMpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG59KTtcclxuLy/oj5zljZUt576k57uEXHJcbiRzbWdyb3VwLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcclxuICAgIGlmKCQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZScpKXtyZXR1cm47fVxyXG4gICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAkKHRoaXMpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgLy/muIXnqbrogYrlpKnlpLTpg6jlkI3np7BcclxuICAgICRqX21vdmUuaHRtbCgnJyk7XHJcbiAgICAvL+makOiXj+acgOi/keiBlOezu+S6uuWIl+ihqFxyXG4gICAgJGhjb250YWN0cy5oaWRlKCk7XHJcbiAgICAvL+makOiXj+iBiuWkqeahhlxyXG4gICAgJGNoYXRfYm94LmhpZGUoKTtcclxuICAgIC8v5pi+56S6576k57uE5YiX6KGoXHJcbiAgICAkaGdyb3Vwcy5odG1sKCcnKTtcclxuICAgICRoZ3JvdXBzLnNob3coKTtcclxuXHJcbiAgICBsZXQgcm9vbUl0ZW1zID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Jvb21JdGVtcycpO1xyXG4gICAgaWYocm9vbUl0ZW1zKXtcclxuICAgICAgICAvL+S9v+eUqOacrOWcsOS/neWtmOeahOe+pOe7hOa4suafk1xyXG4gICAgICAgIHJlbmRlckNoYXRHcm91cHMoSlNPTi5wYXJzZShyb29tSXRlbXMpKTtcclxuICAgIH1lbHNlIHtcclxuICAgICAgICAvL+mHjeaWsOiOt+WPlue+pOe7hFxyXG4gICAgICAgIGdldENoYXRHcm91cHMoKTtcclxuICAgIH1cclxufSk7XHJcbi8v6I+c5Y2VLeWFrOS8l+WPt1xyXG4kc21wdWJjb3VudC5vbignY2xpY2snLGZ1bmN0aW9uKCl7XHJcbiAgICBpZigkKHRoaXMpLmhhc0NsYXNzKCdhY3RpdmUnKSl7cmV0dXJuO31cclxuXHJcbiAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICQodGhpcykuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbn0pO1xyXG5cclxuJGhncm91cHMub24oJ2NsaWNrJywgJ2xpJywgZnVuY3Rpb24oKXtcclxuICAgICRzbWNoYXQuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgJHNtY2hhdC5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICRoZ3JvdXBzLmhpZGUoKTtcclxuICAgICRoY29udGFjdHMuaHRtbCgnJyk7XHJcbiAgICAkaGNvbnRhY3RzLnNob3coKTtcclxuXHJcbiAgICAvL+S/ruaUueW9k+WJjeiBlOezu+S6umlkXHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndGFyZ2V0dXNlcmlkJywgJCh0aGlzKS5hdHRyKCdkYXRhLWlkJykpO1xyXG5cclxuICAgIGxldCB0aGF0ID0gJCh0aGlzKTtcclxuICAgIC8v5ou/5Y+W5pys5Zyw5L+d5a2Y55qE5pyA6L+R6IGU57O75Lq65pWw57uEXHJcbiAgICBsZXQgcmVjZW50RGlnc2V0ID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncmVjZW50ZGlnc2V0JykgfHwgXCJbXVwiKTtcclxuICAgIGxldCBpc2RpZ3NldCA9IGZhbHNlOyAvL+WIpOaWreivpeWFrOS8l+WPt+WcqOS4jeWcqOaIkeeahOacgOi/keiBlOezu+S6uumHjFxyXG4gICAgcmVjZW50RGlnc2V0LmZvckVhY2goZnVuY3Rpb24oZGlnZXN0LCBpKXtcclxuICAgICAgICBpZihkaWdlc3QuaWQgPT09IHRoYXQuYXR0cignZGF0YS1pZCcpKXtcclxuICAgICAgICAgICAgaXNkaWdzZXQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgLy/kuI3lnKjmnIDov5HogZTns7vkurrkuK3vvIzliLfmlrDmnIDov5HogZTns7vkurrliJfooahcclxuICAgIGlmKCFpc2RpZ3NldCl7XHJcbiAgICAgICAgcmVjZW50RGlnc2V0LnB1c2goe1xyXG4gICAgICAgICAgICBpZDogdGhhdC5hdHRyKCdkYXRhLWlkJyksXHJcbiAgICAgICAgICAgIHJlYWRlZFZlcnNpb246IDEwMDAwLFxyXG4gICAgICAgICAgICBzZXNzaW9uVmVyc2lvbjogMTAwMDAsXHJcbiAgICAgICAgICAgIHR5cGU6ICdncm91cGNoYXQnLFxyXG4gICAgICAgICAgICBwaG90bzogdGhhdC5hdHRyKCdkYXRhLXBob3RvJyksXHJcbiAgICAgICAgICAgIG5pY2tuYW1lOiAgdGhhdC5hdHRyKCdkYXRhLW5hbWUnKSxcclxuICAgICAgICAgICAgbGFzdE1lc3NhZ2U6IG51bGwsXHJcbiAgICAgICAgICAgIGxhc3RDb250YWN0VGltZTogbmV3IERhdGUoKS5nZXRUaW1lKClcclxuICAgICAgICB9KTtcclxuICAgICAgICAvL+S/neWtmOS/ruaUueWQjueahOacgOi/keiBlOezu+S6uuaVsOe7hFxyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyZWNlbnRkaWdzZXQnLCBKU09OLnN0cmluZ2lmeShyZWNlbnREaWdzZXQpKTtcclxuICAgICAgICAvL+S/neWtmOiBiuWkqeexu+Wei1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjaGF0dHlwZScsICdncm91cGNoYXQnKTtcclxuICAgIH1cclxuICAgIC8v5riy5p+T5pyA6L+R6IGU57O75Lq6XHJcbiAgICByZW5kZXJSZWNlbnREaWdzZXQocmVjZW50RGlnc2V0KTtcclxuICAgIC8v5o2i5Liq6IGK5aSp55qE5aS06YOo5ZCN56ewXHJcbiAgICAkal9tb3ZlLmh0bWwoJCh0aGlzKS5hdHRyKCdkYXRhLW5hbWUnKSk7XHJcbiAgICAvL+WIoOmZpOS/neWtmOeahOiBiuWkqeWOhuWPslxyXG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2hpc3RvcnljaGF0cycpO1xyXG4gICAgLy/ojrflj5bljoblj7LogYrlpKnkv6Hmga9cclxuICAgIGdldEhpc3RvcnlNZXNzYWdlKDEwMDAwLCAkKHRoaXMpLmF0dHIoJ2RhdGEtaWQnKSwgJ2dyb3VwY2hhdCcpO1xyXG59KTtcclxuIiwiaW1wb3J0IHJlbmRlckNoYXRHcm91cHMgZnJvbSAnLi9yZW5kZXJDaGF0R3JvdXBzJztcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XHJcblxyXG4gICAgLy/ojrflj5bnvqTnu4TliJfooahcclxuICAgIFlZSU1DaGF0LmdldENoYXRHcm91cHMoe1xyXG4gICAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgICAgIC8v5L+d5a2Y576k5YiX6KGo5pWw57uEXHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyb29tSXRlbXMnLCBKU09OLnN0cmluZ2lmeShkYXRhLnJvb21JdGVtcykpO1xyXG4gICAgICAgICAgICByZW5kZXJDaGF0R3JvdXBzKGRhdGEucm9vbUl0ZW1zKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yOmZ1bmN0aW9uKGVycil7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0iLCIvL2RvbeWFg+e0oFxyXG5pbXBvcnQge1xyXG4gICAgJGNoYXRfYm94LFxyXG4gICAgJGNoYXRzX2xpc3RcclxufSBmcm9tICcuL2pxZWxlbWVudHMnO1xyXG5cclxuLy/muLLmn5PogYrlpKnorrDlvZVcclxuaW1wb3J0IHJlbmRlckhpc3RvcnlNZXNzYWdlIGZyb20gJy4vcmVuZGVySGlzdG9yeU1lc3NhZ2UnO1xyXG5cclxuLy/ojrflj5bogYrlpKnljoblj7Is5Lyg5YWlc2Vzc2lvblZlcnNpb24s5a+55pa5aWTlkox0eXBl5Y+C5pWwXHJcbmV4cG9ydCBkZWZhdWx0IChzZXNzaW9uVmVyc2lvbiwgaWQsIHR5cGUpID0+IHtcclxuICAgIGxldCBzdGFydCA9IHNlc3Npb25WZXJzaW9uID4gMjAgPyBzZXNzaW9uVmVyc2lvbiAtIDIwIDogMDtcclxuICAgIC8v6I635Y+W5Y6G5Y+y6IGK5aSp5L+h5oGvXHJcbiAgICBZWUlNQ2hhdC5nZXRIaXN0b3J5TWVzc2FnZSh7XHJcbiAgICAgICAgaWQ6IGlkLFxyXG4gICAgICAgIHR5cGU6IHR5cGUsXHJcbiAgICAgICAgc3RhcnRWZXJzaW9uOiBzdGFydCxcclxuICAgICAgICBlbmRWZXJzaW9uOiBzZXNzaW9uVmVyc2lvbixcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgIGxldCBoaXN0b3J5Y2hhdHMgPSByZXMucmVzdWx0IHx8IFtdO1xyXG4gICAgICAgICAgICAkY2hhdF9ib3guc2hvdygpO1xyXG4gICAgICAgICAgICBoaXN0b3J5Y2hhdHMucmV2ZXJzZSgpO1xyXG4gICAgICAgICAgICAvL+aKiuiBiuWkqeiusOW9lee8k+WtmOWIsOacrOWcsFxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaGlzdG9yeWNoYXRzJywgSlNPTi5zdHJpbmdpZnkoaGlzdG9yeWNoYXRzKSk7XHJcbiAgICAgICAgICAgIC8v5riy5p+T6IGK5aSp5L+h5oGvXHJcbiAgICAgICAgICAgIHJlbmRlckhpc3RvcnlNZXNzYWdlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07IiwiXHJcbi8v5a+85YWl5pyA6L+R6IGU57O75Lq65riy5p+T5Ye95pWwXHJcbmltcG9ydCByZW5kZXJSZWNlbnREaWdzZXQgZnJvbSAnLi9yZW5kZXJSZWNlbnREaWdzZXQnO1xyXG5cclxuLy/ojrflj5bmnIDov5HogZTns7vkurpcclxuZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xyXG4gICAgLy8g6I635Y+W5pyA6L+R6IGU57O75Lq6QVBJXHJcbiAgICBZWUlNQ2hhdC5nZXRSZWNlbnREaWdzZXQoe1xyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5saXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlY2VudERpZ3NldCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0Lmxpc3QuZm9yRWFjaChmdW5jdGlvbihlLCBpKXtcclxuICAgICAgICAgICAgICAgICAgICAvL+ebruWJjea1i+ivleWPquaYvuekuuS4quS6uuiBiuWkqe+8jOS4jeaYvuekuue+pOaIluWFtuS7liBcclxuICAgICAgICAgICAgICAgICAgICBpZihlLnR5cGUgIT09ICdjaGF0JyAmJiBlLnR5cGUgIT09ICdncm91cGNoYXQnKXtyZXR1cm47fVxyXG4gICAgICAgICAgICAgICAgICAgIC8v6YCa6L+HaWTojrflj5bkuKrkurrkv6Hmga9cclxuICAgICAgICAgICAgICAgICAgICBZWUlNQ2hhdC5nZXRWQ2FyZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBlLmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/mlbTnkIbmnIDov5HogZTns7vkurrliJfooajliLDkuIDkuKrmlrDmlbDnu4RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY2VudERpZ3NldC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogcmVzLmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRlZFZlcnNpb246IGUucmVhZGVkVmVyc2lvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXNzaW9uVmVyc2lvbjogZS5zZXNzaW9uVmVyc2lvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBlLnR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGhvdG86IHJlcy5waG90byB8fCAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuaWNrbmFtZTogcmVzLm5pY2tuYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RNZXNzYWdlOiBlLmxhc3RNZXNzYWdlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RDb250YWN0VGltZTogZS5sYXN0Q29udGFjdFRpbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/miormnIDov5HogZTns7vkurrliJfooajkv53lrZjliLDmnKzlnLBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyZWNlbnRkaWdzZXQnLCBKU09OLnN0cmluZ2lmeShyZWNlbnREaWdzZXQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlclJlY2VudERpZ3NldChyZWNlbnREaWdzZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6ZnVuY3Rpb24gKGVycil7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0iLCJcclxuZXhwb3J0IGNvbnN0ICR5eWltX2lvZ2luID0gJCgnLnl5aW0taW9naW4nKTsvL+eZu+mZhuahhlxyXG5leHBvcnQgY29uc3QgJGxvZ2luX3VzZXJuYW1lID0gJCgnLmxvZ2luLXVzZXJuYW1lJyk7Ly/nmbvpmYbnlKjmiLflkI1cclxuZXhwb3J0IGNvbnN0ICRsb2dpbl9wYXNzID0gJCgnLmxvZ2luLXBhc3MnKTsvL+eZu+mZhueUqOaIt+WvhueggVxyXG5leHBvcnQgY29uc3QgJGxvZ2luX2J0biA9ICQoJy5sb2dpbi1idG4nKTsvL+eZu+mZhuaMiemSrlxyXG5leHBvcnQgY29uc3QgJHl5aW1fYm94ID0gJCgnLnl5aW0tYm94Jyk7Ly/ogYrlpKnmoYbnmoTpga7nvalcclxuZXhwb3J0IGNvbnN0ICR5eWltX21haW4gPSAkKCcueXlpbS1tYWluJyk7Ly/ogYrlpKnmnIDlpJblsYLnqpflj6NcclxuZXhwb3J0IGNvbnN0ICRqX21vdmUgPSAkKCcual9tb3ZlJyk7Ly/ogYrlpKnnqpflj6PlpLRcclxuZXhwb3J0IGNvbnN0ICRoY29udGFjdHMgPSAkKCcuaGNvbnRhY3RzJyk7Ly/mnIDov5HogZTns7vkurrmoYZcclxuZXhwb3J0IGNvbnN0ICRoZ3JvdXBzID0gJCgnLmhncm91cHMnKTsvL+aIkeeahOe+pOe7hOahhlxyXG5leHBvcnQgY29uc3QgJGNoYXRzID0gJCgnLmNoYXRzJyk7Ly/ogYrlpKnkv6Hmga/mu5HliqjlrrnlmahcclxuZXhwb3J0IGNvbnN0ICRqX2JxX2JveCA9ICQoJy5qX2JxX2JveCcpOy8v6KGo5oOF55uS5a2QXHJcbmV4cG9ydCBjb25zdCAkeXlpbV9lZGl0b3IgPSAkKCcueXlpbS1lZGl0b3InKTsvL+iBiuWkqei+k+WFpeahhlxyXG5leHBvcnQgY29uc3QgJGJ0bl9zZW5kID0gJCgnLmFkaXQtYnRuLXNlbmQnKTsgLy/lj5HpgIHmjInpkq5cclxuZXhwb3J0IGNvbnN0ICRjaGF0X2JveCA9ICQoJy5jaGF0LWJveCcpOyAvL+aOp+WItuaYr+WQpuWFt+acieiBiuWkqeWGheWuuVxyXG5leHBvcnQgY29uc3QgJGNoYXRzX2xpc3QgPSAkKCcuY2hhdHMtbGlzdCcpOyAvL+iBiuWkqeS/oeaBr+WIl+ihqFxyXG5leHBvcnQgY29uc3QgJHBpY3ZpZXdlciA9ICQoJyNwaWN2aWV3ZXInKTsgLy/lm77niYfmn6XnnIvmoYZcclxuXHJcbmV4cG9ydCBjb25zdCAkb3duX2F2YXRhciA9ICQoJy5vd25fYXZhdGFyJyk7IC8v5Liq5Lq65aS05YOP5qGGXHJcbmV4cG9ydCBjb25zdCAkcGVyc29uaW5mbyA9ICQoJy5wZXJzb25pbmZvJyk7IC8v5Liq5Lq65L+h5oGv5qGGXHJcblxyXG5leHBvcnQgY29uc3QgJHNtY2hhdCA9ICQoJy5zbWNoYXQnKTsgLy/oj5zljZUt6IGK5aSpXHJcbmV4cG9ydCBjb25zdCAkc21mcmllbmQgPSAkKCcuc21mcmllbmQnKTsgLy/oj5zljZUt5aW95Y+LXHJcbmV4cG9ydCBjb25zdCAkc21ncm91cCA9ICQoJy5zbWdyb3VwJyk7IC8v6I+c5Y2VLee+pOe7hFxyXG5leHBvcnQgY29uc3QgJHNtcHViY291bnQgPSAkKCcuc21wdWJjb3VudCcpOyAvL+iPnOWNlS3lhazkvJflj7dcclxuXHJcbi8v5a6e5L6L5YyWdmlld2VyXHJcbmV4cG9ydCBjb25zdCBwaWN2aWV3ZXIgPSBuZXcgVmlld2VyKCRwaWN2aWV3ZXJbMF0sIHtuYXZiYXI6ZmFsc2UsIHRpdGxlOiBmYWxzZX0pO1xyXG4vLyB2aWV3ZXIuc2hvdyh7XHJcbi8vICAgICB1cmw6ICdodHRwczovL3d3dy5iYWlkdS5jb20vaW1nL2JkX2xvZ28xLnBuZydcclxuLy8gfSlcclxuLy8gJHBpY3ZpZXdlci52aWV3ZXIoe1xyXG4vLyAgICAgdXJsOiAnaHR0cHM6Ly93d3cuYmFpZHUuY29tL2ltZy9iZF9sb2dvMS5wbmcnLCAvL+iuvue9ruWkp+WbvueJh+eahCB1cmxcclxuLy8gICAgIG5hdmJhcjp0cnVlLCAvL+aYr+WQpuaYvuekuue8qeeVpeWbvuWvvOiIqlxyXG4vLyAgICAgdG9vbGJhcjp0cnVlLCAvL+aYvuekuuW3peWFt+agj1xyXG4vLyAgICAgdGl0bGU6dHJ1ZSwgLy/mmL7npLrlvZPliY3lm77niYfmoIfpopgoYWx05bGe5oCn5ZKM5bC65a+4KVxyXG4vLyAgICAgdG9vbHRpcDp0cnVlLCAvL+aYvuekuue8qeaUvueZvuWIhuavlFxyXG4vLyAgICAgbW92YWJsZTp0cnVlLCAvL+WbvueJh+aYr+WQpuWPr+enu+WKqFxyXG4vLyAgICAgem9vbWFibGU6dHJ1ZSwgLy/lm77niYfmmK/lkKblj6/nvKnmlL5cclxuLy8gICAgIHJvdGF0YWJsZTp0cnVlLCAvL+WbvueJh+aYr+WQpuWPr+aXi+i9rFxyXG4vLyAgICAgc2NhbGFibGU6dHJ1ZSwgLy/lm77niYfmmK/lkKblj6/nv7vovaxcclxuLy8gICAgIHRyYW5zaXRpb246dHJ1ZSwgLy/kvb/nlKggQ1NTMyDov4fluqZcclxuLy8gICAgIGZ1bGxzY3JlZW46dHJ1ZSwgLy/mkq3mlL7ml7bmmK/lkKblhajlsY9cclxuLy8gICAgIGtleWJvYXJkOnRydWUsIC8v5piv5ZCm5pSv5oyB6ZSu55uYXHJcbi8vICAgICBpbnRlcnZhbDo1MDAwLCAvL+aSreaUvumXtOmalO+8jOWNleS9jeS4uuavq+enklxyXG4vLyAgICAgem9vbVJhdGlvOjAuMSwgLy/pvKDmoIfmu5rliqjml7bnmoTnvKnmlL7mr5TkvotcclxuLy8gICAgIG1pblpvb21SYXRpbzowLjAxLCAvL+acgOWwj+e8qeaUvuavlOS+i1xyXG4vLyAgICAgbWF4Wm9vbVJhdGlvOjEwMCwgLy/mnIDlpKfnvKnmlL7mr5TkvotcclxuLy8gICAgIHpJbmRleDoyMDE1LCAvL+iuvue9ruWbvueJh+afpeeci+WZqCBtb2RhbCDmqKHlvI/ml7bnmoQgei1pbmRleFxyXG4vLyAgICAgekluZGV4SW5saW5lOjAsIC8v6K6+572u5Zu+54mH5p+l55yL5ZmoIGlubGluZSDmqKHlvI/ml7bnmoQgei1pbmRleFxyXG4vLyB9KS5zaG93KCk7IiwiXHJcbi8vZG9t5YWD57SgXHJcbmltcG9ydCB7XHJcbiAgICAkaGdyb3Vwc1xyXG59IGZyb20gJy4vanFlbGVtZW50cyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCAoZ3JvdXBzKSA9PiB7XHJcbiAgICBsZXQgZ3JvdXBTdHIgPSAnJztcclxuICAgIGdyb3Vwcy5mb3JFYWNoKGZ1bmN0aW9uKGdyb3VwKXtcclxuICAgICAgICBncm91cFN0ciArPSBgPGxpIGRhdGEtaWQ9XCIke2dyb3VwLmlkfVwiIGRhdGEtbmFtZT1cIiR7Z3JvdXAubmFtZX1cIiBkYXRhLXBob3RvPVwiJHtncm91cC5waG90byB8fCAnJ31cIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXZhdGFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtZWUlNQ2hhdC5nZXRGaWxlVXJsKGdyb3VwLnBob3RvKSB8fCAnLi9pbWdzL2F2YXRhci5qcGcnfVwiIGFsdD1cIlwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWwgZGluZ3l1ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJuYW1lIGN1dHR4dFwiPiR7Z3JvdXAubmFtZSB8fCAn576k57uEJ308L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9saT5gO1xyXG4gICAgfSk7XHJcbiAgICAkaGdyb3Vwcy5odG1sKGdyb3VwU3RyKTtcclxufSIsIlxyXG4vL2RvbeWFg+e0oFxyXG5pbXBvcnQge1xyXG4gICAgJGNoYXRzLFxyXG4gICAgJGNoYXRzX2xpc3RcclxufSBmcm9tICcuL2pxZWxlbWVudHMnO1xyXG5cclxuLy/ojrflj5bmnIDov5HogZTns7vkurrlh73mlbBcclxuaW1wb3J0IGdldFJlY2VudERpZ3NldCBmcm9tICcuL2dldFJlY2VudERpZ3NldCc7XHJcblxyXG4vL+a4suafk+acgOi/keiBlOezu+S6uuWHveaVsFxyXG5pbXBvcnQgcmVuZGVyUmVjZW50RGlnc2V0IGZyb20gJy4vcmVuZGVyUmVjZW50RGlnc2V0JztcclxuXHJcbi8v6KGo5oOF5pWw5o2uXHJcbmltcG9ydCB7IGV4cHJlc3Npb25MaXN0IH0gZnJvbSAnLi9jb25zdGFudHMnO1xyXG5cclxuLy/nlKjlm77niYfmm7/mjaLmlofmnKzmtojmga/kuK3ooajmg4Xkv6Hmga9cclxuY29uc3QgcmVwbGFjZUVtb2ppID0gKHN0cikgPT4ge1xyXG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXFtbXlxcW1xcXV0rXFxdL2csKGUpID0+IHtcclxuICAgICAgICBmb3IgKGxldCBpPTA7aTxleHByZXNzaW9uTGlzdC5kYXRhLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICBpZihleHByZXNzaW9uTGlzdC5kYXRhW2ldLmFjdGlvbkRhdGEgPT09IGUpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGA8aW1nIGNsYXNzPVwiZW1vamlcIiBzcmM9XCIke2V4cHJlc3Npb25MaXN0LnBhdGggKyBleHByZXNzaW9uTGlzdC5kYXRhW2ldLnVybH1cIiBhbHQ9XCJcIiAvPmA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuLy/muLLmn5PogYrlpKnorrDlvZUs5aaC5p6c6ZyA6KaB5paw5Yqg5YWl5LiA5p2h6IGK5aSp5L+h5oGv77yM5Lyg5YWl5LiA5p2h6IGK5aSp6K6w5b2V5a+56LGh5Y2z5Y+v44CCXHJcbmV4cG9ydCBkZWZhdWx0IChtc2cpID0+IHtcclxuICAgIC8v5ou/5Y+W5pys5Zyw5L+d5a2Y55qE5Y6G5Y+y6IGK5aSp5L+h5oGvXHJcbiAgICBsZXQgaGlzdG9yeWNoYXRzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaGlzdG9yeWNoYXRzJykgfHwgXCJbXVwiKTtcclxuICAgIC8v5ou/5Y+W5pys5Zyw5L+d5a2Y55qE5pyA6L+R6IGU57O75Lq65pWw57uEXHJcbiAgICBsZXQgcmVjZW50RGlnc2V0ID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncmVjZW50ZGlnc2V0JykgfHwgXCJbXVwiKTtcclxuICAgIC8v5LuO5pys5Zyw5ou/5Y+W6IGK5aSp5a+55pa5aWRcclxuICAgIGxldCB0YXJnZXR1c2VyaWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGFyZ2V0dXNlcmlkJyk7XHJcbiAgICAvL+aLv+aIkeiHquW3seeahGlkXHJcbiAgICBsZXQgbXlpZCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnR1c2VyaW5mbycpKS5pZDtcclxuICAgIC8v5ou/5b2T5YmN55qE6IGK5aSp57G75Z6LXHJcbiAgICBsZXQgY2hhdHR5cGUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2hhdHR5cGUnKTtcclxuXHJcbiAgICAvL+a2iOaBr+adpea6kGlkXHJcbiAgICBsZXQgbXNnZnJvbWlkID0gJyc7XHJcblxyXG4gICAgLy/lpoLmnpxtc2flrZjlnKjvvIzor7TmmI7miJHmraPlnKjlj5HpgIHmtojmga/miJbogIXmiJHmjqXmlLbliLDkuobliKvkurrnmoTmtojmga9cclxuICAgIGlmKG1zZyl7XHJcbiAgICAgICAgbXNnZnJvbWlkID0gY2hhdHR5cGUgPT09ICdjaGF0JyA/IG1zZy5mcm9tIDogbXNnLmZyb20ucm9zdGVyO1xyXG4gICAgICAgIGxldCBpc2Zyb21tZSA9IG15aWQgPT09IG1zZ2Zyb21pZDtcclxuICAgICAgICBpZihpc2Zyb21tZSl7IC8v5raI5oGv5piv5oiR5Y+R57uZ5Yir5Lq655qEXHJcbiAgICAgICAgICAgIHJlY2VudERpZ3NldC5mb3JFYWNoKGZ1bmN0aW9uKGRpZ2VzdCwgaSl7XHJcbiAgICAgICAgICAgICAgICBpZihkaWdlc3QuaWQgPT09IHRhcmdldHVzZXJpZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVjZW50RGlnc2V0W2ldLmxhc3RDb250YWN0VGltZSA9IG1zZy5kYXRhLmRhdGVsaW5lO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlY2VudERpZ3NldFtpXS5sYXN0TWVzc2FnZSA9IG1zZztcclxuICAgICAgICAgICAgICAgICAgICByZWNlbnREaWdzZXRbaV0uc2Vzc2lvblZlcnNpb24rKztcclxuICAgICAgICAgICAgICAgICAgICByZWNlbnREaWdzZXRbaV0ucmVhZGVkVmVyc2lvbisrO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5L+d5a2Y5L+u5pS55ZCO55qE5pyA6L+R6IGU57O75Lq65pWw57uEXHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3JlY2VudGRpZ3NldCcsIEpTT04uc3RyaW5naWZ5KHJlY2VudERpZ3NldCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5riy5p+T5pyA6L+R6IGU57O75Lq6XHJcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyUmVjZW50RGlnc2V0KHJlY2VudERpZ3NldCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvL+S/ruaUueWOhuWPsua2iOaBr1xyXG4gICAgICAgICAgICBoaXN0b3J5Y2hhdHMucHVzaChtc2cpO1xyXG4gICAgICAgICAgICAvL+S/ruaUueWQjuS/neWtmFxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaGlzdG9yeWNoYXRzJyxKU09OLnN0cmluZ2lmeShoaXN0b3J5Y2hhdHMpKTtcclxuICAgICAgICB9IGVsc2UgeyAvL+a2iOaBr+adpeiHquS6juS7luS6uue7meaIkeWPkeeahFxyXG4gICAgICAgICAgICBsZXQgaXNkaWdzZXQgPSBmYWxzZTsgLy/liKTmlq3lr7nmlrnlnKjkuI3lnKjmiJHnmoTmnIDov5HogZTns7vkurrph4xcclxuICAgICAgICAgICAgcmVjZW50RGlnc2V0LmZvckVhY2goZnVuY3Rpb24oZGlnZXN0LCBpKXtcclxuICAgICAgICAgICAgICAgIGlmKGRpZ2VzdC5pZCA9PT0gbXNnZnJvbWlkKXtcclxuICAgICAgICAgICAgICAgICAgICBpc2RpZ3NldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVjZW50RGlnc2V0W2ldLmxhc3RDb250YWN0VGltZSA9IG1zZy5kYXRhLmRhdGVsaW5lO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlY2VudERpZ3NldFtpXS5sYXN0TWVzc2FnZSA9IG1zZztcclxuICAgICAgICAgICAgICAgICAgICByZWNlbnREaWdzZXRbaV0uc2Vzc2lvblZlcnNpb24rKztcclxuICAgICAgICAgICAgICAgICAgICByZWNlbnREaWdzZXRbaV0ucmVhZGVkVmVyc2lvbisrO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5L+d5a2Y5L+u5pS55ZCO55qE5pyA6L+R6IGU57O75Lq65pWw57uEXHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3JlY2VudGRpZ3NldCcsIEpTT04uc3RyaW5naWZ5KHJlY2VudERpZ3NldCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5riy5p+T5pyA6L+R6IGU57O75Lq6XHJcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyUmVjZW50RGlnc2V0KHJlY2VudERpZ3NldCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvL+S4jeWcqOacgOi/keiBlOezu+S6uuS4re+8jOWIt+aWsOacgOi/keiBlOezu+S6uuWIl+ihqFxyXG4gICAgICAgICAgICBpZighaXNkaWdzZXQpe2dldFJlY2VudERpZ3NldCgpO31cclxuICAgICAgICAgICAgLy/miJHmraPlnKjlkozku5bogYrlpKlcclxuICAgICAgICAgICAgaWYobXNnZnJvbWlkID09PSB0YXJnZXR1c2VyaWQpe1xyXG4gICAgICAgICAgICAgICAgLy/kv67mlLnljoblj7Lmtojmga9cclxuICAgICAgICAgICAgICAgIGhpc3RvcnljaGF0cy5wdXNoKG1zZyk7XHJcbiAgICAgICAgICAgICAgICAvL+S/ruaUueWQjuS/neWtmFxyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2hpc3RvcnljaGF0cycsSlNPTi5zdHJpbmdpZnkoaGlzdG9yeWNoYXRzKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WmguaenOaIkeayoeWSjOWvueaWueiBiuWkqe+8jOWImeS4jea4suafk+WOhuWPsuS/oeaBr1xyXG4gICAgaWYobXNnICYmIG1zZ2Zyb21pZCAhPT0gbXlpZCAmJiBtc2dmcm9taWQgIT09IHRhcmdldHVzZXJpZCkgcmV0dXJuO1xyXG5cclxuICAgIGxldCBjaGF0c1N0ciA9ICcnO1xyXG4gICAgaGlzdG9yeWNoYXRzLmZvckVhY2goZnVuY3Rpb24oY2hhdCwgaSl7XHJcbiAgICAgICAgbGV0IGlzZnJvbW1lID0gY2hhdHR5cGUgPT09ICdjaGF0JyA/IG15aWQgPT09IGNoYXQuZnJvbSA6IG15aWQgPT09IGNoYXQuZnJvbS5yb3N0ZXI7XHJcbiAgICAgICAgbGV0IGNoYXRmcm9tID0gY2hhdHR5cGUgPT09ICdjaGF0JyA/ICcnIDogYDxkaXYgY2xhc3M9XCJjaGF0LXVzZXItbmFtZVwiPiR7Y2hhdC5mcm9tLnJvc3Rlcn08L2Rpdj5gO1xyXG4gICAgICAgIC8v5paH5pys5raI5oGvXHJcbiAgICAgICAgaWYoY2hhdC5kYXRhLmNvbnRlbnRUeXBlID09PSAyKXtcclxuICAgICAgICAgICAgY2hhdHNTdHIgKz0gYDxsaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGF0LXRpcFwiPiR7bmV3IERhdGUoY2hhdC5kYXRhLmRhdGVsaW5lKS50b0xvY2FsZVRpbWVTdHJpbmcoKX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGF0LWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHsgaXNmcm9tbWU/ICdjaGF0LWF2YXRhciBjaGF0LWF2YXRhci1zZW5kJyA6J2NoYXQtYXZhdGFyJ31cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2ltZ3MvYXZhdGFyLmpwZ1wiIGFsdD1cIlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCIkeyBpc2Zyb21tZT8gJ2NoYXQtdHh0IGNoYXQtdHh0LXNlbmQnIDonY2hhdC10eHQnfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2NoYXRmcm9tfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hhdC1tc2dcIj4ke3JlcGxhY2VFbW9qaShjaGF0LmRhdGEuY29udGVudCl9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT4gYDtcclxuICAgICAgICB9ZWxzZSBpZihjaGF0LmRhdGEuY29udGVudFR5cGUgPT09IDgpeyAgLy/lm77niYfmtojmga9cclxuICAgICAgICAgICAgbGV0IHBpY3VybCA9IFlZSU1DaGF0LmdldEZpbGVVcmwoY2hhdC5kYXRhLmNvbnRlbnQuYXR0YWNoSWQpO1xyXG4gICAgICAgICAgICBjaGF0c1N0ciArPSBgPGxpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoYXQtdGlwXCI+JHtuZXcgRGF0ZShjaGF0LmRhdGEuZGF0ZWxpbmUpLnRvTG9jYWxlVGltZVN0cmluZygpfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoYXQtY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCIkeyBpc2Zyb21tZT8gJ2NoYXQtYXZhdGFyIGNoYXQtYXZhdGFyLXNlbmQnIDonY2hhdC1hdmF0YXInfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vaW1ncy9hdmF0YXIuanBnXCIgYWx0PVwiXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiR7IGlzZnJvbW1lPyAnY2hhdC10eHQgY2hhdC10eHQtc2VuZCcgOidjaGF0LXR4dCd9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7Y2hhdGZyb219XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGF0LW1zZ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cImNoYXRwaWNcIiBkYXRhLXVybD1cIiR7cGljdXJsfVwiIHNyYz1cIiR7cGljdXJsfVwiIHRpdGxlPVwi54K55Ye75p+l55yL5Zu+54mHXCIgYWx0PVwiXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT4gYDtcclxuICAgICAgICB9ZWxzZSBpZihjaGF0LmRhdGEuY29udGVudFR5cGUgPT09IDQpe1xyXG4gICAgICAgICAgICBsZXQgcGljdXJsID0gWVlJTUNoYXQuZ2V0RmlsZVVybChjaGF0LmRhdGEuY29udGVudC5hdHRhY2hJZCk7XHJcbiAgICAgICAgICAgIGxldCBmaWxlbmFtZSA9IGNoYXQuZGF0YS5jb250ZW50Lm5hbWUuc2xpY2UoMCwgMTQpO1xyXG4gICAgICAgICAgICBjaGF0c1N0ciArPSBgPGxpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoYXQtdGlwXCI+JHtuZXcgRGF0ZShjaGF0LmRhdGEuZGF0ZWxpbmUpLnRvTG9jYWxlVGltZVN0cmluZygpfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoYXQtY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCIkeyBpc2Zyb21tZT8gJ2NoYXQtYXZhdGFyIGNoYXQtYXZhdGFyLXNlbmQnIDonY2hhdC1hdmF0YXInfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vaW1ncy9hdmF0YXIuanBnXCIgYWx0PVwiXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiR7IGlzZnJvbW1lPyAnY2hhdC10eHQgY2hhdC10eHQtc2VuZCcgOidjaGF0LXR4dCd9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7Y2hhdGZyb219XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGF0LW1zZ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJjaGF0ZmlsZVwiIGhyZWY9XCIke3BpY3VybH1cIiB0aXRsZT1cIueCueWHu+S4i+i9veaWh+S7tlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmlsZW5hbWVcIj4ke2ZpbGVuYW1lfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZpbGVzaXplXCI+JHtjaGF0LmRhdGEuY29udGVudC5zaXplfUI8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+IGA7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAkY2hhdHNfbGlzdC5odG1sKGNoYXRzU3RyKTtcclxuICAgICRjaGF0cy5zY3JvbGxUb3AoJGNoYXRzWzBdLnNjcm9sbEhlaWdodCk7XHJcbn07IiwiXHJcbi8vZG9t5YWD57SgXHJcbmltcG9ydCB7XHJcbiAgICAkaGNvbnRhY3RzXHJcbn0gZnJvbSAnLi9qcWVsZW1lbnRzJztcclxuLy/ooajmg4XmlbDmja5cclxuaW1wb3J0IHsgZXhwcmVzc2lvbkxpc3QgfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcblxyXG4vL+eUqOWbvueJh+abv+aNouaWh+acrOa2iOaBr+S4reihqOaDheS/oeaBr1xyXG5jb25zdCByZXBsYWNlRW1vamkgPSAoc3RyKSA9PiB7XHJcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1xcW1teXFxbXFxdXStcXF0vZywoZSkgPT4ge1xyXG4gICAgICAgIGZvciAobGV0IGk9MDtpPGV4cHJlc3Npb25MaXN0LmRhdGEubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIGlmKGV4cHJlc3Npb25MaXN0LmRhdGFbaV0uYWN0aW9uRGF0YSA9PT0gZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYDxpbWcgY2xhc3M9XCJlbW9qaVwiIHNyYz1cIiR7ZXhwcmVzc2lvbkxpc3QucGF0aCArIGV4cHJlc3Npb25MaXN0LmRhdGFbaV0udXJsfVwiIGFsdD1cIlwiIC8+YDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCAoZGlnc2V0cykgPT4ge1xyXG4gICAgLy/mi7/lj5bogYrlpKnlr7nmlrlpZFxyXG4gICAgbGV0IHRhcmdldHVzZXJpZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0YXJnZXR1c2VyaWQnKTtcclxuICAgIGxldCBkaWdTdHIgPSAnJztcclxuICAgIGRpZ3NldHMuc29ydChmdW5jdGlvbihhLCBiKXtyZXR1cm4gYi5sYXN0Q29udGFjdFRpbWUgLSBhLmxhc3RDb250YWN0VGltZX0pO1xyXG4gICAgZGlnc2V0cy5mb3JFYWNoKGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgICAgbGV0IGxhc3Rtc2cgPSByZXMubGFzdE1lc3NhZ2UsIGxhc3Rtc2dTdHIgPSAnJywgbmV3dGlwU3RyID0gJyc7XHJcbiAgICAgICAgbGV0IG5vcmVhZG5vID0gcmVzLnNlc3Npb25WZXJzaW9uIC0gcmVzLnJlYWRlZFZlcnNpb247XHJcbiAgICAgICAgaWYobGFzdG1zZyl7XHJcbiAgICAgICAgICAgIHN3aXRjaChsYXN0bXNnLmRhdGEuY29udGVudFR5cGUpe1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOiBsYXN0bXNnU3RyID0gcmVzLmxhc3RNZXNzYWdlLmRhdGEuY29udGVudDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IGxhc3Rtc2dTdHIgPSAnW+aWh+S7tua2iOaBr10nOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgODogbGFzdG1zZ1N0ciA9ICdb5Zu+54mH5raI5oGvXSc7YnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYobm9yZWFkbm8pe1xyXG4gICAgICAgICAgICBuZXd0aXBTdHIgPSAnPGkgY2xhc3M9XCJuZXd0aXAgY3V0dHh0XCI+Jysgbm9yZWFkbm8gKyc8L2k+JztcclxuICAgICAgICB9XHJcbiAgICAgICAgZGlnU3RyICs9IGA8bGkgY2xhc3M9XCIke3RhcmdldHVzZXJpZCAmJiB0YXJnZXR1c2VyaWQgPT09IHJlcy5pZCA/ICdhY3RpdmUnIDogJyd9XCIgZGF0YS1zZXNzaW9uVmVyc2lvbj1cIiR7cmVzLnNlc3Npb25WZXJzaW9ufVwiIGRhdGEtaWQ9XCIke3Jlcy5pZH1cIiBkYXRhLXR5cGU9XCIke3Jlcy50eXBlfVwiIGRhdGEtbmlja25hbWU9XCIke3Jlcy5uaWNrbmFtZSB8fCByZXMuaWR9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGkgZGF0YS1pZD1cIiR7cmVzLmlkfVwiIGRhdGEtdHlwZT1cIiR7cmVzLnR5cGV9XCIgY2xhc3M9XCJjbG9zZVwiPsOXPC9pPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhdmF0YXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke1lZSU1DaGF0LmdldEZpbGVVcmwocmVzLnBob3RvKSB8fCAnLi9pbWdzL2F2YXRhci5qcGcnfVwiIGFsdD1cIlwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwibmFtZSBjdXR0eHRcIj4ke3Jlcy5uaWNrbmFtZSB8fCByZXMuaWR9PC9oMz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJtc2cgY3V0dHh0XCI+JHtyZXBsYWNlRW1vamkobGFzdG1zZ1N0cil9PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PiR7bmV3dGlwU3RyfVxyXG4gICAgICAgICAgICAgICAgPC9saT5gO1xyXG4gICAgfSk7XHJcbiAgICAkaGNvbnRhY3RzLmh0bWwoZGlnU3RyKTtcclxufSIsIi8v5YWD57SgXHJcbmltcG9ydCB7ICR5eWltX2lvZ2luLCAkeXlpbV9ib3ggfSBmcm9tICcuL2pxZWxlbWVudHMnO1xyXG5cclxuLy/nlKjmiLfnmbvpmYZcclxuZXhwb3J0IGRlZmF1bHQgKHVzZXJuYW1lLCBwYXNzd29yZCkgPT4ge1xyXG4gICAgLy/mraPlvI/njq/looNcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnaHR0cHM6Ly9pbS55eXVhcC5jb20vc3lzYWRtaW4vcmVzdC95b255b3UvdWRuL3Rva2VuJyxcclxuICAgICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICBoZWFkZXJzOiB7XCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJ9LFxyXG4gICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgXCJ1c2VybmFtZVwiOnVzZXJuYW1lLFxyXG4gICAgICAgICAgICBcImNsaWVudElkXCI6XCJjODUxMzBhYzJjODBkODNiODZmYzFiYzM0NGFjMTIxMVwiLFxyXG4gICAgICAgICAgICBcImNsaWVudFNlY3JldFwiOlwiQ0VEMTQ2MTM1QTU4NEQ1RjJFQUIzMzYzNUQxOUFFOTlcIlxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgbGV0IGNsaWVudElkZW50aWZ5ID0gXCJwY1wiICsgU3RyaW5nKG5ldyBEYXRlKCkuZ2V0VGltZSgpKTtcclxuICAgICAgICAgICAgJHl5aW1faW9naW4uaGlkZSgpO1xyXG4gICAgICAgICAgICAkeXlpbV9ib3guc2hvdygpO1xyXG4gICAgICAgICAgICAvL+eZu+mZhllZSU1TREtcclxuICAgICAgICAgICAgWVlJTUNoYXQubG9naW4oe1xyXG4gICAgICAgICAgICAgICAgXCJ1c2VybmFtZVwiOiB1c2VybmFtZSxcclxuICAgICAgICAgICAgICAgIFwidG9rZW5cIjogcmVzdWx0LnRva2VuLFxyXG4gICAgICAgICAgICAgICAgXCJleHBpcmF0aW9uXCI6IHJlc3VsdC5leHBpcmF0aW9uLFxyXG4gICAgICAgICAgICAgICAgXCJhcHBUeXBlXCI6IDQsXHJcbiAgICAgICAgICAgICAgICBcImlkZW50aWZ5XCI6IGNsaWVudElkZW50aWZ5XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChhcmcpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYXJnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIC8v5rWL6K+V546v5aKDXHJcbiAgICAvLyAkLmFqYXgoe1xyXG4gICAgLy8gICAgIHVybDogJ2h0dHA6Ly8xNzIuMjAuMTUuNjAvc3lzYWRtaW4vcmVzdC95b255b3UvaW1fcHJlL3Rva2VuJyxcclxuICAgIC8vICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAvLyAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgIC8vICAgICBoZWFkZXJzOiB7XCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJ9LFxyXG4gICAgLy8gICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgIC8vICAgICAgICAgXCJ1c2VybmFtZVwiOnVzZXJuYW1lLFxyXG4gICAgLy8gICAgICAgICBcImNsaWVudElkXCI6XCJiMjZiYTUxMDU4ZWVlOWRiNGY4OGE3YTJiMWJkMWIwNlwiLFxyXG4gICAgLy8gICAgICAgICBcImNsaWVudFNlY3JldFwiOlwiQ0M5QTcxRTBDMjUyOEVEQjE2NTJERkIxOEVDRThEREZcIlxyXG4gICAgLy8gICAgIH0pLFxyXG4gICAgLy8gICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgIC8vICAgICAgICAgbGV0IGNsaWVudElkZW50aWZ5ID0gXCJwY1wiICsgU3RyaW5nKG5ldyBEYXRlKCkuZ2V0VGltZSgpKTtcclxuICAgIC8vICAgICAgICAgJHl5aW1faW9naW4uaGlkZSgpO1xyXG4gICAgLy8gICAgICAgICAkeXlpbV9ib3guc2hvdygpO1xyXG4gICAgLy8gICAgICAgICAvL+eZu+mZhllZSU1TREtcclxuICAgIC8vICAgICAgICAgWVlJTUNoYXQubG9naW4oe1xyXG4gICAgLy8gICAgICAgICAgICAgXCJ1c2VybmFtZVwiOiB1c2VybmFtZSxcclxuICAgIC8vICAgICAgICAgICAgIFwidG9rZW5cIjogcmVzdWx0LnRva2VuLFxyXG4gICAgLy8gICAgICAgICAgICAgXCJleHBpcmF0aW9uXCI6IHJlc3VsdC5leHBpcmF0aW9uLFxyXG4gICAgLy8gICAgICAgICAgICAgXCJhcHBUeXBlXCI6IDQsXHJcbiAgICAvLyAgICAgICAgICAgICBcImlkZW50aWZ5XCI6IGNsaWVudElkZW50aWZ5XHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgIH0sXHJcbiAgICAvLyAgICAgZXJyb3I6IGZ1bmN0aW9uIChhcmcpIHtcclxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coYXJnKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9KTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9