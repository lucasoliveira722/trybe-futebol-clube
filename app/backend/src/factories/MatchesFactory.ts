import MatchesController from '../controllers/Matches.controller';
import MatchesService from '../services/Matches.service';
import MatchesRepository from '../repository/Matches.repository';
import TeamsRepository from '../repository/Teams.repository';

export default () => {
  const repository = new MatchesRepository();
  const teamsRepository = new TeamsRepository();
  const service = new MatchesService(repository, teamsRepository);
  const controller = new MatchesController(service);

  return controller;
};
