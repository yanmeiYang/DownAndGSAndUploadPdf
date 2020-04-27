/*
 * @Description: 
 * @Author: xiaobei
 * @Date: 2020-04-26 17:02:21
 * @LastEditTime: 2020-04-27 17:42:24
 */

const { Curl, Download } = require('./core')


// const curl = new Curl()
// const body = [
//     {
//         "action": "search.search",
//         "parameters": {
//             "ids": [
//                 "5629d10b45ce1e596655e1ee"
//             ]
//         },
//         "schema": {
//             "person": [
//                 "id",
//                 "name",
//                 "name_zh",
//                 "avatar",
//                 "tags",
//                 "tags_zh",
//                 {
//                     "indices": [
//                         "hindex",
//                         "pubs",
//                         "citations"
//                     ]
//                 },
//                 {
//                     "profile": [
//                         "position",
//                         "position_zh",
//                         "affiliation",
//                         "affiliation_zh"
//                     ]
//                 }
//             ]
//         }
//     }
// ]
// const Authorization = '111'
// curl.post('https://apiv2.aminer.cn/magic?', body, { Authorization }).then((data) => {
//     console.log(JSON.stringify(data));
// })

const download = new Download()

// download.listMethods().then((data) => {
//     console.log(data);
// })

// download.power('changeGlobalOption', { 'split': '10', 'user-agent': '11' }).then((data) => {
//     console.log(data);

// })
download.power('getGlobalOption').then((data) => {
    console.log(data);
})