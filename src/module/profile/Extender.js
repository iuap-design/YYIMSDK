/**
 * 获取用户Profile信息包括静音和置顶信息 rongqb 20160719
 * arg {
 * success:function,
 * error:function,
 * complete:function
 * }
 */
YYIMManager.prototype.getProfile = function(arg){
	Manager.getProfile(arg || {});
};

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
YYIMManager.prototype.mute = function(arg){
	arg = arg || {};
	if(!!arg.to){
		arg.handle = 'mute';
		Manager.muteStick(arg);
	}else{
		arg.error && arg.error();
	}
};

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
YYIMManager.prototype.stick = function(arg){
	arg = arg || {};
	if(!!arg.to){
		arg.handle = 'stick';
		Manager.muteStick(arg);
	}else{
		arg.error && arg.error();
	}
};

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
YYIMManager.prototype.cancelMute = function(arg){
	var that = this;
	if(arg && arg.to){
		Manager.cancelMuteStick({
			to: arg.to,
			type: arg.type,
			handle: 'mute',
			success: function(data){
				if(arg.type == that.getConstants().CHAT_TYPE.GROUP_CHAT){
					that.removeGroupAssistant({
						id: arg.to,
						success: function(){
							arg.success && arg.success(data);
						},
						error: arg.error
					});
				}else{
					arg.success && arg.success(data);
				}
			},
			error: arg.error
		});
	}else{
		arg && arg.error && arg.error();
	}
};

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
YYIMManager.prototype.cancelStick = function(arg){
	if(arg && arg.to){
		arg.handle = 'stick';
		Manager.cancelMuteStick(arg);
	}else{
		arg && arg.error && arg.error();
	}
};

/**
 *  添加Profile项  rongqb 20160719
 * arg {
 *  profile: {key:value},
 *  success: function,
 *  error: function,
 *  complete: function
 * }
 */ 
YYIMManager.prototype.createProfile = function(arg){
	arg = arg || {};
	if(!!arg.profile){
		Manager.createProfile(arg);
	}else{
		arg.error && arg.error();
	}
};

/**
 *  批量删除Profile中的项  rongqb 20160719
 * arg {
 *  profiles: Array,
 *  success: function,
 *  error: function,
 *  complete: function
 * }
 */ 
YYIMManager.prototype.removeProfile = function(arg){
	arg = arg || {};
	if(YYIMArrayUtil.isArray(arg.profiles)){
		Manager.removeProfile(arg);
	}else{
		arg.error && arg.error();
	}
};

/**
 * 清理用户的Profile（彻底删除所有Profile信息）  rongqb 20160719
 * arg {
 *  success: function,
 *  error: function,
 *  complete: function
 * }
 */ 
YYIMManager.prototype.clearProfile = function(arg){
	Manager.clearProfile(arg || {});
};

/**
 * 移除群助手 rongqb 20170510
 * @param {Object} arg {
 * 	id: String,
 *  success: function,
 *  error: fucntion
 * }
 */
YYIMManager.prototype.removeGroupAssistant = function(arg){
	if(arg && arg.id){
		Manager.removeGroupAssistant(arg);
	}else{
		arg && arg.error && arg.error();
	}
};