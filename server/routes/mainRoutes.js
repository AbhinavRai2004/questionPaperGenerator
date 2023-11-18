const express = require('express');
const { inputController } = require('../controller/inputController');

const router = express.Router();

router.post('/input',inputController);

module.exports = router;

