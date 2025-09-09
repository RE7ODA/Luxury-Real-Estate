const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    propertyType: {
      type: String,
      enum: [
        "فيلا",
        "Villa",
        "برج",
        "Tower",
        "كمباوند",
        "Compound",
        "شقة",
        "Apartment",
      ],
      required: true,
    },
    listingType: {
      type: String,
      enum: ["تمليك", "Sale", "إيجار", "Rent"],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    rooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    area: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["كاش", "Cash", "تقسيط", "Installments" , "شهري"  , "Monthly"],
      required: true,
    },
    downPayment: {
      type: Number,
      default: 0,
    },
    years: {
      type: Number,
      default: 0,
    },
    image: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);
const Property = mongoose.model("Property", PropertySchema);

module.exports = Property;
