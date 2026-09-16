"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

interface ProjectCardProps {
  id: string;
  title: string;
  shortDescription: string;
  tech: string[];
  metrics: { [key: string]: string };
  image?: { src: string; alt: string; caption: string } | null;
}

export default function ProjectCard({ id, title, shortDescription, tech, metrics, image }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <Link href={`/projects/${id}`} className="block">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 transition-all hover:bg-white/[0.07] hover:border-white/20">
          {image && (
            <div className="mb-8 overflow-hidden rounded-lg border border-white/10">
              <Image src={image.src} alt={image.alt} width={1203} height={670} sizes="(max-width: 768px) 100vw, 1200px" className="w-full h-auto" />
            </div>
          )}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-6">
                {tech.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full bg-white/5 text-white/40 text-[10px] font-bold tracking-widest uppercase border border-white/5">
                    {t}
                  </span>
                ))}
              </div>
              <h3 className="text-3xl font-bold mb-4 group-hover:text-emerald-accent transition-colors">
                {title}
              </h3>
              <p className="text-white/60 mb-8 max-w-xl leading-relaxed">
                {shortDescription}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {Object.entries(metrics).map(([key, value]) => (
                  <div key={key}>
                    <p className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-1">{key.replace(/([A-Z])/g, ' $1')}</p>
                    <p className="text-lg font-semibold text-white/90">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-shrink-0">
              <div className="p-4 rounded-full border border-white/10 group-hover:border-emerald-accent/50 group-hover:text-emerald-accent transition-all">
                <ArrowUpRight size={24} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
