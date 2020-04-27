/*
 * @Description: 
 * @Author: xiaobei
 * @Date: 2020-04-26 16:58:36
 * @LastEditTime: 2020-04-26 17:38:06
 */
const got = require('got')

const config = {
    'UA': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36',
}

class Curl {
    async get(url, option) {
        let res;
        try {
            const response = await got(url, {
                'user-agent': config.UA,
                ...option
            });
            res = { data: response.body, timings: response.timings, code: 1 }
        } catch (error) {
            console.log('请求时报错：', error.response.body);
            res = { data: '', timings: response.timings, code: 1 }
        }
        return res
    }

    async post(url, body, option) {
        let res;
        try {
            const response = await got.post(url, {
                json: body,
                responseType: 'json',
                'user-agent': config.UA,
                ...option
            });
            res = { data: response.body, timings: response.timings, code: 1 }
        } catch (error) {
            console.log('请求时报错：', error.response.body);
            res = { data: '', timings: response.timings, code: 1 }
        }
        return res
    }

}
module.exports = Curl

/**
 *  支持got所有参数，地址：https://www.npmjs.com/package/got
 *  responseType，返回结果的属性，默认是text，可选，支持 json buffer,
 *  headers
 *  默认先这样写吧，后续可以增加，支持默认内置headers，内置Referer
 *
 */