const express =  require('express');
const router = express.Router();

const {
    handleUserSignup,
    handleUserSignin
} = require('../controller/user')

router.post('/', handleUserSignup)

router.post('/login', handleUserSignin)

module.exports = router;
