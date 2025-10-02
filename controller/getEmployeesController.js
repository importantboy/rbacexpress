import { jsonData, prisma } from "../index.js";

export const getAllEmployees = async (req, res) => {
  try {
    if (req.user.role === "Admin" || req.user.role === "Manager") {
      let condition = {};
      if (req.user.role === "Admin") {
        condition = { role: { not: "Admin" } };
      } else if (req.user.role === "Manager") {
        condition = { role: { notIn: ["Admin", "Manager"] } };
      }

      const getEmployees = await prisma.employee.findMany({
        where: condition,
      });
      return res
        .status(200)
        .json(jsonData(200, true, "employee details", getEmployees));
    } else {
      return res
        .status(406)
        .json(jsonData(406, false, "unauthorized access", null));
    }
  } catch (err) {
    console.log(err);
    res.end();
  }
}