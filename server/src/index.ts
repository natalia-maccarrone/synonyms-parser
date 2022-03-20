require('dotenv').config();
import express from 'express';
import cors from 'cors';
import routes from './routes';
import db from './db/config/connection';

const app = express();

app.use(cors({ origin: /(localhost(:[0-9]+)?)/ }));
app.use(express.json());
app.use(routes);
const port = process.env.PORT || 4000;

db.authenticate()
  .then(() => console.log('Connected to database'))
  .catch(() => console.log('Error connecting to database'));

app.listen(port, () => console.log(`Listening on port: ${port}`));
