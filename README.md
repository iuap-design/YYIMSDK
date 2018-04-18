
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

## 一分钟快速接入 IMSDK-WEB

```
<script type="text/javascript" src="./jquery-1.11.1.min.js"></script>
<script type="text/javascript" src="./YYIMSDK.js"></script>
```

```
YYIMChat.initSDK('{appId}', '{etpId}'); 

YYIMChat.init({
            onOpened :  onOpened, // 登录成功
            onClosed : onClosed, // 连接关闭
            onAuthError : onAuthError, // 认证失败
            onStatusChanged : onStatusChanged, //连接状态改变
            onConnectError : onConnectError, // 连接错误
            onPresence : onPresence, // 好友状态改变
            onSubscribe : onSubscribe, // 订阅处理
            onRosterUpdateded : onRosterUpdateded, //联系人信息更新
            onRosterDeleted : onRosterDeleted, //被联系人删除
            onReceipts : onReceipts, // 接收到消息回执
            onTextMessage : onTextMessage, // 接收到文本(表情)消息
            onPictureMessage : onPictureMessage, // 接收到图片
            onFileMessage : onFileMessage // 接收到文件
            onShareMessage : onShareMessage, //接收到分享消息
            onSystemMessage: onSystemMessage, //接收到单图文消息
            onPublicMessage: onPublicMessage, //接收到多图文消息
            onLocationMessage: onLocationMessage, //接收到位置共享消息
            onAudoMessage : onAudoMessage, //接收到语音消息
            onGroupUpdate :  onGroupUpdate, //群组信息及成员信息更新
            onKickedOutGroup : onKickedOutGroup //被群组踢出
        });
```

## Contribute 如何参与IMSDK的修改

```
$ npm i
$ npm run build
```

```
# 开发
$ npm run dev
```

## TODO

- [ ] [将 gulp 改为 webpack，产出不同模块机的可用资源包，构建到 dist 目录]()
- [ ] [按 ESM 的方式重构 src 下的代码]()
- [ ] [将项目中引用到的资源存放到 src/vendors 目录]()
- [ ] [根据使用方式完善 example 下的示例代码]()
- [ ] [【重要】实现小友及智能端提出的功能需求]()
- [x] [新增 github pages 最新文档官网]()

