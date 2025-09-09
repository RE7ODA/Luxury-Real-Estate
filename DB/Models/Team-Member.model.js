const mongoose = require("mongoose");

const TeamMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        lowercase: true
    },
    phone:{
        type: String,
        required: true
    },
    linkedIn:{ type: String },
    whatsapp:{ type: String},
    image: {
        url: { type: String},
        public_id: { type: String},
    }
})

const TeamMember = mongoose.model("TeamMember" , TeamMemberSchema);
module.exports = TeamMember;