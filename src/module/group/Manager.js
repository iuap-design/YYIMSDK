import { YYIMChat } from '../../core/manager';

/**
 * 获取群组列表
 * @param arg {
 * startDate: timestamp,
 * membersLimit: Number, //拉取成员数量，默认10
 * success: function,    //成功回调函数
 * error: function,  	 //失败回调函数
 * }
 */
function getChatGroups(arg) {
	var config = YYIMChat.getConfig();
	jQuery.ajax({
		//url: config.SERVLET.REST_USER_SERVLET + config.MULTI_TENANCY.ETP_KEY + '/' + config.MULTI_TENANCY.APP_KEY + '/' + YYIMChat.getUserID() + '/room/increment?timestamp=' + arg.startDate + '&token=' + YYIMChat.getToken() + '&membersLimit=' + arg.membersLimit,
		url: config.SERVLET.REST_USER_SERVLET + config.MULTI_TENANCY.ETP_KEY + '/' + config.MULTI_TENANCY.APP_KEY + '/' + YYIMChat.getUserID() + '/room/contacts/increment?timestamp=' + arg.startDate + '&token=' + YYIMChat.getToken() + '&membersLimit=' + arg.membersLimit,
		type: 'get',
		dataType: 'json',
		cache: false,
		success: function (chatGroupList) {
			if (!!chatGroupList) {
				chatGroupList.roomItems = chatGroupList.roomItems || [];
				chatGroupList.roomNames = chatGroupList.roomNames || [];
				chatGroupList.leftRooms = chatGroupList.leftRooms || [];

				var i = chatGroupList.roomItems.length || 0;
				while (i--) {
					chatGroupList.roomItems[i] = handleChatGroup(chatGroupList.roomItems[i]);
				}

				var j = chatGroupList.roomNames.length || 0;
				while (j--) {
					chatGroupList.roomNames[j] = YYIMChat.getJIDUtil().getID(chatGroupList.roomNames[j]);
				}

				var z = chatGroupList.leftRooms.length || 0;
				while (z--) {
					chatGroupList.leftRooms[z] = YYIMChat.getJIDUtil().getID(chatGroupList.leftRooms[z]);
				}
			}
			arg.success && arg.success(chatGroupList || {});
			arg = null;
		},
		error: function (xhr) {
			try {
				arg.error && arg.error(JSON.parse(xhr.responseText));
				arg = null;
			} catch (e) {
				arg.error && arg.error();
				arg = null;
			}
		}
	});
}

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
function queryChatGroup(arg) {
	var iqBody = {
		start: YYIMCommonUtil.isNumber(arg.start) ? arg.start : 0,
		size: YYIMCommonUtil.isNumber(arg.size) ? arg.size : 20,
		search: arg.keyword
	};
	YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.QUERY_CHATGROUP.SEND), function (queryResult, _arg) {
		var items = queryResult.items || [],
			i = items.length;
		while (i--) {
			var item = items[i];
			items[i].id = YYIMChat.getJIDUtil().getID(item.jid);
			items[i].name = items[i].name || items[i].id;
		}
		_arg.complete && _arg.complete();
		_arg.success && _arg.success({
			start: queryResult.start,
			total: queryResult.total,
			items: items
		});
	}, arg);
}

/**
 * 加入群组
 * @param arg {
 * id: String,  //群组id，必传
 * success:function, 
 * error:function
 * }
 */
function joinChatGroup(arg) {
	var presenceBody = {
		to: arg.jid + "/" + YYIMChat.getUserNode()
	};

	YYIMChat.getConnection().send(new JumpPacket(presenceBody, OPCODE.CHATGROUP.SEND), function (joinResult, _arg) {
		if (joinResult && joinResult.code == '40301') {
			_arg.error && _arg.error({
				code: joinResult.code,
				message: joinResult.message
			});
		} else if (joinResult) {
			joinResult.id = YYIMChat.getJIDUtil().getID(joinResult.from);
			_arg.success && _arg.success(joinResult);
		}
	}, arg);
}


/**
 * 获取群组信息
 * @param arg {
 * id : String, //群组id，必传
 * membersLimit: Number, //群成员数量限制，可不传
 * success : function, 
 * error : function
 * }
 */
function getChatGroupInfo(arg) {
	var config = YYIMChat.getConfig();
	jQuery.ajax({
		url: config.SERVLET.REST_USER_SERVLET + config.MULTI_TENANCY.ETP_KEY + '/' + config.MULTI_TENANCY.APP_KEY + '/' + YYIMChat.getUserID() + '/room/info?membersLimit=' + arg.membersLimit + '&mucId=' + arg.jid + '&token=' + YYIMChat.getToken(),
		type: 'get',
		dataType: 'json',
		cache: false,
		success: function (result) {
			var group = handleChatGroup(result);
			arg.success && arg.success(group);
			arg = null;
		},
		error: function (xhr) {
			try {
				arg.error && arg.error(JSON.parse(xhr.responseText));
				arg = null;
			} catch (e) {
				arg.error && arg.error();
				arg = null;
			}
		}
	});
}

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
function createChatGroup(arg) {
	var iqBody = {
		id: Math.uuid(),
		to: arg.to,
		naturalLanguageName: arg.name,
		from: YYIMChat.getUserBareJID(),
		invitees: arg.members
	};

	YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.CREATE_GROUP.SEND), function (result, _arg) {
		_arg.complete && _arg.complete();
		_arg.success && _arg.success(handleChatGroup(result));
	}, arg);
}

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
function transferChatGroup(arg) {
	var iqBody = {
		id: Math.uuid(),
		to: arg.to,
		from: YYIMChat.getUserBareJID(),
		newOwner: arg.newOwner
	};

	YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.TRANSFER_GROUP.SEND), function (result, _arg) {
		_arg.complete && _arg.complete();
		_arg.success && _arg.success(transferChatGroupOwner(result));
	}, arg);
}

/**
 *  群主解散群组 rongqb 20160106
 *  @param arg {id: string,to:群组}
 *  resource:2.3 
 */
function dismissChatGroup(arg) {
	var iqBody = {
		id: Math.uuid(),
		to: arg.to,
		from: YYIMChat.getUserBareJID()
	};

	YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.DISMISS_GROUP.SEND), function (result, _arg) {
		_arg.complete && _arg.complete();
		_arg.success && _arg.success({
			id: result.id,
			from: YYIMChat.getJIDUtil().getID(result.from),
			to: YYIMChat.getJIDUtil().getID(result.to)
		});
	}, arg);
}

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
function inviteGroupMember(arg) {
	var iqBody = {
		id: Math.uuid(),
		to: arg.to,
		from: YYIMChat.getUserBareJID(),
		invitees: arg.members
	};

	YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.INVITE_GROUP_MEMBER.SEND), function (result, _arg) {
		_arg.complete && _arg.complete();
		_arg.success && _arg.success(handleChatGroup(result));
	}, arg);
}

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
function modifyChatGroupInfo(arg) {
	var iqBody = {
		id: Math.uuid(),
		naturalLanguageName: arg.name,
		from: YYIMChat.getUserBareJID(),
		to: arg.to
	};

	YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.MODIFY_GROUP_INFO.SEND), function (result, _arg) {
		_arg.complete && _arg.complete();
		_arg.success && _arg.success(handleChatGroup(result));
	}, arg);
}

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
function kickGroupMember(arg) {
	var iqBody = {
		id: Math.uuid(),
		member: arg.member,
		from: YYIMChat.getUserBareJID(),
		to: arg.to
	};

	YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.KICK_GROUP_MEMBER.SEND), function (result, _arg) {
		_arg.complete && _arg.complete();
		_arg.success && _arg.success(handleChatGroup(result));
	}, arg);
}

/**
 * 群成员退出群
 *  @param arg {
 * 	to:String,  //群组ld，必传
 * 	success: function,
 *  error:function,
 *  complete: function
 * }
 */
function exitChatGroup(arg) {
	var iqBody = {
		id: Math.uuid(),
		from: YYIMChat.getUserBareJID(),
		to: arg.to
	};

	YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.EXIT_GROUP.SEND), function (result, _arg) {
		_arg.complete && _arg.complete();
		_arg.success && _arg.success({
			from: YYIMChat.getJIDUtil().getID(result.from),
			id: result.id,
			to: YYIMChat.getJIDUtil().getID(result.to)
		});
	}, arg);
}

/**
 * 群组信息返回处理函数
 */
function handleChatGroup(result) {
	if (!result) {
		return;
	}

	// 06.22  合并
	if (result.owners) {
		for (var x in result.owners) {
			if (result.owners.hasOwnProperty(x)) {
				result.owners[x] = YYIMChat.getJIDUtil().getID(result.owners[x]);
			}
		}
	}

	if (result.operhand) {
		for (var x in result.operhand) {
			if (result.operhand.hasOwnProperty(x)) {
				result.operhand[x] = YYIMChat.getJIDUtil().getID(result.operhand[x]);
			}
		}
	}


	var j = result.members.length;
	var members = [];
	while (j--) {
		var member = result.members[j];
		member.id = YYIMChat.getJIDUtil().getID(member.jid);
		members.push(member);
	}

	//0622 合并 
	if (result.whiteList) {
		for (var x in result.whiteList) {
			if (result.whiteList.hasOwnProperty(x)) {
				result.whiteList[x] = YYIMChat.getJIDUtil().getID(result.whiteList[x]);
			}
		}
	}

	if (result.blackList) {
		for (var x in result.blackList) {
			if (result.blackList.hasOwnProperty(x)) {
				result.blackList[x] = YYIMChat.getJIDUtil().getID(result.blackList[x]);
			}
		}
	}
	
	var chatGroup = {
		id: YYIMChat.getJIDUtil().getID(result.from || result.jid),
		name: result.naturalLanguageName || result.roomname || result.name,
		photo: result.photo,
		numberOfMembers: result.numberOfMembers,
		superLarge: result.superLarge,
		collected: result.collected,
		type: result.type,
		safeModel: result.safeModel,
		creationdate: result.creationdate,
		creater: YYIMChat.getJIDUtil().getID(result.operator),
		members: members,
		owners: result.owners,
		tag: result.tag,
		whiteList: result.whiteList,
		blackList: result.blackList
	};
	return chatGroup;
}

/**
 * 群组转让返回处理函数 rongqb 20160106
 */
function transferChatGroupOwner(result) {
	if (!result) {
		return;
	}

	var j = result.memberItems.length;
	var members = [];
	while (j--) {
		var member = result.memberItems[j];
		member.id = YYIMChat.getJIDUtil().getID(member.jid);
		members.push(member);
	}
	var chatGroup = {
		id: YYIMChat.getJIDUtil().getID(result.from),
		members: members
	};
	return chatGroup;
}

/**
 *  收藏群组(收藏/取消收藏) rongqb 20151201
 *  @param arg {id: string,to:群组,type:'add/remove', success: function,complete: function}
 *  resource:2.1 
 */
function collectChatGroup(arg) {
	var iqBody = {
		id: Math.uuid(),
		from: YYIMChat.getUserBareJID(),
		to: arg.to,
		type: arg.type
	};

	YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.COLLECT_GROUP.SEND), function (result, _arg) {
		_arg.complete && _arg.complete();
		_arg.success && _arg.success({
			from: YYIMChat.getJIDUtil().getID(_arg.to),
			id: result.id,
			to: YYIMChat.getUserID(),
			type: _arg.type,
			code: result.code,
			message: result.message
		});
	}, arg);
}

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
function getSharedFiles(arg) {
	var contacts = YYIMChat.getConstants();
	var config = YYIMChat.getConfig();
	var type = ([contacts.CHAT_TYPE.CHAT, contacts.CHAT_TYPE.GROUP_CHAT, contacts.CHAT_TYPE.PUB_ACCOUNT].indexOf(arg.type) > -1) ? arg.type : contacts.CHAT_TYPE.CHAT;

	var url = config.SERVLET.REST_USER_SERVLET + config.MULTI_TENANCY.ETP_KEY + '/' + config.MULTI_TENANCY.APP_KEY + '/shareattachment/persional/attachment/' + YYIMChat.getUserID() + '/' + arg.id;
	if (type == contacts.CHAT_TYPE.GROUP_CHAT) {
		url = config.SERVLET.REST_USER_SERVLET + config.MULTI_TENANCY.ETP_KEY + '/' + config.MULTI_TENANCY.APP_KEY + '/shareattachment/room/attachment/' + arg.id + '/' + YYIMChat.getUserID();
	}

	jQuery.ajax({
		url: url,
		data: {
			token: YYIMChat.getToken(),
			fileType: (['file', 'image', 'microvideo'].indexOf(arg.fileType) > -1) ? arg.fileType : 'file',
			start: parseInt(arg.start) || 0,
			size: parseInt(arg.size) || 20
		},
		type: 'get',
		dataType: 'json',
		cache: false,
		success: function (data) {
			var items = data.list || [];
			i = items.length;
			while (i--) {
				var item = items[i];
				item.id = item.packetId;
				item.creator = YYIMChat.getJIDUtil().getID(item.creator);
				item.owner = [];
				if (type == YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT) {
					item.owner.push({
						id: YYIMChat.getJIDUtil().getID(item.ownerId),
						type: type
					});
				} else {
					var temp = item.ownerId.split('::');
					temp[0] = YYIMChat.getJIDUtil().getID(temp[0]);
					temp[1] = YYIMChat.getJIDUtil().getID(temp[1]);
					item.owner.push({
						id: temp[0],
						type: type
					}, {
							id: temp[1],
							type: type
						});
				}
				delete item.ownerId;
			}
			arg.success && arg.success(data);
			arg = null;
		},
		error: function (xhr) {
			try {
				arg.error && arg.error(JSON.parse(xhr.responseText));
				arg = null;
			} catch (e) {
				arg.error && arg.error();
				arg = null;
			}
		}
	});
}

/**
 * 获取群组成员
 * arg {
 *  id:String, //群组id，必传
 *  success: function,
 *  error: function
 * }
 */
function getGroupMembers(arg) {
	var config = YYIMChat.getConfig();
	jQuery.ajax({
		url: config.SERVLET.REST_USER_SERVLET + config.MULTI_TENANCY.ETP_KEY + '/' + config.MULTI_TENANCY.APP_KEY + '/' + YYIMChat.getUserID() + '/room/members?mucId=' + arg.id + '&token=' + YYIMChat.getToken(),
		type: 'get',
		dataType: 'json',
		cache: false,
		success: function (result) {
			if (result && result.length) {
				var index = result.length;
				while (index--) {
					result[index].id = YYIMChat.getJIDUtil().getID(result[index].jid);
				}
			}
			arg.success && arg.success(result || []);
			arg = null;
		},
		error: function () {
			try {
				arg.error && arg.error(JSON.parse(xhr.responseText));
				arg = null;
			} catch (e) {
				arg.error && arg.error();
				arg = null;
			}
		}
	});
}

function monitor() {
	/**
	 * 群信息更新 rongqb 20151119
	 * resource:2.1
	 */
	YYIMChat.getConnection().registerHandler(OPCODE.ON_GROUP_UPDATE.KEY, function (packet) {
		var chatgroup = handleChatGroup(packet);
		if (chatgroup) {
			YYIMChat.onGroupUpdate(chatgroup);
		}
	});

	/**
	 * 群组转让 rongqb 20160106
	 * resource:2.3
	 */
	YYIMChat.getConnection().registerHandler(OPCODE.ON_GROUP_TRANSFER.KEY, function (packet) {
		var chatgroup = transferChatGroupOwner(packet);
		if (chatgroup) {
			YYIMChat.onTransferGroupOwner(chatgroup);
		}
	});

	/**
	 * 被群组踢了 rongqb 20151119
	 * resource:2.1
	 */
	YYIMChat.getConnection().registerHandler(OPCODE.KICKED_GROUP.KEY, function (packet) {
		var result = {
			id: packet.id,
			from: YYIMChat.getJIDUtil().getID(packet.from),
			to: YYIMChat.getJIDUtil().getID(packet.to)
		};
		if (result) {
			YYIMChat.onKickedOutGroup(result);
		}
	});
}


export {
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
};