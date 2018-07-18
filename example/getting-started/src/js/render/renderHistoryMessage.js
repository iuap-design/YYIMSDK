//dom元素
import {
    $chats,
    $chats_list
} from '../common/jqelements';

//获取最近联系人函数
import getRecentDigset from '../api/getRecentDigset';
//获取最后渲染函数
import renderHistoryMessageFinanl from '../render/renderHistoryMessageFinanl'
//渲染最近联系人函数
import {
    renderRecentDigset
} from './renderRecentDigset';

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

//渲染聊天记录,如果需要新加入一条聊天信息，传入一条聊天记录对象即可。
export default (msg,wherefrom) => {
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
     
   
    if(wherefrom=="digestClick"){
        historychats  = historychats.reverse();
        renderHistoryMessageFinanl(historychats);
        return;
    }else if(wherefrom=="reciiveMessage"){
          //暂时将小友的消息过滤掉
        if(msg.type=="chat"&&msg.to == "xiaoyou_ai_bot_pre"){
            return;
        }
        if(msg.type== "chat"){
            msgfromid =  msg.from ;
            let userVcard = JSON.parse(localStorage.getItem('currentuserinfo') || "{}");
            //这种说明是移动端登录同一个账号，聊天信息同步
            if(msgfromid==userVcard.id&&msg.from!=msg.to){
                //在当前窗口同步
                if(msg.to== targetuserid){
                    recentDigset.forEach(function (digest, i) {
                        if (digest.id === msg.to) {
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
                    //解决不明原因多一项问题
                    // if(msg.from==msg.to){
                    //     historychats.splice(0,1);
                    // } 
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
                    localStorage.setItem('historychats', JSON.stringify(historychats));
                    historychats  = historychats.reverse();
                    renderHistoryMessageFinanl(historychats);
                }else{
                    //不在当前窗口同步
                    recentDigset.forEach(function (digest, i) {
                        if (digest.id === msg.to) {
                            recentDigset[i].lastContactTime = msg.data.dateline;
                            recentDigset[i].lastMessage = msg;
                            recentDigset[i].sessionVersion++;
                           // recentDigset[i].readedVersion = recentDigset[i].sessionVersion;
                            //保存修改后的最近联系人数组
                            localStorage.setItem('recentdigset', JSON.stringify(recentDigset));
                            //渲染最近联系人
                            renderRecentDigset(recentDigset);
                        }
                    });

                }
                
                return;    
            }else{
                  //不需要同步信息
                 //说明在当前窗口
                    if(msgfromid== targetuserid){
                        //移动端和web端聊天
                        if(msg.resource.slice(0,3)=="ios"||msg.resource.slice(0,3)=="and"){
                            //手机和web登录一个账号
                            if(msg.from==msg.to){
                                recentDigset.forEach(function (digest, i) {
                                    if (digest.id === msg.to) {
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
                                historychats.unshift({
                                    data: msg.data,
                                    dateline: msg.dateline,
                                    from: 'mobile',
                                    id: msg.id,
                                    sessionVersion: msg.sessionVersion,
                                    to: msg.to,
                                    type: msg.type,
                                    photo: 'mobile',
                                    nickname: 'mobile',
                                });
                                localStorage.setItem('historychats', JSON.stringify(historychats));
                                historychats  = historychats.reverse();
                                renderHistoryMessageFinanl(historychats);
                            }else{
                                recentDigset.forEach(function (digest, i) {
                                    if (digest.id === msg.from) {
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
                                    //这种是手机端别的账号往web发消息
                                //获取发送的人员头像和姓名
                                    YYIMChat.getVCard({
                                        id: msg.from,
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
                                            
                                            //修改后保存
                                            localStorage.setItem('historychats', JSON.stringify(historychats));
                                            let chatsStr = '';
                                            historychats  = historychats.reverse();
                                            renderHistoryMessageFinanl(historychats);
                                            return;
                                        },
                                        error: function (err) {
                                            //把聊天记录缓存到本地
                                            historychats.unshift({
                                                data: msg.data,
                                                dateline: msg.dateline,
                                                from: msg.from,
                                                id: msg.id,
                                                sessionVersion: msg.sessionVersion,
                                                to: msg.to,
                                                type: msg.type,
                                                photo: msg.photo || '',
                                                nickname: msg.from || res.id,
                                            });
                                            
                                            //修改后保存
                                            localStorage.setItem('historychats', JSON.stringify(historychats));
                                            historychats  = historychats.reverse();
                                            renderHistoryMessageFinanl(historychats);
                                            console.log(err);
                                        }
                                    });
                            }
                            //historychats  = historychats.reverse();
                        // renderHistoryMessageFinanl(historychats);
                        }else{
                            //web端和web端聊天
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
                            //获取发送的人员头像和姓名
                            YYIMChat.getVCard({
                                id: msg.from,
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
                                    
                                    //修改后保存
                                    localStorage.setItem('historychats', JSON.stringify(historychats));
                                    let chatsStr = '';
                                    historychats  = historychats.reverse();
                                    renderHistoryMessageFinanl(historychats);
                                    return;
                                },
                                error: function (err) {
                                    //把聊天记录缓存到本地
                                    historychats.unshift({
                                        data: msg.data,
                                        dateline: msg.dateline,
                                        from: msg.from,
                                        id: msg.id,
                                        sessionVersion: msg.sessionVersion,
                                        to: msg.to,
                                        type: msg.type,
                                        photo: msg.photo || '',
                                        nickname: msg.from || res.id,
                                    });
                                    
                                    //修改后保存
                                    localStorage.setItem('historychats', JSON.stringify(historychats));
                                    historychats  = historychats.reverse();
                                    renderHistoryMessageFinanl(historychats);
                                    console.log(err);
                                }
                            });
                
                            
                        }
                    }else{
                        //不在当前窗口只渲染摘要
                        recentDigset.forEach(function (digest, i) {
                            if (digest.id === msgfromid) {
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
           
          }else if(msg.type=="groupchat"){
            msgfromid =  msg.from.roster;
              //在当前窗口
            if(msg.from.room == targetuserid){

                recentDigset.forEach(function (digest, i) {
                    if (digest.id ===  msg.from.room) {
                       // isdigset = true;
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
                      //修改历史消息
                let userVcard = JSON.parse(localStorage.getItem('currentuserinfo') || "{}");
                let sendFromId = msg.from.roster;
                if(userVcard.id == sendFromId){
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
                    localStorage.setItem('historychats', JSON.stringify(historychats));
                    historychats  = historychats.reverse();
                    renderHistoryMessageFinanl(historychats);
                }else{
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
                            
                            //修改后保存
                            localStorage.setItem('historychats', JSON.stringify(historychats));
                            let chatsStr = '';
                            historychats  = historychats.reverse();
                            renderHistoryMessageFinanl(historychats);
                            return;
                        },
                        error: function (err) {
                            //把聊天记录缓存到本地
                            historychats.unshift({
                                data: msg.data,
                                dateline: msg.dateline,
                                from: msg.from,
                                id: msg.id,
                                sessionVersion: msg.sessionVersion,
                                to: msg.to,
                                type: msg.type,
                                photo: msg.photo || '',
                                nickname: msg.from || res.id,
                            });
                            
                            //修改后保存
                            localStorage.setItem('historychats', JSON.stringify(historychats));
                            historychats  = historychats.reverse();
                            renderHistoryMessageFinanl(historychats);
                            console.log(err);
                        }
                    });
                }
                
            }else{
                //不在当前窗口
                recentDigset.forEach(function (digest, i) {
                    if (digest.id === msg.from.room) {
                       // isdigset = true;
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
    }else if(wherefrom=="sendByselfFromweb"){
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
            //解决不明原因多一项问题
            // if(msg.from==msg.to){
            //     historychats.splice(0,1);
            // } 
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
            localStorage.setItem('historychats', JSON.stringify(historychats));
            historychats  = historychats.reverse();
            renderHistoryMessageFinanl(historychats);
            return;
      
    }
     //如果msg存在，说明我正在发送消息或者我接收到了别人的消息
    // if (msg) {
    //     //暂时将小友的消息过滤掉
    //     if(msg.type=="chat"&&msg.to == "xiaoyou_ai_bot_pre"){
    //         return;
    //     }
    //    //消息分为四种
    //    //单聊发来消息
    //     let isfromme;
    //     if (chattype === 'chat') {
    //         msgfromid = chattype === 'chat' ? msg.from : msg.from.roster;
    //         isfromme = myid === msgfromid;
    //     } else {
    //         msgfromid = msg.from.room;
    //         let sendMsgId = msg.from.roster;
    //         isfromme = myid === sendMsgId;
    //     }
    //     if (isfromme) { //消息是我发给别人的, 也有可能是手机端登录相同的号，发送
    //           if(msg.type== "chat"){
    //             if(msg.from!=msg.to){//我发给别人，除了手机端和web端通信
    //                 if(msg.resource.slice(0,3)=="ios"||msg.resource.slice(0,3)=="and"){
    //                     recentDigset.forEach(function (digest, i) {
    //                         if (digest.id === msg.to) {
    //                             recentDigset[i].lastContactTime = msg.data.dateline;
    //                             recentDigset[i].lastMessage = msg;
    //                             recentDigset[i].sessionVersion++;
    //                             recentDigset[i].readedVersion++;
    //                             //保存修改后的最近联系人数组
    //                             localStorage.setItem('recentdigset', JSON.stringify(recentDigset));
    //                             //渲染最近联系人
    //                             renderRecentDigset(recentDigset);
    //                         }
    //                     });
    //                 }else{
    //                     recentDigset.forEach(function (digest, i) {
    //                         if (digest.id === targetuserid) {
    //                             recentDigset[i].lastContactTime = msg.data.dateline;
    //                             recentDigset[i].lastMessage = msg;
    //                             recentDigset[i].sessionVersion++;
    //                             recentDigset[i].readedVersion = recentDigset[i].sessionVersion;
    //                             //保存修改后的最近联系人数组
    //                             localStorage.setItem('recentdigset', JSON.stringify(recentDigset));
    //                             //渲染最近联系人
    //                             renderRecentDigset(recentDigset);
    //                         }
    //                     });
    //                     //修改历史消息
    //                     let userVcard = JSON.parse(localStorage.getItem('currentuserinfo') || "{}");
            
    //                     historychats.unshift({
    //                         data: msg.data,
    //                         dateline: msg.dateline,
    //                         from: msg.from,
    //                         id: msg.id,
    //                         sessionVersion: msg.sessionVersion,
    //                         to: msg.to,
    //                         type: msg.type,
    //                         photo: userVcard.photo || '',
    //                         nickname: userVcard.nickname || userVcard.id,
    //                     });
    //                     localStorage.setItem('historychats', JSON.stringify(historychats));
    //                 }
                    
    //             }else if(msg.from == msg.to){ //我发给手机端
    //                 if(msg.resource.slice(0,3)=="ios"||msg.resource.slice(0,3)=="and"){
    //                     recentDigset.forEach(function (digest, i) {
    //                         if (digest.id === msg.to) {
    //                             recentDigset[i].lastContactTime = msg.data.dateline;
    //                             recentDigset[i].lastMessage = msg;
    //                             recentDigset[i].sessionVersion++;
    //                             recentDigset[i].readedVersion = recentDigset[i].sessionVersion;
    //                             //保存修改后的最近联系人数组
    //                             localStorage.setItem('recentdigset', JSON.stringify(recentDigset));
    //                             //渲染最近联系人
    //                             renderRecentDigset(recentDigset);
    //                         }
    //                     });
    //                     //如果在当前窗口
    //                     if(msg.from == targetuserid){
    //                         historychats.unshift({
    //                             data: msg.data,
    //                             dateline: msg.dateline,
    //                             from: 'mobile',
    //                             id: msg.id,
    //                             sessionVersion: msg.sessionVersion,
    //                             to: msg.to,
    //                             type: msg.type,
    //                             photo: 'mobile',
    //                             nickname: 'mobile',
    //                         });
    //                         localStorage.setItem('historychats', JSON.stringify(historychats));
    //                     }
                        
    //                 }else{
    //                     recentDigset.forEach(function (digest, i) {
    //                         if (digest.id === targetuserid) {
    //                             recentDigset[i].lastContactTime = msg.data.dateline;
    //                             recentDigset[i].lastMessage = msg;
    //                             recentDigset[i].sessionVersion++;
    //                             recentDigset[i].readedVersion = recentDigset[i].sessionVersion;
    //                             //保存修改后的最近联系人数组
    //                             localStorage.setItem('recentdigset', JSON.stringify(recentDigset));
    //                             //渲染最近联系人
    //                             renderRecentDigset(recentDigset);
    //                         }
    //                     });
    //                     //修改历史消息
    //                     let userVcard = JSON.parse(localStorage.getItem('currentuserinfo') || "{}");
            
    //                     historychats.unshift({
    //                         data: msg.data,
    //                         dateline: msg.dateline,
    //                         from: msg.from,
    //                         id: msg.id,
    //                         sessionVersion: msg.sessionVersion,
    //                         to: msg.to,
    //                         type: msg.type,
    //                         photo: userVcard.photo || '',
    //                         nickname: userVcard.nickname || userVcard.id,
    //                     });
    //                     localStorage.setItem('historychats', JSON.stringify(historychats));
    //                 }
                  
    //             }
    //           }else if(msg.type=="groupchat"){
    //             if(msg.from.room == targetuserid){

    //                 recentDigset.forEach(function (digest, i) {
    //                     if (digest.id === msgfromid) {
    //                        // isdigset = true;
    //                         recentDigset[i].lastContactTime = msg.data.dateline;
    //                         recentDigset[i].lastMessage = msg;
    //                         recentDigset[i].sessionVersion++;
    //                         recentDigset[i].readedVersion++;
    //                         //保存修改后的最近联系人数组
    //                         localStorage.setItem('recentdigset', JSON.stringify(recentDigset));
    //                         //渲染最近联系人
    //                         renderRecentDigset(recentDigset);
    //                     }
    //                 });
    //                  //发送已读回执
    //                     YYIMChat.sendReadedReceiptsPacket({
    //                         to:   targetuserid,
    //                         id: baowenId,
    //                         type: "groupchat",
    //                         sessionVersion:sessionversionID
    //                     });
    //                       //修改历史消息
    //                 let userVcard = JSON.parse(localStorage.getItem('currentuserinfo') || "{}");
        
    //                 historychats.unshift({
    //                     data: msg.data,
    //                     dateline: msg.dateline,
    //                     from: msg.from,
    //                     id: msg.id,
    //                     sessionVersion: msg.sessionVersion,
    //                     to: msg.to,
    //                     type: msg.type,
    //                     photo: userVcard.photo || '',
    //                     nickname: userVcard.nickname || userVcard.id,
    //                 });
    //                 localStorage.setItem('historychats', JSON.stringify(historychats));
    //             }else{
    //                 recentDigset.forEach(function (digest, i) {
    //                     if (digest.id === msgfromid) {
    //                         isdigset = true;
    //                         recentDigset[i].lastContactTime = msg.data.dateline;
    //                         recentDigset[i].lastMessage = msg;
    //                         recentDigset[i].sessionVersion++;
    //                         //保存修改后的最近联系人数组
    //                         localStorage.setItem('recentdigset', JSON.stringify(recentDigset));
    //                         //渲染最近联系人
    //                         renderRecentDigset(recentDigset);
    //                     }
    //                 });
    //             }
    //           }
            
            
            
    //         //修改后保存
            
    //     } else { //消息来自于他人给我发的
    //         let chattype = msg.type;
    //         if (chattype === 'chat') {
    //             msgfromid = chattype === 'chat' ? msg.from : msg.from.roster;
    //             isfromme = myid === msgfromid;
    //         } else {
    //             msgfromid = msg.from.room;
    //             let sendMsgId = msg.from.roster;
    //             isfromme = myid === sendMsgId;
    //         }
    //         let isdigset = false; //判断对方在不在我的最近联系人里
    //       //  let chattype = localStorage.getItem('chattype');
    //         if(chattype == "groupchat"){
    //             if(msg.from.room == targetuserid){

    //                 recentDigset.forEach(function (digest, i) {
    //                     if (digest.id === msgfromid) {
    //                         isdigset = true;
    //                         recentDigset[i].lastContactTime = msg.data.dateline;
    //                         recentDigset[i].lastMessage = msg;
    //                         recentDigset[i].sessionVersion++;
    //                         recentDigset[i].readedVersion++;
    //                         //保存修改后的最近联系人数组
    //                         localStorage.setItem('recentdigset', JSON.stringify(recentDigset));
    //                         //渲染最近联系人
    //                         renderRecentDigset(recentDigset);
    //                     }
    //                 });
    //                  //发送已读回执
    //                     YYIMChat.sendReadedReceiptsPacket({
    //                         to:   targetuserid,
    //                         id: baowenId,
    //                         type: "groupchat",
    //                         sessionVersion:sessionversionID
    //                     });
    //             }else{
    //                 recentDigset.forEach(function (digest, i) {
    //                     if (digest.id === msgfromid) {
    //                         isdigset = true;
    //                         recentDigset[i].lastContactTime = msg.data.dateline;
    //                         recentDigset[i].lastMessage = msg;
    //                         recentDigset[i].sessionVersion++;
    //                         //保存修改后的最近联系人数组
    //                         localStorage.setItem('recentdigset', JSON.stringify(recentDigset));
    //                         //渲染最近联系人
    //                         renderRecentDigset(recentDigset);
    //                     }
    //                 });
    //             }
                
    //         }else if(chattype == "chat"&&msg.from != msg.to){
    //             if(msg.from == targetuserid){
    //                 recentDigset.forEach(function (digest, i) {
    //                     if (digest.id === msgfromid) {
    //                         isdigset = true;
    //                         recentDigset[i].lastContactTime = msg.data.dateline;
    //                         recentDigset[i].lastMessage = msg;
    //                         recentDigset[i].sessionVersion++;
    //                         recentDigset[i].readedVersion++;
    //                         //保存修改后的最近联系人数组
    //                         localStorage.setItem('recentdigset', JSON.stringify(recentDigset));
    //                         //渲染最近联系人
    //                         renderRecentDigset(recentDigset);
    //                     }
    //                 });
    //                  //发送已读回执
    //                  YYIMChat.sendReadedReceiptsPacket({
    //                     to:   targetuserid,
    //                     id: baowenId,
    //                     type: "chat",
    //                     sessionVersion:sessionversionID
    //                 });
    //             }else{
    //                 recentDigset.forEach(function (digest, i) {
    //                     if (digest.id === msgfromid) {
    //                         isdigset = true;
    //                         recentDigset[i].lastContactTime = msg.data.dateline;
    //                         recentDigset[i].lastMessage = msg;
    //                         recentDigset[i].sessionVersion++;
    //                         //保存修改后的最近联系人数组
    //                         localStorage.setItem('recentdigset', JSON.stringify(recentDigset));
    //                         //渲染最近联系人
    //                         renderRecentDigset(recentDigset);
    //                     }
    //                 }); 
    //             }
               
    //         }else if(chattype == "chat"&&msg.from == msg.to){//手机端发向web端得消息
    //             if(msg.from == targetuserid){
    //                 recentDigset.forEach(function (digest, i) {
    //                     if (digest.id === msgfromid) {
    //                         isdigset = true;
    //                         recentDigset[i].lastContactTime = msg.data.dateline;
    //                         recentDigset[i].lastMessage = msg;
    //                         recentDigset[i].sessionVersion++;
    //                         recentDigset[i].readedVersion++;
    //                         //保存修改后的最近联系人数组
    //                         localStorage.setItem('recentdigset', JSON.stringify(recentDigset));
    //                         //渲染最近联系人
    //                         renderRecentDigset(recentDigset);
    //                     }
    //                 });
    //                  //发送已读回执
    //                  YYIMChat.sendReadedReceiptsPacket({
    //                     to:   targetuserid,
    //                     id: baowenId,
    //                     type: "chat",
    //                     sessionVersion:sessionversionID
    //                 });
    //             }else{
    //                 recentDigset.forEach(function (digest, i) {
    //                     if (digest.id === msgfromid) {
    //                         isdigset = true;
    //                         recentDigset[i].lastContactTime = msg.data.dateline;
    //                         recentDigset[i].lastMessage = msg;
    //                         recentDigset[i].sessionVersion++;
    //                         //保存修改后的最近联系人数组
    //                         localStorage.setItem('recentdigset', JSON.stringify(recentDigset));
    //                         //渲染最近联系人
    //                         renderRecentDigset(recentDigset);
    //                     }
    //                 }); 
    //             }
    //         }
            
    //         //不在最近联系人中，刷新最近联系人列表
    //         if (!isdigset) {
    //             getRecentDigset();
    //         };
    //         let sendFromId;
    //         if (chattype === 'chat') {
    //             sendFromId = msg.from;
    //             //如果发过来的消息，不是当前正在聊天的，不更新历史消息
    //             if(msg.from != targetuserid){
    //                 return;
    //             }
    //         } else {
    //             sendFromId = msg.from.roster;
    //             //如果发过来的消息，不是当前正在聊天的，不更新历史消息
    //             if(msg.from.room != targetuserid){
    //                 return;
    //             }
    //         }
    //         //获取发送的人员头像和姓名
    //         YYIMChat.getVCard({
    //             id: sendFromId,
    //             success: function (res) {
    //                 //整理最近联系人列表到一个新数组
    //                 historychats.unshift({
    //                     data: msg.data,
    //                     dateline: msg.dateline,
    //                     from: msg.from,
    //                     id: msg.id,
    //                     sessionVersion: msg.sessionVersion,
    //                     to: msg.to,
    //                     type: msg.type,
    //                     photo: res.photo || '',
    //                     nickname: res.nickname || res.id,
    //                 });
    //                 //修改历史消息
    //                 //historychats.push(msg);
    //                 //修改后保存
    //                 localStorage.setItem('historychats', JSON.stringify(historychats));
    //                 let chatsStr = '';
    //                 historychats  = historychats.reverse();
    //                 renderHistoryMessageFinanl(historychats);
    //                 return;
    //             },
    //             error: function (err) {
    //                 //把聊天记录缓存到本地
    //                 localStorage.setItem('historychats', JSON.stringify(historychatsData));
    //                 renderHistoryMessage();
    //                 console.log(err);
    //             }
    //         });
    //         return;
    //     }


    // }
    //如果我没和对方聊天，则不渲染历史信息
    //if (msg && msgfromid !== myid && msgfromid !== targetuserid) return;

   
    
  
};