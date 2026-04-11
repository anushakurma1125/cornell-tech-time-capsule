import { Artifact, YearData } from "@/data/types";
import { MAIN_DRIVE_FOLDER_ID, YearConfig } from "./config";

// ---------------------------------------------------------------------------
// Google Drive folder scanning (no API key needed — uses embedded folder view)
// ---------------------------------------------------------------------------

interface FolderEntry {
  id: string;
  title: string;
  isFolder: boolean;
  isSpreadsheet: boolean;
}

// Parse the embedded folder view HTML to extract entries
function parseFolderEntries(html: string): FolderEntry[] {
  const entries: FolderEntry[] = [];
  // Match each flip-entry block
  const entryPattern =
    /id="entry-([^"]+)"[\s\S]*?<div class="flip-entry-title">([^<]+)<\/div>/g;
  let match;

  while ((match = entryPattern.exec(html)) !== null) {
    const id = match[1];
    const title = match[2].trim();

    // Check if it's a folder (has folder icon class) or spreadsheet
    // Extract the surrounding HTML for this entry to check type
    const entryStart = html.lastIndexOf('<div class="flip-entry"', match.index);
    const entryEnd = html.indexOf("</div></div></div>", match.index);
    const entryHtml = html.substring(entryStart, entryEnd + 20);

    const isFolder = entryHtml.includes("drive-sprite-folder");
    const isSpreadsheet =
      entryHtml.includes("vnd.google-apps.spreadsheet") ||
      entryHtml.includes("/spreadsheets/d/");

    entries.push({ id, title, isFolder, isSpreadsheet });
  }

  return entries;
}

// Fetch and parse a Google Drive folder's contents
async function listFolder(folderId: string): Promise<FolderEntry[]> {
  try {
    const url = `https://drive.google.com/embeddedfolderview?id=${folderId}#list`;
    const response = await fetch(url, {
      next: { revalidate: 300 }, // Revalidate every 5 minutes
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    if (!response.ok) return [];

    const html = await response.text();
    return parseFolderEntries(html);
  } catch (error) {
    console.error(`Error listing folder ${folderId}:`, error);
    return [];
  }
}

// Discover all year configs by scanning the main Drive folder
async function discoverYears(): Promise<YearConfig[]> {
  const entries = await listFolder(MAIN_DRIVE_FOLDER_ID);
  const yearConfigs: YearConfig[] = [];

  for (const entry of entries) {
    // Year folders are named as 4-digit numbers (e.g., "2026", "2027")
    const yearNum = parseInt(entry.title, 10);
    if (!entry.isFolder || isNaN(yearNum) || yearNum < 2000 || yearNum > 2100) {
      continue;
    }

    // Scan inside the year folder to find the Sheet and Final Fabric folder
    const yearEntries = await listFolder(entry.id);

    let sheetId: string | undefined;
    let finalFabricFolderId: string | undefined;

    for (const ye of yearEntries) {
      if (ye.isSpreadsheet) {
        sheetId = ye.id;
      }
      if (ye.isFolder && ye.title.toLowerCase().includes("final fabric")) {
        finalFabricFolderId = ye.id;
      }
    }

    if (sheetId) {
      yearConfigs.push({
        year: yearNum,
        sheetId,
        finalFabricFolderId,
      });
    }
  }

  return yearConfigs.sort((a, b) => b.year - a.year);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

// Convert Google Drive sharing link to our image proxy
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

// Normalize program names
function normalizeProgram(raw: string): string {
  const cleaned = raw.trim();
  const map: Record<string, string> = {
    "tech mba": "MBA",
    mba: "MBA",
    "computer science": "CS",
    cs: "CS",
    "data science": "Data Science",
    "information science": "IS",
    "information systems": "IS",
    is: "IS",
    orie: "ORIE",
    ece: "ECE",
    cm: "CM",
    "connective media": "Connective Media",
    "health tech": "Health Tech",
    llm: "LLM",
    technion: "Technion",
    phd: "PhD",
  };
  return map[cleaned.toLowerCase()] || cleaned || "CS";
}

// Get first image file ID from a folder (for final fabric)
async function getFirstImageFromFolder(
  folderId: string
): Promise<string | null> {
  const entries = await listFolder(folderId);

  // Look for non-folder entries (image files)
  for (const entry of entries) {
    if (!entry.isFolder && !entry.isSpreadsheet) {
      return entry.id;
    }
  }

  return null;
}

// ---------------------------------------------------------------------------
// Fetch year data from Google Sheet
// ---------------------------------------------------------------------------

async function fetchYearData(config: YearConfig): Promise<YearData> {
  const artifacts: Artifact[] = [];

  try {
    // Use the export URL format — works for any publicly shared sheet
    const csvUrl = `https://docs.google.com/spreadsheets/d/${config.sheetId}/export?format=csv`;
    const response = await fetch(csvUrl, {
      next: { revalidate: 300 },
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

  // Check for final fabric image; fall back to placeholder
  let collageImageUrl = `/api/placeholder/collage/${config.year}`;
  if (config.finalFabricFolderId) {
    const fabricFileId = await getFirstImageFromFolder(
      config.finalFabricFolderId
    );
    if (fabricFileId) {
      collageImageUrl = `/api/image/${fabricFileId}`;
    }
  }

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

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function getYearData(
  year: number
): Promise<YearData | undefined> {
  const configs = await discoverYears();
  const config = configs.find((c) => c.year === year);
  if (!config) return undefined;
  return fetchYearData(config);
}

export async function getAllYears(): Promise<number[]> {
  const configs = await discoverYears();
  return configs.map((c) => c.year).sort((a, b) => b - a);
}

export async function getAllYearsData(): Promise<YearData[]> {
  const configs = await discoverYears();
  const results = await Promise.all(configs.map(fetchYearData));
  return results.sort((a, b) => b.year - a.year);
}

export function getPrograms(): string[] {
  return [
    "MBA",
    "CS",
    "ORIE",
    "ECE",
    "IS",
    "CM",
    "LLM",
    "Connective Media",
    "Health Tech",
    "Technion",
    "Data Science",
    "PhD",
  ];
}
