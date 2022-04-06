const express = require('express');
const router = express.Router();
const productRoutes = require('../controllers/productController');
const getProducts = productRoutes.getProducts;
const getProductById = productRoutes.getProductById;

router.route('/').get(getProducts);

router.route('/:id').get(getProductById);

module.exports = router;
