YYIMChat = (function(YYIMChat){
	var YYIMManager = YYIMChat.constructor;
	
var Manager = (function() {

	/**
	 * 获取最近联系（群组、公众号）摘要列表 rongqb 20160706
	 * @param arg {
	 * startDate: timestamp,
	 * size: Number, //50
	 * success:function,
	 * error:function,
	 * complete:function
	 * }
	 */
	function getRecentDigset(arg) {
		var param = {
			startDate: arg.startDate
		};
		if(arg.size){
			param.size = arg.size;
		}
		jQuery.ajax({
			url: YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + YYIMChat.getUserID() + '/contactsmessage/digests?token=' + YYIMChat.getToken(),
			type: 'get',
			data: param,
			dataType: 'json',
			cache: false,
			success: function(data) {
				for(var x in data.list) {
					if(data.list.hasOwnProperty(x)){
						var item = data.list[x];
						
						item.id = YYIMChat.getJIDUtil().getID(item.jid);
						item.type = YYIMChat.getJIDUtil().getChatTypeByJid(item.jid);
						
						try {
							if(item.lastMessage) {
								item.lastMessage = messageParser(JSON.parse(item.lastMessage), item.type);
							}
						} catch(e) {
						}
					}
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

	function parseContent(content,contentType) {
		if (content) {
			var body = JSON.parse(content);
			try{
				if(isNaN(Number(body.content))
				&& contentType != YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.TEXT){ //非数字字符串继续转换 rongqb 20151014
					body.content = JSON.parse(body.content);
					if (body.content.content) {
						body.content = body.content.content;
					}
				}
			}catch(e){
			}
			return body;
		}else {
			return null;
		}
	}

	/**
	 * 解析最近一条消息
	 */
	function messageParser(packet, type) {

		var message = {
			from: YYIMChat.getJIDUtil().getID(packet.sender),
			to: YYIMChat.getJIDUtil().getID(packet.receiver || YYIMChat.getUserID()),
			id: packet.packetId,
			dateline: packet.dateline || packet.ts,
			type: type,
			sessionVersion: packet.sessionVersion
		};

		if(type){
			if(type == YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT){
				message.from = {
					room: YYIMChat.getJIDUtil().getID(packet.mucid),
					roster: YYIMChat.getJIDUtil().getID(packet.sender)
				};
			}else if(type == YYIMChat.getConstants().CHAT_TYPE.PUB_ACCOUNT){
				message.from = {
					room: YYIMChat.getJIDUtil().getID(packet.sender),
					roster: YYIMChat.getJIDUtil().getID(YYIMChat.getJIDUtil().getResource(packet.sender))
				};
			}
		}

		if(packet.content) {
			message.data = message.data || {};
			try {
				var content = parseContent(packet.content,packet.contentType);
				if(!!content && (!!content.content || content.content === '')) {
					message.data = content;
				} else {
					message.data.content = content;
				}
			} catch(e) {}

			message.data.contentType = packet.contentType;
			message.data.dateline = packet.dateline || packet.ts;

			if(message.data.content 
			&& message.data.contentType 
			&& (message.data.contentType == YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.IMAGE 
			|| message.data.contentType == YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.FILE)) {

				message.data.content.attachId = message.data.content.path;
				message.data.content.path = YYIMChat.getFileUrl(message.data.content.path);
			}

			if(YYIMChat.getJIDUtil().getID(packet.sender) != YYIMChat.getUserID()) {
				var receipt = {
					to: YYIMChat.getJIDUtil().getID(packet.mucid || packet.sender),
					id: message.id,
					type: message.type,
					sessionVersion: message.sessionVersion
				};
				message.data.receipt = receipt;
			}
		}
		return message;
	}
	
	function removeRecentDigest(arg){
		var typeRelation = {
			'chat': 'user',
			'groupchat': 'room',
			'pubaccount': 'pub'
		};
		
		jQuery.ajax({
			url: YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + YYIMChat.getUserID() + '/contacts/' + (typeRelation[arg.type] || typeRelation['chat']) + '/' + arg.id + '?token=' + YYIMChat.getToken(),
			type: 'DELETE',
			dataType: 'json',
			cache: false,
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

	return {
		getRecentDigset: getRecentDigset,
		removeRecentDigest: removeRecentDigest
	};
})();
/**
 * 获取最近联系人（群组、公众号）摘要列表 rongqb 20160908
 * @param arg {
 * startDate: timestamp,
 * size: Number, //default: 50, max: 500
 * success:function,
 * error:function,
 * complete:function
 * }
 */
YYIMManager.prototype.getRecentDigset = function(arg) {
	arg.startDate = (YYIMUtil['isWhateType'](arg.startDate,'Number') &&  arg.startDate > 0) ? arg.startDate: 0;
	if(!(YYIMUtil['isWhateType'](arg.size,'Number') &&  arg.size > 0)){
		delete arg.size;		
	}
	Manager.getRecentDigset(arg);
};

/**
 * 删除摘要 rognqb 20170225
 * @param arg {
 * id: String,
 * type: String,
 * success:function,
 * error:function,
 * complete:function
 */
YYIMManager.prototype.removeRecentDigest = function(arg) {
	if(arg.id){
		Manager.removeRecentDigest(arg);
	}else{
		arg && arg.error && arg.error();	
	}	
};
 	return YYIMManager.getInstance();
})(YYIMChat);
