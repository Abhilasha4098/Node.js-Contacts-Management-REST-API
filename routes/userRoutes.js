const express = require('express');
const { registerUser, currentUser,loginUser } = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler');


const router = express.Router();

router.post('/register',registerUser); 

router.post('/login', loginUser);


router.get('/current',validateToken, currentUser); // This route is for getting the current user info, typically protected by authentication middleware);

module.exports = router;