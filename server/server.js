const express = require('express');
const dotenv = require('dotenv');
const products = require('./data/products');
const colors = require('colors');

dotenv.config();
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.json(products);
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

db.once('open', () => {
  app.listen(
    PORT,
    console.log(
      `Server running in ${process.env.NODE_ENV} on port ${PORT}`.cyan.underline
        .bold
    )
  );
});
