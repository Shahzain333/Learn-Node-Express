const Blog = require('../models/blog')
const Comment = require('../models/comment')

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

async function handlegetBlog(req,res) {
    const blog = await Blog.findById(req.params.id).populate('createdBy')
    const comments = await Comment.find({ blogId: req.params.id }).populate('createdBy')
    return res.render('blog', {
        user: req.user,
        blog: blog,
        comment: comments
    })
}

async function handleCreateComment(req, res){
    await Comment.create({
        content: req.body.content,
        blogId: req.params.blogId,
        createdBy: req.user._id 
    })
    return res.redirect(`/blog/${req.params.blogId}`)
}

module.exports = {
    handlecreateBlog,
    handlegetBlog,
    handleCreateComment
}