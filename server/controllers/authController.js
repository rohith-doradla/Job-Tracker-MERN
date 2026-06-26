import User from '../models/User.js';

import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

async function register(req, res) {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: 'All fields are mandatory' });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await User.insertOne({
      firstName,
      lastName,
      email,
      password: hashed,
    });

    const payload = { userId: newUser._id.toString(), email: newUser.email };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    return res.json({ user: payload, token });
  } catch (e) {
    console.log('Register Error', e);

    return res.status(500).json({ error: 'Register Failed' });
  }
}

// POST
// /api/auth/login

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid Credentials' });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid Credentials' });
    }

    const payload = { userId: user._id.toString(), email: user.email };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    return res.json({ user: payload, token });
  } catch (e) {
    console.log('Login error', e);
    return res.status(500).json({ error: 'Login failed' });
  }
}

// GET
// /api/auth/session

function session(req, res) {
  const session = req.session;
  return res.json({ user: session });
}

// POST
// /api/auth/change-password
async function changePassword(req, res) {
  try {
    const session = req.session;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Both passwords are required' });
    }

    const user = await User.findById(session.userId);

    if (!user) return res.status(404).json({ error: 'User not found' });

    const isValid = await bcrypt.compare(currentPassword, user.password);

    if (!isValid)
      return res.status(400).json({ error: 'Current password is incorrect' });

    const hashed = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(session.userId, { password: hashed });

    return res.json({ success: true });
  } catch (e) {
    return res.status(500).json({ error: 'Failed to change password' });
  }
}

export { register, login, session, changePassword };
