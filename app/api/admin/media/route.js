import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Media from "@/models/Media";
import { getToken } from "next-auth/jwt";
import { v2 as cloudinary } from "cloudinary";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ✅ Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Upload helper
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "media",
          resource_type: "auto", // 🔥 image + video
        },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      )
      .end(buffer);
  });
};

//
// ─────────────────────────────────────────────
// 📌 POST → Upload Media (MULTIPLE SUPPORTED)
// ─────────────────────────────────────────────
//
export async function POST(req) {
  try {
    await dbConnect();

    // ✅ AUTH
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token?.sub) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();

    // 🔥 SUPPORT BOTH: file + files
    const files = formData.getAll("files").length
      ? formData.getAll("files")
      : [formData.get("file")];

    if (!files || !files[0]) {
      return NextResponse.json({ error: "No file" }, { status: 400 });
    }

    const uploadedList = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());

      // 🔥 SERVER VALIDATION
      const isVideo = file.type.startsWith("video");
      const isImage = file.type.startsWith("image");

      if (!isImage && !isVideo) {
        return NextResponse.json(
          { error: "Only image/video allowed" },
          { status: 400 }
        );
      }

      if (isImage && file.size > 2 * 1024 * 1024) {
        return NextResponse.json(
          { error: "Image too large (max 2MB)" },
          { status: 400 }
        );
      }

      if (isVideo && file.size > 20 * 1024 * 1024) {
        return NextResponse.json(
          { error: "Video too large (max 20MB)" },
          { status: 400 }
        );
      }

      // 🔥 upload
      const uploadResult = await uploadToCloudinary(buffer);

      const type =
        uploadResult.resource_type === "video" ? "video" : "image";

      const media = await Media.create({
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
        type,
        format: uploadResult.format,
        size: uploadResult.bytes,
      });

      uploadedList.push(media);
    }

    return NextResponse.json(uploadedList);
  } catch (err) {
    console.log("UPLOAD ERROR:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

//
// ─────────────────────────────────────────────
// 📌 GET → Fetch Media
// ─────────────────────────────────────────────
//
export async function GET(req) {
  try {
    await dbConnect();

    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token?.sub) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const media = await Media.find().sort({ createdAt: -1 });

    return NextResponse.json(media);
  } catch (err) {
    console.log("FETCH ERROR:", err);
    return NextResponse.json(
      { error: "Failed to fetch media" },
      { status: 500 }
    );
  }
}