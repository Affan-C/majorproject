const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const listingControllers = require("../controllers/listings");
const multer  = require('multer')
const { storage } = require("../cloudConfig");
const upload = multer({ storage });



router
.route("/")
.get(wrapAsync(listingControllers.index))
.post(isLoggedIn, validateListing, upload.single('listing[image]'),  wrapAsync(listingControllers.createListing));



// new route
router.get("/new", isLoggedIn, listingControllers.renderNewForm);

router
.route("/:id")
.get(wrapAsync(listingControllers.showListing))
.put(
    isLoggedIn, 
    isOwner, 
    upload.single('listing[image]'), 
    validateListing,  
    wrapAsync(listingControllers.updateListing))
.delete(isLoggedIn, isOwner, wrapAsync(listingControllers.deleteListing));


// edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingControllers.editListing));


module.exports = router;


