const mongoose = require('mongoose');
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true, // remove all white Space
  },
  duration: {
    type: Number,
    required: [true, 'tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'a tour must have a group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'a tour must have a difficulty'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  priceDiscount: Number,
  price: { type: Number, required: [true, 'A tour must have a price'] },
  summary: {
    type: String,
    trim: true, // remove all white Space
    required: true,
  },
  discription: {
    type: String,
    trim: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a img cover'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false, // to hide it in selection
  },
  startDates: [Date],
});

// as naming convention you must use model names and variables starts with capetal letter
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
