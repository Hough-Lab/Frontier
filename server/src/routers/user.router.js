const router = require('express').Router();
const { authMiddleware } = require('../middlewares/auth');

const {
  RegisterUser,
  LoginUser,
} = require('../controllers/user.controller.js');

router.post('/register', RegisterUser);
router.post('/login', LoginUser);

module.exports = router;
