const express = require('express');
const router = express.Router();
const {
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
  
} = require('../controllers/userControllers');

// User routes
router.get('/', getHome);
router.get('/aboutus', getAboutUs);
router.get('/timeline', getTimeline);
router.get('/pasthod', getPastHod);
router.get('/hodmessage', getHodMessage);
router.get('/profilecards', getFacultyDirectory);
router.get('/staffdirectory', getStaffDirectory);
router.get('/researchthemes', getResearchThemes);
router.get('/researchcentre', getResearchCentre);
router.get('/programmes', getProgrammes);
// router.get('/skilldevelopment', getSkillDevelopment);
router.get('/skilldevabout', getSkillDevAbout);
router.get('/SkillDT', getSkillDevTraining);
router.get('/Skilliiab8', getIIABSection8);
// events
router.get('/events' , getEvents);
router.get('/news' , getNews);
router.get('/projectpositions', getProjectPositions);

router.get('/cdtp' , getCdtp);
router.get('/tnrtp' , getTnrtp);
router.get('/top' , getTop);
router.get('/pwd' ,getPwd);
router.get('/uba' ,getUba);
router.get('/tot' ,getTot);
router.get('/gallery', getGallery);
// gallery filter
router.get('/campusg' , getCampusg);
router.get('/deptg' , getDeptg);
router.get('/eventsg' , getEventsg);
router.get('/projectg' , getProjectg);
router.get('/contactus', getContactUs);
router.post('/contactus', contactUs);

module.exports = router;
