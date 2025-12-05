import dotenv from "dotenv";

dotenv.config();
export const env = {
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: Number(process.env.PORT) || 5000,
    MONGO_URI: process.env.MONGO_URI as string,
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,
};
