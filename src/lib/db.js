import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URL; // Replace with your actual MongoDB URI

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process on connection failure
  }
};

export default connectDB;
