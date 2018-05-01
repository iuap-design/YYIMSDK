import { YYIMConfiguration } from '../config/config';
import { YYIMJIDUtil } from '../util/YYIMJIDUtil';
import { YYIMManager } from '../core/manager';
import { YYIMConnectDaemon } from './YYIMConnectDaemon';
import { YYIMConnectEventHandler } from './YYIMConnectEventHandler';

class YYIMConnection {
	constructor(){
		this.daemon = new YYIMConnectDaemon();
		this.eventHandler = new YYIMConnectEventHandler();
		this.connection = this.getConnection();
		this.connectArg;
		this.waitingList = [];
		this.sending = false;
		this.lastSendTime = 0;
	}
	getDaemon(){
		return this.daemon;
	}
	_init(){
		YYIMManager.getInstance().exeBackhander('monitor');
		this.eventHandler._init();
		this.registerHandler(OPCODE.AUTH.KEY, function(userBindPacket){
			// change to use opcode judge
			let jid = new JSJaCJID(userBindPacket.jid), id = YYIMJIDUtil.getID(userBindPacket.jid);
			
			YYIMManager.getInstance()._user = {
				jid: jid,
				name: id
			};
			YYIMManager.getInstance().onUserBind(id, jid.getResource());
		});
		//	rongqb 20170713
		//	this.registerHandler(OPCODE.PING.KEY, this.getDaemon().pong.bind(this.getDaemon()));
	}
	/**
	 * 注册连接的报文处理器
	 * @param {string} @See OPCODE.EVENT.KEY,
	 * @param {String} ns childName对应的子节点命名空间 [optional]
	 * @param {String} type 子节点类型，不限制设置为“*", [optional]
	 * @param {Function} handler 处理函数
	 */
	registerHandler(event, ns, type, handler){
		//	if(this.event != 'ping') return;
		if (this.connection) {
			this.connection.registerHandler.apply(this.connection, arguments);
			return;
		}
		throw "connection is undefined!";
	}
	/**
	 * 若已经和服务器建立连接 返回true, 否则返回false
	 * @return {boolean}
	 */
	connected(){
		if (this.connection && this.connection.connected()) {
			return true;
		}
		return false;
	}
	/**
	 * 根据浏览器支持的不同情况, 返回最合适的连接方式, 如果连接以存在则直接返回
	 * @returns {JSJaCConnection}
	 */
	getConnection(){
		if (!this.connection) {
			if (YYIMConfiguration.useWebSocket()) {
				this.connection = new JSJaCWebSocketConnection({
					httpbase : YYIMConfiguration.getWebSocketUrl()
				});
			} else {
				this.connection = new JSJaCHttpBindingConnection({
					httpbase : YYIMConfiguration.getHttpBindUrl(),
					timerval : YYIMConfiguration.CONNECTION.TIMERVAL,
					wait : YYIMConfiguration.CONNECTION.WAIT
				});
			}
		}
	
		return this.connection;
	}
	/**
	 * 请求连接服务器
	 */
	connect(options){
		options = options || {};
		if (!this.connectArg) {
			this.connectArg = YYIMConfiguration.getConnectionArgObj();
		}
		if (options.username) {
			this.connectArg.username = options.username;
		}
		if (options.token) {
			this.connectArg.password = options.token;
		}
		if(options.appType){
			this.connectArg.appType = options.appType;
		}
		if(options.identify){
			this.connectArg.clientIdentify = options.identify;
		}
		YYIMManager.getInstance()._user = {
			jid: new JSJaCJID(this.connectArg.username + '@' + YYIMConfiguration.YY_IM_DOMAIN + '/' + this.connectArg.resource),
			name: this.connectArg.username
		};
		this.connection.connect(this.connectArg);
	}
	/**
	 * 请求断开服务器
	 */
	disconnect(){
		this.daemon.stopPing(false);
		if (this.connection) {
			this.connection.disconnect();
		}
	}
	/**
	 * 发送报文到服务器
	 */
	send(packet, callback, data, callbackContext){
		this.waitingList.push({
			packet:	packet,
			callback: callback,
			data: data,
			callbackContext: callbackContext
		});
		if(!this.sending){
			this.sendInterval();	
		}
	}
	/**
	 * 递归延时发送预发送报文队列
	 */
	sendInterval(){
		if(this.waitingList.length){
			this.sending = true;
			let timespan = new Date().getTime() - this.lastSendTime;
			
			if(timespan >= YYIMConfiguration.SENDINTERVAL){
				let data = this.waitingList.shift();
				this.sendJumpPacket(data);
				
				if(data.packet && data.packet.opcode != OPCODE.PING.SEND){
					this.getDaemon().startPing();
				}
				
				if(data.packet && data.packet.opcode == OPCODE.PING.SEND){
					this.getDaemon().setTimeout();
				}
				
				this.lastSendTime = new Date().getTime();
				this.sendInterval();
			}else{
				setTimeout(() => {
					this.sendInterval();
				},YYIMConfiguration.SENDINTERVAL - timespan);
			}
		}else{
			this.sending = false;
		}
	}
	/**
	 * 发送报文到服务器
	 */
	sendJumpPacket(arg){
		if(arg){
			if(arg.callbackContext){
				return this.connection.sendJumpPacket(arg.packet, arg.callback.bind(arg.callbackContext), arg.data);
			}
			return this.connection.sendJumpPacket(arg.packet, arg.callback, arg.data);
		}
	}
}


YYIMConnection.getInstance = () => {
	if (!YYIMConnection._instance) {
		YYIMConnection._instance = new YYIMConnection();
		YYIMConnection._instance._init();
	}
	return YYIMConnection._instance;
};

export { YYIMConnection };
