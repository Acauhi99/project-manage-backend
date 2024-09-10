import dotenv from "dotenv";

dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET não está definida");
}

export const JWT_SECRET = process.env.JWT_SECRET;
