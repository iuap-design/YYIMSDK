
//dom元素
import {
    $hmygrouplist
} from '../common/jqelements';

export default (groups) => {
    let groupStr = '';
    groups.forEach(function(group){
        groupStr += `<li data-id="${group.id}" data-name="${group.name}" data-photo="${group.photo || ''}">
                    <div class="avatar">
                        <img src="${YYIMChat.getFileUrl(group.photo) || './imgs/avatar.jpg'}" alt=""> <span>${group.name || '群组'}</span>
                    </div>
                </li>`;
    });
    $hmygrouplist.html(groupStr);
}