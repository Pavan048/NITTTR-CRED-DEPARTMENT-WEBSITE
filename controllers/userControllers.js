require("dotenv").config();
const nodemailer = require('nodemailer');
const Scroller = require("../model/scrollModel");
const Events = require("../model/eventsModel");
const Internship = require("../model/internshipModel");
const Updates = require("../model/updateModel");
const Contact = require("../model/contactModel");


// Home EJS handler
const getHome = async (req, res) => {
  try {
    const eventsData = await Events.find({});
    const scrollerData = await Scroller.find({});
    const internshipData = await Internship.find({});
    const updatesData= await Updates.find({});
    res.render('home', { events: eventsData, scroller: scrollerData, internship: internshipData , updates: updatesData});
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).render('error', { errorMessage: 'Sorry, an error occurred while fetching data.' });
  }
};
// About Us EJS handler
const getAboutUs = (req, res) => {
  res.render("aboutus");
};

// Timeline EJS handler
const getTimeline = (req, res) => {
  res.render("timeline");
};

// Past HOD EJS handler
const getPastHod = (req, res) => {
  res.render("pasthod");
};

// HOD Message EJS handler
const getHodMessage = (req, res) => {
  res.render("hodmessage");
};

// Faculty Directory EJS handler
const getFacultyDirectory = (req, res) => {
  res.redirect('/#profile_cards');
};

// Staff Directory EJS handler
const getStaffDirectory = (req, res) => {
  res.render("staffdirectory");
};

// Research Themes EJS handler
const getResearchThemes = (req, res) => {
  res.render("researchthemes");
};

// Research Centre EJS handler
const getResearchCentre = (req, res) => {
  res.render("researchcentre");
};

// Programmes EJS handler
const getProgrammes = (req, res) => {
  res.render("programmes");
};

// Skill Development EJS handler
const getSkillDevelopment = (req, res) => {
  res.render("skilldevelopment");
};

// Skill Development About EJS handler
const getSkillDevAbout = (req, res) => {
  res.render("skilldevabout");
};

// Skill Development Training EJS handler
const getSkillDevTraining = (req, res) => {
  res.render("SkillDT");
};

// Skill IIAB Section 8 EJS handler
const getIIABSection8 = (req, res) => {
  res.render("Skilliiab8");
};

// News EJS handler
const getNews = (req, res) => {
  res.redirect("/#nav_news");
};

// Events EJS handler
const getEvents = (req, res) => {
  res.redirect("/#events");
};

// Internships EJS handler
const getInternships = (req, res) => {
  res.render("interships");
};

// Project Positions EJS handler
const getProjectPositions = (req, res) => {
  res.render("projectpositions");
};

// cdtp EJS handler

const getCdtp = (req, res) => {
  res.render("cdtp");
};
// tnrtp EJS handler
const getTnrtp= (req, res) => {
  res.render("tnrtp");
};

// top EJS handler
const getTop = (req, res) => {
  res.render("top");
};
// pwd EJS handler
const getPwd = (req, res) => {
  res.render("pwd");
};
// uba EJS handler
const getUba = (req, res) => {
  res.render("uba");
};
// tot EJS handler
const getTot = (req, res) => {
  res.render("tot");
};



// Gallery EJS handler
const getGallery = (req, res) => {
  res.render("gallery");
};
// ------------------------------>
const getCampusg = (req, res) => {
  res.render("Campusg");
};
const getDeptg= (req, res) => {
  res.render("Deptg");
};
const getEventsg = (req, res) => {
  res.render("Eventsg");
};
const getProjectg = (req, res) => {
  res.render("Projectg");
};

// ------------------------------>
// Contact Us EJS handler
const getContactUs = (req, res) => {
  res.render("contact");
};
const contactUs = async (req, res) => {
  try {
    const { contactName, contactMail, contactSubject, contactMessage } = req.body;

    // Send email using Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sajjaraopavankrishna09@gmail.com',
        pass: process.env.PASS,
      }
    });

    const mailOptions = {
      from: 'sajjaraopavankrishna09@gmail.com',
      to:  [contactMail, 'crednitttr@gmail.com'],
      cc: 'sajjaraopavankrishna09@gmail.com',
      subject: 'Thanks for giving feedback ' + contactName,
      text: 'Thanks for your message You have sent to us -->\n' + contactMessage
    };

    const emailInfo = await transporter.sendMail(mailOptions);
    console.log('Email sent:', emailInfo.response);

    // Save data to the database using Mongoose
    const newContact = new Contact({
      contactName,
      contactMail,
      contactSubject,
      contactMessage,
    });

    await newContact.save();
    console.log("dataPostedSucessfully");

    // Success! Redirect or send a response as needed
    res.redirect('/');
  } catch (err) {
    // Handle errors for both email sending and database saving
    console.error('Error:', err);
    res.status(500).send('An error occurred while processing the contact form data');
  }
};



// Add more handlers for other routes here (if needed)

module.exports = {
  getHome,
  getAboutUs,
  getTimeline,
  getPastHod,
  getHodMessage,
  getFacultyDirectory,
  getStaffDirectory,
  getResearchThemes,
  getResearchCentre,
  getProgrammes,
  getSkillDevelopment,
  getSkillDevAbout,
  getSkillDevTraining,
  getIIABSection8,
  getNews,
  getEvents,
  getInternships,
  getProjectPositions,
  getGallery,
  getContactUs,
  getCdtp,
  getTnrtp,
  getTop,
  getPwd,
  getUba,
  getTot,
  getCampusg,
  getDeptg,
  getEventsg,
  getProjectg,
  contactUs
  
  // Add other exported handlers here (if needed)
};
