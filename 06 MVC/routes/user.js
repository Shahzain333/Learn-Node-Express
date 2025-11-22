const express = require('express');
const { 
    handleGetAllUser, 
    handleGetUserById, 
    handleCreateNewUser,
    handleUpdateUserById, 
    handleDeleteUserById, 
} = require('../controllers/user');

const router = express.Router();

// router.get('/',handleGetAllUser)

// router.post('/',handleCreateNewUser)

// Gouped Routes
router
    .route('/')
    .get(handleGetAllUser)
    .post(handleCreateNewUser)

router
    .route('/:id')
    .get(handleGetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById)


module.exports = router;



