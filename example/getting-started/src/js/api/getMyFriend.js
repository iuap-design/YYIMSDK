import renderMyFriend from '../render/renderMyFriend'

export default () =>{
    YYIMChat.getRosterItems({
        success:function(result){
            console.log(result);
        },
        error:function(err){
            console.log(err);
        }   
    });
}