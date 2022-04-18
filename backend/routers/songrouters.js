const express = require('express');
const songcontroller = require('../controllers/songcontroller');
const router = express.Router();

router.get('/', songcontroller.getSongs );
console.log("");
module.exports = router ;