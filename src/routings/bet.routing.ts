import { Router } from "express";

import { BetController } from "../controllers/bet.controller";

const router = Router();

const BetCtrl = new BetController();

router.post("/", BetCtrl.addBet);
router.get('/', BetCtrl.getBets);

export default router;
