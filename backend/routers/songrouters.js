const express = require('express');
const songcontroller = require('../controllers/songcontroller');
const router = express.Router();

router.get('/', songcontroller.getSongs );
router.get('/play/:songId',songcontroller.playSong);
router.post('/search/',songcontroller.searchSongs);
console.log("");
module.exports = router ;