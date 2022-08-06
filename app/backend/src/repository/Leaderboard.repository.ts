import Matches from '../database/models/Matches.models';
import Teams from '../database/models/Teams.models';
import { ILeaderboard, ILeaderboardModel, IMatches } from '../interfaces';
import utils from '../helpers/leaderboardGetters';

export default class LeaderboardRepository implements ILeaderboardModel {
  constructor(private matchModel = Matches) {
    this.matchModel = matchModel;
  }

  async findAll(): Promise<IMatches[]> {
    const matchesList = await this.matchModel.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
      where: { inProgress: false },
    });

    return matchesList;
  }

  // FUNÇÕES UTILIZADAS NO ENDPOINT leaderboard/home

  static setObject(curr: Required<IMatches>, matchesList: IMatches[]) {
    const objFormat = {
      name: curr.teamHome.teamName,
      totalPoints: utils.getTotalPoints(curr.teamHome.teamName, matchesList),
      totalGames: utils.getTotalGames(curr.teamHome.teamName, matchesList),
      totalVictories: utils.getTotalVictories(curr.teamHome.teamName, matchesList),
      totalDraws: utils.getTotalDraws(curr.teamHome.teamName, matchesList),
      totalLosses: utils.getTotalLosses(curr.teamHome.teamName, matchesList),
      goalsFavor: utils.getGoalsFavor(curr.teamHome.teamName, matchesList),
      goalsOwn: utils.getGoalsOwn(curr.teamHome.teamName, matchesList),
      goalsBalance: utils.getGoalsBalance(curr.teamHome.teamName, matchesList),
      efficiency: utils.getEfficiency(curr.teamHome.teamName, matchesList),
    };
    return objFormat;
  }

  async getTeamsArray(): Promise<ILeaderboard[]> {
    const matchesList = await this.findAll();
    const homeTeams = matchesList.reduce((acc: ILeaderboard[], curr: IMatches) => {
      if (!acc.some((team: ILeaderboard) => team.name === curr.teamHome?.teamName)) {
        acc.push(LeaderboardRepository.setObject(curr as Required<IMatches>, matchesList));
      }
      return acc;
    }, []);

    const leaderboardList = homeTeams.sort((a: ILeaderboard, b: ILeaderboard) =>
      (b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn
      ));
    return leaderboardList;
  }

  static filterArray(a:ILeaderboard, b:ILeaderboard) {
    return (b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn
    );
  }
}
