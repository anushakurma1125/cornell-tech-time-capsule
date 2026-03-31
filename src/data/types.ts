export type ArtifactType = "photo" | "poem" | "doodle" | "ai-art" | "code" | "drawing" | "mixed";

export type Program =
  | "MBA"
  | "CS"
  | "ORIE"
  | "ECE"
  | "IS"
  | "CM"
  | "LLM"
  | "Connective Media"
  | "Health Tech"
  | "Technion";

export interface Artifact {
  id: string;
  year: number;
  netId: string;
  program: Program;
  title: string;
  caption: string;
  imageUrl: string;
  artifactType: ArtifactType;
}

export interface YearData {
  year: number;
  collageImageUrl: string;
  aiSummary: string;
  published: boolean;
  artifacts: Artifact[];
  dominantThemes: string[];
  emotionalTrends: string[];
}
