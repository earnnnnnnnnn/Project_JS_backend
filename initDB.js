const db = require('./config/database');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      email TEXT NOT NULL,
      phone_number TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updateAt TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS cameras (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      brand TEXT NOT NULL,
      price_per_day REAL NOT NULL,
      available INTEGER DEFAULT 1
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS rentals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      camera_id INTEGER,
      rental_date TEXT,
      return_date TEXT,
      status TEXT DEFAULT 'ongoing',
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (camera_id) REFERENCES cameras(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      rental_id INTEGER,
      amount REAL NOT NULL,
      payment_date TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      FOREIGN KEY (rental_id) REFERENCES rentals(id)
    )
  `);
});

console.log('Database initialized.');
db.close();
