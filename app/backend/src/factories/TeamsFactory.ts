import TeamsController from '../controllers/Teams.controller';
import TeamsService from '../services/Teams.service';
import TeamsRepository from '../repository/Teams.repository';

export default () => {
  const repository = new TeamsRepository();
  const service = new TeamsService(repository);
  const controller = new TeamsController(service);

  return controller;
};
