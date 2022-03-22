const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');

// ? @desc    Fetch all products
// ? @route   Get /api/products
// ? @access  Public

router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    throw error;
  }
});

// ? @desc    Fetch one product
// ? @route   Get /api/products/:id
// ? @access  Public

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    throw error;
  }
});

module.exports = router;
