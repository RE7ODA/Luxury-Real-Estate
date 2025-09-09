const mongoose = require("mongoose");
const ContactSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    message:{
        type:String,
        required:true
    }
},{timestamps:true});

const Contact = mongoose.model("Contact" , ContactSchema);
module.exports = Contact;