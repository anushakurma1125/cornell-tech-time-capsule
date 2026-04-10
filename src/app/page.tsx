import { getAllYearsData } from "@/lib/google-drive";
import HomePageClient from "@/components/HomePageClient";

export default async function HomePage() {
  const yearsData = await getAllYearsData();
  const years = yearsData.map((y) => y.year).sort((a, b) => b - a);
  const latestYear = yearsData[0] || null;

  return <HomePageClient years={years} yearsData={yearsData} latestYear={latestYear} />;
}
