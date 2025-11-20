const express = require('express')
const users = require('./MOCK_DATA.json')

const app = express()
const PORT = 3000

// ----------------- Routes here -----------------

// This Return all users in the Html format
app.get('/users', (req,res) => {
    //return res.json(users)
    const html = `
        <ul>
            ${users.map(user => `<li>${user.first_name}</li>`).join('')}
        </ul>
    `
    res.send(html)
})

// --------------- REST API Endpoint to return all users in JSON format -------------

app.get('/api/users', (req,res) => {
    return res.json(users)
})

// app.get('/api/users/:id', (req,res) => {
//     const id = Number(req.params.id);  
//     const user = users.find((user) => user.id === id)
//     return res.json(user)
// })

app.post('/api/users', (req, res) => {
    // TODO Create New User
    return res.json({ status: 'Pending...' })
})

// app.patch('/api/users/:id', (req, res) => {
//     // TODO Edit the User with ID
//     return res.json({ status: 'Pending...' })
// })

// app.delete('/api/users/:id', (req, res) => {
//     // TODO Delete the User with ID
//     return res.json({ status: 'Pending...' })
// })

app.route('/api/users/:id').get((req,res) => {
    const id = Number(req.params.id);  
    const user = users.find((user) => user.id === id)
    return res.json(user)
}).put((req, res) => {
    // Edit the User with ID
    return res.json({ status: 'Pending...' })
}).delete((req, res) => {
    // Delete the User with ID
    return res.json({ status: 'Pending...' })
})


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})










