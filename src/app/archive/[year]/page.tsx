import YearPageClient from "@/components/YearPageClient";
import { getYearData, getPrograms } from "@/lib/google-drive";

export default async function YearPage({ params }: { params: Promise<{ year: string }> }) {
  const { year } = await params;
  const yearNum = parseInt(year, 10);
  const data = await getYearData(yearNum);
  const programs = getPrograms();

  return <YearPageClient yearStr={year} data={data || null} programs={programs} />;
}
