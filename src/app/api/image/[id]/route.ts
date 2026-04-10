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

    const arrayBuffer = await response.arrayBuffer();
    const input = new Uint8Array(arrayBuffer);

    // Convert all images to JPEG through sharp (handles HEIC, HEIF, PNG, WebP, etc.)
    try {
      const output = await sharp(input).jpeg({ quality: 85 }).toBuffer();
      return new NextResponse(output.buffer as ArrayBuffer, {
        headers: {
          "Content-Type": "image/jpeg",
          "Cache-Control": "public, max-age=86400, s-maxage=86400",
        },
      });
    } catch {
      // If sharp fails, return original bytes
      return new NextResponse(arrayBuffer, {
        headers: {
          "Content-Type": response.headers.get("content-type") || "image/jpeg",
          "Cache-Control": "public, max-age=86400, s-maxage=86400",
        },
      });
    }
  } catch {
    return new NextResponse("Failed to fetch image", { status: 500 });
  }
}
