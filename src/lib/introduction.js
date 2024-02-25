import connectDB from "@/lib/db";
import Vitamine from "@/models/Vitamine";

export const introductionBestSales = async () => {
  await connectDB();

  const bestSellingVitamines = await Vitamine.find(
    {},
    {
      name: 1,
      _id: 1,
      category: 1,
      mainImage: 1,
      price: 1,
      discount: 1,
      introduction: 1,
      country: 1,
      sold: 1,
      productQuantity: 1,
    },
    { sort: { sold: -1, productQuantity: -1 }, limit: 18 }
  );

  return JSON.stringify(bestSellingVitamines);
};

export const introductionDaleOfWeek = async () => {
  await connectDB();

  const daleOfWeekItems = await Vitamine.find(
    { daleOfWeek: true, productQuantity: { $ne: 0, $exists: true } },
    {
      name: 1,
      _id: 1,
      category: 1,
      mainImage: 1,
      price: 1,
      discount: 1,
      introduction: 1,
      country: 1,
      sold: 1,
      productQuantity: 1,
      daleOfWeek: 1,
    },
    { sort: {}, limit: 18 }
  );

  return JSON.stringify(daleOfWeekItems);
};

export const introductionDiscounted = async () => {
  await connectDB();

  const discountedItems = await Vitamine.find(
    {
      discount: { $gt: 0 },
    },
    {
      name: 1,
      _id: 1,
      category: 1,
      mainImage: 1,
      price: 1,
      discount: 1,
      introduction: 1,
      country: 1,
      sold: 1,
      productQuantity: 1,
      daleOfWeek: 1,
    },
    { sort: { discount: -1 }, limit: 18 }
  );

  return JSON.stringify(discountedItems);
};
