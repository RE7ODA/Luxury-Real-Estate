const Contact = require('../../../DB/Models/Contact.model');

const createContact = async(req , res) => {
    try{
        const {message} = req.body;
        if(!message)
             return res.status(400).json({message: "Message is required"});        
        const contact = await Contact.create({
            userId: req.user.id,
            message
        });
        return res.status(200).json({message: "Contact created successfully" , data : contact});
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}
const getContact = async(req , res) => {
    try{
        const contact = await Contact.find().sort({createdAt: -1}).populate('userId' , 'fullName email phone');
        return res.status(200).json({message: "Contact fetched successfully" , data : contact});
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const deleteContact = async(req , res) => {
    try{
        if(req.user.role !== 'admin')
            return res.status(403).json({message: "You are not authorized to delete a contact"});
        const id = req.params.id;
        const findContact = await Contact.findById(id);
        if(!findContact)
            return res.status(404).json({message: "Contact not found"});
        const contact = await Contact.findByIdAndDelete(id).populate('userId' , 'fullName email phone');
        return res.status(200).json({message: "Contact deleted successfully" , data : contact});
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

module.exports = {createContact , getContact , deleteContact};