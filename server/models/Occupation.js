const { Schema, model } = require('mongoose');

const occupationSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Occupation = model('occupation', occupationSchema);

module.exports = Occupation;
