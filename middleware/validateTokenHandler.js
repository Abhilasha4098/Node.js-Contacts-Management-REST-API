const asyncHandler = require('express-async-handler');

const jwt = require('jsonwebtoken'); // Import JWT for token verification

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1]; // Extract the token from the Authorization header
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error('Not authorized, token failed'); // If token verification fails, throw an error
            }
        
            // Call the next middleware or route handler
            req.user = decoded.user; // Attach the decoded user information to the request object
            next();
            
        });
        if (!token) {
            res.status(401);
            throw new Error('Not authorized, no token'); // If no token is provided, throw an error
        }
    }
});
module.exports = validateToken; // Export the validateTokenHandler function for use in other files