import { ITeams, ITeamsModel, ITeamsService } from '../interfaces';

export default class TeamsService implements ITeamsService {
  constructor(private model: ITeamsModel) {
    this.model = model;
  }

  findAll(): Promise<ITeams[]> {
    const teams = this.model.findAll();
    return teams;
  }
}
