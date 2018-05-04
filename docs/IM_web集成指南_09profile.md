## 9.用户Profile

### 9.1.置顶

### 9.1.1.设置置顶
```js
/**
* 置顶
* arg {
* to: String, //对方id，必填
* type: String, //聊天类型，chat/groupchat/pubaccount，默认chat
* success: function,
* error: function
* }
*/
YYIMChat.stick({
	to: 'to',
	type: 'chat',
	success: function(data){
		console.log(data);
	},
	error: function(err){
		console.log(err);
	}
});
```

### 9.1.2.取消置顶
```js
/**
* 取消置顶
* arg {
* to: String, //对方id，必填
* type: String, //聊天类型，chat/groupchat/pubaccount，默认chat
* success: function,
* error: function
* }
*/
YYIMChat.cancelStick({
	to: 'to',
	type: 'chat',
	success: function(data){
		console.log(data);
	},
	error: function(err){
		console.log(err);
	}
});
```

### 9.2.静音

### 9.2.1.设置静音
```js
/**
* 设置静音
* arg {
* to: String, //对方id，必填
* type: String, //聊天类型，chat/groupchat/pubaccount，默认chat
* success: function,
* error: function
* }
*/
YYIMChat.mute({
	to: 'to',
	type: 'chat',
	success: function(data){
		console.log(data);
	},
	error: function(err){
		console.log(err);
	}
});
```

### 9.2.2.取消静音
```js
/**
* 取消静音
* arg {
* to: String, //对方id，必填
* type: String, //聊天类型，chat/groupchat/pubaccount，默认chat
* success: function,
* error: function
* }
*/
YYIMChat.cancelMute({
	to: 'to',
	type: 'chat',
	success: function(data){
		console.log(data);
	},
	error: function(err){
		console.log(err);
	}
});
```
	
### 9.3.获取用户Profile信息包括静音和置顶信息
```js
/**
* 获取用户Profile信息包括静音和置顶信息
* arg {
* success:function,
* error:function,
* }
*/
YYIMChat.getProfile({
	success: function(data){
		console.log(data);
	},
	error: function(err){
		console.log(err);
	}
});
```
