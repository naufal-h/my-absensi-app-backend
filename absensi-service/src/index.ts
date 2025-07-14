import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";

import cookieParser from "cookie-parser";
import absensiRoutes from "./routes/absensi.routes";

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

app.use("/api", absensiRoutes);

const PORT = process.env.PORT || 3001;

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(PORT, () => {
  console.log(`✅ Absensi service running at http://localhost:${PORT}`);
});
