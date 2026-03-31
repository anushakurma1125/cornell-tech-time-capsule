"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Artifact } from "@/data/types";
import { useEffect } from "react";

interface ArtifactModalProps {
  artifact: Artifact | null;
  onClose: () => void;
}

export default function ArtifactModal({ artifact, onClose }: ArtifactModalProps) {
  useEffect(() => {
    if (!artifact) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [artifact, onClose]);

  return (
    <AnimatePresence>
      {artifact && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>

            {/* Image */}
            <div className="relative aspect-square w-full">
              <Image
                src={artifact.imageUrl}
                alt={artifact.title}
                fill
                className="object-cover rounded-t-xl"
                sizes="(max-width: 672px) 100vw, 672px"
              />
            </div>

            {/* Details */}
            <div className="p-6">
              <h2 className="font-display text-2xl font-bold text-text-primary">{artifact.title}</h2>
              <p className="text-text-secondary mt-2 leading-relaxed">{artifact.caption}</p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <Detail label="NetID" value={artifact.netId} />
                <Detail label="Program" value={artifact.program} />
                <Detail label="Year" value={String(artifact.year)} />
                <Detail label="Type" value={artifact.artifactType} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-parchment rounded-lg px-3 py-2">
      <span className="text-[10px] uppercase tracking-wider text-text-muted font-medium">{label}</span>
      <p className="text-sm font-semibold text-text-primary mt-0.5 font-mono">{value}</p>
    </div>
  );
}
