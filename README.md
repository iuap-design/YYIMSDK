
# IMSDK-WEB 即时通讯JSSDK


[![npm version](https://img.shields.io/npm/v/yyimsdk.svg)](https://www.npmjs.com/package/yyimsdk)
[![Build Status](https://img.shields.io/travis/iuap-design/YYIMSDK/master.svg)](https://travis-ci.org/iuap-design/YYIMSDK)
[![Coverage Status](https://coveralls.io/repos/github/iuap-design/YYIMSDK/badge.svg?branch=master)](https://coveralls.io/github/iuap-design/YYIMSDK?branch=master)
[![NPM downloads](http://img.shields.io/npm/dm/YYIMSDK.svg?style=flat)](https://npmjs.org/package/yyimsdk)
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/iuap-design/YYIMSDK.svg)](http://isitmaintained.com/project/iuap-design/YYIMSDK "Average time to resolve an issue")
[![Percentage of issues still open](http://isitmaintained.com/badge/open/iuap-design/YYIMSDK.svg)](http://isitmaintained.com/project/iuap-design/YYIMSDK "Percentage of issues still open")

`IMSDK-WEB` 是一款解决 `web` 即时通讯的工具包，它包含基本功能包 YYIMSDK 和各功能模块扩展包（包含：摘要／下载／扩展／群组／消息／个人配置／公共号／联系人／待办／上传） 。你可以快速通过script将sdk的脚本引入，并将其初始化，即可让你的应用具备IM的能力。

## 使用文档

- [集成准备](https://iuap-design.github.io/YYIMSDK/index.html)
- [初始化](https://iuap-design.github.io/YYIMSDK/%E5%88%9D%E5%A7%8B%E5%8C%96.html)
- [消息](https://iuap-design.github.io/YYIMSDK/%E6%B6%88%E6%81%AF.html)
- [联系人](https://iuap-design.github.io/YYIMSDK/%E8%81%94%E7%B3%BB%E4%BA%BA.html)
- [群组](https://iuap-design.github.io/YYIMSDK/%E7%BE%A4%E7%BB%84.html)
- [公众号](https://iuap-design.github.io/YYIMSDK/%E5%85%AC%E4%BC%97%E5%8F%B7.html)
- [摘要](https://iuap-design.github.io/YYIMSDK/%E6%91%98%E8%A6%81.html)
- [扩展功能](https://iuap-design.github.io/YYIMSDK/%E5%85%B6%E4%BB%96.html)
- [设置置顶](https://iuap-design.github.io/YYIMSDK/profile.html)
- [登录和退出](https://iuap-design.github.io/YYIMSDK/%E7%99%BB%E9%99%86%E9%80%80%E5%87%BA.html)

## YYIMSDK 快速接入指南

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
        apiKey: ''
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
            console.log(result);
        },
        error: function (err) {
            console.log(err);
        }
    });
```

## 说明
```
_docs 是YYIMSDK.js的html说明文档；
docs 是YYIMSDK.js的md说明文档；
dist 是YYIMSDK.js的最终构建好的资源，其中esm/YYIMSDK.esm.js是es6模块化部分；
example 是web示例；
src 是YYIMSDK.js的源码；
```

## 构建步骤
```
$ npm i
$ npm run dev //把lib和YYIMSDK.esm.js合并，生成未压缩的YYIMSDK.js，并且监控src中js变化
$ npm run build //把lib和YYIMSDK.esm.js合并，生成压缩的YYIMSDK.min.js
```
