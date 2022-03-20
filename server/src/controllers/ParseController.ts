import { Request, Response } from 'express';
import { IParseService } from '../services/ParseService';

export interface IParseController {
  parse(req: Request, res: Response): Promise<Response>;
}

export class ParseController implements IParseController {
  private parseService: IParseService;

  constructor(parseService: IParseService) {
    this.parseService = parseService;
  }

  public async parse(req: Request, res: Response): Promise<Response> {
    try {
      const text: string = req.body.text;
      const response = await this.parseService.parse(text);
      return res.json(response);
    } catch (err) {
      return res.status(500).send({
        error: err instanceof Error && err.message
      });
    }
  }
}
