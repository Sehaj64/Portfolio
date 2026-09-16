"use client";

import Link from "next/link";
import { CodeXml, UserRound } from "lucide-react";

import { portfolioData } from "@/data/portfolio";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-display font-bold text-gradient">
          SK.
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
          <Link href="/#projects" className="hover:text-emerald-accent transition-colors">Projects</Link>
          <Link href="/#about" className="hover:text-emerald-accent transition-colors">About</Link>
          <Link href="/#contact" className="hover:text-emerald-accent transition-colors">Contact</Link>
        </div>

        <div className="flex items-center gap-4">
          <a href={portfolioData.github} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-white/5 rounded-full transition-colors" title="GitHub">
            <CodeXml size={20} className="text-white/80" />
          </a>
          <a href={portfolioData.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-white/5 rounded-full transition-colors" title="LinkedIn">
            <UserRound size={20} className="text-white/80" />
          </a>
        </div>
      </div>
    </nav>
  );
}
