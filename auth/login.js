import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { jsonData } from "../index.js";
import { prisma } from "../index.js";
export const login = async (req, res) => {
  try {
    // const { email , password } = req.body;
    //-----------employee----------
    // let email = "rehem.kapoor@gmail.com";
    // let password = 'something';
    // --------manager---------------
    // let email = "kunal.kapoor@gmail.com";
    // let password = "something";
    // -------admin---------------
    let email = "rahulkumar@gmail.com";
    let password = "rahul";

    // if (!email || !password) {
    // }
    // find the admin
    const findAdmin = await prisma.employee.findUnique({
      where: {
        email: email,
      },
    });
    // if admin then verify the password
    if (findAdmin) {
      const comparePass = await bcrypt.compare(password, findAdmin.password);
      if (comparePass) {
        if (!process.env.JWT_SECRET) {
          return res
            .status(500)
            .json(jsonData(500, false, "JWT_SECRET not set", null));
        }
        const token = jwt.sign(
          { email: findAdmin.email , role : findAdmin.role },
          process.env.JWT_SECRET,
          { expiresIn: "10m" }
        );
        res.cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
        });
        console.log(findAdmin);
        return res
          .status(200)
          .json(jsonData(200, true, "login successful", { token }));
      } else {
        return res.status(401).json(jsonData(401, false, "unauthorized", null));
      }
    } else {
      return res
        .status(404)
        .json(jsonData(404, false, "admin not found", null));
    }
  } catch (err) {
    console.error("Login error:", err);
    return res
      .status(500)
      .json(jsonData(500, false, "Internal server error", null));
  }
};
