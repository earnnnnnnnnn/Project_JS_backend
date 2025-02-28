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

  const sql = 'INSERT INTO users (username, password, email, phone_number, createdAt, updateAt) VALUES (?, ?, ?, ?, ?, ?)';
  
  db.run(sql, [username, password, email, phone_number, createdAt, updateAt], function (err) {
    if (err) {
      console.error('Error inserting user:', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ id: this.lastID, username, email, phone_number, createdAt, updateAt });
  });
};
