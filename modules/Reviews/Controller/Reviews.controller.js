const Review = require('../../../DB/Models/Reviews.model');

const createReview = async (req, res) => {
    try {
        const {rating, comment } = req.body;
        const userId = req.user.id;
        const propertyId = req.params.propertyId;
        const review = await Review.create({ userId, propertyId, rating, comment });
        return res.status(201).json({ message: "Review created successfully", review });
    } catch (error) {
        return res.status(500).json({ message: "Error creating review", error });
    }
};

const viewReviews = async (req, res) => {
    try{
        const reviews = await Review.find().populate('userId' , 'fullName email').populate('propertyId' , 'title'); 
        return res.status(200).json({message: "Reviews fetched successfully" , data : reviews});
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const updateReview = async (req , res) => {
    try{
        const id = req.params.id;
        const { rating, comment } = req.body;
        const updateReview = await Review.findById(id);
        if(!updateReview)
            return res.status(404).json({message: "Review not found"});
        const review = await Review.findByIdAndUpdate(id , {rating, comment} , {new : true})
        return res.status(200).json({message: "Review updated successfully" , data : review});
    }catch(err){
        return res.status(500).json({message: err.message})
    }
};

const deleteReview = async(req , res) => {
    try{
        const id = req.params.id;
        const findReview = await Review.findById(id);
        if(!findReview)
            return res.status(404).json({message: "Review not found"});
        const review = await Review.findByIdAndDelete(id).populate('userId' , 'fullName email').populate('propertyId' , 'title');
        return res.status(200).json({message: "Review deleted successfully" , data : review});    
    }catch(err){
        return res.status(500).json({message: err.message})
    }
};

module.exports = {createReview , viewReviews , updateReview , deleteReview};