// Main Google Drive folder ID — the ONLY hardcoded config
// This folder contains year subfolders (e.g., "2026", "2027")
// Each year folder should contain:
//   1. A Google Sheet named "Responses" (form responses with NetID, Image Links, Program columns)
//   2. A folder named "Final Fabric" (optional — contains the final fabric collage image)
//   3. A folder named "Image Links" (individual artifact images, managed by Google Forms)
//
// Adding a new year: Just create a new folder (e.g., "2027") in this Drive folder.
// The website auto-detects it within 5 minutes. No code changes needed.

export const MAIN_DRIVE_FOLDER_ID =
  "1g5HWUWoxbqv4YjyqiZs68KxwSbEb3V4BDQ9Ydt_GtcFAz075nTVNVDfa6mY4eczB0xSQ_tUE";

// Discovered year config (populated at runtime from Drive)
export interface YearConfig {
  year: number;
  sheetId: string; // Google Sheet ID for CSV export
  finalFabricFolderId?: string; // Folder ID for final fabric image
}
