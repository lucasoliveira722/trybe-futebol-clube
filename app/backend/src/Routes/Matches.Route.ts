import { Router } from 'express';
import MatchesFactory from '../factories/MatchesFactory';

const router = Router();

router.get('/', (req, res, next) => MatchesFactory().findAll(req, res, next));

export default router;
