// import HttpException from '../middlewares/HttpExceptions';
import { ITeams, ITeamsModel, ITeamsService } from '../interfaces';

export default class TeamsService implements ITeamsService {
  constructor(private model: ITeamsModel) {
    this.model = model;
  }

  findAll(): Promise<ITeams[]> {
    const teams = this.model.findAll();
    return teams;
  }

  findByPk(id: number): Promise<ITeams | null> {
    const selectedTeam = this.model.findByPk(id);
    // if (!selectedTeam) {
    //   throw new HttpException(404, 'Team not found');
    // }
    return selectedTeam;
  }
}
