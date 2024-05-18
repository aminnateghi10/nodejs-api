const express = require('express');
const router = express.Router();
const apiV1 = require('./v1/api-v1.js');

router.use('/v1',apiV1);

router.get('/', (req, res) => {
    res.json('this is awewewewewe');
});

module.exports = router;
