const router = require('express').Router();

const {
  CreatePOI,
  GetAllPOI,
  GetPOIById,
} = require('../controllers/pointOfInterest.controller.js');

// router.post('/newPOI', CreatePOI);
// router.get('/getAllPOI', GetAllPOI);
// router.get('/getPOIById/:id', GetPOIById);
module.exports = router;
