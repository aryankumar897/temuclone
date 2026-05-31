import mongoose from "mongoose";

const paymentTransactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },

    payment_gateway: {
      type: String,

      enum: ["paypal", "stripe", "razorpay"],
    },

    transaction_id: String,

    payment_id: String,

    amount: Number,

    currency: String,

    status: {
      type: String,

      enum: ["pending", "success", "failed"],

      default: "success",
    },

    gateway_response: {
      type: Object,
    },
  },

  {
    timestamps: true,
  },
);

export default mongoose.models.PaymentTransaction ||
  mongoose.model("PaymentTransaction", paymentTransactionSchema);
