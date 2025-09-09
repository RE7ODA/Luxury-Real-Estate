const express = require('express');
const router = express.Router();
const {viewdashboard} = require('./Controller/Dashboard.controller');
const {requireAuth} = require('../../middleware/JWT');

router.get('/dashboard', requireAuth, viewdashboard);

module.exports = router;