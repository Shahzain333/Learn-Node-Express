const express = require('express');
const path = require('path');
const connectToDatabase = require('./connect');
const cookieParser = require('cookie-parser')
const { restricTo, checkForAuthentication } = require('./middleware/auth')

const urlRoute = require('./routes/urls');
const staticRouter = require('./routes/staticRouter');
const userRoute = require('./routes/user')

const app = express();
const PORT = 3000;

// Connection to the database
connectToDatabase('mongodb://localhost:27017/short-url');

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.resolve('views'));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

app.use(checkForAuthentication)

// Routes
app.use('/url', restricTo(['NORMAL', 'ADMIN']), urlRoute)
app.use('/user', userRoute)
// Static Routes
app.use('/', staticRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
