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

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    path: "./imgs/bq/",
    data: [{ actionData: "[龇牙]", "url": "expression_ciya@2x.png" }, { actionData: "[哈哈]", "url": "expression_haha@2x.png" }, { actionData: "[晕]", "url": "expression_yun@2x.png" }, { actionData: "[汗]", "url": "expression_hanb@2x.png" }, { actionData: "[害羞]", "url": "expression_haix@2x.png" }, { actionData: "[调皮]", "url": "expression_tiaop@2x.png" }, { actionData: "[疑问]", "url": "expression_yiw@2x.png" }, { actionData: "[捂脸]", "url": "expression_wulian@2x.png" }, { actionData: "[奸笑]", "url": "expression_jianxiao@2x.png" }, { actionData: "[机智]", "url": "expression_smart@2x.png" }, { actionData: "[得意]", "url": "expression_deyi@2x.png" }, { actionData: "[笑cry]", "url": "expression_laughing_tears@2x.png" }, { actionData: "[流泪]", "url": "expression_crying@2x.png" }, { actionData: "[奋斗]", "url": "expression_fendou@2x.png" }, { actionData: "[抱抱]", "url": "expression_hug@2x.png" }, { actionData: "[生病]", "url": "expression_ill@2x.png" }, { actionData: "[尴尬]", "url": "expression_ganga@2x.png" }, { actionData: "[偷笑]", "url": "expression_toux@2x.png" }, { actionData: "[赞]", "url": "expression_zan@2x.png" }, { actionData: "[握手]", "url": "expression_wos@2x.png" }, { actionData: "[OK]", "url": "expression_ok@2x.png" }, { actionData: "[yeak]", "url": "expression_yeak@2x.png" }, { actionData: "[鼓掌]", "url": "expression_guz@2x.png" }, { actionData: "[拳头]", "url": "expression_quantou@2x.png" }, { actionData: "[肌肉]", "url": "expression_jirou@2x.png" }, { actionData: "[握拳]", "url": "expression_woq@2x.png" }, { actionData: "[拜托]", "url": "expression_bait@2x.png" }, { actionData: "[愉快]", "url": "expression_yuk@2x.png" }, { actionData: "[难过]", "url": "expression_nanguo@2x.png" }, { actionData: "[闭嘴]", "url": "expression_bizui@2x.png" }, { actionData: "[困]", "url": "expression_kun@2x.png" }, { actionData: "[猪头]", "url": "expression_pig@2x.png" }, { actionData: "[爱心]", "url": "expression_heart@2x.png" }, { actionData: "[心碎]", "url": "expression_xinsui@2x.png" }, { actionData: "[礼盒]", "url": "expression_box@2x.png" }, { actionData: "[吻]", "url": "expression_kissa@2x.png" }, { actionData: "[玫瑰花]", "url": "expression_rose@2x.png" }, { actionData: "[棒棒糖]", "url": "expression_candy@2x.png" }, { actionData: "[晚安]", "url": "expression_night@2x.png" }, { actionData: "[祈祷]", "url": "expression_pray@2x.png" }, { actionData: "[给力]", "url": "expression_geili@2x.png" }, { actionData: "[踩]", "url": "expression_cai@2x.png" }, { actionData: "[亲亲]", "url": "expression_kissb@2x.png" }, { actionData: "[嘘]", "url": "expression_xu@2x.png" }, { actionData: "[色]", "url": "expression_se@2x.png" }, { actionData: "[可怜]", "url": "expression_kelian@2x.png" }, { actionData: "[发呆]", "url": "expression_fadai@2x.png" }, { actionData: "[大哭]", "url": "expression_crya@2x.png" }, { actionData: "[困Zzz]", "url": "expression_zzz@2x.png" }, { actionData: "[思考]", "url": "expression_sikao@2x.png" }, { actionData: "[白眼]", "url": "expression_baiy@2x.png" }, { actionData: "[傲慢]", "url": "expression_aoman@2x.png" }, { actionData: "[酷]", "url": "expression_ku@2x.png" }, { actionData: "[囧]", "url": "expression_jiong@2x.png" }, { actionData: "[鄙视]", "url": "expression_bis@2x.png" }, { actionData: "[饥饿]", "url": "expression_jie@2x.png" }, { actionData: "[吓]", "url": "expression_xia@2x.png" }, { actionData: "[抠鼻]", "url": "expression_koubi@2x.png" }, { actionData: "[惊讶]", "url": "expression_jingy@2x.png" }, { actionData: "[发怒]", "url": "expression_angry@2x.png" }, { actionData: "[惊恐]", "url": "expression_jingk@2x.png" }, { actionData: "[吐]", "url": "expression_tu@2x.png" }, { actionData: "[拜拜]", "url": "expression_bye@2x.png" }, { actionData: "[咖啡]", "url": "expression_coffee@2x.png" }, { actionData: "[啤酒]", "url": "expression_beer@2x.png" }, { actionData: "[下雨]", "url": "expression_rain@2x.png" }, { actionData: "[闪电]", "url": "expression_shand@2x.png" }, { actionData: "[下雪]", "url": "expression_snow@2x.png" }, { actionData: "[足球]", "url": "expression_ball@2x.png" }, { actionData: "[篮球]", "url": "expression_basket@2x.png" }, { actionData: "[飞机]", "url": "expression_plane@2x.png" }, { actionData: "[邮件]", "url": "expression_mail@2x.png" }, { actionData: "[雨伞]", "url": "expression_yusan@2x.png" }, { actionData: "[奖杯]", "url": "expression_jiangb@2x.png" }, { actionData: "[怪物]", "url": "expression_guaiwu@2x.png" }, { actionData: "[药]", "url": "expression_med@2x.png" }, { actionData: "[炸弹]", "url": "expression_zhad@2x.png" }, { actionData: "[蛋糕]", "url": "expression_cake@2x.png" }]
};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _constants = __webpack_require__(/*! ./constants */ "./src/constants.js");

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(function () {
    var $j_bq_box = $('.j_bq_box'); //表情盒子


    //放置表情列表
    _constants2.default.data.forEach(function (t) {
        $j_bq_box.append('<li><img src="' + (_constants2.default.path + t.url) + '" title="' + t.actionData + '" alt=""></li>');
    });

    //初始化SDK
    YYIMChat.initSDK({
        app: 'moli_pre', //appId
        etp: 'moli', //etpId
        wsurl: 'im.yonyou.com', //websocket Url
        wsport: 5227, //websocket port 5227/5222/5225
        hbport: 7075, //httpbind  port 7075/7070
        servlet: 'https://im.yonyou.com/', //rest Url
        flash_swf_url: 'xxx/x/Moxie.swf', //flash 上传 swf文件位置
        logEnable: true, //client log
        clientMark: 'web', //client mark 'web' or 'pc'
        apiKey: "85de79b9f7e34c37a99accaddb256990"
    });
    // YYIMChat.initSDK({
    //     app: 'im_pre', //appId
    //     etp: 'yonyou', //etpId
    //     wsurl: '172.20.15.60', //websocket Url
    //     wsport: 5222, //websocket port 5227/5222/5225
    //     hbport: 7075, //httpbind  port 7075/7070
    //     servlet: '172.20.15.60', //rest Url
    //     flash_swf_url: 'xxx/x/Moxie.swf', //flash 上传 swf文件位置
    //     logEnable: true, //client log
    //     clientMark: 'web' //client mark 'web' or 'pc'
    // });

    // 临时登录IM，正常情况由业务系统完成
    $.ajax({
        url: 'https://im.yonyou.com/sysadmin/rest/moli/moli_pre/token',
        type: 'POST',
        dataType: 'json',
        headers: { "Content-Type": "application/json" },
        data: '{"username":"demo1","clientId":"06fa63f9eac2de8329dfe146db143f22","clientSecret":"874418578B81D56B8D78F4BC7248AE22"}',
        success: function success(result) {
            var clientIdentify = "pc" + String(new Date().getTime());
            YYIMChat.login({
                "username": 'demo1',
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

    //初始化回调方法
    YYIMChat.init({
        onOpened: function onOpened() {
            // 登录成功
            YYIMChat.setPresence();
            // 获取当前在线的设备
            var arg = {
                success: function success(result) {
                    console.log(result);
                },
                error: function error(arg) {
                    console.log(arg);
                }
            };
            YYIMChat.getMultiTerminals(arg);

            // 拉取摘要
            YYIMChat.getRecentDigset({
                success: function success(result) {
                    console.log(result);
                },
                error: function error(err) {
                    console.log(err);
                }
            });
        },
        onExpiration: function onExpiration(callback) {
            //自动更新token
            //callback(token, expiration);
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

    //事件
    $('.j_menu_bq').hover(function () {
        $(this).addClass('hover');
        $('.bq_tip').css('display', 'block');
    }, function () {
        $(this).removeClass('hover');
        $('.bq_tip').css('display', 'none');
    }).click(function () {
        $j_bq_box.toggle();
    });
    $('.j_menu_tp').hover(function () {
        $(this).addClass('hover');
        $('.tp_tip').css('display', 'block');
    }, function () {
        $(this).removeClass('hover');
        $('.tp_tip').css('display', 'none');
    }).click(function () {});
    $('.j_menu_wj').hover(function () {
        $(this).addClass('hover');
        $('.wj_tip').css('display', 'block');
    }, function () {
        $(this).removeClass('hover');
        $('.wj_tip').css('display', 'none');
    }).click(function () {});
    //点击表情
    $j_bq_box.click(function (e) {
        console.log($(e.target).attr('title'));
    });
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsicGF0aCIsImRhdGEiLCJhY3Rpb25EYXRhIiwiJCIsIiRqX2JxX2JveCIsImZvckVhY2giLCJ0IiwiYXBwZW5kIiwidXJsIiwiWVlJTUNoYXQiLCJpbml0U0RLIiwiYXBwIiwiZXRwIiwid3N1cmwiLCJ3c3BvcnQiLCJoYnBvcnQiLCJzZXJ2bGV0IiwiZmxhc2hfc3dmX3VybCIsImxvZ0VuYWJsZSIsImNsaWVudE1hcmsiLCJhcGlLZXkiLCJhamF4IiwidHlwZSIsImRhdGFUeXBlIiwiaGVhZGVycyIsInN1Y2Nlc3MiLCJyZXN1bHQiLCJjbGllbnRJZGVudGlmeSIsIlN0cmluZyIsIkRhdGUiLCJnZXRUaW1lIiwibG9naW4iLCJ0b2tlbiIsImV4cGlyYXRpb24iLCJlcnJvciIsImFyZyIsImNvbnNvbGUiLCJsb2ciLCJpbml0Iiwib25PcGVuZWQiLCJzZXRQcmVzZW5jZSIsImdldE11bHRpVGVybWluYWxzIiwiZ2V0UmVjZW50RGlnc2V0IiwiZXJyIiwib25FeHBpcmF0aW9uIiwiY2FsbGJhY2siLCJvbkNsb3NlZCIsIm9uQ29uZmxpY3RlZCIsIm9uQ2xpZW50S2lja291dCIsIm9uVXBkYXRlUGFzc3dvcmQiLCJvbkF1dGhFcnJvciIsIm9uQ29ubmVjdEVycm9yIiwib25SZWNlaXB0cyIsIm9uU3Vic2NyaWJlIiwib25Sb3N0ZXJGYXZvcml0ZWQiLCJvblJvc3RlclVwZGF0ZWRlZCIsIm9uTWVzc2FnZSIsIm9uR3JvdXBVcGRhdGUiLCJvbktpY2tlZE91dEdyb3VwIiwib25UcmFuc2Zlckdyb3VwT3duZXIiLCJvblByZXNlbmNlIiwib25Sb3N0ZXJEZWxldGVkIiwib25QdWJhY2NvdW50VXBkYXRlIiwicHViYWNjb3VudHMiLCJvblRyYW5zcGFyZW50TWVzc2FnZSIsImhvdmVyIiwiYWRkQ2xhc3MiLCJjc3MiLCJyZW1vdmVDbGFzcyIsImNsaWNrIiwidG9nZ2xlIiwiZSIsInRhcmdldCIsImF0dHIiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JDbkVlO0FBQ1hBLFVBQU0sWUFESztBQUVYQyxVQUFNLENBQ0YsRUFBRUMsWUFBWSxNQUFkLEVBQXNCLE9BQU8sd0JBQTdCLEVBREUsRUFFRixFQUFFQSxZQUFZLE1BQWQsRUFBc0IsT0FBTyx3QkFBN0IsRUFGRSxFQUdGLEVBQUVBLFlBQVksS0FBZCxFQUFxQixPQUFPLHVCQUE1QixFQUhFLEVBSUYsRUFBRUEsWUFBWSxLQUFkLEVBQXFCLE9BQU8sd0JBQTVCLEVBSkUsRUFLRixFQUFFQSxZQUFZLE1BQWQsRUFBc0IsT0FBTyx3QkFBN0IsRUFMRSxFQU1GLEVBQUVBLFlBQVksTUFBZCxFQUFzQixPQUFPLHlCQUE3QixFQU5FLEVBT0YsRUFBRUEsWUFBWSxNQUFkLEVBQXNCLE9BQU8sdUJBQTdCLEVBUEUsRUFRRixFQUFFQSxZQUFZLE1BQWQsRUFBc0IsT0FBTywwQkFBN0IsRUFSRSxFQVNGLEVBQUVBLFlBQVksTUFBZCxFQUFzQixPQUFPLDRCQUE3QixFQVRFLEVBVUYsRUFBRUEsWUFBWSxNQUFkLEVB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LEVBQTRCLE9BQTVCO0FBQ0gsS0FIRCxFQUdFLFlBQVk7QUFDVmhFLFVBQUUsSUFBRixFQUFRaUUsV0FBUixDQUFvQixPQUFwQjtBQUNBakUsVUFBRSxTQUFGLEVBQWFnRSxHQUFiLENBQWlCLFNBQWpCLEVBQTRCLE1BQTVCO0FBQ0gsS0FORCxFQU1HRSxLQU5ILENBTVMsWUFBWSxDQUVwQixDQVJEO0FBU0E7QUFDQWpFLGNBQVVpRSxLQUFWLENBQWdCLFVBQVVFLENBQVYsRUFBYTtBQUN6Qm5DLGdCQUFRQyxHQUFSLENBQVlsQyxFQUFFb0UsRUFBRUMsTUFBSixFQUFZQyxJQUFaLENBQWlCLE9BQWpCLENBQVo7QUFDSCxLQUZEO0FBR0gsQ0EvS0QsRSIsImZpbGUiOiJtYWluLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICBwYXRoOiBcIi4vaW1ncy9icS9cIixcbiAgICBkYXRhOiBbXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6b6H54mZXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fY2l5YUAyeC5wbmdcIiB9LFxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WTiOWTiF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2hhaGFAMngucG5nXCIgfSxcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmmZVdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl95dW5AMngucG5nXCIgfSxcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmsZddXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9oYW5iQDJ4LnBuZ1wiIH0sXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5a6z576eXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25faGFpeEAyeC5wbmdcIiB9LFxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+iwg+earl1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3RpYW9wQDJ4LnBuZ1wiIH0sXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb55aR6ZeuXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25feWl3QDJ4LnBuZ1wiIH0sXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5o2C6IS4XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fd3VsaWFuQDJ4LnBuZ1wiIH0sXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5aW456yRXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25famlhbnhpYW9AMngucG5nXCIgfSxcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmnLrmmbpdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9zbWFydEAyeC5wbmdcIiB9LFxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+W+l+aEj11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2RleWlAMngucG5nXCIgfSxcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvnrJFjcnldXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9sYXVnaGluZ190ZWFyc0AyeC5wbmdcIiB9LFxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+a1geazql1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2NyeWluZ0AyeC5wbmdcIiB9LFxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+Wli+aWl11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2ZlbmRvdUAyeC5wbmdcIiB9LFxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+aKseaKsV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2h1Z0AyeC5wbmdcIiB9LFxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+eUn+eXhV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2lsbEAyeC5wbmdcIiB9LFxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WwtOWwrF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2dhbmdhQDJ4LnBuZ1wiIH0sXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5YG356yRXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fdG91eEAyeC5wbmdcIiB9LFxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+i1nl1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3phbkAyeC5wbmdcIiB9LFxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+aPoeaJi11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3dvc0AyeC5wbmdcIiB9LFxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW09LXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fb2tAMngucG5nXCIgfSxcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlt5ZWFrXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25feWVha0AyeC5wbmdcIiB9LFxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+m8k+aOjF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2d1ekAyeC5wbmdcIiB9LFxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+aLs+WktF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3F1YW50b3VAMngucG5nXCIgfSxcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvogozogoldXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9qaXJvdUAyeC5wbmdcIiB9LFxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+aPoeaLs11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3dvcUAyeC5wbmdcIiB9LFxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+aLnOaJmF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2JhaXRAMngucG5nXCIgfSxcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmhInlv6tdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl95dWtAMngucG5nXCIgfSxcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvpmr7ov4ddXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9uYW5ndW9AMngucG5nXCIgfSxcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvpl63lmLRdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9iaXp1aUAyeC5wbmdcIiB9LFxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WbsF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2t1bkAyeC5wbmdcIiB9LFxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+eMquWktF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3BpZ0AyeC5wbmdcIiB9LFxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+eIseW/g11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2hlYXJ0QDJ4LnBuZ1wiIH0sXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5b+D56KOXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25feGluc3VpQDJ4LnBuZ1wiIH0sXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb56S855uSXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fYm94QDJ4LnBuZ1wiIH0sXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5ZC7XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fa2lzc2FAMngucG5nXCIgfSxcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvnjqvnkbDoirFdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9yb3NlQDJ4LnBuZ1wiIH0sXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5qOS5qOS57OWXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fY2FuZHlAMngucG5nXCIgfSxcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmmZrlroldXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9uaWdodEAyeC5wbmdcIiB9LFxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+eliOelt11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3ByYXlAMngucG5nXCIgfSxcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvnu5nliptdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9nZWlsaUAyeC5wbmdcIiB9LFxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+i4qV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2NhaUAyeC5wbmdcIiB9LFxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+S6suS6sl1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2tpc3NiQDJ4LnBuZ1wiIH0sXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5ZiYXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25feHVAMngucG5nXCIgfSxcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvoibJdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9zZUAyeC5wbmdcIiB9LFxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WPr+aAnF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2tlbGlhbkAyeC5wbmdcIiB9LFxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WPkeWRhl1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2ZhZGFpQDJ4LnBuZ1wiIH0sXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5aSn5ZOtXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fY3J5YUAyeC5wbmdcIiB9LFxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WbsFp6el1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3p6ekAyeC5wbmdcIiB9LFxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+aAneiAg11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3Npa2FvQDJ4LnBuZ1wiIH0sXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb55m955y8XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fYmFpeUAyeC5wbmdcIiB9LFxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WCsuaFol1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2FvbWFuQDJ4LnBuZ1wiIH0sXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb6YW3XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fa3VAMngucG5nXCIgfSxcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlm6ddXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9qaW9uZ0AyeC5wbmdcIiB9LFxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+mEmeinhl1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2Jpc0AyeC5wbmdcIiB9LFxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+mlpemlv11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2ppZUAyeC5wbmdcIiB9LFxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+WQk11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3hpYUAyeC5wbmdcIiB9LFxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+aKoOm8u11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2tvdWJpQDJ4LnBuZ1wiIH0sXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5oOK6K62XVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25famluZ3lAMngucG5nXCIgfSxcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlj5HmgJJdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9hbmdyeUAyeC5wbmdcIiB9LFxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+aDiuaBkF1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2ppbmdrQDJ4LnBuZ1wiIH0sXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5ZCQXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fdHVAMngucG5nXCIgfSxcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvmi5zmi5xdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9ieWVAMngucG5nXCIgfSxcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvlkpbllaFdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9jb2ZmZWVAMngucG5nXCIgfSxcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvllaTphZJdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9iZWVyQDJ4LnBuZ1wiIH0sXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5LiL6ZuoXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fcmFpbkAyeC5wbmdcIiB9LFxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+mXqueUtV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3NoYW5kQDJ4LnBuZ1wiIH0sXG4gICAgICAgIHsgYWN0aW9uRGF0YTogXCJb5LiL6ZuqXVwiLCBcInVybFwiOiBcImV4cHJlc3Npb25fc25vd0AyeC5wbmdcIiB9LFxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+i2s+eQg11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2JhbGxAMngucG5nXCIgfSxcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvnr67nkINdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9iYXNrZXRAMngucG5nXCIgfSxcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvpo57mnLpdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9wbGFuZUAyeC5wbmdcIiB9LFxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+mCruS7tl1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX21haWxAMngucG5nXCIgfSxcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvpm6jkvJ5dXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl95dXNhbkAyeC5wbmdcIiB9LFxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+Wlluadr11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2ppYW5nYkAyeC5wbmdcIiB9LFxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+aAqueJqV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX2d1YWl3dUAyeC5wbmdcIiB9LFxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+iNr11cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX21lZEAyeC5wbmdcIiB9LFxuICAgICAgICB7IGFjdGlvbkRhdGE6IFwiW+eCuOW8uV1cIiwgXCJ1cmxcIjogXCJleHByZXNzaW9uX3poYWRAMngucG5nXCIgfSxcbiAgICAgICAgeyBhY3Rpb25EYXRhOiBcIlvom4vns5VdXCIsIFwidXJsXCI6IFwiZXhwcmVzc2lvbl9jYWtlQDJ4LnBuZ1wiIH1cbiAgICBdXG59OyIsIlxuaW1wb3J0IGV4cHJlc3Npb25MaXN0IGZyb20gJy4vY29uc3RhbnRzJ1xuXG4kKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgJGpfYnFfYm94ID0gJCgnLmpfYnFfYm94Jyk7Ly/ooajmg4Xnm5LlrZBcblxuICAgIFxuICAgIC8v5pS+572u6KGo5oOF5YiX6KGoXG4gICAgZXhwcmVzc2lvbkxpc3QuZGF0YS5mb3JFYWNoKGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICRqX2JxX2JveC5hcHBlbmQoJzxsaT48aW1nIHNyYz1cIicrIChleHByZXNzaW9uTGlzdC5wYXRoK3QudXJsKSsnXCIgdGl0bGU9XCInK3QuYWN0aW9uRGF0YSsnXCIgYWx0PVwiXCI+PC9saT4nKTtcbiAgICB9KTtcblxuICAgIC8v5Yid5aeL5YyWU0RLXG4gICAgWVlJTUNoYXQuaW5pdFNESyh7XG4gICAgICAgIGFwcDogJ21vbGlfcHJlJywgLy9hcHBJZFxuICAgICAgICBldHA6ICdtb2xpJywgLy9ldHBJZFxuICAgICAgICB3c3VybDogJ2ltLnlvbnlvdS5jb20nLCAvL3dlYnNvY2tldCBVcmxcbiAgICAgICAgd3Nwb3J0OiA1MjI3LCAvL3dlYnNvY2tldCBwb3J0IDUyMjcvNTIyMi81MjI1XG4gICAgICAgIGhicG9ydDogNzA3NSwgLy9odHRwYmluZCAgcG9ydCA3MDc1LzcwNzBcbiAgICAgICAgc2VydmxldDogJ2h0dHBzOi8vaW0ueW9ueW91LmNvbS8nLCAvL3Jlc3QgVXJsXG4gICAgICAgIGZsYXNoX3N3Zl91cmw6ICd4eHgveC9Nb3hpZS5zd2YnLCAvL2ZsYXNoIOS4iuS8oCBzd2bmlofku7bkvY3nva5cbiAgICAgICAgbG9nRW5hYmxlOiB0cnVlLCAvL2NsaWVudCBsb2dcbiAgICAgICAgY2xpZW50TWFyazogJ3dlYicsIC8vY2xpZW50IG1hcmsgJ3dlYicgb3IgJ3BjJ1xuICAgICAgICBhcGlLZXk6IFwiODVkZTc5YjlmN2UzNGMzN2E5OWFjY2FkZGIyNTY5OTBcIlxuICAgIH0pO1xuICAgIC8vIFlZSU1DaGF0LmluaXRTREsoe1xuICAgIC8vICAgICBhcHA6ICdpbV9wcmUnLCAvL2FwcElkXG4gICAgLy8gICAgIGV0cDogJ3lvbnlvdScsIC8vZXRwSWRcbiAgICAvLyAgICAgd3N1cmw6ICcxNzIuMjAuMTUuNjAnLCAvL3dlYnNvY2tldCBVcmxcbiAgICAvLyAgICAgd3Nwb3J0OiA1MjIyLCAvL3dlYnNvY2tldCBwb3J0IDUyMjcvNTIyMi81MjI1XG4gICAgLy8gICAgIGhicG9ydDogNzA3NSwgLy9odHRwYmluZCAgcG9ydCA3MDc1LzcwNzBcbiAgICAvLyAgICAgc2VydmxldDogJzE3Mi4yMC4xNS42MCcsIC8vcmVzdCBVcmxcbiAgICAvLyAgICAgZmxhc2hfc3dmX3VybDogJ3h4eC94L01veGllLnN3ZicsIC8vZmxhc2gg5LiK5LygIHN3ZuaWh+S7tuS9jee9rlxuICAgIC8vICAgICBsb2dFbmFibGU6IHRydWUsIC8vY2xpZW50IGxvZ1xuICAgIC8vICAgICBjbGllbnRNYXJrOiAnd2ViJyAvL2NsaWVudCBtYXJrICd3ZWInIG9yICdwYydcbiAgICAvLyB9KTtcblxuICAgIC8vIOS4tOaXtueZu+W9lUlN77yM5q2j5bi45oOF5Ya155Sx5Lia5Yqh57O757uf5a6M5oiQXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnaHR0cHM6Ly9pbS55b255b3UuY29tL3N5c2FkbWluL3Jlc3QvbW9saS9tb2xpX3ByZS90b2tlbicsXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgaGVhZGVyczoge1wiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwifSxcbiAgICAgICAgZGF0YTogJ3tcInVzZXJuYW1lXCI6XCJkZW1vMVwiLFwiY2xpZW50SWRcIjpcIjA2ZmE2M2Y5ZWFjMmRlODMyOWRmZTE0NmRiMTQzZjIyXCIsXCJjbGllbnRTZWNyZXRcIjpcIjg3NDQxODU3OEI4MUQ1NkI4RDc4RjRCQzcyNDhBRTIyXCJ9JyxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgdmFyIGNsaWVudElkZW50aWZ5ID0gXCJwY1wiICsgU3RyaW5nKG5ldyBEYXRlKCkuZ2V0VGltZSgpKTtcbiAgICAgICAgICAgIFlZSU1DaGF0LmxvZ2luKHtcbiAgICAgICAgICAgICAgICBcInVzZXJuYW1lXCI6ICdkZW1vMScsXG4gICAgICAgICAgICAgICAgXCJ0b2tlblwiOiByZXN1bHQudG9rZW4sXG4gICAgICAgICAgICAgICAgXCJleHBpcmF0aW9uXCI6IHJlc3VsdC5leHBpcmF0aW9uLFxuICAgICAgICAgICAgICAgIFwiYXBwVHlwZVwiOiA0LFxuICAgICAgICAgICAgICAgIFwiaWRlbnRpZnlcIjogY2xpZW50SWRlbnRpZnlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGFyZykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYXJnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy/liJ3lp4vljJblm57osIPmlrnms5VcbiAgICBZWUlNQ2hhdC5pbml0KHtcbiAgICAgICAgb25PcGVuZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8g55m75b2V5oiQ5YqfXG4gICAgICAgICAgICBZWUlNQ2hhdC5zZXRQcmVzZW5jZSgpO1xuICAgICAgICAgICAgLy8g6I635Y+W5b2T5YmN5Zyo57q/55qE6K6+5aSHXG4gICAgICAgICAgICB2YXIgYXJnID0ge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGFyZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIFlZSU1DaGF0LmdldE11bHRpVGVybWluYWxzKGFyZyk7XG5cbiAgICAgICAgICAgIC8vIOaLieWPluaRmOimgVxuICAgICAgICAgICAgWVlJTUNoYXQuZ2V0UmVjZW50RGlnc2V0KHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjpmdW5jdGlvbiAoZXJyKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25FeHBpcmF0aW9uOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICAgICAgLy/oh6rliqjmm7TmlrB0b2tlblxuICAgICAgICAgICAgLy9jYWxsYmFjayh0b2tlbiwgZXhwaXJhdGlvbik7XG4gICAgICAgIH0sXG4gICAgICAgIG9uQ2xvc2VkOiBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgICAgIC8v6L+e5o6l5YWz6ZetXG4gICAgICAgIH0sXG4gICAgICAgIG9uQ29uZmxpY3RlZDogZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgICAgICAvL+eZu+mZhuWGsueqgVxuICAgICAgICB9LFxuICAgICAgICBvbkNsaWVudEtpY2tvdXQ6IGZ1bmN0aW9uKGFyZykge1xuICAgICAgICAgICAgLy/ooqvku5bnq6/ouKLmjolcbiAgICAgICAgfSxcbiAgICAgICAgb25VcGRhdGVQYXNzd29yZDogZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgICAgICAvL+abtOaUueWvhuegge+8jOiiq+i4ouaOiVxuICAgICAgICB9LFxuICAgICAgICBvbkF1dGhFcnJvcjogZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgICAgICAvL+eZu+mZhuiupOivgeWksei0pVxuICAgICAgICB9LFxuICAgICAgICBvbkNvbm5lY3RFcnJvcjogZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgICAgICAvL+i/nuaOpeWksei0pVxuICAgICAgICB9LFxuICAgICAgICBvblJlY2VpcHRzOiBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgICAgIC8v5raI5oGv5Zue5omnXG4gICAgICAgIH0sXG4gICAgICAgIG9uU3Vic2NyaWJlOiBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgICAgIC8v5Y+R55Sf6K6i6ZiFXG4gICAgICAgIH0sXG4gICAgICAgIG9uUm9zdGVyRmF2b3JpdGVkOiBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgICAgIC8v6KKr5pS26JePXG4gICAgICAgIH0sXG4gICAgICAgIG9uUm9zdGVyVXBkYXRlZGVkOiBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgICAgIC8v5aW95Y+L5L+h5oGv5pu05pS5XG4gICAgICAgIH0sXG4gICAgICAgIG9uTWVzc2FnZTogZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgICAgICAvL+aUtuWIsOa2iOaBr1xuICAgICAgICB9LFxuICAgICAgICBvbkdyb3VwVXBkYXRlOiBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgICAgIC8v576k57uE5pu05pawXG4gICAgICAgIH0sXG4gICAgICAgIG9uS2lja2VkT3V0R3JvdXA6IGZ1bmN0aW9uKGFyZykge1xuICAgICAgICAgICAgLy/nvqTmiJDlkZjooqvnvqTkuLvmj5Dlh7pcbiAgICAgICAgfSxcbiAgICAgICAgb25UcmFuc2Zlckdyb3VwT3duZXI6IGZ1bmN0aW9uKGFyZyl7XG4gICAgICAgICAgICAvL+e+pOS4u+i9rOiuqVxuICAgICAgICB9LFxuICAgICAgICBvblByZXNlbmNlOiBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgICAgIC8v5aW95Y+LcHJlc2VuY2XmlLnlj5hcbiAgICAgICAgfSxcbiAgICAgICAgb25Sb3N0ZXJEZWxldGVkOiBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgICAgIC8v5aW95Y+L6KKr5Yig6ZmkXG4gICAgICAgIH0sXG4gICAgICAgIG9uUHViYWNjb3VudFVwZGF0ZTogZnVuY3Rpb24ocHViYWNjb3VudHMpIHtcbiAgICAgICAgICAgIC8v5YWs5YWx5Y+35L+h5oGv5pu05pawXG4gICAgICAgIH0sXG4gICAgICAgIG9uVHJhbnNwYXJlbnRNZXNzYWdlOiBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgICAgIC8v6YCP5Lyg5Lia5Yqh5raI5oGvXG4gICAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgLy/kuovku7ZcbiAgICAkKCcual9tZW51X2JxJykuaG92ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdob3ZlcicpO1xuICAgICAgICAkKCcuYnFfdGlwJykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgfSxmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2hvdmVyJyk7XG4gICAgICAgICQoJy5icV90aXAnKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgIH0pLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJGpfYnFfYm94LnRvZ2dsZSgpO1xuICAgIH0pO1xuICAgICQoJy5qX21lbnVfdHAnKS5ob3ZlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2hvdmVyJyk7XG4gICAgICAgICQoJy50cF90aXAnKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICB9LGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaG92ZXInKTtcbiAgICAgICAgJCgnLnRwX3RpcCcpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgfSkuY2xpY2soZnVuY3Rpb24gKCkge1xuXG4gICAgfSk7XG4gICAgJCgnLmpfbWVudV93aicpLmhvdmVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaG92ZXInKTtcbiAgICAgICAgJCgnLndqX3RpcCcpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgIH0sZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdob3ZlcicpO1xuICAgICAgICAkKCcud2pfdGlwJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICB9KS5jbGljayhmdW5jdGlvbiAoKSB7XG5cbiAgICB9KTtcbiAgICAvL+eCueWHu+ihqOaDhVxuICAgICRqX2JxX2JveC5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZygkKGUudGFyZ2V0KS5hdHRyKCd0aXRsZScpKTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==