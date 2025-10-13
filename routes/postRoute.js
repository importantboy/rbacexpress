

import express from 'express';
import { login } from '../auth/login.js';
import { register } from '../auth/register.js';
import { authMiddleware } from '../middleware/auth.js';

export const router = express.Router();

//register new employee or manager through admin
router.post('/register' , authMiddleware , register);
router.post('/login' , login);

