const express = require('express');
const generateToken = require('../utils/generateToken');
const User = require('../models/userModel');

// ? @desc    Auth user & get a token
// ? @route   Post /api/users/login
// ? @access  Public

const authUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    res.send({ message: 'Invalid Email or Password' });
  }
};

module.exports = authUser;
