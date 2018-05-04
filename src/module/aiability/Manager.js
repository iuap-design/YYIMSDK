    import { YYIMManager, YYIMChat } from '../../core/manager';
    
    /**
     * 设置IM具备AI能力 yaoleib20171214
     * arg {
	 * success:function,
	 * error:function,
	 * complete:function
	 * }
     */
    function setAIAbility(arg){
        var config = YYIMChat.getConfig();
        jQuery.ajax({
            url: config.SERVLET.REST_USER_SERVLET + config.MULTI_TENANCY.ETP_KEY + '/' + config.MULTI_TENANCY.APP_KEY + '/' + YYIMChat.getUserID() + '/profile/intelligentable?token=' + YYIMChat.getToken(),
            type: 'post',
            data: JSON.stringify(arg),
            dataType: 'json',
            cache: false,
            processData:false,
            contentType: "application/json", //必须有
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
     * 获取用户AI热词,用于前端过滤 yaoleib20171214
     * arg {
	 * success:function,
	 * error:function,
	 * complete:function
	 * }
     */
    function getAIWords(arg){
        var config = YYIMChat.getConfig();
		jQuery.ajax({
            url: config.SERVLET.REST_USER_SERVLET + config.MULTI_TENANCY.ETP_KEY + '/' + config.MULTI_TENANCY.APP_KEY + '/' + YYIMChat.getUserID() + '/intelligent/words?token=' + YYIMChat.getToken() + '&apiKey=' + YYIMChat.getApiKey(),
            type: 'get',
            data: '',
            dataType: 'json',
            cache: false,
            processData:false,
            contentType: "application/json", //必须有
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
     * 获取当前在线的设备 yaoleib20171219
     * arg {
	 * success:function,
	 * error:function,
	 * complete:function
	 * }
     */
    function getMultiTerminals(arg){
        var config = YYIMChat.getConfig();
		jQuery.ajax({
            url: config.SERVLET.REST_USER_SERVLET + config.MULTI_TENANCY.ETP_KEY + '/' + config.MULTI_TENANCY.APP_KEY + '/' + YYIMChat.getUserID() + '/multiterminals?token=' + YYIMChat.getToken(),
            type: 'get',
            data: '',
            dataType: 'json',
            cache: false,
            processData:false,
            contentType: "application/json", //必须有
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
     * 发送协同命令 yaoleib20171219
     * arg {
	 * success:function,
	 * error:function,
	 * complete:function
	 * }
     */
    function sendMultiTerminalsCommand(arg){
        var config = YYIMChat.getConfig();
		jQuery.ajax({
            url: config.SERVLET.REST_USER_SERVLET + config.MULTI_TENANCY.ETP_KEY + '/' + config.MULTI_TENANCY.APP_KEY + '/' + YYIMChat.getUserID() + '/multiterminals/command?token=' + YYIMChat.getToken(),
            type: 'POST',
            data: arg.data,
            dataType: 'json',
            cache: false,
            processData:false,
            contentType: "application/json", //必须有
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

	export {
        setAIAbility,
        getAIWords,
        getMultiTerminals,
        sendMultiTerminalsCommand
	};
