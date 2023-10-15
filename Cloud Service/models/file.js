const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const fileSchema = new mongoose.Schema({
  nameP: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
});

fileSchema.post("save", async function (doc) {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: "KiZamaDo",
      to: doc.email,
      subject: "File Uploaded Successfully",
      text: "File Uploaded Successfully",
      html: `<p>File Uploaded Successfully <a href="${doc.imageUrl}">Click Here</a></p>`,
    });
    console.log("INFO", info);
  } catch (error) {
    console.log(error);
  }
});

const File = mongoose.model("File", fileSchema);
module.exports = File;
