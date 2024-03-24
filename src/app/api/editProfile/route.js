import { NextResponse } from "next/server";
import User from "@/models/user";
import { getCurrentUser } from "@/components/helper/session";

export const POST = async (req, res) => {
  const bcrypt = require("bcrypt");
  const saltRounds = 10;
  try {
    const user = await getCurrentUser();
    const userEmail = user?.email;
    const data = await req.json();

    if (data.password) {
      const hashedPassword = await bcrypt.hash(data.password, saltRounds);
      data.password = hashedPassword;
    }

    await User.findOneAndUpdate({ email: userEmail }, data);

    return Response.json({ success: true, name: data.username });
  } catch (err) {
    return new NextResponse(JSON.stringify({ error: err }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
