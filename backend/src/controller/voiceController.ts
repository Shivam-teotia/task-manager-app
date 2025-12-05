import { Request, Response, NextFunction } from "express";
import { parseVoiceTask } from "../services/voiceParser";

export const parseVoice = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { transcript } = req.body;
        if (!transcript) {
            return res.status(400).json({ message: "Transcript is required" });
        }
        const parsed = parseVoiceTask(transcript);
        res.json(parsed);
    } catch (err) {
        next(err);
    }
};
