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

  async findByPk(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id, 10);
    try {
      const selectedTeam = await this.service.findByPk(id);
      // if (!selectedTeam) {
      //   return res.status(400).json({ message: 'Team not found' });
      // }
      return res.status(200).json(selectedTeam);
    } catch (err) {
      next(err);
    }
  }
}
