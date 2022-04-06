const express = require('express');
const Product = require('../models/productModel');

// ? @desc    Fetch all products
// ? @route   Get /api/products
// ? @access  Public

const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
};

// ? @desc    Fetch one product
// ? @route   Get /api/products/:id
// ? @access  Public

const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};

module.exports = { getProducts, getProductById };
