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

  static setObjectAway(curr: Required<IMatches>, matchesList: IMatches[]) {
    const objFormat = {
      name: curr.teamAway.teamName,
      totalPoints: utils.getTotalPointsAway(curr.teamAway.teamName, matchesList),
      totalGames: utils.getTotalGamesAway(curr.teamAway.teamName, matchesList),
      totalVictories: utils.getTotalVictoriesAway(curr.teamAway.teamName, matchesList),
      totalDraws: utils.getTotalDrawsAway(curr.teamAway.teamName, matchesList),
      totalLosses: utils.getTotalLossesAway(curr.teamAway.teamName, matchesList),
      goalsFavor: utils.getGoalsFavorAway(curr.teamAway.teamName, matchesList),
      goalsOwn: utils.getGoalsOwnAway(curr.teamAway.teamName, matchesList),
      goalsBalance: utils.getGoalsBalanceAway(curr.teamAway.teamName, matchesList),
      efficiency: utils.getEfficiencyAway(curr.teamAway.teamName, matchesList),
    };
    return objFormat;
  }

  async getTeamsArrayAway(): Promise<ILeaderboard[]> {
    const matchesList = await this.findAll();

    const awayTeams = matchesList.reduce((acc: ILeaderboard[], curr: IMatches) => {
      if (!acc.some((team) => team.name === curr.teamAway?.teamName)) {
        acc.push(LeaderboardRepository.setObjectAway(curr as Required<IMatches>, matchesList));
      }
      return acc;
    }, []);

    const filteredAwayTeams = LeaderboardRepository.filterArray(awayTeams);
    return filteredAwayTeams;
  }

  async getTeamsArray(): Promise<ILeaderboard[]> {
    const matchesList = await this.findAll();
    const homeTeams = matchesList.reduce((acc: ILeaderboard[], curr: IMatches) => {
      if (!acc.some((team: ILeaderboard) => team.name === curr.teamHome?.teamName)) {
        acc.push(LeaderboardRepository.setObject(curr as Required<IMatches>, matchesList));
      }
      return acc;
    }, []);

    const filteredHomeTeams = LeaderboardRepository.filterArray(homeTeams);
    return filteredHomeTeams;
  }

  static filterArray(list: ILeaderboard[]) {
    const filteredList = list.sort((a: ILeaderboard, b: ILeaderboard) =>
      (b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn
      ));
    return filteredList;
  }
}
