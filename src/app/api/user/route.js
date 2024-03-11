import { NextResponse, NextRequest } from "next/server";
import User from "@/models/user";
import connectDB from "@/lib/db";

export const GET = async (req, res) => {
  try {
    const userEmail = req.url.split("=")[1];

    await connectDB();

    if (!userEmail) {
      throw new Error("error user is not here");
    }

    const userObj = await User.findOne({ email: userEmail });

    return new NextResponse(JSON.stringify({ user: userObj }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify(error), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
