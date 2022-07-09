const mongoose = require('mongoose');

const connectDB = uri => {
  console.log('~ connectDB');

  return mongoose
    .connect(uri)
    .then(() => {
      console.log(`Connected to MongoDB at ${uri}`);
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = connectDB;
