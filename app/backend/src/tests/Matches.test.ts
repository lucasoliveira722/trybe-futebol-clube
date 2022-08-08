import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/Matches.models';
import { Response } from 'superagent';
import { IMatchesTest } from '../interfaces';
import Teams from '../database/models/Teams.models';

chai.use(chaiHttp);

const { expect } = chai;

describe('teste da rota GET matches', () => {
  const matchesList = [
    {
      "id": 1,
      "homeTeam": 16,
      "homeTeamGoals": 1,
      "awayTeam": 8,
      "awayTeamGoals": 1,
      "inProgress": false,
      "teamHome": {
        "teamName": "São Paulo"
      },
      "teamAway": {
        "teamName": "Grêmio"
      }
    },
    {
      "id": 2,
      "homeTeam": 9,
      "homeTeamGoals": 1,
      "awayTeam": 14,
      "awayTeamGoals": 1,
      "inProgress": false,
      "teamHome": {
        "teamName": "Internacional"
      },
      "teamAway": {
        "teamName": "Santos"
      }
    },
    {
      "id": 3,
      "homeTeam": 4,
      "homeTeamGoals": 3,
      "awayTeam": 11,
      "awayTeamGoals": 0,
      "inProgress": false,
      "teamHome": {
        "teamName": "Corinthians"
      },
      "teamAway": {
        "teamName": "Napoli-SC"
      }
    },
  ]

  describe('Sucesso no GET matches', () => {
    let chaiHttpResponse: Response;

    before(() => sinon.stub(Matches, 'findAll').resolves(matchesList as IMatchesTest[]));
    after(() => (Matches.findAll as sinon.SinonStub).restore())

    it('Retorna status 200', async () => {
      chaiHttpResponse = await chai.request(app).get('/matches');
      expect(chaiHttpResponse).to.have.status(200);
    })
  })
});

describe('teste da rota POST matches', () => {
  const insertedNewMatch = {
    "homeTeam": 16,
    "awayTeam": 8,
    "homeTeamGoals": 2,
    "awayTeamGoals": 2
  }

  const returnNewMatch = {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 8,
    "awayTeamGoals": 2,
    "inProgress": true,
  }

  const insertedTeam = {
		"id": 1,
		"teamName": "Avaí/Kindermann"
	}

  const loginData = {
      email: 'user@user.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  }

  describe('Sucesso ao inserir nova partida', () => {
    let chaiHttpResponse: Response;

    before(() => {
    sinon.stub(Teams, 'findByPk').resolves(insertedTeam as Teams);
    sinon.stub(Matches, 'create').resolves(returnNewMatch as Matches);
  })

    after(() => {
      (Teams.findByPk as sinon.SinonStub).restore();
      (Matches.create as sinon.SinonStub).restore();
    })

    it('Retorna status 201', async () => {
      const { body: { token } } = await  chai.request(app).post('/login').send(loginData)
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set('authorization', token)
        .send(insertedNewMatch);

        expect(chaiHttpResponse).to.have.status(401);
    })
})
})
