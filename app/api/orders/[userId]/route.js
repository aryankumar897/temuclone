// import { NextResponse } from "next/server";

// import dbConnect from "@/utils/dbConnect";

// import Order from "@/models/Order";

// import "@/models/Product";

// import "@/models/ProductVariant";

// import "@/models/Media";

// export async function GET(req, { params }) {
//   try {
//     await dbConnect();

//     const { userId } = await params;

//     const orders = await Order.find({
//       user: userId,
//     })
//       .populate({
//         path: "items.product",

//         populate: {
//           path: "media",
//         },
//       })
//       .populate({
//         path: "items.variant",

//         populate: {
//           path: "media",
//         },
//       })
//       .sort({
//         createdAt: -1,
//       })
//       .lean();

//     return NextResponse.json({
//       success: true,

//       orders,
//     });
//   } catch (error) {
//     console.log(error);

//     return NextResponse.json(
//       {
//         success: false,
//       },

//       { status: 500 },
//     );
//   }
// }



import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import Order from "@/models/Order";

import PaymentTransaction from "@/models/PaymentTransaction";

import "@/models/Product";

import "@/models/ProductVariant";

import "@/models/Media";

export async function GET(
  req,
  { params }
) {
  try {
    await dbConnect();

    const { userId } =
      await params;

    // 🔥 FETCH ORDERS
    const orders =
      await Order.find({
        user: userId,
      })
        .populate({
          path: "items.product",

          populate: {
            path: "media",
          },
        })
        .populate({
          path: "items.variant",

          populate: {
            path: "media",
          },
        })
        .sort({
          createdAt: -1,
        })
        .lean();

    // 🔥 FETCH TRANSACTIONS
    const transactions =
      await PaymentTransaction.find(
        {
          user: userId,
        }
      ).lean();

    // 🔥 MERGE TRANSACTION INTO ORDER
    const updatedOrders =
      orders.map((order) => {
        const transaction =
          transactions.find(
            (trx) =>
              trx.order.toString() ===
              order._id.toString()
          );

        return {
          ...order,

          transaction:
            transaction || null,
        };
      });

    return NextResponse.json({
      success: true,

      orders:
        updatedOrders,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
      },

      { status: 500 }
    );
  }
}