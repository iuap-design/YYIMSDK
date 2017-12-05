## 6.公众号

### 6.1.获取我关注订阅号&广播号列表

	/**
	 * 获取广播号/订阅号列表[pubaccount]
	 * @param arg {
	 * success: function, //成功回调函数
	 * error: function,  //失败回调函数
	 * complete:function //无论成功失败都回调的函数
	 * }
	 */
	YYIMChat.getPubAccount(arg);

### 6.2.查找订阅号&广播号

	/**
	 * 查找广播号/订阅号
	 * @param arg {
	 * keyword, 
	 * success: function, 
	 * error: function,
	 * complete: function
	 * }
	 */
	YYIMChat.queryPubaccount(arg);
	
### 6.3.关注订阅号

	/**
	 * 关注订阅号
	 * @param arg {
	 * 		id : 公共号id,
	 * 		success : function,
	 * 		error : function
	 * }
	 */
	YYIMChat.addPubaccount(arg);

### 6.4.消息关注订阅号

	/**
	 * 消息关注订阅号
	 * @param arg {
	 * 		id : 公共号id,
	 * 		success : function,
	 * 		error : function
	 * }
	 */
	YYIMChat.removePubaccount(arg);
	
### 6.5.消息关注订阅号

	/**
	 * 获取公众号详情
	 * arg {
	 *   id: String,
	 *   success: function,
	 *   error: function,
	 *   complete: function
	 * }
	 */
	YYIMChat.getPubAccountInfo(arg);