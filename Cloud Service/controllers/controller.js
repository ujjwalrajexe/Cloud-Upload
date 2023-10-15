const File = require("../models/file");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async (req, res) => {
  try {
    const file = req.files.file;
    console.log("This is the uploaded file ->", file);

    let tempFilePath =
      __dirname + "/file/" + Date.now() + `.${file.name.split(".")[1]}`;
    console.log(tempFilePath);
    const path = tempFilePath;
    file.mv(path, (err) => {
      console.log(err);
    });
    res.json({
      success: true,
      message: "Local file uploaded successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

async function uploadFileToCloudinary(file, folder) {
  const options = { folder };
  console.log("File path ", file.tempFilePath);
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

async function uploadVideoToCloudinary(file, folder) {
  const options = { resource_type: "video", folder };
  console.log("File path ", file.tempFilePath);
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

async function uploadReducedImageToCloudinary(file, folder, quality) {
  const options = { folder };
  options.quality = quality;
  console.log("File path ", file.tempFilePath);
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// exports.imageUpload = async (req, res) => {
//   try {
//     const { nameP, tags, email } = req.body;
//     console.log(nameP, tags, email);

//     const imageFile = req.files.imageFile; // Changed from req.files.imageFile to req.file
//     console.log(imageFile);
//     const supportedExtensions = ["jpg", "jpeg", "png"];

//     const fileType = imageFile.name.split(".")[1].toLowerCase();
//     console.log(fileType);

//     if (!supportedExtensions.includes(fileType)) {
//       return res.status(400).json({
//         success: false,
//         message: "File type not supported",
//       });
//     }

//     const response = await uploadFileToCloudinary(imageFile, "codehelp");
//     console.log("Response is ", response);

//     // Assuming there's a model named File and a function create to save data to the database
//     const fileData = await File.create({
//       nameP: nameP,
//       tags: tags,
//       email: email,
//       url: response.secure_url,
//     });

//     res.json({
//       success: true,
//       url: response.secure_url,
//       message: "File uploaded successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

exports.imageUpload = async (req, res) => {
  try {
    const { nameP, tags, email } = req.body;
    const imageFile = req.files.imageFile;
    // Process the file and save it to Cloudinary
    const response = await uploadFileToCloudinary(imageFile, "codehelp");
    // Return a response to the frontend
    res.json({
      success: true,
      url: response.secure_url,
      message: "File uploaded successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.videoUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    console.log(name, tags, email);
    const file = req.files.videoFile;
    console.log(file);

    const supportedExtensions = ["mp4", "webm", "mkv", "mov"];

    const fileType = file.name.split(".")[1].toLowerCase();

    if (!supportedExtensions.includes(fileType)) {
      return res.status(400).json({
        success: false,
        message: "File type not supported",
      });
    }
    const response = await uploadVideoToCloudinary(file, "samples");
    console.log("Response is ", response);
    const fileData = await File.create({
      name,
      tags,
      email,
      url: response.secure_url,
    });

    res.json({
      success: true,
      url: response.secure_url,
      message: "File uploaded successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.imageReducer = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log(file);

    const supportedExtensions = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!supportedExtensions.includes(fileType)) {
      return res.status(400).json({
        success: false,
        message: "File type not supported",
      });
    }

    const response = await uploadReducedImageToCloudinary(file, "samples", 30);
    console.log("Response is ", response);
    const fileData = await File.create({
      name,
      tags,
      email,
      url: response.secure_url,
    });

    res.json({
      success: true,
      url: response.secure_url,
      message: "File uploaded successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "nhi ho rha",
      message: error.message,
    });
  }
};
