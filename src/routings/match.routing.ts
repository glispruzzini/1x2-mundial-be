import { Router } from "express";

import { MatchController } from "../controllers/match.controller";

const router = Router();

const MatchCtrl = new MatchController();

router.get("/", MatchCtrl.getTodaysMatches);

export default router;
