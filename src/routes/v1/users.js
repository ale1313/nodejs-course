// MODULES
const express = require('express');
const users = require('../../controllers/v1/users');
const { isAdmin, isAuth, isValidHostname } = require('../../middlewares/auth');

const router = express.Router();

router.post('/create', users.createUser);
router.post('/delete', isAdmin, users.deleteUser);
router.post('/login', users.login);
router.post('/update', isValidHostname, isAuth, users.updateUser);
router.get('/all', isValidHostname, isAdmin, users.getUsers);

module.exports = router;
