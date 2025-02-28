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
  const { amount, payment_method, rental_id } = req.body;

  if (!amount || !payment_method || !rental_id) {
    return res.status(400).json({ error: 'Amount, payment method, and rental ID are required' });
  }

  const createdAt = new Date().toISOString();
  const updateAt = createdAt;  // Assuming both are the same at creation time

  const sql = 'INSERT INTO payments (amount, payment_method, rental_id, createdAt, updateAt) VALUES (?, ?, ?, ?, ?)';
  
  db.run(sql, [amount, payment_method, rental_id, createdAt, updateAt], function (err) {
    if (err) {
      console.error('Error inserting payment:', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ id: this.lastID, amount, payment_method, rental_id, createdAt, updateAt });
  });
};
