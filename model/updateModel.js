const mongoose = require('mongoose');

const updatesSchema = new mongoose.Schema({
  updatesImage: {
    type: String,
    required: true,
  },
  updatesSpeakerName: {
    type: String,
    required: true,
  },
  updatesIn: {
    type: String,
    required: true,
  },
  updatesTitle: {
    type: String,
    required: true,
  },
  updatesDetails: {
    type: String,
    required: true,
  },
  updatesLink: {
    type: String,
    required: true,
  },
  updatesDate : {
    type: String,
    required:true,
  },
  updatesMonth : {
    type: String,
    required:true,
  },
});

const Updates = mongoose.model('Updates', updatesSchema);

module.exports = Updates;
