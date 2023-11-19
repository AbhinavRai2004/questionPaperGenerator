const express = require('express');

const {questionBankController} = require('../controller/questionBankController');

const router = express.Router();

router.post('/',questionBankController);

module.exports = router;

