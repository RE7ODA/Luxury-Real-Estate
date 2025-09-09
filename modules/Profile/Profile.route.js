const express = require('express')
const router = express.Router();
const {getProfile , updateProfile , deleteProfile} = require('./Controller/Profile.controller');
const {requireAuth} = require('../../middleware/JWT');

router.get('/profile', requireAuth, getProfile);
router.put('/profile', requireAuth, updateProfile);
router.delete('/profile', requireAuth, deleteProfile);

module.exports = router