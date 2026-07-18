

export default function Skills() {
  const skills = [
    {
      category: "Core Computer Science",
      items: ["Algorithm Design", "Dynamic Programming", "Greedy Strategies", "Network Routing Protocols"]
    },
    {
      category: "Web Technologies",
      items: ["React", "Node.js", "Express.js", "MongoDB", "Prisma ORM", "Tailwind CSS"]
    },
    {
      category: "Languages & Tools",
      items: ["TypeScript", "JavaScript", "C++", "PostgreSQL", "Git", "Supabase"]
    },
    {
      category: "Spoken Languages",
      items: ["English (Professional)", "French (Conversational)"]
    }
  ];

  return (
    <section id="skills" className="py-20 px-6 max-w-5xl mx-auto border-t border-slate-800">
      <h2 className="text-3xl font-bold text-slate-100 mb-10 flex items-center">
        <span className="text-cyan-400 font-mono text-xl mr-2">02.</span> Technical Arsenal
        <div className="ml-4 h-[1px] bg-slate-700 flex-grow"></div>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skills.map((skillGroup, index) => (
          <div key={index} className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 hover:border-cyan-500/50 transition">
            <h3 className="text-xl font-semibold text-slate-200 mb-4">{skillGroup.category}</h3>
            <ul className="grid grid-cols-2 gap-2">
              {skillGroup.items.map((item, idx) => (
                <li key={idx} className="text-slate-400 flex items-center text-sm">
                  <span className="text-cyan-400 mr-2">▹</span> {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}