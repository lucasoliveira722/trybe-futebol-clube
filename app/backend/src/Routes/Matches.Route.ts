import { Router } from 'express';
import jwtValidator from '../helpers/jwtValidator';
import MatchesFactory from '../factories/MatchesFactory';

const router = Router();

router.get('/', (req, res, next) => MatchesFactory().findAll(req, res, next));
router.post('/', jwtValidator, (req, res, next) => MatchesFactory().create(req, res, next));

export default router;
