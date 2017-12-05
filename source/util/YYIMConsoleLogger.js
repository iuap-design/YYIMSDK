function YYIMConsoleLogger(level) {

	this.level = !level ? (level == 0 ? 0 : 3) : level;

	this.start = function() {};
	/**
	 * 
	 * @param {String}     groupname  将被打印出来的组名
	 * 
	 * @param {int} level : 0--error; 1--warn, 2--info, 3 --log, 4--debug	若设置系统过滤level = 3, 则只显示级别为1，2的日志
	 * 
	 * @param {Object} obj：不定参数，被调试的对象的当前状态, 采用clone方式保存当前对象状态
	 */
	this.log = function(groupname, level, obj1, obj2) {

		if(!YYIMConfiguration.LOG.ENABLE) {
			return;
		}

		level = !level ? (level == 0 ? 0 : 3) : level;

		if(level > this.level)
			return;
		if(typeof(console) == 'undefined' || typeof(console.group) == 'undefined')
			return;
		try {
			console.group(groupname);
			switch(level) {
				case 0:
					console.error(groupname);
					console.trace();
					break;
				case 1:
					console.warn(groupname);
					console.trace();
					break;
				case 2:
					console.info(groupname);
					break;
				case 4:
					console.debug(groupname);
					break;
				default:
					console.log(groupname);
					break;
			}
			var argLength = arguments.length;
			if(argLength > 2) {
				for(var i = 2; i < argLength; i++) {
					var obj = arguments[i];
					if(obj) {
						if(obj instanceof JSJaCPacket) {
							console.info(obj.doc.xml);
						} else {
							console.debug(obj);
						}
					}
				}
			}
			console.groupEnd();
		} catch(e1) {
			try {
				console.error(e1);
			} catch(e2) {}
		}
	};

	this.logParam = function(level) {
		level = level || 3;
		var caller = this.logParam.caller;
		this.log("arguments:", level, caller.arguments);
	};

	this.setLevel = function(level) {
		this.level = level;
		return this;
	};

	this.getLevel = function() {
		return this.level;
	};
}