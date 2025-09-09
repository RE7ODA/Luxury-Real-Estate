const exprees = require('express');
const router = exprees.Router();
const {createProperty , GetProperty , GetPropertyOne , updateProperty , deleteProperty} = require('./Controller/Property.controller');
const {requireAuth} = require('../../middleware/JWT');
const {uploadProperty} = require('../../middleware/upload');

router.post('/property', requireAuth, uploadProperty.array("image", 5), createProperty);
router.get('/property', GetProperty);
router.get('/property/:id', requireAuth, GetPropertyOne);
router.put('/property/:id', requireAuth, uploadProperty.array('image', 5) , updateProperty);
router.delete('/property/:id', requireAuth, deleteProperty);

module.exports = router