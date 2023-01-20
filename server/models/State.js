const { Schema, model } = require('mongoose');

const stateSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  abbreviation: {
    type: String,
    required: true,
    unique: true,
  },
});

const State = model('state', stateSchema);

module.exports = State;
