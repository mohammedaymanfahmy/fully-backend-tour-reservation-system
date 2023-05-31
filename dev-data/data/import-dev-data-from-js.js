const fs = require('fs');

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: `./../../config.env` });

// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successfuly from script '));

// read file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);
const importdata = async () => {
  try {
    await Tour.create(tours);
    console.log('data Loaded');
    process.exit();
  } catch (e) {
    console.log(e);
  }
};

//Delete All data
const deleteData = async () => {
  try {
    await Tour.deleteMany(); // like native mongoDB (mongose have functions have the same name)
    console.log('data Deleted ');
    process.exit();
  } catch (e) {
    console.log(e);
  }
};
// console.log(process.argv);

if (process.argv[2] === '--import') {
  importdata();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
