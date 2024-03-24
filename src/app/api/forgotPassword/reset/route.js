"use server";
import { NextResponse } from "next/server";
import User from "@/models/user";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
import { redirect } from "next/navigation";

export const GET = async (req) => {
  const token = await req.nextUrl.searchParams.get("token");
  const userId = await req.nextUrl.searchParams.get("id");
  try {
    jwt.verify(token, process.env.SECRET_FORGOT_PASSWORD, function (err) {
      if (err) throw new Error("Invalid token , try again");
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("error in fetching " + error);
  }

  redirect(
    `${process.env.API_REQUEST_URL}/forgotPassword/reset?id=${userId}&&token=${token}`
  );
};

export const POST = async (req) => {
  const data = await req.json();
  const saltRounds = 10;

  if (!data.userId) {
    return new NextResponse(JSON.stringify({ error: "user not found" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const { password, userToken, userId } = data;

  try {
    jwt.verify(userToken, process.env.SECRET_FORGOT_PASSWORD, function (err) {
      if (err) throw new Error("Invalid token , try again");
    });

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true }
    );

    return new NextResponse(JSON.stringify({ succesed: "password reseted" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("error reseting password " + error);
  }
};
