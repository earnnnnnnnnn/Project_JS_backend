const express = require('express');
const router = express.Router();
const usersController = require('../controllers/reservationsController');

router.get('/', usersController.getUsers);
router.post('/', usersController.createUser);

module.exports = router;
