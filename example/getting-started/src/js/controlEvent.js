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
    $login_btn,
    $hcontacts
} from './jqelements';
//用户登陆
import userLogin from './userLogin';
//获取历史聊天记录
import getHistoryMessage from './getHistoryMessage';


//临时自动登录的
if(localStorage.getItem('currentuserinfo')){
    userLogin(JSON.parse(localStorage.getItem('currentuserinfo')).username);
}
//用户登陆
$login_btn.click(function () {
    let username = $login_username.val();
    if(/^[a-z][a-z_0-9]*$/.test(username)){
        userLogin(username);
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
    let originX = e.pageX;
    let originY = e.pageY;
    let boxPos = $yyim_main.position();
    $j_move.on('mousemove', function (e) {
        $yyim_main.css({left: (boxPos.left + e.pageX - originX) + 'px', top: (boxPos.top + e.pageY - originY) + 'px'});
    });
});
$j_move.on('mouseup', function () {
    $(this).off('mousemove');
});


//搜索好友
$('.yyim-search').on('keydown',function (e) {
    let keyword = $(this).val();
    if(e.keyCode === 13 && keyword){
        //搜索联系人
        YYIMChat.queryRosterItem({
            keyword: keyword,
            success: function (res) {
                console.log(res);
            }
        });
    }
});

//联系人点击
$hcontacts.on('click','li',function () {
    $(this).addClass('active');
    localStorage.setItem('targetuserid', $(this).attr('data-id'));//保存聊天对方id，用于发送消息
    getHistoryMessage($(this).attr('data-sessionVersion'), $(this).attr('data-id'), $(this).attr('data-type'));
});

//关闭联系人点击
$hcontacts.on('click','.close',function () {
    console.log('关闭');
    return false;
});

//除了自己点击其他部分隐藏表情框
$('body').click(function () {
    $j_bq_box.hide();
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

//图片按钮点击
$('.j_menu_tp').hover(function () {
    $(this).addClass('hover');
    $('.tp_tip').css('display', 'block');
},function () {
    $(this).removeClass('hover');
    $('.tp_tip').css('display', 'none');
}).click(function () {
    $('#uploadfile').click();
});

//控制是否可以发送
$yyim_editor.on('input propertychange', function () {
    if($(this).val()){
        $btn_send.removeClass('adit-btn-send-disabled');
    }else {
        $btn_send.addClass('adit-btn-send-disabled');
    }
});

//文件按钮点击
$('.j_menu_wj').hover(function () {
    $(this).addClass('hover');
    $('.wj_tip').css('display', 'block');
},function () {
    $(this).removeClass('hover');
    $('.wj_tip').css('display', 'none');
}).click(function () {
    console.log('发送文件');
});

//发送按钮点击
$btn_send.on('click',function () {
    let to = localStorage.getItem('targetuserid');
    if($yyim_editor.val()){
        YYIMChat.sendTextMessage({
            to: to, //对话人id
            type: "chat",  //chat:单聊，groupcgat:群聊,pubaccount:公众号
            content:$yyim_editor.val(), //消息文本
            extend: '',  //扩展字段
            success: function (msg) {
                $yyim_editor.val('');
                console.log(msg)
            }
        });
    }
});