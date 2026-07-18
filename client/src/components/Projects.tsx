
export default function Projects() {
  const featuredProjects = [
    {
      title: "MERN Stack Personal Portfolio Website",
      description: "A full-stack, secure developer portfolio leveraging React, Vite, Node.js, and Prisma. Features a protected admin dashboard, automated email notifications via Resend, server-side Zod data validation, and strict rate-limiting endpoints.",
      tech: ["React", "Node.js", "Express", "Prisma", "Supabase", "Tailwind CSS"],
      link: "#"
    },
    {
      title: "AI Consulting Business Infrastructure",
      description: "Assisted in structural analysis, strategic architecture maps, and service profiling for an AI-focused consultation venture. Designed systemic pipelines to explain complex AI automation models to prospective corporate clients.",
      tech: ["Business Architecture", "AI Automation Pipelines", "Systems Design"],
      link: "#"
    },
    {
      title: "Optimized Core Routing Simulator",
      description: "A deep-dive engineering simulator executing algorithmic paradigms (Dynamic Programming and Greedy approaches) to analyze structural bottlenecks in network routing protocols and optimize data throughput.",
      tech: ["C++", "Algorithm Design", "Network Protocols", "Optimization"],
      link: "#"
    }
  ];

  return (
    <section id="projects" className="py-20 px-6 max-w-5xl mx-auto border-t border-slate-800">
      <h2 className="text-3xl font-bold text-slate-100 mb-10 flex items-center">
        <span className="text-cyan-400 font-mono text-xl mr-2">03.</span> Things I've Built
        <div className="ml-4 h-[1px] bg-slate-700 flex-grow"></div>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredProjects.map((project, index) => (
          <div key={index} className="bg-slate-800/40 rounded-xl p-6 border border-slate-800 hover:border-cyan-500/30 transition flex flex-col justify-between">
            <div>
              <div className="text-cyan-400 font-mono text-xs mb-2">Featured Project</div>
              <h3 className="text-xl font-bold text-slate-200 mb-3 group-hover:text-cyan-400 transition">
                {project.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                {project.description}
              </p>
            </div>
            <div>
              <ul className="flex flex-wrap gap-2 mb-4 text-xs font-mono text-slate-500">
                {project.tech.map((t, idx) => (
                  <li key={idx} className="bg-slate-900/50 px-2 py-1 rounded border border-slate-800/80">{t}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}