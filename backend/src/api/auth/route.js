const express = require('express');

const router = express.Router();

const { register, login } = require('./controller');

// router.post('/register', upload('avatar').single('image'), register);
router.post('/login', login);

module.exports = router;
