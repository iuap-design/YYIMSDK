YYIMChat = (function(YYIMChat){
	var YYIMManager = YYIMChat.constructor;
	
var Manager = (function() {

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

	return {
		monitor: monitor,
		approveSubscribe: approveSubscribe,
		rejectSubscribe: rejectSubscribe,
		deleteRosterItem: deleteRosterItem,
		queryRosterItem: queryRosterItem,
		getRostersPresence: getRostersPresence,
		updateRosterItem: updateRosterItem,
		setPresence: setPresence,
		getVCard: getVCard,
		getBatchVCards: getBatchVCards,
		getVCards: getVCards,
		setVCard: setVCard,
		addRosterItem: addRosterItem,
		favoriteRoster: favoriteRoster,
		cancelFavoriteRoster: cancelFavoriteRoster,
		updateFavoriteRoster: updateFavoriteRoster,
		getFavoriteRosterList: getFavoriteRosterList,
		getRosterItems: getRosterItems,
		setTag: setTag,
		removeTag: removeTag
	};
})();
YYIMChat.setBackhander({
	'monitor': {
		'rosterMonitor': Manager.monitor
	},
	'initCallback': {
		'roster':  function(options){
			YYIMChat.onPresence = options.onPresence || function(){};  //好友上线
			YYIMChat.onSubscribe = options.onSubscribe || function(){}; // 对方请求加好友
			YYIMChat.onRosterDeleted = options.onRosterDeleted || function(){};  // 自己删除好友成功或对方进行了删除操作 
			YYIMChat.onRosterUpdateded = options.onRosterUpdateded || function(){};  // 好友信息更新
			YYIMChat.onRosterFavorited = options.onRosterFavorited || function(){};  // 好友收藏
		}
	}
});

/**
 * 设置上线状态
 * @param arg{show, status} 空则为在线
 *  away -- 该实体或资源临时离开.
    chat -- 该实体或资源活跃并想聊天.
    dnd -- 该实体或资源忙(dnd = "Do Not Disturb"，免打扰).
    xa -- 该实体或资源要离开相当长时间(xa = "eXtended Away"，长时间离开).
       如果show未被提供或为NULL, 该实体被假定在线并且可用. 
 */
YYIMManager.prototype.setPresence = function(arg){
	var presence = {};
	if(arg && arg.show && this.getConstants().STATUS[arg.show.toUpperCase()]){
		presence.show = arg.show;
	}
	if(arg && arg.status){
		presence.status = arg.status;
	}
	Manager.setPresence(presence);
};

/**
 * 获取自己或好友的VCard
 * @param arg {
 * 		id : 如果没有则获取自己的VCard,
 * 		success : function,
 * 		error : function
 * }
 */
YYIMManager.prototype.getVCard = function(arg) {
	arg = arg || {};
	if(arg){
		Manager.getVCard({
			id: arg.id,
			success : arg.success,
			error : arg.error
		});
	}else{
		arg.error && arg.error();
	}
};

/**
 *  批量拉取roster Vcard
 */
var batchVcardsList = new BaseList();
var batchVcardsTimer;
var getBatchVCards = function(){
	var handler = batchVcardsList;
	batchVcardsList = new BaseList();
	Manager.getBatchVCards({
		ids: JSON.stringify(handler.keys()),
		success: function(vcards){
			handler.forEach(function(item,index){
				try{
					item && item.success && item.success(vcards[item.id]);
				}catch(e){
					//TODO handle the exception
					YYIMChat.log('SuccessHandleBatchVCardsError.',0,e);
				}
			});
			handler.clear();
			handler = null;
		},
		error: function(err){
			handler.forEach(function(item,index){
				try{
					item && item.error && item.error(err);
				}catch(e){
					//TODO handle the exception
					YYIMChat.log('ErrorHandleBatchVCardsError.',0,e);
				}
			});
			handler.clear();
			handler = null;
		}
	});
}

YYIMManager.prototype.getBatchVCards = function(arg){
	if(arg && arg.id && !batchVcardsList.get(arg.id)){
		batchVcardsList.set(arg.id, arg);
		clearTimeout(batchVcardsTimer);
		if(batchVcardsList.length() >= this.getConfig().ROSTER.BATCHVCRADMAXLIMIT){
			getBatchVCards();
		}else{
			batchVcardsTimer = setTimeout(function(){
				getBatchVCards();
			},200);
		}
	}else{
		arg.error && arg.error();
	}
};

/**
 * 获取所有好友的VCard
 * 
 * @param arg {
 * 		success : function,
 * 		error : function
 * }
 */
YYIMManager.prototype.getVCards = function(arg) {
	if(arg){
		Manager.getVCards({
			success : arg.success,
			error : arg.error,
			complete : arg.complete
		});
	}else{
		arg.error && arg.error();
	}
};

/**
 * 修改当前用户的头像
 * @param arg {
 * 		nickname:String,
 * 		photo:String,
 * 		email:String,
 * 		mobile:Number,
 * 		telephone:Number,
 *      organization:String,
 *      gender:,
 *      number:Number,
 *      remarks:,
 * 		location:String,
 *      position:String,
 * 		success : function,
 * 		error : fcuntion
 * }
 */
YYIMManager.prototype.setVCard = function(arg) {
	Manager.setVCard({
		vcard : {
			nickname : arg.nickname,
			photo : arg.photo,
			email : arg.email,
			mobile : arg.mobile,
			telephone : arg.telephone,
			organization : arg.organization,
			gender : arg.gender,
			number : arg.number,
			remarks : arg.remarks,
			location : arg.location,
			position : arg.position
		},
		success : arg.success,
		error : arg.error
	});
};


/**
 * 修改当前用户的Tag rongqb 20160719
 * @param arg {
 * 		tag : Array,
 * 		success : function,
 * 		error : fcuntion
 * }
 */
YYIMManager.prototype.setVCardTag = function(arg){
	arg = arg || {};
	if(YYIMArrayUtil.isArray(arg.tag)){
		var that = this;
		Manager.setTag({
			tag: arg.tag,
			success: function(targetId){
				that.getVCard({
					id: targetId,
					success: function(vcard){
						arg.success && arg.success(vcard);
					}
				});
			},
			error: arg.error
		});
	}else{
		arg.error && arg.error();
	}
};

/**
 * 删除当前用户的Tag rongqb 20160719
 * @param arg {
 * 		tag : Array,
 * 		success : function,
 * 		error : fcuntion
 * }
 */
YYIMManager.prototype.removeVCardTag = function(arg){
	arg = arg || {};
	if(YYIMArrayUtil.isArray(arg.tag)){
		var that = this;
		Manager.removeTag({
			tag: arg.tag,
			success: function(targetId){
				that.getVCard({
					id: targetId,
					success: function(vcard){
						arg.success && arg.success(vcard);
					}
				});
			},
			error: arg.error
		});
	}else{
		arg.error && arg.error();
	}
};


/**
 * 修改好友的Tag rongqb 20160719
 * @param arg {
 * 		id: String, //targetID 
 * 		tag : Array,
 * 		success : function,
 * 		error : fcuntion
 * }
 */
YYIMManager.prototype.setRosterTag = function(arg){
	arg = arg || {};
	if(arg.id && YYIMArrayUtil.isArray(arg.tag) && arg.id != this.getUserID()){
		Manager.setTag({
			id: arg.id,
			tag: arg.tag,
			success: function(targetId){
				arg.success && arg.success(targetId);
			},
			error: arg.error
		});
	}else{
		arg.error && arg.error();
	}
};

/**
 * 删除好友的Tag rongqb 20160719
 * @param arg {
 * 		id: String, //targetID 
 * 		tag : Array,
 * 		success : function,
 * 		error : fcuntion
 * }
 */
YYIMManager.prototype.removeRosterTag = function(arg){
	arg = arg || {};
	if(arg.id && YYIMArrayUtil.isArray(arg.tag) && arg.id != this.getUserID()){
		Manager.removeTag({
			id: arg.id,
			tag: arg.tag,
			success: function(targetId){
				arg.success && arg.success(targetId);
			},
			error: arg.error
		});
	}else{
		arg.error && arg.error();
	}
};


/**
 * 获取好友列表[roster]
 * @param arg {
 * 	success: function, 
 * 	error: function,
 * 	complete: function
 * }
 */
YYIMManager.prototype.getRosterItems = function(arg){
	Manager.getRosterItems(arg);
};

/**
 * 添加好友[roster]
 * @param id
 */
YYIMManager.prototype.addRosterItem = function(id){
	if(YYIMCommonUtil.isStringAndNotEmpty(id)) {
		Manager.addRosterItem(YYIMChat.getJIDUtil().buildUserJID(YYIMChat.getJIDUtil().getNode(id)));
	}
};

/**
 * 同意联系人的订阅请求
 * @param id 请求订阅的联系人的ID
 */
YYIMManager.prototype.approveSubscribe = function(id) {
	if(YYIMCommonUtil.isStringAndNotEmpty(id)) {
		Manager.approveSubscribe(YYIMChat.getJIDUtil().buildUserJID(YYIMChat.getJIDUtil().getNode(id)));
	}
};

/**
 * 拒绝联系人的订阅请求
 * @param id 请求订阅的联系人的ID
 */
YYIMManager.prototype.rejectSubscribe = function(id) {
	if(YYIMCommonUtil.isStringAndNotEmpty(id)) {
		Manager.rejectSubscribe(YYIMChat.getJIDUtil().buildUserJID(YYIMChat.getJIDUtil().getNode(id)));
	}
};

/**
 * 删除好友[roster]
 * @param arg {id: string, success: function, error: function,complete: function}
 */
YYIMManager.prototype.deleteRosterItem = function(arg) {
	if(YYIMCommonUtil.isStringAndNotEmpty(arg.id)) {
		Manager.deleteRosterItem({
			jid: YYIMChat.getJIDUtil().buildUserJID(YYIMChat.getJIDUtil().getNode(arg.id)),
			success: arg.success,
			error: arg.error
		});
	}
};

/**
 * 查找好友[roster][包括好友和非好友]，查询字段：userName, name
 * @param arg {keyword,start, size, success: function, error: function,complete: function}
 */
YYIMManager.prototype.queryRosterItem = function(arg) {
	if(YYIMCommonUtil.isStringAndNotEmpty(arg.keyword)) {
		Manager.queryRosterItem(arg);
	}
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
YYIMManager.prototype.getRostersPresence = function(arg) {
	if(YYIMArrayUtil.isArray(arg.username)) {
		arg.username = JSON.stringify(arg.username);
		Manager.getRostersPresence(arg);
	}
};

/**
 * 更新好友
 * @param arg {
 * 		roster : {
 * 			id : 好友id,
 * 			name : 好友昵称,
 * 			groups : ["group1","group2"] // 好友所在分组
 * 		},
 * 		success : function,
 * 		error : function
 * }
 */
YYIMManager.prototype.updateRosterItem = function(arg) {
	if(arg && arg.roster && YYIMCommonUtil.isStringAndNotEmpty(arg.roster.id)) {
		Manager.updateRosterItem({
			roster: {
				jid: YYIMChat.getJIDUtil().buildUserJID(YYIMChat.getJIDUtil().getNode(arg.roster.id)),
				name: arg.roster.name,
				groups: arg.roster.groups
			},
			success: arg.success,
			error: arg.error
		});
	}
};

/**
 * 收藏/取消收藏 联系人[roster]
 * @param arg id
 */
YYIMManager.prototype.favoriteRoster = function(id,type){
	if(YYIMUtil['isWhateType'](id,'String')){
		var jid = YYIMChat.getJIDUtil().buildUserJID(YYIMChat.getJIDUtil().getNode(id));
		if(type == YYIMChat.getConstants().FAVORITE_TYPE.REMOVE){
			Manager.cancelFavoriteRoster(jid);
		}else{
			Manager.favoriteRoster(jid);
		}
	}
};

/**
 * 修改收藏联系人的备注 rongqb 20161209
 * @param arg id,name
 */
YYIMManager.prototype.updateFavoriteRoster = function(id,name){
	if(YYIMUtil['isWhateType'](id,'String') && YYIMUtil['isWhateType'](name,'String')){
		var jid = YYIMChat.getJIDUtil().buildUserJID(YYIMChat.getJIDUtil().getNode(id));
		Manager.updateFavoriteRoster(jid,name);
	}
};

/**
 * 获取收藏联系人列表
 * @param {Object} arg {
 * 	success: function,
 * 	error: function
 * }
 */
YYIMManager.prototype.getFavoriteRosterList = function(arg){
	arg = arg || {};
	Manager.getFavoriteRosterList({
		success: arg.success,
		error: arg.error
	});
};

 	return YYIMManager.getInstance();
})(YYIMChat);
