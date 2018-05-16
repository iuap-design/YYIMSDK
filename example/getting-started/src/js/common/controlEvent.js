//dom元素
import {
    $yyim_iogin,
    $yyim_box,
    $yyim_main,
    $j_move,
    $j_bq_box,
    $yyim_editor,
    $btn_send,
    $login_username,
    $login_pass,
    $login_btn,
    $hcontacts,
    $hgroups,
    $chat_box,
    $chats_list,
    $picviewer,
    picviewer,
    $personinfo,
    $own_avatar,
    $smchat,
    $smfriend,
    $smgroup,
    $smpubcount,
    $hmyfriend
} from './jqelements';
//表情数据
import { expressionList } from './constants';
//用户登陆
import userLogin from './userLogin';
//获取最近联系人
import getRecentDigset from '../api/getRecentDigset';
//渲染最近联系人
import renderRecentDigset from '../render/renderRecentDigset';
//获取群组
import getChatGroups from '../api/getChatGroups';
//获取好友
import getMyFriend from '../api/getMyFriend';
//渲染群组
import renderChatGroups from '../render/renderChatGroups';
//获取历史聊天记录
import getHistoryMessage from '../api/getHistoryMessage';
//渲染历史聊天记录
import renderHistoryMessage from '../render/renderHistoryMessage';

//放置表情列表
$j_bq_box.html(expressionList.data.map((t) => {
    return `<li data-code="${t.actionData}"><img src="${expressionList.path+t.url}" title="${t.actionData}" alt=""></li>`;
}));

//临时自动登录的
if(localStorage.getItem('currentuserinfo')){
    userLogin(JSON.parse(localStorage.getItem('currentuserinfo')).username);
}
//用户登陆
$login_btn.click(function () {
    let username = $login_username.val();
    let password = $login_pass.val();
    if(/^[a-z][a-z_0-9]*$/.test(username)){
        userLogin(username, password);
    }
});

//最大化按钮点击
$('.scalechat').click(function () {
    $yyim_main.hasClass('maxwindow') ? $yyim_main.removeClass('maxwindow') : $yyim_main.addClass('maxwindow');
    $yyim_main.css({left: '0', top: '0'});
});

//关闭窗口按钮点击
$('.closechat').click(function () {
    localStorage.clear();
    $yyim_box.hide();
    $yyim_iogin.show();
});

//移动事件
$j_move.on('mousedown', function (e) {
    let originX = e.clientX;
    let originY = e.clientY;
    let boxPos = $yyim_main.position();
    $yyim_box.on('mousemove', function (e) {
        $yyim_main.css({left: (boxPos.left + e.clientX - originX) + 'px', top: (boxPos.top + e.clientY - originY) + 'px'});
    });
});
$yyim_box.on('mouseup', function () {
    $(this).off('mousemove');
});


//搜索好友
$('.yyim-search').on('keydown',function (e) {
    let keyword = $(this).val();
    if(e.keyCode === 13 && keyword){
        //查询好友
        YYIMChat.queryRosterItem({
            keyword: keyword,
            success: function(data){
                console.log(data);
            },
            error: function(err){
                console.log(err);
            }
        });
    }
});

//点击最近联系人
$hcontacts.on('click','li',function () {
    $chats_list.html('');
    $(this).addClass('active');
    $(this).siblings().removeClass('active');
    $j_move.html($(this).attr('data-nickname'));
    //把选择的聊天对方id保存起来,用于给他发送消息
    localStorage.setItem('targetuserid', $(this).attr('data-id'));
    //保存聊天类型
    localStorage.setItem('chattype', $(this).attr('data-type'));
    //删除保存的聊天历史
    localStorage.removeItem('historychats');
    //获取历史聊天信息
    getHistoryMessage($(this).attr('data-sessionVersion'), $(this).attr('data-id'), $(this).attr('data-type'));
});
//点击我的好友开始聊天
$hmyfriend.on('click','li',function(){
    $smgroup.removeClass('active');
    $smchat.addClass('active');
    $hgroups.hide();
    $hcontacts.show();
    $j_move.html($(this).attr('data-nickname'));
    //把选择的聊天对方id保存起来,用于给他发送消息
    localStorage.setItem('targetuserid', $(this).attr('data-id'));
    //保存聊天类型
    localStorage.setItem('chattype', $(this).attr('data-type'));
    //删除保存的聊天历史
    localStorage.removeItem('historychats');
    //获取历史聊天信息
    getHistoryMessage( "100", $(this).attr('data-id'), $(this).attr('data-type'));
    //处理摘要显示
    let nowDigest = JSON.parse(localStorage.getItem('recentdigset'));
    let hasHistory = false;
    console.log('用户ID'+$(this).attr('data-id'));
    let chatId = $(this).attr('data-id');
    let chatType =  $(this).attr('data-type');
    console.log('用户类型'+ $(this).attr('data-type'));
    if(nowDigest.length>0){
        for(var i=0;i<nowDigest.length;i++){
            if((nowDigest[i].id == chatId)&&(nowDigest[i].type == chatType)){
                nowDigest.unshift(nowDigest[i]);
                i++;
                nowDigest.splice(i,1); 
                hasHistory = true;
                break;   
            }
        }
    };
    if(!hasHistory){
        nowDigest.unshift({
            id:$(this).attr('data-id'),
            type: $(this).attr('data-chat'),
            photo: $(this).attr('data-photo') || '',
            nickname: $(this).attr('data-nickname'),
        });
    }
    hasHistory = false;
  
    localStorage.setItem('recentdigset',JSON.stringify(nowDigest));
    renderRecentDigset(nowDigest);
});
//删除最近联系人
$hcontacts.on('click','.close',function () {
    const curid = $(this).attr('data-id');
    YYIMChat.removeRecentDigest({
        id: curid,
        type: $(this).attr('data-type'),
        success:function(data){
            //从本地拿取聊天对方id
            let toid = localStorage.getItem('targetuserid');
            //拿取本地保存的最近联系人数组
            let recentDigset = JSON.parse(localStorage.getItem('recentdigset') || "[]");
            recentDigset.forEach(function(digest, i){
                if(digest.id === curid){
                    recentDigset.splice(i, 1);
                }
            });
            //保存修改后的最近联系人数组
            localStorage.setItem('recentdigset', JSON.stringify(recentDigset));
            //保存聊天类型
            localStorage.setItem('chattype', 'groupchat');
            //渲染最近联系人
            renderRecentDigset(recentDigset);
        },
        error:function(err){
            console.log(err);
        }
    });
    return false;
});

//查看聊天消息图片
$chats_list.on('click', '.chatpic', function(){
    let picurl = $(this).attr('data-url');
    $picviewer.html('<li><img data-original="'+ picurl +'" src="'+ picurl +'" alt=""></li>')
    picviewer.show({url: picurl});
});



//表情按钮点击
$('.j_menu_bq').hover(function () {
    $(this).addClass('hover');
    $('.bq_tip').css('display', 'block');
},function () {
    $(this).removeClass('hover');
    $('.bq_tip').css('display', 'none');
}).click(function () {
    $j_bq_box.toggle();
    return false;
});

//表情点击
$j_bq_box.on('click', 'li', function () {
    $yyim_editor.val($yyim_editor.val() + $(this).attr('data-code'));
    if($yyim_editor.val()){
        $btn_send.removeClass('adit-btn-send-disabled');
    }else {
        $btn_send.addClass('adit-btn-send-disabled');
    }
    return false;
});

//按要求隐藏表情框
$j_bq_box.hover(function (e) {},function(){$(this).hide()});

//发送图片按钮点击
$('.j_menu_tp').hover(function () {
    $(this).addClass('hover');
    $('.tp_tip').css('display', 'block');
},function () {
    $(this).removeClass('hover');
    $('.tp_tip').css('display', 'none');
}).click(function () {
    $('#uploadPic').click();
});

$('#uploadPic').on('change', function(){
    //获取对话人id
    let to = localStorage.getItem('targetuserid');
    YYIMChat.sendPic({
        fileInputId:'uploadPic', //文件域id 
        // drop_element: [dropID], //拖拽上传元素id，或者数组
        chatInfo: function(){ //用户发送消息时获取对话人信息
            return {
                to: to, //对话人id
                type: 'chat', //chat/groupchat/pubaccount
                extend: '' //扩展字段
            };
        },
        fileFiltered: function(){}, //文件被添加到上传队列
        fileUploaded: function(){}, //上传队列某一个文件上传完毕
        beforeUpload: function(){}, //文件上传之前触发
        success:function(msg){
            //渲染历史信息
            renderHistoryMessage(msg);
        },
        error: function(err){
            console.log(err);
        },
        progress: function(pro){
            //上传进度
            console.log(pro);
        }
    })
});

//文件按钮点击
$('.j_menu_wj').hover(function () {
    $(this).addClass('hover');
    $('.wj_tip').css('display', 'block');
},function () {
    $(this).removeClass('hover');
    $('.wj_tip').css('display', 'none');
}).click(function () {
    $('#uploadFile').click();
});

$('#uploadFile').on('change', function(){
    //获取对话人id
    let to = localStorage.getItem('targetuserid');
    YYIMChat.sendFile({
        fileInputId:'uploadFile', //文件域id 
        // drop_element: [dropID], //拖拽上传元素id，或者数组
        chatInfo: function(){ //用户发送消息时获取对话人信息
            return {
                to: to, //对话人id
                type: 'chat', //chat/groupchat/pubaccount
                extend: '' //扩展字段
            };
        },
        fileFiltered: function(){}, //文件被添加到上传队列
        fileUploaded: function(){}, //上传队列某一个文件上传完毕
        beforeUpload: function(){}, //文件上传之前触发
        success:function(msg){
            //渲染历史信息
            renderHistoryMessage(msg);
        },
        error: function(err){
            console.log(err);
        },
        progress: function(pro){
            //上传进度
            console.log(pro);
        }
    })
});


//控制是否可以发送
$yyim_editor.on('input propertychange', function () {
    if($(this).val()&&!($(this).val().replace(/(^s*)|(s*$)/g, "").length ==0)){
        $btn_send.removeClass('adit-btn-send-disabled');
    }else {
        $btn_send.addClass('adit-btn-send-disabled');
    }
});

//发送按钮点击
$btn_send.on('click',function () {
    if($yyim_editor.val()&&!($yyim_editor.val().replace(/(^s*)|(s*$)/g, "").length ==0)){
        //从本地拿取聊天对方id
        let to = localStorage.getItem('targetuserid');
        //从本地拿取聊天类型
        let chattype = localStorage.getItem('chattype');
        //调用发送文本消息接口
        YYIMChat.sendTextMessage({
            to: to, //对话人id
            type: chattype,  //chat:单聊，groupcgat:群聊,pubaccount:公众号
            content:$yyim_editor.val(), //消息文本
            extend: '',  //扩展字段
            success: function (msg) {
                //发送成功之后清空输入框
                $yyim_editor.val('');
                $btn_send.addClass('adit-btn-send-disabled');
                //渲染历史信息
                renderHistoryMessage(msg);
            }
        });
    }
});

//按下enter也可以发送
$yyim_editor.on('keydown',function(e){
    if(e.keyCode === 13 && $yyim_editor.val()){
        //从本地拿取聊天对方id
        let to = localStorage.getItem('targetuserid');
        //从本地拿取聊天类型
        let chattype = localStorage.getItem('chattype');
        //调用发送文本消息接口
        YYIMChat.sendTextMessage({
            to: to, //对话人id
            type: chattype,  //chat:单聊，groupchat:群聊,pubaccount:公众号
            content:$yyim_editor.val(), //消息文本
            body: '',  //扩展字段
            success: function (msg) {
                //发送成功之后清空输入框
                $yyim_editor.val('');
                $btn_send.addClass('adit-btn-send-disabled');
                //渲染历史信息
                renderHistoryMessage(msg);
            }
        });
    }
});

//头像点击
$own_avatar.on('click',function(){
    let userVcard = JSON.parse(localStorage.getItem('currentuserinfo') || "{}");
    $personinfo.html(`
            <div class="site">
                <div class="hd">
                    <div class="hdpic">
                        <img src="${userVcard.photo? YYIMChat.getFileUrl(userVcard.photo) : ''}" alt="">
                    </div>
                    <h3 class="nickname">${userVcard.nickname || userVcard.id}</h3>
                </div>
                <ul class="infolist">
                    <li><label>邮箱</label>${userVcard.email || ''}</li>
                    <li><label>性别</label>${userVcard.gender || ''}</li>
                    <li><label>手机</label>${userVcard.mobile || ''}</li>
                </ul>
                <span class="close_chatmsk">×</span>
            </div>
    `).show();
});
//关闭个人信息
$personinfo.on('click','.close_chatmsk',function(){
    $personinfo.hide();
});

//菜单-聊天
$smchat.on('click',function(){
    if($(this).hasClass('active')){return;}
    $(this).addClass('active');
    $(this).siblings().removeClass('active');

    $hgroups.hide();
    $hcontacts.show();
    //移除保存的通讯对方id，避免页面刷新后最近联系人联系状态还记录着
    localStorage.removeItem('targetuserid');
    //本地拉取获取最近联系人
    let recentdigset = localStorage.getItem('recentdigset') || "[]";
    renderRecentDigset(JSON.parse(recentdigset));
});
//菜单-好友
// $smfriend.on('click',function(){
//     if($(this).hasClass('active')){return;}
//     $(this).addClass('active');
//     $(this).siblings().removeClass('active');
// });
//菜单-群组
$smgroup.on('click',function(){
    if($(this).hasClass('active')){return;}
    $(this).addClass('active');
    $(this).siblings().removeClass('active');
    //清空聊天头部名称
    $j_move.html('');
    //隐藏最近联系人列表
    $hcontacts.hide();
    //隐藏聊天框
    $chat_box.hide();
    //显示群组列表
   // $hgroups.html('');
    $hgroups.show();
    getMyFriend();

    // let roomItems = localStorage.getItem('roomItems');
    // if(roomItems){
    //     //使用本地保存的群组渲染
    //     renderChatGroups(JSON.parse(roomItems));
    // }else {
    //     //重新获取群组
    //     getChatGroups();
    // }
});
$hgroups.on('click','ul.left-content-item li',function(){
    $(this).addClass('active').siblings('.active').removeClass('active');
	var tar=$(this).attr('data-tar');
    $(tar).addClass('active').siblings('.active').removeClass('active');
    if(tar=="#content-my-group"){
         let roomItems = localStorage.getItem('roomItems');
        if(roomItems){
            //使用本地保存的群组渲染
            renderChatGroups(JSON.parse(roomItems));
        }else {
            //重新获取群组
            getChatGroups();
        }
    }else{
        getMyFriend();
    }
});
//菜单-公众号
// $smpubcount.on('click',function(){
//     if($(this).hasClass('active')){return;}

//     $(this).addClass('active');
//     $(this).siblings().removeClass('active');
// });

// $hgroups.on('click', 'li', function(){
//     $smchat.addClass('active');
//     $smchat.siblings().removeClass('active');
//     $hgroups.hide();
//     $hcontacts.html('');
//     $hcontacts.show();

//     //修改当前联系人id
//     localStorage.setItem('targetuserid', $(this).attr('data-id'));

//     let that = $(this);
//     //拿取本地保存的最近联系人数组
//     let recentDigset = JSON.parse(localStorage.getItem('recentdigset') || "[]");
//     let isdigset = false; //判断该公众号在不在我的最近联系人里
//     recentDigset.forEach(function(digest, i){
//         if(digest.id === that.attr('data-id')){
//             isdigset = true;
//         }
//     });
//     //不在最近联系人中，刷新最近联系人列表
//     if(!isdigset){
//         recentDigset.push({
//             id: that.attr('data-id'),
//             readedVersion: 10000,
//             sessionVersion: 10000,
//             type: 'groupchat',
//             photo: that.attr('data-photo'),
//             nickname:  that.attr('data-name'),
//             lastMessage: null,
//             lastContactTime: new Date().getTime()
//         });
//         //保存修改后的最近联系人数组
//         localStorage.setItem('recentdigset', JSON.stringify(recentDigset));
//         //保存聊天类型
//         localStorage.setItem('chattype', 'groupchat');
//     }
//     //渲染最近联系人
//     renderRecentDigset(recentDigset);
//     //换个聊天的头部名称
//     $j_move.html($(this).attr('data-name'));
//     //删除保存的聊天历史
//     localStorage.removeItem('historychats');
//     //获取历史聊天信息
//     getHistoryMessage(10000, $(this).attr('data-id'), 'groupchat');
// });
