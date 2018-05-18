//dom元素
import {
    $hmyfriend
} from '../common/jqelements';

export default (myfriendData) =>{
    let myfriend_str='';
    myfriendData.forEach(element => {
        myfriend_str+=`
        <li data-id="${element.id}" data-nickname="${element.name||element.id}" data-type="chat" data-photo="${element.photo}">
        <img src="${YYIMChat.getFileUrl(element.photo)}" alt="">
        <span>${element.name}</span> 
        </li>
        `
    });
    $hmyfriend.html(myfriend_str);
}