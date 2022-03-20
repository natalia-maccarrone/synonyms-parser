const WordNet = require('node-wordnet');
import { Request, Response, Router } from 'express';
import { ParseController } from '../controllers/ParseController';
import { ParseService } from '../services/ParseService';

const wordNet = new WordNet();
const parseService = new ParseService(wordNet);
const parseController = new ParseController(parseService);

const routes = Router();

routes.post('/parse', (req: Request, res: Response) => {
  parseController.parse(req, res);
});

export default routes;
