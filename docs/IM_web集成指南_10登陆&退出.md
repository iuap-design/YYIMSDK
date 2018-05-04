## 10.登录&退出

### 10.1.登录
```js
/**
* 查找广播号/订阅号
* @param arg {
* username: String, //用户名，必填
* token: String,    //用户token，必填
* expiration: Number,  //token过期时间，必填
* appType: Number,   //应用类型，必填
* identify: String   //认证信息，必填
* }
*/
YYIMChat.login({
	username: '',
	token: '',
	expiration: 0,
	appType: 4,
	identify: ''
});
```

### 10.2.登出
```js
YYIMChat.logout();
```