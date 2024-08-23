const mongoose = require('mongoose');

const connectToDB = async () =>{
          try {
                    const connect =await mongoose.connect(process.env.MONGO_URL);
                    console.log(`MongoDB connected: ${connect.connection.host}`);
          } catch (error) {
                    console.log(error);
          }
}

module.exports= connectToDB;