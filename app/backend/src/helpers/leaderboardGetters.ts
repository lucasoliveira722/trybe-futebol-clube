import { IMatches } from '../interfaces';

const utils = {
  getTotalGames(teamName: string, matchesList: IMatches[]) {
    return matchesList.filter((games: IMatches) => games?.teamHome?.teamName === teamName).length;
  },

  getTotalGamesAway(teamName: string, matchesList: IMatches[]) {
    return matchesList.filter((games: IMatches) => games?.teamAway?.teamName === teamName).length;
  },

  getTotalVictories(teamName: string, matchesList: IMatches[]) {
    const victories = matchesList
      .filter((games:IMatches) => games.teamHome?.teamName === teamName
      && games.homeTeamGoals > games.awayTeamGoals).length;
    return victories;
  },

  getTotalVictoriesAway(teamName: string, matchesList: IMatches[]) {
    const victories = matchesList
      .filter((games:IMatches) => games.teamAway?.teamName === teamName
      && games.awayTeamGoals > games.homeTeamGoals).length;
    return victories;
  },

  getTotalDraws(teamName: string, matchesList: IMatches[]) {
    const draws = matchesList
      .filter((games:IMatches) => games.teamHome?.teamName === teamName
      && games.homeTeamGoals === games.awayTeamGoals).length;
    return draws;
  },

  getTotalDrawsAway(teamName: string, matchesList: IMatches[]) {
    const draws = matchesList
      .filter((games:IMatches) => games.teamAway?.teamName === teamName
      && games.awayTeamGoals === games.homeTeamGoals).length;
    return draws;
  },

  getTotalLosses(teamName: string, matchesList: IMatches[]) {
    const losses = matchesList
      .filter((games:IMatches) => games.teamHome?.teamName === teamName
      && games.homeTeamGoals < games.awayTeamGoals).length;
    return losses;
  },

  getTotalLossesAway(teamName: string, matchesList: IMatches[]) {
    const losses = matchesList
      .filter((games:IMatches) => games.teamAway?.teamName === teamName
      && games.awayTeamGoals < games.homeTeamGoals).length;
    return losses;
  },

  getGoalsFavor(teamName: string, matchesList: IMatches[]) {
    const listGames = matchesList.filter((games:IMatches) => games.teamHome?.teamName === teamName);
    const totalGoals = listGames.reduce((acc: number, curr: IMatches) => {
      const resultGoals = acc + curr.homeTeamGoals;
      return resultGoals;
    }, 0);
    return totalGoals;
  },

  getGoalsFavorAway(teamName: string, matchesList: IMatches[]) {
    const listGames = matchesList.filter((games:IMatches) => games.teamAway?.teamName === teamName);
    const totalGoals = listGames.reduce((acc: number, curr: IMatches) => {
      const resultGoals = acc + curr.awayTeamGoals;
      return resultGoals;
    }, 0);
    return totalGoals;
  },

  getGoalsOwn(teamName: string, matchesList: IMatches[]) {
    const listGames = matchesList.filter((games:IMatches) => games.teamHome?.teamName === teamName);
    const totalGoals = listGames.reduce((acc: number, curr: IMatches) => {
      const resultGoals = acc + curr.awayTeamGoals;
      return resultGoals;
    }, 0);
    return totalGoals;
  },

  getGoalsOwnAway(teamName: string, matchesList: IMatches[]) {
    const listGames = matchesList.filter((games:IMatches) => games.teamAway?.teamName === teamName);
    const totalGoals = listGames.reduce((acc: number, curr: IMatches) => {
      const resultGoals = acc + curr.homeTeamGoals;
      return resultGoals;
    }, 0);
    return totalGoals;
  },

  getGoalsBalance(teamName: string, matchesList: IMatches[]) {
    const goalsFavor = this.getGoalsFavor(teamName, matchesList);
    const goalsOwn = this.getGoalsOwn(teamName, matchesList);
    return goalsFavor - goalsOwn;
  },

  getGoalsBalanceAway(teamName: string, matchesList: IMatches[]) {
    const goalsFavor = this.getGoalsFavorAway(teamName, matchesList);
    const goalsOwn = this.getGoalsOwnAway(teamName, matchesList);
    return goalsFavor - goalsOwn;
  },

  getTotalPoints(teamName: string, matchesList: IMatches[]) {
    const victories = this.getTotalVictories(teamName, matchesList);
    const draws = this.getTotalDraws(teamName, matchesList);

    return (victories * 3) + draws;
  },

  getTotalPointsAway(teamName: string, matchesList: IMatches[]) {
    const victories = this.getTotalVictoriesAway(teamName, matchesList);
    const draws = this.getTotalDrawsAway(teamName, matchesList);

    return (victories * 3) + draws;
  },

  getEfficiency(teamName: string, matchesList: IMatches[]) {
    const points = this.getTotalPoints(teamName, matchesList);
    const games = this.getTotalGames(teamName, matchesList);

    return Number(((points / (games * 3)) * 100).toFixed(2));
  },

  getEfficiencyAway(teamName: string, matchesList: IMatches[]) {
    const points = this.getTotalPointsAway(teamName, matchesList);
    const games = this.getTotalGamesAway(teamName, matchesList);

    return Number(((points / (games * 3)) * 100).toFixed(2));
  },

};

export default utils;

// NOTAÇÃO DE ? NOS games.teamHome TIRADO DE https://bobbyhadz.com/blog/typescript-object-is-possibly-null#:~:text=The%20%22Object%20is%20possibly%20'null,not%20null%20before%20accessing%20properties.
