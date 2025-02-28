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
  const { camerasname, brand, model, status, rental_price_per_day, replacement_cost } = req.body;

  if (!camerasname || !brand || !model || !status || !rental_price_per_day || !replacement_cost) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const createdAt = new Date().toISOString();
  const updateAt = createdAt;  // Assuming the camera is just added, both will be the same

  const sql = 'INSERT INTO cameras (camerasname, brand, model, status, rental_price_per_day, replacement_cost, createdAt, updateAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  
  db.run(sql, [camerasname, brand, model, status, rental_price_per_day, replacement_cost, createdAt, updateAt], function (err) {
    if (err) {
      console.error('Error inserting camera:', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ id: this.lastID, camerasname, brand, model, status, rental_price_per_day, replacement_cost, createdAt, updateAt });
  });
};
