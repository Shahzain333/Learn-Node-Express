const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')

const checkForAuthenticationCookie = require('./middlewares/authentication')
const userRoutes = require('./routes/user')

const connectToDatabase = require('./connect')

const app = express()
const PORT = 3000

// Connection to the database
connectToDatabase('mongodb://localhost:27017/blogify');

// Set View Engine
app.set("view engine", 'ejs')
app.set("views", path.resolve('./views'))

// Middleware
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))

// Routes
app.get('/', (req,res) => {
    return res.render("home", {
        user: req.user,
    })
})

app.use('/user', userRoutes)

app.listen(PORT, () => {
    console.log(`Server is Running at http://localhost:${PORT}`)
})
