import { Router } from "express";
import authRouter from "./auth.route.js";
import uploadRouter from "./upload.route.js";
import noteRouter from "./noteRoutes.js";
import requireAuth from "../middlewares/requireAuth.middleware.js";
const router = Router();

router.use("/auth", authRouter);
router.use("/upload", uploadRouter);
router.use("/notes", requireAuth, noteRouter);

export default router;
