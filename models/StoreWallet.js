const storeWalletSchema = new mongoose.Schema({
  store_id: { type: mongoose.Schema.Types.ObjectId, ref: "Store" },
  balance: Number
});

export default mongoose.model("StoreWallet", storeWalletSchema);