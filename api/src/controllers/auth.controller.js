import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { genrateToken } from "../lib/utils.js";
export const signup = async (req, res) => {
    const {fullName, email, password} = req.body;
    try{
    if(!fullName || !email || !password){
        return res.status(400).json({message: "All fields are required"});
    }
    if(password.length < 6){
        return res.status(400).json({message: "Password must be at least 6 characters"});
    }

//check if user exists
  const user= await User.findOne({email});
  if(user){
      return res.status(400).json({message: "User already exists"});
    }
    //hash password
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password, salt);
//create user
    const newUser = new User({fullName, email, password: hashedPassword});
    if(newUser){
        //jwt token
      genrateToken(newUser._id, res);
        await newUser.save();
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic,
        });
    }else{
        res.status(400).json({message: "Inavlid user data"});
    }
}catch(error){
    res.status(500).json({message: "Internal server error"});
    console.log("error in the signup controller", error.message);

};
}
export const login = (req, res) => {
  res.send("Login route");
};
export const logout = (req, res) => {
  res.send("Logout route");
};
