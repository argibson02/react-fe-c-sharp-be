const mongoose = require('mongoose');

let mongooseConnection = mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1/fetch-fe', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

module.exports = mongooseConnection;
