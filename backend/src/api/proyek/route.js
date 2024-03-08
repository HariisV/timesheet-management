const express = require('express');

const router = express.Router();

const { insert, get } = require('./controller');

router.get('/', get);
router.post('/insert', insert);

module.exports = router;
