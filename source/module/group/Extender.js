YYIMChat.setBackhander({
	'monitor': {
		'groupMonitor': Manager.monitor
	},
	'initCallback': {
		'group':  function(options){
			YYIMChat.onGroupUpdate = options.onGroupUpdate || function(){};  //群信息更新
			YYIMChat.onTransferGroupOwner = options.onTransferGroupOwner || function(){}; // 群主转让
			YYIMChat.onKickedOutGroup = options.onKickedOutGroup || function(){};   //被群踢出 
		}
	}
});

/**
 * 查找群
 * @param arg {keyword, start, size, success: function, error: function,complete: function}
 */
YYIMManager.prototype.queryChatGroup = function(arg) {
	if(YYIMCommonUtil.isStringAndNotEmpty(arg.keyword)) {
		Manager.queryChatGroup(arg);
	} else {
		arg && arg.error && arg.error();
	}
};

/**
 * 加入群
 * @param arg {id: roomJid, success:function, error:function}
 */
YYIMManager.prototype.joinChatGroup = function(arg) {
	if(YYIMCommonUtil.isStringAndNotEmpty(arg.id)) {
		Manager.joinChatGroup({
			jid: YYIMChat.getJIDUtil().buildChatGroupJID(YYIMChat.getJIDUtil().getNode(arg.id)),
			success: arg.success,
			error: arg.error
		});
	} else {
		arg && arg.error && arg.error();
	}
};

/**
 * 获取群组信息
 * @param arg {id : chatGroupId, success : function, error : function}
 */
YYIMManager.prototype.getChatGroupInfo = function(arg) {
	if(YYIMCommonUtil.isStringAndNotEmpty(arg.id)) {
		Manager.getChatGroupInfo({
			jid: YYIMChat.getJIDUtil().buildChatGroupJID(YYIMChat.getJIDUtil().getNode(arg.id)),
			membersLimit: (YYIMCommonUtil.isNumber(arg.membersLimit) && arg.membersLimit > 0) ? arg.membersLimit : YYIMChat.getConfig().GROUP.MEMBERSLIMIT,
			success: arg.success,
			error: arg.error
		});
	} else {
		arg && arg.error && arg.error();
	}
};

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
YYIMManager.prototype.getChatGroups = function(arg) {
	arg  = arg || {};
	arg.startDate = (YYIMUtil['isWhateType'](arg.startDate,'Number') &&  arg.startDate > 0) ? arg.startDate: 0;
	arg.membersLimit = (YYIMCommonUtil.isNumber(arg.membersLimit) && arg.membersLimit > 0) ? arg.membersLimit : YYIMChat.getConfig().GROUP.MEMBERSLIMIT;
	Manager.getChatGroups(arg);
};

/**
 * 创建群组 rongqb 20151117
 * @param arg {
 * 	name: String,
 * 	members:[], 
 *  success: function, 
 *  error: function, 
 *  complete:function
 * }
 */
YYIMManager.prototype.createChatGroup = function(arg) {
	if(!(YYIMArrayUtil.isArray(arg.members))) {
		delete arg.members;
	}
	if(arg.members) {
		Manager.createChatGroup(arg);
	} else {
		arg && arg.error && arg.error();
	}
};

/**
 *  群主转让群组 rongqb 20160104
 *  @param arg {
 *  to:String,
 *  newOwner:string,
 *  success:function,
 *  error:function,
 *  complete:function
 *  }
 */
YYIMManager.prototype.transferChatGroup = function(arg) {
	if(arg && typeof(arg.newOwner) == 'string' && arg.to) {
		arg.to = YYIMChat.getJIDUtil().buildChatGroupJID(YYIMChat.getJIDUtil().getNode(arg.to));
		Manager.transferChatGroup(arg);
	} else {
		arg && arg.error && arg.error();
	}
};

/**
 *  群主解散群组 rongqb 20160106
 *  @param arg {
 *  to:String,
 *  success:function,
 *  error:function,
 *  complete:function
 *  }
 */
YYIMManager.prototype.dismissChatGroup = function(arg) {
	if(arg && arg.to) {
		arg.to = YYIMChat.getJIDUtil().buildChatGroupJID(YYIMChat.getJIDUtil().getNode(arg.to));
		Manager.dismissChatGroup(arg);
	} else {
		arg && arg.error && arg.error();
	}
};

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
YYIMManager.prototype.getSharedFiles = function(arg) {
	if(arg && arg.id) {
		Manager.getSharedFiles(arg);
	} else {
		arg && arg.error && arg.error();
	}
};

/**
 * 房间成员邀请人入群  rongqb 20151118
 * @param arg {
 * 	to:String,
 * 	members: Array,
 *  success:function,
 *  error:function,
 *  complete:function
 * }
 */
YYIMManager.prototype.inviteGroupMember = function(arg) {
	if(arg.members && YYIMArrayUtil.isArray(arg.members) && arg.members.length && arg.to) {
		arg.to = YYIMChat.getJIDUtil().buildChatGroupJID(YYIMChat.getJIDUtil().getNode(arg.to));
		Manager.inviteGroupMember(arg);
	} else {
		arg && arg.error && arg.error();
	}
};

/**
 * 群成员更改配置信息 rongqb 20151119
 *  @param arg {
 * 	to:String,群组id
 * 	name:string, 
 * 	success: function,
 * 	error:function,
 * 	complete: function
 * }
 */
YYIMManager.prototype.modifyChatGroupInfo = function(arg) {
	if(arg.name && arg.to) {
		arg.to = YYIMChat.getJIDUtil().buildChatGroupJID(YYIMChat.getJIDUtil().getNode(arg.to));
		Manager.modifyChatGroupInfo(arg);
	} else {
		arg && arg.error && arg.error();
	}
};

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
YYIMManager.prototype.kickGroupMember = function(arg) {
	if(arg.member && typeof(arg.member) == 'string' && arg.to) {
		arg.to = YYIMChat.getJIDUtil().buildChatGroupJID(YYIMChat.getJIDUtil().getNode(arg.to));
		Manager.kickGroupMember(arg);
	} else {
		arg && arg.error && arg.error();
	}
};

/**
 * 群成员退出群 rongqb 20151119
 *  @param arg {
 * 	to:String,
 * 	success: function,
 *  error:function,
 *  complete: function
 * }
 */
YYIMManager.prototype.exitChatGroup = function(arg) {
	if(arg.to) {
		arg.to = YYIMChat.getJIDUtil().buildChatGroupJID(YYIMChat.getJIDUtil().getNode(arg.to));
		Manager.exitChatGroup(arg);
	} else {
		arg && arg.error && arg.error();
	}
};

/**
 *  收藏群组(收藏) rongqb 20151201
 *  @param arg {
 * 	to: String,
 * 	success: function, 
 *  error: function,
 *  complete: functionf
 * }
 */
YYIMManager.prototype.collectGroup = function(arg) {
	if(arg.to) {
		arg.to = YYIMChat.getJIDUtil().buildChatGroupJID(YYIMChat.getJIDUtil().getNode(arg.to));
		arg.type = this.getConstants().COLLECT_TYPE.ADD;
		Manager.collectChatGroup(arg);
	} else {
		arg && arg.error && arg.error();
	}
};

/**
 *  取消收藏群组 rongqb 20151201
 *  @param arg {
 * 	to: String,
 *  type: String, //add remove
 * 	success: function, 
 *  error: function,
 *  complete: function
 * }
 */
YYIMManager.prototype.removeCollectGroup = function(arg) {
	if(arg.to) {
		arg.to = YYIMChat.getJIDUtil().buildChatGroupJID(YYIMChat.getJIDUtil().getNode(arg.to));
		arg.type = this.getConstants().COLLECT_TYPE.REMOVE;
		Manager.collectChatGroup(arg);
	} else {
		arg && arg.error && arg.error();
	}
};

/**
 * 获取群组成员 rongqb 20170314
 * @param {Object} arg
 */
YYIMManager.prototype.getGroupMembers = function(arg) {
	var id = arg.id || arg.to;
	if(arg && id) {
		if(YYIMCommonUtil.isStringAndNotEmpty(id)) {
			Manager.getGroupMembers(arg);
		}
	} else {
		arg && arg.error && arg.error();
	}
};