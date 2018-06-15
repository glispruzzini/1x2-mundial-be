import * as express from "express";
import userRouting from "./routings/user.routing";
const router = express.Router();

router.use("/user", userRouting);

export default router;
