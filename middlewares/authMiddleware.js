/**
* File Name: authMiddleware.js
*/
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const MSG = require('../utils/MSG');
const ResponseHelper = require('../utils/responseHelper');
const config = require('../config/config');

const authMiddleware = async (req, res, next) => {
 try {
   // Get the JWT token from the request headers
   const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

   if (token) {
     // Verify the JWT token
     jwt.verify(token, config.jwtSecret, async (err, decodedToken) => {
       if (err) {
         // If token is invalid, return unauthorized error
         return res.status(401).json(ResponseHelper.error(401, MSG.UNAUTHORIZED));
       } else {
         // Token is valid, extract user email from decoded token
         const userEmail = decodedToken.email;

         // Find the user by email
         const user = await User.findOne({ email: userEmail });

         if (!user) {
           // If user not found, return unauthorized error
           return res.status(401).json(ResponseHelper.error(401, MSG.UNAUTHORIZED));
         }

         // Attach the user data to the req.user property
         req.user = user;
         next();
       }
     });
   } else {
     // If token is not provided, return unauthorized error
     return res.status(401).json(ResponseHelper.error(401, MSG.UNAUTHORIZED));
   }
 } catch (error) {
   // Handle errors
   return next(error);
 }
};

module.exports = authMiddleware;
