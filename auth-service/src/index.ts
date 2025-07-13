import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import pool from "./db/pool";
import authRoutes from "./routes/auth.routes";

import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);

const PORT = process.env.PORT || 3001;

app.get("/api/ping", async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query("SELECT 1 + 1 AS hasil");
    conn.release();

    res.json({ message: "Pong!", result: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal konek ke database" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Auth service running at http://localhost:${PORT}`);
});
