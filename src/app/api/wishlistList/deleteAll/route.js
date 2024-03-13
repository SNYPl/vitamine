import User from "@/models/user";
import { NextResponse } from "next/server";

export const DELETE = async (req, res) => {
  try {
    const userEmail = await req.nextUrl.searchParams.get("user");

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      throw new Error("User not found");
    }

    await User.updateOne({ _id: user._id }, { $unset: { wishlist: [] } });

    return new NextResponse(JSON.stringify("Products Deleted"), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("error deleting wishlist product " + error);
  }
};
