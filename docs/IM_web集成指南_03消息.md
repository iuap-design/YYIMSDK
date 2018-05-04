## 3.消息

### 3.1.发送消息

#### 3.1.1.发送文本（表情）消息
```js
/**
 * 发送文本消息[文本,表情]
 * @param arg {
 * to: String,  //对话人id，必传
 * type: String,  //聊天类型，可能的值有chat:单聊，groupchat:群聊,pubaccount:公众号，不传默认chat
 * content:String, //消息文本，必传
 * body: Object,  //扩展字段，选填
 * success:function
 * error:function
 * }
 */
YYIMChat.sendTextMessage({
	to: 'abc',
	type: 'chat',
	content: 'abc',
	body: {},
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	}
});
```

#### 3.1.2.发送图片消息
```js
/**
 * 发送图片消息
 * @param arg{
 * fileInputId：'DomID', //文件域id
 * drop_element: 'dropID', //拖拽上传元素id，或者数组，无拖拽上传功能可不填
 * chatInfo: function(){ //用户发送消息时获取对话人信息，必须为函数，必填
 * 	  return {
 * 		to: String //对话人id
 *      type: String, //聊天类型chat/groupchat/pubaccount
 *      extend: String  // 扩展字段，选填
 * 	  };
 * },
 * fileFiltered: function, //文件被添加到上传队列，必填
 * fileUploaded: function, //上传队列某一个文件上传完毕，选填
 * beforeUpload: function, //文件上传之前触发，必填
 * progress: function, //上传进度，选填
 * success:function,
 * error: function,
 * }
 */
YYIMChat.sendPic({
	fileInputId: 'DomID',
	drop_element: 'dropID',
	chatInfo: function(){},
	fileFiltered: function(){},
	fileUploaded: function(){},
	beforeUpload: function(){},
	progress: function(){},
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	}
});
```

#### 3.1.3.发送文件消息
```js
/**
 * 发送文件消息
 * @param arg{
 * fileInputId：'DomID', //文件域id
 * drop_element: 'dropID', //拖拽上传元素id，或者数组，无拖拽上传功能可不填
 * chatInfo: function(){ //用户发送消息时获取对话人信息，必须为函数，必填
 * 	  return {
 * 		to: String //对话人id
 *      type: String, //聊天类型chat/groupchat/pubaccount
 *      extend: String  // 扩展字段，选填
 * 	  };
 * },
 * fileFiltered: function, //文件被添加到上传队列，必填
 * fileUploaded: function, //上传队列某一个文件上传完毕，选填
 * beforeUpload: function, //文件上传之前触发，必填
 * progress: function, //上传进度，选填
 * success:function,
 * error: function,
 * }
 */
YYIMChat.sendFile({
	fileInputId: 'DomID',
	drop_element: 'dropID',
	chatInfo: function(){},
	fileFiltered: function(){},
	fileUploaded: function(){},
	beforeUpload: function(){},
	progress: function(){},
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	}
});
```

#### 3.1.4.发送分享消息
```js
/**
 * 发送分享消息[分享消息]
 * @param arg {
 * to: String, //对话人id,  //必填
 * type: String,  //对话类型，chat:单聊，groupcgat:群聊,pubaccount:公众号，不填默认chat
 * body: Object,  //扩展字段，选填
 * content:{
 * 		shareImageUrl: String, //分享中图片的url
 * 		shareUrl: String, //分享的url
 * 		shareDesc: String, //分享的内容描述
 * 		shareTitle: String //分享的标题
 * 	},
 * success:function
 * error: function,
 * }
 */    
YYIMChat.sendShareMessage({
	to: 'id',
	type: 'chat',
	body: {},
	content:{
		shareImageUrl: '',
		shareUrl: '',
		shareDesc: '',
		shareTitle: ''
	},
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	}
});
```

#### 3.1.5.发送已读回执
```js
/**
 * 发送已读回执报文
 *  @param arg {
 *   to: String,	//回执的对象，必传
 *   type: String, 	//聊天类型，可能的值：chat/groupchat/pubaccount，不填默认chat
 * 	 id: String, 	//报文id，必填
 *   sessionVersion: String  //消息版本号，必填
 * }
 */
YYIMChat.sendReadedReceiptsPacket({
	to: 'abc',
	id: 'abc',
	type: 'chat',
	sessionVersion: 255
});
```


### 3.2.接收在线消息

初始化sdk时，通过注册回调函数方式处理在线消息的处理，例如：
```js
YYIMChat.init({
			//...，
			onMessage : function(msg){}, // 接收到消息
			//...
		});
```

### 3.3.拉去历史（离线）消息
 ```js
 /**
 * 获取历史记录
 * @param arg {
 * 	id: String,  //聊天对方id，必填
 *  type: String,  //聊天类型，可能的值：chat/groupchat/pubaccount，必填
 *  contentType：Number, //内容类型，选填
 *  start: number,  //开始时间戳，不填默认0
 *  size: number,   //拉取成员长度，不填默认100
 *  startVersion: number, //开始的消息版本号，不填默认为0
 *  endVersion: number,  //结束的消息版本号，必传
 *  success:function,
 *  error:function
 * }
 */
YYIMChat.getHistoryMessage({
	id: 'abc',
	type: 'chat',
	contentType: 2,
	start: 0,
	size: 150,
	startVersion: 0,
	endVersion: 100,
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	}
});
```
	
### 3.4.消息撤回
```js
/**
 * 撤销消息
 * arg {
 * 	id: String, //消息id，必填
 *  to: String, //消息的另一方,待定
 *  type: String, //消息类型chat/groupchat/pubaccount
 *  success: function,
 *  error: function
 * }
 */
YYIMChat.revokeMessage({
	id: 'id',
	to: 'to',
	type: 'chat',
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	}
});
```

### 3.5.输入状态改变触发
```js
/**
 * 输入状态改变触发
 * @param arg {
 * 	to: String,	 //聊天对方id，必填
 *  contentType: Number,  //内容类型，不传默认2，即TEXT类型
 *  success: function,
 *  error: function
 * }
 */
YYIMChat.inputStateChange({
	to: 'abc',
	contentType: 2,
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	}
});
```
