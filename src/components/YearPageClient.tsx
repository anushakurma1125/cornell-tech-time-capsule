"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Artifact, YearData } from "@/data/types";
import ArtifactCard from "@/components/ArtifactCard";
import ArtifactModal from "@/components/ArtifactModal";

interface YearPageClientProps {
  yearStr: string;
  data: YearData | null;
  programs: string[];
}

export default function YearPageClient({ yearStr, data, programs }: YearPageClientProps) {
  const year = parseInt(yearStr, 10);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProgram, setSelectedProgram] = useState<string>("all");
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);
  const [showCollage, setShowCollage] = useState(true);

  const filteredArtifacts = useMemo(() => {
    if (!data) return [];
    return data.artifacts.filter((a) => {
      const matchesSearch = !searchQuery || a.netId.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesProgram = selectedProgram === "all" || a.program === selectedProgram;
      return matchesSearch && matchesProgram;
    });
  }, [data, searchQuery, selectedProgram]);

  const handleShuffle = useCallback(() => {
    if (!data) return;
    const random = data.artifacts[Math.floor(Math.random() * data.artifacts.length)];
    setSelectedArtifact(random);
  }, [data]);

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="font-display text-4xl font-bold text-cornell-red">Year not found</h1>
        <p className="text-text-secondary mt-3">No archive exists for {yearStr}.</p>
        <Link href="/archive" className="mt-6 text-cornell-red font-semibold hover:underline">
          ← Back to Archive
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero / Collage Section */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 pt-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-text-muted mb-6">
            <Link href="/archive" className="hover:text-cornell-red transition-colors">Archive</Link>
            <span>/</span>
            <span className="text-text-primary font-medium">{year}</span>
          </nav>

          {/* Year title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-display text-5xl sm:text-6xl font-black text-cornell-red uppercase tracking-tight">
              Class of {year}
            </h1>
            <p className="text-text-secondary mt-3 max-w-2xl leading-relaxed">
              {data.aiSummary}
            </p>

            {/* Theme tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {[...data.dominantThemes, ...data.emotionalTrends].map((tag, i) => {
                const colors = [
                  "#2E6DA4", "#E76F51", "#7B2D8E", "#B8963A", "#264653",
                  "#4A90D9", "#D4724E", "#6A5B8A", "#3D7A68", "#C17D3B",
                ];
                const c = colors[i % colors.length];
                return (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium rounded-full"
                    style={{
                      backgroundColor: `${c}12`,
                      color: c,
                      border: `1px solid ${c}30`,
                    }}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          </motion.div>

          {/* Collage toggle */}
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setShowCollage(!showCollage)}
              className="text-sm font-medium text-cornell-red hover:underline flex items-center gap-1"
            >
              {showCollage ? "Hide" : "Show"} Fabric Collage
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className={`transition-transform ${showCollage ? "rotate-180" : ""}`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>

          {/* Collage */}
          <AnimatePresence>
            {showCollage && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden mb-10"
              >
                <div className="relative rounded-xl overflow-hidden shadow-lg border border-warm-gray fabric-texture">
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={data.collageImageUrl}
                      alt={`Class of ${year} fabric collage`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1280px) 100vw, 1280px"
                      priority
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-6">
                    <p className="text-white text-sm">
                      Final fabric collage — {data.artifacts.length} individual squares woven together
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Artifact Gallery */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        {/* Search and Filters */}
        <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md py-4 border-b border-warm-gray mb-6">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search by NetID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-warm-gray rounded-lg text-sm focus:outline-none focus:border-cornell-red focus:ring-1 focus:ring-cornell-red/30 transition-colors placeholder:text-text-muted"
              />
            </div>

            {/* Program filter */}
            <select
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="px-4 py-2.5 bg-white border border-warm-gray rounded-lg text-sm focus:outline-none focus:border-cornell-red focus:ring-1 focus:ring-cornell-red/30 text-text-primary cursor-pointer"
            >
              <option value="all">All Programs</option>
              {programs.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>

            {/* Shuffle button */}
            <button
              onClick={handleShuffle}
              className="px-4 py-2.5 bg-cornell-red text-white text-sm font-medium rounded-lg hover:bg-cornell-red-dark transition-colors flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
              </svg>
              Shuffle
            </button>

            {/* Results count */}
            <span className="text-xs text-text-muted ml-auto">
              {filteredArtifacts.length} of {data.artifacts.length} artifacts
            </span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredArtifacts.map((artifact, i) => (
              <ArtifactCard
                key={artifact.id}
                artifact={artifact}
                index={i}
                onClick={setSelectedArtifact}
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredArtifacts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-text-muted text-lg">No artifacts match your search.</p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedProgram("all"); }}
              className="mt-3 text-cornell-red font-medium hover:underline"
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </section>

      {/* Modal */}
      <ArtifactModal artifact={selectedArtifact} onClose={() => setSelectedArtifact(null)} />
    </div>
  );
}
