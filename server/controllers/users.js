import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import user from '../models/user.js';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const currentUser = await user.findOne({ email });

    if (!currentUser) return res.status(404).json({ message: 'No such user' });

    const isPasswordCorrect = await bcrypt.compare(password, currentUser.password);

    if(!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

    /* `const token = jwt.sign({ email: currentUser.email, id: currentUser._id }, 'test');` is
    generating a JSON Web Token (JWT) using the `jsonwebtoken` library. The token is signed with a
    secret key `'test'` and contains the user's email and id as payload. This token can be used for
    authentication and authorization purposes. */
    // const token = jwt.sign({ email: currentUser.email, id: currentUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ result: currentUser });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
}

export const signup = async (req, res) => {
  const { username, email, password, imgProfile } = req.body;

  try {
    const currentUser = await user.findOne({ email });

    if(currentUser) return res.status(400).json({ message: 'User already exists' });

    /* `const hashedPassword = await bcrypt.hash(password, 12);` is using the `bcryptjs` library to
    hash the user's password with a salt of 12 rounds. The hashed password is then stored in the
    database for security purposes. The salt rounds determine the complexity of the hash and can be
    adjusted to increase or decrease the security level. */
    const hashedPassword = await bcrypt.hash(password, 12);

    /* `const result = await user.create({ email, password: hashedPassword, name: `
    ` });` is creating a new user in the database using the `create` method of the `user`
    model. The user's email, hashed password, and full name (concatenated from the `firstname` and
    `lastname` variables) are passed as an object to the `create` method. The `await` keyword is
    used to wait for the database operation to complete before assigning the result to the `result`
    variable. */
    const result = await user.create({ email, password: hashedPassword, username, imgProfile });

    // const token = jwt.sign({ email: result.email, id: result._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
}

export const getUsers = async (req, res) => {
  try {
    const users = await user.find();

    res.status(200).json({ data: users });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}