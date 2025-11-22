const express = require('express')
const { connectMongoDB } = require('./connection')

const userRouter = require('./routes/user')
const { logReqRes } = require('./middlewares')

const app = express()
const PORT = 3000

// Connection
connectMongoDB('mongodb://127.0.0.1:27017/youtube-app-1')

// Middleware to parse JSON bodies - Plugin
app.use(express.urlencoded({ extended: false })); // For parsing application/x-www-form-urlencoded

// Custom Middleware to log request info
app.use(logReqRes("log.txt"))

app.use((req, res, next) => {
    next();
})

// User Routes
app.use('/api/users', userRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})










