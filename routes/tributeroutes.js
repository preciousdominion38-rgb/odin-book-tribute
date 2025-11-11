const express = require('express');
const router = express.Router();
const tributeCtrl = require('../controllers/tributecontroller');

router.get('/tribute', tributeCtrl.getTribute);

module.exports = router;
