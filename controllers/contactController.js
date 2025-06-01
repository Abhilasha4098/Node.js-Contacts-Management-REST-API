const asyncHandler = require('express-async-handler');

const Contact = require('../models/contactModel'); // Import the Contact model  


//@desc get all contacts
// @route GET /api/contacts
// @access Private
const getContacts = asyncHandler( async(req, res) => {
  const contacts = await Contact.find({user_id :req.user.id}); // Fetch all contacts from the database 
  res.status(200).json({ contacts });})

//@desc create new contacts
// @route POST /api/contacts
// @access Private
const createContacts = asyncHandler( async (req, res) => {
    console.log("the request body is:",req.body);
    const { name, email, phoneNo } = req.body;
    if (!name || !email || !phoneNo) {
         res.status(400);
            throw new Error('Please add all fields'); // This will be caught by the error handler middleware
    }
    const contact = await Contact.create({
        name,
        email,
        phoneNo,
        user_id: req.user.id // Associate the contact with the logged-in user
    });
  res.status(201).json( contact );})


//@desc get contact by ID
// @route POST /api/contacts/:id
// @access Private
const getContact= asyncHandler( async(req, res) => {
  const contact = await Contact.findById(req.params.id); // Fetch contact by ID from the database
  if (!contact) {
    res.status(404);
    throw new Error('Contact not found'); // If contact is not found, throw an error
  }
  res.status(200).json({ contact });})

//@desc update contact by ID
// @route PUT /api/contacts/:id
// @access Private
const updateContact=asyncHandler( async(req, res) => {

  const contact = await Contact.findById(req.params.id); // Fetch contact by ID from the database
  if (!contact) {
    res.status(404);
    throw new Error('Contact not found'); // If contact is not found, throw an error
  }
  if(contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error('User not authorized to update this contact'); // If the user is not authorized, throw an error
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true } // This option returns the updated document
  );
  res.status(200).json({updatedContact });})

//@desc delete contact by ID
// @route DELETE /api/contacts/:id
// @access Private
const deleteContact=asyncHandler( async (req, res) => {
  const contact = await Contact.findById(req.params.id); // Fetch contact by ID from the database
  if (!contact) {
    res.status(404);
    throw new Error('Contact not found'); // If contact is not found, throw an error
  }
    if(contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error('User not authorized to delete this contact'); // If the user is not authorized, throw an error
  }
await Contact.findByIdAndDelete(req.params.id); // Delete the contact by ID
//await Contact.deleteOne(_id: req.params.id); // Alternative way to delete the contact by ID
//await Contact.remove(); //delete the whole contacts

  res.status(200).json({ contact });})


  module.exports = {
    getContacts,
    createContacts,
    getContact,
    updateContact,
    deleteContact
    // add other controller functions here as needed
  };