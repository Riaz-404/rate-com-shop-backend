import mongoose from "mongoose";

const cartModel = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productsList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CartItem",
      },
    ],
    address: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export const Cart = mongoose.model("Cart", cartModel);
