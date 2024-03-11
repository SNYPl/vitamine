import { NextResponse } from "next/server";

const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: "AKIAQ3EGQD6OI5POESNL",
  secretAccessKey: "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",
  region: "eu-north-1",
});

const ses = new AWS.SES({ apiVersion: "2010-12-01" });

export const POST = async (req, res) => {
  try {
    const data = await req.json();

    const params = {
      Destination: {
        ToAddresses: ["vitamine.vitvit@gmail.com"],
      },
      Message: {
        Body: {
          Html: {
            Data: `<p>name : ${data.username}</p> 
            <p>email: ${data.email}</p>
            <p>message : ${data.message}</p>`,
          },
          Text: {
            Data: data.message,
          },
        },
        Subject: {
          Data: "contact email message",
        },
      },
      Source: "vitamine.vitvit@gmail.com",
    };

    ses.sendEmail(params, (err, data) => {
      if (err) {
        console.error("Error sending email:", err);
      } else {
        console.log("Email sent successfully:", data);
      }
    });

    return new NextResponse(JSON.stringify({ success: "message sented" }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return new NextResponse(JSON.stringify({ error: err }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
