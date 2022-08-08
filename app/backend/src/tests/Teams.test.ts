import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/Teams.models';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota GET do teams ', () => {
  const teamsList = [
    {
      "id": 1,
      "teamName": "Avaí/Kindermann"
    },
    {
      "id": 2,
      "teamName": "Bahia"
    },
    {
      "id": 3,
      "teamName": "Botafogo"
    },
    {
      "id": 4,
      "teamName": "Corinthians"
    },
    {
      "id": 5,
      "teamName": "Cruzeiro"
    },
    {
      "id": 6,
      "teamName": "Ferroviária"
    },
    {
      "id": 7,
      "teamName": "Flamengo"
    },
    {
      "id": 8,
      "teamName": "Grêmio"
    },
    {
      "id": 9,
      "teamName": "Internacional"
    },
    {
      "id": 10,
      "teamName": "Minas Brasília"
    },
    {
      "id": 11,
      "teamName": "Napoli-SC"
    },
    {
      "id": 12,
      "teamName": "Palmeiras"
    },
    {
      "id": 13,
      "teamName": "Real Brasília"
    },
    {
      "id": 14,
      "teamName": "Santos"
    },
    {
      "id": 15,
      "teamName": "São José-SP"
    },
    {
      "id": 16,
      "teamName": "São Paulo"
    }
  ]

  const teamById = {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  }

  describe('Sucesso no GET teams', () => {
    let chaiHttpResponse: Response;

    before(() => sinon.stub(Teams, 'findAll').resolves(teamsList as Teams[]))
    after(() => (Teams.findAll as sinon.SinonStub).restore())

    it('Retorna status 200', async () => {
      chaiHttpResponse = await chai.request(app).get('/teams');
      expect(chaiHttpResponse).to.have.status(200);
    })
  });

  describe('Sucesso no GET team by Id', () => {
    let chaiHttpResponse: Response;

    before(() => sinon.stub(Teams, 'findByPk').resolves(teamById as Teams))
    after(() => (Teams.findByPk as sinon.SinonStub).restore())

    it('Retorna status 200', async () => {
      chaiHttpResponse = await chai.request(app).get('/teams/1');
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('Resultado possua as chaves "teamName" e "id" ', () => {
      expect(chaiHttpResponse.body).to.have.keys('id', 'teamName')
    })

  })
});
