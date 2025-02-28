const express = require('express');
const router = express.Router();
const usersController = require('../controllers/returnsController');

router.get('/', usersController.getUsers);
router.post('/', usersController.createUser);

module.exports = router;
