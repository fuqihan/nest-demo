import { Injectable } from "@nestjs/common";
import { ClientGrpc, Client } from "@nestjs/microservices";
var AipFaceClient = require("baidu-aip-sdk").face;
// 设置APPID/AK/SK
var APP_ID = "11104140";
var API_KEY = "otHkf4dShnyQ0SiuBEFx3GBo";
var SECRET_KEY = "0FSQgtDS040C7ICuBHr4AnbdSctBCbOP";
// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipFaceClient(APP_ID, API_KEY, SECRET_KEY);
var HttpClient = require("baidu-aip-sdk").HttpClient;
// 设置request库的一些参数，例如代理服务地址，超时时间等
// HttpClient.setRequestOptions({ timeout: 5000 });

@Injectable()
export class BaiduServe {
    client: any;
    constructor() {
        HttpClient.setRequestInterceptor(function (requestOptions) {
            // 查看参数
            // console.log(requestOptions)
            // 修改参数
            // requestOptions.timeout = 5000;
            // 返回参数
            return requestOptions;
        });
    }
    verifyUser(file, phone, groupId) {
        let image = file.toString("base64");
        return new Promise(function(resolve, reject) {
            client.search(image, 'BASE64', groupId, {
                user_id: phone
            }).then(function (result) {
                if(result.error_code === 0 && result.result && Number(result.result.user_list[0].score) > 95) {
                    resolve({
                        code: 0,
                        data: Number(result.result.user_list[0].score)
                    })
                } else {
                    reject({
                        code: 1,
                        err: result.error_msg
                    })
                }
            }).catch(function (err) {
                reject({
                    code: 1,
                    err
                })
            });
        })
    }

    addUser(file, phone, groupId) {
        let image = file.toString("base64");
        return new Promise(function(resolve, reject) {
            client.addUser(image, 'BASE64', groupId, phone).then(function (result) {
                console.log(result)
                if(result.error_code === 0) {
                    resolve({
                        code: 0,
                    })
                } else {
                    reject({
                        code: 1,
                        err: result.error_msg
                    })
                }
            }).catch(function (err) {
                reject({
                    code: 1,
                    err
                })
            });
        }) 
    }

}
