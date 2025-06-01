const express = require('express');
const router = express.Router();
const { getContacts,createContacts,getContact,deleteContact,updateContact} = require('../controllers/contactController');
const validateToken = require('../middleware/validateTokenHandler');


router.use(validateToken);// Apply the validateToken middleware to all routes in this router
// This will ensure that all routes in this router require a valid token before proceeding

router.route("/").get(getContacts);
//router.route("/").get(getContacts).post(createContacts);   can be used to combine get and post in one line

router.route("/").post(createContacts);


router.route("/:id").get(getContact);

router.route("/:id").put(updateContact);

router.route("/:id").delete(deleteContact);


module.exports = router;