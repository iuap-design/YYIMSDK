//加载事件操作
import './js/controlEvent';

//获取最近联系人
import getRecentDigset from './js/getRecentDigset';

//初始化SDK
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
YYIMChat.init({
    onOpened: function() {
        // 登录成功
        YYIMChat.setPresence();
        // 获取自己信息
        YYIMChat.getVCard({
            success: function (res) {
                //保存自己的信息
                localStorage.setItem('currentuserinfo', JSON.stringify(res));
            }
        });
        //获取最近联系人
        getRecentDigset();
    },
    onExpiration: function(callback) {
        //自动更新token
        // callback(token, expiration);
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
        console.log('收到消息了：', arg);
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

