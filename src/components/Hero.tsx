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
            Engineering <span className="text-gradient">Intelligent Systems</span> & Agentic Workflows.
          </h1>
          <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl leading-relaxed">
            I build scalable AI applications, predictive models, and robust data pipelines to automate complex business processes and solve real-world problems.
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
