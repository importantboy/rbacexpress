import { Router } from "express";
import { prisma, jsonData } from "../index.js";
import { authMiddleware } from "../middleware/auth.js";

export const router = Router();

router.delete("/:email", authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "Admin") {
      return res
        .status(401)
        .json(jsonData(401, false, "unauthorized access", null));
    }
    const userEmail = req.params.email;
    const targetEmail = await prisma.employee.findUnique({
      where: {
        email: userEmail,
      },
    });
     
    if (!targetEmail)
      return res
        .status(404)
        .json(jsonData(404, false, "email not found", null));

         const deleteUser = await prisma.employee.delete({
             where : {
                email : userEmail
             }
         })
          if(deleteUser) return res.status(200).json(jsonData(200 , true , 'user delete successfully' , deleteUser));
          if(!deleteUser) return res.status(200).json(jsonData(200 , false , 'cannot delete the user' , null));
  } catch (err) {
    return res
      .status(500)
      .json(jsonData(500, false, "internal server error ", null));
  }
});
