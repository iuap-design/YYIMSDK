## 3.消息

### 3.1.发送消息

#### 3.1.1.发送文本（表情）消息

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
	YYIMChat.sendTextMessage(arg); 

#### 3.1.2.发送图片消息
    
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
	YYIMChat.sendPic(arg);

#### 3.1.3.发送文件消息
    
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
	YYIMChat.sendFile(arg);

#### 3.1.4.发送分享消息
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
	YYIMChat.sendShareMessage(arg);

#### 3.1.5.发送已读回执
    
	/**
	 * 发送已读回执
	 *  @param arg {
	 *   to: String,	//回执的对象
	 *   type: String, 	//type
	 * 	 id: String, 	//报文id
	 *   sessionVersion: String
	 * }
	 */
	YYIMChat.sendReadedReceiptsPacket(arg);


### 3.2.接收在线消息

初始化sdk时，通过注册回调函数方式处理在线消息的处理，例如：

	YYIMChat.init({
				//...，
				onMessage : function, // 接收到消息
				//...
			});

### 3.3.拉去历史（离线）消息
    
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
	YYIMChat.getHistoryMessage(arg);
	
### 3.4.消息撤回
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
	 YYIMChat.revokeMessage(arg);
