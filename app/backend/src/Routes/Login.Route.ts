import { Router } from 'express';
import loginFactory from '../factories/loginFactory';
import loginMiddleware from '../middlewares/loginMiddlewares';
// import JWT from '../helpers/jwt';
import jwtValidator from '../helpers/jwtValidator';
import LoginController from '../controllers/Login.controller';

const router = Router();

router.post('/', loginMiddleware, (req, res, next) => loginFactory().Login(req, res, next));

router.get(
  '/validate',
  jwtValidator,
  (req, res) => LoginController.returnRole(req, res),
);

export default router;
