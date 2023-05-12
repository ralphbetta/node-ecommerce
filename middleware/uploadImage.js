

// // set up the file upload middleware
// const multer = require('multer');
// const sharp = require('sharp');
// const path = require('path');

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); // set the destination folder
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname); // set the file name
//     }
// });

// const multerFilter = (req, file, cb)=>{
//     if(file.mimetype.startsWith('image')){
//         cb(null,true);
//     }else{
//         cb({
//             message:"Unsupported file format"
//         },
//         false
//         )
//     }
// }


const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      // Generate a unique filename for the uploaded file
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname);
    }
  });
  
  // Create a Multer middleware using the configured storage
  const upload = multer({ 
    storage: storage,
    limits: {filedSize: 20000}
});
  
  // Middleware for handling file uploads
  const uploadMiddleware = upload.single('image');

  const uploadMultiple = upload.array('images', 10);

  module.exports = {uploadMiddleware, uploadMultiple, upload}