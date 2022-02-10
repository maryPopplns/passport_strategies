const path = require('path');

const express = require('express');
const router = express.Router();
const { index_get } = require(path.join(__dirname, '../controllers/index'));

// [ HOME ROUTE ]
router.get('/', index_get);

module.exports = router;
