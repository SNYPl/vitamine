import { NextResponse } from "next/server";
import Vitamine from "@/models/Vitamine";
import User from "@/models/user";

export async function GET(req, res) {
  try {
    const userEmail = await req.nextUrl.searchParams.get("user");

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      throw new Error("User not found");
    }

    const wishlist = user.wishlist;

    const vitamines = (await Vitamine.find({ _id: { $in: wishlist } })) || [];

    return new NextResponse(JSON.stringify(vitamines));
  } catch (error) {
    console.log(error);
    return new NextResponse("error in fetching " + error);
  }
}

export async function POST(req, res) {
  try {
    const userEmail = await req.nextUrl.searchParams.get("user");

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      throw new Error("User not found");
    }

    const wishlist = user.wishlist;

    const vitamines = (await Vitamine.find({ _id: { $in: wishlist } })) || [];

    return new NextResponse(JSON.stringify(vitamines));
  } catch (error) {
    console.log(error);
    return new NextResponse("error in fetching " + error);
  }
}

export const DELETE = async (req, res) => {
  try {
    const productId = await req.nextUrl.searchParams.get("id");
    const userEmail = await req.nextUrl.searchParams.get("user");

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      throw new Error("User not found");
    }

    await User.updateOne({ _id: user._id }, { $pull: { wishlist: productId } });

    return new NextResponse(JSON.stringify("product Deleted"), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("error deleting wishlist product " + error);
  }
};
