# <center>用友有信WEB_SDK集成指南</center> #
感谢您使用**用友有信**，本文档将会详细为您讲述WEB_SDK的使用方法以及集成方案。<br/>
用户体系是APP当中的核心数据，也是APP中的绝对机密。用友致力于企业级软件多年，深知数据保密的重要性，所以用友IM中不保存任何APP的用户信息，也不想知道这些信息，比如CRM的APP，此APP中的用户姓名，账号，密码，电话，email等信息是保存到CRM自己的服务器中的，在使用用友IM服务时，无需把用户体系上传到用友IM服务器中。
用友服务希望以最友好的方式将IM嵌入到第三方APP中，反对暴力接入，第三方APP也无需为此改变自己的架构。
目前用友IM提供开放注册和授权注册两种用户接入的方式，每个APP可按照实际需要单独设置，也可进行调整。 

1.开放注册:
如果APP设置成开放注册模式，在使用用友IM服务时，无需事先导入用户体系，在客户端集成IM之后，用户在首次登陆时会被自动创建。

2、授权注册:
如果APP设置成授权注册模式，在使用用友IM服务时，需要事先导入用户体系或者使用REST API事先同步用户体系，在用户登录认证时，只有已集成到用户才视为合法用户。

当然，从隐私到角度来说，在使用此模式时，不必将自己的用户原账号导入到用友IM中，可在导入前做加密，只要保证此加密后的用户账号在APP内的唯一性即可。 

## 1.集成准备

### 1.1.注册开发者账号
在用友有信官网[ <https://im.yonyou.com/>](https://im.yonyou.com "用友有信") 上方点击“注册”，请按界面流程提示进行开发者账号注册。

### 1.2.创建应用
使用开发者账号登录到管理后台，点击页面上方“应用管理”，进入到应用管理。
点击左侧“新增应用”，输入应用信息即可创建，如图所示：

![img02](./image/img02.png)

在应用概况中你可以查看应用的信息，我们会在客户端使用到“应用ID”和“企业ID”，在服务端进行获取token服务时使用到“ClientID”和“ClientSecret”，如果忘记了可以在这里查看。

![img01](./image/img01.png)

### 1.3.在APP的Server端获取用友有信token
用友有信使用token进行用户验证

在APP的Server端需要新增一个获取token的服务，供客户端调用，在服务中需要调用用友有信“获取用户token”的接口获得token并返回给客户端。

用友有信使用应用的ClientID和ClientSecret获取应用访问的token,接口描述：
    
<table>
<tr>
	<td>Path</td>
    <td> rest/{etpId}/{appId}/token 其中etpId为企业ID，即申请帐号时的输入的企业ID; appId为应用ID, 可在管理后台的应用列表页查看</td>
</tr>

<tr>
	<td>HTTP Method</td>
    <td>POST</td>
</tr>

<tr>
	<td>URL Params</td>
    <td>无</td>
</tr>

<tr>
	<td>Request Headers</td>
    <td>{"Content-Type":"application/json"}</td>
</tr>

<tr>
	<td>Request Body</td>
    <td>"username":"获取token用户的用户名称", "clientId": "{app的ClientID}","clientSecret": "{app的ClientSecret}", "nickname":"昵称（可选）"}， 其中nickname为可选参数，仅在应用为开放模式下使用，如果提供了nickname且用户已经存在的情况下会更新昵称，提供了nickname且用户不存在则使用该昵称创建用户，没有提供nickname且用户存在，使用username作为nickname。</td>
</tr>

<tr>
	<td>Response Body</td>
    <td>
       <table>
         <tr><td>key</td><td>value</td></tr>
		 <tr><td>token</td><td>token值，在之后的请求中，需要将该值放置到Http Head中</td></tr>
		 <tr><td>expiration</td><td>有效时间,为从1970年1月1日到截止时间的毫秒数, 默认是24小时,在有效期内是不需要重复获取的，有效期重复获取的Token相同</td></tr>
      </table>
    </td>
</tr>

<tr>
	<td>可能的错误代码</td>
    <td> <table>
         <tr><td>错误码</td><td>错误原因</td></tr>
		 <tr><td>401</td><td>认证服务器认证失败</td></tr>
		 <tr><td>404</td><td> appId无效，应用不存在, 检查地址是否正确</td></tr>
		 <tr><td>406</td><td> clientid与appId不匹配, 检查地址和参数</td></tr>
 		 <tr><td>500</td><td> 认证过程发生错误。 </td></tr>
      </table>
   </td>
</tr>
</table>

### 1.4.下载用友有信WEB_SDK
用友有信WEB_IM下载地址：**[https://im.yonyou.com/download.html](https://im.yonyou.com/download.html "用友有信下载")**<br/>
![img03](./image/img03.png)
## 2.初始化

### 2.1.依赖的类库

WEB版的sdk主要依赖一个轻量级Javascript的程序库jQuery,这里对jQuery 的版本没有特别的要求，不过最好是比较新的版本。

### 2.2.SDK的集成

在html页面引入jQuery类库和 用友有信的web_sdk。

例如：
    
    <script type="text/javascript" src="./jquery-3.2.1.min.js"></script>
    <script type="text/javascript" src="./YYIMSDK.min.js"></script>

引入YYIMSDK后全局会有一个YYIMChat对象，一切操作都基于此对象来做。

### 2.3.初始化sdk
    YYIMChat.initSDK({
		app: String, //appId(应用id)
		etp: String, //etpId(企业id)
		wsurl: String, //websocket Url(长链接地址)
		wsport: Number, //websocket port 5227/5222/5225(长链接端口)
		hbport: Number, //httpbind  port 7075/7070(短链接端口)
		servlet: String, //rest Url(短链接地址)
		flash_swf_url: 'xxx/x/Moxie.swf', //flash方式上传，用于兼容低版本浏览器上传功能， 这里填dist下upload中.swf文件在你项目中的路径
		logEnable: false, //client log
		clientMark: 'web' //client mark 'web' or 'pc',
		apiKey: String  //AI KEY
	}); 

YYIMChat.initSDK(options)的主要作用是重置全局配置。

### 2.4.初始化回调方法			
	YYIMChat.init({
		onOpened: function() {
			// 登录成功
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
			//收到消息,包括收到他人给自己发的消息和所有的群消息
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

YYIMChat.init(options)的作用是注册通讯回调逻辑。

### 2.5.SDK登陆			
	YYIMChat.login({
		"username": String, //用户名
		"token": String,    //用户token
		"expiration": String,  //过期时间
		"appType": Number,   //应用类型
		"identify": String   //认证信息
	});

YYIMChat.login(options)的作用是根据配置完成websocket连接。以上参数由应用登陆接口获得。

完成以上三个初始化API后就能正常调用其他API了。

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
/*
*成功后返回字段(一个文本消息对象):
*/
{
	data: {
		content: "消息[愉快]", //消息内容
		contentType: 2,  //消息类型
		dateline: 1525756786467,  //发送时间
		extend: "{"intelligentAnalysis":{"intelligentable":true}}"  //消息扩展
	},
	from: "zongtf",  //发送者id
	id: "5075205B-CA24-41CE-9B7E-A4245724EAB1",  //消息id
	resource: "web-v2.6",  //资源
	sessionVersion: 0,  //消息版本号
	to: "majun5",  //接受者id
	type: "chat"  //聊天类型
}
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
	chatInfo: function(){
		return {
			to: 'id',
			type: 'chat',
			extend: ''
		}
	},
	fileFiltered: function(){},
	fileUploaded: function(){},
	beforeUpload: function(){},
	progress: function(pro){
		console.log('上传进度'+pro);
	},
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	}
});
/*
*成功后返回字段(一个图片消息对象):
*/
{
	data: {
		content: {
			attachId: "", //资源id，可通过YYIMChat.getFileUrl(attachId)获取完整url
			fid: 0,
			from: 0,
			id: "",
			name: "", //图片名称
			original: 1,
			path: "", //图片路径
			size: 10002, //图片大小
			type: "png" //图片类型
		},
		contentType: 8,  //消息类型
		dateline: 1525756786467,  //发送时间
		extend: "{"intelligentAnalysis":{}}"  //消息扩展
	},
	from: "zongtf",  //发送者id
	id: "",  //消息id
	resource: "web-v2.6",  //资源
	sessionVersion: 0,  //消息版本号
	to: "majun5",  //接受者id
	type: "chat"  //聊天类型
}
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
/*
*成功后返回字段(一个文件消息对象): 结构参照图片类型
*/
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
			onMessage : function(msg){}, // 接收到消息,返回一个消息对象
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
/**
*成功时返回数据:
*/
{
	list: [], //消息列表，列表元素是消息对象
	contactReadVersion: 237,  //消息被度的版本号，用来判断是否有未读消息
	result: "success",
	total: 20 //消息条数
}
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
## 4.联系人

### 4.1.好友

#### 4.1.1.获取好友列表
```js
/**
 * 获取好友列表[roster]
 * @param arg {
 * 	success: function, 
 * 	error: function,
 * 	complete: function
 * }
 */
YYIMChat.getRosterItems({
	success: function(data){
		console.log(data);
	},
	error: function(err){
		console.log(err);
	},
	complete: function(){}
});
``` 

#### 4.1.2.添加好友
```js
/**
 * 添加好友
 * @param id //被添加人id
 */
YYIMChat.addRosterItem(id);
``` 

#### 4.1.3.删除好友
```js
/**
 * 删除好友, 
 * @param arg {
 * id: string, //被删除人id
 * success: function, 
 * error: function,
 * complete: function
 * }
 */
YYIMChat.deleteRosterItem({
	id: 'id',
	success: function(data){
		console.log(data);
	},
	error: function(err){
		console.log(err);
	},
	complete: function(){}
});
``` 

#### 4.1.4.查询好友
```js
/**
 * 查找好友[roster][包括好友和非好友]
 * @param arg {
 * keyword,  //查询字段：userName, name，必填
 * start,  //开始时间戳，默认0
 * size,   //获取成员数量，默认20
 * success: function, 
 * error: function,
 * complete: function
 * }
 */
YYIMChat.queryRosterItem({
	keyword: 'keyword',
	start: 0,
	size: 30,
	success: function(data){
		console.log(data);
	},
	error: function(err){
		console.log(err);
	},
	complete: function(){}
});
/**
* 成功时返回字段：
*/
{
	items: [], //好友列表
	start: 0, //开始时间戳
	total: 0 //好友条数
}
``` 


#### 4.1.5.更新好友备注、分组
```js
/**
 * 更新好友
 * @param arg {
 * 		roster : {
 * 			id : 好友id,
 * 			name : 好友昵称,
 * 			groups : ["group1","group2"] // 好友所在分组
 * 		},
 * 		success : function,
 * 		error : function
 * }
 */
YYIMChat.updateRosterItem({
	roster: {
		id: 'rosterid',
		name: '',
		groups: []
	},
	success: function(data){
		console.log(data);
	},
	error: function(err){
		console.log(err);
	}
});
```

#### 4.1.6.同意联系人的订阅请求
```js
/**
 * 同意联系人的订阅请求
 * @param id 请求订阅的联系人的ID
 */
YYIMChat.approveSubscribe(id);
```

#### 4.1.7.拒绝联系人的订阅请求
```js
/**
 * 拒绝联系人的订阅请求
 * @param id 请求订阅的联系人的ID
 */
YYIMChat.rejectSubscribe(id);
```

### 4.2.联系人（好友&非好友）

#### 4.2.1.查询联系人的在线状态
```js
/**
 * 获取用户在线状态
 * arg {
 * username: ['zhangsan','lisi'], //用户id数组，必传
 * success:function,
 * error:function
 * }
 */
YYIMChat.getRostersPresence({
	username: ['zhangsan','lisi'],
	success: function(data){
		console.log(data);
	},
	error: function(err){
		console.log(err);
	}
});
/*返回值说明：*/   
[{
	"userid": "litingd",
	"prensence": [{
		available: 1, //1表示在线，0表示不在线
		show: "chat", //没有该字段（等同于null)表示在线，chat/away/xa/dnd表示如下文。
		device: "android" //可能的值有android/ios/pc/web
	}， {
		available: 1, //1表示在线，0表示不在线,
		show: "away", //没有该字段（等同于null)表示在线，chat/away/xa/dnd表示如下文。
		device: "web" //可能的值有android/ios/pc/web
	}]
}, {
	"userid": "liuhaoi",
	"prensence": [{
		available: 1, //1表示在线，0表示不在线
		show: "chat", //没有该字段（等同于null)表示在线，chat/away/xa/dnd表示如下文。
		device: "android" //可能的值有android/ios/pc/web
	}， {
		available: 1, //1表示在线，0表示不在线
		show: "away", //没有该字段（等同于null)表示在线，chat/away/xa/dnd表示如下文。
		device: "web" //可能的值有android/ios/pc/web
	}]
}]

/*show字段对照表：

    away -- 该实体或资源临时离开.
    chat -- 该实体或资源活跃并想聊天.
    dnd -- 该实体或资源忙(dnd = "Do Not Disturb"，免打扰).
    xa -- 该实体或资源要离开相当长时间(xa = "eXtended Away"，长时间离开).
    如果show未被提供或为NULL, 该实体被假定在线并且可用.
*/
``` 

#### 4.2.2.查询联系人的VCard
```js
/**
 * 获取好友的VCard
 * @param arg {
 * 		id: String,  //好友id，必传，如果不传，则表示获取自己的VCard,
 * 		success : function,
 * 		error : function
 * }
 */
YYIMChat.getVCard({
	id: 'id',
	success: function(data){
		console.log(data);
	},
	error: function(err){
		console.log(err);
	}
});
``` 

#### 4.2.3.获取所有好友的VCard
```js
/**
 * 获取所有好友的VCard
 * 
 * @param arg {
 * 		success : function,
 * 		error : function
 * }
 */
YYIMChat.getVCards({
	success: function(data){
		console.log(data);
	},
	error: function(err){
		console.log(err);
	}
});
``` 

#### 4.2.4.修改好友的Tag
```js
/**
 * 修改好友的Tag
 * @param arg {
 * 		id: String, //好友id 
 * 		tag : Array,
 * 		success : function,
 * 		error : fcuntion
 * }
 */
YYIMChat.setRosterTag({
	id: 'id',
	tag: [],
	success: function(data){
		console.log(data);
	},
	error: function(err){
		console.log(err);
	}
});
```

#### 4.2.5.删除好友的Tag
```js
/**
 * 删除好友的Tag
 * @param arg {
 * 		id: String, //好友id 
 * 		tag : Array,
 * 		success : function,
 * 		error : fcuntion
 * }
 */
YYIMChat.removeRosterTag({
	id: 'id',
	tag: [],
	success: function(data){
		console.log(data);
	},
	error: function(err){
		console.log(err);
	}
});
```


### 4.3.当前用户

#### 4.3.1.获取自己的VCard
```js
/**
 * 获取自己的VCard
 * @param arg {
 * 		success : function,
 * 		error : function
 * }
 */
YYIMChat.getVCard({
	success: function(data){
		console.log(data);
	},
	error: function(err){
		console.log(err);
	}
});
/**
* 成功时返回字段:
*/
{
	email:"",
	enableFields:true,
	gender:"男",
	id:"zongtf",
	location:"北京",
	mobile:"13655253330",
	nickname:"宗腾飞",
	number:"1000083",  //工号
	photo:"attachid",  //图片id
	position:"职位",
	remarks:"备注信息",
	telephone:"",
	ts:1509934917532,
	userId:"zongtf",
	username:"zongtf.udn.yonyou"
}
``` 

#### 4.3.2.修改当前用户的VCard
```js
/**
 * 修改当前用户的VCard
 * @param arg {
 * 		nickname:String,
 * 		photo:String,
 * 		email:String,
 * 		mobile:Number,
 * 		telephone:Number,
 *      organization:String,
 *      gender:,
 *      number:Number,
 *      remarks:,
 * 		location:String,
 *      position:String,
 * 		success : function,
 * 		error : fcuntion
 * }
 */
YYIMChat.setVCard({
	nickname:String,
	photo:String,
	email:String,
	mobile:Number,
	telephone:Number,
	organization:String,
	gender:,
	number:Number,
	remarks:,
	location:String,
	position:String,
	success: function(data){
		console.log(data);
	},
	error: function(err){
		console.log(err);
	}
});
``` 
#### 4.3.3.修改当前用户的Tag
```js
/**
 * 修改当前用户的Tag
 * @param arg {
 * 		tag : Array,
 * 		success : function,
 * 		error : fcuntion
 * }
 */
YYIMChat.setVCardTag({
	tag: [],
	success: function(data){
		console.log(data);
	},
	error: function(err){
		console.log(err);
	}
});
```
#### 4.3.4.删除当前用户的Tag
```js
/**
 * 删除当前用户的Tag
 * @param arg {
 * 		tag : Array,
 * 		success : function,
 * 		error : fcuntion
 * }
 */
YYIMChat.removeVCardTag({
	tag: [],
	success: function(data){
		console.log(data);
	},
	error: function(err){
		console.log(err);
	}
});
```

#### 4.3.5.修改当前用户的在线状态
```js
/**
 * 设置上线状态
 * @param arg {
 *  show: true, //如果show未被提供或为NULL, 该实体被假定在线并且可用
 * 	status: String  //在线状态，away -- 离开，chat -- 在线，dnd -- 忙(dnd = "Do Not Disturb"，免打扰)，xa -- 长时间离开(xa = "eXtended Away"，长时间离开)，必传
 * }
 */
YYIMChat.setPresence({
	show: true,
	status: 'chat'
});
```
	
### 4.4.收藏好友

#### 4.4.1.查询收藏的好友列表
```js
/**
 * 获取收藏联系人列表
 * @param {Object} arg {
 * 	success: function,
 * 	error: function
 * }
 */
YYIMChat.getFavoriteRosterList({
	success: function(data){
		console.log(data);
	},
	error: function(err){
		console.log(err);
	}
});
```
	
#### 4.4.2.收藏/取消好友
```js
/**
 * 收藏/取消收藏 联系人[roster]
 * @param arg id
 * @param arg type 'add' /'remove'
 */
YYIMChat.favoriteRoster(id,type);
```
	
#### 4.4.3.修改收藏联系人的备注
```js
/**
 * 修改收藏联系人的备注 
 * @param arg id
 * @param arg name //备注名
 */
YYIMChat.updateFavoriteRoster(id,name);
```
## 5.群组

### 5.1.获取群组列表
```js
/**
 * 获取群组列表
 * @param arg {
 * startDate: timestamp, //开始时间戳，不传默认0
 * membersLimit: Number, //拉取成员数量，不传默认10
 * success: function,    //成功回调函数
 * error: function,  	 //失败回调函数
 * }
 */
YYIMChat.getChatGroups({
	startDate: 1525247354,
	membersLimit: 20,
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	}
});
/**
 * 成功时返回字段:
 */
{
	leftRooms: [""],
	roomItems: [
		{
			collected: 0,
			jid: "",  //群的jid
			members: [],  //群人员列表
			name: "",  //群名
			numberOfMembers: 2,  //群人员数
			safeModel: false,
			superLarge: false,
			ts: 1493962143933
		}
	]
}
```

### 5.2.创建群组
```js
/**
 * 查找群
 * @param arg {
 * keyword,  //关键字，必填
 * start,  //开始时间戳，不传默认0
 * size,   //拉取成员数量，不传默认20
 * success: function, 
 * error: function,
 * complete: function
 * }
 */
YYIMChat.queryChatGroup({
	keyword: 'abc',
	start: 1525247354,
	size: 10,
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	},
	complete:function(){}
});
```

### 5.3.加入群组
```js
/**
 * 加入群组
 * @param arg {
 * id: String,  //群组id，必传
 * success:function, 
 * error:function
 * }
 */
YYIMChat.joinChatGroup({
	id: 'abc',
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	}
});
```

### 5.4.获取群组信息
```js
/**
 * 获取群组信息
 * @param arg {
 * id : String, //群组id，必传
 * membersLimit: Number, //群成员数量限制，可不传
 * success : function, 
 * error : function
 * }
 */
YYIMChat.getChatGroupInfo({
	id: 'abc',
	membersLimit: 40,
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	}
});
```

### 5.5.创建群组
```js
/**
 * 创建群组
 * @param arg {
 * 	name: String, //群名称，必传
 * 	members:[], //群成员数组，必传，不能为空数组
 *  success: function, 
 *  error: function, 
 *  complete:function
 * }
 */
YYIMChat.createChatGroup({
	name: 'abc',
	members: ['a', 'b'],
	to: 'abc',
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	},
	complete:function(){}
});
```


### 5.6.群主转让群组
```js
/**
 *  群主转让群组
 *  @param arg {
 *  to:String,  //群组id，必传 
 *  newOwner:string,  //新群主id，必传
 *  success:function,
 *  error:function,
 *  complete:function
 *  }
 */
YYIMChat.transferChatGroup({
	to: 'abc',
	newOwner: 'cde',
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	},
	complete:function(){}
});
```

### 5.7.群主解散群组
```js
/**
 *  群主解散群组
 *  @param arg {
 *  to:String,  //群组id，必传
 *  success:function,
 *  error:function,
 *  complete:function
 *  }
 */
YYIMChat.dismissChatGroup({
	to: 'abc',
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	},
	complete:function(){}
});
```

### 5.8.群成员邀请人入群
```js
/**
 * 群成员邀请人入群
 * @param arg {
 * 	to:String,  //群组id，必传 
 * 	members: Array,  //邀请的成员数组，必传，不能为空数组
 *  success:function,
 *  error:function,
 *  complete:function
 * }
 */
YYIMChat.inviteGroupMember({
	to: 'abc',
	members: ['a', 'b'],
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	},
	complete:function(){}
});
```

### 5.9.群成员更改配置信息
```js
/**
 * 群成员更改配置信息
 *  @param arg {
 * 	to:String,  //群组id，必传
 * 	name:string, //群名称，必传
 * 	success: function,
 * 	error:function,
 * 	complete: function
 * }
 */
YYIMChat.modifyChatGroupInfo({
	to: 'abc',
	name: 'cde',
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	},
	complete:function(){}
});
```

### 5.10.群主踢人
```js
/**
 * 群主踢人 
 *  @param arg {
 *  to:String, //群组id，必传
 *  member:string, //被踢人id，一次只能踢一个人，必传
 *  success: function,
 *  error:function,
 *  complete: function
 *  }
 */
YYIMChat.kickGroupMember({
	to: 'abc',
	member: 'cde',
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	},
	complete:function(){}
});
```	

### 5.11.群成员退出群
```js
/**
 * 群成员退出群
 *  @param arg {
 * 	to:String,  //群组ld，必传
 * 	success: function,
 *  error:function,
 *  complete: function
 * }
 */
YYIMChat.exitChatGroup({
	to: 'abc',
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	},
	complete:function(){}
});
```

### 5.12.收藏群组
```js
/**
 *  收藏群组
 *  @param arg {
 * 	to: String,  //群组id，必传
 * 	success: function, 
 *  error: function,
 *  complete: functionf
 * }
 */
YYIMChat.collectGroup({
	to: 'abc',
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	},
	complete:function(){}
});
```

### 5.13.取消收藏群组
```js
/**
 *  取消收藏群组
 * @param arg {
 * 	to: String,  //群组id，必传
 * 	success: function, 
 *  error: function,
 *  complete: function
 * }
 */
YYIMChat.removeCollectGroup({
	to: 'abc',
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	},
	complete:function(){}
});
```

### 5.14.获取群组共享文件
```js
/**
 * 获取群组共享文件
 * @param arg {
 *  id:String, //群组id，必传
 *  fileType: String, //'file','image','microvideo'，文件类型，不传默认file
 *  type: String,  //'chat','groupchat'，聊天类型，不传默认chat
 *  start:number,  //开始时间戳，不传默认0
 *  size:number,  //获取对象的最大长度，不传默认20
 *  success: function,
 *  error: function
 * }
 */
YYIMChat.getSharedFiles({
	id: 'abc',
	fileType: 'image',
	type: 'groupchat',
	start: 0,
	size: 10,
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	}
});
```

### 5.15.获取群组成员
```js
/**
 * 获取群组成员
 * @param arg {
 *  id:String, //群组id，必传
 *  success: function,
 *  error: function
 * }
 */
YYIMChat.getGroupMembers({
	id: 'abc',
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	}
});
```
## 6.公众号

### 6.1.获取我关注订阅号&广播号列表
```js
/**
* 获取广播号/订阅号列表[pubaccount]
* @param arg {
* success: function, //成功回调函数
* error: function,  //失败回调函数
* complete:function //无论成功失败都回调的函数
* }
*/
YYIMChat.getPubAccount({
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	},
	complete: function(){}
});
```

### 6.2.查找订阅号&广播号
```js
/**
* 查找广播号/订阅号
* @param arg {
* keyword: String, //关键词，必填
* start: Numert,  //开始时间戳，默认0
* size: Number,  //拉取成员长度，默认20
* success: function, //成功回调函数
* error: function,  //失败回调函数
* complete:function //无论成功失败都回调的函数
* }
*/
YYIMChat.queryPubaccount({
	keyword: '',
	start: 0,
	size: 10,
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	},
	complete: function(){}
});
```
	
### 6.3.关注订阅号
```js
/**
 * 关注订阅号
 * @param arg {
 * id : String, //公共号id，必填
 * success : function,
 * error : function
 * }
 */
YYIMChat.addPubaccount({
	id: 'id',
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	}
});
```

### 6.4.取消关注订阅号
```js
/**
 * 取消关注订阅号
 * @param arg {
 * id : String, //公共号id，必填
 * success : function,
 * error : function
 * }
 */
YYIMChat.removePubaccount({
	id: 'id',
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	}
});
```
	
### 6.5.获取公众号详情
```js
/**
 * 获取公众号详情
 * @param arg {
 * id : String, //公共号id，必填
 * success : function,
 * error : function
 * }
 */
YYIMChat.getPubAccountInfo({
	id: 'id',
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	}
});
```
## 7.摘要（最近联系人／群组／公共号 ）

### 7.1.获取最近联系人
```js
/**
 * 获取最近联系人（群组、公众号）摘要列表
 * @param arg {
 * startDate: timestamp, //开始时间戳，不传默认为0
 * size: Number, //返回列表的最大长度，最大值为500，不传默认为50
 * success:function,
 * error:function
 * }
 */
YYIMChat.getRecentDigset({
	startDate: 1525247354,
	size: 100,
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	}
});
/**
 * 成功时返回字段：
 */
{
	personalVersion: 4773,
	ts: 1525761511308,
	list: [  //联系人列表
		contactReadedVersion: 0,
		jid: "",
		lastContactTime: 1525674343416,  //最后联系时间
		lastMessage: {},  //最后一条消息对象
		readedVersion: 14,  //消息的read版本号
		sessionVersion: 14,  //消息的session版本号
		state: exists
	],
	count: 22  //联系人数
}
```
	
### 7.2.删除摘要
```js
/**
 * 删除最近联系人摘要
 * @param arg {
 * id: String, //联系人id，必传
 * type: String, //聊天类型，不传默认为chat
 * success:function,
 * error:function
 */
YYIMChat.removeRecentDigest({
	id: 'abc',
	type: 'chat',
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	}
});
```
## 8.扩展功能

### 8.1.多端通话
```js
/**
 *  多方通话
 * @param arg {
 * 	caller: String //主叫号码，必传
 *  phones：Array //被叫号码列表，必须是号码数组，长度不能为0
 *  accountMmanaged:true, //账号托管为true时，不需要输入账号和密码，去im多租户后台管理账号
 *  account：//通话账号  accountMmanaged为true时 不传
 *  key：//通话秘钥  accountMmanaged为true时 不传
 *  success:function,
 *  error:function
 * }
 */
YYIMChat.getFileUrl({
	caller: '13588880000',
	phones: ['13588880001', '13588880002'],
	accountMmanaged: true,
	account: 'abc',
	key: 'abc',
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	}
});
```
### 8.2.获取时间校正结果
```js
/**
 * 获取时间校正结果
 * @param function(result){
 * 		result就是校正结果
 * }
 */
YYIMChat.getTimeCorrection(function(result){
	console.log(result);
});
```

### 8.3.获取缩略图列表
```js
/**
 * 获取缩略图列表
 * @param {Object} arg {
 * 	attachId: String, //附件id，必传
 *  success: function,
 *  error: function
 * }
 */
YYIMChat.getTransformFileList({
	attachId: 'abc',
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	}
});
```

### 8.4.获取附件地址
```js
/**
 * 获取附件地址
 * @param {Object} 
 * attachId: String, //附件id，必传
 * mediaType: Number //附件类型，1或者2，不传默认2
 */
YYIMChat.getFileUrl(attachId, mediaType);
```

### 8.5.设置IM具备AI能力
```js
/**
 * 设置IM具备AI能力
 * arg {
 *  intelligentable:true,  //是否开启智能，必传
 *  success:function,
 *  error:function
 * }
 */
YYIMChat.setAIAbility({
	intelligentable:true,
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	}
});
```

### 8.6.获取用户AI热词,用于前端过滤
```js
/**
 * 获取用户AI热词,用于前端过滤
 * arg {
 * success:function,
 * error:function
 * }
 */
YYIMChat.getAIWords({
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	}
});
```

### 8.7.获取用户AI热词,用于前端过滤
```js
/**
* 设置AI分析开关是否启用
* isAIAbility boolean //必传
*/
YYIMChat.openAIAbility(isAIAbility);
```

### 8.8.设置是否启用热词过滤
```js
/**
 * 设置是否启用热词过滤
 * isOpenFilter boolean  //必传
 */
YYIMChat.openFilterWords(isOpenFilter);
```

### 8.9.注入热词
```js
/**
 * 注入热词
 * intelligentWordsTime String //热词时间戳
 */
YYIMChat.setDictionaries(intelligentWordsTime);
```

### 8.10.判断消息是否传递给AI分析
```js
/**
 * 判断消息是否传递给AI分析
 * keyword String  //必传
 */
YYIMChat.intelligentAnalysis(keyword);
```

### 8.11.获取当前在线的设备
```js
/**
 * 获取当前在线的设备
 * arg {
 * success:function,
 * error:function
 * }
 */
YYIMChat.getMultiTerminals({
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	}
});
```

### 8.12.发送协同命令
```js
/**
 * 发送协同命令
 * arg {
 * data:{},
 * success:function,
 * error:function
 * }
 */
YYIMChat.sendMultiTerminalsCommand({
	data:{},
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	}
});
```
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