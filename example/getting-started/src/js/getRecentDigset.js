//dom元素
import {
    $hcontacts
} from './jqelements';

//获取最近联系人
export default () => {
    $hcontacts.html('');
    // 拉取摘要
    YYIMChat.getRecentDigset({
        success: function (result) {
            let targetuserid = localStorage.getItem('targetuserid');
            //result.list是最近联系人
            if (result.list.length) {
                let contactStr = '';
                result.list.forEach(function(e, i){
                    //目前测试只显示个人聊天，不显示群或其他
                    if(e.type !== 'chat'){return;}
                    $hcontacts.html('');
                    contactStr += `<li class="${targetuserid && targetuserid === e.id ? 'active' : ''}" data-sessionVersion="${e.sessionVersion}" data-id="${e.id}" data-type="${e.type}">
                                        <i data-id="${e.id}" class="close">×</i>
                                        <div class="avatar">
                                            <img src="./imgs/avatar.jpg" alt="">
                                        </div>
                                        <div class="detail">
                                            <h3 class="name cuttxt">${e.name || e.id}</h3>
                                            <p class="msg cuttxt">${e.lastMessage && e.lastMessage.data.contentType === 2 ? e.lastMessage.data.content : ''}</p>
                                        </div>
                                        <i class="newtip cuttxt">2</i>
                                    </li>`;
                    $hcontacts.html(contactStr);
                });
            }
        },
        error:function (err){
            console.log(err);
        }
    });
}