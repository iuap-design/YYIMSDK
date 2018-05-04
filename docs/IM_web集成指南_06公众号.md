## 6.公众号

### 6.1.获取我关注订阅号&广播号列表
```js
/**
* 获取广播号/订阅号列表[pubaccount]
* @param arg {
* success: function, //成功回调函数
* error: function,  //失败回调函数
* complete:function //无论成功失败都回调的函数
* }
*/
YYIMChat.getPubAccount({
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	},
	complete: function(){}
});
```

### 6.2.查找订阅号&广播号
```js
/**
* 查找广播号/订阅号
* @param arg {
* keyword: String, //关键词，必填
* start: Numert,  //开始时间戳，默认0
* size: Number,  //拉取成员长度，默认20
* success: function, //成功回调函数
* error: function,  //失败回调函数
* complete:function //无论成功失败都回调的函数
* }
*/
YYIMChat.queryPubaccount({
	keyword: '',
	start: 0,
	size: 10,
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	},
	complete: function(){}
});
```
	
### 6.3.关注订阅号
```js
/**
 * 关注订阅号
 * @param arg {
 * id : String, //公共号id，必填
 * success : function,
 * error : function
 * }
 */
YYIMChat.addPubaccount({
	id: 'id',
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	}
});
```

### 6.4.取消关注订阅号
```js
/**
 * 取消关注订阅号
 * @param arg {
 * id : String, //公共号id，必填
 * success : function,
 * error : function
 * }
 */
YYIMChat.removePubaccount({
	id: 'id',
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	}
});
```
	
### 6.5.获取公众号详情
```js
/**
 * 获取公众号详情
 * @param arg {
 * id : String, //公共号id，必填
 * success : function,
 * error : function
 * }
 */
YYIMChat.getPubAccountInfo({
	id: 'id',
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	}
});
```