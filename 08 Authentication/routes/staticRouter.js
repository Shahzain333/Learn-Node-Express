const express = require('express');
const path = require('path');
const router = express.Router();

const URL = require('../models/url');

// Serve static files from the 'public' directory

router.get('/', async (req,res) => {
    if(!req.user) return res.redirect('/login')
    const allUrls = await URL.find({ createdBy: req.user._id });
    return res.render('home', { urls: allUrls });
})

router.get('/signup', (req,res) => {
    return res.render('signup')
}) 

router.get('/login', (req,res) => {
    return res.render('login')
}) 

module.exports = router;
