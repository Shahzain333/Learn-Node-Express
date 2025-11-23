const express = require('express');
const path = require('path');
const router = express.Router();

const { handleGetAllUrls } = require('../controller/url');

// Serve static files from the 'public' directory

router.get('/', handleGetAllUrls)


module.exports = router;
