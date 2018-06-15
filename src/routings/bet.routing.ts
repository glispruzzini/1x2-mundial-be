import { Router } from "express";

import { BetController } from "../controllers/bet.controller";

const router = Router();

const BetCtrl = new BetController();

router.post("/", BetCtrl.addBet);
// TODO: remove in prod
router.post('/test', BetCtrl.addTestBet);

export default router;
