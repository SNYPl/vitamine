import { NextResponse } from "next/server";
import { getCurrentUser } from "@/components/helper/session";
import User from "@/models/user";
import connectDB from "@/lib/db";
import { revalidatePath, revalidateTag } from "next/cache";
import { getUser } from "@/components/helper/getUser";

export const PATCH = async (req, res) => {
  try {
    const data = await req.json();
    const user = await getCurrentUser();

    await connectDB();

    if (!user) {
      // User is not authenticated, return 401 Unauthorized
      return new NextResponse(
        JSON.stringify({ error: "გაიარეთ ავტორიზაცია" }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const findUser = await User.findOne({ email: user.email });

    // Check if the id is already in the wishlist array
    const isInWishlist = await findUser.wishlist.includes(data.id);

    if (isInWishlist) {
      // If id is found, remove it from the wishlist array
      findUser.wishlist = await findUser.wishlist.filter(
        (id) => id !== data.id
      );
    } else {
      // If id is not found, add it to the wishlist array
      findUser.wishlist.push(data.id);
    }

    // Save the updated user document
    await findUser.save();

    revalidateTag("user");
    revalidatePath("/");

    return Response.json({ revalidated: true, message: "item added" });
  } catch (err) {
    return new NextResponse(JSON.stringify({ error: err }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
