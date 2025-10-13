import { PrismaClient } from "@prisma/client";
import express from "express";
import { router } from "./routes/postRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { router as employeeRouter } from "./routes/getRoute.js";
import { router as updateRouter } from "./routes/updateRoute.js";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
export const prisma = new PrismaClient();
export const jsonData = (status, success, message, data) => {
  const response = {
    status: status,
    success: success,
    message: message,
    data: data,
  };
  return response;
};
async function main() {
  await prisma.$connect();

    
  // authenticate the admin
  app.use("/api/auth/", router);
  // get all the employees from admin side
  app.use('/api/' , employeeRouter);
  app.use('/api/employees/update' , updateRouter);
  
  app.listen(4000, () => console.log(`server is listening on port ${4000}`));
}
main().catch((err) => console.log(err));
