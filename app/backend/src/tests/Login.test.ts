import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User.models';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota POST do login', () => {
  const validLoginData = {
    email: 'user@user.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  }
  const invalidLoginEmail = {
    email: 'user@usercom', // SEM @
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  }
  const validLoginReturn = {
    id: 5,
    username: 'user',
    role: 'user',
    email: 'user@user.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
  }

  describe('Sucesso no login', () => {
    let chaiHttpResponse: Response;

    before(() => {
      sinon.stub(User, 'findOne').resolves(validLoginReturn as User)
    });

    after(() => {
      (User.findOne as sinon.SinonStub).restore()
    })
  
    it('Retorna status 200', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send(validLoginData);
      expect(chaiHttpResponse).to.have.status(200);
    });
    it('Retorna um token', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send(validLoginData);
      expect(chaiHttpResponse.body).to.have.key('token')
    })
  });

  describe('Falha no login - email inválido', () => {
    let chaiHttpResponse: Response;

    it('Retorna status 400', async () => {
      chaiHttpResponse = await await chai.request(app).post('/login').send(invalidLoginEmail);
      expect (chaiHttpResponse).to.have.status(400);
    })
  })

});

describe ('Teste da rota GET do login', () => {
  describe('sucesso no retorno', () => {
    let chaiHttpResponse: Response;
  })
})
