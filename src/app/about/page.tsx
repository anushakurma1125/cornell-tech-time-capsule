"use client";

import { motion } from "framer-motion";
import SkylineSVG from "@/components/SkylineSVG";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-cornell-red uppercase tracking-tight">
            About the Time Capsule
          </h1>

          <div className="mt-8 space-y-6 text-text-secondary leading-relaxed">
            <p>
              The <strong className="text-text-primary">Cornell Tech Time Capsule</strong> is an
              annual tradition that invites every graduating student to answer one question:
            </p>

            <blockquote className="border-l-4 border-cornell-red pl-5 py-2 italic text-text-primary text-lg font-display">
              &ldquo;What does your time at Cornell Tech mean to you?&rdquo;
            </blockquote>

            <p>
              Each student creates a small 3&times;3 artifact — a photo, poem, doodle, piece of AI
              art, code snippet, or anything that captures their experience. These squares are
              printed together onto a fabric collage that is displayed at the graduation ceremony
              and then physically sealed in a time capsule on Roosevelt Island.
            </p>

            <h2 className="font-display text-2xl font-black text-text-primary pt-4 uppercase tracking-tight">
              The Digital Archive
            </h2>
            <p>
              This website preserves each cohort&rsquo;s collage and every individual submission in
              a searchable, year-based archive. Browse by graduation year, search by NetID, or
              filter by program to discover the stories, themes, and emotions that defined each
              class.
            </p>

            <h2 className="font-display text-2xl font-black text-text-primary pt-4 uppercase tracking-tight">
              Why It Matters
            </h2>
            <p>
              The time capsule creates continuity between cohorts. Future students can explore
              past years during orientation. Alumni can revisit their contributions years later.
              And the tradition itself — woven into fabric, sealed in steel, and now preserved
              digitally — grows richer with every graduating class.
            </p>

            <div className="pt-6">
              <Link
                href="/archive"
                className="inline-flex items-center gap-2 px-6 py-3 bg-cornell-red text-white font-semibold rounded-lg hover:bg-cornell-red-dark transition-colors"
              >
                Explore the Archive
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Skyline at bottom */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none opacity-30">
        <SkylineSVG className="w-full h-auto" />
      </div>
    </div>
  );
}
