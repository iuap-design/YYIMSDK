import { YYIMManager, YYIMChat } from '../../core/manager';
import {
	monitor,
	queryChatGroup,
	getGroupMembers,
	joinChatGroup,
	getChatGroupInfo,
	getChatGroups,
	createChatGroup,
	transferChatGroup,
	dismissChatGroup,
	getSharedFiles,
	inviteGroupMember,
	modifyChatGroupInfo,
	kickGroupMember,
	exitChatGroup,
	collectChatGroup
} from './Manager';

YYIMChat.setBackhander({
	'monitor': {
		'groupMonitor': monitor
	},
	'initCallback': {
		'group': function (options) {
			YYIMChat.onGroupUpdate = options.onGroupUpdate || function () { };  //群信息更新
			YYIMChat.onTransferGroupOwner = options.onTransferGroupOwner || function () { }; // 群主转让
			YYIMChat.onKickedOutGroup = options.onKickedOutGroup || function () { };   //被群踢出 
		}
	}
});

/**
 * 获取群组列表
 * @param arg {
 * startDate: timestamp,
 * membersLimit: Number, //拉取成员数量，默认10
 * success: function,    //成功回调函数
 * error: function,  	 //失败回调函数
 * }
 */
YYIMManager.prototype.getChatGroups = function (arg) {
	arg = arg || {};
	arg.startDate = (YYIMUtil['isWhateType'](arg.startDate, 'Number') && arg.startDate > 0) ? arg.startDate : 0;
	arg.membersLimit = (YYIMCommonUtil.isNumber(arg.membersLimit) && arg.membersLimit > 0) ? arg.membersLimit : YYIMChat.getConfig().GROUP.MEMBERSLIMIT;
	getChatGroups(arg);
};

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
YYIMManager.prototype.queryChatGroup = function (arg) {
	arg = arg || {};
	if (YYIMCommonUtil.isStringAndNotEmpty(arg.keyword)) {
		queryChatGroup(arg);
	} else {
		arg && arg.error && arg.error();
	}
};

/**
 * 加入群组
 * @param arg {
 * id: String,  //群组id，必传
 * success:function, 
 * error:function
 * }
 */
YYIMManager.prototype.joinChatGroup = function (arg) {
	arg = arg || {};
	if (YYIMCommonUtil.isStringAndNotEmpty(arg.id)) {
		joinChatGroup({
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
 * @param arg {
 * id : String, //群组id，必传
 * membersLimit: Number, //群成员数量限制，可不传
 * success : function, 
 * error : function
 * }
 */
YYIMManager.prototype.getChatGroupInfo = function (arg) {
	arg = arg || {};
	if (YYIMCommonUtil.isStringAndNotEmpty(arg.id)) {
		getChatGroupInfo({
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
 * 创建群组
 * @param arg {
 * 	name: String, //群名称，必传
 * 	members:[], //群成员数组，必传，不能为空数组
 *  success: function, 
 *  error: function, 
 *  complete:function
 * }
 */
YYIMManager.prototype.createChatGroup = function (arg) {
	arg = arg || {};
	if (!(YYIMArrayUtil.isArray(arg.members))) {
		delete arg.members;
	}
	if (arg.members) {
		createChatGroup(arg);
	} else {
		arg && arg.error && arg.error();
	}
};

/**
 *  群主转让群组
 *  @param arg {
 *  to:String,  //必传
 *  newOwner:string,  //必传 
 *  success:function,
 *  error:function,
 *  complete:function
 *  }
 */
YYIMManager.prototype.transferChatGroup = function (arg) {
	arg = arg || {};
	if (arg && typeof (arg.newOwner) == 'string' && arg.to) {
		arg.to = YYIMChat.getJIDUtil().buildChatGroupJID(YYIMChat.getJIDUtil().getNode(arg.to));
		transferChatGroup(arg);
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
YYIMManager.prototype.dismissChatGroup = function (arg) {
	arg = arg || {};
	if (arg && arg.to) {
		arg.to = YYIMChat.getJIDUtil().buildChatGroupJID(YYIMChat.getJIDUtil().getNode(arg.to));
		dismissChatGroup(arg);
	} else {
		arg && arg.error && arg.error();
	}
};


/**
 * 房间成员邀请人入群
 * @param arg {
 * 	to:String,  //所属人id，必传
 * 	members: Array,  //邀请的成员数组，必传，不能为空数组
 *  success:function,
 *  error:function,
 *  complete:function
 * }
 */
YYIMManager.prototype.inviteGroupMember = function (arg) {
	arg = arg || {};
	if (arg.members && YYIMArrayUtil.isArray(arg.members) && arg.members.length && arg.to) {
		arg.to = YYIMChat.getJIDUtil().buildChatGroupJID(YYIMChat.getJIDUtil().getNode(arg.to));
		inviteGroupMember(arg);
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
YYIMManager.prototype.modifyChatGroupInfo = function (arg) {
	arg = arg || {};
	if (arg.name && arg.to) {
		arg.to = YYIMChat.getJIDUtil().buildChatGroupJID(YYIMChat.getJIDUtil().getNode(arg.to));
		modifyChatGroupInfo(arg);
	} else {
		arg && arg.error && arg.error();
	}
};

/**
 * 群组踢人 
 *  @param arg {
 *  to:String, //群组id，必传
 *  member:string, //被踢人id，一次只能踢一个人，必传
 *  success: function,
 *  error:function,
 *  complete: function
 *  }
 */
YYIMManager.prototype.kickGroupMember = function (arg) {
	arg = arg || {};
	if (arg.member && typeof (arg.member) == 'string' && arg.to) {
		arg.to = YYIMChat.getJIDUtil().buildChatGroupJID(YYIMChat.getJIDUtil().getNode(arg.to));
		kickGroupMember(arg);
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
YYIMManager.prototype.exitChatGroup = function (arg) {
	arg = arg || {};
	if (arg.to) {
		arg.to = YYIMChat.getJIDUtil().buildChatGroupJID(YYIMChat.getJIDUtil().getNode(arg.to));
		exitChatGroup(arg);
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
YYIMManager.prototype.collectGroup = function (arg) {
	arg = arg || {};
	if (arg.to) {
		arg.to = YYIMChat.getJIDUtil().buildChatGroupJID(YYIMChat.getJIDUtil().getNode(arg.to));
		arg.type = this.getConstants().COLLECT_TYPE.ADD;
		collectChatGroup(arg);
	} else {
		arg && arg.error && arg.error();
	}
};

/**
 *  取消收藏群组
 *  @param arg {
 * 	to: String,  //群组id，必传
 * 	success: function, 
 *  error: function,
 *  complete: function
 * }
 */
YYIMManager.prototype.removeCollectGroup = function (arg) {
	arg = arg || {};
	if (arg.to) {
		arg.to = YYIMChat.getJIDUtil().buildChatGroupJID(YYIMChat.getJIDUtil().getNode(arg.to));
		arg.type = this.getConstants().COLLECT_TYPE.REMOVE;
		collectChatGroup(arg);
	} else {
		arg && arg.error && arg.error();
	}
};


/**
 * 获取群组共享文件
 * arg {
 *  id:String, //群组id，必传
 *  fileType: String, //'file','image','microvideo'，文件类型，不传默认file
 *  type: String,  //'chat','groupchat'，聊天类型，不传默认chat
 *  start:number,  //开始时间戳，不传默认0
 *  size:number,  //获取对象的最大长度，不传默认20
 *  success: function,
 *  error: function
 * }
 */
YYIMManager.prototype.getSharedFiles = function (arg) {
	arg = arg || {};
	if (arg && arg.id) {
		getSharedFiles(arg);
	} else {
		arg && arg.error && arg.error();
	}
};

/**
 * 获取群组成员
 * arg {
 *  id:String, //群组id，必传
 *  success: function,
 *  error: function
 * }
 */
YYIMManager.prototype.getGroupMembers = function (arg) {
	if (arg && arg.id) {
		if (YYIMCommonUtil.isStringAndNotEmpty(arg.id)) {
			getGroupMembers(arg);
		}
	} else {
		arg && arg.error && arg.error();
	}
};

