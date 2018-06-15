import * as express from "express";
import matchRouting from "./routings/match.routing";
import betRouting from "./routings/bet.routing";

const router = express.Router();

router.use("/matches", matchRouting);
router.use("/bet", betRouting);

export default router;
