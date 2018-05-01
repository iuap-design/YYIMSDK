import { YYIMManager, YYIMChat } from '../../core/manager';
import {
    multiPartyCall,
    getTimeCorrection

} from './Manager';

/**
 * 多方通话 rongqb 20160104
 * @param arg {
 * 	caller: //主叫号码
 *  phones：//被叫号码
 *  accountMmanaged:true, //账号托管为true时，不需要输入账号密码，去im多租户后台管理账号
 *  account：//通话账号  accountMmanaged:true时 不传
 *  key：//通话秘钥  accountMmanaged:true时 不传
 *  success:function,
 *  error:function
 * }
 */
YYIMManager.prototype.multiPartyCall = function(arg){
	if(typeof arg === 'undefined' || typeof arg.caller === 'undefined' || !YYIMArrayUtil.isArray(arg.phones) || !arg.phones.length){
		arg.error && arg.error();
		return;
	}
	
	if(!YYIMRegExp.phone.test(arg.caller)){
		arg.error && arg.error();
		return;
	}
	
	var phones = [];
	for(var x in arg.phones){
		var phone = arg.phones[x].toString();
		if(YYIMRegExp.phone.test(phone)){
			if(phones.indexOf(phone) === -1){
				phones.push(phone);
				var tempCondition = phones.join(",");
				if(phones.length > YYIMChat.getConfig().MULTIPARTYCALL.PARTYMAXLENGTH || tempCondition.length > YYIMChat.getConfig().MULTIPARTYCALL.PHONESMAXLENGTH){
					phones.pop();
					break;
				}
			}
		}
	}
	
	if(!phones.length){
		arg.error && arg.error();
		return;
	}
	
	arg.caller = arg.caller.toString();
	arg.phones = phones;
	
	if(arg.accountMmanaged !== true){
		arg.phones = phones.join(',');
		arg.account = arg.account? arg.account:YYIMChat.getConfig().MULTIPARTYCALL.ACCOUNT;
		arg.key = arg.key? arg.key:YYIMChat.getConfig().MULTIPARTYCALL.KEY;
		
		if(typeof arg.account === 'undefined' || typeof arg.key === 'undefined'){
			arg.error && arg.error();
			return;
		}
	}
	
	multiPartyCall(arg);
}; 

YYIMManager.prototype.getTimeCorrection = function(callback) {
	getTimeCorrection(callback);
};

