import { NextResponse } from "next/server";
import User from "@/models/user";
import sgMail from "@sendgrid/mail";
const jwt = require("jsonwebtoken");

const sendgridApiKey = process.env.SENDGRID_API_KEY;

if (sendgridApiKey) {
  sgMail.setApiKey(sendgridApiKey);
}

export const POST = async (req, res) => {
  try {
    const data = await req.json();

    const user = await User.findOne({ email: data.email });

    if (!user) {
      return new NextResponse(JSON.stringify({ error: "user not found" }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const id = user._id;

    const resetToken = jwt.sign(
      { user: id },
      process.env.SECRET_FORGOT_PASSWORD,
      {
        expiresIn: 60 * 60,
      }
    );

    const msg = {
      to: data.email,
      from: "snypisia@gmail.com",
      subject: "Reset Password",
      text: "Reset",
      html: `<!doctype html>
        <html>
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          </head>
          <body style="font-family: sans-serif;">
            <div style="display: block; margin: auto; max-width: 600px;" class="main">
              <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">პაროლის აღსადგენად,</h1>
              <p>გადადით <a href="${process.env.API_REQUEST_URL}/api/forgotPassword/reset?token=${resetToken}&&id=${user._id}">ლინკზე</a></p>
             
            <style>
              .main { background-color: white; }
              a:hover { border-left-width: 1em; min-height: 2em; }
            </style>
          </body>
        </html>`,
    };

    await sgMail.send(msg);

    return new NextResponse(JSON.stringify({ edited: true }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("error in fetching " + error);
  }
};
