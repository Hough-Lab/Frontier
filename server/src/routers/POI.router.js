const router = require('express').Router();

const {
  CreatePOI,
  GetAllPOIs
} = require('../controllers/pointOfInterest.controller.js');

router.post('/newPOI', CreatePOI);
// router.get('/getPOI', GetPOIById);
router.get('/getAllPOIs', GetAllPOIs);
module.exports = router;
