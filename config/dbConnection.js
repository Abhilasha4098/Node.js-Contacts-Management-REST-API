const mongoose = require('mongoose');

const connectDB = async () => {
    try {
  const connect=await mongoose.connect(process.env.CONNECTION_STRRING) ;
  console.log(
    `MongoDB connected: ${
        connect.connection.host,
        connect.Connection.name}`); // Log the host of the connected database
     }
      catch(err){
  console.log(err);
  process.exit(1);//is there is failure to connect to the database, exit the process with a failure code
    }
}
module.exports = connectDB; // Export the connectDB function for use in other files