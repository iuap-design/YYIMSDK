import renderChatGroups from '../render/renderChatGroups';


export default () => {

    //获取群组列表
    YYIMChat.getChatGroups({
        success:function(data){
            //保存群列表数组
            localStorage.setItem('roomItems', JSON.stringify(data.roomItems));
            renderChatGroups(data.roomItems);
        },
        error:function(err){
            console.log(err);
        }
    });
}