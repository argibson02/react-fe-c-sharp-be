const { Schema, model } = require('mongoose');

const formSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  occupation: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
});

const Form = model('form', formSchema);

module.exports = Form;
