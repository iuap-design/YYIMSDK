import { YYIMChat } from '../../core/manager';

	/**
	 * 请求自己或好友的VCard
	 * @param arg
	 * 	{
	 * 		id : 为空则请求自己的VCard,
	 * 		success : function,
	 * 		error : function,
	 * 		complete : function
	 *  }
	 */
	function getVCard(arg) {
		var vcardBody = {
			type: YYIMChat.getConstants().TYPE.GET
		};

		if(arg && arg.id) {
			vcardBody.to = YYIMChat.getJIDUtil().buildUserJID(YYIMChat.getJIDUtil().getNode(arg.id));
		}

		YYIMChat.getConnection().send(new JumpPacket(vcardBody, OPCODE.VCARD.SEND), function(vcardResult, _arg) {
			_arg.complete && _arg.complete();
			var vcard = vcardResult.vcard || {};
			vcard.id = vcard.userId = YYIMChat.getJIDUtil().getID(vcard.username);
			if(!!vcardResult.enableFields) {
				vcard.enableFields = !!vcardResult.enableFields;
			}
			_arg.success && _arg.success(vcard);
		}, arg);
	}
	
	function getBatchVCards(arg){
		var url = YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + YYIMChat.getUserID() + '/vcard?token=' + YYIMChat.getToken() + '&userids=' + arg.ids;
		jQuery.ajax({
			url: url,
			type: 'get',
			dataType: 'json',
			cache: false,
			success: function(result) {
				var map = {};
				if(result && result.list){
					for(var x in result.list){
						if(result.list.hasOwnProperty(x)){
							var vcard = result.list[x];
							vcard.id = YYIMChat.getJIDUtil().getID(vcard.username);
							map[vcard.id] = vcard;
						}
					}
				}
				arg.success && arg.success(map);
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
	 * 请求自己所有好友的VCard
	 * 
	 * @param arg
	 * {
	 * 		success : function,
	 * 		error : function,
	 * 		complete : function
	 * }
	 */
	function getVCards(arg) {
		var iqBody = {
			type: 'roster'
		};

		YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.VCARDS.SEND), function(vcardsResult, _arg) {
			var results = vcardsResult.vcards || [];
			vcards = [],
				i = results.length;
			while(i--) {
				var vcard = results[i];
				vcard.id = vcard.userId = YYIMChat.getJIDUtil().getID(vcard.username);
				vcards.push(vcard);
			}
			_arg.complete && _arg.complete();
			_arg.success && _arg.success(vcards);
		}, arg);

	}

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
	function setVCard(arg) {
		YYIMChat.getConnection().send(new JumpPacket({
			type: YYIMChat.getConstants().TYPE.SET,
			vcard: arg.vcard
		}, OPCODE.VCARD.SEND), function(vcardResult, _arg) {
			_arg.complete && _arg.complete();
			_arg.success && _arg.success();
		}, arg);
	}

	/**
	 * 新增当前用户或者好友的Tag
	 * @param arg {
	 * 		id: String, //targetID
	 * 		tag : Array,
	 * 		success : function,
	 * 		error : fcuntion
	 * }
	 */
	function setTag(arg) {
		var url;
		if(!arg.id || arg.id === YYIMChat.getUserID()) {
			url = YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + YYIMChat.getUserID() + '/vcard/tag?token=' + YYIMChat.getToken();
		} else {
			url = YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + YYIMChat.getUserID() + '/' + arg.id + '/roster/tag?token=' + YYIMChat.getToken();
		}

		jQuery.ajax({
			url: url,
			type: 'post',
			data: JSON.stringify({
				tag: arg.tag
			}),
			dataType: 'json',
			cache: false,
			processData: false,
			contentType: "application/json", //必须有
			success: function(data) {
				arg.success && arg.success(arg.id);
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
	};

	/**
	 * 删除当前用户或者好友的Tag
	 * @param arg {
	 * 		id: String, //targetID
	 * 		tag : Array,
	 * 		success : function,
	 * 		error : fcuntion
	 * }
	 */
	function removeTag(arg) {
		var url;
		if(!arg.id || arg.id === YYIMChat.getUserID()) {
			url = YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + YYIMChat.getUserID() + '/vcard/tag?token=' + YYIMChat.getToken() + '&tag=' + JSON.stringify(arg.tag);
		} else {
			url = YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + YYIMChat.getUserID() + '/' + arg.id + '/roster/tag?token=' + YYIMChat.getToken() + '&tag=' + JSON.stringify(arg.tag);
		}
		jQuery.ajax({
			url: url,
			type: 'delete',
			dataType: 'json',
			cache: false,
			success: function(data) {
				arg.success && arg.success(arg.id);
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
	};

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
	function getRostersPresence(arg) {
		jQuery.ajax({
			url: YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + YYIMChat.getUserID() + '/presence/detail?token=' + YYIMChat.getToken() + '&username=' + arg.username,
			type: 'get',
			dataType: 'json',
			cache: false,
			timeout: 5000,
			success: function(data) {
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
	 * 请求好友列表
	 * @param arg {success: function, error: function, complete:function}
	 */
	function getRosterItems(arg) {
		var jumpPacket = new JumpPacket({}, OPCODE.ROSTER_LIST.SEND);

		YYIMChat.getConnection().send(jumpPacket, function(rosterListPacket, _arg) {
			if(!_arg)
				return;

			_arg.complete && _arg.complete();

			var items = rosterListPacket.items || [];

			var rosters = [],
				i = items.length || 0,
				friquest = {};

			while(i--) {
				var item = items[i],
					jid = item.jid,
					roster = {
						id: YYIMChat.getJIDUtil().getID(jid),
						resource: YYIMChat.getJIDUtil().getResource(jid),
						ask: item.ask,
						recv: item.recv,
						name: item.name,
						photo: item.photo,
						subscription: item.subscription,
						group: item.groups,
						tag: item.tag
					};

				if(YYIMChat.getJIDUtil().getDomain(jid) !== YYIMChat.getConfig().DOMAIN.PUBACCOUNT) {
					rosters.push(roster);

					if(!friquest[roster.id] && roster.subscription === 'none') {
						if(roster.recv === 1) { //收到好友请求
							friquest[roster.id] = roster;
						} else if(roster.ask === 1) { //发送好友请求
							//... 闲置
						}
					}
				}
			}

			/**
			 * 处理好友请求 20151204
			 */
			for(var x in friquest) {
				if(friquest[x].id) {
					YYIMChat.onSubscribe({
						from: friquest[x].id,
						type: YYIMChat.getConstants().PRESENCE_TYPE.SUBSCRIBE
					});
				}
			}

			_arg.success && _arg.success(JSON.stringify(rosters));
		}, arg);
	}

	/**
	 * 删除好友, 需要合法的jid
	 * @param arg {jid: string, success: function, error: function,complete: function}
	 */
	function deleteRosterItem(arg) {
		var iqBody = {
			type: YYIMChat.getConstants().TYPE.SET,
			ns: NS_ROSTER,
			item: {
				jid: arg.jid,
				subscription: 'remove'
			}
		};

		YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.UPDATE_ROSTER.SEND), function(deleteResult, _arg) {
			_arg.complete && _arg.complete();
			_arg.success && _arg.success(YYIMChat.getJIDUtil().getID(_arg.jid));
		}, arg);
	}

	/**
	 * 更新好友
	 * @param arg {
	 * 		roster : {
	 * 			jid : 好友jid,
	 * 			name : 好友昵称,
	 * 			groups : ["group1","group2"] // 好友所在分组
	 * 		},
	 * 		success : function,
	 * 		error : function
	 * }
	 */
	function updateRosterItem(arg) {
		var roster = arg.roster,
			iqBody = {
				item: {
					jid: roster.jid,
					name: roster.name,
					groups: []
				}
			},
			groups = roster.groups,
			i = groups ? groups.length : 0;
		while(i-- && YYIMCommonUtil.isStringAndNotEmpty(groups[i]))
			iqBody.item.groups = iqBody.item.groups.concat(groups[i]);
		YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.UPDATE_ROSTER.SEND), function(updateResult, _arg) {
			_arg.complete && _arg.complete();

			if(updateResult.code === 400) {
				_arg.error && _arg.error(updateResult);
			} else {
				updateResult.to = YYIMChat.getJIDUtil().getID(updateResult.to);
				_arg.success && _arg.success(updateResult);
			}
		}, arg);
	}

	/**
	 * 查找好友[roster][包括好友和非好友]，查询字段：userName, name
	 * @param arg {keyword, start, size, success: function, error: function,complete: function}
	 */
	function queryRosterItem(arg) {
		var iqBody = {
			start: YYIMCommonUtil.isNumber(arg.start) ? arg.start : 0,
			size: YYIMCommonUtil.isNumber(arg.size) ? arg.size : 20,
			fields: ["Username", "Name"],
			search: arg.keyword
		};
		YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.QUERY_USER.SEND), function(queryResult, _arg) {
			var items = queryResult.items || [],
				result = [],
				i = items.length;
			while(i--) {
				var item = items[i],
					jid = item.jid;
				if(jid === YYIMChat.getUserBareJID())
					continue;
				result.push({
					id: YYIMChat.getJIDUtil().getID(jid),
					name: YYIMCommonUtil.isStringAndNotEmpty(item.name) ? item.name : YYIMChat.getJIDUtil().getID(jid),
					photo: item.photo,
					email: item.email
				});
			}
			_arg.complete && _arg.complete();
			_arg.success && _arg.success({
				start: queryResult.start,
				total: queryResult.total,
				items: result
			});
		}, arg);
	}
	
	/**
	 * 收藏联系人列表
	 * @param {Object} arg
	 */
	function getFavoriteRosterList(arg) {
		jQuery.ajax({
			url: YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + YYIMChat.getUserID() + '/favoritedRosters',
			type: 'get',
			data: {
				token: YYIMChat.getToken()
			},
			dataType: 'json',
			cache: false,
			success: function(data) {
				if(data && data.items){
					var i = data.items.length;
					while(i--){
						data.items[i].id = YYIMChat.getJIDUtil().getID(data.items[i].jid);
					}
				}
				arg.success && arg.success(data.items);
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
	 * 设置上线状态
	 * @param arg{show, status, priority}
	 */
	function setPresence(arg) {
		YYIMChat.getConnection().send(new JumpPacket(arg, OPCODE.PRESENCE.SEND));
	}

	/**
	 * 收藏好友 rongqb 20161208
	 * @param jid
	 */
	function favoriteRoster(jid) {
		YYIMChat.getConnection().send(new JumpPacket({
			type: YYIMChat.getConstants().PRESENCE_TYPE.COLLECT,
			to: jid
		}, OPCODE.PRESENCE.SEND));
	}
	
	/**
	 * 收藏联系人 rongqb 20161208
	 * @param jid
	 */
	function cancelFavoriteRoster(jid) {
		YYIMChat.getConnection().send(new JumpPacket({ 
			favoritedRosterItem: { 
				jid: jid,
				subscription: YYIMChat.getConstants().FAVORITE_TYPE.REMOVE
			},
			from: YYIMChat.getUserFullJID()
		},OPCODE.FAVORITED_ROSTERT.SEND));
	}
	
	/**
	 * 修改收藏联系人的信息 rongqb 20161209
	 * @param {Object} jid
	 * @param {Object} name
	 */
	function updateFavoriteRoster(jid,name) {
		YYIMChat.getConnection().send(new JumpPacket({ 
			favoritedRosterItem: { 
				jid: jid,
				name: name,
				subscription: YYIMChat.getConstants().FAVORITE_TYPE.FAVORITE
			},
			from: YYIMChat.getUserFullJID()
		},OPCODE.FAVORITED_ROSTERT.SEND));
	}
	
	/**
	 * 添加好友
	 * @param jid
	 */
	function addRosterItem(jid) {
		YYIMChat.getConnection().send(new JumpPacket({
			type: YYIMChat.getConstants().PRESENCE_TYPE.SUBSCRIBE,
			to: jid
		}, OPCODE.PRESENCE.SEND));
	}

	/**
	 * 同意联系人的订阅请求
	 * @param jid
	 */
	function approveSubscribe(jid) {
		YYIMChat.getConnection().send(new JumpPacket({
			type: YYIMChat.getConstants().PRESENCE_TYPE.SUBSCRIBED,
			to: jid
		}, OPCODE.PRESENCE.SEND));
	}
	/**
	 * 拒绝联系人的订阅请求
	 * @param jid
	 */
	function rejectSubscribe(jid) {
		YYIMChat.getConnection().send(new JumpPacket({
			type: YYIMChat.getConstants().PRESENCE_TYPE.UNSUBSCRIBED,
			to: jid
		}, OPCODE.PRESENCE.SEND));
	}

	function monitor() {
		
		//联系人收藏，取消收藏 rongqb 20161208
		YYIMChat.getConnection().registerHandler(OPCODE.FAVORITED_ROSTERT.KEY, function(packet){
			if(packet && packet.favoritedRosterItem){
				packet.favoritedRosterItem.id = YYIMChat.getJIDUtil().getID(packet.favoritedRosterItem.jid);
			}
			if(packet && packet.to){
				packet.to = YYIMChat.getJIDUtil().getID(packet.to);
			}
			YYIMChat.onRosterFavorited(packet);
		});
		
		// 好友删除, 修改, 增加
		YYIMChat.getConnection().registerHandler(OPCODE.UPDATE_ROSTER.KEY, function(packet) {
			var item = packet.item,
				id = YYIMChat.getJIDUtil().getID(packet.item.jid);
			// 好友添加成功或好友信息更新
			if(item.subscription === 'both') {
				YYIMChat.log('update or add: ' + JSON.stringify(item));
				item.id = id;
				YYIMChat.onRosterUpdateded(item);
			}
			// 好友删除成功或被对方删除
			else if(item.subscription === 'none') {
				YYIMChat.log('delete: ' + JSON.stringify(item));
				item.id = id;
				YYIMChat.onRosterDeleted(item);
			}
			// 删除成功后会受到关系为none的包, remove无需再操作
			else if(item.subscription === 'remove') {
				// do nothing
			}

		});

		// 可能会收到订阅或上线包
		YYIMChat.getConnection().registerHandler(OPCODE.PRESENCE.KEY, function(packet) {
			// 订阅， 此处不做处理
			if(packet.type && packet.type != YYIMChat.getConstants().TYPE.UNAVAILABLE) {
				YYIMChat.onSubscribe({
					from: YYIMChat.getJIDUtil().getID(packet.from),
					type: packet.type
				});
				return;
			}
			// 上线包
			var ps = {
				from: YYIMChat.getJIDUtil().getID(packet.from),
				resource: YYIMChat.getJIDUtil().getResource(packet.from),
				type: packet.type,
				show: packet.show,
				status: packet.status
			};
			if(packet.type && packet.type == YYIMChat.getConstants().TYPE.UNAVAILABLE) {
				ps.show = YYIMChat.getConstants().STATUS.UNAVAILABLE;
				ps.status = YYIMChat.getConstants().STATUS.UNAVAILABLE;
				removeFromOnline(ps.from);
			}

			if(!YYIMCommonUtil.isStringAndNotEmpty(ps.status)) {
				ps.show = YYIMChat.getConstants().STATUS.CHAT;
				ps.status = YYIMChat.getConstants().STATUS.CHAT;
			};
			YYIMChat.onPresence(ps);
		});

	}

	export {
		monitor,
		approveSubscribe,
		rejectSubscribe,
		deleteRosterItem,
		queryRosterItem,
		getRostersPresence,
		updateRosterItem,
		setPresence,
		getVCard,
		getBatchVCards,
		getVCards,
		setVCard,
		addRosterItem,
		favoriteRoster,
		cancelFavoriteRoster,
		updateFavoriteRoster,
		getFavoriteRosterList,
		getRosterItems,
		setTag,
		removeTag
	};