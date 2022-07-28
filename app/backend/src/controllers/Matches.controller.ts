import { Request, Response, NextFunction } from 'express';
import { IMatchesService } from '../interfaces';

export default class MatchesController {
  constructor(private service: IMatchesService) {
    this.service = service;
  }

  async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const matches = await this.service.findAll();

      return res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  }
}
