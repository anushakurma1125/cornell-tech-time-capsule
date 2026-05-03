import { getFounders } from "@/lib/google-drive";
import AboutPageClient from "@/components/AboutPageClient";

export const revalidate = 300;

export default async function AboutPage() {
  const founders = await getFounders();
  return <AboutPageClient founders={founders} />;
}
