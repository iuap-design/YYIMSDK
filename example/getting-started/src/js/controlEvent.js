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
    $chats_list,
    $picviewer,
    picviewer
} from './jqelements';

//表情数据
import { expressionList } from './constants';

//用户登陆
import userLogin from './userLogin';

//获取历史聊天记录
import getHistoryMessage from './getHistoryMessage';

//渲染历史聊天记录
import renderHistoryMessage from './renderHistoryMessage';

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
        //
        YYIMChat.getRosterItems({
            success: function (res) {
                console.log(JSON.parse(res));
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
    //删除保存的聊天历史
    localStorage.removeItem('historychats');
    //获取历史聊天信息
    getHistoryMessage($(this).attr('data-sessionVersion'), $(this).attr('data-id'), $(this).attr('data-type'));
});

//关闭联系人点击
$hcontacts.on('click','.close',function () {
    console.log('关闭'+ $(this).attr('data-id'));
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
    if($(this).val()){
        $btn_send.removeClass('adit-btn-send-disabled');
    }else {
        $btn_send.addClass('adit-btn-send-disabled');
    }
});

//发送按钮点击
$btn_send.on('click',function () {
    if($yyim_editor.val()){
        //从本地拿取聊天对方id
        let to = localStorage.getItem('targetuserid');
        //调用发送文本消息接口
        YYIMChat.sendTextMessage({
            to: to, //对话人id
            type: "chat",  //chat:单聊，groupcgat:群聊,pubaccount:公众号
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
        //调用发送文本消息接口
        YYIMChat.sendTextMessage({
            to: to, //对话人id
            type: "chat",  //chat:单聊，groupcgat:群聊,pubaccount:公众号
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
})