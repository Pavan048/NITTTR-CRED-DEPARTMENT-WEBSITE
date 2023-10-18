// routes/adminRoutes.js
const validateToken = require("../middleware/validateToken");
const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require('path');

// ---------------------------------------------imports.............................................
const {
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

} = require("../controllers/adminControllers");


// admin register
router.get("/register", getRegisterUser);
router.post("/register", registerUser);

// admin login
router.get("/login", getLoginUser);
router.post("/login", loginUser);

// admin logout
router.get("/logout", validateToken, logoutUser);

// admin dashboard
router.get("/dashboard", validateToken, dashboard);


//---------------------------------------------------------------------events--------------------------------------

// stroing middleware
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/events');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });
router.get("/dashboard/events" ,validateToken, getDashboardEvents);
router.post('/dashboard/events',validateToken, upload.single('eventsImage'), dashboardEvents);
router.get('/dashboard/event/edit/:id',validateToken,getDashboardEventsEdit);
router.post('/dashboard/events/update/:id', validateToken, upload.single('eventsImage'), updateDashboardEventsEdit);
router.get("/dashboard/event/delete/:id", validateToken, deleteDashboardEventsEdit);

// -----------------------internships---------------------------------------------------------------------------------

router.get("/dashboard/internships" ,validateToken, getDashboardInternships);
router.post("/dashboard/internships" ,validateToken,upload.single('internshipImage'), dashboardInternships);
router.get("/dashboard/internships/delete/:id" , validateToken , deleteDashboardInternshipEdit);
// =-----------------------------Update-------------------------------------------------------------------------------
router.get("/dashboard/updates" ,validateToken, getDashboardUpdates);
router.post("/dashboard/updates" , validateToken , upload.single('updatesImage') , dashboardUpdates);
router.get("/dashboard/updates/delete/:id" , validateToken , deleteDashboardUpdatesEdit);

// ---------------------------------------------------Scroller---------------------------------
router.get("/dashboard/scroller" ,validateToken, getDashboardScroller);
router.post("/dashboard/scroller" , validateToken , dashboardScroller);
router.get("/dashboard/scroller/:id" , validateToken , deleteDashboardScroller);
module.exports = router;
