import * as express from "express";
import matchRouting from "./routings/match.routing";

const router = express.Router();

router.use("/matches", matchRouting);
router.use("/bet", matchRouting);

export default router;
