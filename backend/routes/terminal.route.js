import { Router } from "express";
import { handleTerminalCommand } from "../controllers/terminal.controller.js";

const router = Router();

router.post("/terminal", handleTerminalCommand);

export default router;
