var Manager = (function() {
	/**
	 * 查询自己所关注的公共号
	 * @param arg {success: function, error: function, complete:function}
	 */
	function getPubAccountItems(arg) {
		var jumpPacket = new JumpPacket({
			type: YYIMChat.getConstants().TYPE.GET,
			ns: NS_PUBACCOUNT,
			to: YYIMChat.getConfig().DOMAIN.PUBACCOUNT
		}, OPCODE.PUBACCOUNT_LIST.SEND);

		YYIMChat.getConnection().send(jumpPacket, function(pubaccountListResult, _arg) {
			if(!_arg) return;

			_arg.complete && _arg.complete();
			var items = pubaccountListResult.items || [];
			var i = items.length || 0;
			while(i--) {
				items[i].id = YYIMChat.getJIDUtil().getID(items[i].jid);
			}
			_arg.success && _arg.success(JSON.stringify(items));
		}, arg);
	}
	
	/**
	 * 获取公共号列表（按需拉取） rongqb 20160912
	 */
	function getPubAccounts(arg){
		 jQuery.ajax({
			url: YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/pubaccount/' + YYIMChat.getUserID() + '/items',
			dataType: 'json',
			data: {
				token: YYIMChat.getToken(),
				pubIds: JSON.stringify(arg.pubIds)
			},
			cache: false,
			success: function(result) {
				result = result || [];
				var i = result.length || 0;
				while(i--) {
					result[i].id = YYIMChat.getJIDUtil().getID(result[i].jid);
				}
				arg.success && arg.success(result);
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
	 * 获取公众号详情 rongqb 20160811
	 * arg {
	 *   id: String,
	 *   success: function,
	 *   error: function,
	 *   complete: function
	 * }
	 */
	function getPubAccountInfo(arg) {
		jQuery.ajax({
			url: YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + arg.id + '/' + YYIMChat.getUserID() + '/pubaccount/info',
			dataType: 'json',
			data: {
				token: YYIMChat.getToken()
			},
			cache: false,
			success: function(result) {
				if(result && result.data) {
					result.data.id = YYIMChat.getJIDUtil().getID(result.data.jid);
					arg.success && arg.success(result.data);
					arg = null;
				}
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
	 * 查找公共号
	 * @param arg {keyword, start, size, success: function, error: function,complete: function}
	 */
	function queryPubaccount(arg) {
		var iqBody = {
			start: YYIMCommonUtil.isNumber(arg.start) ? arg.start : 0,
			size: YYIMCommonUtil.isNumber(arg.size) ? arg.size : 20,
			fields: ["Accountname", "Name"],
			search: arg.keyword
		};
		YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.QUERY_PUBACCOUNT.SEND), function(queryResult, _arg) {
			var items = queryResult.items || [],
				result = [],
				i = items.length;
			while(i--) {
				var item = items[i],
					jid = item.jid;
				result.push({
					id: YYIMChat.getJIDUtil().getID(jid),
					name: YYIMCommonUtil.isStringAndNotEmpty(item.name) ? item.name : YYIMChat.getJIDUtil().getID(jid),
					type: item.type
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
	 * 关注公共号，只能根据返回的subscribed来判断是否关注成功，返回的iq set both需忽略
	 * @param arg{jid , success, error}
	 */
	function addPubAccount(arg) {
		YYIMChat.getConnection().send(new JumpPacket({
			type : YYIMChat.getConstants().PRESENCE_TYPE.SUBSCRIBE,
			to : arg.jid
		}, OPCODE.PRESENCE.SEND), function(addResult, _arg){
			_arg.complete && _arg.complete();
			addResult.from = YYIMChat.getJIDUtil().getID(addResult.from);
			addResult.to = YYIMChat.getJIDUtil().getID(addResult.to);
			_arg.success && _arg.success(addResult);
		}, arg);
	}
	
	/**
	 * 消息关注公共号 rongqb 20151207
	 * @param arg{to , success, error}
	 */
	function removePubAccount(arg) {
		YYIMChat.getConnection().send(new JumpPacket({
			id : arg.id,
			type : YYIMChat.getConstants().PRESENCE_TYPE.UNSUBSCRIBE,
			to : arg.to
		}, OPCODE.PRESENCE.SEND), function(addResult, _arg){
			_arg.complete && _arg.complete();
			addResult.from = YYIMChat.getJIDUtil().getID(addResult.from);
			addResult.to = YYIMChat.getJIDUtil().getID(addResult.to) || YYIMChat.getUserID();
			_arg.success && _arg.success(addResult);
		}, arg);
	}
	
	function monitor() {
		
		/**
		 * 监控新建公众号 rongqb 20151208
		 */
		YYIMChat.getConnection().registerHandler(OPCODE.PUBACCOUNT_LIST.KEY, function(packet){
			var items = packet.items;
			if((items && items.length || 0) === 0)
				return;
			var pubaccounts = [], i = items.length;
			while(i--) {
				var item = items[i];
				item.id =  YYIMChat.getJIDUtil().getID(item.jid),
				pubaccounts.push(item);
			}
			YYIMChat.onPubaccountUpdate(pubaccounts);		
		});
	}
	
	return {
		monitor : monitor,
		addPubAccount : addPubAccount,
		getPubAccounts: getPubAccounts,
		getPubAccountItems: getPubAccountItems,
		getPubAccountInfo: getPubAccountInfo,
		removePubAccount : removePubAccount,
		queryPubaccount: queryPubaccount
	};
})();