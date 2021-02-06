const router = require('express').Router();

const {
  GetAllLocations
} = require('../controllers/location.controller.js');

router.get('/getLocations', GetAllLocations);

module.exports = router;
