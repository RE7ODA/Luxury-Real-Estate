const cloudinary = require('../../../config/cloudinary');
const Property = require('../../../DB/Models/Property.model')

const createProperty = async(req , res) => {
    try{
        const {
          title,
          description,
          price,
          propertyType,
          listingType,
          rooms,
          bathrooms,
          area,
          location,
          paymentMethod,
          downPayment,
          years,
        } = req.body;
        if(req.user.role !== 'admin'){
            return res.status(403).json({message: "You are not authorized to create a product"});
        }
        const images = req.files.map(file => ({
            url: file.path,
            public_id: file.filename
        }));
        const property = await Property.create({
          title,
          description,
          price,
          propertyType,
          listingType,
          rooms,
          bathrooms,
          area,
          location,
          paymentMethod,
          downPayment,
          years,
          image: images
        })
        return res.status(201).json({message: "Property created successfully" , data : property});
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}
const GetProperty = async(req , res) => {
    try{
        const query = req.query;
        const limit = query.limit || 10;
        const page = query.page || 1;
        const skip = (page - 1) * limit;

        const total = await Property.countDocuments();
        const property = await Property.find().sort({createdAt: -1}).limit(limit).skip(skip);
        return res.status(200).json({message: "Property fetched successfully" ,currentPage: page , totalPage: Math.ceil(total / limit) , totalItems: total , data : property});
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}
const GetPropertyOne = async(req , res) => {
    try{
        const id = req.params.id;
        const property = await Property.findById(id);
        if(!property){
            return res.status(404).json({message: "Property not found"});
        }
        return res.status(200).json({message: "Property fetched successfully" , data : property});
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

const updateProperty = async (req, res) => {
  try {
    const id = req.params.id;
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "You are not authorized to update a product" });
    }
    const {
      title,
      description,
      price,
      propertyType,
      listingType,
      rooms,
      bathrooms,
      area,
      location,
      paymentMethod,
      downPayment,
      years,
    } = req.body;
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    let images = property.image;
    if (req.files && req.files.length > 0) {
      for (let img of property.image) {
        if (img.public_id) {
          await cloudinary.uploader.destroy(img.public_id);
        }
      }
      images = req.files.map((file) => ({
        url: file.path,
        public_id: file.filename,
      }));
    }

    const updated = await Property.findByIdAndUpdate(
      id,
      {
        title,
        description,
        price,
        propertyType,
        listingType,
        rooms,
        bathrooms,
        area,
        location,
        paymentMethod,
        downPayment,
        years,
        image: images,
      },
      { new: true }
    );
    return res.status(200).json({ message: "Property updated successfully", data: updated });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "You are not authorized to delete a property" });
    }
    for (let img of property.image) {
      if(img.public_id){
        await cloudinary.uploader.destroy(img.public_id);
      }
    }
    const deletedProperty = await Property.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Property deleted successfully" , data : deletedProperty });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {createProperty , GetProperty , GetPropertyOne , updateProperty , deleteProperty}