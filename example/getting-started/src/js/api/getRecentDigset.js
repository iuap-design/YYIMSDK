
//导入最近联系人渲染函数
import renderRecentDigset from '../render/renderRecentDigset';

//获取最近联系人
export default () => {
    // 获取最近联系人API
    YYIMChat.getRecentDigset({
        success: function (result) {
            if (result.list.length) {
                let recentDigset = [];
                result.list.forEach(function(e, i){
                    //目前测试只显示个人聊天，不显示群或其他 
                    if(e.type !== 'chat' && e.type !== 'groupchat'){return;}
                    //通过id获取个人信息
                    YYIMChat.getVCard({
                        id: e.id,
                        success: function(res){
                            //整理最近联系人列表到一个新数组
                            recentDigset.push({
                                id: res.id,
                                readedVersion: e.readedVersion,
                                sessionVersion: e.sessionVersion,
                                type: e.type,
                                photo: res.photo || '',
                                nickname: res.nickname,
                                lastMessage: e.lastMessage,
                                lastContactTime: e.lastContactTime
                            });
                            //把最近联系人列表保存到本地
                            localStorage.setItem('recentdigset', JSON.stringify(recentDigset));
                            renderRecentDigset(recentDigset);
                        }
                    });
                });
            }
        },
        error:function (err){
            console.log(err);
        }
    });
}