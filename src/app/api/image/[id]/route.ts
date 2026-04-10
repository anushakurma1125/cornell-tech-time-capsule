import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

// Proxy Google Drive images to avoid CORS/ORB issues
// Converts ALL formats (including HEIC/HEIF) to JPEG for universal browser support
// Usage: /api/image/FILE_ID
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    // First try direct download
    let arrayBuffer = await fetchDriveFile(id);

    // Check if Google returned an HTML virus scan page instead of the actual file
    const firstBytes = new Uint8Array(arrayBuffer.slice(0, 15));
    const header = new TextDecoder().decode(firstBytes);
    if (header.startsWith("<!DOCTYPE") || header.startsWith("<html")) {
      // Extract the confirm download URL from the HTML and retry
      const html = new TextDecoder().decode(new Uint8Array(arrayBuffer));
      const confirmMatch = html.match(/href="(\/uc\?export=download[^"]+)"/);
      if (confirmMatch) {
        const confirmUrl = `https://drive.google.com${confirmMatch[1].replace(/&amp;/g, "&")}`;
        const retryResponse = await fetch(confirmUrl, { redirect: "follow" });
        if (retryResponse.ok) {
          arrayBuffer = await retryResponse.arrayBuffer();
        }
      }
    }

    const input = new Uint8Array(arrayBuffer);

    // Convert to JPEG through sharp — handles HEIC, HEIF, PNG, WebP, TIFF, etc.
    try {
      const output = await sharp(input, { failOn: "none" })
        .rotate() // Auto-rotate based on EXIF
        .jpeg({ quality: 85 })
        .toBuffer();
      return new NextResponse(output.buffer as ArrayBuffer, {
        headers: {
          "Content-Type": "image/jpeg",
          "Cache-Control": "public, max-age=86400, s-maxage=86400",
        },
      });
    } catch {
      // If sharp totally fails, try fetching as thumbnail (Google's own converter)
      // This handles HEIC even if sharp doesn't have libheif
      try {
        const thumbUrl = `https://drive.google.com/thumbnail?id=${id}&sz=w1600`;
        const thumbResponse = await fetch(thumbUrl, { redirect: "follow" });
        if (thumbResponse.ok) {
          const thumbBuffer = await thumbResponse.arrayBuffer();
          return new NextResponse(thumbBuffer, {
            headers: {
              "Content-Type": "image/jpeg",
              "Cache-Control": "public, max-age=86400, s-maxage=86400",
            },
          });
        }
      } catch {
        // Last resort fallback
      }

      return new NextResponse(arrayBuffer, {
        headers: {
          "Content-Type": "image/jpeg",
          "Cache-Control": "public, max-age=86400, s-maxage=86400",
        },
      });
    }
  } catch {
    return new NextResponse("Failed to fetch image", { status: 500 });
  }
}

async function fetchDriveFile(id: string): Promise<ArrayBuffer> {
  const url = `https://drive.google.com/uc?export=download&id=${id}`;
  const response = await fetch(url, { redirect: "follow" });
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status}`);
  }
  return response.arrayBuffer();
}
