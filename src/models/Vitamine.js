import mongoose from "mongoose";

const vitamineSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  category: String,
  infoTitle: String,
  price: Number,
  discount: Number,
  productQuantity: Number,
  packageQuantity: Number,
  tabletSize: Number,
  sold: Number,
  country: String,
  mainDaleOfWeek: Boolean,
  daleOfWeek: Boolean,
  isFeatured: Boolean,
  images: [String],
  mainImage: String,
  rating: Number,
  about: String,
  description: [String],
  use: String,
  otherIngredients: [String],
  warning: String,
  review: [Object],
  supplementFacts: [
    {
      title: String,
      info: String,
    },
  ],
  tags: [String],
});

const Vitamine =
  mongoose.models.Vitamine || mongoose.model("Vitamine", vitamineSchema);

export default Vitamine;
