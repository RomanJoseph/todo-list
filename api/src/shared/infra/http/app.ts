import 'reflect-metadata';
import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';

import errorHandling from './middlewares/errorHandling';
import routes from './routes';


const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World !');
});

app.use(routes);
app.use(errorHandling);

export default app;
