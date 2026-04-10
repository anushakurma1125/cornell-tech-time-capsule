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
    "data science": "IS",
    "information science": "IS",
    "orie": "ORIE",
    "ece": "ECE",
    "cm": "CM",
    "connective media": "Connective Media",
    "health tech": "Health Tech",
    "llm": "LLM",
    "technion": "Technion",
    "phd": "CS", // default PhD to CS
  };
  return map[cleaned.toLowerCase()] || cleaned || "CS";
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

  return {
    year: config.year,
    collageImageUrl: config.collageImageUrl || `/api/placeholder/collage/${config.year}`,
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
