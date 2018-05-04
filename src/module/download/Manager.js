import { YYIMChat } from '../../core/manager';
	
	/**
	 * 获取缩略图列表
	 * @param {Object} arg {
	 * 	attachId: String,
	 *  success: function,
	 *  error: function,
	 *  complete: function,
	 * }
	 */
	function getTransformFileList(arg) {
		jQuery.ajax({
			url: YYIMChat.getConfig().SERVLET.REST_TRANSFORM_SERVLET + 'docInfo',
			type: 'get',
			data: {
				attachId: arg.attachId,
				token: YYIMChat.getToken(),
				downloader: YYIMChat.getUserNode()
			},
			dataType: 'json',
			cache: false,
			success: function(data){
				arg.success && arg.success(data);
				arg = null;
			},
			error: function(xhr){
				try{
					arg.error && arg.error(JSON.parse(xhr.responseText));
					arg = null;
				}catch(e){
					arg.error && arg.error();
					arg = null;
				}
			}
		});
	}
	
	/**
	 * 获取附件地址
	 * @param {Object} 
	 * attachId: String, //附件id，必传
	 * mediaType: Number //附件类型，1或者2，不传默认2
	 */
	function getFileUrl(attachId,mediaType){
		var config = YYIMChat.getConfig();
		if(attachId){
			if(/^https?:\/\/|^data:image\/jpeg;/.test(attachId)){
				return attachId;
			}
			var url =  config.SERVLET.REST_RESOURCE_SERVLET +  config.MULTI_TENANCY.ETP_KEY + '/' +  config.MULTI_TENANCY.APP_KEY + '/download';
			return url + '?' + jQuery.param({
				attachId: attachId,
				downloader: YYIMChat.getUserNode(),
				token: YYIMChat.getToken(),
				mediaType: (mediaType === 1)? mediaType: 2
			});
		}
	}

	export {
		getTransformFileList,
		getFileUrl
	};