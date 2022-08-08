import { ILeaderboard, ILeaderboardService, ILeaderboardModel } from '../interfaces';

export default class LeaderboardService implements ILeaderboardService {
  constructor(private model: ILeaderboardModel) {
    this.model = model;
  }

  findAll(): Promise<ILeaderboard[]> {
    const leaderboard = this.model.getTeamsArray();
    return leaderboard;
  }

  findAllAway(): Promise<ILeaderboard[]> {
    const leaderboard = this.model.getTeamsArrayAway();
    return leaderboard;
  }
}
