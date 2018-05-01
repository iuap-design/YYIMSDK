import { YYIMManager, YYIMChat } from '../../core/manager';
import {
    monitor,
    addPubAccount,
    getPubAccounts,
    getPubAccountItems,
    getPubAccountInfo,
    removePubAccount,
    queryPubaccount
} from './Manager';

YYIMChat.setBackhander({
	'monitor': {
		'pubaccountMonitor': monitor
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
YYIMManager.prototype.getPubAccount = function(arg) {
    getPubAccountItems(arg);
};

/**
 * 获取公共号列表（按需拉取） rongqb 20160912
 * @param arg {
 *  ids: Array,
 * 	success: function, 
 *  error: function,
 *  complete: function
 * }
 */
YYIMManager.prototype.getPubAccounts = function(arg) {
    if (YYIMUtil['isWhateType'](arg.ids, 'Array')) {
        getPubAccounts(arg);
    } else {
        arg && arg.error && arg.error();
    }
};


/**
 *  批量拉取pubaccount info
 */
var batchInfosList = new BaseList();
var batchInfosTimer;
var getBatchInfos = function() {
    var handler = batchInfosList;
    batchInfosList = new BaseList();
    getPubAccounts({
        ids: handler.keys(),
        success: function(list, data) {
            handler.forEach(function(item, index) {
                try {
                    item && item.success && item.success(data[item.id]);
                } catch (e) {
                    //TODO handle the exception
                    YYIMChat.log('SuccessHandleBatchPubaccountInfoError.', 0, e);
                }
            });
            handler.clear();
            handler = null;
        },
        error: function(err) {
            handler.forEach(function(item, index) {
                try {
                    item && item.error && item.error(err);
                } catch (e) {
                    //TODO handle the exception
                    YYIMChat.log('ErrorHandleBatchPubaccountInfoError.', 0, e);
                }
            });
            handler.clear();
            handler = null;
        }
    });
}

YYIMManager.prototype.getBatchPubInfos = function(arg) {
    if (arg && arg.id && !batchInfosList.get(arg.id)) {
        batchInfosList.set(arg.id, arg);
        clearTimeout(batchInfosTimer);
        if (batchInfosList.length() >= this.getConfig().BETCH_MAXLIMIT.PUBACCOUNT) {
            getBatchInfos();
        } else {
            batchInfosTimer = setTimeout(function() {
                getBatchInfos();
            }, 200);
        }
    } else {
        arg.error && arg.error();
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
		getPubAccountInfo(arg);
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
		addPubAccount({
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
		removePubAccount({
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
		queryPubaccount(arg);
	}else{
		arg && arg.error && arg.error();
	}
};