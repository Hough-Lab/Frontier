const router = require('express').Router();

const { RegisterUser } = require('../controllers/user.controller.js');

router.post('/', RegisterUser);

module.exports = router;
