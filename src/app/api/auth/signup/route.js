import { NextResponse } from "next/server";
const bcrypt = require("bcrypt");

import connectDB from "@/lib/db";
import User from "@/models/user";

export const POST = async (request) => {
  const saltRounds = 10;

  try {
    const data = await request.json();

    await connectDB();

    const { username, email, password } = data;

    const user = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (user) {
      return NextResponse.json("user already exist", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // await newUser.save();

    return new NextResponse(JSON.stringify({ success: "user created" }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ error: "Error creating user" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
