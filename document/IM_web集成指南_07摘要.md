## 7.摘要（最近联系人／群组／公共号 ）

### 7.1.获取最近联系人
    
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
	YYIMChat.getRecentDigset(arg);
	
### 7.2.删除摘要
	
	/**
	 * 删除摘要 rognqb 20170225
	 * @param arg {
	 * id: String,
	 * type: String,
	 * success:function,
	 * error:function,
	 * complete:function
	 */
	YYIMChat.removeRecentDigset(arg);