import { Router } from "express";
import { parseVoice } from "../controller/voiceController";

const router = Router();

router.post("/parse", parseVoice);

export default router;
