const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync");
const Review = require("../models/review");
const { validateReview, isLoggedIn, isReviewsAuthor } = require("../middleware");

const reviewControllers = require("../controllers/reviews");

//post route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewControllers.createReview));

//Delete review route
router.delete("/:reviewId", isLoggedIn, isReviewsAuthor, wrapAsync(reviewControllers.deletReview));

module.exports = router;
