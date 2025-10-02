import { jsonData } from "../index.js";
import jwt from 'jsonwebtoken';


export const authMiddleware = async (req , res , next) => {
   const token = req.cookies.token;

   if (!token) return res.status(401).json(jsonData(401, false, 'invalid user'));
            
   try {
      const verify = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verify;
      next();
   } catch (err) {
      return res.status(401).json(jsonData(401, false, 'invalid token', null));
   }
};

