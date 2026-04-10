import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

// Proxy Google Drive images to avoid CORS/ORB issues
// Also converts HEIC/HEIF to JPEG since browsers can't display them
// Usage: /api/image/FILE_ID
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const url = `https://drive.google.com/uc?export=download&id=${id}`;
    const response = await fetch(url, {
      redirect: "follow",
    });

    if (!response.ok) {
      return new NextResponse("Image not found", { status: 404 });
    }

    const contentType = (response.headers.get("content-type") || "").toLowerCase();
    const buffer = Buffer.from(await response.arrayBuffer());

    // Convert HEIC/HEIF to JPEG
    if (
      contentType.includes("heic") ||
      contentType.includes("heif") ||
      contentType === "application/octet-stream"
    ) {
      try {
        const converted = await sharp(buffer).jpeg({ quality: 85 }).toBuffer();
        return new NextResponse(converted, {
          headers: {
            "Content-Type": "image/jpeg",
            "Cache-Control": "public, max-age=86400, s-maxage=86400",
          },
        });
      } catch {
        // If sharp fails (not actually HEIC), return original
      }
    }

    // For standard image formats, pass through (optimize with sharp if possible)
    try {
      const optimized = await sharp(buffer).jpeg({ quality: 85 }).toBuffer();
      return new NextResponse(optimized, {
        headers: {
          "Content-Type": "image/jpeg",
          "Cache-Control": "public, max-age=86400, s-maxage=86400",
        },
      });
    } catch {
      // If sharp can't process it, return the original buffer
      return new NextResponse(buffer, {
        headers: {
          "Content-Type": contentType || "image/jpeg",
          "Cache-Control": "public, max-age=86400, s-maxage=86400",
        },
      });
    }
  } catch {
    return new NextResponse("Failed to fetch image", { status: 500 });
  }
}
