import bcrypt from "bcrypt";
import { jsonData, prisma } from "../index.js";

export const createUser = async (
  name,
  email,
  role,
  password,
  salary,
  age,
  req,
  res
) => {
  const findEmail = await prisma.employee.findUnique({
    where: { email: email },
  });
  if (findEmail) {
    return res
      .status(406)
      .json(jsonData(406, false, "user already exist", null));
  }

  const addEmployee = await prisma.employee.create({
    data: {
      name: name,
      email: email,
      role: role,
      age: age,
      salary: salary,
      password: bcrypt.hashSync(password, 5),
    },
  });
  if (addEmployee) {
    return res
      .status(201)
      .json(jsonData(201, true, "employee added successfully", addEmployee));
  }
};

export const udpateUser = async (req, res) => {
  try {
    const loggedInUser = req.user;
    const targetEmail = req.params.email;
    if (!targetEmail)
      return res.status(400).json(jsonData(400, false, "cannot found", null));

    const targetUser = await prisma.employee.findUnique({
      where: {
        email: targetEmail,
      },
    });
    //  console.log(targetUser)
    if (!targetUser)
      return res
        .status(400)
        .json(jsonData(401, false, "cannot found any user", null));

    // check for self modification which is not allowed
    if (loggedInUser.email === targetUser.email) {
      return res
        .status(401)
        .json(jsonData(401, false, "self modification is not allowed", null));
    }

    // define permission map
    const permission = {
      Admin: ["Manager", "Employee"],
      Manager: ["Employee"],
      Employee: [],
    };

    const allowedRoles = permission[loggedInUser.role] || [];
    console.log(allowedRoles);

    // check for permission
    if (!allowedRoles.includes(targetUser.role)) {
      return res
        .status(403)
        .json(jsonData(403, false, "unauthorized access not allowed", null));
    }
    // perform update
    const updateUser = await prisma.employee.update({
      where: {
        email: targetEmail,
      },
      data: {
        name: req.body.name,
      },
    });
    return res.json(jsonData(200, true, "successfull updated", updateUser));
  } catch (err) {
    console.log(err);
    return res.json(jsonData(500, false, "internal server error", null));
  }
};
