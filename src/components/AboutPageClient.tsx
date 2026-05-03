"use client";

import { motion } from "framer-motion";
import SkylineSVG from "@/components/SkylineSVG";
import Link from "next/link";

interface AboutPageClientProps {
  founders: Record<string, string | null>;
}

export default function AboutPageClient({ founders }: AboutPageClientProps) {
  return (
    <div className="relative min-h-screen">
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-16">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-cornell-red hover:gap-3 transition-all mb-8"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* ============ INTRO: The People ============ */}
          <h1 className="font-display text-4xl sm:text-5xl font-black text-cornell-red uppercase tracking-tight">
            Meet the Team
          </h1>
          <p className="mt-4 text-text-secondary leading-relaxed">
            The Cornell Tech Time Capsule was started by{" "}
            <strong className="text-text-primary">Anusha Kurma</strong> and{" "}
            <strong className="text-text-primary">Shivani Kadakia</strong> as part of their
            Fried Fellowship project — a tradition designed to give every graduating class a
            way to leave their mark on Cornell Tech.
          </p>

          {/* Founder Cards */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Anusha */}
            <FounderCard
              name="Anusha Kurma"
              initials="AK"
              role="Fried Fellow · Class of 2026"
              imageUrl={founders.anusha}
              bio="Anusha is a Tech MBA candidate at Cornell Tech, passionate about building meaningful traditions that connect communities. She co-founded the Time Capsule project to create a lasting digital home for every graduating class's story."
            />

            {/* Shivani */}
            <FounderCard
              name="Shivani Kadakia"
              initials="SK"
              role="Fried Fellow · Class of 2026"
              imageUrl={founders.shivani}
              bio="Shivani is a Tech MBA candidate at Cornell Tech, focused on the intersection of design, storytelling, and student life. She co-founded the Time Capsule project to weave the threads of every cohort into one shared archive."
            />
          </div>

          <div className="mt-16 space-y-6 text-text-secondary leading-relaxed">
            {/* ============ ABOUT THE TIME CAPSULE ============ */}
            <h2 className="font-display text-3xl font-black text-cornell-red pt-4 uppercase tracking-tight">
              About the Time Capsule
            </h2>

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

            <h3 className="font-display text-xl font-bold text-text-primary pt-2 uppercase tracking-tight">
              The Digital Archive
            </h3>
            <p>
              This website preserves each cohort&rsquo;s collage and every individual submission
              in a searchable, year-based archive. Browse by graduation year, search by NetID,
              or filter by program to discover the stories, themes, and emotions that defined
              each class.
            </p>

            <h3 className="font-display text-xl font-bold text-text-primary pt-2 uppercase tracking-tight">
              Why It Matters
            </h3>
            <p>
              The time capsule creates continuity between cohorts. Future students can explore
              past years during orientation. Alumni can revisit their contributions years later.
              And the tradition itself — woven into fabric, sealed in steel, and now preserved
              digitally — grows richer with every graduating class.
            </p>

            {/* ============ ABOUT THE FRIED FELLOWSHIP ============ */}
            <h2 className="font-display text-3xl font-black text-cornell-red pt-10 uppercase tracking-tight">
              About the Fried Fellowship
            </h2>

            <p>
              The <strong className="text-text-primary">Fried Fellowships</strong> were
              established in 1989 by Johnson alumnus{" "}
              <strong className="text-text-primary">Albert Fried, Jr.</strong> and were expanded
              to include the Johnson Cornell Tech MBA program in the 2014–2015 academic year.
              They are granted annually to two JCT MBA students who exemplify academic
              excellence while also contributing to the community through their leadership both
              inside and outside the classroom.
            </p>

            <p>
              The award recognizes students with the highest level of demonstrated leadership
              and academic achievement in their Johnson careers. Over the course of the
              academic year, Fellows work with Johnson faculty and staff on a project that
              will benefit the Johnson community. Each Fried Fellow receives a fellowship of{" "}
              <strong className="text-text-primary">$10,000</strong> from Mr. Albert Fried
              Jr.&rsquo;s generous annual gift.
            </p>

            <h3 className="font-display text-xl font-bold text-text-primary pt-4 uppercase tracking-tight">
              About Albert Fried Jr. &rsquo;52, MBA &rsquo;53
            </h3>
            <p>
              Albert Fried, Jr. served as Managing Member at Albert Fried &amp; Company, LLC
              and Buttonwood Specialists, LLC. He is a Co-Founder of The Charles A. &amp; Anne
              Morrow Lindbergh Fund and The Centurion Foundation, and served as President of
              the Charles A. and Anne Morrow Lindbergh Fund. He served as a Captain in the
              U.S. Air Force, and is a Member Emeritus of the Advisory Council of the S. C.
              Johnson Graduate School of Management at Cornell University. Mr. Fried graduated
              from Cornell University with a Bachelor of Arts in June 1952 and a Master&rsquo;s
              in Business Administration in June 1953.
            </p>

            {/* ============ THANK YOU ============ */}
            <div className="mt-10 p-6 bg-parchment-dark rounded-xl border border-warm-gray">
              <h3 className="font-display text-xl font-bold text-cornell-red uppercase tracking-tight">
                A Special Thank You
              </h3>
              <p className="mt-3 text-text-primary leading-relaxed">
                To <strong>Mr. Fried</strong> — thank you for your continued generosity and
                support of Cornell Tech students. The Fried Fellowship has empowered many
                students to bring meaningful ideas to life, and the Time Capsule is one of
                many traditions made possible by your enduring belief in student leadership.
              </p>
            </div>

            <div className="pt-10">
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

// Founder Card sub-component
function FounderCard({
  name,
  initials,
  role,
  imageUrl,
  bio,
}: {
  name: string;
  initials: string;
  role: string;
  imageUrl: string | null;
  bio: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-warm-gray overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative aspect-[4/5] bg-gradient-to-br from-cornell-red/10 to-warm-gray/40 flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          // Plain img tag — fetched via Drive proxy
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <span className="font-display text-6xl font-black text-cornell-red/30">
            {initials}
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl font-bold text-text-primary">{name}</h3>
        <p className="text-sm text-cornell-red font-medium uppercase tracking-wide mt-1">
          {role}
        </p>
        <p className="text-sm text-text-secondary mt-3 leading-relaxed">{bio}</p>
      </div>
    </div>
  );
}
