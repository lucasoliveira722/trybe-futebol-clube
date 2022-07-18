import LoginController from '../controllers/Login.controller';
import LoginService from '../services/Login.service';
import UserRepository from '../repository/User.repository';

export default () => {
  const repository = new UserRepository();
  const service = new LoginService(repository);
  const controller = new LoginController(service);

  return controller;
};
