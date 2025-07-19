const express = require('express');
const router = express.Router();
const guestRouter = require('./guest.router');
const userRouter = require('./user.router');
const typeRouter = require('./type.router');
const sportFieldRouter = require('./sportField.router');
const categoryPolicyRouter = require('./categoryPolicy.router');
const policyRouter = require('./policy.router');

router.use('/guest', guestRouter);
router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/sport-field', sportFieldRouter);
router.use('/category-policy', categoryPolicyRouter);
router.use('/policy', policyRouter);

module.exports = router;
