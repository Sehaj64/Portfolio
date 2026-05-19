import { portfolioData } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="py-20 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <p className="text-xl font-display font-bold text-gradient mb-2">SK.</p>
          <p className="text-white/40 text-sm">© {new Date().getFullYear()} Sehaj Kumar. Built for impact.</p>
        </div>
        
        <div className="flex gap-8 text-sm font-medium text-white/40">
          <a href={portfolioData.github} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-accent transition-colors">GitHub</a>
          <a href={portfolioData.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-accent transition-colors">LinkedIn</a>
          <a href={`mailto:${portfolioData.email}`} className="hover:text-emerald-accent transition-colors">Email</a>
        </div>
      </div>
    </footer>
  );
}
