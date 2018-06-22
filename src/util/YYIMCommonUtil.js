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
	mobile: /^[1][3578][0-9]{9}$/, //手机号
	phone: /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/ //手机和座机两种格式	
};