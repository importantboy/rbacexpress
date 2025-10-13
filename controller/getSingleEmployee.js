import { jsonData , prisma } from "../index.js";

export const singleEmployee  = async(req , res) => {
     const id = req.params.id;
     const role = req.user.role;
     console.log(role);
        if(!id) return res.json(jsonData(401 , false , 'cannot find data' , null));
     try{
        //     employee !== Admin = true && employee !== manager = true (true)
        //     Admin !== Admin = false && Admin !== manager = true (false) 
          if((role !== "Admin" && role !== "Manager")){
               return res.json(jsonData(406 , false ,  'unauthorized user' , null));
          }  else {
              const data = await prisma.employee.findUnique(
                   {
                     where : {
                          email : id
                     },
                      select : {
                         id : true,
                         email  : true, 
                         role : true, 
                         salary : true
                      }
                   }
              );
              if(data){
               return res.json(jsonData(200 , true , 'employee' , data));
              } else {
                return res.json(jsonData(404 , false , 'employee not found' , null));
              }
          }
     }catch(err){
            console.log(err);
            return res.json(jsonData(500 , false , 'internal server error' , null));   
     }

}