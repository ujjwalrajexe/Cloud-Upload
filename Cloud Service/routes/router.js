const express = require("express");
const fileupload = require("express-fileupload");
const router = express.Router();

const {
  localFileUpload,
  videoUpload,
  imageReducer,
  imageUpload,
} = require("../controllers/controller");

//api routes
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);
router.post("/imageReducer", imageReducer);
router.post("/localFileUpload", localFileUpload);

module.exports = router;
