import { NextResponse, NextRequest } from "next/server";
import User from "@/models/user";
import connectDB from "@/lib/db";

export const GET = async (req, res) => {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connectDB();

    const userObj = await User.findOne({ email: email }).select({
      password: 0,
    });

    if (!userObj) {
      throw new Error("No user found");
    }

    return new NextResponse(JSON.stringify({ user: userObj }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch user data" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
