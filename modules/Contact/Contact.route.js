const express = require('express');
const router = express.Router();
const {createContact , getContact , deleteContact} = require('./Controller/Contact.controller');
const {requireAuth} = require('../../middleware/JWT');

router.post('/contact', requireAuth, createContact);
router.get('/contact', getContact);
router.delete('/contact/:id', requireAuth, deleteContact);

module.exports = router