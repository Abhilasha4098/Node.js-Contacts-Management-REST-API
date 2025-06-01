const mongoose = require('mongoose');

const contactSchema =  mongoose.Schema //mongoose object is used to define the schema for the contact model
({ 
    user_id: {
        type: mongoose.Schema.Types.ObjectId, // This is a reference to the User model
        required: true, // This field is required
        ref: 'User' // This indicates that this field references the User model
    },
    name : {
        type: String,
        required: [true, 'Please add the contact name'],
    },
    email: {
        type: String,
        required: [true, 'Please add the contact email'],
    },
    phoneNo: {
        type: String,
        required: [true, 'Please add the contact phone number'],
    },
},{
    timestamps: true // This will automatically add createdAt and updatedAt fields
});
module.exports= mongoose.model('Contact', contactSchema); // Export the Contact model
// contact is the name is this schema, it will be used to create a collection in the database


