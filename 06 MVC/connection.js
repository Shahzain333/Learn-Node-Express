const mongoose = require('mongoose');

async function connectMongoDB(url) {
    
  await mongoose.connect(url)
    .then(() => {
        console.log("Connected to MongoDB Successfully...");
    })
    .catch((err) => {
        console.log("Error in the Connection MongoDB : ", err)
    })

}

module.exports = {
    connectMongoDB
}    

