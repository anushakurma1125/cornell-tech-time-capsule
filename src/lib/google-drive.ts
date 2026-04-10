import { Artifact, YearData } from "@/data/types";
import { yearsConfig, YearConfig } from "./config";

// Convert Google Drive sharing link to our image proxy
// Input:  https://drive.google.com/open?id=FILE_ID
// Output: /api/image/FILE_ID
function driveToImageUrl(driveLink: string): string {
  const match = driveLink.match(/id=([a-zA-Z0-9_-]+)/);
  if (match) {
    return `/api/image/${match[1]}`;
  }
  return driveLink;
}

// Parse CSV text into rows (handles quoted fields with commas)
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  const lines = text.split("\n");

  for (const line of lines) {
    if (!line.trim()) continue;
    const row: string[] = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === "," && !inQuotes) {
        row.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    row.push(current.trim());
    rows.push(row);
  }

  return rows;
}

// Normalize program names to match our Program type
function normalizeProgram(raw: string): string {
  const cleaned = raw.trim();
  const map: Record<string, string> = {
    "tech mba": "MBA",
    "mba": "MBA",
    "computer science": "CS",
    "cs": "CS",
    "data science": "Data Science",
    "information science": "IS",
    "information systems": "IS",
    "is": "IS",
    "orie": "ORIE",
    "ece": "ECE",
    "cm": "CM",
    "connective media": "Connective Media",
    "health tech": "Health Tech",
    "llm": "LLM",
    "technion": "Technion",
    "phd": "PhD",
  };
  return map[cleaned.toLowerCase()] || cleaned || "CS";
}

// Fetch file IDs from a public Google Drive folder
// Uses the folder's embedded view page to scrape file IDs (no API key needed)
// The folder must be shared as "Anyone with the link can view"
async function getFolderFileIds(folderId: string): Promise<string[]> {
  try {
    const url = `https://drive.google.com/embeddedfolderview?id=${folderId}#list`;
    const response = await fetch(url, {
      next: { revalidate: 300 }, // Revalidate every 5 minutes
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    if (!response.ok) return [];

    const html = await response.text();
    const fileIds: string[] = [];
    let match;

    // Pattern 1: entry IDs (e.g. id="entry-FILE_ID")
    const entryPattern = /entry-([a-zA-Z0-9_-]{15,})/g;
    while ((match = entryPattern.exec(html)) !== null) {
      if (match[1] !== folderId && !fileIds.includes(match[1])) {
        fileIds.push(match[1]);
      }
    }

    // Pattern 2: file links (e.g. /file/d/FILE_ID/view)
    if (fileIds.length === 0) {
      const filePattern = /\/file\/d\/([a-zA-Z0-9_-]+)/g;
      while ((match = filePattern.exec(html)) !== null) {
        if (!fileIds.includes(match[1])) {
          fileIds.push(match[1]);
        }
      }
    }

    // Pattern 3: data-id attributes or generic ID references
    if (fileIds.length === 0) {
      const altPattern = /(?:data-id|id)="?([a-zA-Z0-9_-]{20,})"?/g;
      while ((match = altPattern.exec(html)) !== null) {
        if (match[1] !== folderId && !fileIds.includes(match[1])) {
          fileIds.push(match[1]);
        }
      }
    }

    return fileIds;
  } catch (error) {
    console.error(`Error listing folder ${folderId}:`, error);
    return [];
  }
}

// Get the final fabric collage image URL for a year
// Returns the proxied image URL if a final fabric image exists, otherwise null
async function getFinalFabricUrl(config: YearConfig): Promise<string | null> {
  if (!config.finalFabricFolderId) return null;

  const fileIds = await getFolderFileIds(config.finalFabricFolderId);
  if (fileIds.length === 0) return null;

  // Use the first image in the folder as the final fabric
  return `/api/image/${fileIds[0]}`;
}

// Fetch and parse a year's data from its published Google Sheet
async function fetchYearFromSheet(config: YearConfig): Promise<YearData> {
  const artifacts: Artifact[] = [];

  try {
    const response = await fetch(config.sheetCsvUrl, {
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch sheet: ${response.status}`);
    }

    const csvText = await response.text();
    const rows = parseCsv(csvText);

    // First row is headers: Timestamp, Email Address, NetID, Image Links, Program
    const headers = rows[0]?.map((h) => h.toLowerCase()) || [];
    const netIdCol = headers.findIndex((h) => h.includes("netid"));
    const imageCol = headers.findIndex((h) => h.includes("image"));
    const programCol = headers.findIndex((h) => h.includes("program"));

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (!row || row.length < 3) continue;

      const netId = (row[netIdCol] || "").replace("@cornell.edu", "").trim();
      const imageLink = row[imageCol] || "";
      const program = row[programCol] || "";

      if (!netId || !imageLink) continue;

      artifacts.push({
        id: `${config.year}-${i}`,
        year: config.year,
        netId: netId.toLowerCase(),
        program: normalizeProgram(program) as Artifact["program"],
        title: `${netId}'s Square`,
        caption: "",
        imageUrl: driveToImageUrl(imageLink),
        artifactType: "photo",
      });
    }
  } catch (error) {
    console.error(`Error fetching data for year ${config.year}:`, error);
  }

  // Check for final fabric image; fall back to placeholder collage
  const finalFabricUrl = await getFinalFabricUrl(config);
  const collageImageUrl = finalFabricUrl || `/api/placeholder/collage/${config.year}`;

  return {
    year: config.year,
    collageImageUrl,
    aiSummary: "",
    published: artifacts.length > 0,
    artifacts,
    dominantThemes: [],
    emotionalTrends: [],
  };
}

// Public API — mirrors the old sample-data functions

export async function getYearData(year: number): Promise<YearData | undefined> {
  const config = yearsConfig.find((c) => c.year === year);
  if (!config) return undefined;
  return fetchYearFromSheet(config);
}

export async function getAllYears(): Promise<number[]> {
  // Return configured years sorted descending
  return yearsConfig.map((c) => c.year).sort((a, b) => b - a);
}

export async function getAllYearsData(): Promise<YearData[]> {
  const results = await Promise.all(yearsConfig.map(fetchYearFromSheet));
  return results.sort((a, b) => b.year - a.year);
}

export function getPrograms(): string[] {
  return ["MBA", "CS", "ORIE", "ECE", "IS", "CM", "LLM", "Connective Media", "Health Tech", "Technion", "Data Science", "PhD"];
}
