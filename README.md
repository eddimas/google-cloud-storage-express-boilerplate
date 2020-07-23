# google-cloud-storage-express-boilerplate
Boilerplate Espress.js app for handling user uploads to Google Cloud Storage

Create GCP project
Create GCP bucket
Generate a service account in GCP, and
Grant create objects privileges
Export json credential files

Set following env.variables:
 
{{ export GCLOUD_PROJECT_ID=<yourProjectID> }}
{{ export GCLOUD_KEY_FILE=<CredentialFile.json> }}
{{ export GCLOUD_STORAGE_BUCKET=<bucketName> }}

npm install
npm start

Sample output
```bash
    $ npm start

> google-cloud-storage-express-boilerplate@1.0.0 start /home/user/google-cloud-storage-express-boilerplate
> babel-node index.js --presets es2015,stage-2

App listening on port 8080
Press Ctrl+C to quit.
GET / 200 5.226 ms - 409
{ name: 'mySuperCoolFile.png',
  data:
   <Buffer 89 50 4e 47 0d 0a 1a ... >,
  size: 176659,
  encoding: '7bit',
  tempFilePath: '',
  truncated: false,
  mimetype: 'image/png',
  md5: '...',
  mv: [Function: mv] }
POST /upload 200 5.989 ms - 67
```
 
