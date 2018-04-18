var Manager = (function(){
	/**
     * 设置IM具备AI能力 yaoleib20171214
     * arg {
	 * success:function,
	 * error:function,
	 * complete:function
	 * }
     */
    function setAIAbility(arg){
        jQuery.ajax({
            url: YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + YYIMManager.getInstance().getUserID() + '/profile/intelligentable?token=' + YYIMManager.getInstance().getToken(),
            type: 'post',
            data: JSON.stringify(arg),
            dataType: 'json',
            cache: false,
            processData:false,
            contentType: "application/json", //必须有
            success: function(data){
                arg.success && arg.success(arg);
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
		jQuery.ajax({
            url: YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + YYIMManager.getInstance().getUserID() + '/intelligent/words?token=' + YYIMManager.getInstance().getToken() + '&apiKey=' + YYIMChat.getApiKey(),
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
		jQuery.ajax({
            url: YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + YYIMManager.getInstance().getUserID() + '/multiterminals?token=' + YYIMManager.getInstance().getToken(),
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
		jQuery.ajax({
            url: YYIMChat.getConfig().SERVLET.REST_USER_SERVLET + YYIMChat.getConfig().MULTI_TENANCY.ETP_KEY + '/' + YYIMChat.getConfig().MULTI_TENANCY.APP_KEY + '/' + YYIMManager.getInstance().getUserID() + '/multiterminals/command?token=' + YYIMManager.getInstance().getToken(),
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

	return {
        setAIAbility: setAIAbility,
        getAIWords: getAIWords,
        getMultiTerminals: getMultiTerminals,
        sendMultiTerminalsCommand: sendMultiTerminalsCommand
	};
})();
