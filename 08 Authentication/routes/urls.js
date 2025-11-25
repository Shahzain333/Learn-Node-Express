const express =  require('express');
const router = express.Router();

const { 
    handleGenerateNewShortUrl, 
    handleGetUrlInfo,
    handleGetUrlAnalytics,
} = require('../controller/url');

// Route to create a short URL
router.post('/', handleGenerateNewShortUrl)

// Route to get info about a short URL
router.get('/:shortId', handleGetUrlInfo)

router.get('/analytics/:shortId',handleGetUrlAnalytics)

module.exports = router;





