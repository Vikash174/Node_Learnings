import express from 'express';

import {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour
} from '../controllers/tourController.js';

export const tourRouter = express.Router();

tourRouter.param('id', (req, res, next, val) => {
  console.log(`Tour id is : ${val}`);
  next();
});

tourRouter.route('/').get(getAllTours).post(createTour);

tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);
