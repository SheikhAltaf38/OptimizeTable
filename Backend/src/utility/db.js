import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const db = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("DB connection successfull");
    })
    .catch((er) => {
        console.log("Error in connecting DB ",er); 
    });
};

export default db