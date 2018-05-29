//元素
import { $yyim_iogin, $yyim_box } from './jqelements';

//用户登陆
export default (username, password) => {
    //正式环境
    // $.ajax({
    //     url: 'https://im.yyuap.com/sysadmin/rest/yonyou/udn/token',
    //     type: 'POST',
    //     dataType: 'json',
    //     headers: {"Content-Type": "application/json"},
    //     data: JSON.stringify({
    //         "username":username,
    //         "clientId":"c85130ac2c80d83b86fc1bc344ac1211",
    //         "clientSecret":"CED146135A584D5F2EAB33635D19AE99"
    //     }),
    //     success: function (result) {
    //         let clientIdentify = "pc" + String(new Date().getTime());
    //         $yyim_iogin.hide();
    //         $yyim_box.show();
    //         //登陆YYIMSDK
    //         YYIMChat.login({
    //             "username": username,
    //             "token": result.token,
    //             "expiration": result.expiration,
    //             "appType": 4,
    //             "identify": clientIdentify
    //         });
    //     },
    //     error: function (arg) {
    //         console.log(arg);
    //     }
    // });
    //测试环境
    $.ajax({
        url: 'http://172.20.15.60/sysadmin/rest/yonyou/im_pre/token',
        type: 'POST',
        dataType: 'json',
        headers: {"Content-Type": "application/json"},
        data: JSON.stringify({
            "username":username,
            "clientId":"b26ba51058eee9db4f88a7a2b1bd1b06",
            "clientSecret":"CC9A71E0C2528EDB1652DFB18ECE8DDF"
        }),
        success: function (result) {
            let clientIdentify = "pc" + String(new Date().getTime());
            $yyim_iogin.hide();
            $yyim_box.show();
            //登陆YYIMSDK
            YYIMChat.login({
                "username": username,
                "token": result.token,
                "expiration": result.expiration,
                "appType": 4,
                "identify": clientIdentify
            });
        },
        error: function (arg) {
            console.log(arg);
        }
    });
}
