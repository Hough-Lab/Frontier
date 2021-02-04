const router = require('express').Router();
const { authMiddleware } = require('../middlewares/auth');

const {
  PostEvent,
  DeleteEvent,
} = require('../controllers/event.controller.js');

router.post('/postEvent', authMiddleware, PostEvent);
router.post('/deleteEvent', authMiddleware, DeleteEvent);

module.exports = router;
