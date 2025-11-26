const express = require('express');
const path = require('path');
const router = express.Router();

const URL = require('../models/url');
const { restricTo } = require('../middleware/auth');

// Serve static files from the 'public' directory
router.get('/', restricTo(['NORMAL', 'ADMIN']), async (req,res) => { // Inline MiddleWare
    //if(!req.user) return res.redirect('/login')
    const allUrls = await URL.find({ createdBy: req.user._id });
    return res.render('home', { urls: allUrls });
})

router.get('/admin/urls', restricTo(['ADMIN']), async (req,res) => { 
    const allUrls = await URL.find({});
    return res.render('home', { urls: allUrls });
})

router.get('/signup', (req,res) => {
    return res.render('signup')
}) 

router.get('/login', (req,res) => {
    return res.render('login')
}) 

module.exports = router;
