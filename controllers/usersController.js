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
  const sql = 'INSERT INTO users (username, password, email, phone_number) VALUES (?, ?, ?, ?)';
  
  db.run(sql, [username, password, email, phone_number], function (err) {
    if (err) {
      console.error('Error inserting user:', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ id: this.lastID, username, email, phone_number });
  });
};
