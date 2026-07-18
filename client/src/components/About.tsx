
export default function About() {
  return (
    <section id="about" className="py-20 px-6 max-w-5xl mx-auto border-t border-slate-800">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="md:w-2/3">
          <h2 className="text-3xl font-bold text-slate-100 mb-6 flex items-center">
            <span className="text-cyan-400 font-mono text-xl mr-2">01.</span> About Me
            <div className="ml-4 h-[1px] bg-slate-700 flex-grow"></div>
          </h2>
          <div className="text-slate-400 space-y-4 text-lg leading-relaxed">
            <p>
              Hello! I am Muhammad Taha, a passionate undergraduate Computer Science student who enjoys building things that live on the internet. My interest in software engineering spans both high-level web architectures and deep-level core subjects like algorithm design and network protocols.
            </p>
            <p>
              With four years of professional experience under my belt, I've had the privilege of working on diverse projects, including analyzing business structures for AI consulting and developing full-stack applications. I specialize in the MERN stack (MongoDB, Express, React, Node.js), focusing on creating scalable and optimized backend routes.
            </p>
            <p>
              Looking ahead, I am actively preparing to pursue a Master's degree in Computer Science for the Fall 2027 term to further refine my technical expertise. When I'm not coding, you can usually find me studying for the GRE/IELTS or practicing my conversational French!
            </p>
          </div>
        </div>
        <div className="md:w-1/3 flex justify-center">
          {/* Placeholder for your profile picture */}
          <div className="relative group w-64 h-64">
            <div className="absolute inset-0 border-2 border-cyan-400 rounded translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition duration-300"></div>
            <div className="absolute inset-0 bg-slate-700 rounded overflow-hidden z-10 grayscale group-hover:grayscale-0 transition duration-300">
              <div className="w-full h-full flex items-center justify-center text-slate-500 font-mono">
                [Image Placeholder]
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}