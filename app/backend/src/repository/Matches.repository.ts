import Teams from '../database/models/Teams.models';
import Matches from '../database/models/Matches.models';
import { IMatches, IMatchesModel, IInsertMatch } from '../interfaces';
import HttpException from '../middlewares/HttpExceptions';

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
    if (insertedMatch.homeTeam === insertedMatch.awayTeam) {
      throw new HttpException(401, 'It is not possible to create a match with two equal teams');
    }
    const newMatch = await this.model.create({
      homeTeam: insertedMatch.homeTeam,
      homeTeamGoals: insertedMatch.homeTeamGoals,
      awayTeam: insertedMatch.awayTeam,
      awayTeamGoals: insertedMatch.awayTeamGoals,
      inProgress: true,
    });
    return newMatch;
  }
}
