// ghostscript 客户端需要安装
// const gs = require('ghostscript4js')
const fs = require('fs');
const path = require("path");
const uploadPdf = require("./uploadPdf.js");

// 输入文件
var pathName = "./cvpr2020";
// 输出文件
const outPathName = './yasuo';


// 压缩pdf
const ghostscript4js = async (input, output) => {
    let cmd = `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/screen -dNOPAUSE -dQUIET -dBATCH -sOutputFile=${output} ${input}`
    try {
        const data = await gs.execute(cmd)
    } catch (err) {
        console.log("err-------", input)
    }
}


const firstStep = () => {
    const errorPdf = []
    const files = fs.readdirSync(pathName);
    for (var i = 0; i < files.length; i++) {
        const pdfName = files[i];
        const filePath = path.join(pathName, pdfName)
        const outFilePath = path.join(outPathName, pdfName)
        if (pdfName.includes('pdf')) {
            if (fs.existsSync(outFilePath)) {
                // TODO: 成功压缩的
            } else {
                errorPdf.push(pdfName)
                fs.stat(filePath, function (err, data) {
                    if (1024 * 1024 * 3 < data.size) {
                        // TODO: 需要压缩
                        ghostscript4js(filePath, outFilePath)
                    } else {
                        // TODO:不需要压缩的直接复制到输出文件
                        fs.writeFileSync(outFilePath, fs.readFileSync(filePath));
                    }
                });
            }
        }
    }
}



const main = () => {
    // 第一步: 压缩pdf
    firstStep();

    // 第二步: 上传pdf
    uploadPdf({ directory: outPathName, jsonFile: './cvpr2020.json' })
}
main()