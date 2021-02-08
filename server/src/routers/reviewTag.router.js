const router = require('express').Router();

const {
  GetAllReviewTags,
  GetReviewsByTagId
} = require('../controllers/reviewTag.controller.js');

router.get('/getAllReviewTags', GetAllReviewTags);
router.get('/:tag', GetReviewsByTagId); //!not working yet

module.exports = router;
