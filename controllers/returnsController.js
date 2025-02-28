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
  const { username, password, email, phone_number } = req.body;
  const sql = 'INSERT INTO returns (rental_id, return_date, condition, extra_charge, createdAt, updateAt) VALUES (?, ?, ?, ?, ?, ?)';
  
  db.run(sql, [username, password, email, phone_number], function (err) {
    if (err) {
      console.error('Error inserting returns:', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ id: this.lastID, username, email, phone_number });
  });
};
