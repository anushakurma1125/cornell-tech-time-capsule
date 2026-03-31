import YearPageClient from "@/components/YearPageClient";

export default async function YearPage({ params }: { params: Promise<{ year: string }> }) {
  const { year } = await params;
  return <YearPageClient yearStr={year} />;
}
