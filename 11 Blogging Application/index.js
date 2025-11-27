const express = require('express')
const path = require('path')

const connectToDatabase = require('./connect')

const userRoutes = require('./routes/user')

const app = express()
const PORT = 3000

// Connection to the database
connectToDatabase('mongodb://localhost:27017/blogify');

// Set View Engine
app.set("view engine", 'ejs')
app.set("views", path.resolve('./views'))

// Middleware
app.use(express.urlencoded({ extended: false }))

// Routes
app.get('/', (req,res) => {
    res.render("home")
})

app.use('/user', userRoutes)

app.listen(PORT, () => {
    console.log(`Server is Running at http://localhost:${PORT}`)
})
