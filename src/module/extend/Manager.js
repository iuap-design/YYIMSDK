import { YYIMManager, YYIMChat } from '../../core/manager';
	
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
	function multiPartyCall(arg){
		
		if(arg.accountMmanaged === true){
			/**
			 * 账号托管模式
			 */
			var data = {
					etpId: YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY,
					appId: YYIMChat.getConfig().MULTI_TENANCY.APP_KEY,
					caller: arg.caller, //主叫号码
					phones: arg.phones, //被叫号码
					username: YYIMManager.getInstance().getUserNode() //发起会议的id
			};
			
			jQuery.ajax({
				url: YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + 'voip/make?token=' + YYIMManager.getInstance().getToken(),
				type: 'post',
				data: JSON.stringify(data),
				dataType: 'json',
				cache: false,
				processData:false,
				contentType: "application/json", //必须有
				headers:{
//					"Content-Type":"application/json"
				},
				success: arg.success,
				error: function(xhr){
					try{
						arg.error && arg.error(JSON.parse(xhr.responseText));
						arg = null;
					}catch(e){
						arg.error && arg.error();
						arg = null;
					}
				}
			});
			
		}else{
			/**
			 * 直接调用 嘟嘟接口 需要上传 账户和密码
			 */
			var timestamp = new Date().getTime();
			var data = {
					caller: arg.caller, //主叫号码
					phones: arg.phones, //被叫号码
					account_identify: arg.account, //账号id
					userId: YYIMManager.getInstance().getUserBareJID(), //发起会议的id
					timestamp: timestamp,
					sign: hex_sha1(arg.account + arg.key + timestamp)
			};
			
			jQuery.ajax({
				url: YYIMChat.getConfig().MULTIPARTYCALL.ADDRESS,
				type: 'get',
				data: data,
				dataType: 'jsonp',
				cache: false,
				jsonp:'callback',
				success: arg.success,
				error: function(xhr){
					try{
						arg.error && arg.error(JSON.parse(xhr.responseText));
						arg = null;
					}catch(e){
						arg.error && arg.error();
						arg = null;
					}
				}
			});
		}
	}
	
	function getServerCorrection(arg){
		var start,end = 0;
		jQuery.ajax({
			url: YYIMChat.getConfig().SERVLET.REST_SYSTEM_SERVLET + 'time',
			type: 'get',
			cache: false,
			beforeSend: function(){
				start = new Date().getTime();
			},
			success: function(serverTime){
				end = new Date().getTime();
				arg && arg.success && arg.success(serverTime - (start + end)/2,end - start);
				arg = null;
			},
			error: function(xhr){
				try{
					arg.error && arg.error(JSON.parse(xhr.responseText));
					arg = null;
				}catch(e){
					arg.error && arg.error();
					arg = null;
				}
			}
		});
	}
	 /**
	 * 获取时间校正结果
	 */
	var corrections = [];
	function getTimeCorrection(callback){
		if(YYIMChat.getConfig().TIMECORRECTION.LOAD){
			callback && callback(YYIMChat.getConfig().TIMECORRECTION.RESULT);
		}else{
			getServerCorrection({
				success: function(correct,intervcal){
					if(intervcal < YYIMChat.getConfig().TIMECORRECTION.RESIDUAL){
						YYIMChat.getConfig().TIMECORRECTION.LOAD = true;
						YYIMChat.getConfig().TIMECORRECTION.RESULT = Math.round(correct);
						return callback && callback(YYIMChat.getConfig().TIMECORRECTION.RESULT);;
					}else{
						corrections.push(correct);
						
						if(corrections.length < YYIMChat.getConfig().TIMECORRECTION.TIMES){
							getTimeCorrection(callback);
						}else{
							var sum = 0;
							for(var x in corrections){
								if(YYIMUtil['isWhateType'](corrections[x],'Number')){
									sum += corrections[x];
								}
							}
							corrections.length = 0;
							YYIMChat.getConfig().TIMECORRECTION.LOAD = true;
							YYIMChat.getConfig().TIMECORRECTION.RESULT = Math.round(sum/YYIMChat.getConfig().TIMECORRECTION.TIMES);
							callback && callback(YYIMChat.getConfig().TIMECORRECTION.RESULT);
						}
					}
				}
			});
		}
	}
	
	export {
		multiPartyCall,
		getTimeCorrection
	};