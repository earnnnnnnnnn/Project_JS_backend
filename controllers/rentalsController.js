const db = require('../config/database');

exports.getUsers = (req, res) => {
  const sql = 'SELECT * FROM rentals';
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error fetching rentals:', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(rows);
  });
};

exports.createUser = (req, res) => {
  const { start_date, end_date, total_price, status, camera_id } = req.body;

  // ตรวจสอบว่าข้อมูลที่จำเป็นครบถ้วน
  if (!start_date || !end_date || !total_price || !status || !camera_id) {
    return res.status(400).json({ error: 'All fields (start_date, end_date, total_price, status, camera_id) are required' });
  }

  const createdAt = new Date().toISOString();
  const updateAt = createdAt;  // ใช้เวลาเดียวกันสำหรับ `createdAt` และ `updateAt`

  const sql = 'INSERT INTO rentals (start_date, end_date, total_price, status, camera_id, createdAt, updateAt) VALUES (?, ?, ?, ?, ?, ?, ?)';
  
  db.run(sql, [start_date, end_date, total_price, status, camera_id, createdAt, updateAt], function (err) {
    if (err) {
      console.error('Error inserting rental:', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ id: this.lastID, start_date, end_date, total_price, status, camera_id, createdAt, updateAt });
  });
};
