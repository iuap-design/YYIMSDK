import { YYIMManager } from '../../core/manager';
import {
    getRecentDigset,
    removeRecentDigest

} from './Manager';

/**
 * 获取最近联系人（群组、公众号）摘要列表 rongqb 20160908
 * @param arg {
 * startDate: timestamp,
 * size: Number, //default: 50, max: 500
 * success:function,
 * error:function,
 * complete:function
 * }
 */
YYIMManager.prototype.getRecentDigset = function(arg) {
	arg.startDate = (YYIMUtil['isWhateType'](arg.startDate,'Number') &&  arg.startDate > 0) ? arg.startDate: 0;
	if(!(YYIMUtil['isWhateType'](arg.size,'Number') &&  arg.size > 0)){
		delete arg.size;		
	}
	getRecentDigset(arg);
};

/**
 * 删除摘要 rognqb 20170225
 * @param arg {
 * id: String,
 * type: String,
 * success:function,
 * error:function,
 * complete:function
 */
YYIMManager.prototype.removeRecentDigest = function(arg) {
	if(arg.id){
		removeRecentDigest(arg);
	}else{
		arg && arg.error && arg.error();	
	}	
};