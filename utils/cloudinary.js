const cloudinary = require('cloudinary').v2;


// Configuration 
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_SECRET,
});


// Upload
const uploadImage = async(fileToUpload)=>{

    const res = cloudinary.uploader.upload(fileToUpload, {public_id: "olympic_flag"});
   
    res.then((data) => {
        console.log(data);
        console.log(data.secure_url);
      }).catch((err) => {
        console.log(err);
      });

}



// // Generate 
// const url = cloudinary.url("olympic_flag", {
//   width: 100,
//   height: 150,
//   Crop: 'fill'
// });



// // The output url
// console.log(url);
// // https://res.cloudinary.com/<cloud_name>/image/upload/h_150,w_100/olympic_flag