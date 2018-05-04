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