const db = require('../config/database');

exports.getUsers = (req, res) => {
  const sql = 'SELECT * FROM users';
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error fetching users:', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(rows);
  });
};

exports.createUser = (req, res) => {
  const { username, password, email, phone_number } = req.body;

  // ตรวจสอบข้อมูลที่จำเป็น
  if (!username || !password || !email || !phone_number) {
    return res.status(400).json({ error: 'All fields (username, password, email, phone_number) are required' });
  }

  const createdAt = new Date().toISOString();
  const updateAt = createdAt;  // ใช้เวลาเดียวกันสำหรับ `createdAt` และ `updateAt`

  const sql = 'INSERT INTO users (username, password, email, phone_number) VALUES (?, ?, ?, ?)';
  
db.run(`
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone_number TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    updateAt TEXT NOT NULL)
    `);
};
