// MODULES
const express = require('express');
const users = require('../../controllers/v1/users');

const router = express.Router();

router.post('/create', users.createUser);
router.post('/delete', users.deleteUser);
router.post('/login', users.login);
router.post('/update', users.updateUser);
router.get('/all', users.getUsers);

module.exports = router;
