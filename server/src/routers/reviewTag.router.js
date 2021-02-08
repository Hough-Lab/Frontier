const router = require('express').Router();

const {
  GetAllReviewTags,
  GetReviewsByTagId
} = require('../controllers/reviewTag.controller.js');

router.get('/getAllReviewTags', GetAllReviewTags);
router.get('/:reviewTag', GetReviewsByTagId);

module.exports = router;
