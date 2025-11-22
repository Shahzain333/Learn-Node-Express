const express = require('express')
const fs = require('fs')
const mongoose = require('mongoose')

const app = express()
const PORT = 3000

// Connection Mongoose to MongoDB
mongoose
    .connect('mongodb://127.0.0.1:27017/youtube-app-1')
    .then(() => {
        console.log("Connected to MongoDB Successfully...");
    })
    .catch((err) => {
        console.log("Error in the Connection MongoDB : ", err)
    })

// MAke Schema for Mongoose
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
    },
    jobTitle: {
        type: String,
    }
}, {
    timestamps: true
})

// Create Model
const User = mongoose.model("User", userSchema)

// Middleware to parse JSON bodies - Plugin
app.use(express.urlencoded({ extended: false })); // For parsing application/x-www-form-urlencoded

// Custom Middleware to log request info
app.use((req, res, next) => {
    fs.appendFile('log.txt', `\n${Date.now()} - ${req.ip} -${req.method} - ${req.path}\n`, (err,data) => {
        if(err) {
            console.log("Error logging request", err);
        }
        next();
    }); 
})

app.use((req, res, next) => {
    next();
})

// ----------------- Routes here -----------------

// This Return all users in the Html format
app.get('/users', async (req,res) => {

    const allDbUsers = await User.find({})
    //return res.json(users)
    const html = `
        <ul>
            ${allDbUsers
                .map(user => `<li>${user.firstName} - ${user.email}</li>`)
                .join('')}
        </ul>
    `
    res.send(html)
})

// --------------- REST API Endpoint to return all users in JSON format -------------

app.get('/api/users', async (req,res) => {
    
    const allDbUsers = await User.find({})

    return res.json(allDbUsers)
})

app.post('/api/users', async (req, res) => {
    
    const body = req.body;

    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.Job_title) {
        return  res.status(400).json({ status: 'Failed', message: `All Fields are required fields` });
    }

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.Job_title 
    })

    //console.log("User Created Successfully...", result);

    return res.status(201).json({ msg: 'User Created Successfully'})

})

app.route('/api/users/:id')
    .get(async (req,res) => {

        const user = await User.findById(req.params.id)
        
        if(!user){
            return res.status(404).json({ status: `No user found with the id of ${id}` });
        }
        
        return res.json(user)

    })
    .patch(async (req, res) => {

        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        if(!user){
            return res.status(404).json({ status: `No user found with the id of ${id}` });
        }

        return res.status(201).json({ msg: 'User Updated Successfully' })

    })
    .delete(async (req, res) => {

        const user = await User.findByIdAndDelete(req.params.id);

        if(!user){
            return res.status(404).json({ status: `No user found with the id of ${id}` });
        }

        return res.json({status: 'Delete User Successfully...' })

    })

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})










