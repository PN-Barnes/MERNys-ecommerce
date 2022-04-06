const express = require('express');
const dotenv = require('dotenv');
const errorMiddleware = require('./middleware/errorMiddleware');
const notFound = errorMiddleware.notFound;
const errorHandler = errorMiddleware.errorHandler;
const colors = require('colors');

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
const dbConnect = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);

app.use(errorHandler);

dbConnect();

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.cyan.underline
      .bold
  )
);
