"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Artifact } from "@/data/types";

interface ArtifactCardProps {
  artifact: Artifact;
  index: number;
  onClick: (artifact: Artifact) => void;
}

export default function ArtifactCard({ artifact, index, onClick }: ArtifactCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.5), duration: 0.35 }}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(artifact)}
      className="group rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-warm-gray/50 cursor-pointer w-full"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={artifact.imageUrl}
          alt={artifact.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>
    </motion.button>
  );
}
