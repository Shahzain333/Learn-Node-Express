//const nanoid = require('nanoid');
const shortid = require('shortid');
const URL = require('../models/url');

async function handleGenerateNewShortUrl(req, res) {
    
    const body = req.body;
    
    const shortID = shortid();

    if(!body.url) {
        return res.status(400).json({ error: 'URL is required' });
    }
    
    await URL.create({ 
        shortId: shortID,
        redirectUrl: body.url,
        visitedHistory: [],
    })

    return res.status(201).render('home', { id: shortID });
    //return res.status(201).json({ shortId: shortID });

}

async function handleGetUrlInfo(req, res) {

    const  shortId  = req.params.shortId;
    
    const entry = await URL.findOneAndUpdate(
        { shortId }, 
        { 
            $push: { 
                visitHistory: { timestamp: Date.now() } 
            } 
        }
    )

    res.redirect(entry.redirectUrl)
}

async function handleGetUrlAnalytics(req, res) {
    
    const shortId = req.params.shortId;

    const result = await URL.findOne({ shortId });

    return res.status(201).json({ 
        totalClicks: result.visitHistory.length, 
        analytics: result.visitHistory 
    });

}

async function handleGetAllUrls(req, res){
    const allUrls = await URL.find({});
    return res.render('home', { urls: allUrls });
}

module.exports = {
    handleGenerateNewShortUrl,
    handleGetUrlInfo,
    handleGetUrlAnalytics,
    handleGetAllUrls
};