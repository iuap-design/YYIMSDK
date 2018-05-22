
//dom元素
import {
  $hmygrouplist
} from '../common/jqelements';

export default (groups) => {
  let groupStr = '';
  groups.forEach(function(group){
      groupStr += `<li data-id="${group.id}" data-nickname="${group.name}" data-photo="${group.photo || ''}" data-type="groupchat">
                  <div class="avatar">
                      <img src="${YYIMChat.getFileUrl(group.photo) || 'static/imgs/avatar.jpg'}" alt=""><span>${group.name || '群组'}</span>
                  </div>
              </li>`;
  });
  $hmygrouplist.html(groupStr);
}