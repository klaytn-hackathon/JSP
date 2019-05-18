var express = require('express');
var router = express.Router();

let AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1"
});
let ses = new AWS.SES();

let params = {
  Destination: {
    ToAddresses: ["park64kr63@gmail.com"],
    CcAddresses: [],
    BccAddresses: []
  },
  Message: {
    Body: {
      Text: {
        Data: "HELLO WORLD",
        Charset: "utf-8"
      }
    },
    Subject: {
      Data: "SES 테스트 중입니당",
      Charset: "utf-8"
    }
  },
  Source: "park64kr63@gmail.com",
  ReplyToAddresses: ["park64kr63@gmail.com"]
}

router.post('/verification', function (req, res) {
  ses.sendEmail(params, function (err, data) {
    console.log('err', err);
    res.send(data);
  });
});

module.exports = router;