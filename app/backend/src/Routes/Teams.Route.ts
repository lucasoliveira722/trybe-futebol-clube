import { Router } from 'express';
import TeamsFactory from '../factories/TeamsFactory';

const router = Router();

router.get('/', (req, res, next) => TeamsFactory().findAll(req, res, next));

export default router;
