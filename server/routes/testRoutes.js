const express = require('express');
const { testController } = require('../controller/testController');

const router = express.Router();

router.post('/',testController);

module.exports = router;