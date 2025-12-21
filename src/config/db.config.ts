import mongoose from "mongoose";
import envConfig from "./env.config";

const connectDb = () => {
  return new Promise<String>((reslove, reject) => {
    mongoose
      .connect(envConfig.DATABASE_URI)
      .then(() => reslove(mongoose.connect.name))
      .catch(err => reject(err));
  });
};

export default connectDb;
