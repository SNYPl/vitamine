import mongoose from "mongoose";

const vitamineSchema = new mongoose.Schema({
  name: String,
  category: [String],
  infoTitle: String,
  price: Number,
  discount: Number,
  productQuantity: Number,
  packageQuantity: String,
  tabletSize: Number,
  sold: Number,
  country: String,
  mainDaleOfWeek: Boolean,
  daleOfWeek: Boolean,
  isFeatured: Boolean,
  images: [String],
  mainImage: {
    type: String,
    required: true
  },
  rating: [Number],
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
