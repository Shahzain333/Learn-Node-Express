const User = require('../models/user')

const handleGetAllUser = async (req,res) => {
    const allDbUsers = await User.find({})
    return res.json(allDbUsers)
} 

async function handleGetUserById(req, res) {
    const user = await User.findById(req.params.id)
    if(!user){
        return res.status(404).json({ status: `No user found with the id of ${id}` });
    }
    return res.json(user)
}

async function handleCreateNewUser(req, res) {
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
    return res.status(201).json({ id: result._id ,msg: 'User Created Successfully'})
}

async function handleUpdateUserById(req, res) {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });   
    if(!user){
        return res.status(404).json({ status: `No user found with the id of ${id}` });
    }
    return res.status(201).json({ msg: 'User Updated Successfully' })
}

async function handleDeleteUserById(req, res) {
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user){
        return res.status(404).json({ status: `No user found with the id of ${id}` });
    }
    return res.json({status: 'Delete User Successfully...' })
}


module.exports = {    
    handleGetAllUser,
    handleGetUserById,
    handleCreateNewUser,
    handleUpdateUserById,
    handleDeleteUserById
}