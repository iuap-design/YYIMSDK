## 9.登录&退出

### 9.1.置顶

### 9.1.1.设置置顶

	/**
	 * 置顶  rongqb 20160719
	 * arg {
	 * to: String,
	 * type: String, //chat/groupchat/pubaccount
	 * success: function,
	 * error: function,
	 * complete: function
	 * }
	 */
	YYIMChat.stick(arg);

### 9.1.2.取消置顶

	/**
	* 取消置顶  rongqb 20160719
	* arg {
	* to: String,
	* type: String, //chat/groupchat/pubaccount
	* success: function,
	* error: function,
	* complete: function
	* }
	*/
	YYIMChat.cancelStick(arg);


### 9.2.静音

### 9.2.1.设置静音

	/**
	 * 静音（免打扰）  rongqb 20160719
	 * arg {
	 * to: String,
	 * type: String, //chat/groupchat/pubaccount
	 * success: function,
	 * error: function,
	 * complete: function,
	 * }
	 */
	YYIMChat.mute(arg);
	

### 9.2.2.取消静音

	/**
	* 取消静音（免打扰）  rongqb 20160719
	* arg {
	* to: String,
	* type: String, //chat/groupchat/pubaccount
	* success: function,
	* error: function,
	* complete: function
	* }
	*/
	YYIMChat.cancelMute(arg);
	
### 9.3.获取用户Profile信息包括静音和置顶信息

	/**
	 * 获取用户Profile信息包括静音和置顶信息
	 * arg {
	 * success:function,
	 * error:function,
	 * complete:function
	 * }
	 */
YYIMManager.prototype.getProfile = function(arg){
	Manager.getProfile(arg || {});
};
