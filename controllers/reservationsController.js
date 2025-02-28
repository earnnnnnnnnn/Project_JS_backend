const db = require('../config/database');

exports.getUsers = (req, res) => {
  const sql = 'SELECT * FROM reservations';
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error fetching reservations:', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(rows);
  });
};

exports.createUser = (req, res) => {
  const { reservation_date, status, user_id, camera_id } = req.body;

  // ตรวจสอบว่าข้อมูลที่จำเป็นครบถ้วน
  if (!reservation_date || !status || !user_id || !camera_id) {
    return res.status(400).json({ error: 'All fields (reservation_date, status, user_id, camera_id) are required' });
  }

  const createdAt = new Date().toISOString();
  const updateAt = createdAt;  // ใช้เวลาเดียวกันสำหรับ `createdAt` และ `updateAt`

  const sql = 'INSERT INTO reservations (reservation_date, status, user_id, camera_id, createdAt, updateAt) VALUES (?, ?, ?, ?, ?, ?)';
  
  db.run(sql, [reservation_date, status, user_id, camera_id, createdAt, updateAt], function (err) {
    if (err) {
      console.error('Error inserting reservation:', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ id: this.lastID, reservation_date, status, user_id, camera_id, createdAt, updateAt });
  });
};
