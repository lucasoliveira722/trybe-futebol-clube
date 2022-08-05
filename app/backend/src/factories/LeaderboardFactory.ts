import LeaderboardRepository from '../repository/Leaderboard.repository';
import LeaderboardService from '../services/Leaderboard.service';
import LeaderboardController from '../controllers/Leaderboard.controller';

export default () => {
  const repository = new LeaderboardRepository();
  const service = new LeaderboardService(repository);
  const controller = new LeaderboardController(service);

  return controller;
};
