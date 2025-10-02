import bcrypt from "bcrypt";
import {jsonData, prisma} from '../index.js';

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
