const router = require('express').Router();

const {
  GetAllEventTags,
  GetEventsByTagId
} = require('../controllers/eventTag.controller.js');

router.get('/getAllEventTags', GetAllEventTags);
router.get('/:eventTag', GetEventsByTagId);

module.exports = router;
