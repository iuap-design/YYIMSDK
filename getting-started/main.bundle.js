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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//初始化SDK
//加载事件操作
YYIMChat.initSDK({
    app: 'im_pre', //appId
    etp: 'yonyou', //etpId
    wsurl: '172.20.15.60', //websocket Url
    wsport: 5227, //websocket port 5227/5222/5225
    hbport: 7075, //httpbind  port 7075/7070
    servlet: 'http://172.20.15.60/', //rest Url
    flash_swf_url: 'xxx/x/Moxie.swf', //flash 上传 swf文件位置
    logEnable: true, //client log
    clientMark: 'web', //client mark 'web' or 'pc'
    apiKey: "85de79b9f7e34c37a99accaddb256990"
});

//初始化回调方法


//获取最近联系人
YYIMChat.init({
    onOpened: function onOpened() {
        // 登录成功
        YYIMChat.setPresence();
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
        //收到消息
        console.log('收到消息了：', arg);
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

var _getHistoryMessage = __webpack_require__(/*! ./getHistoryMessage */ "./src/js/getHistoryMessage.js");

var _getHistoryMessage2 = _interopRequireDefault(_getHistoryMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//临时自动登录的

//用户登陆
if (localStorage.getItem('currentuserinfo')) {
    (0, _userLogin2.default)(JSON.parse(localStorage.getItem('currentuserinfo')).username);
}
//用户登陆

//获取历史聊天记录
//dom元素
_jqelements.$login_btn.click(function () {
    var username = _jqelements.$login_username.val();
    if (/^[a-z][a-z_0-9]*$/.test(username)) {
        (0, _userLogin2.default)(username);
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
    var originX = e.pageX;
    var originY = e.pageY;
    var boxPos = _jqelements.$yyim_main.position();
    _jqelements.$j_move.on('mousemove', function (e) {
        _jqelements.$yyim_main.css({ left: boxPos.left + e.pageX - originX + 'px', top: boxPos.top + e.pageY - originY + 'px' });
    });
});
_jqelements.$j_move.on('mouseup', function () {
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
    localStorage.setItem('targetuserid', $(this).attr('data-id')); //保存聊天对方id，用于发送消息
    (0, _getHistoryMessage2.default)($(this).attr('data-sessionVersion'), $(this).attr('data-id'), $(this).attr('data-type'));
});

//关闭联系人点击
_jqelements.$hcontacts.on('click', '.close', function () {
    console.log('关闭');
    return false;
});

//除了自己点击其他部分隐藏表情框
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
                console.log(msg);
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

//获取聊天历史,传入sessionVersion,id和type参数

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
                (0, _renderHistoryMessage2.default)(res.result);
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
            //result.list是最近联系人
            if (result.list.length) {
                result.list.forEach(function (e, i) {
                    //获取个人信息
                    YYIMChat.getVCard({
                        id: e.jid,
                        success: function success(result) {
                            if (result.ts !== -1) {
                                e.name = result.nickname;
                                if (result.photo) {
                                    e.photo = result.photo;
                                } else {
                                    e.photo = '';
                                }
                                _jqelements.$hcontacts[0].innerHTML += '<li data-sessionVersion="' + e.sessionVersion + '" data-id="' + e.id + '" data-type="' + e.type + '">\n                                    <i class="close">\xD7</i>\n                                    <div class="avatar">\n                                        <img src="./imgs/avatar.jpg" alt="">\n                                    </div>\n                                    <div class="detail">\n                                        <h3 class="name cuttxt">' + e.id + '</h3>\n                                        <p class="msg cuttxt">' + (e.lastMessage && e.lastMessage.data.contentType === 2 ? e.lastMessage.data.content : '') + '</p>\n                                    </div>\n                                    <i class="newtip cuttxt">99</i>\n                                </li>';
                            }
                        },
                        error: function error(err) {
                            console.log(err);
                        },
                        complete: function complete() {}
                    });
                });
            }
        },
        error: function error(err) {
            console.log(err);
        }
    });
};
//dom元素

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
var $login_btn = exports.$login_btn = $('.login-btn'); //登陆按钮
var $yyim_main = exports.$yyim_main = $('.yyim-main'); //聊天最外层窗口
var $j_move = exports.$j_move = $('.j_move'); //聊天窗口头
var $hcontacts = exports.$hcontacts = $('.hcontacts'); //最近联系人框
var $yyim_box = exports.$yyim_box = $('.yyim-box'); //聊天框
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

exports.default = function (chats) {
    var chatsStr = '';
    var myid = JSON.parse(localStorage.getItem('currentuserinfo')).id;
    chats.forEach(function (chat, i) {
        var isfromme = myid === chat.from;
        if (chat.data.contentType === 2) {
            chatsStr += '<li>\n                            <div class="chat-tip">' + new Date(chat.dateline).toLocaleTimeString() + '</div>\n                            <div class="chat-content">\n                                <div class="' + (isfromme ? 'chat-avatar chat-avatar-send' : 'chat-avatar') + '">\n                                    <img src="./imgs/avatar.jpg" alt="">\n                                </div>\n                                <div class="' + (isfromme ? 'chat-txt chat-txt-send' : 'chat-txt') + '">\n                                    <div class="chat-user-name">' + chat.from + '</div>\n                                    <div class="chat-msg">' + replaceEmoji(chat.data.content) + '</div>\n                                </div>\n                            </div>\n                        </li> ';
        }
    });
    _jqelements.$chats_list.html(chatsStr);
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
exports.default = function (username) {
    $.ajax({
        url: 'http://172.20.15.60/sysadmin/rest/yonyou/im_pre/token',
        type: 'POST',
        dataType: 'json',
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({
            "username": "zongtf",
            "clientId": "b26ba51058eee9db4f88a7a2b1bd1b06",
            "clientSecret": "CC9A71E0C2528EDB1652DFB18ECE8DDF"
        }),
        success: function success(result) {
            var clientIdentify = "pc" + String(new Date().getTime());
            _jqelements.$yyim_iogin.hide();
            _jqelements.$yyim_box.show();
            //登陆YYIMSDK
            YYIMChat.login({
                "username": 'zongtf',
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
}; //元素

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbnRyb2xFdmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZ2V0SGlzdG9yeU1lc3NhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2dldFJlY2VudERpZ3NldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvanFlbGVtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcmVuZGVySGlzdG9yeU1lc3NhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VzZXJMb2dpbi5qcyJdLCJuYW1lcyI6WyJZWUlNQ2hhdCIsImluaXRTREsiLCJhcHAiLCJldHAiLCJ3c3VybCIsIndzcG9ydCIsImhicG9ydCIsInNlcnZsZXQiLCJmbGFzaF9zd2ZfdXJsIiwibG9nRW5hYmxlIiwiY2xpZW50TWFyayIsImFwaUtleSIsImluaXQiLCJvbk9wZW5lZCIsInNldFByZXNlbmNlIiwiZ2V0VkNhcmQiLCJzdWNjZXNzIiwicmVzIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJvbkV4cGlyYXRpb24iLCJjYWxsYmFjayIsIm9uQ2xvc2VkIiwiYXJnIiwib25Db25mbGljdGVkIiwib25DbGllbnRLaWNrb3V0Iiwib25VcGRhdGVQYXNzd29yZCIsIm9uQXV0aEVycm9yIiwib25Db25uZWN0RXJyb3IiLCJvblJlY2VpcHRzIiwib25TdWJzY3JpYmUiLCJvblJvc3RlckZhdm9yaXRlZCIsIm9uUm9zdGVyVXBkYXRlZGVkIiwib25NZXNzYWdlIiwiY29uc29sZSIsImxvZyIsIm9uR3JvdXBVcGRhdGUiLCJvbktpY2tlZE91dEdyb3VwIiwib25UcmFuc2Zlckdyb3VwT3duZXIiLCJvblByZXNlbmNlIiwib25Sb3N0ZXJEZWxldGVkIiwib25QdWJhY2NvdW50VXBkYXRlIiwicHViYWNjb3VudHMiLCJvblRyYW5zcGFyZW50TWVzc2FnZSIsImV4cHJlc3Npb25MaXN0IiwicGF0aCIsImRhdGEiLCJhY3Rpb25EYXRhIiwiZ2V0SXRlbSIsInBhcnNlIiwidXNlcm5hbWUiLCJjbGljayIsInZhbCIsInRlc3QiLCIkIiwiaGFzQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwiY3NzIiwibGVmdCIsInRvcCIsImNsZWFyIiwiaGlkZSIsInNob3ciLCJvbiIsImUiLCJvcmlnaW5YIiwicGFnZVgiLCJvcmlnaW5ZIiwicGFnZVkiLCJib3hQb3MiLCJwb3NpdGlvbiIsIm9mZiIsImtleXdvcmQiLCJrZXlDb2RlIiwicXVlcnlSb3N0ZXJJdGVtIiwiYXR0ciIsImhvdmVyIiwidG9nZ2xlIiwidG8iLCJzZW5kVGV4dE1lc3NhZ2UiLCJ0eXBlIiwiY29udGVudCIsImV4dGVuZCIsIm1zZyIsInNlc3Npb25WZXJzaW9uIiwiaWQiLCJlbmRWZXJzaW9uIiwic3RhcnQiLCJnZXRIaXN0b3J5TWVzc2FnZSIsInN0YXJ0VmVyc2lvbiIsImh0bWwiLCJyZXN1bHQiLCJsZW5ndGgiLCJnZXRSZWNlbnREaWdzZXQiLCJsaXN0IiwiZm9yRWFjaCIsImkiLCJqaWQiLCJ0cyIsIm5hbWUiLCJuaWNrbmFtZSIsInBob3RvIiwiaW5uZXJIVE1MIiwibGFzdE1lc3NhZ2UiLCJjb250ZW50VHlwZSIsImVycm9yIiwiZXJyIiwiY29tcGxldGUiLCIkeXlpbV9pb2dpbiIsIiRsb2dpbl91c2VybmFtZSIsIiRsb2dpbl9idG4iLCIkeXlpbV9tYWluIiwiJGpfbW92ZSIsIiRoY29udGFjdHMiLCIkeXlpbV9ib3giLCIkal9icV9ib3giLCIkeXlpbV9lZGl0b3IiLCIkYnRuX3NlbmQiLCIkY2hhdF9ib3giLCIkY2hhdHNfbGlzdCIsIm1hcCIsInQiLCJ1cmwiLCJyZXBsYWNlRW1vamkiLCJzdHIiLCJyZXBsYWNlIiwiY2hhdHMiLCJjaGF0c1N0ciIsIm15aWQiLCJjaGF0IiwiaXNmcm9tbWUiLCJmcm9tIiwiRGF0ZSIsImRhdGVsaW5lIiwidG9Mb2NhbGVUaW1lU3RyaW5nIiwiYWpheCIsImRhdGFUeXBlIiwiaGVhZGVycyIsImNsaWVudElkZW50aWZ5IiwiU3RyaW5nIiwiZ2V0VGltZSIsImxvZ2luIiwidG9rZW4iLCJleHBpcmF0aW9uIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEVBOztBQUdBOzs7Ozs7QUFFQTtBQU5BO0FBT0FBLFNBQVNDLE9BQVQsQ0FBaUI7QUFDYkMsU0FBSyxRQURRLEVBQ0U7QUFDZkMsU0FBSyxRQUZRLEVBRUU7QUFDZkMsV0FBTyxjQUhNLEVBR1U7QUFDdkJDLFlBQVEsSUFKSyxFQUlDO0FBQ2RDLFlBQVEsSUFMSyxFQUtDO0FBQ2RDLGFBQVMsc0JBTkksRUFNb0I7QUFDakNDLG1CQUFlLGlCQVBGLEVBT3FCO0FBQ2xDQyxlQUFXLElBUkUsRUFRSTtBQUNqQkMsZ0JBQVksS0FUQyxFQVNNO0FBQ25CQyxZQUFRO0FBVkssQ0FBakI7O0FBYUE7OztBQWpCQTtBQWtCQVgsU0FBU1ksSUFBVCxDQUFjO0FBQ1ZDLGNBQVUsb0JBQVc7QUFDakI7QUFDQWIsaUJBQVNjLFdBQVQ7QUFDQTtBQUNBZCxpQkFBU2UsUUFBVCxD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QUVrRixJQUFGLENBQU87QUFDSGIsYUFBSyx1REFERjtBQUVIMUMsY0FBTSxNQUZIO0FBR0h3RCxrQkFBVSxNQUhQO0FBSUhDLGlCQUFTLEVBQUMsZ0JBQWdCLGtCQUFqQixFQUpOO0FBS0g1RixjQUFNNUIsS0FBS0MsU0FBTCxDQUFlO0FBQ2pCLHdCQUFXLFFBRE07QUFFakIsd0JBQVcsa0NBRk07QUFHakIsNEJBQWU7QUFIRSxTQUFmLENBTEg7QUFVSEwsaUJBQVMsaUJBQVU4RSxNQUFWLEVBQWtCO0FBQ3ZCLGdCQUFJK0MsaUJBQWlCLE9BQU9DLE9BQU8sSUFBSVAsSUFBSixHQUFXUSxPQUFYLEVBQVAsQ0FBNUI7QUFDQSxvQ0FBWS9FLElBQVo7QUFDQSxrQ0FBVUMsSUFBVjtBQUNBO0FBQ0FqRSxxQkFBU2dKLEtBQVQsQ0FBZTtBQUNYLDRCQUFZLFFBREQ7QUFFWCx5QkFBU2xELE9BQU9tRCxLQUZMO0FBR1gsOEJBQWNuRCxPQUFPb0QsVUFIVjtBQUlYLDJCQUFXLENBSkE7QUFLWCw0QkFBWUw7QUFMRCxhQUFmO0FBT0gsU0F0QkU7QUF1QkhqQyxlQUFPLGVBQVVuRixHQUFWLEVBQWU7QUFDbEJXLG9CQUFRQyxHQUFSLENBQVlaLEdBQVo7QUFDSDtBQXpCRSxLQUFQO0FBMkJILEMsRUFoQ0QsSSIsImZpbGUiOiJtYWluLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIi8v5Yqg6L295LqL5Lu25pON5L2cXHJcbmltcG9ydCAnLi9qcy9jb250cm9sRXZlbnQnO1xyXG5cclxuLy/ojrflj5bmnIDov5HogZTns7vkurpcclxuaW1wb3J0IGdldFJlY2VudERpZ3NldCBmcm9tICcuL2pzL2dldFJlY2VudERpZ3NldCc7XHJcblxyXG4vL+WIneWni+WMllNES1xyXG5ZWUlNQ2hhdC5pbml0U0RLKHtcclxuICAgIGFwcDogJ2ltX3ByZScsIC8vYXBwSWRcclxuICAgIGV0cDogJ3lvbnlvdScsIC8vZXRwSWRcclxuICAgIHdzdXJsOiAnMTcyLjIwLjE1LjYwJywgLy93ZWJzb2NrZXQgVXJsXHJcbiAgICB3c3BvcnQ6IDUyMjcsIC8vd2Vic29ja2V0IHBvcnQgNTIyNy81MjIyLzUyMjVcclxuICAgIGhicG9ydDogNzA3NSwgLy9odHRwYmluZCAgcG9ydCA3MDc1LzcwNzBcclxuICAgIHNlcnZsZXQ6ICdodHRwOi8vMTcyLjIwLjE1LjYwLycsIC8vcmVzdCBVcmxcclxuICAgIGZsYXNoX3N3Zl91cmw6ICd4eHgveC9Nb3hpZS5zd2YnLCAvL2ZsYXNoIOS4iuS8oCBzd2bmlofku7bkvY3nva5cclxuICAgIGxvZ0VuYWJsZTogdHJ1ZSwgLy9jbGllbnQgbG9nXHJcbiAgICBjbGllbnRNYXJrOiAnd2ViJywgLy9jbGllbnQgbWFyayAnd2ViJyBvciAncGMnXHJcbiAgICBhcGlLZXk6IFwiODVkZTc5YjlmN2UzNGMzN2E5OWFjY2FkZGIyNTY5OTBcIlxyXG59KTtcclxuXHJcbi8v5Yid5aeL5YyW5Zue6LCD5pa55rOVXHJcbllZSU1DaGF0LmluaXQoe1xyXG4gICAgb25PcGVuZWQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIOeZu+W9leaIkOWKn1xyXG4gICAgICAgIFlZSU1DaGF0LnNldFByZXNlbmNlKCk7XHJcbiAgICAgICAgLy8g6I635Y+W6Ieq5bex5L+h5oGvXHJcbiAgICAgICAgWVlJTUNoYXQuZ2V0VkNhcmQoe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAvL+S/neWtmOiHquW3seeahOS/oeaBr1xyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2N1cnJlbnR1c2VyaW5mbycsIEpTT04uc3RyaW5naWZ5KHJlcykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy/ojrflj5bmnIDov5HogZTns7vkurpcclxuICAgICAgICBnZXRSZWNlbnREaWdzZXQoKTtcclxuICAgIH0sXHJcbiAgICBvbkV4cGlyYXRpb246IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgLy/oh6rliqjmm7TmlrB0b2tlblxyXG4gICAgICAgIC8vIGNhbGxiYWNrKHRva2VuLCBleHBpcmF0aW9uKTtcclxuICAgIH0sXHJcbiAgICBvbkNsb3NlZDogZnVuY3Rpb24oYXJnKSB7XHJcbiAgICAgICAgLy/ov57mjqXlhbPpl61cclxuICAgIH0sXHJcbiAgICBvbkNvbmZsaWN0ZWQ6IGZ1bmN0aW9uKGFyZykge1xyXG4gICAgICAgIC8v55m76ZmG5Yay56qBXHJcbiAgICB9LFxyXG4gICAgb25DbGllbnRLaWNrb3V0OiBmdW5jdGlvbihhcmcpIHtcclxuICAgICAgICAvL+iiq+S7luerr+i4ouaOiVxyXG4gICAgfSxcclxuICAgIG9uVXBkYXRlUGFzc3dvcmQ6IGZ1bmN0aW9uKGFyZykge1xyXG4gICAgICAgIC8v5pu05pS55a+G56CB77yM6KKr6Lii5o6JXHJcbiAgICB9LFxyXG4gICAgb25BdXRoRXJyb3I6IGZ1bmN0aW9uKGFyZykge1xyXG4gICAgICAgIC8v55m76ZmG6K6k6K+B5aSx6LSlXHJcbiAgICB9LFxyXG4gICAgb25Db25uZWN0RXJyb3I6IGZ1bmN0aW9uKGFyZykge1xyXG4gICAgICAgIC8v6L+e5o6l5aSx6LSlXHJcbiAgICB9LFxyXG4gICAgb25SZWNlaXB0czogZnVuY3Rpb24oYXJnKSB7XHJcbiAgICAgICAgLy/mtojmga/lm57miadcclxuICAgIH0sXHJcbiAgICBvblN1YnNjcmliZTogZnVuY3Rpb24oYXJnKSB7XHJcbiAgICAgICAgLy/lj5HnlJ/orqLpmIVcclxuICAgIH0sXHJcbiAgICBvblJvc3RlckZhdm9yaXRlZDogZnVuY3Rpb24oYXJnKSB7XHJcbiAgICAgICAgLy/ooqvmlLbol49cclxuICAgIH0sXHJcbiAgICBvblJvc3RlclVwZGF0ZWRlZDogZnVuY3Rpb24oYXJnKSB7XHJcbiAgICAgICAgLy/lpb3lj4vkv6Hmga/mm7TmlLlcclxuICAgIH0sXHJcbiAgICBvbk1lc3NhZ2U6IGZ1bmN0aW9uKGFyZykge1xyXG4gICAgICAgIC8v5pS25Yiw5raI5oGvXHJcbiAgICAgICAgY29uc29sZS5sb2coJ+aUtuWIsOa2iOaBr+S6hu+8micsIGFyZyk7XHJcbiAgICB9LFxyXG4gICAgb25Hcm91cFVwZGF0ZTogZnVuY3Rpb24oYXJnKSB7XHJcbiAgICAgICAgLy/nvqTnu4Tmm7TmlrBcclxuICAgIH0sXHJcbiAgICBvbktpY2tlZE91dEdyb3VwOiBmdW5jdGlvbihhcmcpIHtcclxuICAgICAgICAvL+e+pOaIkOWRmOiiq+e+pOS4u+aPkOWHulxyXG4gICAgfSxcclxuICAgIG9uVHJhbnNmZXJHcm91cE93bmVyOiBmdW5jdGlvbihhcmcpe1xyXG4gICAgICAgIC8v576k5Li76L2s6K6pXHJcbiAgICB9LFxyXG4gICAgb25QcmVzZW5jZTogZnVuY3Rpb24oYXJnKSB7XHJcbiAgICAgICAgLy/lpb3lj4twcmVzZW5jZeaUueWPmFxyXG4gICAgfSxcclxuICAgIG9uUm9zdGVyRGVsZXRlZDogZnVuY3Rpb24oYXJnKSB7XHJcbiAgICAgICAgLy/lpb3lj4vooqvliKDpmaRcclxuICAgIH0sXHJcbiAgICBvblB1YmFjY291bnRVcGRhdGU6IGZ1bmN0aW9uKHB1YmFjY291bnRzKSB7XHJcbiAgICAgICAgLy/lhazlhbHlj7fkv6Hmga/mm7TmlrBcclxuICAgIH0sXHJcbiAgICBvblRyYW5zcGFyZW50TWVzc2FnZTogZnVuY3Rpb24oYXJnKSB7XHJcbiAgICAgICAgLy/pgI/kvKDkuJrliqHmtojmga9cclxuICAgIH1cclxufSk7XHJcblxyXG4iLCJleHBvcnQgY29uc3QgZXhwcmVzc2lvbkxpc3QgPSB7XHJcbiAgICBwYXRoOiBcIi4vaW1ncy9icS9cIixcclxuICAgIGRhdGE6IFtcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+m+h+eJmV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2NpeWFAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WTiOWTiF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2hhaGFAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+aZlV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3l1bkAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5rGXXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25faGFuYkAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5a6z576eXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25faGFpeEAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6LCD55quXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fdGlhb3BAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+eWkemXrl1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3lpd0AyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5o2C6IS4XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fd3VsaWFuQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlpbjnrJFdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9qaWFueGlhb0AyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5py65pm6XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fc21hcnRAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+W+l+aEj11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2RleWlAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+eskWNyeV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2xhdWdoaW5nX3RlYXJzQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmtYHms6pdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9jcnlpbmdAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+Wli+aWl11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2ZlbmRvdUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5oqx5oqxXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25faHVnQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvnlJ/nl4VdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9pbGxAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WwtOWwrF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2dhbmdhQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlgbfnrJFdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl90b3V4QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvotZ5dXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl96YW5AMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+aPoeaJi11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3dvc0AyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJbT0tdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9va0AyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJbeWVha11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3llYWtAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+m8k+aOjF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2d1ekAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5ouz5aS0XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fcXVhbnRvdUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6IKM6IKJXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25famlyb3VAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+aPoeaLs11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3dvcUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5ouc5omYXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fYmFpdEAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5oSJ5b+rXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25feXVrQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvpmr7ov4ddXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9uYW5ndW9AMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+mXreWYtF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2JpenVpQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlm7BdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9rdW5AMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+eMquWktF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3BpZ0AyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb54ix5b+DXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25faGVhcnRAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+W/g+eijl1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3hpbnN1aUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb56S855uSXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fYm94QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlkLtdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9raXNzYUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb546r55Gw6IqxXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fcm9zZUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5qOS5qOS57OWXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fY2FuZHlAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+aZmuWuiV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX25pZ2h0QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvnpYjnpbddXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9wcmF5QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvnu5nliptdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9nZWlsaUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6LipXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fY2FpQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvkurLkurJdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9raXNzYkAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5ZiYXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25feHVAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+iJsl1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3NlQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlj6/mgJxdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9rZWxpYW5AMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WPkeWRhl1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2ZhZGFpQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlpKflk61dXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9jcnlhQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlm7BaenpdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl96enpAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+aAneiAg11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3Npa2FvQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvnmb3nnLxdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9iYWl5QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlgrLmhaJdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9hb21hbkAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6YW3XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fa3VAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+Wbp11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2ppb25nQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvphJnop4ZdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9iaXNAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+mlpemlv11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2ppZUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5ZCTXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25feGlhQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmiqDpvLtdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9rb3ViaUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5oOK6K62XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25famluZ3lAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WPkeaAkl1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2FuZ3J5QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmg4rmgZBdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9qaW5na0AyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5ZCQXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fdHVAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+aLnOaLnF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2J5ZUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5ZKW5ZWhXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fY29mZmVlQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvllaTphZJdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9iZWVyQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvkuIvpm6hdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9yYWluQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvpl6rnlLVdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9zaGFuZEAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5LiL6ZuqXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fc25vd0AyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6Laz55CDXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fYmFsbEAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb56+u55CDXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fYmFza2V0QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvpo57mnLpdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9wbGFuZUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6YKu5Lu2XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fbWFpbEAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6Zuo5LyeXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25feXVzYW5AMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+Wlluadr11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2ppYW5nYkAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5oCq54mpXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fZ3VhaXd1QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvoja9dXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9tZWRAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+eCuOW8uV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3poYWRAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+ibi+ezlV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2Nha2VAMngucG5nXCIgfVxyXG4gICAgXVxyXG59OyIsIi8vZG9t5YWD57SgXHJcbmltcG9ydCB7XHJcbiAgICAkeXlpbV9pb2dpbixcclxuICAgICR5eWltX2JveCxcclxuICAgICR5eWltX21haW4sXHJcbiAgICAkal9tb3ZlLFxyXG4gICAgJGpfYnFfYm94LFxyXG4gICAgJHl5aW1fZWRpdG9yLFxyXG4gICAgJGJ0bl9zZW5kLFxyXG4gICAgJGxvZ2luX3VzZXJuYW1lLFxyXG4gICAgJGxvZ2luX2J0bixcclxuICAgICRoY29udGFjdHNcclxufSBmcm9tICcuL2pxZWxlbWVudHMnO1xyXG4vL+eUqOaIt+eZu+mZhlxyXG5pbXBvcnQgdXNlckxvZ2luIGZyb20gJy4vdXNlckxvZ2luJztcclxuLy/ojrflj5bljoblj7LogYrlpKnorrDlvZVcclxuaW1wb3J0IGdldEhpc3RvcnlNZXNzYWdlIGZyb20gJy4vZ2V0SGlzdG9yeU1lc3NhZ2UnO1xyXG5cclxuXHJcbi8v5Li05pe26Ieq5Yqo55m75b2V55qEXHJcbmlmKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50dXNlcmluZm8nKSl7XHJcbiAgICB1c2VyTG9naW4oSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudHVzZXJpbmZvJykpLnVzZXJuYW1lKTtcclxufVxyXG4vL+eUqOaIt+eZu+mZhlxyXG4kbG9naW5fYnRuLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCB1c2VybmFtZSA9ICRsb2dpbl91c2VybmFtZS52YWwoKTtcclxuICAgIGlmKC9eW2Etel1bYS16XzAtOV0qJC8udGVzdCh1c2VybmFtZSkpe1xyXG4gICAgICAgIHVzZXJMb2dpbih1c2VybmFtZSk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLy/mnIDlpKfljJbmjInpkq7ngrnlh7tcclxuJCgnLnNjYWxlY2hhdCcpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICR5eWltX21haW4uaGFzQ2xhc3MoJ21heHdpbmRvdycpID8gJHl5aW1fbWFpbi5yZW1vdmVDbGFzcygnbWF4d2luZG93JykgOiAkeXlpbV9tYWluLmFkZENsYXNzKCdtYXh3aW5kb3cnKTtcclxuICAgICR5eWltX21haW4uY3NzKHtsZWZ0OiAnMCcsIHRvcDogJzAnfSk7XHJcbn0pO1xyXG5cclxuLy/lhbPpl63nqpflj6PmjInpkq7ngrnlh7tcclxuJCgnLmNsb3NlY2hhdCcpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xyXG4gICAgJHl5aW1fYm94LmhpZGUoKTtcclxuICAgICR5eWltX2lvZ2luLnNob3coKTtcclxufSk7XHJcblxyXG4vL+enu+WKqOS6i+S7tlxyXG4kal9tb3ZlLm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgbGV0IG9yaWdpblggPSBlLnBhZ2VYO1xyXG4gICAgbGV0IG9yaWdpblkgPSBlLnBhZ2VZO1xyXG4gICAgbGV0IGJveFBvcyA9ICR5eWltX21haW4ucG9zaXRpb24oKTtcclxuICAgICRqX21vdmUub24oJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgJHl5aW1fbWFpbi5jc3Moe2xlZnQ6IChib3hQb3MubGVmdCArIGUucGFnZVggLSBvcmlnaW5YKSArICdweCcsIHRvcDogKGJveFBvcy50b3AgKyBlLnBhZ2VZIC0gb3JpZ2luWSkgKyAncHgnfSk7XHJcbiAgICB9KTtcclxufSk7XHJcbiRqX21vdmUub24oJ21vdXNldXAnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAkKHRoaXMpLm9mZignbW91c2Vtb3ZlJyk7XHJcbn0pO1xyXG5cclxuXHJcbi8v5pCc57Si5aW95Y+LXHJcbiQoJy55eWltLXNlYXJjaCcpLm9uKCdrZXlkb3duJyxmdW5jdGlvbiAoZSkge1xyXG4gICAgbGV0IGtleXdvcmQgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgaWYoZS5rZXlDb2RlID09PSAxMyAmJiBrZXl3b3JkKXtcclxuICAgICAgICAvL+aQnOe0ouiBlOezu+S6ulxyXG4gICAgICAgIFlZSU1DaGF0LnF1ZXJ5Um9zdGVySXRlbSh7XHJcbiAgICAgICAgICAgIGtleXdvcmQ6IGtleXdvcmQsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vL+iBlOezu+S6uueCueWHu1xyXG4kaGNvbnRhY3RzLm9uKCdjbGljaycsJ2xpJyxmdW5jdGlvbiAoKSB7XHJcbiAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0YXJnZXR1c2VyaWQnLCAkKHRoaXMpLmF0dHIoJ2RhdGEtaWQnKSk7Ly/kv53lrZjogYrlpKnlr7nmlrlpZO+8jOeUqOS6juWPkemAgea2iOaBr1xyXG4gICAgZ2V0SGlzdG9yeU1lc3NhZ2UoJCh0aGlzKS5hdHRyKCdkYXRhLXNlc3Npb25WZXJzaW9uJyksICQodGhpcykuYXR0cignZGF0YS1pZCcpLCAkKHRoaXMpLmF0dHIoJ2RhdGEtdHlwZScpKTtcclxufSk7XHJcblxyXG4vL+WFs+mXreiBlOezu+S6uueCueWHu1xyXG4kaGNvbnRhY3RzLm9uKCdjbGljaycsJy5jbG9zZScsZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc29sZS5sb2coJ+WFs+mXrScpO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59KTtcclxuXHJcbi8v6Zmk5LqG6Ieq5bex54K55Ye75YW25LuW6YOo5YiG6ZqQ6JeP6KGo5oOF5qGGXHJcbiQoJ2JvZHknKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAkal9icV9ib3guaGlkZSgpO1xyXG59KTtcclxuXHJcbi8v6KGo5oOF5oyJ6ZKu54K55Ye7XHJcbiQoJy5qX21lbnVfYnEnKS5ob3ZlcihmdW5jdGlvbiAoKSB7XHJcbiAgICAkKHRoaXMpLmFkZENsYXNzKCdob3ZlcicpO1xyXG4gICAgJCgnLmJxX3RpcCcpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG59LGZ1bmN0aW9uICgpIHtcclxuICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2hvdmVyJyk7XHJcbiAgICAkKCcuYnFfdGlwJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxufSkuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgJGpfYnFfYm94LnRvZ2dsZSgpO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59KTtcclxuXHJcbi8v6KGo5oOF54K55Ye7XHJcbiRqX2JxX2JveC5vbignY2xpY2snLCAnbGknLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAkeXlpbV9lZGl0b3IudmFsKCR5eWltX2VkaXRvci52YWwoKSArICQodGhpcykuYXR0cignZGF0YS1jb2RlJykpO1xyXG4gICAgaWYoJHl5aW1fZWRpdG9yLnZhbCgpKXtcclxuICAgICAgICAkYnRuX3NlbmQucmVtb3ZlQ2xhc3MoJ2FkaXQtYnRuLXNlbmQtZGlzYWJsZWQnKTtcclxuICAgIH1lbHNlIHtcclxuICAgICAgICAkYnRuX3NlbmQuYWRkQ2xhc3MoJ2FkaXQtYnRuLXNlbmQtZGlzYWJsZWQnKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxufSk7XHJcblxyXG4vL+WbvueJh+aMiemSrueCueWHu1xyXG4kKCcual9tZW51X3RwJykuaG92ZXIoZnVuY3Rpb24gKCkge1xyXG4gICAgJCh0aGlzKS5hZGRDbGFzcygnaG92ZXInKTtcclxuICAgICQoJy50cF90aXAnKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxufSxmdW5jdGlvbiAoKSB7XHJcbiAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdob3ZlcicpO1xyXG4gICAgJCgnLnRwX3RpcCcpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbn0pLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICQoJyN1cGxvYWRmaWxlJykuY2xpY2soKTtcclxufSk7XHJcblxyXG4vL+aOp+WItuaYr+WQpuWPr+S7peWPkemAgVxyXG4keXlpbV9lZGl0b3Iub24oJ2lucHV0IHByb3BlcnR5Y2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgaWYoJCh0aGlzKS52YWwoKSl7XHJcbiAgICAgICAgJGJ0bl9zZW5kLnJlbW92ZUNsYXNzKCdhZGl0LWJ0bi1zZW5kLWRpc2FibGVkJyk7XHJcbiAgICB9ZWxzZSB7XHJcbiAgICAgICAgJGJ0bl9zZW5kLmFkZENsYXNzKCdhZGl0LWJ0bi1zZW5kLWRpc2FibGVkJyk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLy/mlofku7bmjInpkq7ngrnlh7tcclxuJCgnLmpfbWVudV93aicpLmhvdmVyKGZ1bmN0aW9uICgpIHtcclxuICAgICQodGhpcykuYWRkQ2xhc3MoJ2hvdmVyJyk7XHJcbiAgICAkKCcud2pfdGlwJykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbn0sZnVuY3Rpb24gKCkge1xyXG4gICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaG92ZXInKTtcclxuICAgICQoJy53al90aXAnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG59KS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zb2xlLmxvZygn5Y+R6YCB5paH5Lu2Jyk7XHJcbn0pO1xyXG5cclxuLy/lj5HpgIHmjInpkq7ngrnlh7tcclxuJGJ0bl9zZW5kLm9uKCdjbGljaycsZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IHRvID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RhcmdldHVzZXJpZCcpO1xyXG4gICAgaWYoJHl5aW1fZWRpdG9yLnZhbCgpKXtcclxuICAgICAgICBZWUlNQ2hhdC5zZW5kVGV4dE1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICB0bzogdG8sIC8v5a+56K+d5Lq6aWRcclxuICAgICAgICAgICAgdHlwZTogXCJjaGF0XCIsICAvL2NoYXQ65Y2V6IGK77yMZ3JvdXBjZ2F0Oue+pOiBiixwdWJhY2NvdW50OuWFrOS8l+WPt1xyXG4gICAgICAgICAgICBjb250ZW50OiR5eWltX2VkaXRvci52YWwoKSwgLy/mtojmga/mlofmnKxcclxuICAgICAgICAgICAgZXh0ZW5kOiAnJywgIC8v5omp5bGV5a2X5q61XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChtc2cpIHtcclxuICAgICAgICAgICAgICAgICR5eWltX2VkaXRvci52YWwoJycpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cobXNnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pOyIsIlxyXG4vL2RvbeWFg+e0oFxyXG5pbXBvcnQge1xyXG4gICAgJGNoYXRfYm94LFxyXG4gICAgJGNoYXRzX2xpc3RcclxufSBmcm9tICcuL2pxZWxlbWVudHMnO1xyXG5cclxuLy/muLLmn5PogYrlpKnorrDlvZVcclxuaW1wb3J0IHJlbmRlckhpc3RvcnlNZXNzYWdlIGZyb20gJy4vcmVuZGVySGlzdG9yeU1lc3NhZ2UnO1xyXG5cclxuLy/ojrflj5bogYrlpKnljoblj7Is5Lyg5YWlc2Vzc2lvblZlcnNpb24saWTlkox0eXBl5Y+C5pWwXHJcbmV4cG9ydCBkZWZhdWx0IChzZXNzaW9uVmVyc2lvbiwgaWQsIHR5cGUpID0+IHtcclxuICAgIGxldCBlbmRWZXJzaW9uID0gc2Vzc2lvblZlcnNpb247XHJcbiAgICBsZXQgc3RhcnQgPSBlbmRWZXJzaW9uID4gMjAgPyBlbmRWZXJzaW9uIC0gMjAgOiAwO1xyXG4gICAgWVlJTUNoYXQuZ2V0SGlzdG9yeU1lc3NhZ2Uoe1xyXG4gICAgICAgIGlkOiBpZCxcclxuICAgICAgICB0eXBlOiB0eXBlLFxyXG4gICAgICAgIHN0YXJ0VmVyc2lvbjogc3RhcnQsXHJcbiAgICAgICAgZW5kVmVyc2lvbjogZW5kVmVyc2lvbixcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgICRjaGF0c19saXN0Lmh0bWwoJycpO1xyXG4gICAgICAgICAgICAkY2hhdF9ib3guc2hvdygpO1xyXG4gICAgICAgICAgICBpZiAocmVzLnJlc3VsdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICByZW5kZXJIaXN0b3J5TWVzc2FnZShyZXMucmVzdWx0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59OyIsIlxyXG4vL2RvbeWFg+e0oFxyXG5pbXBvcnQge1xyXG4gICAgJGhjb250YWN0c1xyXG59IGZyb20gJy4vanFlbGVtZW50cyc7XHJcblxyXG4vL+iOt+WPluacgOi/keiBlOezu+S6ulxyXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XHJcbiAgICAkaGNvbnRhY3RzLmh0bWwoJycpO1xyXG4gICAgLy8g5ouJ5Y+W5pGY6KaBXHJcbiAgICBZWUlNQ2hhdC5nZXRSZWNlbnREaWdzZXQoe1xyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgLy9yZXN1bHQubGlzdOaYr+acgOi/keiBlOezu+S6ulxyXG4gICAgICAgICAgICBpZiAocmVzdWx0Lmxpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQubGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGUsIGkpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8v6I635Y+W5Liq5Lq65L+h5oGvXHJcbiAgICAgICAgICAgICAgICAgICAgWVlJTUNoYXQuZ2V0VkNhcmQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogZS5qaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQudHMgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5uYW1lID0gcmVzdWx0Lm5pY2tuYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQucGhvdG8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5waG90byA9IHJlc3VsdC5waG90bztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnBob3RvID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRoY29udGFjdHNbMF0uaW5uZXJIVE1MICs9IGA8bGkgZGF0YS1zZXNzaW9uVmVyc2lvbj1cIiR7ZS5zZXNzaW9uVmVyc2lvbn1cIiBkYXRhLWlkPVwiJHtlLmlkfVwiIGRhdGEtdHlwZT1cIiR7ZS50eXBlfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImNsb3NlXCI+w5c8L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhdmF0YXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9pbWdzL2F2YXRhci5qcGdcIiBhbHQ9XCJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cIm5hbWUgY3V0dHh0XCI+JHtlLmlkfTwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIm1zZyBjdXR0eHRcIj4ke2UubGFzdE1lc3NhZ2UgJiYgZS5sYXN0TWVzc2FnZS5kYXRhLmNvbnRlbnRUeXBlID09PSAyID8gZS5sYXN0TWVzc2FnZS5kYXRhLmNvbnRlbnQgOiAnJ308L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cIm5ld3RpcCBjdXR0eHRcIj45OTwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6ZnVuY3Rpb24gKGVycil7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0iLCJcclxuZXhwb3J0IGNvbnN0ICR5eWltX2lvZ2luID0gJCgnLnl5aW0taW9naW4nKTsvL+eZu+mZhuahhlxyXG5leHBvcnQgY29uc3QgJGxvZ2luX3VzZXJuYW1lID0gJCgnLmxvZ2luLXVzZXJuYW1lJyk7Ly/nmbvpmYbnlKjmiLflkI1cclxuZXhwb3J0IGNvbnN0ICRsb2dpbl9idG4gPSAkKCcubG9naW4tYnRuJyk7Ly/nmbvpmYbmjInpkq5cclxuZXhwb3J0IGNvbnN0ICR5eWltX21haW4gPSAkKCcueXlpbS1tYWluJyk7Ly/ogYrlpKnmnIDlpJblsYLnqpflj6NcclxuZXhwb3J0IGNvbnN0ICRqX21vdmUgPSAkKCcual9tb3ZlJyk7Ly/ogYrlpKnnqpflj6PlpLRcclxuZXhwb3J0IGNvbnN0ICRoY29udGFjdHMgPSAkKCcuaGNvbnRhY3RzJyk7Ly/mnIDov5HogZTns7vkurrmoYZcclxuZXhwb3J0IGNvbnN0ICR5eWltX2JveCA9ICQoJy55eWltLWJveCcpOy8v6IGK5aSp5qGGXHJcbmV4cG9ydCBjb25zdCAkal9icV9ib3ggPSAkKCcual9icV9ib3gnKTsvL+ihqOaDheebkuWtkFxyXG5leHBvcnQgY29uc3QgJHl5aW1fZWRpdG9yID0gJCgnLnl5aW0tZWRpdG9yJyk7Ly/ogYrlpKnovpPlhaXmoYZcclxuZXhwb3J0IGNvbnN0ICRidG5fc2VuZCA9ICQoJy5hZGl0LWJ0bi1zZW5kJyk7IC8v5Y+R6YCB5oyJ6ZKuXHJcbmV4cG9ydCBjb25zdCAkY2hhdF9ib3ggPSAkKCcuY2hhdC1ib3gnKTsgLy/mjqfliLbmmK/lkKblhbfmnInogYrlpKnlhoXlrrlcclxuZXhwb3J0IGNvbnN0ICRjaGF0c19saXN0ID0gJCgnLmNoYXRzLWxpc3QnKTsgLy/ogYrlpKnkv6Hmga/liJfooagiLCIvL2RvbeWFg+e0oFxyXG5pbXBvcnQge1xyXG4gICAgJGpfYnFfYm94LFxyXG4gICAgJGNoYXRzX2xpc3RcclxufSBmcm9tICcuL2pxZWxlbWVudHMnO1xyXG5pbXBvcnQgeyBleHByZXNzaW9uTGlzdCB9IGZyb20gJy4vY29uc3RhbnRzJztcclxuXHJcbi8v5pS+572u6KGo5oOF5YiX6KGoXHJcbiRqX2JxX2JveC5odG1sKGV4cHJlc3Npb25MaXN0LmRhdGEubWFwKCh0KSA9PiB7XHJcbiAgICByZXR1cm4gYDxsaSBkYXRhLWNvZGU9XCIke3QuYWN0aW9uRGF0YX1cIj48aW1nIHNyYz1cIiR7ZXhwcmVzc2lvbkxpc3QucGF0aCt0LnVybH1cIiB0aXRsZT1cIiR7dC5hY3Rpb25EYXRhfVwiIGFsdD1cIlwiPjwvbGk+YDtcclxufSkpO1xyXG5cclxuLy/nlKjlm77niYfmm7/mjaLmlofmnKzmtojmga/kuK3ooajmg4Xkv6Hmga9cclxuY29uc3QgcmVwbGFjZUVtb2ppID0gKHN0cikgPT4ge1xyXG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXFtbXlxcW1xcXV0rXFxdL2csKGUpID0+IHtcclxuICAgICAgICBsZXQgaSA9IC0xO1xyXG4gICAgICAgIGRve1xyXG4gICAgICAgICAgICBpICsrO1xyXG4gICAgICAgIH13aGlsZSAoZSAhPT0gZXhwcmVzc2lvbkxpc3QuZGF0YVtpXS5hY3Rpb25EYXRhKTtcclxuICAgICAgICByZXR1cm4gYDxpbWcgc3JjPVwiJHtleHByZXNzaW9uTGlzdC5wYXRoICsgZXhwcmVzc2lvbkxpc3QuZGF0YVtpXS51cmx9XCIgYWx0PVwiXCIgLz5gO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vL+a4suafk+iBiuWkqeiusOW9lSznm7TmjqXkvKDlhaXogYrlpKnorrDlvZXliJfooajljbPlj69cclxuZXhwb3J0IGRlZmF1bHQgKGNoYXRzKSA9PiB7XHJcbiAgICBsZXQgY2hhdHNTdHIgPSAnJztcclxuICAgIGxldCBteWlkID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudHVzZXJpbmZvJykpLmlkO1xyXG4gICAgY2hhdHMuZm9yRWFjaChmdW5jdGlvbihjaGF0LCBpKXtcclxuICAgICAgICBsZXQgaXNmcm9tbWUgPSBteWlkID09PSBjaGF0LmZyb207XHJcbiAgICAgICAgaWYoY2hhdC5kYXRhLmNvbnRlbnRUeXBlID09PSAyKXtcclxuICAgICAgICAgICAgY2hhdHNTdHIgKz0gYDxsaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGF0LXRpcFwiPiR7bmV3IERhdGUoY2hhdC5kYXRlbGluZSkudG9Mb2NhbGVUaW1lU3RyaW5nKCl9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hhdC1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiR7IGlzZnJvbW1lPyAnY2hhdC1hdmF0YXIgY2hhdC1hdmF0YXItc2VuZCcgOidjaGF0LWF2YXRhcid9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9pbWdzL2F2YXRhci5qcGdcIiBhbHQ9XCJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHsgaXNmcm9tbWU/ICdjaGF0LXR4dCBjaGF0LXR4dC1zZW5kJyA6J2NoYXQtdHh0J31cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoYXQtdXNlci1uYW1lXCI+JHtjaGF0LmZyb219PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGF0LW1zZ1wiPiR7cmVwbGFjZUVtb2ppKGNoYXQuZGF0YS5jb250ZW50KX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPiBgO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgJGNoYXRzX2xpc3QuaHRtbChjaGF0c1N0cik7XHJcbn07IiwiLy/lhYPntKBcclxuaW1wb3J0IHsgJHl5aW1faW9naW4sICR5eWltX2JveCB9IGZyb20gJy4vanFlbGVtZW50cyc7XHJcblxyXG4vL+eUqOaIt+eZu+mZhu+8jOS8oOWFpeeUqOaIt+WQjSjmmoLml7blhpnmrbvkuLp6b25ndGbvvIzlm6DkuLrlhbbku5bnmoTms6jlhozkuI3miJDlip8pXHJcbmV4cG9ydCBkZWZhdWx0ICh1c2VybmFtZSkgPT4ge1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICdodHRwOi8vMTcyLjIwLjE1LjYwL3N5c2FkbWluL3Jlc3QveW9ueW91L2ltX3ByZS90b2tlbicsXHJcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgaGVhZGVyczoge1wiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwifSxcclxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIFwidXNlcm5hbWVcIjpcInpvbmd0ZlwiLFxyXG4gICAgICAgICAgICBcImNsaWVudElkXCI6XCJiMjZiYTUxMDU4ZWVlOWRiNGY4OGE3YTJiMWJkMWIwNlwiLFxyXG4gICAgICAgICAgICBcImNsaWVudFNlY3JldFwiOlwiQ0M5QTcxRTBDMjUyOEVEQjE2NTJERkIxOEVDRThEREZcIlxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgbGV0IGNsaWVudElkZW50aWZ5ID0gXCJwY1wiICsgU3RyaW5nKG5ldyBEYXRlKCkuZ2V0VGltZSgpKTtcclxuICAgICAgICAgICAgJHl5aW1faW9naW4uaGlkZSgpO1xyXG4gICAgICAgICAgICAkeXlpbV9ib3guc2hvdygpO1xyXG4gICAgICAgICAgICAvL+eZu+mZhllZSU1TREtcclxuICAgICAgICAgICAgWVlJTUNoYXQubG9naW4oe1xyXG4gICAgICAgICAgICAgICAgXCJ1c2VybmFtZVwiOiAnem9uZ3RmJyxcclxuICAgICAgICAgICAgICAgIFwidG9rZW5cIjogcmVzdWx0LnRva2VuLFxyXG4gICAgICAgICAgICAgICAgXCJleHBpcmF0aW9uXCI6IHJlc3VsdC5leHBpcmF0aW9uLFxyXG4gICAgICAgICAgICAgICAgXCJhcHBUeXBlXCI6IDQsXHJcbiAgICAgICAgICAgICAgICBcImlkZW50aWZ5XCI6IGNsaWVudElkZW50aWZ5XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChhcmcpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYXJnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9