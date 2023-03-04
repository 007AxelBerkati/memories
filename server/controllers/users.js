/* Importing necessary modules */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/users.js';

/* Secret word used as salt to hash the password and generate token*/
const secret = 'test';

/* function for signin a user with email and password */
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    /* finding user with the provided email in DB */
    const oldUser = await UserModel.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    /* verifying the password by matching with hashed password in DB */
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    /* return error for invalid credentials */
    if (!isPasswordCorrect)
      return res.status(400).json({ message: 'Invalid credentials' });

    /* create a token with 1 hour of expiration time using the user email and _id */
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: '1h',
    });

    /* return the user details and credentials(token)*/
    res.status(200).json({ dataLogin: oldUser, credential: token });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

/* function for signup/register a user with required fields */
export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    /* checking if user already exists with the given email */
    const oldUser = await UserModel.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: 'User already exists' });

    /* hashing the password before saving it to DB*/
    const hashedPassword = await bcrypt.hash(password, 12);

    /* creating a new user with email, hashed password and name */
    const result = await UserModel.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    /* create a token with 1 hour of expiration time using the user email and _id */
    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: '1h',
    });

    /* return the newly created user details and credentials(token)*/
    res.status(201).json({ dataLogin: result, credential: token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });

    console.log(error);
  }
};
