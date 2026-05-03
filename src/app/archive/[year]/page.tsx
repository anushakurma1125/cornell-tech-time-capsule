import YearPageClient from "@/components/YearPageClient";
import { getYearData } from "@/lib/google-drive";

export const revalidate = 300;

export default async function YearPage({ params }: { params: Promise<{ year: string }> }) {
  const { year } = await params;
  const yearNum = parseInt(year, 10);
  const data = await getYearData(yearNum);

  // Derive program list from actual data — only show programs that exist in submissions
  const programs = data
    ? Array.from(new Set(data.artifacts.map((a) => a.program).filter(Boolean))).sort()
    : [];

  return <YearPageClient yearStr={year} data={data || null} programs={programs} />;
}
