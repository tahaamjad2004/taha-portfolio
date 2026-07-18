import React from 'react';

export default function Hero() {
  return (
    <section id="hero" className="min-h-[85vh] flex flex-col justify-center items-start px-6 max-w-5xl mx-auto">
      <p className="text-cyan-400 font-mono text-sm mb-3">Hi, my name is</p>
      <h1 className="text-5xl md:text-7xl font-extrabold text-slate-100 mb-4 tracking-tight">
        Muhammad Taha.
      </h1>
      <h2 className="text-4xl md:text-6xl font-bold text-slate-400 mb-6">
        I build intelligent full-stack applications.
      </h2>
      <p className="text-slate-400 max-w-xl text-lg mb-8 leading-relaxed">
        I am an undergraduate Computer Science student passionate about core software engineering, 
        robust backend architectures, and intelligent web systems. Currently crafting optimized, 
        secure applications with modern stacks.
      </p>
      <div className="flex gap-4">
        <a 
          href="#projects" 
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-900 font-semibold rounded hover:opacity-90 transition shadow-lg shadow-cyan-500/10"
        >
          View My Work
        </a>
        <a 
          href="#contact" 
          className="px-6 py-3 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-cyan-400 font-medium rounded transition"
        >
          Get In Touch
        </a>
      </div>
    </section>
  );
}