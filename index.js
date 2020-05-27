/*
 * @Description: 
 * @Author: xiaobei
 * @Date: 2020-04-26 17:02:21
 * @LastEditTime: 2020-05-13 16:38:25
 */

const { Curl, Download } = require('./core')
const fs = require('fs');


const originalData = require('./cvpr2020.json');

const list = [];
const existsPdf = []
function createList() {
    originalData.map(data => {
        if (data.pdf_src) {
            const pdfUrl = data.pdf_src[0].split("/");
            const pdf = pdfUrl[pdfUrl.length - 1];
            if (fs.existsSync(`./cvpr2020/${pdf}.pdf`)) {
                existsPdf.push(data.pdf_src[0]);
            } else {
                list.push(data.pdf_src[0]);
            }
        }
    });
}
function main() {
    new Promise((resolve, reject) => {
        resolve(createList());
    }).then(() => {
        const download = new Download()
        const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.100 Safari/537.36';
        download.power('changeGlobalOption',
            {
                'max-concurrent-downloads': '10',
                'user-agent': UA,
                'all-proxy': 'http://127.0.0.1:7890',
                // 'proxy-method': 'tunnel'
            }
        ).then((data) => {
            console.log(data);

        })
        download.addDownLoadTasks(list, './cvpr2020')
    })
}
main();