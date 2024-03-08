const express = require('express');

const router = express.Router();

const { update } = require('./controller');

router.patch('/', update);

module.exports = router;
