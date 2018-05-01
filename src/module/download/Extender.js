import { YYIMManager } from '../../core/manager';
import {
    getTransformFileList,
    getFileUrl

} from './Manager';

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
		getTransformFileList(arg);
	} else {
		arg && arg.error && arg.error();
	}
};

YYIMManager.prototype.getFileUrl = function(attachId,mediaType){
	if(attachId){
		return getFileUrl(attachId,mediaType);
	}
};