import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import Footer from "@/components/Footer";
import { portfolioData } from "@/data/portfolio";
import { Analytics } from "@vercel/analytics/react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-emerald-accent selection:text-black">
      <Navbar />
      
      <Hero />

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured <span className="text-emerald-accent italic">Case Studies</span></h2>
              <p className="text-white/40 max-w-lg">A deep dive into how I solve complex business problems using data engineering and advanced analytics.</p>
            </div>
            <div className="text-white/20 text-sm font-mono uppercase tracking-widest hidden md:block">
              [ Selected Works / 2024-2025 ]
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12">
            {portfolioData.projects.map((project) => (
              <ProjectCard 
                key={project.id}
                id={project.id}
                title={project.title}
                shortDescription={project.shortDescription}
                tech={project.tech}
                metrics={project.metrics as any}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="about" className="py-20 px-6 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-4xl font-bold mb-8 italic text-emerald-accent">Technical Stack</h2>
              <p className="text-lg text-white/60 leading-relaxed mb-8">
                My approach combines deep technical proficiency in SQL and Python with an architectural understanding of Data Warehousing and ETL processes. I build tools that don't just process data, but drive 40%+ operational efficiency.
              </p>
              <div className="flex flex-col gap-4">
                {portfolioData.education.map((edu, index) => (
                  <div key={index} className="p-6 rounded-xl border border-white/10 bg-white/5">
                    <p className="text-xs font-bold text-emerald-accent uppercase tracking-widest mb-2">Education</p>
                    <h4 className="text-xl font-bold">{edu.degree}</h4>
                    <p className="text-white/60">{edu.institution} | {edu.period}</p>
                    <p className="text-white/40 mt-2 font-mono text-sm">{edu.metrics}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {portfolioData.skills.map((skillGroup) => (
                <div key={skillGroup.category}>
                  <h3 className="text-sm font-bold tracking-widest uppercase text-white/40 mb-4 border-b border-white/10 pb-2">
                    {skillGroup.category}
                  </h3>
                  <ul className="space-y-2">
                    {skillGroup.items.map((skill) => (
                      <li key={skill} className="text-white/70 flex items-center gap-2">
                        <span className="w-1 h-1 bg-emerald-accent rounded-full" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-32 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold mb-8">Ready to <span className="text-gradient italic">build?</span></h2>
          <p className="text-xl text-white/60 mb-12">
            Looking for a Data Analyst who understands both the code and the commerce? Let&apos;s talk about your next project.
          </p>
          <div className="flex flex-col items-center justify-center gap-12">
            <div className="flex flex-col items-center">
              <p className="text-white/40 text-sm font-mono uppercase tracking-[0.2em] mb-4">Direct Email</p>
              <span className="text-3xl md:text-5xl font-bold text-emerald-accent selection:bg-white selection:text-black">
                {portfolioData.email}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a 
                href={portfolioData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-12 py-6 bg-emerald-accent text-black font-bold rounded-full hover:scale-105 transition-transform text-xl flex items-center gap-3"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <Analytics />
    </main>
  );
}
