const router = require('express').Router();

const {
  CreatePOI,
  GetAllPOI,
  GetPOIById,
  GetEventsAndReviewsByPOI,
} = require('../controllers/pointOfInterest.controller.js');

router.get(
  '/getReviewsAndEventsByPOIId/:pointOfInterestId',
  GetEventsAndReviewsByPOI,
);
router.get('/getAllPOI', GetAllPOI);
router.get('/getPOIById/:pointOfInterestId', GetPOIById);
module.exports = router;
