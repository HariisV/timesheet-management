const express = require('express');

const router = express.Router();

const { get, insert, update, remove } = require('./controller');

router.get('/', get);
router.post('/insert', insert);
router.patch('/update', update);
router.delete('/remove', remove);
module.exports = router;
