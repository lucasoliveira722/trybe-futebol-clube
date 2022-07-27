import Teams from '../database/models/Teams.models';
import { ITeams, ITeamsModel } from '../interfaces';

export default class TeamsRepository implements ITeamsModel {
  constructor(private model = Teams) {
    this.model = model;
  }

  async findAll(): Promise<ITeams[]> {
    const teams = await this.model.findAll();
    return teams;
  }
}
