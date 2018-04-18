YYIMChat = (function(YYIMChat){
	var YYIMManager = YYIMChat.constructor;
	
var Manager = (function(){
	var receivedMsgIds = new BaseList();
	/**
	 * 监控message包
	 */
	function monitor() {
		YYIMChat.getConnection().registerHandler(OPCODE.USER_MESSAGE.KEY, function(packet) {
			parseMessage(packet, YYIMChat.getConstants().CHAT_TYPE.CHAT);
		});

		YYIMChat.getConnection().registerHandler(OPCODE.CHATGROUP_MESSAGE.KEY, function(packet) {
			parseMessage(packet, YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT);
		});

		YYIMChat.getConnection().registerHandler(OPCODE.PUBACCOUNT_MESSAGE.KEY, function(packet) {
			parseMessage(packet, YYIMChat.getConstants().CHAT_TYPE.PUB_ACCOUNT);
		});
		/**
		 * 监听发送消息的已读回执 rongqb 20151120
		 */
		YYIMChat.getConnection().registerHandler(OPCODE.RECEIPTS.KEY, function(receipts) {
			receipts.type = YYIMChat.getJIDUtil().getChatTypeByJid(receipts.to);
			receipts.from = YYIMChat.getJIDUtil().getID(receipts.from);
			receipts.to = YYIMChat.getJIDUtil().getID(receipts.to);

			YYIMChat.onReceipts(receipts);
		});

		/**
		 * 监听各端同步消息  rongqb 20151123
		 */
		YYIMChat.getConnection().registerHandler(OPCODE.SYNC_MESSAGE.KEY, function(packet) {
			parseMessage(packet, packet.type);
		});

		/**
		 * 监听透传消息  rongqb 20150603
		 */
		YYIMChat.getConnection().registerHandler(OPCODE.USERONLINEDELIVERPACKET.KEY, function(packet) {
			parseTransparentMessage(packet,YYIMChat.getConstants().CHAT_TYPE.CHAT);
		});

		/**
		 * 监听透传消息  rongqb 20150712
		 */
		YYIMChat.getConnection().registerHandler(OPCODE.MUCONLINEDELIVERPACKET.KEY, function(packet) {
			parseTransparentMessage(packet,YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT);
		});

		/**
		 * 监听透传消息  rongqb 20150712
		 */
		YYIMChat.getConnection().registerHandler(OPCODE.PUBONLINEDELIVERPACKET.KEY, function(packet) {
			parseTransparentMessage(packet,YYIMChat.getConstants().CHAT_TYPE.PUB_ACCOUNT);
		});

		/**
		 * 监听透传消息  rongqb 20150719
		 */
		YYIMChat.getConnection().registerHandler(OPCODE.REMINDSETTINGONLINEDELIVERPACKET.KEY, function(packet) {
			parseTransparentMessage(packet);
		});


	};

	function parseTransparentMessage(packet,type){
		// 是否重复消息包
		if(receivedMsgIds.get(packet.id)){
			return;
		}
		receivedMsgIds.set(packet.id, packet);

		packet.type = type || YYIMChat.getJIDUtil().getChatTypeByJid(packet.from);

		packet.to = YYIMChat.getJIDUtil().getID(packet.to) || YYIMChat.getUserID();

		packet.from = (packet.type != YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT) ? YYIMChat.getJIDUtil().getID(packet.from):{
			room: YYIMChat.getJIDUtil().getID(packet.from),
			roster: YYIMChat.getJIDUtil().getID(YYIMChat.getJIDUtil().getResource(packet.from))
		};

		if(packet.attributes){
			if(packet.attributes.receiver){
				packet.attributes.receiver = YYIMChat.getJIDUtil().getID(packet.attributes.receiver);
			}

			if(packet.attributes.bareJID){
				packet.attributes.bareJID = {
					id: YYIMChat.getJIDUtil().getID(packet.attributes.bareJID),
					type: YYIMChat.getJIDUtil().getChatTypeByJid(packet.attributes.bareJID)
				};
			}

			if(packet.attributes.userJids
			&& YYIMChat.getUtil()['isWhateType'](packet.attributes.userJids,'Array')){
				for(var x in packet.attributes.userJids){
					if(packet.attributes.userJids.hasOwnProperty(x)){
						packet.attributes.userJids[x] = YYIMChat.getJIDUtil().getID(packet.attributes.userJids[x]);
					}
				}
			}
		}
		try{
			YYIMChat.onTransparentMessage(packet);
		}catch(e){
			YYIMChat.log("TransparentMessHandleError:",0,packet);
		}
	}

	/**
	 * 解析消息体 rongqb 20170911
	 * @param {Object} packet
	 */
	function parseMessageBody(packet, type){

		var packetContent;
		try{
			// 除最简单文本消息，例如图片消息、文件、分享类消息，需要解析
			packetContent = JSON.parse(packet.content);

			if(packetContent
			&& packetContent.content){
				try{
					if(isNaN(Number(packetContent.content))
					&& packet.contentType != YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.TEXT){
						packetContent.content = JSON.parse(packetContent.content);
					}
				}catch(e){
				}
			}
		}catch(e){
			packetContent = packet.content;
		}

		var content = packetContent;

		if(typeof packetContent.content != 'undefined'){
			content = packetContent.content;
		}

		var body = {
			content: content,
			contentType: packet.contentType,
			dateline: packet.dateline || packet.ts,
			atuser: packetContent.atuser,
			extend: packetContent.extend 	//扩展
		};

		if(packet.contentType == YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.MERGEFORWARD){
			body.title = packetContent.title;
			body.containfileNum = packetContent.containfileNum;
			body.safeMode = packetContent.safeMode;

			if(packetContent.messages){
				body.messages = [];
				for(var x in packetContent.messages){
					if(packetContent.messages.hasOwnProperty(x)){
						var item = arguments.callee(packetContent.messages[x],type);
						if(item){
							body.messages.push(item);
						}
					}
				}
			}
		}

		var from = (type == YYIMChat.getConstants().CHAT_TYPE.CHAT) ? YYIMChat.getJIDUtil().getID(packet.sender || packet.from):{
			room: YYIMChat.getJIDUtil().getID(packet.mucid || packet.sender || packet.from),
			roster: YYIMChat.getJIDUtil().getID(YYIMChat.getJIDUtil().getResource(packet.sender || packet.from) || packet.sender)
		};

		var result = {
			id: packet.id || packet.packetId,
			type: type,
			from: from,
			dateline: body.dateline,
			sessionVersion: packet.sessionVersion,
			data: body
		};

		if(type == YYIMChat.getConstants().CHAT_TYPE.CHAT) {
			result.resource = YYIMChat.getJIDUtil().getResource(packet.sender || packet.from);
			result.to = YYIMChat.getJIDUtil().getID(packet.receiver || packet.to);
		}else{
			result.to = YYIMChat.getUserID();
		}

		if(body.contentType){
			if(result.data.content
			&& result.data.content.path){
				result.data.content.attachId = result.data.content.path;
				result.data.content.path = YYIMChat.getFileUrl(result.data.content.path);

				if(body.contentType == YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.FILE
				|| body.contentType == YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.IMAGE){
					result.data.content.size = result.data.content.size || 0;
				}
			}

			/**
			 * 发送接收回执
			 */
			if(result.data
			&& (packet.receipts === true
				|| (YYIMChat.getJIDUtil().getID(packet.sender || packet.from) != YYIMChat.getUserID()))){

				result.data.receipt = {
					to: packet.mucid || packet.sender || packet.from,
					id: packet.id || packet.packetId,
					type: type,
					sessionVersion: packet.sessionVersion
				};

				if(packet.receipts === true){
					sendReceiptsPacket(result.data.receipt);
				}
			}
			return result;
		}
	}

	// 长连接接收到的消息
	function parseMessage(packet, type) {
		// 是否重复消息包
		if(receivedMsgIds.get(packet.id)){
			return;
		}
		receivedMsgIds.set(packet.id, packet);

		var message = parseMessageBody(packet, type);

		if(message){
			try{
				/**
				 * 处理消息报文
				 */
				YYIMChat.onMessage(message);
			}catch(e){
				YYIMChat.log("ParseMessageError:",0,message,e);
			}
		}
	}

	/**
	 * 发送回执
	 *  @param arg {
	 *   to: String,	//回执的对象
	 * 	 type: String, 	//type
	 * 	 id: String, 	//报文id
	 *   sessionVersion: String,
	 *   state: 1/2
	 * }
	 */
	function sendReceiptsPacket(arg){
		arg = arg || {};
		var Jid = YYIMChat.getJIDUtil().buildUserJID(YYIMChat.getJIDUtil().getNode(arg.to));
		if(arg.type == YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT){
			Jid = YYIMChat.getJIDUtil().buildChatGroupJID(YYIMChat.getJIDUtil().getNode(arg.to));
		}else if(arg.type == YYIMChat.getConstants().CHAT_TYPE.PUB_ACCOUNT){
			Jid = YYIMChat.getJIDUtil().buildPubAccountJID(YYIMChat.getJIDUtil().getNode(arg.to));
		}
		var receiptsPacket = new JumpPacket({
			to: Jid,
			dateline: new Date().getTime(),
			sessionVersion: arg.sessionVersion,
			id: arg.id,
			state: arg.state
		}, OPCODE.RECEIPTS.SEND);
		YYIMChat.getConnection().send(receiptsPacket);
	}

	/**
	 * 发送消息
	 * @param arg {id, to: jid, type: "groupchat"|"chat"|"pubaccount",body:object, success:function, error:function}
	 */
	 function sendMessage(arg) {
	 	var body = arg.body || {};

		// 发送请求参数处理 yaoleib20171220
		body.extend = handleRequestParams(body);

		if(body.extend && (typeof body.extend != 'string')){
			try{
				body.extend = JSON.stringify(body.extend);
			}catch(e){
				delete body.extend;
				YYIMChat.log('ExtendIllegal',0,e.message);
			}
		}

		var to,
			msgBody = {
    			id 			: arg.id,
				spaceId		: arg.spaceId,
    			type 		: arg.type || YYIMChat.getConstants().CHAT_TYPE.CHAT,
    			contentType	: body.contentType || YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.TEXT,
    			dateline	: body.dateline || (YYIMChat.getConfig().TIMECORRECTION.AUTOCORRECTION? new Date().getTime() + YYIMChat.getConfig().TIMECORRECTION.RESULT: new Date().getTime()),
    			content 	: JSON.stringify({
    				atuser  : body.atuser,
    				extend  : body.extend,
    				content : body.content
    			})
			},
			opcode = OPCODE.USER_MESSAGE.SEND;
		/**
		 * rongqb 20170628
		 */
	  	if((!body.contentType
	    	|| body.contentType == YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.TEXT)
	    	&& arg.type == YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT){
	    		if(YYIMUtil['isWhateType'](body.atuser,'Array')
	    		&& body.atuser.length){
	    			if(body.atuser.indexOf('im_atall') != -1){
	    				msgBody.statRead = 1;
	    			}else{
	    				msgBody.statRead = 2;
	    				msgBody.statMem = body.atuser;
	    			}
	    		}
	    	}

		if(arg.type == YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT){
			to = YYIMChat.getJIDUtil().buildChatGroupJID(YYIMChat.getJIDUtil().getNode(arg.to));
			opcode = OPCODE.CHATGROUP_MESSAGE.SEND;

		}else if(arg.type == YYIMChat.getConstants().CHAT_TYPE.PUB_ACCOUNT){
			to = YYIMChat.getJIDUtil().buildPubAccountJID(YYIMChat.getJIDUtil().getNode(arg.to));
			opcode = OPCODE.PUBACCOUNT_MESSAGE.SEND;
		}else{
			msgBody.receipts = '1';
			if(arg.resource){
				// 给自己的其他端发
				if(arg.to == YYIMChat.getUserID()) {
					to = YYIMChat.getJIDUtil().buildUserJID(YYIMChat.getJIDUtil().getNode(arg.to), arg.resource);
				}else{
					to = YYIMChat.getJIDUtil().buildUserJID(YYIMChat.getJIDUtil().getNode(arg.to));
				}
			}else{
				to = YYIMChat.getJIDUtil().buildUserJID(YYIMChat.getJIDUtil().getNode(arg.to));
			}
		}

		msgBody.to = to;

		YYIMChat.getConnection().send(new JumpPacket(msgBody, opcode), function(receipts) {
			if(receipts.code == 40302){
				arg.error && arg.error();
				arg = null;
			}else{
				if(!!YYIMChat.getConfig().TIMECORRECTION.AUTOCORRECTION){
					if(receipts && receipts.state == 1){
						YYIMChat.onReceipts(receipts);
					}
				}else{
					arg.success && arg.success(handleSendMessage(arg,body,receipts));
					arg = null;
				}
			}
		});

		if(!!YYIMChat.getConfig().TIMECORRECTION.AUTOCORRECTION){
			arg.success && arg.success(handleSendMessage(arg,body,{
				dateline: msgBody.dateline
			}));
		}
	}

	/**
	 * 发送请求参数处理 yaoleib20171220
	 */
	function handleRequestParams(body) {
		var messageExtend = {
			intelligentAnalysis: {}
		};

		// 消息开关，目前只有文本消息进行AI分析
		if(body.contentType && body.contentType == YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.TEXT){
			//YYAIAbility.setDictionaries(["投票", "视频会议", "吃鸡", "电话", "拍照", "照片"]);

			// 兼容写法，可能不会走进这个判断
			if(body.extend && (typeof body.extend != 'string')){
				messageExtend = body.extend;
			}
			if(YYAIAbility.intelligentAnalysis(body.content)){
				messageExtend.intelligentAnalysis.intelligentable = true;
				if(body.sceneParams){
					messageExtend.intelligentAnalysis.params = body.sceneParams
					delete body.sceneParams
				}
			}
		}
		return messageExtend;
	}

	/**
	 * 发送出的消息处理函数
	 */
	function handleSendMessage(arg, body, receipts) {
		var result = {
			id : arg.id,
			type : arg.type,
			sessionVersion: receipts.sessionVersion || 0,
			data : {
				content : body.content,
				contentType : body.contentType,
				dateline : receipts.dateline,
				extend : body.extend
			}
		};

		if (result.type != YYIMChat.getConstants().CHAT_TYPE.CHAT) {
			result.to = YYIMChat.getUserID();
			result.from = {
				room : YYIMChat.getJIDUtil().getID(arg.to),
				roster : YYIMChat.getUserID()
			};
		} else {
			result.to = YYIMChat.getJIDUtil().getID(arg.to);
			result.from = YYIMChat.getUserID();
			result.resource = YYIMChat.getResource();
		}

		if (result.data.content.path) {
			result.data.content.attachId = result.data.content.path;
			result.data.content.path = YYIMChat.getFileUrl(result.data.content.path);
		}
		return result;
	}

	/**
	 * 获取历史记录
	 * @param
	 * arg {
	 * 	id: String,
	 *  type: 'chat/groupchat/pubaccount',
	 *  start: number,
	 *  size: number,
	 *  startVersion: number, //默认为0
	 *  endVersion: number
	 * }
	 */
	function getHistoryMessage(arg) {
		var requestUrl,route,params = {
				token: YYIMChat.getToken(),
				start: arg.start || 0,
				size: arg.size || 100
			};

		if(arg.type == YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT){
			route = 'groupchat';
		}else if(arg.type == YYIMChat.getConstants().CHAT_TYPE.PUB_ACCOUNT){
			route = 'pubaccount';
		}else{
			route = 'user';
			if(arg.contentType){
				var typelist = YYIMChat.getConstants().MESSAGE_CONTENT_TYPE;
				for(var x in typelist){
					if(arg.contentType == typelist[x]){
						params.contentType = arg.contentType;
						break;
					}
				}
			}
		}

		requestUrl = YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + YYIMChat.getUserID() + '/msghistory/' + route + '/' + arg.id + '/version/' + (arg.startVersion || 0) + '/' + arg.endVersion;
		requestUrl += '?' + jQuery.param(params);

		YYIMChat.log("历史记录：request URL",	2,requestUrl);
		jQuery.ajax({
			url: requestUrl,
			dataType: "json",
			cache:false,
			success: function(data) {
				_historyMessageProcessor(data, arg);
				arg = null;
			},
			error:function(xhr){
				YYIMChat.log("getHistoryMessage_error:", 0, xhr.statusText);
				try{
					arg.error && arg.error(JSON.parse(xhr.responseText));
					arg = null;
				}catch(e){
					arg.error && arg.error();
					arg = null;
				}
			}
		});
	};

	/**
	 * 解析历史消息
	 *
	 * @param data ajax返回的数据
	 * @param arg {id: 对方ID, resource: 对方资源 为anonymous时表示匿名用户, type: 'chat' | 'groupchat', start: number, num: number, success: function, error: function}
	 */
	function _historyMessageProcessor(data, arg){
		YYIMChat.log("历史记录：data", 2, data);
		var hisMsgArr = [];
		for(var i in data.list){
			if(data.list.hasOwnProperty(i)){
				var item = data.list[i];
				var message = parseMessageBody(item, arg.type);
				hisMsgArr.push(message);
			}
		}

		arg.success && arg.success({
			contactReadVersion: data.contactReadVersion,
			total: data.total,
			result: hisMsgArr
		});
	};

	/**
	 * 撤销消息 rongqb 20160707
	 * arg {
	 * 	id: String, //消息id
	 *  to: String, //消息的另一方,待定
	 *  type: 'chat/groupchat/pubaccount',
	 *  success: function,
	 *  error: function,
	 *  complete: function
	 * }
	 */
	function revokeMessage(arg){
		var url,param;
		if(arg.type == YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT){
			url = YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/revokeservice/groupmessage/'+ arg.id;
			param = {
				token:  YYIMChat.getToken(),
				userid: YYIMChat.getUserNode(),
				mucid: YYIMChat.getJIDUtil().getNode(arg.to)
			};
		}else{
			url = YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/revokeservice/personalmessage/'+ arg.id;
			param = {
				token:  YYIMChat.getToken(),
				fromuserid: YYIMChat.getUserNode(),
				touserid: YYIMChat.getJIDUtil().getNode(arg.to)
			};
		}

		url += '?' + jQuery.param(param);

		jQuery.ajax({
			url: url,
			type: 'post',
			cache: false,
			success: function(data){
				arg.success && arg.success({
					id:arg.id
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

	return {
		monitor : monitor,
		sendMessage : sendMessage,
		getHistoryMessage : getHistoryMessage,
		revokeMessage : revokeMessage,
		sendReceiptsPacket: sendReceiptsPacket
	};
})();

YYIMChat.setBackhander({
	'monitor': {
		'messageMonitor': Manager.monitor
	},
	'initCallback': {
		'message':  function(options){
			YYIMChat.onReceipts = options.onReceipts || function(){}; //回执
			YYIMChat.onMessage = options.onMessage || function(){}; //消息回调
			YYIMChat.onTransparentMessage = options.onTransparentMessage || function(){}; //透传消息
		}
	}
});


/**
 * 获取历史记录 rongqb 20160815
 * @param
 * arg {
 * 	id: String,
 *  type: 'chat/groupchat/pubaccount',
 *  start: number,
 *  size: number,
 *  startVersion: number, //默认为0
 *  endVersion: number
 * }
 */
YYIMManager.prototype.getHistoryMessage = function(arg){
	arg = arg || {};

	if(!YYIMUtil['isWhateType'](arg.start,'Number')){
		arg.start = 0;
	}

	if(!YYIMUtil['isWhateType'](arg.size,'Number')){
		arg.size = 100;
	}

	Manager.getHistoryMessage(arg);
};

/**
 * 发送已读回执报文
 *  @param arg {
 *   to: String,	//回执的对象
 *   type: String, 	//type
 * 	 id: String, 	//报文id
 *   sessionVersion: String
 * }
 */
YYIMManager.prototype.sendReadedReceiptsPacket = function(arg){
	if(arg && arg.id){
		arg.state = 2;
		Manager.sendReceiptsPacket(arg);
	}
};

/**
 * 异步发送form表单
 * arg {
 * 	  to:,
 *    file:{
 *       name:,
 *       size:
 *    },
 *    data: FormData,
 *    mediaType:, //1:图片，2：附件
 *    type: "groupchat/chat/pubaccount",  //chat:单聊，groupcgat:群聊,pubaccount:公众号
 *    progress: function,
 *    success:function,
 *    error:function,
 *    complete:function
 * }
 */
YYIMManager.prototype.sendFormMessage = function(arg) {
	var that = this;
	var file = arg.file

	var param = {
		token: this.getToken(),
		creator: this.getUserNode(),
		receiver: this.getJIDUtil().getNode(arg.to),
		mediaType: arg.mediaType || 2,
		randomId: Math.uuid(),
		name: file.name,
		size: file.size
	};
	var url = YYIMChat.getConfig().SERVLET.REST_RESOURCE_SERVLET + YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/upload';
	url += '?' + jQuery.param(param);

	jQuery.ajax({
		xhr: function() {
			var xhr = new window.XMLHttpRequest();
			//Upload progress
			xhr.upload.addEventListener("progress", function(evt) {
				if(evt.lengthComputable) {
					var percentComplete = evt.loaded / evt.total;
					arg.progress && arg.progress({
						loaded: evt.loaded,
						total: evt.total,
						percent: percentComplete
					});
				}
			}, false);
			//Download progress
			xhr.addEventListener("progress", function(evt) {
				if(evt.lengthComputable) {
					var percentComplete = evt.loaded / evt.total;
					arg.progress && arg.progress({
						loaded: evt.loaded,
						total: evt.total,
						percent: percentComplete
					});
				}
			}, false);
			return xhr;
		},
		url: url,
		type: 'post',
		dataType: 'json',
		data: arg.data,
		processData: false,
		contentType: false,
		success: function(result) {
			if(result && result.attachId) {
				var CONTENT_TYPE = YYIMChat.getConstants().MESSAGE_CONTENT_TYPE;
				arg.fileUploaded && arg.fileUploaded(result);
				that.sendMessage({
					id: arg.id,
					to: arg.to,
					spaceId: arg.spaceId,
					type: arg.type, //chat:单聊，groupcgat:群聊,pubaccount:公众号
					content: new IMFile({
						name: file.name,
						path: result.attachId,
						size: file.size,
						original: (param.mediaType === 1)? 1:null
					}),
					contentType: (param.mediaType === 1) ? CONTENT_TYPE.IMAGE : CONTENT_TYPE.FILE,
					success: arg.success,
					error: arg.error
				});
			} else {
				arg.error && arg.error();
			}
			arg = null;
		},
		error: arg.error
	});
};

/**
 * 发送分享消息[分享消息]
 * @param arg {
 * to: id, //对话人id
 * type: "groupchat/chat/pubaccount",  //chat:单聊，groupcgat:群聊,pubaccount:公众号
 * extend: string,  //扩展字段
 * content:{
 * 		shareImageUrl:string, //分享中图片的url
 * 		shareUrl:string, //分享的url
 * 		shareDesc:string, //分享的内容描述
 * 		shareTitle:string //分享的标题
 * 	},
 * success:function //成功回调函数
 * }
 */
YYIMManager.prototype.sendShareMessage = function(arg){
	arg.contentType = YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.SHARE;
	this.sendMessage(arg);
};

/**
 * 发送文本消息[文本,表情]
 * @param arg {
 * to: id,  //对话人id
 * type: "groupchat/chat/pubaccount",  //chat:单聊，groupcgat:群聊,pubaccount:公众号
 * content:text, //消息文本
 * extend: string,  //扩展字段
 * success:function //成功回调函数
 * }
 */
YYIMManager.prototype.sendTextMessage = function(arg){
	arg.content = arg.msg  || arg.content;
	arg.contentType = YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.TEXT;
	this.sendMessage(arg);
};

/**
 * 发送消息接口整合
 * @param arg {
 * to: id,  //对话人id
 * type: "groupchat/chat/pubaccount",  //chat:单聊，groupcgat:群聊,pubaccount:公众号
 * extend: string,  //扩展字段
 * atuser: array,  //at 成员
 * data:
 * success:function //成功回调函数
 * },
 * contentType
 */
YYIMManager.prototype.sendMessage = function(arg){
	arg.id = arg.id || Math.uuid();
	arg.type = arg.type || YYIMChat.getConstants().CHAT_TYPE.CHAT;
	arg.body = {
		dateline: arg.dateline,
		extend: arg.extend,
		content: arg.content,
		contentType: arg.contentType,
		sceneParams: arg.sceneParams
	};

	if(arg.type === YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT
	&& YYIMArrayUtil.isArray(arg.atuser)){
		arg.body.atuser = arg.atuser;
	}

	Manager.sendMessage(arg);
};

/**
 * 撤销消息 rongqb 20160707
 * arg {
 * 	id: String, //消息id
 *  to: String, //消息的另一方,待定
 *  type: 'chat/groupchat/pubaccount',
 *  success: function,
 *  error: function,
 *  complete: function
 * }
 */
YYIMManager.prototype.revokeMessage = function(arg){
	if(arg && arg.id){
		Manager.revokeMessage(arg);
	}else{
		arg && arg.error && arg.error();
	}
};

/**
 * 发送图片消息
 * @param arg{
 * fileInputId：DomID, //文件域id
 * drop_element: [dropID], //拖拽上传元素id，或者数组
 * chatInfo: function(){ //用户发送消息时获取对话人信息
 * 	  return {
 * 		to: String //对话人id
 *      type: 'chat/groupchat/pubaccount',
 *      extend: 扩展字段
 * 	  };
 * },
 * fileFiltered: function, //文件被添加到上传队列
 * fileUploaded: function, //上传队列某一个文件上传完毕
 * beforeUpload: function, //文件上传之前触发
 * success:function,  //成功回调函数
 * error: function,
 * progress: function
 * }
 */
YYIMManager.prototype.sendPic = function(arg){
	arg = arg || {};
	if(YYIMUtil['isWhateType'](arg.chatInfo,'Function')){
		this.uploader(jQuery('#' + arg.fileInputId)[0] || arg.fileInputId,{
			drop_element: arg.drop_element,
			chatInfo: arg.chatInfo,
			fileFiltered: arg.fileFiltered,
			beforeUpload: arg.beforeUpload,
			mediaType: 1, //1:image ,2: file,3:doc
			success: function(result){
				Manager.sendMessage({
					id : result.chatInfo.messageId || Math.uuid(),
					spaceId: result.chatInfo.spaceId,
					body : {
						extend: result.chatInfo.extend,
						content : new IMFile({
							id: result.file.id,
							name: result.file.name,
							path: result.data && result.data.attachId,
							size: result.file.size,
							original: 1
						}),
						contentType : YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.IMAGE
					},
					to : result.chatInfo.to,
					type :result.chatInfo.type,
					success : function(data) {
						arg.success && arg.success(data);
					}
				});
				arg.fileUploaded && arg.fileUploaded(result);
			},
			error: arg.error,
			progress: arg.progress
		});
	}else{
		arg && arg.error && arg.error();
	}
};

/**
 * 发送文件消息
 * @param arg{
 * fileInputId：DomID, //文件域id
 * drop_element: [dropID], //拖拽上传元素id，或者数组
 * chatInfo: function(){ //用户发送消息时获取对话人信息
 * 	  return {
 * 		to: String //对话人id
 *      type: 'chat/groupchat/pubaccount',
 *      extend: 扩展字段
 * 	  };
 * },
 * fileFiltered: function, //文件被添加到上传队列
 * fileUploaded: function, //上传队列某一个文件上传完毕
 * beforeUpload: function, //文件上传之前触发
 * success:function, //成功回调函数
 * error: function,
 * progress: function
 * }
 */
YYIMManager.prototype.sendFile = function(arg){
	var that = this;
	arg = arg || {};
	if(YYIMUtil['isWhateType'](arg.chatInfo,'Function')){
		this.uploader(jQuery('#' + arg.fileInputId)[0] || arg.fileInputId,{
			drop_element: arg.drop_element,
			chatInfo: arg.chatInfo,
			fileFiltered: arg.fileFiltered,
			beforeUpload: arg.beforeUpload,
			mediaType: 3, //1:image ,2: file,3:doc
			success: function(result){
				var mediaType = 3;

				if(YYIMChat.getConfig().UPLOAD.IMAGE_TYPES.test(result.file.name)){
					mediaType = 1;
				}

				var file = new IMFile({
					id: result.file.id,
					name: result.file.name,
					path: result.data && result.data.attachId,
					size: result.file.size
				});

				if(mediaType === 1){
					file.build({
						original: 1
					});
				}

				if(result
				&& result['data']
				&& result['data']['data']
				&& result['data']['data']['fileUrl']){
					//esn pc 上传
					file.build({
						path: result['data']['data']['fileUrl'],
						fid: result['data']['data']['fid']
					});
				}

				if(YYIMUtil['isWhateType'](result['data'],'Array')){
					//esn web 上传
					file = new IMFile({
						id: result.file.id,
						name: result.file.name,
						path: result['data'][4],
						size: result.file.size,
						fid: result['data'][0]
					});
				}

				Manager.sendMessage({
					id : result.chatInfo.messageId || Math.uuid(),
					spaceId: result.chatInfo.spaceId,
					body : {
						extend: result.chatInfo.extend,
						content : file,
						contentType : (mediaType === 1)? that.getConstants().MESSAGE_CONTENT_TYPE.IMAGE :that.getConstants().MESSAGE_CONTENT_TYPE.FILE
					},
					to : result.chatInfo.to,
					type :result.chatInfo.type,
					success : function(data) {
						arg.success && arg.success(data);
					}
				});

				arg.fileUploaded && arg.fileUploaded(result);
			},
			error: arg.error,
			progress: arg.progress
		});
	}else{
		arg && arg.error && arg.error();
	}
};

 	return YYIMManager.getInstance();
})(YYIMChat);
