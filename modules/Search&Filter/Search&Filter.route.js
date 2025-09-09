const express = require('express');
const router = express.Router();
const {Search , Filter} = require('./Controller/Search&Filter.controller');

router.get('/search', Search);
router.get('/filter', Filter);

module.exports = router