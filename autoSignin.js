/**
 * @name autoSignin.js
 * @author Anonym-w
 * @version 0.1
 */

const updateAccesssTokenURL = "https://auth.aliyundrive.com/v2/account/token"
const signinURL = "https://member.aliyundrive.com/v1/activity/sign_in_list"
const refreshToeknArry = [
    "6f711672400d4c23876c6d0e3b1e05ef",
    "4995e2a0738a4ca0aeeea04ff5ad35ac",
    "6f7feb850dd449d183a8b81698b21bd7"
]
// import fetch from 'node-fetch';
const fetch = require("node-fetch")
// const notify = require('./sendNotify');


!(async () => {
    for (const elem of refreshToeknArry) {

        const queryBody = {
            'grant_type': 'refresh_token',
            'refresh_token': elem
        };

        //使用 refresh_token 更新 access_token
        fetch(updateAccesssTokenURL, {
            method: "POST",
            body: JSON.stringify(queryBody),
            headers: { 'Content-Type': 'application/json' }
        })
            .then((res) => res.json())
            .then((json) => {
                // console.log(json);

                let access_token = json.access_token;
                console.log(access_token);


                //签到
                fetch(signinURL, {
                    method: "POST",
                    body: JSON.stringify(queryBody),
                    headers: { 'Authorization': 'Bearer ' + access_token, 'Content-Type': 'application/json' }
                })
                    .then((res) => res.json())
                    .then((json) => {
                        console.log(json);
                    })
                    .catch((err) => console.log(err))

            })
            .catch((err) => console.log(err))


    }
    // await notify.sendNotifyBark(`v2free 自动签到结果`,allnotify)


})().catch((e) => {
    console.error(`❗️  运行错误！\n${e}`)
}).finally()
// notify.sendNotify(`v2free 自动签到结果`,allnotify)

