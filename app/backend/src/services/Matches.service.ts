import { IInsertMatch, IMatches, IMatchesModel, IMatchesService } from '../interfaces';
import HttpException from '../middlewares/HttpExceptions';

export default class MatchesService implements IMatchesService {
  constructor(private model: IMatchesModel) {
    this.model = model;
  }

  findAll(): Promise<IMatches[]> {
    const matches = this.model.findAll();
    return matches;
  }

  create(insertedMatch: IInsertMatch): Promise<IMatches> {
    if (insertedMatch.homeTeam === insertedMatch.awayTeam) {
      throw new HttpException(401, 'It is not possible to create a match with two equal teams');
    }
    const newMatch = this.model.create(insertedMatch);
    return newMatch;
  }

  async update(id: number): Promise<string> {
    const finishMatch = this.model.update(id);
    return finishMatch;
  }
}
