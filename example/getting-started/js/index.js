
$(function () {
    //初始化SDK
    YYIMChat.initSDK({
        app: 'im_pre', //appId
        etp: 'yonyou', //etpId
        wsurl: '172.20.15.60', //websocket Url
        wsport: 5222, //websocket port 5227/5222/5225
        hbport: 7075, //httpbind  port 7075/7070
        servlet: '172.20.15.60', //rest Url
        // flash_swf_url: 'xxx/x/Moxie.swf', //flash 上传 swf文件位置
        logEnable: false, //client log
        clientMark: 'web' //client mark 'web' or 'pc'
    });

    //初始化回调方法
    YYIMChat.init({
        onOpened: function() {
            // 登录成功
            console.log('登录成功');
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

    YYIMChat.getRosterItems({
        success: function (res) {
            console.log(res)
        } ,
        error: function (err) {
            console.log(err)
        }
    });

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

    var $j_bq_box = $('.j_bq_box');
    $j_bq_box.click(function (e) {
        console.log($(e.target).attr('title'));
    });
    var bqimgs = [
        {name: '龇牙', url: './imgs/bq/expression_ciya@2x.png'},
        {name: '哈哈', url: './imgs/bq/expression_haha@2x.png'},
        {name: '晕', url: './imgs/bq/expression_yun@2x.png'},
        {name: '汗', url: './imgs/bq/expression_hanb@2x.png'}
    ];
    bqimgs.forEach(function (t) { $j_bq_box.append('<li><img src="'+t.url+'" title="'+t.name+'" alt=""></li>') });
});