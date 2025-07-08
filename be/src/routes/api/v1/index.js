const express = require('express');
const router = express.Router();
const guestRouter = require('./guest.router');
const userRouter = require('./user.router');
const typeRouter = require('./type.router');
const sportFieldRouter = require('./sportField.router');

router.use('/guest', guestRouter);
router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/sport-field', sportFieldRouter);
router.use('/news', newsRouter);

module.exports = router;
