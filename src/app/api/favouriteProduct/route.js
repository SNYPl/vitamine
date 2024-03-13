import { NextResponse } from "next/server";
import User from "@/models/user";

export const PATCH = async (req, res) => {
  try {
    const data = await req.json();
    const user = data?.params?.user;
    const productId = data?.params.id;

    if (!user) {
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

    const findUser = await User.findOne({ email: user });

    // Check if the id is already in the wishlist array
    const isInWishlist = await findUser.wishlist.includes(productId);

    if (isInWishlist) {
      // If id is found, remove it from the wishlist array
      findUser.wishlist = await findUser.wishlist.filter(
        (id) => id !== productId
      );
    } else {
      // If id is not found, add it to the wishlist array
      findUser.wishlist.push(productId);
    }

    // Save the updated user document
    await findUser.save();

    return Response.json({ revalidated: true, message: "item added" });
  } catch (err) {
    return new NextResponse(JSON.stringify({ error: err }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
