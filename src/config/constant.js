var CONNECT_STATUS = {
	INIT: 'init',
	OFFLINE: 'offline',
	CONNECTING: 'connecting',
	PROCESSING: 'processing',
	CONFLICT: 'conflict',
	CONNECTED: 'connected',
	ERROR: 'error',
	AUTHERROR: 'AuthError',
	ONCLIENTKICKOUT: 'onClientKickout',
	ONUPDATEPASSWORD: 'onUpdatePassword'
};

var FAVORITE_TYPE = {
	FAVORITE: 'favorite',
	REMOVE: 'remove',
	NONE: 'none'
};

var STATUS = {
	CHAT: 'chat', //该实体或资源活跃并想聊天
	AWAY: 'away', //该实体或资源临时离开
	XA: 'xa', //该实体或资源要离开相当长时间(xa = 'eXtended Away'，长时间离开)
	DND: 'dnd', //该实体或资源忙(dnd = 'Do Not Disturb'，免打扰)
	UNAVAILABLE: 'unavailable' // 隐身(自定义,RFC6121未定义)
};

var TYPE = {
	SET: 'set',
	RESULT: 'result',
	GET: 'get',
	SUBMIT: 'submit',
	UNAVAILABLE: 'unavailable'
};

var PRESENCE_TYPE = {
	SUBSCRIBE: 'subscribe',
	UNSUBSCRIBE: 'unsubscribe',
	SUBSCRIBED: 'subscribed',
	UNSUBSCRIBED: 'unsubscribed',
	PROBE: 'probe',
	UNAVAILABLE: 'unavailable',
	COLLECT: 'collect' //收藏好友
};

var COLLECT_TYPE = {
	ADD: 'add',
	REMOVE: 'remove'
};

var CHAT_TYPE = {
	CHAT: 'chat',
	GROUP_CHAT: 'groupchat',
	PUB_ACCOUNT: 'pubaccount'
};

//消息内容类型
var MESSAGE_CONTENT_TYPE = {
	TEXT: 2,
	FILE: 4,
	IMAGE: 8,
	REDPACKET: 9,
	SMALLVIDEO: 10,
	REVOCATION: 13,
	MERGEFORWARD: 15,
	SINGLEGRAPHIC: 16,
	MOREGRAPHIC: 32,
	AUDO: 64,
	LOCATION: 128,
	SHARE: 256,
	WHITEBOARD: 1024
};