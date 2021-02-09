const router = require('express').Router();
const { authMiddleware } = require('../middlewares/auth');

const {
  RegisterUser,
  LoginUser,
  EditProfile,
} = require('../controllers/user.controller.js');

router.post('/register', RegisterUser);
router.post('/login', LoginUser);
router.put('/editProfile', authMiddleware, EditProfile);

module.exports = router;
