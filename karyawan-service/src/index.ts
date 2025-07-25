import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import cookieParser from "cookie-parser";
import karyawanRoutes from "./routes/karyawan.routes";

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

app.use("/api", karyawanRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`✅ Karyawan service running at http://localhost:${PORT}`);
});
