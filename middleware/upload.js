const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storageProperty  = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "property",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const uploadProperty  = multer({ storage : storageProperty });

const storageMember = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "team-member",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const uploadMember  = multer({ storage : storageMember });

module.exports = {uploadProperty , uploadMember};