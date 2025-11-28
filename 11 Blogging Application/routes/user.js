const express = require('express')
const {
    handleUserLogin,
    handleCreateNewUser, 
    handleUserLogout
} = require('../controllers/user')

const router = express()

router.get('/signin', (req,res) => {
    return res.render('signin')
})

router.get('/signup', (req,res) => {
    return res.render('signup')
})

router.post('/signup', handleCreateNewUser)
router.post('/signin', handleUserLogin)
router.get('/logout', handleUserLogout)

module.exports = router