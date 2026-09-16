"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-accent/10 text-emerald-accent text-xs font-bold tracking-widest uppercase mb-6 border border-emerald-accent/20">
            Data Analyst
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight max-w-4xl">
            Turning data into <span className="text-gradient">clear business insights.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl leading-relaxed">
            I’m Sehaj Kumar, an AI and Data Science graduate. I build SQL analyses, dashboards and Python tools to investigate business questions and make reporting more reliable.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Link 
              href="/#projects" 
              className="px-8 py-4 bg-white text-black font-bold rounded-lg flex items-center gap-2 hover:bg-white/90 transition-all group"
            >
              View Case Studies
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/#contact" 
              className="px-8 py-4 bg-transparent border border-white/10 hover:border-white/20 rounded-lg font-bold transition-all"
            >
              Get in Touch
            </Link>
            <a href="/resume/Sehaj_Kumar_Data_Analyst_Resume.pdf" target="_blank" rel="noopener noreferrer" className="text-emerald-accent font-bold underline underline-offset-4">View resume (PDF)</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
