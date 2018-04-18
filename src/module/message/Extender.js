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
