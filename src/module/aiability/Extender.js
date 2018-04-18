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
