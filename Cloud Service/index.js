const express = require("express");
const app = express();
const fileupload = require("express-fileupload");
const PORT = process.env.PORT || 4000;
require("dotenv").config();

app.use(express.json());
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "./tmp/",
  })
);

const db = require("./config/mongo");
db.connect();

const filedb = require("./config/cloudinary");
filedb.cloudinaryConnect();

const upload = require("./routes/router");
app.use("/api/v1/upload", upload);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

module.exports = app;
