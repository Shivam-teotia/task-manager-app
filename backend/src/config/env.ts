import dotenv from "dotenv";

dotenv.config();
export const env = {
    PORT: Number(process.env.PORT) || 5000,
    MONGO_URI: process.env.MONGO_URI as string,
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,
};
