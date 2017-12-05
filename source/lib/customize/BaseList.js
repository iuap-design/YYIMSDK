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