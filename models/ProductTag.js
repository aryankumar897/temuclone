const productTagSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  tag_id: { type: mongoose.Schema.Types.ObjectId, ref: "Tag" }
});

export default mongoose.model("ProductTag", productTagSchema);