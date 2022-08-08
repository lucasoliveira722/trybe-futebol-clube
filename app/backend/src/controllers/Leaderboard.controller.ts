import { Request, Response, NextFunction } from 'express';
import { ILeaderboardService } from '../interfaces';

export default class LeaderboarController {
  constructor(private service: ILeaderboardService) {
    this.service = service;
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const leaderboard = await this.service.findAll();
      return res.status(200).json(leaderboard);
    } catch (error) {
      next(error);
    }
  }

  async findAllAway(req: Request, res: Response, next: NextFunction) {
    try {
      const leaderboard = await this.service.findAllAway();
      return res.status(200).json(leaderboard);
    } catch (error) {
      next(error);
    }
  }
}
