const express = require('express');
const usercontroller = require('../controllers/usercontroller');
const router = express.Router();

router.post('/login', usercontroller.login );
router.get('/refreshtoken', usercontroller.refreshToken );
router.get('/playlist', usercontroller.getPlaylist );
router.post('/playlist/songs/:songId', usercontroller.addSong );
router.delete('/playlist/songs/:songId', usercontroller.removeSong );
module.exports = router ;