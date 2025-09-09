const Property = require('../../../DB/Models/Property.model');

const Search = async(req , res) =>{
    try{
    const { title , description , location , propertyType , listingType , paymentMethod} = req.query;

    let query = [] ;
    if(title) query.push({title: {$regex: title , $options: 'i'}})
    if(description) query.push({description: {$regex: description , $options: 'i'}})
    if(location) query.push({location: {$regex: location , $options: 'i'}})
    if (propertyType) query.push({ propertyType: { $regex: propertyType, $options: "i" } });
    if (listingType) query.push({ listingType: { $regex: listingType, $options: "i" } });
    if (paymentMethod) query.push({ paymentMethod: { $regex: paymentMethod, $options: "i" } });
    if (query.length === 0) {
        return res.status(400).json({ message: "Please provide at least one search query." });
      }
      
    const srearch = await Property.find({ $or: query, }).sort({createdAt: -1});
    return res.status(200).json({message: "Search result" , total: srearch.length , data : srearch});
    }catch(err){
        return res.status(500).json({message: err.message});
    }
}

const Filter = async(req , res) => {
    try{
        const {
          propertyType,
          listingType,
          rooms,
          bathrooms,
          location,
          minPrice,
          maxPrice,
          minArea,
          maxArea,
          paymentMethod,
        } = req.query;

        let filter = {};

        if (propertyType) filter.propertyType = propertyType;
        if (listingType) filter.listingType = listingType;
        if (rooms) filter.rooms = rooms;
        if (bathrooms) filter.bathrooms = bathrooms;
        if (location) filter.location = { $regex: location, $options: 'i' };
        if (paymentMethod) filter.paymentMethod = paymentMethod;

        if(minPrice || maxPrice){ filter.price = {};
        if(minPrice) filter.price.$gte = Number(minPrice);
        if(maxPrice) filter.price.$lte = Number(maxPrice);
    }

        if(minArea || maxArea){ filter.area = {};
            if(minArea) filter.area.$gte = Number(minArea);
            if(maxArea) filter.area.$lte = Number(maxArea);
        }
        const filterd = await Property.find(filter).sort({createdAt: -1});
        return res.status(200).json({message: "Filter result", total: filterd.length , data : filterd});
    }catch(err){
        return res.status(500).json({message: err.message})
    }
};

module.exports = {Search , Filter};