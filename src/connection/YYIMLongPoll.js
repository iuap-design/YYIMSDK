/**
 * XHR异步请求
 * 有自动轮讯
 */
function MyXHR(obj) {
	this.url = obj.url;
	this.data = obj.data;
	this.sCallback = obj.successCallback;
	this.eCallback = obj.errorCallback;
	this.xhr = (function() {
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

MyXHR.prototype.get = function() {
	var _xhr = this.xhr;
	_xhr.open('GET', this.url, true);
	MyXHR.prototype._listenFn.call(this);
	_xhr.send();
}

MyXHR.prototype.post = function() {
	var _xhr = this.xhr;
	_xhr.open('POST', this.url, true);
	MyXHR.prototype._listenFn.call(this);
	_xhr.setRequestHeader('Content-Type','x-www-form-urlencoded');
	_xhr.send(this.data);
}

MyXHR.prototype.isLoop = function(flag) {
	this.loop = flag;
}

/*
 * 停止轮询
 */
MyXHR.prototype.stopLoop = function() {
	clearTimeout(_self.timeoutIndex);
}

/*
 * 回调监听
 */
MyXHR.prototype._listenFn = function() {
	var _self = this;
	var _xhr = this.xhr;
	this.timeoutIndex = setTimeout(function() {
		if (_self.loop) {
			MyXHR.prototype.get.call(_self);
		}
		_self.eCallback(_xhr.responseText);
	}, _self.timeout);
	_xhr.onreadystatechange = function() {
		if(_xhr.readyState == 4){
			clearTimeout(_self.timeoutIndex);
			if (_xhr.status == 200) {
				_self.sCallback(_xhr.responseText);
			}else {
				_self.eCallback(_xhr.responseText);
			}
		}
	}
}

