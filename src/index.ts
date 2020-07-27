// MODULES
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Application } from 'express';
import mongoose from 'mongoose';

import routesV1 from './routes/v1';

dotenv.config();

const { MONGO_URL, PORT } = process.env;

const app: Application = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routesV1(app);

mongoose
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  .connect(MONGO_URL!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to mongodb');
    app.listen(PORT, () => {
      console.log(`Running on port ${PORT}`);
    });
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .catch((err: any) => {
    console.log(err);
  });
