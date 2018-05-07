import { YYIMManager, YYIMChat } from '../../core/manager';
import {
    monitor,
	approveSubscribe,
	rejectSubscribe,
	deleteRosterItem,
	queryRosterItem,
	getRostersPresence,
	updateRosterItem,
	setPresence,
	getVCard,
	getBatchVCards,
	getVCards,
	setVCard,
	addRosterItem,
	favoriteRoster,
	cancelFavoriteRoster,
	updateFavoriteRoster,
	getFavoriteRosterList,
	getRosterItems,
	setTag,
	removeTag
} from './Manager';

YYIMChat.setBackhander({
	'monitor': {
		'rosterMonitor': monitor
	},
	'initCallback': {
		'roster':  function(options){
			YYIMChat.onPresence = options.onPresence || function(){};  //好友上线
			YYIMChat.onSubscribe = options.onSubscribe || function(){}; // 对方请求加好友
			YYIMChat.onRosterDeleted = options.onRosterDeleted || function(){};  // 自己删除好友成功或对方进行了删除操作 
			YYIMChat.onRosterUpdateded = options.onRosterUpdateded || function(){};  // 好友信息更新
			YYIMChat.onRosterFavorited = options.onRosterFavorited || function(){};  // 好友收藏
		}
	}
});

/**
 * 设置上线状态
 * @param arg{show, status} 空则为在线
 *  away -- 该实体或资源临时离开.
    chat -- 该实体或资源活跃并想聊天.
    dnd -- 该实体或资源忙(dnd = "Do Not Disturb"，免打扰).
    xa -- 该实体或资源要离开相当长时间(xa = "eXtended Away"，长时间离开).
       如果show未被提供或为NULL, 该实体被假定在线并且可用. 
 */
YYIMManager.prototype.setPresence = function(arg){
	var presence = {};
	if(arg && arg.show && this.getConstants().STATUS[arg.show.toUpperCase()]){
		presence.show = arg.show;
	}
	if(arg && arg.status){
		presence.status = arg.status;
	}
	setPresence(presence);
};

/**
 * 获取自己或好友的VCard
 * @param arg {
 * 		id : 如果没有则获取自己的VCard,
 * 		success : function,
 * 		error : function
 * }
 */
YYIMManager.prototype.getVCard = function(arg) {
	arg = arg || {};
	if(arg){
		getVCard({
			id: arg.id,
			success : arg.success,
			error : arg.error
		});
	}else{
		arg.error && arg.error();
	}
};

/**
 *  批量拉取roster Vcard
 */
let batchVcardsList = new BaseList();
let batchVcardsTimer;
let _getBatchVCards = function(){
	let handler = batchVcardsList;
	batchVcardsList = new BaseList();
	getBatchVCards({
		ids: JSON.stringify(handler.keys()),
		success: function(vcards){
			handler.forEach(function(item,index){
				try{
					item && item.success && item.success(vcards[item.id]);
				}catch(e){
					//TODO handle the exception
					YYIMChat.log('SuccessHandleBatchVCardsError.',0,e);
				}
			});
			handler.clear();
			handler = null;
		},
		error: function(err){
			handler.forEach(function(item,index){
				try{
					item && item.error && item.error(err);
				}catch(e){
					//TODO handle the exception
					YYIMChat.log('ErrorHandleBatchVCardsError.',0,e);
				}
			});
			handler.clear();
			handler = null;
		}
	});
}

YYIMManager.prototype.getBatchVCards = function(arg) {
    if (arg && arg.id && !batchVcardsList.get(arg.id)) {
        batchVcardsList.set(arg.id, arg);
        clearTimeout(batchVcardsTimer);
        if (batchVcardsList.length() >= this.getConfig().BETCH_MAXLIMIT.ROSTER) {
            _getBatchVCards();
        } else {
            batchVcardsTimer = setTimeout(function() {
                _getBatchVCards();
            }, 200);
        }
    } else {
        arg.error && arg.error();
    }
};

/**
 * 获取所有好友的VCard
 * 
 * @param arg {
 * 		success : function,
 * 		error : function
 * }
 */
YYIMManager.prototype.getVCards = function(arg) {
	if(arg){
		getVCards({
			success : arg.success,
			error : arg.error,
			complete : arg.complete
		});
	}else{
		arg.error && arg.error();
	}
};

/**
 * 修改当前用户的VCard
 * @param arg {
 * 		nickname:String,
 * 		photo:String,
 * 		email:String,
 * 		mobile:Number,
 * 		telephone:Number,
 *      organization:String,
 *      gender:,
 *      number:Number,
 *      remarks:,
 * 		location:String,
 *      position:String,
 * 		success : function,
 * 		error : fcuntion
 * }
 */
YYIMManager.prototype.setVCard = function(arg) {
	setVCard({
		vcard : {
			nickname : arg.nickname,
			photo : arg.photo,
			email : arg.email,
			mobile : arg.mobile,
			telephone : arg.telephone,
			organization : arg.organization,
			gender : arg.gender,
			number : arg.number,
			remarks : arg.remarks,
			location : arg.location,
			position : arg.position
		},
		success : arg.success,
		error : arg.error
	});
};


/**
 * 修改当前用户的Tag rongqb 20160719
 * @param arg {
 * 		tag : Array,
 * 		success : function,
 * 		error : fcuntion
 * }
 */
YYIMManager.prototype.setVCardTag = function(arg){
	arg = arg || {};
	if(YYIMArrayUtil.isArray(arg.tag)){
		var that = this;
		setTag({
			tag: arg.tag,
			success: function(targetId){
				that.getVCard({
					id: targetId,
					success: function(vcard){
						arg.success && arg.success(vcard);
					}
				});
			},
			error: arg.error
		});
	}else{
		arg.error && arg.error();
	}
};

/**
 * 删除当前用户的Tag rongqb 20160719
 * @param arg {
 * 		tag : Array,
 * 		success : function,
 * 		error : fcuntion
 * }
 */
YYIMManager.prototype.removeVCardTag = function(arg){
	arg = arg || {};
	if(YYIMArrayUtil.isArray(arg.tag)){
		var that = this;
		removeTag({
			tag: arg.tag,
			success: function(targetId){
				that.getVCard({
					id: targetId,
					success: function(vcard){
						arg.success && arg.success(vcard);
					}
				});
			},
			error: arg.error
		});
	}else{
		arg.error && arg.error();
	}
};


/**
 * 修改好友的Tag rongqb 20160719
 * @param arg {
 * 		id: String, //targetID 
 * 		tag : Array,
 * 		success : function,
 * 		error : fcuntion
 * }
 */
YYIMManager.prototype.setRosterTag = function(arg){
	arg = arg || {};
	if(arg.id && YYIMArrayUtil.isArray(arg.tag) && arg.id != this.getUserID()){
		setTag({
			id: arg.id,
			tag: arg.tag,
			success: function(targetId){
				arg.success && arg.success(targetId);
			},
			error: arg.error
		});
	}else{
		arg.error && arg.error();
	}
};

/**
 * 删除好友的Tag rongqb 20160719
 * @param arg {
 * 		id: String, //targetID 
 * 		tag : Array,
 * 		success : function,
 * 		error : fcuntion
 * }
 */
YYIMManager.prototype.removeRosterTag = function(arg){
	arg = arg || {};
	if(arg.id && YYIMArrayUtil.isArray(arg.tag) && arg.id != this.getUserID()){
		removeTag({
			id: arg.id,
			tag: arg.tag,
			success: function(targetId){
				arg.success && arg.success(targetId);
			},
			error: arg.error
		});
	}else{
		arg.error && arg.error();
	}
};


/**
 * 获取好友列表[roster]
 * @param arg {
 * 	success: function, 
 * 	error: function,
 * 	complete: function
 * }
 */
YYIMManager.prototype.getRosterItems = function(arg){
	getRosterItems(arg);
};

/**
 * 添加好友[roster]
 * @param id
 */
YYIMManager.prototype.addRosterItem = function(id){
	if(YYIMCommonUtil.isStringAndNotEmpty(id)) {
		addRosterItem(YYIMChat.getJIDUtil().buildUserJID(YYIMChat.getJIDUtil().getNode(id)));
	}
};

/**
 * 同意联系人的订阅请求
 * @param id 请求订阅的联系人的ID
 */
YYIMManager.prototype.approveSubscribe = function(id) {
	if(YYIMCommonUtil.isStringAndNotEmpty(id)) {
		approveSubscribe(YYIMChat.getJIDUtil().buildUserJID(YYIMChat.getJIDUtil().getNode(id)));
	}
};

/**
 * 拒绝联系人的订阅请求
 * @param id 请求订阅的联系人的ID
 */
YYIMManager.prototype.rejectSubscribe = function(id) {
	if(YYIMCommonUtil.isStringAndNotEmpty(id)) {
		rejectSubscribe(YYIMChat.getJIDUtil().buildUserJID(YYIMChat.getJIDUtil().getNode(id)));
	}
};

/**
 * 删除好友[roster]
 * @param arg {id: string, success: function, error: function,complete: function}
 */
YYIMManager.prototype.deleteRosterItem = function(arg) {
	if(YYIMCommonUtil.isStringAndNotEmpty(arg.id)) {
		deleteRosterItem({
			jid: YYIMChat.getJIDUtil().buildUserJID(YYIMChat.getJIDUtil().getNode(arg.id)),
			success: arg.success,
			error: arg.error
		});
	}
};

/**
 * 查找好友[roster][包括好友和非好友]，查询字段：userName, name
 * @param arg {keyword,start, size, success: function, error: function,complete: function}
 */
YYIMManager.prototype.queryRosterItem = function(arg) {
	if(YYIMCommonUtil.isStringAndNotEmpty(arg.keyword)) {
		queryRosterItem(arg);
	}
};

/**
 * 获取用户在线状态 rongqb 20151119
 * arg {
 * username: ['zhangsan','lisi'],
 * success:function,
 * error:function,
 * complete:function,
 * }
 * resource:2.1
 */
YYIMManager.prototype.getRostersPresence = function(arg) {
	if(YYIMArrayUtil.isArray(arg.username)) {
		arg.username = JSON.stringify(arg.username);
		getRostersPresence(arg);
	}
};

/**
 * 更新好友
 * @param arg {
 * 		roster : {
 * 			id : 好友id,
 * 			name : 好友昵称,
 * 			groups : ["group1","group2"] // 好友所在分组
 * 		},
 * 		success : function,
 * 		error : function
 * }
 */
YYIMManager.prototype.updateRosterItem = function(arg) {
	if(arg && arg.roster && YYIMCommonUtil.isStringAndNotEmpty(arg.roster.id)) {
		updateRosterItem({
			roster: {
				jid: YYIMChat.getJIDUtil().buildUserJID(YYIMChat.getJIDUtil().getNode(arg.roster.id)),
				name: arg.roster.name,
				groups: arg.roster.groups
			},
			success: arg.success,
			error: arg.error
		});
	}
};

/**
 * 收藏/取消收藏 联系人[roster]
 * @param arg id
 */
YYIMManager.prototype.favoriteRoster = function(id,type){
	if(YYIMUtil['isWhateType'](id,'String')){
		var jid = YYIMChat.getJIDUtil().buildUserJID(YYIMChat.getJIDUtil().getNode(id));
		if(type == YYIMChat.getConstants().FAVORITE_TYPE.REMOVE){
			cancelFavoriteRoster(jid);
		}else{
			favoriteRoster(jid);
		}
	}
};

/**
 * 修改收藏联系人的备注 rongqb 20161209
 * @param arg id,name
 */
YYIMManager.prototype.updateFavoriteRoster = function(id,name){
	if(YYIMUtil['isWhateType'](id,'String') && YYIMUtil['isWhateType'](name,'String')){
		var jid = YYIMChat.getJIDUtil().buildUserJID(YYIMChat.getJIDUtil().getNode(id));
		updateFavoriteRoster(jid,name);
	}
};

/**
 * 获取收藏联系人列表
 * @param {Object} arg {
 * 	success: function,
 * 	error: function
 * }
 */
YYIMManager.prototype.getFavoriteRosterList = function(arg){
	arg = arg || {};
	getFavoriteRosterList({
		success: arg.success,
		error: arg.error
	});
};
