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

	if(arg.attachId || arg.path){
		this.attachId = arg.attachId || arg.path || this.attachId || '';
	}
	
	if(arg.id){
		this.id = arg.id || this.id;
	}

	if(arg.fid){
		this.fid = arg.fid || 0;
	}
	
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


