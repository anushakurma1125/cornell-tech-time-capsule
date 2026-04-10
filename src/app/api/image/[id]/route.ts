import { NextRequest, NextResponse } from "next/server";

// Proxy Google Drive images to avoid CORS/ORB issues
// Usage: /api/image/FILE_ID
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    // Try the direct download URL first
    const url = `https://drive.google.com/uc?export=view&id=${id}`;
    const response = await fetch(url, {
      redirect: "follow",
    });

    if (!response.ok) {
      return new NextResponse("Image not found", { status: 404 });
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    const buffer = await response.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch {
    return new NextResponse("Failed to fetch image", { status: 500 });
  }
}
