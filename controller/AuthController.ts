import regsitValidation from "../validation";
import User from "../Model/User";
import bycrypt from "bcryptjs";
import jwtoken from "jsonwebtoken";
import loginValidation from "../loginValidation";


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
        if (!name && !email && !password) {
            return res.status(422).json({
              status: "Failed",
              error: "please add all the fields",
            });
          }
      
          const userExists = await User.findOne({ email });
          if (userExists)
            return res.status(422).json({
              error: "email already exists",
            });

            const salt = await bycrypt.genSalt(10);
            const hashedPass = await bycrypt.hash(req.body.password,salt);
          const newUser = await new User({ name, email, hashedPass }).save();
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

    const signIn =async (req:any,res:any)=>{
      const {email,password} = req.body;
      const {error} = loginValidation(req.body);
      if(error)
      {
        res.status(400).json({
          error:error.details[0].message
        })
      }
      const user = await User.findOne({email: req.body.email})
      if(!user)
      {
        res.status(400).send("Email not found");
      }
      if(user){
      const validPAss = await bycrypt.compare(req.body.password,user.get("password"))
      if(!validPAss)
      {
        res.status(400).send("Password is wrong");
      }
      const token = jwtoken.sign({_id: user.id},process.env.TOKEN||"")
      res.header('auth-token',token).send(token)
      }
    }

    export default signUp;