var Manager = (function(){
	/**
	 * 获取用户Profile信息包括静音和置顶信息 rongqb 20160719
	 * arg {
	 * success:function,
	 * error:function,
	 * complete:function
	 * }
	 */
	function getProfile(arg){
	    // 传入AI Key yaoleib20171212
	    var apiKeyParam = YYIMManager.getInstance().getApiKey();
		if(apiKeyParam){
            apiKeyParam = '&apiKey=' + apiKeyParam;
        }
		jQuery.ajax({
			url: YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + YYIMManager.getInstance().getUserID() + '/profile?token=' + YYIMManager.getInstance().getToken() + apiKeyParam,
			type: 'get',
			cache: false,
			datatype: 'json',
			success: function(data){
				if(data.muteItems){
					var temp = {};
					for(var x in data.muteItems){
						var id = YYIMChat.getJIDUtil().getID(data.muteItems[x]);
						var type = YYIMChat.getJIDUtil().getChatTypeByJid(data.muteItems[x]);
						temp[id] = {
							id: id,
							type: type
						};
					}
					data.muteItems = temp;
				}

				if(data.stickItems){
					var temp = {};
					for(var x in data.stickItems){
						var id = YYIMChat.getJIDUtil().getID(data.stickItems[x]);
						var type = YYIMChat.getJIDUtil().getChatTypeByJid(data.stickItems[x]);
						temp[id] = {
							id: id,
							type: type
						};
					}
					data.stickItems = temp;
				}
				if(data.userId ){
					data.userId = YYIMChat.getJIDUtil().getID(data.userId);
				}
				arg.success && arg.success(data);
				arg = null;
			},
			error: function(xhr){
				try{
					arg.error && arg.error(JSON.parse(xhr.responseText));
					arg = null;
				}catch(e){
					arg.error && arg.error();
					arg = null;
				}
			}
		});
	}

	/**
	 * 静音（免打扰）、置顶  rongqb 20160719
	 * arg {
	 * to: String,
	 * type: String, //chat/groupchat/pubaccount
	 * success: function,
	 * error: function,
	 * complete: function,
	 * handle: 'mute/stick',
	 * }
	 */
	function muteStick(arg){
		var to;
		if(arg.type == YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT){
			to = YYIMChat.getJIDUtil().buildChatGroupJID(YYIMChat.getJIDUtil().getNode(arg.to));
		}else if(arg.type == YYIMChat.getConstants().CHAT_TYPE.PUB_ACCOUNT){
			to = YYIMChat.getJIDUtil().buildPubAccountJID(YYIMChat.getJIDUtil().getNode(arg.to));
		}else{
			to = YYIMChat.getJIDUtil().buildUserJID(YYIMChat.getJIDUtil().getNode(arg.to));
		}
		arg.handle = (arg.handle === 'mute')? arg.handle: 'stick';
		jQuery.ajax({
			url: YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + YYIMManager.getInstance().getUserID() + '/profile/' + arg.handle + '?token=' + YYIMManager.getInstance().getToken(),
			type: 'post',
			data: JSON.stringify({bareJID: to}),
			dataType: 'json',
			cache: false,
			processData:false,
			contentType: "application/json", //必须有
			success: function(data){
				arg.success && arg.success({
					id: arg.to,
					type: arg.type
				});
				arg = null;
			},
			error: function(xhr){
				try{
					arg.error && arg.error(JSON.parse(xhr.responseText));
					arg = null;
				}catch(e){
					arg.error && arg.error();
					arg = null;
				}
			}
		});
	}

	/**
	 * 取消静音（免打扰），置顶  rongqb 20160719
	 * arg {
	 * to: String,
	 * type: String, //chat/groupchat/pubaccount
	 * success: function,
	 * error: function,
	 * complete: function,
	 * handle: 'mute/stick',
	 * }
	 */
	function cancelMuteStick(arg){
		var to;
		if(arg.type == YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT){
			to = YYIMChat.getJIDUtil().buildChatGroupJID(YYIMChat.getJIDUtil().getNode(arg.to));
		}else if(arg.type == YYIMChat.getConstants().CHAT_TYPE.PUB_ACCOUNT){
			to = YYIMChat.getJIDUtil().buildPubAccountJID(YYIMChat.getJIDUtil().getNode(arg.to));
		}else{
			to = YYIMChat.getJIDUtil().buildUserJID(YYIMChat.getJIDUtil().getNode(arg.to));
		}
		jQuery.ajax({
			url: YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + YYIMManager.getInstance().getUserID() + '/profile/' + ((arg.handle === 'mute')? 'mute': 'stick') + '?token=' + YYIMManager.getInstance().getToken() + '&bareJID=' + to,
			type: 'DELETE',
			dataType: 'json',
			success: function(data){
				arg.success && arg.success({
					id: arg.to,
					type: arg.type
				});
				arg = null;
			},
			error: function(xhr){
				try{
					arg.error && arg.error(JSON.parse(xhr.responseText));
					arg = null;
				}catch(e){
					arg.error && arg.error();
					arg = null;
				}
			}
		});
	}

	/**
	 *  添加Profile项  rongqb 20160719
	 * arg {
	 *  profile: {key:value},
	 *  success: function,
	 *  error: function,
	 *  complete: function
	 * }
	 */
	function createProfile(arg){
		jQuery.ajax({
			url: YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + YYIMManager.getInstance().getUserID() + '/profile?token=' + YYIMManager.getInstance().getToken(),
			type: 'post',
			data: JSON.stringify(arg.profile),
			dataType: 'json',
			cache: false,
			processData:false,
			contentType: "application/json", //必须有
			success: function(data){
				arg.success && arg.success(arg.profile);
				arg = null;
			},
			error: function(xhr){
				try{
					arg.error && arg.error(JSON.parse(xhr.responseText));
					arg = null;
				}catch(e){
					arg.error && arg.error();
					arg = null;
				}
			}
		});
	}

	/**
	 *  批量删除Profile中的项  rongqb 20160719
	 * arg {
	 *  profiles: Array,
	 *  success: function,
	 *  error: function,
	 *  complete: function
	 * }
	 */
	function removeProfile(arg){
		jQuery.ajax({
			url: YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + YYIMManager.getInstance().getUserID() + '/profile?token=' + YYIMManager.getInstance().getToken(),
			type: 'PUT',
			data: JSON.stringify(arg.profiles),
			dataType: 'json',
			cache: false,
			processData:false,
			contentType: "application/json", //必须有
			success: function(data){
				arg.success && arg.success(arg.profiles);
				arg = null;
			},
			error: function(xhr){
				try{
					arg.error && arg.error(JSON.parse(xhr.responseText));
					arg = null;
				}catch(e){
					arg.error && arg.error();
					arg = null;
				}
			}
		});
	}

	/**
	 * 清理用户的Profile（彻底删除所有Profile信息）  rongqb 20160719
	 * arg {
	 *  success: function,
	 *  error: function,
	 *  complete: function
	 * }
	 */
	function clearProfile(arg){
		jQuery.ajax({
			url: YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + YYIMManager.getInstance().getUserID() + '/profile?token=' + YYIMManager.getInstance().getToken(),
			type: 'DELETE',
			dataType: 'json',
			cache: false,
			success: function(data){
				arg.success && arg.success();
				arg = null;
			},
			error: function(xhr){
				try{
					arg.error && arg.error(JSON.parse(xhr.responseText));
					arg = null;
				}catch(e){
					arg.error && arg.error();
					arg = null;
				}
			}
		});
	}

	/**
	 * 移除群助手 rongqb 20170510
	 * @param {Object} arg {
	 * 	id: String,
	 *  success: function,
	 *  error: fucntion
	 * }
	 */
	function removeGroupAssistant(arg){
		jQuery.ajax({
			url: YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + YYIMManager.getInstance().getUserID() + '/profile/groupassistant?token=' + YYIMManager.getInstance().getToken() + '&bareJID=' + YYIMChat.getJIDUtil().buildChatGroupJID(YYIMChat.getJIDUtil().getNode(arg.id)),
			type: 'DELETE',
			dataType: 'json',
			cache: false,
			success: function(data){
				arg.success && arg.success();
				arg = null;
			},
			error: function(xhr){
				try{
					arg.error && arg.error(JSON.parse(xhr.responseText));
					arg = null;
				}catch(e){
					arg.error && arg.error();
					arg = null;
				}
			}
		});
	}

	return {
		getProfile: getProfile,
		muteStick: muteStick,
		cancelMuteStick: cancelMuteStick,
		createProfile: createProfile,
		removeProfile: removeProfile,
		clearProfile: clearProfile,
		removeGroupAssistant: removeGroupAssistant
	};
})();
