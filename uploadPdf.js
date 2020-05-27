var FormData = require('form-data');
var fs = require('fs');
var request = require('request');
const path = require("path");

// TODO:chenying 提供json文件
// const result = require("/Users/yanmeiyang/Documents/YanmeiYang/projects/format-data/conf/ACL2020/errorDownloadPdf.json")


// 上传pdf
function uploadPdf(id, pdf, directory) {
    var form = new FormData();
    form.append('action', 'publication.AssignPdfToPaper');
    form.append('parameters', JSON.stringify({
        "id": id
    }));

    form.append('file', fs.createReadStream(`${directory}/${pdf}.pdf`));

    form.submit('https://apiv2.aminer.cn/magic', function (err, res) {
        // res – response object (http.IncomingMessage)  //
        console.log("res", id, res && res.statusMessage);
        res && res.resume();
        console.log("上传文件失败-------", err)
    });
}

const noPdfPub = []
// 判断数据是否有pdf，有则上传
function run(result, directory) {
    result.map((pub) => {
        if (pub.pdf_src) {
            const pdfUrl = pub.pdf_src[0].split("/");
            const pdf = pdfUrl[pdfUrl.length - 1];
            const filePath = path.join(directory, `${pdf}.pdf`)
            if (fs.existsSync(`${directory}/${pdf}.pdf`)) {
                fs.stat(filePath, function (err, data) {
                    if (1024 * 1024 * 3 > data.size) {
                        uploadPdf(pub._id, pdf, directory)
                    } else {
                        console.log("文件太大，需要压缩", pdf)
                    }

                })
            } else {
                noPdfPub.push(pub)
            }
        }
    })
}

// uploadPdf('5e997e4391e01118b66a5e5f', '2004.07684')

// TODO: 手动改写data大小，没有问题
// const data = result.slice(1400, 1500);
// for (let i = 0; i < data.length / 10; i++) {
//     run(data.slice(i * 10, (i + 1) * 10))
// }
// TODO: 没测试，有可能出错
// 分批次调用API获取数据 不好用
const nextDataForResult = (result, directory) => {
    for (let i = 0; i < result.length / 100; i++) {
        const data = result.slice(i * 100, (i + 1) * 100)
        for (let j = 0; j < data.length / 10; j++) {
            run(data.slice(j * 10, (j + 1) * 10), directory)
        }
    }
}

const externalFunc = ({ directory, jsonFile }) => {
    const result = require(jsonFile);
    nextDataForResult(result, directory)
}

module.exports = externalFunc;
// nextDataForResult()