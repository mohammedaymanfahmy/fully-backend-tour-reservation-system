const fs = require('fs');
const Tour = require('../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures');
const { log } = require('console');
//Route Handelers
// const tours = JSON.parse(
//   fs.readFileSync(`C:/Users/sd-mfahmy/Desktop/node/practical/ExpressD1/starter/dev-data/data/tours-simple.json`)
// );
/*
// no need to this middleware
// exports.checkBody = (req, res, next) => {
//   if (!req.body.price && req.body.name) {
//     return res.status(400).json({
//       message: 'bad req....',
//       status: 'fail',
//     });
//   }
//   next();
// };
// no need to this middleware
// exports.checkId = (req, res, next, value) => {
//   console.log(`this id is ${value}`);
//   if (1 * req.params.id > tours.length) {
//     return res.status(404).json({
//       message: 'invalid id',
//       status: 'fail',
//     });
//   }
//   next();
// };*/

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingAverage,summary,difficulty';
  next();
};
exports.getAllTours = async (req, res) => {
  try {
    /*
    //build Query
    // console.log(req.query);
    // 1)filtering
    // const queryObj = { ...req.query };
    // const excludedfield = ['page', 'sort', 'limit', 'fields'];
    // excludedfield.forEach((e) => delete queryObj[e]);

    // // 2) Advanced Filtering
    // let queryStr = JSON.stringify(queryObj);
    // //replace can take callback fun to
    // queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);
    // // console.log(JSON.parse(queryStr));
    // let query = Tour.find(JSON.parse(queryStr));
    //{diff:'easy' , duration:{$gte:5}}
    /*
    //filtering using native mongo
    // const tours1 = await Tour.find({
    //   duration: 45,
    //   difficulty: 'easy',
    // });

    // const tours2 = await Tour.find()
    //   .where('difficulty')
    //   .equals(45)
    //   .where('difficulty')
    //   .equals('easy');

    // in this case we have already the object from
    //query to pass to our find method so that we are going to use the first way
    // const tours = await Tour.find(queryObj); // git all tours filterd by query string
    // const tours = await Tour.find(); // get all tours

    //Execute the Query
    */
    /*
    // 3) Sorting
    // if (req.query.sort) {
    //   const sortBy = req.query.sort.split(',').join(' ');
    //   console.log(sortBy);
    //   query = query.sort(sortBy);
    //   //            sort(price rating)
    // } else {
    //   query = query.sort('-createdAt');
    // }

    // 4) Field limiting
    // if (req.query.fields) {
    //   const fields = req.query.fields.split(',').join(' ');
    //   query = query.select(fields);
    // } else {
    //   query = query.select('-__v'); //every thig except __v
    // }

    // 5) pagination
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 100;
    // const skip = (page - 1) * limit;
    // query = query.skip(skip).limit(limit);

    // if (req.query.page) {
    //   const numTours = await Tour.countDocuments();
    //   if (skip >= numTours) throw new Error('this page dose not exist');
    // }
    */

    // run Query
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .pagenate();
    const tours = await features.query;
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: { tours },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
  // OLD
  // res.status(200).json({
  //   status: 'success',
  //   results: tours.length,
  //   data: {
  //     tours,
  //   },
  // });
};
exports.getOneTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    //Tour.findOne({_id:req.params.id})
    res.status(200).json({
      tour,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
    });
  }
  //OLD
  // const id = req.params.id;
  // const tour = tours.find((e) => e.id === id);
  // res.status(200).json({
  //   tour,
  //   scure: res.scure,
  // });
};
exports.addNewTour = async (req, res) => {
  try {
    // const newTour = new Tour({});
    // newTour.save();
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
      message: err,
    });
  }
  // const newTour = await Tour.create({})
  // OLD
  // const newId = tours[tours.length - 1].id + 1;
  // const newTour = Object.assign({ id: newId }, req.body);
  // tours.push(newTour);
  // fs.writeFile(
  //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) =>
  //     res.status(201).json({
  //       status: 'success',
  //       data: { tours: newTour },
  //     })
  // );
  // console.log(req.body);
  // res.send("DONE");
};
exports.updateTour = async (req, res) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  try {
    res.status(200).json({
      status: 'success',
      data: {
        tour, //this tour from the upper findByIdAndUpdate query
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    // postman dont show any thig in res bec of status code 204
    res.status(204).json({
      status: 'success  delete',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
// agregation pipline
exports.getTourState = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          // _id: null, //no groups //every thing in one big group
          _id: { $toUpper: '$ratingsAverage' }, //group by difficulty
          // _id: { $toUpper: '$difficulty' }, //group by difficulty
          numTours: { $sum: 1 },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $sort: { avgPrice: 1 },
      },
      // {
      //   $match: {
      //     _id: { ne: 'EASY' }, / /ne === not equal
      //   },
      // },
    ]);
    res.status(200).json({
      status: 'success',
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1;
    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' },
        },
      },
      {
        $addFields: { month: '$_id' },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: { numTourStarts: -1 },
      },
      {
        $limit: 12,
      },
    ]);
    console.log('plan');
    res.status(200).json({
      status: 'success',
      data: {
        plan,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
