import jwtoken from "jsonwebtoken";
import bycrypt from "bcryptjs";
import User from "../Model/User";
import loginValidation from "../loginValidation";
import signUp from "./SignUpController";

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

  export default signIn;