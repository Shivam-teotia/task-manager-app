import express from "express";
import cors from "cors";
import morgan from "morgan";
import { env } from "./config/env";
import { notFound, errorHandler } from "./middleware/errorHandler";
import taskRoutes from "./routes/taskRoutes";
import voiceRoutes from "./routes/voiceRoutes";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({ origin: env.CLIENT_ORIGIN }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use("/api/tasks", taskRoutes);
app.use("/api/voice", voiceRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
