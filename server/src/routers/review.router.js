const router = require('express').Router();

const {
  PostReview,
  DeleteReview,
  GetReviewById,
  GetAllReviews,
} = require('../controllers/review.controller.js');

router.post('/postReview', PostReview);
router.delete('/deleteReview', DeleteReview);
router.get('/getAllReviews', GetAllReviews);
router.get('/:reviewId', GetReviewById);

module.exports = router;
