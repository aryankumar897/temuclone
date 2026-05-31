import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import { getServerSession } from "next-auth";

import { authOptions } from "@/utils/authOptions";

import Cart from "@/models/Cart";

import Order from "@/models/Order";

import ProductVariant from "@/models/ProductVariant";

import PaymentTransaction from "@/models/PaymentTransaction";

import Coupon from "@/models/Coupon";

import paypal from "@paypal/checkout-server-sdk";

// 🔥 PAYPAL ENVIRONMENT
//sb-drhne26200129@personal.example.com
// 🔐 PayPal Environment (Use ENV variables)
const environment = new paypal.core.SandboxEnvironment(
  "AceW9nJb3-RlOq1F9qpl40eCvABcWpTtxCO5rTu47RpdFOoAiQGJSRRKqAPVodkMWTUbVCAyNpBRaZDL", // PayPal client ID (Sandbox)
  "EHGdvjb7JZ2dnhivVEyI_LAJPEWLxOzkxcFkcivqc_HH4nnqUbcYscfqVsOLwxbqiFY7OqHMJkluJoT0", // PayPal client secret (Sandbox)
);
const client = new paypal.core.PayPalHttpClient(environment);


export async function POST(req) {
  try {
    await dbConnect();

    const body =
      await req.json();

    const { token } =
      body;

    // 🔥 USER
    const session =
      await getServerSession(
        authOptions
      );

    if (
      !session?.user?._id
    ) {
      return NextResponse.json(
        {
          success: false,

          error:
            "Unauthorized",
        },

        { status: 401 }
      );
    }

    const userId =
      session.user._id;

    // 🔥 CAPTURE PAYMENT
    const captureRequest =
      new paypal.orders.OrdersCaptureRequest(
        token
      );

    captureRequest.requestBody(
      {}
    );

    const captureResponse =
      await client.execute(
        captureRequest
      );

    // 🔥 VERIFY PAYMENT
    if (
      captureResponse.result
        .status !==
      "COMPLETED"
    ) {
      return NextResponse.json(
        {
          success: false,

          error:
            "Payment not completed",
        },

        { status: 400 }
      );
    }

    // 🔥 FETCH CART AGAIN
    const cart =
      await Cart.findOne({
        user: userId,
      });

    if (
      !cart?.items?.length
    ) {
      return NextResponse.json(
        {
          success: false,

          error:
            "Cart empty",
        },

        { status: 400 }
      );
    }

    // 🔥 RECALCULATE TOTALS
    let subtotal = 0;

    const orderItems = [];

    for (const item of cart.items) {
      const finalPrice =
        item.special_price >
        0
          ? item.special_price
          : item.price;

      subtotal +=
        finalPrice *
        item.quantity;

      orderItems.push({
        product:
          item.product,

        variant:
          item.variant,

        quantity:
          item.quantity,

        price:
          item.price,

        special_price:
          item.special_price,

        total:
          finalPrice *
          item.quantity,
      });
    }

    // 🔥 DISCOUNT
    const discount =
      cart?.coupon
        ?.discount_amount ||
      0;

    // 🔥 TAX
    const tax = 5;

    // 🔥 FINAL TOTAL
    const finalTotal =
      subtotal -
      discount +
      tax;

    // 🔥 CREATE ORDER
    const order =
      await Order.create({
        user: userId,

        // 🔥 ADDRESS
        address:
          cart.address,

        // 🔥 ITEMS
        items: orderItems,

        // 🔥 TOTALS
        subtotal,

        discount,

        tax,

        shipping_charge: 0,

        total_amount:
          finalTotal,

        // 🔥 COUPON
        coupon:
          cart?.coupon
            ?.code
            ? cart.coupon
            : {
                code: "",

                discount_amount: 0,

                final_total: 0,
              },

        // 🔥 PAYMENT
        payment_method:
          "paypal",

        payment_status:
          "paid",

        payment_id:
          captureResponse
            .result.id,

        transaction_id:
          token,

        // 🔥 STATUS
        order_status:
          "processing",

        order_number:
          "ORD-" +
          Date.now(),
      });

    // 🔥 SAVE TRANSACTION
    await PaymentTransaction.create(
      {
        user: userId,

        order: order._id,

        payment_gateway:
          "paypal",

        transaction_id:
          token,

        payment_id:
          captureResponse
            .result.id,

        amount:
          finalTotal,

        currency: "USD",

        gateway_response:
          captureResponse.result,
      }
    );

    // 🔥 UPDATE STOCK
    for (const item of cart.items) {
      await ProductVariant.findByIdAndUpdate(
        item.variant,

        {
          $inc: {
            stock:
              -item.quantity,
          },
        }
      );
    }

    // 🔥 UPDATE COUPON USAGE
    if (
      cart?.coupon?.code
    ) {
      await Coupon.findOneAndUpdate(
        {
          code:
            cart.coupon.code,
        },

        {
          $inc: {
            used_count: 1,
          },
        }
      );
    }

    // 🔥 CLEAR CART
    await Cart.findOneAndUpdate(
      {
        user: userId,
      },

      {
        items: [],

        coupon: {
          code: "",

          discount_amount: 0,

          final_total: 0,
        },
      }
    );

    return NextResponse.json({
      success: true,

      order,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,

        error:
          error.message ||
          "Paypal verification failed",
      },

      { status: 500 }
    );
  }
}
