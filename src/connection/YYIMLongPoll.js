/**
 * XHR异步请求
 * 有自动轮讯
 */
class MyXHR {
	constructor(obj){
		this.url = obj.url;
		this.data = obj.data;
		this.sCallback = obj.successCallback;
		this.eCallback = obj.errorCallback;
		this.xhr = (() => {
			if(window.XMLHttpRequest){
				return new XMLHttpRequest();
			}else{
				return new ActiveXObject("Microsoft.XMLHTTP");
			}
		})();
		this.timeout = 10*1000;
		this.timeoutIndex;
		this.loop = false;
	}
	get(){
		let _xhr = this.xhr;
		_xhr.open('GET', this.url, true);
		MyXHR.prototype._listenFn.call(this);
		_xhr.send();
	}
	post(){
		let _xhr = this.xhr;
		_xhr.open('POST', this.url, true);
		MyXHR.prototype._listenFn.call(this);
		_xhr.setRequestHeader('Content-Type','x-www-form-urlencoded');
		_xhr.send(this.data);
	}
	isLoop(flag){
		this.loop = flag;
	}
	//停止轮询
	stopLoop(){
		clearTimeout(this.timeoutIndex);
	}
	//回调监听
	_listenFn(){
		let _xhr = this.xhr;
		this.timeoutIndex = setTimeout(() => {
			if (this.loop) {
				MyXHR.prototype.get.call(this);
			}
			this.eCallback(_xhr.responseText);
		}, this.timeout);
		_xhr.onreadystatechange = () => {
			if(_xhr.readyState == 4){
				clearTimeout(this.timeoutIndex);
				if (_xhr.status == 200) {
					this.sCallback(_xhr.responseText);
				}else {
					this.eCallback(_xhr.responseText);
				}
			}
		}
	}
}

export { MyXHR };

