import MatchesController from '../controllers/Matches.controller';
import MatchesService from '../services/Matches.service';
import MatchesRepository from '../repository/Matches.repository';

export default () => {
  const repository = new MatchesRepository();
  const service = new MatchesService(repository);
  const controller = new MatchesController(service);

  return controller;
};
