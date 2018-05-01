/**
 * 自定义数据结构，用于存储对象结构数据
 */
function BaseList(){
	this.list = {};
	this.array = [];
}

BaseList.prototype.set = function(key,val,sortFun){
	if(key && val){
		var item = this.get(key),index;
		if(item){
			index = this.array.indexOf(item);
		}
		
		if(index > -1 && item){
			this.array.splice(index,1,val);
		}else{
			this.array.push(val);
		}
		
		this.list[key] = val;
		
		if(typeof sortFun == 'function'){
			this.array.sort.call(this.array,sortFun);
		}
		return val;
	}
};

BaseList.prototype.get = function(key){
	if(key){
		return this.list[key];
	}
};

BaseList.prototype.getAll = function(){
	return this.array;
};

BaseList.prototype.getFirst = function(){
	return this.array.slice(0,1)[0];
};

BaseList.prototype.getLast = function(){
	return this.array.slice(-1)[0];
};

BaseList.prototype.getPrev = function(key){
	if(this.get(key)){
		var index = this.array.indexOf(this.get(key));
		if(index > 0){
			return this.array[index - 1];
		}
	}
};

BaseList.prototype.getNext = function(key){
	if(this.get(key)){
		var index = this.array.indexOf(this.get(key));
		if(index > -1){
			return this.array[index + 1];
		}
	}
};

BaseList.prototype.remove = function(key){
	if(key){
		var item = this.get(key),index;
		this.list[key] = null;
		delete this.list[key];
		if(item){
			index = this.array.indexOf(item);
			if(index > -1){
				return this.array.splice(index,1)[0];
			}
		}
		return [];
	}
};

BaseList.prototype.update = function(key,val){
	return this.set.apply(this,arguments);
};

BaseList.prototype.length = function(){
	return this.array.length;
};

BaseList.prototype.clear = function(){
	for(var x in this.list){
		if(this.list.hasOwnProperty(x)){
			this.list[x] = null;
			delete this.list[x];
		}
	}
	this.array.splice(0,this.array.length);
	this.array.length = 0;
};

BaseList.prototype.indexOf = function(){
	return this.array.indexOf.apply(this.array,arguments);
};

BaseList.prototype.includes = function(){
	return this.array.includes.apply(this.array,arguments);
};

BaseList.prototype.lastIndexOf = function(){
	return this.array.lastIndexOf.apply(this.array,arguments);
};

BaseList.prototype.sort = function(){
	return this.array.sort.apply(this.array,arguments);
};

BaseList.prototype.some = function(){
	return this.array.some.apply(this.array,arguments);
};

BaseList.prototype.every = function(){
	return this.array.every.apply(this.array,arguments);
};

BaseList.prototype.map = function(){
	return this.array.map.apply(this.array,arguments);
};

BaseList.prototype.filter = function(){
	return this.array.filter.apply(this.array,arguments);
};

BaseList.prototype.forEach = function(){
	return this.array.forEach.apply(this.array,arguments);
};

BaseList.prototype.keys = function(){
	if(Object.keys){
		return Object.keys(this.list);
	}else{
		var keys = [];
		for(var x in this.list){
			if(this.list.hasOwnProperty(x)){
				keys.push(x);
			}
		}
		return keys;
	}
};
/**
 * 自定义文件对象
 * @author rongqb 20170311
 * @param {Object} id
 * @param {Object} name
 * @param {Object} path
 * @param {Object} size
 * @param {Object} fid
 * original：1表示原图/0表示压缩图
 */
function IMFile(arg){
	this.build(arg);
};

IMFile.prototype.build = function(arg){
	arg = arg || {};
	this.path = arg.path || this.path || '';
	this.name = arg.name || this.name || '';
	this.size = arg.size || this.size || 0;
	this.from = 0;
	
	if(arg.location){
		this.location = arg.location || this.location;
	}
	
	if(arg.id){
		this.id = arg.id || this.id;
	}
	
	this.fid = arg.fid || 0;
	
	if(arg.original === 0
	|| arg.original === 1){
		this.original = arg.original;
	}

	if(this.name && !this.type) { //获取文件后缀名
		this.name = this.name.trim();
		var pattern = /.+\.(\w+)$/;
		var matches = pattern.exec(this.name);
		if(matches && matches[1]){
			this.type = matches[1];
		}
	}
};



if(!Date.now) {
	Date.now = function() {
		return new Date().getTime();
	};
}
/*!
Math.uuid.js (v1.4)
http://www.broofa.com
mailto:robert@broofa.com

Copyright (c) 2010 Robert Kieffer
Dual licensed under the MIT and GPL licenses.
*/

/*
 * Generate a random uuid.
 *
 * USAGE: Math.uuid(length, radix)
 *   length - the desired number of characters
 *   radix  - the number of allowable values for each character.
 *
 * EXAMPLES:
 *   // No arguments  - returns RFC4122, version 4 ID
 *   >>> Math.uuid()
 *   "92329D39-6F5C-4520-ABFC-AAB64544E172"
 *
 *   // One argument - returns ID of the specified length
 *   >>> Math.uuid(15)     // 15 character ID (default base=62)
 *   "VcydxgltxrVZSTV"
 *
 *   // Two arguments - returns ID of the specified length, and radix. (Radix must be <= 62)
 *   >>> Math.uuid(8, 2)  // 8 character ID (base=2)
 *   "01001010"
 *   >>> Math.uuid(8, 10) // 8 character ID (base=10)
 *   "47473046"
 *   >>> Math.uuid(8, 16) // 8 character ID (base=16)
 *   "098F4D35"
 */
(function() {
  // Private array of chars to use
  var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

  Math.uuid = function (len, radix) {
    var chars = CHARS, uuid = [], i;
    radix = radix || chars.length;

    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
      // rfc4122, version 4 form
      var r;

      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';

      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random()*16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }

    return uuid.join('');
  };

  // A more performant, but slightly bulkier, RFC4122v4 solution.  We boost performance
  // by minimizing calls to random()
  Math.uuidFast = function() {
    var chars = CHARS, uuid = new Array(36), rnd=0, r;
    for (var i = 0; i < 36; i++) {
      if (i==8 || i==13 ||  i==18 || i==23) {
        uuid[i] = '-';
      } else if (i==14) {
        uuid[i] = '4';
      } else {
        if (rnd <= 0x02) rnd = 0x2000000 + (Math.random()*0x1000000)|0;
        r = rnd & 0xf;
        rnd = rnd >> 4;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
    return uuid.join('');
  };

  // A more compact, but less performant, RFC4122v4 solution:
  Math.uuidCompact = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  };
})();

Object.clone = function(sObj) {

	if(typeof sObj !== "object") {
		return sObj;
	}

	var s = {};
	if(sObj.constructor == Array) {
		s = [];
	}

	for(var i in sObj) {
		s[i] = sObj[i] ? Object.clone(sObj[i]) : null;
	}
	return s;
};
if(!Array.prototype.every) {
	Array.prototype.every = function(callbackfn, thisArg) {
		'use strict';
		var T, k;

		if(this == null) {
			throw new TypeError('this is null or not defined');
		}

		// 1. Let O be the result of calling ToObject passing the this 
		//    value as the argument.
		var O = Object(this);

		// 2. Let lenValue be the result of calling the Get internal method
		//    of O with the argument "length".
		// 3. Let len be ToUint32(lenValue).
		var len = O.length >>> 0;

		// 4. If IsCallable(callbackfn) is false, throw a TypeError exception.
		if(typeof callbackfn !== 'function') {
			throw new TypeError();
		}

		// 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
		if(arguments.length > 1) {
			T = thisArg;
		}

		// 6. Let k be 0.
		k = 0;

		// 7. Repeat, while k < len
		while(k < len) {

			var kValue;

			// a. Let Pk be ToString(k).
			//   This is implicit for LHS operands of the in operator
			// b. Let kPresent be the result of calling the HasProperty internal 
			//    method of O with argument Pk.
			//   This step can be combined with c
			// c. If kPresent is true, then
			if(k in O) {

				// i. Let kValue be the result of calling the Get internal method
				//    of O with argument Pk.
				kValue = O[k];

				// ii. Let testResult be the result of calling the Call internal method
				//     of callbackfn with T as the this value and argument list 
				//     containing kValue, k, and O.
				var testResult = callbackfn.call(T, kValue, k, O);

				// iii. If ToBoolean(testResult) is false, return false.
				if(!testResult) {
					return false;
				}
			}
			k++;
		}
		return true;
	};
}

if(!Array.prototype.some) {
	Array.prototype.some = function(fun /*, thisArg*/ ) {
		'use strict';

		if(this == null) {
			throw new TypeError('Array.prototype.some called on null or undefined');
		}

		if(typeof fun !== 'function') {
			throw new TypeError();
		}

		var t = Object(this);
		var len = t.length >>> 0;

		var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
		for(var i = 0; i < len; i++) {
			if(i in t && fun.call(thisArg, t[i], i, t)) {
				return true;
			}
		}

		return false;
	};
}

if(!Array.prototype.map) {

	Array.prototype.map = function(callback, thisArg) {

		var T, A, k;

		if(this == null) {
			throw new TypeError(' this is null or not defined');
		}

		// 1. Let O be the result of calling ToObject passing the |this| 
		//    value as the argument.
		var O = Object(this);

		// 2. Let lenValue be the result of calling the Get internal 
		//    method of O with the argument "length".
		// 3. Let len be ToUint32(lenValue).
		var len = O.length >>> 0;

		// 4. If IsCallable(callback) is false, throw a TypeError exception.
		// See: http://es5.github.com/#x9.11
		if(typeof callback !== 'function') {
			throw new TypeError(callback + ' is not a function');
		}

		// 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
		if(arguments.length > 1) {
			T = thisArg;
		}

		// 6. Let A be a new array created as if by the expression new Array(len) 
		//    where Array is the standard built-in constructor with that name and 
		//    len is the value of len.
		A = new Array(len);

		// 7. Let k be 0
		k = 0;

		// 8. Repeat, while k < len
		while(k < len) {

			var kValue, mappedValue;

			// a. Let Pk be ToString(k).
			//   This is implicit for LHS operands of the in operator
			// b. Let kPresent be the result of calling the HasProperty internal 
			//    method of O with argument Pk.
			//   This step can be combined with c
			// c. If kPresent is true, then
			if(k in O) {

				// i. Let kValue be the result of calling the Get internal 
				//    method of O with argument Pk.
				kValue = O[k];

				// ii. Let mappedValue be the result of calling the Call internal 
				//     method of callback with T as the this value and argument 
				//     list containing kValue, k, and O.
				mappedValue = callback.call(T, kValue, k, O);

				// iii. Call the DefineOwnProperty internal method of A with arguments
				// Pk, Property Descriptor
				// { Value: mappedValue,
				//   Writable: true,
				//   Enumerable: true,
				//   Configurable: true },
				// and false.

				// In browsers that support Object.defineProperty, use the following:
				// Object.defineProperty(A, k, {
				//   value: mappedValue,
				//   writable: true,
				//   enumerable: true,
				//   configurable: true
				// });

				// For best browser support, use the following:
				A[k] = mappedValue;
			}
			// d. Increase k by 1.
			k++;
		}

		// 9. return A
		return A;
	};
}

if(!Array.prototype.filter) {
	Array.prototype.filter = function(fun /*, thisArg*/ ) {
		'use strict';

		if(this === void 0 || this === null) {
			throw new TypeError();
		}

		var t = Object(this);
		var len = t.length >>> 0;
		if(typeof fun !== 'function') {
			throw new TypeError();
		}

		var res = [];
		var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
		for(var i = 0; i < len; i++) {
			if(i in t) {
				var val = t[i];

				// NOTE: Technically this should Object.defineProperty at
				//       the next index, as push can be affected by
				//       properties on Object.prototype and Array.prototype.
				//       But that method's new, and collisions should be
				//       rare, so use the more-compatible alternative.
				if(fun.call(thisArg, val, i, t)) {
					res.push(val);
				}
			}
		}

		return res;
	};
}

if(!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(searchElement, fromIndex) {

		var k;

		// 1. Let o be the result of calling ToObject passing
		//    the this value as the argument.
		if(this == null) {
			throw new TypeError('"this" is null or not defined');
		}

		var o = Object(this);

		// 2. Let lenValue be the result of calling the Get
		//    internal method of o with the argument "length".
		// 3. Let len be ToUint32(lenValue).
		var len = o.length >>> 0;

		// 4. If len is 0, return -1.
		if(len === 0) {
			return -1;
		}

		// 5. If argument fromIndex was passed let n be
		//    ToInteger(fromIndex); else let n be 0.
		var n = +fromIndex || 0;

		if(Math.abs(n) === Infinity) {
			n = 0;
		}

		// 6. If n >= len, return -1.
		if(n >= len) {
			return -1;
		}

		// 7. If n >= 0, then Let k be n.
		// 8. Else, n<0, Let k be len - abs(n).
		//    If k is less than 0, then let k be 0.
		k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

		// 9. Repeat, while k < len
		while(k < len) {
			// a. Let Pk be ToString(k).
			//   This is implicit for LHS operands of the in operator
			// b. Let kPresent be the result of calling the
			//    HasProperty internal method of o with argument Pk.
			//   This step can be combined with c
			// c. If kPresent is true, then
			//    i.  Let elementK be the result of calling the Get
			//        internal method of o with the argument ToString(k).
			//   ii.  Let same be the result of applying the
			//        Strict Equality Comparison Algorithm to
			//        searchElement and elementK.
			//  iii.  If same is true, return k.
			if(k in o && o[k] === searchElement) {
				return k;
			}
			k++;
		}
		return -1;
	};
}

if(!Array.prototype.forEach) {

	Array.prototype.forEach = function(callback, thisArg) {

		var T, k;

		if(this === null) {
			throw new TypeError(' this is null or not defined');
		}

		// 1. Let O be the result of calling toObject() passing the
		// |this| value as the argument.
		var O = Object(this);

		// 2. Let lenValue be the result of calling the Get() internal
		// method of O with the argument "length".
		// 3. Let len be toUint32(lenValue).
		var len = O.length >>> 0;

		// 4. If isCallable(callback) is false, throw a TypeError exception. 
		// See: http://es5.github.com/#x9.11
		if(typeof callback !== "function") {
			throw new TypeError(callback + ' is not a function');
		}

		// 5. If thisArg was supplied, let T be thisArg; else let
		// T be undefined.
		if(arguments.length > 1) {
			T = thisArg;
		}

		// 6. Let k be 0
		k = 0;

		// 7. Repeat, while k < len
		while(k < len) {

			var kValue;

			// a. Let Pk be ToString(k).
			//    This is implicit for LHS operands of the in operator
			// b. Let kPresent be the result of calling the HasProperty
			//    internal method of O with argument Pk.
			//    This step can be combined with c
			// c. If kPresent is true, then
			if(k in O) {

				// i. Let kValue be the result of calling the Get internal
				// method of O with argument Pk.
				kValue = O[k];

				// ii. Call the Call internal method of callback with T as
				// the this value and argument list containing kValue, k, and O.
				callback.call(T, kValue, k, O);
			}
			// d. Increase k by 1.
			k++;
		}
		// 8. return undefined
	};
}


if(!Array.prototype.lastIndexOf) {
	Array.prototype.lastIndexOf = function(searchElement /*, fromIndex*/ ) {
		'use strict';

		if(this === void 0 || this === null) {
			throw new TypeError();
		}

		var n, k,
			t = Object(this),
			len = t.length >>> 0;
		if(len === 0) {
			return -1;
		}

		n = len - 1;
		if(arguments.length > 1) {
			n = Number(arguments[1]);
			if(n != n) {
				n = 0;
			} else if(n != 0 && n != (1 / 0) && n != -(1 / 0)) {
				n = (n > 0 || -1) * Math.floor(Math.abs(n));
			}
		}

		for(k = n >= 0 ? Math.min(n, len - 1) : len - Math.abs(n); k >= 0; k--) {
			if(k in t && t[k] === searchElement) {
				return k;
			}
		}
		return -1;
	};
}
Date.prototype.format = function(fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if(/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for(var k in o) {
		if(new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
};
if(!Function.prototype.bind) {
	Function.prototype.bind = function(oThis) {
		if(typeof this !== "function") {
			// closest thing possible to the ECMAScript 5 internal IsCallable function
			throw new TypeError(
				"Function.prototype.bind - what is trying to be bound is not callable");
		}

		var aArgs = Array.prototype.slice.call(arguments, 1),
			fToBind = this,
			fNOP = function() {},
			fBound = function() {
				return fToBind.apply(this instanceof fNOP && oThis ? this : oThis,
					aArgs.concat(Array.prototype.slice.call(arguments)));
			};

		fNOP.prototype = this.prototype;
		fBound.prototype = new fNOP();

		return fBound;
	};
}


String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
};

String.prototype.ltrim = function() {
	return this.replace(/(^\s*)/g, "");
};

String.prototype.rtrim = function() {
	return this.replace(/(\s*$)/g, "");
};

String.prototype.notEmpty = function() {
	return this != null && this.trim() != '';
};

String.prototype.isEmpty = function() {
	return !this.notEmpty();
};

String.prototype.endWith = function(str) {
	if(str == null || str == "" || this.length == 0 || str.length > this.length)
		return false;
	if(this.substring(this.length - str.length) == str)
		return true;
	else
		return false;
	return true;
};

String.prototype.startWith = function(str) {
	if(str == null || str == "" || this.length == 0 || str.length > this.length)
		return false;
	if(this.substr(0, str.length) == str)
		return true;
	else
		return false;
	return true;
};
var YYIMCommonUtil = {
	isFunction: function(func) {
		return typeof func == 'function';
	},
	isStringAndNotEmpty: function(str) {
		if(typeof str == 'string')
			return str.notEmpty();
		return false;
	},
	chatNumInString: function(str1, str2) {
		if(typeof str1 == 'string' && typeof str2 == 'string') {
			var r = new RegExp('\\' + str2, "gi");
			var m = str1.match(r);
			if(m)
				return m.length;
		}
		return 0;
	},
	isNumber: function(num) {
		return Object.prototype.toString.call(num) === '[object Number]';
	}
};

var YYIMArrayUtil = {
	contains: function(arr, val) {
		if(Object.prototype.toString.call(arr) === '[object Array]') {
			for(var i = 0; i < arr.length; i++) {
				if(arr[i] === val) {
					return true;
				}
			}
			return false;
		}

		// 不是数组
		return false;
	},
	isArray: function(arr) {
		return Object.prototype.toString.call(arr) === '[object Array]';
	},
	unique: function(array) {
		array.sort();
		var re = [array[0]];
		for(var i = 1; i < array.length; i++) {
			if(array[i] !== re[re.length - 1]) {
				re.push(array[i]);
			}
		}
		return re;
	},
	insert: function(arr, index, item) {
		arr.splice(index, 0, item);
	}
};


var YYIMUtil = {
	'localstorage': (function() {
		var enable = false;
		var store = getLocalStorage();

		function getLocalStorage() {
			try{
				enable = true;
				return window.localStorage;
			}catch(e){
				enable = false;
				throw new Error(e.message);
			}
		}

		function clear() {
			if(store) {
				store.clear();
			}
		}

		function setItem(name, value) {
			if(store) {
				store.setItem(name, value);
			}
		}

		function getItem(name) {
			if(store) {
				return store.getItem(name);
			}
		}

		function removeItem(name) {
			if(store) {
				store.removeItem(name);
			}
		}

		function getSpace(keys) {
			var expect;
			if(YYIMUtil['isWhateType'](keys, 'Array')) {
				expect = {};
				for(var x in keys) {
					if(getItem(keys[x])) {
						expect[keys[x]] = getItem(keys[x]);
					}
				}
			}

			var result = {
				total: YYIMUtil['getSpace'](store)
			};

			if(expect) {
				result['expect'] = YYIMUtil['getSpace'](expect);
				expect = null;
			}

			return result;
		}

		return {
			enable: enable,
			getLocalStorage: getLocalStorage,
			setItem: setItem,
			getItem: getItem,
			removeItem: removeItem,
			clear: clear,
			getSpace: getSpace
		};
	})(),
	'getSpace': function(obj) {
		try {
			return {
				size: unescape(encodeURIComponent(JSON.stringify(obj))).length,
				space: YYIMUtil['bytesToSize'](unescape(encodeURIComponent(JSON.stringify(obj))).length)
			};
		} catch(e) {
			return {
				size: 0,
				space: '0 B'
			};
		}
	},
	'cookie': {
		'get': function(name) { //获取cookie
			if(name){
				var str_cookies = document.cookie;
				var arr_cookies = str_cookies.split(';');
				var num_cookies = arr_cookies.length;
				for(var i = 0; i < num_cookies; i++) {
					var arr = arr_cookies[i].split("=");
					if(arr[0].replace(/(^\s+)|(\s+$)/g, "") == name) return unescape(arr[1]);
				}
			}
			return null;
		},
		'set': function(name, value, minutes, path, domain, secure) { //设置cookie
			if(name && value){
				var cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
				if(minutes) {
					var expiration = new Date((new Date()).getTime() + minutes * 60000);
					cookie += ';expires=' + expiration.toGMTString();
				}
				if(path) cookie += ';path=' + path;
				if(domain) cookie += ';domain=' + domain;
				if(secure) cookie += ';secure';
				document.cookie = cookie;
			}
		},
		'delete': function(name, path, domain) { //删除cookie
			if(name && this.get(name)) {
				var cookie = encodeURIComponent(name) + '=;expires=Fri, 02-Jan-1970 00:00:00 GMT';
				if(path) cookie += ';path=' + path;
				if(domain) cookie += ';domain=' + domain;
				document.cookie = cookie;
			}
		}
	},
	'array': {
		'comparisonAsc': function(propertyName) { //用于给对象升序排序
			return function(object1, object2) {
				return object1[propertyName] - object2[propertyName];
			};
		},
		'comparisonDesc': function(propertyName) { //用于给对象降序排序
			return function(object1, object2) {
				return object2[propertyName] - object1[propertyName];
			};
		}
	},
	'isWhateType': function(obj, type) {
		return(type === "Null" && obj === null) ||
			(type === "Undefined" && obj === void 0) ||
			(type === "Number" && isFinite(obj)) ||
			Object.prototype.toString.call(obj).slice(8, -1) === type;
	},
	'dom': {
		convertToArray: function(nodes) {
			var array = null;
			try {
				array = Array.prototype.slice.call(nodes, 0); //针对非 ie 浏览器
			} catch(e) {
				array = [];
				for(var i = 0, len = nodes.length; i < len; i++) {
					array.push(nodes[i]);
				}
			}
			return array;
		}
	},
	'bytesToSize': function(bytes) {
		if(bytes === 0) return '0 B';
		var k = 1024;
		var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		var i = Math.floor(Math.log(bytes) / Math.log(k));
		return(bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]; //toPrecision(3) 后面保留一位小数，如1.0GB        
	},
	'extend': function(base, extend, override) {
        if (Object.prototype.toString.call(base) === '[object Object]') {
            if (Object.prototype.toString.call(extend) === '[object Array]') {
                for (var i = 0, len = extend.length; i < len; i++) {
                    arguments.callee(base, extend[i], override);
                }
            }
            try {
                if (extend) {
                    for (var i in extend) {
                        if ((override === true) || !base[i]) {
                            base[i] = extend[i];
                        }
                    }
                }
                return base;
            } catch (e) {
                return base;
            }
        }
        return base;
    },
	'html': {
		removeHtmlTab: function(str) {//去掉html标签
			return str.replace(/<[^<>]+?>/g,'');//删除所有HTML标签
		},
		htmlEscape: function(str) {//普通字符转换成转意符
			return str.replace(/[<>&"]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c];});
		},
		escapeHtml: function (str) {//转意符换成普通字符
			var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
			return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
		},	
		nbspSpace: function(str) {// &nbsp;转成空格
			var arrEntities = {'nbsp' : ' '};
			return str.replace(/&(nbsp);/ig, function(all, t){return arrEntities[t]})
		},
		spaceNbsp: function(str) {
			return str.replace(/\s/ig, '&nbsp;');
		},
		returnBr: function(str) {//回车转为br标签
			return str.replace(/\r?\n/g,"<br />");
		},
		trimBr: function(str) {//去除开头结尾换行,并将连续3次以上换行转换成2次换行
			str=str.replace(/((\s|&nbsp;)*\r?\n){3,}/g,"\r\n\r\n");//限制最多2次换行
			str=str.replace(/^((\s|&nbsp;)*\r?\n)+/g,'');//清除开头换行
		 	str=str.replace(/((\s|&nbsp;)*\r?\n)+$/g,'');//清除结尾换行
		 	return str;
		},
		mergeSpace: function(str) {// 将多个连续空格合并成一个空格
		 	str=str.replace(/(\s|&nbsp;)+/g,' ');
		 	return str;
		}
	},
	'function': {
		'bind': function(fn,context){ //绑定函数（指定绑定函数执行作用域），类似于fn.bind(content)
			if(Object.prototype.toString.call(fn).slice(8, -1) == 'Function'){
				return function(){
					return fn.apply(context,arguments);
				}
			}
		},
		'curry': function(fn){ //函数柯里化
			if(Object.prototype.toString.call(fn).slice(8, -1) == 'Function'){
				var args = Array.prototype.slice.call(arguments,1);
				return function(){
					var innerArgs = Array.prototype.slice.call(arguments);
					return fn.apply(null,args.concat(innerArgs));
				};
			}
		}
	},
	'transcoding': {
		'base64ToDataUrl': function(base64Code) {
		    if (base64Code) {
		        if (!/data\:image\/png\;base64\,/.test(base64Code)) {
		            return 'data:image/png;base64,' + base64Code;
		        }
		    }
		    return base64Code;
		},
		'dataUrlToBase64': function(dataUrl){
		    if (dataUrl) {
		        dataUrl.replace(/data\:image\/png\;base64\,/g, '');
		    }
		    return dataUrl;
		},
		'base64ToBlob': function(base64Code) { 
			if(base64Code){
				var bytes = window.atob(base64Code.split(',')[1] || base64Code); //去掉url的头，并转换为byte
			    //处理异常,将ascii码小于0的转换为大于0  
			    var ab = new ArrayBuffer(bytes.length);
			    var ia = new Uint8Array(ab);
			    for (var i in bytes) {
			        if (bytes.hasOwnProperty(i)) {
			            ia[i] = bytes.charCodeAt(i);
			        }
			    }
			    return new Blob([ab], { type: 'image/png' });
			}
		},
		'base64ToFormData': function(base64Code) {
		    if (base64Code) {
		        var formData = new FormData();
		        formData.append("file", this.base64ToBlob(base64Code));
		        return formData;
		    }
		}
	}
};

/**
 * 正则表达式
 */
var YYIMRegExp = {
	mobile: /^[1][358][0-9]{9}$/, //手机号
	phone: /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/ //手机和座机两种格式	
};
/**
 * mOxie - multi-runtime File API & XMLHttpRequest L2 Polyfill
 * v1.3.5
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 *
 * Date: 2016-05-15
 */
!function(e,t){"use strict";function n(e,t){for(var n,i=[],r=0;r<e.length;++r){if(n=s[e[r]]||o(e[r]),!n)throw"module definition dependecy not found: "+e[r];i.push(n)}t.apply(null,i)}function i(e,i,r){if("string"!=typeof e)throw"invalid module definition, module id must be defined and be a string";if(i===t)throw"invalid module definition, dependencies must be specified";if(r===t)throw"invalid module definition, definition function must be specified";n(i,function(){s[e]=r.apply(null,arguments)})}function r(e){return!!s[e]}function o(t){for(var n=e,i=t.split(/[.\/]/),r=0;r<i.length;++r){if(!n[i[r]])return;n=n[i[r]]}return n}function a(n){for(var i=0;i<n.length;i++){for(var r=e,o=n[i],a=o.split(/[.\/]/),u=0;u<a.length-1;++u)r[a[u]]===t&&(r[a[u]]={}),r=r[a[u]];r[a[a.length-1]]=s[o]}}var s={},u="moxie/core/utils/Basic",c="moxie/core/utils/Env",l="moxie/core/I18n",d="moxie/core/utils/Mime",h="moxie/core/utils/Dom",f="moxie/core/Exceptions",p="moxie/core/EventTarget",m="moxie/runtime/Runtime",g="moxie/runtime/RuntimeClient",v="moxie/file/FileInput",w="moxie/core/utils/Encode",y="moxie/file/Blob",E="moxie/file/File",_="moxie/file/FileDrop",b="moxie/file/FileReader",x="moxie/core/utils/Url",R="moxie/runtime/RuntimeTarget",A="moxie/file/FileReaderSync",I="moxie/xhr/FormData",T="moxie/xhr/XMLHttpRequest",S="moxie/runtime/Transporter",O="moxie/image/Image",D="moxie/runtime/html5/Runtime",N="moxie/core/utils/Events",L="moxie/runtime/html5/file/FileInput",C="moxie/runtime/html5/file/Blob",M="moxie/runtime/html5/file/FileDrop",F="moxie/runtime/html5/file/FileReader",P="moxie/runtime/html5/xhr/XMLHttpRequest",H="moxie/runtime/html5/utils/BinaryReader",B="moxie/runtime/html5/image/JPEGHeaders",k="moxie/runtime/html5/image/ExifParser",U="moxie/runtime/html5/image/JPEG",G="moxie/runtime/html5/image/PNG",z="moxie/runtime/html5/image/ImageInfo",q="moxie/runtime/html5/image/MegaPixel",j="moxie/runtime/html5/image/Image",X="moxie/runtime/flash/Runtime",V="moxie/runtime/flash/file/FileInput",W="moxie/runtime/flash/file/Blob",Y="moxie/runtime/flash/file/FileReader",$="moxie/runtime/flash/file/FileReaderSync",J="moxie/runtime/flash/xhr/XMLHttpRequest",Z="moxie/runtime/flash/runtime/Transporter",K="moxie/runtime/flash/image/Image",Q="moxie/runtime/silverlight/Runtime",ee="moxie/runtime/silverlight/file/FileInput",te="moxie/runtime/silverlight/file/Blob",ne="moxie/runtime/silverlight/file/FileDrop",ie="moxie/runtime/silverlight/file/FileReader",re="moxie/runtime/silverlight/file/FileReaderSync",oe="moxie/runtime/silverlight/xhr/XMLHttpRequest",ae="moxie/runtime/silverlight/runtime/Transporter",se="moxie/runtime/silverlight/image/Image",ue="moxie/runtime/html4/Runtime",ce="moxie/runtime/html4/file/FileInput",le="moxie/runtime/html4/file/FileReader",de="moxie/runtime/html4/xhr/XMLHttpRequest",he="moxie/runtime/html4/image/Image";i(u,[],function(){var e=function(e){var t;return e===t?"undefined":null===e?"null":e.nodeType?"node":{}.toString.call(e).match(/\s([a-z|A-Z]+)/)[1].toLowerCase()},t=function(i){var r;return n(arguments,function(o,s){s>0&&n(o,function(n,o){n!==r&&(e(i[o])===e(n)&&~a(e(n),["array","object"])?t(i[o],n):i[o]=n)})}),i},n=function(t,n){var i,r,o,a;if(t)if("number"===e(t.length)){for(o=0,i=t.length;i>o;o++)if(n(t[o],o)===!1)return}else if("object"===e(t))for(r in t)if(t.hasOwnProperty(r)&&n(t[r],r)===!1)return},i=function(t){var n;if(!t||"object"!==e(t))return!0;for(n in t)return!1;return!0},r=function(t,n){function i(r){"function"===e(t[r])&&t[r](function(e){++r<o&&!e?i(r):n(e)})}var r=0,o=t.length;"function"!==e(n)&&(n=function(){}),t&&t.length||n(),i(r)},o=function(e,t){var i=0,r=e.length,o=new Array(r);n(e,function(e,n){e(function(e){if(e)return t(e);var a=[].slice.call(arguments);a.shift(),o[n]=a,i++,i===r&&(o.unshift(null),t.apply(this,o))})})},a=function(e,t){if(t){if(Array.prototype.indexOf)return Array.prototype.indexOf.call(t,e);for(var n=0,i=t.length;i>n;n++)if(t[n]===e)return n}return-1},s=function(t,n){var i=[];"array"!==e(t)&&(t=[t]),"array"!==e(n)&&(n=[n]);for(var r in t)-1===a(t[r],n)&&i.push(t[r]);return i.length?i:!1},u=function(e,t){var i=[];return n(e,function(e){-1!==a(e,t)&&i.push(e)}),i.length?i:null},c=function(e){var t,n=[];for(t=0;t<e.length;t++)n[t]=e[t];return n},l=function(){var e=0;return function(t){var n=(new Date).getTime().toString(32),i;for(i=0;5>i;i++)n+=Math.floor(65535*Math.random()).toString(32);return(t||"o_")+n+(e++).toString(32)}}(),d=function(e){return e?String.prototype.trim?String.prototype.trim.call(e):e.toString().replace(/^\s*/,"").replace(/\s*$/,""):e},h=function(e){if("string"!=typeof e)return e;var t={t:1099511627776,g:1073741824,m:1048576,k:1024},n;return e=/^([0-9\.]+)([tmgk]?)$/.exec(e.toLowerCase().replace(/[^0-9\.tmkg]/g,"")),n=e[2],e=+e[1],t.hasOwnProperty(n)&&(e*=t[n]),Math.floor(e)},f=function(t){var n=[].slice.call(arguments,1);return t.replace(/%[a-z]/g,function(){var t=n.shift();return"undefined"!==e(t)?t:""})};return{guid:l,typeOf:e,extend:t,each:n,isEmptyObj:i,inSeries:r,inParallel:o,inArray:a,arrayDiff:s,arrayIntersect:u,toArray:c,trim:d,sprintf:f,parseSizeStr:h}}),i(c,[u],function(e){function t(e,t,n){var i=0,r=0,o=0,a={dev:-6,alpha:-5,a:-5,beta:-4,b:-4,RC:-3,rc:-3,"#":-2,p:1,pl:1},s=function(e){return e=(""+e).replace(/[_\-+]/g,"."),e=e.replace(/([^.\d]+)/g,".$1.").replace(/\.{2,}/g,"."),e.length?e.split("."):[-8]},u=function(e){return e?isNaN(e)?a[e]||-7:parseInt(e,10):0};for(e=s(e),t=s(t),r=Math.max(e.length,t.length),i=0;r>i;i++)if(e[i]!=t[i]){if(e[i]=u(e[i]),t[i]=u(t[i]),e[i]<t[i]){o=-1;break}if(e[i]>t[i]){o=1;break}}if(!n)return o;switch(n){case">":case"gt":return o>0;case">=":case"ge":return o>=0;case"<=":case"le":return 0>=o;case"==":case"=":case"eq":return 0===o;case"<>":case"!=":case"ne":return 0!==o;case"":case"<":case"lt":return 0>o;default:return null}}var n=function(e){var t="",n="?",i="function",r="undefined",o="object",a="major",s="model",u="name",c="type",l="vendor",d="version",h="architecture",f="console",p="mobile",m="tablet",g={has:function(e,t){return-1!==t.toLowerCase().indexOf(e.toLowerCase())},lowerize:function(e){return e.toLowerCase()}},v={rgx:function(){for(var t,n=0,a,s,u,c,l,d,h=arguments;n<h.length;n+=2){var f=h[n],p=h[n+1];if(typeof t===r){t={};for(u in p)c=p[u],typeof c===o?t[c[0]]=e:t[c]=e}for(a=s=0;a<f.length;a++)if(l=f[a].exec(this.getUA())){for(u=0;u<p.length;u++)d=l[++s],c=p[u],typeof c===o&&c.length>0?2==c.length?typeof c[1]==i?t[c[0]]=c[1].call(this,d):t[c[0]]=c[1]:3==c.length?typeof c[1]!==i||c[1].exec&&c[1].test?t[c[0]]=d?d.replace(c[1],c[2]):e:t[c[0]]=d?c[1].call(this,d,c[2]):e:4==c.length&&(t[c[0]]=d?c[3].call(this,d.replace(c[1],c[2])):e):t[c]=d?d:e;break}if(l)break}return t},str:function(t,i){for(var r in i)if(typeof i[r]===o&&i[r].length>0){for(var a=0;a<i[r].length;a++)if(g.has(i[r][a],t))return r===n?e:r}else if(g.has(i[r],t))return r===n?e:r;return t}},w={browser:{oldsafari:{major:{1:["/8","/1","/3"],2:"/4","?":"/"},version:{"1.0":"/8",1.2:"/1",1.3:"/3","2.0":"/412","2.0.2":"/416","2.0.3":"/417","2.0.4":"/419","?":"/"}}},device:{sprint:{model:{"Evo Shift 4G":"7373KT"},vendor:{HTC:"APA",Sprint:"Sprint"}}},os:{windows:{version:{ME:"4.90","NT 3.11":"NT3.51","NT 4.0":"NT4.0",2000:"NT 5.0",XP:["NT 5.1","NT 5.2"],Vista:"NT 6.0",7:"NT 6.1",8:"NT 6.2",8.1:"NT 6.3",RT:"ARM"}}}},y={browser:[[/(opera\smini)\/([\w\.-]+)/i,/(opera\s[mobiletab]+).+version\/([\w\.-]+)/i,/(opera).+version\/([\w\.]+)/i,/(opera)[\/\s]+([\w\.]+)/i],[u,d],[/\s(opr)\/([\w\.]+)/i],[[u,"Opera"],d],[/(kindle)\/([\w\.]+)/i,/(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]+)*/i,/(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i,/(?:ms|\()(ie)\s([\w\.]+)/i,/(rekonq)\/([\w\.]+)*/i,/(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi)\/([\w\.-]+)/i],[u,d],[/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i],[[u,"IE"],d],[/(edge)\/((\d+)?[\w\.]+)/i],[u,d],[/(yabrowser)\/([\w\.]+)/i],[[u,"Yandex"],d],[/(comodo_dragon)\/([\w\.]+)/i],[[u,/_/g," "],d],[/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i,/(uc\s?browser|qqbrowser)[\/\s]?([\w\.]+)/i],[u,d],[/(dolfin)\/([\w\.]+)/i],[[u,"Dolphin"],d],[/((?:android.+)crmo|crios)\/([\w\.]+)/i],[[u,"Chrome"],d],[/XiaoMi\/MiuiBrowser\/([\w\.]+)/i],[d,[u,"MIUI Browser"]],[/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)/i],[d,[u,"Android Browser"]],[/FBAV\/([\w\.]+);/i],[d,[u,"Facebook"]],[/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i],[d,[u,"Mobile Safari"]],[/version\/([\w\.]+).+?(mobile\s?safari|safari)/i],[d,u],[/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i],[u,[d,v.str,w.browser.oldsafari.version]],[/(konqueror)\/([\w\.]+)/i,/(webkit|khtml)\/([\w\.]+)/i],[u,d],[/(navigator|netscape)\/([\w\.-]+)/i],[[u,"Netscape"],d],[/(swiftfox)/i,/(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,/(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/([\w\.-]+)/i,/(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i,/(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf)[\/\s]?([\w\.]+)/i,/(links)\s\(([\w\.]+)/i,/(gobrowser)\/?([\w\.]+)*/i,/(ice\s?browser)\/v?([\w\._]+)/i,/(mosaic)[\/\s]([\w\.]+)/i],[u,d]],engine:[[/windows.+\sedge\/([\w\.]+)/i],[d,[u,"EdgeHTML"]],[/(presto)\/([\w\.]+)/i,/(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i,/(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,/(icab)[\/\s]([23]\.[\d\.]+)/i],[u,d],[/rv\:([\w\.]+).*(gecko)/i],[d,u]],os:[[/microsoft\s(windows)\s(vista|xp)/i],[u,d],[/(windows)\snt\s6\.2;\s(arm)/i,/(windows\sphone(?:\sos)*|windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i],[u,[d,v.str,w.os.windows.version]],[/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],[[u,"Windows"],[d,v.str,w.os.windows.version]],[/\((bb)(10);/i],[[u,"BlackBerry"],d],[/(blackberry)\w*\/?([\w\.]+)*/i,/(tizen)[\/\s]([\w\.]+)/i,/(android|webos|palm\os|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]+)*/i,/linux;.+(sailfish);/i],[u,d],[/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i],[[u,"Symbian"],d],[/\((series40);/i],[u],[/mozilla.+\(mobile;.+gecko.+firefox/i],[[u,"Firefox OS"],d],[/(nintendo|playstation)\s([wids3portablevu]+)/i,/(mint)[\/\s\(]?(\w+)*/i,/(mageia|vectorlinux)[;\s]/i,/(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?([\w\.-]+)*/i,/(hurd|linux)\s?([\w\.]+)*/i,/(gnu)\s?([\w\.]+)*/i],[u,d],[/(cros)\s[\w]+\s([\w\.]+\w)/i],[[u,"Chromium OS"],d],[/(sunos)\s?([\w\.]+\d)*/i],[[u,"Solaris"],d],[/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i],[u,d],[/(ip[honead]+)(?:.*os\s*([\w]+)*\slike\smac|;\sopera)/i],[[u,"iOS"],[d,/_/g,"."]],[/(mac\sos\sx)\s?([\w\s\.]+\w)*/i,/(macintosh|mac(?=_powerpc)\s)/i],[[u,"Mac OS"],[d,/_/g,"."]],[/((?:open)?solaris)[\/\s-]?([\w\.]+)*/i,/(haiku)\s(\w+)/i,/(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i,/(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i,/(unix)\s?([\w\.]+)*/i],[u,d]]},E=function(e){var n=e||(window&&window.navigator&&window.navigator.userAgent?window.navigator.userAgent:t);this.getBrowser=function(){return v.rgx.apply(this,y.browser)},this.getEngine=function(){return v.rgx.apply(this,y.engine)},this.getOS=function(){return v.rgx.apply(this,y.os)},this.getResult=function(){return{ua:this.getUA(),browser:this.getBrowser(),engine:this.getEngine(),os:this.getOS()}},this.getUA=function(){return n},this.setUA=function(e){return n=e,this},this.setUA(n)};return E}(),i=function(){var t={define_property:function(){return!1}(),create_canvas:function(){var e=document.createElement("canvas");return!(!e.getContext||!e.getContext("2d"))}(),return_response_type:function(t){try{if(-1!==e.inArray(t,["","text","document"]))return!0;if(window.XMLHttpRequest){var n=new XMLHttpRequest;if(n.open("get","/"),"responseType"in n)return n.responseType=t,n.responseType===t}}catch(i){}return!1},use_data_uri:function(){var e=new Image;return e.onload=function(){t.use_data_uri=1===e.width&&1===e.height},setTimeout(function(){e.src="data:image/gif;base64,R0lGODlhAQABAIAAAP8AAAAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="},1),!1}(),use_data_uri_over32kb:function(){return t.use_data_uri&&("IE"!==o.browser||o.version>=9)},use_data_uri_of:function(e){return t.use_data_uri&&33e3>e||t.use_data_uri_over32kb()},use_fileinput:function(){if(navigator.userAgent.match(/(Android (1.0|1.1|1.5|1.6|2.0|2.1))|(Windows Phone (OS 7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1.0|2.0|2.5|3.0))/))return!1;var e=document.createElement("input");return e.setAttribute("type","file"),!e.disabled}};return function(n){var i=[].slice.call(arguments);return i.shift(),"function"===e.typeOf(t[n])?t[n].apply(this,i):!!t[n]}}(),r=(new n).getResult(),o={can:i,uaParser:n,browser:r.browser.name,version:r.browser.version,os:r.os.name,osVersion:r.os.version,verComp:t,swf_url:"../flash/Moxie.swf",xap_url:"../silverlight/Moxie.xap",global_event_dispatcher:"moxie.core.EventTarget.instance.dispatchEvent"};return o.OS=o.os,o}),i(l,[u],function(e){var t={};return{addI18n:function(n){return e.extend(t,n)},translate:function(e){return t[e]||e},_:function(e){return this.translate(e)},sprintf:function(t){var n=[].slice.call(arguments,1);return t.replace(/%[a-z]/g,function(){var t=n.shift();return"undefined"!==e.typeOf(t)?t:""})}}}),i(d,[u,l],function(e,t){var n="application/msword,doc dot,application/pdf,pdf,application/pgp-signature,pgp,application/postscript,ps ai eps,application/rtf,rtf,application/vnd.ms-excel,xls xlb,application/vnd.ms-powerpoint,ppt pps pot,application/zip,zip,application/x-shockwave-flash,swf swfl,application/vnd.openxmlformats-officedocument.wordprocessingml.document,docx,application/vnd.openxmlformats-officedocument.wordprocessingml.template,dotx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,xlsx,application/vnd.openxmlformats-officedocument.presentationml.presentation,pptx,application/vnd.openxmlformats-officedocument.presentationml.template,potx,application/vnd.openxmlformats-officedocument.presentationml.slideshow,ppsx,application/x-javascript,js,application/json,json,audio/mpeg,mp3 mpga mpega mp2,audio/x-wav,wav,audio/x-m4a,m4a,audio/ogg,oga ogg,audio/aiff,aiff aif,audio/flac,flac,audio/aac,aac,audio/ac3,ac3,audio/x-ms-wma,wma,image/bmp,bmp,image/gif,gif,image/jpeg,jpg jpeg jpe,image/photoshop,psd,image/png,png,image/svg+xml,svg svgz,image/tiff,tiff tif,text/plain,asc txt text diff log,text/html,htm html xhtml,text/css,css,text/csv,csv,text/rtf,rtf,video/mpeg,mpeg mpg mpe m2v,video/quicktime,qt mov,video/mp4,mp4,video/x-m4v,m4v,video/x-flv,flv,video/x-ms-wmv,wmv,video/avi,avi,video/webm,webm,video/3gpp,3gpp 3gp,video/3gpp2,3g2,video/vnd.rn-realvideo,rv,video/ogg,ogv,video/x-matroska,mkv,application/vnd.oasis.opendocument.formula-template,otf,application/octet-stream,exe",i={mimes:{},extensions:{},addMimeType:function(e){var t=e.split(/,/),n,i,r;for(n=0;n<t.length;n+=2){for(r=t[n+1].split(/ /),i=0;i<r.length;i++)this.mimes[r[i]]=t[n];this.extensions[t[n]]=r}},extList2mimes:function(t,n){var i=this,r,o,a,s,u=[];for(o=0;o<t.length;o++)for(r=t[o].extensions.split(/\s*,\s*/),a=0;a<r.length;a++){if("*"===r[a])return[];if(s=i.mimes[r[a]],s&&-1===e.inArray(s,u)&&u.push(s),n&&/^\w+$/.test(r[a]))u.push("."+r[a]);else if(!s)return[]}return u},mimes2exts:function(t){var n=this,i=[];return e.each(t,function(t){if("*"===t)return i=[],!1;var r=t.match(/^(\w+)\/(\*|\w+)$/);r&&("*"===r[2]?e.each(n.extensions,function(e,t){new RegExp("^"+r[1]+"/").test(t)&&[].push.apply(i,n.extensions[t])}):n.extensions[t]&&[].push.apply(i,n.extensions[t]))}),i},mimes2extList:function(n){var i=[],r=[];return"string"===e.typeOf(n)&&(n=e.trim(n).split(/\s*,\s*/)),r=this.mimes2exts(n),i.push({title:t.translate("Files"),extensions:r.length?r.join(","):"*"}),i.mimes=n,i},getFileExtension:function(e){var t=e&&e.match(/\.([^.]+)$/);return t?t[1].toLowerCase():""},getFileMime:function(e){return this.mimes[this.getFileExtension(e)]||""}};return i.addMimeType(n),i}),i(h,[c],function(e){var t=function(e){return"string"!=typeof e?e:document.getElementById(e)},n=function(e,t){if(!e.className)return!1;var n=new RegExp("(^|\\s+)"+t+"(\\s+|$)");return n.test(e.className)},i=function(e,t){n(e,t)||(e.className=e.className?e.className.replace(/\s+$/,"")+" "+t:t)},r=function(e,t){if(e.className){var n=new RegExp("(^|\\s+)"+t+"(\\s+|$)");e.className=e.className.replace(n,function(e,t,n){return" "===t&&" "===n?" ":""})}},o=function(e,t){return e.currentStyle?e.currentStyle[t]:window.getComputedStyle?window.getComputedStyle(e,null)[t]:void 0},a=function(t,n){function i(e){var t,n,i=0,r=0;return e&&(n=e.getBoundingClientRect(),t="CSS1Compat"===s.compatMode?s.documentElement:s.body,i=n.left+t.scrollLeft,r=n.top+t.scrollTop),{x:i,y:r}}var r=0,o=0,a,s=document,u,c;if(t=t,n=n||s.body,t&&t.getBoundingClientRect&&"IE"===e.browser&&(!s.documentMode||s.documentMode<8))return u=i(t),c=i(n),{x:u.x-c.x,y:u.y-c.y};for(a=t;a&&a!=n&&a.nodeType;)r+=a.offsetLeft||0,o+=a.offsetTop||0,a=a.offsetParent;for(a=t.parentNode;a&&a!=n&&a.nodeType;)r-=a.scrollLeft||0,o-=a.scrollTop||0,a=a.parentNode;return{x:r,y:o}},s=function(e){return{w:e.offsetWidth||e.clientWidth,h:e.offsetHeight||e.clientHeight}};return{get:t,hasClass:n,addClass:i,removeClass:r,getStyle:o,getPos:a,getSize:s}}),i(f,[u],function(e){function t(e,t){var n;for(n in e)if(e[n]===t)return n;return null}return{RuntimeError:function(){function n(e){this.code=e,this.name=t(i,e),this.message=this.name+": RuntimeError "+this.code}var i={NOT_INIT_ERR:1,NOT_SUPPORTED_ERR:9,JS_ERR:4};return e.extend(n,i),n.prototype=Error.prototype,n}(),OperationNotAllowedException:function(){function t(e){this.code=e,this.name="OperationNotAllowedException"}return e.extend(t,{NOT_ALLOWED_ERR:1}),t.prototype=Error.prototype,t}(),ImageError:function(){function n(e){this.code=e,this.name=t(i,e),this.message=this.name+": ImageError "+this.code}var i={WRONG_FORMAT:1,MAX_RESOLUTION_ERR:2,INVALID_META_ERR:3};return e.extend(n,i),n.prototype=Error.prototype,n}(),FileException:function(){function n(e){this.code=e,this.name=t(i,e),this.message=this.name+": FileException "+this.code}var i={NOT_FOUND_ERR:1,SECURITY_ERR:2,ABORT_ERR:3,NOT_READABLE_ERR:4,ENCODING_ERR:5,NO_MODIFICATION_ALLOWED_ERR:6,INVALID_STATE_ERR:7,SYNTAX_ERR:8};return e.extend(n,i),n.prototype=Error.prototype,n}(),DOMException:function(){function n(e){this.code=e,this.name=t(i,e),this.message=this.name+": DOMException "+this.code}var i={INDEX_SIZE_ERR:1,DOMSTRING_SIZE_ERR:2,HIERARCHY_REQUEST_ERR:3,WRONG_DOCUMENT_ERR:4,INVALID_CHARACTER_ERR:5,NO_DATA_ALLOWED_ERR:6,NO_MODIFICATION_ALLOWED_ERR:7,NOT_FOUND_ERR:8,NOT_SUPPORTED_ERR:9,INUSE_ATTRIBUTE_ERR:10,INVALID_STATE_ERR:11,SYNTAX_ERR:12,INVALID_MODIFICATION_ERR:13,NAMESPACE_ERR:14,INVALID_ACCESS_ERR:15,VALIDATION_ERR:16,TYPE_MISMATCH_ERR:17,SECURITY_ERR:18,NETWORK_ERR:19,ABORT_ERR:20,URL_MISMATCH_ERR:21,QUOTA_EXCEEDED_ERR:22,TIMEOUT_ERR:23,INVALID_NODE_TYPE_ERR:24,DATA_CLONE_ERR:25};return e.extend(n,i),n.prototype=Error.prototype,n}(),EventException:function(){function t(e){this.code=e,this.name="EventException"}return e.extend(t,{UNSPECIFIED_EVENT_TYPE_ERR:0}),t.prototype=Error.prototype,t}()}}),i(p,[c,f,u],function(e,t,n){function i(){var e={};n.extend(this,{uid:null,init:function(){this.uid||(this.uid=n.guid("uid_"))},addEventListener:function(t,i,r,o){var a=this,s;return this.hasOwnProperty("uid")||(this.uid=n.guid("uid_")),t=n.trim(t),/\s/.test(t)?void n.each(t.split(/\s+/),function(e){a.addEventListener(e,i,r,o)}):(t=t.toLowerCase(),r=parseInt(r,10)||0,s=e[this.uid]&&e[this.uid][t]||[],s.push({fn:i,priority:r,scope:o||this}),e[this.uid]||(e[this.uid]={}),void(e[this.uid][t]=s))},hasEventListener:function(t){var n=t?e[this.uid]&&e[this.uid][t]:e[this.uid];return n?n:!1},removeEventListener:function(t,i){t=t.toLowerCase();var r=e[this.uid]&&e[this.uid][t],o;if(r){if(i){for(o=r.length-1;o>=0;o--)if(r[o].fn===i){r.splice(o,1);break}}else r=[];r.length||(delete e[this.uid][t],n.isEmptyObj(e[this.uid])&&delete e[this.uid])}},removeAllEventListeners:function(){e[this.uid]&&delete e[this.uid]},dispatchEvent:function(i){var r,o,a,s,u={},c=!0,l;if("string"!==n.typeOf(i)){if(s=i,"string"!==n.typeOf(s.type))throw new t.EventException(t.EventException.UNSPECIFIED_EVENT_TYPE_ERR);i=s.type,s.total!==l&&s.loaded!==l&&(u.total=s.total,u.loaded=s.loaded),u.async=s.async||!1}if(-1!==i.indexOf("::")?!function(e){r=e[0],i=e[1]}(i.split("::")):r=this.uid,i=i.toLowerCase(),o=e[r]&&e[r][i]){o.sort(function(e,t){return t.priority-e.priority}),a=[].slice.call(arguments),a.shift(),u.type=i,a.unshift(u);var d=[];n.each(o,function(e){a[0].target=e.scope,u.async?d.push(function(t){setTimeout(function(){t(e.fn.apply(e.scope,a)===!1)},1)}):d.push(function(t){t(e.fn.apply(e.scope,a)===!1)})}),d.length&&n.inSeries(d,function(e){c=!e})}return c},bind:function(){this.addEventListener.apply(this,arguments)},unbind:function(){this.removeEventListener.apply(this,arguments)},unbindAll:function(){this.removeAllEventListeners.apply(this,arguments)},trigger:function(){return this.dispatchEvent.apply(this,arguments)},handleEventProps:function(e){var t=this;this.bind(e.join(" "),function(e){var t="on"+e.type.toLowerCase();"function"===n.typeOf(this[t])&&this[t].apply(this,arguments)}),n.each(e,function(e){e="on"+e.toLowerCase(e),"undefined"===n.typeOf(t[e])&&(t[e]=null)})}})}return i.instance=new i,i}),i(m,[c,u,h,p],function(e,t,n,i){function r(e,i,o,s,u){var c=this,l,d=t.guid(i+"_"),h=u||"browser";e=e||{},a[d]=this,o=t.extend({access_binary:!1,access_image_binary:!1,display_media:!1,do_cors:!1,drag_and_drop:!1,filter_by_extension:!0,resize_image:!1,report_upload_progress:!1,return_response_headers:!1,return_response_type:!1,return_status_code:!0,send_custom_headers:!1,select_file:!1,select_folder:!1,select_multiple:!0,send_binary_string:!1,send_browser_cookies:!0,send_multipart:!0,slice_blob:!1,stream_upload:!1,summon_file_dialog:!1,upload_filesize:!0,use_http_method:!0},o),e.preferred_caps&&(h=r.getMode(s,e.preferred_caps,h)),l=function(){var e={};return{exec:function(t,n,i,r){return l[n]&&(e[t]||(e[t]={context:this,instance:new l[n]}),e[t].instance[i])?e[t].instance[i].apply(this,r):void 0},removeInstance:function(t){delete e[t]},removeAllInstances:function(){var n=this;t.each(e,function(e,i){"function"===t.typeOf(e.instance.destroy)&&e.instance.destroy.call(e.context),n.removeInstance(i)})}}}(),t.extend(this,{initialized:!1,uid:d,type:i,mode:r.getMode(s,e.required_caps,h),shimid:d+"_container",clients:0,options:e,can:function(e,n){var i=arguments[2]||o;if("string"===t.typeOf(e)&&"undefined"===t.typeOf(n)&&(e=r.parseCaps(e)),"object"===t.typeOf(e)){for(var a in e)if(!this.can(a,e[a],i))return!1;return!0}return"function"===t.typeOf(i[e])?i[e].call(this,n):n===i[e]},getShimContainer:function(){var e,i=n.get(this.shimid);return i||(e=this.options.container?n.get(this.options.container):document.body,i=document.createElement("div"),i.id=this.shimid,i.className="moxie-shim moxie-shim-"+this.type,t.extend(i.style,{position:"absolute",top:"0px",left:"0px",width:"1px",height:"1px",overflow:"hidden"}),e.appendChild(i),e=null),i},getShim:function(){return l},shimExec:function(e,t){var n=[].slice.call(arguments,2);return c.getShim().exec.call(this,this.uid,e,t,n)},exec:function(e,t){var n=[].slice.call(arguments,2);return c[e]&&c[e][t]?c[e][t].apply(this,n):c.shimExec.apply(this,arguments)},destroy:function(){if(c){var e=n.get(this.shimid);e&&e.parentNode.removeChild(e),l&&l.removeAllInstances(),this.unbindAll(),delete a[this.uid],this.uid=null,d=c=l=e=null}}}),this.mode&&e.required_caps&&!this.can(e.required_caps)&&(this.mode=!1)}var o={},a={};return r.order="html5,flash,silverlight,html4",r.getRuntime=function(e){return a[e]?a[e]:!1},r.addConstructor=function(e,t){t.prototype=i.instance,o[e]=t},r.getConstructor=function(e){return o[e]||null},r.getInfo=function(e){var t=r.getRuntime(e);return t?{uid:t.uid,type:t.type,mode:t.mode,can:function(){return t.can.apply(t,arguments)}}:null},r.parseCaps=function(e){var n={};return"string"!==t.typeOf(e)?e||{}:(t.each(e.split(","),function(e){n[e]=!0}),n)},r.can=function(e,t){var n,i=r.getConstructor(e),o;return i?(n=new i({required_caps:t}),o=n.mode,n.destroy(),!!o):!1},r.thatCan=function(e,t){var n=(t||r.order).split(/\s*,\s*/);for(var i in n)if(r.can(n[i],e))return n[i];return null},r.getMode=function(e,n,i){var r=null;if("undefined"===t.typeOf(i)&&(i="browser"),n&&!t.isEmptyObj(e)){if(t.each(n,function(n,i){if(e.hasOwnProperty(i)){var o=e[i](n);if("string"==typeof o&&(o=[o]),r){if(!(r=t.arrayIntersect(r,o)))return r=!1}else r=o}}),r)return-1!==t.inArray(i,r)?i:r[0];if(r===!1)return!1}return i},r.capTrue=function(){return!0},r.capFalse=function(){return!1},r.capTest=function(e){return function(){return!!e}},r}),i(g,[c,f,u,m],function(e,t,n,i){return function r(){var e;n.extend(this,{connectRuntime:function(r){function o(n){var s,u;return n.length?(s=n.shift().toLowerCase(),(u=i.getConstructor(s))?(e=new u(r),e.bind("Init",function(){e.initialized=!0,setTimeout(function(){e.clients++,a.trigger("RuntimeInit",e)},1)}),e.bind("Error",function(){e.destroy(),o(n)}),e.mode?void e.init():void e.trigger("Error")):void o(n)):(a.trigger("RuntimeError",new t.RuntimeError(t.RuntimeError.NOT_INIT_ERR)),void(e=null))}var a=this,s;if("string"===n.typeOf(r)?s=r:"string"===n.typeOf(r.ruid)&&(s=r.ruid),s){if(e=i.getRuntime(s))return e.clients++,e;throw new t.RuntimeError(t.RuntimeError.NOT_INIT_ERR)}o((r.runtime_order||i.order).split(/\s*,\s*/))},disconnectRuntime:function(){e&&--e.clients<=0&&e.destroy(),e=null},getRuntime:function(){return e&&e.uid?e:e=null},exec:function(){return e?e.exec.apply(this,arguments):null}})}}),i(v,[u,c,d,h,f,p,l,m,g],function(e,t,n,i,r,o,a,s,u){function c(t){var o=this,c,d,h;if(-1!==e.inArray(e.typeOf(t),["string","node"])&&(t={browse_button:t}),d=i.get(t.browse_button),!d)throw new r.DOMException(r.DOMException.NOT_FOUND_ERR);h={accept:[{title:a.translate("All Files"),extensions:"*"}],name:"file",multiple:!1,required_caps:!1,container:d.parentNode||document.body},t=e.extend({},h,t),"string"==typeof t.required_caps&&(t.required_caps=s.parseCaps(t.required_caps)),"string"==typeof t.accept&&(t.accept=n.mimes2extList(t.accept)),c=i.get(t.container),c||(c=document.body),"static"===i.getStyle(c,"position")&&(c.style.position="relative"),c=d=null,u.call(o),e.extend(o,{uid:e.guid("uid_"),ruid:null,shimid:null,files:null,init:function(){o.bind("RuntimeInit",function(n,r){o.ruid=r.uid,o.shimid=r.shimid,o.bind("Ready",function(){o.trigger("Refresh")},999),o.bind("Refresh",function(){var n,o,a,s;a=i.get(t.browse_button),s=i.get(r.shimid),a&&(n=i.getPos(a,i.get(t.container)),o=i.getSize(a),s&&e.extend(s.style,{top:n.y+"px",left:n.x+"px",width:o.w+"px",height:o.h+"px"})),s=a=null}),r.exec.call(o,"FileInput","init",t)}),o.connectRuntime(e.extend({},t,{required_caps:{select_file:!0}}))},disable:function(t){var n=this.getRuntime();n&&n.exec.call(this,"FileInput","disable","undefined"===e.typeOf(t)?!0:t)},refresh:function(){o.trigger("Refresh")},destroy:function(){var t=this.getRuntime();t&&(t.exec.call(this,"FileInput","destroy"),this.disconnectRuntime()),"array"===e.typeOf(this.files)&&e.each(this.files,function(e){e.destroy()}),this.files=null,this.unbindAll()}}),this.handleEventProps(l)}var l=["ready","change","cancel","mouseenter","mouseleave","mousedown","mouseup"];return c.prototype=o.instance,c}),i(w,[],function(){var e=function(e){return unescape(encodeURIComponent(e))},t=function(e){return decodeURIComponent(escape(e))},n=function(e,n){if("function"==typeof window.atob)return n?t(window.atob(e)):window.atob(e);var i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",r,o,a,s,u,c,l,d,h=0,f=0,p="",m=[];if(!e)return e;e+="";do s=i.indexOf(e.charAt(h++)),u=i.indexOf(e.charAt(h++)),c=i.indexOf(e.charAt(h++)),l=i.indexOf(e.charAt(h++)),d=s<<18|u<<12|c<<6|l,r=d>>16&255,o=d>>8&255,a=255&d,64==c?m[f++]=String.fromCharCode(r):64==l?m[f++]=String.fromCharCode(r,o):m[f++]=String.fromCharCode(r,o,a);while(h<e.length);return p=m.join(""),n?t(p):p},i=function(t,n){if(n&&(t=e(t)),"function"==typeof window.btoa)return window.btoa(t);var i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",r,o,a,s,u,c,l,d,h=0,f=0,p="",m=[];if(!t)return t;do r=t.charCodeAt(h++),o=t.charCodeAt(h++),a=t.charCodeAt(h++),d=r<<16|o<<8|a,s=d>>18&63,u=d>>12&63,c=d>>6&63,l=63&d,m[f++]=i.charAt(s)+i.charAt(u)+i.charAt(c)+i.charAt(l);while(h<t.length);p=m.join("");var g=t.length%3;return(g?p.slice(0,g-3):p)+"===".slice(g||3)};return{utf8_encode:e,utf8_decode:t,atob:n,btoa:i}}),i(y,[u,w,g],function(e,t,n){function i(o,a){function s(t,n,o){var a,s=r[this.uid];return"string"===e.typeOf(s)&&s.length?(a=new i(null,{type:o,size:n-t}),a.detach(s.substr(t,a.size)),a):null}n.call(this),o&&this.connectRuntime(o),a?"string"===e.typeOf(a)&&(a={data:a}):a={},e.extend(this,{uid:a.uid||e.guid("uid_"),ruid:o,size:a.size||0,type:a.type||"",slice:function(e,t,n){return this.isDetached()?s.apply(this,arguments):this.getRuntime().exec.call(this,"Blob","slice",this.getSource(),e,t,n)},getSource:function(){return r[this.uid]?r[this.uid]:null},detach:function(e){if(this.ruid&&(this.getRuntime().exec.call(this,"Blob","destroy"),this.disconnectRuntime(),this.ruid=null),e=e||"","data:"==e.substr(0,5)){var n=e.indexOf(";base64,");this.type=e.substring(5,n),e=t.atob(e.substring(n+8))}this.size=e.length,r[this.uid]=e},isDetached:function(){return!this.ruid&&"string"===e.typeOf(r[this.uid])},destroy:function(){this.detach(),delete r[this.uid]}}),a.data?this.detach(a.data):r[this.uid]=a}var r={};return i}),i(E,[u,d,y],function(e,t,n){function i(i,r){r||(r={}),n.apply(this,arguments),this.type||(this.type=t.getFileMime(r.name));var o;if(r.name)o=r.name.replace(/\\/g,"/"),o=o.substr(o.lastIndexOf("/")+1);else if(this.type){var a=this.type.split("/")[0];o=e.guid((""!==a?a:"file")+"_"),t.extensions[this.type]&&(o+="."+t.extensions[this.type][0])}e.extend(this,{name:o||e.guid("file_"),relativePath:"",lastModifiedDate:r.lastModifiedDate||(new Date).toLocaleString()})}return i.prototype=n.prototype,i}),i(_,[l,h,f,u,c,E,g,p,d],function(e,t,n,i,r,o,a,s,u){function c(n){var r=this,o;"string"==typeof n&&(n={drop_zone:n}),o={accept:[{title:e.translate("All Files"),extensions:"*"}],required_caps:{drag_and_drop:!0}},n="object"==typeof n?i.extend({},o,n):o,n.container=t.get(n.drop_zone)||document.body,"static"===t.getStyle(n.container,"position")&&(n.container.style.position="relative"),"string"==typeof n.accept&&(n.accept=u.mimes2extList(n.accept)),a.call(r),i.extend(r,{uid:i.guid("uid_"),ruid:null,files:null,init:function(){r.bind("RuntimeInit",function(e,t){r.ruid=t.uid,t.exec.call(r,"FileDrop","init",n),r.dispatchEvent("ready")}),r.connectRuntime(n)},destroy:function(){var e=this.getRuntime();e&&(e.exec.call(this,"FileDrop","destroy"),this.disconnectRuntime()),this.files=null,this.unbindAll()}}),this.handleEventProps(l)}var l=["ready","dragenter","dragleave","drop","error"];return c.prototype=s.instance,c}),i(b,[u,w,f,p,y,g],function(e,t,n,i,r,o){function a(){function i(e,i){var o=this;if(this.trigger("loadstart"),this.readyState===a.LOADING)return this.trigger("error",new n.DOMException(n.DOMException.INVALID_STATE_ERR)),void this.trigger("loadend");if(!(i instanceof r))return this.trigger("error",new n.DOMException(n.DOMException.NOT_FOUND_ERR)),void this.trigger("loadend");if(this.result=null,this.readyState=a.LOADING,i.isDetached()){var s=i.getSource();switch(e){case"readAsText":case"readAsBinaryString":this.result=s;break;case"readAsDataURL":this.result="data:"+i.type+";base64,"+t.btoa(s)}this.readyState=a.DONE,this.trigger("load"),this.trigger("loadend")}else this.connectRuntime(i.ruid),this.exec("FileReader","read",e,i)}o.call(this),e.extend(this,{uid:e.guid("uid_"),readyState:a.EMPTY,result:null,error:null,readAsBinaryString:function(e){i.call(this,"readAsBinaryString",e)},readAsDataURL:function(e){i.call(this,"readAsDataURL",e)},readAsText:function(e){i.call(this,"readAsText",e);
},abort:function(){this.result=null,-1===e.inArray(this.readyState,[a.EMPTY,a.DONE])&&(this.readyState===a.LOADING&&(this.readyState=a.DONE),this.exec("FileReader","abort"),this.trigger("abort"),this.trigger("loadend"))},destroy:function(){this.abort(),this.exec("FileReader","destroy"),this.disconnectRuntime(),this.unbindAll()}}),this.handleEventProps(s),this.bind("Error",function(e,t){this.readyState=a.DONE,this.error=t},999),this.bind("Load",function(e){this.readyState=a.DONE},999)}var s=["loadstart","progress","load","abort","error","loadend"];return a.EMPTY=0,a.LOADING=1,a.DONE=2,a.prototype=i.instance,a}),i(x,[],function(){var e=function(t,n){for(var i=["source","scheme","authority","userInfo","user","pass","host","port","relative","path","directory","file","query","fragment"],r=i.length,o={http:80,https:443},a={},s=/^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@\/]*):?([^:@\/]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\\?([^#]*))?(?:#(.*))?)/,u=s.exec(t||"");r--;)u[r]&&(a[i[r]]=u[r]);if(!a.scheme){n&&"string"!=typeof n||(n=e(n||document.location.href)),a.scheme=n.scheme,a.host=n.host,a.port=n.port;var c="";/^[^\/]/.test(a.path)&&(c=n.path,c=/\/[^\/]*\.[^\/]*$/.test(c)?c.replace(/\/[^\/]+$/,"/"):c.replace(/\/?$/,"/")),a.path=c+(a.path||"")}return a.port||(a.port=o[a.scheme]||80),a.port=parseInt(a.port,10),a.path||(a.path="/"),delete a.source,a},t=function(t){var n={http:80,https:443},i="object"==typeof t?t:e(t);return i.scheme+"://"+i.host+(i.port!==n[i.scheme]?":"+i.port:"")+i.path+(i.query?i.query:"")},n=function(t){function n(e){return[e.scheme,e.host,e.port].join("/")}return"string"==typeof t&&(t=e(t)),n(e())===n(t)};return{parseUrl:e,resolveUrl:t,hasSameOrigin:n}}),i(R,[u,g,p],function(e,t,n){function i(){this.uid=e.guid("uid_"),t.call(this),this.destroy=function(){this.disconnectRuntime(),this.unbindAll()}}return i.prototype=n.instance,i}),i(A,[u,g,w],function(e,t,n){return function(){function i(e,t){if(!t.isDetached()){var i=this.connectRuntime(t.ruid).exec.call(this,"FileReaderSync","read",e,t);return this.disconnectRuntime(),i}var r=t.getSource();switch(e){case"readAsBinaryString":return r;case"readAsDataURL":return"data:"+t.type+";base64,"+n.btoa(r);case"readAsText":for(var o="",a=0,s=r.length;s>a;a++)o+=String.fromCharCode(r[a]);return o}}t.call(this),e.extend(this,{uid:e.guid("uid_"),readAsBinaryString:function(e){return i.call(this,"readAsBinaryString",e)},readAsDataURL:function(e){return i.call(this,"readAsDataURL",e)},readAsText:function(e){return i.call(this,"readAsText",e)}})}}),i(I,[f,u,y],function(e,t,n){function i(){var e,i=[];t.extend(this,{append:function(r,o){var a=this,s=t.typeOf(o);o instanceof n?e={name:r,value:o}:"array"===s?(r+="[]",t.each(o,function(e){a.append(r,e)})):"object"===s?t.each(o,function(e,t){a.append(r+"["+t+"]",e)}):"null"===s||"undefined"===s||"number"===s&&isNaN(o)?a.append(r,"false"):i.push({name:r,value:o.toString()})},hasBlob:function(){return!!this.getBlob()},getBlob:function(){return e&&e.value||null},getBlobName:function(){return e&&e.name||null},each:function(n){t.each(i,function(e){n(e.value,e.name)}),e&&n(e.value,e.name)},destroy:function(){e=null,i=[]}})}return i}),i(T,[u,f,p,w,x,m,R,y,A,I,c,d],function(e,t,n,i,r,o,a,s,u,c,l,d){function h(){this.uid=e.guid("uid_")}function f(){function n(e,t){return w.hasOwnProperty(e)?1===arguments.length?l.can("define_property")?w[e]:v[e]:void(l.can("define_property")?w[e]=t:v[e]=t):void 0}function u(t){function i(){B&&(B.destroy(),B=null),s.dispatchEvent("loadend"),s=null}function r(r){B.bind("LoadStart",function(e){n("readyState",f.LOADING),s.dispatchEvent("readystatechange"),s.dispatchEvent(e),O&&s.upload.dispatchEvent(e)}),B.bind("Progress",function(e){n("readyState")!==f.LOADING&&(n("readyState",f.LOADING),s.dispatchEvent("readystatechange")),s.dispatchEvent(e)}),B.bind("UploadProgress",function(e){O&&s.upload.dispatchEvent({type:"progress",lengthComputable:!1,total:e.total,loaded:e.loaded})}),B.bind("Load",function(t){n("readyState",f.DONE),n("status",Number(r.exec.call(B,"XMLHttpRequest","getStatus")||0)),n("statusText",p[n("status")]||""),n("response",r.exec.call(B,"XMLHttpRequest","getResponse",n("responseType"))),~e.inArray(n("responseType"),["text",""])?n("responseText",n("response")):"document"===n("responseType")&&n("responseXML",n("response")),k=r.exec.call(B,"XMLHttpRequest","getAllResponseHeaders"),s.dispatchEvent("readystatechange"),n("status")>0?(O&&s.upload.dispatchEvent(t),s.dispatchEvent(t)):(N=!0,s.dispatchEvent("error")),i()}),B.bind("Abort",function(e){s.dispatchEvent(e),i()}),B.bind("Error",function(e){N=!0,n("readyState",f.DONE),s.dispatchEvent("readystatechange"),D=!0,s.dispatchEvent(e),i()}),r.exec.call(B,"XMLHttpRequest","send",{url:E,method:_,async:y,user:x,password:R,headers:b,mimeType:I,encoding:A,responseType:s.responseType,withCredentials:s.withCredentials,options:H},t)}var s=this;C=(new Date).getTime(),B=new a,"string"==typeof H.required_caps&&(H.required_caps=o.parseCaps(H.required_caps)),H.required_caps=e.extend({},H.required_caps,{return_response_type:s.responseType}),t instanceof c&&(H.required_caps.send_multipart=!0),e.isEmptyObj(b)||(H.required_caps.send_custom_headers=!0),L||(H.required_caps.do_cors=!0),H.ruid?r(B.connectRuntime(H)):(B.bind("RuntimeInit",function(e,t){r(t)}),B.bind("RuntimeError",function(e,t){s.dispatchEvent("RuntimeError",t)}),B.connectRuntime(H))}function g(){n("responseText",""),n("responseXML",null),n("response",null),n("status",0),n("statusText",""),C=M=null}var v=this,w={timeout:0,readyState:f.UNSENT,withCredentials:!1,status:0,statusText:"",responseType:"",responseXML:null,responseText:null,response:null},y=!0,E,_,b={},x,R,A=null,I=null,T=!1,S=!1,O=!1,D=!1,N=!1,L=!1,C,M,F=null,P=null,H={},B,k="",U;e.extend(this,w,{uid:e.guid("uid_"),upload:new h,open:function(o,a,s,u,c){var l;if(!o||!a)throw new t.DOMException(t.DOMException.SYNTAX_ERR);if(/[\u0100-\uffff]/.test(o)||i.utf8_encode(o)!==o)throw new t.DOMException(t.DOMException.SYNTAX_ERR);if(~e.inArray(o.toUpperCase(),["CONNECT","DELETE","GET","HEAD","OPTIONS","POST","PUT","TRACE","TRACK"])&&(_=o.toUpperCase()),~e.inArray(_,["CONNECT","TRACE","TRACK"]))throw new t.DOMException(t.DOMException.SECURITY_ERR);if(a=i.utf8_encode(a),l=r.parseUrl(a),L=r.hasSameOrigin(l),E=r.resolveUrl(a),(u||c)&&!L)throw new t.DOMException(t.DOMException.INVALID_ACCESS_ERR);if(x=u||l.user,R=c||l.pass,y=s||!0,y===!1&&(n("timeout")||n("withCredentials")||""!==n("responseType")))throw new t.DOMException(t.DOMException.INVALID_ACCESS_ERR);T=!y,S=!1,b={},g.call(this),n("readyState",f.OPENED),this.dispatchEvent("readystatechange")},setRequestHeader:function(r,o){var a=["accept-charset","accept-encoding","access-control-request-headers","access-control-request-method","connection","content-length","cookie","cookie2","content-transfer-encoding","date","expect","host","keep-alive","origin","referer","te","trailer","transfer-encoding","upgrade","user-agent","via"];if(n("readyState")!==f.OPENED||S)throw new t.DOMException(t.DOMException.INVALID_STATE_ERR);if(/[\u0100-\uffff]/.test(r)||i.utf8_encode(r)!==r)throw new t.DOMException(t.DOMException.SYNTAX_ERR);return r=e.trim(r).toLowerCase(),~e.inArray(r,a)||/^(proxy\-|sec\-)/.test(r)?!1:(b[r]?b[r]+=", "+o:b[r]=o,!0)},getAllResponseHeaders:function(){return k||""},getResponseHeader:function(t){return t=t.toLowerCase(),N||~e.inArray(t,["set-cookie","set-cookie2"])?null:k&&""!==k&&(U||(U={},e.each(k.split(/\r\n/),function(t){var n=t.split(/:\s+/);2===n.length&&(n[0]=e.trim(n[0]),U[n[0].toLowerCase()]={header:n[0],value:e.trim(n[1])})})),U.hasOwnProperty(t))?U[t].header+": "+U[t].value:null},overrideMimeType:function(i){var r,o;if(~e.inArray(n("readyState"),[f.LOADING,f.DONE]))throw new t.DOMException(t.DOMException.INVALID_STATE_ERR);if(i=e.trim(i.toLowerCase()),/;/.test(i)&&(r=i.match(/^([^;]+)(?:;\scharset\=)?(.*)$/))&&(i=r[1],r[2]&&(o=r[2])),!d.mimes[i])throw new t.DOMException(t.DOMException.SYNTAX_ERR);F=i,P=o},send:function(n,r){if(H="string"===e.typeOf(r)?{ruid:r}:r?r:{},this.readyState!==f.OPENED||S)throw new t.DOMException(t.DOMException.INVALID_STATE_ERR);if(n instanceof s)H.ruid=n.ruid,I=n.type||"application/octet-stream";else if(n instanceof c){if(n.hasBlob()){var o=n.getBlob();H.ruid=o.ruid,I=o.type||"application/octet-stream"}}else"string"==typeof n&&(A="UTF-8",I="text/plain;charset=UTF-8",n=i.utf8_encode(n));this.withCredentials||(this.withCredentials=H.required_caps&&H.required_caps.send_browser_cookies&&!L),O=!T&&this.upload.hasEventListener(),N=!1,D=!n,T||(S=!0),u.call(this,n)},abort:function(){if(N=!0,T=!1,~e.inArray(n("readyState"),[f.UNSENT,f.OPENED,f.DONE]))n("readyState",f.UNSENT);else{if(n("readyState",f.DONE),S=!1,!B)throw new t.DOMException(t.DOMException.INVALID_STATE_ERR);B.getRuntime().exec.call(B,"XMLHttpRequest","abort",D),D=!0}},destroy:function(){B&&("function"===e.typeOf(B.destroy)&&B.destroy(),B=null),this.unbindAll(),this.upload&&(this.upload.unbindAll(),this.upload=null)}}),this.handleEventProps(m.concat(["readystatechange"])),this.upload.handleEventProps(m)}var p={100:"Continue",101:"Switching Protocols",102:"Processing",200:"OK",201:"Created",202:"Accepted",203:"Non-Authoritative Information",204:"No Content",205:"Reset Content",206:"Partial Content",207:"Multi-Status",226:"IM Used",300:"Multiple Choices",301:"Moved Permanently",302:"Found",303:"See Other",304:"Not Modified",305:"Use Proxy",306:"Reserved",307:"Temporary Redirect",400:"Bad Request",401:"Unauthorized",402:"Payment Required",403:"Forbidden",404:"Not Found",405:"Method Not Allowed",406:"Not Acceptable",407:"Proxy Authentication Required",408:"Request Timeout",409:"Conflict",410:"Gone",411:"Length Required",412:"Precondition Failed",413:"Request Entity Too Large",414:"Request-URI Too Long",415:"Unsupported Media Type",416:"Requested Range Not Satisfiable",417:"Expectation Failed",422:"Unprocessable Entity",423:"Locked",424:"Failed Dependency",426:"Upgrade Required",500:"Internal Server Error",501:"Not Implemented",502:"Bad Gateway",503:"Service Unavailable",504:"Gateway Timeout",505:"HTTP Version Not Supported",506:"Variant Also Negotiates",507:"Insufficient Storage",510:"Not Extended"};h.prototype=n.instance;var m=["loadstart","progress","abort","error","load","timeout","loadend"],g=1,v=2;return f.UNSENT=0,f.OPENED=1,f.HEADERS_RECEIVED=2,f.LOADING=3,f.DONE=4,f.prototype=n.instance,f}),i(S,[u,w,g,p],function(e,t,n,i){function r(){function i(){l=d=0,c=this.result=null}function o(t,n){var i=this;u=n,i.bind("TransportingProgress",function(t){d=t.loaded,l>d&&-1===e.inArray(i.state,[r.IDLE,r.DONE])&&a.call(i)},999),i.bind("TransportingComplete",function(){d=l,i.state=r.DONE,c=null,i.result=u.exec.call(i,"Transporter","getAsBlob",t||"")},999),i.state=r.BUSY,i.trigger("TransportingStarted"),a.call(i)}function a(){var e=this,n,i=l-d;h>i&&(h=i),n=t.btoa(c.substr(d,h)),u.exec.call(e,"Transporter","receive",n,l)}var s,u,c,l,d,h;n.call(this),e.extend(this,{uid:e.guid("uid_"),state:r.IDLE,result:null,transport:function(t,n,r){var a=this;if(r=e.extend({chunk_size:204798},r),(s=r.chunk_size%3)&&(r.chunk_size+=3-s),h=r.chunk_size,i.call(this),c=t,l=t.length,"string"===e.typeOf(r)||r.ruid)o.call(a,n,this.connectRuntime(r));else{var u=function(e,t){a.unbind("RuntimeInit",u),o.call(a,n,t)};this.bind("RuntimeInit",u),this.connectRuntime(r)}},abort:function(){var e=this;e.state=r.IDLE,u&&(u.exec.call(e,"Transporter","clear"),e.trigger("TransportingAborted")),i.call(e)},destroy:function(){this.unbindAll(),u=null,this.disconnectRuntime(),i.call(this)}})}return r.IDLE=0,r.BUSY=1,r.DONE=2,r.prototype=i.instance,r}),i(O,[u,h,f,A,T,m,g,S,c,p,y,E,w],function(e,t,n,i,r,o,a,s,u,c,l,d,h){function f(){function i(e){e||(e=this.exec("Image","getInfo")),this.size=e.size,this.width=e.width,this.height=e.height,this.type=e.type,this.meta=e.meta,""===this.name&&(this.name=e.name)}function c(t){var i=e.typeOf(t);try{if(t instanceof f){if(!t.size)throw new n.DOMException(n.DOMException.INVALID_STATE_ERR);m.apply(this,arguments)}else if(t instanceof l){if(!~e.inArray(t.type,["image/jpeg","image/png"]))throw new n.ImageError(n.ImageError.WRONG_FORMAT);g.apply(this,arguments)}else if(-1!==e.inArray(i,["blob","file"]))c.call(this,new d(null,t),arguments[1]);else if("string"===i)"data:"===t.substr(0,5)?c.call(this,new l(null,{data:t}),arguments[1]):v.apply(this,arguments);else{if("node"!==i||"img"!==t.nodeName.toLowerCase())throw new n.DOMException(n.DOMException.TYPE_MISMATCH_ERR);c.call(this,t.src,arguments[1])}}catch(r){this.trigger("error",r.code)}}function m(t,n){var i=this.connectRuntime(t.ruid);this.ruid=i.uid,i.exec.call(this,"Image","loadFromImage",t,"undefined"===e.typeOf(n)?!0:n)}function g(t,n){function i(e){r.ruid=e.uid,e.exec.call(r,"Image","loadFromBlob",t)}var r=this;r.name=t.name||"",t.isDetached()?(this.bind("RuntimeInit",function(e,t){i(t)}),n&&"string"==typeof n.required_caps&&(n.required_caps=o.parseCaps(n.required_caps)),this.connectRuntime(e.extend({required_caps:{access_image_binary:!0,resize_image:!0}},n))):i(this.connectRuntime(t.ruid))}function v(e,t){var n=this,i;i=new r,i.open("get",e),i.responseType="blob",i.onprogress=function(e){n.trigger(e)},i.onload=function(){g.call(n,i.response,!0)},i.onerror=function(e){n.trigger(e)},i.onloadend=function(){i.destroy()},i.bind("RuntimeError",function(e,t){n.trigger("RuntimeError",t)}),i.send(null,t)}a.call(this),e.extend(this,{uid:e.guid("uid_"),ruid:null,name:"",size:0,width:0,height:0,type:"",meta:{},clone:function(){this.load.apply(this,arguments)},load:function(){c.apply(this,arguments)},downsize:function(t){var i={width:this.width,height:this.height,type:this.type||"image/jpeg",quality:90,crop:!1,preserveHeaders:!0,resample:!1};t="object"==typeof t?e.extend(i,t):e.extend(i,{width:arguments[0],height:arguments[1],crop:arguments[2],preserveHeaders:arguments[3]});try{if(!this.size)throw new n.DOMException(n.DOMException.INVALID_STATE_ERR);if(this.width>f.MAX_RESIZE_WIDTH||this.height>f.MAX_RESIZE_HEIGHT)throw new n.ImageError(n.ImageError.MAX_RESOLUTION_ERR);this.exec("Image","downsize",t.width,t.height,t.crop,t.preserveHeaders)}catch(r){this.trigger("error",r.code)}},crop:function(e,t,n){this.downsize(e,t,!0,n)},getAsCanvas:function(){if(!u.can("create_canvas"))throw new n.RuntimeError(n.RuntimeError.NOT_SUPPORTED_ERR);var e=this.connectRuntime(this.ruid);return e.exec.call(this,"Image","getAsCanvas")},getAsBlob:function(e,t){if(!this.size)throw new n.DOMException(n.DOMException.INVALID_STATE_ERR);return this.exec("Image","getAsBlob",e||"image/jpeg",t||90)},getAsDataURL:function(e,t){if(!this.size)throw new n.DOMException(n.DOMException.INVALID_STATE_ERR);return this.exec("Image","getAsDataURL",e||"image/jpeg",t||90)},getAsBinaryString:function(e,t){var n=this.getAsDataURL(e,t);return h.atob(n.substring(n.indexOf("base64,")+7))},embed:function(i,r){function o(t,r){var o=this;if(u.can("create_canvas")){var l=o.getAsCanvas();if(l)return i.appendChild(l),l=null,o.destroy(),void a.trigger("embedded")}var d=o.getAsDataURL(t,r);if(!d)throw new n.ImageError(n.ImageError.WRONG_FORMAT);if(u.can("use_data_uri_of",d.length))i.innerHTML='<img src="'+d+'" width="'+o.width+'" height="'+o.height+'" />',o.destroy(),a.trigger("embedded");else{var f=new s;f.bind("TransportingComplete",function(){c=a.connectRuntime(this.result.ruid),a.bind("Embedded",function(){e.extend(c.getShimContainer().style,{top:"0px",left:"0px",width:o.width+"px",height:o.height+"px"}),c=null},999),c.exec.call(a,"ImageView","display",this.result.uid,width,height),o.destroy()}),f.transport(h.atob(d.substring(d.indexOf("base64,")+7)),t,{required_caps:{display_media:!0},runtime_order:"flash,silverlight",container:i})}}var a=this,c;r=e.extend({width:this.width,height:this.height,type:this.type||"image/jpeg",quality:90},r||{});try{if(!(i=t.get(i)))throw new n.DOMException(n.DOMException.INVALID_NODE_TYPE_ERR);if(!this.size)throw new n.DOMException(n.DOMException.INVALID_STATE_ERR);this.width>f.MAX_RESIZE_WIDTH||this.height>f.MAX_RESIZE_HEIGHT;var l=new f;return l.bind("Resize",function(){o.call(this,r.type,r.quality)}),l.bind("Load",function(){l.downsize(r)}),this.meta.thumb&&this.meta.thumb.width>=r.width&&this.meta.thumb.height>=r.height?l.load(this.meta.thumb.data):l.clone(this,!1),l}catch(d){this.trigger("error",d.code)}},destroy:function(){this.ruid&&(this.getRuntime().exec.call(this,"Image","destroy"),this.disconnectRuntime()),this.unbindAll()}}),this.handleEventProps(p),this.bind("Load Resize",function(){i.call(this)},999)}var p=["progress","load","error","resize","embedded"];return f.MAX_RESIZE_WIDTH=8192,f.MAX_RESIZE_HEIGHT=8192,f.prototype=c.instance,f}),i(D,[u,f,m,c],function(e,t,n,i){function r(t){var r=this,s=n.capTest,u=n.capTrue,c=e.extend({access_binary:s(window.FileReader||window.File&&window.File.getAsDataURL),access_image_binary:function(){return r.can("access_binary")&&!!a.Image},display_media:s(i.can("create_canvas")||i.can("use_data_uri_over32kb")),do_cors:s(window.XMLHttpRequest&&"withCredentials"in new XMLHttpRequest),drag_and_drop:s(function(){var e=document.createElement("div");return("draggable"in e||"ondragstart"in e&&"ondrop"in e)&&("IE"!==i.browser||i.verComp(i.version,9,">"))}()),filter_by_extension:s(function(){return"Chrome"===i.browser&&i.verComp(i.version,28,">=")||"IE"===i.browser&&i.verComp(i.version,10,">=")||"Safari"===i.browser&&i.verComp(i.version,7,">=")}()),return_response_headers:u,return_response_type:function(e){return"json"===e&&window.JSON?!0:i.can("return_response_type",e)},return_status_code:u,report_upload_progress:s(window.XMLHttpRequest&&(new XMLHttpRequest).upload),resize_image:function(){return r.can("access_binary")&&i.can("create_canvas")},select_file:function(){return i.can("use_fileinput")&&window.File},select_folder:function(){return r.can("select_file")&&"Chrome"===i.browser&&i.verComp(i.version,21,">=")},select_multiple:function(){return r.can("select_file")&&!("Safari"===i.browser&&"Windows"===i.os)&&!("iOS"===i.os&&i.verComp(i.osVersion,"7.0.0",">")&&i.verComp(i.osVersion,"8.0.0","<"))},send_binary_string:s(window.XMLHttpRequest&&((new XMLHttpRequest).sendAsBinary||window.Uint8Array&&window.ArrayBuffer)),send_custom_headers:s(window.XMLHttpRequest),send_multipart:function(){return!!(window.XMLHttpRequest&&(new XMLHttpRequest).upload&&window.FormData)||r.can("send_binary_string")},slice_blob:s(window.File&&(File.prototype.mozSlice||File.prototype.webkitSlice||File.prototype.slice)),stream_upload:function(){return r.can("slice_blob")&&r.can("send_multipart")},summon_file_dialog:function(){return r.can("select_file")&&("Firefox"===i.browser&&i.verComp(i.version,4,">=")||"Opera"===i.browser&&i.verComp(i.version,12,">=")||"IE"===i.browser&&i.verComp(i.version,10,">=")||!!~e.inArray(i.browser,["Chrome","Safari"]))},upload_filesize:u},arguments[2]);n.call(this,t,arguments[1]||o,c),e.extend(this,{init:function(){this.trigger("Init")},destroy:function(e){return function(){e.call(r),e=r=null}}(this.destroy)}),e.extend(this.getShim(),a)}var o="html5",a={};return n.addConstructor(o,r),a}),i(N,[u],function(e){function t(){this.returnValue=!1}function n(){this.cancelBubble=!0}var i={},r="moxie_"+e.guid(),o=function(o,a,s,u){var c,l;a=a.toLowerCase(),o.addEventListener?(c=s,o.addEventListener(a,c,!1)):o.attachEvent&&(c=function(){var e=window.event;e.target||(e.target=e.srcElement),e.preventDefault=t,e.stopPropagation=n,s(e)},o.attachEvent("on"+a,c)),o[r]||(o[r]=e.guid()),i.hasOwnProperty(o[r])||(i[o[r]]={}),l=i[o[r]],l.hasOwnProperty(a)||(l[a]=[]),l[a].push({func:c,orig:s,key:u})},a=function(t,n,o){var a,s;if(n=n.toLowerCase(),t[r]&&i[t[r]]&&i[t[r]][n]){a=i[t[r]][n];for(var u=a.length-1;u>=0&&(a[u].orig!==o&&a[u].key!==o||(t.removeEventListener?t.removeEventListener(n,a[u].func,!1):t.detachEvent&&t.detachEvent("on"+n,a[u].func),a[u].orig=null,a[u].func=null,a.splice(u,1),o===s));u--);if(a.length||delete i[t[r]][n],e.isEmptyObj(i[t[r]])){delete i[t[r]];try{delete t[r]}catch(c){t[r]=s}}}},s=function(t,n){t&&t[r]&&e.each(i[t[r]],function(e,i){a(t,i,n)})};return{addEvent:o,removeEvent:a,removeAllEvents:s}}),i(L,[D,E,u,h,N,d,c],function(e,t,n,i,r,o,a){function s(){var e;n.extend(this,{init:function(s){var u=this,c=u.getRuntime(),l,d,h,f,p,m;e=s,h=e.accept.mimes||o.extList2mimes(e.accept,c.can("filter_by_extension")),d=c.getShimContainer(),d.innerHTML='<input id="'+c.uid+'" type="file" style="font-size:999px;opacity:0;"'+(e.multiple&&c.can("select_multiple")?"multiple":"")+(e.directory&&c.can("select_folder")?"webkitdirectory directory":"")+(h?' accept="'+h.join(",")+'"':"")+" />",l=i.get(c.uid),n.extend(l.style,{position:"absolute",top:0,left:0,width:"100%",height:"100%"}),f=i.get(e.browse_button),c.can("summon_file_dialog")&&("static"===i.getStyle(f,"position")&&(f.style.position="relative"),p=parseInt(i.getStyle(f,"z-index"),10)||1,f.style.zIndex=p,d.style.zIndex=p-1,r.addEvent(f,"click",function(e){var t=i.get(c.uid);t&&!t.disabled&&t.click(),e.preventDefault()},u.uid)),m=c.can("summon_file_dialog")?f:d,r.addEvent(m,"mouseover",function(){u.trigger("mouseenter")},u.uid),r.addEvent(m,"mouseout",function(){u.trigger("mouseleave")},u.uid),r.addEvent(m,"mousedown",function(){u.trigger("mousedown")},u.uid),r.addEvent(i.get(e.container),"mouseup",function(){u.trigger("mouseup")},u.uid),l.onchange=function g(i){if(u.files=[],n.each(this.files,function(n){var i="";return e.directory&&"."==n.name?!0:(n.webkitRelativePath&&(i="/"+n.webkitRelativePath.replace(/^\//,"")),n=new t(c.uid,n),n.relativePath=i,void u.files.push(n))}),"IE"!==a.browser&&"IEMobile"!==a.browser)this.value="";else{var r=this.cloneNode(!0);this.parentNode.replaceChild(r,this),r.onchange=g}u.files.length&&u.trigger("change")},u.trigger({type:"ready",async:!0}),d=null},disable:function(e){var t=this.getRuntime(),n;(n=i.get(t.uid))&&(n.disabled=!!e)},destroy:function(){var t=this.getRuntime(),n=t.getShim(),o=t.getShimContainer();r.removeAllEvents(o,this.uid),r.removeAllEvents(e&&i.get(e.container),this.uid),r.removeAllEvents(e&&i.get(e.browse_button),this.uid),o&&(o.innerHTML=""),n.removeInstance(this.uid),e=o=n=null}})}return e.FileInput=s}),i(C,[D,y],function(e,t){function n(){function e(e,t,n){var i;if(!window.File.prototype.slice)return(i=window.File.prototype.webkitSlice||window.File.prototype.mozSlice)?i.call(e,t,n):null;try{return e.slice(),e.slice(t,n)}catch(r){return e.slice(t,n-t)}}this.slice=function(){return new t(this.getRuntime().uid,e.apply(this,arguments))}}return e.Blob=n}),i(M,[D,E,u,h,N,d],function(e,t,n,i,r,o){function a(){function e(e){if(!e.dataTransfer||!e.dataTransfer.types)return!1;var t=n.toArray(e.dataTransfer.types||[]);return-1!==n.inArray("Files",t)||-1!==n.inArray("public.file-url",t)||-1!==n.inArray("application/x-moz-file",t)}function a(e,n){if(u(e)){var i=new t(g,e);i.relativePath=n||"",f.push(i)}}function s(e){for(var t=[],i=0;i<e.length;i++)[].push.apply(t,e[i].extensions.split(/\s*,\s*/));return-1===n.inArray("*",t)?t:[]}function u(e){if(!p.length)return!0;var t=o.getFileExtension(e.name);return!t||-1!==n.inArray(t,p)}function c(e,t){var i=[];n.each(e,function(e){var t=e.webkitGetAsEntry();t&&(t.isFile?a(e.getAsFile(),t.fullPath):i.push(t))}),i.length?l(i,t):t()}function l(e,t){var i=[];n.each(e,function(e){i.push(function(t){d(e,t)})}),n.inSeries(i,function(){t()})}function d(e,t){e.isFile?e.file(function(n){a(n,e.fullPath),t()},function(){t()}):e.isDirectory?h(e,t):t()}function h(e,t){function n(e){r.readEntries(function(t){t.length?([].push.apply(i,t),n(e)):e()},e)}var i=[],r=e.createReader();n(function(){l(i,t)})}var f=[],p=[],m,g;n.extend(this,{init:function(t){var i=this,o;m=t,g=i.ruid,p=s(m.accept),o=m.container,r.addEvent(o,"dragover",function(t){e(t)&&(t.preventDefault(),t.dataTransfer.dropEffect="copy")},i.uid),r.addEvent(o,"drop",function(t){e(t)&&(t.preventDefault(),f=[],t.dataTransfer.items&&t.dataTransfer.items[0].webkitGetAsEntry?c(t.dataTransfer.items,function(){i.files=f,i.trigger("drop")}):(n.each(t.dataTransfer.files,function(e){a(e)}),i.files=f,i.trigger("drop")))},i.uid),r.addEvent(o,"dragenter",function(e){i.trigger("dragenter")},i.uid),r.addEvent(o,"dragleave",function(e){i.trigger("dragleave")},i.uid)},destroy:function(){r.removeAllEvents(m&&i.get(m.container),this.uid),g=f=p=m=null}})}return e.FileDrop=a}),i(F,[D,w,u],function(e,t,n){function i(){function e(e){return t.atob(e.substring(e.indexOf("base64,")+7))}var i,r=!1;n.extend(this,{read:function(t,o){var a=this;a.result="",i=new window.FileReader,i.addEventListener("progress",function(e){a.trigger(e)}),i.addEventListener("load",function(t){a.result=r?e(i.result):i.result,a.trigger(t)}),i.addEventListener("error",function(e){a.trigger(e,i.error)}),i.addEventListener("loadend",function(e){i=null,a.trigger(e)}),"function"===n.typeOf(i[t])?(r=!1,i[t](o.getSource())):"readAsBinaryString"===t&&(r=!0,i.readAsDataURL(o.getSource()))},abort:function(){i&&i.abort()},destroy:function(){i=null}})}return e.FileReader=i}),i(P,[D,u,d,x,E,y,I,f,c],function(e,t,n,i,r,o,a,s,u){function c(){function e(e,t){var n=this,i,r;i=t.getBlob().getSource(),r=new window.FileReader,r.onload=function(){t.append(t.getBlobName(),new o(null,{type:i.type,data:r.result})),h.send.call(n,e,t)},r.readAsBinaryString(i)}function c(){return!window.XMLHttpRequest||"IE"===u.browser&&u.verComp(u.version,8,"<")?function(){for(var e=["Msxml2.XMLHTTP.6.0","Microsoft.XMLHTTP"],t=0;t<e.length;t++)try{return new ActiveXObject(e[t])}catch(n){}}():new window.XMLHttpRequest}function l(e){var t=e.responseXML,n=e.responseText;return"IE"===u.browser&&n&&t&&!t.documentElement&&/[^\/]+\/[^\+]+\+xml/.test(e.getResponseHeader("Content-Type"))&&(t=new window.ActiveXObject("Microsoft.XMLDOM"),t.async=!1,t.validateOnParse=!1,t.loadXML(n)),t&&("IE"===u.browser&&0!==t.parseError||!t.documentElement||"parsererror"===t.documentElement.tagName)?null:t}function d(e){var t="----moxieboundary"+(new Date).getTime(),n="--",i="\r\n",r="",a=this.getRuntime();if(!a.can("send_binary_string"))throw new s.RuntimeError(s.RuntimeError.NOT_SUPPORTED_ERR);return f.setRequestHeader("Content-Type","multipart/form-data; boundary="+t),e.each(function(e,a){r+=e instanceof o?n+t+i+'Content-Disposition: form-data; name="'+a+'"; filename="'+unescape(encodeURIComponent(e.name||"blob"))+'"'+i+"Content-Type: "+(e.type||"application/octet-stream")+i+i+e.getSource()+i:n+t+i+'Content-Disposition: form-data; name="'+a+'"'+i+i+unescape(encodeURIComponent(e))+i}),r+=n+t+n+i}var h=this,f,p;t.extend(this,{send:function(n,r){var s=this,l="Mozilla"===u.browser&&u.verComp(u.version,4,">=")&&u.verComp(u.version,7,"<"),h="Android Browser"===u.browser,m=!1;if(p=n.url.replace(/^.+?\/([\w\-\.]+)$/,"$1").toLowerCase(),f=c(),f.open(n.method,n.url,n.async,n.user,n.password),r instanceof o)r.isDetached()&&(m=!0),r=r.getSource();else if(r instanceof a){if(r.hasBlob())if(r.getBlob().isDetached())r=d.call(s,r),m=!0;else if((l||h)&&"blob"===t.typeOf(r.getBlob().getSource())&&window.FileReader)return void e.call(s,n,r);if(r instanceof a){var g=new window.FormData;r.each(function(e,t){e instanceof o?g.append(t,e.getSource()):g.append(t,e)}),r=g}}f.upload?(n.withCredentials&&(f.withCredentials=!0),f.addEventListener("load",function(e){s.trigger(e)}),f.addEventListener("error",function(e){s.trigger(e)}),f.addEventListener("progress",function(e){s.trigger(e)}),f.upload.addEventListener("progress",function(e){s.trigger({type:"UploadProgress",loaded:e.loaded,total:e.total})})):f.onreadystatechange=function v(){switch(f.readyState){case 1:break;case 2:break;case 3:var e,t;try{i.hasSameOrigin(n.url)&&(e=f.getResponseHeader("Content-Length")||0),f.responseText&&(t=f.responseText.length)}catch(r){e=t=0}s.trigger({type:"progress",lengthComputable:!!e,total:parseInt(e,10),loaded:t});break;case 4:f.onreadystatechange=function(){},0===f.status?s.trigger("error"):s.trigger("load")}},t.isEmptyObj(n.headers)||t.each(n.headers,function(e,t){f.setRequestHeader(t,e)}),""!==n.responseType&&"responseType"in f&&("json"!==n.responseType||u.can("return_response_type","json")?f.responseType=n.responseType:f.responseType="text"),m?f.sendAsBinary?f.sendAsBinary(r):!function(){for(var e=new Uint8Array(r.length),t=0;t<r.length;t++)e[t]=255&r.charCodeAt(t);f.send(e.buffer)}():f.send(r),s.trigger("loadstart")},getStatus:function(){try{if(f)return f.status}catch(e){}return 0},getResponse:function(e){var t=this.getRuntime();try{switch(e){case"blob":var i=new r(t.uid,f.response),o=f.getResponseHeader("Content-Disposition");if(o){var a=o.match(/filename=([\'\"'])([^\1]+)\1/);a&&(p=a[2])}return i.name=p,i.type||(i.type=n.getFileMime(p)),i;case"json":return u.can("return_response_type","json")?f.response:200===f.status&&window.JSON?JSON.parse(f.responseText):null;case"document":return l(f);default:return""!==f.responseText?f.responseText:null}}catch(s){return null}},getAllResponseHeaders:function(){try{return f.getAllResponseHeaders()}catch(e){}return""},abort:function(){f&&f.abort()},destroy:function(){h=p=null}})}return e.XMLHttpRequest=c}),i(H,[u],function(e){function t(e){e instanceof ArrayBuffer?n.apply(this,arguments):i.apply(this,arguments)}function n(t){var n=new DataView(t);e.extend(this,{readByteAt:function(e){return n.getUint8(e)},writeByteAt:function(e,t){n.setUint8(e,t)},SEGMENT:function(e,i,r){switch(arguments.length){case 2:return t.slice(e,e+i);case 1:return t.slice(e);case 3:if(null===r&&(r=new ArrayBuffer),r instanceof ArrayBuffer){var o=new Uint8Array(this.length()-i+r.byteLength);e>0&&o.set(new Uint8Array(t.slice(0,e)),0),o.set(new Uint8Array(r),e),o.set(new Uint8Array(t.slice(e+i)),e+r.byteLength),this.clear(),t=o.buffer,n=new DataView(t);break}default:return t}},length:function(){return t?t.byteLength:0},clear:function(){n=t=null}})}function i(t){function n(e,n,i){i=3===arguments.length?i:t.length-n-1,t=t.substr(0,n)+e+t.substr(i+n)}e.extend(this,{readByteAt:function(e){return t.charCodeAt(e)},writeByteAt:function(e,t){n(String.fromCharCode(t),e,1)},SEGMENT:function(e,i,r){switch(arguments.length){case 1:return t.substr(e);case 2:return t.substr(e,i);case 3:n(null!==r?r:"",e,i);break;default:return t}},length:function(){return t?t.length:0},clear:function(){t=null}})}return e.extend(t.prototype,{littleEndian:!1,read:function(e,t){var n,i,r;if(e+t>this.length())throw new Error("You are trying to read outside the source boundaries.");for(i=this.littleEndian?0:-8*(t-1),r=0,n=0;t>r;r++)n|=this.readByteAt(e+r)<<Math.abs(i+8*r);return n},write:function(e,t,n){var i,r,o="";if(e>this.length())throw new Error("You are trying to write outside the source boundaries.");for(i=this.littleEndian?0:-8*(n-1),r=0;n>r;r++)this.writeByteAt(e+r,t>>Math.abs(i+8*r)&255)},BYTE:function(e){return this.read(e,1)},SHORT:function(e){return this.read(e,2)},LONG:function(e){return this.read(e,4)},SLONG:function(e){var t=this.read(e,4);return t>2147483647?t-4294967296:t},CHAR:function(e){return String.fromCharCode(this.read(e,1))},STRING:function(e,t){return this.asArray("CHAR",e,t).join("")},asArray:function(e,t,n){for(var i=[],r=0;n>r;r++)i[r]=this[e](t+r);return i}}),t}),i(B,[H,f],function(e,t){return function n(i){var r=[],o,a,s,u=0;if(o=new e(i),65496!==o.SHORT(0))throw o.clear(),new t.ImageError(t.ImageError.WRONG_FORMAT);for(a=2;a<=o.length();)if(s=o.SHORT(a),s>=65488&&65495>=s)a+=2;else{if(65498===s||65497===s)break;u=o.SHORT(a+2)+2,s>=65505&&65519>=s&&r.push({hex:s,name:"APP"+(15&s),start:a,length:u,segment:o.SEGMENT(a,u)}),a+=u}return o.clear(),{headers:r,restore:function(t){var n,i,o;for(o=new e(t),a=65504==o.SHORT(2)?4+o.SHORT(4):2,i=0,n=r.length;n>i;i++)o.SEGMENT(a,0,r[i].segment),a+=r[i].length;return t=o.SEGMENT(),o.clear(),t},strip:function(t){var i,r,o,a;for(o=new n(t),r=o.headers,o.purge(),i=new e(t),a=r.length;a--;)i.SEGMENT(r[a].start,r[a].length,"");return t=i.SEGMENT(),i.clear(),t},get:function(e){for(var t=[],n=0,i=r.length;i>n;n++)r[n].name===e.toUpperCase()&&t.push(r[n].segment);
return t},set:function(e,t){var n=[],i,o,a;for("string"==typeof t?n.push(t):n=t,i=o=0,a=r.length;a>i&&(r[i].name===e.toUpperCase()&&(r[i].segment=n[o],r[i].length=n[o].length,o++),!(o>=n.length));i++);},purge:function(){this.headers=r=[]}}}}),i(k,[u,H,f],function(e,n,i){function r(o){function a(n,r){var o=this,a,s,u,c,h,f,p,m,g=[],v={},w={1:"BYTE",7:"UNDEFINED",2:"ASCII",3:"SHORT",4:"LONG",5:"RATIONAL",9:"SLONG",10:"SRATIONAL"},y={BYTE:1,UNDEFINED:1,ASCII:1,SHORT:2,LONG:4,RATIONAL:8,SLONG:4,SRATIONAL:8};for(a=o.SHORT(n),s=0;a>s;s++)if(g=[],p=n+2+12*s,u=r[o.SHORT(p)],u!==t){if(c=w[o.SHORT(p+=2)],h=o.LONG(p+=2),f=y[c],!f)throw new i.ImageError(i.ImageError.INVALID_META_ERR);if(p+=4,f*h>4&&(p=o.LONG(p)+d.tiffHeader),p+f*h>=this.length())throw new i.ImageError(i.ImageError.INVALID_META_ERR);"ASCII"!==c?(g=o.asArray(c,p,h),m=1==h?g[0]:g,l.hasOwnProperty(u)&&"object"!=typeof m?v[u]=l[u][m]:v[u]=m):v[u]=e.trim(o.STRING(p,h).replace(/\0$/,""))}return v}function s(e,t,n){var i,r,o,a=0;if("string"==typeof t){var s=c[e.toLowerCase()];for(var u in s)if(s[u]===t){t=u;break}}i=d[e.toLowerCase()+"IFD"],r=this.SHORT(i);for(var l=0;r>l;l++)if(o=i+12*l+2,this.SHORT(o)==t){a=o+8;break}if(!a)return!1;try{this.write(a,n,4)}catch(h){return!1}return!0}var u,c,l,d,h,f;if(n.call(this,o),c={tiff:{274:"Orientation",270:"ImageDescription",271:"Make",272:"Model",305:"Software",34665:"ExifIFDPointer",34853:"GPSInfoIFDPointer"},exif:{36864:"ExifVersion",40961:"ColorSpace",40962:"PixelXDimension",40963:"PixelYDimension",36867:"DateTimeOriginal",33434:"ExposureTime",33437:"FNumber",34855:"ISOSpeedRatings",37377:"ShutterSpeedValue",37378:"ApertureValue",37383:"MeteringMode",37384:"LightSource",37385:"Flash",37386:"FocalLength",41986:"ExposureMode",41987:"WhiteBalance",41990:"SceneCaptureType",41988:"DigitalZoomRatio",41992:"Contrast",41993:"Saturation",41994:"Sharpness"},gps:{0:"GPSVersionID",1:"GPSLatitudeRef",2:"GPSLatitude",3:"GPSLongitudeRef",4:"GPSLongitude"},thumb:{513:"JPEGInterchangeFormat",514:"JPEGInterchangeFormatLength"}},l={ColorSpace:{1:"sRGB",0:"Uncalibrated"},MeteringMode:{0:"Unknown",1:"Average",2:"CenterWeightedAverage",3:"Spot",4:"MultiSpot",5:"Pattern",6:"Partial",255:"Other"},LightSource:{1:"Daylight",2:"Fliorescent",3:"Tungsten",4:"Flash",9:"Fine weather",10:"Cloudy weather",11:"Shade",12:"Daylight fluorescent (D 5700 - 7100K)",13:"Day white fluorescent (N 4600 -5400K)",14:"Cool white fluorescent (W 3900 - 4500K)",15:"White fluorescent (WW 3200 - 3700K)",17:"Standard light A",18:"Standard light B",19:"Standard light C",20:"D55",21:"D65",22:"D75",23:"D50",24:"ISO studio tungsten",255:"Other"},Flash:{0:"Flash did not fire",1:"Flash fired",5:"Strobe return light not detected",7:"Strobe return light detected",9:"Flash fired, compulsory flash mode",13:"Flash fired, compulsory flash mode, return light not detected",15:"Flash fired, compulsory flash mode, return light detected",16:"Flash did not fire, compulsory flash mode",24:"Flash did not fire, auto mode",25:"Flash fired, auto mode",29:"Flash fired, auto mode, return light not detected",31:"Flash fired, auto mode, return light detected",32:"No flash function",65:"Flash fired, red-eye reduction mode",69:"Flash fired, red-eye reduction mode, return light not detected",71:"Flash fired, red-eye reduction mode, return light detected",73:"Flash fired, compulsory flash mode, red-eye reduction mode",77:"Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",79:"Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",89:"Flash fired, auto mode, red-eye reduction mode",93:"Flash fired, auto mode, return light not detected, red-eye reduction mode",95:"Flash fired, auto mode, return light detected, red-eye reduction mode"},ExposureMode:{0:"Auto exposure",1:"Manual exposure",2:"Auto bracket"},WhiteBalance:{0:"Auto white balance",1:"Manual white balance"},SceneCaptureType:{0:"Standard",1:"Landscape",2:"Portrait",3:"Night scene"},Contrast:{0:"Normal",1:"Soft",2:"Hard"},Saturation:{0:"Normal",1:"Low saturation",2:"High saturation"},Sharpness:{0:"Normal",1:"Soft",2:"Hard"},GPSLatitudeRef:{N:"North latitude",S:"South latitude"},GPSLongitudeRef:{E:"East longitude",W:"West longitude"}},d={tiffHeader:10},h=d.tiffHeader,u={clear:this.clear},e.extend(this,{read:function(){try{return r.prototype.read.apply(this,arguments)}catch(e){throw new i.ImageError(i.ImageError.INVALID_META_ERR)}},write:function(){try{return r.prototype.write.apply(this,arguments)}catch(e){throw new i.ImageError(i.ImageError.INVALID_META_ERR)}},UNDEFINED:function(){return this.BYTE.apply(this,arguments)},RATIONAL:function(e){return this.LONG(e)/this.LONG(e+4)},SRATIONAL:function(e){return this.SLONG(e)/this.SLONG(e+4)},ASCII:function(e){return this.CHAR(e)},TIFF:function(){return f||null},EXIF:function(){var t=null;if(d.exifIFD){try{t=a.call(this,d.exifIFD,c.exif)}catch(n){return null}if(t.ExifVersion&&"array"===e.typeOf(t.ExifVersion)){for(var i=0,r="";i<t.ExifVersion.length;i++)r+=String.fromCharCode(t.ExifVersion[i]);t.ExifVersion=r}}return t},GPS:function(){var t=null;if(d.gpsIFD){try{t=a.call(this,d.gpsIFD,c.gps)}catch(n){return null}t.GPSVersionID&&"array"===e.typeOf(t.GPSVersionID)&&(t.GPSVersionID=t.GPSVersionID.join("."))}return t},thumb:function(){if(d.IFD1)try{var e=a.call(this,d.IFD1,c.thumb);if("JPEGInterchangeFormat"in e)return this.SEGMENT(d.tiffHeader+e.JPEGInterchangeFormat,e.JPEGInterchangeFormatLength)}catch(t){}return null},setExif:function(e,t){return"PixelXDimension"!==e&&"PixelYDimension"!==e?!1:s.call(this,"exif",e,t)},clear:function(){u.clear(),o=c=l=f=d=u=null}}),65505!==this.SHORT(0)||"EXIF\x00"!==this.STRING(4,5).toUpperCase())throw new i.ImageError(i.ImageError.INVALID_META_ERR);if(this.littleEndian=18761==this.SHORT(h),42!==this.SHORT(h+=2))throw new i.ImageError(i.ImageError.INVALID_META_ERR);d.IFD0=d.tiffHeader+this.LONG(h+=2),f=a.call(this,d.IFD0,c.tiff),"ExifIFDPointer"in f&&(d.exifIFD=d.tiffHeader+f.ExifIFDPointer,delete f.ExifIFDPointer),"GPSInfoIFDPointer"in f&&(d.gpsIFD=d.tiffHeader+f.GPSInfoIFDPointer,delete f.GPSInfoIFDPointer),e.isEmptyObj(f)&&(f=null);var p=this.LONG(d.IFD0+12*this.SHORT(d.IFD0)+2);p&&(d.IFD1=d.tiffHeader+p)}return r.prototype=n.prototype,r}),i(U,[u,f,B,H,k],function(e,t,n,i,r){function o(o){function a(e){var t=0,n,i;for(e||(e=c);t<=e.length();){if(n=e.SHORT(t+=2),n>=65472&&65475>=n)return t+=5,{height:e.SHORT(t),width:e.SHORT(t+=2)};i=e.SHORT(t+=2),t+=i-2}return null}function s(){var e=d.thumb(),t,n;return e&&(t=new i(e),n=a(t),t.clear(),n)?(n.data=e,n):null}function u(){d&&l&&c&&(d.clear(),l.purge(),c.clear(),h=l=d=c=null)}var c,l,d,h;if(c=new i(o),65496!==c.SHORT(0))throw new t.ImageError(t.ImageError.WRONG_FORMAT);l=new n(o);try{d=new r(l.get("app1")[0])}catch(f){}h=a.call(this),e.extend(this,{type:"image/jpeg",size:c.length(),width:h&&h.width||0,height:h&&h.height||0,setExif:function(t,n){return d?("object"===e.typeOf(t)?e.each(t,function(e,t){d.setExif(t,e)}):d.setExif(t,n),void l.set("app1",d.SEGMENT())):!1},writeHeaders:function(){return arguments.length?l.restore(arguments[0]):l.restore(o)},stripHeaders:function(e){return l.strip(e)},purge:function(){u.call(this)}}),d&&(this.meta={tiff:d.TIFF(),exif:d.EXIF(),gps:d.GPS(),thumb:s()})}return o}),i(G,[f,u,H],function(e,t,n){function i(i){function r(){var e,t;return e=a.call(this,8),"IHDR"==e.type?(t=e.start,{width:s.LONG(t),height:s.LONG(t+=4)}):null}function o(){s&&(s.clear(),i=l=u=c=s=null)}function a(e){var t,n,i,r;return t=s.LONG(e),n=s.STRING(e+=4,4),i=e+=4,r=s.LONG(e+t),{length:t,type:n,start:i,CRC:r}}var s,u,c,l;s=new n(i),function(){var t=0,n=0,i=[35152,20039,3338,6666];for(n=0;n<i.length;n++,t+=2)if(i[n]!=s.SHORT(t))throw new e.ImageError(e.ImageError.WRONG_FORMAT)}(),l=r.call(this),t.extend(this,{type:"image/png",size:s.length(),width:l.width,height:l.height,purge:function(){o.call(this)}}),o.call(this)}return i}),i(z,[u,f,U,G],function(e,t,n,i){return function(r){var o=[n,i],a;a=function(){for(var e=0;e<o.length;e++)try{return new o[e](r)}catch(n){}throw new t.ImageError(t.ImageError.WRONG_FORMAT)}(),e.extend(this,{type:"",size:0,width:0,height:0,setExif:function(){},writeHeaders:function(e){return e},stripHeaders:function(e){return e},purge:function(){r=null}}),e.extend(this,a),this.purge=function(){a.purge(),a=null}}}),i(q,[],function(){function e(e,i,r){var o=e.naturalWidth,a=e.naturalHeight,s=r.width,u=r.height,c=r.x||0,l=r.y||0,d=i.getContext("2d");t(e)&&(o/=2,a/=2);var h=1024,f=document.createElement("canvas");f.width=f.height=h;for(var p=f.getContext("2d"),m=n(e,o,a),g=0;a>g;){for(var v=g+h>a?a-g:h,w=0;o>w;){var y=w+h>o?o-w:h;p.clearRect(0,0,h,h),p.drawImage(e,-w,-g);var E=w*s/o+c<<0,_=Math.ceil(y*s/o),b=g*u/a/m+l<<0,x=Math.ceil(v*u/a/m);d.drawImage(f,0,0,y,v,E,b,_,x),w+=h}g+=h}f=p=null}function t(e){var t=e.naturalWidth,n=e.naturalHeight;if(t*n>1048576){var i=document.createElement("canvas");i.width=i.height=1;var r=i.getContext("2d");return r.drawImage(e,-t+1,0),0===r.getImageData(0,0,1,1).data[3]}return!1}function n(e,t,n){var i=document.createElement("canvas");i.width=1,i.height=n;var r=i.getContext("2d");r.drawImage(e,0,0);for(var o=r.getImageData(0,0,1,n).data,a=0,s=n,u=n;u>a;){var c=o[4*(u-1)+3];0===c?s=u:a=u,u=s+a>>1}i=null;var l=u/n;return 0===l?1:l}return{isSubsampled:t,renderTo:e}}),i(j,[D,u,f,w,y,E,z,q,d,c],function(e,t,n,i,r,o,a,s,u,c){function l(){function e(){if(!_&&!y)throw new n.ImageError(n.DOMException.INVALID_STATE_ERR);return _||y}function l(e){return i.atob(e.substring(e.indexOf("base64,")+7))}function d(e,t){return"data:"+(t||"")+";base64,"+i.btoa(e)}function h(e){var t=this;y=new Image,y.onerror=function(){v.call(this),t.trigger("error",n.ImageError.WRONG_FORMAT)},y.onload=function(){t.trigger("load")},y.src="data:"==e.substr(0,5)?e:d(e,x.type)}function f(e,t){var i=this,r;return window.FileReader?(r=new FileReader,r.onload=function(){t(this.result)},r.onerror=function(){i.trigger("error",n.ImageError.WRONG_FORMAT)},r.readAsDataURL(e),void 0):t(e.getAsDataURL())}function p(n,i,r,o){var a=this,s,u,c=0,l=0,d,h,f,p;if(A=o,p=this.meta&&this.meta.tiff&&this.meta.tiff.Orientation||1,-1!==t.inArray(p,[5,6,7,8])){var v=n;n=i,i=v}return d=e(),r?(n=Math.min(n,d.width),i=Math.min(i,d.height),s=Math.max(n/d.width,i/d.height)):s=Math.min(n/d.width,i/d.height),s>1&&!r&&o?void this.trigger("Resize"):(_||(_=document.createElement("canvas")),h=Math.round(d.width*s),f=Math.round(d.height*s),r?(_.width=n,_.height=i,h>n&&(c=Math.round((h-n)/2)),f>i&&(l=Math.round((f-i)/2))):(_.width=h,_.height=f),A||g(_.width,_.height,p),m.call(this,d,_,-c,-l,h,f),this.width=_.width,this.height=_.height,R=!0,void a.trigger("Resize"))}function m(e,t,n,i,r,o){if("iOS"===c.OS)s.renderTo(e,t,{width:r,height:o,x:n,y:i});else{var a=t.getContext("2d");a.drawImage(e,n,i,r,o)}}function g(e,t,n){switch(n){case 5:case 6:case 7:case 8:_.width=t,_.height=e;break;default:_.width=e,_.height=t}var i=_.getContext("2d");switch(n){case 2:i.translate(e,0),i.scale(-1,1);break;case 3:i.translate(e,t),i.rotate(Math.PI);break;case 4:i.translate(0,t),i.scale(1,-1);break;case 5:i.rotate(.5*Math.PI),i.scale(1,-1);break;case 6:i.rotate(.5*Math.PI),i.translate(0,-t);break;case 7:i.rotate(.5*Math.PI),i.translate(e,-t),i.scale(-1,1);break;case 8:i.rotate(-.5*Math.PI),i.translate(-e,0)}}function v(){E&&(E.purge(),E=null),b=y=_=x=null,R=!1}var w=this,y,E,_,b,x,R=!1,A=!0;t.extend(this,{loadFromBlob:function(e){var t=this,i=t.getRuntime(),r=arguments.length>1?arguments[1]:!0;if(!i.can("access_binary"))throw new n.RuntimeError(n.RuntimeError.NOT_SUPPORTED_ERR);return x=e,e.isDetached()?(b=e.getSource(),void h.call(this,b)):void f.call(this,e.getSource(),function(e){r&&(b=l(e)),h.call(t,e)})},loadFromImage:function(e,t){this.meta=e.meta,x=new o(null,{name:e.name,size:e.size,type:e.type}),h.call(this,t?b=e.getAsBinaryString():e.getAsDataURL())},getInfo:function(){var t=this.getRuntime(),n;return!E&&b&&t.can("access_image_binary")&&(E=new a(b)),n={width:e().width||0,height:e().height||0,type:x.type||u.getFileMime(x.name),size:b&&b.length||x.size||0,name:x.name||"",meta:E&&E.meta||this.meta||{}},!n.meta||!n.meta.thumb||n.meta.thumb.data instanceof r||(n.meta.thumb.data=new r(null,{type:"image/jpeg",data:n.meta.thumb.data})),n},downsize:function(){p.apply(this,arguments)},getAsCanvas:function(){return _&&(_.id=this.uid+"_canvas"),_},getAsBlob:function(e,t){return e!==this.type&&p.call(this,this.width,this.height,!1),new o(null,{name:x.name||"",type:e,data:w.getAsBinaryString.call(this,e,t)})},getAsDataURL:function(e){var t=arguments[1]||90;if(!R)return y.src;if("image/jpeg"!==e)return _.toDataURL("image/png");try{return _.toDataURL("image/jpeg",t/100)}catch(n){return _.toDataURL("image/jpeg")}},getAsBinaryString:function(e,t){if(!R)return b||(b=l(w.getAsDataURL(e,t))),b;if("image/jpeg"!==e)b=l(w.getAsDataURL(e,t));else{var n;t||(t=90);try{n=_.toDataURL("image/jpeg",t/100)}catch(i){n=_.toDataURL("image/jpeg")}b=l(n),E&&(b=E.stripHeaders(b),A&&(E.meta&&E.meta.exif&&E.setExif({PixelXDimension:this.width,PixelYDimension:this.height}),b=E.writeHeaders(b)),E.purge(),E=null)}return R=!1,b},destroy:function(){w=null,v.call(this),this.getRuntime().getShim().removeInstance(this.uid)}})}return e.Image=l}),i(X,[u,c,h,f,m],function(e,t,n,i,r){function o(){var e;try{e=navigator.plugins["Shockwave Flash"],e=e.description}catch(t){try{e=new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version")}catch(n){e="0.0"}}return e=e.match(/\d+/g),parseFloat(e[0]+"."+e[1])}function a(e){var i=n.get(e);i&&"OBJECT"==i.nodeName&&("IE"===t.browser?(i.style.display="none",function r(){4==i.readyState?s(e):setTimeout(r,10)}()):i.parentNode.removeChild(i))}function s(e){var t=n.get(e);if(t){for(var i in t)"function"==typeof t[i]&&(t[i]=null);t.parentNode.removeChild(t)}}function u(s){var u=this,d;s=e.extend({swf_url:t.swf_url},s),r.call(this,s,c,{access_binary:function(e){return e&&"browser"===u.mode},access_image_binary:function(e){return e&&"browser"===u.mode},display_media:r.capTrue,do_cors:r.capTrue,drag_and_drop:!1,report_upload_progress:function(){return"client"===u.mode},resize_image:r.capTrue,return_response_headers:!1,return_response_type:function(t){return"json"===t&&window.JSON?!0:!e.arrayDiff(t,["","text","document"])||"browser"===u.mode},return_status_code:function(t){return"browser"===u.mode||!e.arrayDiff(t,[200,404])},select_file:r.capTrue,select_multiple:r.capTrue,send_binary_string:function(e){return e&&"browser"===u.mode},send_browser_cookies:function(e){return e&&"browser"===u.mode},send_custom_headers:function(e){return e&&"browser"===u.mode},send_multipart:r.capTrue,slice_blob:function(e){return e&&"browser"===u.mode},stream_upload:function(e){return e&&"browser"===u.mode},summon_file_dialog:!1,upload_filesize:function(t){return e.parseSizeStr(t)<=2097152||"client"===u.mode},use_http_method:function(t){return!e.arrayDiff(t,["GET","POST"])}},{access_binary:function(e){return e?"browser":"client"},access_image_binary:function(e){return e?"browser":"client"},report_upload_progress:function(e){return e?"browser":"client"},return_response_type:function(t){return e.arrayDiff(t,["","text","json","document"])?"browser":["client","browser"]},return_status_code:function(t){return e.arrayDiff(t,[200,404])?"browser":["client","browser"]},send_binary_string:function(e){return e?"browser":"client"},send_browser_cookies:function(e){return e?"browser":"client"},send_custom_headers:function(e){return e?"browser":"client"},stream_upload:function(e){return e?"client":"browser"},upload_filesize:function(t){return e.parseSizeStr(t)>=2097152?"client":"browser"}},"client"),o()<10&&(this.mode=!1),e.extend(this,{getShim:function(){return n.get(this.uid)},shimExec:function(e,t){var n=[].slice.call(arguments,2);return u.getShim().exec(this.uid,e,t,n)},init:function(){var n,r,o;o=this.getShimContainer(),e.extend(o.style,{position:"absolute",top:"-8px",left:"-8px",width:"9px",height:"9px",overflow:"hidden"}),n='<object id="'+this.uid+'" type="application/x-shockwave-flash" data="'+s.swf_url+'" ',"IE"===t.browser&&(n+='classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" '),n+='width="100%" height="100%" style="outline:0"><param name="movie" value="'+s.swf_url+'" /><param name="flashvars" value="uid='+escape(this.uid)+"&target="+t.global_event_dispatcher+'" /><param name="wmode" value="transparent" /><param name="allowscriptaccess" value="always" /></object>',"IE"===t.browser?(r=document.createElement("div"),o.appendChild(r),r.outerHTML=n,r=o=null):o.innerHTML=n,d=setTimeout(function(){u&&!u.initialized&&u.trigger("Error",new i.RuntimeError(i.RuntimeError.NOT_INIT_ERR))},5e3)},destroy:function(e){return function(){a(u.uid),e.call(u),clearTimeout(d),s=d=e=u=null}}(this.destroy)},l)}var c="flash",l={};return r.addConstructor(c,u),l}),i(V,[X,E,u],function(e,t,n){var i={init:function(e){var i=this,r=this.getRuntime();this.bind("Change",function(){var e=r.shimExec.call(i,"FileInput","getFiles");i.files=[],n.each(e,function(e){i.files.push(new t(r.uid,e))})},999),this.getRuntime().shimExec.call(this,"FileInput","init",{name:e.name,accept:e.accept,multiple:e.multiple}),this.trigger("ready")}};return e.FileInput=i}),i(W,[X,y],function(e,t){var n={slice:function(e,n,i,r){var o=this.getRuntime();return 0>n?n=Math.max(e.size+n,0):n>0&&(n=Math.min(n,e.size)),0>i?i=Math.max(e.size+i,0):i>0&&(i=Math.min(i,e.size)),e=o.shimExec.call(this,"Blob","slice",n,i,r||""),e&&(e=new t(o.uid,e)),e}};return e.Blob=n}),i(Y,[X,w],function(e,t){function n(e,n){switch(n){case"readAsText":return t.atob(e,"utf8");case"readAsBinaryString":return t.atob(e);case"readAsDataURL":return e}return null}var i={read:function(e,t){var i=this;return i.result="","readAsDataURL"===e&&(i.result="data:"+(t.type||"")+";base64,"),i.bind("Progress",function(t,r){r&&(i.result+=n(r,e))},999),i.getRuntime().shimExec.call(this,"FileReader","readAsBase64",t.uid)}};return e.FileReader=i}),i($,[X,w],function(e,t){function n(e,n){switch(n){case"readAsText":return t.atob(e,"utf8");case"readAsBinaryString":return t.atob(e);case"readAsDataURL":return e}return null}var i={read:function(e,t){var i,r=this.getRuntime();return(i=r.shimExec.call(this,"FileReaderSync","readAsBase64",t.uid))?("readAsDataURL"===e&&(i="data:"+(t.type||"")+";base64,"+i),n(i,e,t.type)):null}};return e.FileReaderSync=i}),i(J,[X,u,y,E,A,I,S],function(e,t,n,i,r,o,a){var s={send:function(e,i){function r(){e.transport=l.mode,l.shimExec.call(c,"XMLHttpRequest","send",e,i)}function s(e,t){l.shimExec.call(c,"XMLHttpRequest","appendBlob",e,t.uid),i=null,r()}function u(e,t){var n=new a;n.bind("TransportingComplete",function(){t(this.result)}),n.transport(e.getSource(),e.type,{ruid:l.uid})}var c=this,l=c.getRuntime();if(t.isEmptyObj(e.headers)||t.each(e.headers,function(e,t){l.shimExec.call(c,"XMLHttpRequest","setRequestHeader",t,e.toString())}),i instanceof o){var d;if(i.each(function(e,t){e instanceof n?d=t:l.shimExec.call(c,"XMLHttpRequest","append",t,e)}),i.hasBlob()){var h=i.getBlob();h.isDetached()?u(h,function(e){h.destroy(),s(d,e)}):s(d,h)}else i=null,r()}else i instanceof n?i.isDetached()?u(i,function(e){i.destroy(),i=e.uid,r()}):(i=i.uid,r()):r()},getResponse:function(e){var n,o,a=this.getRuntime();if(o=a.shimExec.call(this,"XMLHttpRequest","getResponseAsBlob")){if(o=new i(a.uid,o),"blob"===e)return o;try{if(n=new r,~t.inArray(e,["","text"]))return n.readAsText(o);if("json"===e&&window.JSON)return JSON.parse(n.readAsText(o))}finally{o.destroy()}}return null},abort:function(e){var t=this.getRuntime();t.shimExec.call(this,"XMLHttpRequest","abort"),this.dispatchEvent("readystatechange"),this.dispatchEvent("abort")}};return e.XMLHttpRequest=s}),i(Z,[X,y],function(e,t){var n={getAsBlob:function(e){var n=this.getRuntime(),i=n.shimExec.call(this,"Transporter","getAsBlob",e);return i?new t(n.uid,i):null}};return e.Transporter=n}),i(K,[X,u,S,y,A],function(e,t,n,i,r){var o={loadFromBlob:function(e){function t(e){r.shimExec.call(i,"Image","loadFromBlob",e.uid),i=r=null}var i=this,r=i.getRuntime();if(e.isDetached()){var o=new n;o.bind("TransportingComplete",function(){t(o.result.getSource())}),o.transport(e.getSource(),e.type,{ruid:r.uid})}else t(e.getSource())},loadFromImage:function(e){var t=this.getRuntime();return t.shimExec.call(this,"Image","loadFromImage",e.uid)},getInfo:function(){var e=this.getRuntime(),t=e.shimExec.call(this,"Image","getInfo");return!t.meta||!t.meta.thumb||t.meta.thumb.data instanceof i||(t.meta.thumb.data=new i(e.uid,t.meta.thumb.data)),t},getAsBlob:function(e,t){var n=this.getRuntime(),r=n.shimExec.call(this,"Image","getAsBlob",e,t);return r?new i(n.uid,r):null},getAsDataURL:function(){var e=this.getRuntime(),t=e.Image.getAsBlob.apply(this,arguments),n;return t?(n=new r,n.readAsDataURL(t)):null}};return e.Image=o}),i(Q,[u,c,h,f,m],function(e,t,n,i,r){function o(e){var t=!1,n=null,i,r,o,a,s,u=0;try{try{n=new ActiveXObject("AgControl.AgControl"),n.IsVersionSupported(e)&&(t=!0),n=null}catch(c){var l=navigator.plugins["Silverlight Plug-In"];if(l){for(i=l.description,"1.0.30226.2"===i&&(i="2.0.30226.2"),r=i.split(".");r.length>3;)r.pop();for(;r.length<4;)r.push(0);for(o=e.split(".");o.length>4;)o.pop();do a=parseInt(o[u],10),s=parseInt(r[u],10),u++;while(u<o.length&&a===s);s>=a&&!isNaN(a)&&(t=!0)}}}catch(d){t=!1}return t}function a(a){var c=this,l;a=e.extend({xap_url:t.xap_url},a),r.call(this,a,s,{access_binary:r.capTrue,access_image_binary:r.capTrue,display_media:r.capTrue,do_cors:r.capTrue,drag_and_drop:!1,report_upload_progress:r.capTrue,resize_image:r.capTrue,return_response_headers:function(e){return e&&"client"===c.mode},return_response_type:function(e){return"json"!==e?!0:!!window.JSON},return_status_code:function(t){return"client"===c.mode||!e.arrayDiff(t,[200,404])},select_file:r.capTrue,select_multiple:r.capTrue,send_binary_string:r.capTrue,send_browser_cookies:function(e){return e&&"browser"===c.mode},send_custom_headers:function(e){return e&&"client"===c.mode},send_multipart:r.capTrue,slice_blob:r.capTrue,stream_upload:!0,summon_file_dialog:!1,upload_filesize:r.capTrue,use_http_method:function(t){return"client"===c.mode||!e.arrayDiff(t,["GET","POST"])}},{return_response_headers:function(e){return e?"client":"browser"},return_status_code:function(t){return e.arrayDiff(t,[200,404])?"client":["client","browser"]},send_browser_cookies:function(e){return e?"browser":"client"},send_custom_headers:function(e){return e?"client":"browser"},use_http_method:function(t){return e.arrayDiff(t,["GET","POST"])?"client":["client","browser"]}}),o("2.0.31005.0")&&"Opera"!==t.browser||(this.mode=!1),e.extend(this,{getShim:function(){return n.get(this.uid).content.Moxie},shimExec:function(e,t){var n=[].slice.call(arguments,2);return c.getShim().exec(this.uid,e,t,n)},init:function(){var e;e=this.getShimContainer(),e.innerHTML='<object id="'+this.uid+'" data="data:application/x-silverlight," type="application/x-silverlight-2" width="100%" height="100%" style="outline:none;"><param name="source" value="'+a.xap_url+'"/><param name="background" value="Transparent"/><param name="windowless" value="true"/><param name="enablehtmlaccess" value="true"/><param name="initParams" value="uid='+this.uid+",target="+t.global_event_dispatcher+'"/></object>',l=setTimeout(function(){c&&!c.initialized&&c.trigger("Error",new i.RuntimeError(i.RuntimeError.NOT_INIT_ERR))},"Windows"!==t.OS?1e4:5e3)},destroy:function(e){return function(){e.call(c),clearTimeout(l),a=l=e=c=null}}(this.destroy)},u)}var s="silverlight",u={};return r.addConstructor(s,a),u}),i(ee,[Q,E,u],function(e,t,n){var i={init:function(e){function i(e){for(var t="",n=0;n<e.length;n++)t+=(""!==t?"|":"")+e[n].title+" | *."+e[n].extensions.replace(/,/g,";*.");return t}var r=this,o=this.getRuntime();this.bind("Change",function(){var e=o.shimExec.call(r,"FileInput","getFiles");r.files=[],n.each(e,function(e){r.files.push(new t(o.uid,e))})},999),this.getRuntime().shimExec.call(this,"FileInput","init",i(e.accept),e.name,e.multiple),this.trigger("ready")}};return e.FileInput=i}),i(te,[Q,u,W],function(e,t,n){return e.Blob=t.extend({},n)}),i(ne,[Q,h,N],function(e,t,n){var i={init:function(){var e=this,i=e.getRuntime(),r;return r=i.getShimContainer(),n.addEvent(r,"dragover",function(e){e.preventDefault(),e.stopPropagation(),e.dataTransfer.dropEffect="copy"},e.uid),n.addEvent(r,"dragenter",function(e){e.preventDefault();var n=t.get(i.uid).dragEnter(e);n&&e.stopPropagation()},e.uid),n.addEvent(r,"drop",function(e){e.preventDefault();var n=t.get(i.uid).dragDrop(e);n&&e.stopPropagation()},e.uid),i.shimExec.call(this,"FileDrop","init")}};return e.FileDrop=i}),i(ie,[Q,u,Y],function(e,t,n){return e.FileReader=t.extend({},n)}),i(re,[Q,u,$],function(e,t,n){return e.FileReaderSync=t.extend({},n)}),i(oe,[Q,u,J],function(e,t,n){return e.XMLHttpRequest=t.extend({},n)}),i(ae,[Q,u,Z],function(e,t,n){return e.Transporter=t.extend({},n)}),i(se,[Q,u,y,K],function(e,t,n,i){return e.Image=t.extend({},i,{getInfo:function(){var e=this.getRuntime(),i=["tiff","exif","gps","thumb"],r={meta:{}},o=e.shimExec.call(this,"Image","getInfo");return o.meta&&(t.each(i,function(e){var t=o.meta[e],n,i,a,s;if(t&&t.keys)for(r.meta[e]={},i=0,a=t.keys.length;a>i;i++)n=t.keys[i],s=t[n],s&&(/^(\d|[1-9]\d+)$/.test(s)?s=parseInt(s,10):/^\d*\.\d+$/.test(s)&&(s=parseFloat(s)),r.meta[e][n]=s)}),!r.meta||!r.meta.thumb||r.meta.thumb.data instanceof n||(r.meta.thumb.data=new n(e.uid,r.meta.thumb.data))),r.width=parseInt(o.width,10),r.height=parseInt(o.height,10),r.size=parseInt(o.size,10),r.type=o.type,r.name=o.name,r}})}),i(ue,[u,f,m,c],function(e,t,n,i){function r(t){var r=this,s=n.capTest,u=n.capTrue;n.call(this,t,o,{access_binary:s(window.FileReader||window.File&&File.getAsDataURL),access_image_binary:!1,display_media:s(a.Image&&(i.can("create_canvas")||i.can("use_data_uri_over32kb"))),do_cors:!1,drag_and_drop:!1,filter_by_extension:s(function(){return"Chrome"===i.browser&&i.verComp(i.version,28,">=")||"IE"===i.browser&&i.verComp(i.version,10,">=")||"Safari"===i.browser&&i.verComp(i.version,7,">=")}()),resize_image:function(){return a.Image&&r.can("access_binary")&&i.can("create_canvas")},report_upload_progress:!1,return_response_headers:!1,return_response_type:function(t){return"json"===t&&window.JSON?!0:!!~e.inArray(t,["text","document",""])},return_status_code:function(t){return!e.arrayDiff(t,[200,404])},select_file:function(){return i.can("use_fileinput")},select_multiple:!1,send_binary_string:!1,send_custom_headers:!1,send_multipart:!0,slice_blob:!1,stream_upload:function(){return r.can("select_file")},summon_file_dialog:function(){return r.can("select_file")&&("Firefox"===i.browser&&i.verComp(i.version,4,">=")||"Opera"===i.browser&&i.verComp(i.version,12,">=")||"IE"===i.browser&&i.verComp(i.version,10,">=")||!!~e.inArray(i.browser,["Chrome","Safari"]))},upload_filesize:u,use_http_method:function(t){return!e.arrayDiff(t,["GET","POST"])}}),e.extend(this,{init:function(){this.trigger("Init")},destroy:function(e){return function(){e.call(r),e=r=null}}(this.destroy)}),e.extend(this.getShim(),a)}var o="html4",a={};return n.addConstructor(o,r),a}),i(ce,[ue,E,u,h,N,d,c],function(e,t,n,i,r,o,a){function s(){function e(){var o=this,l=o.getRuntime(),d,h,f,p,m,g;g=n.guid("uid_"),d=l.getShimContainer(),s&&(f=i.get(s+"_form"),f&&n.extend(f.style,{top:"100%"})),p=document.createElement("form"),p.setAttribute("id",g+"_form"),p.setAttribute("method","post"),p.setAttribute("enctype","multipart/form-data"),p.setAttribute("encoding","multipart/form-data"),n.extend(p.style,{overflow:"hidden",position:"absolute",top:0,left:0,width:"100%",height:"100%"}),m=document.createElement("input"),m.setAttribute("id",g),m.setAttribute("type","file"),m.setAttribute("name",c.name||"Filedata"),m.setAttribute("accept",u.join(",")),n.extend(m.style,{fontSize:"999px",opacity:0}),p.appendChild(m),d.appendChild(p),n.extend(m.style,{position:"absolute",top:0,left:0,width:"100%",height:"100%"}),"IE"===a.browser&&a.verComp(a.version,10,"<")&&n.extend(m.style,{filter:"progid:DXImageTransform.Microsoft.Alpha(opacity=0)"}),m.onchange=function(){var n;if(this.value){if(this.files){if(n=this.files[0],0===n.size)return void p.parentNode.removeChild(p)}else n={name:this.value};n=new t(l.uid,n),this.onchange=function(){},e.call(o),o.files=[n],m.setAttribute("id",n.uid),p.setAttribute("id",n.uid+"_form"),o.trigger("change"),m=p=null}},l.can("summon_file_dialog")&&(h=i.get(c.browse_button),r.removeEvent(h,"click",o.uid),r.addEvent(h,"click",function(e){m&&!m.disabled&&m.click(),e.preventDefault()},o.uid)),s=g,d=f=h=null}var s,u=[],c;n.extend(this,{init:function(t){var n=this,a=n.getRuntime(),s;c=t,u=t.accept.mimes||o.extList2mimes(t.accept,a.can("filter_by_extension")),s=a.getShimContainer(),function(){var e,o,u;e=i.get(t.browse_button),a.can("summon_file_dialog")&&("static"===i.getStyle(e,"position")&&(e.style.position="relative"),o=parseInt(i.getStyle(e,"z-index"),10)||1,e.style.zIndex=o,s.style.zIndex=o-1),u=a.can("summon_file_dialog")?e:s,r.addEvent(u,"mouseover",function(){n.trigger("mouseenter")},n.uid),r.addEvent(u,"mouseout",function(){n.trigger("mouseleave")},n.uid),r.addEvent(u,"mousedown",function(){n.trigger("mousedown")},n.uid),r.addEvent(i.get(t.container),"mouseup",function(){n.trigger("mouseup")},n.uid),e=null}(),e.call(this),s=null,n.trigger({type:"ready",async:!0})},disable:function(e){var t;(t=i.get(s))&&(t.disabled=!!e)},destroy:function(){var e=this.getRuntime(),t=e.getShim(),n=e.getShimContainer();r.removeAllEvents(n,this.uid),r.removeAllEvents(c&&i.get(c.container),this.uid),r.removeAllEvents(c&&i.get(c.browse_button),this.uid),n&&(n.innerHTML=""),t.removeInstance(this.uid),s=u=c=n=t=null}})}return e.FileInput=s}),i(le,[ue,F],function(e,t){return e.FileReader=t}),i(de,[ue,u,h,x,f,N,y,I],function(e,t,n,i,r,o,a,s){function u(){function e(e){var t=this,i,r,a,s,u=!1;if(l){if(i=l.id.replace(/_iframe$/,""),r=n.get(i+"_form")){for(a=r.getElementsByTagName("input"),s=a.length;s--;)switch(a[s].getAttribute("type")){case"hidden":a[s].parentNode.removeChild(a[s]);break;case"file":u=!0}a=[],u||r.parentNode.removeChild(r),r=null}setTimeout(function(){o.removeEvent(l,"load",t.uid),l.parentNode&&l.parentNode.removeChild(l);var n=t.getRuntime().getShimContainer();n.children.length||n.parentNode.removeChild(n),n=l=null,e()},1)}}var u,c,l;t.extend(this,{send:function(d,h){function f(){var n=m.getShimContainer()||document.body,r=document.createElement("div");r.innerHTML='<iframe id="'+g+'_iframe" name="'+g+'_iframe" src="javascript:&quot;&quot;" style="display:none"></iframe>',l=r.firstChild,n.appendChild(l),o.addEvent(l,"load",function(){var n;try{n=l.contentWindow.document||l.contentDocument||window.frames[l.id].document,/^4(0[0-9]|1[0-7]|2[2346])\s/.test(n.title)?u=n.title.replace(/^(\d+).*$/,"$1"):(u=200,c=t.trim(n.body.innerHTML),p.trigger({type:"progress",loaded:c.length,total:c.length}),y&&p.trigger({type:"uploadprogress",loaded:y.size||1025,total:y.size||1025}))}catch(r){if(!i.hasSameOrigin(d.url))return void e.call(p,function(){p.trigger("error")});u=404}e.call(p,function(){p.trigger("load")})},p.uid)}var p=this,m=p.getRuntime(),g,v,w,y;if(u=c=null,h instanceof s&&h.hasBlob()){if(y=h.getBlob(),g=y.uid,w=n.get(g),v=n.get(g+"_form"),!v)throw new r.DOMException(r.DOMException.NOT_FOUND_ERR)}else g=t.guid("uid_"),v=document.createElement("form"),v.setAttribute("id",g+"_form"),v.setAttribute("method",d.method),v.setAttribute("enctype","multipart/form-data"),v.setAttribute("encoding","multipart/form-data"),m.getShimContainer().appendChild(v);v.setAttribute("target",g+"_iframe"),h instanceof s&&h.each(function(e,n){if(e instanceof a)w&&w.setAttribute("name",n);else{var i=document.createElement("input");t.extend(i,{type:"hidden",name:n,value:e}),w?v.insertBefore(i,w):v.appendChild(i)}}),v.setAttribute("action",d.url),f(),v.submit(),p.trigger("loadstart")},getStatus:function(){return u},getResponse:function(e){if("json"===e&&"string"===t.typeOf(c)&&window.JSON)try{
return JSON.parse(c.replace(/^\s*<pre[^>]*>/,"").replace(/<\/pre>\s*$/,""))}catch(n){return null}return c},abort:function(){var t=this;l&&l.contentWindow&&(l.contentWindow.stop?l.contentWindow.stop():l.contentWindow.document.execCommand?l.contentWindow.document.execCommand("Stop"):l.src="about:blank"),e.call(this,function(){t.dispatchEvent("abort")})}})}return e.XMLHttpRequest=u}),i(he,[ue,j],function(e,t){return e.Image=t}),a([u,c,l,d,h,f,p,m,g,v,w,y,E,_,b,x,R,A,I,T,S,O,N])}(this);;(function(e){"use strict";var t={},n=e.moxie.core.utils.Basic.inArray;return function r(e){var i,s;for(i in e)s=typeof e[i],s==="object"&&!~n(i,["Exceptions","Env","Mime"])?r(e[i]):s==="function"&&(t[i]=e[i])}(e.moxie),t.Env=e.moxie.core.utils.Env,t.Mime=e.moxie.core.utils.Mime,t.Exceptions=e.moxie.core.Exceptions,e.mOxie=t,e.o||(e.o=t),t})(this);
/**
 * Plupload - multi-runtime File Uploader
 * v2.1.9
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 *
 * Date: 2016-05-15
 */
;(function(e,t,n){function s(e){function r(e,t,r){var i={chunks:"slice_blob",jpgresize:"send_binary_string",pngresize:"send_binary_string",progress:"report_upload_progress",multi_selection:"select_multiple",dragdrop:"drag_and_drop",drop_element:"drag_and_drop",headers:"send_custom_headers",urlstream_upload:"send_binary_string",canSendBinary:"send_binary",triggerDialog:"summon_file_dialog"};i[e]?n[i[e]]=t:r||(n[e]=t)}var t=e.required_features,n={};if(typeof t=="string")o.each(t.split(/\s*,\s*/),function(e){r(e,!0)});else if(typeof t=="object")o.each(t,function(e,t){r(t,e)});else if(t===!0){e.chunk_size>0&&(n.slice_blob=!0);if(e.resize.enabled||!e.multipart)n.send_binary_string=!0;o.each(e,function(e,t){r(t,!!e,!0)})}return n}var r=e.setTimeout,i={},o={VERSION:"2.1.9",STOPPED:1,STARTED:2,QUEUED:1,UPLOADING:2,FAILED:4,DONE:5,GENERIC_ERROR:-100,HTTP_ERROR:-200,IO_ERROR:-300,SECURITY_ERROR:-400,INIT_ERROR:-500,FILE_SIZE_ERROR:-600,FILE_EXTENSION_ERROR:-601,FILE_DUPLICATE_ERROR:-602,IMAGE_FORMAT_ERROR:-700,MEMORY_ERROR:-701,IMAGE_DIMENSIONS_ERROR:-702,mimeTypes:t.mimes,ua:t.ua,typeOf:t.typeOf,extend:t.extend,guid:t.guid,getAll:function(t){var n=[],r;o.typeOf(t)!=="array"&&(t=[t]);var i=t.length;while(i--)r=o.get(t[i]),r&&n.push(r);return n.length?n:null},get:t.get,each:t.each,getPos:t.getPos,getSize:t.getSize,xmlEncode:function(e){var t={"<":"lt",">":"gt","&":"amp",'"':"quot","'":"#39"},n=/[<>&\"\']/g;return e?(""+e).replace(n,function(e){return t[e]?"&"+t[e]+";":e}):e},toArray:t.toArray,inArray:t.inArray,addI18n:t.addI18n,translate:t.translate,isEmptyObj:t.isEmptyObj,hasClass:t.hasClass,addClass:t.addClass,removeClass:t.removeClass,getStyle:t.getStyle,addEvent:t.addEvent,removeEvent:t.removeEvent,removeAllEvents:t.removeAllEvents,cleanName:function(e){var t,n;n=[/[\300-\306]/g,"A",/[\340-\346]/g,"a",/\307/g,"C",/\347/g,"c",/[\310-\313]/g,"E",/[\350-\353]/g,"e",/[\314-\317]/g,"I",/[\354-\357]/g,"i",/\321/g,"N",/\361/g,"n",/[\322-\330]/g,"O",/[\362-\370]/g,"o",/[\331-\334]/g,"U",/[\371-\374]/g,"u"];for(t=0;t<n.length;t+=2)e=e.replace(n[t],n[t+1]);return e=e.replace(/\s+/g,"_"),e=e.replace(/[^a-z0-9_\-\.]+/gi,""),e},buildUrl:function(e,t){var n="";return o.each(t,function(e,t){n+=(n?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(e)}),n&&(e+=(e.indexOf("?")>0?"&":"?")+n),e},formatSize:function(e){function t(e,t){return Math.round(e*Math.pow(10,t))/Math.pow(10,t)}if(e===n||/\D/.test(e))return o.translate("N/A");var r=Math.pow(1024,4);return e>r?t(e/r,1)+" "+o.translate("tb"):e>(r/=1024)?t(e/r,1)+" "+o.translate("gb"):e>(r/=1024)?t(e/r,1)+" "+o.translate("mb"):e>1024?Math.round(e/1024)+" "+o.translate("kb"):e+" "+o.translate("b")},parseSize:t.parseSizeStr,predictRuntime:function(e,n){var r,i;return r=new o.Uploader(e),i=t.Runtime.thatCan(r.getOption().required_features,n||e.runtimes),r.destroy(),i},addFileFilter:function(e,t){i[e]=t}};o.addFileFilter("mime_types",function(e,t,n){e.length&&!e.regexp.test(t.name)?(this.trigger("Error",{code:o.FILE_EXTENSION_ERROR,message:o.translate("File extension error."),file:t}),n(!1)):n(!0)}),o.addFileFilter("max_file_size",function(e,t,n){var r;e=o.parseSize(e),t.size!==r&&e&&t.size>e?(this.trigger("Error",{code:o.FILE_SIZE_ERROR,message:o.translate("File size error."),file:t}),n(!1)):n(!0)}),o.addFileFilter("prevent_duplicates",function(e,t,n){if(e){var r=this.files.length;while(r--)if(t.name===this.files[r].name&&t.size===this.files[r].size){this.trigger("Error",{code:o.FILE_DUPLICATE_ERROR,message:o.translate("Duplicate file error."),file:t}),n(!1);return}}n(!0)}),o.Uploader=function(e){function g(){var e,t=0,n;if(this.state==o.STARTED){for(n=0;n<f.length;n++)!e&&f[n].status==o.QUEUED?(e=f[n],this.trigger("BeforeUpload",e)&&(e.status=o.UPLOADING,this.trigger("UploadFile",e))):t++;t==f.length&&(this.state!==o.STOPPED&&(this.state=o.STOPPED,this.trigger("StateChanged")),this.trigger("UploadComplete",f))}}function y(e){e.percent=e.size>0?Math.ceil(e.loaded/e.size*100):100,b()}function b(){var e,t;d.reset();for(e=0;e<f.length;e++)t=f[e],t.size!==n?(d.size+=t.origSize,d.loaded+=t.loaded*t.origSize/t.size):d.size=n,t.status==o.DONE?d.uploaded++:t.status==o.FAILED?d.failed++:d.queued++;d.size===n?d.percent=f.length>0?Math.ceil(d.uploaded/f.length*100):0:(d.bytesPerSec=Math.ceil(d.loaded/((+(new Date)-p||1)/1e3)),d.percent=d.size>0?Math.ceil(d.loaded/d.size*100):0)}function w(){var e=c[0]||h[0];return e?e.getRuntime().uid:!1}function E(e,n){if(e.ruid){var r=t.Runtime.getInfo(e.ruid);if(r)return r.can(n)}return!1}function S(){this.bind("FilesAdded FilesRemoved",function(e){e.trigger("QueueChanged"),e.refresh()}),this.bind("CancelUpload",O),this.bind("BeforeUpload",C),this.bind("UploadFile",k),this.bind("UploadProgress",L),this.bind("StateChanged",A),this.bind("QueueChanged",b),this.bind("Error",_),this.bind("FileUploaded",M),this.bind("Destroy",D)}function x(e,n){var r=this,i=0,s=[],u={runtime_order:e.runtimes,required_caps:e.required_features,preferred_caps:l,swf_url:e.flash_swf_url,xap_url:e.silverlight_xap_url};o.each(e.runtimes.split(/\s*,\s*/),function(t){e[t]&&(u[t]=e[t])}),e.browse_button&&o.each(e.browse_button,function(n){s.push(function(s){var a=new t.FileInput(o.extend({},u,{accept:e.filters.mime_types,name:e.file_data_name,multiple:e.multi_selection,container:e.container,browse_button:n}));a.onready=function(){var e=t.Runtime.getInfo(this.ruid);t.extend(r.features,{chunks:e.can("slice_blob"),multipart:e.can("send_multipart"),multi_selection:e.can("select_multiple")}),i++,c.push(this),s()},a.onchange=function(){r.addFile(this.files)},a.bind("mouseenter mouseleave mousedown mouseup",function(r){v||(e.browse_button_hover&&("mouseenter"===r.type?t.addClass(n,e.browse_button_hover):"mouseleave"===r.type&&t.removeClass(n,e.browse_button_hover)),e.browse_button_active&&("mousedown"===r.type?t.addClass(n,e.browse_button_active):"mouseup"===r.type&&t.removeClass(n,e.browse_button_active)))}),a.bind("mousedown",function(){r.trigger("Browse")}),a.bind("error runtimeerror",function(){a=null,s()}),a.init()})}),e.drop_element&&o.each(e.drop_element,function(e){s.push(function(n){var s=new t.FileDrop(o.extend({},u,{drop_zone:e}));s.onready=function(){var e=t.Runtime.getInfo(this.ruid);t.extend(r.features,{chunks:e.can("slice_blob"),multipart:e.can("send_multipart"),dragdrop:e.can("drag_and_drop")}),i++,h.push(this),n()},s.ondrop=function(){r.addFile(this.files)},s.bind("error runtimeerror",function(){s=null,n()}),s.init()})}),t.inSeries(s,function(){typeof n=="function"&&n(i)})}function T(e,r,i){var s=new t.Image;try{s.onload=function(){if(r.width>this.width&&r.height>this.height&&r.quality===n&&r.preserve_headers&&!r.crop)return this.destroy(),i(e);s.downsize(r.width,r.height,r.crop,r.preserve_headers)},s.onresize=function(){i(this.getAsBlob(e.type,r.quality)),this.destroy()},s.onerror=function(){i(e)},s.load(e)}catch(o){i(e)}}function N(e,n,r){function f(e,t,n){var r=a[e];switch(e){case"max_file_size":e==="max_file_size"&&(a.max_file_size=a.filters.max_file_size=t);break;case"chunk_size":if(t=o.parseSize(t))a[e]=t,a.send_file_name=!0;break;case"multipart":a[e]=t,t||(a.send_file_name=!0);break;case"unique_names":a[e]=t,t&&(a.send_file_name=!0);break;case"filters":o.typeOf(t)==="array"&&(t={mime_types:t}),n?o.extend(a.filters,t):a.filters=t,t.mime_types&&(a.filters.mime_types.regexp=function(e){var t=[];return o.each(e,function(e){o.each(e.extensions.split(/,/),function(e){/^\s*\*\s*$/.test(e)?t.push("\\.*"):t.push("\\."+e.replace(new RegExp("["+"/^$.*+?|()[]{}\\".replace(/./g,"\\$&")+"]","g"),"\\$&"))})}),new RegExp("("+t.join("|")+")$","i")}(a.filters.mime_types));break;case"resize":n?o.extend(a.resize,t,{enabled:!0}):a.resize=t;break;case"prevent_duplicates":a.prevent_duplicates=a.filters.prevent_duplicates=!!t;break;case"container":case"browse_button":case"drop_element":t="container"===e?o.get(t):o.getAll(t);case"runtimes":case"multi_selection":case"flash_swf_url":case"silverlight_xap_url":a[e]=t,n||(u=!0);break;default:a[e]=t}n||i.trigger("OptionChanged",e,t,r)}var i=this,u=!1;typeof e=="object"?o.each(e,function(e,t){f(t,e,r)}):f(e,n,r),r?(a.required_features=s(o.extend({},a)),l=s(o.extend({},a,{required_features:!0}))):u&&(i.trigger("Destroy"),x.call(i,a,function(e){e?(i.runtime=t.Runtime.getInfo(w()).type,i.trigger("Init",{runtime:i.runtime}),i.trigger("PostInit")):i.trigger("Error",{code:o.INIT_ERROR,message:o.translate("Init error.")})}))}function C(e,t){if(e.settings.unique_names){var n=t.name.match(/\.([^.]+)$/),r="part";n&&(r=n[1]),t.target_name=t.id+"."+r}}function k(e,n){function h(){u-->0?r(p,1e3):(n.loaded=f,e.trigger("Error",{code:o.HTTP_ERROR,message:o.translate("HTTP Error."),file:n,response:m.responseText,status:m.status,responseHeaders:m.getAllResponseHeaders()}))}function p(){var d,v,g={},y;if(n.status!==o.UPLOADING||e.state===o.STOPPED)return;e.settings.send_file_name&&(g.name=n.target_name||n.name),s&&a.chunks&&c.size>s?(y=Math.min(s,c.size-f),d=c.slice(f,f+y)):(y=c.size,d=c),s&&a.chunks&&(e.settings.send_chunk_number?(g.chunk=Math.ceil(f/s),g.chunks=Math.ceil(c.size/s)):(g.offset=f,g.total=c.size)),m=new t.XMLHttpRequest,m.upload&&(m.upload.onprogress=function(t){n.loaded=Math.min(n.size,f+t.loaded),e.trigger("UploadProgress",n)}),m.onload=function(){if(m.status>=400){h();return}u=e.settings.max_retries,y<c.size?(d.destroy(),f+=y,n.loaded=Math.min(f,c.size),e.trigger("ChunkUploaded",n,{offset:n.loaded,total:c.size,response:m.responseText,status:m.status,responseHeaders:m.getAllResponseHeaders()}),t.Env.browser==="Android Browser"&&e.trigger("UploadProgress",n)):n.loaded=n.size,d=v=null,!f||f>=c.size?(n.size!=n.origSize&&(c.destroy(),c=null),e.trigger("UploadProgress",n),n.status=o.DONE,e.trigger("FileUploaded",n,{response:m.responseText,status:m.status,responseHeaders:m.getAllResponseHeaders()})):r(p,1)},m.onerror=function(){h()},m.onloadend=function(){this.destroy(),m=null},e.settings.multipart&&a.multipart?(m.open("post",i,!0),o.each(e.settings.headers,function(e,t){m.setRequestHeader(t,e)}),v=new t.FormData,o.each(o.extend(g,e.settings.multipart_params),function(e,t){v.append(t,e)}),v.append(e.settings.file_data_name,d),m.send(v,{runtime_order:e.settings.runtimes,required_caps:e.settings.required_features,preferred_caps:l,swf_url:e.settings.flash_swf_url,xap_url:e.settings.silverlight_xap_url})):(i=o.buildUrl(e.settings.url,o.extend(g,e.settings.multipart_params)),m.open("post",i,!0),m.setRequestHeader("Content-Type","application/octet-stream"),o.each(e.settings.headers,function(e,t){m.setRequestHeader(t,e)}),m.send(d,{runtime_order:e.settings.runtimes,required_caps:e.settings.required_features,preferred_caps:l,swf_url:e.settings.flash_swf_url,xap_url:e.settings.silverlight_xap_url}))}var i=e.settings.url,s=e.settings.chunk_size,u=e.settings.max_retries,a=e.features,f=0,c;n.loaded&&(f=n.loaded=s?s*Math.floor(n.loaded/s):0),c=n.getSource(),e.settings.resize.enabled&&E(c,"send_binary_string")&&!!~t.inArray(c.type,["image/jpeg","image/png"])?T.call(this,c,e.settings.resize,function(e){c=e,n.size=e.size,p()}):p()}function L(e,t){y(t)}function A(e){if(e.state==o.STARTED)p=+(new Date);else if(e.state==o.STOPPED)for(var t=e.files.length-1;t>=0;t--)e.files[t].status==o.UPLOADING&&(e.files[t].status=o.QUEUED,b())}function O(){m&&m.abort()}function M(e){b(),r(function(){g.call(e)},1)}function _(e,t){t.code===o.INIT_ERROR?e.destroy():t.code===o.HTTP_ERROR&&(t.file.status=o.FAILED,y(t.file),e.state==o.STARTED&&(e.trigger("CancelUpload"),r(function(){g.call(e)},1)))}function D(e){e.stop(),o.each(f,function(e){e.destroy()}),f=[],c.length&&(o.each(c,function(e){e.destroy()}),c=[]),h.length&&(o.each(h,function(e){e.destroy()}),h=[]),l={},v=!1,p=m=null,d.reset()}var u=o.guid(),a,f=[],l={},c=[],h=[],p,d,v=!1,m;a={runtimes:t.Runtime.order,max_retries:0,chunk_size:0,multipart:!0,multi_selection:!0,file_data_name:"file",flash_swf_url:"js/Moxie.swf",silverlight_xap_url:"js/Moxie.xap",filters:{mime_types:[],prevent_duplicates:!1,max_file_size:0},resize:{enabled:!1,preserve_headers:!0,crop:!1},send_file_name:!0,send_chunk_number:!0},N.call(this,e,null,!0),d=new o.QueueProgress,o.extend(this,{id:u,uid:u,state:o.STOPPED,features:{},runtime:null,files:f,settings:a,total:d,init:function(){var e=this,n,r,i;r=e.getOption("preinit"),typeof r=="function"?r(e):o.each(r,function(t,n){e.bind(n,t)}),S.call(e),o.each(["container","browse_button","drop_element"],function(t){if(e.getOption(t)===null)return i={code:o.INIT_ERROR,message:o.translate("'%' specified, but cannot be found.")},!1});if(i)return e.trigger("Error",i);if(!a.browse_button&&!a.drop_element)return e.trigger("Error",{code:o.INIT_ERROR,message:o.translate("You must specify either 'browse_button' or 'drop_element'.")});x.call(e,a,function(n){var r=e.getOption("init");typeof r=="function"?r(e):o.each(r,function(t,n){e.bind(n,t)}),n?(e.runtime=t.Runtime.getInfo(w()).type,e.trigger("Init",{runtime:e.runtime}),e.trigger("PostInit")):e.trigger("Error",{code:o.INIT_ERROR,message:o.translate("Init error.")})})},setOption:function(e,t){N.call(this,e,t,!this.runtime)},getOption:function(e){return e?a[e]:a},refresh:function(){c.length&&o.each(c,function(e){e.trigger("Refresh")}),this.trigger("Refresh")},start:function(){this.state!=o.STARTED&&(this.state=o.STARTED,this.trigger("StateChanged"),g.call(this))},stop:function(){this.state!=o.STOPPED&&(this.state=o.STOPPED,this.trigger("StateChanged"),this.trigger("CancelUpload"))},disableBrowse:function(){v=arguments[0]!==n?arguments[0]:!0,c.length&&o.each(c,function(e){e.disable(v)}),this.trigger("DisableBrowse",v)},getFile:function(e){var t;for(t=f.length-1;t>=0;t--)if(f[t].id===e)return f[t]},addFile:function(e,n){function c(e,n){var r=[];t.each(s.settings.filters,function(t,n){i[n]&&r.push(function(r){i[n].call(s,t,e,function(e){r(!e)})})}),t.inSeries(r,n)}function h(e){var i=t.typeOf(e);if(e instanceof t.File){if(!e.ruid&&!e.isDetached()){if(!l)return!1;e.ruid=l,e.connectRuntime(l)}h(new o.File(e))}else e instanceof t.Blob?(h(e.getSource()),e.destroy()):e instanceof o.File?(n&&(e.name=n),u.push(function(t){c(e,function(n){n||(f.push(e),a.push(e),s.trigger("FileFiltered",e)),r(t,1)})})):t.inArray(i,["file","blob"])!==-1?h(new t.File(null,e)):i==="node"&&t.typeOf(e.files)==="filelist"?t.each(e.files,h):i==="array"&&(n=null,t.each(e,h))}var s=this,u=[],a=[],l;l=w(),h(e),u.length&&t.inSeries(u,function(){a.length&&s.trigger("FilesAdded",a)})},removeFile:function(e){var t=typeof e=="string"?e:e.id;for(var n=f.length-1;n>=0;n--)if(f[n].id===t)return this.splice(n,1)[0]},splice:function(e,t){var r=f.splice(e===n?0:e,t===n?f.length:t),i=!1;return this.state==o.STARTED&&(o.each(r,function(e){if(e.status===o.UPLOADING)return i=!0,!1}),i&&this.stop()),this.trigger("FilesRemoved",r),o.each(r,function(e){e.destroy()}),i&&this.start(),r},dispatchEvent:function(e){var t,n,r;e=e.toLowerCase(),t=this.hasEventListener(e);if(t){t.sort(function(e,t){return t.priority-e.priority}),n=[].slice.call(arguments),n.shift(),n.unshift(this);for(var i=0;i<t.length;i++)if(t[i].fn.apply(t[i].scope,n)===!1)return!1}return!0},bind:function(e,t,n,r){o.Uploader.prototype.bind.call(this,e,t,r,n)},destroy:function(){this.trigger("Destroy"),a=d=null,this.unbindAll()}})},o.Uploader.prototype=t.EventTarget.instance,o.File=function(){function n(n){o.extend(this,{id:o.guid(),name:n.name||n.fileName,type:n.type||"",size:n.size||n.fileSize,origSize:n.size||n.fileSize,loaded:0,percent:0,status:o.QUEUED,lastModifiedDate:n.lastModifiedDate||(new Date).toLocaleString(),getNative:function(){var e=this.getSource().getSource();return t.inArray(t.typeOf(e),["blob","file"])!==-1?e:null},getSource:function(){return e[this.id]?e[this.id]:null},destroy:function(){var t=this.getSource();t&&(t.destroy(),delete e[this.id])}}),e[this.id]=n}var e={};return n}(),o.QueueProgress=function(){var e=this;e.size=0,e.loaded=0,e.uploaded=0,e.failed=0,e.queued=0,e.percent=0,e.bytesPerSec=0,e.reset=function(){e.size=e.loaded=e.uploaded=e.failed=e.queued=e.percent=e.bytesPerSec=0}},e.plupload=o})(window,mOxie);

/**
 * 包头大小
 */
var PACKET_HEADER_SIZE = 13;

/**
 * 由opcode得到包的key
 */
var OPCODE_MAP = {
	RECV : new BaseList(),
	SEND : new BaseList()
};

/**
 * [start, end)
 */
function _Range(start, end) {
	this.START = start;
	this.END = end;
	this.SIZE = end - start;
}

/**
 * 操作码, 每新增一个同时会向OPCODE_MAP中更新
 */
function _Opcode(key, send, recv) {
	this.KEY = key;
	this.SEND = send;
	this.RECV = !!recv? recv : send;
	OPCODE_MAP.SEND.set(this.SEND, this.KEY);
	OPCODE_MAP.RECV.set(this.RECV, this.KEY);
}

/**
 * 操作码
 */
var OPCODE = {
	/**
	 * 认证
	 * @type {_Opcode}
	 */
	AUTH : new _Opcode('auth', 0x0001),
	/**
	 * @type {_Opcode}
	 */
	PING : new _Opcode('ping', 0x0002),
	
	/**
	 * 断开连接 Stream end rongqb 20151208
	 */
	STREAMEND : new _Opcode('streamend', 0x0004),
	
	/**
	 * 发送&接收消息回执
	 * @type {_Opcode}
	 */
	RECEIPTS : new _Opcode('receipts', 0x1002),
	
	/**
	 * 发送&接收好友消息
	 * @type {_Opcode}
	 */
	USER_MESSAGE : new _Opcode('userMessage', 0x1010),
	
	/**
	 * 发送接收 输入状态
	 * @type {_Opcode}
	 */
	INPUT_STATE : new _Opcode('inputState', 0x1015),

	/**
	 * 发送&接收群组消息
	 * @type {_Opcode}
	 */
	CHATGROUP_MESSAGE : new _Opcode('chatGroupMessage', 0x1030),
	
	/**
	 * 发送&接收公共号消息
	 * @type {_Opcode}
	 */
	PUBACCOUNT_MESSAGE : new _Opcode('pubaccountMessage', 0x1050),
	
	/**
	 * 各端同步消息 rongqb 20151123
	 * @type {_Opcode}
	 */
	SYNC_MESSAGE : new _Opcode('syncMessage', 0x1070),
	
	/**
	 * 发送&接收回执
	 * @type {_Opcode}
	 */
	RECEIPTS : new _Opcode('receipts', 0x1002),
	
	/**
	 * 接收新消息通知
	 * @type {_Opcode}
	 */
	NOTIFY_MESSAGE : new _Opcode('notifyMessage', 0x1003),
	
	/**
	 * 透传消息
	 * @type {_Opcode}
	 */
	MUCONLINEDELIVERPACKET : new _Opcode('MucOnlineDeliverPacket', 0x1110),
	
	/**
	 * 透传消息
	 * @type {_Opcode}
	 */
	PUBONLINEDELIVERPACKET : new _Opcode('PubOnlineDeliverPacket', 0x1130),	
	
	/**
	 * 透传消息
	 * @type {_Opcode}
	 */
	USERONLINEDELIVERPACKET : new _Opcode('UserOnlineDeliverPacket', 0x1150),
	
	/**
	 * 透传消息 多端同步通知packet(增量)
	 * @type {_Opcode}
	 */
	REMINDSETTINGONLINEDELIVERPACKET : new _Opcode('RemindSettingOnlineDeliverPacket', 0x1160),
	
	/**
	 * 邀请用户加入群组
	 * @type {_Opcode}
	 */
	INVITE_USERS : new _Opcode('inviteUsers', 0x1301),
	
	/**
	 * 请求&返回VCard
	 * @type {_Opcode}
	 */
	VCARD : new _Opcode('vcard', 0x2011),
	
	/**
	 * 请求&返回所有好友的VCard
	 * @type {_Opcode}
	 */
	VCARDS : new _Opcode("vcards", 0x2011, 0x2012),
	
	/**
	 * IQ请求的结果报文
	 * @type {_Opcode}
	 */
	IQ_RESULT : new _Opcode('iqResult', 0x2021),
	
	/**
	 * 搜索用户&搜索结果
	 * @type {_Opcode}
	 */
	QUERY_USER : new _Opcode('queryUser', 0x2110, 0x2111),
	
	/**
	 * 搜索群组&搜索结果
	 * @type {_Opcode}
	 */
	QUERY_CHATGROUP : new _Opcode('queryChatGroup', 0x2130, 0x2131),

	/**
	 * 搜索公共号&搜索结果
	 * @type {_Opcode}
	 */
	QUERY_PUBACCOUNT : new _Opcode('queryPubaccount', 0x2150, 0x2151),
	
	/**
	 * 请求&返回好友列表
	 * @type {_Opcode}
	 */
	ROSTER_LIST : new _Opcode('rosterList', 0x2220, 0x2221),
	
	/**
	 * 请求&返回群组列表
	 * @type {_Opcode}
	 */
	CHATGROUP_LIST : new _Opcode('chatGroupList', 0x2230, 0x2231),
	
	/**
	 * 请求&返回群成员列表
	 * @type {_Opcode}
	 */
	CHATGROUP_MEMBER_LIST : new _Opcode('chatGroupMemberList', 0x2240, 0x2241),
	
	/**
	 * 请求&返回公共号列表
	 * @type {_Opcode}
	 */
	PUBACCOUNT_LIST : new _Opcode('pubaccountList', 0x2250, 0x2251),
	
	/**
	 * 请求&返回群组信息
	 * @type {_Opcode}
	 */
	CHATGROUP_INFO : new _Opcode('chatGroupInfo', 0x2330, 0x2331),
	
	CHATGROUP_SHARED_FILES : new _Opcode('chatGroupSharedFiles', 0x2332, 0x2333),
	
	/**
	 * 更新好友&更新结果
	 * @type {_Opcode}
	 */
	UPDATE_ROSTER : new _Opcode('updateRoster', 0x2520),
	
	/**
	 * 修改群组配置&修改结果
	 * @type {_Opcode}
	 */
	CONFIG_CHATGROUP : new _Opcode('chatGroupConfig', 0x2530, 0x2531),
	
	/**
	 * 创建群组&创建结果 rongqb 20151117
	 */
	CREATE_GROUP : new _Opcode('createGroup', 0x2532 ,0x2334),
	
	/**
	 * 房间成员邀请人入群&邀请结果 rongqb 20151118
	 */
	INVITE_GROUP_MEMBER : new _Opcode('inviteGroupMember', 0x2533 ,0x2334),
	
	/**
	 * 群成员更改配置信息&返回结果 rongqb 20151119
	 */
	MODIFY_GROUP_INFO : new _Opcode('modifyGroupInfo', 0x2534 ,0x2334),
	
	/**
	 * 群主踢人&返回结果 rongqb 20151119
	 */
	KICK_GROUP_MEMBER : new _Opcode('kickGroupMember', 0x2535 ,0x2334),
	
	/**
	 * 群主解散群 rongqb 20160106
	 */
	DISMISS_GROUP : new _Opcode('dismissgtoup', 0x2538, 0x2335),
	
	/**
	 * 群主更新 rongqb 20160106
	 */
	ON_GROUP_TRANSFER :  new _Opcode('groupOwnerTransfer', 0x2336),
	
	/**
	 * 群主转让 rongqb 20160106
	 */
	TRANSFER_GROUP : new _Opcode('transferGroup', 0x2539),
	
	/**
	 * 群成员退出群&返回结果 rongqb 20151119
	 */
	EXIT_GROUP : new _Opcode('exitGroup', 0x2536 ,0x2335),
	
	/**
	 * 群信息更新 rongqb 20151119
	 */
	ON_GROUP_UPDATE :  new _Opcode('groupUpdate',0x2334),
	
	/**
	 * 被群踢出&群组解散 rongqb 20151119
	 */
	KICKED_GROUP : new _Opcode('kickedByGroup', 0x2335),
	
	/**
	 * 收藏&取消收藏 联系人
	 */
	FAVORITED_ROSTERT : new _Opcode('favoritedRoster', 0x2521),
	
	/**
	 * 收藏群组 rongqb 20151201
	 */
	COLLECT_GROUP : new _Opcode('collectGroup', 0x2537),
	
	/**
	 * 全量同步好友列表
	 * @type {_Opcode}
	 */
	FULL_SYNC_ROSTER : new _Opcode('fullSyncRoster', 0x2720),
	
	/**
	 * 增量同步好友列表
	 * @type {_Opcode}
	 */
	DELTA_SYNC_ROSTER : new _Opcode('deltaSyncRoster', 0x2722),
	
	/**
	 * 全量同步群组列表
	 * @type {_Opcode}
	 */
	FULL_SYNC_CHATGROUP : new _Opcode('fullSyncChatGroup', 0x2730),
	
	/**
	 * 增量同步群组列表
	 * @type {_Opcode}
	 */
	DELTA_SYNC_CHATGROUP : new _Opcode('deltaSyncChatGroup', 0x2732),
	
	/**
	 * [二合一]出席信息&订阅
	 * @type {_Opcode}
	 */
	PRESENCE : new _Opcode("presence", 0x3001),
	
	/**
	 * 加入群组&退出群租&创建群组第一步
	 * @type {_Opcode}
	 */
	CHATGROUP : new _Opcode("chatGroup", 0x3301, 0x3302),
	
	/**
	 * 群主删除群成员
	 * @type {_Opcode}
	 */
	DEL_GROUPMEMBER : new _Opcode('delGroupMember', 0x2640),
	
	/**
	 * 创建/结束/重命名白板 & 结果
	 * @type {_Opcode}
	 */
	OPERATE_WHITEBOARD : new _Opcode('operateWhiteBoard', 0x2801),
	
	/**
	 *  监听白板
	 * @type {_Opcode}
	 */
	LISTEN_WHITEBOARD : new _Opcode('listenWhiteBoard', 0x2801,	0x2802),
	
	/**
	 *  更新白板 & 结果
	 * @type {_Opcode}
	 */
	UPDATE_WHITEBOARD : new _Opcode('updateWhiteBoard', 0x2805),
	
	/**
	 * packet error
	 * @type {_Opcode}
	 */
	PACKET_ERROR : new _Opcode('packetError', 0x4000),

	/**
	 * stream error
	 * @type {_Opcode}
	 */
	STREAM_ERROR : new _Opcode('streamError', 0x4100),
	
	/**
	 * 消息包的范围
	 * @type {_Range}
	 */
	MESSAGE_RANGE : new _Range(0x1000, 0x2000),
	
	/**
	 * 发起网络会议
	 * @type {_Opcode}
	 */
	CREATE_NETMETTING : new _Opcode('createNetMetting', 0x2880),
	
	/**
	 * 网络会议返回结果
	 * @type {_Opcode}
	 */
	NETMEETING_NOTIFY : new _Opcode('NETMeetingNotify', 0x2881),
	
	/**
	 * 会议管理报文
	 * @type {_Opcode}
	 */
	NETMEETING_MANAGE : new _Opcode('NETMeetingManage', 0x2882),
	
	/**
	 * 会议计费报文
	 * @type {_Opcode}
	 */
	NETMEETING_BILL : new _Opcode('NETMeetingBill', 0x2884),
	
	/**
	 * IQ包的范围
	 * @type {_Range}
	 */
	IQ_RANGE : new _Range(0x2000, 0x3000),
	
	/**
	 * Presence包的范围
	 * @type {_Range}
	 */
	PRESENCE_RANGE : new _Range(0x3000, 0x4000)
};

/**
 * 客服板块
 */
var SERVICE_OPCODE = {
	/**
	 * 客服 消息
	 * @type {_Opcode}
	 */
	SERVICE_USER_MESSAGE : new _Opcode('ServiceUserMessage', 0x1801),
	
	/**
	 * 客服 消息回执
	 * @type {_Opcode}
	 */
	SERVICE_RECEIPTS : new _Opcode('ServiceReceipts', 0x1802)
};
YYIMUtil.extend(OPCODE,SERVICE_OPCODE);

/**
 * 包结构: 每个片段所在位置
 */
var PACKET_STRUCT = {
	/**
	 * 控制帧
	 */
	CONSOLE_FRAME : new _Range(0, 1),
	
	/**
	 * 操作码 {@see OPCODE}
	 */
	OPCODE : new _Range(1, 3),
	
	/**
	 * 包的长度
	 */
	PACKET_LEN : new _Range(3, 7),
	
	/**
	 * 版本
	 */
	VERSION : new _Range(7, 9),
	
	/**
	 * 序列号
	 */
	SEQ_ID : new _Range(9, 13)
};

function shallowClone(o){
    function F(){}
    F.prototype = o;
    return new F();
}

function inheritPrototype(subType, superType){
    var prototype = shallowClone(superType.prototype);
    prototype.constructor = subType;
    subType.prototype = prototype;
}

function JumpPacket(content, opcode) {
	this.sFrame = 0; // 控制帧
	this.version = 0x0100;
	this.seqId = 0;
	this.packetLen = 0;
	if(content){
		this.content = content;
		try{
			if(typeof content == 'string'){
				this.packetLen = content.length;
			}else{
				this.packetLen = JSON.stringify(content).length;
			}
		}catch(e){}
	}
	this.opcode = opcode;
}
/* Copyright 2006 Erik Arvidsson
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you
 * may not use this file except in compliance with the License.  You
 * may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
 * implied.  See the License for the specific language governing
 * permissions and limitations under the License.
 */

/**
 * @fileoverview Wrapper to make working with XmlHttpRequest and the
 * DOM more convenient (cross browser compliance).
 * this code is taken from
 * {@link http://webfx.eae.net/dhtml/xmlextras/xmlextras.html}.
 * @author Erik Arvidsson
 * @author Stefan Strigler steve@zeank.in-berlin.de
 */

/**
 * XmlHttp factory
 * @private
 */
function XmlHttp() {}

/**
 * creates a cross browser compliant XmlHttpRequest object
 */
XmlHttp.create = function () {
  try {
    if (window.XMLHttpRequest) {
        var req = new XMLHttpRequest();

        // some versions of Moz do not support the readyState property
        // and the onreadystate event so we patch it!
        if (req.readyState === null) {
            req.readyState = 1;
            req.addEventListener("load", function () {
                req.readyState = 4;
                if (typeof req.onreadystatechange == "function")
                    req.onreadystatechange();
            }, false);
        }

        return req;
    }
      if (window.ActiveXObject) {
          return new ActiveXObject(XmlHttp.getPrefix() + ".XmlHttp");
      }
  }
    catch (ex) {}
    // fell through
    throw new Error("Your browser does not support XmlHttp objects");
};

/**
 * used to find the Automation server name
 * @private
 */
XmlHttp.getPrefix = function() {
  if (XmlHttp.prefix) // I know what you did last summer
    return XmlHttp.prefix;

  var prefixes = ["MSXML2", "Microsoft", "MSXML", "MSXML3"];
  var o;
  for (var i = 0; i < prefixes.length; i++) {
    try {
      // try to create the objects
      o = new ActiveXObject(prefixes[i] + ".XmlHttp");
      return XmlHttp.prefix = prefixes[i];
    }
    catch (ex) {}
  }

  throw new Error("Could not find an installed XML parser");
};


/**
 * XmlDocument factory
 * @private
 */
function XmlDocument() {}

XmlDocument.create = function (name,ns) {
  name = name || 'foo';
  ns = ns || '';

  try {
    var doc;
    // DOM2
    if (document.implementation && document.implementation.createDocument) {
      doc = document.implementation.createDocument(ns, name, null);
      // some versions of Moz do not support the readyState property
      // and the onreadystate event so we patch it!
      if (doc.readyState === null) {
          doc.readyState = 1;
          doc.addEventListener("load", function () {
              doc.readyState = 4;
              if (typeof doc.onreadystatechange == "function")
                  doc.onreadystatechange();
          }, false);
      }
    } else if (window.ActiveXObject) {
      doc = new ActiveXObject(XmlDocument.getPrefix() + ".DomDocument");
    }

    if (!doc.documentElement || doc.documentElement.tagName != name ||
        (doc.documentElement.namespaceURI &&
         doc.documentElement.namespaceURI != ns)) {
          try {
            if (ns !== '')
              doc.appendChild(doc.createElement(name)).
                setAttribute('xmlns',ns);
            else
              doc.appendChild(doc.createElement(name));
          } catch (dex) {
            doc = document.implementation.createDocument(ns,name,null);

            if (doc.documentElement === null)
              doc.appendChild(doc.createElement(name));

             // fix buggy opera 8.5x
            if (ns !== '' &&
                doc.documentElement.getAttribute('xmlns') != ns) {
              doc.documentElement.setAttribute('xmlns',ns);
            }
          }
        }

    return doc;
  }
  catch (ex) { }
  throw new Error("Your browser does not support XmlDocument objects");
};

/**
 * used to find the Automation server name
 * @private
 */
XmlDocument.getPrefix = function() {
  if (XmlDocument.prefix)
    return XmlDocument.prefix;

  var prefixes = ["MSXML2", "Microsoft", "MSXML", "MSXML3"];
  var o;
  for (var i = 0; i < prefixes.length; i++) {
    try {
      // try to create the objects
      o = new ActiveXObject(prefixes[i] + ".DomDocument");
      return XmlDocument.prefix = prefixes[i];
    }
    catch (ex) {}
  }

  throw new Error("Could not find an installed XML parser");
};


// Create the loadXML method
if (typeof(Document) != 'undefined' && window.DOMParser) {

  /**
   * XMLDocument did not extend the Document interface in some
   * versions of Mozilla.
   * @private
   */
  Document.prototype.loadXML = function (s) {

    // parse the string to a new doc
    var doc2 = (new DOMParser()).parseFromString(s, "text/xml");

    // remove all initial children
    while (this.hasChildNodes())
      this.removeChild(this.lastChild);

    // insert and import nodes
    for (var i = 0; i < doc2.childNodes.length; i++) {
      this.appendChild(this.importNode(doc2.childNodes[i], true));
    }
  };
 }

// Create xml getter for Mozilla
if (window.XMLSerializer &&
    window.Node && Node.prototype && Node.prototype.__defineGetter__) {

  /**
   * xml getter
   *
   * This serializes the DOM tree to an XML String
   *
   * Usage: var sXml = oNode.xml
   * @deprecated
   * @private
   */
  // XMLDocument did not extend the Document interface in some versions
  // of Mozilla. Extend both!
//XMLDocument.prototype.__defineGetter__("xml", function () {
//                                         return (new XMLSerializer()).serializeToString(this);
//                                       });
  /**
   * xml getter
   *
   * This serializes the DOM tree to an XML String
   *
   * Usage: var sXml = oNode.xml
   * @deprecated
   * @private
   */
  Document.prototype.__defineGetter__("xml", function () {
                                        return (new XMLSerializer()).serializeToString(this);
                                      });

  /**
   * xml getter
   *
   * This serializes the DOM tree to an XML String
   *
   * Usage: var sXml = oNode.xml
   * @deprecated
   * @private
   */
  Node.prototype.__defineGetter__("xml", function () {
                                    return (new XMLSerializer()).serializeToString(this);
                                  });
 }

/* Copyright (c) 1998 - 2007, Paul Johnston & Contributors
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following
 * disclaimer. Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following
 * disclaimer in the documentation and/or other materials provided
 * with the distribution.
 *
 * Neither the name of the author nor the names of its contributors
 * may be used to endorse or promote products derived from this
 * software without specific prior written permission.
 *
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
 * FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

/**
 * @fileoverview Collection of MD5 and SHA1 hashing and encoding
 * methods.
 * @author Stefan Strigler steve@zeank.in-berlin.de
 */


/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS 180-1
 * Version 2.2 Copyright Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = "="; /* base-64 pad character. "=" for strict RFC compliance   */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_sha1(s)    { return rstr2hex(rstr_sha1(str2rstr_utf8(s))); }
function b64_sha1(s)    { return rstr2b64(rstr_sha1(str2rstr_utf8(s))); }
function any_sha1(s, e) { return rstr2any(rstr_sha1(str2rstr_utf8(s)), e); }
function hex_hmac_sha1(k, d)
  { return rstr2hex(rstr_hmac_sha1(str2rstr_utf8(k), str2rstr_utf8(d))); }
function b64_hmac_sha1(k, d)
  { return rstr2b64(rstr_hmac_sha1(str2rstr_utf8(k), str2rstr_utf8(d))); }
function any_hmac_sha1(k, d, e)
  { return rstr2any(rstr_hmac_sha1(str2rstr_utf8(k), str2rstr_utf8(d)), e); }

/*
 * Perform a simple self-test to see if the VM is working
 */
function sha1_vm_test()
{
  return hex_sha1("abc").toLowerCase() == "a9993e364706816aba3e25717850c26c9cd0d89d";
}

/*
 * Calculate the SHA1 of a raw string
 */
function rstr_sha1(s)
{
  return binb2rstr(binb_sha1(rstr2binb(s), s.length * 8));
}

/*
 * Calculate the HMAC-SHA1 of a key and some data (raw strings)
 */
function rstr_hmac_sha1(key, data)
{
  var bkey = rstr2binb(key);
  if(bkey.length > 16) bkey = binb_sha1(bkey, key.length * 8);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = binb_sha1(ipad.concat(rstr2binb(data)), 512 + data.length * 8);
  return binb2rstr(binb_sha1(opad.concat(hash), 512 + 160));
}

/*
 * Convert a raw string to an array of big-endian words
 * Characters >255 have their high-byte silently ignored.
 */
function rstr2binb(input)
{
  var output = Array(input.length >> 2);
  for(var i = 0; i < output.length; i++)
    output[i] = 0;
  for(var i = 0; i < input.length * 8; i += 8)
    output[i>>5] |= (input.charCodeAt(i / 8) & 0xFF) << (24 - i % 32);
  return output;
}

/*
 * Convert an array of big-endian words to a string
 */
function binb2rstr(input)
{
  var output = "";
  for(var i = 0; i < input.length * 32; i += 8)
    output += String.fromCharCode((input[i>>5] >>> (24 - i % 32)) & 0xFF);
  return output;
}

/*
 * Calculate the SHA-1 of an array of big-endian words, and a bit length
 */
function binb_sha1(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << (24 - len % 32);
  x[((len + 64 >> 9) << 4) + 15] = len;

  var w = Array(80);
  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;
  var e = -1009589776;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    var olde = e;

    for(var j = 0; j < 80; j++)
    {
      if(j < 16) w[j] = x[i + j];
      else w[j] = bit_rol(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);
      var t = safe_add(safe_add(bit_rol(a, 5), sha1_ft(j, b, c, d)),
                       safe_add(safe_add(e, w[j]), sha1_kt(j)));
      e = d;
      d = c;
      c = bit_rol(b, 30);
      b = a;
      a = t;
    }

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
    e = safe_add(e, olde);
  }
  return Array(a, b, c, d, e);

}

/*
 * Perform the appropriate triplet combination function for the current
 * iteration
 */
function sha1_ft(t, b, c, d)
{
  if(t < 20) return (b & c) | ((~b) & d);
  if(t < 40) return b ^ c ^ d;
  if(t < 60) return (b & c) | (b & d) | (c & d);
  return b ^ c ^ d;
}

/*
 * Determine the appropriate additive constant for the current iteration
 */
function sha1_kt(t)
{
  return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
         (t < 60) ? -1894007588 : -899497514;
}


/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_md5(s)    { return rstr2hex(rstr_md5(str2rstr_utf8(s))); }
function b64_md5(s)    { return rstr2b64(rstr_md5(str2rstr_utf8(s))); }
function any_md5(s, e) { return rstr2any(rstr_md5(str2rstr_utf8(s)), e); }
function hex_hmac_md5(k, d)
  { return rstr2hex(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))); }
function b64_hmac_md5(k, d)
  { return rstr2b64(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))); }
function any_hmac_md5(k, d, e)
  { return rstr2any(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)), e); }

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test()
{
  return hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of a raw string
 */
function rstr_md5(s)
{
  return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
}

/*
 * Calculate the HMAC-MD5, of a key and some data (raw strings)
 */
function rstr_hmac_md5(key, data)
{
  var bkey = rstr2binl(key);
  if(bkey.length > 16) bkey = binl_md5(bkey, key.length * 8);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
  return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
}

/*
 * Convert a raw string to a hex string
 */
function rstr2hex(input)
{
  try { hexcase } catch(e) { hexcase=0; }
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var output = "";
  var x;
  for(var i = 0; i < input.length; i++)
  {
    x = input.charCodeAt(i);
    output += hex_tab.charAt((x >>> 4) & 0x0F)
           +  hex_tab.charAt( x        & 0x0F);
  }
  return output;
}

/*
 * Convert a raw string to a base-64 string
 */
function rstr2b64(input)
{
  try { b64pad } catch(e) { b64pad=''; }
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var output = "";
  var len = input.length;
  for(var i = 0; i < len; i += 3)
  {
    var triplet = (input.charCodeAt(i) << 16)
                | (i + 1 < len ? input.charCodeAt(i+1) << 8 : 0)
                | (i + 2 < len ? input.charCodeAt(i+2)      : 0);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > input.length * 8) output += b64pad;
      else output += tab.charAt((triplet >>> 6*(3-j)) & 0x3F);
    }
  }
  return output;
}

/*
 * Convert a array to a base-64 string
 */
function arr2b64(input)
{
  try { b64pad } catch(e) { b64pad=''; }
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var output = "";
  var len = input.length;
  for(var i = 0; i < len; i += 3)
  {
    var triplet = (input[i] << 16)
                | (i + 1 < len ? input[i+1] << 8 : 0)
                | (i + 2 < len ? input[i+2]      : 0);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > input.length * 8) output += b64pad;
      else output += tab.charAt((triplet >>> 6*(3-j)) & 0x3F);
    }
  }
  return output;
}

/*
 * Convert a raw string to an arbitrary string encoding
 */
function rstr2any(input, encoding)
{
  var divisor = encoding.length;
  var i, j, q, x, quotient;

  /* Convert to an array of 16-bit big-endian values, forming the dividend */
  var dividend = Array(Math.ceil(input.length / 2));
  for(i = 0; i < dividend.length; i++)
  {
    dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
  }

  /*
   * Repeatedly perform a long division. The binary array forms the dividend,
   * the length of the encoding is the divisor. Once computed, the quotient
   * forms the dividend for the next step. All remainders are stored for later
   * use.
   */
  var full_length = Math.ceil(input.length * 8 /
                                    (Math.log(encoding.length) / Math.log(2)));
  var remainders = Array(full_length);
  for(j = 0; j < full_length; j++)
  {
    quotient = Array();
    x = 0;
    for(i = 0; i < dividend.length; i++)
    {
      x = (x << 16) + dividend[i];
      q = Math.floor(x / divisor);
      x -= q * divisor;
      if(quotient.length > 0 || q > 0)
        quotient[quotient.length] = q;
    }
    remainders[j] = x;
    dividend = quotient;
  }

  /* Convert the remainders to the output string */
  var output = "";
  for(i = remainders.length - 1; i >= 0; i--)
    output += encoding.charAt(remainders[i]);

  return output;
}

/*
 * Encode a string as utf-8.
 * For efficiency, this assumes the input is valid utf-16.
 */
function str2rstr_utf8(input)
{
  var output = "";
  var i = -1;
  var x, y;

  while(++i < input.length)
  {
    /* Decode utf-16 surrogate pairs */
    x = input.charCodeAt(i);
    y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
    if(0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF)
    {
      x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
      i++;
    }

    /* Encode output as utf-8 */
    if(x <= 0x7F)
      output += String.fromCharCode(x);
    else if(x <= 0x7FF)
      output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F),
                                    0x80 | ( x         & 0x3F));
    else if(x <= 0xFFFF)
      output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
                                    0x80 | ((x >>> 6 ) & 0x3F),
                                    0x80 | ( x         & 0x3F));
    else if(x <= 0x1FFFFF)
      output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
                                    0x80 | ((x >>> 12) & 0x3F),
                                    0x80 | ((x >>> 6 ) & 0x3F),
                                    0x80 | ( x         & 0x3F));
  }
  return output;
}

/*
 * Encode a string as utf-16
 */
function str2rstr_utf16le(input)
{
  var output = "";
  for(var i = 0; i < input.length; i++)
    output += String.fromCharCode( input.charCodeAt(i)        & 0xFF,
                                  (input.charCodeAt(i) >>> 8) & 0xFF);
  return output;
}

function str2rstr_utf16be(input)
{
  var output = "";
  for(var i = 0; i < input.length; i++)
    output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF,
                                   input.charCodeAt(i)        & 0xFF);
  return output;
}

/*
 * Convert a raw string to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */
function rstr2binl(input)
{
  var output = Array(input.length >> 2);
  for(var i = 0; i < output.length; i++)
    output[i] = 0;
  for(var i = 0; i < input.length * 8; i += 8)
    output[i>>5] |= (input.charCodeAt(i / 8) & 0xFF) << (i%32);
  return output;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2rstr(input)
{
  var output = "";
  for(var i = 0; i < input.length * 32; i += 8)
    output += String.fromCharCode((input[i>>5] >>> (i % 32)) & 0xFF);
  return output;
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */
function binl_md5(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);
}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}


/* #############################################################################
   UTF-8 Decoder and Encoder
   base64 Encoder and Decoder
   written by Tobias Kieslich, justdreams
   Contact: tobias@justdreams.de				http://www.justdreams.de/
   ############################################################################# */

// returns an array of byterepresenting dezimal numbers which represent the
// plaintext in an UTF-8 encoded version. Expects a string.
// This function includes an exception management for those nasty browsers like
// NN401, which returns negative decimal numbers for chars>128. I hate it!!
// This handling is unfortunately limited to the user's charset. Anyway, it works
// in most of the cases! Special signs with an unicode>256 return numbers, which
// can not be converted to the actual unicode and so not to the valid utf-8
// representation. Anyway, this function does always return values which can not
// misinterpretd by RC4 or base64 en- or decoding, because every value is >0 and
// <255!!
// Arrays are faster and easier to handle in b64 encoding or encrypting....
function utf8t2d(t)
{
  t = t.replace(/\r\n/g,"\n");
  var d=new Array; var test=String.fromCharCode(237);
  if (test.charCodeAt(0) < 0)
    for(var n=0; n<t.length; n++)
      {
        var c=t.charCodeAt(n);
        if (c>0)
          d[d.length]= c;
        else {
          d[d.length]= (((256+c)>>6)|192);
          d[d.length]= (((256+c)&63)|128);}
      }
  else
    for(var n=0; n<t.length; n++)
      {
        var c=t.charCodeAt(n);
        // all the signs of asci => 1byte
        if (c<128)
          d[d.length]= c;
        // all the signs between 127 and 2047 => 2byte
        else if((c>127) && (c<2048)) {
          d[d.length]= ((c>>6)|192);
          d[d.length]= ((c&63)|128);}
        // all the signs between 2048 and 66536 => 3byte
        else {
          d[d.length]= ((c>>12)|224);
          d[d.length]= (((c>>6)&63)|128);
          d[d.length]= ((c&63)|128);}
      }
  return d;
}

// returns plaintext from an array of bytesrepresenting dezimal numbers, which
// represent an UTF-8 encoded text; browser which does not understand unicode
// like NN401 will show "?"-signs instead
// expects an array of byterepresenting decimals; returns a string
function utf8d2t(d)
{
  var r=new Array; var i=0;
  while(i<d.length)
    {
      if (d[i]<128) {
        r[r.length]= String.fromCharCode(d[i]); i++;}
      else if((d[i]>191) && (d[i]<224)) {
        r[r.length]= String.fromCharCode(((d[i]&31)<<6) | (d[i+1]&63)); i+=2;}
      else {
        r[r.length]= String.fromCharCode(((d[i]&15)<<12) | ((d[i+1]&63)<<6) | (d[i+2]&63)); i+=3;}
    }
  return r.join("");
}

// included in <body onload="b64arrays"> it creates two arrays which makes base64
// en- and decoding faster
// this speed is noticeable especially when coding larger texts (>5k or so)
function b64arrays() {
  var b64s='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  b64 = new Array();f64 =new Array();
  for (var i=0; i<b64s.length ;i++) {
    b64[i] = b64s.charAt(i);
    f64[b64s.charAt(i)] = i;
  }
}

// creates a base64 encoded text out of an array of byerepresenting dezimals
// it is really base64 :) this makes serversided handling easier
// expects an array; returns a string
function b64d2t(d) {
  var r=new Array; var i=0; var dl=d.length;
  // this is for the padding
  if ((dl%3) == 1) {
    d[d.length] = 0; d[d.length] = 0;}
  if ((dl%3) == 2)
    d[d.length] = 0;
  // from here conversion
  while (i<d.length)
    {
      r[r.length] = b64[d[i]>>2];
      r[r.length] = b64[((d[i]&3)<<4) | (d[i+1]>>4)];
      r[r.length] = b64[((d[i+1]&15)<<2) | (d[i+2]>>6)];
      r[r.length] = b64[d[i+2]&63];
      i+=3;
    }
  // this is again for the padding
  if ((dl%3) == 1)
    r[r.length-1] = r[r.length-2] = "=";
  if ((dl%3) == 2)
    r[r.length-1] = "=";
  // we join the array to return a textstring
  var t=r.join("");
  return t;
}

// returns array of byterepresenting numbers created of an base64 encoded text
// it is still the slowest function in this modul; I hope I can make it faster
// expects string; returns an array
function b64t2d(t) {
  var d=new Array; var i=0;
  // here we fix this CRLF sequenz created by MS-OS; arrrgh!!!
  t=t.replace(/\n|\r/g,""); t=t.replace(/=/g,"");
  while (i<t.length)
    {
      d[d.length] = (f64[t.charAt(i)]<<2) | (f64[t.charAt(i+1)]>>4);
      d[d.length] = (((f64[t.charAt(i+1)]&15)<<4) | (f64[t.charAt(i+2)]>>2));
      d[d.length] = (((f64[t.charAt(i+2)]&3)<<6) | (f64[t.charAt(i+3)]));
      i+=4;
    }
  if (t.length%4 == 2)
    d = d.slice(0, d.length-2);
  if (t.length%4 == 3)
    d = d.slice(0, d.length-1);
  return d;
}

if (typeof(atob) == 'undefined' || typeof(btoa) == 'undefined')
  b64arrays();

if (typeof(atob) == 'undefined') {
  b64decode = function(s) {
    return utf8d2t(b64t2d(s));
  };
  b64decode_bin = function(s) {
    var dec = b64t2d(s);
    var ret = '';
    for(var i = 0; i < dec.length; i++) {
      ret += String.fromCharCode(dec[i]);
    }
    return ret;
  };
} else {
  b64decode = function(s) {
    return decodeURIComponent(escape(atob(s)));
  };
  b64decode_bin = atob;
}

if (typeof(btoa) == 'undefined') {
  b64encode = function(s) {
    return b64d2t(utf8t2d(s));
  };
} else {
  b64encode = function(s) {
    return btoa(unescape(encodeURIComponent(s)));
  };
}

function createXHR() {
	var xhr;
	if (typeof ActiveXObject != 'undefined') {
		var aVersions = [ "Microsoft.XMLHTTP", "Msxml2.XMLHttp.6.0",
		                  "Msxml2.XMLHttp.5.0", "Msxml2.XMLHttp.4.0",
		                  "Msxml2.XMLHttp.3.0" ];
		for (var i = 0; i < aVersions.length; i++) {
			try {
				xhr = new ActiveXObject(aVersions[i]);
			} catch (e) {
			}
		}
	} else if (typeof XMLHttpRequest != 'undefined') {
		xhr = new XMLHttpRequest();
	}
	return xhr;
}

if (window.XDomainRequest) {
    window.ieXDRToXHR = function(window) {
        "use strict";
        var XHR = window.XMLHttpRequest;

        window.XMLHttpRequest = function() {
            this.onreadystatechange = Object;

            this.xhr = null;
            this.xdr = null;

            this.readyState = 0;
            this.status = '';
            this.statusText = null;
            this.responseText = null;

            this.getResponseHeader = null;
            this.getAllResponseHeaders = null;

            this.setRequestHeader = null;

            this.abort = null;
            this.send = null;
            this.isxdr = false;

            // static binding
            var self = this;

            self.xdrLoadedBinded = function() {
                self.xdrLoaded();
            };
            self.xdrErrorBinded = function() {
                self.xdrError();
            };
            self.xdrProgressBinded = function() {
                self.xdrProgress();
            };
            self.xhrReadyStateChangedBinded = function() {
                self.xhrReadyStateChanged();
            };
        };

        XMLHttpRequest.prototype.open = function(method, url, asynch, user, pwd) {
            //improve CORS deteciton (chat.example.net exemple.net), remove hardcoded http-bind
            var parser = document.createElement('a');
            parser.href = url;
            if (!!parser.hostname && parser.hostname!=document.domain) {
                if (this.xdr === null){
                    this.xdr = new window.XDomainRequest();
                }

                this.isxdr = true;
                this.setXDRActive();
                this.xdr.open(method, url);
            } else {
                if (this.xhr === null){
                    this.xhr = new XHR();
                }

                this.isxdr = false;
                this.setXHRActive();
                this.xhr.open(method, url, asynch, user, pwd);
            }
        };

        XMLHttpRequest.prototype.xdrGetResponseHeader = function(name) {
            if (name === 'Content-Type' && this.xdr.contentType > ''){
                return this.xdr.contentType;
            }

            return '';
        };
        
        XMLHttpRequest.prototype.xdrGetAllResponseHeaders = function() {
            return (this.xdr.contentType > '') ? 'Content-Type: ' + this.xdr.contentType : '';
        };
        
        XMLHttpRequest.prototype.xdrSetRequestHeader = function(name, value) {
            //throw new Error('Request headers not supported');
        };
        
        XMLHttpRequest.prototype.xdrLoaded = function() {
            if (this.onreadystatechange !== null) {
                this.readyState = 4;
                this.status = 200;
                this.statusText = 'OK';
                this.responseText = this.xdr.responseText;
                if (window.ActiveXObject){
                    var doc = new ActiveXObject('Microsoft.XMLDOM');
                    doc.async='false';
                    doc.loadXML(this.responseText);
                    this.responseXML = doc;
                }
                this.onreadystatechange();
            }
        };
        
        XMLHttpRequest.prototype.xdrError = function() {
            if (this.onreadystatechange !== null) {
                this.readyState = 4;
                this.status = 0;
                this.statusText = '';
                // ???
                this.responseText = '';
                this.onreadystatechange();
            }
        };
        
        XMLHttpRequest.prototype.xdrProgress = function() {
            if (this.onreadystatechange !== null && this.status !== 3) {
                this.readyState = 3;
                this.status = 3;
                this.statusText = '';
                this.onreadystatechange();
            }
        };
        
        XMLHttpRequest.prototype.finalXDRRequest = function() {
            var xdr = this.xdr;
            delete xdr.onload;
            delete xdr.onerror;
            delete xdr.onprogress;
        };
        
        XMLHttpRequest.prototype.sendXDR = function(data) {
            var xdr = this.xdr;

            xdr.onload = this.xdrLoadedBinded;
            xdr.onerror = this.xdr.ontimeout = this.xdrErrorBinded;
            xdr.onprogress = this.xdrProgressBinded;
            this.responseText = null;

            this.xdr.send(data);
        };
        
        XMLHttpRequest.prototype.abortXDR = function() {
            this.finalXDRRequest();
            this.xdr.abort();
        };
        
        XMLHttpRequest.prototype.setXDRActive = function() {
            this.send = this.sendXDR;
            this.abort = this.abortXDR;
            this.getResponseHeader = this.xdrGetResponseHeader;
            this.getAllResponseHeaders = this.xdrGetAllResponseHeaders;
            this.setRequestHeader = this.xdrSetRequestHeader;
        };

        XMLHttpRequest.prototype.xhrGetResponseHeader = function(name) {
            return this.xhr.getResponseHeader(name);
        };
        
        XMLHttpRequest.prototype.xhrGetAllResponseHeaders = function() {
            return this.xhr.getAllResponseHeaders();
        };
        
        XMLHttpRequest.prototype.xhrSetRequestHeader = function(name, value) {
            return this.xhr.setRequestHeader(name, value);
        };
        
        XMLHttpRequest.prototype.xhrReadyStateChanged = function() {
            if (this.onreadystatechange !== null && this.readyState !== this.xhr.readyState) {
                var xhr = this.xhr;

                this.readyState = xhr.readyState;
                if (this.readyState === 4) {
                    this.status = xhr.status;
                    this.statusText = xhr.statusText;
                    this.responseText = xhr.responseText;
                    this.responseXML = xhr.responseXML;
                }

                this.onreadystatechange();
            }
        };
        
        XMLHttpRequest.prototype.finalXHRRequest = function() {
            delete this.xhr.onreadystatechange;
        };
        XMLHttpRequest.prototype.abortXHR = function() {
            this.finalXHRRequest();
            this.xhr.abort();
        };
        XMLHttpRequest.prototype.sendXHR = function(data) {
            this.xhr.onreadystatechange = this.xhrReadyStateChangedBinded;

            this.xhr.send(data);
        };
        XMLHttpRequest.prototype.setXHRActive = function() {
            this.send = this.sendXHR;
            this.abort = this.abortXHR;
            this.getResponseHeader = this.xhrGetResponseHeader;
            this.getAllResponseHeaders = this.xhrGetAllResponseHeaders;
            this.setRequestHeader = this.xhrSetRequestHeader;
        };

        window.ieXDRToXHR = undefined;
    };
    var isWebsocketSupport = (function() {
		var isSafari = navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") < 1 ; //判断是否Safari 
		if(isSafari)
			return false;
		window.WebSocket =window.WebSocket || window.MozWebSocket;
		if (window.WebSocket) {
			return true;
		}
		return false;
	})();
    if(!isWebsocketSupport)
    	window.ieXDRToXHR(window);
}

/**
 * @fileoverview Collection of functions to make live easier
 * @author Stefan Strigler
 */

/**
 * Convert special chars to HTML entities
 * @addon
 * @return The string with chars encoded for HTML
 * @type String
 */
String.prototype.htmlEnc = function() {
  if(!this)
    return this;

  var str = this.replace(/&/g,"&amp;");
  str = str.replace(/</g,"&lt;");
  str = str.replace(/>/g,"&gt;");
  str = str.replace(/\"/g,"&quot;");
  str = str.replace(/\n/g,"<br />");
  return str;
};

/**
 * Convert HTML entities to special chars
 * @addon
 * @return The normal string
 * @type String
 */
String.prototype.revertHtmlEnc = function() {
  if(!this)
    return this;

  var str = this.replace(/&amp;/gi,'&');
  str = str.replace(/&lt;/gi,'<');
  str = str.replace(/&gt;/gi,'>');
  str = str.replace(/&quot;/gi,'\"');
  str = str.replace(/<br( )?(\/)?>/gi,'\n');
  return str;
};

/**
 * Converts from jabber timestamps to JavaScript Date objects
 * @addon
 * @param {String} ts A string representing a jabber datetime timestamp as
 * defined by {@link http://www.xmpp.org/extensions/xep-0082.html XEP-0082}
 * @return A javascript Date object corresponding to the jabber DateTime given
 * @type Date
 */
Date.jab2date = function(ts) {
  var date = new Date(Date.UTC(ts.substr(0,4),ts.substr(5,2)-1,ts.substr(8,2),ts.substr(11,2),ts.substr(14,2),ts.substr(17,2)));
  if (ts.substr(ts.length-6,1) != 'Z') { // there's an offset
    var offset = new Date();
    offset.setTime(0);
    offset.setUTCHours(ts.substr(ts.length-5,2));
    offset.setUTCMinutes(ts.substr(ts.length-2,2));
    if (ts.substr(ts.length-6,1) == '+')
      date.setTime(date.getTime() - offset.getTime());
    else if (ts.substr(ts.length-6,1) == '-')
      date.setTime(date.getTime() + offset.getTime());
  }
  return date;
};

/**
 * Takes a timestamp in the form of 2004-08-13T12:07:04+02:00 as argument
 * and converts it to some sort of humane readable format
 * @addon
 */
Date.hrTime = function(ts) {
  return Date.jab2date(ts).toLocaleString();
};

/**
 * somewhat opposit to {@link #hrTime}
 * expects a javascript Date object as parameter and returns a jabber
 * date string conforming to
 * {@link http://www.xmpp.org/extensions/xep-0082.html XEP-0082}
 * @see #hrTime
 * @return The corresponding jabber DateTime string
 * @type String
 */
Date.prototype.jabberDate = function() {
  var padZero = function(i) {
    if (i < 10) return "0" + i;
    return i;
  };

  var jDate = this.getUTCFullYear() + "-";
  jDate += padZero(this.getUTCMonth()+1) + "-";
  jDate += padZero(this.getUTCDate()) + "T";
  jDate += padZero(this.getUTCHours()) + ":";
  jDate += padZero(this.getUTCMinutes()) + ":";
  jDate += padZero(this.getUTCSeconds()) + "Z";

  return jDate;
};

/**
 * Determines the maximum of two given numbers
 * @addon
 * @param {Number} A a number
 * @param {Number} B another number
 * @return the maximum of A and B
 * @type Number
 */
Number.max = function(A, B) {
  return (A > B)? A : B;
};

Number.min = function(A, B) {
  return (A < B)? A : B;
};

/**
 * @fileoverview Magic dependency loading. Taken from script.aculo.us
 * and modified to break it.
 * @author Stefan Strigler steve@zeank.in-berlin.de
 */

/*exported JSJaC */

var JSJaC = {
  Version: '1.4',
  bind: function(fn, obj, optArg) {
    return function(arg) {
      return fn.apply(obj, [arg, optArg]);
    };
  }
};

/* Copyright (c) 2005 Thomas Fuchs (http://script.aculo.us, http://mir.aculo.us)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
 * BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/*exported JSJaCBuilder */

/**
 * This code is taken from 
 * {@link http://wiki.script.aculo.us/scriptaculous/show/Builder | script.aculo.us' Dom Builder} 
 * and has been modified to suit our
 * needs.<br/>
 * The original parts of the code do have the following
 * copyright and license notice:<br/>
 * Copyright (c) 2005, 2006 Thomas Fuchs (http://script.aculo.us,
 * http://mir.acu lo.us) <br/>
 * script.aculo.us is freely distributable under the terms of an
 * MIT-style license.<br>
 * For details, see the script.aculo.us web site at
 * {@link http://script.aculo.us/}
 * @namespace
 */
var JSJaCBuilder = {

    /**
     * build a new node within an xml document
     * @param {XMLDocument} doc an xml document to build the new nodes for
     * @param {string} elementName the name of the element to be created
     */
  buildNode: function(doc, elementName) {

    var element, ns = arguments[4];

    // attributes (or text)
    if(arguments[2])
      if(JSJaCBuilder._isStringOrNumber(arguments[2]) ||
         (arguments[2] instanceof Array)) {
        element = this._createElement(doc, elementName, ns);
        JSJaCBuilder._children(doc, element, arguments[2]);
      } else {
        ns = arguments[2]['xmlns'] || ns;
        element = this._createElement(doc, elementName, ns);
        for(var attr in arguments[2]) {
          if (arguments[2].hasOwnProperty(attr) && attr != 'xmlns')
            element.setAttribute(attr, arguments[2][attr]);
        }
      }
    else
      element = this._createElement(doc, elementName, ns);
    // text, or array of children
    if(arguments[3])
      JSJaCBuilder._children(doc, element, arguments[3], ns);

    return element;
  },

  /**
   * @private
   */
  _createElement: function(doc, elementName, ns) {
    try {
      if (ns)
        return doc.createElementNS(ns, elementName);
    } catch (ex) { }

    var el = doc.createElement(elementName);

    if (ns)
      el.setAttribute("xmlns", ns);

    return el;
  },

  /**
   * @private
   */
  _text: function(doc, text) {
    return doc.createTextNode(text);
  },

  /**
   * @private
   */
  _children: function(doc, element, children, ns) {
    if(typeof children=='object') { // array can hold nodes and text
      for (var i in children) {
        if (children.hasOwnProperty(i)) {
          var e = children[i];
          if (typeof e=='object') {
            if (e instanceof Array) {
              var node = JSJaCBuilder.buildNode(doc, e[0], e[1], e[2], ns);
              element.appendChild(node);
            } else {
              element.appendChild(e);
            }
          } else {
            if(JSJaCBuilder._isStringOrNumber(e)) {
              element.appendChild(JSJaCBuilder._text(doc, e));
            }
          }
        }
      }
    } else {
      if(JSJaCBuilder._isStringOrNumber(children)) {
        element.appendChild(JSJaCBuilder._text(doc, children));
      }
    }
  },

  /**
   * @private
   */
  _attributes: function(attributes) {
    var attrs = [];
    for(var attribute in attributes)
      if (attributes.hasOwnProperty(attribute))
        attrs.push(attribute +
          '="' + attributes[attribute].toString().htmlEnc() + '"');
    return attrs.join(" ");
  },

  /**
   * @private
   */
  _isStringOrNumber: function(param) {
    return(typeof param=='string' || typeof param=='number');
  }
};

JSJAC_HAVEKEYS = true;          // whether to use keys
JSJAC_NKEYS    = 16;            // number of keys to generate

JSJAC_INACTIVITY = 300;         // qnd hack to make suspend/resume
                                // work more smoothly with polling

JSJAC_ERR_COUNT = 10;           // number of retries in case of
                                // connection errors

JSJAC_ALLOW_PLAIN = true;       // whether to allow plaintext logins

JSJAC_ALLOW_SCRAM = false;      // allow usage of SCRAM-SHA-1
                                // authentication; please note that it
                                // is quite slow so it is disable by
                                // default

JSJAC_CHECKQUEUEINTERVAL = 100; // msecs to poll send queue
JSJAC_CHECKINQUEUEINTERVAL = 100; // msecs to poll incoming queue
JSJAC_TIMERVAL = 2000;          // default polling interval

JSJAC_RETRYDELAY = 5000;        // msecs to wait before trying next
                                // request after error

JSJAC_REGID_TIMEOUT = 20000;    // time in msec until registered
                                // callbacks for ids timeout

/* Options specific to HTTP Binding (BOSH) */
JSJACHBC_MAX_HOLD = 1;          // default for number of connctions
                                // held by connection manager

JSJACHBC_MAX_WAIT = 300;        // default 'wait' param - how long an
                                // idle connection should be held by
                                // connection manager

JSJACHBC_BOSH_VERSION  = "1.10";
JSJACHBC_USE_BOSH_VER  = true;

JSJACHBC_MAXPAUSE = 120;        // how long a suspend/resume cycle may
                                // take

/*** END CONFIG ***/

/**
 * @fileoverview Contains all things in common for all subtypes of connections
 * supported.
 * @author Stefan Strigler steve@zeank.in-berlin.de
 */

/*exported JSJaCConnection */

/**
 * Creates a new Jabber/XMPP connection (a connection to a jabber server)
 * 
 * @class Somewhat abstract base class for jabber connections. Contains all of the code in common for all jabber connections
 * @constructor
 * @param {Object} oArg Configurational object for this connection.
 * @param {string} oArg.httpbase The connection endpoint of the HTTP service to talk to.
 * @param {JSJaCDebugger} [oArg.oDbg] A reference to a debugger implementing the JSJaCDebugger interface.
 * @param {int} [oArg.timerval] The polling interval.
 * @param {string} [oArg.cookie_prefix] Prefix to cookie names used when suspending.
 */
function JSJaCConnection(oArg) {

	if (oArg && oArg.httpbase)
		/**
		 * @private
		 */
		this._httpbase = oArg.httpbase;

	if (oArg && oArg.oDbg && oArg.oDbg.log) {
		/**
		 * Reference to debugger interface (needs to implement method <code>log</code>)
		 * 
		 * @type JSJaCDebugger
		 */
		this.oDbg = oArg.oDbg;
	} else {
		this.oDbg = {
			log : function() {
			}
		};
	}

	if (oArg && oArg.timerval)
		this.setPollInterval(oArg.timerval);
	else
		this.setPollInterval(JSJAC_TIMERVAL);

	if (oArg && oArg.cookie_prefix)
		/**
		 * @private
		 */
		this._cookie_prefix = oArg.cookie_prefix;
	else
		this._cookie_prefix = "";

	/**
	 * @private
	 */
	this._connected = false;
	/**
	 * @private
	 */
	this._events = [];
	/**
	 * @private
	 */
	this._keys = null;
	/**
	 * @private
	 */
	this._ID = 0;
	
	/**
	 * @Private
	 */
	this._IDPrefix = 'jump' + new Date().format('yyMMdd') + '_';
	/**
	 * @private
	 */
	this._inQ = [];
	/**
	 * @private
	 */
	this._pQueue = [];
	/**
	 * @private
	 */
	this._regIDs = [];
	/**
	 * @private
	 */
	this._req = [];
	/**
	 * @private
	 */
	this._status = 'intialized';
	/**
	 * @private
	 */
	this._errcnt = 0;
	/**
	 * @private
	 */
	this._inactivity = JSJAC_INACTIVITY;
	/**
	 * @private
	 */
	this._sendRawCallbacks = [];
}

/**
 * Connect to a jabber/XMPP server.
 * 
 * @param {Object} oArg The configuration to be used for connecting.
 * @param {string} oArg.domain The domain name of the XMPP service.
 * @param {string} oArg.username The username (nodename) to be logged in with.
 * @param {string} oArg.resource The resource to identify the login with.
 * @param {string} oArg.password The user's password.
 * @param {string} [oArg.authzid] Authorization identity. Used to act as another user, in most cases not needed and rarely supported by servers. If
 *            present should be a bare JID (user@example.net).
 * @param {boolean} [oArg.allow_plain] Whether to allow plain text logins.
 * @param {boolean} [oArg.allow_scram] Whether to allow SCRAM-SHA-1 authentication. Please note that it is quite slow, do some testing on all required
 *            browsers before enabling.
 * @param {boolean} [oArg.register] Whether to register a new account.
 * @param {string} [oArg.host] The host to connect to which might be different from the domain given above. So some XMPP service might host the domain
 *            'example.com' but might be located at the host 'jabber.example.com'. Normally such situations should be gracefully handled by using DNS
 *            SRV records. But in cases where this isn't available you can set the host manually here.
 * @param {int} [oArg.port] The port of the manually given host from above.
 * @param {string} [oArg.authhost] The host that handles the actualy authorization. There are cases where this is different from the settings above,
 *            e.g. if there's a service that provides anonymous logins at 'anon.example.org'.
 * @param {string} [oArg.authtype] Must be one of 'sasl' (default), 'nonsasl', 'saslanon', or 'anonymous'.
 * @param {string} [oArg.xmllang] The requested language for this login. Typically XMPP server try to respond with error messages and the like in this
 *            language if available.
 */
JSJaCConnection.prototype.connect = function(oArg) {
	this._setStatus('connecting');

	if(oArg.appType){
		this.appType = oArg.appType;				//rongqb for esn 20170223
	}
    
    if(oArg.clientIdentify){
    		this.clientIdentify = oArg.clientIdentify;	//rongqb for esn 20170223
    }
	
	this.domain = oArg.domain || 'localhost';
	this.username = oArg.username;
	this.resource = oArg.resource;
	this.pass = oArg.password || oArg.pass;
	this.authzid = oArg.authzid || '';
	this.register = oArg.register;

	this.authhost = oArg.authhost || oArg.host || oArg.domain;
	this.authtype = oArg.authtype || 'sasl';

	if (oArg.xmllang && oArg.xmllang !== '')
		this._xmllang = oArg.xmllang;
	else
		this._xmllang = 'en';

	if (oArg.allow_plain)
		this._allow_plain = oArg.allow_plain;
	else
		this._allow_plain = JSJAC_ALLOW_PLAIN;

	if (oArg.allow_scram)
		this._allow_scram = oArg.allow_scram;
	else
		this._allow_scram = JSJAC_ALLOW_SCRAM;

	this.host = oArg.host;
	this.port = oArg.port || 5222;

	this.jid = this.username + '@' + this.domain;
	this.fulljid = this.jid + '/' + this.resource;

	this._rid = Math.round(100000.5 + (((900000.49999) - (100000.5)) * Math.random()));

	// setupRequest must be done after rid is created but before first use in reqstr
	var slot = this._getFreeSlot();
	this._req[slot] = this._setupRequest(true);

	var reqstr = this._getInitialRequestString();
	
	this.oDbg.log(reqstr, 4);
	
	this._req[slot].r.onreadystatechange = JSJaC.bind(function() {
		var r = this._req[slot].r;
		if (r.readyState == 4) {
			this.oDbg.log("async recv: " + r.responseText, 4);
			this._handleInitialResponse(r); // handle response
		}
	}, this);

	if (typeof (this._req[slot].r.onerror) != 'undefined') {
		this._req[slot].r.onerror = JSJaC.bind(function() {
			this.oDbg.log('XmlHttpRequest error', 1);
		}, this);
	}

	this._req[slot].r.send(reqstr);
};

/**
 * Tells whether this connection is connected
 * 
 * @return <code>true</code> if this connections is connected, <code>false</code> otherwise
 * @type boolean
 */
JSJaCConnection.prototype.connected = function() {
	return this._connected;
};

/**
 * Disconnects from jabber server and terminates session (if applicable)
 */
JSJaCConnection.prototype.disconnect = function() {
	this._setStatus('disconnecting');

	if (!this.connected())
		return;
	this._connected = false;

	clearInterval(this._interval);
	clearInterval(this._inQto);

	if (this._timeout)
		clearTimeout(this._timeout); // remove timer

	var slot = this._getFreeSlot();
	// Intentionally synchronous
	this._req[slot] = this._setupRequest(false);

	var request = this._getRequestString(false, true);

	this.oDbg.log("Disconnecting: " + request, 4);
	try {
		this._req[slot].r.send(request);
	} catch (e) {
	}
	this.oDbg.log("disconnected");
	try {
		JSJaCCookie.read(this._cookie_prefix + 'JSJaC_State').erase();
	} catch (e) {
	}

	this._handleEvent('ondisconnect');
};

/**
 * Gets current value of polling interval
 * 
 * @return Polling interval in milliseconds
 * @type int
 */
JSJaCConnection.prototype.getPollInterval = function() {
	return this._timerval;
};

/**
 * Registers an event handler (callback) for this connection.
 * 
 * <p>
 * Note: All of the packet handlers for specific packets (like message_in, presence_in and iq_in) fire only if there's no callback associated with the
 * id.<br>
 * 
 * <p>
 * Example:<br/> <code>con.registerHandler('iq', 'query', 'jabber:iq:version', handleIqVersion);</code>
 * 
 * 
 * @param {String} event One of
 * 
 * <ul>
 * <li>onConnect - connection has been established and authenticated</li>
 * <li>onDisconnect - connection has been disconnected</li>
 * <li>onResume - connection has been resumed</li>
 * 
 * <li>onStatusChanged - connection status has changed, current status as being passed argument to handler. See {@link #status}.</li>
 * 
 * <li>onError - an error has occured, error node is supplied as argument, like this:<br>
 * <code>&lt;error code='404' type='cancel'&gt;<br>
 * &lt;item-not-found xmlns='urn:ietf:params:xml:ns:xmpp-stanzas'/&gt;<br>
 * &lt;/error&gt;</code></li>
 * 
 * <li>packet_in - a packet has been received (argument: the packet)</li>
 * 
 * <li>packet_out - a packet is to be sent(argument: the packet)</li>
 * 
 * <li>message_in | message - a message has been received (argument: the packet)</li>
 * 
 * <li>message_out - a message packet is to be sent (argument: the packet)</li>
 * 
 * <li>presence_in | presence - a presence has been received (argument: the packet)</li>
 * 
 * <li>presence_out - a presence packet is to be sent (argument: the packet)</li>
 * 
 * <li>iq_in | iq - an iq has been received (argument: the packet)</li>
 * <li>iq_out - an iq is to be sent (argument: the packet)</li>
 * </ul>
 * 
 * @param {String} childName A childnode's name that must occur within a retrieved packet [optional]
 * 
 * @param {String} childNS A childnode's namespace that must occure within a retrieved packet (works only if childName is given) [optional]
 * 
 * @param {String} type The type of the packet to handle (works only if childName and chidNS are given (both may be set to '*' in order to get
 *            skipped) [optional]
 * 
 * @param {Function} handler The handler to be called when event occurs. If your handler returns 'true' it cancels bubbling of the event. No other
 *            registered handlers for this event will be fired.
 * 
 * @return This object
 */
JSJaCConnection.prototype.registerHandler = function(event, ns, type, handler) {
	event = event.toLowerCase(); // don't be case-sensitive here
	var eArg = {
		handler : arguments[arguments.length - 1],
		ns : '*',
		type : '*'
	};
	if (arguments.length > 2)
		eArg.ns = arguments[1];
	if (arguments.length > 3)
		eArg.type = arguments[2];
	if (!this._events[event])
		this._events[event] = [ eArg ];
	else
		this._events[event] = this._events[event].concat(eArg);

	// sort events in order how specific they match criterias thus using
	// wildcard patterns puts them back in queue when it comes to
	// bubbling the event
	this._events[event] = this._events[event].sort(function(a, b) {
		var aRank = 0;
		var bRank = 0;

		if (a.type == '*')
			aRank++;
		if (a.ns == '*')
			aRank++;
			aRank++;
		if (b.type == '*')
			bRank++;
		if (b.ns == '*')
			bRank++;

		if (aRank > bRank)
			return 1;
		if (aRank < bRank)
			return -1;
		return 0;
	});
	this.oDbg.log("registered handler for event '" + event + "'", 2);

	return this;
};

JSJaCConnection.prototype.unregisterHandler = function(event, handler) {
	event = event.toLowerCase(); // don't be case-sensitive here

	if (!this._events[event])
		return this;

	var arr = this._events[event], res = [];
	for (var i = 0; i < arr.length; i++)
		if (arr[i].handler != handler)
			res.push(arr[i]);

	if (arr.length != res.length) {
		this._events[event] = res;
		this.oDbg.log("unregistered handler for event '" + event + "'", 2);
	}

	return this;
};

/**
 * Register for iq packets of type 'get'.
 * 
 * @param {String} childName A childnode's name that must occur within a retrieved packet
 * 
 * @param {String} childNS A childnode's namespace that must occure within a retrieved packet (works only if childName is given)
 * 
 * @param {Function} handler The handler to be called when event occurs. If your handler returns 'true' it cancels bubbling of the event. No other
 *            registered handlers for this event will be fired.
 * 
 * @return This object
 */
JSJaCConnection.prototype.registerIQGet = function(childName, childNS, handler) {
	return this.registerHandler('iq', childName, childNS, 'get', handler);
};

/**
 * Register for iq packets of type 'set'.
 * 
 * @param {String} childName A childnode's name that must occur within a retrieved packet
 * 
 * @param {String} childNS A childnode's namespace that must occure within a retrieved packet (works only if childName is given)
 * 
 * @param {Function} handler The handler to be called when event occurs. If your handler returns 'true' it cancels bubbling of the event. No other
 *            registered handlers for this event will be fired.
 * 
 * @return This object
 */
JSJaCConnection.prototype.registerIQSet = function(childName, childNS, handler) {
	return this.registerHandler('iq', childName, childNS, 'set', handler);
};

/**
 * Resumes this connection from saved state (cookie)
 * 
 * @return Whether resume was successful
 * @type boolean
 */
JSJaCConnection.prototype.resume = function() {
	try {
		var json = JSJaCCookie.read(this._cookie_prefix + 'JSJaC_State').getValue();
		this.oDbg.log('read cookie: ' + json, 2);
		JSJaCCookie.read(this._cookie_prefix + 'JSJaC_State').erase();

		return this.resumeFromData(JSJaCJSON.parse(json));
	} catch (e) {
	}
	return false;
};

/**
 * Resumes BOSH connection from data
 * 
 * @param {Object} serialized jsjac state information
 * @return Whether resume was successful
 * @type boolean
 */
JSJaCConnection.prototype.resumeFromData = function(data) {
	try {

		for ( var i in data)
			if (data.hasOwnProperty(i))
				this[i] = data[i];

		// copy keys - not being very generic here :-/
		if (this._keys) {
			this._keys2 = new JSJaCKeys();
			var u = this._keys2._getSuspendVars();
			for (var j = 0; j < u.length; j++)
				this._keys2[u[j]] = this._keys[u[j]];
			this._keys = this._keys2;
		}

		if (this._connected) {
			this._setStatus('resuming');
			this._handleEvent('onresume');

			// don't poll too fast!
			setTimeout(JSJaC.bind(this._resume, this), this.getPollInterval());

			this._interval = setInterval(JSJaC.bind(this._checkQueue, this), JSJAC_CHECKQUEUEINTERVAL);
			this._inQto = setInterval(JSJaC.bind(this._checkInQ, this), JSJAC_CHECKINQUEUEINTERVAL);
		} else {
			this._setStatus('terminated');
		}

		return (this._connected === true);
	} catch (e) {
		if (e.message)
			this.oDbg.log("Resume failed: " + e.message, 1);
		else
			this.oDbg.log("Resume failed: " + e, 1);
		return false;
	}
};

JSJaCConnection.prototype.sendJumpPacket = function(jumpPacket, cb, arg) {
	if (!this.connected())
		return false;

	if (!jumpPacket || !jumpPacket.opcode) {
		this.oDbg.log("no jumpPacket: " + jumpPacket, 1);
		return false;
	}


	if (cb && this._validateCallbackable(jumpPacket)) {
		if(!jumpPacket.content)
			throw new Error('packet content cannot be null when send a Message or IQ packet.');
	
		if (!jumpPacket.content.id)
			jumpPacket.content.id = this._IDPrefix + this._ID++;

		// register callback with id
		this._registerPID(jumpPacket, cb, arg);
	}

	this._pQueue = this._pQueue.concat(jumpPacket);
	//this._handleEvent(jumpPacket.pType() + '_out', jumpPacket);
	this._handleEvent("packet_out", jumpPacket);

	return true;
};

/**
 * Sends a JSJaCPacket
 * 
 * @param {JSJaCPacket} packet The packet to send
 * @param {Function} cb The callback to be called if there's a reply to this packet (identified by id) [optional]
 * @param {Object} arg Arguments passed to the callback (additionally to the packet received) [optional]
 * @return 'true' if sending was successfull, 'false' otherwise
 * @type boolean
 */
JSJaCConnection.prototype.send = function(packet, cb, arg) {
	return;
	if (!packet || !packet.pType) {
		this.oDbg.log("no packet: " + packet, 1);
		return false;
	}

	if (!this.connected())
		return false;

	// if (this._xmllang && !packet.getXMLLang())
	// packet.setXMLLang(this._xmllang);

	// remember id for response if callback present
	if (cb) {
		if (!packet.getID())
			packet.setID('JSJaCID_' + this._ID++); // generate an ID

		// register callback with id
		this._registerPID(packet, cb, arg);
	}

	this._pQueue = this._pQueue.concat(packet.xml());
	this._handleEvent(packet.pType() + '_out', packet);
	this._handleEvent("packet_out", packet);

	return true;
};

/**
 * Sends an IQ packet. Has default handlers for each reply type. Those maybe overriden by passing an appropriate handler.
 * 
 * @param {JSJaCIQPacket} iq - the iq packet to send
 * @param {Object} handlers - object with properties 'error_handler', 'result_handler' and 'default_handler' with appropriate functions
 * @param {Object} arg - argument to handlers
 * @return 'true' if sending was successfull, 'false' otherwise
 * @type boolean
 */
JSJaCConnection.prototype.sendIQ = function(iq, handlers, arg) {
	if (!iq || iq.pType() != 'iq') {
		return false;
	}

	handlers = handlers || {};
	var error_handler = handlers.error_handler || JSJaC.bind(function(aIq) {
		this.oDbg.log(aIq.xml(), 1);
	}, this);

	var result_handler = handlers.result_handler || JSJaC.bind(function(aIq) {
		this.oDbg.log(aIq.xml(), 2);
	}, this);

	var iqHandler = function(aIq, arg) {
		switch (aIq.getType()) {
			case 'error':
				error_handler(aIq);
				break;
			case 'result':
				result_handler(aIq, arg);
				break;
		}
	};
	return this.send(iq, iqHandler, arg);
};

/**
 * Sets polling interval for this connection
 * 
 * @param {int} timerval Milliseconds to set timer to
 * @return effective interval this connection has been set to
 * @type int
 */
JSJaCConnection.prototype.setPollInterval = function(timerval) {
	if (timerval && !isNaN(timerval))
		this._timerval = timerval;
	return this._timerval;
};

/**
 * Returns current status of this connection
 * 
 * @return String to denote current state. One of
 *         <ul>
 *         <li>'initializing' ... well
 *         <li>'connecting' if connect() was called
 *         <li>'resuming' if resume() was called
 *         <li>'processing' if it's about to operate as normal
 *         <li>'onerror_fallback' if there was an error with the request object
 *         <li>'protoerror_fallback' if there was an error at the http binding protocol flow (most likely that's where you interested in)
 *         <li>'internal_server_error' in case of an internal server error
 *         <li>'suspending' if suspend() is being called
 *         <li>'aborted' if abort() was called
 *         <li>'disconnecting' if disconnect() has been called
 *         </ul>
 * @type String
 */
JSJaCConnection.prototype.status = function() {
	return this._status;
};

/**
 * Suspends this connection (saving state for later resume) Saves state to cookie
 * 
 * @return Whether suspend (saving to cookie) was successful
 * @type boolean
 */
JSJaCConnection.prototype.suspend = function() {
	var data = this.suspendToData();

	try {
		var c = new JSJaCCookie(this._cookie_prefix + 'JSJaC_State', JSJaCJSON.toString(data));
		this.oDbg.log("writing cookie: " + c.getValue() + "\n" + "(length:" + c.getValue().length + ")", 2);
		c.write();

		var c2 = JSJaCCookie.get(this._cookie_prefix + 'JSJaC_State');
		if (c.getValue() != c2) {
			this.oDbg.log("Suspend failed writing cookie.\nread: " + c2, 1);
			c.erase();
			return false;
		}
		return true;
	} catch (e) {
		this.oDbg.log("Failed creating cookie '" + this._cookie_prefix + "JSJaC_State': " + e.message, 1);
	}
	return false;
};

/**
 * Suspend connection and return serialized JSJaC connection state
 * 
 * @return JSJaC connection state object
 * @type Object
 */
JSJaCConnection.prototype.suspendToData = function() {

	// remove timers
	clearTimeout(this._timeout);
	clearInterval(this._interval);
	clearInterval(this._inQto);

	this._suspend();

	var u = ('_connected,_keys,_ID,_xmllang,_inQ,_pQueue,_regIDs,_errcnt,_inactivity,domain,username,resource,jid,fulljid,_sid,_httpbase,_timerval,_is_polling')
			.split(',');
	u = u.concat(this._getSuspendVars());
	var s = {};

	for (var i = 0; i < u.length; i++) {
		if (!this[u[i]])
			continue; // hu? skip these!
		var o = {};
		if (this[u[i]]._getSuspendVars) {
			var uo = this[u[i]]._getSuspendVars();
			for (var j = 0; j < uo.length; j++)
				o[uo[j]] = this[u[i]][uo[j]];
		} else
			o = this[u[i]];

		s[u[i]] = o;
	}
	this._connected = false;
	this._setStatus('suspending');
	return s;
};

/**
 * @private
 */
JSJaCConnection.prototype._abort = function() {
	clearTimeout(this._timeout); // remove timer

	clearInterval(this._inQto);
	clearInterval(this._interval);

	this._connected = false;

	this._setStatus('aborted');

	this.oDbg.log("Disconnected.", 1);
	this._handleEvent('ondisconnect');
	this._handleEvent('onerror', JSJaCError('500', 'cancel', 'service-unavailable'));
};

/**
 * @private
 */
JSJaCConnection.prototype._checkInQ = function() {
	for (var i = 0; i < this._inQ.length && i < 10; i++) {
		var item = this._inQ[0],
			body = item.body,
			event = item.event;
		this._inQ = this._inQ.slice(1, this._inQ.length);
		
		// ping or auth
		if(!body) {
			this._handleEvent('packet_in');
			this._handleEvent(event);
			return;
		}
		//var body = JSON.parse(this._uint8ArrayToString(bodyArr));
		if(!this._handlePID(body)) {
			this._handleEvent('packet_in', body);
			this._handleEvent(event, body);
		}
	}
};

/**
 * @private
 */
JSJaCConnection.prototype._checkQueue = function() {
	if (this._pQueue.length > 0)
		this._process();
	return true;
};

/**
 * @private
 */
JSJaCConnection.prototype._doAuth = function() {
	this._sendJumpPacket(this._getAuthPacket(), function(resp) {
		if(resp.event == OPCODE.AUTH.KEY) {
			var body = resp.body;
			//console.log('【recv】\tOPCODE.AUTH.KEY\n\t' + JSON.stringify(body));
			if(body.code != 200) {
				this._handleEvent('onerror', JSJaCError('401', 'auth', 'not-authorized'));
				return;
			}
			this._handleEvent('packet_in', body);
			this._handleEvent(OPCODE.AUTH.KEY, body);
			
			this._handleEvent('onconnect');
		}
	});
	
	return true;
	
	///////////////// ↓former
	if (this.has_sasl && this.authtype == 'nonsasl')
		this.oDbg.log("Warning: SASL present but not used", 1);

	if (!this._doSASLAuth() && !this._doLegacyAuth()) {
		this.oDbg.log("Auth failed for authtype " + this.authtype, 1);
		this.disconnect();
		return false;
	}
	return true;
};

/**
 * @private
 */
JSJaCConnection.prototype._doInBandReg = function() {
	if (this.authtype == 'saslanon' || this.authtype == 'anonymous')
		return; // bullshit - no need to register if anonymous

	/*************************************************************************************************************************************************
	 * In-Band Registration see JEP-0077
	 */

	var iq = new JSJaCIQ();
	iq.setType('set');
	iq.setID('reg1');
	iq.appendNode("query", {
		xmlns : NS_REGISTER
	}, [ [ "username", this.username ], [ "password", this.pass ] ]);

	this.send(iq, this._doInBandRegDone);
};

/**
 * @private
 */
JSJaCConnection.prototype._doInBandRegDone = function(iq) {
	if (iq && iq.getType() == 'error') { // we failed to register
		this.oDbg.log("registration failed for " + this.username, 0);
		this._handleEvent('onerror', iq.getChild('error'));
		return;
	}

	this.oDbg.log(this.username + " registered succesfully", 0);

	this._doAuth();
};

/**
 * @private
 */
JSJaCConnection.prototype._doLegacyAuth = function() {
	if (this.authtype != 'nonsasl' && this.authtype != 'anonymous')
		return false;

	/*************************************************************************************************************************************************
	 * Non-SASL Authentication as described in JEP-0078
	 */
	var iq = new JSJaCIQ();
	iq.setIQ(null, 'get', 'auth1');
	iq.appendNode('query', {
		xmlns : NS_AUTH
	}, [ [ 'username', this.username ] ]);

	this.send(iq, this._doLegacyAuth2);
	return true;
};

/**
 * @private
 */
JSJaCConnection.prototype._doLegacyAuth2 = function(resIq) {
	if (!resIq || resIq.getType() != 'result') {
		if (resIq && resIq.getType() == 'error')
			this._handleEvent('onerror', resIq.getChild('error'));
		this.disconnect();
		return;
	}

	var use_digest = (resIq.getChild('digest') !== null);

	/*************************************************************************************************************************************************
	 * Send authentication
	 */
	var iq = new JSJaCIQ();
	iq.setIQ(null, 'set', 'auth2');

	var query = iq.appendNode('query', {
		xmlns : NS_AUTH
	}, [ [ 'username', this.username ], [ 'resource', this.resource ] ]);

	if (use_digest) { // digest login
		query.appendChild(iq.buildNode('digest', {
			xmlns : NS_AUTH
		}, hex_sha1(this.streamid + this.pass)));
	} else if (this._allow_plain) { // use plaintext auth
		query.appendChild(iq.buildNode('password', {
			xmlns : NS_AUTH
		}, this.pass));
	} else {
		this.oDbg.log("no valid login mechanism found", 1);
		this.disconnect();
		return;
	}

	this.send(iq, this._doLegacyAuthDone);
};

/**
 * @private
 */
JSJaCConnection.prototype._doLegacyAuthDone = function(iq) {
	if (iq.getType() != 'result') { // auth' failed
		if (iq.getType() == 'error')
			this._handleEvent('onerror', iq.getChild('error'));
		this.disconnect();
	} else
		this._handleEvent('onconnect');
};

/**
 * @private
 */
JSJaCConnection.prototype._doSASLAuth = function() {
	if (this.authtype == 'nonsasl' || this.authtype == 'anonymous')
		return false;

	if ((typeof this.username == 'undefined' || this.username == null || this.username == "") && this.authtype == 'saslanon') {
		if (this.mechs['ANONYMOUS']) {
			this.oDbg.log("SASL using mechanism 'ANONYMOUS'", 2);
			return this._sendRaw("<auth xmlns='urn:ietf:params:xml:ns:xmpp-sasl' mechanism='ANONYMOUS'/>", this._doSASLAuthDone);
		}
		this.oDbg.log("SASL ANONYMOUS requested but not supported", 1);
	} else {
		if (this._allow_scram && this.mechs['SCRAM-SHA-1']) {
			this.oDbg.log("SASL using mechanism 'SCRAM-SHA-1'", 2);

			this._clientFirstMessageBare = 'n=' + this.username.replace(/=/g, '=3D').replace(/,/g, '=2C') + ',r=' + JSJaCUtils.cnonce(16);
			var gs2Header;
			if (this.authzid) {
				gs2Header = 'n,a=' + this.authzid.replace(/=/g, '=3D').replace(/,/g, '=2C') + ',';
			} else {
				gs2Header = 'n,,';
			}
			var clientFirstMessage = gs2Header + this._clientFirstMessageBare;

			return this._sendRaw("<auth xmlns='urn:ietf:params:xml:ns:xmpp-sasl' mechanism='SCRAM-SHA-1'>" + b64encode(clientFirstMessage)
					+ "</auth>", this._doSASLAuthScramSha1S1);
		}/* else if (this.mechs['DIGEST-MD5']) {
			this.oDbg.log("SASL using mechanism 'DIGEST-MD5'", 2);
			return this._sendRaw("<auth xmlns='urn:ietf:params:xml:ns:xmpp-sasl' mechanism='DIGEST-MD5'/>", this._doSASLAuthDigestMd5S1);
		} */else if (this._allow_plain && this.mechs['PLAIN']) {
			this.oDbg.log("SASL using mechanism 'PLAIN'", 2);
			var authStr = this.authzid + String.fromCharCode(0) + this.username + String.fromCharCode(0) + this.pass;
			this.oDbg.log("authenticating with '" + authStr + "'", 2);
			authStr = b64encode(authStr);
			return this._sendRaw("<auth xmlns='urn:ietf:params:xml:ns:xmpp-sasl' mechanism='PLAIN'>" + authStr + "</auth>", this._doSASLAuthDone);
		}
		/*} else if (this._allow_plain && this.mechs['PLAIN']) {
			this.oDbg.log("SASL using mechanism 'PLAIN'", 2);
			var authStr = this.authzid + String.fromCharCode(0) + this.username + String.fromCharCode(0) + this.pass;
			this.oDbg.log("authenticating with '" + authStr + "'", 2);
			authStr = b64encode(authStr);
			return this._sendRaw("<auth xmlns='urn:ietf:params:xml:ns:xmpp-sasl' mechanism='PLAIN'>" + authStr + "</auth>", this._doSASLAuthDone);
		}
		else if (this.mechs['DIGEST-MD5']) {
			this.oDbg.log("SASL using mechanism 'DIGEST-MD5'", 2);
			return this._sendRaw("<auth xmlns='urn:ietf:params:xml:ns:xmpp-sasl' mechanism='DIGEST-MD5'/>", this._doSASLAuthDigestMd5S1);
		}*/
		this.oDbg.log("No SASL mechanism applied", 1);
		this.authtype = 'nonsasl'; // fallback
	}
	return false;
};

/**
 * @private
 */
JSJaCConnection.prototype._doSASLAuthScramSha1S1 = function(el) {
	if (el.nodeName != 'challenge') {
		this.oDbg.log('challenge missing', 1);
		this._handleEvent('onerror', JSJaCError('401', 'auth', 'not-authorized'));
		this.disconnect();
	} else {
		var serverFirstMessage = b64decode(el.firstChild.nodeValue);
		this.oDbg.log('got challenge: ' + serverFirstMessage, 2);

		var data = {};
		var fields = serverFirstMessage.split(',');
		for ( var field in fields) {
			var val = fields[field].substring(2);
			data[fields[field].substring(0, 1)] = val;
		}

		var password = str2rstr_utf8(this.pass);
		var u = b64decode_bin(data['s']) + "\x00\x00\x00\x01";
		var h, i = parseInt(data['i'], 10);
		for (var j = 0; j < i; j++) {
			u = rstr_hmac_sha1(password, u);
			h = JSJaCUtils.xor(h, u);
		}

		var gs2Header;
		if (this.authzid) {
			gs2Header = 'n,a=' + this.authzid.replace(/=/g, '=3D').replace(/,/g, '=2C') + ',';
		} else {
			gs2Header = 'n,,';
		}
		var clientFinalMessageWithoutProof = 'c=' + b64encode(gs2Header) + ',r=' + data['r'];

		this._saltedPassword = h;
		var clientKey = rstr_hmac_sha1(this._saltedPassword, 'Client Key');
		var storedKey = rstr_sha1(clientKey);
		this._authMessage = this._clientFirstMessageBare + ',' + serverFirstMessage + ',' + clientFinalMessageWithoutProof;
		var clientSignature = rstr_hmac_sha1(storedKey, str2rstr_utf8(this._authMessage));
		var proof = JSJaCUtils.xor(clientKey, clientSignature);

		var clientFinalMessage = clientFinalMessageWithoutProof + ',p=' + rstr2b64(proof);

		this.oDbg.log('response: ' + clientFinalMessage, 2);
		this._sendRaw("<response xmlns='urn:ietf:params:xml:ns:xmpp-sasl'>" + b64encode(clientFinalMessage) + "</response>",
				this._doSASLAuthScramSha1S2);
	}
};

/**
 * @private
 */
JSJaCConnection.prototype._doSASLAuthScramSha1S2 = function(el) {
	if (el.nodeName != 'success') {
		this.oDbg.log('auth failed', 1);
		this._handleEvent('onerror', JSJaCError('401', 'auth', 'not-authorized'));
		this.disconnect();
	} else {
		var serverFinalMessage = b64decode(el.firstChild.nodeValue);
		this.oDbg.log('got success: ' + serverFinalMessage, 2);

		var data = {};
		var fields = serverFinalMessage.split(',');
		for ( var field in fields) {
			var val = fields[field].substring(2);
			data[fields[field].substring(0, 1)] = val;
		}

		var serverKey = rstr_hmac_sha1(this._saltedPassword, 'Server Key');
		var serverSignature = rstr_hmac_sha1(serverKey, str2rstr_utf8(this._authMessage));
		var verifier = b64decode_bin(data['v']);

		if (serverSignature !== verifier) {
			this.oDbg.log('server auth failed', 1);
			this._handleEvent('onerror', JSJaCError('401', 'auth', 'not-authorized'));
			this.disconnect();
		} else {
			this._reInitStream(JSJaC.bind(this._doStreamBind, this));
		}
	}
};

/**
 * @private
 */
JSJaCConnection.prototype._doSASLAuthDigestMd5S1 = function(el) {
	if (el.nodeName != "challenge") {
		this.oDbg.log("challenge missing", 1);
		this._handleEvent('onerror', JSJaCError('401', 'auth', 'not-authorized'));
		this.disconnect();
	} else {
		var challenge = b64decode(el.firstChild.nodeValue), index;
		this.oDbg.log("got challenge: " + challenge, 2);

		index = challenge.indexOf("nonce=\"");
		if (index !== -1) {
			this._nonce = challenge.substring(index + 7);
			this._nonce = this._nonce.substring(0, this._nonce.indexOf("\""));
			this.oDbg.log("nonce: " + this._nonce, 2);
		} else {
			this.oDbg.log("no valid nonce found, aborting", 1);
			this.disconnect();
			return;
		}

		index = challenge.indexOf("realm=\"");
		if (index !== -1) {
			this._realm = challenge.substring(index + 7);
			this._realm = this._realm.substring(0, this._realm.indexOf("\""));
		}
		this._realm = this._realm || this.domain;
		this.oDbg.log("realm: " + this._realm, 2);

		this._digest_uri = "xmpp/" + this.domain;
		this._cnonce = JSJaCUtils.cnonce(14);
		this._nc = '00000001';

		var X = this.username + ':' + this._realm + ':' + this.pass;
		var Y = rstr_md5(str2rstr_utf8(X));

		var A1 = Y + ':' + this._nonce + ':' + this._cnonce;
		if (this.authzid) {
			A1 = A1 + ':' + this.authzid;
		}
		var HA1 = rstr2hex(rstr_md5(A1));

		var A2 = 'AUTHENTICATE:' + this._digest_uri;
		var HA2 = hex_md5(A2);

		var response = hex_md5(HA1 + ':' + this._nonce + ':' + this._nc + ':' + this._cnonce + ':auth:' + HA2);

		var rPlain = 'username="' + this.username + '",realm="' + this._realm + '",nonce="' + this._nonce + '",cnonce="' + this._cnonce + '",nc='
				+ this._nc + ',qop=auth,digest-uri="' + this._digest_uri + '",response=' + response + ',charset=utf-8';

		if (this.authzid) {
			rPlain = 'authzid="' + this.authzid + '",' + rPlain;
		}

		this.oDbg.log("response: " + rPlain, 2);

		this._sendRaw("<response xmlns='urn:ietf:params:xml:ns:xmpp-sasl'>" + b64encode(rPlain) + "</response>", this._doSASLAuthDigestMd5S2);
	}
};

/**
 * @private
 */
JSJaCConnection.prototype._doSASLAuthDigestMd5S2 = function(el) {
	if (el.nodeName == 'failure') {
		if (el.xml)
			this.oDbg.log("auth error: " + el.xml, 1);
		else
			this.oDbg.log("auth error", 1);
		this._handleEvent('onerror', JSJaCError('401', 'auth', 'not-authorized'));
		this.disconnect();
		return;
	}

	var response = b64decode(el.firstChild.nodeValue);
	this.oDbg.log("response: " + response, 2);

	var rspauth = response.substring(response.indexOf("rspauth=") + 8);
	this.oDbg.log("rspauth: " + rspauth, 2);

	var X = this.username + ':' + this._realm + ':' + this.pass;
	var Y = rstr_md5(str2rstr_utf8(X));

	var A1 = Y + ':' + this._nonce + ':' + this._cnonce;
	if (this.authzid) {
		A1 = A1 + ':' + this.authzid;
	}
	var HA1 = rstr2hex(rstr_md5(A1));

	var A2 = ':' + this._digest_uri;
	var HA2 = hex_md5(A2);

	var rsptest = hex_md5(HA1 + ':' + this._nonce + ':' + this._nc + ':' + this._cnonce + ':auth:' + HA2);
	this.oDbg.log("rsptest: " + rsptest, 2);

	if (rsptest != rspauth) {
		this.oDbg.log("SASL Digest-MD5: server repsonse with wrong rspauth", 1);
		this.disconnect();
		return;
	}

	if (el.nodeName == 'success') {
		this._reInitStream(JSJaC.bind(this._doStreamBind, this));
	} else { // some extra turn
		this._sendRaw("<response xmlns='urn:ietf:params:xml:ns:xmpp-sasl'/>", this._doSASLAuthDone);
	}
};

/**
 * @private
 */
JSJaCConnection.prototype._doSASLAuthDone = function(el) {
	if (el.nodeName != 'success') {
		this.oDbg.log("auth failed", 1);
		this._handleEvent('onerror', JSJaCError('401', 'auth', 'not-authorized'));
		this.disconnect();
	} else {
		this._reInitStream(JSJaC.bind(this._doStreamBind, this));
	}
};

/**
 * @private
 */
JSJaCConnection.prototype._doStreamBind = function() {
	var iq = new JSJaCIQ();
	iq.setIQ(null, 'set', 'bind_1');
	iq.appendNode("bind", {
		xmlns : NS_BIND
	}, [ [ "resource", this.resource ] ]);
	this.oDbg.log(iq.xml());
	this.send(iq, this._doXMPPSess);
};

/**
 * @private
 */
JSJaCConnection.prototype._doXMPPSess = function(iq) {
	if (iq.getType() != 'result' || iq.getType() == 'error') { // failed
		this.disconnect();
		if (iq.getType() == 'error')
			this._handleEvent('onerror', iq.getChild('error'));
		return;
	}

	this.fulljid = iq.getChildVal("jid");
	this.jid = this.fulljid.substring(0, this.fulljid.lastIndexOf('/'));

	iq = new JSJaCIQ();
	iq.setIQ(null, 'set', 'sess_1');
	iq.appendNode("session", {
		xmlns : NS_SESSION
	}, []);
	this.oDbg.log(iq.xml());
	this.send(iq, this._doXMPPSessDone);
};

/**
 * @private
 */
JSJaCConnection.prototype._doXMPPSessDone = function(iq) {
	if (iq.getType() != 'result' || iq.getType() == 'error') { // failed
		this.disconnect();
		if (iq.getType() == 'error')
			this._handleEvent('onerror', iq.getChild('error'));
		return;
	} else
		this._handleEvent('onconnect');
};

/**
 * @private
 */
JSJaCConnection.prototype._handleEvent = function(event, body) {
	event = event.toLowerCase(); // don't be case-sensitive here
	this.oDbg.log("incoming event '" + event + "'", 3);
	if (!this._events[event])
		return;
	this.oDbg.log("handling event '" + event + "'", 2);
	for (var i = 0; i < this._events[event].length; i++) {
		var aEvent = this._events[event][i];
		if (typeof aEvent.handler == 'function') {
			if (body) {
				// check ns
				if(aEvent.ns != '*' && body.ns != aEvent.ns)
					continue;
				
				// check type
				if (aEvent.type != '*' && body.type != aEvent.type)
					continue;
				this.oDbg.log(aEvent.ns + "/" + aEvent.type + " => match for handler " + aEvent.handler, 3);
				if (aEvent.handler(body)) {
					// handled!
					break;
				}
			} else if (aEvent.handler()) {
				// handled!
				break;
			}
		}
	}
};

/**
 * @private
 */
JSJaCConnection.prototype._handlePID = function(body) {
	if (!body.id)
		return false;

	//var jid = body.from || this.jid;
	var jid = this.jid;

	//if (body.from == this.domain)
	//	jid = this.jid;

	var id = body.id;
	if (this._regIDs[jid] && this._regIDs[jid][id]) {
		this.oDbg.log("handling id " + id, 3);
		var reg = this._regIDs[jid][id];
		if (reg.cb.call(this, body, reg.arg) === false) {
			// don't unregister
			return false;
		} else {
			delete this._regIDs[jid][id];
			return true;
		}
	} else {
		this.oDbg.log("not handling id '" + id + "' from jid " + jid, 1);
		return false;
	}
};

/**
 * @private
 */
JSJaCConnection.prototype._handleResponse = function(req) {
	var resp = this._parseResponse(req);
	if (!resp)
		return;

	//for (var i = 0; i < resp.childNodes.length; i++) {
		if (this._sendRawCallbacks.length) {
			var cb = this._sendRawCallbacks[0];
			this._sendRawCallbacks = this._sendRawCallbacks.slice(1, this._sendRawCallbacks.length);
			cb.fn.call(this, resp, cb.arg);
			//continue;
		}
		this._inQ = this._inQ.concat(resp);
	//}
};

/**
 * @private
 */
JSJaCConnection.prototype._parseStreamFeatures = function(doc) {
	if (!doc) {
		this.oDbg.log("nothing to parse ... aborting", 1);
		return false;
	}

	var errorTag, i;
	if (doc.getElementsByTagNameNS) {
		errorTag = doc.getElementsByTagNameNS(NS_STREAM, "error").item(0);
	} else {
		var errors = doc.getElementsByTagName("error");
		for (i = 0; i < errors.length; i++)
			if (errors.item(i).namespaceURI == NS_STREAM || errors.item(i).getAttribute('xmlns') == NS_STREAM) {
				errorTag = errors.item(i);
				break;
			}
	}

	if (errorTag) {
		this._setStatus("internal_server_error");
		clearTimeout(this._timeout); // remove timer
		clearInterval(this._interval);
		clearInterval(this._inQto);
		this._handleEvent('onerror', JSJaCError('503', 'cancel', 'session-terminate'));
		this._connected = false;
		this.oDbg.log("Disconnected.", 1);
		this._handleEvent('ondisconnect');
		return false;
	}

	this.mechs = {};
	var lMec1 = doc.getElementsByTagName("mechanisms");
	if (!lMec1.length)
		return false;
	this.has_sasl = false;
	for (i = 0; i < lMec1.length; i++)
		if (lMec1.item(i).getAttribute("xmlns") == NS_SASL) {
			this.has_sasl = true;
			var lMec2 = lMec1.item(i).getElementsByTagName("mechanism");
			for (var j = 0; j < lMec2.length; j++)
				this.mechs[lMec2.item(j).firstChild.nodeValue] = true;
			break;
		}
	if (this.has_sasl)
		this.oDbg.log("SASL detected", 2);
	else {
		this.oDbg.log("No support for SASL detected", 2);
		return true;
	}

	/*
	 * [TODO] check if in-band registration available check for session and bind features
	 */

	return true;
};

/**
 * @private
 */
JSJaCConnection.prototype._process = function(timerval) {
	if (!this.connected()) {
		this.oDbg.log("Connection lost ...", 1);
		if (this._interval)
			clearInterval(this._interval);
		return;
	}

	this.setPollInterval(timerval);

	if (this._timeout)
		clearTimeout(this._timeout);

	var slot = this._getFreeSlot();

	if (slot < 0)
		return;

	if (typeof (this._req[slot]) != 'undefined' && typeof (this._req[slot].r) != 'undefined' && this._req[slot].r.readyState != 4) {
		this.oDbg.log("Slot " + slot + " is not ready");
		return;
	}

	if (!this.isPolling() && this._pQueue.length === 0 && this._req[(slot + 1) % 2] && this._req[(slot + 1) % 2].r.readyState != 4) {
		this.oDbg.log("all slots busy, standby ...", 2);
		return;
	}

	if (!this.isPolling())
		this.oDbg.log("Found working slot at " + slot, 2);
	var requestPacket = this._getRequestPacket();
	if(requestPacket instanceof JumpPacket)
		this._req[slot] = this._setupJumpRequest(true);
	else
		this._req[slot] = this._setupRequest(true);

	/* setup onload handler for async send */
	this._req[slot].r.onreadystatechange = JSJaC.bind(function() {
		if (!this.connected())
			return;
		if (this._req[slot].r.readyState == 4) {
			this.oDbg.log("async recv: " + this._req[slot].r.responseText, 4);
			this._handleResponse(this._req[slot]);
			// schedule next tick
			this._setStatus('processing');
			if (this._pQueue.length) {
				this._timeout = setTimeout(JSJaC.bind(this._process, this), 100);
			} else {
				this.oDbg.log("scheduling next poll in " + this.getPollInterval() + " msec", 4);
				this._timeout = setTimeout(JSJaC.bind(this._process, this), this.getPollInterval());
			}
		}
	}, this);

	try {
		this._req[slot].r.onerror = JSJaC.bind(function() {
			if (!this.connected())
				return;
			this._errcnt++;
			this.oDbg.log('XmlHttpRequest error (' + this._errcnt + ')', 1);
			if (this._errcnt > JSJAC_ERR_COUNT) {
				// abort
				this._abort();
				return;
			}

			this._setStatus('onerror_fallback');

			// schedule next tick
			setTimeout(JSJaC.bind(this._repeat, this), JSJAC_RETRYDELAY);
			return;
		}, this);
	} catch (e) {
		// well ... no onerror property available, maybe we
		// can catch the error somewhere else ...
	}

	

	if (typeof (this._rid) != 'undefined') // remember request id if any
		this._req[slot].rid = this._rid;
	if(requestPacket instanceof JumpPacket)
		this._buildAndSend(requestPacket, this._req[slot].r);
	else 
		this._req[slot].r.send(requestPacket && requestPacket.xml ?  requestPacket.xml : this._getRequestString());
	//this.oDbg.log("sending: " + reqstr, 4);
	//this._req[slot].r.send(reqstr);
};

/**
 * @private
 * @param {JSJaCPacket} packet The packet to be sent.
 * @param {function} cb The callback to be called when response is received.
 * @param {any} arg Optional arguments to be passed to 'cb' when executing it.
 * @return Whether registering an ID was successful
 * @type boolean
 */
JSJaCConnection.prototype._registerPID = function(packet, cb, arg) {
	this.oDbg.log("registering id for packet " + JSON.stringify(packet.content), 3);
	var id = packet.content.id;
	if (!id) {
		this.oDbg.log("id missing", 1);
		return false;
	}

	if (typeof cb != 'function') {
		this.oDbg.log("callback is not a function", 1);
		return false;
	}

	// var jid = packet.content.to || this.jid;
	var jid = this.jid;

	// if (packet.content.to == this.domain)
	//	jid = this.jid;

	if (!this._regIDs[jid]) {
		this._regIDs[jid] = {};
	}

	if (this._regIDs[jid][id] != null) {
		this.oDbg.log("id already registered: " + id, 1);
		return false;
	}
	this._regIDs[jid][id] = {
		cb : cb,
		arg : arg,
		ts : JSJaCUtils.now()
	};
	this.oDbg.log("registered id " + id, 3);
	this._cleanupRegisteredPIDs();
	return true;
};

JSJaCConnection.prototype._cleanupRegisteredPIDs = function() {
	var now = Date.now();
	for ( var jid in this._regIDs) {
		if (this._regIDs.hasOwnProperty(jid)) {
			for ( var id in this._regIDs[jid]) {
				if (this._regIDs[jid].hasOwnProperty(id)) {
					if (this._regIDs[jid][id].ts + JSJAC_REGID_TIMEOUT < now) {
						this.oDbg.log("deleting registered id '" + id + "' due to timeout", 1);
						delete this._regIDs[jid][id];
					}
				}
			}
		}
	}
};

/**
 * Partial function binding sendEmpty to callback
 * 
 * @private
 */
JSJaCConnection.prototype._prepSendEmpty = function(cb, ctx) {
	return function() {
		ctx._sendEmpty(JSJaC.bind(cb, ctx));
	};
};

/**
 * send empty request waiting for stream id to be able to proceed with authentication
 * 
 * @private
 */
JSJaCConnection.prototype._sendEmpty = function(cb) {
	var slot = this._getFreeSlot();
	this._req[slot] = this._setupRequest(true);

	this._req[slot].r.onreadystatechange = JSJaC.bind(function() {
		if (this._req[slot].r.readyState == 4) {
			this.oDbg.log("async recv: " + this._req[slot].r.responseText, 4);
			cb(this._req[slot].r); // handle response
		}
	}, this);

	if (typeof (this._req[slot].r.onerror) != 'undefined') {
		this._req[slot].r.onerror = JSJaC.bind(function() {
			this.oDbg.log('XmlHttpRequest error', 1);
		}, this);
	}

	var reqstr = this._getRequestString();
	this.oDbg.log("sending: " + reqstr, 4);
	this._req[slot].r.send(reqstr);
};

/**
 * @private
 * 
 * @param jumpPacket
 * @param cb
 * @param arg
 */
JSJaCConnection.prototype._sendJumpPacket = function(jumpPacket, cb, arg) {
	if (cb)
		this._sendRawCallbacks.push({
			fn : cb,
			arg : arg
		});
	
	this._pQueue.push(jumpPacket);
	this._process();
	
	return true;
};

/**
 * @private
 */
JSJaCConnection.prototype._sendRaw = function(xml, cb, arg) {
	if (cb)
		this._sendRawCallbacks.push({
			fn : cb,
			arg : arg
		});

	this._pQueue.push(xml);
	this._process();

	return true;
};

/**
 * @private
 */
JSJaCConnection.prototype._setStatus = function(status) {
	if (!status || status === '')
		return;
	if (status != this._status) { // status changed!
		this._status = status;
		this._handleEvent('onstatuschanged', status);
		this._handleEvent('status_changed', status);
	}
};

JSJaCConnection.prototype._buildAndSend = function(jumpPacket, r) {
	var bodyArr = null;
	var hasNoContent = jumpPacket.content == null || typeof jumpPacket.content == 'undefined';
	var jsonStr = JSON.stringify(jumpPacket.content);
	bodyArr = this._stringToBytes(jsonStr);
	var headerArr = new Uint8Array(PACKET_HEADER_SIZE);
	headerArr.set(this._numToBytes(jumpPacket.sFrame, PACKET_STRUCT.CONSOLE_FRAME.SIZE), 	PACKET_STRUCT.CONSOLE_FRAME.START);
	headerArr.set(this._numToBytes(jumpPacket.opcode, PACKET_STRUCT.OPCODE.SIZE), 		PACKET_STRUCT.OPCODE.START);
	if(hasNoContent) {
		headerArr.set(this._numToBytes(0,PACKET_STRUCT.PACKET_LEN.SIZE), 	PACKET_STRUCT.PACKET_LEN.START);
	}
	else {
		headerArr.set(this._numToBytes(bodyArr.length,PACKET_STRUCT.PACKET_LEN.SIZE), PACKET_STRUCT.PACKET_LEN.START);
	}
	headerArr.set(this._numToBytes(jumpPacket.version,PACKET_STRUCT.VERSION.SIZE), 		PACKET_STRUCT.VERSION.START);
	headerArr.set(this._numToBytes(jumpPacket.seqId, 	PACKET_STRUCT.SEQ_ID.SIZE), 		PACKET_STRUCT.SEQ_ID.START);
	
	var sendArr;
	if(hasNoContent) {
		sendArr = headerArr;
	}
	else {
		sendArr = this._concatUint8Array(headerArr, new Uint8Array(bodyArr));
	}
	var sendA = sendArr.subarray(0, sendArr.byteLength),
		str = arr2b64(sendA);
	r.send(str);
};

/**
 * 指定包是否可以执行回调
 * @param jumpPacket
 */
JSJaCConnection.prototype._validateCallbackable = function(jumpPacket) {
	return this._isIQPacket(jumpPacket.opcode) || this._isMessagePacket(jumpPacket.opcode) || this._isPresencePacket(jumpPacket.opcode);
};

JSJaCConnection.prototype._isMessagePacket = function(opcode) {
	return opcode >= OPCODE.MESSAGE_RANGE.START && opcode < OPCODE.MESSAGE_RANGE.END;
};

JSJaCConnection.prototype._isIQPacket = function(opcode) {
	return opcode >= OPCODE.IQ_RANGE.START && opcode < OPCODE.IQ_RANGE.END;
};

JSJaCConnection.prototype._isPresencePacket = function(opcode) {
	return opcode >= OPCODE.PRESENCE_RANGE.START && opcode < OPCODE.PRESENCE_RANGE.END;
};

/**
 * 合并
 * @param array1
 * @param array2
 * @returns {Uint8Array}
 */
JSJaCConnection.prototype._concatUint8Array = function(array1, array2) {
    var result = new Uint8Array(array1.length + array2.length);
    result.set(array1, 0);
    result.set(array2, array1.length);
    return result;
};

/**
 * num转为长度为size的字节数组
 * @param num
 * @param size
 * @returns {Uint8Array}
 */
JSJaCConnection.prototype._numToBytes = function(num, size) {
    var bytes = new Uint8Array(size);
    var i = size;
    do {
        bytes[--i] = num & (0xff);
        num = num >> 8;
    } while (i);

    return bytes;
};

/**
 * Uint8Array类型的数组转为String
 * @param array
 * @returns
 */
JSJaCConnection.prototype._uint8ArrayToString = function(array) {
	var out, i, len, c;
	var char2, char3;

	out = "";
	len = array.length;
	i = 0;
	while (i < len) {
		c = array[i++];
		switch (c >> 4) {
		case 0:
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
		case 6:
		case 7:
			// 0xxxxxxx
			out += String.fromCharCode(c);
			break;
		case 12:
		case 13:
			// 110x xxxx 10xx xxxx
			char2 = array[i++];
			out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
			break;
		case 14:
			// 1110 xxxx 10xx xxxx 10xx xxxx
			char2 = array[i++];
			char3 = array[i++];
			out += String.fromCharCode(((c & 0x0F) << 12)
					| ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
			break;
		}
	}

	return out;
};

/**
 * 转为int
 * 
 * @param x
 * @returns {Number}
 */
JSJaCConnection.prototype._bytesToInteger = function(x) {
	var val = 0;
	for (var i = 0; i < x.length; ++i) {
		val += x[i];
		if (i < x.length - 1) {
			val = val << 8;
		}
	}
	return val;
};

/**
 * 转string为byte[], 主要解决中文乱码问题
 * @param str
 * @returns {Array}
 */
JSJaCConnection.prototype._stringToBytes = function(str) {
    var utf8 = [];
    for (var i=0; i < str.length; i++) {
        var charcode = str.charCodeAt(i);
        if (charcode < 0x80) utf8.push(charcode);
        else if (charcode < 0x800) {
            utf8.push(0xc0 | (charcode >> 6), 
                      0x80 | (charcode & 0x3f));
        }
        else if (charcode < 0xd800 || charcode >= 0xe000) {
            utf8.push(0xe0 | (charcode >> 12), 
                      0x80 | ((charcode>>6) & 0x3f), 
                      0x80 | (charcode & 0x3f));
        }
        // surrogate pair
        else {
            i++;
            // UTF-16 encodes 0x10000-0x10FFFF by
            // subtracting 0x10000 and splitting the
            // 20 bits of 0x0-0xFFFFF into two halves
            charcode = 0x10000 + (((charcode & 0x3ff)<<10)
                      | (str.charCodeAt(i) & 0x3ff))
            utf8.push(0xf0 | (charcode >>18), 
                      0x80 | ((charcode>>12) & 0x3f), 
                      0x80 | ((charcode>>6) & 0x3f), 
                      0x80 | (charcode & 0x3f));
        }
    }
    return utf8;
};

JSJaCConnection.prototype._getAuthPacket = function() {
	var data = {
		usr : this.username,
		atk : this.pass,
		br : this.resource
	}; 
	
	if(this.appType){ //rongqb for esn 20170223
		data.appType = this.appType;
	}
	if(this.clientIdentify){ //rongqb for esn 20170223
		data.clientIdentify = this.clientIdentify;
	}
	return new JumpPacket(data, OPCODE.AUTH.SEND);
};
/**
 * @fileOverview Contains Debugger interface for Firebug and Safari
 */

/*exported JSJaCConsoleLogger */
/*global console */

/**
 * A logger that logs using the 'console' object.
 * @constructor
 * @class Implementation of the Debugger interface for 
 * {@link http://www.getfirebug.com/ | Firebug} and Safari.
 * Creates a new debug logger to be passed to jsjac's connection
 * constructor. Of course you can use it for debugging in your code
 * too.
 * @extends {JSJaCDebugger}
 * @author Stefan Strigler steve@zeank.in-berlin.de
 * @param {int} level The maximum level for debugging messages to be
 * displayed. Thus you can tweak the verbosity of the logger. A value
 * of 0 means very low traffic whilst a value of 4 makes logging very
 * verbose about what's going on.
 */
function JSJaCConsoleLogger(level) {
  /**
   * @private
   */
  this.level = level || 4;

  /**
   * Empty function for API compatibility
   */
  this.start = function() {};
  /**
   * Logs a message to firebug's/safari's console
   * @param {String} msg The message to be logged.
   * @param {int} level The message's verbosity level. Importance is
   * from 0 (very important) to 4 (not so important). A value of 1
   * denotes an error in the usual protocol flow.
   */
  this.log = function(msg, level) {
    level = level || 0;
    if (level > this.level)
      return;
    if (typeof(console) == 'undefined')
      return;
    try {
      switch (level) {
      case 0:
        console.warn(msg);
        break;
      case 1:
        console.error(msg);
        break;
      case 2:
        console.info(msg);
        break;
      case 4:
        console.debug(msg);
        break;
      default:
        console.log(msg);
        break;
      }
    } catch(e1) { try { console.log(msg); } catch(e2) {} }
  };

  /**
   * Sets verbosity level.
   * @param {int} level The maximum level for debugging messages to be
   * displayed. Thus you can tweak the verbosity of the logger. A
   * value of 0 means very low traffic whilst a value of 4 makes
   * logging very verbose about what's going on.
   * @return This debug logger
   * @type ConsoleLogger
   */
  this.setLevel = function(level) { this.level = level; return this; };
  /**
   * Gets verbosity level.
   * @return {int} The level
   */
  this.getLevel = function() { return this.level; };
}

/*jshint unused: false */
var NS_ORGANIZATION = "http://jabber.org/protocol/org"
var NS_DISCO_ITEMS =  "http://jabber.org/protocol/disco#items";
var NS_DISCO_INFO =   "http://jabber.org/protocol/disco#info";
var NS_VCARD =        "vcard-temp";
var NS_VCARD_UPDATE = "vcard-temp:x:update";
var NS_AUTH =         "jabber:iq:auth";
var NS_AUTH_ERROR =   "jabber:iq:auth:error";
var NS_REGISTER =     "jabber:iq:register";
var NS_SEARCH =       "jabber:iq:search";
var NS_ROSTER =       "jabber:iq:roster";
var NS_PUBACCOUNT =   "jabber:iq:pubaccount";
var NS_PRIVACY =      "jabber:iq:privacy";
var NS_PRIVATE =      "jabber:iq:private";
var NS_VERSION =      "jabber:iq:version";
var NS_TIME =         "jabber:iq:time";
var NS_TIME_NEW =     "urn:xmpp:time";
var NS_LAST =         "jabber:iq:last";
var NS_XDATA =        "jabber:x:data";
var NS_IQDATA =       "jabber:iq:data";
var NS_DELAY =        "jabber:x:delay";
var NS_DELAY_NEW =    "urn:xmpp:delay";
var NS_RECEIPTS =	  "urn:xmpp:receipts"; 		
var NS_EXPIRE =       "jabber:x:expire";
var NS_EVENT =        "jabber:x:event";
var NS_XCONFERENCE =  "jabber:x:conference";
var NS_PING =         "urn:xmpp:ping";
var NS_BOOKSMARKS =   "storage:bookmarks";
var NS_FORWARD_0 =    "urn:xmpp:forward:0";
var NS_CARBONS_2 =    "urn:xmpp:carbons:2";
var NS_CHAT_STATES =  "http://jabber.org/protocol/chatstates";
var NS_STATS =        "http://jabber.org/protocol/stats";
var NS_MUC =          "http://jabber.org/protocol/muc";
var NS_MUC_USER =     "http://jabber.org/protocol/muc#user";
var NS_MUC_ADMIN =    "http://jabber.org/protocol/muc#admin";
var NS_MUC_OWNER =    "http://jabber.org/protocol/muc#owner";
var NS_PUBSUB =       "http://jabber.org/protocol/pubsub";
var NS_PUBSUB_EVENT = "http://jabber.org/protocol/pubsub#event";
var NS_PUBSUB_OWNER = "http://jabber.org/protocol/pubsub#owner";
var NS_PUBSUB_ERRORS ="http://jabber.org/protocol/pubsub#errors";
var NS_PUBSUB_NMI =   "http://jabber.org/protocol/pubsub#node-meta-info";
var NS_COMMANDS =     "http://jabber.org/protocol/commands";
var NS_CAPS =         "http://jabber.org/protocol/caps";
var NS_STREAM =       "http://etherx.jabber.org/streams";
var NS_CLIENT =       "jabber:client";

var NS_BOSH =         "http://jabber.org/protocol/httpbind";
var NS_XBOSH =        "urn:xmpp:xbosh";

var NS_STANZAS =      "urn:ietf:params:xml:ns:xmpp-stanzas";
var NS_STREAMS =      "urn:ietf:params:xml:ns:xmpp-streams";

var NS_TLS =          "urn:ietf:params:xml:ns:xmpp-tls";
var NS_SASL =         "urn:ietf:params:xml:ns:xmpp-sasl";
var NS_SESSION =      "urn:ietf:params:xml:ns:xmpp-session";
var NS_BIND =         "urn:ietf:params:xml:ns:xmpp-bind";

var NS_FEATURE_IQAUTH = "http://jabber.org/features/iq-auth";
var NS_FEATURE_IQREGISTER = "http://jabber.org/features/iq-register";
var NS_FEATURE_COMPRESS = "http://jabber.org/features/compress";

var NS_COMPRESS =     "http://jabber.org/protocol/compress";

function STANZA_ERROR(code, type, cond) {
  if (window == this)
    return new STANZA_ERROR(code, type, cond);

  this.code = code;
  this.type = type;
  this.cond = cond;
}

var ERR_BAD_REQUEST =
        STANZA_ERROR("400", "modify", "bad-request");
var ERR_CONFLICT =
        STANZA_ERROR("409", "cancel", "conflict");
var ERR_FEATURE_NOT_IMPLEMENTED =
        STANZA_ERROR("501", "cancel", "feature-not-implemented");
var ERR_FORBIDDEN =
        STANZA_ERROR("403", "auth",   "forbidden");
var ERR_GONE =
        STANZA_ERROR("302", "modify", "gone");
var ERR_INTERNAL_SERVER_ERROR =
        STANZA_ERROR("500", "wait",   "internal-server-error");
var ERR_ITEM_NOT_FOUND =
        STANZA_ERROR("404", "cancel", "item-not-found");
var ERR_JID_MALFORMED =
        STANZA_ERROR("400", "modify", "jid-malformed");
var ERR_NOT_ACCEPTABLE =
        STANZA_ERROR("406", "modify", "not-acceptable");
var ERR_NOT_ALLOWED =
        STANZA_ERROR("405", "cancel", "not-allowed");
var ERR_NOT_AUTHORIZED =
        STANZA_ERROR("401", "auth",   "not-authorized");
var ERR_PAYMENT_REQUIRED =
        STANZA_ERROR("402", "auth",   "payment-required");
var ERR_RECIPIENT_UNAVAILABLE =
        STANZA_ERROR("404", "wait",   "recipient-unavailable");
var ERR_REDIRECT =
        STANZA_ERROR("302", "modify", "redirect");
var ERR_REGISTRATION_REQUIRED =
        STANZA_ERROR("407", "auth",   "registration-required");
var ERR_REMOTE_SERVER_NOT_FOUND =
        STANZA_ERROR("404", "cancel", "remote-server-not-found");
var ERR_REMOTE_SERVER_TIMEOUT =
        STANZA_ERROR("504", "wait",   "remote-server-timeout");
var ERR_RESOURCE_CONSTRAINT =
        STANZA_ERROR("500", "wait",   "resource-constraint");
var ERR_SERVICE_UNAVAILABLE =
        STANZA_ERROR("503", "cancel", "service-unavailable");
var ERR_SUBSCRIPTION_REQUIRED =
        STANZA_ERROR("407", "auth",   "subscription-required");
var ERR_UNEXPECTED_REQUEST =
        STANZA_ERROR("400", "wait",   "unexpected-request");

/**
 * @fileoverview OO interface to handle cookies.
 * Taken from {@link http://www.quirksmode.org/js/cookies.html}.
 * Regarding licensing of this code the author states:
 *
 * "You may copy, tweak, rewrite, sell or lease any code example on
 * this site, with one single exception."
 *
 * @author 2003-2006 Peter-Paul Koch
 * @author Stefan Strigler
 */

/*exported JSJaCCookieException, JSJaCCookie */

/**
 * Some exception denoted to dealing with cookies
 * @constructor
 * @param {String} msg The message to pass to the exception
 */
function JSJaCCookieException(msg) {
  this.message = msg;
  this.name = "CookieException";
}

/**
 * Creates a new Cookie
 * @class Class representing browser cookies for storing small amounts of data
 * @constructor
 * @param {String} name   The name of the value to store
 * @param {String} value  The value to store
 * @param {int}    secs   Number of seconds until cookie expires (may be empty)
 * @param {String} domain The domain for the cookie
 * @param {String} path   The path of cookie
 */
function JSJaCCookie(name,value,secs,domain,path)
{
  if (window == this)
    return new JSJaCCookie(name, value, secs, domain, path);

  /**
   * This cookie's name
   * @type String
   */
  this.name = name;
  /**
   * This cookie's value
   * @type String
   */
  this.value = value;
  /**
   * Time in seconds when cookie expires (thus being delete by
   * browser). A value of -1 denotes a session cookie which means that
   * stored data gets lost when browser is being closed.
   * @type int
   */
  this.secs = secs;

  /**
   * The cookie's domain
   * @type string
   */
  this.domain = domain;

  /**
   * The cookie's path
   * @type string
   */
  this.path = path;

  /**
   * Stores this cookie
   */
  this.write = function() {
    var expires;
    if (this.secs) {
      var date = new Date();
      date.setTime(date.getTime()+(this.secs*1000));
      expires = "; expires="+date.toGMTString();
    } else
      expires = "";
    var domain = this.domain?"; domain="+this.domain:"";
    var path = this.path?"; path="+this.path:"; path=/";
    document.cookie = this.getName()+"="+JSJaCCookie._escape(this.getValue())+
      expires+
      domain+
      path;
  };

  /**
   * Deletes this cookie
   */
  this.erase = function() {
    var c = new JSJaCCookie(this.getName(),"",-1);
    c.write();
  };

  /**
   * Gets the name of this cookie
   * @return The name
   * @type String
   */
  this.getName = function() {
    return this.name;
  };

  /**
   * Sets the name of this cookie
   * @param {String} name The name for this cookie
   * @return This cookie
   * @type Cookie
   */
  this.setName = function(name) {
    this.name = name;
    return this;
  };

  /**
   * Gets the value of this cookie
   * @return The value
   * @type String
   */
  this.getValue = function() {
    return this.value;
  };

  /**
   * Sets the value of this cookie
   * @param {String} value The value for this cookie
   * @return This cookie
   * @type Cookie
   */
  this.setValue = function(value) {
    this.value = value;
    return this;
  };

  /**
   * Sets the domain of this cookie
   * @param {String} domain The value for the domain of the cookie
   * @return This cookie
   * @type Cookie
   */
  this.setDomain = function(domain) {
    this.domain = domain;
    return this;
  };

  /**
   * Sets the path of this cookie
   * @param {String} path The value of the path of the cookie
   * @return This cookie
   * @type Cookie
   */
  this.setPath = function(path) {
    this.path = path;
    return this;
  };
}

/**
 * Reads the value for given <code>name</code> from cookies and return new
 * <code>Cookie</code> object
 * @param {String} name The name of the cookie to read
 * @return A cookie object of the given name
 * @type Cookie
 * @throws CookieException when cookie with given name could not be found
 */
JSJaCCookie.read = function(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) === 0)
      return new JSJaCCookie(
        name,
        JSJaCCookie._unescape(c.substring(nameEQ.length,c.length)));
  }
  throw new JSJaCCookieException("Cookie not found");
};

/**
 * Reads the value for given <code>name</code> from cookies and returns
 * its valued new
 * @param {String} name The name of the cookie to read
 * @return The value of the cookie read
 * @type String
 * @throws CookieException when cookie with given name could not be found
 */
JSJaCCookie.get = function(name) {
  return JSJaCCookie.read(name).getValue();
};

/**
 * Deletes cookie with given <code>name</code>
 * @param {String} name The name of the cookie to delete
 * @throws CookieException when cookie with given name could not be found
 */
JSJaCCookie.remove = function(name) {
  JSJaCCookie.read(name).erase();
};

/**
 * @private
 */
JSJaCCookie._escape = function(str) {
  return str.replace(/;/g, "%3AB");
};

/**
 * @private
 */
JSJaCCookie._unescape = function(str) {
  return str.replace(/%3AB/g, ";");
};

/*exported JSJaCDebugger */
/*jshint unused: false */

/**
 * Interface debuggers (loggers) have to implement in order to be used by JSJaC for debugging.
 * @constructor
 */
function JSJaCDebugger() {}

/**
 * Log a message.
 * @param {string} message The message to be logged.
 * @param {int} [level] The loglevel of the message to be logged. 
 */
JSJaCDebugger.prototype.log = function(message, level) {};
/*exported JSJaCError */

/**
 * an error packet for internal use
 * @private
 * @constructor
 */
function JSJaCError(code,type,condition) {
  var xmldoc = XmlDocument.create("error","jsjac");

  xmldoc.documentElement.setAttribute('code',code);
  xmldoc.documentElement.setAttribute('type',type);
  if (condition)
    xmldoc.documentElement.appendChild(xmldoc.createElement(condition)).
      setAttribute('xmlns', NS_STANZAS);
  return xmldoc.documentElement;
}

/**
 * @fileoverview All stuff related to HTTP Binding
 * @author Stefan Strigler steve@zeank.in-berlin.de
 */

/*exported JSJaCHttpBindingConnection */

/**
 * Instantiates a BOSH session connection.
 * @class Implementation of {@link http://xmpp.org/extensions/xep-0206.html | XMPP Over BOSH}
 * formerly known as HTTP Binding.
 * @constructor
 * @extends {JSJaCConnection}
 * @param {Object} oArg Configurational object for this connection.
 * @param {string} oArg.httpbase The connection endpoint of the HTTP service to talk to.
 * @param {JSJaCDebugger} [oArg.oDbg] A reference to a debugger implementing the JSJaCDebugger interface.
 * @param {int} [oArg.timerval] The polling interval.
 * @param {string} [oArg.cookie_prefix] Prefix to cookie names used when suspending.
 * @param {int} [oArg.wait] The 'wait' attribute of BOSH connections.
 */
function JSJaCHttpBindingConnection(oArg) {
  /**
   * @ignore
   */
  this.base = JSJaCConnection;
  this.base(oArg);

  // member vars
  /**
   * @private
   */
  this._hold = JSJACHBC_MAX_HOLD;
  /**
   * @private
   */
  this._inactivity = 0;
  /**
   * @private
   */
  this._last_requests = {}; // 'hash' storing hold+1 last requests
  /**
   * @private
   */
  this._last_rid = 0;                 // I know what you did last summer
  /**
   * @private
   */
  this._min_polling = 0;
  /**
   * @private
   */
  this._pause = 0;
  /**
   * @private
   */
  this._wait = oArg.wait || JSJACHBC_MAX_WAIT;
  
  (function() {
	  try {
	    var a = new Uint8Array(1);
	    return; //no need
	  } catch(e) { }

	  function subarray(start, end) {
	    return this.slice(start, end);
	  }

	  function set_(array, offset) {
	    if (arguments.length < 2) offset = 0;
	    for (var i = 0, n = array.length; i < n; ++i, ++offset)
	      this[offset] = array[i] & 0xFF;
	  }

	  // we need typed arrays
	  function TypedArray(arg1) {
	    var result;
	    if (typeof arg1 === "number") {
	       result = new Array(arg1);
	       for (var i = 0; i < arg1; ++i)
	         result[i] = 0;
	    } else
	       result = arg1.slice(0);
	    result.subarray = subarray;
	    result.buffer = result;
	    result.byteLength = result.length;
	    result.set = set_;
	    if (typeof arg1 === "object" && arg1.buffer)
	      result.buffer = arg1.buffer;

	    return result;
	  }

	  window.Uint8Array = TypedArray;
	  window.Uint32Array = TypedArray;
	  window.Int32Array = TypedArray;
	})();
}
JSJaCHttpBindingConnection.prototype = new JSJaCConnection();

/**
 * Inherit an instantiated HTTP Binding session
 * @param {Object} oArg The configuration to be used for connecting.
 * @param {string} oArg.jid The full jid of the entity this session is connected with. Either provide this or 'domain', 'username' and 'resource'.
 * @param {string} oArg.domain The domain name of the XMPP service.
 * @param {string} oArg.username The username (nodename) to be logged in with.
 * @param {string} oArg.resource The resource to identify the login with.
 * @param {string} oArg.sid The BOSH session id.
 * @param {int} oArg.rid The BOSH request id.
 * @param {int} oArg.polling The BOSH polling attribute.
 * @param {int} oArg.inactivity The BOSH inactivity attribute.
 * @param {int} oArg.requests The BOSH requests attribute.
 * @param {int} [oArg.wait] The BOSH wait attribute.
 */
JSJaCHttpBindingConnection.prototype.inherit = function(oArg) {
  if (oArg.jid) {
    var oJid = new JSJaCJID(oArg.jid);
    this.domain = oJid.getDomain();
    this.username = oJid.getNode();
    this.resource = oJid.getResource();
  } else {
    this.domain = oArg.domain || 'localhost';
    this.username = oArg.username;
    this.resource = oArg.resource;
  }
  this._sid = oArg.sid;
  this._rid = oArg.rid;
  this._min_polling = oArg.polling;
  this._inactivity = oArg.inactivity;
  this._setHold(oArg.requests-1);
  this.setPollInterval(this._timerval);

  if (oArg.wait)
    this._wait = oArg.wait;

  this._connected = true;

  this._handleEvent('onconnect');

  this._interval= setInterval(JSJaC.bind(this._checkQueue, this),
                              JSJAC_CHECKQUEUEINTERVAL);
  this._inQto = setInterval(JSJaC.bind(this._checkInQ, this),
                            JSJAC_CHECKINQUEUEINTERVAL);
  this._timeout = setTimeout(JSJaC.bind(this._process, this),
                             this.getPollInterval());
};

/**
 * Sets poll interval
 * @param {int} timerval the interval in seconds
 */
JSJaCHttpBindingConnection.prototype.setPollInterval = function(timerval) {
  if (timerval && !isNaN(timerval)) {
    if (!this.isPolling())
      this._timerval = 100;
    else if (this._min_polling && timerval < this._min_polling*1000)
      this._timerval = this._min_polling*1000;
    else if (this._inactivity && timerval > this._inactivity*1000)
      this._timerval = this._inactivity*1000;
    else
      this._timerval = timerval;
  }
  return this._timerval;
};

/**
 * whether this session is in polling mode
 * @type boolean
 */
JSJaCHttpBindingConnection.prototype.isPolling = function() { return (this._hold === 0); };

/**
 * @private
 */
JSJaCHttpBindingConnection.prototype._getFreeSlot = function() {
  for (var i=0; i<this._hold+1; i++)
    if (typeof(this._req[i]) == 'undefined' || typeof(this._req[i].r) == 'undefined' || this._req[i].r.readyState == 4)
      return i;
  return -1; // nothing found
};

/**
 * @private
 */
JSJaCHttpBindingConnection.prototype._getHold = function() { return this._hold; };

/**
 * @private
 */
JSJaCHttpBindingConnection.prototype._getRequestPacket = function(raw, last) {
	var jumpPacket;
	if (this._rid < this._last_rid && typeof(this._last_requests[this._rid]) != 'undefined') // repeat!
		jumpPacket = this._last_requests[this._rid];
	else { // grab from queue
	    if (this._pQueue.length) {
	    	jumpPacket = this._pQueue[0];
	        this._pQueue = this._pQueue.slice(1,this._pQueue.length);
		}
	    this._last_requests[this._rid] = {};
	    this._last_requests[this._rid] = jumpPacket;
	    this._last_rid = this._rid;

	    for (var i in this._last_requests)
	      if (this._last_requests.hasOwnProperty(i) &&
	          i < this._rid-this._hold)
	        delete(this._last_requests[i]); // truncate
	}
	
	return jumpPacket;
};

/**
 * @private
 */
JSJaCHttpBindingConnection.prototype._getRequestString = function(raw, last) {
  raw = raw || '';
  var reqstr = '';

  // check if we're repeating a request

  if (this._rid <= this._last_rid && typeof(this._last_requests[this._rid]) != 'undefined') // repeat!
    reqstr = this._last_requests[this._rid].xml;
  else { // grab from queue
    var xml = '';
    while (this._pQueue.length) {
      var curNode = this._pQueue[0];
      xml += curNode;
      this._pQueue = this._pQueue.slice(1,this._pQueue.length);
    }

    reqstr = "<body rid='"+this._rid+"' sid='"+this._sid+"' xmlns='http://jabber.org/protocol/httpbind'";
    if (JSJAC_HAVEKEYS) {
      reqstr += " key='"+this._keys.getKey()+"'";
      if (this._keys.lastKey()) {
        this._keys = new JSJaCKeys(hex_sha1,this.oDbg);
        reqstr += " newkey='"+this._keys.getKey()+"'";
      }
    }
    if (last)
      reqstr += " type='terminate'";
    else if (this._reinit) {
      if (JSJACHBC_USE_BOSH_VER)
        reqstr += " xml:lang='"+this._xmllang+"' xmpp:restart='true' xmlns:xmpp='urn:xmpp:xbosh' to='"+this.domain+"'";
      this._reinit = false;
    }

    if (xml !== '' || raw !== '') {
      reqstr += ">" + raw + xml + "</body>";
    } else {
      reqstr += "/>";
    }

    this._last_requests[this._rid] = {};
    this._last_requests[this._rid].xml = reqstr;
    this._last_rid = this._rid;

    for (var i in this._last_requests)
      if (this._last_requests.hasOwnProperty(i) &&
          i < this._rid-this._hold)
        delete(this._last_requests[i]); // truncate
  }

  return reqstr;
};

/**
 * @private
 */
JSJaCHttpBindingConnection.prototype._getInitialRequestString = function() {
  var reqstr = "<body content='text/xml; charset=utf-8' hold='"+this._hold+"' xmlns='http://jabber.org/protocol/httpbind' to='"+this.authhost+"' wait='"+this._wait+"' rid='"+this._rid+"'";
  if (this.host && this.port)
    reqstr += " route='xmpp:"+this.host+":"+this.port+"'";
  if (JSJAC_HAVEKEYS) {
    this._keys = new JSJaCKeys(hex_sha1,this.oDbg); // generate first set of keys
    var key = this._keys.getKey();
    reqstr += " newkey='"+key+"'";
  }
  reqstr += " xml:lang='"+this._xmllang + "'";

  if (JSJACHBC_USE_BOSH_VER) {
    reqstr += " ver='" + JSJACHBC_BOSH_VERSION + "'";
    reqstr += " xmlns:xmpp='urn:xmpp:xbosh'";
    if (this.authtype == 'sasl' || this.authtype == 'saslanon')
      reqstr += " xmpp:version='1.0'";
  }
  reqstr += "/>";
  return reqstr;
};

/**
 * @private
 */
JSJaCHttpBindingConnection.prototype._getStreamID = function(req) {

  this.oDbg.log(req.responseText,4);

  if (!req.responseXML || !req.responseXML.documentElement) {
    this._handleEvent('onerror',JSJaCError('503','cancel','service-unavailable'));
    return;
  }
  var body = req.responseXML.documentElement;

  // any session error?
  if(body.getAttribute('type') == 'terminate') {
    this._handleEvent('onerror',JSJaCError('503','cancel','service-unavailable'));
    return;
  }

  // extract stream id used for non-SASL authentication
  if (body.getAttribute('authid')) {
    this.streamid = body.getAttribute('authid');
    this.oDbg.log("got streamid: "+this.streamid,2);
  }

  if (!this._parseStreamFeatures(body)) {
      this._sendEmpty(JSJaC.bind(this._getStreamID, this));
      return;
  }

  this._timeout = setTimeout(JSJaC.bind(this._process, this),
                             this.getPollInterval());

  if (this.register)
    this._doInBandReg();
  else
    this._doAuth();
};

/**
 * @private
 */
JSJaCHttpBindingConnection.prototype._getSuspendVars = function() {
  return ('host,port,_rid,_last_rid,_wait,_min_polling,_inactivity,_hold,_last_requests,_pause').split(',');
};

/**
 * @private
 */
JSJaCHttpBindingConnection.prototype._handleInitialResponse = function(req) {
  try {
    // This will throw an error on Mozilla when the connection was refused
    this.oDbg.log(req.getAllResponseHeaders(),4);
    this.oDbg.log(req.responseText,4);
  } catch(ex) {
    this.oDbg.log("No response",4);
  }

  if (req.status != 200 || !req.responseXML) {
    this.oDbg.log("initial response broken (status: "+req.status+")",1);
    this._handleEvent('onerror',JSJaCError('503','cancel','service-unavailable'));
    return;
  }
  var body = req.responseXML.documentElement;

  if (!body || body.tagName != 'body' || body.namespaceURI != NS_BOSH) {
    this.oDbg.log("no body element or incorrect body in initial response",1);
    this._handleEvent("onerror",JSJaCError("500","wait","internal-service-error"));
    return;
  }

  // Check for errors from the server
  if (body.getAttribute("type") == "terminate") {
    this.oDbg.log("invalid response:\n" + req.responseText,1);
    clearTimeout(this._timeout); // remove timer
    this._connected = false;
    this.oDbg.log("Disconnected.",1);
    this._handleEvent('ondisconnect');
    this._handleEvent('onerror',JSJaCError('503','cancel','service-unavailable'));
    return;
  }

  // get session ID
  this._sid = body.getAttribute('sid');
  this.oDbg.log("got sid: "+this._sid,2);

  // get attributes from response body
  if (body.getAttribute('polling'))
    this._min_polling = body.getAttribute('polling');

  if (body.getAttribute('inactivity'))
    this._inactivity = body.getAttribute('inactivity');

  if (body.getAttribute('requests'))
    this._setHold(body.getAttribute('requests')-1);
  this.oDbg.log("set hold to " + this._getHold(),2);

  if (body.getAttribute('ver'))
    this._bosh_version = body.getAttribute('ver');

  if (body.getAttribute('maxpause'))
    this._pause = Number.min(body.getAttribute('maxpause'), JSJACHBC_MAXPAUSE);

  // must be done after response attributes have been collected
  this.setPollInterval(this._timerval);

  /* start sending from queue for not polling connections */
  this._connected = true;

  this._inQto = setInterval(JSJaC.bind(this._checkInQ, this),
                            JSJAC_CHECKINQUEUEINTERVAL);
  this._interval= setInterval(JSJaC.bind(this._checkQueue, this),
                              JSJAC_CHECKQUEUEINTERVAL);

  /* wait for initial stream response to extract streamid needed
   * for digest auth
   */
  this._getStreamID(req);
};

/**
 * @private
 */
JSJaCHttpBindingConnection.prototype._parseResponse = function(req) {
    if (!this.connected() || !req)
        return null;

    var r = req.r; // the XmlHttpRequest

    try {
        if (r.status == 404 || r.status == 403) {
            // connection manager killed session
            this._abort();
            return null;
        }

        if (r.status != 200 || (!r.responseText && r.responseText != '')) {
            this._errcnt++;
            var errmsg = "invalid response ("+r.status+"):\n" + r.getAllResponseHeaders()+"\n"+r.responseText;
            if (!r.responseXML)
                errmsg += "\nResponse failed to parse!";
            this.oDbg.log(errmsg,1);
            if (this._errcnt > JSJAC_ERR_COUNT) {
                // abort
                this._abort();
                return null;
            }

            if (this.connected()) {
                this.oDbg.log("repeating ("+this._errcnt+")",1);
                this._setStatus('proto_error_fallback');

                // schedule next tick
                setTimeout(JSJaC.bind(this._repeat, this),
                           this.getPollInterval());
            }

            return null;
        }
    } catch (e) {
        this.oDbg.log("XMLHttpRequest error: status not available", 1);
        this._errcnt++;
        if (this._errcnt > JSJAC_ERR_COUNT) {
            // abort
            this._abort();
        } else {
            if (this.connected()) {
                this.oDbg.log("repeating ("+this._errcnt+")",1);
                this._setStatus('proto_error_fallback');
                // schedule next tick
                setTimeout(JSJaC.bind(this._repeat, this),
                           this.getPollInterval());
            }
        }
        return null;
    }
	var resp = r.responseText[0] == '<'? r.responseText : b64decode(r.responseText), header = [], i = 0, size = resp.length;
	for(; i < PACKET_HEADER_SIZE && PACKET_HEADER_SIZE <= size; i++) {
		header[i] = resp.charCodeAt(i);
	}
	var headerArr = new Uint8Array(header),
		opcodeArr = headerArr.subarray(PACKET_STRUCT.OPCODE.START, PACKET_STRUCT.OPCODE.END),
		event = OPCODE_MAP.RECV.get(this._bytesToInteger(opcodeArr)),
		bodyStr = resp.slice(PACKET_HEADER_SIZE);
	
	//wsConn._parseUint8Array(opcodeArr, bodyArr);
    
    /*
	var body = r.responseXML.documentElement;
    if (!body || body.tagName != 'body' || body.namespaceURI != NS_BOSH) {
        this.oDbg.log("invalid response:\n" + r.responseText,1);

        clearTimeout(this._timeout); // remove timer
        clearInterval(this._interval);
        clearInterval(this._inQto);

        this._connected = false;
        this.oDbg.log("Disconnected.",1);
        this._handleEvent('ondisconnect');

        this._setStatus('internal_server_error');
        this._handleEvent('onerror',
                          JSJaCError('500','wait','internal-server-error'));

        return null;
    }
	*/
    if (typeof(req.rid) != 'undefined' && this._last_requests[req.rid]) {
        if (this._last_requests[req.rid].handled) {
            this.oDbg.log("already handled "+req.rid,2);
            return null;
        } else
            this._last_requests[req.rid].handled = true;
    }
    /*
    // Check for errors from the server
    if (body.getAttribute("type") == "terminate") {
        // read condition
        var condition = body.getAttribute('condition');

        this.oDbg.log("session terminated:\n" + r.responseText,1);

        clearTimeout(this._timeout); // remove timer
        clearInterval(this._interval);
        clearInterval(this._inQto);

        try {
            JSJaCCookie.read(this._cookie_prefix+'JSJaC_State').erase();
        } catch (e) {}

        this._connected = false;

        if (condition == "remote-stream-error") {
            if (body.getElementsByTagName("conflict").length > 0)
                this._setStatus("session-terminate-conflict");
            else
                this._setStatus('terminated');
        } else {
            this._setStatus('terminated');
        }
        if (condition === null)
            condition = 'session-terminate';
        this._handleEvent('onerror',JSJaCError('503','cancel',condition));

        this.oDbg.log("Aborting remaining connections",4);

        for (var i=0; i<this._hold+1; i++) {
            try {
                if (this._req[i] && this._req[i] != req)
                    this._req[i].r.abort();
            } catch(e) { this.oDbg.log(e, 1); }
        }

        this.oDbg.log("parseResponse done with terminating", 3);

        this.oDbg.log("Disconnected.",1);
        this._handleEvent('ondisconnect');

        return null;
    }
	*/
    // no error
    this._errcnt = 0;
    return event? {
	    	event : event,
	    	body : bodyStr? JSON.parse(bodyStr.indexOf('{')==0?bodyStr:('{'+bodyStr)) : null
	    } : null;
	    	
};

/**
 * @private
 */
JSJaCHttpBindingConnection.prototype._reInitStream = function(cb) {
    // tell http binding to reinit stream with/before next request
    this._reinit = true;

    this._sendEmpty(this._prepReInitStreamWait(cb));
};


JSJaCHttpBindingConnection.prototype._prepReInitStreamWait = function(cb) {
    return JSJaC.bind(function(req) {
        this._reInitStreamWait(req, cb);
    }, this);
};

/**
 * @private
 */
JSJaCHttpBindingConnection.prototype._reInitStreamWait = function(req, cb) {
    this.oDbg.log("checking for stream features");
    var doc = req.responseXML.documentElement, features, bind;
    this.oDbg.log(doc);
    if (doc.getElementsByTagNameNS) {
        this.oDbg.log("checking with namespace");

        features = doc.getElementsByTagNameNS(NS_STREAM, 'features').item(0);
        if (features) {
            bind = features.getElementsByTagNameNS(NS_BIND, 'bind').item(0);
        }
    } else {
        var featuresNL = doc.getElementsByTagName('stream:features'), i, l;
        for (i=0, l=featuresNL.length; i<l; i++) {
            if (featuresNL.item(i).namespaceURI == NS_STREAM ||
                featuresNL.item(i).getAttribute('xmlns') == NS_STREAM) {
                features = featuresNL.item(i);
                break;
            }
        }
        if (features) {
            bind = features.getElementsByTagName('bind');
            for (i=0, l=bind.length; i<l; i++) {
                if (bind.item(i).namespaceURI == NS_BIND ||
                    bind.item(i).getAttribute('xmlns') == NS_BIND) {
                    bind = bind.item(i);
                    break;
                }
            }
        }
    }
    this.oDbg.log(features);
    this.oDbg.log(bind);

    if (features) {
        if (bind) {
            cb();
        } else {
            this.oDbg.log("no bind feature - giving up",1);
            this._handleEvent('onerror',JSJaCError('503','cancel',
                                                   "service-unavailable"));
            this._connected = false;
            this.oDbg.log("Disconnected.",1);
            this._handleEvent('ondisconnect');
        }
    } else {
        // wait
        this._sendEmpty(this._prepReInitStreamWait(cb));
    }
};

/**
 * @private
 */
JSJaCHttpBindingConnection.prototype._repeat = function() {
  if (this._rid >= this._last_rid)
    this._rid = this._last_rid-1;

  this._process();
};

/**
 * @private
 */
JSJaCHttpBindingConnection.prototype._resume = function() {
    // make sure to repeat last request as we can be sure that it had failed
    // (only if we're not using the 'pause' attribute)
    if (this._pause === 0)
        this._repeat();
    else
        this._process();
};

/**
 * @private
 */
JSJaCHttpBindingConnection.prototype._setHold = function(hold)  {
  if (!hold || isNaN(hold) || hold < 0)
    hold = 0;
  else if (hold > JSJACHBC_MAX_HOLD)
    hold = JSJACHBC_MAX_HOLD;
  this._hold = hold;
  return this._hold;
};

/**
 * @private
 */
JSJaCHttpBindingConnection.prototype._setupJumpRequest = function(async) {
	var req = {};
	var r = XmlHttp.create();
	this._rid++;
	try {
		r.open("POST", this._httpbase + '?rid=' + this._rid + '&sid='
				+ this._sid + '&useBase64=1', async);
		r.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
	} catch (e) {
		this.oDbg.log(e, 1);
	}
	req.r = r;
	req.rid = this._rid;
	return req;
};

/**
 * @private
 */
JSJaCHttpBindingConnection.prototype._setupRequest = function(async) {
  var req = {};
  var r = XmlHttp.create();
  this._rid++;
  try {
    r.open("POST",this._httpbase,async);
    r.setRequestHeader('Content-Type','text/xml; charset=utf-8');
  } catch(e) { this.oDbg.log(e,1); }
  req.r = r;
  req.rid = this._rid;
  return req;
};

/**
 * @private
 */
JSJaCHttpBindingConnection.prototype._suspend = function() {
  if (this._pause === 0)
    return; // got nothing to do

  var slot = this._getFreeSlot();
  // Intentionally synchronous
  this._req[slot] = this._setupRequest(false);

  var reqstr = "<body pause='"+this._pause+"' xmlns='http://jabber.org/protocol/httpbind' sid='"+this._sid+"' rid='"+this._rid+"'";
  if (JSJAC_HAVEKEYS) {
    reqstr += " key='"+this._keys.getKey()+"'";
    if (this._keys.lastKey()) {
      this._keys = new JSJaCKeys(hex_sha1,this.oDbg);
      reqstr += " newkey='"+this._keys.getKey()+"'";
    }

  }
  reqstr += ">";

  while (this._pQueue.length) {
    var curNode = this._pQueue[0];
    reqstr += curNode;
    this._pQueue = this._pQueue.slice(1,this._pQueue.length);
  }

  //reqstr += "<presence type='unavailable' xmlns='jabber:client'/>";
  reqstr += "</body>";

  this.oDbg.log("Disconnecting: " + reqstr,4);
  this._req[slot].r.send(reqstr);
};


/**
 * @fileoverview All stuff related to HTTP Polling
 * @author Stefan Strigler steve@zeank.in-berlin.de
 */

/*exported JSJaCHttpPollingConnection */

/**
 * Instantiates an HTTP Polling session
 * @class Implementation of {@link
 * http://www.xmpp.org/extensions/xep-0025.html HTTP Polling}
 * @extends JSJaCConnection
 * @constructor
 */
function JSJaCHttpPollingConnection(oArg) {
  /**
   * @ignore
   */
  this.base = JSJaCConnection;
  this.base(oArg);

  // give hint to JSJaCPacket that we're using HTTP Polling ...
  JSJACPACKET_USE_XMLNS = false;
}
JSJaCHttpPollingConnection.prototype = new JSJaCConnection();

/**
 * Tells whether this implementation of JSJaCConnection is polling
 * Useful if it needs to be decided
 * whether it makes sense to allow for adjusting or adjust the
 * polling interval {@link JSJaCConnection#setPollInterval}
 * @return <code>true</code> if this is a polling connection,
 * <code>false</code> otherwise.
 * @type boolean
 */
JSJaCHttpPollingConnection.prototype.isPolling = function() { return true; };

/**
 * @private
 */
JSJaCHttpPollingConnection.prototype._getFreeSlot = function() {
  if (typeof(this._req[0]) == 'undefined' ||
      typeof(this._req[0].r) == 'undefined' ||
      this._req[0].r.readyState == 4)
    return 0;
  else
    return -1;
};

/**
 * @private
 */
JSJaCHttpPollingConnection.prototype._getInitialRequestString = function() {
  var reqstr = "0";
  if (JSJAC_HAVEKEYS) {
    this._keys = new JSJaCKeys(b64_sha1,this.oDbg); // generate first set of keys
    var key = this._keys.getKey();
    reqstr += ";"+key;
  }
  var streamto = this.domain;
  if (this.authhost)
    streamto = this.authhost;

  reqstr += ",<stream:stream to='"+streamto+"' xmlns='jabber:client' xmlns:stream='http://etherx.jabber.org/streams'";
  if (this.authtype == 'sasl' || this.authtype == 'saslanon')
    reqstr += " version='1.0'";
  reqstr += ">";
  return reqstr;
};

/**
 * @private
 */
JSJaCHttpPollingConnection.prototype._getRequestString = function(raw, last) {
  var reqstr = this._sid;
  if (JSJAC_HAVEKEYS) {
    reqstr += ";"+this._keys.getKey();
    if (this._keys.lastKey()) {
      this._keys = new JSJaCKeys(b64_sha1,this.oDbg);
      reqstr += ';'+this._keys.getKey();
    }
  }
  reqstr += ',';
  if (raw)
    reqstr += raw;
  while (this._pQueue.length) {
    reqstr += this._pQueue[0];
    this._pQueue = this._pQueue.slice(1,this._pQueue.length);
  }
  if (last)
    reqstr += '</stream:stream>';
  return reqstr;
};

/**
 * @private
 */
JSJaCHttpPollingConnection.prototype._getStreamID = function() {
  if (this._req[0].r.responseText === '') {
    this.oDbg.log("waiting for stream id",2);
    this._timeout = setTimeout(JSJaC.bind(this._sendEmpty, this),1000);
    return;
  }

  this.oDbg.log(this._req[0].r.responseText,4);

  // extract stream id used for non-SASL authentication
  if (this._req[0].r.responseText.match(/id=[\'\"]([^\'\"]+)[\'\"]/))
    this.streamid = RegExp.$1;
  this.oDbg.log("got streamid: "+this.streamid,2);

  var doc;

  try {
    var response = this._req[0].r.responseText;
    if (!response.match(/<\/stream:stream>\s*$/))
      response += '</stream:stream>';

    doc = XmlDocument.create("doc");
    doc.loadXML(response);
    if (!this._parseStreamFeatures(doc)) {
      this.authtype = 'nonsasl';
      return;
    }
  } catch(e) {
    this.oDbg.log("loadXML: "+e.toString(),1);
  }

  this._connected = true;

  if (this.register)
    this._doInBandReg();
  else
    this._doAuth();

  this._process(this._timerval); // start polling
};

/**
 * @private
 */
JSJaCHttpPollingConnection.prototype._getSuspendVars = function() {
  return [];
};

/**
 * @private
 */
JSJaCHttpPollingConnection.prototype._handleInitialResponse = function() {
  // extract session ID
  this.oDbg.log(this._req[0].r.getAllResponseHeaders(),4);
  var aPList = this._req[0].r.getResponseHeader('Set-Cookie');
  aPList = aPList.split(";");
  for (var i=0;i<aPList.length;i++) {
    var aArg = aPList[i].split("=");
    if (aArg[0] == 'ID')
      this._sid = aArg[1];
  }
  this.oDbg.log("got sid: "+this._sid,2);

  /* start sending from queue for not polling connections */
  this._connected = true;

  this._interval= setInterval(JSJaC.bind(this._checkQueue, this),
                              JSJAC_CHECKQUEUEINTERVAL);
  this._inQto = setInterval(JSJaC.bind(this._checkInQ, this),
                            JSJAC_CHECKINQUEUEINTERVAL);

  /* wait for initial stream response to extract streamid needed
   * for digest auth
   */
  this._getStreamID();
};

/**
 * @private
 */
JSJaCHttpPollingConnection.prototype._parseResponse = function(r) {
  var req = r.r;
  if (!this.connected())
    return null;

  /* handle error */
  // proxy error (!)
  if (req.status != 200) {
    this.oDbg.log("invalid response ("+req.status+"):" + req.responseText+"\n"+req.getAllResponseHeaders(),1);

    this._setStatus('internal_server_error');

    clearTimeout(this._timeout); // remove timer
    clearInterval(this._interval);
    clearInterval(this._inQto);
    this._connected = false;
    this.oDbg.log("Disconnected.",1);
    this._handleEvent('ondisconnect');
    this._handleEvent('onerror',JSJaCError('503','cancel','service-unavailable'));
    return null;
  }

  this.oDbg.log(req.getAllResponseHeaders(),4);
  var sid, aPList = req.getResponseHeader('Set-Cookie');

  if (aPList === null)
    sid = "-1:0"; // Generate internal server error
  else {
    aPList = aPList.split(";");
    for (var i=0;i<aPList.length;i++) {
      var aArg = aPList[i].split("=");
      if (aArg[0] == 'ID')
        sid = aArg[1];
    }
  }

  // http polling component error
  if (typeof(sid) != 'undefined' && sid.indexOf(':0') != -1) {
    switch (sid.substring(0,sid.indexOf(':0'))) {
    case '0':
      this.oDbg.log("invalid response:" + req.responseText,1);
      break;
    case '-1':
      this.oDbg.log("Internal Server Error",1);
      break;
    case '-2':
      this.oDbg.log("Bad Request",1);
      break;
    case '-3':
      this.oDbg.log("Key Sequence Error",1);
      break;
    }

    this._setStatus('internal_server_error');

    clearTimeout(this._timeout); // remove timer
    clearInterval(this._interval);
    clearInterval(this._inQto);
    this._handleEvent('onerror',JSJaCError('500','wait','internal-server-error'));
    this._connected = false;
    this.oDbg.log("Disconnected.",1);
    this._handleEvent('ondisconnect');
    return null;
  }

  if (!req.responseText)
    return null;

  try {
    var response = req.responseText.replace(/<\?xml.+\?>/,"");
    if (response.match(/<stream:stream/))
        response += "</stream:stream>";
    var doc = JSJaCHttpPollingConnection._parseTree("<body>"+response+"</body>");

    if (!doc || doc.tagName == 'parsererror') {
      this.oDbg.log("parsererror",1);

      doc = JSJaCHttpPollingConnection._parseTree("<stream:stream xmlns:stream='http://etherx.jabber.org/streams'>"+req.responseText);
      if (doc && doc.tagName != 'parsererror') {
        this.oDbg.log("stream closed",1);

        if (doc.getElementsByTagName('conflict').length > 0)
          this._setStatus("session-terminate-conflict");

        clearTimeout(this._timeout); // remove timer
        clearInterval(this._interval);
        clearInterval(this._inQto);
        this._handleEvent('onerror',JSJaCError('503','cancel','session-terminate'));
        this._connected = false;
        this.oDbg.log("Disconnected.",1);
        this._handleEvent('ondisconnect');
      } else
        this.oDbg.log("parsererror:"+doc,1);

      return doc;
    }

    return doc;
  } catch (e) {
    this.oDbg.log("parse error:"+e.message,1);
  }
  return null;
};

/**
 * @private
 */
JSJaCHttpPollingConnection.prototype._reInitStream = function(cb) {
  var streamto = this.authhost ? this.authhost : this.domain;
  this._sendRaw("<stream:stream xmlns:stream='http://etherx.jabber.org/streams' xmlns='jabber:client' to='" + streamto + "' version='1.0'>", cb);
};

/**
 * @private
 */
JSJaCHttpPollingConnection.prototype._repeat = function() {
    this._resume();
};

/**
 * @private
 */
JSJaCHttpPollingConnection.prototype._resume = function() {
  this._process(this._timerval);
};

/**
 * @private
 */
JSJaCHttpPollingConnection.prototype._setupRequest = function(async) {
  var r = XmlHttp.create();
  try {
    r.open("POST",this._httpbase,async);
    if (r.overrideMimeType)
      r.overrideMimeType('text/plain; charset=utf-8');
    r.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  } catch(e) { this.oDbg.log(e,1); }

  var req = {};
  req.r = r;
  return req;
};

/**
 * @private
 */
JSJaCHttpPollingConnection.prototype._suspend = function() {};

/*** [static] ***/

/**
 * @private
 */
JSJaCHttpPollingConnection._parseTree = function(s) {
  try {
    var r = XmlDocument.create("body","foo");
    if (typeof(r.loadXML) != 'undefined') {
      r.loadXML(s);
      return r.documentElement;
    } else if (window.DOMParser)
      return (new DOMParser()).parseFromString(s, "text/xml").documentElement;
  } catch (e) { }
  return null;
};

/**
 * @fileoverview This file contains all things that make life easier when
 * dealing with JIDs
 * @author Stefan Strigler
 */

/*exported JSJaCJIDInvalidException, JSJaCJID */

/**
 * Creates a new Exception of type JSJaCJIDInvalidException
 * @class Exception to indicate invalid values for a jid
 * @constructor
 * @param {String} message The message associated with this Exception
 */
function JSJaCJIDInvalidException(message) {
    /**
     * The exceptions associated message
     * @type String
     */
    this.message = message;
    /**
     * The name of the exception
     * @type String
     */
    this.name = "JSJaCJIDInvalidException";
}

/**
 * list of forbidden chars for nodenames
 * @private
 */
var JSJACJID_FORBIDDEN = ['"',' ','&','\'','/',':','<','>','@'];

/**
 * Creates a new JSJaCJID object
 * @class JSJaCJID models xmpp jid objects
 * @constructor
 * @param {Object} jid jid may be either of type String or a JID represented
 * by JSON with fields 'node', 'domain' and 'resource'
 * @throws JSJaCJIDInvalidException Thrown if jid is not valid
 * @return a new JSJaCJID object
 */
function JSJaCJID(jid) {
    /**
     *@private
     */
    this._node = '';
    /**
     *@private
     */
    this._domain = '';
    /**
     *@private
     */
    this._resource = '';

    if (typeof(jid) == 'string') {
        if (jid.indexOf('@') != -1) {
            this.setNode(jid.substring(0,jid.indexOf('@')));
            jid = jid.substring(jid.indexOf('@')+1);
        }
        if (jid.indexOf('/') != -1) {
            this.setResource(jid.substring(jid.indexOf('/')+1));
            jid = jid.substring(0,jid.indexOf('/'));
        }
        this.setDomain(jid);
    } else {
        this.setNode(jid.node);
        this.setDomain(jid.domain);
        this.setResource(jid.resource);
    }
}

/**
 * Gets the bare jid (i.e. the JID without resource)
 * @return A string representing the bare jid
 * @type String
 */
JSJaCJID.prototype.getBareJID = function() {
    return this.getNode()+'@'+this.getDomain();
};

/**
 * Gets the node part of the jid
 * @return A string representing the node name
 * @type String
 */
JSJaCJID.prototype.getNode = function() { return this._node; };

/**
 * Gets the domain part of the jid
 * @return A string representing the domain name
 * @type String
 */
JSJaCJID.prototype.getDomain = function() { return this._domain; };

/**
 * Gets the resource part of the jid
 * @return A string representing the resource
 * @type String
 */
JSJaCJID.prototype.getResource = function() { return this._resource; };


/**
 * Sets the node part of the jid
 * @param {String} node Name of the node
 * @throws JSJaCJIDInvalidException Thrown if node name contains invalid chars
 * @return This object
 * @type JSJaCJID
 */
JSJaCJID.prototype.setNode = function(node) {
    JSJaCJID._checkNodeName(node);
    this._node = node || '';
    return this;
};

/**
 * Sets the domain part of the jid
 * @param {String} domain Name of the domain
 * @throws JSJaCJIDInvalidException Thrown if domain name contains invalid
 * chars or is empty
 * @return This object
 * @type JSJaCJID
 */
JSJaCJID.prototype.setDomain = function(domain) {
    if (!domain || domain === '')
        throw new JSJaCJIDInvalidException("domain name missing");
    // chars forbidden for a node are not allowed in domain names
    // anyway, so let's check
    JSJaCJID._checkNodeName(domain);
    this._domain = domain;
    return this;
};

/**
 * Sets the resource part of the jid
 * @param {String} resource Name of the resource
 * @return This object
 * @type JSJaCJID
 */
JSJaCJID.prototype.setResource = function(resource) {
    this._resource = resource || '';
    return this;
};

/**
 * The string representation of the full jid
 * @return A string representing the jid
 * @type String
 */
JSJaCJID.prototype.toString = function() {
    var jid = '';
    if (this.getNode() && this.getNode() !== '')
        jid = this.getNode() + '@';
    jid += this.getDomain(); // we always have a domain
    if (this.getResource() && this.getResource() !== "")
        jid += '/' + this.getResource();
    return jid;
};

/**
 * Removes the resource part of the jid
 * @return This object
 * @type JSJaCJID
 */
JSJaCJID.prototype.removeResource = function() {
    return this.setResource();
};

/**
 * creates a copy of this JSJaCJID object
 * @return A copy of this
 * @type JSJaCJID
 */
JSJaCJID.prototype.clone = function() {
    return new JSJaCJID(this.toString());
};

/**
 * Compares two jids if they belong to the same entity (i.e. w/o resource)
 * @param {String} jid a jid as string or JSJaCJID object
 * @return 'true' if jid is same entity as this
 * @type Boolean
 */
JSJaCJID.prototype.isEntity = function(jid) {
    if (typeof jid == 'string')
        jid = (new JSJaCJID(jid));
    else
        jid = jid.clone();
    jid.removeResource();
    return (this.clone().removeResource().toString() === jid.toString());
};

/**
 * Check if node name is valid
 * @private
 * @param {String} node A name for a node
 * @throws JSJaCJIDInvalidException Thrown if name for node is not allowed
 */
JSJaCJID._checkNodeName = function(nodeprep) {
    if (!nodeprep || nodeprep === '')
        return;
    for (var i=0; i< JSJACJID_FORBIDDEN.length; i++) {
        if (nodeprep.indexOf(JSJACJID_FORBIDDEN[i]) != -1) {
            throw new JSJaCJIDInvalidException("forbidden char in nodename: "+JSJACJID_FORBIDDEN[i]);
        }
    }
};

/* Copyright (c) 2005-2007 Sam Stephenson
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
 * BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/*exported JSJaCJSON */

/*
  json.js
  taken from prototype.js, made static
*/
function JSJaCJSON() {}
JSJaCJSON.toString = function (obj) {
  var m = {
    '\b': '\\b',
    '\t': '\\t',
    '\n': '\\n',
    '\f': '\\f',
    '\r': '\\r',
    '"' : '\\"',
    '\\': '\\\\'
  },
  s = {
    array: function (x) {
      var a = ['['], b, f, i, l = x.length, v;
      for (i = 0; i < l; i += 1) {
        v = x[i];
        f = s[typeof v];
        if (f) {
          try {
            v = f(v);
            if (typeof v == 'string') {
              if (b) {
                a[a.length] = ',';
              }
              a[a.length] = v;
              b = true;
            }
          } catch(e) {
          }
        }
      }
      a[a.length] = ']';
      return a.join('');
    },
    'boolean': function (x) {
      return String(x);
    },
    'null': function () {
      return "null";
    },
    number: function (x) {
      return isFinite(x) ? String(x) : 'null';
    },
    object: function (x) {
      if (x) {
        if (x instanceof Array) {
          return s.array(x);
        }
        var a = [], b, f, i, v;
        a.push('{');
        for (i in x) {
          if (x.hasOwnProperty(i)) {
            v = x[i];
            f = s[typeof v];
            if (f) {
              try {
                v = f(v);
                if (typeof v == 'string') {
                  if (b) {
                    a[a.length] = ',';
                  }
                  a.push(s.string(i), ':', v);
                  b = true;
                }
              } catch(e) {
              }
            }
          }
        }

        a[a.length] = '}';
        return a.join('');
      }
      return 'null';
    },
    string: function (x) {
      if (/["\\\x00-\x1f]/.test(x)) {
                    x = x.replace(/([\x00-\x1f\\"])/g, function(a, b) {
          var c = m[b];
          if (c) {
            return c;
          }
          c = b.charCodeAt();
          return '\\u00' +
          Math.floor(c / 16).toString(16) +
          (c % 16).toString(16);
        });
  }
  return '"' + x + '"';
}
  };

switch (typeof(obj)) {
 case 'object':
   return s.object(obj);
 case 'array':
   return s.array(obj);
 }
};

JSJaCJSON.parse = function (str) {
  /*jshint evil: true */
  try {
    return !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(
                                                       str.replace(/"(\\.|[^"\\])*"/g, ''))) &&
            eval('(' + str + ')');
    } catch (e) {
        return false;
    }
};

/*exported JSJaCKeys */

/**
 * Creates a new set of hash keys
 * @class Reflects a set of sha1/md5 hash keys for securing sessions
 * @constructor
 * @param {Function} func The hash function to be used for creating the keys
 * @param {Debugger} oDbg Reference to debugger implementation [optional]
 */
function JSJaCKeys(func,oDbg) {
  var seed = Math.random();

  /**
   * @private
   */
  this._k = [];
  this._k[0] = seed.toString();
  if (oDbg)
    /**
     * Reference to Debugger
     * @type Debugger
     */
    this.oDbg = oDbg;
  else {
    this.oDbg = {};
    this.oDbg.log = function() {};
  }

  if (func) {
    for (var i=1; i<JSJAC_NKEYS; i++) {
      this._k[i] = func(this._k[i-1]);
      oDbg.log(i+": "+this._k[i],4);
    }
  }

  /**
   * @private
   */
  this._indexAt = JSJAC_NKEYS-1;
  /**
   * Gets next key from stack
   * @return New hash key
   * @type String
   */
  this.getKey = function() {
    return this._k[this._indexAt--];
  };
  /**
   * Indicates whether there's only one key left
   * @return <code>true</code> if there's only one key left, false otherwise
   * @type boolean
   */
  this.lastKey = function() { return (this._indexAt === 0); };
  /**
   * Returns number of overall/initial stack size
   * @return Number of keys created
   * @type int
   */
  this.size = function() { return this._k.length; };

  /**
   * @private
   */
  this._getSuspendVars = function() {
    return ('_k,_indexAt').split(',');
  };
}

/**
 * @fileoverview Contains all Jabber/XMPP packet related classes.
 * @author Stefan Strigler steve@zeank.in-berlin.de
 */

/*exported JSJaCPacket, JSJaCPresence, JSJaCIQ, JSJaCMessage */

var JSJACPACKET_USE_XMLNS = true;

/**
 * Creates a new packet with given root tag name (for internal use)
 * @class Somewhat abstract base class for all kinds of specialised packets
 * @param {String} name The root tag name of the packet
 * (i.e. one of 'message', 'iq' or 'presence')
 */
function JSJaCPacket(name) {
  /**
   * @private
   */
  this.name = name;

  if (typeof(JSJACPACKET_USE_XMLNS) != 'undefined' && JSJACPACKET_USE_XMLNS)
    /**
     * @private
     */
    this.doc = XmlDocument.create(name, NS_CLIENT);
  else
    /**
     * @private
     */
    this.doc = XmlDocument.create(name,'');
}

/**
 * Gets the type (name of root element) of this packet, i.e. one of
 * 'presence', 'message' or 'iq'
 * @return {string} The top level tag name.
 */
JSJaCPacket.prototype.pType = function() { return this.name; };

/**
 * Gets the associated Document for this packet.
 * @see {@link http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#i-Document | Document}
 * @returns {Document}
 */
JSJaCPacket.prototype.getDoc = function() {
  return this.doc;
};
/**
 * Gets the root node of this packet
 * @see {@link http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247 | Node}
 * @return {Node}
 */
JSJaCPacket.prototype.getNode = function() {
  if (this.getDoc() && this.getDoc().documentElement)
    return this.getDoc().documentElement;
  else
    return null;
};

/**
 * Sets the 'to' attribute of the root node of this packet
 * @param {String} [to] A string representing a jid sending this packet to. If omitted the property will be deleted thus sending to service rather than dedicated recipient.
 * @return {JSJaCPacket} this
 */
JSJaCPacket.prototype.setTo = function(to) {
  if (!to)
    this.getNode().removeAttribute('to');
  else if (typeof(to) == 'string')
    this.getNode().setAttribute('to',to);
  else
    this.getNode().setAttribute('to',to.toString());
  return this;
};
/**
 * Sets the 'from' attribute of the root node of this
 * packet. Usually this is not needed as the server will take care
 * of this automatically.
 * @param {string} [from] A string representing the jid of the sender of this packet.
 * @deprecated
 * @return {JSJaCPacket} this
 */
JSJaCPacket.prototype.setFrom = function(from) {
  if (!from)
    this.getNode().removeAttribute('from');
  else if (typeof(from) == 'string')
    this.getNode().setAttribute('from',from);
  else
    this.getNode().setAttribute('from',from.toString());
  return this;
};

/**
 * Sets 'id' attribute of the root node of this packet.
 * @param {string} id The id of the packet.
 * @return {JSJaCPacket} this
 */
JSJaCPacket.prototype.setID = function(id) {
  if (!id)
    this.getNode().removeAttribute('id');
  else
    this.getNode().setAttribute('id',id);
  return this;
};
/**
 * Sets the 'type' attribute of the root node of this packet.
 * @param {string} type The type of the packet.
 * @return {JSJaCPacket} this
 */
JSJaCPacket.prototype.setType = function(type) {
  if (!type)
    this.getNode().removeAttribute('type');
  else
    this.getNode().setAttribute('type',type);
  return this;
};
/**
 * Sets 'xml:lang' for this packet
 * @param {string} xmllang The xml:lang of the packet.
 * @return {JSJaCPacket} this
 */
JSJaCPacket.prototype.setXMLLang = function(xmllang) {
  if (!xmllang)
    this.getNode().removeAttribute('xml:lang');
  else
    this.getNode().setAttribute('xml:lang',xmllang);
  return this;
};

/**
 * Gets the 'to' attribute of this packet
 * @return {string}
 */
JSJaCPacket.prototype.getTo = function() {
  return this.getNode().getAttribute('to');
};
/**
 * Gets the 'from' attribute of this packet.
 * @return {string}
 */
JSJaCPacket.prototype.getFrom = function() {
  return this.getNode().getAttribute('from');
};
/**
 * Gets the 'to' attribute of this packet as a JSJaCJID object
 * @return {JSJaCJID}
 */
JSJaCPacket.prototype.getToJID = function() {
  return new JSJaCJID(this.getTo());
};
/**
 * Gets the 'from' attribute of this packet as a JSJaCJID object
 * @return {JSJaCJID}
 */
JSJaCPacket.prototype.getFromJID = function() {
  return new JSJaCJID(this.getFrom());
};
/**
 * Gets the 'id' of this packet
 * @return {string}
 */
JSJaCPacket.prototype.getID = function() {
  return this.getNode().getAttribute('id');
};
/**
 * Gets the 'type' of this packet
 * @return {string}
 */
JSJaCPacket.prototype.getType = function() {
  return this.getNode().getAttribute('type');
};
/**
 * Gets the 'xml:lang' of this packet
 * @return {string}
 */
JSJaCPacket.prototype.getXMLLang = function() {
  return this.getNode().getAttribute('xml:lang');
};
/**
 * Gets the 'xmlns' (xml namespace) of the root node of this packet
 * @return {string}
 */
JSJaCPacket.prototype.getXMLNS = function() {
  return this.getNode().namespaceURI || this.getNode().getAttribute('xmlns');
};

/**
 * Gets a child element of this packet. If no params given returns first child.
 * @see {@link http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247 | Node}
 * @param {string} name Tagname of child to retrieve. Use '*' to match any tag. [optional]
 * @param {string} ns   Namespace of child. Use '*' to match any ns.[optional]
 * @return {Node} The child node, null if none found
 */
JSJaCPacket.prototype.getChild = function(name, ns) {
  if (!this.getNode()) {
    return null;
  }

  name = name || '*';
  ns = ns || '*';

  if (this.getNode().getElementsByTagNameNS) {
    return this.getNode().getElementsByTagNameNS(ns, name).item(0);
  }

  // fallback
  var nodes = this.getNode().getElementsByTagName(name);
  if (ns != '*') {
    for (var i=0; i<nodes.length; i++) {
      if (nodes.item(i).namespaceURI == ns || nodes.item(i).getAttribute('xmlns') == ns) {
        return nodes.item(i);
      }
    }
  } else {
    return nodes.item(0);
  }
  return null; // nothing found
};

/**
 * Gets the node value of a child element of this packet.
 * @param {string} name Tagname of child to retrieve.
 * @param {string} ns   Namespace of child
 * @return {string} The value of the child node, empty string if none found
 */
JSJaCPacket.prototype.getChildVal = function(name, ns) {
  var node = this.getChild(name, ns);
  var ret = '';
  if (node && node.hasChildNodes()) {
    // concatenate all values from childNodes
    for (var i=0; i<node.childNodes.length; i++)
      if (node.childNodes.item(i).nodeValue)
        ret += node.childNodes.item(i).nodeValue;
  }
  return ret;
};

/**
 * Returns a copy of this node
 * @return {JSJaCPacket} a copy of this node
 */
JSJaCPacket.prototype.clone = function() {
  return JSJaCPacket.wrapNode(this.getNode());
};

/**
 * Checks if packet is of type 'error'
 * @return {boolean} 'true' if this packet is of type 'error', 'false' otherwise
 */
JSJaCPacket.prototype.isError = function() {
  return (this.getType() == 'error');
};

/**
 * Returns an error condition reply according to {@link http://xmpp.org/extensions/xep-0086.html | XEP-0086}. Creates a clone of the calling packet with senders and recipient exchanged and error stanza appended.
 * @param {STANZA_ERROR} stanza_error an error stanza containing error cody, type and condition of the error to be indicated
 * @return {JSJaCPacket} an error reply packet
 */
JSJaCPacket.prototype.errorReply = function(stanza_error) {
  var rPacket = this.clone();
  rPacket.setTo(this.getFrom());
  rPacket.setFrom();
  rPacket.setType('error');

  rPacket.appendNode('error',
                     {code: stanza_error.code, type: stanza_error.type},
                     [[stanza_error.cond, {xmlns: NS_STANZAS}]]);

  return rPacket;
};

/**
 * Returns a string representation of the raw xml content of this packet.
 * @return {string} deserialized xml packet
 */
JSJaCPacket.prototype.xml = typeof XMLSerializer != 'undefined' ?
function() {
  var r = (new XMLSerializer()).serializeToString(this.getNode());
  if (typeof(r) == 'undefined')
    r = (new XMLSerializer()).serializeToString(this.doc); // oldschool
  return r;
} :
function() {// IE
  return this.getDoc().xml;
};


// PRIVATE METHODS DOWN HERE

/**
 * Gets an attribute of the root element
 * @private
 */
JSJaCPacket.prototype._getAttribute = function(attr) {
  return this.getNode().getAttribute(attr);
};


if (!document.ELEMENT_NODE) {
  document.ELEMENT_NODE = 1;
  document.ATTRIBUTE_NODE = 2;
  document.TEXT_NODE = 3;
  document.CDATA_SECTION_NODE = 4;
  document.ENTITY_REFERENCE_NODE = 5;
  document.ENTITY_NODE = 6;
  document.PROCESSING_INSTRUCTION_NODE = 7;
  document.COMMENT_NODE = 8;
  document.DOCUMENT_NODE = 9;
  document.DOCUMENT_TYPE_NODE = 10;
  document.DOCUMENT_FRAGMENT_NODE = 11;
  document.NOTATION_NODE = 12;
}

/**
 * import node into this packets document
 * @private
 */
JSJaCPacket.prototype._importNode = function(node, allChildren) {
  switch (node.nodeType) {
  case document.ELEMENT_NODE:

  var newNode;
  if (this.getDoc().createElementNS) {
    newNode = this.getDoc().createElementNS(node.namespaceURI, node.nodeName);
  } else {
    newNode = this.getDoc().createElement(node.nodeName);
  }

  var i, il;
  /* does the node have any attributes to add? */
  if (node.attributes && node.attributes.length > 0)
    for (i = 0, il = node.attributes.length;i < il; i++) {
      var attr = node.attributes.item(i);
      if (attr.nodeName == 'xmlns' &&
          (newNode.getAttribute('xmlns') !== null || newNode.namespaceURI)) {
          // skip setting an xmlns attribute as it has been set
          // before already by createElementNS

          // namespaceURI is '' for IE<9
          continue;
      }
      if (newNode.setAttributeNS && attr.namespaceURI) {
        newNode.setAttributeNS(attr.namespaceURI,
                               attr.name,
                               attr.value);
      } else {
        newNode.setAttribute(attr.name,
                             attr.value);
      }
    }
  /* are we going after children too, and does the node have any? */
  if (allChildren && node.childNodes && node.childNodes.length > 0) {
    for (i = 0, il = node.childNodes.length; i < il; i++) {
      newNode.appendChild(this._importNode(node.childNodes.item(i), allChildren));
    }
  }
  return newNode;
  case document.TEXT_NODE:
  case document.CDATA_SECTION_NODE:
  case document.COMMENT_NODE:
  return this.getDoc().createTextNode(node.nodeValue);
  }
};

/**
 * Set node value of a child node
 * @private
 */
JSJaCPacket.prototype._setChildNode = function(nodeName, nodeValue) {
  var aNode = this.getChild(nodeName);
  var tNode = this.getDoc().createTextNode(nodeValue);
  if (aNode)
    try {
      aNode.replaceChild(tNode,aNode.firstChild);
    } catch (e) { }
  else {
    try {
      aNode = this.getDoc().createElementNS(this.getNode().namespaceURI,
                                            nodeName);
    } catch (ex) {
      aNode = this.getDoc().createElement(nodeName);
    }
    this.getNode().appendChild(aNode);
    aNode.appendChild(tNode);
  }
  return aNode;
};

/**
 * Builds a node using {@link http://wiki.script.aculo.us/scriptaculous/show/Builder | script.aculo.us' Dom Builder} notation.
 * This code is taken from {@link http://wiki.script.aculo.us/scriptaculous/show/Builder | script.aculo.us' Dom Builder} and has been modified to suit our needs.<br/>
 * The original parts of the code do have the following copyright
 * and license notice:<br/>
 * Copyright (c) 2005, 2006 Thomas Fuchs (http://script.aculo.us,
 * http://mir.acu lo.us) <br/>
 * script.aculo.us is freely distributable under the terms of an
 * MIT-style licen se.  // For details, see the script.aculo.us web
 * site: http://script.aculo.us/<br>
 * @author Thomas Fuchs
 * @author Stefan Strigler
 * @return {Node} The newly created node
 * @see {@link http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247 | Node}
 */
JSJaCPacket.prototype.buildNode = function(elementName) {
  return JSJaCBuilder.buildNode(this.getDoc(),
                                elementName,
                                arguments[1],
                                arguments[2],
                                arguments[3]);
};

/**
 * Appends node created by buildNode to this packets parent node.
 * @param {Node} element The node to append or
 * @param {string} element A name plus an object hash with attributes (optional) plus an array of childnodes (optional)
 * @see #buildNode
 * @return {JSJaCPacket} This packet
 * @see {@link http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247 | Node}
 */
JSJaCPacket.prototype.appendNode = function(element) {
  if (typeof element=='object') { // seems to be a prebuilt node
    this.getNode().appendChild(element);
  } else { // build node
    this.getNode().appendChild(this.buildNode(element,
                                                     arguments[1],
                                                     arguments[2],
                                                     this.getNode().namespaceURI));
  }
  return this;
};


/**
 * A jabber/XMPP presence packet
 * @class Models the XMPP notion of a 'presence' packet
 * @extends JSJaCPacket
 */
function JSJaCPresence() {
  /**
   * @ignore
   */
  this.base = JSJaCPacket;
  this.base('presence');
}
JSJaCPresence.prototype = new JSJaCPacket();

/**
 * Sets the status message for current status. Usually this is set
 * to some human readable string indicating what the user is
 * doing/feel like currently.
 * @param {string} status A status message
 * @return {JSJaCPresence} this
 */
JSJaCPresence.prototype.setStatus = function(status) {
  this._setChildNode("status", status);
  return this;
};
/**
 * Sets the online status for this presence packet.
 * @param {string} show An XMPP complient status indicator. Must
 * be one of 'chat', 'away', 'xa', 'dnd'
 * @return {JSJaCPresence} this
 */
JSJaCPresence.prototype.setShow = function(show) {
  if (show == 'chat' || show == 'away' || show == 'xa' || show == 'dnd' || show == 'unavailable')
    this._setChildNode("show",show);
  return this;
};
/**
 * Sets the priority of the resource bind to with this connection
 * @param {int} prio The priority to set this resource to
 * @return {JSJaCPresence} this
 */
JSJaCPresence.prototype.setPriority = function(prio) {
  this._setChildNode("priority", prio);
  return this;
};
/**
 * Some combined method that allowes for setting show, status and
 * priority at once
 * @param {string} show A status message
 * @param {string} status A status indicator as defined by XMPP
 * @param {int} prio A priority for this resource
 * @return {JSJaCPresence} this
 */
JSJaCPresence.prototype.setPresence = function(show,status,prio) {
  if (show)
    this.setShow(show);
  if (status)
    this.setStatus(status);
  if (prio)
    this.setPriority(prio);
  return this;
};

/**
 * Gets the status message of this presence
 * @return The (human readable) status message
 * @type String
 */
JSJaCPresence.prototype.getStatus = function() {
  return this.getChildVal('status');
};
/**
 * Gets the status of this presence.
 * Either one of 'chat', 'away', 'xa' or 'dnd' or null.
 * @return The status indicator as defined by XMPP
 * @type String
 */
JSJaCPresence.prototype.getShow = function() {
  return this.getChildVal('show');
};
/**
 * Gets the priority of this status message
 * @return A resource priority
 * @type int
 */
JSJaCPresence.prototype.getPriority = function() {
  return this.getChildVal('priority');
};


/**
 * A jabber/XMPP iq packet
 * @class Models the XMPP notion of an 'iq' packet
 * @extends JSJaCPacket
 */
function JSJaCIQ() {
  /**
   * @ignore
   */
  this.base = JSJaCPacket;
  this.base('iq');
}
JSJaCIQ.prototype = new JSJaCPacket();

/**
 * Some combined method to set 'to', 'type' and 'id' at once
 * @param {string} to the recepients JID
 * @param {string} type A XMPP compliant iq type (one of 'set', 'get', 'result' and 'error'
 * @param {string} id A packet ID
 * @return {JSJaCIQ} this
 */
JSJaCIQ.prototype.setIQ = function(to,type,id) {
  if (to)
    this.setTo(to);
  if (type)
    this.setType(type);
  if (id)
    this.setID(id);
  return this;
};
/**
 * Creates a 'query' child node with given XMLNS
 * @param {string} xmlns The namespace for the 'query' node
 * @return {Node} The query node
 * @see {@link http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247 | Node}
 */
JSJaCIQ.prototype.setQuery = function(xmlns) {
  var query;
  try {
    query = this.getDoc().createElementNS(xmlns,'query');
  } catch (e) {
    query = this.getDoc().createElement('query');
    query.setAttribute('xmlns',xmlns);
  }
  this.getNode().appendChild(query);
  return query;
};

/**
 * Gets the 'query' node of this packet
 * @return {Node} The query node
 * @see {@link http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247 | Node}
 */
JSJaCIQ.prototype.getQuery = function() {
  return this.getNode().getElementsByTagName('query').item(0);
};
/**
 * Gets the XMLNS of the query node contained within this packet
 * @return {string} The namespace of the query node
 */
JSJaCIQ.prototype.getQueryXMLNS = function() {
  if (this.getQuery()) {
    return this.getQuery().namespaceURI || this.getQuery().getAttribute('xmlns');
  } else {
    return null;
  }
};

/**
 * Creates an IQ reply with type set to 'result'. If given appends payload to first child if IQ. Payload maybe XML as string or a DOM element (or an array of such elements as well).
 * @param {Element} [payload] An optional payload to be appended.
 * @return {JSJaCIQ} An IQ reply packet
 */
JSJaCIQ.prototype.reply = function(payload) {
  var rIQ = this.clone();
  rIQ.setTo(this.getFrom());
  rIQ.setFrom();
  rIQ.setType('result');
  if (payload) {
    if (typeof payload == 'string')
      rIQ.getChild().appendChild(rIQ.getDoc().loadXML(payload));
    else if (payload.constructor == Array) {
      var node = rIQ.getChild();
      for (var i=0; i<payload.length; i++)
        if(typeof payload[i] == 'string')
          node.appendChild(rIQ.getDoc().loadXML(payload[i]));
        else if (typeof payload[i] == 'object')
          node.appendChild(payload[i]);
    }
    else if (typeof payload == 'object')
      rIQ.getChild().appendChild(payload);
  }
  return rIQ;
};

/**
 * A jabber/XMPP message packet
 * @class Models the XMPP notion of an 'message' packet
 * @extends JSJaCPacket
 */
function JSJaCMessage() {
  /**
   * @ignore
   */
  this.base = JSJaCPacket;
  this.base('message');
}
JSJaCMessage.prototype = new JSJaCPacket();

/**
 * Sets the body of the message
 * @param {string} body Your message to be sent along
 * @return {JSJaCMessage} this message
 */
JSJaCMessage.prototype.setBody = function(body) {
  this._setChildNode("body",body);
  return this;
};
/**
 * Sets the subject of the message
 * @param {string} subject Your subject to be sent along
 * @return {JSJaCMessage} this message
 */
JSJaCMessage.prototype.setSubject = function(subject) {
  this._setChildNode("subject",subject);
  return this;
};
/**
 * Sets the 'tread' attribute for this message. This is used to identify
 * threads in chat conversations
 * @param {string} thread Usually a somewhat random hash.
 * @returns {JSJaCMessage} this message
 */
JSJaCMessage.prototype.setThread = function(thread) {
  this._setChildNode("thread", thread);
  return this;
};
/**
 * Gets the 'thread' identifier for this message
 * @return {string} A thread identifier
 */
JSJaCMessage.prototype.getThread = function() {
  return this.getChildVal('thread');
};
/**
 * Gets the body of this message
 * @return {string} The body of this message
 */
JSJaCMessage.prototype.getBody = function() {
  return this.getChildVal('body');
};
/**
 * Gets the subject of this message
 * @return {string} The subject of this message
 */
JSJaCMessage.prototype.getSubject = function() {
  return this.getChildVal('subject');
};


/**
 * Tries to transform a w3c DOM node to JSJaC's internal representation
 * (JSJaCPacket type, one of JSJaCPresence, JSJaCMessage, JSJaCIQ)
 * @param: {Node
 * http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247}
 * node The node to be transformed
 * @return A JSJaCPacket representing the given node. If node's root
 * elemenent is not one of 'message', 'presence' or 'iq',
 * <code>null</code> is being returned.
 * @type JSJaCPacket
 */
JSJaCPacket.wrapNode = function(node) {
  var oPacket = null;

  switch (node.nodeName.toLowerCase()) {
  case 'presence':
      oPacket = new JSJaCPresence();
      break;
  case 'message':
      oPacket = new JSJaCMessage();
      break;
  case 'iq':
      oPacket = new JSJaCIQ();
      break;
  }

  if (oPacket) {
    oPacket.getDoc().replaceChild(oPacket._importNode(node, true),
                                  oPacket.getNode());
    if(oPacket.getDoc().xml == null && node != null && node.xml != null)
    	oPacket.getDoc().xml = node.xml;
  }

  return oPacket;
};

/*exported JSJaCUtils */

/**
 * Various utilities put together so that they don't pollute global
 * name space.
 * @namespace
 */
var JSJaCUtils = {
  /**
   * XOR two strings of equal length.
   * @param {string} s1 first string to XOR.
   * @param {string} s2 second string to XOR.
   * @return {string} s1 ^ s2.
   */
  xor: function(s1, s2) {
    /*jshint bitwise: false */
    if(!s1) {
      return s2;
    }
    if(!s2) {
      return s1;
    }

    var result = '';
    for(var i = 0; i < s1.length; i++) {
      result += String.fromCharCode(s1.charCodeAt(i) ^ s2.charCodeAt(i));
    }
    return result;
  },

  /**
   * Create nonce value of given size.
   * @param {int} size size of the nonce that should be generated.
   * @return {string} generated nonce.
   */
  cnonce: function(size) {
    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var cnonce = '';
    for (var i = 0; i < size; i++) {
      cnonce += tab.charAt(Math.round(Math.random(new Date().getTime()) * (tab.length - 1)));
    }
    return cnonce;
  },

  /**
   * Current timestamp.
   * @return Seconds since 1.1.1970.
   * @type int
   */
  now: function() {
    if (Date.now && typeof Date.now == 'function') {
      return Date.now();
    } else {
      return new Date().getTime();
    }
  }

};

/**
 * @author Janusz Dziemidowicz rraptorr@nails.eu.org
 * @fileoverview All stuff related to WebSocket
 * <pre>
 * The WebSocket protocol is a bit of a mess. Various, incompatible,
 * protocol drafts were implemented in browsers. Fortunately, recently
 * a finished protocol was released in RFC6455. Further description
 * assumes RFC6455 WebSocket protocol version.
 *
 * WebSocket browser support. Current (November 2012) browser status:
 * - Chrome 16+ - works properly and supports RFC6455
 * - Firefox 16+ - works properly and support RFC6455 (ealier versions
 *   have problems with proxies)
 * - Opera 12.10 - supports RFC6455, but does not work at all if a
 *   proxy is configured (earlier versions do not support RFC6455)
 * - Internet Explorer 10+ - works properly and supports RFC6455
 *
 * Due to the above status, this code is currently recommended on
 * Chrome 16+, Firefox 16+ and Internet Explorer 10+. Using it on
 * other browsers is discouraged.
 *
 * Please also note that some users are only able to connect to ports
 * 80 and 443. Port 80 is sometimes intercepted by transparent HTTP
 * proxies, which mostly does not support WebSocket, so port 443 is
 * the best choice currently (it does not have to be
 * encrypted). WebSocket also usually does not work well with reverse
 * proxies, be sure to make extensive tests if you use one.
 *
 * There is no standard for XMPP over WebSocket. However, there is a
 * draft (http://tools.ietf.org/html/draft-ietf-xmpp-websocket-00) and
 * this implementation follows it.
 *
 * Tested servers:
 *
 * - node-xmpp-bosh (https://github.com/dhruvbird/node-xmpp-bosh) -
 *   supports RFC6455 and works with no problems since 0.6.1, it also
 *   transparently uses STARTTLS if necessary
 * - wxg (https://github.com/Gordin/wxg) - supports RFC6455 and works
 *   with no problems, but cannot connect to servers requiring
 *   STARTTLS (original wxg at https://github.com/hocken/wxg has some
 *   issues, that were fixed by Gordin).
 * - ejabberd-websockets
 *   (https://github.com/superfeedr/ejabberd-websockets) - does not
 *   support RFC6455 hence it does not work, adapting it to support
 *   RFC6455 should be quite easy for anyone knowing Erlang (some work
 *   in progress can be found on github)
 * - Openfire (http://www.igniterealtime.org/projects/openfire/) -
 *   unofficial plugin is available, but it lacks support
 *   for RFC6455 hence it does not work
 * - Apache Vysper (http://mina.apache.org/vysper/) - does
 *   not support RFC6455 hence does not work
 * - Tigase (http://www.tigase.org/) - works fine since 5.2.0.
 * - MongooseIM (https://github.com/esl/ejabberd) - a fork of ejabberd
 *   with support for XMPP over Websockets.
 * </pre>
 */

/*exported JSJaCWebSocketConnection */

/**
 * Instantiates a WebSocket session.
 * @class Implementation of {@link http://tools.ietf.org/html/draft-ietf-xmpp-websocket-00 | An XMPP Sub-protocol for WebSocket}.
 * @extends JSJaCConnection
 * @constructor
 * @param {Object} oArg connection properties.
 * @param {string} oArg.httpbase WebSocket connection endpoint (i.e. ws://localhost:5280)
 * @param {JSJaCDebugger} [oArg.oDbg] A reference to a debugger implementing the JSJaCDebugger interface.
 */
function JSJaCWebSocketConnection(oArg) {
	this.base = JSJaCConnection;
	this.base(oArg);

	this._ws = null;

	this.registerHandler('onerror', JSJaC.bind(this._cleanupWebSocket, this));
}

JSJaCWebSocketConnection.prototype = new JSJaCConnection();

JSJaCWebSocketConnection.prototype._cleanupWebSocket = function() {
	if(this._ws !== null) {
		this._ws.onclose = null;
		this._ws.onerror = null;
		this._ws.onopen = null;
		this._ws.onmessage = null;

		this._ws.close();
		this._ws = null;
	}
};

/**
 * Connect to a jabber/XMPP server.
 * @param {Object} oArg The configuration to be used for connecting.
 * @param {string} oArg.domain The domain name of the XMPP service.
 * @param {string} oArg.username The username (nodename) to be logged in with.
 * @param {string} oArg.resource The resource to identify the login with.
 * @param {string} oArg.password The user's password.
 * @param {string} [oArg.authzid] Authorization identity. Used to act as another user, in most cases not needed and rarely supported by servers. If present should be a bare JID (user@example.net).
 * @param {boolean} [oArg.allow_plain] Whether to allow plain text logins.
 * @param {boolean} [oArg.allow_scram] Whether to allow SCRAM-SHA-1 authentication. Please note that it is quite slow, do some testing on all required browsers before enabling.
 * @param {boolean} [oArg.register] Whether to register a new account.
 * @param {string} [oArg.authhost] The host that handles the actualy authorization. There are cases where this is different from the settings above, e.g. if there's a service that provides anonymous logins at 'anon.example.org'.
 * @param {string} [oArg.authtype] Must be one of 'sasl' (default), 'nonsasl', 'saslanon', or 'anonymous'.
 * @param {string} [oArg.xmllang] The requested language for this login. Typically XMPP server try to respond with error messages and the like in this language if available.
 */
JSJaCWebSocketConnection.prototype.connect = function(oArg) {
	this._cleanupWebSocket();
	this._setStatus('connecting');

	if(oArg.appType){
		this.appType = oArg.appType;				//rongqb for esn 20170223
	}
    
    if(oArg.clientIdentify){
    		this.clientIdentify = oArg.clientIdentify;	//rongqb for esn 20170223
    }

	this.domain = oArg.domain || 'localhost';
	this.username = oArg.username;
	this.resource = oArg.resource;
	this.pass = oArg.password || oArg.pass;
	this.authzid = oArg.authzid || '';
	this.register = oArg.register;

	this.authhost = oArg.authhost || this.domain;
	this.authtype = oArg.authtype || 'sasl';

	this.jid = this.username + '@' + this.domain;
	this.fulljid = this.jid + '/' + this.resource;

	if(oArg.allow_plain) {
		this._allow_plain = oArg.allow_plain;
	} else {
		this._allow_plain = JSJAC_ALLOW_PLAIN;
	}

	if(oArg.allow_scram) {
		this._allow_scram = oArg.allow_scram;
	} else {
		this._allow_scram = JSJAC_ALLOW_SCRAM;
	}

	if(oArg.xmllang && oArg.xmllang !== '') {
		this._xmllang = oArg.xmllang;
	} else {
		this._xmllang = 'en';
	}

	if(typeof WebSocket === 'undefined') {
		this._handleEvent('onerror', JSJaCError('503', 'cancel', 'service-unavailable'));
		return;
	}

	this._ws = new WebSocket(this._httpbase, 'xmpp');
	this._ws.onclose = JSJaC.bind(this._onclose, this);
	this._ws.onerror = JSJaC.bind(this._onerror, this);
	this._ws.onopen = JSJaC.bind(this._onopen, this);
};

/**
 * @private
 */
JSJaCWebSocketConnection.prototype._onopen = function() {
	var data = {
		usr: this.username,
		atk: this.pass,
		br: this.resource
	}; 
	if(this.appType){ //rongqb for esn 20170223
		data.appType = this.appType;
	}
	if(this.clientIdentify){ //rongqb for esn 20170223
		data.clientIdentify = this.clientIdentify;
	}
	this._buildAndSend(new JumpPacket(data, OPCODE.AUTH.SEND));
	this._ws.onmessage = JSJaC.bind(this._onAuthMessage, this);
};

/**
 * 认证返回的包
 */
JSJaCWebSocketConnection.prototype._onAuthMessage = function(event) {
	var wsConn = this;
	if(event.data instanceof Blob) {
		var blob = event.data;
		var reader = new FileReader();
		reader.onload = function(evt) {
			if(evt.target.readyState == FileReader.DONE) {
				var arr = new Uint8Array(evt.target.result);
				// TODO if error

				// else
				var packetLen = wsConn._bytesToInteger(arr.subarray(PACKET_STRUCT.PACKET_LEN.START, PACKET_STRUCT.PACKET_LEN.END));
				var opcodeArr = arr.subarray(PACKET_STRUCT.OPCODE.START, PACKET_STRUCT.OPCODE.END);
				var bodyArr = arr.subarray(PACKET_HEADER_SIZE, PACKET_HEADER_SIZE + packetLen);
				// AUTH packet
				if(wsConn._bytesToInteger(opcodeArr) == OPCODE.AUTH.RECV) {
					var body = JSON.parse(wsConn._uint8ArrayToString(bodyArr));
					YYIMChat.log('【recv】\tOPCODE.AUTH.KEY\n\t' + JSON.stringify(body), 3);
					if(body.code != 200) {
						wsConn._handleEvent(OPCODE.STREAM_ERROR.KEY, {
							code: 401,
							message: 'not-authorized'
						});
						return;
					}
					wsConn._handleEvent('packet_in', body);
					wsConn._handleEvent(OPCODE.AUTH.KEY, body);

					wsConn._connected = true;
					wsConn._handleEvent('onconnect');
					wsConn._ws.onmessage = JSJaC.bind(wsConn._onJumpMessage, wsConn);
				} else if(wsConn._bytesToInteger(opcodeArr) == OPCODE.STREAM_ERROR.RECV) {
					var body = JSON.parse(wsConn._uint8ArrayToString(bodyArr));
					YYIMChat.log('【recv】\tOPCODE.AUTH.KEY\n\t' + JSON.stringify(body), 3);
					if(body.code != 200) {
						wsConn._handleEvent(OPCODE.STREAM_ERROR.KEY, {
							code: 401,
							message: 'not-authorized'
						});
						return;
					}
				}
			}

		}
		reader.readAsArrayBuffer(blob);
	}
};

/**
 * 发送JUMP类型的报文
 * @param jumpPacket
 */
JSJaCWebSocketConnection.prototype.sendJumpPacket = function(jumpPacket, cb, arg) {

	if(!this.connected()) {
		return false;
	}

	if(!jumpPacket || !jumpPacket.opcode) {
		return false;
		throw new Error('packet and its opcode cannot be null when send a packet.');
	}

	// 只有Message或IQ才可以回调
	if(cb && this._validateCallbackable(jumpPacket)) {
		if(!jumpPacket.content)
			throw new Error('packet content cannot be null when send a Message or IQ packet.');

		if(!jumpPacket.content.id) {
			// gen id
			jumpPacket.content.id = this._IDPrefix + this._ID++;
		}

		// 根据id注册回调
		this._registerPID(jumpPacket, cb, arg);
	}

	if(jumpPacket instanceof JumpPacket)
		YYIMChat.log('【send】\t ' + OPCODE_MAP.SEND.get(jumpPacket.opcode) + "\n\t" + JSON.stringify(jumpPacket), 3, new Date());

	try {
		// may be print logs
		// this._handleEvent(jumpPacket.opcode + '_out', jumpPacket);
		this._handleEvent('packet_out', jumpPacket);
	} catch(e) {
		this.oDbg.log(e.toString(), 1);
		return false;
	}

	this._buildAndSend(jumpPacket);
	return true;
};

JSJaCWebSocketConnection.prototype._buildAndSend = function(jumpPacket) {
	var bodyArr = null;
	
	var isNoContent = Object.prototype.toString.call(jumpPacket.content).slice(8,-1) == 'Undefined' 
	|| Object.prototype.toString.call(jumpPacket.content).slice(8,-1) == 'Null';
	
	var blob = new Blob([(isNoContent? '':JSON.stringify(jumpPacket.content))], {
		type: 'text/json'
	});
	
	var reader = new FileReader();
	var wsConn = this;
	reader.onload = function(event) {
		if(event.target.readyState == FileReader.DONE) {
			// bodyArr = this._stringToBytes(JSON.stringify(jumpPacket.content));
			bodyArr = this.result;
			var headerArr = new Uint8Array(PACKET_HEADER_SIZE);
			headerArr.set(wsConn._numToBytes(jumpPacket.sFrame, PACKET_STRUCT.CONSOLE_FRAME.SIZE), PACKET_STRUCT.CONSOLE_FRAME.START);
			headerArr.set(wsConn._numToBytes(jumpPacket.opcode, PACKET_STRUCT.OPCODE.SIZE), PACKET_STRUCT.OPCODE.START);
			if(isNoContent) {
				headerArr.set(wsConn._numToBytes(0, PACKET_STRUCT.PACKET_LEN.SIZE), PACKET_STRUCT.PACKET_LEN.START);
			} else {
				headerArr.set(wsConn._numToBytes(bodyArr.byteLength, PACKET_STRUCT.PACKET_LEN.SIZE), PACKET_STRUCT.PACKET_LEN.START);
			}
			headerArr.set(wsConn._numToBytes(jumpPacket.version, PACKET_STRUCT.VERSION.SIZE), PACKET_STRUCT.VERSION.START);
			headerArr.set(wsConn._numToBytes(jumpPacket.seqId, PACKET_STRUCT.SEQ_ID.SIZE), PACKET_STRUCT.SEQ_ID.START);

			var sendArr;
			if(isNoContent) {
				sendArr = headerArr;
			} else {
				sendArr = wsConn._concatUint8Array(headerArr, new Uint8Array(bodyArr));
			}
			wsConn._ws.send(sendArr);
		}
	};
	reader.readAsArrayBuffer(blob);
};

/**
 * @private
 */
JSJaCWebSocketConnection.prototype._handleOpenStream = function(event) {
	var open, stream;

	this.oDbg.log(event.data, 4);

	open = event.data;
	// skip XML prolog if any
	open = open.substr(open.indexOf('<stream:stream'));
	if(open.substr(-2) !== '/>' && open.substr(-16) !== '</stream:stream>') {
		// some servers send closed opening tag, some not
		open += '</stream:stream>';
	}
	stream = this._parseXml(open);
	if(!stream) {
		this._handleEvent('onerror', JSJaCError('503', 'cancel', 'service-unavailable'));
		return;
	}

	// extract stream id used for non-SASL authentication
	this.streamid = stream.getAttribute('id');

	this.oDbg.log('got streamid: ' + this.streamid, 2);
	this._ws.onmessage = JSJaC.bind(this._handleInitialResponse, this);
};

/**
 * @private
 */
JSJaCWebSocketConnection.prototype._handleInitialResponse = function(event) {
	var doc = this._parseXml(event.data);
	if(!this._parseStreamFeatures(doc)) {
		this._handleEvent('onerror', JSJaCError('503', 'cancel', 'service-unavailable'));
		return;
	}

	this._connected = true;

	if(this.register) {
		this._doInBandReg();
	} else {
		this._doAuth();
	}
};

/**
 * Disconnect from XMPP service
 *
 * When called upon leaving a page needs to use 'onbeforeunload' event
 * as Websocket would be closed already otherwise prior to this call.
 */
JSJaCWebSocketConnection.prototype.disconnect = function() {
	this._setStatus('disconnecting');

	if(!this.connected()) {
		return;
	}
	
	this._connected = false;

	this.oDbg.log('Disconnecting', 4);

	this._cleanupWebSocket();

	this.oDbg.log('Disconnected', 2);
	
	this._handleEvent('ondisconnect');
};

/**
 * @private
 */
JSJaCWebSocketConnection.prototype._onclose = function() {
	this.oDbg.log('websocket closed', 2);
	if(this._status !== 'disconnecting') {
		this._connected = false;
		this._handleEvent('onerror', JSJaCError('503', 'cancel', 'service-unavailable'));
	}
};

/**
 * @private
 */
JSJaCWebSocketConnection.prototype._onerror = function() {
	this.oDbg.log('websocket error', 1);
	this._connected = false;
	this._handleEvent('onerror', JSJaCError('503', 'cancel', 'service-unavailable'));
};

JSJaCWebSocketConnection.prototype._onJumpMessage = function(event) {
	var wsConn = this;
	if(event.data instanceof Blob) {
		var blob = event.data;
		var reader = new FileReader();
		reader.onload = function(evt) {
			if(evt.target.readyState == FileReader.DONE) {
				// TODO if error ?
				// else
				var arr = new Uint8Array(evt.target.result);
				var packetLen = wsConn._bytesToInteger(arr.subarray(PACKET_STRUCT.PACKET_LEN.START, PACKET_STRUCT.PACKET_LEN.END));
				var opcodeArr = arr.subarray(PACKET_STRUCT.OPCODE.START, PACKET_STRUCT.OPCODE.END);
				var bodyArr = arr.subarray(PACKET_HEADER_SIZE, PACKET_HEADER_SIZE + packetLen);
				wsConn._parseUint8Array(opcodeArr, bodyArr);
			}

		}
		reader.readAsArrayBuffer(blob);
	}
};

/**
 * @private
 */
JSJaCWebSocketConnection.prototype._onmessage = function(event) {
	var wsConn = this;
	var stanza, node, packet;

	stanza = event.data;

	if(this._connected === true){
		this._setStatus('processing');
	}
	
	if(!stanza || stanza === '') {
		return;
	}

	// WebSocket works only on modern browsers, so it is safe to assume
	// that namespaceURI and getElementsByTagNameNS are available.
	node = this._parseXml(stanza);
	if(node.namespaceURI === NS_STREAM && node.localName === 'error') {
		if(node.getElementsByTagNameNS(NS_STREAMS, 'conflict').length > 0) {
			this._setStatus('session-terminate-conflict');
		}
		this._connected = false;
		this._handleEvent('onerror', JSJaCError('503', 'cancel',
			'remote-stream-error'));
		return;
	}

	packet = JSJaCPacket.wrapNode(node);
	if(!packet) {
		return;
	}

	this.oDbg.log('async recv: ' + event.data, 4);
	this._handleEvent('packet_in', packet);

	if(packet.pType && !this._handlePID(packet)) {
		this._handleEvent(packet.pType() + '_in', packet);
		this._handleEvent(packet.pType(), packet);
	}
};

/**
 * Parse single XML stanza. As proposed in XMPP Sub-protocol for WebSocket
 * draft, it assumes that every stanza is sent in a separate WebSocket frame,
 * which greatly simplifies parsing.
 * 
 * @private
 */
JSJaCWebSocketConnection.prototype._parseXml = function(s) {
	var doc;

	this.oDbg.log('Parsing: ' + s, 4);
	try {
		doc = XmlDocument.create('stream', NS_STREAM);
		if(s.trim() == '</stream:stream>') {
			// Consider session as closed
			this.oDbg.log("session terminated", 1);

			clearTimeout(this._timeout); // remove timer
			clearInterval(this._interval);
			clearInterval(this._inQto);

			try {
				JSJaCCookie.read(this._cookie_prefix + 'JSJaC_State').erase();
			} catch(e) {}

			this._connected = false;
			this._handleEvent('onerror', JSJaCError('503', 'cancel', 'session-terminate'));

			this.oDbg.log("Disconnected.", 1);
			this._handleEvent('ondisconnect');

			return null;
		} else if(s.indexOf('<stream:stream') === -1) {
			// Wrap every stanza into stream element, so that XML namespaces work properly.
			doc.loadXML("<stream:stream xmlns:stream='" + NS_STREAM + "' xmlns='jabber:client'>" + s + "</stream:stream>");
			if(typeof doc.documentElement.firstChild.xml == 'undefined')
				doc.documentElement.firstChild.xml = s;
			return doc.documentElement.firstChild;
		} else {
			doc.loadXML(s);
			return doc.documentElement;
		}
	} catch(e) {
		this.oDbg.log('Error: ' + e);
		this._connected = false;
		this._handleEvent('onerror', JSJaCError('500', 'wait', 'internal-service-error'));
	}

	return null;
};

/**
 * @private
 */
JSJaCWebSocketConnection.prototype._getInitialRequestString = function() {
	var streamto, reqstr;

	streamto = this.domain;
	if(this.authhost) {
		streamto = this.authhost;
	}

	reqstr = '<stream:stream to="' + streamto + '" xmlns="jabber:client" xmlns:stream="' + NS_STREAM + '"';
	if(this.authtype === 'sasl' || this.authtype === 'saslanon') {
		reqstr += ' version="1.0"';
	}
	reqstr += '>';
	return reqstr;
};

JSJaCWebSocketConnection.prototype.send = function(packet, cb, arg) {
	this._ws.onmessage = JSJaC.bind(this._onmessage, this);
	if(!packet || !packet.pType) {
		this.oDbg.log('no packet: ' + packet, 1);
		return false;
	}

	if(!this.connected()) {
		return false;
	}

	// remember id for response if callback present
	if(cb) {
		if(!packet.getID()) {
			packet.setID('JSJaCID_' + this._ID++); // generate an ID
		}

		// register callback with id
		this._registerPID(packet, cb, arg);
	}

	try {
		this._handleEvent(packet.pType() + '_out', packet);
		this._handleEvent('packet_out', packet);
		this._ws.send(packet.xml());
	} catch(e) {
		this.oDbg.log(e.toString(), 1);
		return false;
	}

	return true;
};

/**
 * Resuming connections is not supported by WebSocket.
 */
JSJaCWebSocketConnection.prototype.resume = function() {
	return false; // not supported for websockets
};

/**
 * Suspending connections is not supported by WebSocket.
 */
JSJaCWebSocketConnection.prototype.suspend = function() {
	return false; // not supported for websockets
};

/**
 * @private
 */
JSJaCWebSocketConnection.prototype._doSASLAuthScramSha1S1 = function(event) {
	var el = this._parseXml(event.data);
	return JSJaC.bind(JSJaCConnection.prototype._doSASLAuthScramSha1S1, this)(el);
};

/**
 * @private
 */
JSJaCWebSocketConnection.prototype._doSASLAuthScramSha1S2 = function(event) {
	var el = this._parseXml(event.data);
	return JSJaC.bind(JSJaCConnection.prototype._doSASLAuthScramSha1S2, this)(el);
};

/**
 * @private
 */
JSJaCWebSocketConnection.prototype._doSASLAuthDigestMd5S1 = function(event) {
	var el = this._parseXml(event.data);
	return JSJaC.bind(JSJaCConnection.prototype._doSASLAuthDigestMd5S1, this)(el);
};

/**
 * @private
 */
JSJaCWebSocketConnection.prototype._doSASLAuthDigestMd5S2 = function(event) {
	var el = this._parseXml(event.data);
	return JSJaC.bind(JSJaCConnection.prototype._doSASLAuthDigestMd5S2, this)(el);
};

/**
 * @private
 */
JSJaCWebSocketConnection.prototype._doSASLAuthDone = function(event) {
	var el = this._parseXml(event.data);
	return JSJaC.bind(JSJaCConnection.prototype._doSASLAuthDone, this)(el);
};

/**
 * @private
 */
JSJaCWebSocketConnection.prototype._reInitStream = function(cb) {
	var reqstr, streamto = this.domain;
	if(this.authhost) {
		streamto = this.authhost;
	}

	reqstr = '<stream:stream xmlns:stream="' + NS_STREAM + '" xmlns="jabber:client" to="' + streamto + '" version="1.0">';
	this._sendRaw(reqstr, cb);
};

/**
 * @private
 */
JSJaCWebSocketConnection.prototype._sendRaw = function(xml, cb, arg) {
	if(!this._ws) {
		// Socket might have been closed already because of an 'onerror'
		// event. In this case we'd try to send a closing stream element
		// 'ondisconnect' which won't work.
		return false;
	}
	if(cb) {
		this._ws.onmessage = JSJaC.bind(cb, this, arg);
	}
	this._ws.send(xml);
	return true;
};

/**
 * 解析Uint8Array为Jump Packet
 * 
 * @param opcodeArr
 * @param bodyArr
 */
JSJaCWebSocketConnection.prototype._parseUint8Array = function(opcodeArr, bodyArr) {
	if(this._connected === true){
		this._setStatus('processing');
	}
	if(opcodeArr && bodyArr) {
		var event = OPCODE_MAP.RECV.get(this._bytesToInteger(opcodeArr));
		YYIMChat.log('【recv】\t' + OPCODE_MAP.RECV.get(this._bytesToInteger(opcodeArr)) + '\n\t' + this._uint8ArrayToString(bodyArr), 3, new Date());
		// ping or auth
		if(bodyArr.byteLength == 0) {
			this._handleEvent('packet_in');
			this._handleEvent(event);
			return;
		}
		try {
			var body = JSON.parse(this._uint8ArrayToString(bodyArr));
			if(!this._handlePID(body)) {
				this._handleEvent('packet_in', body);
				this._handleEvent(event, body);
			}
		} catch(e) {}
	}
};
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/_babel-runtime@6.26.0@babel-runtime/core-js/json/stringify.js":
/*!************************************************************************************!*\
  !*** ./node_modules/_babel-runtime@6.26.0@babel-runtime/core-js/json/stringify.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = { \"default\": __webpack_require__(/*! core-js/library/fn/json/stringify */ \"./node_modules/_core-js@2.5.5@core-js/library/fn/json/stringify.js\"), __esModule: true };\n\n//# sourceURL=webpack:///./node_modules/_babel-runtime@6.26.0@babel-runtime/core-js/json/stringify.js?");

/***/ }),

/***/ "./node_modules/_babel-runtime@6.26.0@babel-runtime/core-js/object/define-property.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/_babel-runtime@6.26.0@babel-runtime/core-js/object/define-property.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = { \"default\": __webpack_require__(/*! core-js/library/fn/object/define-property */ \"./node_modules/_core-js@2.5.5@core-js/library/fn/object/define-property.js\"), __esModule: true };\n\n//# sourceURL=webpack:///./node_modules/_babel-runtime@6.26.0@babel-runtime/core-js/object/define-property.js?");

/***/ }),

/***/ "./node_modules/_babel-runtime@6.26.0@babel-runtime/helpers/classCallCheck.js":
/*!************************************************************************************!*\
  !*** ./node_modules/_babel-runtime@6.26.0@babel-runtime/helpers/classCallCheck.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\n\nexports.default = function (instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError(\"Cannot call a class as a function\");\n  }\n};\n\n//# sourceURL=webpack:///./node_modules/_babel-runtime@6.26.0@babel-runtime/helpers/classCallCheck.js?");

/***/ }),

/***/ "./node_modules/_babel-runtime@6.26.0@babel-runtime/helpers/createClass.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/_babel-runtime@6.26.0@babel-runtime/helpers/createClass.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\n\nvar _defineProperty = __webpack_require__(/*! ../core-js/object/define-property */ \"./node_modules/_babel-runtime@6.26.0@babel-runtime/core-js/object/define-property.js\");\n\nvar _defineProperty2 = _interopRequireDefault(_defineProperty);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = function () {\n  function defineProperties(target, props) {\n    for (var i = 0; i < props.length; i++) {\n      var descriptor = props[i];\n      descriptor.enumerable = descriptor.enumerable || false;\n      descriptor.configurable = true;\n      if (\"value\" in descriptor) descriptor.writable = true;\n      (0, _defineProperty2.default)(target, descriptor.key, descriptor);\n    }\n  }\n\n  return function (Constructor, protoProps, staticProps) {\n    if (protoProps) defineProperties(Constructor.prototype, protoProps);\n    if (staticProps) defineProperties(Constructor, staticProps);\n    return Constructor;\n  };\n}();\n\n//# sourceURL=webpack:///./node_modules/_babel-runtime@6.26.0@babel-runtime/helpers/createClass.js?");

/***/ }),

/***/ "./node_modules/_core-js@2.5.5@core-js/library/fn/json/stringify.js":
/*!**************************************************************************!*\
  !*** ./node_modules/_core-js@2.5.5@core-js/library/fn/json/stringify.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var core = __webpack_require__(/*! ../../modules/_core */ \"./node_modules/_core-js@2.5.5@core-js/library/modules/_core.js\");\nvar $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });\nmodule.exports = function stringify(it) { // eslint-disable-line no-unused-vars\n  return $JSON.stringify.apply($JSON, arguments);\n};\n\n\n//# sourceURL=webpack:///./node_modules/_core-js@2.5.5@core-js/library/fn/json/stringify.js?");

/***/ }),

/***/ "./node_modules/_core-js@2.5.5@core-js/library/fn/object/define-property.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/_core-js@2.5.5@core-js/library/fn/object/define-property.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ../../modules/es6.object.define-property */ \"./node_modules/_core-js@2.5.5@core-js/library/modules/es6.object.define-property.js\");\nvar $Object = __webpack_require__(/*! ../../modules/_core */ \"./node_modules/_core-js@2.5.5@core-js/library/modules/_core.js\").Object;\nmodule.exports = function defineProperty(it, key, desc) {\n  return $Object.defineProperty(it, key, desc);\n};\n\n\n//# sourceURL=webpack:///./node_modules/_core-js@2.5.5@core-js/library/fn/object/define-property.js?");

/***/ }),

/***/ "./node_modules/_core-js@2.5.5@core-js/library/modules/_a-function.js":
/*!****************************************************************************!*\
  !*** ./node_modules/_core-js@2.5.5@core-js/library/modules/_a-function.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (it) {\n  if (typeof it != 'function') throw TypeError(it + ' is not a function!');\n  return it;\n};\n\n\n//# sourceURL=webpack:///./node_modules/_core-js@2.5.5@core-js/library/modules/_a-function.js?");

/***/ }),

/***/ "./node_modules/_core-js@2.5.5@core-js/library/modules/_an-object.js":
/*!***************************************************************************!*\
  !*** ./node_modules/_core-js@2.5.5@core-js/library/modules/_an-object.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isObject = __webpack_require__(/*! ./_is-object */ \"./node_modules/_core-js@2.5.5@core-js/library/modules/_is-object.js\");\nmodule.exports = function (it) {\n  if (!isObject(it)) throw TypeError(it + ' is not an object!');\n  return it;\n};\n\n\n//# sourceURL=webpack:///./node_modules/_core-js@2.5.5@core-js/library/modules/_an-object.js?");

/***/ }),

/***/ "./node_modules/_core-js@2.5.5@core-js/library/modules/_core.js":
/*!**********************************************************************!*\
  !*** ./node_modules/_core-js@2.5.5@core-js/library/modules/_core.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var core = module.exports = { version: '2.5.5' };\nif (typeof __e == 'number') __e = core; // eslint-disable-line no-undef\n\n\n//# sourceURL=webpack:///./node_modules/_core-js@2.5.5@core-js/library/modules/_core.js?");

/***/ }),

/***/ "./node_modules/_core-js@2.5.5@core-js/library/modules/_ctx.js":
/*!*********************************************************************!*\
  !*** ./node_modules/_core-js@2.5.5@core-js/library/modules/_ctx.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// optional / simple context binding\nvar aFunction = __webpack_require__(/*! ./_a-function */ \"./node_modules/_core-js@2.5.5@core-js/library/modules/_a-function.js\");\nmodule.exports = function (fn, that, length) {\n  aFunction(fn);\n  if (that === undefined) return fn;\n  switch (length) {\n    case 1: return function (a) {\n      return fn.call(that, a);\n    };\n    case 2: return function (a, b) {\n      return fn.call(that, a, b);\n    };\n    case 3: return function (a, b, c) {\n      return fn.call(that, a, b, c);\n    };\n  }\n  return function (/* ...args */) {\n    return fn.apply(that, arguments);\n  };\n};\n\n\n//# sourceURL=webpack:///./node_modules/_core-js@2.5.5@core-js/library/modules/_ctx.js?");

/***/ }),

/***/ "./node_modules/_core-js@2.5.5@core-js/library/modules/_descriptors.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/_core-js@2.5.5@core-js/library/modules/_descriptors.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Thank's IE8 for his funny defineProperty\nmodule.exports = !__webpack_require__(/*! ./_fails */ \"./node_modules/_core-js@2.5.5@core-js/library/modules/_fails.js\")(function () {\n  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;\n});\n\n\n//# sourceURL=webpack:///./node_modules/_core-js@2.5.5@core-js/library/modules/_descriptors.js?");

/***/ }),

/***/ "./node_modules/_core-js@2.5.5@core-js/library/modules/_dom-create.js":
/*!****************************************************************************!*\
  !*** ./node_modules/_core-js@2.5.5@core-js/library/modules/_dom-create.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isObject = __webpack_require__(/*! ./_is-object */ \"./node_modules/_core-js@2.5.5@core-js/library/modules/_is-object.js\");\nvar document = __webpack_require__(/*! ./_global */ \"./node_modules/_core-js@2.5.5@core-js/library/modules/_global.js\").document;\n// typeof document.createElement is 'object' in old IE\nvar is = isObject(document) && isObject(document.createElement);\nmodule.exports = function (it) {\n  return is ? document.createElement(it) : {};\n};\n\n\n//# sourceURL=webpack:///./node_modules/_core-js@2.5.5@core-js/library/modules/_dom-create.js?");

/***/ }),

/***/ "./node_modules/_core-js@2.5.5@core-js/library/modules/_export.js":
/*!************************************************************************!*\
  !*** ./node_modules/_core-js@2.5.5@core-js/library/modules/_export.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ./_global */ \"./node_modules/_core-js@2.5.5@core-js/library/modules/_global.js\");\nvar core = __webpack_require__(/*! ./_core */ \"./node_modules/_core-js@2.5.5@core-js/library/modules/_core.js\");\nvar ctx = __webpack_require__(/*! ./_ctx */ \"./node_modules/_core-js@2.5.5@core-js/library/modules/_ctx.js\");\nvar hide = __webpack_require__(/*! ./_hide */ \"./node_modules/_core-js@2.5.5@core-js/library/modules/_hide.js\");\nvar has = __webpack_require__(/*! ./_has */ \"./node_modules/_core-js@2.5.5@core-js/library/modules/_has.js\");\nvar PROTOTYPE = 'prototype';\n\nvar $export = function (type, name, source) {\n  var IS_FORCED = type & $export.F;\n  var IS_GLOBAL = type & $export.G;\n  var IS_STATIC = type & $export.S;\n  var IS_PROTO = type & $export.P;\n  var IS_BIND = type & $export.B;\n  var IS_WRAP = type & $export.W;\n  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});\n  var expProto = exports[PROTOTYPE];\n  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];\n  var key, own, out;\n  if (IS_GLOBAL) source = name;\n  for (key in source) {\n    // contains in native\n    own = !IS_FORCED && target && target[key] !== undefined;\n    if (own && has(exports, key)) continue;\n    // export native or passed\n    out = own ? target[key] : source[key];\n    // prevent global pollution for namespaces\n    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]\n    // bind timers to global for call from export context\n    : IS_BIND && own ? ctx(out, global)\n    // wrap global constructors for prevent change them in library\n    : IS_WRAP && target[key] == out ? (function (C) {\n      var F = function (a, b, c) {\n        if (this instanceof C) {\n          switch (arguments.length) {\n            case 0: return new C();\n            case 1: return new C(a);\n            case 2: return new C(a, b);\n          } return new C(a, b, c);\n        } return C.apply(this, arguments);\n      };\n      F[PROTOTYPE] = C[PROTOTYPE];\n      return F;\n    // make static versions for prototype methods\n    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;\n    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%\n    if (IS_PROTO) {\n      (exports.virtual || (exports.virtual = {}))[key] = out;\n      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%\n      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);\n    }\n  }\n};\n// type bitmap\n$export.F = 1;   // forced\n$export.G = 2;   // global\n$export.S = 4;   // static\n$export.P = 8;   // proto\n$export.B = 16;  // bind\n$export.W = 32;  // wrap\n$export.U = 64;  // safe\n$export.R = 128; // real proto method for `library`\nmodule.exports = $export;\n\n\n//# sourceURL=webpack:///./node_modules/_core-js@2.5.5@core-js/library/modules/_export.js?");

/***/ }),

/***/ "./node_modules/_core-js@2.5.5@core-js/library/modules/_fails.js":
/*!***********************************************************************!*\
  !*** ./node_modules/_core-js@2.5.5@core-js/library/modules/_fails.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (exec) {\n  try {\n    return !!exec();\n  } catch (e) {\n    return true;\n  }\n};\n\n\n//# sourceURL=webpack:///./node_modules/_core-js@2.5.5@core-js/library/modules/_fails.js?");

/***/ }),

/***/ "./node_modules/_core-js@2.5.5@core-js/library/modules/_global.js":
/*!************************************************************************!*\
  !*** ./node_modules/_core-js@2.5.5@core-js/library/modules/_global.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028\nvar global = module.exports = typeof window != 'undefined' && window.Math == Math\n  ? window : typeof self != 'undefined' && self.Math == Math ? self\n  // eslint-disable-next-line no-new-func\n  : Function('return this')();\nif (typeof __g == 'number') __g = global; // eslint-disable-line no-undef\n\n\n//# sourceURL=webpack:///./node_modules/_core-js@2.5.5@core-js/library/modules/_global.js?");

/***/ }),

/***/ "./node_modules/_core-js@2.5.5@core-js/library/modules/_has.js":
/*!*********************************************************************!*\
  !*** ./node_modules/_core-js@2.5.5@core-js/library/modules/_has.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var hasOwnProperty = {}.hasOwnProperty;\nmodule.exports = function (it, key) {\n  return hasOwnProperty.call(it, key);\n};\n\n\n//# sourceURL=webpack:///./node_modules/_core-js@2.5.5@core-js/library/modules/_has.js?");

/***/ }),

/***/ "./node_modules/_core-js@2.5.5@core-js/library/modules/_hide.js":
/*!**********************************************************************!*\
  !*** ./node_modules/_core-js@2.5.5@core-js/library/modules/_hide.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var dP = __webpack_require__(/*! ./_object-dp */ \"./node_modules/_core-js@2.5.5@core-js/library/modules/_object-dp.js\");\nvar createDesc = __webpack_require__(/*! ./_property-desc */ \"./node_modules/_core-js@2.5.5@core-js/library/modules/_property-desc.js\");\nmodule.exports = __webpack_require__(/*! ./_descriptors */ \"./node_modules/_core-js@2.5.5@core-js/library/modules/_descriptors.js\") ? function (object, key, value) {\n  return dP.f(object, key, createDesc(1, value));\n} : function (object, key, value) {\n  object[key] = value;\n  return object;\n};\n\n\n//# sourceURL=webpack:///./node_modules/_core-js@2.5.5@core-js/library/modules/_hide.js?");

/***/ }),

/***/ "./node_modules/_core-js@2.5.5@core-js/library/modules/_ie8-dom-define.js":
/*!********************************************************************************!*\
  !*** ./node_modules/_core-js@2.5.5@core-js/library/modules/_ie8-dom-define.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = !__webpack_require__(/*! ./_descriptors */ \"./node_modules/_core-js@2.5.5@core-js/library/modules/_descriptors.js\") && !__webpack_require__(/*! ./_fails */ \"./node_modules/_core-js@2.5.5@core-js/library/modules/_fails.js\")(function () {\n  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ \"./node_modules/_core-js@2.5.5@core-js/library/modules/_dom-create.js\")('div'), 'a', { get: function () { return 7; } }).a != 7;\n});\n\n\n//# sourceURL=webpack:///./node_modules/_core-js@2.5.5@core-js/library/modules/_ie8-dom-define.js?");

/***/ }),

/***/ "./node_modules/_core-js@2.5.5@core-js/library/modules/_is-object.js":
/*!***************************************************************************!*\
  !*** ./node_modules/_core-js@2.5.5@core-js/library/modules/_is-object.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (it) {\n  return typeof it === 'object' ? it !== null : typeof it === 'function';\n};\n\n\n//# sourceURL=webpack:///./node_modules/_core-js@2.5.5@core-js/library/modules/_is-object.js?");

/***/ }),

/***/ "./node_modules/_core-js@2.5.5@core-js/library/modules/_object-dp.js":
/*!***************************************************************************!*\
  !*** ./node_modules/_core-js@2.5.5@core-js/library/modules/_object-dp.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var anObject = __webpack_require__(/*! ./_an-object */ \"./node_modules/_core-js@2.5.5@core-js/library/modules/_an-object.js\");\nvar IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ \"./node_modules/_core-js@2.5.5@core-js/library/modules/_ie8-dom-define.js\");\nvar toPrimitive = __webpack_require__(/*! ./_to-primitive */ \"./node_modules/_core-js@2.5.5@core-js/library/modules/_to-primitive.js\");\nvar dP = Object.defineProperty;\n\nexports.f = __webpack_require__(/*! ./_descriptors */ \"./node_modules/_core-js@2.5.5@core-js/library/modules/_descriptors.js\") ? Object.defineProperty : function defineProperty(O, P, Attributes) {\n  anObject(O);\n  P = toPrimitive(P, true);\n  anObject(Attributes);\n  if (IE8_DOM_DEFINE) try {\n    return dP(O, P, Attributes);\n  } catch (e) { /* empty */ }\n  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');\n  if ('value' in Attributes) O[P] = Attributes.value;\n  return O;\n};\n\n\n//# sourceURL=webpack:///./node_modules/_core-js@2.5.5@core-js/library/modules/_object-dp.js?");

/***/ }),

/***/ "./node_modules/_core-js@2.5.5@core-js/library/modules/_property-desc.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/_core-js@2.5.5@core-js/library/modules/_property-desc.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (bitmap, value) {\n  return {\n    enumerable: !(bitmap & 1),\n    configurable: !(bitmap & 2),\n    writable: !(bitmap & 4),\n    value: value\n  };\n};\n\n\n//# sourceURL=webpack:///./node_modules/_core-js@2.5.5@core-js/library/modules/_property-desc.js?");

/***/ }),

/***/ "./node_modules/_core-js@2.5.5@core-js/library/modules/_to-primitive.js":
/*!******************************************************************************!*\
  !*** ./node_modules/_core-js@2.5.5@core-js/library/modules/_to-primitive.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 7.1.1 ToPrimitive(input [, PreferredType])\nvar isObject = __webpack_require__(/*! ./_is-object */ \"./node_modules/_core-js@2.5.5@core-js/library/modules/_is-object.js\");\n// instead of the ES6 spec version, we didn't implement @@toPrimitive case\n// and the second argument - flag - preferred type is a string\nmodule.exports = function (it, S) {\n  if (!isObject(it)) return it;\n  var fn, val;\n  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;\n  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;\n  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;\n  throw TypeError(\"Can't convert object to primitive value\");\n};\n\n\n//# sourceURL=webpack:///./node_modules/_core-js@2.5.5@core-js/library/modules/_to-primitive.js?");

/***/ }),

/***/ "./node_modules/_core-js@2.5.5@core-js/library/modules/es6.object.define-property.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/_core-js@2.5.5@core-js/library/modules/es6.object.define-property.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var $export = __webpack_require__(/*! ./_export */ \"./node_modules/_core-js@2.5.5@core-js/library/modules/_export.js\");\n// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)\n$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ \"./node_modules/_core-js@2.5.5@core-js/library/modules/_descriptors.js\"), 'Object', { defineProperty: __webpack_require__(/*! ./_object-dp */ \"./node_modules/_core-js@2.5.5@core-js/library/modules/_object-dp.js\").f });\n\n\n//# sourceURL=webpack:///./node_modules/_core-js@2.5.5@core-js/library/modules/es6.object.define-property.js?");

/***/ }),

/***/ "./src/config/config.js":
/*!******************************!*\
  !*** ./src/config/config.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\njQuery.support.cors = true;\n\nvar YYIMConfiguration = {};\n\nvar ConfigSetting = function () {\n\n\tvar YY_IM_DOMAIN = 'im.yyuap.com';\n\tvar YY_IM_ADDRESS = 'stellar.yyuap.com';\n\tvar YY_IM_WSPORT = 5227;\n\tvar YY_IM_HTTPBIND_PORT = 7075;\n\tvar YY_IM_SERVLET_ADDRESS = 'http://im.yyuap.com/';\n\tvar YY_IM_CLIENT_MARK = 'web';\n\n\tvar TODO_SERVLET_ADDRESS = 'https://pubaccount.yonyoucloud.com/';\n\n\tvar init = function init(options) {\n\t\toptions = options || {};\n\n\t\tYY_IM_CLIENT_MARK = options.clientMark || YY_IM_CLIENT_MARK;\n\t\tYY_IM_ADDRESS = options.wsurl || YY_IM_ADDRESS;\n\t\tYY_IM_WSPORT = options.wsport || YY_IM_WSPORT;\n\t\tYY_IM_HTTPBIND_PORT = options.hbport || YY_IM_HTTPBIND_PORT;\n\t\tYY_IM_SERVLET_ADDRESS = options.servlet || YY_IM_SERVLET_ADDRESS;\n\n\t\tTODO_SERVLET_ADDRESS = options.todoServlet || TODO_SERVLET_ADDRESS;\n\n\t\tvar getBrowser = function getBrowser() {\n\t\t\tvar userAgent = navigator.userAgent.toLowerCase();\n\n\t\t\treturn {\n\t\t\t\tversion: (userAgent.match(/.+(?:rv|it|ra|ie)[\\/: ]([\\d.]+)/) || [])[1],\n\t\t\t\twebkit: /webkit/.test(userAgent),\n\t\t\t\topera: /opera/.test(userAgent),\n\t\t\t\tmsie: /msie/.test(userAgent) && !/opera/.test(userAgent),\n\t\t\t\tmozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent)\n\t\t\t};\n\t\t};\n\n\t\tvar isMsielt10 = function isMsielt10() {\n\t\t\tvar browser = getBrowser();\n\t\t\tif (browser.msie && window.parseInt(browser.version) < 10) {\n\t\t\t\treturn true;\n\t\t\t}\n\t\t\treturn false;\n\t\t};\n\n\t\tvar getClientMark = function getClientMark() {\n\t\t\treturn YY_IM_CLIENT_MARK;\n\t\t};\n\n\t\tif (isMsielt10()) {\n\t\t\tYY_IM_SERVLET_ADDRESS = YY_IM_SERVLET_ADDRESS.replace(/^https?:\\/\\//, window.location.protocol + '//');\n\t\t}\n\n\t\tif (/https/.test(window.location.protocol) || options.useHttps === true) {\n\t\t\tYY_IM_WSPORT = 5225;\n\t\t}\n\n\t\texports.YYIMConfiguration = YYIMConfiguration = {\n\t\t\tYY_IM_DOMAIN: YY_IM_DOMAIN,\n\n\t\t\tRESOURCE: YY_IM_CLIENT_MARK + '-v2.6',\n\n\t\t\tMULTI_TENANCY: {\n\t\t\t\tENABLE: true,\n\t\t\t\tETP_KEY: options.etp || 'etp',\n\t\t\t\tAPP_KEY: options.app || 'app',\n\t\t\t\tSEPARATOR: '.'\n\t\t\t},\n\n\t\t\tSENDINTERVAL: 30,\n\n\t\t\tGROUP: {\n\t\t\t\tMEMBERSLIMIT: 5 },\n\n\t\t\tBETCH_MAXLIMIT: {\n\t\t\t\tROSTER: 50,\n\t\t\t\tPUBACCOUNT: 50\n\t\t\t},\n\n\t\t\tINPUT_STATE: {\n\t\t\t\tINTERVAL: 2 * 1000\n\t\t\t},\n\n\t\t\tUPLOAD: {\n\t\t\t\tAUTO_SEND: true,\n\t\t\t\tMULTI_SELECTION: false,\n\t\t\t\tPREVENT_DUPLICATES: false,\n\t\t\t\tPREVIEW_SIZE: {\n\t\t\t\t\tWIDTH: 100,\n\t\t\t\t\tHEIGHT: 100\n\t\t\t\t},\n\t\t\t\tFLASH_SWF_URL: options.flash_swf_url || './Moxie.swf',\n\t\t\t\tSILVERLIGHT_XAP_URL: options.silverlight_xap_url || './Moxie.xap',\n\t\t\t\tMEDIATYPE: {\n\t\t\t\t\tIMAGE: 1,\n\t\t\t\t\tFILE: 2,\n\t\t\t\t\tDOC: 3\n\t\t\t\t},\n\t\t\t\tIMAGE_TYPES: /\\.(png|jpe?g|gif)$/i\n\t\t\t},\n\n\t\t\tTIMECORRECTION: {\n\t\t\t\tAUTOCORRECTION: true,\n\t\t\t\tTIMES: 3,\n\t\t\t\tRESIDUAL: 50,\n\t\t\t\tRESULT: 0,\n\t\t\t\tLOAD: false },\n\n\t\t\tMULTIPARTYCALL: {\n\t\t\t\tADDRESS: 'http://dudu.yonyoutelecom.cn/httpIntf/createConference.do',\n\t\t\t\tACCOUNT: '',\n\t\t\t\tKEY: '',\n\t\t\t\tPHONESMAXLENGTH: 200 },\n\n\t\t\tSERVLET: {\n\t\t\t\tREST_RESOURCE_SERVLET: YY_IM_SERVLET_ADDRESS + 'sysadmin/rest/resource/',\n\t\t\t\tREST_VERSION_SERVLET: YY_IM_SERVLET_ADDRESS + 'sysadmin/rest/version/',\n\t\t\t\tREST_USER_SERVLET: YY_IM_SERVLET_ADDRESS + 'sysadmin/rest/user/',\n\t\t\t\tREST_UPLOAD_SERVLET: YY_IM_SERVLET_ADDRESS + 'im_upload/rest/resource/',\n\t\t\t\tREST_DOWNLOAD_SERVLET: YY_IM_SERVLET_ADDRESS + 'im_download/rest/resource/',\n\t\t\t\tREST_TRANSFORM_SERVLET: YY_IM_SERVLET_ADDRESS + 'im_download/rest/transform/resource/',\n\t\t\t\tREST_SYSTEM_SERVLET: YY_IM_SERVLET_ADDRESS + 'sysadmin/rest/system/',\n\t\t\t\tREST_SYSTEM_CUSTOMER_USER: YY_IM_SERVLET_ADDRESS + 'sysadmin/rest/customer/user/',\n\n\t\t\t\tREST_TODO_USER: TODO_SERVLET_ADDRESS + 'todocenter/user/todo/'\n\t\t\t},\n\n\t\t\tSUPPORT: {\n\t\t\t\tisWebSocketSupport: function () {\n\t\t\t\t\twindow.WebSocket = window.WebSocket || window.MozWebSocket;\n\t\t\t\t\tif (window.WebSocket) {\n\t\t\t\t\t\treturn true;\n\t\t\t\t\t}\n\t\t\t\t\treturn false;\n\t\t\t\t}()\n\t\t\t},\n\n\t\t\tCONNECTION: {\n\t\t\t\tTIMERVAL: 2000,\n\t\t\t\tWAIT: 300,\n\t\t\t\tSECURE: false,\n\t\t\t\tALLOW_PLAIN: true,\n\t\t\t\tENABLE_WEBSOCKET: true,\n\t\t\t\tENABLE_LOCAL_CONNECTION: true,\n\t\t\t\tUSE_HTTPS: function () {\n\t\t\t\t\tif (/https/.test(window.location.protocol) || options.useHttps === true) {\n\t\t\t\t\t\treturn true;\n\t\t\t\t\t}\n\t\t\t\t\treturn false;\n\t\t\t\t}(),\n\t\t\t\tSERVER_NAME: YY_IM_DOMAIN,\n\t\t\t\tHTTP_BASE: YY_IM_ADDRESS,\n\t\t\t\tHTTP_BIND_PORT: YY_IM_HTTPBIND_PORT,\n\t\t\t\tWS_PORT: YY_IM_WSPORT\n\t\t\t},\n\n\t\t\tPING: {\n\t\t\t\tINTERVAL: 10 * 1000,\n\n\t\t\t\tSLOW_INTERVAL: 30 * 1000,\n\n\t\t\t\tTIMEOUT: 10 * 1000\n\t\t\t},\n\n\t\t\tDOMAIN: {\n\t\t\t\tCHATROOM: 'conference.' + YY_IM_DOMAIN,\n\t\t\t\tSEARCH: 'search.' + YY_IM_DOMAIN,\n\t\t\t\tPUBACCOUNT: 'pubaccount.' + YY_IM_DOMAIN\n\t\t\t},\n\n\t\t\tEXPIRATION: {\n\t\t\t\tINVALID: 6 * 60 * 60 * 1000,\n\t\t\t\tINSPECTION_INTERVAL: 30 * 60 * 1000 },\n\n\t\t\tLOG: {\n\t\t\t\tENABLE: !!options.logEnable,\n\t\t\t\tFILTER_LEVEL: 3\n\t\t\t},\n\n\t\t\tBROWSER: getBrowser()\n\t\t};\n\n\t\tYYIMConfiguration.getHttpBindUrl = function () {\n\t\t\tvar prefix = YYIMConfiguration.CONNECTION.USE_HTTPS ? 'https://' : 'http://';\n\t\t\treturn prefix + YYIMConfiguration.CONNECTION.HTTP_BASE + ':' + YYIMConfiguration.CONNECTION.HTTP_BIND_PORT + '/http-bind/';\n\t\t};\n\n\t\tYYIMConfiguration.getWebSocketUrl = function () {\n\t\t\tvar prefix = YYIMConfiguration.CONNECTION.USE_HTTPS ? 'wss://' : 'ws://';\n\t\t\treturn prefix + YYIMConfiguration.CONNECTION.HTTP_BASE + ':' + YYIMConfiguration.CONNECTION.WS_PORT;\n\t\t};\n\n\t\tYYIMConfiguration.useWebSocket = function () {\n\t\t\treturn YYIMConfiguration.SUPPORT.isWebSocketSupport && YYIMConfiguration.CONNECTION.ENABLE_WEBSOCKET;\n\t\t};\n\n\t\tYYIMConfiguration.getConnectionArgObj = function () {\n\t\t\treturn {\n\t\t\t\tdomain: YYIMConfiguration.CONNECTION.SERVER_NAME,\n\t\t\t\tresource: YYIMConfiguration.RESOURCE,\n\t\t\t\tallow_plain: YYIMConfiguration.CONNECTION.ALLOW_PLAIN,\n\t\t\t\tsecure: YYIMConfiguration.CONNECTION.SECURE,\n\t\t\t\tregister: false\n\t\t\t};\n\t\t};\n\n\t\tYYIMConfiguration.getLocationOrigin = function () {\n\t\t\treturn window.location.origin ? window.location.origin : window.location.protocol + '//' + window.location.host;\n\t\t};\n\n\t\tYYIMConfiguration.getClientMark = getClientMark;\n\t};\n\n\treturn { init: init };\n}();\n\nConfigSetting.init();\n\nexports.YYIMConfiguration = YYIMConfiguration;\nexports.ConfigSetting = ConfigSetting;\n\n//# sourceURL=webpack:///./src/config/config.js?");

/***/ }),

/***/ "./src/config/constant.js":
/*!********************************!*\
  !*** ./src/config/constant.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nvar CONNECT_STATUS = exports.CONNECT_STATUS = {\n\tINIT: 'init',\n\tOFFLINE: 'offline',\n\tCONNECTING: 'connecting',\n\tPROCESSING: 'processing',\n\tCONFLICT: 'conflict',\n\tCONNECTED: 'connected',\n\tERROR: 'error',\n\tAUTHERROR: 'AuthError',\n\tONCLIENTKICKOUT: 'onClientKickout',\n\tONUPDATEPASSWORD: 'onUpdatePassword'\n};\n\nvar FAVORITE_TYPE = exports.FAVORITE_TYPE = {\n\tFAVORITE: 'favorite',\n\tREMOVE: 'remove',\n\tNONE: 'none'\n};\n\nvar STATUS = exports.STATUS = {\n\tCHAT: 'chat',\n\tAWAY: 'away',\n\tXA: 'xa',\n\tDND: 'dnd',\n\tUNAVAILABLE: 'unavailable' };\n\nvar TYPE = exports.TYPE = {\n\tSET: 'set',\n\tRESULT: 'result',\n\tGET: 'get',\n\tSUBMIT: 'submit',\n\tUNAVAILABLE: 'unavailable'\n};\n\nvar PRESENCE_TYPE = exports.PRESENCE_TYPE = {\n\tSUBSCRIBE: 'subscribe',\n\tUNSUBSCRIBE: 'unsubscribe',\n\tSUBSCRIBED: 'subscribed',\n\tUNSUBSCRIBED: 'unsubscribed',\n\tPROBE: 'probe',\n\tUNAVAILABLE: 'unavailable',\n\tCOLLECT: 'collect' };\n\nvar COLLECT_TYPE = exports.COLLECT_TYPE = {\n\tADD: 'add',\n\tREMOVE: 'remove'\n};\n\nvar CHAT_TYPE = exports.CHAT_TYPE = {\n\tCHAT: 'chat',\n\tGROUP_CHAT: 'groupchat',\n\tPUB_ACCOUNT: 'pubaccount'\n};\n\nvar MESSAGE_CONTENT_TYPE = exports.MESSAGE_CONTENT_TYPE = {\n\tTEXT: 2,\n\tFILE: 4,\n\tIMAGE: 8,\n\tREDPACKET: 9,\n\tSMALLVIDEO: 10,\n\tREVOCATION: 13,\n\tMERGEFORWARD: 15,\n\tSINGLEGRAPHIC: 16,\n\tMOREGRAPHIC: 32,\n\tAUDO: 64,\n\tLOCATION: 128,\n\tSHARE: 256,\n\tWHITEBOARD: 1024\n};\n\n//# sourceURL=webpack:///./src/config/constant.js?");

/***/ }),

/***/ "./src/connection/YYIMConnectDaemon.js":
/*!*********************************************!*\
  !*** ./src/connection/YYIMConnectDaemon.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.YYIMConnectDaemon = undefined;\n\nvar _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ \"./node_modules/_babel-runtime@6.26.0@babel-runtime/helpers/classCallCheck.js\");\n\nvar _classCallCheck3 = _interopRequireDefault(_classCallCheck2);\n\nvar _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ \"./node_modules/_babel-runtime@6.26.0@babel-runtime/helpers/createClass.js\");\n\nvar _createClass3 = _interopRequireDefault(_createClass2);\n\nvar _config = __webpack_require__(/*! ../config/config */ \"./src/config/config.js\");\n\nvar _YYIMConnection = __webpack_require__(/*! ./YYIMConnection */ \"./src/connection/YYIMConnection.js\");\n\nvar _manager = __webpack_require__(/*! ../core/manager */ \"./src/core/manager.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar YYIMConnectDaemon = function () {\n\tfunction YYIMConnectDaemon() {\n\t\t(0, _classCallCheck3.default)(this, YYIMConnectDaemon);\n\n\t\tthis.lastPongTime = Date.now();\n\n\t\tthis.pingInterval;\n\n\t\tthis.pingTimeout;\n\n\t\tthis.interval = 0;\n\t}\n\n\t(0, _createClass3.default)(YYIMConnectDaemon, [{\n\t\tkey: 'startPing',\n\t\tvalue: function startPing(isOnline) {\n\t\t\tif (isOnline === true) {\n\t\t\t\tthis.isOnline = isOnline;\n\t\t\t}\n\t\t\tif (_YYIMConnection.YYIMConnection.getInstance().connected()) {\n\t\t\t\tthis.interval = !this.interval ? _config.YYIMConfiguration.PING.SLOW_INTERVAL : _config.YYIMConfiguration.PING.INTERVAL;\n\t\t\t\tthis.ping();\n\t\t\t} else {\n\t\t\t\tthis.stopPing();\n\t\t\t}\n\t\t}\n\t}, {\n\t\tkey: 'stopPing',\n\t\tvalue: function stopPing(isOnline) {\n\t\t\tif (isOnline === false) {\n\t\t\t\tthis.isOnline = isOnline;\n\t\t\t}\n\n\t\t\tclearTimeout(this.pingTimeout);\n\t\t\tclearTimeout(this.pingInterval);\n\t\t}\n\t}, {\n\t\tkey: 'ping',\n\t\tvalue: function ping() {\n\t\t\tif (!this.isOnline) {\n\t\t\t\tthis.stopPing();\n\t\t\t} else {\n\t\t\t\tif (!this.sending) {\n\t\t\t\t\tthis.stopPing();\n\t\t\t\t\tthis.interval = this.interval || _config.YYIMConfiguration.PING.SLOW_INTERVAL;\n\n\t\t\t\t\tvar duration = Date.now() - (this.lastPongTime + this.interval);\n\t\t\t\t\tif (duration >= 0) {\n\t\t\t\t\t\ttry {\n\t\t\t\t\t\t\tthis.sending = true;\n\t\t\t\t\t\t\tthis.interval = _config.YYIMConfiguration.PING.SLOW_INTERVAL;\n\t\t\t\t\t\t\t_YYIMConnection.YYIMConnection.getInstance().send(new JumpPacket(null, OPCODE.PING.SEND));\n\t\t\t\t\t\t} catch (e) {\n\t\t\t\t\t\t\tthis.stopPing();\n\t\t\t\t\t\t\t_manager.YYIMManager.getInstance().log(\"Ping_Error.\", 0, e);\n\t\t\t\t\t\t\t_manager.YYIMManager.getInstance().onConnectError({\n\t\t\t\t\t\t\t\terrorCode: 408,\n\t\t\t\t\t\t\t\tmessage: '连接失败'\n\t\t\t\t\t\t\t});\n\t\t\t\t\t\t}\n\t\t\t\t\t} else {\n\t\t\t\t\t\tthis.pingInterval = setTimeout(this.ping.bind(this), -duration);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}, {\n\t\tkey: 'pong',\n\t\tvalue: function pong() {\n\t\t\tthis.lastPongTime = Date.now();\n\t\t\tif (!this.isOnline) {\n\t\t\t\tthis.stopPing();\n\t\t\t} else {\n\t\t\t\t_manager.YYIMManager.getInstance().log('【pong】\\t' + new Date(this.lastPongTime), 3, this.lastPongTime);\n\t\t\t\tthis.sending = false;\n\t\t\t\tthis.ping();\n\t\t\t}\n\t\t}\n\t}, {\n\t\tkey: 'setTimeout',\n\t\tvalue: function (_setTimeout) {\n\t\t\tfunction setTimeout() {\n\t\t\t\treturn _setTimeout.apply(this, arguments);\n\t\t\t}\n\n\t\t\tsetTimeout.toString = function () {\n\t\t\t\treturn _setTimeout.toString();\n\t\t\t};\n\n\t\t\treturn setTimeout;\n\t\t}(function () {\n\t\t\tif (!this.isOnline) {\n\t\t\t\tthis.stopPing();\n\t\t\t} else {\n\t\t\t\tvar now = Date.now();\n\t\t\t\t_manager.YYIMManager.getInstance().log('【setPingTimeout】\\t' + new Date(now), 3, now);\n\t\t\t\tclearTimeout(this.pingTimeout);\n\t\t\t\tthis.pingTimeout = setTimeout(this.timeoutHandler.bind(this), _config.YYIMConfiguration.PING.TIMEOUT);\n\t\t\t}\n\t\t})\n\t}, {\n\t\tkey: 'timeoutHandler',\n\t\tvalue: function timeoutHandler() {\n\t\t\tthis.sending = false;\n\t\t\tthis.stopPing();\n\t\t\t_manager.YYIMManager.getInstance().log(\"Ping_Timeout.\", 0);\n\t\t\t_manager.YYIMManager.getInstance().onConnectError({\n\t\t\t\terrorCode: 408,\n\t\t\t\tmessage: '连接失败'\n\t\t\t});\n\t\t}\n\t}]);\n\treturn YYIMConnectDaemon;\n}();\n\nexports.YYIMConnectDaemon = YYIMConnectDaemon;\n\n//# sourceURL=webpack:///./src/connection/YYIMConnectDaemon.js?");

/***/ }),

/***/ "./src/connection/YYIMConnectEventHandler.js":
/*!***************************************************!*\
  !*** ./src/connection/YYIMConnectEventHandler.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.YYIMConnectEventHandler = undefined;\n\nvar _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ \"./node_modules/_babel-runtime@6.26.0@babel-runtime/helpers/classCallCheck.js\");\n\nvar _classCallCheck3 = _interopRequireDefault(_classCallCheck2);\n\nvar _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ \"./node_modules/_babel-runtime@6.26.0@babel-runtime/helpers/createClass.js\");\n\nvar _createClass3 = _interopRequireDefault(_createClass2);\n\nvar _manager = __webpack_require__(/*! ../core/manager */ \"./src/core/manager.js\");\n\nvar _YYIMConnection = __webpack_require__(/*! ./YYIMConnection */ \"./src/connection/YYIMConnection.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar YYIMConnectEventHandler = function () {\n\tfunction YYIMConnectEventHandler() {\n\t\t(0, _classCallCheck3.default)(this, YYIMConnectEventHandler);\n\n\t\tthis._inited = false;\n\t}\n\n\t(0, _createClass3.default)(YYIMConnectEventHandler, [{\n\t\tkey: '_init',\n\t\tvalue: function _init() {\n\t\t\t_manager.YYIMManager.getInstance().log(\"YYIMConnectEventHandler.prototype.registerHandler\", 3);\n\t\t\tif (this._inited) {\n\t\t\t\treturn;\n\t\t\t}\n\t\t\tvar conn = _YYIMConnection.YYIMConnection.getInstance();\n\t\t\tconn.registerHandler('onConnect', this.onConnected);\n\t\t\tconn.registerHandler('onError', this.onConnectError);\n\t\t\tconn.registerHandler('onDisconnect', this.onDisConnect);\n\t\t\tconn.registerHandler(\"onStatusChanged\", this.connectStatusChangeHandler);\n\n\t\t\tconn.registerHandler(OPCODE.STREAM_ERROR.KEY, this.onStreamError);\n\t\t\tconn.registerHandler(OPCODE.PACKET_ERROR.KEY, this.onPacketError);\n\n\t\t\tconn.registerHandler(\"packet_in\", conn.getDaemon().pong.bind(conn.getDaemon()));\n\n\t\t\tthis._inited = true;\n\t\t}\n\t}, {\n\t\tkey: 'onConnected',\n\t\tvalue: function onConnected() {\n\t\t\t_manager.YYIMManager.getInstance().onOpened();\n\t\t\t_YYIMConnection.YYIMConnection.getInstance().getDaemon().startPing(true);\n\t\t}\n\t}, {\n\t\tkey: 'onConnectError',\n\t\tvalue: function onConnectError(e) {\n\t\t\t_manager.YYIMManager.getInstance().log(\"YYIMConnectEventHandler.prototype.onConnectError \", 0, e);\n\t\t\tvar errorCode = e.getAttribute(\"code\");\n\t\t\t_YYIMConnection.YYIMConnection.getInstance().getDaemon().stopPing(false);\n\t\t\tif (errorCode == 401) {\n\t\t\t\t_manager.YYIMManager.getInstance().onAuthError({\n\t\t\t\t\terrorCode: 401,\n\t\t\t\t\tmessage: '用户名或密码错误'\n\t\t\t\t});\n\t\t\t} else if (errorCode == 409) {\n\t\t\t\t_manager.YYIMManager.getInstance().onConflicted({\n\t\t\t\t\terrorCode: 409,\n\t\t\t\t\tmessage: '连接冲突'\n\t\t\t\t});\n\t\t\t} else if (errorCode == 4010) {\n\t\t\t\t_manager.YYIMManager.getInstance().onClientKickout({\n\t\t\t\t\terrorCode: 4010,\n\t\t\t\t\tmessage: '被客户端踢掉'\n\t\t\t\t});\n\t\t\t} else if (errorCode == 4011) {\n\t\t\t\t_manager.YYIMManager.getInstance().onUpdatePassword({\n\t\t\t\t\terrorCode: 4011,\n\t\t\t\t\tmessage: '修改密码'\n\t\t\t\t});\n\t\t\t} else {\n\t\t\t\t_manager.YYIMManager.getInstance().onConnectError({\n\t\t\t\t\terrorCode: errorCode,\n\t\t\t\t\tmessage: '连接失败'\n\t\t\t\t});\n\t\t\t}\n\t\t}\n\t}, {\n\t\tkey: 'onStreamError',\n\t\tvalue: function onStreamError(packet) {\n\t\t\t_manager.YYIMManager.getInstance().log(\"YYIMConnectEventHandler.prototype.onPacketError \", 0, packet);\n\t\t\t_YYIMConnection.YYIMConnection.getInstance().getDaemon().stopPing(false);\n\t\t\tvar errorCode = packet.code;\n\t\t\tif (errorCode == 401) {\n\t\t\t\t_manager.YYIMManager.getInstance().onAuthError({\n\t\t\t\t\terrorCode: 401,\n\t\t\t\t\tmessage: '用户名或密码错误'\n\t\t\t\t});\n\t\t\t} else if (errorCode == 409) {\n\t\t\t\t_manager.YYIMManager.getInstance().onConflicted({\n\t\t\t\t\terrorCode: 409,\n\t\t\t\t\tmessage: '连接冲突'\n\t\t\t\t});\n\t\t\t} else if (errorCode == 4010) {\n\t\t\t\t_manager.YYIMManager.getInstance().onClientKickout({\n\t\t\t\t\terrorCode: 4010,\n\t\t\t\t\tmessage: '被客户端踢掉'\n\t\t\t\t});\n\t\t\t} else if (errorCode == 4011) {\n\t\t\t\t_manager.YYIMManager.getInstance().onUpdatePassword({\n\t\t\t\t\terrorCode: 4011,\n\t\t\t\t\tmessage: '修改密码'\n\t\t\t\t});\n\t\t\t} else {\n\t\t\t\t_manager.YYIMManager.getInstance().onConnectError({\n\t\t\t\t\terrorCode: errorCode,\n\t\t\t\t\tmessage: '连接失败'\n\t\t\t\t});\n\t\t\t}\n\t\t}\n\t}, {\n\t\tkey: 'onPacketError',\n\t\tvalue: function onPacketError(packet) {\n\t\t\t_manager.YYIMManager.getInstance().log(\"YYIMConnectEventHandler.prototype.onPacketError \", 0, packet);\n\t\t}\n\t}, {\n\t\tkey: 'onDisConnect',\n\t\tvalue: function onDisConnect() {\n\t\t\t_manager.YYIMManager.getInstance().onClosed();\n\t\t\t_YYIMConnection.YYIMConnection.getInstance().getDaemon().stopPing(false);\n\t\t}\n\t}, {\n\t\tkey: 'connectStatusChangeHandler',\n\t\tvalue: function connectStatusChangeHandler(status) {\n\t\t\t_manager.YYIMManager.getInstance().onStatusChanged(status);\n\t\t}\n\t}]);\n\treturn YYIMConnectEventHandler;\n}();\n\nexports.YYIMConnectEventHandler = YYIMConnectEventHandler;\n\n//# sourceURL=webpack:///./src/connection/YYIMConnectEventHandler.js?");

/***/ }),

/***/ "./src/connection/YYIMConnection.js":
/*!******************************************!*\
  !*** ./src/connection/YYIMConnection.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.YYIMConnection = undefined;\n\nvar _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ \"./node_modules/_babel-runtime@6.26.0@babel-runtime/helpers/classCallCheck.js\");\n\nvar _classCallCheck3 = _interopRequireDefault(_classCallCheck2);\n\nvar _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ \"./node_modules/_babel-runtime@6.26.0@babel-runtime/helpers/createClass.js\");\n\nvar _createClass3 = _interopRequireDefault(_createClass2);\n\nvar _config = __webpack_require__(/*! ../config/config */ \"./src/config/config.js\");\n\nvar _YYIMJIDUtil = __webpack_require__(/*! ../util/YYIMJIDUtil */ \"./src/util/YYIMJIDUtil.js\");\n\nvar _manager = __webpack_require__(/*! ../core/manager */ \"./src/core/manager.js\");\n\nvar _YYIMConnectDaemon = __webpack_require__(/*! ./YYIMConnectDaemon */ \"./src/connection/YYIMConnectDaemon.js\");\n\nvar _YYIMConnectEventHandler = __webpack_require__(/*! ./YYIMConnectEventHandler */ \"./src/connection/YYIMConnectEventHandler.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar YYIMConnection = function () {\n\tfunction YYIMConnection() {\n\t\t(0, _classCallCheck3.default)(this, YYIMConnection);\n\n\t\tthis.daemon = new _YYIMConnectDaemon.YYIMConnectDaemon();\n\t\tthis.eventHandler = new _YYIMConnectEventHandler.YYIMConnectEventHandler();\n\t\tthis.connection = this.getConnection();\n\t\tthis.connectArg;\n\t\tthis.waitingList = [];\n\t\tthis.sending = false;\n\t\tthis.lastSendTime = 0;\n\t}\n\n\t(0, _createClass3.default)(YYIMConnection, [{\n\t\tkey: 'getDaemon',\n\t\tvalue: function getDaemon() {\n\t\t\treturn this.daemon;\n\t\t}\n\t}, {\n\t\tkey: '_init',\n\t\tvalue: function _init() {\n\t\t\t_manager.YYIMManager.getInstance().exeBackhander('monitor');\n\t\t\tthis.eventHandler._init();\n\t\t\tthis.registerHandler(OPCODE.AUTH.KEY, function (userBindPacket) {\n\t\t\t\tvar jid = new JSJaCJID(userBindPacket.jid),\n\t\t\t\t    id = _YYIMJIDUtil.YYIMJIDUtil.getID(userBindPacket.jid);\n\n\t\t\t\t_manager.YYIMManager.getInstance()._user = {\n\t\t\t\t\tjid: jid,\n\t\t\t\t\tname: id\n\t\t\t\t};\n\t\t\t\t_manager.YYIMManager.getInstance().onUserBind(id, jid.getResource());\n\t\t\t});\n\t\t}\n\t}, {\n\t\tkey: 'registerHandler',\n\t\tvalue: function registerHandler(event, ns, type, handler) {\n\t\t\tif (this.connection) {\n\t\t\t\tthis.connection.registerHandler.apply(this.connection, arguments);\n\t\t\t\treturn;\n\t\t\t}\n\t\t\tthrow \"connection is undefined!\";\n\t\t}\n\t}, {\n\t\tkey: 'connected',\n\t\tvalue: function connected() {\n\t\t\tif (this.connection && this.connection.connected()) {\n\t\t\t\treturn true;\n\t\t\t}\n\t\t\treturn false;\n\t\t}\n\t}, {\n\t\tkey: 'getConnection',\n\t\tvalue: function getConnection() {\n\t\t\tif (!this.connection) {\n\t\t\t\tif (_config.YYIMConfiguration.useWebSocket()) {\n\t\t\t\t\tthis.connection = new JSJaCWebSocketConnection({\n\t\t\t\t\t\thttpbase: _config.YYIMConfiguration.getWebSocketUrl()\n\t\t\t\t\t});\n\t\t\t\t} else {\n\t\t\t\t\tthis.connection = new JSJaCHttpBindingConnection({\n\t\t\t\t\t\thttpbase: _config.YYIMConfiguration.getHttpBindUrl(),\n\t\t\t\t\t\ttimerval: _config.YYIMConfiguration.CONNECTION.TIMERVAL,\n\t\t\t\t\t\twait: _config.YYIMConfiguration.CONNECTION.WAIT\n\t\t\t\t\t});\n\t\t\t\t}\n\t\t\t}\n\n\t\t\treturn this.connection;\n\t\t}\n\t}, {\n\t\tkey: 'connect',\n\t\tvalue: function connect(options) {\n\t\t\toptions = options || {};\n\t\t\tif (!this.connectArg) {\n\t\t\t\tthis.connectArg = _config.YYIMConfiguration.getConnectionArgObj();\n\t\t\t}\n\t\t\tif (options.username) {\n\t\t\t\tthis.connectArg.username = options.username;\n\t\t\t}\n\t\t\tif (options.token) {\n\t\t\t\tthis.connectArg.password = options.token;\n\t\t\t}\n\t\t\tif (options.appType) {\n\t\t\t\tthis.connectArg.appType = options.appType;\n\t\t\t}\n\t\t\tif (options.identify) {\n\t\t\t\tthis.connectArg.clientIdentify = options.identify;\n\t\t\t}\n\t\t\t_manager.YYIMManager.getInstance()._user = {\n\t\t\t\tjid: new JSJaCJID(this.connectArg.username + '@' + _config.YYIMConfiguration.YY_IM_DOMAIN + '/' + this.connectArg.resource),\n\t\t\t\tname: this.connectArg.username\n\t\t\t};\n\t\t\tthis.connection.connect(this.connectArg);\n\t\t}\n\t}, {\n\t\tkey: 'disconnect',\n\t\tvalue: function disconnect() {\n\t\t\tthis.daemon.stopPing(false);\n\t\t\tif (this.connection) {\n\t\t\t\tthis.connection.disconnect();\n\t\t\t}\n\t\t}\n\t}, {\n\t\tkey: 'send',\n\t\tvalue: function send(packet, callback, data, callbackContext) {\n\t\t\tthis.waitingList.push({\n\t\t\t\tpacket: packet,\n\t\t\t\tcallback: callback,\n\t\t\t\tdata: data,\n\t\t\t\tcallbackContext: callbackContext\n\t\t\t});\n\t\t\tif (!this.sending) {\n\t\t\t\tthis.sendInterval();\n\t\t\t}\n\t\t}\n\t}, {\n\t\tkey: 'sendInterval',\n\t\tvalue: function sendInterval() {\n\t\t\tvar _this = this;\n\n\t\t\tif (this.waitingList.length) {\n\t\t\t\tthis.sending = true;\n\t\t\t\tvar timespan = new Date().getTime() - this.lastSendTime;\n\n\t\t\t\tif (timespan >= _config.YYIMConfiguration.SENDINTERVAL) {\n\t\t\t\t\tvar data = this.waitingList.shift();\n\t\t\t\t\tthis.sendJumpPacket(data);\n\n\t\t\t\t\tif (data.packet && data.packet.opcode != OPCODE.PING.SEND) {\n\t\t\t\t\t\tthis.getDaemon().startPing();\n\t\t\t\t\t}\n\n\t\t\t\t\tif (data.packet && data.packet.opcode == OPCODE.PING.SEND) {\n\t\t\t\t\t\tthis.getDaemon().setTimeout();\n\t\t\t\t\t}\n\n\t\t\t\t\tthis.lastSendTime = new Date().getTime();\n\t\t\t\t\tthis.sendInterval();\n\t\t\t\t} else {\n\t\t\t\t\tsetTimeout(function () {\n\t\t\t\t\t\t_this.sendInterval();\n\t\t\t\t\t}, _config.YYIMConfiguration.SENDINTERVAL - timespan);\n\t\t\t\t}\n\t\t\t} else {\n\t\t\t\tthis.sending = false;\n\t\t\t}\n\t\t}\n\t}, {\n\t\tkey: 'sendJumpPacket',\n\t\tvalue: function sendJumpPacket(arg) {\n\t\t\tif (arg) {\n\t\t\t\tif (arg.callbackContext) {\n\t\t\t\t\treturn this.connection.sendJumpPacket(arg.packet, arg.callback.bind(arg.callbackContext), arg.data);\n\t\t\t\t}\n\t\t\t\treturn this.connection.sendJumpPacket(arg.packet, arg.callback, arg.data);\n\t\t\t}\n\t\t}\n\t}]);\n\treturn YYIMConnection;\n}();\n\nYYIMConnection.getInstance = function () {\n\tif (!YYIMConnection._instance) {\n\t\tYYIMConnection._instance = new YYIMConnection();\n\t\tYYIMConnection._instance._init();\n\t}\n\treturn YYIMConnection._instance;\n};\n\nexports.YYIMConnection = YYIMConnection;\n\n//# sourceURL=webpack:///./src/connection/YYIMConnection.js?");

/***/ }),

/***/ "./src/core/manager.js":
/*!*****************************!*\
  !*** ./src/core/manager.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.YYIMChat = exports.YYIMManager = undefined;\n\nvar _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ \"./node_modules/_babel-runtime@6.26.0@babel-runtime/helpers/classCallCheck.js\");\n\nvar _classCallCheck3 = _interopRequireDefault(_classCallCheck2);\n\nvar _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ \"./node_modules/_babel-runtime@6.26.0@babel-runtime/helpers/createClass.js\");\n\nvar _createClass3 = _interopRequireDefault(_createClass2);\n\nvar _YYIMConnection = __webpack_require__(/*! ../connection/YYIMConnection */ \"./src/connection/YYIMConnection.js\");\n\nvar _YYIMConsoleLogger = __webpack_require__(/*! ../util/YYIMConsoleLogger */ \"./src/util/YYIMConsoleLogger.js\");\n\nvar _YYIMJIDUtil = __webpack_require__(/*! ../util/YYIMJIDUtil */ \"./src/util/YYIMJIDUtil.js\");\n\nvar _config = __webpack_require__(/*! ../config/config */ \"./src/config/config.js\");\n\nvar _constant = __webpack_require__(/*! ../config/constant */ \"./src/config/constant.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar YYIMManager = function () {\n\tfunction YYIMManager() {\n\t\t(0, _classCallCheck3.default)(this, YYIMManager);\n\n\t\tthis._user;\n\t\tthis._token = {};\n\t\tthis.appkey;\n\t\tthis.connectStatus = _constant.CONNECT_STATUS.INIT;\n\t\tthis.offlineStatus = [_constant.CONNECT_STATUS.ERROR, _constant.CONNECT_STATUS.OFFLINE, _constant.CONNECT_STATUS.CONFLICT, _constant.CONNECT_STATUS.AUTHERROR, _constant.CONNECT_STATUS.ONCLIENTKICKOUT, _constant.CONNECT_STATUS.INIT, _constant.CONNECT_STATUS.ONUPDATEPASSWORD];\n\n\t\tthis.onlineStatus = [_constant.CONNECT_STATUS.CONNECTED, _constant.CONNECT_STATUS.PROCESSING];\n\n\t\tthis.apiKey;\n\t\tthis.init();\n\t}\n\n\t(0, _createClass3.default)(YYIMManager, [{\n\t\tkey: 'log',\n\t\tvalue: function log(groupname, level, obj1, obj2) {\n\t\t\tthis._logger = this._logger || new _YYIMConsoleLogger.YYIMConsoleLogger(_config.YYIMConfiguration.LOG.FILTER_LEVEL);\n\t\t\tthis._logger.log(groupname, level, obj1, obj2);\n\t\t}\n\t}, {\n\t\tkey: 'init',\n\t\tvalue: function init(options) {\n\t\t\tvar _this = this;\n\n\t\t\toptions = options || {};\n\n\t\t\tthis.onConnectStatusChanged = function (status) {\n\t\t\t\t_this.connectStatus = status || _this.connectStatus;\n\t\t\t\t_this.log('connectStatus: ', 3, _this.connectStatus);\n\t\t\t};\n\n\t\t\tthis.onClosed = function (arg) {\n\t\t\t\t_this.onConnectStatusChanged(_constant.CONNECT_STATUS.OFFLINE);\n\t\t\t\toptions.onClosed && options.onClosed(arg);\n\t\t\t};\n\n\t\t\tthis.onAuthError = function (arg) {\n\t\t\t\t_this.onConnectStatusChanged(_constant.CONNECT_STATUS.AUTHERROR);\n\t\t\t\toptions.onAuthError && options.onAuthError(arg);\n\t\t\t};\n\n\t\t\tthis.onStatusChanged = function (status) {\n\t\t\t\tif (YYIMCommonUtil.isStringAndNotEmpty(status)) {\n\t\t\t\t\t_this.onConnectStatusChanged(status);\n\t\t\t\t}\n\t\t\t};\n\n\t\t\tthis.onOpened = function (arg) {\n\t\t\t\t_this.onConnectStatusChanged(_constant.CONNECT_STATUS.CONNECTED);\n\t\t\t\t_this.getTimeCorrection && _this.getTimeCorrection();\n\t\t\t\toptions.onOpened && options.onOpened(arg);\n\t\t\t};\n\n\t\t\tthis.onUpdatePassword = function (arg) {\n\t\t\t\t_this.disConnect(_constant.CONNECT_STATUS.ONUPDATEPASSWORD);\n\t\t\t\toptions.onUpdatePassword && options.onUpdatePassword(arg);\n\t\t\t};\n\n\t\t\tthis.onClientKickout = function (arg) {\n\t\t\t\t_this.disConnect(_constant.CONNECT_STATUS.ONCLIENTKICKOUT);\n\t\t\t\toptions.onClientKickout && options.onClientKickout(arg);\n\t\t\t};\n\n\t\t\tthis.onConflicted = function (arg) {\n\t\t\t\t_this.disConnect(_constant.CONNECT_STATUS.CONFLICT);\n\t\t\t\toptions.onConflicted && options.onConflicted(arg);\n\t\t\t};\n\n\t\t\tthis.onConnectError = function (arg) {\n\t\t\t\tif (_this.connectStatus == _constant.CONNECT_STATUS.OFFLINE || _this.connectStatus == _constant.CONNECT_STATUS.INIT || _this.connectStatus == _constant.CONNECT_STATUS.CONFLICT || _this.connectStatus == _constant.CONNECT_STATUS.AUTHERROR || _this.connectStatus == _constant.CONNECT_STATUS.ONCLIENTKICKOUT || _this.connectStatus == _constant.CONNECT_STATUS.ONUPDATEPASSWORD) {\n\t\t\t\t\tif (_this.ConnectErrorTimer) {\n\t\t\t\t\t\tclearInterval(_this.ConnectErrorTimer);\n\t\t\t\t\t\t_this.ConnectErrorTimer = null;\n\t\t\t\t\t}\n\t\t\t\t} else {\n\t\t\t\t\t_this.onConnectStatusChanged(_constant.CONNECT_STATUS.ERROR);\n\t\t\t\t\tif (!_this.ConnectErrorTimer) {\n\t\t\t\t\t\t_this.ConnectErrorTimer = setInterval(function () {\n\t\t\t\t\t\t\tif (_this.connectStatus == _constant.CONNECT_STATUS.CONNECTED || _this.connectStatus == _constant.CONNECT_STATUS.PROCESSING || _this.connectStatus == _constant.CONNECT_STATUS.OFFLINE || _this.connectStatus == _constant.CONNECT_STATUS.INIT) {\n\t\t\t\t\t\t\t\tclearInterval(_this.ConnectErrorTimer);\n\t\t\t\t\t\t\t\t_this.ConnectErrorTimer = null;\n\t\t\t\t\t\t\t} else if (_this.connectStatus == _constant.CONNECT_STATUS.ERROR) {\n\t\t\t\t\t\t\t\t_this.log('连接出现异常，正在尝试重连！', 3, arg);\n\t\t\t\t\t\t\t\t_this.connect();\n\t\t\t\t\t\t\t\t_this.onConnectStatusChanged(_constant.CONNECT_STATUS.CONNECTING);\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}, 500);\n\t\t\t\t\t}\n\t\t\t\t\toptions.onConnectError && options.onConnectError(arg);\n\t\t\t\t}\n\t\t\t};\n\n\t\t\tthis.onUserBind = options.onUserBind || function () {};\n\n\t\t\tthis.onExpiration = options.onExpiration;\n\n\t\t\tthis.exeBackhander('initCallback', options);\n\n\t\t\t(function () {\n\t\t\t\tjQuery(window).on({\n\t\t\t\t\t'unload offline': function unloadOffline() {\n\t\t\t\t\t\tif (_this.connectStatus != _constant.CONNECT_STATUS.INIT) {\n\t\t\t\t\t\t\t_this.disConnect();\n\t\t\t\t\t\t}\n\t\t\t\t\t},\n\t\t\t\t\t'online': function online() {\n\t\t\t\t\t\tif (_this.connectStatus != _constant.CONNECT_STATUS.INIT && _this.connectStatus != _constant.CONNECT_STATUS.CONFLICT && _this.connectStatus != _constant.CONNECT_STATUS.AUTHERROR && _this.connectStatus != _constant.CONNECT_STATUS.ONCLIENTKICKOUT && _this.connectStatus != _constant.CONNECT_STATUS.ONUPDATEPASSWORD) {\n\t\t\t\t\t\t\t_this.connect();\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t\t})();\n\n\t\t\tjQuery.ajaxSetup({\n\t\t\t\tstatusCode: {\n\t\t\t\t\t401: function _() {\n\t\t\t\t\t\toptions.onExpirationed && options.onExpirationed();\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t});\n\t\t}\n\t}, {\n\t\tkey: 'initSDK',\n\t\tvalue: function initSDK(options) {\n\t\t\t_config.ConfigSetting.init(options);\n\t\t\tvar conf = _config.YYIMConfiguration.MULTI_TENANCY;\n\t\t\tthis.appkey = conf.SEPARATOR + conf.APP_KEY + conf.SEPARATOR + conf.ETP_KEY;\n\n\t\t\tthis.apiKey = options.apiKey;\n\t\t}\n\t}, {\n\t\tkey: 'logEnable',\n\t\tvalue: function logEnable(_logEnable) {\n\t\t\tif (YYIMUtil['isWhateType'](_logEnable, 'Boolean')) {\n\t\t\t\t_config.YYIMConfiguration.LOG.ENABLE = _logEnable;\n\t\t\t} else {\n\t\t\t\t_config.YYIMConfiguration.LOG.ENABLE = !_config.YYIMConfiguration.LOG.ENABLE;\n\t\t\t}\n\t\t}\n\t}, {\n\t\tkey: 'getTenancy',\n\t\tvalue: function getTenancy() {\n\t\t\treturn _config.YYIMConfiguration.MULTI_TENANCY;\n\t\t}\n\t}, {\n\t\tkey: 'getAppkey',\n\t\tvalue: function getAppkey() {\n\t\t\treturn this.appkey;\n\t\t}\n\t}, {\n\t\tkey: 'getApiKey',\n\t\tvalue: function getApiKey() {\n\t\t\treturn this.apiKey;\n\t\t}\n\t}, {\n\t\tkey: 'isOnline',\n\t\tvalue: function isOnline() {\n\t\t\tif (this.onlineStatus.indexOf(this.connectStatus) > -1) {\n\t\t\t\treturn true;\n\t\t\t}\n\t\t\treturn false;\n\t\t}\n\t}, {\n\t\tkey: 'disConnect',\n\t\tvalue: function disConnect(status) {\n\t\t\tif (this.getExpirationTimer) {\n\t\t\t\tclearInterval(this.getExpirationTimer);\n\t\t\t\tthis.getExpirationTimer = 0;\n\t\t\t}\n\n\t\t\t_YYIMConnection.YYIMConnection.getInstance().disconnect();\n\n\t\t\tthis.onConnectStatusChanged(status || _constant.CONNECT_STATUS.OFFLINE);\n\t\t}\n\t}, {\n\t\tkey: 'connect',\n\t\tvalue: function connect() {\n\t\t\tif (!this.isOnline()) {\n\t\t\t\t_YYIMConnection.YYIMConnection.getInstance().connect();\n\t\t\t}\n\t\t}\n\t}, {\n\t\tkey: 'getToken',\n\t\tvalue: function getToken() {\n\t\t\tvar _this2 = this;\n\n\t\t\ttry {\n\t\t\t\tif (this.getExpiration() && YYIMUtil['isWhateType'](this.onExpiration, 'Function')) {\n\t\t\t\t\tif (this.getExpiration() - this.getServerNow() <= _config.YYIMConfiguration.EXPIRATION.INVALID) {\n\t\t\t\t\t\tthis.onExpiration(function (token, expiration) {\n\t\t\t\t\t\t\tif (token) {\n\t\t\t\t\t\t\t\t_this2._token.token = token;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tif (expiration) {\n\t\t\t\t\t\t\t\t_this2._token.expiration = expiration;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t});\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t} catch (e) {\n\t\t\t\tthis.log('Token winll Invalid. Auto Get Token Error.', 0);\n\t\t\t}\n\t\t\treturn this._token.token;\n\t\t}\n\t}, {\n\t\tkey: 'getExpiration',\n\t\tvalue: function getExpiration() {\n\t\t\treturn this._token.expiration;\n\t\t}\n\t}, {\n\t\tkey: 'login',\n\t\tvalue: function login(options) {\n\t\t\tvar _this3 = this;\n\n\t\t\toptions = options || {};\n\t\t\tthis._token = {\n\t\t\t\ttoken: options.token,\n\t\t\t\texpiration: options.expiration\n\t\t\t};\n\t\t\tif (options.username && options.token) {\n\t\t\t\tif (!this.isOnline()) {\n\t\t\t\t\t_YYIMConnection.YYIMConnection.getInstance().connect({\n\t\t\t\t\t\tusername: _YYIMJIDUtil.YYIMJIDUtil.getNode(options.username),\n\t\t\t\t\t\ttoken: options.token,\n\t\t\t\t\t\tappType: options.appType,\n\t\t\t\t\t\tidentify: options.identify\n\t\t\t\t\t});\n\t\t\t\t}\n\t\t\t\tif (YYIMUtil['isWhateType'](this.onExpiration, 'Function')) {\n\t\t\t\t\tif (!this.getExpirationTimer) {\n\t\t\t\t\t\tthis.getExpirationTimer = setInterval(function () {\n\t\t\t\t\t\t\t_this3.getToken();\n\t\t\t\t\t\t}, _config.YYIMConfiguration.EXPIRATION.INSPECTION_INTERVAL);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t} else {\n\t\t\t\tthis.log((!options.username ? 'Username ' : '') + (!options.token ? 'Token ' : '') + ' Illegal.', 0);\n\t\t\t}\n\t\t}\n\t}, {\n\t\tkey: 'getConnectStatus',\n\t\tvalue: function getConnectStatus() {\n\t\t\treturn this.connectStatus;\n\t\t}\n\t}, {\n\t\tkey: 'logout',\n\t\tvalue: function logout() {\n\t\t\tthis.disConnect.apply(this, arguments);\n\t\t\tthis.onConnectStatusChanged(_constant.CONNECT_STATUS.INIT);\n\t\t}\n\t}, {\n\t\tkey: 'getUserBareJID',\n\t\tvalue: function getUserBareJID() {\n\t\t\treturn this._user.jid.getBareJID();\n\t\t}\n\t}, {\n\t\tkey: 'getUserFullJID',\n\t\tvalue: function getUserFullJID() {\n\t\t\treturn this._user.jid.toString();\n\t\t}\n\t}, {\n\t\tkey: 'getUserNode',\n\t\tvalue: function getUserNode() {\n\t\t\treturn _YYIMJIDUtil.YYIMJIDUtil.getNode(this.getUserBareJID());\n\t\t}\n\t}, {\n\t\tkey: 'getUserID',\n\t\tvalue: function getUserID() {\n\t\t\treturn _YYIMJIDUtil.YYIMJIDUtil.getID(this.getUserBareJID());\n\t\t}\n\t}, {\n\t\tkey: 'getResource',\n\t\tvalue: function getResource() {\n\t\t\treturn _config.YYIMConfiguration.RESOURCE;\n\t\t}\n\t}, {\n\t\tkey: 'getServerName',\n\t\tvalue: function getServerName() {\n\t\t\treturn _config.YYIMConfiguration.CONNECTION.SERVER_NAME;\n\t\t}\n\t}, {\n\t\tkey: 'getServletPath',\n\t\tvalue: function getServletPath() {\n\t\t\treturn _config.YYIMConfiguration.SERVLET;\n\t\t}\n\t}, {\n\t\tkey: 'getJIDUtil',\n\t\tvalue: function getJIDUtil() {\n\t\t\treturn _YYIMJIDUtil.YYIMJIDUtil;\n\t\t}\n\t}, {\n\t\tkey: 'getServerNow',\n\t\tvalue: function getServerNow() {\n\t\t\treturn _config.YYIMConfiguration.TIMECORRECTION.AUTOCORRECTION ? new Date().getTime() + YYIMManager.getInstance().getConfig().TIMECORRECTION.RESULT : new Date().getTime();\n\t\t}\n\t}, {\n\t\tkey: 'getBrowser',\n\t\tvalue: function getBrowser() {\n\t\t\treturn _config.YYIMConfiguration.BROWSER;\n\t\t}\n\t}, {\n\t\tkey: 'getConstants',\n\t\tvalue: function getConstants() {\n\t\t\treturn {\n\t\t\t\tFAVORITE_TYPE: _constant.FAVORITE_TYPE,\n\t\t\t\tSTATUS: _constant.STATUS,\n\t\t\t\tTYPE: _constant.TYPE,\n\t\t\t\tPRESENCE_TYPE: _constant.PRESENCE_TYPE,\n\t\t\t\tCOLLECT_TYPE: _constant.COLLECT_TYPE,\n\t\t\t\tCHAT_TYPE: _constant.CHAT_TYPE,\n\t\t\t\tMESSAGE_CONTENT_TYPE: _constant.MESSAGE_CONTENT_TYPE\n\t\t\t};\n\t\t}\n\t}, {\n\t\tkey: 'getConfig',\n\t\tvalue: function getConfig() {\n\t\t\treturn _config.YYIMConfiguration;\n\t\t}\n\t}, {\n\t\tkey: 'getConnection',\n\t\tvalue: function getConnection() {\n\t\t\treturn _YYIMConnection.YYIMConnection.getInstance();\n\t\t}\n\t}, {\n\t\tkey: 'getJIDUtil',\n\t\tvalue: function getJIDUtil() {\n\t\t\treturn _YYIMJIDUtil.YYIMJIDUtil;\n\t\t}\n\t}, {\n\t\tkey: 'getUtil',\n\t\tvalue: function getUtil() {\n\t\t\treturn YYIMUtil;\n\t\t}\n\t}, {\n\t\tkey: 'setBackhander',\n\t\tvalue: function setBackhander(arg) {\n\t\t\tif (arg) {\n\t\t\t\tthis.backhanders = this.backhanders || {};\n\t\t\t\tfor (var x in arg) {\n\t\t\t\t\tthis.backhanders[x] = this.backhanders[x] || {};\n\t\t\t\t\twindow.jQuery.extend(this.backhanders[x], arg[x]);\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}, {\n\t\tkey: 'exeBackhander',\n\t\tvalue: function exeBackhander(type, options) {\n\t\t\tthis.backhanders = this.backhanders || {};\n\t\t\tif (type && this.backhanders[type]) {\n\t\t\t\tfor (var y in this.backhanders[type]) {\n\t\t\t\t\tif (YYIMUtil['isWhateType'](this.backhanders[type][y], 'Function')) {\n\t\t\t\t\t\ttry {\n\t\t\t\t\t\t\tthis.backhanders[type][y](options || {});\n\t\t\t\t\t\t} catch (e) {\n\t\t\t\t\t\t\tthis.log('exeBackhander: ' + type + ' ' + y + ' Error.', 0);\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}]);\n\treturn YYIMManager;\n}();\n\nYYIMManager.getInstance = function () {\n\tif (!YYIMManager._instance) {\n\t\tYYIMManager._instance = new YYIMManager();\n\t}\n\treturn YYIMManager._instance;\n};\n\nvar YYIMChat = YYIMManager.getInstance();\n\nexports.YYIMManager = YYIMManager;\nexports.YYIMChat = YYIMChat;\n\n//# sourceURL=webpack:///./src/core/manager.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _manager = __webpack_require__(/*! ./core/manager */ \"./src/core/manager.js\");\n\n__webpack_require__(/*! ./module/aiability/Extender */ \"./src/module/aiability/Extender.js\");\n\n__webpack_require__(/*! ./module/digest/Extender */ \"./src/module/digest/Extender.js\");\n\n__webpack_require__(/*! ./module/download/Extender */ \"./src/module/download/Extender.js\");\n\n__webpack_require__(/*! ./module/extend/Extender */ \"./src/module/extend/Extender.js\");\n\n__webpack_require__(/*! ./module/group/Extender */ \"./src/module/group/Extender.js\");\n\n__webpack_require__(/*! ./module/input_state/Extender */ \"./src/module/input_state/Extender.js\");\n\n__webpack_require__(/*! ./module/message/Extender */ \"./src/module/message/Extender.js\");\n\n__webpack_require__(/*! ./module/profile/Extender */ \"./src/module/profile/Extender.js\");\n\n__webpack_require__(/*! ./module/pubaccount/Extender */ \"./src/module/pubaccount/Extender.js\");\n\n__webpack_require__(/*! ./module/roster/Extender */ \"./src/module/roster/Extender.js\");\n\n__webpack_require__(/*! ./module/todo/Extender */ \"./src/module/todo/Extender.js\");\n\n__webpack_require__(/*! ./module/upload/Extender */ \"./src/module/upload/Extender.js\");\n\nwindow.YYIMChat = _manager.YYIMChat;\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/module/aiability/Extender.js":
/*!******************************************!*\
  !*** ./src/module/aiability/Extender.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _YYAIAbility = __webpack_require__(/*! ../../util/YYAIAbility */ \"./src/util/YYAIAbility.js\");\n\nvar _YYAIAbility2 = _interopRequireDefault(_YYAIAbility);\n\nvar _manager = __webpack_require__(/*! ../../core/manager */ \"./src/core/manager.js\");\n\nvar _Manager = __webpack_require__(/*! ./Manager */ \"./src/module/aiability/Manager.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n_manager.YYIMManager.prototype.setAIAbility = function (arg) {\n    arg = arg || {};\n    if (!!arg.intelligentable) {\n        (0, _Manager.setAIAbility)(arg);\n    } else {\n        arg.error && arg.error();\n    }\n};\n\n_manager.YYIMManager.prototype.getAIWords = function (arg) {\n    (0, _Manager.getAIWords)(arg || {});\n};\n\n_manager.YYIMManager.prototype.openAIAbility = function (isAIAbility) {\n    this.isAIAbility = isAIAbility;\n};\n\n_manager.YYIMManager.prototype.openFilterWords = function (isOpenFilter) {\n    _YYAIAbility2.default.openFilterWords(isOpenFilter);\n};\n\n_manager.YYIMManager.prototype.setDictionaries = function (intelligentWordsTime) {\n    var storageWordsTime = window.localStorage.intelligentWordsTime;\n    if (storageWordsTime != intelligentWordsTime) {\n        _manager.YYIMChat.getAIWords({\n            success: function success(data) {\n                _YYAIAbility2.default.setDictionaries(data.intelligentWords || []);\n\n                window.localStorage.intelligentWordsTime = intelligentWordsTime;\n            },\n            error: function error(xhr) {\n                try {\n                    arg.error && arg.error(JSON.parse(xhr.responseText));\n                    arg = null;\n                } catch (e) {\n                    arg.error && arg.error();\n                    arg = null;\n                }\n            }\n        });\n    }\n};\n\n_manager.YYIMManager.prototype.intelligentAnalysis = function (keyword) {\n    _YYAIAbility2.default.intelligentAnalysis(keyword);\n};\n\n_manager.YYIMManager.prototype.getMultiTerminals = function (arg) {\n    (0, _Manager.getMultiTerminals)(arg || {});\n};\n\n_manager.YYIMManager.prototype.sendMultiTerminalsCommand = function (arg) {\n    (0, _Manager.sendMultiTerminalsCommand)(arg || {});\n};\n\n//# sourceURL=webpack:///./src/module/aiability/Extender.js?");

/***/ }),

/***/ "./src/module/aiability/Manager.js":
/*!*****************************************!*\
  !*** ./src/module/aiability/Manager.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.sendMultiTerminalsCommand = exports.getMultiTerminals = exports.getAIWords = exports.setAIAbility = undefined;\n\nvar _stringify = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ \"./node_modules/_babel-runtime@6.26.0@babel-runtime/core-js/json/stringify.js\");\n\nvar _stringify2 = _interopRequireDefault(_stringify);\n\nvar _manager = __webpack_require__(/*! ../../core/manager */ \"./src/core/manager.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction setAIAbility(arg) {\n    jQuery.ajax({\n        url: _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMManager.getInstance().getUserID() + '/profile/intelligentable?token=' + _manager.YYIMManager.getInstance().getToken(),\n        type: 'post',\n        data: (0, _stringify2.default)(arg),\n        dataType: 'json',\n        cache: false,\n        processData: false,\n        contentType: \"application/json\",\n        success: function success(data) {\n            arg.success && arg.success(arg);\n            arg = null;\n        },\n        error: function error(xhr) {\n            try {\n                arg.error && arg.error(JSON.parse(xhr.responseText));\n                arg = null;\n            } catch (e) {\n                arg.error && arg.error();\n                arg = null;\n            }\n        }\n    });\n}\n\nfunction getAIWords(arg) {\n    jQuery.ajax({\n        url: _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMManager.getInstance().getUserID() + '/intelligent/words?token=' + _manager.YYIMManager.getInstance().getToken() + '&apiKey=' + _manager.YYIMChat.getApiKey(),\n        type: 'get',\n        data: '',\n        dataType: 'json',\n        cache: false,\n        processData: false,\n        contentType: \"application/json\",\n        success: function success(data) {\n            arg.success && arg.success(data);\n            arg = null;\n        },\n        error: function error(xhr) {\n            try {\n                arg.error && arg.error(JSON.parse(xhr.responseText));\n                arg = null;\n            } catch (e) {\n                arg.error && arg.error();\n                arg = null;\n            }\n        }\n    });\n}\n\nfunction getMultiTerminals(arg) {\n    jQuery.ajax({\n        url: _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMManager.getInstance().getUserID() + '/multiterminals?token=' + _manager.YYIMManager.getInstance().getToken(),\n        type: 'get',\n        data: '',\n        dataType: 'json',\n        cache: false,\n        processData: false,\n        contentType: \"application/json\",\n        success: function success(data) {\n            arg.success && arg.success(data);\n            arg = null;\n        },\n        error: function error(xhr) {\n            try {\n                arg.error && arg.error(JSON.parse(xhr.responseText));\n                arg = null;\n            } catch (e) {\n                arg.error && arg.error();\n                arg = null;\n            }\n        }\n    });\n}\n\nfunction sendMultiTerminalsCommand(arg) {\n    jQuery.ajax({\n        url: _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMManager.getInstance().getUserID() + '/multiterminals/command?token=' + _manager.YYIMManager.getInstance().getToken(),\n        type: 'POST',\n        data: arg.data,\n        dataType: 'json',\n        cache: false,\n        processData: false,\n        contentType: \"application/json\",\n        success: function success(data) {\n            arg.success && arg.success(data);\n            arg = null;\n        },\n        error: function error(xhr) {\n            try {\n                arg.error && arg.error(JSON.parse(xhr.responseText));\n                arg = null;\n            } catch (e) {\n                arg.error && arg.error();\n                arg = null;\n            }\n        }\n    });\n}\n\nexports.setAIAbility = setAIAbility;\nexports.getAIWords = getAIWords;\nexports.getMultiTerminals = getMultiTerminals;\nexports.sendMultiTerminalsCommand = sendMultiTerminalsCommand;\n\n//# sourceURL=webpack:///./src/module/aiability/Manager.js?");

/***/ }),

/***/ "./src/module/digest/Extender.js":
/*!***************************************!*\
  !*** ./src/module/digest/Extender.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _manager = __webpack_require__(/*! ../../core/manager */ \"./src/core/manager.js\");\n\nvar _Manager = __webpack_require__(/*! ./Manager */ \"./src/module/digest/Manager.js\");\n\n_manager.YYIMManager.prototype.getRecentDigset = function (arg) {\n  arg.startDate = YYIMUtil['isWhateType'](arg.startDate, 'Number') && arg.startDate > 0 ? arg.startDate : 0;\n  if (!(YYIMUtil['isWhateType'](arg.size, 'Number') && arg.size > 0)) {\n    delete arg.size;\n  }\n  (0, _Manager.getRecentDigset)(arg);\n};\n\n_manager.YYIMManager.prototype.removeRecentDigest = function (arg) {\n  if (arg.id) {\n    (0, _Manager.removeRecentDigest)(arg);\n  } else {\n    arg && arg.error && arg.error();\n  }\n};\n\n//# sourceURL=webpack:///./src/module/digest/Extender.js?");

/***/ }),

/***/ "./src/module/digest/Manager.js":
/*!**************************************!*\
  !*** ./src/module/digest/Manager.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.removeRecentDigest = exports.getRecentDigset = undefined;\n\nvar _manager = __webpack_require__(/*! ../../core/manager */ \"./src/core/manager.js\");\n\nfunction getRecentDigset(arg) {\n\tvar param = {\n\t\tstartDate: arg.startDate\n\t};\n\tif (arg.size) {\n\t\tparam.size = arg.size;\n\t}\n\tjQuery.ajax({\n\t\turl: _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMChat.getUserID() + '/contactsmessage/digests?token=' + _manager.YYIMChat.getToken(),\n\t\ttype: 'get',\n\t\tdata: param,\n\t\tdataType: 'json',\n\t\tcache: false,\n\t\tsuccess: function success(data) {\n\t\t\tfor (var x in data.list) {\n\t\t\t\tif (data.list.hasOwnProperty(x)) {\n\t\t\t\t\tvar item = data.list[x];\n\n\t\t\t\t\titem.id = _manager.YYIMChat.getJIDUtil().getID(item.jid);\n\t\t\t\t\titem.type = _manager.YYIMChat.getJIDUtil().getChatTypeByJid(item.jid);\n\n\t\t\t\t\ttry {\n\t\t\t\t\t\tif (item.lastMessage) {\n\t\t\t\t\t\t\titem.lastMessage = messageParser(JSON.parse(item.lastMessage), item.type);\n\t\t\t\t\t\t}\n\t\t\t\t\t} catch (e) {}\n\t\t\t\t}\n\t\t\t}\n\t\t\targ.success && arg.success(data);\n\t\t\targ = null;\n\t\t},\n\t\terror: function error(xhr) {\n\t\t\ttry {\n\t\t\t\targ.error && arg.error(JSON.parse(xhr.responseText));\n\t\t\t\targ = null;\n\t\t\t} catch (e) {\n\t\t\t\targ.error && arg.error();\n\t\t\t\targ = null;\n\t\t\t}\n\t\t}\n\t});\n}\n\nfunction parseContent(content, contentType) {\n\tif (content) {\n\t\tvar body = JSON.parse(content);\n\t\ttry {\n\t\t\tif (isNaN(Number(body.content)) && contentType != _manager.YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.TEXT) {\n\t\t\t\tbody.content = JSON.parse(body.content);\n\t\t\t\tif (body.content.content) {\n\t\t\t\t\tbody.content = body.content.content;\n\t\t\t\t}\n\t\t\t}\n\t\t} catch (e) {}\n\t\treturn body;\n\t} else {\n\t\treturn null;\n\t}\n}\n\nfunction messageParser(packet, type) {\n\n\tvar message = {\n\t\tfrom: _manager.YYIMChat.getJIDUtil().getID(packet.sender),\n\t\tto: _manager.YYIMChat.getJIDUtil().getID(packet.receiver || _manager.YYIMChat.getUserID()),\n\t\tid: packet.packetId,\n\t\tdateline: packet.dateline || packet.ts,\n\t\ttype: type,\n\t\tsessionVersion: packet.sessionVersion\n\t};\n\n\tif (type) {\n\t\tif (type == _manager.YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT) {\n\t\t\tmessage.from = {\n\t\t\t\troom: _manager.YYIMChat.getJIDUtil().getID(packet.mucid),\n\t\t\t\troster: _manager.YYIMChat.getJIDUtil().getID(packet.sender)\n\t\t\t};\n\t\t} else if (type == _manager.YYIMChat.getConstants().CHAT_TYPE.PUB_ACCOUNT) {\n\t\t\tmessage.from = {\n\t\t\t\troom: _manager.YYIMChat.getJIDUtil().getID(packet.sender),\n\t\t\t\troster: _manager.YYIMChat.getJIDUtil().getID(_manager.YYIMChat.getJIDUtil().getResource(packet.sender))\n\t\t\t};\n\t\t}\n\t}\n\n\tif (packet.content) {\n\t\tmessage.data = message.data || {};\n\t\ttry {\n\t\t\tvar content = parseContent(packet.content, packet.contentType);\n\t\t\tif (!!content && (!!content.content || content.content === '')) {\n\t\t\t\tmessage.data = content;\n\t\t\t} else {\n\t\t\t\tmessage.data.content = content;\n\t\t\t}\n\t\t} catch (e) {}\n\n\t\tmessage.data.contentType = packet.contentType;\n\t\tmessage.data.dateline = packet.dateline || packet.ts;\n\n\t\tif (message.data.content && message.data.contentType && (message.data.contentType == _manager.YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.IMAGE || message.data.contentType == _manager.YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.FILE)) {\n\n\t\t\tmessage.data.content.attachId = message.data.content.path;\n\t\t\tmessage.data.content.path = _manager.YYIMChat.getFileUrl(message.data.content.path);\n\t\t}\n\n\t\tif (_manager.YYIMChat.getJIDUtil().getID(packet.sender) != _manager.YYIMChat.getUserID()) {\n\t\t\tvar receipt = {\n\t\t\t\tto: _manager.YYIMChat.getJIDUtil().getID(packet.mucid || packet.sender),\n\t\t\t\tid: message.id,\n\t\t\t\ttype: message.type,\n\t\t\t\tsessionVersion: message.sessionVersion\n\t\t\t};\n\t\t\tmessage.data.receipt = receipt;\n\t\t}\n\t}\n\treturn message;\n}\n\nfunction removeRecentDigest(arg) {\n\tvar typeRelation = {\n\t\t'chat': 'user',\n\t\t'groupchat': 'room',\n\t\t'pubaccount': 'pub'\n\t};\n\n\tjQuery.ajax({\n\t\turl: _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMChat.getUserID() + '/contacts/' + (typeRelation[arg.type] || typeRelation['chat']) + '/' + arg.id + '?token=' + _manager.YYIMChat.getToken(),\n\t\ttype: 'DELETE',\n\t\tdataType: 'json',\n\t\tcache: false,\n\t\tsuccess: function success(data) {\n\t\t\targ.success && arg.success(data);\n\t\t\targ = null;\n\t\t},\n\t\terror: function error(xhr) {\n\t\t\ttry {\n\t\t\t\targ.error && arg.error(JSON.parse(xhr.responseText));\n\t\t\t\targ = null;\n\t\t\t} catch (e) {\n\t\t\t\targ.error && arg.error();\n\t\t\t\targ = null;\n\t\t\t}\n\t\t}\n\t});\n}\n\nexports.getRecentDigset = getRecentDigset;\nexports.removeRecentDigest = removeRecentDigest;\n\n//# sourceURL=webpack:///./src/module/digest/Manager.js?");

/***/ }),

/***/ "./src/module/download/Extender.js":
/*!*****************************************!*\
  !*** ./src/module/download/Extender.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _manager = __webpack_require__(/*! ../../core/manager */ \"./src/core/manager.js\");\n\nvar _Manager = __webpack_require__(/*! ./Manager */ \"./src/module/download/Manager.js\");\n\n_manager.YYIMManager.prototype.getTransformFileList = function (arg) {\n  if (arg && arg.attachId) {\n    (0, _Manager.getTransformFileList)(arg);\n  } else {\n    arg && arg.error && arg.error();\n  }\n};\n\n_manager.YYIMManager.prototype.getFileUrl = function (attachId, mediaType) {\n  if (attachId) {\n    return (0, _Manager.getFileUrl)(attachId, mediaType);\n  }\n};\n\n//# sourceURL=webpack:///./src/module/download/Extender.js?");

/***/ }),

/***/ "./src/module/download/Manager.js":
/*!****************************************!*\
  !*** ./src/module/download/Manager.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.getFileUrl = exports.getTransformFileList = undefined;\n\nvar _manager = __webpack_require__(/*! ../../core/manager */ \"./src/core/manager.js\");\n\nfunction getTransformFileList(arg) {\n\tjQuery.ajax({\n\t\turl: _manager.YYIMChat.getConfig().SERVLET.REST_TRANSFORM_SERVLET + 'docInfo',\n\t\ttype: 'get',\n\t\tdata: {\n\t\t\tattachId: arg.attachId,\n\t\t\ttoken: _manager.YYIMChat.getToken(),\n\t\t\tdownloader: _manager.YYIMChat.getUserNode()\n\t\t},\n\t\tdataType: 'json',\n\t\tcache: false,\n\t\tsuccess: arg.success,\n\t\terror: function error(xhr) {\n\t\t\ttry {\n\t\t\t\targ.error && arg.error(JSON.parse(xhr.responseText));\n\t\t\t\targ = null;\n\t\t\t} catch (e) {\n\t\t\t\targ.error && arg.error();\n\t\t\t\targ = null;\n\t\t\t}\n\t\t}\n\t});\n}\n\nfunction getFileUrl(attachId, mediaType) {\n\tif (attachId) {\n\t\tif (/^https?:\\/\\/|^data:image\\/jpeg;/.test(attachId)) {\n\t\t\treturn attachId;\n\t\t}\n\t\tvar url = _manager.YYIMChat.getConfig().SERVLET.REST_RESOURCE_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/download';\n\t\treturn url + '?' + jQuery.param({\n\t\t\tattachId: attachId,\n\t\t\tdownloader: _manager.YYIMChat.getUserNode(),\n\t\t\ttoken: _manager.YYIMChat.getToken(),\n\t\t\tmediaType: mediaType === 1 ? mediaType : 2\n\t\t});\n\t}\n}\n\nexports.getTransformFileList = getTransformFileList;\nexports.getFileUrl = getFileUrl;\n\n//# sourceURL=webpack:///./src/module/download/Manager.js?");

/***/ }),

/***/ "./src/module/extend/Extender.js":
/*!***************************************!*\
  !*** ./src/module/extend/Extender.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _manager = __webpack_require__(/*! ../../core/manager */ \"./src/core/manager.js\");\n\nvar _Manager = __webpack_require__(/*! ./Manager */ \"./src/module/extend/Manager.js\");\n\n_manager.YYIMManager.prototype.multiPartyCall = function (arg) {\n\tif (typeof arg === 'undefined' || typeof arg.caller === 'undefined' || !YYIMArrayUtil.isArray(arg.phones) || !arg.phones.length) {\n\t\targ.error && arg.error();\n\t\treturn;\n\t}\n\n\tif (!YYIMRegExp.phone.test(arg.caller)) {\n\t\targ.error && arg.error();\n\t\treturn;\n\t}\n\n\tvar phones = [];\n\tfor (var x in arg.phones) {\n\t\tvar phone = arg.phones[x].toString();\n\t\tif (YYIMRegExp.phone.test(phone)) {\n\t\t\tif (phones.indexOf(phone) === -1) {\n\t\t\t\tphones.push(phone);\n\t\t\t\tvar tempCondition = phones.join(\",\");\n\t\t\t\tif (phones.length > _manager.YYIMChat.getConfig().MULTIPARTYCALL.PARTYMAXLENGTH || tempCondition.length > _manager.YYIMChat.getConfig().MULTIPARTYCALL.PHONESMAXLENGTH) {\n\t\t\t\t\tphones.pop();\n\t\t\t\t\tbreak;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\tif (!phones.length) {\n\t\targ.error && arg.error();\n\t\treturn;\n\t}\n\n\targ.caller = arg.caller.toString();\n\targ.phones = phones;\n\n\tif (arg.accountMmanaged !== true) {\n\t\targ.phones = phones.join(',');\n\t\targ.account = arg.account ? arg.account : _manager.YYIMChat.getConfig().MULTIPARTYCALL.ACCOUNT;\n\t\targ.key = arg.key ? arg.key : _manager.YYIMChat.getConfig().MULTIPARTYCALL.KEY;\n\n\t\tif (typeof arg.account === 'undefined' || typeof arg.key === 'undefined') {\n\t\t\targ.error && arg.error();\n\t\t\treturn;\n\t\t}\n\t}\n\n\t(0, _Manager.multiPartyCall)(arg);\n};\n\n_manager.YYIMManager.prototype.getTimeCorrection = function (callback) {\n\t(0, _Manager.getTimeCorrection)(callback);\n};\n\n//# sourceURL=webpack:///./src/module/extend/Extender.js?");

/***/ }),

/***/ "./src/module/extend/Manager.js":
/*!**************************************!*\
  !*** ./src/module/extend/Manager.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.getTimeCorrection = exports.multiPartyCall = undefined;\n\nvar _stringify = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ \"./node_modules/_babel-runtime@6.26.0@babel-runtime/core-js/json/stringify.js\");\n\nvar _stringify2 = _interopRequireDefault(_stringify);\n\nvar _manager = __webpack_require__(/*! ../../core/manager */ \"./src/core/manager.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction multiPartyCall(arg) {\n\n\tif (arg.accountMmanaged === true) {\n\t\tvar data = {\n\t\t\tetpId: _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY,\n\t\t\tappId: _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY,\n\t\t\tcaller: arg.caller,\n\t\t\tphones: arg.phones,\n\t\t\tusername: _manager.YYIMManager.getInstance().getUserNode() };\n\n\t\tjQuery.ajax({\n\t\t\turl: _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + 'voip/make?token=' + _manager.YYIMManager.getInstance().getToken(),\n\t\t\ttype: 'post',\n\t\t\tdata: (0, _stringify2.default)(data),\n\t\t\tdataType: 'json',\n\t\t\tcache: false,\n\t\t\tprocessData: false,\n\t\t\tcontentType: \"application/json\",\n\t\t\theaders: {},\n\t\t\tsuccess: arg.success,\n\t\t\terror: function error(xhr) {\n\t\t\t\ttry {\n\t\t\t\t\targ.error && arg.error(JSON.parse(xhr.responseText));\n\t\t\t\t\targ = null;\n\t\t\t\t} catch (e) {\n\t\t\t\t\targ.error && arg.error();\n\t\t\t\t\targ = null;\n\t\t\t\t}\n\t\t\t}\n\t\t});\n\t} else {\n\t\tvar timestamp = new Date().getTime();\n\t\tvar data = {\n\t\t\tcaller: arg.caller,\n\t\t\tphones: arg.phones,\n\t\t\taccount_identify: arg.account,\n\t\t\tuserId: _manager.YYIMManager.getInstance().getUserBareJID(),\n\t\t\ttimestamp: timestamp,\n\t\t\tsign: hex_sha1(arg.account + arg.key + timestamp)\n\t\t};\n\n\t\tjQuery.ajax({\n\t\t\turl: _manager.YYIMChat.getConfig().MULTIPARTYCALL.ADDRESS,\n\t\t\ttype: 'get',\n\t\t\tdata: data,\n\t\t\tdataType: 'jsonp',\n\t\t\tcache: false,\n\t\t\tjsonp: 'callback',\n\t\t\tsuccess: arg.success,\n\t\t\terror: function error(xhr) {\n\t\t\t\ttry {\n\t\t\t\t\targ.error && arg.error(JSON.parse(xhr.responseText));\n\t\t\t\t\targ = null;\n\t\t\t\t} catch (e) {\n\t\t\t\t\targ.error && arg.error();\n\t\t\t\t\targ = null;\n\t\t\t\t}\n\t\t\t}\n\t\t});\n\t}\n}\n\nfunction getServerCorrection(arg) {\n\tvar start,\n\t    end = 0;\n\tjQuery.ajax({\n\t\turl: _manager.YYIMChat.getConfig().SERVLET.REST_SYSTEM_SERVLET + 'time',\n\t\ttype: 'get',\n\t\tcache: false,\n\t\tbeforeSend: function beforeSend() {\n\t\t\tstart = new Date().getTime();\n\t\t},\n\t\tsuccess: function success(serverTime) {\n\t\t\tend = new Date().getTime();\n\t\t\targ && arg.success && arg.success(serverTime - (start + end) / 2, end - start);\n\t\t\targ = null;\n\t\t},\n\t\terror: function error(xhr) {\n\t\t\ttry {\n\t\t\t\targ.error && arg.error(JSON.parse(xhr.responseText));\n\t\t\t\targ = null;\n\t\t\t} catch (e) {\n\t\t\t\targ.error && arg.error();\n\t\t\t\targ = null;\n\t\t\t}\n\t\t}\n\t});\n}\n\nvar corrections = [];\nfunction getTimeCorrection(callback) {\n\tif (_manager.YYIMChat.getConfig().TIMECORRECTION.LOAD) {\n\t\tcallback && callback(_manager.YYIMChat.getConfig().TIMECORRECTION.RESULT);\n\t} else {\n\t\tgetServerCorrection({\n\t\t\tsuccess: function success(correct, intervcal) {\n\t\t\t\tif (intervcal < _manager.YYIMChat.getConfig().TIMECORRECTION.RESIDUAL) {\n\t\t\t\t\t_manager.YYIMChat.getConfig().TIMECORRECTION.LOAD = true;\n\t\t\t\t\t_manager.YYIMChat.getConfig().TIMECORRECTION.RESULT = Math.round(correct);\n\t\t\t\t\treturn callback && callback(_manager.YYIMChat.getConfig().TIMECORRECTION.RESULT);;\n\t\t\t\t} else {\n\t\t\t\t\tcorrections.push(correct);\n\n\t\t\t\t\tif (corrections.length < _manager.YYIMChat.getConfig().TIMECORRECTION.TIMES) {\n\t\t\t\t\t\tgetTimeCorrection(callback);\n\t\t\t\t\t} else {\n\t\t\t\t\t\tvar sum = 0;\n\t\t\t\t\t\tfor (var x in corrections) {\n\t\t\t\t\t\t\tif (YYIMUtil['isWhateType'](corrections[x], 'Number')) {\n\t\t\t\t\t\t\t\tsum += corrections[x];\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcorrections.length = 0;\n\t\t\t\t\t\t_manager.YYIMChat.getConfig().TIMECORRECTION.LOAD = true;\n\t\t\t\t\t\t_manager.YYIMChat.getConfig().TIMECORRECTION.RESULT = Math.round(sum / _manager.YYIMChat.getConfig().TIMECORRECTION.TIMES);\n\t\t\t\t\t\tcallback && callback(_manager.YYIMChat.getConfig().TIMECORRECTION.RESULT);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t});\n\t}\n}\n\nexports.multiPartyCall = multiPartyCall;\nexports.getTimeCorrection = getTimeCorrection;\n\n//# sourceURL=webpack:///./src/module/extend/Manager.js?");

/***/ }),

/***/ "./src/module/group/Extender.js":
/*!**************************************!*\
  !*** ./src/module/group/Extender.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _manager = __webpack_require__(/*! ../../core/manager */ \"./src/core/manager.js\");\n\nvar _Manager = __webpack_require__(/*! ./Manager */ \"./src/module/group/Manager.js\");\n\n_manager.YYIMChat.setBackhander({\n\t'monitor': {\n\t\t'groupMonitor': _Manager.monitor\n\t},\n\t'initCallback': {\n\t\t'group': function group(options) {\n\t\t\t_manager.YYIMChat.onGroupUpdate = options.onGroupUpdate || function () {};\n\t\t\t_manager.YYIMChat.onTransferGroupOwner = options.onTransferGroupOwner || function () {};\n\t\t\t_manager.YYIMChat.onKickedOutGroup = options.onKickedOutGroup || function () {};\n\t\t}\n\t}\n});\n\n_manager.YYIMManager.prototype.queryChatGroup = function (arg) {\n\tif (YYIMCommonUtil.isStringAndNotEmpty(arg.keyword)) {\n\t\t(0, _Manager.queryChatGroup)(arg);\n\t} else {\n\t\targ && arg.error && arg.error();\n\t}\n};\n\n_manager.YYIMManager.prototype.joinChatGroup = function (arg) {\n\tif (YYIMCommonUtil.isStringAndNotEmpty(arg.id)) {\n\t\t(0, _Manager.joinChatGroup)({\n\t\t\tjid: _manager.YYIMChat.getJIDUtil().buildChatGroupJID(_manager.YYIMChat.getJIDUtil().getNode(arg.id)),\n\t\t\tsuccess: arg.success,\n\t\t\terror: arg.error\n\t\t});\n\t} else {\n\t\targ && arg.error && arg.error();\n\t}\n};\n\n_manager.YYIMManager.prototype.getChatGroupInfo = function (arg) {\n\tif (YYIMCommonUtil.isStringAndNotEmpty(arg.id)) {\n\t\t(0, _Manager.getChatGroupInfo)({\n\t\t\tjid: _manager.YYIMChat.getJIDUtil().buildChatGroupJID(_manager.YYIMChat.getJIDUtil().getNode(arg.id)),\n\t\t\tmembersLimit: YYIMCommonUtil.isNumber(arg.membersLimit) && arg.membersLimit > 0 ? arg.membersLimit : _manager.YYIMChat.getConfig().GROUP.MEMBERSLIMIT,\n\t\t\tsuccess: arg.success,\n\t\t\terror: arg.error\n\t\t});\n\t} else {\n\t\targ && arg.error && arg.error();\n\t}\n};\n\n_manager.YYIMManager.prototype.getChatGroups = function (arg) {\n\targ = arg || {};\n\targ.startDate = YYIMUtil['isWhateType'](arg.startDate, 'Number') && arg.startDate > 0 ? arg.startDate : 0;\n\targ.membersLimit = YYIMCommonUtil.isNumber(arg.membersLimit) && arg.membersLimit > 0 ? arg.membersLimit : _manager.YYIMChat.getConfig().GROUP.MEMBERSLIMIT;\n\t(0, _Manager.getChatGroups)(arg);\n};\n\n_manager.YYIMManager.prototype.createChatGroup = function (arg) {\n\tif (!YYIMArrayUtil.isArray(arg.members)) {\n\t\tdelete arg.members;\n\t}\n\tif (arg.members) {\n\t\t(0, _Manager.createChatGroup)(arg);\n\t} else {\n\t\targ && arg.error && arg.error();\n\t}\n};\n\n_manager.YYIMManager.prototype.transferChatGroup = function (arg) {\n\tif (arg && typeof arg.newOwner == 'string' && arg.to) {\n\t\targ.to = _manager.YYIMChat.getJIDUtil().buildChatGroupJID(_manager.YYIMChat.getJIDUtil().getNode(arg.to));\n\t\t(0, _Manager.transferChatGroup)(arg);\n\t} else {\n\t\targ && arg.error && arg.error();\n\t}\n};\n\n_manager.YYIMManager.prototype.dismissChatGroup = function (arg) {\n\tif (arg && arg.to) {\n\t\targ.to = _manager.YYIMChat.getJIDUtil().buildChatGroupJID(_manager.YYIMChat.getJIDUtil().getNode(arg.to));\n\t\t(0, _Manager.dismissChatGroup)(arg);\n\t} else {\n\t\targ && arg.error && arg.error();\n\t}\n};\n\n_manager.YYIMManager.prototype.getSharedFiles = function (arg) {\n\tif (arg && arg.id) {\n\t\t(0, _Manager.getSharedFiles)(arg);\n\t} else {\n\t\targ && arg.error && arg.error();\n\t}\n};\n\n_manager.YYIMManager.prototype.inviteGroupMember = function (arg) {\n\tif (arg.members && YYIMArrayUtil.isArray(arg.members) && arg.members.length && arg.to) {\n\t\targ.to = _manager.YYIMChat.getJIDUtil().buildChatGroupJID(_manager.YYIMChat.getJIDUtil().getNode(arg.to));\n\t\t(0, _Manager.inviteGroupMember)(arg);\n\t} else {\n\t\targ && arg.error && arg.error();\n\t}\n};\n\n_manager.YYIMManager.prototype.modifyChatGroupInfo = function (arg) {\n\tif (arg.name && arg.to) {\n\t\targ.to = _manager.YYIMChat.getJIDUtil().buildChatGroupJID(_manager.YYIMChat.getJIDUtil().getNode(arg.to));\n\t\t(0, _Manager.modifyChatGroupInfo)(arg);\n\t} else {\n\t\targ && arg.error && arg.error();\n\t}\n};\n\n_manager.YYIMManager.prototype.kickGroupMember = function (arg) {\n\tif (arg.member && typeof arg.member == 'string' && arg.to) {\n\t\targ.to = _manager.YYIMChat.getJIDUtil().buildChatGroupJID(_manager.YYIMChat.getJIDUtil().getNode(arg.to));\n\t\t(0, _Manager.kickGroupMember)(arg);\n\t} else {\n\t\targ && arg.error && arg.error();\n\t}\n};\n\n_manager.YYIMManager.prototype.exitChatGroup = function (arg) {\n\tif (arg.to) {\n\t\targ.to = _manager.YYIMChat.getJIDUtil().buildChatGroupJID(_manager.YYIMChat.getJIDUtil().getNode(arg.to));\n\t\t(0, _Manager.exitChatGroup)(arg);\n\t} else {\n\t\targ && arg.error && arg.error();\n\t}\n};\n\n_manager.YYIMManager.prototype.collectGroup = function (arg) {\n\tif (arg.to) {\n\t\targ.to = _manager.YYIMChat.getJIDUtil().buildChatGroupJID(_manager.YYIMChat.getJIDUtil().getNode(arg.to));\n\t\targ.type = this.getConstants().COLLECT_TYPE.ADD;\n\t\t(0, _Manager.collectChatGroup)(arg);\n\t} else {\n\t\targ && arg.error && arg.error();\n\t}\n};\n\n_manager.YYIMManager.prototype.removeCollectGroup = function (arg) {\n\tif (arg.to) {\n\t\targ.to = _manager.YYIMChat.getJIDUtil().buildChatGroupJID(_manager.YYIMChat.getJIDUtil().getNode(arg.to));\n\t\targ.type = this.getConstants().COLLECT_TYPE.REMOVE;\n\t\t(0, _Manager.collectChatGroup)(arg);\n\t} else {\n\t\targ && arg.error && arg.error();\n\t}\n};\n\n_manager.YYIMManager.prototype.getGroupMembers = function (arg) {\n\tvar id = arg.id || arg.to;\n\tif (arg && id) {\n\t\tif (YYIMCommonUtil.isStringAndNotEmpty(id)) {\n\t\t\t(0, _Manager.getGroupMembers)(arg);\n\t\t}\n\t} else {\n\t\targ && arg.error && arg.error();\n\t}\n};\n\n//# sourceURL=webpack:///./src/module/group/Extender.js?");

/***/ }),

/***/ "./src/module/group/Manager.js":
/*!*************************************!*\
  !*** ./src/module/group/Manager.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.collectChatGroup = exports.exitChatGroup = exports.kickGroupMember = exports.modifyChatGroupInfo = exports.inviteGroupMember = exports.getSharedFiles = exports.dismissChatGroup = exports.transferChatGroup = exports.createChatGroup = exports.getChatGroups = exports.getChatGroupInfo = exports.joinChatGroup = exports.getGroupMembers = exports.queryChatGroup = exports.monitor = undefined;\n\nvar _manager = __webpack_require__(/*! ../../core/manager */ \"./src/core/manager.js\");\n\nfunction getChatGroups(arg) {\n\tjQuery.ajax({\n\t\turl: _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMChat.getUserID() + '/room/contacts/increment?timestamp=' + arg.startDate + '&token=' + _manager.YYIMChat.getToken() + '&membersLimit=' + arg.membersLimit,\n\t\ttype: 'get',\n\t\tdataType: 'json',\n\t\tcache: false,\n\t\tsuccess: function success(chatGroupList) {\n\t\t\tif (!!chatGroupList) {\n\t\t\t\tchatGroupList.roomItems = chatGroupList.roomItems || [];\n\t\t\t\tchatGroupList.roomNames = chatGroupList.roomNames || [];\n\t\t\t\tchatGroupList.leftRooms = chatGroupList.leftRooms || [];\n\n\t\t\t\tvar i = chatGroupList.roomItems.length || 0;\n\t\t\t\twhile (i--) {\n\t\t\t\t\tchatGroupList.roomItems[i] = handleChatGroup(chatGroupList.roomItems[i]);\n\t\t\t\t}\n\n\t\t\t\tvar j = chatGroupList.roomNames.length || 0;\n\t\t\t\twhile (j--) {\n\t\t\t\t\tchatGroupList.roomNames[j] = _manager.YYIMChat.getJIDUtil().getID(chatGroupList.roomNames[j]);\n\t\t\t\t}\n\n\t\t\t\tvar z = chatGroupList.leftRooms.length || 0;\n\t\t\t\twhile (z--) {\n\t\t\t\t\tchatGroupList.leftRooms[z] = _manager.YYIMChat.getJIDUtil().getID(chatGroupList.leftRooms[z]);\n\t\t\t\t}\n\t\t\t}\n\t\t\targ.success && arg.success(chatGroupList || {});\n\t\t\targ = null;\n\t\t},\n\t\terror: function error(xhr) {\n\t\t\ttry {\n\t\t\t\targ.error && arg.error(JSON.parse(xhr.responseText));\n\t\t\t\targ = null;\n\t\t\t} catch (e) {\n\t\t\t\targ.error && arg.error();\n\t\t\t\targ = null;\n\t\t\t}\n\t\t}\n\t});\n}\n\nfunction queryChatGroup(arg) {\n\tvar iqBody = {\n\t\tstart: YYIMCommonUtil.isNumber(arg.start) ? arg.start : 0,\n\t\tsize: YYIMCommonUtil.isNumber(arg.size) ? arg.size : 20,\n\t\tsearch: arg.keyword\n\t};\n\t_manager.YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.QUERY_CHATGROUP.SEND), function (queryResult, _arg) {\n\t\tvar items = queryResult.items || [],\n\t\t    i = items.length;\n\t\twhile (i--) {\n\t\t\tvar item = items[i];\n\t\t\titems[i].id = _manager.YYIMChat.getJIDUtil().getID(item.jid);\n\t\t\titems[i].name = items[i].name || items[i].id;\n\t\t}\n\t\t_arg.complete && _arg.complete();\n\t\t_arg.success && _arg.success({\n\t\t\tstart: queryResult.start,\n\t\t\ttotal: queryResult.total,\n\t\t\titems: items\n\t\t});\n\t}, arg);\n}\n\nfunction getChatGroupInfo(arg) {\n\tjQuery.ajax({\n\t\turl: _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMChat.getUserID() + '/room/info?membersLimit=' + arg.membersLimit + '&mucId=' + arg.jid + '&token=' + _manager.YYIMChat.getToken(),\n\t\ttype: 'get',\n\t\tdataType: 'json',\n\t\tcache: false,\n\t\tsuccess: function success(result) {\n\t\t\tvar group = handleChatGroup(result);\n\t\t\targ.success && arg.success(group);\n\t\t\targ = null;\n\t\t},\n\t\terror: function error(xhr) {\n\t\t\ttry {\n\t\t\t\targ.error && arg.error(JSON.parse(xhr.responseText));\n\t\t\t\targ = null;\n\t\t\t} catch (e) {\n\t\t\t\targ.error && arg.error();\n\t\t\t\targ = null;\n\t\t\t}\n\t\t}\n\t});\n}\n\nfunction createChatGroup(arg) {\n\tvar iqBody = {\n\t\tid: Math.uuid(),\n\t\tto: arg.to,\n\t\tnaturalLanguageName: arg.name,\n\t\tfrom: _manager.YYIMChat.getUserBareJID(),\n\t\tinvitees: arg.members\n\t};\n\n\t_manager.YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.CREATE_GROUP.SEND), function (result, _arg) {\n\t\t_arg.complete && _arg.complete();\n\t\t_arg.success && _arg.success(handleChatGroup(result));\n\t}, arg);\n}\n\nfunction transferChatGroup(arg) {\n\tvar iqBody = {\n\t\tid: Math.uuid(),\n\t\tto: arg.to,\n\t\tfrom: _manager.YYIMChat.getUserBareJID(),\n\t\tnewOwner: arg.newOwner\n\t};\n\n\t_manager.YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.TRANSFER_GROUP.SEND), function (result, _arg) {\n\t\t_arg.complete && _arg.complete();\n\t\t_arg.success && _arg.success(transferChatGroupOwner(result));\n\t}, arg);\n}\n\nfunction dismissChatGroup(arg) {\n\tvar iqBody = {\n\t\tid: Math.uuid(),\n\t\tto: arg.to,\n\t\tfrom: _manager.YYIMChat.getUserBareJID()\n\t};\n\n\t_manager.YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.DISMISS_GROUP.SEND), function (result, _arg) {\n\t\t_arg.complete && _arg.complete();\n\t\t_arg.success && _arg.success({\n\t\t\tid: result.id,\n\t\t\tfrom: _manager.YYIMChat.getJIDUtil().getID(result.from),\n\t\t\tto: _manager.YYIMChat.getJIDUtil().getID(result.to)\n\t\t});\n\t}, arg);\n}\n\nfunction inviteGroupMember(arg) {\n\tvar iqBody = {\n\t\tid: Math.uuid(),\n\t\tto: arg.to,\n\t\tfrom: _manager.YYIMChat.getUserBareJID(),\n\t\tinvitees: arg.members\n\t};\n\n\t_manager.YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.INVITE_GROUP_MEMBER.SEND), function (result, _arg) {\n\t\t_arg.complete && _arg.complete();\n\t\t_arg.success && _arg.success(handleChatGroup(result));\n\t}, arg);\n}\n\nfunction modifyChatGroupInfo(arg) {\n\tvar iqBody = {\n\t\tid: Math.uuid(),\n\t\tnaturalLanguageName: arg.name,\n\t\tfrom: _manager.YYIMChat.getUserBareJID(),\n\t\tto: arg.to\n\t};\n\n\t_manager.YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.MODIFY_GROUP_INFO.SEND), function (result, _arg) {\n\t\t_arg.complete && _arg.complete();\n\t\t_arg.success && _arg.success(handleChatGroup(result));\n\t}, arg);\n}\n\nfunction kickGroupMember(arg) {\n\tvar iqBody = {\n\t\tid: Math.uuid(),\n\t\tmember: arg.member,\n\t\tfrom: _manager.YYIMChat.getUserBareJID(),\n\t\tto: arg.to\n\t};\n\n\t_manager.YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.KICK_GROUP_MEMBER.SEND), function (result, _arg) {\n\t\t_arg.complete && _arg.complete();\n\t\t_arg.success && _arg.success(handleChatGroup(result));\n\t}, arg);\n}\n\nfunction exitChatGroup(arg) {\n\tvar iqBody = {\n\t\tid: Math.uuid(),\n\t\tfrom: _manager.YYIMChat.getUserBareJID(),\n\t\tto: arg.to\n\t};\n\n\t_manager.YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.EXIT_GROUP.SEND), function (result, _arg) {\n\t\t_arg.complete && _arg.complete();\n\t\t_arg.success && _arg.success({\n\t\t\tfrom: _manager.YYIMChat.getJIDUtil().getID(result.from),\n\t\t\tid: result.id,\n\t\t\tto: _manager.YYIMChat.getJIDUtil().getID(result.to)\n\t\t});\n\t}, arg);\n}\n\nfunction handleChatGroup(result) {\n\tif (!result) {\n\t\treturn;\n\t}\n\n\tvar j = result.members.length;\n\tvar members = [];\n\twhile (j--) {\n\t\tvar member = result.members[j];\n\t\tmember.id = _manager.YYIMChat.getJIDUtil().getID(member.jid);\n\t\tmembers.push(member);\n\t}\n\tvar chatGroup = {\n\t\tid: _manager.YYIMChat.getJIDUtil().getID(result.from || result.jid),\n\t\tname: result.naturalLanguageName || result.roomname || result.name,\n\t\tphoto: result.photo,\n\t\tnumberOfMembers: result.numberOfMembers,\n\t\tsuperLarge: result.superLarge,\n\t\tcollected: result.collected,\n\t\ttype: result.type,\n\t\tsafeModel: result.safeModel,\n\t\tcreationdate: result.creationdate,\n\t\tcreater: _manager.YYIMChat.getJIDUtil().getID(result.operator),\n\t\tmembers: members,\n\t\towners: result.owners,\n\t\ttag: result.tag\n\t};\n\treturn chatGroup;\n}\n\nfunction transferChatGroupOwner(result) {\n\tif (!result) {\n\t\treturn;\n\t}\n\n\tvar j = result.memberItems.length;\n\tvar members = [];\n\twhile (j--) {\n\t\tvar member = result.memberItems[j];\n\t\tmember.id = _manager.YYIMChat.getJIDUtil().getID(member.jid);\n\t\tmembers.push(member);\n\t}\n\tvar chatGroup = {\n\t\tid: _manager.YYIMChat.getJIDUtil().getID(result.from),\n\t\tmembers: members\n\t};\n\treturn chatGroup;\n}\n\nfunction collectChatGroup(arg) {\n\tvar iqBody = {\n\t\tid: Math.uuid(),\n\t\tfrom: _manager.YYIMChat.getUserBareJID(),\n\t\tto: arg.to,\n\t\ttype: arg.type\n\t};\n\n\t_manager.YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.COLLECT_GROUP.SEND), function (result, _arg) {\n\t\t_arg.complete && _arg.complete();\n\t\t_arg.success && _arg.success({\n\t\t\tfrom: _manager.YYIMChat.getJIDUtil().getID(_arg.to),\n\t\t\tid: result.id,\n\t\t\tto: _manager.YYIMChat.getUserID(),\n\t\t\ttype: _arg.type,\n\t\t\tcode: result.code,\n\t\t\tmessage: result.message\n\t\t});\n\t}, arg);\n}\n\nfunction getSharedFiles(arg) {\n\tvar type = [_manager.YYIMChat.getConstants().CHAT_TYPE.CHAT, _manager.YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT, _manager.YYIMChat.getConstants().CHAT_TYPE.PUB_ACCOUNT].indexOf(arg.type) > -1 ? arg.type : _manager.YYIMChat.getConstants().CHAT_TYPE.CHAT;\n\n\tvar url = _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/shareattachment/persional/attachment/' + _manager.YYIMChat.getUserID() + '/' + arg.id;\n\tif (type == _manager.YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT) {\n\t\turl = _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/shareattachment/room/attachment/' + arg.id + '/' + _manager.YYIMChat.getUserID();\n\t}\n\n\tjQuery.ajax({\n\t\turl: url,\n\t\tdata: {\n\t\t\ttoken: _manager.YYIMChat.getToken(),\n\t\t\tfileType: ['file', 'image', 'microvideo'].indexOf(arg.fileType) > -1 ? arg.fileType : 'file',\n\t\t\tstart: parseInt(arg.start) || 0,\n\t\t\tsize: parseInt(arg.size) || 20\n\t\t},\n\t\ttype: 'get',\n\t\tdataType: 'json',\n\t\tcache: false,\n\t\tsuccess: function success(data) {\n\t\t\tvar items = data.list || [];\n\t\t\ti = items.length;\n\t\t\twhile (i--) {\n\t\t\t\tvar item = items[i];\n\t\t\t\titem.id = item.packetId;\n\t\t\t\titem.creator = _manager.YYIMChat.getJIDUtil().getID(item.creator);\n\t\t\t\titem.owner = [];\n\t\t\t\tif (type == _manager.YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT) {\n\t\t\t\t\titem.owner.push({\n\t\t\t\t\t\tid: _manager.YYIMChat.getJIDUtil().getID(item.ownerId),\n\t\t\t\t\t\ttype: type\n\t\t\t\t\t});\n\t\t\t\t} else {\n\t\t\t\t\tvar temp = item.ownerId.split('::');\n\t\t\t\t\ttemp[0] = _manager.YYIMChat.getJIDUtil().getID(temp[0]);\n\t\t\t\t\ttemp[1] = _manager.YYIMChat.getJIDUtil().getID(temp[1]);\n\t\t\t\t\titem.owner.push({\n\t\t\t\t\t\tid: temp[0],\n\t\t\t\t\t\ttype: type\n\t\t\t\t\t}, {\n\t\t\t\t\t\tid: temp[1],\n\t\t\t\t\t\ttype: type\n\t\t\t\t\t});\n\t\t\t\t}\n\t\t\t\tdelete item.ownerId;\n\t\t\t}\n\t\t\targ.success && arg.success(data);\n\t\t\targ = null;\n\t\t},\n\t\terror: function error(xhr) {\n\t\t\ttry {\n\t\t\t\targ.error && arg.error(JSON.parse(xhr.responseText));\n\t\t\t\targ = null;\n\t\t\t} catch (e) {\n\t\t\t\targ.error && arg.error();\n\t\t\t\targ = null;\n\t\t\t}\n\t\t}\n\t});\n}\n\nfunction getGroupMembers(arg) {\n\tjQuery.ajax({\n\t\turl: _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMChat.getUserID() + '/room/members?mucId=' + arg.id + '&token=' + _manager.YYIMChat.getToken(),\n\t\ttype: 'get',\n\t\tdataType: 'json',\n\t\tcache: false,\n\t\tsuccess: function success(result) {\n\t\t\tif (result && result.length) {\n\t\t\t\tvar index = result.length;\n\t\t\t\twhile (index--) {\n\t\t\t\t\tresult[index].id = _manager.YYIMChat.getJIDUtil().getID(result[index].jid);\n\t\t\t\t}\n\t\t\t}\n\t\t\targ.success && arg.success(result || []);\n\t\t\targ = null;\n\t\t},\n\t\terror: function error() {\n\t\t\ttry {\n\t\t\t\targ.error && arg.error(JSON.parse(xhr.responseText));\n\t\t\t\targ = null;\n\t\t\t} catch (e) {\n\t\t\t\targ.error && arg.error();\n\t\t\t\targ = null;\n\t\t\t}\n\t\t}\n\t});\n}\n\nfunction joinChatGroup(arg) {\n\tvar presenceBody = {\n\t\tto: arg.jid + \"/\" + _manager.YYIMChat.getUserNode()\n\t};\n\n\t_manager.YYIMChat.getConnection().send(new JumpPacket(presenceBody, OPCODE.CHATGROUP.SEND), function (joinResult, _arg) {\n\t\tif (joinResult && joinResult.code == '40301') {\n\t\t\t_arg.error && _arg.error({\n\t\t\t\tcode: joinResult.code,\n\t\t\t\tmessage: joinResult.message\n\t\t\t});\n\t\t} else if (joinResult) {\n\t\t\tjoinResult.id = _manager.YYIMChat.getJIDUtil().getID(joinResult.from);\n\t\t\t_arg.success && _arg.success(joinResult);\n\t\t}\n\t}, arg);\n}\n\nfunction monitor() {\n\t_manager.YYIMChat.getConnection().registerHandler(OPCODE.ON_GROUP_UPDATE.KEY, function (packet) {\n\t\tvar chatgroup = handleChatGroup(packet);\n\t\tif (chatgroup) {\n\t\t\t_manager.YYIMChat.onGroupUpdate(chatgroup);\n\t\t}\n\t});\n\n\t_manager.YYIMChat.getConnection().registerHandler(OPCODE.ON_GROUP_TRANSFER.KEY, function (packet) {\n\t\tvar chatgroup = transferChatGroupOwner(packet);\n\t\tif (chatgroup) {\n\t\t\t_manager.YYIMChat.onTransferGroupOwner(chatgroup);\n\t\t}\n\t});\n\n\t_manager.YYIMChat.getConnection().registerHandler(OPCODE.KICKED_GROUP.KEY, function (packet) {\n\t\tvar result = {\n\t\t\tid: packet.id,\n\t\t\tfrom: _manager.YYIMChat.getJIDUtil().getID(packet.from),\n\t\t\tto: _manager.YYIMChat.getJIDUtil().getID(packet.to)\n\t\t};\n\t\tif (result) {\n\t\t\t_manager.YYIMChat.onKickedOutGroup(result);\n\t\t}\n\t});\n}\n\nexports.monitor = monitor;\nexports.queryChatGroup = queryChatGroup;\nexports.getGroupMembers = getGroupMembers;\nexports.joinChatGroup = joinChatGroup;\nexports.getChatGroupInfo = getChatGroupInfo;\nexports.getChatGroups = getChatGroups;\nexports.createChatGroup = createChatGroup;\nexports.transferChatGroup = transferChatGroup;\nexports.dismissChatGroup = dismissChatGroup;\nexports.getSharedFiles = getSharedFiles;\nexports.inviteGroupMember = inviteGroupMember;\nexports.modifyChatGroupInfo = modifyChatGroupInfo;\nexports.kickGroupMember = kickGroupMember;\nexports.exitChatGroup = exitChatGroup;\nexports.collectChatGroup = collectChatGroup;\n\n//# sourceURL=webpack:///./src/module/group/Manager.js?");

/***/ }),

/***/ "./src/module/input_state/Extender.js":
/*!********************************************!*\
  !*** ./src/module/input_state/Extender.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _manager = __webpack_require__(/*! ../../core/manager */ \"./src/core/manager.js\");\n\nvar _Manager = __webpack_require__(/*! ./Manager */ \"./src/module/input_state/Manager.js\");\n\n_manager.YYIMChat.setBackhander({\n\t'monitor': {\n\t\t'inputStateMonitor': _Manager.monitor\n\t}\n});\n\n_manager.YYIMManager.prototype.inputStateChange = function (arg) {\n\tif (arg && arg.to) {\n\t\targ.contentType = arg.contentType || _manager.YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.TEXT;\n\t\t(0, _Manager.inputStateChange)(arg);\n\t} else {\n\t\targ && arg.error && arg.error();\n\t}\n};\n\n//# sourceURL=webpack:///./src/module/input_state/Extender.js?");

/***/ }),

/***/ "./src/module/input_state/Manager.js":
/*!*******************************************!*\
  !*** ./src/module/input_state/Manager.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.inputStateChange = exports.monitor = undefined;\n\nvar _manager = __webpack_require__(/*! ../../core/manager */ \"./src/core/manager.js\");\n\nfunction monitor() {\n\t_manager.YYIMChat.getConnection().registerHandler(OPCODE.INPUT_STATE.KEY, function (state) {\n\t\tif (state && state.from) {\n\t\t\tstate.from = _manager.YYIMChat.getJIDUtil().getID(state.from);\n\t\t}\n\t\tif (state && state.to) {\n\t\t\tstate.to = _manager.YYIMChat.getJIDUtil().getID(state.to);\n\t\t}\n\t\tonInputStateChanged(state);\n\t});\n}\n\nvar onInputState = {};\nfunction onInputStateChanged(arg) {\n\tonInputState[arg.from] = onInputState[arg.from] || {\n\t\ttimer: 0,\n\t\tparam: arg\n\t};\n\n\tonInputState[arg.from].param = arg;\n\n\tif (onInputState[arg.from].timer) {\n\t\tclearTimeout(onInputState[arg.from].timer);\n\t\tonInputState[arg.from].timer = 0;\n\t}\n\n\tif (arg.typing == 0) {\n\t\tvar param = onInputState[arg.from].param;\n\t\tonInputState[arg.from] = null;\n\t\t_manager.YYIMChat.onInputStateChanged(param);\n\t} else {\n\t\t_manager.YYIMChat.onInputStateChanged(onInputState[arg.from].param);\n\t\tonInputState[arg.from].timer = setTimeout(function () {\n\t\t\tvar param = onInputState[arg.from].param;\n\t\t\tparam.typing = 0;\n\t\t\tonInputState[arg.from] = null;\n\t\t\t_manager.YYIMChat.onInputStateChanged(param);\n\t\t}, onInputState[arg.from].param.timeout || _manager.YYIMChat.getConfig().INPUT_STATE.INTERVAL);\n\t}\n}\n\nfunction sendInputState(arg) {\n\tvar msgBody = {\n\t\t\"id\": Math.uuid(),\n\t\t\"to\": _manager.YYIMChat.getJIDUtil().buildUserJID(_manager.YYIMChat.getJIDUtil().getNode(arg.to)),\n\t\t\"contentType\": arg.contentType,\n\t\t\"typing\": arg.typing\n\t};\n\n\t_manager.YYIMChat.getConnection().send(new JumpPacket(msgBody, OPCODE.INPUT_STATE.SEND));\n}\n\nvar inputState = {};\nfunction inputStateChange(arg) {\n\tinputState[arg.to] = inputState[arg.to] || {\n\t\ttimer: 0,\n\t\tparam: arg,\n\t\tlastUpdateTime: 0,\n\t\tlastSendTime: 0\n\t};\n\n\tif (inputState[arg.to].timer) {\n\t\tclearTimeout(inputState[arg.to].timer);\n\t\tinputState[arg.to].timer = 0;\n\t}\n\n\tinputState[arg.to].lastUpdateTime = new Date().getTime();\n\n\tif (inputState[arg.to].lastUpdateTime - inputState[arg.to].lastSendTime > _manager.YYIMChat.getConfig().INPUT_STATE.INTERVAL || arg.contentType != inputState[arg.to].param.contentType) {\n\n\t\tinputState[arg.to].param = arg;\n\t\tinputState[arg.to].param.typing = 1;\n\t\tinputState[arg.to].lastSendTime = inputState[arg.to].lastUpdateTime;\n\t\tsendInputState(inputState[arg.to].param);\n\t}\n\n\tinputState[arg.to].timer = setTimeout(function () {\n\t\tvar param = inputState[arg.to].param;\n\t\tparam.typing = 0;\n\t\tinputState[arg.to] = null;\n\n\t\tsendInputState(param);\n\t}, _manager.YYIMChat.getConfig().INPUT_STATE.INTERVAL);\n}\n\nexports.monitor = monitor;\nexports.inputStateChange = inputStateChange;\n\n//# sourceURL=webpack:///./src/module/input_state/Manager.js?");

/***/ }),

/***/ "./src/module/message/Extender.js":
/*!****************************************!*\
  !*** ./src/module/message/Extender.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _manager = __webpack_require__(/*! ../../core/manager */ \"./src/core/manager.js\");\n\nvar _Manager = __webpack_require__(/*! ./Manager */ \"./src/module/message/Manager.js\");\n\n_manager.YYIMChat.setBackhander({\n\t'monitor': {\n\t\t'messageMonitor': _Manager.monitor\n\t},\n\t'initCallback': {\n\t\t'message': function message(options) {\n\t\t\t_manager.YYIMChat.onReceipts = options.onReceipts || function () {};\n\t\t\t_manager.YYIMChat.onMessage = options.onMessage || function () {};\n\t\t\t_manager.YYIMChat.onTransparentMessage = options.onTransparentMessage || function () {};\n\t\t}\n\t}\n});\n\n_manager.YYIMManager.prototype.getHistoryMessage = function (arg) {\n\targ = arg || {};\n\n\tif (!YYIMUtil['isWhateType'](arg.start, 'Number')) {\n\t\targ.start = 0;\n\t}\n\n\tif (!YYIMUtil['isWhateType'](arg.size, 'Number')) {\n\t\targ.size = 100;\n\t}\n\n\t(0, _Manager.getHistoryMessage)(arg);\n};\n\n_manager.YYIMManager.prototype.sendReadedReceiptsPacket = function (arg) {\n\tif (arg && arg.id) {\n\t\targ.state = 2;\n\t\t(0, _Manager.sendReceiptsPacket)(arg);\n\t}\n};\n\n_manager.YYIMManager.prototype.sendFormMessage = function (arg) {\n\tvar that = this;\n\tvar file = arg.file;\n\n\tvar param = {\n\t\ttoken: this.getToken(),\n\t\tcreator: this.getUserNode(),\n\t\treceiver: this.getJIDUtil().getNode(arg.to),\n\t\tmediaType: arg.mediaType || 2,\n\t\trandomId: Math.uuid(),\n\t\tname: file.name,\n\t\tsize: file.size\n\t};\n\tvar url = _manager.YYIMChat.getConfig().SERVLET.REST_RESOURCE_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/upload';\n\turl += '?' + jQuery.param(param);\n\n\tjQuery.ajax({\n\t\txhr: function xhr() {\n\t\t\tvar xhr = new window.XMLHttpRequest();\n\n\t\t\txhr.upload.addEventListener(\"progress\", function (evt) {\n\t\t\t\tif (evt.lengthComputable) {\n\t\t\t\t\tvar percentComplete = evt.loaded / evt.total;\n\t\t\t\t\targ.progress && arg.progress({\n\t\t\t\t\t\tloaded: evt.loaded,\n\t\t\t\t\t\ttotal: evt.total,\n\t\t\t\t\t\tpercent: percentComplete\n\t\t\t\t\t});\n\t\t\t\t}\n\t\t\t}, false);\n\n\t\t\txhr.addEventListener(\"progress\", function (evt) {\n\t\t\t\tif (evt.lengthComputable) {\n\t\t\t\t\tvar percentComplete = evt.loaded / evt.total;\n\t\t\t\t\targ.progress && arg.progress({\n\t\t\t\t\t\tloaded: evt.loaded,\n\t\t\t\t\t\ttotal: evt.total,\n\t\t\t\t\t\tpercent: percentComplete\n\t\t\t\t\t});\n\t\t\t\t}\n\t\t\t}, false);\n\t\t\treturn xhr;\n\t\t},\n\t\turl: url,\n\t\ttype: 'post',\n\t\tdataType: 'json',\n\t\tdata: arg.data,\n\t\tprocessData: false,\n\t\tcontentType: false,\n\t\tsuccess: function success(result) {\n\t\t\tif (result && result.attachId) {\n\t\t\t\tvar CONTENT_TYPE = _manager.YYIMChat.getConstants().MESSAGE_CONTENT_TYPE;\n\t\t\t\targ.fileUploaded && arg.fileUploaded(result);\n\t\t\t\tthat.sendMessage({\n\t\t\t\t\tid: arg.id,\n\t\t\t\t\tto: arg.to,\n\t\t\t\t\tspaceId: arg.spaceId,\n\t\t\t\t\ttype: arg.type,\n\t\t\t\t\tcontent: new IMFile({\n\t\t\t\t\t\tname: file.name,\n\t\t\t\t\t\tpath: result.attachId,\n\t\t\t\t\t\tsize: file.size,\n\t\t\t\t\t\toriginal: param.mediaType === 1 ? 1 : null\n\t\t\t\t\t}),\n\t\t\t\t\tcontentType: param.mediaType === 1 ? CONTENT_TYPE.IMAGE : CONTENT_TYPE.FILE,\n\t\t\t\t\tsuccess: arg.success,\n\t\t\t\t\terror: arg.error\n\t\t\t\t});\n\t\t\t} else {\n\t\t\t\targ.error && arg.error();\n\t\t\t}\n\t\t\targ = null;\n\t\t},\n\t\terror: arg.error\n\t});\n};\n\n_manager.YYIMManager.prototype.sendShareMessage = function (arg) {\n\targ.contentType = _manager.YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.SHARE;\n\tthis.sendMessage(arg);\n};\n\n_manager.YYIMManager.prototype.sendTextMessage = function (arg) {\n\targ.content = arg.msg || arg.content;\n\targ.contentType = _manager.YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.TEXT;\n\tthis.sendMessage(arg);\n};\n\n_manager.YYIMManager.prototype.sendMessage = function (arg) {\n\targ.id = arg.id || Math.uuid();\n\targ.type = arg.type || _manager.YYIMChat.getConstants().CHAT_TYPE.CHAT;\n\targ.body = {\n\t\tdateline: arg.dateline,\n\t\textend: arg.extend,\n\t\tcontent: arg.content,\n\t\tcontentType: arg.contentType,\n\t\tsceneParams: arg.sceneParams\n\t};\n\n\tif (arg.type === _manager.YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT && YYIMArrayUtil.isArray(arg.atuser)) {\n\t\targ.body.atuser = arg.atuser;\n\t}\n\n\t(0, _Manager.sendMessage)(arg);\n};\n\n_manager.YYIMManager.prototype.revokeMessage = function (arg) {\n\tif (arg && arg.id) {\n\t\t(0, _Manager.revokeMessage)(arg);\n\t} else {\n\t\targ && arg.error && arg.error();\n\t}\n};\n\n_manager.YYIMManager.prototype.sendPic = function (arg) {\n\targ = arg || {};\n\tif (YYIMUtil['isWhateType'](arg.chatInfo, 'Function')) {\n\t\tthis.uploader(jQuery('#' + arg.fileInputId)[0] || arg.fileInputId, {\n\t\t\tdrop_element: arg.drop_element,\n\t\t\tchatInfo: arg.chatInfo,\n\t\t\tfileFiltered: arg.fileFiltered,\n\t\t\tbeforeUpload: arg.beforeUpload,\n\t\t\tmediaType: 1,\n\t\t\tsuccess: function success(result) {\n\t\t\t\t(0, _Manager.sendMessage)({\n\t\t\t\t\tid: result.chatInfo.messageId || Math.uuid(),\n\t\t\t\t\tspaceId: result.chatInfo.spaceId,\n\t\t\t\t\tbody: {\n\t\t\t\t\t\textend: result.chatInfo.extend,\n\t\t\t\t\t\tcontent: new IMFile({\n\t\t\t\t\t\t\tid: result.file.id,\n\t\t\t\t\t\t\tname: result.file.name,\n\t\t\t\t\t\t\tpath: result.data && result.data.attachId,\n\t\t\t\t\t\t\tsize: result.file.size,\n\t\t\t\t\t\t\toriginal: 1\n\t\t\t\t\t\t}),\n\t\t\t\t\t\tcontentType: _manager.YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.IMAGE\n\t\t\t\t\t},\n\t\t\t\t\tto: result.chatInfo.to,\n\t\t\t\t\ttype: result.chatInfo.type,\n\t\t\t\t\tsuccess: function success(data) {\n\t\t\t\t\t\targ.success && arg.success(data);\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t\t\targ.fileUploaded && arg.fileUploaded(result);\n\t\t\t},\n\t\t\terror: arg.error,\n\t\t\tprogress: arg.progress\n\t\t});\n\t} else {\n\t\targ && arg.error && arg.error();\n\t}\n};\n\n_manager.YYIMManager.prototype.sendFile = function (arg) {\n\tvar that = this;\n\targ = arg || {};\n\tif (YYIMUtil['isWhateType'](arg.chatInfo, 'Function')) {\n\t\tthis.uploader(jQuery('#' + arg.fileInputId)[0] || arg.fileInputId, {\n\t\t\tdrop_element: arg.drop_element,\n\t\t\tchatInfo: arg.chatInfo,\n\t\t\tfileFiltered: arg.fileFiltered,\n\t\t\tbeforeUpload: arg.beforeUpload,\n\t\t\tmediaType: 3,\n\t\t\tsuccess: function success(result) {\n\t\t\t\tvar mediaType = 3;\n\n\t\t\t\tif (_manager.YYIMChat.getConfig().UPLOAD.IMAGE_TYPES.test(result.file.name)) {\n\t\t\t\t\tmediaType = 1;\n\t\t\t\t}\n\n\t\t\t\tvar file = new IMFile({\n\t\t\t\t\tid: result.file.id,\n\t\t\t\t\tname: result.file.name,\n\t\t\t\t\tpath: result.data && result.data.attachId,\n\t\t\t\t\tsize: result.file.size\n\t\t\t\t});\n\n\t\t\t\tif (mediaType === 1) {\n\t\t\t\t\tfile.build({\n\t\t\t\t\t\toriginal: 1\n\t\t\t\t\t});\n\t\t\t\t}\n\n\t\t\t\tif (result && result['data'] && result['data']['data'] && result['data']['data']['fileUrl']) {\n\t\t\t\t\tfile.build({\n\t\t\t\t\t\tpath: result['data']['data']['fileUrl'],\n\t\t\t\t\t\tfid: result['data']['data']['fid']\n\t\t\t\t\t});\n\t\t\t\t}\n\n\t\t\t\tif (YYIMUtil['isWhateType'](result['data'], 'Array')) {\n\t\t\t\t\tfile = new IMFile({\n\t\t\t\t\t\tid: result.file.id,\n\t\t\t\t\t\tname: result.file.name,\n\t\t\t\t\t\tpath: result['data'][4],\n\t\t\t\t\t\tsize: result.file.size,\n\t\t\t\t\t\tfid: result['data'][0]\n\t\t\t\t\t});\n\t\t\t\t}\n\n\t\t\t\t(0, _Manager.sendMessage)({\n\t\t\t\t\tid: result.chatInfo.messageId || Math.uuid(),\n\t\t\t\t\tspaceId: result.chatInfo.spaceId,\n\t\t\t\t\tbody: {\n\t\t\t\t\t\textend: result.chatInfo.extend,\n\t\t\t\t\t\tcontent: file,\n\t\t\t\t\t\tcontentType: mediaType === 1 ? that.getConstants().MESSAGE_CONTENT_TYPE.IMAGE : that.getConstants().MESSAGE_CONTENT_TYPE.FILE\n\t\t\t\t\t},\n\t\t\t\t\tto: result.chatInfo.to,\n\t\t\t\t\ttype: result.chatInfo.type,\n\t\t\t\t\tsuccess: function success(data) {\n\t\t\t\t\t\targ.success && arg.success(data);\n\t\t\t\t\t}\n\t\t\t\t});\n\n\t\t\t\targ.fileUploaded && arg.fileUploaded(result);\n\t\t\t},\n\t\t\terror: arg.error,\n\t\t\tprogress: arg.progress\n\t\t});\n\t} else {\n\t\targ && arg.error && arg.error();\n\t}\n};\n\n//# sourceURL=webpack:///./src/module/message/Extender.js?");

/***/ }),

/***/ "./src/module/message/Manager.js":
/*!***************************************!*\
  !*** ./src/module/message/Manager.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.sendReceiptsPacket = exports.revokeMessage = exports.getHistoryMessage = exports.sendMessage = exports.monitor = undefined;\n\nvar _stringify = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ \"./node_modules/_babel-runtime@6.26.0@babel-runtime/core-js/json/stringify.js\");\n\nvar _stringify2 = _interopRequireDefault(_stringify);\n\nvar _YYAIAbility = __webpack_require__(/*! ../../util/YYAIAbility */ \"./src/util/YYAIAbility.js\");\n\nvar _YYAIAbility2 = _interopRequireDefault(_YYAIAbility);\n\nvar _manager = __webpack_require__(/*! ../../core/manager */ \"./src/core/manager.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar receivedMsgIds = new BaseList();\n\nfunction monitor() {\n\t_manager.YYIMChat.getConnection().registerHandler(OPCODE.USER_MESSAGE.KEY, function (packet) {\n\t\tparseMessage(packet, _manager.YYIMChat.getConstants().CHAT_TYPE.CHAT);\n\t});\n\n\t_manager.YYIMChat.getConnection().registerHandler(OPCODE.CHATGROUP_MESSAGE.KEY, function (packet) {\n\t\tparseMessage(packet, _manager.YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT);\n\t});\n\n\t_manager.YYIMChat.getConnection().registerHandler(OPCODE.PUBACCOUNT_MESSAGE.KEY, function (packet) {\n\t\tparseMessage(packet, _manager.YYIMChat.getConstants().CHAT_TYPE.PUB_ACCOUNT);\n\t});\n\n\t_manager.YYIMChat.getConnection().registerHandler(OPCODE.RECEIPTS.KEY, function (receipts) {\n\t\treceipts.type = _manager.YYIMChat.getJIDUtil().getChatTypeByJid(receipts.to);\n\t\treceipts.from = _manager.YYIMChat.getJIDUtil().getID(receipts.from);\n\t\treceipts.to = _manager.YYIMChat.getJIDUtil().getID(receipts.to);\n\n\t\t_manager.YYIMChat.onReceipts(receipts);\n\t});\n\n\t_manager.YYIMChat.getConnection().registerHandler(OPCODE.SYNC_MESSAGE.KEY, function (packet) {\n\t\tparseMessage(packet, packet.type);\n\t});\n\n\t_manager.YYIMChat.getConnection().registerHandler(OPCODE.USERONLINEDELIVERPACKET.KEY, function (packet) {\n\t\tparseTransparentMessage(packet, _manager.YYIMChat.getConstants().CHAT_TYPE.CHAT);\n\t});\n\n\t_manager.YYIMChat.getConnection().registerHandler(OPCODE.MUCONLINEDELIVERPACKET.KEY, function (packet) {\n\t\tparseTransparentMessage(packet, _manager.YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT);\n\t});\n\n\t_manager.YYIMChat.getConnection().registerHandler(OPCODE.PUBONLINEDELIVERPACKET.KEY, function (packet) {\n\t\tparseTransparentMessage(packet, _manager.YYIMChat.getConstants().CHAT_TYPE.PUB_ACCOUNT);\n\t});\n\n\t_manager.YYIMChat.getConnection().registerHandler(OPCODE.REMINDSETTINGONLINEDELIVERPACKET.KEY, function (packet) {\n\t\tparseTransparentMessage(packet);\n\t});\n};\n\nfunction parseTransparentMessage(packet, type) {\n\tif (receivedMsgIds.get(packet.id)) {\n\t\treturn;\n\t}\n\treceivedMsgIds.set(packet.id, packet);\n\n\tpacket.type = type || _manager.YYIMChat.getJIDUtil().getChatTypeByJid(packet.from);\n\n\tpacket.to = _manager.YYIMChat.getJIDUtil().getID(packet.to) || _manager.YYIMChat.getUserID();\n\n\tpacket.from = packet.type != _manager.YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT ? _manager.YYIMChat.getJIDUtil().getID(packet.from) : {\n\t\troom: _manager.YYIMChat.getJIDUtil().getID(packet.from),\n\t\troster: _manager.YYIMChat.getJIDUtil().getID(_manager.YYIMChat.getJIDUtil().getResource(packet.from))\n\t};\n\n\tif (packet.attributes) {\n\t\tif (packet.attributes.receiver) {\n\t\t\tpacket.attributes.receiver = _manager.YYIMChat.getJIDUtil().getID(packet.attributes.receiver);\n\t\t}\n\n\t\tif (packet.attributes.bareJID) {\n\t\t\tpacket.attributes.bareJID = {\n\t\t\t\tid: _manager.YYIMChat.getJIDUtil().getID(packet.attributes.bareJID),\n\t\t\t\ttype: _manager.YYIMChat.getJIDUtil().getChatTypeByJid(packet.attributes.bareJID)\n\t\t\t};\n\t\t}\n\n\t\tif (packet.attributes.userJids && _manager.YYIMChat.getUtil()['isWhateType'](packet.attributes.userJids, 'Array')) {\n\t\t\tfor (var x in packet.attributes.userJids) {\n\t\t\t\tif (packet.attributes.userJids.hasOwnProperty(x)) {\n\t\t\t\t\tpacket.attributes.userJids[x] = _manager.YYIMChat.getJIDUtil().getID(packet.attributes.userJids[x]);\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\ttry {\n\t\t_manager.YYIMChat.onTransparentMessage(packet);\n\t} catch (e) {\n\t\t_manager.YYIMChat.log(\"TransparentMessHandleError:\", 0, packet);\n\t}\n}\n\nfunction parseMessageBody(packet, type) {\n\n\tvar packetContent;\n\ttry {\n\t\tpacketContent = JSON.parse(packet.content);\n\n\t\tif (packetContent && packetContent.content) {\n\t\t\ttry {\n\t\t\t\tif (isNaN(Number(packetContent.content)) && packet.contentType != _manager.YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.TEXT) {\n\t\t\t\t\tpacketContent.content = JSON.parse(packetContent.content);\n\t\t\t\t}\n\t\t\t} catch (e) {}\n\t\t}\n\t} catch (e) {\n\t\tpacketContent = packet.content;\n\t}\n\n\tvar content = packetContent;\n\n\tif (typeof packetContent.content != 'undefined') {\n\t\tcontent = packetContent.content;\n\t}\n\n\tvar body = {\n\t\tcontent: content,\n\t\tcontentType: packet.contentType,\n\t\tdateline: packet.dateline || packet.ts,\n\t\tatuser: packetContent.atuser,\n\t\textend: packetContent.extend };\n\n\tif (packet.contentType == _manager.YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.MERGEFORWARD) {\n\t\tbody.title = packetContent.title;\n\t\tbody.containfileNum = packetContent.containfileNum;\n\t\tbody.safeMode = packetContent.safeMode;\n\n\t\tif (packetContent.messages) {\n\t\t\tbody.messages = [];\n\t\t\tfor (var x in packetContent.messages) {\n\t\t\t\tif (packetContent.messages.hasOwnProperty(x)) {\n\t\t\t\t\tvar item = arguments.callee(packetContent.messages[x], type);\n\t\t\t\t\tif (item) {\n\t\t\t\t\t\tbody.messages.push(item);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\tvar from = type == _manager.YYIMChat.getConstants().CHAT_TYPE.CHAT ? _manager.YYIMChat.getJIDUtil().getID(packet.sender || packet.from) : {\n\t\troom: _manager.YYIMChat.getJIDUtil().getID(packet.mucid || packet.sender || packet.from),\n\t\troster: _manager.YYIMChat.getJIDUtil().getID(_manager.YYIMChat.getJIDUtil().getResource(packet.sender || packet.from) || packet.sender)\n\t};\n\n\tvar result = {\n\t\tid: packet.id || packet.packetId,\n\t\ttype: type,\n\t\tfrom: from,\n\t\tdateline: body.dateline,\n\t\tsessionVersion: packet.sessionVersion,\n\t\tdata: body\n\t};\n\n\tif (type == _manager.YYIMChat.getConstants().CHAT_TYPE.CHAT) {\n\t\tresult.resource = _manager.YYIMChat.getJIDUtil().getResource(packet.sender || packet.from);\n\t\tresult.to = _manager.YYIMChat.getJIDUtil().getID(packet.receiver || packet.to);\n\t} else {\n\t\tresult.to = _manager.YYIMChat.getUserID();\n\t}\n\n\tif (body.contentType) {\n\t\tif (result.data.content && result.data.content.path) {\n\t\t\tresult.data.content.attachId = result.data.content.path;\n\t\t\tresult.data.content.path = _manager.YYIMChat.getFileUrl(result.data.content.path);\n\n\t\t\tif (body.contentType == _manager.YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.FILE || body.contentType == _manager.YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.IMAGE) {\n\t\t\t\tresult.data.content.size = result.data.content.size || 0;\n\t\t\t}\n\t\t}\n\n\t\tif (result.data && (packet.receipts === true || _manager.YYIMChat.getJIDUtil().getID(packet.sender || packet.from) != _manager.YYIMChat.getUserID())) {\n\n\t\t\tresult.data.receipt = {\n\t\t\t\tto: packet.mucid || packet.sender || packet.from,\n\t\t\t\tid: packet.id || packet.packetId,\n\t\t\t\ttype: type,\n\t\t\t\tsessionVersion: packet.sessionVersion\n\t\t\t};\n\n\t\t\tif (packet.receipts === true) {\n\t\t\t\tsendReceiptsPacket(result.data.receipt);\n\t\t\t}\n\t\t}\n\t\treturn result;\n\t}\n}\n\nfunction parseMessage(packet, type) {\n\tif (receivedMsgIds.get(packet.id)) {\n\t\treturn;\n\t}\n\treceivedMsgIds.set(packet.id, packet);\n\n\tvar message = parseMessageBody(packet, type);\n\n\tif (message) {\n\t\ttry {\n\t\t\t_manager.YYIMChat.onMessage(message);\n\t\t} catch (e) {\n\t\t\t_manager.YYIMChat.log(\"ParseMessageError:\", 0, message, e);\n\t\t}\n\t}\n}\n\nfunction sendReceiptsPacket(arg) {\n\targ = arg || {};\n\tvar Jid = _manager.YYIMChat.getJIDUtil().buildUserJID(_manager.YYIMChat.getJIDUtil().getNode(arg.to));\n\tif (arg.type == _manager.YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT) {\n\t\tJid = _manager.YYIMChat.getJIDUtil().buildChatGroupJID(_manager.YYIMChat.getJIDUtil().getNode(arg.to));\n\t} else if (arg.type == _manager.YYIMChat.getConstants().CHAT_TYPE.PUB_ACCOUNT) {\n\t\tJid = _manager.YYIMChat.getJIDUtil().buildPubAccountJID(_manager.YYIMChat.getJIDUtil().getNode(arg.to));\n\t}\n\tvar receiptsPacket = new JumpPacket({\n\t\tto: Jid,\n\t\tdateline: new Date().getTime(),\n\t\tsessionVersion: arg.sessionVersion,\n\t\tid: arg.id,\n\t\tstate: arg.state\n\t}, OPCODE.RECEIPTS.SEND);\n\t_manager.YYIMChat.getConnection().send(receiptsPacket);\n}\n\nfunction sendMessage(arg) {\n\tvar body = arg.body || {};\n\n\tbody.extend = handleRequestParams(body);\n\n\tif (body.extend && typeof body.extend != 'string') {\n\t\ttry {\n\t\t\tbody.extend = (0, _stringify2.default)(body.extend);\n\t\t} catch (e) {\n\t\t\tdelete body.extend;\n\t\t\t_manager.YYIMChat.log('ExtendIllegal', 0, e.message);\n\t\t}\n\t}\n\n\tvar to,\n\t    msgBody = {\n\t\tid: arg.id,\n\t\tspaceId: arg.spaceId,\n\t\ttype: arg.type || _manager.YYIMChat.getConstants().CHAT_TYPE.CHAT,\n\t\tcontentType: body.contentType || _manager.YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.TEXT,\n\t\tdateline: body.dateline || (_manager.YYIMChat.getConfig().TIMECORRECTION.AUTOCORRECTION ? new Date().getTime() + _manager.YYIMChat.getConfig().TIMECORRECTION.RESULT : new Date().getTime()),\n\t\tcontent: (0, _stringify2.default)({\n\t\t\tatuser: body.atuser,\n\t\t\textend: body.extend,\n\t\t\tcontent: body.content\n\t\t})\n\t},\n\t    opcode = OPCODE.USER_MESSAGE.SEND;\n\n\tif ((!body.contentType || body.contentType == _manager.YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.TEXT) && arg.type == _manager.YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT) {\n\t\tif (YYIMUtil['isWhateType'](body.atuser, 'Array') && body.atuser.length) {\n\t\t\tif (body.atuser.indexOf('im_atall') != -1) {\n\t\t\t\tmsgBody.statRead = 1;\n\t\t\t} else {\n\t\t\t\tmsgBody.statRead = 2;\n\t\t\t\tmsgBody.statMem = body.atuser;\n\t\t\t}\n\t\t}\n\t}\n\n\tif (arg.type == _manager.YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT) {\n\t\tto = _manager.YYIMChat.getJIDUtil().buildChatGroupJID(_manager.YYIMChat.getJIDUtil().getNode(arg.to));\n\t\topcode = OPCODE.CHATGROUP_MESSAGE.SEND;\n\t} else if (arg.type == _manager.YYIMChat.getConstants().CHAT_TYPE.PUB_ACCOUNT) {\n\t\tto = _manager.YYIMChat.getJIDUtil().buildPubAccountJID(_manager.YYIMChat.getJIDUtil().getNode(arg.to));\n\t\topcode = OPCODE.PUBACCOUNT_MESSAGE.SEND;\n\t} else {\n\t\tmsgBody.receipts = '1';\n\t\tif (arg.resource) {\n\t\t\tif (arg.to == _manager.YYIMChat.getUserID()) {\n\t\t\t\tto = _manager.YYIMChat.getJIDUtil().buildUserJID(_manager.YYIMChat.getJIDUtil().getNode(arg.to), arg.resource);\n\t\t\t} else {\n\t\t\t\tto = _manager.YYIMChat.getJIDUtil().buildUserJID(_manager.YYIMChat.getJIDUtil().getNode(arg.to));\n\t\t\t}\n\t\t} else {\n\t\t\tto = _manager.YYIMChat.getJIDUtil().buildUserJID(_manager.YYIMChat.getJIDUtil().getNode(arg.to));\n\t\t}\n\t}\n\n\tmsgBody.to = to;\n\n\t_manager.YYIMChat.getConnection().send(new JumpPacket(msgBody, opcode), function (receipts) {\n\t\tif (receipts.code == 40302) {\n\t\t\targ.error && arg.error();\n\t\t\targ = null;\n\t\t} else {\n\t\t\tif (!!_manager.YYIMChat.getConfig().TIMECORRECTION.AUTOCORRECTION) {\n\t\t\t\tif (receipts && receipts.state == 1) {\n\t\t\t\t\t_manager.YYIMChat.onReceipts(receipts);\n\t\t\t\t}\n\t\t\t} else {\n\t\t\t\targ.success && arg.success(handleSendMessage(arg, body, receipts));\n\t\t\t\targ = null;\n\t\t\t}\n\t\t}\n\t});\n\n\tif (!!_manager.YYIMChat.getConfig().TIMECORRECTION.AUTOCORRECTION) {\n\t\targ.success && arg.success(handleSendMessage(arg, body, {\n\t\t\tdateline: msgBody.dateline\n\t\t}));\n\t}\n}\n\nfunction handleRequestParams(body) {\n\tvar messageExtend = {\n\t\tintelligentAnalysis: {}\n\t};\n\n\tif (body.contentType && body.contentType == _manager.YYIMChat.getConstants().MESSAGE_CONTENT_TYPE.TEXT) {\n\t\tif (body.extend && typeof body.extend != 'string') {\n\t\t\tmessageExtend = body.extend;\n\t\t}\n\t\tif (_YYAIAbility2.default.intelligentAnalysis(body.content)) {\n\t\t\tmessageExtend.intelligentAnalysis.intelligentable = true;\n\t\t\tif (body.sceneParams) {\n\t\t\t\tmessageExtend.intelligentAnalysis.params = body.sceneParams;\n\t\t\t\tdelete body.sceneParams;\n\t\t\t}\n\t\t}\n\t}\n\treturn messageExtend;\n}\n\nfunction handleSendMessage(arg, body, receipts) {\n\tvar result = {\n\t\tid: arg.id,\n\t\ttype: arg.type,\n\t\tsessionVersion: receipts.sessionVersion || 0,\n\t\tdata: {\n\t\t\tcontent: body.content,\n\t\t\tcontentType: body.contentType,\n\t\t\tdateline: receipts.dateline,\n\t\t\textend: body.extend\n\t\t}\n\t};\n\n\tif (result.type != _manager.YYIMChat.getConstants().CHAT_TYPE.CHAT) {\n\t\tresult.to = _manager.YYIMChat.getUserID();\n\t\tresult.from = {\n\t\t\troom: _manager.YYIMChat.getJIDUtil().getID(arg.to),\n\t\t\troster: _manager.YYIMChat.getUserID()\n\t\t};\n\t} else {\n\t\tresult.to = _manager.YYIMChat.getJIDUtil().getID(arg.to);\n\t\tresult.from = _manager.YYIMChat.getUserID();\n\t\tresult.resource = _manager.YYIMChat.getResource();\n\t}\n\n\tif (result.data.content.path) {\n\t\tresult.data.content.attachId = result.data.content.path;\n\t\tresult.data.content.path = _manager.YYIMChat.getFileUrl(result.data.content.path);\n\t}\n\treturn result;\n}\n\nfunction getHistoryMessage(arg) {\n\tvar requestUrl,\n\t    route,\n\t    params = {\n\t\ttoken: _manager.YYIMChat.getToken(),\n\t\tstart: arg.start || 0,\n\t\tsize: arg.size || 100\n\t};\n\n\tif (arg.type == _manager.YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT) {\n\t\troute = 'groupchat';\n\t} else if (arg.type == _manager.YYIMChat.getConstants().CHAT_TYPE.PUB_ACCOUNT) {\n\t\troute = 'pubaccount';\n\t} else {\n\t\troute = 'user';\n\t\tif (arg.contentType) {\n\t\t\tvar typelist = _manager.YYIMChat.getConstants().MESSAGE_CONTENT_TYPE;\n\t\t\tfor (var x in typelist) {\n\t\t\t\tif (arg.contentType == typelist[x]) {\n\t\t\t\t\tparams.contentType = arg.contentType;\n\t\t\t\t\tbreak;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\trequestUrl = _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMChat.getUserID() + '/msghistory/' + route + '/' + arg.id + '/version/' + (arg.startVersion || 0) + '/' + arg.endVersion;\n\trequestUrl += '?' + jQuery.param(params);\n\n\t_manager.YYIMChat.log(\"历史记录：request URL\", 2, requestUrl);\n\tjQuery.ajax({\n\t\turl: requestUrl,\n\t\tdataType: \"json\",\n\t\tcache: false,\n\t\tsuccess: function success(data) {\n\t\t\t_historyMessageProcessor(data, arg);\n\t\t\targ = null;\n\t\t},\n\t\terror: function error(xhr) {\n\t\t\t_manager.YYIMChat.log(\"getHistoryMessage_error:\", 0, xhr.statusText);\n\t\t\ttry {\n\t\t\t\targ.error && arg.error(JSON.parse(xhr.responseText));\n\t\t\t\targ = null;\n\t\t\t} catch (e) {\n\t\t\t\targ.error && arg.error();\n\t\t\t\targ = null;\n\t\t\t}\n\t\t}\n\t});\n};\n\nfunction _historyMessageProcessor(data, arg) {\n\t_manager.YYIMChat.log(\"历史记录：data\", 2, data);\n\tvar hisMsgArr = [];\n\tfor (var i in data.list) {\n\t\tif (data.list.hasOwnProperty(i)) {\n\t\t\tvar item = data.list[i];\n\t\t\tvar message = parseMessageBody(item, arg.type);\n\t\t\thisMsgArr.push(message);\n\t\t}\n\t}\n\n\targ.success && arg.success({\n\t\tcontactReadVersion: data.contactReadVersion,\n\t\ttotal: data.total,\n\t\tresult: hisMsgArr\n\t});\n};\n\nfunction revokeMessage(arg) {\n\tvar url, param;\n\tif (arg.type == _manager.YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT) {\n\t\turl = _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/revokeservice/groupmessage/' + arg.id;\n\t\tparam = {\n\t\t\ttoken: _manager.YYIMChat.getToken(),\n\t\t\tuserid: _manager.YYIMChat.getUserNode(),\n\t\t\tmucid: _manager.YYIMChat.getJIDUtil().getNode(arg.to)\n\t\t};\n\t} else {\n\t\turl = _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/revokeservice/personalmessage/' + arg.id;\n\t\tparam = {\n\t\t\ttoken: _manager.YYIMChat.getToken(),\n\t\t\tfromuserid: _manager.YYIMChat.getUserNode(),\n\t\t\ttouserid: _manager.YYIMChat.getJIDUtil().getNode(arg.to)\n\t\t};\n\t}\n\n\turl += '?' + jQuery.param(param);\n\n\tjQuery.ajax({\n\t\turl: url,\n\t\ttype: 'post',\n\t\tcache: false,\n\t\tsuccess: function success(data) {\n\t\t\targ.success && arg.success({\n\t\t\t\tid: arg.id\n\t\t\t});\n\t\t\targ = null;\n\t\t},\n\t\terror: function error(xhr) {\n\t\t\ttry {\n\t\t\t\targ.error && arg.error(JSON.parse(xhr.responseText));\n\t\t\t\targ = null;\n\t\t\t} catch (e) {\n\t\t\t\targ.error && arg.error();\n\t\t\t\targ = null;\n\t\t\t}\n\t\t}\n\t});\n}\n\nexports.monitor = monitor;\nexports.sendMessage = sendMessage;\nexports.getHistoryMessage = getHistoryMessage;\nexports.revokeMessage = revokeMessage;\nexports.sendReceiptsPacket = sendReceiptsPacket;\n\n//# sourceURL=webpack:///./src/module/message/Manager.js?");

/***/ }),

/***/ "./src/module/profile/Extender.js":
/*!****************************************!*\
  !*** ./src/module/profile/Extender.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _manager = __webpack_require__(/*! ../../core/manager */ \"./src/core/manager.js\");\n\nvar _Manager = __webpack_require__(/*! ./Manager */ \"./src/module/profile/Manager.js\");\n\n_manager.YYIMManager.prototype.getProfile = function (arg) {\n\t(0, _Manager.getProfile)({\n\t\tsuccess: function success(data) {\n\t\t\tvar intelligentable = data.intelligentable;\n\t\t\tvar intelligentWordsTime = data.intelligentWordsTime;\n\t\t\tif (intelligentable != 'undefined') {}\n\t\t\tif (intelligentWordsTime) {\n\t\t\t\t_manager.YYIMChat.setDictionaries(intelligentWordsTime);\n\t\t\t}\n\n\t\t\targ.success && arg.success(data);\n\t\t},\n\t\terror: function error(_error) {\n\t\t\targ.error && arg.error(errot);\n\t\t}\n\t});\n};\n\n_manager.YYIMManager.prototype.mute = function (arg) {\n\targ = arg || {};\n\tif (!!arg.to) {\n\t\targ.handle = 'mute';\n\t\t(0, _Manager.muteStick)(arg);\n\t} else {\n\t\targ.error && arg.error();\n\t}\n};\n\n_manager.YYIMManager.prototype.stick = function (arg) {\n\targ = arg || {};\n\tif (!!arg.to) {\n\t\targ.handle = 'stick';\n\t\t(0, _Manager.muteStick)(arg);\n\t} else {\n\t\targ.error && arg.error();\n\t}\n};\n\n_manager.YYIMManager.prototype.cancelMute = function (arg) {\n\tvar that = this;\n\tif (arg && arg.to) {\n\t\t(0, _Manager.cancelMuteStick)({\n\t\t\tto: arg.to,\n\t\t\ttype: arg.type,\n\t\t\thandle: 'mute',\n\t\t\tsuccess: function success(data) {\n\t\t\t\tif (arg.type == that.getConstants().CHAT_TYPE.GROUP_CHAT) {\n\t\t\t\t\tthat.removeGroupAssistant({\n\t\t\t\t\t\tid: arg.to,\n\t\t\t\t\t\tsuccess: function success() {\n\t\t\t\t\t\t\targ.success && arg.success(data);\n\t\t\t\t\t\t},\n\t\t\t\t\t\terror: arg.error\n\t\t\t\t\t});\n\t\t\t\t} else {\n\t\t\t\t\targ.success && arg.success(data);\n\t\t\t\t}\n\t\t\t},\n\t\t\terror: arg.error\n\t\t});\n\t} else {\n\t\targ && arg.error && arg.error();\n\t}\n};\n\n_manager.YYIMManager.prototype.cancelStick = function (arg) {\n\tif (arg && arg.to) {\n\t\targ.handle = 'stick';\n\t\t(0, _Manager.cancelMuteStick)(arg);\n\t} else {\n\t\targ && arg.error && arg.error();\n\t}\n};\n\n_manager.YYIMManager.prototype.createProfile = function (arg) {\n\targ = arg || {};\n\tif (!!arg.profile) {\n\t\t(0, _Manager.createProfile)(arg);\n\t} else {\n\t\targ.error && arg.error();\n\t}\n};\n\n_manager.YYIMManager.prototype.removeProfile = function (arg) {\n\targ = arg || {};\n\tif (YYIMArrayUtil.isArray(arg.profiles)) {\n\t\t(0, _Manager.removeProfile)(arg);\n\t} else {\n\t\targ.error && arg.error();\n\t}\n};\n\n_manager.YYIMManager.prototype.clearProfile = function (arg) {\n\t(0, _Manager.clearProfile)(arg || {});\n};\n\n_manager.YYIMManager.prototype.removeGroupAssistant = function (arg) {\n\tif (arg && arg.id) {\n\t\t(0, _Manager.removeGroupAssistant)(arg);\n\t} else {\n\t\targ && arg.error && arg.error();\n\t}\n};\n\n//# sourceURL=webpack:///./src/module/profile/Extender.js?");

/***/ }),

/***/ "./src/module/profile/Manager.js":
/*!***************************************!*\
  !*** ./src/module/profile/Manager.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.removeGroupAssistant = exports.clearProfile = exports.removeProfile = exports.createProfile = exports.cancelMuteStick = exports.muteStick = exports.getProfile = undefined;\n\nvar _stringify = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ \"./node_modules/_babel-runtime@6.26.0@babel-runtime/core-js/json/stringify.js\");\n\nvar _stringify2 = _interopRequireDefault(_stringify);\n\nvar _manager = __webpack_require__(/*! ../../core/manager */ \"./src/core/manager.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction getProfile(arg) {\n\tvar apiKeyParam = _manager.YYIMManager.getInstance().getApiKey();\n\tif (apiKeyParam) {\n\t\tapiKeyParam = '&apiKey=' + apiKeyParam;\n\t}\n\tjQuery.ajax({\n\t\turl: _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMManager.getInstance().getUserID() + '/profile?token=' + _manager.YYIMManager.getInstance().getToken() + apiKeyParam,\n\t\ttype: 'get',\n\t\tcache: false,\n\t\tdatatype: 'json',\n\t\tsuccess: function success(data) {\n\t\t\tif (data.muteItems) {\n\t\t\t\tvar temp = {};\n\t\t\t\tfor (var x in data.muteItems) {\n\t\t\t\t\tvar id = _manager.YYIMChat.getJIDUtil().getID(data.muteItems[x]);\n\t\t\t\t\tvar type = _manager.YYIMChat.getJIDUtil().getChatTypeByJid(data.muteItems[x]);\n\t\t\t\t\ttemp[id] = {\n\t\t\t\t\t\tid: id,\n\t\t\t\t\t\ttype: type\n\t\t\t\t\t};\n\t\t\t\t}\n\t\t\t\tdata.muteItems = temp;\n\t\t\t}\n\n\t\t\tif (data.stickItems) {\n\t\t\t\tvar temp = {};\n\t\t\t\tfor (var x in data.stickItems) {\n\t\t\t\t\tvar id = _manager.YYIMChat.getJIDUtil().getID(data.stickItems[x]);\n\t\t\t\t\tvar type = _manager.YYIMChat.getJIDUtil().getChatTypeByJid(data.stickItems[x]);\n\t\t\t\t\ttemp[id] = {\n\t\t\t\t\t\tid: id,\n\t\t\t\t\t\ttype: type\n\t\t\t\t\t};\n\t\t\t\t}\n\t\t\t\tdata.stickItems = temp;\n\t\t\t}\n\t\t\tif (data.userId) {\n\t\t\t\tdata.userId = _manager.YYIMChat.getJIDUtil().getID(data.userId);\n\t\t\t}\n\t\t\targ.success && arg.success(data);\n\t\t\targ = null;\n\t\t},\n\t\terror: function error(xhr) {\n\t\t\ttry {\n\t\t\t\targ.error && arg.error(JSON.parse(xhr.responseText));\n\t\t\t\targ = null;\n\t\t\t} catch (e) {\n\t\t\t\targ.error && arg.error();\n\t\t\t\targ = null;\n\t\t\t}\n\t\t}\n\t});\n}\n\nfunction muteStick(arg) {\n\tvar to;\n\tif (arg.type == _manager.YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT) {\n\t\tto = _manager.YYIMChat.getJIDUtil().buildChatGroupJID(_manager.YYIMChat.getJIDUtil().getNode(arg.to));\n\t} else if (arg.type == _manager.YYIMChat.getConstants().CHAT_TYPE.PUB_ACCOUNT) {\n\t\tto = _manager.YYIMChat.getJIDUtil().buildPubAccountJID(_manager.YYIMChat.getJIDUtil().getNode(arg.to));\n\t} else {\n\t\tto = _manager.YYIMChat.getJIDUtil().buildUserJID(_manager.YYIMChat.getJIDUtil().getNode(arg.to));\n\t}\n\targ.handle = arg.handle === 'mute' ? arg.handle : 'stick';\n\tjQuery.ajax({\n\t\turl: _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMManager.getInstance().getUserID() + '/profile/' + arg.handle + '?token=' + _manager.YYIMManager.getInstance().getToken(),\n\t\ttype: 'post',\n\t\tdata: (0, _stringify2.default)({ bareJID: to }),\n\t\tdataType: 'json',\n\t\tcache: false,\n\t\tprocessData: false,\n\t\tcontentType: \"application/json\",\n\t\tsuccess: function success(data) {\n\t\t\targ.success && arg.success({\n\t\t\t\tid: arg.to,\n\t\t\t\ttype: arg.type\n\t\t\t});\n\t\t\targ = null;\n\t\t},\n\t\terror: function error(xhr) {\n\t\t\ttry {\n\t\t\t\targ.error && arg.error(JSON.parse(xhr.responseText));\n\t\t\t\targ = null;\n\t\t\t} catch (e) {\n\t\t\t\targ.error && arg.error();\n\t\t\t\targ = null;\n\t\t\t}\n\t\t}\n\t});\n}\n\nfunction cancelMuteStick(arg) {\n\tvar to;\n\tif (arg.type == _manager.YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT) {\n\t\tto = _manager.YYIMChat.getJIDUtil().buildChatGroupJID(_manager.YYIMChat.getJIDUtil().getNode(arg.to));\n\t} else if (arg.type == _manager.YYIMChat.getConstants().CHAT_TYPE.PUB_ACCOUNT) {\n\t\tto = _manager.YYIMChat.getJIDUtil().buildPubAccountJID(_manager.YYIMChat.getJIDUtil().getNode(arg.to));\n\t} else {\n\t\tto = _manager.YYIMChat.getJIDUtil().buildUserJID(_manager.YYIMChat.getJIDUtil().getNode(arg.to));\n\t}\n\tjQuery.ajax({\n\t\turl: _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMManager.getInstance().getUserID() + '/profile/' + (arg.handle === 'mute' ? 'mute' : 'stick') + '?token=' + _manager.YYIMManager.getInstance().getToken() + '&bareJID=' + to,\n\t\ttype: 'DELETE',\n\t\tdataType: 'json',\n\t\tsuccess: function success(data) {\n\t\t\targ.success && arg.success({\n\t\t\t\tid: arg.to,\n\t\t\t\ttype: arg.type\n\t\t\t});\n\t\t\targ = null;\n\t\t},\n\t\terror: function error(xhr) {\n\t\t\ttry {\n\t\t\t\targ.error && arg.error(JSON.parse(xhr.responseText));\n\t\t\t\targ = null;\n\t\t\t} catch (e) {\n\t\t\t\targ.error && arg.error();\n\t\t\t\targ = null;\n\t\t\t}\n\t\t}\n\t});\n}\n\nfunction createProfile(arg) {\n\tjQuery.ajax({\n\t\turl: _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMManager.getInstance().getUserID() + '/profile?token=' + _manager.YYIMManager.getInstance().getToken(),\n\t\ttype: 'post',\n\t\tdata: (0, _stringify2.default)(arg.profile),\n\t\tdataType: 'json',\n\t\tcache: false,\n\t\tprocessData: false,\n\t\tcontentType: \"application/json\",\n\t\tsuccess: function success(data) {\n\t\t\targ.success && arg.success(arg.profile);\n\t\t\targ = null;\n\t\t},\n\t\terror: function error(xhr) {\n\t\t\ttry {\n\t\t\t\targ.error && arg.error(JSON.parse(xhr.responseText));\n\t\t\t\targ = null;\n\t\t\t} catch (e) {\n\t\t\t\targ.error && arg.error();\n\t\t\t\targ = null;\n\t\t\t}\n\t\t}\n\t});\n}\n\nfunction removeProfile(arg) {\n\tjQuery.ajax({\n\t\turl: _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMManager.getInstance().getUserID() + '/profile?token=' + _manager.YYIMManager.getInstance().getToken(),\n\t\ttype: 'PUT',\n\t\tdata: (0, _stringify2.default)(arg.profiles),\n\t\tdataType: 'json',\n\t\tcache: false,\n\t\tprocessData: false,\n\t\tcontentType: \"application/json\",\n\t\tsuccess: function success(data) {\n\t\t\targ.success && arg.success(arg.profiles);\n\t\t\targ = null;\n\t\t},\n\t\terror: function error(xhr) {\n\t\t\ttry {\n\t\t\t\targ.error && arg.error(JSON.parse(xhr.responseText));\n\t\t\t\targ = null;\n\t\t\t} catch (e) {\n\t\t\t\targ.error && arg.error();\n\t\t\t\targ = null;\n\t\t\t}\n\t\t}\n\t});\n}\n\nfunction clearProfile(arg) {\n\tjQuery.ajax({\n\t\turl: _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMManager.getInstance().getUserID() + '/profile?token=' + _manager.YYIMManager.getInstance().getToken(),\n\t\ttype: 'DELETE',\n\t\tdataType: 'json',\n\t\tcache: false,\n\t\tsuccess: function success(data) {\n\t\t\targ.success && arg.success();\n\t\t\targ = null;\n\t\t},\n\t\terror: function error(xhr) {\n\t\t\ttry {\n\t\t\t\targ.error && arg.error(JSON.parse(xhr.responseText));\n\t\t\t\targ = null;\n\t\t\t} catch (e) {\n\t\t\t\targ.error && arg.error();\n\t\t\t\targ = null;\n\t\t\t}\n\t\t}\n\t});\n}\n\nfunction removeGroupAssistant(arg) {\n\tjQuery.ajax({\n\t\turl: _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMManager.getInstance().getUserID() + '/profile/groupassistant?token=' + _manager.YYIMManager.getInstance().getToken() + '&bareJID=' + _manager.YYIMChat.getJIDUtil().buildChatGroupJID(_manager.YYIMChat.getJIDUtil().getNode(arg.id)),\n\t\ttype: 'DELETE',\n\t\tdataType: 'json',\n\t\tcache: false,\n\t\tsuccess: function success(data) {\n\t\t\targ.success && arg.success();\n\t\t\targ = null;\n\t\t},\n\t\terror: function error(xhr) {\n\t\t\ttry {\n\t\t\t\targ.error && arg.error(JSON.parse(xhr.responseText));\n\t\t\t\targ = null;\n\t\t\t} catch (e) {\n\t\t\t\targ.error && arg.error();\n\t\t\t\targ = null;\n\t\t\t}\n\t\t}\n\t});\n}\n\nexports.getProfile = getProfile;\nexports.muteStick = muteStick;\nexports.cancelMuteStick = cancelMuteStick;\nexports.createProfile = createProfile;\nexports.removeProfile = removeProfile;\nexports.clearProfile = clearProfile;\nexports.removeGroupAssistant = removeGroupAssistant;\n\n//# sourceURL=webpack:///./src/module/profile/Manager.js?");

/***/ }),

/***/ "./src/module/pubaccount/Extender.js":
/*!*******************************************!*\
  !*** ./src/module/pubaccount/Extender.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _manager = __webpack_require__(/*! ../../core/manager */ \"./src/core/manager.js\");\n\nvar _Manager = __webpack_require__(/*! ./Manager */ \"./src/module/pubaccount/Manager.js\");\n\n_manager.YYIMChat.setBackhander({\n  'monitor': {\n    'pubaccountMonitor': _Manager.monitor\n  },\n  'initCallback': {\n    'pubaccount': function pubaccount(options) {\n      _manager.YYIMChat.onPubaccountUpdate = options.onPubaccountUpdate || function () {};\n    }\n  }\n});\n\n_manager.YYIMManager.prototype.getPubAccount = function (arg) {\n  (0, _Manager.getPubAccountItems)(arg);\n};\n\n_manager.YYIMManager.prototype.getPubAccounts = function (arg) {\n  if (YYIMUtil['isWhateType'](arg.ids, 'Array')) {\n    (0, _Manager.getPubAccounts)(arg);\n  } else {\n    arg && arg.error && arg.error();\n  }\n};\n\nvar batchInfosList = new BaseList();\nvar batchInfosTimer;\nvar getBatchInfos = function getBatchInfos() {\n  var handler = batchInfosList;\n  batchInfosList = new BaseList();\n  (0, _Manager.getPubAccounts)({\n    ids: handler.keys(),\n    success: function success(list, data) {\n      handler.forEach(function (item, index) {\n        try {\n          item && item.success && item.success(data[item.id]);\n        } catch (e) {\n          _manager.YYIMChat.log('SuccessHandleBatchPubaccountInfoError.', 0, e);\n        }\n      });\n      handler.clear();\n      handler = null;\n    },\n    error: function error(err) {\n      handler.forEach(function (item, index) {\n        try {\n          item && item.error && item.error(err);\n        } catch (e) {\n          _manager.YYIMChat.log('ErrorHandleBatchPubaccountInfoError.', 0, e);\n        }\n      });\n      handler.clear();\n      handler = null;\n    }\n  });\n};\n\n_manager.YYIMManager.prototype.getBatchPubInfos = function (arg) {\n  if (arg && arg.id && !batchInfosList.get(arg.id)) {\n    batchInfosList.set(arg.id, arg);\n    clearTimeout(batchInfosTimer);\n    if (batchInfosList.length() >= this.getConfig().BETCH_MAXLIMIT.PUBACCOUNT) {\n      getBatchInfos();\n    } else {\n      batchInfosTimer = setTimeout(function () {\n        getBatchInfos();\n      }, 200);\n    }\n  } else {\n    arg.error && arg.error();\n  }\n};\n\n_manager.YYIMManager.prototype.getPubAccountInfo = function (arg) {\n  if (YYIMCommonUtil.isStringAndNotEmpty(arg.id)) {\n    (0, _Manager.getPubAccountInfo)(arg);\n  } else {\n    arg && arg.error && arg.error();\n  }\n};\n\n_manager.YYIMManager.prototype.addPubaccount = function (arg) {\n  if (YYIMCommonUtil.isStringAndNotEmpty(arg.id)) {\n    (0, _Manager.addPubAccount)({\n      jid: _manager.YYIMChat.getJIDUtil().buildPubAccountJID(_manager.YYIMChat.getJIDUtil().getNode(arg.id)),\n      success: arg.success,\n      error: arg.error\n    });\n  } else {\n    arg && arg.error && arg.error();\n  }\n};\n\n_manager.YYIMManager.prototype.removePubaccount = function (arg) {\n  if (YYIMCommonUtil.isStringAndNotEmpty(arg.id)) {\n    (0, _Manager.removePubAccount)({\n      id: Math.uuid(),\n      to: _manager.YYIMChat.getJIDUtil().buildPubAccountJID(_manager.YYIMChat.getJIDUtil().getNode(arg.id)),\n      success: arg.success,\n      error: arg.error\n    });\n  } else {\n    arg && arg.error && arg.error();\n  }\n};\n\n_manager.YYIMManager.prototype.queryPubaccount = function (arg) {\n  if (YYIMCommonUtil.isStringAndNotEmpty(arg.keyword)) {\n    (0, _Manager.queryPubaccount)(arg);\n  } else {\n    arg && arg.error && arg.error();\n  }\n};\n\n//# sourceURL=webpack:///./src/module/pubaccount/Extender.js?");

/***/ }),

/***/ "./src/module/pubaccount/Manager.js":
/*!******************************************!*\
  !*** ./src/module/pubaccount/Manager.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.queryPubaccount = exports.removePubAccount = exports.getPubAccountInfo = exports.getPubAccountItems = exports.getPubAccounts = exports.addPubAccount = exports.monitor = undefined;\n\nvar _stringify = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ \"./node_modules/_babel-runtime@6.26.0@babel-runtime/core-js/json/stringify.js\");\n\nvar _stringify2 = _interopRequireDefault(_stringify);\n\nvar _manager = __webpack_require__(/*! ../../core/manager */ \"./src/core/manager.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction getPubAccountItems(arg) {\n    var jumpPacket = new JumpPacket({\n        type: _manager.YYIMChat.getConstants().TYPE.GET,\n        ns: NS_PUBACCOUNT,\n        to: _manager.YYIMChat.getConfig().DOMAIN.PUBACCOUNT\n    }, OPCODE.PUBACCOUNT_LIST.SEND);\n\n    _manager.YYIMChat.getConnection().send(jumpPacket, function (pubaccountListResult, _arg) {\n        if (!_arg) return;\n\n        _arg.complete && _arg.complete();\n        var items = pubaccountListResult.items || [];\n        var i = items.length || 0;\n        while (i--) {\n            items[i].id = _manager.YYIMChat.getJIDUtil().getID(items[i].jid);\n        }\n        _arg.success && _arg.success((0, _stringify2.default)(items));\n    }, arg);\n}\n\nfunction getPubAccounts(arg) {\n    jQuery.ajax({\n        url: _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/pubaccount/' + _manager.YYIMChat.getUserID() + '/items',\n        dataType: 'json',\n        data: {\n            token: _manager.YYIMChat.getToken(),\n            pubIds: (0, _stringify2.default)(arg.ids)\n        },\n        cache: false,\n        success: function success(result) {\n            var data = {};\n            result = result || [];\n            var i = result.length || 0;\n            while (i--) {\n                result[i].id = _manager.YYIMChat.getJIDUtil().getID(result[i].jid);\n                data[result[i].id] = result[i];\n            }\n            arg.success && arg.success(result, data);\n            arg = null;\n        },\n        error: function error(xhr) {\n            try {\n                arg.error && arg.error(JSON.parse(xhr.responseText));\n                arg = null;\n            } catch (e) {\n                arg.error && arg.error();\n                arg = null;\n            }\n        }\n    });\n}\n\nfunction getPubAccountInfo(arg) {\n    jQuery.ajax({\n        url: _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + arg.id + '/' + _manager.YYIMChat.getUserID() + '/pubaccount/info',\n        dataType: 'json',\n        data: {\n            token: _manager.YYIMChat.getToken()\n        },\n        cache: false,\n        success: function success(result) {\n            if (result && result.data) {\n                result.data.id = _manager.YYIMChat.getJIDUtil().getID(result.data.jid);\n                arg.success && arg.success(result.data);\n                arg = null;\n            }\n        },\n        error: function error(xhr) {\n            try {\n                arg.error && arg.error(JSON.parse(xhr.responseText));\n                arg = null;\n            } catch (e) {\n                arg.error && arg.error();\n                arg = null;\n            }\n        }\n    });\n}\n\nfunction queryPubaccount(arg) {\n    var iqBody = {\n        start: YYIMCommonUtil.isNumber(arg.start) ? arg.start : 0,\n        size: YYIMCommonUtil.isNumber(arg.size) ? arg.size : 20,\n        fields: [\"Accountname\", \"Name\"],\n        search: arg.keyword\n    };\n    _manager.YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.QUERY_PUBACCOUNT.SEND), function (queryResult, _arg) {\n        var items = queryResult.items || [],\n            result = [],\n            i = items.length;\n        while (i--) {\n            var item = items[i],\n                jid = item.jid;\n            result.push({\n                id: _manager.YYIMChat.getJIDUtil().getID(jid),\n                name: YYIMCommonUtil.isStringAndNotEmpty(item.name) ? item.name : _manager.YYIMChat.getJIDUtil().getID(jid),\n                type: item.type\n            });\n        }\n        _arg.complete && _arg.complete();\n        _arg.success && _arg.success({\n            start: queryResult.start,\n            total: queryResult.total,\n            items: result\n        });\n    }, arg);\n}\n\nfunction addPubAccount(arg) {\n    _manager.YYIMChat.getConnection().send(new JumpPacket({\n        type: _manager.YYIMChat.getConstants().PRESENCE_TYPE.SUBSCRIBE,\n        to: arg.jid\n    }, OPCODE.PRESENCE.SEND), function (addResult, _arg) {\n        _arg.complete && _arg.complete();\n        addResult.from = _manager.YYIMChat.getJIDUtil().getID(addResult.from);\n        addResult.to = _manager.YYIMChat.getJIDUtil().getID(addResult.to);\n        _arg.success && _arg.success(addResult);\n    }, arg);\n}\n\nfunction removePubAccount(arg) {\n    _manager.YYIMChat.getConnection().send(new JumpPacket({\n        id: arg.id,\n        type: _manager.YYIMChat.getConstants().PRESENCE_TYPE.UNSUBSCRIBE,\n        to: arg.to\n    }, OPCODE.PRESENCE.SEND), function (addResult, _arg) {\n        _arg.complete && _arg.complete();\n        addResult.from = _manager.YYIMChat.getJIDUtil().getID(addResult.from);\n        addResult.to = _manager.YYIMChat.getJIDUtil().getID(addResult.to) || _manager.YYIMChat.getUserID();\n        _arg.success && _arg.success(addResult);\n    }, arg);\n}\n\nfunction monitor() {\n    _manager.YYIMChat.getConnection().registerHandler(OPCODE.PUBACCOUNT_LIST.KEY, function (packet) {\n        var items = packet.items;\n        if ((items && items.length || 0) === 0) return;\n        var pubaccounts = [],\n            i = items.length;\n        while (i--) {\n            var item = items[i];\n            item.id = _manager.YYIMChat.getJIDUtil().getID(item.jid), pubaccounts.push(item);\n        }\n        _manager.YYIMChat.onPubaccountUpdate(pubaccounts);\n    });\n}\n\nexports.monitor = monitor;\nexports.addPubAccount = addPubAccount;\nexports.getPubAccounts = getPubAccounts;\nexports.getPubAccountItems = getPubAccountItems;\nexports.getPubAccountInfo = getPubAccountInfo;\nexports.removePubAccount = removePubAccount;\nexports.queryPubaccount = queryPubaccount;\n\n//# sourceURL=webpack:///./src/module/pubaccount/Manager.js?");

/***/ }),

/***/ "./src/module/roster/Extender.js":
/*!***************************************!*\
  !*** ./src/module/roster/Extender.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _stringify = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ \"./node_modules/_babel-runtime@6.26.0@babel-runtime/core-js/json/stringify.js\");\n\nvar _stringify2 = _interopRequireDefault(_stringify);\n\nvar _manager = __webpack_require__(/*! ../../core/manager */ \"./src/core/manager.js\");\n\nvar _Manager = __webpack_require__(/*! ./Manager */ \"./src/module/roster/Manager.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n_manager.YYIMChat.setBackhander({\n\t'monitor': {\n\t\t'rosterMonitor': _Manager.monitor\n\t},\n\t'initCallback': {\n\t\t'roster': function roster(options) {\n\t\t\t_manager.YYIMChat.onPresence = options.onPresence || function () {};\n\t\t\t_manager.YYIMChat.onSubscribe = options.onSubscribe || function () {};\n\t\t\t_manager.YYIMChat.onRosterDeleted = options.onRosterDeleted || function () {};\n\t\t\t_manager.YYIMChat.onRosterUpdateded = options.onRosterUpdateded || function () {};\n\t\t\t_manager.YYIMChat.onRosterFavorited = options.onRosterFavorited || function () {};\n\t\t}\n\t}\n});\n\n_manager.YYIMManager.prototype.setPresence = function (arg) {\n\tvar presence = {};\n\tif (arg && arg.show && this.getConstants().STATUS[arg.show.toUpperCase()]) {\n\t\tpresence.show = arg.show;\n\t}\n\tif (arg && arg.status) {\n\t\tpresence.status = arg.status;\n\t}\n\t(0, _Manager.setPresence)(presence);\n};\n\n_manager.YYIMManager.prototype.getVCard = function (arg) {\n\targ = arg || {};\n\tif (arg) {\n\t\t(0, _Manager.getVCard)({\n\t\t\tid: arg.id,\n\t\t\tsuccess: arg.success,\n\t\t\terror: arg.error\n\t\t});\n\t} else {\n\t\targ.error && arg.error();\n\t}\n};\n\nvar batchVcardsList = new BaseList();\nvar batchVcardsTimer = void 0;\nvar _getBatchVCards = function _getBatchVCards() {\n\tvar handler = batchVcardsList;\n\tbatchVcardsList = new BaseList();\n\t(0, _Manager.getBatchVCards)({\n\t\tids: (0, _stringify2.default)(handler.keys()),\n\t\tsuccess: function success(vcards) {\n\t\t\thandler.forEach(function (item, index) {\n\t\t\t\ttry {\n\t\t\t\t\titem && item.success && item.success(vcards[item.id]);\n\t\t\t\t} catch (e) {\n\t\t\t\t\t_manager.YYIMChat.log('SuccessHandleBatchVCardsError.', 0, e);\n\t\t\t\t}\n\t\t\t});\n\t\t\thandler.clear();\n\t\t\thandler = null;\n\t\t},\n\t\terror: function error(err) {\n\t\t\thandler.forEach(function (item, index) {\n\t\t\t\ttry {\n\t\t\t\t\titem && item.error && item.error(err);\n\t\t\t\t} catch (e) {\n\t\t\t\t\t_manager.YYIMChat.log('ErrorHandleBatchVCardsError.', 0, e);\n\t\t\t\t}\n\t\t\t});\n\t\t\thandler.clear();\n\t\t\thandler = null;\n\t\t}\n\t});\n};\n\n_manager.YYIMManager.prototype.getBatchVCards = function (arg) {\n\tif (arg && arg.id && !batchVcardsList.get(arg.id)) {\n\t\tbatchVcardsList.set(arg.id, arg);\n\t\tclearTimeout(batchVcardsTimer);\n\t\tif (batchVcardsList.length() >= this.getConfig().BETCH_MAXLIMIT.ROSTER) {\n\t\t\t_getBatchVCards();\n\t\t} else {\n\t\t\tbatchVcardsTimer = setTimeout(function () {\n\t\t\t\t_getBatchVCards();\n\t\t\t}, 200);\n\t\t}\n\t} else {\n\t\targ.error && arg.error();\n\t}\n};\n\n_manager.YYIMManager.prototype.getVCards = function (arg) {\n\tif (arg) {\n\t\t(0, _Manager.getVCards)({\n\t\t\tsuccess: arg.success,\n\t\t\terror: arg.error,\n\t\t\tcomplete: arg.complete\n\t\t});\n\t} else {\n\t\targ.error && arg.error();\n\t}\n};\n\n_manager.YYIMManager.prototype.setVCard = function (arg) {\n\t(0, _Manager.setVCard)({\n\t\tvcard: {\n\t\t\tnickname: arg.nickname,\n\t\t\tphoto: arg.photo,\n\t\t\temail: arg.email,\n\t\t\tmobile: arg.mobile,\n\t\t\ttelephone: arg.telephone,\n\t\t\torganization: arg.organization,\n\t\t\tgender: arg.gender,\n\t\t\tnumber: arg.number,\n\t\t\tremarks: arg.remarks,\n\t\t\tlocation: arg.location,\n\t\t\tposition: arg.position\n\t\t},\n\t\tsuccess: arg.success,\n\t\terror: arg.error\n\t});\n};\n\n_manager.YYIMManager.prototype.setVCardTag = function (arg) {\n\targ = arg || {};\n\tif (YYIMArrayUtil.isArray(arg.tag)) {\n\t\tvar that = this;\n\t\t(0, _Manager.setTag)({\n\t\t\ttag: arg.tag,\n\t\t\tsuccess: function success(targetId) {\n\t\t\t\tthat.getVCard({\n\t\t\t\t\tid: targetId,\n\t\t\t\t\tsuccess: function success(vcard) {\n\t\t\t\t\t\targ.success && arg.success(vcard);\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t\t},\n\t\t\terror: arg.error\n\t\t});\n\t} else {\n\t\targ.error && arg.error();\n\t}\n};\n\n_manager.YYIMManager.prototype.removeVCardTag = function (arg) {\n\targ = arg || {};\n\tif (YYIMArrayUtil.isArray(arg.tag)) {\n\t\tvar that = this;\n\t\t(0, _Manager.removeTag)({\n\t\t\ttag: arg.tag,\n\t\t\tsuccess: function success(targetId) {\n\t\t\t\tthat.getVCard({\n\t\t\t\t\tid: targetId,\n\t\t\t\t\tsuccess: function success(vcard) {\n\t\t\t\t\t\targ.success && arg.success(vcard);\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t\t},\n\t\t\terror: arg.error\n\t\t});\n\t} else {\n\t\targ.error && arg.error();\n\t}\n};\n\n_manager.YYIMManager.prototype.setRosterTag = function (arg) {\n\targ = arg || {};\n\tif (arg.id && YYIMArrayUtil.isArray(arg.tag) && arg.id != this.getUserID()) {\n\t\t(0, _Manager.setTag)({\n\t\t\tid: arg.id,\n\t\t\ttag: arg.tag,\n\t\t\tsuccess: function success(targetId) {\n\t\t\t\targ.success && arg.success(targetId);\n\t\t\t},\n\t\t\terror: arg.error\n\t\t});\n\t} else {\n\t\targ.error && arg.error();\n\t}\n};\n\n_manager.YYIMManager.prototype.removeRosterTag = function (arg) {\n\targ = arg || {};\n\tif (arg.id && YYIMArrayUtil.isArray(arg.tag) && arg.id != this.getUserID()) {\n\t\t(0, _Manager.removeTag)({\n\t\t\tid: arg.id,\n\t\t\ttag: arg.tag,\n\t\t\tsuccess: function success(targetId) {\n\t\t\t\targ.success && arg.success(targetId);\n\t\t\t},\n\t\t\terror: arg.error\n\t\t});\n\t} else {\n\t\targ.error && arg.error();\n\t}\n};\n\n_manager.YYIMManager.prototype.getRosterItems = function (arg) {\n\t(0, _Manager.getRosterItems)(arg);\n};\n\n_manager.YYIMManager.prototype.addRosterItem = function (id) {\n\tif (YYIMCommonUtil.isStringAndNotEmpty(id)) {\n\t\t(0, _Manager.addRosterItem)(_manager.YYIMChat.getJIDUtil().buildUserJID(_manager.YYIMChat.getJIDUtil().getNode(id)));\n\t}\n};\n\n_manager.YYIMManager.prototype.approveSubscribe = function (id) {\n\tif (YYIMCommonUtil.isStringAndNotEmpty(id)) {\n\t\t(0, _Manager.approveSubscribe)(_manager.YYIMChat.getJIDUtil().buildUserJID(_manager.YYIMChat.getJIDUtil().getNode(id)));\n\t}\n};\n\n_manager.YYIMManager.prototype.rejectSubscribe = function (id) {\n\tif (YYIMCommonUtil.isStringAndNotEmpty(id)) {\n\t\t(0, _Manager.rejectSubscribe)(_manager.YYIMChat.getJIDUtil().buildUserJID(_manager.YYIMChat.getJIDUtil().getNode(id)));\n\t}\n};\n\n_manager.YYIMManager.prototype.deleteRosterItem = function (arg) {\n\tif (YYIMCommonUtil.isStringAndNotEmpty(arg.id)) {\n\t\t(0, _Manager.deleteRosterItem)({\n\t\t\tjid: _manager.YYIMChat.getJIDUtil().buildUserJID(_manager.YYIMChat.getJIDUtil().getNode(arg.id)),\n\t\t\tsuccess: arg.success,\n\t\t\terror: arg.error\n\t\t});\n\t}\n};\n\n_manager.YYIMManager.prototype.queryRosterItem = function (arg) {\n\tif (YYIMCommonUtil.isStringAndNotEmpty(arg.keyword)) {\n\t\t(0, _Manager.queryRosterItem)(arg);\n\t}\n};\n\n_manager.YYIMManager.prototype.getRostersPresence = function (arg) {\n\tif (YYIMArrayUtil.isArray(arg.username)) {\n\t\targ.username = (0, _stringify2.default)(arg.username);\n\t\t(0, _Manager.getRostersPresence)(arg);\n\t}\n};\n\n_manager.YYIMManager.prototype.updateRosterItem = function (arg) {\n\tif (arg && arg.roster && YYIMCommonUtil.isStringAndNotEmpty(arg.roster.id)) {\n\t\t(0, _Manager.updateRosterItem)({\n\t\t\troster: {\n\t\t\t\tjid: _manager.YYIMChat.getJIDUtil().buildUserJID(_manager.YYIMChat.getJIDUtil().getNode(arg.roster.id)),\n\t\t\t\tname: arg.roster.name,\n\t\t\t\tgroups: arg.roster.groups\n\t\t\t},\n\t\t\tsuccess: arg.success,\n\t\t\terror: arg.error\n\t\t});\n\t}\n};\n\n_manager.YYIMManager.prototype.favoriteRoster = function (id, type) {\n\tif (YYIMUtil['isWhateType'](id, 'String')) {\n\t\tvar jid = _manager.YYIMChat.getJIDUtil().buildUserJID(_manager.YYIMChat.getJIDUtil().getNode(id));\n\t\tif (type == _manager.YYIMChat.getConstants().FAVORITE_TYPE.REMOVE) {\n\t\t\t(0, _Manager.cancelFavoriteRoster)(jid);\n\t\t} else {\n\t\t\t(0, _Manager.favoriteRoster)(jid);\n\t\t}\n\t}\n};\n\n_manager.YYIMManager.prototype.updateFavoriteRoster = function (id, name) {\n\tif (YYIMUtil['isWhateType'](id, 'String') && YYIMUtil['isWhateType'](name, 'String')) {\n\t\tvar jid = _manager.YYIMChat.getJIDUtil().buildUserJID(_manager.YYIMChat.getJIDUtil().getNode(id));\n\t\t(0, _Manager.updateFavoriteRoster)(jid, name);\n\t}\n};\n\n_manager.YYIMManager.prototype.getFavoriteRosterList = function (arg) {\n\targ = arg || {};\n\t(0, _Manager.getFavoriteRosterList)({\n\t\tsuccess: arg.success,\n\t\terror: arg.error\n\t});\n};\n\n//# sourceURL=webpack:///./src/module/roster/Extender.js?");

/***/ }),

/***/ "./src/module/roster/Manager.js":
/*!**************************************!*\
  !*** ./src/module/roster/Manager.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.removeTag = exports.setTag = exports.getRosterItems = exports.getFavoriteRosterList = exports.updateFavoriteRoster = exports.cancelFavoriteRoster = exports.favoriteRoster = exports.addRosterItem = exports.setVCard = exports.getVCards = exports.getBatchVCards = exports.getVCard = exports.setPresence = exports.updateRosterItem = exports.getRostersPresence = exports.queryRosterItem = exports.deleteRosterItem = exports.rejectSubscribe = exports.approveSubscribe = exports.monitor = undefined;\n\nvar _stringify = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ \"./node_modules/_babel-runtime@6.26.0@babel-runtime/core-js/json/stringify.js\");\n\nvar _stringify2 = _interopRequireDefault(_stringify);\n\nvar _manager = __webpack_require__(/*! ../../core/manager */ \"./src/core/manager.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction getVCard(arg) {\n\tvar vcardBody = {\n\t\ttype: _manager.YYIMChat.getConstants().TYPE.GET\n\t};\n\n\tif (arg && arg.id) {\n\t\tvcardBody.to = _manager.YYIMChat.getJIDUtil().buildUserJID(_manager.YYIMChat.getJIDUtil().getNode(arg.id));\n\t}\n\n\t_manager.YYIMChat.getConnection().send(new JumpPacket(vcardBody, OPCODE.VCARD.SEND), function (vcardResult, _arg) {\n\t\t_arg.complete && _arg.complete();\n\t\tvar vcard = vcardResult.vcard || {};\n\t\tvcard.id = vcard.userId = _manager.YYIMChat.getJIDUtil().getID(vcard.username);\n\t\tif (!!vcardResult.enableFields) {\n\t\t\tvcard.enableFields = !!vcardResult.enableFields;\n\t\t}\n\t\t_arg.success && _arg.success(vcard);\n\t}, arg);\n}\n\nfunction getBatchVCards(arg) {\n\tvar url = _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMChat.getUserID() + '/vcard?token=' + _manager.YYIMChat.getToken() + '&userids=' + arg.ids;\n\tjQuery.ajax({\n\t\turl: url,\n\t\ttype: 'get',\n\t\tdataType: 'json',\n\t\tcache: false,\n\t\tsuccess: function success(result) {\n\t\t\tvar map = {};\n\t\t\tif (result && result.list) {\n\t\t\t\tfor (var x in result.list) {\n\t\t\t\t\tif (result.list.hasOwnProperty(x)) {\n\t\t\t\t\t\tvar vcard = result.list[x];\n\t\t\t\t\t\tvcard.id = _manager.YYIMChat.getJIDUtil().getID(vcard.username);\n\t\t\t\t\t\tmap[vcard.id] = vcard;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\targ.success && arg.success(map);\n\t\t\targ = null;\n\t\t},\n\t\terror: function error(xhr) {\n\t\t\ttry {\n\t\t\t\targ.error && arg.error(JSON.parse(xhr.responseText));\n\t\t\t\targ = null;\n\t\t\t} catch (e) {\n\t\t\t\targ.error && arg.error();\n\t\t\t\targ = null;\n\t\t\t}\n\t\t}\n\t});\n}\n\nfunction getVCards(arg) {\n\tvar iqBody = {\n\t\ttype: 'roster'\n\t};\n\n\t_manager.YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.VCARDS.SEND), function (vcardsResult, _arg) {\n\t\tvar results = vcardsResult.vcards || [];\n\t\tvcards = [], i = results.length;\n\t\twhile (i--) {\n\t\t\tvar vcard = results[i];\n\t\t\tvcard.id = vcard.userId = _manager.YYIMChat.getJIDUtil().getID(vcard.username);\n\t\t\tvcards.push(vcard);\n\t\t}\n\t\t_arg.complete && _arg.complete();\n\t\t_arg.success && _arg.success(vcards);\n\t}, arg);\n}\n\nfunction setVCard(arg) {\n\t_manager.YYIMChat.getConnection().send(new JumpPacket({\n\t\ttype: _manager.YYIMChat.getConstants().TYPE.SET,\n\t\tvcard: arg.vcard\n\t}, OPCODE.VCARD.SEND), function (vcardResult, _arg) {\n\t\t_arg.complete && _arg.complete();\n\t\t_arg.success && _arg.success();\n\t}, arg);\n}\n\nfunction setTag(arg) {\n\tvar url;\n\tif (!arg.id || arg.id === _manager.YYIMChat.getUserID()) {\n\t\turl = _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMChat.getUserID() + '/vcard/tag?token=' + _manager.YYIMChat.getToken();\n\t} else {\n\t\turl = _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMChat.getUserID() + '/' + arg.id + '/roster/tag?token=' + _manager.YYIMChat.getToken();\n\t}\n\n\tjQuery.ajax({\n\t\turl: url,\n\t\ttype: 'post',\n\t\tdata: (0, _stringify2.default)({\n\t\t\ttag: arg.tag\n\t\t}),\n\t\tdataType: 'json',\n\t\tcache: false,\n\t\tprocessData: false,\n\t\tcontentType: \"application/json\",\n\t\tsuccess: function success(data) {\n\t\t\targ.success && arg.success(arg.id);\n\t\t\targ = null;\n\t\t},\n\t\terror: function error(xhr) {\n\t\t\ttry {\n\t\t\t\targ.error && arg.error(JSON.parse(xhr.responseText));\n\t\t\t\targ = null;\n\t\t\t} catch (e) {\n\t\t\t\targ.error && arg.error();\n\t\t\t\targ = null;\n\t\t\t}\n\t\t}\n\t});\n};\n\nfunction removeTag(arg) {\n\tvar url;\n\tif (!arg.id || arg.id === _manager.YYIMChat.getUserID()) {\n\t\turl = _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMChat.getUserID() + '/vcard/tag?token=' + _manager.YYIMChat.getToken() + '&tag=' + (0, _stringify2.default)(arg.tag);\n\t} else {\n\t\turl = _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMChat.getUserID() + '/' + arg.id + '/roster/tag?token=' + _manager.YYIMChat.getToken() + '&tag=' + (0, _stringify2.default)(arg.tag);\n\t}\n\tjQuery.ajax({\n\t\turl: url,\n\t\ttype: 'delete',\n\t\tdataType: 'json',\n\t\tcache: false,\n\t\tsuccess: function success(data) {\n\t\t\targ.success && arg.success(arg.id);\n\t\t\targ = null;\n\t\t},\n\t\terror: function error(xhr) {\n\t\t\ttry {\n\t\t\t\targ.error && arg.error(JSON.parse(xhr.responseText));\n\t\t\t\targ = null;\n\t\t\t} catch (e) {\n\t\t\t\targ.error && arg.error();\n\t\t\t\targ = null;\n\t\t\t}\n\t\t}\n\t});\n};\n\nfunction getRostersPresence(arg) {\n\tjQuery.ajax({\n\t\turl: _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMChat.getUserID() + '/presence/detail?token=' + _manager.YYIMChat.getToken() + '&username=' + arg.username,\n\t\ttype: 'get',\n\t\tdataType: 'json',\n\t\tcache: false,\n\t\ttimeout: 5000,\n\t\tsuccess: function success(data) {\n\t\t\targ.success && arg.success(data);\n\t\t\targ = null;\n\t\t},\n\t\terror: function error(xhr) {\n\t\t\ttry {\n\t\t\t\targ.error && arg.error(JSON.parse(xhr.responseText));\n\t\t\t\targ = null;\n\t\t\t} catch (e) {\n\t\t\t\targ.error && arg.error();\n\t\t\t\targ = null;\n\t\t\t}\n\t\t}\n\t});\n}\n\nfunction getRosterItems(arg) {\n\tvar jumpPacket = new JumpPacket({}, OPCODE.ROSTER_LIST.SEND);\n\n\t_manager.YYIMChat.getConnection().send(jumpPacket, function (rosterListPacket, _arg) {\n\t\tif (!_arg) return;\n\n\t\t_arg.complete && _arg.complete();\n\n\t\tvar items = rosterListPacket.items || [];\n\n\t\tvar rosters = [],\n\t\t    i = items.length || 0,\n\t\t    friquest = {};\n\n\t\twhile (i--) {\n\t\t\tvar item = items[i],\n\t\t\t    jid = item.jid,\n\t\t\t    roster = {\n\t\t\t\tid: _manager.YYIMChat.getJIDUtil().getID(jid),\n\t\t\t\tresource: _manager.YYIMChat.getJIDUtil().getResource(jid),\n\t\t\t\task: item.ask,\n\t\t\t\trecv: item.recv,\n\t\t\t\tname: item.name,\n\t\t\t\tphoto: item.photo,\n\t\t\t\tsubscription: item.subscription,\n\t\t\t\tgroup: item.groups,\n\t\t\t\ttag: item.tag\n\t\t\t};\n\n\t\t\tif (_manager.YYIMChat.getJIDUtil().getDomain(jid) !== _manager.YYIMChat.getConfig().DOMAIN.PUBACCOUNT) {\n\t\t\t\trosters.push(roster);\n\n\t\t\t\tif (!friquest[roster.id] && roster.subscription === 'none') {\n\t\t\t\t\tif (roster.recv === 1) {\n\t\t\t\t\t\tfriquest[roster.id] = roster;\n\t\t\t\t\t} else if (roster.ask === 1) {}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\tfor (var x in friquest) {\n\t\t\tif (friquest[x].id) {\n\t\t\t\t_manager.YYIMChat.onSubscribe({\n\t\t\t\t\tfrom: friquest[x].id,\n\t\t\t\t\ttype: _manager.YYIMChat.getConstants().PRESENCE_TYPE.SUBSCRIBE\n\t\t\t\t});\n\t\t\t}\n\t\t}\n\n\t\t_arg.success && _arg.success((0, _stringify2.default)(rosters));\n\t}, arg);\n}\n\nfunction deleteRosterItem(arg) {\n\tvar iqBody = {\n\t\ttype: _manager.YYIMChat.getConstants().TYPE.SET,\n\t\tns: NS_ROSTER,\n\t\titem: {\n\t\t\tjid: arg.jid,\n\t\t\tsubscription: 'remove'\n\t\t}\n\t};\n\n\t_manager.YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.UPDATE_ROSTER.SEND), function (deleteResult, _arg) {\n\t\t_arg.complete && _arg.complete();\n\t\t_arg.success && _arg.success(_manager.YYIMChat.getJIDUtil().getID(_arg.jid));\n\t}, arg);\n}\n\nfunction updateRosterItem(arg) {\n\tvar roster = arg.roster,\n\t    iqBody = {\n\t\titem: {\n\t\t\tjid: roster.jid,\n\t\t\tname: roster.name,\n\t\t\tgroups: []\n\t\t}\n\t},\n\t    groups = roster.groups,\n\t    i = groups ? groups.length : 0;\n\twhile (i-- && YYIMCommonUtil.isStringAndNotEmpty(groups[i])) {\n\t\tiqBody.item.groups = iqBody.item.groups.concat(groups[i]);\n\t}_manager.YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.UPDATE_ROSTER.SEND), function (updateResult, _arg) {\n\t\t_arg.complete && _arg.complete();\n\n\t\tif (updateResult.code === 400) {\n\t\t\t_arg.error && _arg.error(updateResult);\n\t\t} else {\n\t\t\tupdateResult.to = _manager.YYIMChat.getJIDUtil().getID(updateResult.to);\n\t\t\t_arg.success && _arg.success(updateResult);\n\t\t}\n\t}, arg);\n}\n\nfunction queryRosterItem(arg) {\n\tvar iqBody = {\n\t\tstart: YYIMCommonUtil.isNumber(arg.start) ? arg.start : 0,\n\t\tsize: YYIMCommonUtil.isNumber(arg.size) ? arg.size : 20,\n\t\tfields: [\"Username\", \"Name\"],\n\t\tsearch: arg.keyword\n\t};\n\t_manager.YYIMChat.getConnection().send(new JumpPacket(iqBody, OPCODE.QUERY_USER.SEND), function (queryResult, _arg) {\n\t\tvar items = queryResult.items || [],\n\t\t    result = [],\n\t\t    i = items.length;\n\t\twhile (i--) {\n\t\t\tvar item = items[i],\n\t\t\t    jid = item.jid;\n\t\t\tif (jid === _manager.YYIMChat.getUserBareJID()) continue;\n\t\t\tresult.push({\n\t\t\t\tid: _manager.YYIMChat.getJIDUtil().getID(jid),\n\t\t\t\tname: YYIMCommonUtil.isStringAndNotEmpty(item.name) ? item.name : _manager.YYIMChat.getJIDUtil().getID(jid),\n\t\t\t\tphoto: item.photo,\n\t\t\t\temail: item.email\n\t\t\t});\n\t\t}\n\t\t_arg.complete && _arg.complete();\n\t\t_arg.success && _arg.success({\n\t\t\tstart: queryResult.start,\n\t\t\ttotal: queryResult.total,\n\t\t\titems: result\n\t\t});\n\t}, arg);\n}\n\nfunction getFavoriteRosterList(arg) {\n\tjQuery.ajax({\n\t\turl: _manager.YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + _manager.YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + _manager.YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + _manager.YYIMChat.getUserID() + '/favoritedRosters',\n\t\ttype: 'get',\n\t\tdata: {\n\t\t\ttoken: _manager.YYIMChat.getToken()\n\t\t},\n\t\tdataType: 'json',\n\t\tcache: false,\n\t\tsuccess: function success(data) {\n\t\t\tif (data && data.items) {\n\t\t\t\tvar i = data.items.length;\n\t\t\t\twhile (i--) {\n\t\t\t\t\tdata.items[i].id = _manager.YYIMChat.getJIDUtil().getID(data.items[i].jid);\n\t\t\t\t}\n\t\t\t}\n\t\t\targ.success && arg.success(data.items);\n\t\t\targ = null;\n\t\t},\n\t\terror: function error(xhr) {\n\t\t\ttry {\n\t\t\t\targ.error && arg.error(JSON.parse(xhr.responseText));\n\t\t\t\targ = null;\n\t\t\t} catch (e) {\n\t\t\t\targ.error && arg.error();\n\t\t\t\targ = null;\n\t\t\t}\n\t\t}\n\t});\n}\n\nfunction setPresence(arg) {\n\t_manager.YYIMChat.getConnection().send(new JumpPacket(arg, OPCODE.PRESENCE.SEND));\n}\n\nfunction favoriteRoster(jid) {\n\t_manager.YYIMChat.getConnection().send(new JumpPacket({\n\t\ttype: _manager.YYIMChat.getConstants().PRESENCE_TYPE.COLLECT,\n\t\tto: jid\n\t}, OPCODE.PRESENCE.SEND));\n}\n\nfunction cancelFavoriteRoster(jid) {\n\t_manager.YYIMChat.getConnection().send(new JumpPacket({\n\t\tfavoritedRosterItem: {\n\t\t\tjid: jid,\n\t\t\tsubscription: _manager.YYIMChat.getConstants().FAVORITE_TYPE.REMOVE\n\t\t},\n\t\tfrom: _manager.YYIMChat.getUserFullJID()\n\t}, OPCODE.FAVORITED_ROSTERT.SEND));\n}\n\nfunction updateFavoriteRoster(jid, name) {\n\t_manager.YYIMChat.getConnection().send(new JumpPacket({\n\t\tfavoritedRosterItem: {\n\t\t\tjid: jid,\n\t\t\tname: name,\n\t\t\tsubscription: _manager.YYIMChat.getConstants().FAVORITE_TYPE.FAVORITE\n\t\t},\n\t\tfrom: _manager.YYIMChat.getUserFullJID()\n\t}, OPCODE.FAVORITED_ROSTERT.SEND));\n}\n\nfunction addRosterItem(jid) {\n\t_manager.YYIMChat.getConnection().send(new JumpPacket({\n\t\ttype: _manager.YYIMChat.getConstants().PRESENCE_TYPE.SUBSCRIBE,\n\t\tto: jid\n\t}, OPCODE.PRESENCE.SEND));\n}\n\nfunction approveSubscribe(jid) {\n\t_manager.YYIMChat.getConnection().send(new JumpPacket({\n\t\ttype: _manager.YYIMChat.getConstants().PRESENCE_TYPE.SUBSCRIBED,\n\t\tto: jid\n\t}, OPCODE.PRESENCE.SEND));\n}\n\nfunction rejectSubscribe(jid) {\n\t_manager.YYIMChat.getConnection().send(new JumpPacket({\n\t\ttype: _manager.YYIMChat.getConstants().PRESENCE_TYPE.UNSUBSCRIBED,\n\t\tto: jid\n\t}, OPCODE.PRESENCE.SEND));\n}\n\nfunction monitor() {\n\t_manager.YYIMChat.getConnection().registerHandler(OPCODE.FAVORITED_ROSTERT.KEY, function (packet) {\n\t\tif (packet && packet.favoritedRosterItem) {\n\t\t\tpacket.favoritedRosterItem.id = _manager.YYIMChat.getJIDUtil().getID(packet.favoritedRosterItem.jid);\n\t\t}\n\t\tif (packet && packet.to) {\n\t\t\tpacket.to = _manager.YYIMChat.getJIDUtil().getID(packet.to);\n\t\t}\n\t\t_manager.YYIMChat.onRosterFavorited(packet);\n\t});\n\n\t_manager.YYIMChat.getConnection().registerHandler(OPCODE.UPDATE_ROSTER.KEY, function (packet) {\n\t\tvar item = packet.item,\n\t\t    id = _manager.YYIMChat.getJIDUtil().getID(packet.item.jid);\n\n\t\tif (item.subscription === 'both') {\n\t\t\t_manager.YYIMChat.log('update or add: ' + (0, _stringify2.default)(item));\n\t\t\titem.id = id;\n\t\t\t_manager.YYIMChat.onRosterUpdateded(item);\n\t\t} else if (item.subscription === 'none') {\n\t\t\t\t_manager.YYIMChat.log('delete: ' + (0, _stringify2.default)(item));\n\t\t\t\titem.id = id;\n\t\t\t\t_manager.YYIMChat.onRosterDeleted(item);\n\t\t\t} else if (item.subscription === 'remove') {}\n\t});\n\n\t_manager.YYIMChat.getConnection().registerHandler(OPCODE.PRESENCE.KEY, function (packet) {\n\t\tif (packet.type && packet.type != _manager.YYIMChat.getConstants().TYPE.UNAVAILABLE) {\n\t\t\t_manager.YYIMChat.onSubscribe({\n\t\t\t\tfrom: _manager.YYIMChat.getJIDUtil().getID(packet.from),\n\t\t\t\ttype: packet.type\n\t\t\t});\n\t\t\treturn;\n\t\t}\n\n\t\tvar ps = {\n\t\t\tfrom: _manager.YYIMChat.getJIDUtil().getID(packet.from),\n\t\t\tresource: _manager.YYIMChat.getJIDUtil().getResource(packet.from),\n\t\t\ttype: packet.type,\n\t\t\tshow: packet.show,\n\t\t\tstatus: packet.status\n\t\t};\n\t\tif (packet.type && packet.type == _manager.YYIMChat.getConstants().TYPE.UNAVAILABLE) {\n\t\t\tps.show = _manager.YYIMChat.getConstants().STATUS.UNAVAILABLE;\n\t\t\tps.status = _manager.YYIMChat.getConstants().STATUS.UNAVAILABLE;\n\t\t\tremoveFromOnline(ps.from);\n\t\t}\n\n\t\tif (!YYIMCommonUtil.isStringAndNotEmpty(ps.status)) {\n\t\t\tps.show = _manager.YYIMChat.getConstants().STATUS.CHAT;\n\t\t\tps.status = _manager.YYIMChat.getConstants().STATUS.CHAT;\n\t\t};\n\t\t_manager.YYIMChat.onPresence(ps);\n\t});\n}\n\nexports.monitor = monitor;\nexports.approveSubscribe = approveSubscribe;\nexports.rejectSubscribe = rejectSubscribe;\nexports.deleteRosterItem = deleteRosterItem;\nexports.queryRosterItem = queryRosterItem;\nexports.getRostersPresence = getRostersPresence;\nexports.updateRosterItem = updateRosterItem;\nexports.setPresence = setPresence;\nexports.getVCard = getVCard;\nexports.getBatchVCards = getBatchVCards;\nexports.getVCards = getVCards;\nexports.setVCard = setVCard;\nexports.addRosterItem = addRosterItem;\nexports.favoriteRoster = favoriteRoster;\nexports.cancelFavoriteRoster = cancelFavoriteRoster;\nexports.updateFavoriteRoster = updateFavoriteRoster;\nexports.getFavoriteRosterList = getFavoriteRosterList;\nexports.getRosterItems = getRosterItems;\nexports.setTag = setTag;\nexports.removeTag = removeTag;\n\n//# sourceURL=webpack:///./src/module/roster/Manager.js?");

/***/ }),

/***/ "./src/module/todo/Extender.js":
/*!*************************************!*\
  !*** ./src/module/todo/Extender.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _manager = __webpack_require__(/*! ../../core/manager */ \"./src/core/manager.js\");\n\nvar _Manager = __webpack_require__(/*! ./Manager */ \"./src/module/todo/Manager.js\");\n\n_manager.YYIMManager.prototype.getTodoDigset = function (arg) {\n  (0, _Manager.getTodoDigset)(arg);\n};\n\n_manager.YYIMManager.prototype.sendToDoReceipts = function (arg) {\n  (0, _Manager.sendToDoReceipts)(arg);\n};\n\n_manager.YYIMManager.prototype.getHistoryTodo = function (arg) {\n  (0, _Manager.getHistoryTodo)(arg);\n};\n\n//# sourceURL=webpack:///./src/module/todo/Extender.js?");

/***/ }),

/***/ "./src/module/todo/Manager.js":
/*!************************************!*\
  !*** ./src/module/todo/Manager.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.sendToDoReceipts = exports.getHistoryTodo = exports.getTodoDigset = undefined;\n\nvar _stringify = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ \"./node_modules/_babel-runtime@6.26.0@babel-runtime/core-js/json/stringify.js\");\n\nvar _stringify2 = _interopRequireDefault(_stringify);\n\nvar _manager = __webpack_require__(/*! ../../core/manager */ \"./src/core/manager.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction sendToDoReceipts(arg) {\n\tjQuery.ajax({\n\t\turl: _manager.YYIMChat.getConfig().SERVLET.REST_TODO_USER + 'read/latest?token=' + _manager.YYIMChat.getToken() + '&userId=' + _manager.YYIMChat.getUserID(),\n\t\ttype: 'post',\n\t\tdata: (0, _stringify2.default)({\n\t\t\tlatestReadTs: arg.latestReadTs || 0\n\t\t}),\n\t\tdataType: 'json',\n\t\tcache: false,\n\t\tprocessData: false,\n\t\tcontentType: \"application/json\",\n\t\tsuccess: function success() {\n\t\t\targ && arg.success && arg.success();\n\t\t\targ && (arg = null);\n\t\t},\n\t\terror: function error(xhr) {\n\t\t\ttry {\n\t\t\t\targ && arg.error && arg.error(JSON.parse(xhr.responseText));\n\t\t\t\targ && (arg = null);\n\t\t\t} catch (e) {\n\t\t\t\targ && arg.error && arg.error();\n\t\t\t\targ && (arg = null);\n\t\t\t}\n\t\t}\n\t});\n}\n\nfunction getTodoDigset(arg) {\n\tjQuery.ajax({\n\t\turl: _manager.YYIMChat.getConfig().SERVLET.REST_TODO_USER + 'abstract',\n\t\ttype: 'get',\n\t\tdata: {\n\t\t\ttoken: _manager.YYIMChat.getToken(),\n\t\t\tuserId: _manager.YYIMChat.getUserID()\n\t\t},\n\t\tdataType: 'json',\n\t\tcache: false,\n\t\tsuccess: function success(data) {\n\t\t\tvar result;\n\t\t\tif (data && data.result && data.result['abstractItem']) {\n\n\t\t\t\tresult = data.result['abstractItem'] || {};\n\t\t\t\tresult['todoCount'] = data.result['todoCount'] || 0;\n\t\t\t\tresult['unReadCount'] = data.result['unReadCount'] || 0;\n\t\t\t\tresult['latestReadTs'] = data.result['latestReadTs'] || 0;\n\t\t\t}\n\t\t\targ && arg.success && arg.success(result);\n\t\t\targ && (arg = null);\n\t\t},\n\t\terror: function error(xhr) {\n\t\t\ttry {\n\t\t\t\targ && arg.error && arg.error(JSON.parse(xhr.responseText));\n\t\t\t\targ && (arg = null);\n\t\t\t} catch (e) {\n\t\t\t\targ && arg.error && arg.error();\n\t\t\t\targ && (arg = null);\n\t\t\t}\n\t\t}\n\t});\n}\n\nfunction getHistoryTodo(arg) {\n\tjQuery.ajax({\n\t\turl: _manager.YYIMChat.getConfig().SERVLET.REST_TODO_USER + 'items',\n\t\ttype: 'get',\n\t\tdata: {\n\t\t\ttoken: _manager.YYIMChat.getToken(),\n\t\t\tuserId: _manager.YYIMChat.getUserID(),\n\t\t\tbeforeTs: arg && Number(arg.beforeTs) || '',\n\t\t\ttodoState: arg && arg.todoState || '',\n\t\t\tpageSize: arg && Number(arg.pageSize) || 10\n\t\t},\n\t\tdataType: 'json',\n\t\tcache: false,\n\t\tsuccess: function success(data) {\n\t\t\tvar result = [];\n\t\t\tif (data && data.result && data.result.length) {\n\n\t\t\t\tresult = data.result;\n\t\t\t}\n\t\t\targ && arg.success && arg.success(result);\n\t\t\targ && (arg = null);\n\t\t},\n\t\terror: function error(xhr) {\n\t\t\ttry {\n\t\t\t\targ && arg.error && arg.error(JSON.parse(xhr.responseText));\n\t\t\t\targ && (arg = null);\n\t\t\t} catch (e) {\n\t\t\t\targ && arg.error && arg.error();\n\t\t\t\targ && (arg = null);\n\t\t\t}\n\t\t}\n\t});\n}\n\nexports.getTodoDigset = getTodoDigset;\nexports.getHistoryTodo = getHistoryTodo;\nexports.sendToDoReceipts = sendToDoReceipts;\n\n//# sourceURL=webpack:///./src/module/todo/Manager.js?");

/***/ }),

/***/ "./src/module/upload/Extender.js":
/*!***************************************!*\
  !*** ./src/module/upload/Extender.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _manager = __webpack_require__(/*! ../../core/manager */ \"./src/core/manager.js\");\n\nvar _FileUpload = __webpack_require__(/*! ./FileUpload */ \"./src/module/upload/FileUpload.js\");\n\n__webpack_require__(/*! ./YYIMUploader */ \"./src/module/upload/YYIMUploader.js\");\n\n_manager.YYIMManager.prototype.startUpload = function (file) {\n\t_FileUpload.FileUpload.getInstance().start(file);\n};\n\n_manager.YYIMManager.prototype.cancelUpload = function (file) {\n\t_FileUpload.FileUpload.getInstance().end(file);\n};\n\n_manager.YYIMManager.prototype.getUploadingSize = function () {\n\treturn _FileUpload.FileUpload.getInstance().getUploadingSize();\n};\n\n_manager.YYIMManager.prototype.previewLocalImage = function (arg) {\n\targ = arg || {};\n\tvar file = arg.file;\n\tif (file && /image\\//.test(file.type)) {\n\t\tvar that = this;\n\t\ttry {\n\t\t\tif (file.type == 'image/gif') {\n\t\t\t\tvar fr = new moxie.file.FileReader();\n\t\t\t\tfr.onload = function () {\n\t\t\t\t\targ.success && arg.success(fr.result);\n\t\t\t\t\tfr.destroy();\n\t\t\t\t\tfr = null;\n\t\t\t\t};\n\t\t\t\tfr.readAsDataURL(file.getSource());\n\t\t\t} else {\n\t\t\t\tvar preloader = new moxie.image.Image();\n\t\t\t\tpreloader.onload = function () {\n\t\t\t\t\tvar imgsrc = preloader.type == 'image/jpeg' ? preloader.getAsDataURL('image/jpeg', 80) : preloader.getAsDataURL();\n\t\t\t\t\targ.success && arg.success(imgsrc);\n\t\t\t\t\tpreloader.destroy();\n\t\t\t\t\tpreloader = null;\n\t\t\t\t};\n\t\t\t\tpreloader.load(file.getSource());\n\t\t\t}\n\t\t} catch (e) {\n\t\t\targ.error && arg.error('Local address parsing errors.');\n\t\t}\n\t} else {\n\t\targ.error && arg.error('The file isn`t Image.');\n\t}\n};\n\n//# sourceURL=webpack:///./src/module/upload/Extender.js?");

/***/ }),

/***/ "./src/module/upload/FileUpload.js":
/*!*****************************************!*\
  !*** ./src/module/upload/FileUpload.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.FileUpload = undefined;\n\nvar _manager = __webpack_require__(/*! ../../core/manager */ \"./src/core/manager.js\");\n\nfunction FileUpload() {}\n\nFileUpload.prototype = new BaseList();\n\nFileUpload.getInstance = function () {\n\tif (!this._instance) {\n\t\tthis._instance = new FileUpload();\n\t}\n\treturn this._instance;\n};\n\nFileUpload.prototype.init = function (options, events) {\n\tvar settings = {\n\t\tbrowse_button: 'fileUpload',\n\t\tfile_data_name: 'file',\n\t\turl: this.getBaseUrl(),\n\t\tfilters: {\n\t\t\tmax_file_size: '100mb',\n\t\t\tprevent_duplicates: !!_manager.YYIMChat.getConfig().UPLOAD.PREVENT_DUPLICATES },\n\t\tflash_swf_url: _manager.YYIMChat.getConfig().UPLOAD.FLASH_SWF_URL,\n\t\tsilverlight_xap_url: _manager.YYIMChat.getConfig().UPLOAD.SILVERLIGHT_XAP_URL,\n\t\tmulti_selection: !!_manager.YYIMChat.getConfig().UPLOAD.MULTI_SELECTION,\n\t\tmultipart: true,\n\t\tmax_retries: 1,\n\t\tchunk_size: 0,\n\t\truntimes: 'gears,html5,flash,silverlight,browserplus'\n\t};\n\n\tif (options['mediaType'] == _manager.YYIMChat.getConfig().UPLOAD.MEDIATYPE.IMAGE) {\n\t\tsettings['filters']['mime_types'] = [{ title: \"Image files\", extensions: \"jpg,gif,png,jpeg,bmp\" }];\n\t} else {\n\t\tsettings['filters']['mime_types'] = undefined;\n\t}\n\n\tjQuery.extend(settings, options);\n\tvar id = settings['browse_button'];\n\tvar uploader = new plupload.Uploader(settings);\n\tuploader.init();\n\tuploader.refresh();\n\tthis.bindEvents(uploader, events);\n};\n\nFileUpload.prototype.getBaseUrl = function () {\n\treturn _manager.YYIMChat.getServletPath().REST_RESOURCE_SERVLET + _manager.YYIMChat.getTenancy().ETP_KEY + '/' + _manager.YYIMChat.getTenancy().APP_KEY + '/upload';\n};\n\nFileUpload.prototype.getUploadingSize = function () {\n\tvar size = 0;\n\tfor (var x in this.list) {\n\t\tif (this.list.hasOwnProperty(x)) {\n\t\t\tvar uploader = this.list[x];\n\t\t\tif (uploader) {\n\t\t\t\tvar file = uploader.getFile(x);\n\n\t\t\t\tif (file.status != plupload.FAILED && file.status != plupload.STOPPED) {\n\t\t\t\t\tsize++;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\treturn size;\n};\n\nFileUpload.prototype.start = function (file) {\n\tvar uploader;\n\tif (file) {\n\t\tuploader = this.get(file.id || file);\n\t\tif (uploader) {\n\t\t\tfile = uploader.getFile(file.id || file);\n\t\t\tif (file) {\n\t\t\t\tfile.status = 1;\n\t\t\t}\n\t\t\tuploader.start();\n\t\t}\n\t}\n};\n\nFileUpload.prototype.end = function (file) {\n\tvar uploader;\n\tif (file) {\n\t\tvar fileId = file.id || file;\n\t\tuploader = this.get(fileId);\n\t\tif (uploader) {\n\t\t\tfile = uploader.getFile(fileId);\n\t\t\tif (file) {\n\t\t\t\tuploader.removeFile(file);\n\t\t\t}\n\t\t\tthis.remove(fileId);\n\t\t}\n\t} else {\n\t\tthis.forEach(function (uploader) {\n\t\t\tuploader.splice(0);\n\t\t\tuploader.destroy();\n\t\t});\n\t\tthis.clear();\n\t}\n};\n\nFileUpload.prototype.bindEvents = function (uploader, arg) {\n\tvar that = this;\n\n\tuploader.bind('init', function (uploader) {\n\t\targ && arg.init && arg.init(uploader);\n\t});\n\n\tuploader.bind('PostInit', function (uploader) {\n\t\targ && arg.PostInit && arg.PostInit(uploader);\n\t});\n\n\tuploader.bind('Refresh', function (uploader) {\n\t\targ && arg.Refresh && arg.Refresh(uploader);\n\t});\n\n\tuploader.bind('StateChanged', function (uploader) {\n\t\targ && arg.StateChanged && arg.StateChanged(uploader);\n\t});\n\n\tuploader.bind('UploadFile', function (uploader, file) {\n\t\targ && arg.StateChanged && arg.UploadFile(uploader, file);\n\t});\n\n\tuploader.bind('BeforeUpload', function (uploader, file) {\n\t\targ && arg.BeforeUpload && arg.BeforeUpload(uploader, file);\n\t});\n\n\tuploader.bind('QueueChanged', function (uploader) {\n\t\targ && arg.QueueChanged && arg.QueueChanged(uploader);\n\t});\n\n\tuploader.bind('OptionChanged', function (uploader, option_name, new_value, old_value) {\n\t\targ && arg.OptionChanged && arg.OptionChanged(uploader, option_name, new_value, old_value);\n\t});\n\n\tuploader.bind('UploadProgress', function (uploader, file) {\n\t\targ && arg.UploadProgress && arg.UploadProgress(uploader, file);\n\t});\n\n\tuploader.bind('FilesAdded', function (uploader, files) {\n\t\targ && arg.FilesAdded && arg.FilesAdded(uploader, files);\n\t});\n\n\tuploader.bind('FilesRemoved', function (uploader, files) {\n\t\tfiles.forEach(function (file, index) {\n\t\t\tthat.remove(file.id);\n\t\t});\n\t\targ && arg.FilesRemoved && arg.FilesRemoved(uploader, files);\n\t});\n\n\tuploader.bind('FileFiltered', function (uploader, file) {\n\t\tthat.set(file.id, uploader);\n\t\targ && arg.FileFiltered && arg.FileFiltered(uploader, file);\n\t});\n\n\tuploader.bind('FileUploaded', function (uploader, file, responseObject) {\n\t\targ && arg.FileUploaded && arg.FileUploaded(uploader, file, responseObject);\n\t});\n\n\tuploader.bind('ChunkUploaded', function (uploader, file, responseObject) {\n\t\targ && arg.ChunkUploaded && arg.ChunkUploaded(uploader, file, responseObject);\n\t});\n\n\tuploader.bind('UploadComplete', function (uploader, files) {\n\t\targ && arg.UploadComplete && arg.UploadComplete(uploader, files);\n\t});\n\n\tuploader.bind('Error', function (uploader, errObject) {\n\t\targ && arg.Error && arg.Error(uploader, errObject);\n\t});\n\n\tuploader.bind('Destroy', function (uploader) {\n\t\targ && arg.Destroy && arg.Destroy(uploader);\n\t});\n};\n\nexports.FileUpload = FileUpload;\n\n//# sourceURL=webpack:///./src/module/upload/FileUpload.js?");

/***/ }),

/***/ "./src/module/upload/YYIMUploader.js":
/*!*******************************************!*\
  !*** ./src/module/upload/YYIMUploader.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _manager = __webpack_require__(/*! ../../core/manager */ \"./src/core/manager.js\");\n\nvar _FileUpload = __webpack_require__(/*! ./FileUpload */ \"./src/module/upload/FileUpload.js\");\n\n_manager.YYIMManager.getInstance().uploader = function (obj, arg) {\n\targ = arg || {};\n\n\tif (typeof obj == 'string') {\n\t\tobj = document.getElementById(obj);\n\t}\n\n\tif (!YYIMUtil['isWhateType'](arg.chatInfo, 'Function')) {\n\t\targ.error && arg.error('chatInfo isn`t Function.');\n\t\treturn;\n\t}\n\n\t_FileUpload.FileUpload.getInstance().init({\n\t\t'mediaType': arg.mediaType || YYIMChat.getConfig().UPLOAD.MEDIATYPE.DOC,\n\t\t'browse_button': obj.id,\n\t\t'drop_element': arg.drop_element\n\t}, {\n\t\t'init': function init(uploader) {\n\t\t\tuploader.addFile(obj);\n\t\t\tobj = null;\n\t\t},\n\n\t\t'PostInit': function PostInit(uploader) {},\n\n\t\t'Refresh': function Refresh(uploader) {},\n\n\t\t'StateChanged': function StateChanged(uploader) {},\n\n\t\t'UploadFile': function UploadFile(uploader, file) {},\n\n\t\t'BeforeUpload': function BeforeUpload(uploader, file) {\n\t\t\tvar chatInfo = uploader.getOption('chatInfo');\n\t\t\tif (chatInfo) {\n\t\t\t\tvar info = chatInfo[file.id];\n\t\t\t\tif (info) {\n\t\t\t\t\ttry {\n\t\t\t\t\t\targ.beforeUpload && arg.beforeUpload({\n\t\t\t\t\t\t\tfile: file,\n\t\t\t\t\t\t\tchatInfo: info\n\t\t\t\t\t\t});\n\t\t\t\t\t} catch (e) {}\n\n\t\t\t\t\tvar mediaType = uploader.getOption('mediaType');\n\n\t\t\t\t\tif (YYIMChat.getConfig().UPLOAD.IMAGE_TYPES.test(file.name)) {\n\t\t\t\t\t\tmediaType = 1;\n\t\t\t\t\t}\n\n\t\t\t\t\tif (info['file_data_name']) {\n\t\t\t\t\t\tuploader.setOption('file_data_name', info['file_data_name']);\n\t\t\t\t\t}\n\n\t\t\t\t\tif (info['required_features']) {\n\t\t\t\t\t\tuploader.setOption('required_features', info['required_features']);\n\t\t\t\t\t}\n\n\t\t\t\t\tif (mediaType === 1 || !info.uploadUrl) {\n\t\t\t\t\t\tvar to = YYIMChat.getJIDUtil().buildUserJID(YYIMChat.getJIDUtil().getNode(info.to));\n\t\t\t\t\t\tif (info.type && info.type == YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT) {\n\t\t\t\t\t\t\tto = YYIMChat.getJIDUtil().buildChatGroupJID(YYIMChat.getJIDUtil().getNode(info.to));\n\t\t\t\t\t\t}\n\t\t\t\t\t\tuploader.setOption('url', _FileUpload.FileUpload.getInstance().getBaseUrl() + '?' + jQuery.param({\n\t\t\t\t\t\t\ttoken: YYIMChat.getToken(),\n\t\t\t\t\t\t\tname: file.name,\n\t\t\t\t\t\t\tmediaType: mediaType,\n\t\t\t\t\t\t\tcreator: YYIMChat.getUserNode(),\n\t\t\t\t\t\t\treceiver: to,\n\t\t\t\t\t\t\ttype: file.type,\n\t\t\t\t\t\t\tsize: file.size,\n\t\t\t\t\t\t\toriginal: 1\n\t\t\t\t\t\t}));\n\t\t\t\t\t} else {\n\t\t\t\t\t\tuploader.setOption('url', info.uploadUrl);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t},\n\n\t\t'QueueChanged': function QueueChanged(uploader) {},\n\n\t\t'OptionChanged': function OptionChanged(uploader, option_name, new_value, old_value) {},\n\n\t\t'UploadProgress': function UploadProgress(uploader, file) {\n\t\t\tvar chatInfo = uploader.getOption('chatInfo'),\n\t\t\t    info;\n\t\t\tif (chatInfo) {\n\t\t\t\tinfo = chatInfo[file.id];\n\t\t\t}\n\n\t\t\targ && arg.progress && arg.progress({\n\t\t\t\tuploaded: uploader.total.uploaded,\n\t\t\t\tqueued: uploader.total.queued,\n\t\t\t\tbytesPerSec: uploader.total.bytesPerSec,\n\t\t\t\tpercent: uploader.total.percent,\n\t\t\t\tsize: uploader.total.size,\n\t\t\t\tloaded: uploader.total.loaded,\n\t\t\t\tfile: file,\n\t\t\t\tchatInfo: info\n\t\t\t});\n\t\t},\n\n\t\t'FilesAdded': function FilesAdded(uploader, files) {\n\t\t\tif (YYIMChat.getConfig().UPLOAD.AUTO_SEND) {\n\t\t\t\tuploader.start();\n\t\t\t}\n\t\t},\n\n\t\t'FilesRemoved': function FilesRemoved(uploader, files) {},\n\n\t\t'FileFiltered': function FileFiltered(uploader, file) {\n\t\t\tvar info = arg.chatInfo({\n\t\t\t\tfileName: file.name\n\t\t\t});\n\t\t\tif (info && info.to) {\n\t\t\t\tif (!YYIMUtil['isWhateType'](info.checkType, 'Function') || info.checkType(file.getSource().type)) {\n\t\t\t\t\tvar chatInfo = uploader.getOption('chatInfo') || {};\n\t\t\t\t\tchatInfo[file.id] = info;\n\t\t\t\t\tuploader.setOption('chatInfo', chatInfo);\n\n\t\t\t\t\targ && arg.fileFiltered && arg.fileFiltered({\n\t\t\t\t\t\tfile: file,\n\t\t\t\t\t\tchatInfo: info\n\t\t\t\t\t});\n\t\t\t\t} else {\n\t\t\t\t\tuploader.removeFile(file);\n\t\t\t\t\targ && arg.error && arg.error({\n\t\t\t\t\t\tfile: file,\n\t\t\t\t\t\tchatInfo: info,\n\t\t\t\t\t\terror: '格式不支持'\n\t\t\t\t\t});\n\t\t\t\t}\n\t\t\t} else {\n\t\t\t\tuploader.removeFile(file);\n\t\t\t\targ && arg.error && arg.error({\n\t\t\t\t\tfile: file,\n\t\t\t\t\tchatInfo: info,\n\t\t\t\t\terror: '请指定接收方'\n\t\t\t\t});\n\t\t\t}\n\t\t},\n\n\t\t'FileUploaded': function FileUploaded(uploader, file, responseObject) {\n\t\t\tif (responseObject.status === 200) {\n\t\t\t\tvar chatInfo = uploader.getOption('chatInfo');\n\t\t\t\tif (file && file.getNative()) {\n\t\t\t\t\tfile.path = file.getNative().path;\n\t\t\t\t}\n\t\t\t\tvar info = chatInfo[file.id];\n\t\t\t\ttry {\n\t\t\t\t\tvar response = JSON.parse(responseObject.response);\n\t\t\t\t\tif (response.code === 0 || response.attachId || response[0]) {\n\t\t\t\t\t\tdelete chatInfo[file.id];\n\t\t\t\t\t\tuploader.setOption('chatInfo', chatInfo);\n\t\t\t\t\t\tuploader.removeFile(file);\n\t\t\t\t\t\t_FileUpload.FileUpload.getInstance().remove(file.id);\n\t\t\t\t\t\targ && arg.success && arg.success({\n\t\t\t\t\t\t\tdata: response,\n\t\t\t\t\t\t\tfile: file,\n\t\t\t\t\t\t\tchatInfo: info\n\t\t\t\t\t\t});\n\t\t\t\t\t} else {\n\t\t\t\t\t\targ && arg.error && arg.error({\n\t\t\t\t\t\t\tdata: response,\n\t\t\t\t\t\t\tfile: file,\n\t\t\t\t\t\t\tchatInfo: info\n\t\t\t\t\t\t});\n\t\t\t\t\t}\n\t\t\t\t} catch (e) {\n\t\t\t\t\targ && arg.error && arg.error({\n\t\t\t\t\t\tdata: e.message,\n\t\t\t\t\t\tfile: file,\n\t\t\t\t\t\tchatInfo: info\n\t\t\t\t\t});\n\t\t\t\t}\n\t\t\t}\n\t\t},\n\n\t\t'ChunkUploaded': function ChunkUploaded(uploader, file, responseObject) {},\n\n\t\t'UploadComplete': function UploadComplete(uploader, files) {},\n\n\t\t'Error': function Error(uploader, errObject) {\n\t\t\tvar file = errObject.file;\n\t\t\tvar chatInfo = uploader.getOption('chatInfo');\n\t\t\tif (chatInfo) {\n\t\t\t\terrObject.chatInfo = chatInfo[file.id];\n\t\t\t}\n\t\t\targ && arg.error && arg.error(errObject);\n\t\t},\n\n\t\t'Destroy': function Destroy(uploader) {}\n\t});\n};\n\n//# sourceURL=webpack:///./src/module/upload/YYIMUploader.js?");

/***/ }),

/***/ "./src/util/YYAIAbility.js":
/*!*********************************!*\
  !*** ./src/util/YYAIAbility.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ \"./node_modules/_babel-runtime@6.26.0@babel-runtime/helpers/classCallCheck.js\");\n\nvar _classCallCheck3 = _interopRequireDefault(_classCallCheck2);\n\nvar _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ \"./node_modules/_babel-runtime@6.26.0@babel-runtime/helpers/createClass.js\");\n\nvar _createClass3 = _interopRequireDefault(_createClass2);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar YYIMAINode = function () {\n    function YYIMAINode(_byte) {\n        (0, _classCallCheck3.default)(this, YYIMAINode);\n\n        this.childs = {};\n        this._byte = _byte || null;\n        this._isWord = false;\n        this._count = 0;\n    }\n\n    (0, _createClass3.default)(YYIMAINode, [{\n        key: 'isWord',\n        value: function isWord() {\n            return this._isWord && this._count == 0;\n        }\n    }, {\n        key: 'asWord',\n        value: function asWord() {\n            this._isWord = true;\n        }\n    }, {\n        key: 'addCount',\n        value: function addCount() {\n            this._count++;\n        }\n    }, {\n        key: 'getCount',\n        value: function getCount() {\n            return this._count;\n        }\n    }]);\n    return YYIMAINode;\n}();\n\nvar YYIMAITrie = function () {\n    function YYIMAITrie() {\n        (0, _classCallCheck3.default)(this, YYIMAITrie);\n\n        this.root = new YYIMAINode(null);\n    }\n\n    (0, _createClass3.default)(YYIMAITrie, [{\n        key: 'toBytes',\n        value: function toBytes(word) {\n            var result = [];\n            for (var i = 0; i < word.length; i++) {\n                var code = word.charCodeAt(i);\n\n                if (code < 0x80) {\n                    result.push(code);\n                } else {\n                    result = result.concat(this.toUTF8(code));\n                }\n            }\n            return result;\n        }\n    }, {\n        key: 'toUTF8',\n        value: function toUTF8(c) {\n            var byte1 = 0xE0 | c >> 12 & 0x0F;\n\n            var byte2 = 0x80 | c >> 6 & 0x3F;\n\n            var byte3 = 0x80 | c & 0x3F;\n\n            return [byte1, byte2, byte3];\n        }\n    }, {\n        key: 'toUTF16',\n        value: function toUTF16(b1, b2, b3) {\n            var byte1 = b1 << 4 | b2 >> 2 & 0x0F;\n            var byte2 = (b2 & 0x03) << 6 | b3 & 0x3F;\n            var utf16 = (byte1 & 0x00FF) << 8 | byte2;\n\n            return utf16;\n        }\n    }, {\n        key: 'add',\n        value: function add(word) {\n            var node = this.root,\n                bytes = this.toBytes(word),\n                len = bytes.length;\n            for (var i = 0; i < len; i++) {\n                var c = bytes[i];\n\n                if (!(c in node.childs)) {\n                    node.childs[c] = new YYIMAINode(c);\n                }\n                node = node.childs[c];\n            }\n            node.asWord();\n        }\n    }, {\n        key: 'search',\n        value: function search(bytes) {\n            var node = this.root,\n                len = bytes.length,\n                result = [];\n            var word = [],\n                j = 0;\n            for (var i = 0; i < len; i++) {\n                var c = bytes[i],\n                    childs = node.childs;\n                if (!(c in childs)) {\n                    return result;\n                }\n\n                if (c < 0x80) {\n                    word.push(String.fromCharCode(c));\n                } else {\n                    j++;\n                    if (j % 3 == 0) {\n                        var b1 = bytes[i - 2];\n                        var b2 = bytes[i - 1];\n                        var b3 = c;\n                        word.push(String.fromCharCode(this.toUTF16(b1, b2, b3)));\n                    }\n                }\n\n                if (word.join('') in stop) {\n                    return result;\n                }\n\n                var cnode = childs[c];\n                if (cnode.isWord()) {\n                    cnode.addCount();\n                    result.push(word.join(''));\n                }\n                node = cnode;\n            }\n\n            return result;\n        }\n    }, {\n        key: 'splitWords',\n        value: function splitWords(words) {\n            var bytes = this.toBytes(words);\n            var start = 0,\n                end = bytes.length - 1,\n                result = [];\n\n            while (start != end) {\n                var word = [];\n                for (var i = start; i <= end; i++) {\n                    var b = bytes[i];\n                    word.push(b);\n\n                    var finds = this.search(word);\n                    if (finds !== false && finds.length > 0) {\n                        result = result.concat(finds);\n                    }\n                }\n                start++;\n            }\n\n            return result;\n        }\n    }, {\n        key: 'init',\n        value: function init(dict) {\n            for (var i = 0; i < dict.length; i++) {\n                this.add(dict[i]);\n            }\n        }\n    }]);\n    return YYIMAITrie;\n}();\n\nvar YYAIAbility = function () {\n    function YYAIAbility() {\n        (0, _classCallCheck3.default)(this, YYAIAbility);\n\n        this.dicts = [];\n        this.stopKeyword = { \"的\": 1 };\n\n        this.isOpenFilter = false;\n\n        this.isAIAbility = true;\n    }\n\n    (0, _createClass3.default)(YYAIAbility, [{\n        key: 'openAIAbility',\n        value: function openAIAbility(isAIAbility) {\n            this.isAIAbility = isAIAbility;\n        }\n    }, {\n        key: 'openFilterWords',\n        value: function openFilterWords(isOpenFilter) {\n            this.isOpenFilter = isOpenFilter;\n        }\n    }, {\n        key: 'setDictionaries',\n        value: function setDictionaries(dictArray) {\n            if (dictArray) {\n                for (var i = 0; i < dictArray.length; i++) {\n                    this.dicts.push(dictArray[i]);\n                }\n            }\n        }\n    }, {\n        key: 'intelligentAnalysis',\n        value: function intelligentAnalysis(keyword) {\n            if (!this.isOpenFilter) {\n                return true;\n            }\n            if (keyword && this.isAIAbility) {\n                var trie = new YYIMAITrie();\n                trie.init(this.dicts);\n                var result = trie.splitWords(keyword);\n                return result.length > 0;\n            }\n            return false;\n        }\n    }]);\n    return YYAIAbility;\n}();\n\nexports.default = new YYAIAbility();\n\n//# sourceURL=webpack:///./src/util/YYAIAbility.js?");

/***/ }),

/***/ "./src/util/YYIMConsoleLogger.js":
/*!***************************************!*\
  !*** ./src/util/YYIMConsoleLogger.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.YYIMConsoleLogger = undefined;\n\nvar _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ \"./node_modules/_babel-runtime@6.26.0@babel-runtime/helpers/classCallCheck.js\");\n\nvar _classCallCheck3 = _interopRequireDefault(_classCallCheck2);\n\nvar _config = __webpack_require__(/*! ../config/config */ \"./src/config/config.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar YYIMConsoleLogger = function YYIMConsoleLogger(level) {\n\tvar _this = this,\n\t    _arguments = arguments;\n\n\t(0, _classCallCheck3.default)(this, YYIMConsoleLogger);\n\n\tthis.level = !level ? level == 0 ? 0 : 3 : level;\n\tthis.start = function () {};\n\n\tthis.log = function (groupname, level, obj1, obj2) {\n\t\tif (!_config.YYIMConfiguration.LOG.ENABLE) {\n\t\t\treturn;\n\t\t}\n\t\tlevel = !level ? level == 0 ? 0 : 3 : level;\n\t\tif (level > _this.level) {\n\t\t\treturn;\n\t\t}\n\t\tif (typeof console == 'undefined' || typeof console.group == 'undefined') {\n\t\t\treturn;\n\t\t}\n\t\ttry {\n\t\t\tconsole.group(groupname);\n\t\t\tswitch (level) {\n\t\t\t\tcase 0:\n\t\t\t\t\tconsole.error(groupname);\n\t\t\t\t\tconsole.trace();\n\t\t\t\t\tbreak;\n\t\t\t\tcase 1:\n\t\t\t\t\tconsole.warn(groupname);\n\t\t\t\t\tconsole.trace();\n\t\t\t\t\tbreak;\n\t\t\t\tcase 2:\n\t\t\t\t\tconsole.info(groupname);\n\t\t\t\t\tbreak;\n\t\t\t\tcase 4:\n\t\t\t\t\tconsole.debug(groupname);\n\t\t\t\t\tbreak;\n\t\t\t\tdefault:\n\t\t\t\t\tconsole.log(groupname);\n\t\t\t\t\tbreak;\n\t\t\t}\n\t\t\tvar argLength = _arguments.length;\n\t\t\tif (argLength > 2) {\n\t\t\t\tfor (var i = 2; i < argLength; i++) {\n\t\t\t\t\tvar obj = _arguments[i];\n\t\t\t\t\tif (obj) {\n\t\t\t\t\t\tif (obj instanceof JSJaCPacket) {\n\t\t\t\t\t\t\tconsole.info(obj.doc.xml);\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\tconsole.debug(obj);\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\tconsole.groupEnd();\n\t\t} catch (e1) {\n\t\t\ttry {\n\t\t\t\tconsole.error(e1);\n\t\t\t} catch (e2) {}\n\t\t}\n\t};\n\tthis.logParam = function (level) {\n\t\tlevel = level || 3;\n\t\tvar caller = _this.logParam.caller;\n\t\t_this.log(\"arguments:\", level, caller.arguments);\n\t};\n\tthis.setLevel = function (level) {\n\t\t_this.level = level;\n\t\treturn _this;\n\t};\n\tthis.getLevel = function () {\n\t\treturn _this.level;\n\t};\n};\n\nexports.YYIMConsoleLogger = YYIMConsoleLogger;\n\n//# sourceURL=webpack:///./src/util/YYIMConsoleLogger.js?");

/***/ }),

/***/ "./src/util/YYIMJIDUtil.js":
/*!*********************************!*\
  !*** ./src/util/YYIMJIDUtil.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.YYIMJIDUtil = undefined;\n\nvar _constant = __webpack_require__(/*! ../config/constant */ \"./src/config/constant.js\");\n\nvar _config = __webpack_require__(/*! ../config/config */ \"./src/config/config.js\");\n\nvar _manager = __webpack_require__(/*! ../core/manager */ \"./src/core/manager.js\");\n\nvar getBareJID = function getBareJID(jid) {\n\tvar userBareJid = _manager.YYIMManager.getInstance().getUserBareJID();\n\tvar tmpJid = void 0;\n\tif (jid) {\n\t\tif (jid instanceof JSJaCJID) {\n\t\t\tif (jid.getBareJID() == userBareJid) return jid.toString();\n\t\t\treturn jid.getBareJID();\n\t\t} else if (typeof jid == \"string\") {\n\t\t\ttmpJid = new JSJaCJID(jid);\n\t\t\tif (tmpJid.getBareJID() == userBareJid) return tmpJid.toString();\n\t\t\treturn tmpJid.getBareJID();\n\t\t} else if (jid.jid && jid.jid instanceof JSJaCJID) {\n\t\t\ttmpJid = jid.jid;\n\t\t\tif (tmpJid.getBareJID() == userBareJid) return tmpJid.toString();\n\t\t\treturn tmpJid.getBareJID();\n\t\t}\n\t}\n\tthrow new JSJaCJIDInvalidException(\"invalid jid: \" + jid);\n};\n\nvar getID = function getID(jid) {\n\tvar appkey = void 0,\n\t    tmp = void 0,\n\t    index = void 0,\n\t    id = void 0;\n\tid = YYIMCommonUtil.isStringAndNotEmpty(jid) ? (appkey = _manager.YYIMManager.getInstance().getAppkey(), index = jid.indexOf('@'), index != -1 ? (tmp = jid.substring(0, index), tmp.indexOf(appkey) > 0 ? tmp.replace(appkey, '') : tmp) : jid.indexOf(appkey) > 0 ? jid.replace(appkey, '') : jid) : null;\n\treturn id ? id.toString() : id;\n};\n\nvar YYIMJIDUtil = {\n\tgetNode: function getNode(jid) {\n\t\tjid = jid.toString();\n\t\tif (YYIMCommonUtil.isStringAndNotEmpty(jid)) {\n\t\t\tvar appkey = _manager.YYIMManager.getInstance().getAppkey();\n\t\t\tvar node = jid;\n\n\t\t\tif (node.indexOf('\\@') > -1) {\n\t\t\t\tif (node.indexOf('\\@') === 0) {\n\t\t\t\t\tthrow \"\\\"\" + jid + \"\\\" Can't start with  \\\"@\\\"!\";\n\t\t\t\t} else {\n\t\t\t\t\tnode = node.substring(0, node.indexOf('\\@'));\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tif (node.indexOf('\\.') > -1) {\n\t\t\t\tif (node.indexOf('\\.') === 0) {\n\t\t\t\t\tthrow \"\\\"\" + jid + \"\\\" Can't start with \\\".\\\"!\";\n\t\t\t\t} else {\n\t\t\t\t\tnode = node.substring(0, node.indexOf('\\.'));\n\t\t\t\t}\n\t\t\t}\n\t\t\treturn node ? node + appkey : node;\n\t\t} else {\n\t\t\tthrow \"\\\"\" + jid + \"\\\" Can't be Number Or Empty!\";\n\t\t}\n\t},\n\tgetResource: function getResource(jid) {\n\t\treturn YYIMCommonUtil.isStringAndNotEmpty(jid) ? jid.indexOf('/') != -1 ? jid.substring(jid.indexOf('/') + 1) : null : null;\n\t},\n\tbuildUserJID: function buildUserJID(idOrJid, resource) {\n\t\treturn YYIMCommonUtil.isStringAndNotEmpty(idOrJid) ? idOrJid.indexOf('@') != -1 ? idOrJid : idOrJid + '@' + _config.YYIMConfiguration.YY_IM_DOMAIN + (resource ? '/' + resource : '') : null;\n\t},\n\tgetDomain: function getDomain(jid) {\n\t\treturn YYIMCommonUtil.isStringAndNotEmpty(jid) ? jid.indexOf('@') != -1 ? jid.substring(jid.indexOf('@') + 1) : null : null;\n\t},\n\tbuildChatGroupJID: function buildChatGroupJID(idOrJid) {\n\t\treturn YYIMCommonUtil.isStringAndNotEmpty(idOrJid) ? idOrJid.indexOf('@') != -1 ? idOrJid : idOrJid + '@' + _config.YYIMConfiguration.DOMAIN.CHATROOM : null;\n\t},\n\tbuildPubAccountJID: function buildPubAccountJID(idOrJid) {\n\t\treturn YYIMCommonUtil.isStringAndNotEmpty(idOrJid) ? idOrJid.indexOf('@') != -1 ? idOrJid : idOrJid + '@' + _config.YYIMConfiguration.DOMAIN.PUBACCOUNT : null;\n\t},\n\tgetChatTypeByJid: function getChatTypeByJid(Jid) {\n\t\tif (!!Jid) {\n\t\t\tswitch (YYIMJIDUtil.getDomain(Jid)) {\n\t\t\t\tcase _config.YYIMConfiguration.DOMAIN.CHATROOM:\n\t\t\t\t\treturn _constant.CHAT_TYPE.GROUP_CHAT;\n\t\t\t\tcase _config.YYIMConfiguration.DOMAIN.PUBACCOUNT:\n\t\t\t\t\treturn _constant.CHAT_TYPE.PUB_ACCOUNT;\n\t\t\t\tdefault:\n\t\t\t\t\treturn _constant.CHAT_TYPE.CHAT;\n\t\t\t}\n\t\t}\n\t},\n\n\tgetBareJID: getBareJID,\n\tgetID: getID\n};\n\nexports.YYIMJIDUtil = YYIMJIDUtil;\n\n//# sourceURL=webpack:///./src/util/YYIMJIDUtil.js?");

/***/ })

/******/ });