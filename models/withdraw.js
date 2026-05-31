const withdrawSchema = new mongoose.Schema({
  store_id: { type: mongoose.Schema.Types.ObjectId, ref: "Store" },
  amount: Number,
  status: {
    type: String,
    enum: ["pending", "processing", "paid"]
  },
  payment_method: String,
  payment_details: String
});

export default mongoose.model("WithdrawRequest", withdrawSchema);