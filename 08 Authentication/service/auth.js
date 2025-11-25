//const sessionIdToUserMap = new Map()
const jwt = require('jsonwebtoken')
const secret = "Shahz@in786"

// Maintain State
// function setUser(id, user) {
//     sessionIdToUserMap.set(id,user)
// }

// function getUser(id) {
//     return sessionIdToUserMap.get(id)
// }

// Now Create Tokens
function setUser(user) {
    return jwt.sign({
        _id: user._id,
        email: user.email
    }, secret)
}

function getUser(token) {
    if(!token) return null
    try {
        return jwt.verify(token, secret)
    } catch (error) {
        return null   
    }
}

module.exports = {
    setUser,
    getUser
}





