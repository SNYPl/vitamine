import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/user";

export const GET = async (req, res) => {
  try {
    const token = await req.nextUrl.searchParams.get("token");

    await connectDB();

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return NextResponse.redirect(new URL(`/verify?verify=${false}`, req.url));
      // return new NextResponse(
      //   JSON.stringify({ error: "Invalid verification token" }),
      //   {
      //     status: 400,
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    const newUser = await user.save();

    if (newUser) {
      return NextResponse.redirect(new URL("/verify?verify=true", req.url));
    }

    return new NextResponse(
      JSON.stringify({ success: "Account verified successfully" }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(error);
    if (error) {
      return NextResponse.redirect(new URL("/verify?verify=false", req.url));
    }
    return new NextResponse(
      JSON.stringify({ error: "Error verifying account" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
