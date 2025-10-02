import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';

export const router = Router()


// router.get('/employee:id' , authMiddleware , );