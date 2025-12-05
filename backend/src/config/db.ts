import mongoose from "mongoose";
import { env } from "./env";

const mongoURI: string = env.MONGO_URI;

mongoose
    .connect(mongoURI)
    .then(() => console.log("MongoDB connection successful"))
    .catch((error) => {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    });
