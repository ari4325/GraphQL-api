const mongoose = require('mongoose');

const URI =
  "mongodb+srv://user_1:MTcGeOmtNOwb82lX@cluster0.pa17a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectDB = async () => {
  await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("DB Connected...");
};

module.exports = connectDB;