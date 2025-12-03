require('dotenv').config()

const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const Blog = require('./models/blog')

const checkForAuthenticationCookie = require('./middlewares/authentication')
const userRoutes = require('./routes/user')
const blogRoutes = require('./routes/blog')

const connectToDatabase = require('./connect')

const app = express()
const PORT = process.env.PORT || 3000

// Connection to the database
connectToDatabase(process.env.MONGO_URL);

// Set View Engine
app.set("view engine", 'ejs')
app.set("views", path.resolve('./views'))

// Middleware
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))
app.use(express.static(path.resolve('./public')))

// Routes
app.get('/', async (req,res) => {
    const allBlogs = await Blog.find({})
    return res.render("home", {
        user: req.user,
        blogs: allBlogs
    })
})

app.use('/user', userRoutes)
app.use('/blog', blogRoutes)

app.listen(PORT, () => {
    console.log(`Server is Running at http://localhost:${PORT}`)
})
