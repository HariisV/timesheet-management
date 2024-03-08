const express = require('express');

const router = express.Router();

const { authenticateUser } = require('#errors/middlewares');

const authRouter = require('#api/auth/route.js');

router.use('/api/auth', authRouter);

module.exports = router;
