const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');


const dbConnect = async function () {
    const mongod = await MongoMemoryServer.create();
    const getUri = mongod.getUri();
    mongoose.set('strictQuery', true);
    const db = await mongoose.connect(getUri);
    console.log("Database connected");
    return db;
}

module.exports = dbConnect;




//live
// const mongoose = require('mongoose');
// const username = encodeURIComponent("ralphbetta");
// const password = encodeURIComponent("testAccount");
// const cluster = "cluster0.1hbdj4e.mongodb.net";

// const conectDB = async function () {

//     const db = `mongodb+srv://${username}:${password}@${cluster}/note-tuts?retryWrites=true&w=majority`;
    // mongoose
    //     .connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    //     .then(() => console.log('MongoDB Connected'))
    //     .catch((err) => console.log(err));

// }

// module.exports = conectDB;