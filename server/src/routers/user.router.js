const router = require('express').Router();
const {authMiddleware} = require('../middlewares/auth')

const { RegisterUser, LoginUser, LogoutUser } = require('../controllers/user.controller.js');

router.post('/register', RegisterUser);
router.post('/login', LoginUser)
router.get('/logout', authMiddleware, LogoutUser)

module.exports = router;
