const express = require('express');
const connectToDatabase = require('./connect');
const urlRoutes = require('./routes/urls');

const app = express();
const PORT = 3000;

// Connection to the database
connectToDatabase('mongodb://localhost:27017/short-url');

// Middleware to parse JSON bodies
//app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/url', urlRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
