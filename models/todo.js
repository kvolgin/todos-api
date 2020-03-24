const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  todo : {
    type : String,
    required : true,
    trim: true,
    minLength: 3,
    maxLength: 255,
  },
  user : {
    type : String,
    required : true
  },
  date: {
      type: Date,
      required : true
  },
  done:{
      type: Boolean,
      required : true
  }
});

const TodoModel = mongoose.model('todo', TodoSchema);
  
module.exports = TodoModel;