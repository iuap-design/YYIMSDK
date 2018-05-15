//加载事件操作
import './js/controlEvent';

//获取最近联系人
import getRecentDigset from './js/getRecentDigset';

//渲染历史聊天记录
import renderHistoryMessage from './js/renderHistoryMessage';

import { $own_avatar } from './js/jqelements';

//初始化SDK，正式环境
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
YYIMChat.init({
    onOpened: function() {
        // 登录成功设置在线状态
        YYIMChat.setPresence();
        //移除保存的通讯对方id，避免页面刷新后最近联系人联系状态还记录着
        localStorage.removeItem('targetuserid');
        // 获取自己信息
        YYIMChat.getVCard({
            success: function (res) {
                if(res.photo)$own_avatar.find('img').attr('src',YYIMChat.getFileUrl(res.photo));
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
    onMessage: function(msg) {
        //从本地拿取聊天类型
        let chattype = localStorage.getItem('chattype');
        if(chattype == 'chat'){   //如果给群组发消息会出发此回调
            //渲染历史聊天记录
            renderHistoryMessage(msg);
        }
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

