import jwtoken from "jsonwebtoken";
import bycrypt from "bcryptjs";
import User from "../Model/User";
import loginValidation from "../loginValidation";
import signUp from "./SignUpController";

const signIn =async (req:any,res:any)=>{
    const {email,password} = req.body;
    //validate input data
    const {error} = loginValidation(req.body);
    if(error)
    {
      res.status(400).json({
        error:error.details[0].message
      })
    }
    //check if user exists
    const user = await User.findOne({email: req.body.email})
    if(!user)
    {
      res.status(400).send("Email not found");
    }
    //bycrypt.compare -> compares the enetered password with the hashed password in the database
    if(user){
    const validPAss = bycrypt.compare(req.body.password,user.get("password"))
    if(!validPAss)
    {
      res.status(400).send("Password is wrong");
    }

    //assigna token to the user with the following id
    const token = jwtoken.sign({_id: user.id},process.env.TOKEN||"")
    //send the token with the header 
    res.header('auth-token',token).send(token)
    }
  }

  export default signIn;