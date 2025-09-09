const express = require('express');
const router = express.Router();
const {createReview , viewReviews , updateReview , deleteReview} = require('./Controller/Reviews.controller');
const {requireAuth} = require('../../middleware/JWT');

router.post('/reviews/:propertyId', requireAuth, createReview);
router.get('/reviews', requireAuth, viewReviews);
router.put('/reviews/:id', requireAuth, updateReview);
router.delete('/reviews/:id', requireAuth, deleteReview);

module.exports = router;