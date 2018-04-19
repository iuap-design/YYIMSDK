
$(function () {
    var $j_bq_box = $('.j_bq_box');//表情盒子

    var expressionList = {
        path: "./imgs/bq/",
        data: [
            { actionData: "[龇牙]", "url": "expression_ciya@2x.png" },
            { actionData: "[哈哈]", "url": "expression_haha@2x.png" },
            { actionData: "[晕]", "url": "expression_yun@2x.png" },
            { actionData: "[汗]", "url": "expression_hanb@2x.png" },
            { actionData: "[害羞]", "url": "expression_haix@2x.png" },
            { actionData: "[调皮]", "url": "expression_tiaop@2x.png" },
            { actionData: "[疑问]", "url": "expression_yiw@2x.png" },
            { actionData: "[捂脸]", "url": "expression_wulian@2x.png" },
            { actionData: "[奸笑]", "url": "expression_jianxiao@2x.png" },
            { actionData: "[机智]", "url": "expression_smart@2x.png" },
            { actionData: "[得意]", "url": "expression_deyi@2x.png" },
            { actionData: "[笑cry]", "url": "expression_laughing_tears@2x.png" },
            { actionData: "[流泪]", "url": "expression_crying@2x.png" },
            { actionData: "[奋斗]", "url": "expression_fendou@2x.png" },
            { actionData: "[抱抱]", "url": "expression_hug@2x.png" },
            { actionData: "[生病]", "url": "expression_ill@2x.png" },
            { actionData: "[尴尬]", "url": "expression_ganga@2x.png" },
            { actionData: "[偷笑]", "url": "expression_toux@2x.png" },
            { actionData: "[赞]", "url": "expression_zan@2x.png" },
            { actionData: "[握手]", "url": "expression_wos@2x.png" },
            { actionData: "[OK]", "url": "expression_ok@2x.png" },
            { actionData: "[yeak]", "url": "expression_yeak@2x.png" },
            { actionData: "[鼓掌]", "url": "expression_guz@2x.png" },
            { actionData: "[拳头]", "url": "expression_quantou@2x.png" },
            { actionData: "[肌肉]", "url": "expression_jirou@2x.png" },
            { actionData: "[握拳]", "url": "expression_woq@2x.png" },
            { actionData: "[拜托]", "url": "expression_bait@2x.png" },
            { actionData: "[愉快]", "url": "expression_yuk@2x.png" },
            { actionData: "[难过]", "url": "expression_nanguo@2x.png" },
            { actionData: "[闭嘴]", "url": "expression_bizui@2x.png" },
            { actionData: "[困]", "url": "expression_kun@2x.png" },
            { actionData: "[猪头]", "url": "expression_pig@2x.png" },
            { actionData: "[爱心]", "url": "expression_heart@2x.png" },
            { actionData: "[心碎]", "url": "expression_xinsui@2x.png" },
            { actionData: "[礼盒]", "url": "expression_box@2x.png" },
            { actionData: "[吻]", "url": "expression_kissa@2x.png" },
            { actionData: "[玫瑰花]", "url": "expression_rose@2x.png" },
            { actionData: "[棒棒糖]", "url": "expression_candy@2x.png" },
            { actionData: "[晚安]", "url": "expression_night@2x.png" },
            { actionData: "[祈祷]", "url": "expression_pray@2x.png" },
            { actionData: "[给力]", "url": "expression_geili@2x.png" },
            { actionData: "[踩]", "url": "expression_cai@2x.png" },
            { actionData: "[亲亲]", "url": "expression_kissb@2x.png" },
            { actionData: "[嘘]", "url": "expression_xu@2x.png" },
            { actionData: "[色]", "url": "expression_se@2x.png" },
            { actionData: "[可怜]", "url": "expression_kelian@2x.png" },
            { actionData: "[发呆]", "url": "expression_fadai@2x.png" },
            { actionData: "[大哭]", "url": "expression_crya@2x.png" },
            { actionData: "[困Zzz]", "url": "expression_zzz@2x.png" },
            { actionData: "[思考]", "url": "expression_sikao@2x.png" },
            { actionData: "[白眼]", "url": "expression_baiy@2x.png" },
            { actionData: "[傲慢]", "url": "expression_aoman@2x.png" },
            { actionData: "[酷]", "url": "expression_ku@2x.png" },
            { actionData: "[囧]", "url": "expression_jiong@2x.png" },
            { actionData: "[鄙视]", "url": "expression_bis@2x.png" },
            { actionData: "[饥饿]", "url": "expression_jie@2x.png" },
            { actionData: "[吓]", "url": "expression_xia@2x.png" },
            { actionData: "[抠鼻]", "url": "expression_koubi@2x.png" },
            { actionData: "[惊讶]", "url": "expression_jingy@2x.png" },
            { actionData: "[发怒]", "url": "expression_angry@2x.png" },
            { actionData: "[惊恐]", "url": "expression_jingk@2x.png" },
            { actionData: "[吐]", "url": "expression_tu@2x.png" },
            { actionData: "[拜拜]", "url": "expression_bye@2x.png" },
            { actionData: "[咖啡]", "url": "expression_coffee@2x.png" },
            { actionData: "[啤酒]", "url": "expression_beer@2x.png" },
            { actionData: "[下雨]", "url": "expression_rain@2x.png" },
            { actionData: "[闪电]", "url": "expression_shand@2x.png" },
            { actionData: "[下雪]", "url": "expression_snow@2x.png" },
            { actionData: "[足球]", "url": "expression_ball@2x.png" },
            { actionData: "[篮球]", "url": "expression_basket@2x.png" },
            { actionData: "[飞机]", "url": "expression_plane@2x.png" },
            { actionData: "[邮件]", "url": "expression_mail@2x.png" },
            { actionData: "[雨伞]", "url": "expression_yusan@2x.png" },
            { actionData: "[奖杯]", "url": "expression_jiangb@2x.png" },
            { actionData: "[怪物]", "url": "expression_guaiwu@2x.png" },
            { actionData: "[药]", "url": "expression_med@2x.png" },
            { actionData: "[炸弹]", "url": "expression_zhad@2x.png" },
            { actionData: "[蛋糕]", "url": "expression_cake@2x.png" }
        ]
    };
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
