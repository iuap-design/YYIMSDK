//dom元素
import {
    $chats,
    $chats_list
} from '../common/jqelements';

//获取最近联系人函数
import getRecentDigset from '../api/getRecentDigset';

//渲染最近联系人函数
import {
    renderRecentDigset
} from './renderRecentDigset';

//表情数据
import {
    expressionList
} from '../common/constants';

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

//渲染聊天记录,如果需要新加入一条聊天信息，传入一条聊天记录对象即可。
export default (msg) => {
    //拿取本地保存的历史聊天信息
    let historychats = JSON.parse(localStorage.getItem('historychats') || "[]");
    //拿取本地保存的最近联系人数组
    let recentDigset = JSON.parse(localStorage.getItem('recentdigset') || "[]");
    //从本地拿取聊天对方id
    let targetuserid = localStorage.getItem('targetuserid');
    //拿报文ID
    let baowenId = localStorage.getItem('baowenId');
    //拿sessionversionID
    let sessionversionID = localStorage.getItem('sessionversionId');
    //拿我自己的id
    let myid = JSON.parse(localStorage.getItem('currentuserinfo')).id;
    //拿当前的聊天类型
    let chattype = localStorage.getItem('chattype');
    //消息来源id
    let msgfromid = '';
     
    //如果msg存在，说明我正在发送消息或者我接收到了别人的消息
    if (msg) {
        //暂时将小友的消息过滤掉
        if(msg.type=="chat"&&msg.to == "xiaoyou_ai_bot_pre"){
            return;
        }
       
        let isfromme;
        //其他端发消息处理
        if(msg.resource){
            msgfromid = msg.from;
        }
        if (isfromme) { //消息是我发给别人的
            if (chattype === 'chat') {
                msgfromid = chattype === 'chat' ? msg.from : msg.from.roster;
                isfromme = myid === msgfromid;
            } else {
                msgfromid = msg.from.room;
                let sendMsgId = msg.from.roster;
                isfromme = myid === sendMsgId;
            }
            recentDigset.forEach(function (digest, i) {
                if (digest.id === targetuserid) {
                    recentDigset[i].lastContactTime = msg.data.dateline;
                    recentDigset[i].lastMessage = msg;
                    recentDigset[i].sessionVersion++;
                    recentDigset[i].readedVersion = recentDigset[i].sessionVersion;
                    //保存修改后的最近联系人数组
                    localStorage.setItem('recentdigset', JSON.stringify(recentDigset));
                    //渲染最近联系人
                    renderRecentDigset(recentDigset);
                }
            });
            //修改历史消息
            let userVcard = JSON.parse(localStorage.getItem('currentuserinfo') || "{}");

            historychats.unshift({
                data: msg.data,
                dateline: msg.dateline,
                from: msg.from,
                id: msg.id,
                sessionVersion: msg.sessionVersion,
                to: msg.to,
                type: msg.type,
                photo: userVcard.photo || '',
                nickname: userVcard.nickname || userVcard.id,
            });
            //修改后保存
            localStorage.setItem('historychats', JSON.stringify(historychats));
        } else { //消息来自于他人给我发的
            let chattype = msg.type;
            if (chattype === 'chat') {
                msgfromid = chattype === 'chat' ? msg.from : msg.from.roster;
                isfromme = myid === msgfromid;
            } else {
                msgfromid = msg.from.room;
                let sendMsgId = msg.from.roster;
                isfromme = myid === sendMsgId;
            }
            let isdigset = false; //判断对方在不在我的最近联系人里
          //  let chattype = localStorage.getItem('chattype');
            if(chattype == "groupchat"){
                if(msg.from.room == targetuserid){

                    recentDigset.forEach(function (digest, i) {
                        if (digest.id === msgfromid) {
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
                     //发送已读回执
                        YYIMChat.sendReadedReceiptsPacket({
                            to:   targetuserid,
                            id: baowenId,
                            type: "groupchat",
                            sessionVersion:sessionversionID
                        });
                }else{
                    recentDigset.forEach(function (digest, i) {
                        if (digest.id === msgfromid) {
                            isdigset = true;
                            recentDigset[i].lastContactTime = msg.data.dateline;
                            recentDigset[i].lastMessage = msg;
                            recentDigset[i].sessionVersion++;
                            //保存修改后的最近联系人数组
                            localStorage.setItem('recentdigset', JSON.stringify(recentDigset));
                            //渲染最近联系人
                            renderRecentDigset(recentDigset);
                        }
                    });
                }
                
            }else if(chattype == "chat"){
                if(msg.from == targetuserid){
                    recentDigset.forEach(function (digest, i) {
                        if (digest.id === msgfromid) {
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
                     //发送已读回执
                     YYIMChat.sendReadedReceiptsPacket({
                        to:   targetuserid,
                        id: baowenId,
                        type: "chat",
                        sessionVersion:sessionversionID
                    });
                }else{
                    recentDigset.forEach(function (digest, i) {
                        if (digest.id === msgfromid) {
                            isdigset = true;
                            recentDigset[i].lastContactTime = msg.data.dateline;
                            recentDigset[i].lastMessage = msg;
                            recentDigset[i].sessionVersion++;
                            //保存修改后的最近联系人数组
                            localStorage.setItem('recentdigset', JSON.stringify(recentDigset));
                            //渲染最近联系人
                            renderRecentDigset(recentDigset);
                        }
                    }); 
                }
               
            }
            
            //不在最近联系人中，刷新最近联系人列表
            if (!isdigset) {
                getRecentDigset();
            };
            let sendFromId;
            if (chattype === 'chat') {
                sendFromId = msg.from;
                //如果发过来的消息，不是当前正在聊天的，不更新历史消息
                if(msg.from != targetuserid){
                    return;
                }
            } else {
                sendFromId = msg.from.roster;
                //如果发过来的消息，不是当前正在聊天的，不更新历史消息
                if(msg.from.room != targetuserid){
                    return;
                }
            }
            //获取发送的人员头像和姓名
            YYIMChat.getVCard({
                id: sendFromId,
                success: function (res) {
                    //整理最近联系人列表到一个新数组
                    historychats.unshift({
                        data: msg.data,
                        dateline: msg.dateline,
                        from: msg.from,
                        id: msg.id,
                        sessionVersion: msg.sessionVersion,
                        to: msg.to,
                        type: msg.type,
                        photo: res.photo || '',
                        nickname: res.nickname || res.id,
                    });
                    //修改历史消息
                    //historychats.push(msg);
                    //修改后保存
                    localStorage.setItem('historychats', JSON.stringify(historychats));
                    let chatsStr = '';
                    historychats  = historychats.reverse();
                    historychats.forEach(function (chat, i) {
                        let isfromme = chattype === 'chat' ? myid === chat.from : myid === chat.from.roster;
                        // let chatfrom = chattype === 'chat' ? '' : `<div class="chat-user-name">${chat.from.roster}</div>`;
                        let chatfrom = chat.nickname;
                        //文本消息
                        if (chat.data.contentType === 2) {
                            chatsStr += `<li>
                                            <div class="chat-tip">${new Date(chat.data.dateline).toLocaleTimeString()}</div>
                                            <div class="chat-content">
                                                <div class="${ isfromme? 'chat-avatar chat-avatar-send' :'chat-avatar'}">
                                                    <img src=${YYIMChat.getFileUrl(chat.photo)||'./imgs/avatar.jpg'} alt="">
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
                                                    <img src=${YYIMChat.getFileUrl(chat.photo)||'./imgs/avatar.jpg'} alt="">
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
                                                    <img src=${YYIMChat.getFileUrl(chat.photo)||'./imgs/avatar.jpg'} alt="">
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
                    return;
                },
                error: function (err) {
                    //把聊天记录缓存到本地
                    localStorage.setItem('historychats', JSON.stringify(historychatsData));
                    renderHistoryMessage();
                    console.log(err);
                }
            });
            return;
        }


    }
    //如果我没和对方聊天，则不渲染历史信息
    if (msg && msgfromid !== myid && msgfromid !== targetuserid) return;

    let chatsStr = '';
    historychats  = historychats.reverse();
    historychats.forEach(function (chat, i) {
        let isfromme = chattype === 'chat' ? myid === chat.from : myid === chat.from.roster;
        // let chatfrom = chattype === 'chat' ? '' : `<div class="chat-user-name">${chat.from.roster}</div>`;
        let chatfrom = chat.nickname;
        //文本消息
        if (chat.data.contentType === 2) {
            chatsStr += `<li>
                            <div class="chat-tip">${new Date(chat.data.dateline).toLocaleTimeString()}</div>
                            <div class="chat-content">
                                <div class="${ isfromme? 'chat-avatar chat-avatar-send' :'chat-avatar'}">
                                    <img src=${YYIMChat.getFileUrl(chat.photo)||'./imgs/avatar.jpg'} alt="">
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
                                    <img src=${YYIMChat.getFileUrl(chat.photo)||'./imgs/avatar.jpg'} alt="">
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
                                    <img src=${YYIMChat.getFileUrl(chat.photo)||'./imgs/avatar.jpg'} alt="">
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
};