import express from "express";
const fileUpload = require('express-fileupload');
import storage from "@google-cloud/storage";
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');
import path from "path";
//const {Storage} = require('@google-cloud/storage');
//const storage = new Storage();

// Instantiate a storage client
const googleCloudStorage = storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  keyFilename: process.env.GCLOUD_KEY_FILE
});

// Instantiate an express server
const app = express();
app.use(fileUpload({
  createParentPath: true,
  limits: { 
    fileSize: 2 * 1024 * 1024 * 1024 //2MB max file(s) size
},
}));


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

async function uploadFile(fileName, mimetype) {
  // Uploads a local file to the bucket
  await googleCloudStorage.bucket(process.env.GCLOUD_STORAGE_BUCKET).upload(__dirname + '/uploads/' + fileName, {
    gzip: true,
    metadata: {
      contentType: mimetype,
      cacheControl: 'public, max-age=31536000',
    },
  });  
}


// Display a form for uploading files.
app.get("/", (req, res) => {
  res.sendFile(path.join(`${__dirname}/index.html`));
});

// Process the file upload and upload to Google Cloud Storage.
app.post("/upload", async (req, res, next) => {
  try {
    if (!req.files) {
      res.status(400).send("No file uploaded.");
      return;
    } else {

      var file = req.files.foo;
      //console.log(file);

      //Use the mv() method to place the file in upload directory (i.e. "uploads")
      file.mv(__dirname + '/uploads/' + file.name, function (err) {
        if (err) {
          console.log(err);
        }
      });

      uploadFile(file.name, file.mimetype).catch(console.error);
      res.status(200).send(`Success!\n ${file.name} uploaded to ${process.env.GCLOUD_STORAGE_BUCKET}.`);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log("Press Ctrl+C to quit.");
});