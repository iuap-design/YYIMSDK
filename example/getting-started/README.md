# YYIM 接入指南

### 第一步：在html文件头部先后引入 jquery.js 和 YYIMSDK.js(或者YYIMSDK.min.js)。
```html
    <!-- 因为 YYIMSDK依赖于jQuery -->
    <head>
        <meta charset="UTF-8">
        <title>YYIM</title>
        <script src="http://design.yonyoucloud.com/static/jquery/3.2.1/jquery.min.js"></script>
        <script src="http://design.yyuap.com/static/imsdk-web/1.0.3/YYIMSDK.js"></script>
    </head>
```

### 第二步：初始化SDK
```js
    //通过一些配置信息去初始化YYIMSDK。
    YYIMChat.initSDK({
        app: '', //appId应用id
        etp: '', //etpId企业id
        wsurl: '', //websocket Url
        wsport: 5227, //websocket port 5227/5222/5225
        servlet: '', //rest Url
        hbport: 7075, //httpbind  port 7075/7070
        flash_swf_url: 'xxx/x/Moxie.swf', //flash 上传 swf文件位置
        logEnable: true, //client log
        clientMark: 'web', //client mark 'web' or 'pc'
        apiKey: ""
    });
```

### 第三步：初始化回调方法
```js
    //把YYIM相关的事件逻辑都写在相应的事件回调函数中。
    YYIMChat.init({
        onOpened: function() {
            // 登录成功后的回调，可以把登陆成功后需要处理的逻辑放这里。
        },
        onExpiration: function(callback) {
            //自动更新token
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
```

### 第四步：登陆YYIMSDK
```js
    //通过企业应用登陆接口，获得相关配置信息后，再通过下面的方式登陆YYIM，成功登陆后才能正常使用YYIMSDK。
    YYIMChat.login({
        "username": '', //用户名
        "token": '', //用户token
        "expiration": '', //时间戳
        "appType": 4, //企业应用类型
        "identify": '' //鉴定信息，如这样生成：var clientIdentify = "pc" + String(new Date().getTime());
    });
```

### 第五步：使用YYIMSDK
```js
    //这里以获取最近联系人YYIMSDK为例。
    YYIMChat.getRecentDigset({
        success: function (result) {
            //获取成功时执行
            console.log(result);
        },
        error: function (err) {
            //获取失败时执行
            console.log(err);
        },
        complete: function () {
            //无论成功失败，请求完成之后执行
        }
    });
```

# YYIMSDK详解

### YYIMChat.login
```js
YYIMChat.login({
    "username": '', //必传，用户名
    "token": '', //必传，用户登陆token，也就是最终链接的password
    "expiration": '', //token过期时间
    "appType": 4, //应用类型
    "identify": '' //认证信息
});
```

