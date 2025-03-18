import mongoose from "mongoose";

const SpecialOfferSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    subtitle: {
      type: String,
      required: [true, "Please provide a subtitle"],
      maxlength: [200, "Subtitle cannot be more than 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
      maxlength: [500, "Description cannot be more than 500 characters"],
    },
    discountPercentage: {
      type: Number,
      required: [true, "Please provide a discount percentage"],
      min: [0, "Discount cannot be negative"],
      max: [100, "Discount cannot exceed 100%"],
    },
    imageUrl: {
      type: String,
      required: [true, "Please provide an image URL"],
    },
    buttonText: {
      type: String,
      default: "Shop Now",
      maxlength: [50, "Button text cannot be more than 50 characters"],
    },
    linkUrl: {
      type: String,
      required: [true, "Please provide a link URL"],
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    badgeText: {
      type: String,
      default: "Limited Offer",
      maxlength: [50, "Badge text cannot be more than 50 characters"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.SpecialOffer || mongoose.model("SpecialOffer", SpecialOfferSchema); 