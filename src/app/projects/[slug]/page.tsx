import { portfolioData } from "@/data/portfolio";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import { CodeXml, ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolioData.projects.find((p) => p.id === slug);
  
  return {
    title: project ? `${project.title} | Sehaj Kumar` : "Project Details",
    description: project?.shortDescription,
  };
}

export async function generateStaticParams() {
  return portfolioData.projects.map((project) => ({
    slug: project.id,
  }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = portfolioData.projects.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  const { content } = project;

  const sections = [
    { title: "1. Executive Summary", body: content.executiveSummary },
    { title: "2. Business Problem", body: content.businessProblem },
    { title: "3. My Role", body: content.myRole },
    { title: "4. Dataset / Input", body: content.dataset },
    { title: "5. Solution Architecture", body: content.solutionArchitecture },
    { title: "6. Data Flow", body: content.dataFlow },
    { title: "7. Key Features", list: content.keyFeatures },
    { title: "8. Results / Insights", body: content.results },
    { title: "9. Limitations", body: content.limitations },
    { title: "10. What I Would Improve Next", body: content.nextSteps },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <article className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-white/40 hover:text-emerald-accent transition-colors mb-12 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to projects
          </Link>

          <header className="mb-16">
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((t) => (
                <span key={t} className="px-3 py-1 rounded-full bg-emerald-accent/10 text-emerald-accent text-[10px] font-bold tracking-widest uppercase border border-emerald-accent/20">
                  {t}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              {project.title}
            </h1>
            
            <div className="flex flex-wrap gap-6">
              {content.links.github !== "#" && (
                <a href={content.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-bold bg-white/5 hover:bg-white/10 px-6 py-3 rounded-lg border border-white/10 transition-all">
                  <CodeXml size={18} />
                  Source Code
                </a>
              )}
              {content.links.demo !== "#" && (
                <a href={content.links.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-bold bg-emerald-accent text-black hover:bg-emerald-accent/90 px-6 py-3 rounded-lg transition-all">
                  <ExternalLink size={18} />
                  {content.links.demoLabel}
                </a>
              )}
            </div>
          </header>

          {project.image && (
            <figure className="mb-16">
              <a href={project.image.src} target="_blank" rel="noopener noreferrer" aria-label="Open full-size dashboard screenshot">
                <Image src={project.image.src} alt={project.image.alt} width={1203} height={670} sizes="(max-width: 768px) 100vw, 896px" className="w-full h-auto rounded-lg border border-white/10" />
              </a>
              <figcaption className="text-sm text-white/60 mt-4 leading-relaxed">{project.image.caption}</figcaption>
            </figure>
          )}

          {project.gallery?.map((image) => (
            <figure key={image.src} className="mb-16">
              <a href={image.src} target="_blank" rel="noopener noreferrer" aria-label="Open full-size dashboard screenshot">
                <Image src={image.src} alt={image.alt} width={1254} height={750} sizes="(max-width: 768px) 100vw, 896px" className="w-full h-auto rounded-lg border border-white/10" />
              </a>
              <figcaption className="text-sm text-white/60 mt-4 leading-relaxed">{image.caption}</figcaption>
            </figure>
          ))}

          <div className="space-y-16">
            {sections.map((section) => (
              <section key={section.title} className="border-t border-white/5 pt-12">
                <h2 className="text-sm font-bold tracking-widest uppercase text-emerald-accent mb-6">
                  {section.title}
                </h2>
                {section.body && (
                  <p className="text-xl text-white/70 leading-relaxed font-light">
                    {section.body}
                  </p>
                )}
                {section.list && (
                  <ul className="space-y-4">
                    {section.list.map((item, i) => (
                      <li key={i} className="text-xl text-white/70 leading-relaxed font-light flex gap-4">
                        <span className="text-emerald-accent font-bold">—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <section className="border-t border-white/5 pt-12">
              <h2 className="text-sm font-bold tracking-widest uppercase text-emerald-accent mb-6">
                11. Project Links
              </h2>
              <div className="flex flex-col gap-4">
                <p className="text-white/60">Explore the technical implementation and live version of this project:</p>
                <div className="flex gap-4">
                  <a href={content.links.github} className="text-emerald-accent hover:underline">GitHub Repository</a>
                  <span className="text-white/20">/</span>
                  <a href={content.links.demo} className="text-emerald-accent hover:underline">{content.links.demoLabel}</a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
