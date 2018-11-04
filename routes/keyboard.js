const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    var data = {
        'type': 'buttons',
        'buttons': ['소개', '사용법', '답안지 양식', '제작정보(테스트이미지)', '@사용하기@']
    };

    res.json(data);
});

module.exports = router;