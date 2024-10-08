import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRouter from "./auth/router";
import projectRouter from "./project/router";
import userRouter from "./user/router";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api", projectRouter);
app.use("/api", userRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Gerenciamento Projetos API" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Abra o servidor em: http://localhost:${PORT}`);
});
