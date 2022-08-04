import Teams from '../database/models/Teams.models';
import Matches from '../database/models/Matches.models';
import { IMatches, IMatchesModel, IInsertMatch } from '../interfaces';

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
    // const formattedMatch = {
    //   id: newMatch.id,
    //   homeTeam: newMatch.homeTeam,
    //   homeTeamGoals: newMatch.homeTeamGoals,
    //   awayTeam: newMatch.awayTeam,
    //   awayTeamGoals: newMatch.awayTeamGoals,
    //   inProgress: true,
    // };
    newMatch.inProgress = true;
    return newMatch;
  }
}
