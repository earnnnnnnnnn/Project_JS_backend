const db = require('../config/database');

exports.getUsers = (req, res) => {
  const sql = 'SELECT * FROM payments';
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error fetching payments:', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(rows);
  });
};

exports.createUser = (req, res) => {
  const { username, password, email, phone_number } = req.body;
  const sql = 'INSERT INTO payments (amount, payment_method, rental_id, createdAt, updateAt) VALUES (?, ?, ?, ?, ?)';
  
  db.run(sql, [username, password, email, phone_number], function (err) {
    if (err) {
      console.error('Error inserting payments:', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ id: this.lastID, username, email, phone_number });
  });
};
