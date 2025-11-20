const http = require('http');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    return res.send('Hello from Express Home Page - GET!');
})

app.get('/about', (req, res) => {
    // return res.send("Hello from Express About Page - GET!" + "Hey" + req.query.name 
    //     + "Your Age is :" + req.query.age);
    return res.send(`Hello from Express About Page - GET! Hey ${req.query.name}`);
})

// app.post('/signup', (req, res) => {
//     return 
// })

app.listen(3000,() => {
    console.log('Server is running on port 3000');
});

// const myServer = http.createServer(app);

// myServer.listen(3000, () => console.log('Server is running on port 3000'));









