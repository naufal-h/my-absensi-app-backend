import bcrypt from "bcrypt";
import { Router } from "express";
import jwt from "jsonwebtoken";
import { RowDataPacket } from "mysql2";
import pool from "../db/pool";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "rahasia";

interface User extends RowDataPacket {
  id: number;
  email: string;
  password: string;
  role: "admin" | "employee";
}

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email dan password wajib diisi" });

  try {
    const [rows] = await pool.query<User[]>(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    const user = rows[0];
    if (!user) return res.status(401).json({ error: "Email tidak ditemukan" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Password salah" });

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, role: user.role },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ message: "Login berhasil", role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  res.json({ message: "Logout berhasil" });
});

router.get("/me", verifyToken, (req, res) => {
  const user = req.user;
  res.json(user);
});

export default router;
