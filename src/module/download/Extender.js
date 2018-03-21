/**
 * 根据附件id获取 文档转换（图片）后的信息
 * @param {Object} arg
 * {
 * 	attachId：
 *  success:function,
 *  error:function
 *  complete:function
 * }
 */
YYIMManager.prototype.getTransformFileList = function(arg){
	if(arg && arg.attachId) {
		Manager.getTransformFileList(arg);
	} else {
		arg && arg.error && arg.error();
	}
};

YYIMManager.prototype.getFileUrl = function(attachId,mediaType){
	if(attachId){
		return Manager.getFileUrl(attachId,mediaType);
	}
};