const orderProductSchema = new mongoose.Schema({
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },

  product_name: String,
  unit_price: Number,
  variant: String,
  qty: Number,
  line_total: Number,
});

export default mongoose.model("OrderProduct", orderProductSchema);
