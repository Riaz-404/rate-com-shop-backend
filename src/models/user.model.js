import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN", "MODERATOR"],
      default: "USER",
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);

  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
  const payload = {
    id: this._id,
    fullName: this.fullName,
    email: this.email,
    role: this.role,
  };

  return jwt.sign(payload, process.env.JWT_SECRET);
};

userSchema.methods.generateRefreshToken = async function () {
  const payload = {
    id: this._id,
    email: this.email,
  };

  return jwt.sign(payload, process.env.JWT_SECRET);
};

export const User = mongoose.model("User", userSchema);
