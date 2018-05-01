import { YYIMManager } from '../core/manager';
import { YYIMConnection } from './YYIMConnection';

class YYIMConnectEventHandler {
	constructor(){
		this._inited = false;
	}
	_init(){
		YYIMManager.getInstance().log("YYIMConnectEventHandler.prototype.registerHandler", 3);
		if(this._inited){
			return;
		}
		const conn = YYIMConnection.getInstance();
		conn.registerHandler('onConnect', this.onConnected);
		conn.registerHandler('onError', this.onConnectError);
		conn.registerHandler('onDisconnect', this.onDisConnect);
		conn.registerHandler("onStatusChanged", this.connectStatusChangeHandler);

		conn.registerHandler(OPCODE.STREAM_ERROR.KEY, this.onStreamError);
		conn.registerHandler(OPCODE.PACKET_ERROR.KEY, this.onPacketError);

		// 注册packet_in监听器， 以记录最后报文的到达时间
		conn.registerHandler("packet_in", conn.getDaemon().pong.bind(conn.getDaemon()));

		this._inited = true;
	}
	/**
	 * 连接成功
	 */
	onConnected(){
		YYIMManager.getInstance().onOpened();
		YYIMConnection.getInstance().getDaemon().startPing(true);
	}
	/**
	 * 连接失败时, 触发全局事件CONNECT_FAILED， 附加参数：[errorCode, message]
	 * @param e 错误信息
	 */
	onConnectError(e){
		YYIMManager.getInstance().log("YYIMConnectEventHandler.prototype.onConnectError ", 0, e);
		let errorCode = e.getAttribute("code");
		YYIMConnection.getInstance().getDaemon().stopPing(false);
		if(errorCode == 401){
			YYIMManager.getInstance().onAuthError({
				errorCode : 401,
				message : '用户名或密码错误'
			});
		}else if(errorCode == 409){
			YYIMManager.getInstance().onConflicted({
				errorCode : 409,
				message : '连接冲突'
			});
		}else if(errorCode == 4010){
			YYIMManager.getInstance().onClientKickout({
				errorCode : 4010,
				message : '被客户端踢掉'
			});
		}else if(errorCode == 4011){
			YYIMManager.getInstance().onUpdatePassword({
				errorCode : 4011,
				message : '修改密码'
			});
		}else {
			YYIMManager.getInstance().onConnectError({
				errorCode : errorCode,
				message : '连接失败'
			});
		}
	}
	onStreamError(packet){
		YYIMManager.getInstance().log("YYIMConnectEventHandler.prototype.onPacketError ", 0, packet);
		YYIMConnection.getInstance().getDaemon().stopPing(false);
		let errorCode = packet.code;
		if(errorCode == 401){
			YYIMManager.getInstance().onAuthError({
				errorCode : 401,
				message : '用户名或密码错误'
			});
		}else if(errorCode == 409){
			YYIMManager.getInstance().onConflicted({
				errorCode : 409,
				message : '连接冲突'
			});
		}else if(errorCode == 4010){
			YYIMManager.getInstance().onClientKickout({
				errorCode : 4010,
				message : '被客户端踢掉'
			});
		}else if(errorCode == 4011){
			YYIMManager.getInstance().onUpdatePassword({
				errorCode : 4011,
				message : '修改密码'
			});
		}else {
			YYIMManager.getInstance().onConnectError({
				errorCode : errorCode,
				message : '连接失败'
			});
		}
	}
	onPacketError(packet){
		YYIMManager.getInstance().log("YYIMConnectEventHandler.prototype.onPacketError ", 0, packet);
	}
	/**
	 * 连接关闭
	 */
	onDisConnect(){
		YYIMManager.getInstance().onClosed();
		YYIMConnection.getInstance().getDaemon().stopPing(false);
	}
	/*
	* 连接状态改变时将调用此事件, 触发ON_CONNECT_STATUS_CHANGE全局事件，参数status, 可能的值为：
	* 'initializing' ... well
	* 'connecting' if connect() was called
	*'resuming' if resume() was called
	* 'processing' if it's about to operate as normal
	* 'onerror_fallback' if there was an error with the request object
	* 'protoerror_fallback' if there was an error at the http binding protocol flow (most likely that's where you interested in)
	* 'internal_server_error' in case of an internal server error
	* 'suspending' if suspend() is being called
	* 'aborted' if abort() was called
	* 'disconnecting' if disconnect() has been called
	*/
	connectStatusChangeHandler(status){
		YYIMManager.getInstance().onStatusChanged(status);
	}
}

export { YYIMConnectEventHandler };