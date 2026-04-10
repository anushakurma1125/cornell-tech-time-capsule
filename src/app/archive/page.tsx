import { getAllYearsData } from "@/lib/google-drive";
import ArchivePageClient from "@/components/ArchivePageClient";

export default async function ArchivePage() {
  const yearsData = await getAllYearsData();
  const years = yearsData.map((y) => y.year).sort((a, b) => b - a);

  return <ArchivePageClient years={years} yearsData={yearsData} />;
}
