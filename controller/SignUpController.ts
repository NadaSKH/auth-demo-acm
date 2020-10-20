import regsitValidation from "../validation";
import User from "../Model/User";
import bycrypt from "bcryptjs";
import jwtoken from "jsonwebtoken";



const signUp =async (req:any,res:any)=>{
    try {
        const {name,email,password} = req.body;
        const {error} = regsitValidation(req.body);
        if(error)
        {
            res.status(400).json({
                error: error.details[0].message,
              });
        }
        //if no data is eneterd
        if (!name && !email && !password) {
            return res.status(422).json({
              status: "Failed",
              error: "please add all the fields",
            });
          }
      //if user already registered
          const userExists = await User.findOne({ email });
          if (userExists)
            return res.status(422).json({
              error: "email already exists",
            });
           //create a salt , hash it with the password (this is one way of hashing) 

            // const salt = await bycrypt.genSalt(10);
            // const hashedPass = await bycrypt.hash(req.body.password,salt);
          const newUser = await new User({ name, email, password }).save();
          if (newUser)
          console.log(newUser);
            res.status(200).json({
              user: newUser,
            });
        } catch (err) {
          res.status(500).json({
            status: "error",
            error: err.message,
          });
        }


    }

    

    export default signUp;