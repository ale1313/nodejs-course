// MODULES
import express from 'express';
import users from '../../controllers/v1/users';
import { isAdmin, isAuth, isValidHostname } from '../../middlewares/auth';

const router = express.Router();

router.post('/create', users.createUser);
router.post('/delete', isAdmin, users.deleteUser);
router.post('/login', users.login);
router.post('/update', isValidHostname, isAuth, users.updateUser);
router.get('/all', isValidHostname, isAdmin, users.getUsers);

export default router;
