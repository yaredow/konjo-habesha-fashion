import mongoose from "mongoose";

const connectMongoDB = async () => {
  const url = process.env.MONGO_DATABASE!.replace(
    "<PASSWORD",
    process.env.MONGO_PASSWORD!,
  );

  try {
    await mongoose.connect(url);
    console.log("Database connection successful");
  } catch (err) {
    console.error(err);
  }
};

export default connectMongoDB;
