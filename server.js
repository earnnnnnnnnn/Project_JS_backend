const express = require('express');
require('dotenv').config();
const app = express();
const db = require('./config/database');

app.use(express.json());

const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
