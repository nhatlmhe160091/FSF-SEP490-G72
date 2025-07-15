const express = require('express');
const router = express.Router();
const PolicyController = require('../../../controllers/policy.controller');

router.get('/', PolicyController.getPolicy);
router.get('/:id', PolicyController.getPolicyById);

module.exports = router;