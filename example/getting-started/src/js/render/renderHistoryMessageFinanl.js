import {
    $chats,
    $chats_list
} from '../common/jqelements';
//表情数据
import {
    expressionList
} from '../common/constants';
import { getColor,getNameLastTwo } from '../common/common';
//用图片替换文本消息中表情信息
const replaceEmoji = (str) => {
    return str.replace(/\[[^\[\]]+\]/g, (e) => {
        for (let i = 0; i < expressionList.data.length; i++) {
            if (expressionList.data[i].actionData === e) {
                return `<img class="emoji" src="${expressionList.path + expressionList.data[i].url}" alt="" />`;
                break;
            }
        }
        return e;
    });
};
export default (historychats) => {
       //拿我自己的id
       let myid = JSON.parse(localStorage.getItem('currentuserinfo')).id;
       //拿当前的聊天类型
    let chattype = localStorage.getItem('chattype');
    let chatsStr = '';
        historychats.forEach(function (chat, i) {
            let isfromme = chattype === 'chat' ? myid === chat.from : myid === chat.from.roster;
            // let chatfrom = chattype === 'chat' ? '' : `<div class="chat-user-name">${chat.from.roster}</div>`;
            let chatfrom = chat.nickname;
            //文本消息
            let photoMsgContent = '';
            if(chat.photo){
                photoMsgContent = ` <img src=${chat.photo=="mobile"?"../../imgs/assistant_mobile.png":YYIMChat.getFileUrl(chat.photo)} alt="">`
            }else{
                photoMsgContent = `<div class="history-noPhoto" style="background:${getColor(chatfrom)}">${getNameLastTwo(chatfrom) }</div>`
            }
            if (chat.data.contentType === 2) {
                chatsStr += `<li>
                                <div class="chat-tip">${new Date(chat.data.dateline).toLocaleTimeString()}</div>
                                <div class="chat-content">
                                    <div class="${ isfromme? 'chat-avatar chat-avatar-send' :'chat-avatar'}">
                                    ${photoMsgContent}
                                    </div>
                                    <div class="${ isfromme? 'chat-txt chat-txt-send' :'chat-txt'}">
                                    <p class="tr">${chatfrom}</p>
                                        <div class="chat-msg">${replaceEmoji(chat.data.content)}</div>
                                    </div>
                                </div>
                            </li> `;
            } else if (chat.data.contentType === 8) { //图片消息
                let picurl = YYIMChat.getFileUrl(chat.data.content.attachId);
                chatsStr += `<li>
                                <div class="chat-tip">${new Date(chat.data.dateline).toLocaleTimeString()}</div>
                                <div class="chat-content">
                                    <div class="${ isfromme? 'chat-avatar chat-avatar-send' :'chat-avatar'}">
                                    ${photoMsgContent}
                                    </div>
                                    <div class="${ isfromme? 'chat-txt chat-txt-send' :'chat-txt'}">
                                    <p class="tr">${chatfrom}</p>
                                        <div class="chat-msg">
                                            <img class="chatpic" data-url="${picurl}" src="${picurl}" title="点击查看图片" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </li> `;
            } else if (chat.data.contentType === 4) {
                let picurl = YYIMChat.getFileUrl(chat.data.content.attachId);
                let filename = chat.data.content.name.slice(0, 14);
                chatsStr += `<li>
                                <div class="chat-tip">${new Date(chat.data.dateline).toLocaleTimeString()}</div>
                                <div class="chat-content">
                                    <div class="${ isfromme? 'chat-avatar chat-avatar-send' :'chat-avatar'}">
                                    ${photoMsgContent}
                                    </div>
                                    <div class="${ isfromme? 'chat-txt chat-txt-send' :'chat-txt'}">
                                    <p class="tr">${chatfrom}</p>
                                        <div class="chat-msg">
                                            <a class="chatfile" href="${picurl}" title="点击下载文件">
                                                <span class="filename">${filename}</span>
                                                <span class="filesize">${chat.data.content.size}B</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </li> `;
            }
        });
        $chats_list.html(chatsStr);
        $chats.scrollTop($chats[0].scrollHeight);
}