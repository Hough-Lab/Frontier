const router = require('express').Router();

const {
  PostReview,
  DeleteReview,
  GetReviewById,
  GetAllReviews,
  LikeReview,
  UndoLikeReview,
  DislikeReview,
  UndoDislikeReview,
} = require('../controllers/review.controller.js');
const { authMiddleware } = require('../middlewares/auth.js');

router.post('/postReview', authMiddleware, PostReview);
router.delete('/deleteReview', authMiddleware, DeleteReview);
router.get('/getAllReviews', GetAllReviews);
router.get('/getReviewById/:reviewId', GetReviewById);
router.put('/likeReview/:reviewId', authMiddleware, LikeReview);
router.put('/undo/likeReview/:reviewId', authMiddleware, UndoLikeReview);
router.put('/dislikeReview/:reviewId', authMiddleware, DislikeReview);


module.exports = router;
