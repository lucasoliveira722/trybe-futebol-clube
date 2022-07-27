import { Request, Response, NextFunction } from 'express';
import { ITeamsService } from '../interfaces';

export default class TeamsController {
  constructor(private service: ITeamsService) {
    this.service = service;
  }

  async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const teams = await this.service.findAll();

      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  }
}
