//dom元素
import {
    $hmyfriend
} from '../common/jqelements';

export default (myfriendData) =>{
    let myfriend_str='';
    myfriendData.forEach(element => {
        myfriend_str+=`
        <li>
        <img src="${YYIMChat.getFileUrl(element.photo)}" alt="">
        <span>${element.name}</span> 
        </li>
        `
    });
    $hmyfriend.html(myfriend_str);
}