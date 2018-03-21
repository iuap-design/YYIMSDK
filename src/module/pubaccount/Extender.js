YYIMChat.setBackhander({
	'monitor': {
		'pubaccountMonitor': Manager.monitor
	},
	'initCallback': {
		'pubaccount': function(options){
			YYIMChat.onPubaccountUpdate = options.onPubaccountUpdate || function(){}; //公众号更新
		}
	}
});

/**
 * 获取广播号/订阅号列表[pubaccount]
 * @param arg {
 * success: function, //成功回调函数
 * error: function,  //失败回调函数
 * complete:function //无论成功失败都回调的函数
 * }
 */
YYIMManager.prototype.getPubAccount = function(arg){
	Manager.getPubAccountItems(arg);
};

/**
 * 获取公共号列表（按需拉取） rongqb 20160912
 * @param arg {
 *  pubIds: Array,
 * 	success: function, 
 *  error: function,
 *  complete: function
 * }
 */
YYIMManager.prototype.getPubAccounts = function(arg){
	if(YYIMUtil['isWhateType'](arg.pubIds,'Array')){
		Manager.getPubAccounts(arg);
	}else{
		arg && arg.error && arg.error();
	}
};

/**
 * 获取公众号详情 rongqb 20160811
 * arg {
 *   id: String,
 *   success: function,
 *   error: function,
 *   complete: function
 * }
 */
YYIMManager.prototype.getPubAccountInfo = function(arg){
	if(YYIMCommonUtil.isStringAndNotEmpty(arg.id)) {
		Manager.getPubAccountInfo(arg);
	}else{
		arg && arg.error && arg.error();
	}
};

/**
 * 关注公共账号 rongqb 20151207
 * @param arg {
 * 		id : 公共号id,
 * 		success : function,
 * 		error : function
 * }
 */
YYIMManager.prototype.addPubaccount = function(arg){
	if(YYIMCommonUtil.isStringAndNotEmpty(arg.id)) {
		Manager.addPubAccount({
			jid : YYIMChat.getJIDUtil().buildPubAccountJID(YYIMChat.getJIDUtil().getNode(arg.id)),
			success : arg.success,
			error : arg.error
		});
	}else{
		arg && arg.error && arg.error();
	}
};

/**
 * 取消关注公共账号  rongqb 20151207
 * @param arg {
 * 		id : 公共号id,
 * 		success : function,
 * 		error : function
 * }
 */
YYIMManager.prototype.removePubaccount = function(arg){
	if(YYIMCommonUtil.isStringAndNotEmpty(arg.id)) {
		Manager.removePubAccount({
			id : Math.uuid(),
			to : YYIMChat.getJIDUtil().buildPubAccountJID(YYIMChat.getJIDUtil().getNode(arg.id)),
			success : arg.success,
			error : arg.error
		});
	}else{
		arg && arg.error && arg.error();
	}
};

/**
 * 查找公共号
 * @param arg {keyword,start, size, success: function, error: function,complete: function}
 */
YYIMManager.prototype.queryPubaccount = function(arg){
	if(YYIMCommonUtil.isStringAndNotEmpty(arg.keyword)) {
		Manager.queryPubaccount(arg);
	}else{
		arg && arg.error && arg.error();
	}
};