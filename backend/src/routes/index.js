const express = require('express');

const router = express.Router();

const { authenticateUser } = require('#middlewares');

const authRouter = require('#api/auth/route.js');
const userRouter = require('#api/user/route.js');

router.use('/api/auth', authRouter);
router.use('/api/user', userRouter);

module.exports = router;
