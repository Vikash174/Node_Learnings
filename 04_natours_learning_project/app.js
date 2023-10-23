import express from 'express';
import morgan from 'morgan';

import { tourRouter } from './routes/tourRoute.js';
import { userRouter } from './routes/userRoute.js';

export const app = express();

/* Middlewares  */

app.use(express.json());

app.use(morgan('dev'));

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
