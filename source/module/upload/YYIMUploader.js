/**
 * 文件上传 rongqb 20160811
 * @param {Object} 
 * arg {
 *  mediaType: 1/2/3, //1: image,2: file,3: doc
 *  chatInfo: function, //返回to,type
 *  drop_element: //上传文件时的拖拽区域,目前只有html5上传方式才支持拖拽上传
 *  fileFiltered: function, //文件被添加到上传队列
 *  beforeUpload: function, //文件上传之前
 *  success: function,
 *  error: function,
 *  progress: function
 * }
 */
YYIMManager.getInstance().uploader = function(obj, arg){
	arg = arg || {};
	
	if(typeof obj == 'string'){
		obj = document.getElementById(obj);
	}
	
	if(!YYIMUtil['isWhateType'](arg.chatInfo,'Function')){
		arg.error && arg.error('chatInfo isn`t Function.');
		return;
	}
	
	FileUpload.getInstance().init({
		 'mediaType': arg.mediaType || YYIMChat.getConfig().UPLOAD.MEDIATYPE.DOC,
		 'browse_button': obj.id,
		 'drop_element': arg.drop_element
	},{
		'init': function(uploader){ 
			uploader.addFile(obj);
			obj = null;
	    },
	    
	    //当Init事件发生后触发
		'PostInit': function(uploader){
	    },
	    
	    //当调用plupload实例的refresh()方法后会触发该事件
		'Refresh': function(uploader){ 
	    },
	    
	    //当上传队列的状态发生改变时触发
		'StateChanged': function(uploader){
	    },
	    
	    //当上传队列中某一个文件开始上传后触发
		'UploadFile': function(uploader,file){
	    },
	    
	    //当队列中的某一个文件正要开始上传前触发
		'BeforeUpload': function(uploader,file){
			var chatInfo = uploader.getOption('chatInfo');
			if(chatInfo){
				var info = chatInfo[file.id];
				if(info){
					try{
						arg.beforeUpload && arg.beforeUpload({
							file: file,
							chatInfo: info
						});
					}catch(e){}
					
					var mediaType = uploader.getOption('mediaType');
					
					if(YYIMChat.getConfig().UPLOAD.IMAGE_TYPES.test(file.name)){
						mediaType = 1;
					}
					
					if(info['file_data_name']){
						uploader.setOption('file_data_name',info['file_data_name']);
					}
					
					if(mediaType === 1 || !info.uploadUrl){
						var to = YYIMChat.getJIDUtil().buildUserJID(YYIMChat.getJIDUtil().getNode(info.to));
						if(info.type 
						&& info.type == YYIMChat.getConstants().CHAT_TYPE.GROUP_CHAT){
							to = YYIMChat.getJIDUtil().buildChatGroupJID(YYIMChat.getJIDUtil().getNode(info.to));
						}
						uploader.setOption('url', FileUpload.getInstance().getBaseUrl() + '?' + jQuery.param({
							token: YYIMChat.getToken(),	
							name: file.name,
							mediaType: mediaType,
							creator: YYIMChat.getUserNode(),
							receiver: to,
							type: file.type,
							size: file.size,
							original: 1
						}));
					}else{
						uploader.setOption('url', info.uploadUrl); // web: '/file/act/swfupload/fileFrom/40/gid/0'
					}
				}
			}
	    },
	    
	    //当队列中的某一个文件正要开始上传前触发
		'QueueChanged': function(uploader){ 
	    },
	    
	    //当使用Plupload实例的setOption()方法改变当前配置参数后触发
		'OptionChanged': function(uploader,option_name,new_value,old_value){
	    },
	    
	    //会在文件上传过程中不断触发，可以用此事件来显示上传进度
	    /**
	     *  size	上传队列中所有文件加起来的总大小，单位为字节
			loaded	队列中当前已上传文件加起来的总大小,单位为字节
			uploaded	已完成上传的文件的数量
			failed	上传失败的文件数量
			queued	队列中剩下的(也就是除开已经完成上传的文件)需要上传的文件数量
			percent	整个队列的已上传百分比，如50就代表50%
			bytesPerSec	上传速率，单位为 byte/s，也就是 字节/秒
	     */
	    'UploadProgress': function(uploader,file){
	   	 	var chatInfo = uploader.getOption('chatInfo'),info;
			if(chatInfo){
				info = chatInfo[file.id];
			}
			
		    	arg && arg.progress && arg.progress({
	    			uploaded: uploader.total.uploaded,
				queued: uploader.total.queued,
				bytesPerSec: uploader.total.bytesPerSec,
		    		percent: uploader.total.percent,
		    		size: uploader.total.size,
		    		loaded: uploader.total.loaded,
		    		file: file,
		    		chatInfo: info
		    	});
	    },
	    
	    //当文件添加到上传队列后触发
		'FilesAdded': function(uploader,files){
			if(YYIMChat.getConfig().UPLOAD.AUTO_SEND){
				uploader.start();
			}
	    },
	    
	    //当文件从上传队列移除后触发
		'FilesRemoved': function(uploader,files){
	    },
	    
	    //每一个文件被添加到上传队列前触发
		'FileFiltered': function(uploader,file){
			var info = arg.chatInfo({
				fileName: file.name
			});
			if(info && info.to){
				var chatInfo = uploader.getOption('chatInfo') || {};
				chatInfo[file.id] = info;
				uploader.setOption('chatInfo', chatInfo);
				
				arg && arg.fileFiltered && arg.fileFiltered({
					file: file,
					chatInfo: info
				});
			}else{
				uploader.removeFile(file); //拿不到上传的必要信息，任务此次上传失败
				arg && arg.error && arg.error('chatInfo can`t get \'to\' field.');
			}
	    },
	    
	    //当队列中的某一个文件上传完成后触发
		'FileUploaded': function(uploader,file,responseObject){
			if(responseObject.status === 200){
				try{
					var chatInfo = uploader.getOption('chatInfo');
					var response = {
						data: JSON.parse(responseObject.response),
						file: file,
						chatInfo: chatInfo[file.id]
					};
					if(file && file.getNative()){
						response.file.path = file.getNative().path;
					}
					delete chatInfo[file.id];
					uploader.setOption('chatInfo',chatInfo);
					uploader.removeFile(file);
					arg && arg.success && arg.success(response);
				}catch(e){
					arg && arg.error && arg.error('response analysis error.');
				}
			}
	    },
	    
	    //当使用文件小片上传功能时，每一个小片上传完成后触发
		'ChunkUploaded': function(uploader,file,responseObject){
	    },
	    
	    //当上传队列中所有文件都上传完成后触发
		'UploadComplete': function(uploader,files){
	    },
	    
	    //当发生错误时触发
		'Error': function(uploader,errObject){
			var file = errObject.file;
			var chatInfo = uploader.getOption('chatInfo');
			if(chatInfo){
				errObject.chatInfo = chatInfo[file.id];
			}
			arg && arg.error && arg.error(errObject);
	    },
	    
	    //当发生错误时触发
		'Destroy': function(uploader){
	    }
	});
};
