const router = require('express').Router();
const { authMiddleware } = require('../middlewares/auth');

const {
  RegisterUser,
  LoginUser,
  test,
} = require('../controllers/user.controller.js');

router.post('/register', RegisterUser);
router.post('/login', LoginUser);
router.get('/test', authMiddleware, test);

module.exports = router;
