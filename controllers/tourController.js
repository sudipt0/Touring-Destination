// const fs = require('fs');

const Tour = require('../models/tourModel');
const APIFeature = require('../utils/apiFeatures');

/* const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
); */

/* Middleware export */
/* exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);

  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
}; */

/* exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
}; */
/* Middleware export */

exports.getAllTours = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeature(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const tours = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours: tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
exports.getTour = async (req, res) => {
  try {
    // const tour = await Tour.findById(req.params.id);
    const features = new APIFeature(
      Tour.findById(req.params.id),
      req.query,
    ).limitFields();
    const tour = await features.query;

    if (!tour) {
      return res.status(404).json({
        status: 'fail',
        message: 'Invalid ID',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        tour: tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
  /* res.status(200).json({
    status: 'success',
    data: {
      tour: tour,
    },
  }); */
};
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
  /* const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign(req.body, { id: newId });

  tours.push(newTour); */
  /* fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    () => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    },
  ); */
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!tour) {
      return res.status(404).json({
        status: 'fail',
        message: 'Invalid ID',
      });
    }
    res.status(202).json({
      status: 'success',
      data: {
        tour: tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
  /* const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  const newTour = Object.assign(tour, req.body);
  tours.push(newTour);

  res.status(202).json({
    status: 'success',
    data: {
      tour: req.body,
    },
  }); */
};

exports.deteleTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    if (!tour) {
      return res.status(404).json({
        status: 'fail',
        message: 'Invalid ID',
      });
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
  /* const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  const index = tours.indexOf(tour);
  tours.splice(index, 1);

  res.status(204).json({
    status: 'success',
    data: null,
  }); */
};
