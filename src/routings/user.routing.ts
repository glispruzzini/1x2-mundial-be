import { Router } from "express";

import { UserController } from "../controllers/user.controller";

const router = Router();

const UsrCtrl = new UserController();

router.post("/", UsrCtrl.createUser);

export default router;
