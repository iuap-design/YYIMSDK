## 8.扩展功能

### 8.1.多端通话
```js
/**
 *  多方通话
 * @param arg {
 * 	caller: String //主叫号码，必传
 *  phones：Array //被叫号码列表，必须是号码数组，长度不能为0
 *  accountMmanaged:true, //账号托管为true时，不需要输入账号和密码，去im多租户后台管理账号
 *  account：//通话账号  accountMmanaged为true时 不传
 *  key：//通话秘钥  accountMmanaged为true时 不传
 *  success:function,
 *  error:function
 * }
 */
YYIMChat.getFileUrl({
	caller: '13588880000',
	phones: ['13588880001', '13588880002'],
	accountMmanaged: true,
	account: 'abc',
	key: 'abc',
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	}
});
```
### 8.2.获取时间校正结果
```js
/**
 * 获取时间校正结果
 * @param function(result){
 * 		result就是校正结果
 * }
 */
YYIMChat.getTimeCorrection(function(result){
	console.log(result);
});
```

### 8.3.获取缩略图列表
```js
/**
 * 获取缩略图列表
 * @param {Object} arg {
 * 	attachId: String, //附件id，必传
 *  success: function,
 *  error: function
 * }
 */
YYIMChat.getTransformFileList({
	attachId: 'abc',
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	}
});
```

### 8.4.获取附件地址
```js
/**
 * 获取附件地址
 * @param {Object} 
 * attachId: String, //附件id，必传
 * mediaType: Number //附件类型，1或者2，不传默认2
 */
YYIMChat.getFileUrl(attachId, mediaType);
```

### 8.5.设置IM具备AI能力
```js
/**
 * 设置IM具备AI能力
 * arg {
 *  intelligentable:true,  //是否开启智能，必传
 *  success:function,
 *  error:function
 * }
 */
YYIMChat.setAIAbility({
	intelligentable:true,
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	}
});
```

### 8.6.获取用户AI热词,用于前端过滤
```js
/**
 * 获取用户AI热词,用于前端过滤
 * arg {
 * success:function,
 * error:function
 * }
 */
YYIMChat.getAIWords({
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	}
});
```

### 8.7.获取用户AI热词,用于前端过滤
```js
/**
* 设置AI分析开关是否启用
* isAIAbility boolean //必传
*/
YYIMChat.openAIAbility(isAIAbility);
```

### 8.8.设置是否启用热词过滤
```js
/**
 * 设置是否启用热词过滤
 * isOpenFilter boolean  //必传
 */
YYIMChat.openFilterWords(isOpenFilter);
```

### 8.9.注入热词
```js
/**
 * 注入热词
 * intelligentWordsTime String //热词时间戳
 */
YYIMChat.setDictionaries(intelligentWordsTime);
```

### 8.10.判断消息是否传递给AI分析
```js
/**
 * 判断消息是否传递给AI分析
 * keyword String  //必传
 */
YYIMChat.intelligentAnalysis(keyword);
```

### 8.11.获取当前在线的设备
```js
/**
 * 获取当前在线的设备
 * arg {
 * success:function,
 * error:function
 * }
 */
YYIMChat.getMultiTerminals({
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	}
});
```

### 8.12.发送协同命令
```js
/**
 * 发送协同命令
 * arg {
 * data:{},
 * success:function,
 * error:function
 * }
 */
YYIMChat.sendMultiTerminalsCommand({
	data:{},
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	}
});
```