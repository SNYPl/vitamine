import { NextResponse } from "next/server";
import Vitamine from "@/models/Vitamine";

export const POST = async (req, res) => {
  try {
    const data = await req.json();

    const vitamine = await Vitamine.findById(data.id);

    if (!vitamine) {
      return new NextResponse(JSON.stringify({ error: "Vitamine not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    if (!vitamine.review) {
      vitamine.review = [];
    }
    if (!vitamine.rating) {
      vitamine.rating = [];
    }

    // Add data to the review array
    await vitamine.review.push(data);

    // Add the data.rate number to the rate array
    await vitamine.rating.push(data.rate);

    // Save the updated Vitamine document
    await vitamine.save();

    return Response.json({ success: true });
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify({ error: err }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
