## 5.群组

### 5.1.获取群组列表

	/**
	 * 获取群组列表
	 * @param arg {
	 * startDate: timestamp,
	 * membersLimit: Number, //拉取成员数量，默认10
	 * success: function,    //成功回调函数
	 * error: function,  	 //失败回调函数
	 * complete:function     //无论成功失败都回调的函数
	 * }
	 */
	YYIMChat.getChatGroups(arg);

### 5.2.创建群组

	/**
	 * 创建群组
	 * @param arg {
	 * name:, //群名称
	 * members:[], //初始化群成员
	 * success:function,
	 * complete:function
	 * }
	 */
	YYIMChat.createChatGroup(arg);

### 5.3.修改群名称

	/**
	 * 群成员更改配置信息
	 *  @param arg {
	 * 	to:String,群组id
	 * 	name:string, 
	 * 	success: function,
	 * 	error:function,
	 * 	complete: function
	 * }
	 */
	YYIMChat.modifyChatGroupInfo(arg);

### 5.5.添加群成员
	
	/**
	 * 房间成员邀请人入群 
	 * @param arg {
	 * 	to:String,
	 * 	members: Array,
	 *  success:function,
	 *  error:function,
	 *  complete:function
	 * }
 	*/
	YYIMChat.inviteGroupMember(arg);

### 5.5.群组踢人

	/**
	 * 群组踢人 
	 *  @param arg {
	 *  to:String, //群组id
	 *  member:string, //被踢人id，一次只能踢一个人
	 *  success: function,
	 *  error:function,
	 *  complete: function
	 *  }
	 */
	YYIMChat.kickGroupMember(arg);


### 5.6.退出群组

	/**
	 * 群成员退出群
	 *  @param arg {
	 * 	to:String,
	 * 	success: function,
	 *  error:function,
	 *  complete: function
	 * }
	 */
	YYIMChat.exitChatGroup(arg);

### 5.7.获取群共享文件

	/**
	 * 获取群组共享文件 rongqb 20160715 
	 * arg {
	 *  id:String,
	 *  fileType: String, //'file','image','microvideo'
	 *  type: String,//'chat','groupchat'
	 *  start:number,
	 *  size:number
	 * }
	 */
	YYIMChat.getSharedFiles(arg);

### 5.8.收藏群组

	/**
	 *  收藏群组(收藏) rongqb 20151201
	 *  @param arg {
	 * 	to: String,
	 * 	success: function, 
	 *  error: function,
	 *  complete: function
	 * }
	 */
	YYIMChat.collectGroup(arg);

### 5.9.取消收藏群组

	/**
	 *  取消收藏群组
	 *  @param arg {
	 * 	to: String,
	 *  type: String, //add remove
	 * 	success: function, 
	 *  error: function,
	 *  complete: function
	 * }
	 */
	YYIMChat.removeCollectGroup(arg);

### 5.10.群主转让群

	/**
	 *  群主转让(群主行为)
	 *  @param arg {
	 *  to:String,
	 *  newOwner:string,
	 *  success:function,
	 *  error:function,
	 *  complete:function
	 *  } 
	 */
	YYIMChat.transferChatGroup(arg);	

### 5.11.群主解散群

	/**
	 *  群主解散群组 
	 *  @param arg {
	 *  to:String,
	 *  success:function,
	 *  error:function,
	 *  complete:function
	 *  }
	 */
	YYIMChat.dismissChatGroup(arg);