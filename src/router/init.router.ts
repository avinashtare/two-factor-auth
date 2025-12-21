import { Router } from "express";
import apiRouter from "./api.router";

const router = Router();

// initial route
router.get("/", (req, res) => {
  res.json({ success: true, message: "Server In Running" });
});

router.use("/api", apiRouter);

export default router;
