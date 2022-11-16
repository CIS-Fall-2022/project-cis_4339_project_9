const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('uuid');

let participationSchema = new Schema({
    //demonstrating on how to use uuid to generate _id  
    _id: {
      type: String,
      default: uuid.v1
    },
    participants: {
      type: Number
    },
    monthName: {
      type: String,
    }
  }, {
    collection: 'participation'
});

module.exports = mongoose.model('ParticipationModel', participationSchema)
