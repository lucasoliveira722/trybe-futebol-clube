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

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals } = req.body;
      const newMatch = await this.service.create({
        homeTeam,
        homeTeamGoals,
        awayTeam,
        awayTeamGoals,
      });
      return res.status(201).json(newMatch);
    } catch (error) {
      next(error);
    }
  }
}
