import { YYIMConfiguration } from '../config/config';
import { YYIMConnection } from './YYIMConnection';
import { YYIMManager } from '../core/manager';

class YYIMConnectDaemon {
	constructor(){
		/**
		 * 最后接收的报文的时间
		 * @Type {Number}
		 */
		this.lastPongTime = Date.now();
		/**
		 * 循环发送ping包的interval
		 * @Type {Number}
		 */
		this.pingInterval;
		/**
		 * 判断发送ping包是否超时的timeout
		 * @Type {Number}
		 */
		this.pingTimeout;
		/**
		 * 发ping包间隔
		 */
		this.interval = 0;
	}
	/**
	 * 向服务器轮询发送ping包， 判断自己是否掉线
	 */
	startPing(isOnline){
		if(isOnline === true){
			this.isOnline = isOnline;
		}
		if (YYIMConnection.getInstance().connected()) {
			this.interval = !this.interval? YYIMConfiguration.PING.SLOW_INTERVAL: YYIMConfiguration.PING.INTERVAL;
			this.ping();
		}else{
			this.stopPing();
		}
	}
	/**
	 * 清除发送ping包的定时器
	 */
	stopPing(isOnline){
		if(isOnline === false){
			this.isOnline = isOnline;
		}
		
		clearTimeout(this.pingTimeout);
		clearTimeout(this.pingInterval);
	}
	/**
	 * 向服务器发送ping包，如果服务器在指定时间SNSConnectService.pingTimeout内未返回，则进行重连
	 */
	ping(){
		if(!this.isOnline){
			this.stopPing();
		}else{
			if(!this.sending){			
				this.stopPing();
				this.interval = this.interval || YYIMConfiguration.PING.SLOW_INTERVAL;
				
				let duration = Date.now() - (this.lastPongTime + this.interval);
				if(duration >= 0) {
					try{
						this.sending = true;
						this.interval = YYIMConfiguration.PING.SLOW_INTERVAL;
						YYIMConnection.getInstance().send(new JumpPacket(null, OPCODE.PING.SEND));
					}catch(e){
						this.stopPing();
						YYIMManager.getInstance().log("Ping_Error.", 0, e);
						YYIMManager.getInstance().onConnectError({
							errorCode : 408,
							message : '连接失败'
						});
					}
				}else{
					this.pingInterval = setTimeout(this.ping.bind(this), -duration);
				}
			}
		}
	}
	/**
	 * 更新最后收到的ping包的时间
	 * @param packet
	 */
	pong(){
		this.lastPongTime = Date.now();
		if(!this.isOnline){
			this.stopPing();
		}else{
			YYIMManager.getInstance().log('【pong】\t' + (new Date(this.lastPongTime)), 3, this.lastPongTime);
			this.sending = false;
			this.ping();
		}
	}
	setTimeout(){
		if(!this.isOnline){
			this.stopPing();
		}else{
			let now = Date.now();
			YYIMManager.getInstance().log('【setPingTimeout】\t' + (new Date(now)), 3, now);
			clearTimeout(this.pingTimeout);
			this.pingTimeout = setTimeout(this.timeoutHandler.bind(this), YYIMConfiguration.PING.TIMEOUT);
		}
	}
	timeoutHandler(){
		this.sending = false;
		this.stopPing();
		YYIMManager.getInstance().log("Ping_Timeout.", 0);
		YYIMManager.getInstance().onConnectError({
			errorCode : 408,
			message : '连接失败'
		});
	}
}

export { YYIMConnectDaemon };