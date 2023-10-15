const cloudinary = require("cloudinary").v2;
require("dotenv").config();
exports.cloudinaryConnect = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET, //OP3tbq0LIWlYNIkUmBjZ27Dzv4Q
    });
  } catch (e) {
    console.log("Error in cloudinary config");
    console.log(e);
    process.exit(1);
  }
};
