const express = require('express')
const fs = require('fs')
let users = require('./MOCK_DATA.json')

const app = express()
const PORT = 3000

// Middleware to parse JSON bodies - Plugin
app.use(express.urlencoded({ extended: false })); // For parsing application/x-www-form-urlencoded

// Custom Middleware to log request info
app.use((req, res, next) => {
    //console.log(`Hello from Middleware1.....`);
    //return res.json({ message: 'Hello from Middleware1.....' });
    //req.myusername = 'JohnDoe.dev'; // Custom Property
    //next();

    fs.appendFile('log.txt', `\n${Date.now()} - ${req.ip} -${req.method} - ${req.path}\n`, (err,data) => {
        if(err) {
            console.log("Error logging request", err);
        }
        next();
    }); 
})

app.use((req, res, next) => {
    //console.log(`Hello from Middleware2.....`);
    //console.log(`Hello from Middleware2.....`, req.myusername);
    
    // DB Query or Authentications can be done here
    // Credit Card Info 
    // req.creaditCardNumber = '1234-5678-9876-5432';
     
    //return res.end("Hey");
    next();
})

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
    
    //console.log("Users Requested...", req.myusername);

    // Always Add X to the custom headers to avoid conflict with standard headers
    res.setHeader("X-MyName", "Shahzain khan")  // Custom Header
    //console.log("Headers Set...", req.headers);
    return res.json(users)
})

// app.get('/api/users/:id', (req,res) => {
//     const id = Number(req.params.id);  
//     const user = users.find((user) => user.id === id)
//     return res.json(user)
// })

// app.post('/api/users', (req, res) => {
//     // TODO Create New User
//     const body = req.body; // Jo Bhi Frontend sy data recieve hota hai wo yahan ayega body pr
    
//     //console.log("Body", body);
    
//     users.push({id: users.length + 1, ...body }); // Adding new user to the users array

//     fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
//         if(err) {
//             console.log("Error writing file", err);
//         }
//         return res.json({ status: 'Success...', id: users.length })
//     })

// })

// app.patch('/api/users/:id', (req, res) => {
//     // TODO Edit the User with ID
//     return res.json({ status: 'Pending...' })
// })

// app.delete('/api/users/:id', (req, res) => {
//     // TODO Delete the User with ID
//     return res.json({ status: 'Pending...' })
// })

app.post('/api/users', (req, res) => {
    // TODO Create New User
    const body = req.body; // Jo Bhi Frontend sy data recieve hota hai wo yahan ayega body pr
    
    //console.log("Body", body);
    
    users.push({id: users.length + 1, ...body }); // Adding new user to the users array

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        if(err) {
            console.log("Error writing file", err);
        }
        return res.json({ status: 'Success...', id: users.length })
    })

})

app.route('/api/users/:id').get((req,res) => {

    const id = Number(req.params.id);  
    const user = users.find((user) => user.id === id)

    // Check if user exists
    const userExisting = users.some(user => user.id === id);
    if(!userExisting){
        return res.status(404).json({ status: `No user found with the id of ${id}` });
    }
    
    return res.json(user)

}).patch((req, res) => {

    // Edit the User with ID
    const id = Number(req.params.id);  
    const user = users.find((user) => user.id === id)
    const body = req.body;

    for(let key in body){
        user[key] = body[key];
    }

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        if(err) {
            console.log("Error Updating file", err);
        }

        return res.json({ id: users.length , status: 'Update Success...' })

    })

}).delete((req, res) => {

    // Delete the User with ID
    const id = Number(req.params.id);
    
    //const user = users.find((user) => user.id === id);  // Find user object
    //const index = users.indexOf(user); // Find array position of that user
    //users.splice(index, 1); // Remove 1 element at that position

    // Alternative way to delete user

    // Check if user exists
    const userExisting = users.some(user => user.id === id);
    if(!userExisting){
        return res.status(404).json({ status: `No user found with the id of ${id}` });
    }

    users = users.filter(user => user.id !== id); // Create new array without the user

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        if(err) {
            console.log("Error Deleting file", err);
        }

        return res.json({ id: users.length + 1 ,status: 'Delete Success...' })
    })

})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})










