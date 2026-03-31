"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { yearsData, getAllYears } from "@/data/sample-data";
import FloatingSquares from "@/components/FloatingSquares";
import Image from "next/image";

export default function HomePage() {
  const years = getAllYears();
  const latestYear = yearsData.find((y) => y.year === years[0]);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col overflow-hidden">
        <FloatingSquares />

        {/* Hero content */}
        <div className="flex-1 flex items-center justify-center px-4 pt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center max-w-3xl mx-auto"
          >
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-black text-cornell-red leading-tight uppercase tracking-tight">
              Cornell Tech
              <br />
              Time Capsule
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-4 text-lg sm:text-xl text-text-secondary"
            >
              Add your square. Tell your story.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/archive"
                className="px-8 py-3 bg-cornell-red text-white font-semibold rounded-lg hover:bg-cornell-red-dark transition-colors shadow-sm"
              >
                Explore the Archive
              </Link>
              {latestYear && (
                <Link
                  href={`/archive/${latestYear.year}`}
                  className="px-8 py-3 border-2 border-cornell-red text-cornell-red font-semibold rounded-lg hover:bg-cornell-red hover:text-white transition-colors"
                >
                  Class of {latestYear.year}
                </Link>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Skyline — in normal flow, sits below content */}
        <div className="w-full mt-auto">
          <Image
            src="/images/skyline.png"
            alt="NYC skyline line art"
            width={1920}
            height={300}
            className="w-full h-auto"
            priority
          />
        </div>
      </section>

      {/* Latest Collage Preview */}
      {latestYear && (
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <span className="text-sm font-medium text-cornell-red uppercase tracking-wider">
                Latest Collage
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-text-primary mt-2 uppercase tracking-tight">
                Class of {latestYear.year}
              </h2>
              <p className="text-text-secondary mt-3 max-w-xl mx-auto">
                {latestYear.aiSummary}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-xl overflow-hidden shadow-xl border border-warm-gray fabric-texture"
            >
              <Link href={`/archive/${latestYear.year}`}>
                <div className="relative aspect-[4/3] sm:aspect-[16/9]">
                  <Image
                    src={latestYear.collageImageUrl}
                    alt={`Class of ${latestYear.year} fabric collage`}
                    fill
                    className="object-cover hover:scale-[1.02] transition-transform duration-700"
                    sizes="(max-width: 1200px) 100vw, 1200px"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span className="text-white/80 text-sm">
                      {latestYear.artifacts.length} artifacts
                    </span>
                  </div>
                  <span className="text-white text-sm font-medium bg-cornell-red/80 px-3 py-1 rounded-full backdrop-blur-sm">
                    Explore →
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Browse by Year */}
      <section className="py-16 px-4 bg-parchment-dark">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-black text-text-primary mb-8 uppercase tracking-tight">
            Browse by Year
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {years.map((year, i) => (
              <motion.div
                key={year}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={`/archive/${year}`}
                  className="block p-6 bg-white rounded-xl border border-warm-gray hover:border-cornell-red hover:shadow-md transition-all group"
                >
                  <span className="font-display text-3xl font-bold text-cornell-red group-hover:scale-105 inline-block transition-transform">
                    {year}
                  </span>
                  <p className="text-sm text-text-muted mt-1">
                    {yearsData.find((y) => y.year === year)?.artifacts.length} artifacts
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Themes preview */}
      {latestYear && (
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-2xl font-black text-text-primary mb-6 uppercase tracking-tight">
              Themes of {latestYear.year}
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {[...latestYear.dominantThemes, ...latestYear.emotionalTrends].map((tag, i) => {
                const colors = [
                  { bg: "#2E6DA4", border: "#2E6DA4" },
                  { bg: "#E76F51", border: "#E76F51" },
                  { bg: "#7B2D8E", border: "#7B2D8E" },
                  { bg: "#E9C46A", border: "#B8963A" },
                  { bg: "#264653", border: "#264653" },
                  { bg: "#4A90D9", border: "#4A90D9" },
                  { bg: "#D4724E", border: "#D4724E" },
                  { bg: "#6A5B8A", border: "#6A5B8A" },
                  { bg: "#3D7A68", border: "#3D7A68" },
                  { bg: "#C17D3B", border: "#C17D3B" },
                ];
                const c = colors[i % colors.length];
                return (
                  <span
                    key={tag}
                    className="px-4 py-1.5 text-sm font-medium rounded-full"
                    style={{
                      backgroundColor: `${c.bg}12`,
                      color: c.bg,
                      border: `1px solid ${c.border}30`,
                    }}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
