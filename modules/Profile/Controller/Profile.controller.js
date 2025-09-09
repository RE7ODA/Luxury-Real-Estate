const AuthModel = require('../../../DB/Models/Auth.model');
bcrypt = require('bcrypt');
const getProfile = async(req , res) =>{
    try{
        const user = await AuthModel.findById(req.user.id).select('-password');
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        if(req.user.role === 'admin'){
            return res.status(200).json({message: `Welcome ${user.fullName}`, data : { id: user._id ,name: user.fullName, email: user.email , role: user.role} });
        }else{
            return res.status(200).json({message: `Welcome ${user.fullName}`, data : { id: user._id , name: user.fullName, email: user.email , role: user.role}} );
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }
}
const updateProfile = async(req , res) =>{
    try{
        const {fullName , email , password , phone} = req.body;
        let updateUser =  {fullName , email , password , phone};
        if(password){
            const salt = await bcrypt.genSalt(10);
            updateUser.password = await bcrypt.hash(password , salt);
        }
        const user = await AuthModel.findByIdAndUpdate(req.user.id , updateUser, {new : true}).select('-password');
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({message: "Profile updated successfully", data: user});
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

const deleteProfile = async(req , res) =>{
    try{
        const user = await AuthModel.findByIdAndDelete(req.user.id);
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({message: "Profile deleted successfully"});
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

module.exports = {getProfile , updateProfile , deleteProfile};