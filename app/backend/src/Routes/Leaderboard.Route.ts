import { Router } from 'express';
import LeaderboardFactory from '../factories/LeaderboardFactory';

const router = Router();

router.get('/home', (req, res, next) => LeaderboardFactory().findAll(req, res, next));
router.get('/away', (req, res, next) => LeaderboardFactory().findAllAway(req, res, next));

export default router;
