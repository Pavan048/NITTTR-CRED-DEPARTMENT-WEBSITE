const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  contactName: {
    type: String,
    required: true,
  },
  contactMail: {
    type: String,
    required: true,
  },
  contactSubject: {
    type: String,
    required: true,
  },
  contactMessage: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
