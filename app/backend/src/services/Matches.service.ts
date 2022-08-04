import {
  IInsertMatch,
  IMatches,
  IMatchesModel,
  IMatchesService,
  ITeamsModel,
  IUpdateGoals,
} from '../interfaces';
import HttpException from '../middlewares/HttpExceptions';

export default class MatchesService implements IMatchesService {
  constructor(private model: IMatchesModel, private teamsModel: ITeamsModel) {
    this.model = model;
    this.teamsModel = teamsModel;
  }

  findAll(): Promise<IMatches[]> {
    const matches = this.model.findAll();
    return matches;
  }

  async create(insertedMatch: IInsertMatch): Promise<IMatches> {
    if (insertedMatch.homeTeam === insertedMatch.awayTeam) {
      throw new HttpException(401, 'It is not possible to create a match with two equal teams');
    }
    const searchTeamOne = await this.teamsModel.findByPk(insertedMatch.homeTeam);
    console.log(searchTeamOne);

    const searchTeamTwo = await this.teamsModel.findByPk(insertedMatch.awayTeam);
    console.log(searchTeamTwo);

    if (searchTeamOne === null || searchTeamTwo === null) {
      throw new HttpException(404, 'There is no team with such id!');
    }
    const newMatch = this.model.create(insertedMatch);
    return newMatch;
  }

  async updateProgress(id: number): Promise<string> {
    const finishMatch = this.model.updateProgress(id);
    return finishMatch;
  }

  async updateGoals(id: number, newGoals: IUpdateGoals): Promise<string> {
    const updateGoals = this.model.updateGoals(id, newGoals);
    return updateGoals;
  }
}
