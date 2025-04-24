import express from 'express';
import { Login, Register } from '../controller/users.controller.js';
const router = express.Router();
router.route('/login')
        .post(Login);
router.route('/register')
        .post(Register);
export default router;