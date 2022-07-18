import { Router } from 'express';
import loginFactory from '../factories/loginFactory';

const router = Router();

router.post('/', (req, res, next) => loginFactory().Login(req, res, next));

export default router;
