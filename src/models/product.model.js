import mongoose from "mongoose";

const productModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    stockQuantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export const Product = mongoose.model("Product", productModel);
