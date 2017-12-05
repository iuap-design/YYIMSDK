YYIMChat.setBackhander({
	'monitor': {
		'inputStateMonitor': Manager.monitor
	}
});

/**
 * 输入状态改变触发 rongqb 20161129
 * @param {Object} arg {
 * 	to: String,	
 *  contentType: String,
 *  success: function,
 *  error: function
 * }
 */
YYIMManager.prototype.inputStateChange = function(arg){
	if(arg && arg.to){
		arg.contentType = arg.contentType || YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.TEXT;
		Manager.inputStateChange(arg);
	}else{
		arg && arg.error && arg.error();
	}
};

