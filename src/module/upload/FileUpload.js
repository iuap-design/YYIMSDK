import { YYIMChat } from '../../core/manager';

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

export { FileUpload };