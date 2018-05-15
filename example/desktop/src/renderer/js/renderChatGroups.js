
//dom元素
import {
    $hgroups
} from './jqelements';

export default (groups) => {
    let groupStr = '';
    groups.forEach(function(group){
        groupStr += `<li data-id="${group.id}" data-name="${group.name}" data-photo="${group.photo || ''}">
                    <div class="avatar">
                        <img src="${YYIMChat.getFileUrl(group.photo) || 'static/imgs/avatar.jpg'}" alt="">
                    </div>
                    <div class="detail dingyue">
                        <h3 class="name cuttxt">${group.name || '群组'}</h3>
                    </div>
                </li>`;
    });
    $hgroups.html(groupStr);
}