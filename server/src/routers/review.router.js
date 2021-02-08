const router = require('express').Router();

const {
  PostReview,
  DeleteReview,
  GetReviewById,
  GetAllReviews,
} = require('../controllers/review.controller.js');
const { authMiddleware } = require('../middlewares/auth.js');

router.post('/postReview', authMiddleware, PostReview);
router.delete('/deleteReview', authMiddleware, DeleteReview);
router.get('/getAllReviews', GetAllReviews);
router.get('/:reviewId', GetReviewById);

module.exports = router;
