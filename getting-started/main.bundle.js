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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbnRyb2xFdmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZ2V0SGlzdG9yeU1lc3NhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2dldFJlY2VudERpZ3NldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvanFlbGVtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcmVuZGVySGlzdG9yeU1lc3NhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VzZXJMb2dpbi5qcyJdLCJuYW1lcyI6WyJZWUlNQ2hhdCIsImluaXRTREsiLCJhcHAiLCJldHAiLCJ3c3VybCIsIndzcG9ydCIsImhicG9ydCIsInNlcnZsZXQiLCJmbGFzaF9zd2ZfdXJsIiwibG9nRW5hYmxlIiwiY2xpZW50TWFyayIsImFwaUtleSIsImluaXQiLCJvbk9wZW5lZCIsInNldFByZXNlbmNlIiwiZ2V0VkNhcmQiLCJzdWNjZXNzIiwicmVzIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJvbkV4cGlyYXRpb24iLCJjYWxsYmFjayIsIm9uQ2xvc2VkIiwiYXJnIiwib25Db25mbGljdGVkIiwib25DbGllbnRLaWNrb3V0Iiwib25VcGRhdGVQYXNzd29yZCIsIm9uQXV0aEVycm9yIiwib25Db25uZWN0RXJyb3IiLCJvblJlY2VpcHRzIiwib25TdWJzY3JpYmUiLCJvblJvc3RlckZhdm9yaXRlZCIsIm9uUm9zdGVyVXBkYXRlZGVkIiwib25NZXNzYWdlIiwiY29uc29sZSIsImxvZyIsIm9uR3JvdXBVcGRhdGUiLCJvbktpY2tlZE91dEdyb3VwIiwib25UcmFuc2Zlckdyb3VwT3duZXIiLCJvblByZXNlbmNlIiwib25Sb3N0ZXJEZWxldGVkIiwib25QdWJhY2NvdW50VXBkYXRlIiwicHViYWNjb3VudHMiLCJvblRyYW5zcGFyZW50TWVzc2FnZSIsImV4cHJlc3Npb25MaXN0IiwicGF0aCIsImRhdGEiLCJhY3Rpb25EYXRhIiwiZ2V0SXRlbSIsInBhcnNlIiwidXNlcm5hbWUiLCJjbGljayIsInZhbCIsInRlc3QiLCIkIiwiaGFzQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwiY3NzIiwibGVmdCIsInRvcCIsImNsZWFyIiwiaGlkZSIsInNob3ciLCJvbiIsImUiLCJvcmlnaW5YIiwicGFnZVgiLCJvcmlnaW5ZIiwicGFnZVkiLCJib3hQb3MiLCJwb3NpdGlvbiIsIm9mZiIsImtleXdvcmQiLCJrZXlDb2RlIiwicXVlcnlSb3N0ZXJJdGVtIiwiYXR0ciIsImhvdmVyIiwidG9nZ2xlIiwidG8iLCJzZW5kVGV4dE1lc3NhZ2UiLCJ0eXBlIiwiY29udGVudCIsImV4dGVuZCIsIm1zZyIsInNlc3Npb25WZXJzaW9uIiwiaWQiLCJlbmRWZXJzaW9uIiwic3RhcnQiLCJnZXRIaXN0b3J5TWVzc2FnZSIsInN0YXJ0VmVyc2lvbiIsImh0bWwiLCJyZXN1bHQiLCJsZW5ndGgiLCJnZXRSZWNlbnREaWdzZXQiLCJsaXN0IiwiZm9yRWFjaCIsImkiLCJqaWQiLCJ0cyIsIm5hbWUiLCJuaWNrbmFtZSIsInBob3RvIiwiaW5uZXJIVE1MIiwibGFzdE1lc3NhZ2UiLCJjb250ZW50VHlwZSIsImVycm9yIiwiZXJyIiwiY29tcGxldGUiLCIkeXlpbV9pb2dpbiIsIiRsb2dpbl91c2VybmFtZSIsIiRsb2dpbl9idG4iLCIkeXlpbV9tYWluIiwiJGpfbW92ZSIsIiRoY29udGFjdHMiLCIkeXlpbV9ib3giLCIkal9icV9ib3giLCIkeXlpbV9lZGl0b3IiLCIkYnRuX3NlbmQiLCIkY2hhdF9ib3giLCIkY2hhdHNfbGlzdCIsIm1hcCIsInQiLCJ1cmwiLCJyZXBsYWNlRW1vamkiLCJzdHIiLCJyZXBsYWNlIiwiY2hhdHMiLCJjaGF0c1N0ciIsIm15aWQiLCJjaGF0IiwiaXNmcm9tbWUiLCJmcm9tIiwiRGF0ZSIsImRhdGVsaW5lIiwidG9Mb2NhbGVUaW1lU3RyaW5nIiwiYWpheCIsImRhdGFUeXBlIiwiaGVhZGVycyIsImNsaWVudElkZW50aWZ5IiwiU3RyaW5nIiwiZ2V0VGltZSIsImxvZ2luIiwidG9rZW4iLCJleHBpcmF0aW9uIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEVBOztBQUdBOzs7Ozs7QUFFQTtBQU5BO0FBT0FBLFNBQVNDLE9BQVQsQ0FBaUI7QUFDYkMsU0FBSyxRQURRLEVBQ0U7QUFDZkMsU0FBSyxRQUZRLEVBRUU7QUFDZkMsV0FBTyxjQUhNLEVBR1U7QUFDdkJDLFlBQVEsSUFKSyxFQUlDO0FBQ2RDLFlBQVEsSUFMSyxFQUtDO0FBQ2RDLGFBQVMsc0JBTkksRUFNb0I7QUFDakNDLG1CQUFlLGlCQVBGLEVBT3FCO0FBQ2xDQyxlQUFXLElBUkUsRUFRSTtBQUNqQkMsZ0JBQVksS0FUQyxFQVNNO0FBQ25CQyxZQUFRO0FBVkssQ0FBakI7O0FBYUE7OztBQWpCQTtBQWtCQVgsU0FBU1ksSUFBVCxDQUFjO0FBQ1ZDLGNBQVUsb0JBQVc7QUFDakI7QUFDQWIsaUJBQVNjLFdBQVQ7QUFDQTtBQUNBZCxpQkFBU2UsUUFBVCxD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RWtGLElBQUYsQ0FBTztBQUNIYixhQUFLLHVEQURGO0FBRUgxQyxjQUFNLE1BRkg7QUFHSHdELGtCQUFVLE1BSFA7QUFJSEMsaUJBQVMsRUFBQyxnQkFBZ0Isa0JBQWpCLEVBSk47QUFLSDVGLGNBQU01QixLQUFLQyxTQUFMLENBQWU7QUFDakIsd0JBQVcsUUFETTtBQUVqQix3QkFBVyxrQ0FGTTtBQUdqQiw0QkFBZTtBQUhFLFNBQWYsQ0FMSDtBQVVITCxpQkFBUyxpQkFBVThFLE1BQVYsRUFBa0I7QUFDdkIsZ0JBQUkrQyxpQkFBaUIsT0FBT0MsT0FBTyxJQUFJUCxJQUFKLEdBQVdRLE9BQVgsRUFBUCxDQUE1QjtBQUNBLG9DQUFZL0UsSUFBWjtBQUNBLGtDQUFVQyxJQUFWO0FBQ0E7QUFDQWpFLHFCQUFTZ0osS0FBVCxDQUFlO0FBQ1gsNEJBQVksUUFERDtBQUVYLHlCQUFTbEQsT0FBT21ELEtBRkw7QUFHWCw4QkFBY25ELE9BQU9vRCxVQUhWO0FBSVgsMkJBQVcsQ0FKQTtBQUtYLDRCQUFZTDtBQUxELGFBQWY7QUFPSCxTQXRCRTtBQXVCSGpDLGVBQU8sZUFBVW5GLEdBQVYsRUFBZTtBQUNsQlcsb0JBQVFDLEdBQVIsQ0FBWVosR0FBWjtBQUNIO0FBekJFLEtBQVA7QUEyQkgsQyxFQWhDRCxJIiwiZmlsZSI6Im1haW4uYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiLy/liqDovb3kuovku7bmk43kvZxcclxuaW1wb3J0ICcuL2pzL2NvbnRyb2xFdmVudCc7XHJcblxyXG4vL+iOt+WPluacgOi/keiBlOezu+S6ulxyXG5pbXBvcnQgZ2V0UmVjZW50RGlnc2V0IGZyb20gJy4vanMvZ2V0UmVjZW50RGlnc2V0JztcclxuXHJcbi8v5Yid5aeL5YyWU0RLXHJcbllZSU1DaGF0LmluaXRTREsoe1xyXG4gICAgYXBwOiAnaW1fcHJlJywgLy9hcHBJZFxyXG4gICAgZXRwOiAneW9ueW91JywgLy9ldHBJZFxyXG4gICAgd3N1cmw6ICcxNzIuMjAuMTUuNjAnLCAvL3dlYnNvY2tldCBVcmxcclxuICAgIHdzcG9ydDogNTIyNywgLy93ZWJzb2NrZXQgcG9ydCA1MjI3LzUyMjIvNTIyNVxyXG4gICAgaGJwb3J0OiA3MDc1LCAvL2h0dHBiaW5kICBwb3J0IDcwNzUvNzA3MFxyXG4gICAgc2VydmxldDogJ2h0dHA6Ly8xNzIuMjAuMTUuNjAvJywgLy9yZXN0IFVybFxyXG4gICAgZmxhc2hfc3dmX3VybDogJ3h4eC94L01veGllLnN3ZicsIC8vZmxhc2gg5LiK5LygIHN3ZuaWh+S7tuS9jee9rlxyXG4gICAgbG9nRW5hYmxlOiB0cnVlLCAvL2NsaWVudCBsb2dcclxuICAgIGNsaWVudE1hcms6ICd3ZWInLCAvL2NsaWVudCBtYXJrICd3ZWInIG9yICdwYydcclxuICAgIGFwaUtleTogXCI4NWRlNzliOWY3ZTM0YzM3YTk5YWNjYWRkYjI1Njk5MFwiXHJcbn0pO1xyXG5cclxuLy/liJ3lp4vljJblm57osIPmlrnms5VcclxuWVlJTUNoYXQuaW5pdCh7XHJcbiAgICBvbk9wZW5lZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g55m75b2V5oiQ5YqfXHJcbiAgICAgICAgWVlJTUNoYXQuc2V0UHJlc2VuY2UoKTtcclxuICAgICAgICAvLyDojrflj5boh6rlt7Hkv6Hmga9cclxuICAgICAgICBZWUlNQ2hhdC5nZXRWQ2FyZCh7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICAgIC8v5L+d5a2Y6Ieq5bex55qE5L+h5oGvXHJcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY3VycmVudHVzZXJpbmZvJywgSlNPTi5zdHJpbmdpZnkocmVzKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvL+iOt+WPluacgOi/keiBlOezu+S6ulxyXG4gICAgICAgIGdldFJlY2VudERpZ3NldCgpO1xyXG4gICAgfSxcclxuICAgIG9uRXhwaXJhdGlvbjogZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuICAgICAgICAvL+iHquWKqOabtOaWsHRva2VuXHJcbiAgICAgICAgLy8gY2FsbGJhY2sodG9rZW4sIGV4cGlyYXRpb24pO1xyXG4gICAgfSxcclxuICAgIG9uQ2xvc2VkOiBmdW5jdGlvbihhcmcpIHtcclxuICAgICAgICAvL+i/nuaOpeWFs+mXrVxyXG4gICAgfSxcclxuICAgIG9uQ29uZmxpY3RlZDogZnVuY3Rpb24oYXJnKSB7XHJcbiAgICAgICAgLy/nmbvpmYblhrLnqoFcclxuICAgIH0sXHJcbiAgICBvbkNsaWVudEtpY2tvdXQ6IGZ1bmN0aW9uKGFyZykge1xyXG4gICAgICAgIC8v6KKr5LuW56uv6Lii5o6JXHJcbiAgICB9LFxyXG4gICAgb25VcGRhdGVQYXNzd29yZDogZnVuY3Rpb24oYXJnKSB7XHJcbiAgICAgICAgLy/mm7TmlLnlr4bnoIHvvIzooqvouKLmjolcclxuICAgIH0sXHJcbiAgICBvbkF1dGhFcnJvcjogZnVuY3Rpb24oYXJnKSB7XHJcbiAgICAgICAgLy/nmbvpmYborqTor4HlpLHotKVcclxuICAgIH0sXHJcbiAgICBvbkNvbm5lY3RFcnJvcjogZnVuY3Rpb24oYXJnKSB7XHJcbiAgICAgICAgLy/ov57mjqXlpLHotKVcclxuICAgIH0sXHJcbiAgICBvblJlY2VpcHRzOiBmdW5jdGlvbihhcmcpIHtcclxuICAgICAgICAvL+a2iOaBr+WbnuaJp1xyXG4gICAgfSxcclxuICAgIG9uU3Vic2NyaWJlOiBmdW5jdGlvbihhcmcpIHtcclxuICAgICAgICAvL+WPkeeUn+iuoumYhVxyXG4gICAgfSxcclxuICAgIG9uUm9zdGVyRmF2b3JpdGVkOiBmdW5jdGlvbihhcmcpIHtcclxuICAgICAgICAvL+iiq+aUtuiXj1xyXG4gICAgfSxcclxuICAgIG9uUm9zdGVyVXBkYXRlZGVkOiBmdW5jdGlvbihhcmcpIHtcclxuICAgICAgICAvL+WlveWPi+S/oeaBr+abtOaUuVxyXG4gICAgfSxcclxuICAgIG9uTWVzc2FnZTogZnVuY3Rpb24oYXJnKSB7XHJcbiAgICAgICAgLy/mlLbliLDmtojmga9cclxuICAgICAgICBjb25zb2xlLmxvZygn5pS25Yiw5raI5oGv5LqG77yaJywgYXJnKTtcclxuICAgIH0sXHJcbiAgICBvbkdyb3VwVXBkYXRlOiBmdW5jdGlvbihhcmcpIHtcclxuICAgICAgICAvL+e+pOe7hOabtOaWsFxyXG4gICAgfSxcclxuICAgIG9uS2lja2VkT3V0R3JvdXA6IGZ1bmN0aW9uKGFyZykge1xyXG4gICAgICAgIC8v576k5oiQ5ZGY6KKr576k5Li75o+Q5Ye6XHJcbiAgICB9LFxyXG4gICAgb25UcmFuc2Zlckdyb3VwT3duZXI6IGZ1bmN0aW9uKGFyZyl7XHJcbiAgICAgICAgLy/nvqTkuLvovazorqlcclxuICAgIH0sXHJcbiAgICBvblByZXNlbmNlOiBmdW5jdGlvbihhcmcpIHtcclxuICAgICAgICAvL+WlveWPi3ByZXNlbmNl5pS55Y+YXHJcbiAgICB9LFxyXG4gICAgb25Sb3N0ZXJEZWxldGVkOiBmdW5jdGlvbihhcmcpIHtcclxuICAgICAgICAvL+WlveWPi+iiq+WIoOmZpFxyXG4gICAgfSxcclxuICAgIG9uUHViYWNjb3VudFVwZGF0ZTogZnVuY3Rpb24ocHViYWNjb3VudHMpIHtcclxuICAgICAgICAvL+WFrOWFseWPt+S/oeaBr+abtOaWsFxyXG4gICAgfSxcclxuICAgIG9uVHJhbnNwYXJlbnRNZXNzYWdlOiBmdW5jdGlvbihhcmcpIHtcclxuICAgICAgICAvL+mAj+S8oOS4muWKoea2iOaBr1xyXG4gICAgfVxyXG59KTtcclxuXHJcbiIsImV4cG9ydCBjb25zdCBleHByZXNzaW9uTGlzdCA9IHtcclxuICAgIHBhdGg6IFwiLi9pbWdzL2JxL1wiLFxyXG4gICAgZGF0YTogW1xyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6b6H54mZXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fY2l5YUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5ZOI5ZOIXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25faGFoYUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5pmVXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25feXVuQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmsZddXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9oYW5iQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlrrPnvp5dXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9oYWl4QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvosIPnmq5dXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl90aWFvcEAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb55aR6ZeuXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25feWl3QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmjYLohLhdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl93dWxpYW5AMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WluOeskV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2ppYW54aWFvQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmnLrmmbpdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9zbWFydEAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5b6X5oSPXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fZGV5aUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb56yRY3J5XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fbGF1Z2hpbmdfdGVhcnNAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+a1geazql1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2NyeWluZ0AyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5aWL5paXXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fZmVuZG91QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmirHmirFdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9odWdAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+eUn+eXhV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2lsbEAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5bC05bCsXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fZ2FuZ2FAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WBt+eskV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3RvdXhAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+i1nl1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3phbkAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5o+h5omLXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fd29zQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIltPS11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX29rQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlt5ZWFrXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25feWVha0AyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6byT5o6MXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fZ3V6QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmi7PlpLRdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9xdWFudG91QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvogozogoldXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9qaXJvdUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5o+h5ouzXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fd29xQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmi5zmiZhdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9iYWl0QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmhInlv6tdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl95dWtAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+mavui/h11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX25hbmd1b0AyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6Zet5Zi0XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fYml6dWlAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WbsF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2t1bkAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb54yq5aS0XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fcGlnQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvniLHlv4NdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9oZWFydEAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5b+D56KOXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25feGluc3VpQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvnpLznm5JdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9ib3hAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WQu11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2tpc3NhQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvnjqvnkbDoirFdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9yb3NlQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmo5Lmo5Lns5ZdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9jYW5keUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5pma5a6JXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fbmlnaHRAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+eliOelt11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3ByYXlAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+e7meWKm11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2dlaWxpQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvouKldXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9jYWlAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+S6suS6sl1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2tpc3NiQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlmJhdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl94dUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6ImyXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fc2VAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WPr+aAnF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2tlbGlhbkAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5Y+R5ZGGXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fZmFkYWlAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+Wkp+WTrV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2NyeWFAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WbsFp6el1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3p6ekAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5oCd6ICDXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fc2lrYW9AMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+eZveecvF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2JhaXlAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WCsuaFol1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2FvbWFuQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvphbddXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9rdUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5ZunXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25famlvbmdAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+mEmeinhl1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2Jpc0AyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6aWl6aW/XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25famllQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlkJNdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl94aWFAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+aKoOm8u11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2tvdWJpQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmg4rorrZdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9qaW5neUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5Y+R5oCSXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fYW5ncnlAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+aDiuaBkF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2ppbmdrQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlkJBdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl90dUAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5ouc5oucXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fYnllQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlkpbllaFdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9jb2ZmZWVAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WVpOmFkl1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2JlZXJAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+S4i+mbqF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3JhaW5AMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+mXqueUtV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3NoYW5kQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvkuIvpm6pdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9zbm93QDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvotrPnkINdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9iYWxsQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvnr67nkINdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9iYXNrZXRAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+mjnuacul1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3BsYW5lQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvpgq7ku7ZdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9tYWlsQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvpm6jkvJ5dXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl95dXNhbkAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5aWW5p2vXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25famlhbmdiQDJ4LnBuZ1wiIH0sXHJcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmgKrnialdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9ndWFpd3VAMngucG5nXCIgfSxcclxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+iNr11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX21lZEAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb54K45by5XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25femhhZEAyeC5wbmdcIiB9LFxyXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6JuL57OVXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fY2FrZUAyeC5wbmdcIiB9XHJcbiAgICBdXHJcbn07IiwiLy9kb23lhYPntKBcclxuaW1wb3J0IHtcclxuICAgICR5eWltX2lvZ2luLFxyXG4gICAgJHl5aW1fYm94LFxyXG4gICAgJHl5aW1fbWFpbixcclxuICAgICRqX21vdmUsXHJcbiAgICAkal9icV9ib3gsXHJcbiAgICAkeXlpbV9lZGl0b3IsXHJcbiAgICAkYnRuX3NlbmQsXHJcbiAgICAkbG9naW5fdXNlcm5hbWUsXHJcbiAgICAkbG9naW5fYnRuLFxyXG4gICAgJGhjb250YWN0c1xyXG59IGZyb20gJy4vanFlbGVtZW50cyc7XHJcbi8v55So5oi355m76ZmGXHJcbmltcG9ydCB1c2VyTG9naW4gZnJvbSAnLi91c2VyTG9naW4nO1xyXG4vL+iOt+WPluWOhuWPsuiBiuWkqeiusOW9lVxyXG5pbXBvcnQgZ2V0SGlzdG9yeU1lc3NhZ2UgZnJvbSAnLi9nZXRIaXN0b3J5TWVzc2FnZSc7XHJcblxyXG5cclxuLy/kuLTml7boh6rliqjnmbvlvZXnmoRcclxuaWYobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnR1c2VyaW5mbycpKXtcclxuICAgIHVzZXJMb2dpbihKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW50dXNlcmluZm8nKSkudXNlcm5hbWUpO1xyXG59XHJcbi8v55So5oi355m76ZmGXHJcbiRsb2dpbl9idG4uY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IHVzZXJuYW1lID0gJGxvZ2luX3VzZXJuYW1lLnZhbCgpO1xyXG4gICAgaWYoL15bYS16XVthLXpfMC05XSokLy50ZXN0KHVzZXJuYW1lKSl7XHJcbiAgICAgICAgdXNlckxvZ2luKHVzZXJuYW1lKTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vL+acgOWkp+WMluaMiemSrueCueWHu1xyXG4kKCcuc2NhbGVjaGF0JykuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgJHl5aW1fbWFpbi5oYXNDbGFzcygnbWF4d2luZG93JykgPyAkeXlpbV9tYWluLnJlbW92ZUNsYXNzKCdtYXh3aW5kb3cnKSA6ICR5eWltX21haW4uYWRkQ2xhc3MoJ21heHdpbmRvdycpO1xyXG4gICAgJHl5aW1fbWFpbi5jc3Moe2xlZnQ6ICcwJywgdG9wOiAnMCd9KTtcclxufSk7XHJcblxyXG4vL+WFs+mXreeql+WPo+aMiemSrueCueWHu1xyXG4kKCcuY2xvc2VjaGF0JykuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XHJcbiAgICAkeXlpbV9ib3guaGlkZSgpO1xyXG4gICAgJHl5aW1faW9naW4uc2hvdygpO1xyXG59KTtcclxuXHJcbi8v56e75Yqo5LqL5Lu2XHJcbiRqX21vdmUub24oJ21vdXNlZG93bicsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICBsZXQgb3JpZ2luWCA9IGUucGFnZVg7XHJcbiAgICBsZXQgb3JpZ2luWSA9IGUucGFnZVk7XHJcbiAgICBsZXQgYm94UG9zID0gJHl5aW1fbWFpbi5wb3NpdGlvbigpO1xyXG4gICAgJGpfbW92ZS5vbignbW91c2Vtb3ZlJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAkeXlpbV9tYWluLmNzcyh7bGVmdDogKGJveFBvcy5sZWZ0ICsgZS5wYWdlWCAtIG9yaWdpblgpICsgJ3B4JywgdG9wOiAoYm94UG9zLnRvcCArIGUucGFnZVkgLSBvcmlnaW5ZKSArICdweCd9KTtcclxuICAgIH0pO1xyXG59KTtcclxuJGpfbW92ZS5vbignbW91c2V1cCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICQodGhpcykub2ZmKCdtb3VzZW1vdmUnKTtcclxufSk7XHJcblxyXG5cclxuLy/mkJzntKLlpb3lj4tcclxuJCgnLnl5aW0tc2VhcmNoJykub24oJ2tleWRvd24nLGZ1bmN0aW9uIChlKSB7XHJcbiAgICBsZXQga2V5d29yZCA9ICQodGhpcykudmFsKCk7XHJcbiAgICBpZihlLmtleUNvZGUgPT09IDEzICYmIGtleXdvcmQpe1xyXG4gICAgICAgIC8v5pCc57Si6IGU57O75Lq6XHJcbiAgICAgICAgWVlJTUNoYXQucXVlcnlSb3N0ZXJJdGVtKHtcclxuICAgICAgICAgICAga2V5d29yZDoga2V5d29yZCxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8v6IGU57O75Lq654K55Ye7XHJcbiRoY29udGFjdHMub24oJ2NsaWNrJywnbGknLGZ1bmN0aW9uICgpIHtcclxuICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RhcmdldHVzZXJpZCcsICQodGhpcykuYXR0cignZGF0YS1pZCcpKTsvL+S/neWtmOiBiuWkqeWvueaWuWlk77yM55So5LqO5Y+R6YCB5raI5oGvXHJcbiAgICBnZXRIaXN0b3J5TWVzc2FnZSgkKHRoaXMpLmF0dHIoJ2RhdGEtc2Vzc2lvblZlcnNpb24nKSwgJCh0aGlzKS5hdHRyKCdkYXRhLWlkJyksICQodGhpcykuYXR0cignZGF0YS10eXBlJykpO1xyXG59KTtcclxuXHJcbi8v5YWz6Zet6IGU57O75Lq654K55Ye7XHJcbiRoY29udGFjdHMub24oJ2NsaWNrJywnLmNsb3NlJyxmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zb2xlLmxvZygn5YWz6ZetJyk7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn0pO1xyXG5cclxuLy/pmaTkuoboh6rlt7Hngrnlh7vlhbbku5bpg6jliIbpmpDol4/ooajmg4XmoYZcclxuJCgnYm9keScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICRqX2JxX2JveC5oaWRlKCk7XHJcbn0pO1xyXG5cclxuLy/ooajmg4XmjInpkq7ngrnlh7tcclxuJCgnLmpfbWVudV9icScpLmhvdmVyKGZ1bmN0aW9uICgpIHtcclxuICAgICQodGhpcykuYWRkQ2xhc3MoJ2hvdmVyJyk7XHJcbiAgICAkKCcuYnFfdGlwJykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbn0sZnVuY3Rpb24gKCkge1xyXG4gICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaG92ZXInKTtcclxuICAgICQoJy5icV90aXAnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG59KS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAkal9icV9ib3gudG9nZ2xlKCk7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn0pO1xyXG5cclxuLy/ooajmg4Xngrnlh7tcclxuJGpfYnFfYm94Lm9uKCdjbGljaycsICdsaScsIGZ1bmN0aW9uICgpIHtcclxuICAgICR5eWltX2VkaXRvci52YWwoJHl5aW1fZWRpdG9yLnZhbCgpICsgJCh0aGlzKS5hdHRyKCdkYXRhLWNvZGUnKSk7XHJcbiAgICBpZigkeXlpbV9lZGl0b3IudmFsKCkpe1xyXG4gICAgICAgICRidG5fc2VuZC5yZW1vdmVDbGFzcygnYWRpdC1idG4tc2VuZC1kaXNhYmxlZCcpO1xyXG4gICAgfWVsc2Uge1xyXG4gICAgICAgICRidG5fc2VuZC5hZGRDbGFzcygnYWRpdC1idG4tc2VuZC1kaXNhYmxlZCcpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59KTtcclxuXHJcbi8v5Zu+54mH5oyJ6ZKu54K55Ye7XHJcbiQoJy5qX21lbnVfdHAnKS5ob3ZlcihmdW5jdGlvbiAoKSB7XHJcbiAgICAkKHRoaXMpLmFkZENsYXNzKCdob3ZlcicpO1xyXG4gICAgJCgnLnRwX3RpcCcpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG59LGZ1bmN0aW9uICgpIHtcclxuICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2hvdmVyJyk7XHJcbiAgICAkKCcudHBfdGlwJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxufSkuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgJCgnI3VwbG9hZGZpbGUnKS5jbGljaygpO1xyXG59KTtcclxuXHJcbi8v5o6n5Yi25piv5ZCm5Y+v5Lul5Y+R6YCBXHJcbiR5eWltX2VkaXRvci5vbignaW5wdXQgcHJvcGVydHljaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZigkKHRoaXMpLnZhbCgpKXtcclxuICAgICAgICAkYnRuX3NlbmQucmVtb3ZlQ2xhc3MoJ2FkaXQtYnRuLXNlbmQtZGlzYWJsZWQnKTtcclxuICAgIH1lbHNlIHtcclxuICAgICAgICAkYnRuX3NlbmQuYWRkQ2xhc3MoJ2FkaXQtYnRuLXNlbmQtZGlzYWJsZWQnKTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vL+aWh+S7tuaMiemSrueCueWHu1xyXG4kKCcual9tZW51X3dqJykuaG92ZXIoZnVuY3Rpb24gKCkge1xyXG4gICAgJCh0aGlzKS5hZGRDbGFzcygnaG92ZXInKTtcclxuICAgICQoJy53al90aXAnKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxufSxmdW5jdGlvbiAoKSB7XHJcbiAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdob3ZlcicpO1xyXG4gICAgJCgnLndqX3RpcCcpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbn0pLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnNvbGUubG9nKCflj5HpgIHmlofku7YnKTtcclxufSk7XHJcblxyXG4vL+WPkemAgeaMiemSrueCueWHu1xyXG4kYnRuX3NlbmQub24oJ2NsaWNrJyxmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgdG8gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGFyZ2V0dXNlcmlkJyk7XHJcbiAgICBpZigkeXlpbV9lZGl0b3IudmFsKCkpe1xyXG4gICAgICAgIFlZSU1DaGF0LnNlbmRUZXh0TWVzc2FnZSh7XHJcbiAgICAgICAgICAgIHRvOiB0bywgLy/lr7nor53kurppZFxyXG4gICAgICAgICAgICB0eXBlOiBcImNoYXRcIiwgIC8vY2hhdDrljZXogYrvvIxncm91cGNnYXQ6576k6IGKLHB1YmFjY291bnQ65YWs5LyX5Y+3XHJcbiAgICAgICAgICAgIGNvbnRlbnQ6JHl5aW1fZWRpdG9yLnZhbCgpLCAvL+a2iOaBr+aWh+acrFxyXG4gICAgICAgICAgICBleHRlbmQ6ICcnLCAgLy/mianlsZXlrZfmrrVcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKG1zZykge1xyXG4gICAgICAgICAgICAgICAgJHl5aW1fZWRpdG9yLnZhbCgnJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhtc2cpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7IiwiLy9kb23lhYPntKBcclxuaW1wb3J0IHtcclxuICAgICRjaGF0X2JveCxcclxuICAgICRjaGF0c19saXN0XHJcbn0gZnJvbSAnLi9qcWVsZW1lbnRzJztcclxuXHJcbi8v5riy5p+T6IGK5aSp6K6w5b2VXHJcbmltcG9ydCByZW5kZXJIaXN0b3J5TWVzc2FnZSBmcm9tICcuL3JlbmRlckhpc3RvcnlNZXNzYWdlJztcclxuXHJcbi8v6I635Y+W6IGK5aSp5Y6G5Y+yLOS8oOWFpXNlc3Npb25WZXJzaW9uLGlk5ZKMdHlwZeWPguaVsFxyXG5leHBvcnQgZGVmYXVsdCAoc2Vzc2lvblZlcnNpb24sIGlkLCB0eXBlKSA9PiB7XHJcbiAgICBsZXQgZW5kVmVyc2lvbiA9IHNlc3Npb25WZXJzaW9uO1xyXG4gICAgbGV0IHN0YXJ0ID0gZW5kVmVyc2lvbiA+IDIwID8gZW5kVmVyc2lvbiAtIDIwIDogMDtcclxuICAgIFlZSU1DaGF0LmdldEhpc3RvcnlNZXNzYWdlKHtcclxuICAgICAgICBpZDogaWQsXHJcbiAgICAgICAgdHlwZTogdHlwZSxcclxuICAgICAgICBzdGFydFZlcnNpb246IHN0YXJ0LFxyXG4gICAgICAgIGVuZFZlcnNpb246IGVuZFZlcnNpb24sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAkY2hhdHNfbGlzdC5odG1sKCcnKTtcclxuICAgICAgICAgICAgJGNoYXRfYm94LnNob3coKTtcclxuICAgICAgICAgICAgaWYgKHJlcy5yZXN1bHQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgcmVuZGVySGlzdG9yeU1lc3NhZ2UocmVzLnJlc3VsdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTsiLCIvL2RvbeWFg+e0oFxyXG5pbXBvcnQge1xyXG4gICAgJGhjb250YWN0c1xyXG59IGZyb20gJy4vanFlbGVtZW50cyc7XHJcblxyXG4vL+iOt+WPluacgOi/keiBlOezu+S6ulxyXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XHJcbiAgICAkaGNvbnRhY3RzLmh0bWwoJycpO1xyXG4gICAgLy8g5ouJ5Y+W5pGY6KaBXHJcbiAgICBZWUlNQ2hhdC5nZXRSZWNlbnREaWdzZXQoe1xyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgLy9yZXN1bHQubGlzdOaYr+acgOi/keiBlOezu+S6ulxyXG4gICAgICAgICAgICBpZiAocmVzdWx0Lmxpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQubGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGUsIGkpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8v6I635Y+W5Liq5Lq65L+h5oGvXHJcbiAgICAgICAgICAgICAgICAgICAgWVlJTUNoYXQuZ2V0VkNhcmQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogZS5qaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQudHMgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5uYW1lID0gcmVzdWx0Lm5pY2tuYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQucGhvdG8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5waG90byA9IHJlc3VsdC5waG90bztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnBob3RvID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRoY29udGFjdHNbMF0uaW5uZXJIVE1MICs9IGA8bGkgZGF0YS1zZXNzaW9uVmVyc2lvbj1cIiR7ZS5zZXNzaW9uVmVyc2lvbn1cIiBkYXRhLWlkPVwiJHtlLmlkfVwiIGRhdGEtdHlwZT1cIiR7ZS50eXBlfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImNsb3NlXCI+w5c8L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhdmF0YXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9pbWdzL2F2YXRhci5qcGdcIiBhbHQ9XCJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cIm5hbWUgY3V0dHh0XCI+JHtlLmlkfTwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIm1zZyBjdXR0eHRcIj4ke2UubGFzdE1lc3NhZ2UgJiYgZS5sYXN0TWVzc2FnZS5kYXRhLmNvbnRlbnRUeXBlID09PSAyID8gZS5sYXN0TWVzc2FnZS5kYXRhLmNvbnRlbnQgOiAnJ308L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cIm5ld3RpcCBjdXR0eHRcIj45OTwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6ZnVuY3Rpb24gKGVycil7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0iLCJcclxuZXhwb3J0IGNvbnN0ICR5eWltX2lvZ2luID0gJCgnLnl5aW0taW9naW4nKTsvL+eZu+mZhuahhlxyXG5leHBvcnQgY29uc3QgJGxvZ2luX3VzZXJuYW1lID0gJCgnLmxvZ2luLXVzZXJuYW1lJyk7Ly/nmbvpmYbnlKjmiLflkI1cclxuZXhwb3J0IGNvbnN0ICRsb2dpbl9idG4gPSAkKCcubG9naW4tYnRuJyk7Ly/nmbvpmYbmjInpkq5cclxuZXhwb3J0IGNvbnN0ICR5eWltX21haW4gPSAkKCcueXlpbS1tYWluJyk7Ly/ogYrlpKnmnIDlpJblsYLnqpflj6NcclxuZXhwb3J0IGNvbnN0ICRqX21vdmUgPSAkKCcual9tb3ZlJyk7Ly/ogYrlpKnnqpflj6PlpLRcclxuZXhwb3J0IGNvbnN0ICRoY29udGFjdHMgPSAkKCcuaGNvbnRhY3RzJyk7Ly/mnIDov5HogZTns7vkurrmoYZcclxuZXhwb3J0IGNvbnN0ICR5eWltX2JveCA9ICQoJy55eWltLWJveCcpOy8v6IGK5aSp5qGGXHJcbmV4cG9ydCBjb25zdCAkal9icV9ib3ggPSAkKCcual9icV9ib3gnKTsvL+ihqOaDheebkuWtkFxyXG5leHBvcnQgY29uc3QgJHl5aW1fZWRpdG9yID0gJCgnLnl5aW0tZWRpdG9yJyk7Ly/ogYrlpKnovpPlhaXmoYZcclxuZXhwb3J0IGNvbnN0ICRidG5fc2VuZCA9ICQoJy5hZGl0LWJ0bi1zZW5kJyk7IC8v5Y+R6YCB5oyJ6ZKuXHJcbmV4cG9ydCBjb25zdCAkY2hhdF9ib3ggPSAkKCcuY2hhdC1ib3gnKTsgLy/mjqfliLbmmK/lkKblhbfmnInogYrlpKnlhoXlrrlcclxuZXhwb3J0IGNvbnN0ICRjaGF0c19saXN0ID0gJCgnLmNoYXRzLWxpc3QnKTsgLy/ogYrlpKnkv6Hmga/liJfooagiLCIvL2RvbeWFg+e0oFxyXG5pbXBvcnQge1xyXG4gICAgJGpfYnFfYm94LFxyXG4gICAgJGNoYXRzX2xpc3RcclxufSBmcm9tICcuL2pxZWxlbWVudHMnO1xyXG5pbXBvcnQgeyBleHByZXNzaW9uTGlzdCB9IGZyb20gJy4vY29uc3RhbnRzJztcclxuXHJcbi8v5pS+572u6KGo5oOF5YiX6KGoXHJcbiRqX2JxX2JveC5odG1sKGV4cHJlc3Npb25MaXN0LmRhdGEubWFwKCh0KSA9PiB7XHJcbiAgICByZXR1cm4gYDxsaSBkYXRhLWNvZGU9XCIke3QuYWN0aW9uRGF0YX1cIj48aW1nIHNyYz1cIiR7ZXhwcmVzc2lvbkxpc3QucGF0aCt0LnVybH1cIiB0aXRsZT1cIiR7dC5hY3Rpb25EYXRhfVwiIGFsdD1cIlwiPjwvbGk+YDtcclxufSkpO1xyXG5cclxuLy/nlKjlm77niYfmm7/mjaLmlofmnKzmtojmga/kuK3ooajmg4Xkv6Hmga9cclxuY29uc3QgcmVwbGFjZUVtb2ppID0gKHN0cikgPT4ge1xyXG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXFtbXlxcW1xcXV0rXFxdL2csKGUpID0+IHtcclxuICAgICAgICBsZXQgaSA9IC0xO1xyXG4gICAgICAgIGRve1xyXG4gICAgICAgICAgICBpICsrO1xyXG4gICAgICAgIH13aGlsZSAoZSAhPT0gZXhwcmVzc2lvbkxpc3QuZGF0YVtpXS5hY3Rpb25EYXRhKTtcclxuICAgICAgICByZXR1cm4gYDxpbWcgc3JjPVwiJHtleHByZXNzaW9uTGlzdC5wYXRoICsgZXhwcmVzc2lvbkxpc3QuZGF0YVtpXS51cmx9XCIgYWx0PVwiXCIgLz5gO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vL+a4suafk+iBiuWkqeiusOW9lSznm7TmjqXkvKDlhaXogYrlpKnorrDlvZXliJfooajljbPlj69cclxuZXhwb3J0IGRlZmF1bHQgKGNoYXRzKSA9PiB7XHJcbiAgICBsZXQgY2hhdHNTdHIgPSAnJztcclxuICAgIGxldCBteWlkID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudHVzZXJpbmZvJykpLmlkO1xyXG4gICAgY2hhdHMuZm9yRWFjaChmdW5jdGlvbihjaGF0LCBpKXtcclxuICAgICAgICBsZXQgaXNmcm9tbWUgPSBteWlkID09PSBjaGF0LmZyb207XHJcbiAgICAgICAgaWYoY2hhdC5kYXRhLmNvbnRlbnRUeXBlID09PSAyKXtcclxuICAgICAgICAgICAgY2hhdHNTdHIgKz0gYDxsaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGF0LXRpcFwiPiR7bmV3IERhdGUoY2hhdC5kYXRlbGluZSkudG9Mb2NhbGVUaW1lU3RyaW5nKCl9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hhdC1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiR7IGlzZnJvbW1lPyAnY2hhdC1hdmF0YXIgY2hhdC1hdmF0YXItc2VuZCcgOidjaGF0LWF2YXRhcid9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9pbWdzL2F2YXRhci5qcGdcIiBhbHQ9XCJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHsgaXNmcm9tbWU/ICdjaGF0LXR4dCBjaGF0LXR4dC1zZW5kJyA6J2NoYXQtdHh0J31cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoYXQtdXNlci1uYW1lXCI+JHtjaGF0LmZyb219PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGF0LW1zZ1wiPiR7cmVwbGFjZUVtb2ppKGNoYXQuZGF0YS5jb250ZW50KX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPiBgO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgJGNoYXRzX2xpc3QuaHRtbChjaGF0c1N0cik7XHJcbn07IiwiLy/lhYPntKBcclxuaW1wb3J0IHsgJHl5aW1faW9naW4sICR5eWltX2JveCB9IGZyb20gJy4vanFlbGVtZW50cyc7XHJcblxyXG4vL+eUqOaIt+eZu+mZhu+8jOS8oOWFpeeUqOaIt+WQjSjmmoLml7blhpnmrbvkuLp6b25ndGbvvIzlm6DkuLrlhbbku5bnmoTms6jlhozkuI3miJDlip8pXHJcbmV4cG9ydCBkZWZhdWx0ICh1c2VybmFtZSkgPT4ge1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICdodHRwOi8vMTcyLjIwLjE1LjYwL3N5c2FkbWluL3Jlc3QveW9ueW91L2ltX3ByZS90b2tlbicsXHJcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgaGVhZGVyczoge1wiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwifSxcclxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIFwidXNlcm5hbWVcIjpcInpvbmd0ZlwiLFxyXG4gICAgICAgICAgICBcImNsaWVudElkXCI6XCJiMjZiYTUxMDU4ZWVlOWRiNGY4OGE3YTJiMWJkMWIwNlwiLFxyXG4gICAgICAgICAgICBcImNsaWVudFNlY3JldFwiOlwiQ0M5QTcxRTBDMjUyOEVEQjE2NTJERkIxOEVDRThEREZcIlxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgbGV0IGNsaWVudElkZW50aWZ5ID0gXCJwY1wiICsgU3RyaW5nKG5ldyBEYXRlKCkuZ2V0VGltZSgpKTtcclxuICAgICAgICAgICAgJHl5aW1faW9naW4uaGlkZSgpO1xyXG4gICAgICAgICAgICAkeXlpbV9ib3guc2hvdygpO1xyXG4gICAgICAgICAgICAvL+eZu+mZhllZSU1TREtcclxuICAgICAgICAgICAgWVlJTUNoYXQubG9naW4oe1xyXG4gICAgICAgICAgICAgICAgXCJ1c2VybmFtZVwiOiAnem9uZ3RmJyxcclxuICAgICAgICAgICAgICAgIFwidG9rZW5cIjogcmVzdWx0LnRva2VuLFxyXG4gICAgICAgICAgICAgICAgXCJleHBpcmF0aW9uXCI6IHJlc3VsdC5leHBpcmF0aW9uLFxyXG4gICAgICAgICAgICAgICAgXCJhcHBUeXBlXCI6IDQsXHJcbiAgICAgICAgICAgICAgICBcImlkZW50aWZ5XCI6IGNsaWVudElkZW50aWZ5XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChhcmcpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYXJnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9