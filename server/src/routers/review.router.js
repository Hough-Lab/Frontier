const router = require('express').Router();

const {
  PostReview,
  DeleteReview,
  GetReviewById,
  GetAllReviews,
  likeReview,
  dislikeReview,
} = require('../controllers/review.controller.js');
const { authMiddleware } = require('../middlewares/auth.js');

router.post('/postReview', authMiddleware, PostReview);
router.delete('/deleteReview', authMiddleware, DeleteReview);
router.get('/getAllReviews', GetAllReviews);
router.get('/getReviewById/:reviewId', GetReviewById);
router.put('/likeReview/:reviewId', authMiddleware, likeReview);
router.put('/dislikeReview/:reviewId', authMiddleware, dislikeReview);

module.exports = router;
