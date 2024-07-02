const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

/* Start: Middleware */
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Hello from the custom middleware 👋');
  }
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

/* End Middleware */

/* Start: Routes */

// app.get("/api/v1/tours", getAllTours);
// app.get("/api/v1/tours/:id", getTour);
// app.post("/api/v1/tours", createTour);
// app.patch("/api/v1/tours/:id", updateTour);
// app.delete("/api/v1/tours/:id", deteleTour);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

/* End: Routes */

/* Server */
module.exports = app;
