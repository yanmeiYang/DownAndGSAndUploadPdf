const fs = require('fs');
const originalData = require('./cvpr2020.json');

const cvpr = []
const cvprWidthPdf = []
const getIds = () => {
    originalData.map(data => {
        cvpr.push(data._id);
        if (data.pdf_src) {
            cvprWidthPdf.push(data._id);
        }
    });
}


new Promise((resolve, reject) => {
    resolve(getIds())
}).then(
    // fs.appendFileSync('./cvpr2020_ids.json', JSON.stringify(cvpr));
    fs.appendFileSync('./cvpr2020_ids_pdf.json', JSON.stringify(cvprWidthPdf))
)