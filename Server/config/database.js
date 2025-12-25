import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://mindsync:mindsyncos@mindsync.0peg8ya.mongodb.net/?appName=mindsync"
  );
};

export default connectDB;
