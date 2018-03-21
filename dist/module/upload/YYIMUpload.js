YYIMChat = (function(YYIMChat){
	var YYIMManager = YYIMChat.constructor;
	
function FileUpload(){
}

FileUpload.prototype = new BaseList();

FileUpload.getInstance = function(){
	if(!this._instance){
		this._instance = new FileUpload();
	}
	return this._instance;
};

FileUpload.prototype.init = function(options,events){
	var settings = {
		browse_button: 'fileUpload',
		file_data_name: 'file',
		url: this.getBaseUrl(),
		filters : {
			max_file_size : '100mb',   //文件限制大小
			prevent_duplicates: !!YYIMChat.getConfig().UPLOAD.PREVENT_DUPLICATES //重复上传
		},
		flash_swf_url: YYIMChat.getConfig().UPLOAD.FLASH_SWF_URL,
        silverlight_xap_url: YYIMChat.getConfig().UPLOAD.SILVERLIGHT_XAP_URL,
        multi_selection: !!YYIMChat.getConfig().UPLOAD.MULTI_SELECTION, //是否可以在文件浏览对话框中选择多个文件
        multipart: true,
        max_retries: 1, //当发生plupload.HTTP_ERROR错误时的重试次数，为0时表示不重试
        chunk_size: 0,
        runtimes : 'gears,html5,flash,silverlight,browserplus'
	};
	
	if(options['mediaType'] == YYIMChat.getConfig().UPLOAD.MEDIATYPE.IMAGE){
		settings['filters']['mime_types'] = [{title : "Image files", extensions : "jpg,gif,png,jpeg,bmp"}];
	}else{
		settings['filters']['mime_types'] = undefined;
	}
	
	jQuery.extend(settings,options);
	var id = settings['browse_button'];
	var uploader = new plupload.Uploader(settings);
	uploader.init();
	uploader.refresh();
	this.bindEvents(uploader,events);
};

FileUpload.prototype.getBaseUrl = function(){
	return YYIMChat.getServletPath().REST_RESOURCE_SERVLET + YYIMChat.getTenancy().ETP_KEY + '/' + YYIMChat.getTenancy().APP_KEY + '/upload';
};

FileUpload.prototype.getUploadingSize = function(){
	var size = 0;
	for(var x in this.list){
		if(this.list.hasOwnProperty(x)){
			var uploader = this.list[x];
			if(uploader){
				var file = uploader.getFile(x);
				
				if(file.status != plupload.FAILED 
				&& file.status != plupload.STOPPED){
					size++;
				}
			}
		}
	}
	return size;
};

FileUpload.prototype.start = function(file){
	var uploader;
	if(file){
		uploader = this.get(file.id || file);
		if(uploader){
			file = uploader.getFile(file.id || file);
			if(file){
				file.status = 1;
			}
			uploader.start();
		}
	}
};

FileUpload.prototype.end = function(file){
	var uploader;
	if(file){
		var fileId = file.id || file;
		uploader = this.get(fileId);
		if(uploader){
			file = uploader.getFile(fileId);
			if(file){
				uploader.removeFile(file);
			}
			this.remove(fileId);
		}
	}else{
		this.forEach(function(uploader){
			uploader.splice(0);
			uploader.destroy();
		});
		this.clear();
	}
};

FileUpload.prototype.bindEvents = function(uploader,arg){
	var that = this;
	//当Plupload初始化完成后触发
	uploader.bind('init',function(uploader){ 
		arg && arg.init && arg.init(uploader);		
    });
    
    //当Init事件发生后触发
	uploader.bind('PostInit',function(uploader){
		arg && arg.PostInit && arg.PostInit(uploader);	
    });
    
    //当调用plupload实例的refresh()方法后会触发该事件
	uploader.bind('Refresh',function(uploader){ 
		arg && arg.Refresh && arg.Refresh(uploader);
    });
    
    //当上传队列的状态发生改变时触发
	uploader.bind('StateChanged',function(uploader){ 
		arg && arg.StateChanged && arg.StateChanged(uploader);
    });
    
    //当上传队列中某一个文件开始上传后触发
	uploader.bind('UploadFile',function(uploader,file){ 
		arg && arg.StateChanged && arg.UploadFile(uploader,file);
    });
    
    //当队列中的某一个文件正要开始上传前触发
	uploader.bind('BeforeUpload',function(uploader,file){ 
		arg && arg.BeforeUpload && arg.BeforeUpload(uploader,file);
    });
    
    //当队列中的某一个文件正要开始上传前触发
	uploader.bind('QueueChanged',function(uploader){ 
		arg && arg.QueueChanged && arg.QueueChanged(uploader);
    });
    
    //当使用Plupload实例的setOption()方法改变当前配置参数后触发
	uploader.bind('OptionChanged',function(uploader,option_name,new_value,old_value){
		arg && arg.OptionChanged && arg.OptionChanged(uploader,option_name,new_value,old_value);
    });
    
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
    uploader.bind('UploadProgress',function(uploader,file){
    		arg && arg.UploadProgress && arg.UploadProgress(uploader,file);
    });
    
    //当文件添加到上传队列后触发
	uploader.bind('FilesAdded',function(uploader,files){
		arg && arg.FilesAdded && arg.FilesAdded(uploader,files);
    });
    
    //当文件从上传队列移除后触发
	uploader.bind('FilesRemoved',function(uploader,files){
		files.forEach(function(file,index){
			that.remove(file.id);
		});
		arg && arg.FilesRemoved && arg.FilesRemoved(uploader,files);
    });
    
    //每一个文件被添加到上传队列前触发
	uploader.bind('FileFiltered',function(uploader,file){
		that.set(file.id,uploader);
		arg && arg.FileFiltered && arg.FileFiltered(uploader,file);
    });
    
    //当队列中的某一个文件上传完成后触发
	uploader.bind('FileUploaded',function(uploader,file,responseObject){
		arg && arg.FileUploaded && arg.FileUploaded(uploader,file,responseObject);
    });
    
    //当使用文件小片上传功能时，每一个小片上传完成后触发
	uploader.bind('ChunkUploaded',function(uploader,file,responseObject){
		arg && arg.ChunkUploaded && arg.ChunkUploaded(uploader,file,responseObject);
    });
    
    //当上传队列中所有文件都上传完成后触发
	uploader.bind('UploadComplete',function(uploader,files){
		arg && arg.UploadComplete && arg.UploadComplete(uploader,files);
    });
    
    //当发生错误时触发
	uploader.bind('Error',function(uploader,errObject){
		arg && arg.Error && arg.Error(uploader,errObject);
    });
    
    //当发生错误时触发
	uploader.bind('Destroy',function(uploader){
		arg && arg.Destroy && arg.Destroy(uploader);
    });
};

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
					
					if(info['required_features']){
						uploader.setOption('required_features',info['required_features']);
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
				if((!YYIMUtil['isWhateType'](info.checkType,'Function') || info.checkType(file.getSource().type))){
					var chatInfo = uploader.getOption('chatInfo') || {};
					chatInfo[file.id] = info;
					uploader.setOption('chatInfo', chatInfo);
					
					arg && arg.fileFiltered && arg.fileFiltered({
						file: file,
						chatInfo: info
					});
				}else{
					uploader.removeFile(file);
					arg && arg.error && arg.error({
						file: file,
						chatInfo: info,
						error: '格式不支持'
					});
				}
			}else{
				uploader.removeFile(file); //拿不到上传的必要信息，任务此次上传失败
				arg && arg.error && arg.error({
					file: file,
					chatInfo: info,
					error: '请指定接收方'
				});
			}
	    },
	    
	    //当队列中的某一个文件上传完成后触发
		'FileUploaded': function(uploader,file,responseObject){
			if(responseObject.status === 200){
				var chatInfo = uploader.getOption('chatInfo');
				if(file && file.getNative()){
					file.path = file.getNative().path;
				}
				var info = chatInfo[file.id];
				try{
					var response = JSON.parse(responseObject.response);
					if(response.code === 0 || response.attachId || response[0]){
						delete chatInfo[file.id];
						uploader.setOption('chatInfo',chatInfo);
						uploader.removeFile(file);
						FileUpload.getInstance().remove(file.id);
						arg && arg.success && arg.success({
							data: response,
							file: file,
							chatInfo: info
						});
					}else{
						arg && arg.error && arg.error({
							data: response,
							file: file,
							chatInfo: info
						});
					}
				}catch(e){
					arg && arg.error && arg.error({
						data: e.message,
						file: file,
						chatInfo: info
					});
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
 	return YYIMManager.getInstance();
})(YYIMChat);
