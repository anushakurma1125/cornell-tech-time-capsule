import { Artifact, Program, YearData } from "./types";

const programs: Program[] = ["MBA", "CS", "ORIE", "ECE", "IS", "CM", "LLM", "Connective Media", "Health Tech", "Technion"];

const artifactTypes = ["photo", "poem", "doodle", "ai-art", "code", "drawing", "mixed"] as const;

const titles2026 = [
  "Roosevelt Island Sunrise",
  "Code & Coffee",
  "Bridge Between Worlds",
  "My Cornell Tech Journey",
  "Studio Sprint Memory",
  "Innovation on the Island",
  "Late Night at the Bloomberg Center",
  "Tram Ride Reflections",
  "Product Studio Magic",
  "From Classroom to Startup",
  "NYC Skyline Dreams",
  "Team Spirit",
  "The Maker Space",
  "Open Studio Night",
  "East River Breezes",
  "Graduation Countdown",
];

const captions2026 = [
  "The sunrise over Manhattan from the island changed me.",
  "Every great idea started over a cup of coffee in the lounge.",
  "Connecting Ithaca traditions with NYC innovation.",
  "A year of growth, code, and community.",
  "48 hours, one product — unforgettable.",
  "Where technology meets purpose.",
  "The best debugging sessions happen after midnight.",
  "The tram is where I did my best thinking.",
  "Building something real with strangers who became family.",
  "I came to learn; I left ready to build.",
  "This skyline will always remind me of possibility.",
  "We were competitors in class, collaborators in life.",
  "Where ideas become tangible.",
  "Showing our work to the world felt electric.",
  "The river breeze on a spring evening — pure peace.",
  "Not an ending, a launchpad.",
];

const titles2025 = [
  "First Day Nerves",
  "The Tinkering Lab",
  "Hackathon Heroes",
  "Island Life",
  "Sprint & Pivot",
  "Debug Together",
  "Pitch Perfect",
  "Rooftop Views",
  "Data & Dreams",
  "Capstone Crunch",
  "Community Dinner",
  "Final Presentation",
];

const captions2025 = [
  "Walking onto Roosevelt Island for the first time.",
  "Where hardware met software and magic happened.",
  "36 hours of pure adrenaline and creation.",
  "A tiny island, a massive community.",
  "Learning to let go of the first idea.",
  "Pair programming at its finest.",
  "Standing on stage, heart racing, voice steady.",
  "Manhattan never looked so close.",
  "Numbers tell stories if you listen.",
  "The final push — exhausting and exhilarating.",
  "Breaking bread with brilliant minds.",
  "The culmination of everything we built.",
];

function generateArtifacts(year: number, count: number, titles: string[], captions: string[]): Artifact[] {
  const artifacts: Artifact[] = [];
  for (let i = 0; i < count; i++) {
    const program = programs[i % programs.length];
    const type = artifactTypes[i % artifactTypes.length];
    artifacts.push({
      id: `${year}-${String(i + 1).padStart(3, "0")}`,
      year,
      netId: `${program.toLowerCase().replace(/\s+/g, "").slice(0, 3)}${year % 100}${String(i + 1).padStart(2, "0")}`,
      program,
      title: titles[i % titles.length],
      caption: captions[i % captions.length],
      imageUrl: `/api/placeholder/${year}/${i}`,
      artifactType: type,
    });
  }
  return artifacts;
}

export const yearsData: YearData[] = [
  {
    year: 2026,
    collageImageUrl: "/api/placeholder/collage/2026",
    aiSummary:
      "The Class of 2026 embodies resilience and reinvention. Their artifacts pulse with themes of community, late-night breakthroughs, and the transformative power of building together on Roosevelt Island. A recurring motif of bridges — literal and metaphorical — connects their stories of crossing from aspiration to creation.",
    published: true,
    artifacts: generateArtifacts(2026, 16, titles2026, captions2026),
    dominantThemes: ["Community", "Innovation", "Bridges", "Resilience", "Creation"],
    emotionalTrends: ["Hopeful", "Determined", "Grateful", "Nostalgic", "Excited"],
  },
  {
    year: 2025,
    collageImageUrl: "/api/placeholder/collage/2025",
    aiSummary:
      "The Class of 2025 captured a year defined by experimentation and bold pivots. Their squares overflow with sketches of prototypes, snapshots of whiteboard brainstorms, and poetic reflections on the messy beauty of building something new. The island became their launchpad.",
    published: true,
    artifacts: generateArtifacts(2025, 12, titles2025, captions2025),
    dominantThemes: ["Experimentation", "Prototyping", "Growth", "Collaboration", "Ambition"],
    emotionalTrends: ["Adventurous", "Reflective", "Proud", "Connected", "Inspired"],
  },
];

export function getYearData(year: number): YearData | undefined {
  return yearsData.find((y) => y.year === year);
}

export function getAllYears(): number[] {
  return yearsData.filter((y) => y.published).map((y) => y.year).sort((a, b) => b - a);
}

export function getPrograms(): Program[] {
  return programs;
}
