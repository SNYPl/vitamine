import { NextResponse } from "next/server";
import Vitamine from "@/models/Vitamine";
import sgMail from "@sendgrid/mail";

const sendgridApiKey = process.env.SENDGRID_API_KEY;

if (sendgridApiKey) {
  sgMail.setApiKey(sendgridApiKey);
}

export const POST = async (request: Request) => {
  try {
    const requestBody = await request.json();
    const products = requestBody.products;
    const shipping = requestBody.Shipping;

    const results = [];
    let totalPrice = 0;

    for (const product of products) {
      const productId = product.id;
      const quantity = product.quantity;

      const foundProductFromDB = await Vitamine.findById(productId);
      if (foundProductFromDB) {
        const productName = foundProductFromDB.name;
        const price = foundProductFromDB.price;
        const discount = foundProductFromDB.discount;
        const packageQuantity = foundProductFromDB.packageQuantity;
        const realPrice = discount ? discount : price;
        const totalProductPrice = realPrice * quantity;
        totalPrice += totalProductPrice;

        const result = {
          name: productName,
          quantity,
          price: realPrice,
          packageQuantity: packageQuantity,
          totalProductPrice: totalProductPrice,
        };

        results.push(result);
      }
    }

    const msg = {
      to: "vitamine.vitvit@gmail.com",
      from: "snypisia@gmail.com",
      subject: "New Order",
      text: "Order Recieved",
      html: `<!doctype html>
        <html>
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          </head>
          <body style="font-family: sans-serif;">
            <div style="display: block; margin: auto; max-width: 600px;" class="main">
              <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">ახალი შეკვეთა შემოვიდა </h1>
             <div style="margin-bottom:15px">
             პროდუქტები:
               
               
                ${results.map(
                  (el: any) =>
                    `<div>
                    <p>პროდუქტის სახელი: ${el.name}   ----   რაოდენობა: ${el.quantity}</p>
                    <p>პროდუქტის აბის რაოდენობა: ${el.packageQuantity}</p>
                    <p>პროდუქტის ფასი: ${el.price}   ----   პროდუქტის მთლიანი ფასი: ${el.totalProductPrice}</p>
                    </div>
                    
                    `
                )}
             </div>
             <p>ყველა პროდუქტის ფასი : ${totalPrice}</p>
             <div>
             მისამართზე:
              <ul>
              <li>სახელი: ${shipping.username}</li>
              <li>გვარი: ${shipping.familyName}</li>
              <li>ქალაქი: ${shipping.city}</li>
              <li>ქუჩა: ${shipping.street}</li>
              <li>ტელეფონის ნომერი ${shipping.number}</li>
              <li>ელ.ფოსტა: ${shipping.email}</li>
              <li>დამატებითი ინფორმაცია: ${shipping.textareaField}</li>
              </ul>
             </div>
            </div>
            <style>
              .main { background-color: white; }
              a:hover { border-left-width: 1em; min-height: 2em; }
            </style>
          </body>
        </html>`,
    };

    await sgMail.send(msg);

    return new NextResponse(JSON.stringify("order sented"));
  } catch (error) {
    console.error("Error processing POST request:", error);

    return new NextResponse("error sending order " + error);
  }
};
