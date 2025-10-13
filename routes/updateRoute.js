import { json, Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { udpateUser } from '../controller/userController.js';

export const router = Router();




router.patch('/:email' , authMiddleware , udpateUser);


