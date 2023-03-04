// Import library jwt
import jwt from 'jsonwebtoken';

// Define the token secret
const secret = 'test';

// Create auth middleware function that decode and verify token for each API access
const auth = async (req, res, next) => {
  try {
    // Extract token from request headers
    const token = req.headers.authorization.split(' ')[1];

    // Check if token is in the format of custom authentication or not
    const isCustomAuth = token.length < 500;

    let decodedData;

    // Verify token with the secret key
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }

    // Call next() to go to the next middleware / route handler
    next();
  } catch (error) {
    console.log(error); // Log error message if the token is invalid
  }
};

// Export auth middleware function for other code files to use
export default auth;
