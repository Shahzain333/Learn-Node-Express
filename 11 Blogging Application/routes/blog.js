const express = require('express')
const multer = require('multer')
const path = require('path')

const {
    handlecreateBlog,
    handlegetBlog,
    handleCreateComment
} = require('../controllers/blog')

const router = express()

router.get('/add-new', (req,res) => {
    return res.render("addBlog", {
        user: req.user,
    })
})

 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, path.resolve(`./public/uploads/`))
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}-${file.originalname}`
        return cb(null, fileName)
    }
})

const upload = multer({ storage: storage })

router.post('/', upload.single('coverImage'), handlecreateBlog)

router.get('/:id', handlegetBlog)

router.post('/comment/:blogId', handleCreateComment)

module.exports = router