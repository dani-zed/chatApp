import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "full name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    minlength: [6, "Password must be at least 6 characters"],
    required: [true, "Password is required"],
  },
  profilePic: {
    type: String,
    default: "",
  },
},{
    timestamps: true
});
const User = mongoose.model("User", userSchema);
export default User;