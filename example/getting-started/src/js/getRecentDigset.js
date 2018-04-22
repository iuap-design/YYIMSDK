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
            //result.list是最近联系人
            if (result.list.length) {
                result.list.forEach(function(e, i){
                    //获取个人信息
                    YYIMChat.getVCard({
                        id: e.jid,
                        success: function (result) {
                            if (result.ts !== -1) {
                                e.name = result.nickname;
                                if (result.photo) {
                                    e.photo = result.photo;
                                } else {
                                    e.photo = '';
                                }
                                $hcontacts[0].innerHTML += `<li data-sessionVersion="${e.sessionVersion}" data-id="${e.id}" data-type="${e.type}">
                                    <i class="close">×</i>
                                    <div class="avatar">
                                        <img src="./imgs/avatar.jpg" alt="">
                                    </div>
                                    <div class="detail">
                                        <h3 class="name cuttxt">${e.id}</h3>
                                        <p class="msg cuttxt">${e.lastMessage && e.lastMessage.data.contentType === 2 ? e.lastMessage.data.content : ''}</p>
                                    </div>
                                    <i class="newtip cuttxt">99</i>
                                </li>`;
                            }
                        },
                        error: function (err) {
                            console.log(err);
                        },
                        complete: function () {
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