import { NextResponse } from "next/server";
const bcrypt = require("bcrypt");
import crypto from "crypto";
import sgMail from "@sendgrid/mail";

const sendgridApiKey = process.env.SENDGRID_API_KEY;

if (sendgridApiKey) {
  sgMail.setApiKey(sendgridApiKey);
}

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

    const verificationToken = crypto.randomBytes(20).toString("hex");

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isVerified: false,
      verificationToken: verificationToken,
      image: "/images/profile/user.jpg",
    });

    await newUser.save();

    const msg = {
      to: email,
      from: "snypisia@gmail.com",
      subject: "Verify",
      text: "Verify Account",
      html: `<!doctype html>
        <html>
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          </head>
          <body style="font-family: sans-serif;">
            <div style="display: block; margin: auto; max-width: 600px;" class="main">
              <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">ანგარიშის გასააქტიურებლად,</h1>
              <p>გადადით <a href="${process.env.API_REQUEST_URL}/api/auth/verify?token=${verificationToken}">ლინკზე</a></p>
             
            <style>
              .main { background-color: white; }
              a:hover { border-left-width: 1em; min-height: 2em; }
            </style>
          </body>
        </html>`,
    };

    await sgMail.send(msg);

    return new NextResponse(JSON.stringify({ success: "user created" }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Error creating user", error }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
