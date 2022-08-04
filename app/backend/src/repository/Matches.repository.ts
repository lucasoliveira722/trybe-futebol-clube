import Teams from '../database/models/Teams.models';
import Matches from '../database/models/Matches.models';
import { IMatches, IMatchesModel, IInsertMatch, IUpdateGoals } from '../interfaces';

export default class MatchesRepository implements IMatchesModel {
  constructor(private model = Matches) {
    this.model = model;
  }

  async findAll(): Promise<IMatches[]> {
    const matches = await this.model.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  async create(insertedMatch: IInsertMatch): Promise<IMatches> {
    const newMatch = await this.model.create({
      homeTeam: insertedMatch.homeTeam,
      homeTeamGoals: insertedMatch.homeTeamGoals,
      awayTeam: insertedMatch.awayTeam,
      awayTeamGoals: insertedMatch.awayTeamGoals,
      inProgress: true,
    });
    return newMatch;
  }

  async updateProgress(id: number): Promise<string> {
    await this.model.update({ inProgress: false }, {
      where: { id },
    });
    return 'Finished';
  }

  async updateGoals(id: number, newGoals: IUpdateGoals): Promise<string> {
    const { homeTeamGoals, awayTeamGoals } = newGoals;
    await this.model.update({ homeTeamGoals, awayTeamGoals }, {
      where: { id },
    });
    return 'Goals Updated';
  }
}
