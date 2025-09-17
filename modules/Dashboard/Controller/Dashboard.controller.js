const Property = require('../../../DB/Models/Property.model');
const TeamMember = require('../../../DB/Models/Team-Member.model');
const Contact = require('../../../DB/Models/Contact.model');
const Review = require('../../../DB/Models/Reviews.model');
const User = require('../../../DB/Models/Auth.model');

const viewdashboard = async (req , res) => {
    try{
        if(req.user.role !== 'admin'){
            return res.status(403).json({message: "You are not authorized to update a product"});
        }
        const [totalProperties , totalMembers , totalContacts , totalReviews , totalUsers , latestProperties , latestContacts ,latestReviews] = await Promise.all([
            Property.countDocuments(),
            TeamMember.countDocuments(),
            Contact.countDocuments(),
            Review.countDocuments(),
            User.countDocuments(),
            Property.find().limit(5).sort({createdAt: -1}),
            Contact.find().limit(5).sort({createdAt: -1}).populate('userId' , 'fullName email'),
            Review.find().limit(5).sort({createdAt: -1}).populate('userId' , 'fullName email').populate('propertyId' , 'title'),
        ])
        return res.status(200).json({message: "Dashboard fetched successfully" , totalProperties , totalMembers , totalContacts , totalReviews , totalUsers , latestProperties , latestContacts ,latestReviews});
    }catch(err){
        return res.status(500).json({message: err.message});
    }
}

module.exports = {viewdashboard};