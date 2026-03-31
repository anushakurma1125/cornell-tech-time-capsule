import { NextRequest, NextResponse } from "next/server";

const TILE_COLORS = [
  "#B31B1B", "#2E6DA4", "#2A9D8F", "#6A994E",
  "#E76F51", "#7B2D8E", "#E9C46A", "#D44D4D",
  "#4A90D9", "#E07A5F", "#81B29A", "#F2CC8F",
  "#3D405B", "#264653", "#A8DADC", "#F4A261",
];

function hashCode(s: string): number {
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = (hash << 5) - hash + s.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ params: string[] }> }
) {
  const segments = (await params).params;
  const key = segments.join("/");
  const isCollage = segments[0] === "collage";
  const size = isCollage ? 800 : 300;
  const hash = hashCode(key);

  if (isCollage) {
    // Generate a grid collage SVG
    const cols = 8;
    const rows = 6;
    const cellSize = size / cols;
    let rects = "";
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const idx = (hash + r * cols + c) % TILE_COLORS.length;
        const color = TILE_COLORS[idx];
        rects += `<rect x="${c * cellSize + 1}" y="${r * cellSize + 1}" width="${cellSize - 2}" height="${cellSize - 2}" rx="2" fill="${color}" opacity="${0.7 + ((hash + r + c) % 4) * 0.1}"/>`;
      }
    }
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${(size / cols) * rows}" viewBox="0 0 ${size} ${(size / cols) * rows}">
      <rect width="100%" height="100%" fill="#FAF7F2"/>
      ${rects}
    </svg>`;

    return new NextResponse(svg, {
      headers: { "Content-Type": "image/svg+xml", "Cache-Control": "public, max-age=31536000" },
    });
  }

  // Individual artifact placeholder
  const bgColor = TILE_COLORS[hash % TILE_COLORS.length];
  const iconIdx = hash % 6;
  const icons = [
    `<circle cx="150" cy="130" r="40" fill="white" opacity="0.3"/><path d="M135 130l10 10 20-20" stroke="white" stroke-width="3" fill="none"/>`,
    `<rect x="120" y="110" width="60" height="40" rx="3" fill="white" opacity="0.3"/><circle cx="135" cy="125" r="5" fill="white" opacity="0.5"/>`,
    `<path d="M150 105l12 24h-24z" fill="white" opacity="0.3"/><path d="M140 129l20 0" stroke="white" stroke-width="2"/>`,
    `<text x="150" y="135" text-anchor="middle" font-size="28" fill="white" opacity="0.4" font-family="Georgia">&lt;/&gt;</text>`,
    `<circle cx="150" cy="125" r="25" fill="none" stroke="white" opacity="0.3" stroke-width="2"/><path d="M140 120q10-10 20 0q-10 10-20 0" fill="white" opacity="0.3"/>`,
    `<rect x="130" y="110" width="40" height="30" rx="2" fill="white" opacity="0.3"/><line x1="135" y1="118" x2="165" y2="118" stroke="white" opacity="0.4" stroke-width="1.5"/><line x1="135" y1="125" x2="155" y2="125" stroke="white" opacity="0.4" stroke-width="1.5"/><line x1="135" y1="132" x2="160" y2="132" stroke="white" opacity="0.4" stroke-width="1.5"/>`,
  ];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <rect width="100%" height="100%" fill="${bgColor}"/>
    <rect width="100%" height="100%" fill="url(#grain)" opacity="0.05"/>
    ${icons[iconIdx]}
    <text x="150" y="200" text-anchor="middle" font-size="11" fill="white" opacity="0.6" font-family="sans-serif">Artifact ${segments[segments.length - 1]}</text>
    <defs>
      <pattern id="grain" width="4" height="4" patternUnits="userSpaceOnUse">
        <rect width="1" height="1" fill="white"/>
      </pattern>
    </defs>
  </svg>`;

  return new NextResponse(svg, {
    headers: { "Content-Type": "image/svg+xml", "Cache-Control": "public, max-age=31536000" },
  });
}
