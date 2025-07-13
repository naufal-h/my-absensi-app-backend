import { Router } from "express";
import pool from "../db/pool";
import { upload } from "../middleware/upload";

export const router = Router();

router.post("/absensi", async (req, res) => {
  const { user_id, timestamp, photo } = req.body;

  if (!user_id || !timestamp) {
    return res.status(400).json({ error: "user_id dan timestamp wajib diisi" });
  }

  try {
    const [existing] = await pool.query(
      `SELECT id FROM absensi WHERE user_id = ? AND DATE(timestamp) = CURDATE()`,
      [user_id]
    );
    if ((existing as any[]).length > 0) {
      return res.status(400).json({ error: "Kamu sudah absen hari ini" });
    }

    await pool.query(
      `INSERT INTO absensi (user_id, timestamp, photo) VALUES (?, ?, ?)`,
      [user_id, timestamp, photo || null]
    );

    res.status(201).json({ message: "Absensi berhasil disimpan" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal menyimpan absensi" });
  }
});

router.get("/absensi/me", async (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ error: "user_id wajib diisi" });
  }

  try {
    const [rows] = await pool.query(
      `SELECT k.name, u.email, a.timestamp, a.photo
       FROM absensi a
       JOIN users u ON a.user_id = u.id
       JOIN karyawan k ON u.id = k.user_id
       WHERE u.id = ?
       ORDER BY a.timestamp DESC
      `,
      [user_id]
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal mengambil data absensi" });
  }
});

router.get("/absensi/all", async (_req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT k.name, u.email, a.timestamp, a.photo
       FROM absensi a
       JOIN users u ON a.user_id = u.id
       JOIN karyawan k ON u.id = k.user_id
       ORDER BY a.timestamp DESC`
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal mengambil semua data absensi" });
  }
});

router.get("/absensi/me-today", async (req, res) => {
  const { user_id } = req.query;
  if (!user_id) {
    return res.status(400).json({ error: "user_id wajib diisi" });
  }

  try {
    const [rows] = await pool.query(
      `SELECT id FROM absensi WHERE user_id = ? AND DATE(timestamp) = CURDATE()`,
      [user_id]
    );
    const sudahAbsen = (rows as any[]).length > 0;
    res.json({ alreadyAttended: sudahAbsen });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal cek absensi" });
  }
});

router.post("/upload", upload.single("photo"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

export default router;
