const express = require('express');

const router = express.Router();

const { authenticateUser } = require('#middlewares');

const authRouter = require('#api/auth/route.js');
const userRouter = require('#api/user/route.js');
const proyekRouter = require('#api/proyek/route.js');
const kegiatanRouter = require('#api/kegiatan/route.js');

router.use('/api/auth', authRouter);
router.use('/api/user', authenticateUser, userRouter);
router.use('/api/proyek', authenticateUser, proyekRouter);
router.use('/api/kegiatan', authenticateUser, kegiatanRouter);
module.exports = router;
