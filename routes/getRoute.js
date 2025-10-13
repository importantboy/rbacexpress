import express, { json } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { getAllEmployees } from "../controller/getEmployeesController.js";
import { singleEmployee } from "../controller/getSingleEmployee.js";
import { jsonData, prisma } from "../index.js";

export const router = express.Router();

router.get("/", authMiddleware, getAllEmployees);
router.get('/employee/:id' , authMiddleware , singleEmployee);
