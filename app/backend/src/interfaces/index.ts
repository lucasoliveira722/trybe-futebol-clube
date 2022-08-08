import { Request } from 'express';
import Matches from '../database/models/Matches.models';

// LOGIN INTERFACES

export interface IUser {
  username: string;
  email: string;
  role: string;
  password: string;
}

export type IUserLogin = Omit<IUser, 'username' >;

export interface IUserModel {
  findAll(data: IUserLogin): Promise<IUser[]>
}

export interface IUserService {
  login(data: IUserLogin): Promise<string>
}

export type JwtLogin = {
  email: string;
  role: string;
  password: string;
};

export interface UserRequest extends Request {
  user?: string | object
}

export type TokenResponse = {
  email: string;
  role: string;
  password: string;
};

// TEAMS INTERFACES

export interface ITeams {
  id: number;
  teamName: string;
}

export interface ITeamsModel {
  findAll(): Promise<ITeams[]>
  findByPk(id: number): Promise<ITeams | null>
}

export interface ITeamsService {
  findAll(): Promise<ITeams[]>
  findByPk(id: number): Promise<ITeams | null>
}

// MATCHES INTERFACES

export interface IMatches {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress?: boolean;
  teamHome?: teamHome;
  teamAway?: teamAway;
}

export interface IMatchesTest extends Matches {
  teamHome: {
    teamName: string
  },
  teamAway: {
    teamName: string
  }
}

export interface teamHome {
  teamName: string;
}

export interface teamAway {
  teamName: string;
}

export interface IInsertMatch {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IUpdateGoals {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IMatchesModel {
  findAll(): Promise<IMatches[]>
  create(insertedMatch: IInsertMatch): Promise<IMatches>
  updateProgress(id: number): Promise<string>
  updateGoals(id: number, newGoals: IUpdateGoals): Promise<string>
}

export interface IMatchesService {
  findAll(): Promise<IMatches[]>
  create(insertedMatch: IInsertMatch): Promise<IMatches>
  updateProgress(id: number): Promise<string>
  updateGoals(id: number, newGoals: IUpdateGoals): Promise<string>
}

// LEADERBOARD INTERFACES

export interface ILeaderboard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

export interface ILeaderboardModel {
  findAll(): Promise<IMatches[]>
  getTeamsArray(): Promise<ILeaderboard[]>;
  getTeamsArrayAway(): Promise<ILeaderboard[]>;
}

export interface ILeaderboardService {
  findAll(): Promise<ILeaderboard[]>
  findAllAway(): Promise<ILeaderboard[]>
}
