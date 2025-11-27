const User = require('../models/user')

async function handleUserLogin(req,res) {

    const { email, password } = req.body;

    const user = await User.matchPassword(email, password)

    //console.log("user :", user)

    if(!user) {
        return res.render('signin', {
            error: "Invalid Username or Password"
        })
    }

    return res.redirect('/')

}

async function handleCreateNewUser(req,res) {
    const { username, email, password } = req.body;
    await User.create({
        username,
        email,
        password
    })
    return res.redirect('signin')
}

module.exports = {
    handleUserLogin,
    handleCreateNewUser
}