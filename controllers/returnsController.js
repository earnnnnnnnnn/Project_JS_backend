const db = require('../config/database');

exports.getUsers = (req, res) => {
  const sql = 'SELECT * FROM returns';
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error fetching returns:', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(rows);
  });
};

exports.createUser = (req, res) => {
  const { rental_id, return_date, condition, extra_charge } = req.body;

  // ตรวจสอบว่าข้อมูลที่จำเป็นครบถ้วน
  if (!rental_id || !return_date || !condition || !extra_charge) {
    return res.status(400).json({ error: 'All fields (rental_id, return_date, condition, extra_charge) are required' });
  }

  const createdAt = new Date().toISOString();
  const updateAt = createdAt;  // ใช้เวลาเดียวกันสำหรับ `createdAt` และ `updateAt`

  const sql = 'INSERT INTO returns (rental_id, return_date, condition, extra_charge, createdAt, updateAt) VALUES (?, ?, ?, ?, ?, ?)';
  
  db.run(sql, [rental_id, return_date, condition, extra_charge, createdAt, updateAt], function (err) {
    if (err) {
      console.error('Error inserting return:', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ id: this.lastID, rental_id, return_date, condition, extra_charge, createdAt, updateAt });
  });
};
