const express = require('express');
const router = express.Router();
const guestRouter = require('./guest.router');
const userRouter = require('./user.router');

router.use('/guest', guestRouter);
router.use('/user', userRouter);

module.exports = router;
