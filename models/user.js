// models/user.js
import mongoose, { models, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    provider: { type: String, default: "credentials" },
    access: { type: String, default: "free" }, // NEW: "free" or "paid"
    visitCount: { type: Number, default: 0 }, // NEW: count visits
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
