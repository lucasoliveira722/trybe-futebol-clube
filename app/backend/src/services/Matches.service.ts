import { IMatches, IMatchesModel, IMatchesService } from '../interfaces';

export default class MatchesService implements IMatchesService {
  constructor(private model: IMatchesModel) {
    this.model = model;
  }

  findAll(): Promise<IMatches[]> {
    const matches = this.model.findAll();
    return matches;
  }
}
