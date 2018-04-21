//dom元素
import {
    $j_bq_box,
    $chats_list
} from './jqelements';
import { expressionList } from './constants';

//放置表情列表
$j_bq_box.html(expressionList.data.map((t) => {
    return `<li data-code="${t.actionData}"><img src="${expressionList.path+t.url}" title="${t.actionData}" alt=""></li>`;
}));

//用图片替换文本消息中表情信息
const replaceEmoji = (str) => {
    return str.replace(/\[[^\[\]]+\]/g,(e) => {
        let i = -1;
        do{
            i ++;
        }while (e !== expressionList.data[i].actionData);
        return `<img src="${expressionList.path + expressionList.data[i].url}" alt="" />`;
    });
};

//渲染聊天记录,直接传入聊天记录列表即可
export default (chats) => {
    let chatsStr = '';
    let myid = JSON.parse(localStorage.getItem('currentuserinfo')).id;
    chats.forEach(function(chat, i){
        let isfromme = myid === chat.from;
        if(chat.data.contentType === 2){
            chatsStr += `<li>
                            <div class="chat-tip">${new Date(chat.dateline).toLocaleTimeString()}</div>
                            <div class="chat-content">
                                <div class="${ isfromme? 'chat-avatar chat-avatar-send' :'chat-avatar'}">
                                    <img src="./imgs/avatar.jpg" alt="">
                                </div>
                                <div class="${ isfromme? 'chat-txt chat-txt-send' :'chat-txt'}">
                                    <div class="chat-user-name">${chat.from}</div>
                                    <div class="chat-msg">${replaceEmoji(chat.data.content)}</div>
                                </div>
                            </div>
                        </li> `;
        }
    });
    $chats_list.html(chatsStr);
};