// MODULES
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const routesV1 = require('./routes/v1');

dotenv.config();

const { MONGO_URL, PORT } = process.env;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routesV1(app);

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true, useUnifiedTopology: true,
}).then(() => {
  console.log('connected to mongodb');
  app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
  });
}).catch(err => {
  console.log(err);
});
