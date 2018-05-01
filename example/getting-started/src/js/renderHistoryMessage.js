
//dom元素
import {
    $chats,
    $chats_list
} from './jqelements';

//渲染最近联系人函数
import getRecentDigset from './getRecentDigset';

//渲染最近联系人函数
import renderRecentDigset from './renderRecentDigset';

//表情数据
import { expressionList } from './constants';

//用图片替换文本消息中表情信息
const replaceEmoji = (str) => {
    return str.replace(/\[[^\[\]]+\]/g,(e) => {
        for (let i=0;i<expressionList.data.length;i++){
            if(expressionList.data[i].actionData === e){
                return `<img class="emoji" src="${expressionList.path + expressionList.data[i].url}" alt="" />`;
                break;
            }
        }
        return e;
    });
};

//渲染聊天记录,传入一条聊天记录对象即可
export default (msg) => {
    //拿取本地保存的历史聊天信息
    let historychats = JSON.parse(localStorage.getItem('historychats') || "[]");
    //从本地拿取聊天对方id
    let targetuserid = localStorage.getItem('targetuserid');
    //拿我自己的id
    let myid = JSON.parse(localStorage.getItem('currentuserinfo')).id;

    //如果msg存在，说明不是初次渲染
    if(msg){
        //拿取本地保存的最近联系人数组
        let recentDigset = JSON.parse(localStorage.getItem('recentdigset') || "[]");

        if(msg.from === myid){ //消息是我发给别人的
            recentDigset.forEach(function(digest, i){
                if(digest.id === targetuserid){
                    recentDigset[i].lastContactTime = msg.data.dateline;
                    recentDigset[i].lastMessage = msg;
                    recentDigset[i].sessionVersion++;
                    recentDigset[i].readedVersion++;
                    //保存修改后的最近联系人数组
                    localStorage.setItem('recentdigset', JSON.stringify(recentDigset));
                    //渲染最近联系人
                    renderRecentDigset(recentDigset);
                }
            });
            //修改历史消息
            historychats.push(msg);
            //修改后保存
            localStorage.setItem('historychats',JSON.stringify(historychats));
        } else { //消息来自于他人给我发的
            let isdigset = false; //判断对方在不在我的最近联系人里
            recentDigset.forEach(function(digest, i){
                if(digest.id === msg.from){
                    isdigset = true;
                    recentDigset[i].lastContactTime = msg.data.dateline;
                    recentDigset[i].lastMessage = msg;
                    recentDigset[i].sessionVersion++;
                    recentDigset[i].readedVersion++;
                    //保存修改后的最近联系人数组
                    localStorage.setItem('recentdigset', JSON.stringify(recentDigset));
                    //渲染最近联系人
                    renderRecentDigset(recentDigset);
                }
            });
            //不在最近联系人中，刷新最近联系人列表
            if(!isdigset){getRecentDigset();}
            //我正在和他聊天
            if(msg.from === targetuserid){
                //修改历史消息
                historychats.push(msg);
                //修改后保存
                localStorage.setItem('historychats',JSON.stringify(historychats));
            }
        }
    }
    //如果我没和对方聊天，则不渲染历史信息
    if(msg && msg.from !== myid && msg.from !== targetuserid) return;

    let chatsStr = '';
    historychats.forEach(function(chat, i){
        let isfromme = myid === chat.from;
        //文本消息
        if(chat.data.contentType === 2){
            chatsStr += `<li>
                            <div class="chat-tip">${new Date(chat.data.dateline).toLocaleTimeString()}</div>
                            <div class="chat-content">
                                <div class="${ isfromme? 'chat-avatar chat-avatar-send' :'chat-avatar'}">
                                    <img src="./imgs/avatar.jpg" alt="">
                                </div>
                                <div class="${ isfromme? 'chat-txt chat-txt-send' :'chat-txt'}">
                                    <!--<div class="chat-user-name">${chat.from}</div>-->
                                    <div class="chat-msg">${replaceEmoji(chat.data.content)}</div>
                                </div>
                            </div>
                        </li> `;
        }else if(chat.data.contentType === 8){  //图片消息
            let picurl = YYIMChat.getFileUrl(chat.data.content.attachId);
            chatsStr += `<li>
                            <div class="chat-tip">${new Date(chat.data.dateline).toLocaleTimeString()}</div>
                            <div class="chat-content">
                                <div class="${ isfromme? 'chat-avatar chat-avatar-send' :'chat-avatar'}">
                                    <img src="./imgs/avatar.jpg" alt="">
                                </div>
                                <div class="${ isfromme? 'chat-txt chat-txt-send' :'chat-txt'}">
                                    <!--<div class="chat-user-name">${chat.from}</div>-->
                                    <div class="chat-msg">
                                        <img class="chatpic" data-url="${picurl}" src="${picurl}" title="点击查看图片" alt="" />
                                    </div>
                                </div>
                            </div>
                        </li> `;
        }else if(chat.data.contentType === 4){
            let picurl = YYIMChat.getFileUrl(chat.data.content.attachId);
            let filename = chat.data.content.name.slice(0, 20);
            chatsStr += `<li>
                            <div class="chat-tip">${new Date(chat.data.dateline).toLocaleTimeString()}</div>
                            <div class="chat-content">
                                <div class="${ isfromme? 'chat-avatar chat-avatar-send' :'chat-avatar'}">
                                    <img src="./imgs/avatar.jpg" alt="">
                                </div>
                                <div class="${ isfromme? 'chat-txt chat-txt-send' :'chat-txt'}">
                                    <!--<div class="chat-user-name">${chat.from}</div>-->
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
};