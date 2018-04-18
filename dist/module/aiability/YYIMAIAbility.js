YYIMChat = (function(YYIMChat){
	var YYIMManager = YYIMChat.constructor;
	
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

/**
 * 设置IM具备AI能力 yaoleib20171214
 * arg {
 *  success:function,
 *  error:function,
 *  complete:function
 * }
 */
YYIMManager.prototype.setAIAbility = function(arg){
    arg = arg || {};
    if(!!arg.intelligentable){
        Manager.setAIAbility(arg);
    }else{
        arg.error && arg.error();
    }
};

/**
 * 获取用户AI热词,用于前端过滤 yaoleib20171214
 * arg {
 *  success:function,
 *  error:function,
 *  complete:function
 * }
 */
YYIMManager.prototype.getAIWords = function(arg){
    Manager.getAIWords(arg || {});
};

/**
* 设置AI分析开关是否启用
* isAIAbility boolean
*/
YYIMManager.prototype.openAIAbility = function(isAIAbility) {
    this.isAIAbility = isAIAbility;
};

/**
 * 设置是否启用热词过滤 yaoleib20171225
 * isOpenFilter boolean
 */
YYIMManager.prototype.openFilterWords = function(isOpenFilter){
    YYAIAbility.openFilterWords(isOpenFilter);
};

/**
 * 注入热词 yaoleib20171225
 * arg string 热词时间戳
 */
YYIMManager.prototype.setDictionaries = function(intelligentWordsTime){
    var storageWordsTime = window.localStorage.intelligentWordsTime;
    if(storageWordsTime != intelligentWordsTime){
        YYIMChat.getAIWords({
            success: function(data){
                YYAIAbility.setDictionaries(data.intelligentWords || []);

                // 设置新的时间戳
                window.localStorage.intelligentWordsTime = intelligentWordsTime;
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
};

/**
 * 判断消息是否传递给AI分析 yaoleib20171225
 * arg string
 */
YYIMManager.prototype.intelligentAnalysis = function(keyword){
    YYAIAbility.intelligentAnalysis(keyword);
};

/**
 * 获取当前在线的设备 yaoleib20171219
 * arg {
 * success:function,
 * error:function,
 * complete:function
 * }
 */
YYIMManager.prototype.getMultiTerminals = function(arg){
    Manager.getMultiTerminals(arg || {});
};

/**
 * 发送协同命令 yaoleib20171219
 * arg {
 * success:function,
 * error:function,
 * complete:function
 * }
 */
YYIMManager.prototype.sendMultiTerminalsCommand = function(arg){
    Manager.sendMultiTerminalsCommand(arg || {});
};

 	return YYIMManager.getInstance();
})(YYIMChat);
