import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address,answer } = req.body;
    // Validation
    if (!name) {
      return res.status(400).send({ message: "Name is required" });
    }
    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }
    if (!password) {
      return res.status(400).send({ message: "Password is required" });
    }
    if (!phone) {
      return res.status(400).send({ message: "Phone is required" });
    }
    if (!address) {
      return res.status(400).send({ message: "Address is required" });
    }
    if (!answer) {
      return res.status(400).send({ message: "Answer is required" });
    }

    // Check existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User already registered. Please log in.",
      });
    }

    // Register user
    const hashedPassword = await hashPassword(password);

    // Save user
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer
    }).save();

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

//POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_TOKEN, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role:user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//Forgot password
export const forgotPasswordController=async(req,res)=>{
  try {
    const {email,answer,newPassword}=req.body
    if(!email){
      res.status(400).send({message:'Email is required'})
    }
    if(!answer){
      res.status(400).send({message:'Answer is required'})
    }
    if(!newPassword){
      res.status(400).send({message:'NewPassword is required'})
    }

    //check 
    const user=await userModel.findOne({email,answer})
    //validation 
    if(!user){
      return res.status(404).send({
        success:false,
        message:'Wrong Email or Answer'
      })
    }

    const hashed=await hashPassword(newPassword)
    await userModel.findByIdAndUpdate(user._id,{password:hashed})
    res.status(200).send({
      success:true,
      message:'Password Reset Successfully'
    })


  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:'Something went wrong',
      error
    })
    
  }

}

//test controller
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};