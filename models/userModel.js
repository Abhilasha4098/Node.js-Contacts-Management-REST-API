const mongoose = require('mongoose');



const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please add a username'],
    }, 
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: [true,"Email address already taken"] // Ensure email is unique
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
    },
 },{
    timestamps: true // This will automatically add createdAt and updatedAt fields   
    });

    module.exports = mongoose.model('User', userSchema); // Export the User model
// 'User' is the name of this schema, it will be used to create a collection in the database