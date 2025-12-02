const Blog = require('../models/blog')

async function handlecreateBlog(req, res) {
    // console.log(req.body)
    // console.log(req.file)
    const { title, body } = req.body

    if(!title || !body ) {
        return res.status(400).json({ error: 'Blog is required' });
    }

    const blog = await Blog.create({
        title: title,
        body: body,
        createdBy: req.user._id,
        coverImageURL: `uploads/${req.file.filename}`
    })

    return res.redirect(`/blog/${blog._id}`)
}

module.exports = {
    handlecreateBlog
}