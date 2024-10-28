import mongoose from "mongoose";

const cartItemModel = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export const CartItem = mongoose.model("CartItem", cartItemModel);
