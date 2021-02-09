const router = require('express').Router();
const { authMiddleware } = require('../middlewares/auth');

const {
  GetAllEvents,
  GetEventById,
  PostEvent,
  AttendEvent,
  UndoAttendEvent,
  MarkEventAsInterested,
  UndoMarkEventAsInterested,
} = require('../controllers/event.controller.js');

router.get('/getAllEvents', GetAllEvents);
router.get('/getEventById/:eventId', GetEventById);
router.post('/postEvent', authMiddleware, PostEvent);
router.put('/attendEvent/:eventId', authMiddleware, AttendEvent);
router.put('/undo/attendEvent/:eventId', authMiddleware, UndoAttendEvent);
router.put(
  '/markEventAsInterested/:eventId',
  authMiddleware,
  MarkEventAsInterested,
);
router.put(
  '/undo/markEventAsInterested/:eventId',
  authMiddleware,
  UndoMarkEventAsInterested,
);

module.exports = router;
