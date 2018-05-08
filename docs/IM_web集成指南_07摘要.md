## 7.摘要（最近联系人／群组／公共号 ）

### 7.1.获取最近联系人
```js
/**
 * 获取最近联系人（群组、公众号）摘要列表
 * @param arg {
 * startDate: timestamp, //开始时间戳，不传默认为0
 * size: Number, //返回列表的最大长度，最大值为500，不传默认为50
 * success:function,
 * error:function
 * }
 */
YYIMChat.getRecentDigset({
	startDate: 1525247354,
	size: 100,
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	}
});
/**
 * 成功时返回字段：
 */
{
	personalVersion: 4773,
	ts: 1525761511308,
	list: [  //联系人列表
		contactReadedVersion: 0,
		jid: "",
		lastContactTime: 1525674343416,  //最后联系时间
		lastMessage: {},  //最后一条消息对象
		readedVersion: 14,  //消息的read版本号
		sessionVersion: 14,  //消息的session版本号
		state: exists
	],
	count: 22  //联系人数
}
```
	
### 7.2.删除摘要
```js
/**
 * 删除最近联系人摘要
 * @param arg {
 * id: String, //联系人id，必传
 * type: String, //聊天类型，不传默认为chat
 * success:function,
 * error:function
 */
YYIMChat.removeRecentDigest({
	id: 'abc',
	type: 'chat',
	success:function(data){
		console.log(data);
	},
	error:function(err){
		console.log(err);
	}
});
```