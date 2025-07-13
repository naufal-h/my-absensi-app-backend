import { Router } from "express";
import pool from "../db/pool";

const router = Router();

router.get("/karyawan", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        u.id, u.email,
        p.name, p.division, p.position
      FROM users u
      JOIN karyawan p ON u.id = p.user_id
      WHERE u.role = 'employee'
    `);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal ambil data users" });
  }
});

router.post("/karyawan", async (req, res) => {
  const { email, name, division, position } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: "Email dan nama wajib diisi" });
  }

  try {
    const [userRows] = await pool.query(
      "SELECT id FROM users WHERE email = ? AND role = 'employee'",
      [email]
    );

    const user = (userRows as any[])[0];
    if (!user) {
      return res
        .status(404)
        .json({ error: "User dengan email ini tidak ditemukan" });
    }

    const [profileRows] = await pool.query(
      "SELECT id FROM karyawan WHERE user_id = ?",
      [user.id]
    );
    if ((profileRows as any[]).length > 0) {
      return res.status(400).json({ error: "User ini sudah memiliki profil" });
    }

    await pool.query(
      "INSERT INTO karyawan (user_id, name, division, position) VALUES (?, ?, ?, ?)",
      [user.id, name, division, position]
    );

    res.status(201).json({ message: "Profil berhasil ditambahkan" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal menambahkan profil" });
  }
});

router.put("/karyawan", async (req, res) => {
  const { email, name, division, position } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: "Email dan nama wajib diisi" });
  }

  try {
    const [userRows] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    const user = (userRows as any[])[0];
    if (!user) {
      return res.status(404).json({ error: "User tidak ditemukan" });
    }

    const [profileRows] = await pool.query(
      "SELECT id FROM karyawan WHERE user_id = ?",
      [user.id]
    );

    if ((profileRows as any[]).length === 0) {
      return res.status(404).json({ error: "Profil karyawan tidak ditemukan" });
    }

    await pool.query(
      "UPDATE karyawan SET name = ?, division = ?, position = ? WHERE user_id = ?",
      [name, division, position, user.id]
    );

    res.json({ message: "Profil berhasil diupdate" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal update profil" });
  }
});

router.delete("/karyawan/:user_id", async (req, res) => {
  const { user_id } = req.params;

  try {
    const [rows] = await pool.query(
      "SELECT id FROM karyawan WHERE user_id = ?",
      [user_id]
    );
    if ((rows as any[]).length === 0) {
      return res.status(404).json({ error: "Profil tidak ditemukan" });
    }

    await pool.query("DELETE FROM karyawan WHERE user_id = ?", [user_id]);

    res.json({ message: "Profil berhasil dihapus" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal menghapus profil" });
  }
});

export default router;
