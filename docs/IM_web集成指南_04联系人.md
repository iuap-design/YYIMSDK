## 4.联系人

### 4.1.好友

#### 4.1.1.请求好友列表

    /**
	 * 请求好友列表
	 * @param arg {
	 * success: function, //成功回调函数
	 * error: function,  //失败回调函数
	 * complete:function //无论成功失败都回调的函数
	 * }
	 */
	YYIMChat.getRosterItems(arg);

#### 4.1.2.添加好友

	/**
	 * 添加好友
	 * @param id //被添加人id
	 */
    YYIMChat.addRosterItem(id);

#### 4.1.3.删除好友

	/**
	 * 删除好友, 
	 * @param arg {
	 * id: string, //被删除人id
	 * success: function, 
	 * error: function,
	 * complete: function}
	 */
	YYIMChat.deleteRosterItem(arg);

#### 4.1.4.查询好友

	/**
	 * 查找好友[roster][包括好友和非好友]，查询字段：userName, name
	 * @param arg { 
	 * keyword, 
	 * success: function, 
	 * error: function,
	 * complete: function
	 * }
	 */
	YYIMChat.queryRosterItem(arg);


#### 4.1.5.更新好友备注、分组
    
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
	YYIMChat.updateRosterItem(arg);


### 4.2.联系人（好友&非好友）

#### 4.2.1.查询联系人的在线状态

    /**
	 * 获取用户在线状态 rongqb 20151119
	 * arg {
	 * username: ['zhangsan','lisi'],
	 * success:function,
	 * error:function,
	 * complete:function,
	 * }
	 * resource:2.1
	 */
	YYIMChat.getRostersPresence(arg);

返回值说明：
    
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

show字段对照表：

    away -- 该实体或资源临时离开.
    chat -- 该实体或资源活跃并想聊天.
    dnd -- 该实体或资源忙(dnd = "Do Not Disturb"，免打扰).
    xa -- 该实体或资源要离开相当长时间(xa = "eXtended Away"，长时间离开).
    如果show未被提供或为NULL, 该实体被假定在线并且可用.

#### 4.2.2.查询联系人VCard
    
	/**
	 * 请求自己或好友的VCard
	 * @param arg
	 * 	{
	 * 		jid : 为空则请求自己的VCard,
	 * 		success : function,
	 * 		error : function,
	 * 		complete : function
	 *  }
	 */
	YYIMChat.getVCard(arg);


### 4.3.当前用户

#### 4.3.1.请求自己&所有好友的VCard
    
	/**
	 * 请求自己&所有好友的VCard
	 * @param arg
	 * {
	 * 		success : function,
	 * 		error : function,
	 * 		complete : function
	 * }
	 */
	YYIMChat.getVCards(arg);

#### 4.3.2.修改当前用户的VCard

	/**
	 * 修改当前用户的VCard
	 * @param arg {
	 * 		vcard : {
	 * 			nickname,
	 * 			photo,
	 * 			email,
	 * 			mobile,
	 * 			telephone
	 * 		},
	 * 		success : function,
	 * 		error : fcuntion
	 * }
	 */
	YYIMChat.setVCard(arg);


#### 4.3.4.修改当前用户的在线状态

	/**
	 * 设置上线状态
	 * @param arg{show, status} 空则为在线
	 *  away -- 该实体或资源临时离开.
	    chat -- 该实体或资源活跃并想聊天.
	    dnd -- 该实体或资源忙(dnd = "Do Not Disturb"，免打扰).
	    xa -- 该实体或资源要离开相当长时间(xa = "eXtended Away"，长时间离开).
	       如果show未被提供或为NULL, 该实体被假定在线并且可用. 
	 */
	YYIMChat.setPresence(arg);
	
### 4.4.收藏好友

#### 4.4.1.查询收藏的好友列表

	/**
	 * 获取收藏联系人列表
	 * @param {Object} arg {
	 * 	success: function,
	 * 	error: function
	 * }
	 */
	YYIMChat.getFavoriteRosterList(arg);
	
#### 4.4.2.收藏/取消好友

	/**
	 * 收藏/取消收藏 联系人[roster]
	 * @param arg id
	 * @param arg type 'add' /'remove'
	 */
	YYIMChat.favoriteRoster(id,type);
	
#### 4.4.3.修改收藏联系人的备注

	/**
	 * 修改收藏联系人的备注 
	 * @param arg id,name
	 */
	YYIMChat.updateFavoriteRoster(id,name);