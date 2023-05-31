const express = require('express');
const morgan = require('morgan');
const app = express();
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
//use middeleware
app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('hello from the middelware');
  next();
});

app.use((req, res, next) => {
  res.scure = 'from middeleware two im scure ';
  next();
});

//Routes middeleware
app.use('/api/v1/tours', tourRouter); //toure router middleware
app.use('/api/v1/users', userRouter); //user router middleware

module.exports = app;
