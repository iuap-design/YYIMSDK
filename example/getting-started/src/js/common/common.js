/***************************     公共方法      ****************************/
// 判断是否清除聊天框未发送消息
 const isClear = (targetID) => {
    let prevID = localStorage.getItem('targetuserid');
    if (prevID == targetID) {
        return false;
    } else {
        return true;
    }
};
const getColor = (name) =>{
    let  color = ['#eead10', '#f99a2b', '#f38134', '#6495ed', '#3ab1aa', '#0abfb5', '#06aae1', '#00bfff', '#96bc53', '#00ced1', '#89a8e0'];
    let newName = encodeURI(name).replace(/%/g, "");
    let  lastName,
        hexadecimal,
        tenBinary;
    if (newName.length >= 6) {
        lastName = newName.substr(lastName, 6);
        hexadecimal = parseInt(lastName, 16);
        tenBinary = hexadecimal % 10;
        if (isNaN(tenBinary)) {
            return color[4];
        }
        return color[tenBinary]
    } else {
        return color[4]
    }
}
const  getNameLastTwo = (str) =>{
    if (str) {
        return str.slice(-2);
    } else {
        return "";
    }    
}
//存缓存
const saveGroupVcardMessage = (obj) =>{
        let groupVardMessage = JSON.parse(localStorage.getItem('groupVardMessage')||'{}') ;
        groupVardMessage[obj.id]=obj;
        localStorage.setItem('groupVardMessage',JSON.stringify(groupVardMessage));
        //处理群成员
        let chatVardMessage = JSON.parse(localStorage.getItem('chatVardMessage')||'{}') ;
        if(obj.members){
            for(var i=0;i<obj.members.length;i++){
                chatVardMessage[obj.members[i].id] = obj.members[i];
            }
        }
        localStorage.setItem('chatVardMessage',JSON.stringify(chatVardMessage));
}
//存个人缓存
const saveChatVcardMessage = (obj) =>{
        let chatVardMessage = JSON.parse(localStorage.getItem('chatVardMessage')||'{}') ;
        chatVardMessage[obj.id] = obj;
        localStorage.setItem('chatVardMessage',JSON.stringify(chatVardMessage));
}
export {isClear,getColor,getNameLastTwo,saveGroupVcardMessage,saveChatVcardMessage}