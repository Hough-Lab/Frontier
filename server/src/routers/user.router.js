const router = require('express').Router();
const { authMiddleware } = require('../middlewares/auth');

const {
  RegisterUser,
  LoginUser,
  EditProfile,
  getAttendingEventsByUserId,
  getInterestedEventsByUserId,
} = require('../controllers/user.controller.js');

router.post('/register', RegisterUser);
router.post('/login', LoginUser);
router.put('/editProfile', authMiddleware, EditProfile);
router.get(
  '/getAttendingEventsByUserId',
  authMiddleware,
  getAttendingEventsByUserId,
);
router.get(
  '/getInterestedEventsByUserId',
  authMiddleware,
  getInterestedEventsByUserId,
);

module.exports = router;
