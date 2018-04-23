//dom元素
import {
    $chat_box,
    $chats_list
} from './jqelements';

//渲染聊天记录
import renderHistoryMessage from './renderHistoryMessage';

//获取聊天历史,传入sessionVersion,对方id和type参数
export default (sessionVersion, id, type) => {
    let endVersion = sessionVersion;
    let start = endVersion > 20 ? endVersion - 20 : 0;
    YYIMChat.getHistoryMessage({
        id: id,
        type: type,
        startVersion: start,
        endVersion: endVersion,
        success: function (res) {
            $chats_list.html('');
            $chat_box.show();
            if (res.result.length > 0) {
                //把聊天记录缓存到本地
                localStorage.setItem('historychats', JSON.stringify(res.result));
                renderHistoryMessage();
            }
        }
    });
};