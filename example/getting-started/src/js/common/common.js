/***************************     公共方法      ****************************/
// 判断是否清除聊天框未发送消息
export const isClear = (targetID) => {
    let prevID = localStorage.getItem('targetuserid');
    if (prevID == targetID) {
        return false;
    } else {
        return true;
    }
};