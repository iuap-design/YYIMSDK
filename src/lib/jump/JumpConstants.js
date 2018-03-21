/**
 * 包头大小
 */
var PACKET_HEADER_SIZE = 13;

/**
 * 由opcode得到包的key
 */
var OPCODE_MAP = {
	RECV : new BaseList(),
	SEND : new BaseList()
};

/**
 * [start, end)
 */
function _Range(start, end) {
	this.START = start;
	this.END = end;
	this.SIZE = end - start;
}

/**
 * 操作码, 每新增一个同时会向OPCODE_MAP中更新
 */
function _Opcode(key, send, recv) {
	this.KEY = key;
	this.SEND = send;
	this.RECV = !!recv? recv : send;
	OPCODE_MAP.SEND.set(this.SEND, this.KEY);
	OPCODE_MAP.RECV.set(this.RECV, this.KEY);
}

/**
 * 操作码
 */
var OPCODE = {
	/**
	 * 认证
	 * @type {_Opcode}
	 */
	AUTH : new _Opcode('auth', 0x0001),
	/**
	 * @type {_Opcode}
	 */
	PING : new _Opcode('ping', 0x0002),
	
	/**
	 * 断开连接 Stream end rongqb 20151208
	 */
	STREAMEND : new _Opcode('streamend', 0x0004),
	
	/**
	 * 发送&接收消息回执
	 * @type {_Opcode}
	 */
	RECEIPTS : new _Opcode('receipts', 0x1002),
	
	/**
	 * 发送&接收好友消息
	 * @type {_Opcode}
	 */
	USER_MESSAGE : new _Opcode('userMessage', 0x1010),
	
	/**
	 * 发送接收 输入状态
	 * @type {_Opcode}
	 */
	INPUT_STATE : new _Opcode('inputState', 0x1015),

	/**
	 * 发送&接收群组消息
	 * @type {_Opcode}
	 */
	CHATGROUP_MESSAGE : new _Opcode('chatGroupMessage', 0x1030),
	
	/**
	 * 发送&接收公共号消息
	 * @type {_Opcode}
	 */
	PUBACCOUNT_MESSAGE : new _Opcode('pubaccountMessage', 0x1050),
	
	/**
	 * 各端同步消息 rongqb 20151123
	 * @type {_Opcode}
	 */
	SYNC_MESSAGE : new _Opcode('syncMessage', 0x1070),
	
	/**
	 * 发送&接收回执
	 * @type {_Opcode}
	 */
	RECEIPTS : new _Opcode('receipts', 0x1002),
	
	/**
	 * 接收新消息通知
	 * @type {_Opcode}
	 */
	NOTIFY_MESSAGE : new _Opcode('notifyMessage', 0x1003),
	
	/**
	 * 透传消息
	 * @type {_Opcode}
	 */
	MUCONLINEDELIVERPACKET : new _Opcode('MucOnlineDeliverPacket', 0x1110),
	
	/**
	 * 透传消息
	 * @type {_Opcode}
	 */
	PUBONLINEDELIVERPACKET : new _Opcode('PubOnlineDeliverPacket', 0x1130),	
	
	/**
	 * 透传消息
	 * @type {_Opcode}
	 */
	USERONLINEDELIVERPACKET : new _Opcode('UserOnlineDeliverPacket', 0x1150),
	
	/**
	 * 透传消息 多端同步通知packet(增量)
	 * @type {_Opcode}
	 */
	REMINDSETTINGONLINEDELIVERPACKET : new _Opcode('RemindSettingOnlineDeliverPacket', 0x1160),
	
	/**
	 * 邀请用户加入群组
	 * @type {_Opcode}
	 */
	INVITE_USERS : new _Opcode('inviteUsers', 0x1301),
	
	/**
	 * 请求&返回VCard
	 * @type {_Opcode}
	 */
	VCARD : new _Opcode('vcard', 0x2011),
	
	/**
	 * 请求&返回所有好友的VCard
	 * @type {_Opcode}
	 */
	VCARDS : new _Opcode("vcards", 0x2011, 0x2012),
	
	/**
	 * IQ请求的结果报文
	 * @type {_Opcode}
	 */
	IQ_RESULT : new _Opcode('iqResult', 0x2021),
	
	/**
	 * 搜索用户&搜索结果
	 * @type {_Opcode}
	 */
	QUERY_USER : new _Opcode('queryUser', 0x2110, 0x2111),
	
	/**
	 * 搜索群组&搜索结果
	 * @type {_Opcode}
	 */
	QUERY_CHATGROUP : new _Opcode('queryChatGroup', 0x2130, 0x2131),

	/**
	 * 搜索公共号&搜索结果
	 * @type {_Opcode}
	 */
	QUERY_PUBACCOUNT : new _Opcode('queryPubaccount', 0x2150, 0x2151),
	
	/**
	 * 请求&返回好友列表
	 * @type {_Opcode}
	 */
	ROSTER_LIST : new _Opcode('rosterList', 0x2220, 0x2221),
	
	/**
	 * 请求&返回群组列表
	 * @type {_Opcode}
	 */
	CHATGROUP_LIST : new _Opcode('chatGroupList', 0x2230, 0x2231),
	
	/**
	 * 请求&返回群成员列表
	 * @type {_Opcode}
	 */
	CHATGROUP_MEMBER_LIST : new _Opcode('chatGroupMemberList', 0x2240, 0x2241),
	
	/**
	 * 请求&返回公共号列表
	 * @type {_Opcode}
	 */
	PUBACCOUNT_LIST : new _Opcode('pubaccountList', 0x2250, 0x2251),
	
	/**
	 * 请求&返回群组信息
	 * @type {_Opcode}
	 */
	CHATGROUP_INFO : new _Opcode('chatGroupInfo', 0x2330, 0x2331),
	
	CHATGROUP_SHARED_FILES : new _Opcode('chatGroupSharedFiles', 0x2332, 0x2333),
	
	/**
	 * 更新好友&更新结果
	 * @type {_Opcode}
	 */
	UPDATE_ROSTER : new _Opcode('updateRoster', 0x2520),
	
	/**
	 * 修改群组配置&修改结果
	 * @type {_Opcode}
	 */
	CONFIG_CHATGROUP : new _Opcode('chatGroupConfig', 0x2530, 0x2531),
	
	/**
	 * 创建群组&创建结果 rongqb 20151117
	 */
	CREATE_GROUP : new _Opcode('createGroup', 0x2532 ,0x2334),
	
	/**
	 * 房间成员邀请人入群&邀请结果 rongqb 20151118
	 */
	INVITE_GROUP_MEMBER : new _Opcode('inviteGroupMember', 0x2533 ,0x2334),
	
	/**
	 * 群成员更改配置信息&返回结果 rongqb 20151119
	 */
	MODIFY_GROUP_INFO : new _Opcode('modifyGroupInfo', 0x2534 ,0x2334),
	
	/**
	 * 群主踢人&返回结果 rongqb 20151119
	 */
	KICK_GROUP_MEMBER : new _Opcode('kickGroupMember', 0x2535 ,0x2334),
	
	/**
	 * 群主解散群 rongqb 20160106
	 */
	DISMISS_GROUP : new _Opcode('dismissgtoup', 0x2538, 0x2335),
	
	/**
	 * 群主更新 rongqb 20160106
	 */
	ON_GROUP_TRANSFER :  new _Opcode('groupOwnerTransfer', 0x2336),
	
	/**
	 * 群主转让 rongqb 20160106
	 */
	TRANSFER_GROUP : new _Opcode('transferGroup', 0x2539),
	
	/**
	 * 群成员退出群&返回结果 rongqb 20151119
	 */
	EXIT_GROUP : new _Opcode('exitGroup', 0x2536 ,0x2335),
	
	/**
	 * 群信息更新 rongqb 20151119
	 */
	ON_GROUP_UPDATE :  new _Opcode('groupUpdate',0x2334),
	
	/**
	 * 被群踢出&群组解散 rongqb 20151119
	 */
	KICKED_GROUP : new _Opcode('kickedByGroup', 0x2335),
	
	/**
	 * 收藏&取消收藏 联系人
	 */
	FAVORITED_ROSTERT : new _Opcode('favoritedRoster', 0x2521),
	
	/**
	 * 收藏群组 rongqb 20151201
	 */
	COLLECT_GROUP : new _Opcode('collectGroup', 0x2537),
	
	/**
	 * 全量同步好友列表
	 * @type {_Opcode}
	 */
	FULL_SYNC_ROSTER : new _Opcode('fullSyncRoster', 0x2720),
	
	/**
	 * 增量同步好友列表
	 * @type {_Opcode}
	 */
	DELTA_SYNC_ROSTER : new _Opcode('deltaSyncRoster', 0x2722),
	
	/**
	 * 全量同步群组列表
	 * @type {_Opcode}
	 */
	FULL_SYNC_CHATGROUP : new _Opcode('fullSyncChatGroup', 0x2730),
	
	/**
	 * 增量同步群组列表
	 * @type {_Opcode}
	 */
	DELTA_SYNC_CHATGROUP : new _Opcode('deltaSyncChatGroup', 0x2732),
	
	/**
	 * [二合一]出席信息&订阅
	 * @type {_Opcode}
	 */
	PRESENCE : new _Opcode("presence", 0x3001),
	
	/**
	 * 加入群组&退出群租&创建群组第一步
	 * @type {_Opcode}
	 */
	CHATGROUP : new _Opcode("chatGroup", 0x3301, 0x3302),
	
	/**
	 * 群主删除群成员
	 * @type {_Opcode}
	 */
	DEL_GROUPMEMBER : new _Opcode('delGroupMember', 0x2640),
	
	/**
	 * 创建/结束/重命名白板 & 结果
	 * @type {_Opcode}
	 */
	OPERATE_WHITEBOARD : new _Opcode('operateWhiteBoard', 0x2801),
	
	/**
	 *  监听白板
	 * @type {_Opcode}
	 */
	LISTEN_WHITEBOARD : new _Opcode('listenWhiteBoard', 0x2801,	0x2802),
	
	/**
	 *  更新白板 & 结果
	 * @type {_Opcode}
	 */
	UPDATE_WHITEBOARD : new _Opcode('updateWhiteBoard', 0x2805),
	
	/**
	 * packet error
	 * @type {_Opcode}
	 */
	PACKET_ERROR : new _Opcode('packetError', 0x4000),

	/**
	 * stream error
	 * @type {_Opcode}
	 */
	STREAM_ERROR : new _Opcode('streamError', 0x4100),
	
	/**
	 * 消息包的范围
	 * @type {_Range}
	 */
	MESSAGE_RANGE : new _Range(0x1000, 0x2000),
	
	/**
	 * 发起网络会议
	 * @type {_Opcode}
	 */
	CREATE_NETMETTING : new _Opcode('createNetMetting', 0x2880),
	
	/**
	 * 网络会议返回结果
	 * @type {_Opcode}
	 */
	NETMEETING_NOTIFY : new _Opcode('NETMeetingNotify', 0x2881),
	
	/**
	 * 会议管理报文
	 * @type {_Opcode}
	 */
	NETMEETING_MANAGE : new _Opcode('NETMeetingManage', 0x2882),
	
	/**
	 * 会议计费报文
	 * @type {_Opcode}
	 */
	NETMEETING_BILL : new _Opcode('NETMeetingBill', 0x2884),
	
	/**
	 * IQ包的范围
	 * @type {_Range}
	 */
	IQ_RANGE : new _Range(0x2000, 0x3000),
	
	/**
	 * Presence包的范围
	 * @type {_Range}
	 */
	PRESENCE_RANGE : new _Range(0x3000, 0x4000)
};

/**
 * 客服板块
 */
var SERVICE_OPCODE = {
	/**
	 * 客服 消息
	 * @type {_Opcode}
	 */
	SERVICE_USER_MESSAGE : new _Opcode('ServiceUserMessage', 0x1801),
	
	/**
	 * 客服 消息回执
	 * @type {_Opcode}
	 */
	SERVICE_RECEIPTS : new _Opcode('ServiceReceipts', 0x1802)
};

YYIMUtil.extend(OPCODE,SERVICE_OPCODE);

/**
 * 包结构: 每个片段所在位置
 */
var PACKET_STRUCT = {
	/**
	 * 控制帧
	 */
	CONSOLE_FRAME : new _Range(0, 1),
	
	/**
	 * 操作码 {@see OPCODE}
	 */
	OPCODE : new _Range(1, 3),
	
	/**
	 * 包的长度
	 */
	PACKET_LEN : new _Range(3, 7),
	
	/**
	 * 版本
	 */
	VERSION : new _Range(7, 9),
	
	/**
	 * 序列号
	 */
	SEQ_ID : new _Range(9, 13)
};
