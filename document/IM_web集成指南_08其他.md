## 8.扩展功能

### 8.1.多端通话

	/**
	 * 多方通话 
	 * @param arg {
	 * 	caller: ,//主叫号码
	 *  phones：,//被叫号码
	 *  accountMmanaged:true, //账号托管，需要到im多租户后台授权
	 *  account：,//通话账号 accountMmanaged:true时 不传
	 *  key：,//通话秘钥  accountMmanaged:true时 不传
	 *  success:function,
	 *  error:function
	 * }
	 */
	YYIMChat.multiPartyCall(arg);