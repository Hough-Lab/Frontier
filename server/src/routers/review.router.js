const router = require('express').Router();

const {
  PostReview,
  DeleteReview,
} = require('../controllers/review.controller.js');

router.post('/postReview', PostReview);
router.delete('/deleteReview', DeleteReview);

module.exports = router;
