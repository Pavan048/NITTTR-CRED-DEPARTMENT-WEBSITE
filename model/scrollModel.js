const mongoose = require('mongoose');

const scrollerSchema = new mongoose.Schema({
  scrollerText: {
    type: String,
    required: true,
  },
  scrollerLink: {
    type: String,
    required: true,
  },
});

const Scroller = mongoose.model('Scroller', scrollerSchema);

module.exports = Scroller;
