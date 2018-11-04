const vision = require('@google-cloud/vision'); 
const fs = require('fs');

const client = new vision.ImageAnnotatorClient();

let ocr = (fileName) => {
    client
    .textDetection(fileName)
    .then(results => {
      const detections = results[0].textAnnotations;
      console.log('==VISON Text==');
      let data = JSON.stringify(detections, null, 2);
      fs.writeFileSync('./output/ocr_res.json',data);
      var convert = JSON.parse(data);
      console.log(convert[0].description);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}

module.exports = ocr;
