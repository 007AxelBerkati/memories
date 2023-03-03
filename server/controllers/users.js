// This function handles the sign-in logic
import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/users.js';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user with this email exists in the database
    const existingUser = await User.FindOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." });

    // Compare entered password with the hashed password stored in the database
    const isPasswordCorrect = await bycrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: 'Invalid Credentials.' });

    // Generate an authentication token for the user
    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
      },
      'test', // Secret key used to sign/verify the token
      {
        expiresIn: '1h', // Token expiration time
      }
    );

    // Send a response when successful authentication
    res.status(200).json({ dataLogin: existingUser, credential: token });
  } catch (error) {
    // Send a response when there's an error during authentication
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

// This function handles the sign-up logic
export const signup = async (req, res) => {
  const { email, password, firstName, lastName, confirmPassword } = req.body;

  try {
    // Check if user with this email already exists
    const existingUser = await User.FindOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'User Already Exist.' });

    // Check if passwords match
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match." });

    // Hash password before storing it in the database
    const hashedPassword = await bycrypt.hash(password, 12);

    // Create new user in the database
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    // Generate an authentication token for the user
    const token = jwt.sign(
      {
        email: result.email,
        id: result._id,
      },
      'test', // Secret key used to sign/verify the token
      {
        expiresIn: '1h', // Token expiration time
      }
    );

    // Send a response when successful sign up
    res.status(200).json({ dataLogin: result, credential: token });
  } catch (error) {
    // Send a response when there's an error during the sign-up process
    res.status(500).json({ message: 'Something went wrong.' });
  }
};
