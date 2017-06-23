const jwt = require('jsonwebtoken');

const Authenticate = {
  token: (req, res, next) => {
    // Get token in the request header
    const token = req.headers['access-token'];

    // If no token is provided
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    // If token is given
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        // If token is invalid
        if (error) {
          // Set status to unauthorized and return fail json
          return res.status(401).json({
            success: false,
            message: 'Failed to authenticate token'
          });
        }
        // Valid, save decoded object for possibly other routes to use
        req.decoded = decoded;
        req.user = req.user ? req.user : {};
        req.user.roles = [decoded.data.role];
        // console.log('-----DECODED---', decoded);
        // Execute route
        next();
      });
    }
  }
};

module.exports = Authenticate;
