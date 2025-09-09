const TeamMember = require('../../../DB/Models/Team-Member.model');
const cloudinary = require('../../../config/cloudinary');

const createMember = async (req , res) =>{
    try{
    const { name, email, phone, linkedIn, whatsapp } = req.body;
    if(req.user.role !== 'admin'){
        return res.status(403).json({message: "You are not authorized to create a product"});
    }
    let imageDate = null;
    if(req.file){
        imageDate = {url: req.file.path, public_id: req.file.filename}; 
    }
    const member = await TeamMember.create({
        name: name,
        email: email,
        phone: phone,
        linkedIn: linkedIn,
        whatsapp: whatsapp,
        image: imageDate
    });
    return res.status(201).json({message: "Member created successfully" , data : member});
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const viewMember = async(req , res) =>{
    try{
        const member = await TeamMember.find().sort({createdAt: -1});
        return res.status(200).json({message: "Member fetched successfully" , data : member});
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const updateMember = async (req , res) =>{
    try{
        const id = req.params.id;
        const { name, email, phone, linkedIn, whatsapp } = req.body;
        if(req.user.role !== 'admin'){
            return res.status(403).json({message: "You are not authorized to update a product"});
        }
        const updateMember = await TeamMember.findById(id);
        if(!updateMember){
            return res.status(404).json({message: "Member not found"});
        }
        let images = updateMember.image;
        if(req.file){
            if(updateMember.image?.public_id){
                await cloudinary.uploader.destroy(updateMember.image.public_id);
            }
            images = {url: req.file.path, public_id: req.file.filename};
        }
        const member = await TeamMember.findByIdAndUpdate(id , {name , email , phone , linkedIn , whatsapp , image : images} , {new : true});
        return res.status(200).json({message: "Member updated successfully" , data : member});
    }catch(err){
        return res.status(500).json({message: err.message})
    }
};

const deleteMember = async(req , res) =>{
    try{
        const id = req.params.id;
        if(req.user.role !== 'admin'){
            return res.status(403).json({message: "You are not authorized to delete a product"});
        }
        const member = await TeamMember.findById(id);
        if(!member){
            return res.status(404).json({message: "Member not found"});
        }
        let image = member.image
        if (member.image?.public_id) {
            await cloudinary.uploader.destroy(member.image.public_id);
        }
        const deletedMember = await TeamMember.findByIdAndDelete(id);
        return res.status(200).json({message: "Member deleted successfully" , data : deletedMember});
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

module.exports = {createMember , viewMember , updateMember , deleteMember};