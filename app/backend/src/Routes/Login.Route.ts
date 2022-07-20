import { Router } from 'express';
import loginFactory from '../factories/loginFactory';
import loginMiddleware from '../middlewares/loginMiddlewares';

const router = Router();

router.post('/', loginMiddleware, (req, res, next) => loginFactory().Login(req, res, next));

export default router;
