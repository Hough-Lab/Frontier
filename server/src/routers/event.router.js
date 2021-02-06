const router = require('express').Router();
const { authMiddleware } = require('../middlewares/auth');

const {
  GetAllEvents,
  GetEventById,
  PostEvent,
} = require('../controllers/event.controller.js');

router.get('/getAllEvents', GetAllEvents);
router.get('/:eventId', GetEventById)
router.post('/postEvent', PostEvent);

module.exports = router;
