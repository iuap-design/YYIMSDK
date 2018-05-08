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