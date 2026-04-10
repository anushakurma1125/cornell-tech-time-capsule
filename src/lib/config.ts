// Year-over-year configuration
// Each year maps to its Google Sheet published CSV URL and metadata
// To add a new year: add a new entry here with the published CSV URL

export interface YearConfig {
  year: number;
  // The published CSV URL from Google Sheets (File → Share → Publish to web → CSV)
  sheetCsvUrl: string;
  // Optional collage image (Google Drive link or local path)
  collageImageUrl?: string;
}

export const yearsConfig: YearConfig[] = [
  {
    year: 2026,
    sheetCsvUrl:
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ2jPYD8XqrdUBInooFO9H_FxnIU-JOvNc0P5_-FScWZni-jLK-okpIbCV5-eIwYOUDlgU3tbVxQLNb/pub?output=csv",
    collageImageUrl: "/api/placeholder/collage/2026",
  },
  // Add future years here:
  // {
  //   year: 2027,
  //   sheetCsvUrl: "https://docs.google.com/spreadsheets/d/e/YOUR_PUBLISHED_URL/pub?output=csv",
  // },
];
