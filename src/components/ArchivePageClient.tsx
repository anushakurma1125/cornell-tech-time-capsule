"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { YearData } from "@/data/types";

interface ArchivePageClientProps {
  years: number[];
  yearsData: YearData[];
}

export default function ArchivePageClient({ years, yearsData }: ArchivePageClientProps) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-16 pb-10 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-4xl sm:text-5xl font-black text-cornell-red uppercase tracking-tight">
            Archive
          </h1>
          <p className="text-text-secondary mt-3 max-w-lg mx-auto">
            Explore every graduating cohort&apos;s time capsule — their fabric collage, individual artifacts, and the stories that defined their year.
          </p>
        </motion.div>
      </section>

      {/* Year Cards */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {years.map((year, i) => {
            const data = yearsData.find((y) => y.year === year);
            if (!data) return null;
            return (
              <motion.div
                key={year}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
              >
                <Link
                  href={`/archive/${year}`}
                  className="group block bg-white rounded-xl border border-warm-gray overflow-hidden hover:shadow-xl hover:border-cornell-red/30 transition-all"
                >
                  {/* Collage preview */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={data.collageImageUrl}
                      alt={`Class of ${year} collage`}
                      fill
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-3 left-4">
                      <span className="font-display text-4xl font-bold text-white drop-shadow-lg">
                        {year}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-xs font-semibold text-cornell-red px-2.5 py-1 rounded-full">
                      {data.artifacts.length} artifacts
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <div className="mt-2 text-cornell-red text-sm font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Open year folder
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
