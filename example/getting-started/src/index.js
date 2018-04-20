
import expressionList from './constants'

$(function () {
    var $j_bq_box = $('.j_bq_box');//表情盒子

    
    //放置表情列表
    expressionList.data.forEach(function (t) {
        $j_bq_box.append('<li><img src="'+ (expressionList.path+t.url)+'" title="'+t.actionData+'" alt=""></li>');
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
        headers: {"Content-Type": "application/json"},
        data: '{"username":"demo1","clientId":"06fa63f9eac2de8329dfe146db143f22","clientSecret":"874418578B81D56B8D78F4BC7248AE22"}',
        success: function (result) {
            var clientIdentify = "pc" + String(new Date().getTime());
            YYIMChat.login({
                "username": 'demo1',
                "token": result.token,
                "expiration": result.expiration,
                "appType": 4,
                "identify": clientIdentify
            });
        },
        error: function (arg) {
            console.log(arg);
        }
    });

    //初始化回调方法
    YYIMChat.init({
        onOpened: function() {
            // 登录成功
            YYIMChat.setPresence();
            // 获取当前在线的设备
            var arg = {
                success: function (result) {
                    console.log(result);
                },
                error: function (arg) {
                    console.log(arg);
                }
            };
            YYIMChat.getMultiTerminals(arg);

            // 拉取摘要
            YYIMChat.getRecentDigset({
                success: function (result) {
                    console.log(result);
                },
                error:function (err){
                    console.log(err);
                }
            });
        },
        onExpiration: function(callback) {
            //自动更新token
            //callback(token, expiration);
        },
        onClosed: function(arg) {
            //连接关闭
        },
        onConflicted: function(arg) {
            //登陆冲突
        },
        onClientKickout: function(arg) {
            //被他端踢掉
        },
        onUpdatePassword: function(arg) {
            //更改密码，被踢掉
        },
        onAuthError: function(arg) {
            //登陆认证失败
        },
        onConnectError: function(arg) {
            //连接失败
        },
        onReceipts: function(arg) {
            //消息回执
        },
        onSubscribe: function(arg) {
            //发生订阅
        },
        onRosterFavorited: function(arg) {
            //被收藏
        },
        onRosterUpdateded: function(arg) {
            //好友信息更改
        },
        onMessage: function(arg) {
            //收到消息
        },
        onGroupUpdate: function(arg) {
            //群组更新
        },
        onKickedOutGroup: function(arg) {
            //群成员被群主提出
        },
        onTransferGroupOwner: function(arg){
            //群主转让
        },
        onPresence: function(arg) {
            //好友presence改变
        },
        onRosterDeleted: function(arg) {
            //好友被删除
        },
        onPubaccountUpdate: function(pubaccounts) {
            //公共号信息更新
        },
        onTransparentMessage: function(arg) {
            //透传业务消息
        }
    });


    //事件
    $('.j_menu_bq').hover(function () {
        $(this).addClass('hover');
        $('.bq_tip').css('display', 'block');
    },function () {
        $(this).removeClass('hover');
        $('.bq_tip').css('display', 'none');
    }).click(function () {
        $j_bq_box.toggle();
    });
    $('.j_menu_tp').hover(function () {
        $(this).addClass('hover');
        $('.tp_tip').css('display', 'block');
    },function () {
        $(this).removeClass('hover');
        $('.tp_tip').css('display', 'none');
    }).click(function () {

    });
    $('.j_menu_wj').hover(function () {
        $(this).addClass('hover');
        $('.wj_tip').css('display', 'block');
    },function () {
        $(this).removeClass('hover');
        $('.wj_tip').css('display', 'none');
    }).click(function () {

    });
    //点击表情
    $j_bq_box.click(function (e) {
        console.log($(e.target).attr('title'));
    });
});
