//dom元素
import {
    $chat_box,
    $chats_list
} from './jqelements';

//渲染聊天记录
import renderHistoryMessage from './renderHistoryMessage';

//获取聊天历史,传入sessionVersion,对方id和type参数
export default (sessionVersion, id, type) => {
    let start = sessionVersion > 20 ? sessionVersion - 20 : 0;
    //获取历史聊天信息
    YYIMChat.getHistoryMessage({
        id: id,
        type: type,
        startVersion: start,
        endVersion: sessionVersion,
        success: function (res) {
            let historychats = res.result || [];
            $chat_box.show();
            historychats.reverse();
            //把聊天记录缓存到本地
            localStorage.setItem('historychats', JSON.stringify(historychats));
            //渲染聊天信息
            renderHistoryMessage();
        }
    });
};