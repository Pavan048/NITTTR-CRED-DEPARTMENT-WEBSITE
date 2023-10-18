const bcrypt = require("bcrypt");
const Admin = require("../model/adminModel");
const Events = require("../model/eventsModel");
const jwt = require("jsonwebtoken");
const path = require('path');
const fs = require("fs");
const Scroller = require("../model/scrollModel");
const Internship = require("../model/internshipModel");
const Updates = require("../model/updateModel");
const Contact = require("../model/contactModel");


//------------------------------------------------Authentication-------------------------------------------------------------------------------------------------

// Register
const getRegisterUser = (req, res) => {
  res.render("register");
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).send("All fields are mandatory.");
  }

  try {
    const userExists = await Admin.findOne({ email });
    if (userExists) {
      return res.status(409).send("User already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ username, email, password: hashedPassword });
    await newAdmin.save();

    res.redirect("/admin/login");
  } catch (error) {
    res.status(500).send("Error registering user.");
  }
};
// Login
const getLoginUser = (req, res) => {
  res.render("login");
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate input data
  if (!email || !password) {
    return res.status(400).send("All fields are mandatory.");
  }

  try {
    // Find the user by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).send("User not found.");
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return res.status(401).send("Invalid credentials.");
    }

    // Generate a JWT token with a short expiration time (e.g., 1 hour)
    const accessToken = jwt.sign(
      { admin: { id: admin._id, username: admin.username, email: admin.email } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    // Store the token in the session along with the decoded user information
    req.session.token = accessToken;
    req.user = { id: admin._id, username: admin.username, email: admin.email };

    // Redirect to the dashboard
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Error logging in.");
  }
};

// logout
const logoutUser = (req, res) => {
  // Clear the session to log out the user
  req.session.destroy((err) => {
    if (err) {
      console.log("Error while logging out:", err);
    }
    // Redirect the user to the login page after logout
    res.redirect("/admin/login");
  });
};

// -----------------------------Events-------------------------------------------------------------------------------------------------------------------------
// post
// inserting event into the database
const getDashboardEvents = (req , res) => {
  res.render("dashboardEvents");
}
const dashboardEvents= async(req , res) => {
  try {
    const {
      eventsImage,
      eventsTitle,
      eventsTimings,
      eventsDate,
      eventsMonth,
      eventsDetails,
      eventsSpeaker,
    } = req.body;

    const newEvent = new Events({
      eventsImage: req.file.path,
      eventsTitle,
      eventsTimings,
      eventsDate,
      eventsMonth,
      eventsDetails,
      eventsSpeaker,
    });

    await newEvent.save();
    res.redirect('/admin/dashboard');
  } catch (err) {
    console.error('Error saving event:', err);
    res.status(500).send('Error saving event.');
  }
}
// edit events in dashboard
const getDashboardEventsEdit = async (req, res) => {
  const id = req.params.id;
  try {
    const event = await Events.findById(id).exec();

    if (!event) {
      return res.redirect('/admin/dashboard');
    }

    // If the event exists, render the 'editEvents.ejs' template with the event data and user data
    res.render("editEvents.ejs", { user: req.user, event: event });
  } catch (err) {
    console.error("Error fetching event:", err);
    res.status(500).send("Error fetching event.");
  }
};

// update post the data into database
const updateDashboardEventsEdit = async (req, res) => {
  const id = req.params.id;
  let new_image = null;
  if (req.file) {
    new_image = req.file.filename;
    try {
      fs.unlinkSync('./uploads/events/' + req.body.old_image);
    } catch (err) {
      console.log(err);
    }
  } else {
    new_image = req.body.old_image;
  }

  try {
    await Events.findByIdAndUpdate(id, {
      eventsImage: new_image,
      eventsTitle: req.body.eventsTitle,
      eventsTimings: req.body.eventsTimings, // Corrected the field name to 'eventsTimings'
      eventsDate: req.body.eventsDate,
      eventsMonth: req.body.eventsMonth,
      eventsDetails: req.body.eventsDetails,
      eventsSpeaker: req.body.eventsSpeaker
      // ....................................................>
    });

    console.log("Updated successfully");
    res.redirect("/admin/dashboard");
  } catch (err) {
    console.error("Error updating event:", err);
    res.status(500).send("Error updating event.");
  }
};
// delete an event
const deleteDashboardEventsEdit = async (req, res) => {
  const id = req.params.id;
  try {
    const event = await Events.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).send("Event not found.");
    }

    if (event.eventsImage !== '') {
      const imagePath = path.join(__dirname, `./uploads/events/${event.eventsImage}`);
      fs.unlinkSync(imagePath);
    }

    console.log("Event deleted successfully");
    res.redirect("/admin/dashboard");
  } catch (err) {
    res.redirect("/admin/dashboard");
    // console.error("Error deleting event:", err);
    // res.status(500).send("Error deleting event.");
  }
};


// ------------------------------Internship-----------------------------------------------------------------




// get
const getDashboardInternships = (req , res) => {
  res.render("dashboardInternship");
}
// post

// internships
const dashboardInternships = async (req, res) => {
  try {
    const {
      internshipDomain,
      internshipTitle,
      internshipDetails,
      internshipLink,
    } = req.body;

    // Check if the file is uploaded and exists in req.file
    if (!req.file) {
      // If the file is not provided, handle the error appropriately
      return res.status(400).send("Please upload an internship image.");
    }

    const newInternship = new Internship({
      internshipImage: req.file.path,
      internshipDomain,
      internshipTitle,
      internshipDetails,
      internshipLink,
    });

    await newInternship.save();
    res.redirect('/admin/dashboard');
  } catch (err) {
    console.error('Error saving internship:', err);
    res.status(500).send('Error saving Internship.');
  }
};
// delete
const deleteDashboardInternshipEdit = async (req, res) => {
  const id = req.params.id;
  try {
    const internship = await Internship.findByIdAndDelete(id);

    if (!internship) {
      return res.status(404).send("Internship not found.");
    }

    if (internship.internshipImage !== '') {
      const imagePath = path.join(__dirname, `./uploads/events/${internship.internshipImage}`);
      fs.unlinkSync(imagePath);
    }

    console.log("Internship deleted successfully");
    res.redirect("/admin/dashboard");
  } catch (err) {
    res.redirect("/admin/dashboard");
    // console.error("Error deleting internship:", err);
    // res.status(500).send("Error deleting internship.");
  }
};


// -----------------------Updates------------------------------------------------------------------------------
const getDashboardUpdates = (req , res) => {
  res.render("dashboardupdates");
}
// ---->
const dashboardUpdates = async(req , res) => {
  try {
    const {
      updatesSpeakerName,
      updatesIn,
      updatesTitle,
      updatesDetails,
      updatesLink,
      updatesDate,
      updatesMonth,
    } = req.body;

    // Check if the file is uploaded and exists in req.file
    if (!req.file) {
      // If the file is not provided, handle the error appropriately
      return res.status(400).send("Please upload an updates  image.");
    }

    const newUpdates = new Updates({
      updatesImage: req.file.path,
      updatesSpeakerName,
      updatesIn,
      updatesTitle,
      updatesDetails,
      updatesLink,
      updatesDate,
      updatesMonth,
     
    });

    await newUpdates.save();
    res.redirect('/admin/dashboard');
  } catch (err) {
    res.redirect("/admin/dashboard");
    // console.error('Error saving updates:', err);
    // res.status(500).send('Error saving updates.');
  }
}
// delete
const deleteDashboardUpdatesEdit = async (req, res) => {
  const id = req.params.id;
  try {
    const updates = await Updates.findByIdAndRemove(id);

    if (!updates) {
      return res.status(404).send("Updates not found.");
    }

    if (updates.updateImage !== '') {
      const imagePath = path.join(__dirname, `./uploads/events/${updates.updateImage}`);
      fs.unlinkSync(imagePath);
    }

    console.log("Updates deleted successfully");
    res.redirect("/admin/dashboard");
  } catch (err) {
    // console.error("Error deleting Updates:", err);
    // res.status(500).send("Error deleting updates.");
    res.redirect("/admin/dashboard");
  }
};


// -----------------------------------Scroller----------------------------------------------------------------
// get
const getDashboardScroller = (req , res) => {
  res.render("dashboardScroller");
}
// post


// Define the dashboardScroller function to handle the POST request
const dashboardScroller = async (req, res) => {
  try {
    const { ScrollerText, ScrollerLink } = req.body;
    if (!ScrollerText || !ScrollerLink) {
      res.status(400).send("All fields are needed.");
    } else {
      const newScroller = new Scroller({
        scrollerText: ScrollerText,
        scrollerLink: ScrollerLink,
      });
      await newScroller.save();
      res.redirect('/admin/dashboard');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
};

const deleteDashboardScroller = async (req, res) => {
  try {
    const id = req.params.id;
    await Scroller.findByIdAndRemove(id);
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.error('Error deleting scroller:', error);
    res.status(500).send('Error deleting scroller.');
  }
};


// ----------------------------------------------------Dashboard--------------------------------------------------------------------------

const dashboard = async (req, res) => {
  try {
    const events = await Events.find({});
    const scroller = await Scroller.find({});
    const internship = await Internship.find({});
    const updates = await Updates.find({});
    res.render('dashboard', { user: req.user, events, scroller , internship , updates ,});
  } catch (err) {
    console.error('Error fetching events:', err);
    
    res.status(500).send('Error fetching events.');
  }
};



// exports


module.exports = {
  registerUser,
  loginUser,
  dashboard,
  logoutUser,
  getRegisterUser,
  getLoginUser,
  getDashboardScroller,
  getDashboardInternships,
  getDashboardEvents,
  getDashboardUpdates,
  dashboardEvents,
  dashboardInternships,
  getDashboardEventsEdit,
  updateDashboardEventsEdit,
  deleteDashboardEventsEdit,
  dashboardScroller,
  deleteDashboardScroller,
  deleteDashboardInternshipEdit,
  dashboardUpdates,
  deleteDashboardUpdatesEdit
};
