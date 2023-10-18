const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  internshipImage: { type: String , required:true }, 
  internshipDomain: { type: String, required: true }, 
  internshipTitle: { type: String, required: true }, 
  internshipDetails: { type: String, required: true },
  internshipLink: { type: String, required: true }, 
});


const Internship = mongoose.model('Internship', internshipSchema);

module.exports = Internship;
