import { Router } from "express";
import authRouter from "./auth.route";
import uploadRouter from "./upload.route";
import noteRouter from "./noteRoutes";
import requireAuth from "./../middlewares/requireAuth.middleware";
const router = Router();

// router.use("/auth", authRouter);
router.use("/upload", uploadRouter);
router.use("/notes", requireAuth, noteRouter);

export default router;
