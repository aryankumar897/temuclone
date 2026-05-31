import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import { getServerSession } from "next-auth";

import { authOptions } from "@/utils/authOptions";

import Cart from "@/models/Cart";

import paypal from "@paypal/checkout-server-sdk";

// 🔥 PAYPAL ENVIRONMENT

//sb-drhne26200129@personal.example.com
// 🔐 PayPal Environment (Use ENV variables)
const environment = new paypal.core.SandboxEnvironment(
  "AceW9nJb3-RlOq1F9qpl40eCvABcWpTtxCO5rTu47RpdFOoAiQGJSRRKqAPVodkMWTUbVCAyNpBRaZDL", // PayPal client ID (Sandbox)
  "EHGdvjb7JZ2dnhivVEyI_LAJPEWLxOzkxcFkcivqc_HH4nnqUbcYscfqVsOLwxbqiFY7OqHMJkluJoT0", // PayPal client secret (Sandbox)
);

const client = new paypal.core.PayPalHttpClient(environment);

export async function POST() {
  try {
    await dbConnect();

    // 🔥 USER
    const session = await getServerSession(authOptions);

    if (!session?.user?._id) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },

        { status: 401 },
      );
    }

    const userId = session.user._id;

    // 🔥 FETCH CART
    const cart = await Cart.findOne({
      user: userId,
    });

    if (!cart?.items?.length) {
      return NextResponse.json(
        {
          error: "Cart is empty",
        },

        { status: 400 },
      );
    }

    // 🔥 RECALCULATE
    let subtotal = 0;

    const paypalItems = [];

    for (const item of cart.items) {
      const finalPrice =
        item.special_price > 0 ? item.special_price : item.price;

      subtotal += finalPrice * item.quantity;

      paypalItems.push({
        name: "Product",

        unit_amount: {
          currency_code: "USD",

          value: finalPrice.toFixed(2),
        },

        quantity: item.quantity.toString(),
      });
    }

    // 🔥 DISCOUNT
    const discount = cart?.coupon?.discount_amount || 0;

    // 🔥 TAX
    const tax = 5;

    // 🔥 FINAL TOTAL
    const total = subtotal - discount + tax;

    // 🔥 CREATE PAYPAL REQUEST
    const request = new paypal.orders.OrdersCreateRequest();

    request.prefer("return=representation");

    request.requestBody({
      intent: "CAPTURE",

      purchase_units: [
        {
          amount: {
            currency_code: "USD",

            value: total.toFixed(2),

            breakdown: {
              item_total: {
                currency_code: "USD",

                value: subtotal.toFixed(2),
              },

              tax_total: {
                currency_code: "USD",

                value: tax.toFixed(2),
              },

              discount: {
                currency_code: "USD",

                value: discount.toFixed(2),
              },
            },
          },

          items: paypalItems,

          custom_id: JSON.stringify({
            userId: userId.toString(),

            total: total.toFixed(2),
          }),
        },
      ],

      application_context: {
        return_url: "http://localhost:3000/paypal/success",

        cancel_url: "http://localhost:3000/paypal/cancel",

        user_action: "PAY_NOW",
      },
    });

    // 🔥 CREATE PAYPAL ORDER
    const paypalOrder = await client.execute(request);

    // 🔥 GET APPROVAL URL
    const approvalLink = paypalOrder.result.links.find(
      (link) => link.rel === "approve",
    );

    return NextResponse.json({
      success: true,

      url: approvalLink.href,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,

        error: error.message || "Paypal payment failed",
      },

      { status: 500 },
    );
  }
}
