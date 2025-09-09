const AuthModel = require('../../../DB/Models/Auth.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const register = async(req , res)=>{
    try{
        const {fullName , email , password , phone , role} = req.body;
        const emailExists = await AuthModel.findOne({email});
        if(emailExists){
            return res.status(400).json({message: "Email already exists"});
        }
        if(password.length < 8){
            return res.status(400).json({message: "Password must be at least 8 characters"});
        }
        if(phone.length < 11){
            return res.status(400).json({message: "Phone number must be at least 11 characters"});
        }
        await AuthModel.create({fullName , email , password , phone , role});
        res.status(201).json({message: "User registered successfully" , data : {Full_Name: fullName , email: email , Phone: phone , Role : role}});
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

const login = async(req , res) =>{
    try {
        const {email , password} = req.body;
        const emailExists = await AuthModel.findOne({email});
        if(!emailExists){
            return res.status(400).json({message: "Email or password is incorrect"});
        }
        const ismatch = await bcrypt.compare(password , emailExists.password);
        if(!ismatch){
            return res.status(400).json({message: "Email or password is incorrect"});
        }
        let token = jwt.sign({id: emailExists._id , role: emailExists.role , email: emailExists.email , fullName: emailExists.fullName}, process.env.JWT_SECRET ,  { expiresIn: "7d" });
        res.status(200).json({message: "User logged in successfully", token});
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

module.exports = {
    register,
    login
}
