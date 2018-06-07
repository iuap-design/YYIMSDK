//dom元素
import {
    $hmyfriend
} from '../common/jqelements';
// common公共方法
import { getColor,getNameLastTwo } from '../common/common';
export default (myfriendData) =>{
    let myfriend_str='';
    myfriendData.forEach(element => {
        if(element.photo){
            myfriend_str+=`
            <li data-id="${element.id}" data-nickname="${element.name||element.id}" data-type="chat" data-photo="${element.photo}">
            <img src="${YYIMChat.getFileUrl(element.photo)}" alt="">
            <span>${element.name}</span> 
            </li>
            `
        }else{
            myfriend_str+=`
            <li data-id="${element.id}" data-nickname="${element.name||element.id}" data-type="chat" data-photo="${element.photo}">
            <div class="myFriend-noPhoto" style="background:${getColor(element.name)||getColor(element.id)}">${getNameLastTwo(element.name) || getNameLastTwo(element.id)}</div>
            <span>${element.name}</span> 
            </li>
            `
        }
      
    });
    $hmyfriend.html(myfriend_str);
}