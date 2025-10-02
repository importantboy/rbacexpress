import { createUser } from "../controller/userController.js";
import { jsonData } from "../index.js";

const tempdata = {
  name: "another kapoor",
  email: "another.kapoor@gmail.com",
  role: "Employee",
  age: 33,
  salary: 4530.12,
  password: "something",
};

export const register = async (req, res) => {
  //if receiving data from body then uncomment the following data
  //   const { name, email, role, age, salary } = req.body;
  const { name, email, role, age, salary, password } = tempdata;
  const userrole = req.user.role;
  //    console.log(admin);
  try {
    //check if current user is admin or manager and while registering the user check for the role if its admin or not..
    // Admin can create any user except another Admin; Manager can only create Employee
    if (userrole === "Admin" && role !== "Admin") {
      // Admin creating non-Admin user
      createUser(name, email, role, password, salary, age, req, res);
    } else if (userrole === "Manager" && role === "Employee") {
      // Manager creating Employee user
      createUser(name, email, role, password, salary, age, req, res);
    } else {
      return res.status(401).json(jsonData(401, false, "unauthorized", null));
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(jsonData(500, false, "internal server error", null));
  }
};