// Year-over-year configuration
// Each year maps to its Google Sheet published CSV URL and metadata
// To add a new year: add a new entry here with the published CSV URL and folder IDs

export interface YearConfig {
  year: number;
  // The published CSV URL from Google Sheets (File → Share → Publish to web → CSV)
  sheetCsvUrl: string;
  // Google Drive folder ID for the final fabric image
  // (from URL: https://drive.google.com/drive/folders/FOLDER_ID)
  // If the folder has an image, it's used as the collage; if empty, a placeholder grid is shown
  finalFabricFolderId?: string;
}

export const yearsConfig: YearConfig[] = [
  {
    year: 2026,
    sheetCsvUrl:
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ2jPYD8XqrdUBInooFO9H_FxnIU-JOvNc0P5_-FScWZni-jLK-okpIbCV5-eIwYOUDlgU3tbVxQLNb/pub?output=csv",
    finalFabricFolderId: "1LqJIEWtXBf1iRXIf4C-vd1IdLfxUKi-_",
  },
  // Add future years here:
  // {
  //   year: 2027,
  //   sheetCsvUrl: "https://docs.google.com/spreadsheets/d/e/YOUR_PUBLISHED_URL/pub?output=csv",
  //   finalFabricFolderId: "FOLDER_ID",
  // },
];
