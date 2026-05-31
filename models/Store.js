import mongoose from "mongoose";

import User from "./User";
const storeSchema = new mongoose.Schema(
  {
    seller_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    logo: String,
    banner: String,
    name: String,
    phone: String,
    email: String,
    short_description: String,
    long_description: String,
  },
  { timestamps: true },
);

export default mongoose.models.Store || mongoose.model("Store", storeSchema);
