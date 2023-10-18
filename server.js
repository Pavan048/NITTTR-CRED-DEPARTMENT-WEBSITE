// server.js

const express = require("express");
const app = express();
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv");
const constants = require('./middleware/constants');
dotenv.config();
const session = require("express-session");
const path = require('path'); 

// connect database 
connectDb();
// Set up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({ secret: "your-secret-key", resave: false, saveUninitialized: true }));
app.use(errorHandler);

// ------->
// for storing session message
app.use((req,res,next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
})

// ------>
// Set the EJS view engine
app.set("view engine", "ejs"); // This line sets EJS as the view engine
app.set('views', path.join(__dirname, 'views'));
// Define the path to the static folder
const publicPath = path.join(__dirname, 'public');

// Serve static files from the 'public' folder
app.use(express.static(publicPath));
// Serve uploaded files from the 'uploads' folder
app.use('/uploads', express.static('uploads'));
// app.use('/uploads/events', express.static('../uploads/events'));

// user routes
const userRoutes = require("./routes/userRoutes.js");
app.use("/", userRoutes);
// admin routes
const adminRoutes = require("./routes/adminRoutes.js");
app.use("/admin", adminRoutes);
app.get('*', (req, res) => {
  res.status(404).render('pagenotfound'); // Assuming you have a '404.ejs' file in the 'views' folder
});
// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

