import { YYIMManager } from '../../core/manager';
import { FileUpload } from './FileUpload';
import './YYIMUploader';
/**
 * 设置上传配置 rongqb 20160816
 */
YYIMManager.prototype.setUploadOption = function(arg) {
	FileUpload.setUploadOption({
			browse_button: arg.browse_button,
			options: arg.options
	});
};

/**
* 销毁上传按钮 rongqb 20160816
*/
YYIMManager.prototype.destroyUpload = function(browse_button) {
	FileUpload.getInstance().destroy(browse_button);
};

/**
 * 手动开始上传 rongqb 20160816
 * file: //预发送文件的id 或者 文件对象（上文返回的）
 */
YYIMManager.prototype.startUpload = function(file){
	FileUpload.getInstance().start(file);
};

/**
 * 取消上传  rongqb 20160816
 * file: //预取消文件的id 或者 文件对象（上文返回的），非必需
 */
YYIMManager.prototype.cancelUpload = function(file){
	FileUpload.getInstance().end(file);
};

/**
 * 文件正在上传的数量
 */
YYIMManager.prototype.getUploadingSize = function(){
	return FileUpload.getInstance().getUploadingSize();
};

/**
 * 本地图片预览
 * @param {Object} 
 * arg {
 * 	file: file,
 *  success: function,
 *  error: funciton
 * }
 */
YYIMManager.prototype.previewLocalImage = function(arg) {
	arg = arg || {};
	var file = arg.file;
	if(file && /image\//.test(file.type)){ //确保文件是图片
		var that = this;
		try {
			if(file.type == 'image/gif') { //gif使用FileReader进行预览,因为moxie.Image只支持jpg和png
				var fr = new moxie.file.FileReader();
				fr.onload = function() {
					arg.success && arg.success(fr.result);
					fr.destroy();
					fr = null;
				}
				fr.readAsDataURL(file.getSource());
			} else {
				var preloader = new moxie.image.Image();
				preloader.onload = function() {
//					preloader.downsize(that.getConfig().UPLOAD.PREVIEW_SIZE.WIDTH, that.getConfig().UPLOAD.PREVIEW_SIZE.HEIGHT); //先压缩一下要预览的图片,宽300，高300
					var imgsrc = preloader.type == 'image/jpeg' ? preloader.getAsDataURL('image/jpeg', 80) : preloader.getAsDataURL(); //得到图片src,实质为一个base64编码的数据
					arg.success && arg.success(imgsrc); //callback传入的参数为预览图片的url
					preloader.destroy();
					preloader = null;
				};
				preloader.load(file.getSource());
			}
		} catch(e) {
			arg.error && arg.error('Local address parsing errors.');
		}
	}else{
		arg.error && arg.error('The file isn`t Image.');
	}
};