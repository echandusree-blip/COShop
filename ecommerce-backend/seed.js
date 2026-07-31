require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product"); // Ensure this path is correct
const products = require("./data/products");

const importData = async () => {
  try {
    // 1. Explicitly connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected...");

    // 2. Clear the database
    // We use a callback or ensure we are using the model correctly
    await Product.deleteMany({});
    console.log("Old products cleared.");

    // 3. Insert new data
    await Product.insertMany(products);
    console.log("Products Inserted Successfully");

    // 4. Close connection and exit
    mongoose.connection.close();
    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

importData();