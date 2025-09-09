const express = require('express');
const router = express.Router();
const {createMember , viewMember , updateMember , deleteMember} = require('./Controller/Team-Member.controller');
const {requireAuth} = require('../../middleware/JWT');
const {uploadMember} = require('../../middleware/upload');

router.post('/team-member', requireAuth, uploadMember.single("image"), createMember);
router.get('/team-member', viewMember);
router.put('/team-member/:id', requireAuth, uploadMember.single('image') , updateMember);
router.delete('/team-member/:id', requireAuth, deleteMember);

module.exports = router;