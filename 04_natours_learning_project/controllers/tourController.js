import fs from 'fs';

let tours = JSON.parse(
  fs.readFileSync('dev-data/data/tours-simple.json', 'utf-8')
);

export const checkID = (req, res, next, val) => {
  const id = parseInt(req.params.id);
  const tour = tours.find((tour) => tour.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'failed',
      message: 'Could not find the tour by this id'
    });
  }

  next();
};

export const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    reqTime: req.requestTime,
    results: tours.length,
    data: {
      tours
    }
  });
};

export const getTour = (req, res) => {
  const id = parseInt(req.params.id);
  const tour = tours.find((tour) => tour.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
};

export const createTour = (req, res) => {
  const newId = tours.length;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        tour: newTour
      });
    }
  );
};

export const updateTour = (req, res) => {
  const id = parseInt(req.params.id);
  const updateTour = req.body;

  tours = tours.filter((tour) => tour.id !== id);
  tours.push(updateTour);
  fs.writeFile(
    `dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(200).json({
        status: 'success',
        tour: updateTour
      });
    }
  );
};

export const deleteTour = (req, res) => {
  const id = parseInt(req.params.id);

  tours = tours.filter((tour) => tour.id !== id);

  fs.writeFile(
    `dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(204).json({
        status: 'success',
        data: null
      });
    }
  );
};
