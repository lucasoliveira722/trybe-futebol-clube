import { Request } from 'express';

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
}

export interface IInsertMatch {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IMatchesModel {
  findAll(): Promise<IMatches[]>
  create(insertedMatch: IInsertMatch): Promise<IMatches>
}

export interface IMatchesService {
  findAll(): Promise<IMatches[]>
  create(insertedMatch: IInsertMatch): Promise<IMatches>
}
