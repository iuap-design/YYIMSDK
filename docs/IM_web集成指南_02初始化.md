## 2.初始化

### 2.1.依赖的类库

WEB版的sdk主要依赖一个轻量级Javascript的程序库jQuery,这里对jQuery 的版本没有特别的要求，不过最好是比较新的版本。

### 2.2.SDK的集成

在html页面引入jQuery类库和 用友有信的web_sdk。

例如：
    
    <script type="text/javascript" src="./jquery-3.2.1.min.js"></script>
    <script type="text/javascript" src="./YYIMSDK.min.js"></script>

引入YYIMSDK后全局会有一个YYIMChat对象，一切操作都基于此对象来做。

### 2.3.初始化sdk
    YYIMChat.initSDK({
		app: String, //appId(应用id)
		etp: String, //etpId(企业id)
		wsurl: String, //websocket Url(长链接地址)
		wsport: Number, //websocket port 5227/5222/5225(长链接端口)
		hbport: Number, //httpbind  port 7075/7070(短链接端口)
		servlet: String, //rest Url(短链接地址)
		flash_swf_url: 'xxx/x/Moxie.swf', //flash方式上传，用于兼容低版本上传功能， 这里填swf文件位置
		logEnable: false, //client log
		clientMark: 'web' //client mark 'web' or 'pc',
		apiKey: String  //AI KEY
	}); 

YYIMChat.initSDK(options)的主要作用是重置全局配置。

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

YYIMChat.init(options)的作用是注册通讯回调逻辑。

### 2.5.SDK登陆			
	YYIMChat.login({
		"username": String, //用户名
		"token": String,    //用户token
		"expiration": String,  //过期时间
		"appType": Number,   //应用类型
		"identify": String   //认证信息
	});

YYIMChat.login(options)的作用是根据配置完成websocket连接。以上参数由应用登陆接口获得。

完成以上三个初始化API后就能正常调用其他API了。

