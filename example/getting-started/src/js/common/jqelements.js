
export const $yyim_iogin = $('.yyim-iogin');//登陆框
export const $login_username = $('.login-username');//登陆用户名
export const $login_pass = $('.login-pass');//登陆用户密码
export const $login_btn = $('.login-btn');//登陆按钮
export const $yyim_box = $('.yyim-box');//聊天框的遮罩
export const $yyim_main = $('.yyim-main');//聊天最外层窗口
export const $j_move = $('.j_move');//聊天窗口头
export const $hcontacts = $('.hcontacts');//最近联系人框hmygrouplist
export const $hgroups = $('.hgroups');//我的群组框
export const $chats = $('.chats');//聊天信息滑动容器
export const $j_bq_box = $('.j_bq_box');//表情盒子
export const $yyim_editor = $('.yyim-editor');//聊天输入框
export const $btn_send = $('.adit-btn-send'); //发送按钮
export const $chat_box = $('.chat-box'); //控制是否具有聊天内容
export const $chats_list = $('.chats-list'); //聊天信息列表
export const $picviewer = $('#picviewer'); //图片查看框

export const $own_avatar = $('.own_avatar'); //个人头像框
export const $personinfo = $('.personinfo'); //个人信息框

export const $smchat = $('.smchat'); //菜单-聊天
export const $smfriend = $('.smfriend'); //菜单-好友
export const $smgroup = $('.smgroup'); //菜单-群组
export const $smpubcount = $('.smpubcount'); //菜单-公众号

export const $hmyfriend = $('.hmyfriend'); //菜单-好友-我的好友
export const $hmygrouplist = $('.hmygrouplist');//我的群组列表

//实例化viewer
export const picviewer = new Viewer($picviewer[0], {navbar:false, title: false});
// viewer.show({
//     url: 'https://www.baidu.com/img/bd_logo1.png'
// })
// $picviewer.viewer({
//     url: 'https://www.baidu.com/img/bd_logo1.png', //设置大图片的 url
//     navbar:true, //是否显示缩略图导航
//     toolbar:true, //显示工具栏
//     title:true, //显示当前图片标题(alt属性和尺寸)
//     tooltip:true, //显示缩放百分比
//     movable:true, //图片是否可移动
//     zoomable:true, //图片是否可缩放
//     rotatable:true, //图片是否可旋转
//     scalable:true, //图片是否可翻转
//     transition:true, //使用 CSS3 过度
//     fullscreen:true, //播放时是否全屏
//     keyboard:true, //是否支持键盘
//     interval:5000, //播放间隔，单位为毫秒
//     zoomRatio:0.1, //鼠标滚动时的缩放比例
//     minZoomRatio:0.01, //最小缩放比例
//     maxZoomRatio:100, //最大缩放比例
//     zIndex:2015, //设置图片查看器 modal 模式时的 z-index
//     zIndexInline:0, //设置图片查看器 inline 模式时的 z-index
// }).show();