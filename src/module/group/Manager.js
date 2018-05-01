import { YYIMChat } from '../../core/manager';

function getChatGroups(arg) {
	jQuery.ajax({
//			url: YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + YYIMChat.getUserID() + '/room/increment?timestamp=' + arg.startDate + '&token=' + YYIMChat.getToken() + '&membersLimit=' + arg.membersLimit,
		url: YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + YYIMChat.getUserID() + '/room/contacts/increment?timestamp=' + arg.startDate + '&token=' + YYIMChat.getToken() + '&membersLimit=' + arg.membersLimit,
		type: 'get',
		dataType: 'json',
		cache: false,
		success: function(chatGroupList) {
			if(!!chatGroupList){
				chatGroupList.roomItems = chatGroupList.roomItems || [];
				chatGroupList.roomNames = chatGroupList.roomNames || [];
				chatGroupList.leftRooms = chatGroupList.leftRooms || [];
				
				var i = chatGroupList.roomItems.length || 0;
				while(i--) {
					chatGroupList.roomItems[i] = handleChatGroup(chatGroupList.roomItems[i]);
				}
				
				var j = chatGroupList.roomNames.length || 0;
				while(j--){
					chatGroupList.roomNames[j] = YYIMChat.getJIDUtil().getID(chatGroupList.roomNames[j]);
				}
				
				var z = chatGroupList.leftRooms.length || 0;
				while(z--){
					chatGroupList.leftRooms[z] = YYIMChat.getJIDUtil().getID(chatGroupList.leftRooms[z]);
				}
			}
			arg.success && arg.success(chatGroupList || {});
			arg = null;
		},
		error: function(xhr) {
			try {
				arg.error && arg.error(JSON.parse(xhr.responseText));
				arg = null;
			} catch(e) {
				arg.error && arg.error();
				arg = null;
			}
		}
	});
}
/**
 * 查找群
 * @param arg {keyword, start, size, success: function, error: function,complete: function}
 */
function queryChatGroup(arg) {
	var iqBody = {
		start: YYIMCommonUtil.isNumber(arg.start) ? arg.start : 0,
		size: YYIMCommonUtil.isNumber(arg.size) ? arg.size : 20,
		search: arg.keyword
	};
	YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.QUERY_CHATGROUP.SEND), function(queryResult, _arg) {
		var items = queryResult.items || [],
			i = items.length;
		while(i--) {
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
 * 获取群组信息
 * @param arg {jid : 群组的jid, success : function, error : function}
 */
//	function getChatGroupInfo(arg) {
//		var iqBody = {
//			to: arg.jid,
//			type: YYIMChat.getConstants().TYPE.GET,
//			ns: NS_DISCO_INFO
//		};
//		YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.CHATGROUP_INFO.SEND), function(infoResult, _arg) {
//			_arg.complete && _arg.complete();
//			var group = handleChatGroup(infoResult);
//			_arg.success && _arg.success(group);
//		}, arg);
//	}
function getChatGroupInfo(arg){
	jQuery.ajax({
		url: YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + YYIMChat.getUserID() + '/room/info?membersLimit=' + arg.membersLimit + '&mucId=' + arg.jid + '&token=' + YYIMChat.getToken(),
		type: 'get',
		dataType: 'json',
		cache: false,
		success: function(result) {
			var group = handleChatGroup(result);
			arg.success && arg.success(group);
			arg = null;
		},
		error: function(xhr) {
			try {
				arg.error && arg.error(JSON.parse(xhr.responseText));
				arg = null;
			} catch(e) {
				arg.error && arg.error();
				arg = null;
			}
		}
	});
}

/**
 * 创建群组 rongqb 20151117
 *  @param arg {id: string,members:[],name:string, success: function,complete: function}
 *  resource:2.1 
 */
function createChatGroup(arg) {
	var iqBody = {
		id:  Math.uuid(),
		to: arg.to,
		naturalLanguageName: arg.name,
		from: YYIMChat.getUserBareJID(),
		invitees: arg.members
	};

	YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.CREATE_GROUP.SEND), function(result, _arg) {
		_arg.complete && _arg.complete();
		_arg.success && _arg.success(handleChatGroup(result));
	}, arg);
}

/**
 *  群主转让群组 rongqb 20160104
 *  @param arg {id: string,to:群组,newOwner:string,success:function,error:function,complete:function}
 *  resource:2.3 
 */
function transferChatGroup(arg) {
	var iqBody = {
		id:  Math.uuid(),
		to: arg.to,
		from: YYIMChat.getUserBareJID(),
		newOwner: arg.newOwner
	};

	YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.TRANSFER_GROUP.SEND), function(result, _arg) {
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
		id:  Math.uuid(),
		to: arg.to,
		from: YYIMChat.getUserBareJID()
	};

	YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.DISMISS_GROUP.SEND), function(result, _arg) {
		_arg.complete && _arg.complete();
		_arg.success && _arg.success({
			id: result.id,
			from: YYIMChat.getJIDUtil().getID(result.from),
			to: YYIMChat.getJIDUtil().getID(result.to)
		});
	}, arg);
}

/**
 * 房间成员邀请人入群 rongqb 20151118
 *  @param arg {id: string,to:群组,members:[],name:string, success: function,complete: function}
 *  resource:2.1 
 */
function inviteGroupMember(arg) {
	var iqBody = {
		id:  Math.uuid(),
		to: arg.to,
		from: YYIMChat.getUserBareJID(),
		invitees: arg.members
	};

	YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.INVITE_GROUP_MEMBER.SEND), function(result, _arg) {
		_arg.complete && _arg.complete();
		_arg.success && _arg.success(handleChatGroup(result));
	}, arg);
}

/**
 * 群成员更改配置信息 rongqb 20151119
 *  @param arg {id: string,to:群组,name:string, success: function,complete: function}
 *  resource:2.1 
 */
function modifyChatGroupInfo(arg) {
	var iqBody = {
		id:  Math.uuid(),
		naturalLanguageName: arg.name,
		from: YYIMChat.getUserBareJID(),
		to: arg.to
	};

	YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.MODIFY_GROUP_INFO.SEND), function(result, _arg) {
		_arg.complete && _arg.complete();
		_arg.success && _arg.success(handleChatGroup(result));
	}, arg);
}

/**
 *  群主踢人 rongqb 20151119
 *  @param arg {id: string,to:群组,member:string, success: function,complete: function}
 *  resource:2.1 
 */
function kickGroupMember(arg) {
	var iqBody = {
		id:  Math.uuid(),
		member: arg.member,
		from: YYIMChat.getUserBareJID(),
		to: arg.to
	};

	YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.KICK_GROUP_MEMBER.SEND), function(result, _arg) {
		_arg.complete && _arg.complete();
		_arg.success && _arg.success(handleChatGroup(result));
	}, arg);
}

/**
 * 群成员退出群 rongqb 20151119
 *  @param arg {id: string,to:群组,success: function,complete: function}
 *  resource:2.1 
 */
function exitChatGroup(arg) {
	var iqBody = {
		id:  Math.uuid(),
		from: YYIMChat.getUserBareJID(),
		to: arg.to
	};

	YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.EXIT_GROUP.SEND), function(result, _arg) {
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
	if(!result) {
		return;
	}

	var j = result.members.length;
	var members = [];
	while(j--) {
		var member = result.members[j];
		member.id = YYIMChat.getJIDUtil().getID(member.jid);
		members.push(member);
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
		tag: result.tag
	};
	return chatGroup;
}

/**
 * 群组转让返回处理函数 rongqb 20160106
 */
function transferChatGroupOwner(result) {
	if(!result) {
		return;
	}

	var j = result.memberItems.length;
	var members = [];
	while(j--) {
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
		id:  Math.uuid(),
		from: YYIMChat.getUserBareJID(),
		to: arg.to,
		type: arg.type
	};

	YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.COLLECT_GROUP.SEND), function(result, _arg) {
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
 * 获取群组共享文件 rongqb 20160714 
 * arg {
 *  id:String,
 *  fileType: String, //'file','image','microvideo'
 *  type: String,//'chat','groupchat'
 *  start:number,
 *  size:number
 * }
 */
function getSharedFiles(arg) {
	var type = ([YYIMChat.getConstants().CHAT_TYPE.CHAT, YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT, YYIMChat.getConstants().CHAT_TYPE.PUB_ACCOUNT].indexOf(arg.type) > -1) ? arg.type : YYIMChat.getConstants().CHAT_TYPE.CHAT;

	var url = YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/shareattachment/persional/attachment/' + YYIMChat.getUserID() + '/' + arg.id;
	if(type == YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT) {
		url = YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/shareattachment/room/attachment/' + arg.id + '/' + YYIMChat.getUserID();
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
		success: function(data) {
			var items = data.list || [];
			i = items.length;
			while(i--) {
				var item = items[i];
				item.id = item.packetId;
				item.creator = YYIMChat.getJIDUtil().getID(item.creator);
				item.owner = [];
				if(type == YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT) {
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
					},{
						id: temp[1],
						type: type
					});
				}
				delete item.ownerId;
			}
			arg.success && arg.success(data);
			arg = null;
		},
		error: function(xhr) {
			try {
				arg.error && arg.error(JSON.parse(xhr.responseText));
				arg = null;
			} catch(e) {
				arg.error && arg.error();
				arg = null;
			}
		}
	});
}
/**
 * 获取指定群的群成员[chatroom]
 * @param arg {id: string, success: function, error: function,complete: function}
 */
function getGroupMembers(arg) {
	jQuery.ajax({
		url: YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + YYIMChat.getUserID() + '/room/members?mucId=' + arg.id + '&token=' + YYIMChat.getToken(),
		type: 'get',
		dataType: 'json',
		cache: false,
		success: function(result){
			if(result && result.length){
				var index = result.length;
				while(index--){
					result[index].id = YYIMChat.getJIDUtil().getID(result[index].jid);
				}
			}
			arg.success && arg.success(result || []);
			arg = null;
		},
		error: function(){
			try {
				arg.error && arg.error(JSON.parse(xhr.responseText));
				arg = null;
			} catch(e) {
				arg.error && arg.error();
				arg = null;
			}
		}
	});
}

	/**
 * 加入群组, 需要合法的jid
 * @param arg {jid: roomJid, success:function, error:function}
 * @returns
 */
function joinChatGroup(arg) {
	var presenceBody = {
		to : arg.jid + "/" + YYIMChat.getUserNode()
	};
	
	YYIMChat.getConnection().send(new JumpPacket(presenceBody, OPCODE.CHATGROUP.SEND), function(joinResult, _arg) {
		if(joinResult && joinResult.code == '40301'){
			_arg.error && _arg.error({
				code : joinResult.code,
				message : joinResult.message
			});
		}else if(joinResult){
			joinResult.id = YYIMChat.getJIDUtil().getID(joinResult.from);
			_arg.success && _arg.success(joinResult);
		}
	}, arg);
}

function monitor(){
	/**
	 * 群信息更新 rongqb 20151119
	 * resource:2.1
	 */
	YYIMChat.getConnection().registerHandler(OPCODE.ON_GROUP_UPDATE.KEY, function(packet) {
		var chatgroup = handleChatGroup(packet);
		if(chatgroup){
			YYIMChat.onGroupUpdate(chatgroup);			
		}
	});
	
	/**
	 * 群组转让 rongqb 20160106
	 * resource:2.3
	 */
	YYIMChat.getConnection().registerHandler(OPCODE.ON_GROUP_TRANSFER.KEY, function(packet) {
		var chatgroup = transferChatGroupOwner(packet);
		if(chatgroup){
			YYIMChat.onTransferGroupOwner(chatgroup);			
		}
	});
	
	/**
	 * 被群组踢了 rongqb 20151119
	 * resource:2.1
	 */
	YYIMChat.getConnection().registerHandler(OPCODE.KICKED_GROUP.KEY, function(packet) {
		var result = {
			id : packet.id,
			from : YYIMChat.getJIDUtil().getID(packet.from),
			to : YYIMChat.getJIDUtil().getID(packet.to)
		};
		if(result){
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