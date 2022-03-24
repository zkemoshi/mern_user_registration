const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const emailKey = process.env.SENDGRID_API_KEY;
const sgMail = require('@sendgrid/mail');

// @desc    Register a new User
// @route   POST  /api/v1/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password || !phone) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // Check if user exists..
  const userExists = await User.findOne({ $or: [{ email }, { phone }] });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists.');
  }

  // count Document
  const count = await User.countDocuments();
  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(password, salt);

  // create User
  const user = await User.create({
    name,
    email,
    password: hashpassword,
    phone,
    groupId: 1000 + count,
  });

  // check if user created
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      groupId: user.groupId,
      token: generateToken(user._id),
    });
  }
});

// @desc    Authenticate User
// @route   POST  /api/v1/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      groupId: user.groupId,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid Credentials');
  }
});

// @desc    Get user data
// @route   GET  /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// @desc    Send forgote password Email
// @route   PUT  /api/v1/users/forgot-password
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error('Email does not exist');
  }

  // Generate token and Send Email using sendgrid
  const resetLink = jwt.sign({ _id: user._id }, process.env.JWT_RESET_SECRET, {
    expiresIn: '20m',
  });
  const msg = {
    to: [`${email}`],
    from: 'sales@lodge.co.tz',
    subject: `Password Reset Link`,
    html: `
      <p>Please click on the given link to reset your password </p>
      
      <p>
        <a href='${process.env.CLIENT_URL}/reset-password?resetLink=${resetLink}'>Click To Reset Password</a>
      </p>
    `,
  };
  sgMail.setApiKey(emailKey);

  const updatedUser = await user.updateOne({ resetLink });
  if (!updatedUser) {
    res.status(400);
    throw new Error('reset password link error');
  } else {
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent');
      })
      .catch((error) => {
        console.error(error);
      });
    return res.json({
      message: `Email sent to ${email} `,
    });
  }
});

// @desc    Reset new Password
// @route   GET  /api/users/reset-password
// @access  Private
const resetPassword = asyncHandler(async (req, res) => {
  const { resetLink, newPassword } = req.body;

  if (resetLink) {
    const decode = jwt.verify(resetLink, process.env.JWT_RESET_SECRET);
    console.log(decode);

    if (!decode) {
      res.status(401);
      throw new Error('Incorrect token or it is expired');
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(newPassword, salt);

    const user = await User.findOne({ resetLink });
    if (!user) {
      res.status(401);
      throw new Error('User with this resetLink does not exist');
    }

    // update the user password
    const updatedUser = await user.updateOne({
      resetLink: '',
      password: hashpassword,
    });
    if (!updatedUser) {
      res.status(401);
      throw new Error('Reset password Error');
    }

    res.status(200).json({ message: 'Your passsword has been Changed' });
  } else {
    res.status(401);
    throw new Error('No Reset Link');
  }
});

// Generate JWT for User Authentication
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

module.exports = {
  registerUser,
  getMe,
  loginUser,
  forgotPassword,
  resetPassword,
};
