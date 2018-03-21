YYIMChat = (function(YYIMChat){
	var YYIMManager = YYIMChat.constructor;
	
var Manager = (function() {
	
	/**
	 * 发送代办回执 rongqb 20171114
	 * @param {Object} arg
	 */
	function sendToDoReceipts(arg) {
		jQuery.ajax({
			url: YYIMChat.getConfig().SERVLET.REST_TODO_USER + 'read/latest?token=' + YYIMChat.getToken() + '&userId='+ YYIMChat.getUserID(),
			type: 'post',
			data: JSON.stringify({
				latestReadTs: arg.latestReadTs || 0
			}),
			dataType: 'json',
			cache: false,
			processData:false,
			contentType: "application/json", //必须有
			success: function() {
				arg && arg.success && arg.success();
				arg && (arg = null);
			},
			error: function(xhr) {
				try {
					arg && arg.error && arg.error(JSON.parse(xhr.responseText));
					arg && (arg = null);
				} catch(e) {
					arg && arg.error && arg.error();
					arg && (arg = null);
				}
			}
		});
	}

	/**
	 * 拉取代办通知摘要 rongqb 20170831
	 * @param {Object} arg
	 */
	function getTodoDigset(arg) {
		jQuery.ajax({
			url: YYIMChat.getConfig().SERVLET.REST_TODO_USER + 'abstract',
			type: 'get',
			data: {
				token: YYIMChat.getToken(),
				userId: YYIMChat.getUserID()
			},
			dataType: 'json',
			cache: false,
			success: function(data) {
				var result;
				if(data 
				&& data.result 
				&& data.result['abstractItem']){
					
					result = data.result['abstractItem'] || {};
					result['todoCount'] = data.result['todoCount'] || 0;
					result['unReadCount'] = data.result['unReadCount'] || 0;
					result['latestReadTs'] = data.result['latestReadTs'] || 0;
				}
				arg && arg.success && arg.success(result);
				arg && (arg = null);
			},
			error: function(xhr) {
				try {
					arg && arg.error && arg.error(JSON.parse(xhr.responseText));
					arg && (arg = null);
				} catch(e) {
					arg && arg.error && arg.error();
					arg && (arg = null);
				}
			}
		});
	}

	/**
	 * 拉取代办通知历史 nizhja 20170831
	 * @param {Object} arg
	 */
	function getHistoryTodo(arg) {
		jQuery.ajax({
			url: YYIMChat.getConfig().SERVLET.REST_TODO_USER + 'items',
			type: 'get',
			data: {
				token: YYIMChat.getToken(),
				userId: YYIMChat.getUserID(),
				beforeTs: arg && Number(arg.beforeTs) || '',
				todoState: arg && arg.todoState || '',
				pageSize: arg && Number(arg.pageSize) || 10
			},
			dataType: 'json',
			cache: false,
			success: function(data) {
				var result = [];
				if(data 
					&& data.result
					&& data.result.length){
						
					result = data.result;
				}
				arg && arg.success && arg.success(result);
				arg && (arg = null);
			},
			error: function(xhr) {
				try {
					arg && arg.error && arg.error(JSON.parse(xhr.responseText));
					arg && (arg = null);
				} catch(e) {
					arg && arg.error && arg.error();
					arg && (arg = null);
				}
			}
		});
	}

	return {
		getTodoDigset: getTodoDigset,
		getHistoryTodo: getHistoryTodo,
		sendToDoReceipts: sendToDoReceipts
	};
})();

/**
 * 拉取代办通知摘要 rongqb 20170831
 * @param {Object} arg {
 * 	success: function,
 *  error: function
 * }
 */
YYIMManager.prototype.getTodoDigset = function(arg) {
    Manager.getTodoDigset(arg);
};

/**
 * 发送代办回执 rongqb 20171114
 * @param {Object} arg
 */
YYIMManager.prototype.sendToDoReceipts = function(arg) {
    Manager.sendToDoReceipts(arg);
};

/**
 * 拉取代办通知历史 nizhja 20170831
 * @param {Object} arg {
 *  success: function,
 *  error: function,
 *  beforeTs: Number, //历史结束时间，不填时取当前时间
 *  todoState: 0/1 //0: 未处理待办 1:已处理待办
 *  pageSize：Number //default: 10
 * }
 */
YYIMManager.prototype.getHistoryTodo = function(arg) {
	Manager.getHistoryTodo(arg);
};

 	return YYIMManager.getInstance();
})(YYIMChat);
