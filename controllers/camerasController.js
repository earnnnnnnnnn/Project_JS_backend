const db = require('../config/database');

exports.getUsers = (req, res) => {
  const sql = 'SELECT * FROM cameras';
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error fetching cameras:', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(rows);
  });
};

exports.createUser = (req, res) => {
  const { username, password, email, phone_number } = req.body;
  const sql = 'INSERT INTO cameras (camerasname, brand, model, status, rental_price_per_day, replacement_cost, createdAt, updateAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  
  db.run(sql, [username, password, email, phone_number], function (err) {
    if (err) {
      console.error('Error inserting cameras:', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ id: this.lastID, username, email, phone_number });
  });
};
