## 2.初始化

### 2.1.依赖的类库

WEB版的sdk主要依赖一个轻量级Javascript的程序库jQuery,这里对jQuery 的版本没有特别的要求，不过最好是比较新的版本。

### 2.2.SDK的集成

在html页面引入jQuery类库和 用友有信的web_sdk。

例如：
    
    <script type="text/javascript" src="./jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="./YYIMSDK.js"></script>

### 2.3.初始化sdk
    YYIMChat.initSDK({
		app: String, //appId
		etp: String, //etpId
		wsurl: String, //websocket Url
		wsport: Number, //websocket port 5227/5222/5225
		hbport: Number, //httpbind  port 7075/7070
		servlet: String, //rest Url
		flash_swf_url: 'xxx/x/Moxie.swf', //flash 上传 swf文件位置
		logEnable: false, //client log
		clientMark: 'web' //client mark 'web' or 'pc'
	}); 

### 2.4.初始化回调方法			
	YYIMChat.init({
		onOpened: function() {
			// 登录成功
		},
		onExpiration: function(callback) {
			//自动更新token
			//callback(token, expiration);
		},
		onClosed: function(arg) {
			//连接关闭
		},
		onConflicted: function(arg) {
			//登陆冲突
		},
		onClientKickout: function(arg) {
			//被他端踢掉
		},
		onUpdatePassword: function(arg) {
			//更改密码，被踢掉
		},
		onAuthError: function(arg) {
			//登陆认证失败
		},
		onConnectError: function(arg) {
			//连接失败
		},
		onReceipts: function(arg) {
			//消息回执
		},
		onSubscribe: function(arg) {
			//发生订阅
		},
		onRosterFavorited: function(arg) {
			//被收藏
		},
		onRosterUpdateded: function(arg) {
			//好友信息更改
		},
		onMessage: function(arg) {
			//收到消息
		},
		onGroupUpdate: function(arg) {
			//群组更新
		},
		onKickedOutGroup: function(arg) {
			//群成员被群主提出
		},
		onTransferGroupOwner: function(arg){
			//群主转让
		},
		onPresence: function(arg) {
			//好友presence改变
		},
		onRosterDeleted: function(arg) {
			//好友被删除
		},
		onPubaccountUpdate: function(pubaccounts) {
			//公共号信息更新
		},
		onTransparentMessage: function(arg) {
			//透传业务消息
		}
	});


    


