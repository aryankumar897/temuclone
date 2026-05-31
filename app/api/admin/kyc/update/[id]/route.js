// import { NextResponse } from "next/server";
// import mongoose from "mongoose";

// import dbConnect from "@/utils/dbConnect";
// import Kyc from "@/models/Kyc";
// import User from "@/models/User";

// import MailSenderService from "@/services/MailSenderService";
// import {
//   kycApprovedTemplate,
//   kycRejectedTemplate,
// } from "@/emails/kycTemplates";

// // ✅ UPDATE KYC STATUS
// export async function PUT(req, { params }) {
//   try {
//     await dbConnect();

//     const { id } = await params;
//     const body = await req.json();

//     const { status, rejected_reason } = body;

//     // ✅ Validate ID
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return NextResponse.json({ message: "Invalid KYC ID" }, { status: 400 });
//     }

//     // ✅ Validate status
//     const validStatus = ["pending", "approved", "rejected"];
//     if (!validStatus.includes(status)) {
//       return NextResponse.json(
//         { message: "Invalid status value" },
//         { status: 400 },
//       );
//     }

//     // ✅ Find KYC
//     const kyc = await Kyc.findById(id);

//     if (!kyc) {
//       return NextResponse.json({ message: "KYC not found" }, { status: 404 });
//     }

//     const previousStatus = kyc.status; // 🔥 important

//     // ✅ Update logic
//     kyc.status = status;

//     if (status === "rejected") {
//       if (!rejected_reason) {
//         return NextResponse.json(
//           { message: "Rejection reason is required" },
//           { status: 400 },
//         );
//       }

//       kyc.rejected_reason = rejected_reason;
//       kyc.verified_at = null;
//     }

//     if (status === "approved") {
//       kyc.rejected_reason = "";
//       kyc.verified_at = new Date();
//     }

//     if (status === "pending") {
//       kyc.rejected_reason = "";
//       kyc.verified_at = null;
//     }

//     await kyc.save();

//     // ✅ Fetch user
//     const user = await User.findById(kyc.user_id);

//     // ✅ Send email ONLY if status changed
//     if (user && previousStatus !== status) {
//       // ✅ Approved Email
//       if (status === "approved") {
//         await MailSenderService.sendMail({
//           to: user.email,
//           subject: "KYC Approved ✅",
//           html: kycApprovedTemplate({
//             name: user.name || "User",
//           }),
//         });
//       }

//       // ✅ Rejected Email
//       if (status === "rejected") {
//         await MailSenderService.sendMail({
//           to: user.email,
//           subject: "KYC Rejected ❌",
//           html: kycRejectedTemplate({
//             name: user.name || "User",
//             reason: rejected_reason,
//           }),
//         });
//       }
//     }

//     return NextResponse.json({
//       success: true,
//       message: "KYC status updated successfully",
//       data: kyc,
//     });
//   } catch (error) {
//     console.error("KYC UPDATE ERROR:", error);

//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }




import { NextResponse } from "next/server";
import mongoose from "mongoose";

import dbConnect from "@/utils/dbConnect";
import Kyc from "@/models/Kyc";
import User from "@/models/User";

import MailSenderService from "@/services/MailSenderService";
import {
  kycApprovedTemplate,
  kycRejectedTemplate,
} from "@/emails/kycTemplates";

// ✅ UPDATE KYC STATUS
export async function PUT(req, { params }) {
  try {
    await dbConnect();

    const { id } =  await params; // ✅ FIXED
    const body = await req.json();

    const { status, rejected_reason } = body;

    // ✅ Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid KYC ID" },
        { status: 400 },
      );
    }

    // ✅ Validate status
    const validStatus = ["pending", "approved", "rejected"];
    if (!validStatus.includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid status value" },
        { status: 400 },
      );
    }

    // ✅ Find KYC
    const kyc = await Kyc.findById(id);
    if (!kyc) {
      return NextResponse.json(
        { success: false, message: "KYC not found" },
        { status: 404 },
      );
    }

    const previousStatus = kyc.status;

    // ✅ Update KYC
    kyc.status = status;

    if (status === "rejected") {
      if (!rejected_reason) {
        return NextResponse.json(
          { success: false, message: "Rejection reason is required" },
          { status: 400 },
        );
      }

      kyc.rejected_reason = rejected_reason;
      kyc.verified_at = null;
    }

    if (status === "approved") {
      kyc.rejected_reason = "";
      kyc.verified_at = new Date();
    }

    if (status === "pending") {
      kyc.rejected_reason = "";
      kyc.verified_at = null;
    }

    await kyc.save();

    // ✅ Sync User KYC status (🔥 IMPORTANT)
    const user = await User.findById(kyc.user_id);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    // 🔥 Only update if changed
    if (user.kyc_status !== status) {
      user.kyc_status = status;
      await user.save();
    }

    // ✅ Send email ONLY if status changed
    if (previousStatus !== status) {
      if (status === "approved") {
        await MailSenderService.sendMail({
          to: user.email,
          subject: "KYC Approved ✅",
          html: kycApprovedTemplate({
            name: user.name || "User",
          }),
        });
      }

      if (status === "rejected") {
        await MailSenderService.sendMail({
          to: user.email,
          subject: "KYC Rejected ❌",
          html: kycRejectedTemplate({
            name: user.name || "User",
            reason: rejected_reason,
          }),
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "KYC status updated successfully",
      data: kyc,
    });
  } catch (error) {
    console.log("KYC UPDATE ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
