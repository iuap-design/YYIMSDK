import { YYIMManager } from '../../core/manager';
import {
    getTransformFileList,
    getFileUrl

} from './Manager';

/**
 * 获取缩略图列表
 * @param {Object} arg {
 * 	attachId: String,
 *  success: function,
 *  error: function,
 *  complete: function,
 * }
 */
YYIMManager.prototype.getTransformFileList = function(arg){
	if(arg && arg.attachId) {
		getTransformFileList(arg);
	} else {
		arg && arg.error && arg.error();
	}
};

/**
 * 获取附件地址
 * @param {Object} 
 * attachId: String, //附件id，必传
 * mediaType: Number //附件类型，1或者2，不传默认2
 */
YYIMManager.prototype.getFileUrl = function(attachId,mediaType){
	if(attachId){
		return getFileUrl(attachId,mediaType);
	}
};