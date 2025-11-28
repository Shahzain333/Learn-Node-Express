const User = require('../models/user')

async function handleUserLogin(req,res) {

    const { email, password } = req.body;
    
    try {
        //const user = await User.matchPassword(email, password)
        const token = await User.matchPasswordAndGenerateToken(email, password)

        //console.log("user :", user)
        //console.log("token :", token)

        // if(!user) {
        //     return res.render('signin', {
        //         error: "Invalid Username or Password"
        //     })
        // }

        return res.cookie('token', token).redirect('/')

    } catch (error) {
        return res.render('signin', {
            error: "Incorrect Email or Password"
        })
    }

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

async function handleUserLogout(res,res) {
    res.clearCookie('token').redirect('/')
}

module.exports = {
    handleUserLogin,
    handleCreateNewUser,
    handleUserLogout
}