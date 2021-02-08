const router = require('express').Router();

const {
  GetAllEventTags,
  GetEventsByTagId
} = require('../controllers/eventTag.controller.js');

router.get('/getAllEventTags', GetAllEventTags);
router.get('/:eventTag', GetEventsByTagId); //!not working yet

module.exports = router;
