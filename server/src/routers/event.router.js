const router = require('express').Router();
module.exports = router;

const {
  PostEvent,
  DeleteEvent,
} = require('../controllers/event.controller.js');

router.post('/postEvent', PostEvent);
router.post('/deleteEvent', DeleteEvent);

