const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('uuid');

let enrollmentSchema = new Schema({
    //demonstrating on how to use uuid to generate _id  
    _id: {
      type: String,
      default: uuid.v1
    },
    enrollment: {
      type: Number
    },
    courseNumber: {
      type: String,
    }
  }, {
    collection: 'enrollment'
});

module.exports = mongoose.model('EnrollmentModel', enrollmentSchema)
