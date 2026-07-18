
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Admin from './components/Admin'; // 👈 Added this import

function App() {
  // Keeps track of the current page path
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => setCurrentPath(window.location.pathname);
    
    // Listen for back/forward navigation or URL updates
    window.addEventListener('popstate', onLocationChange);
    return () => window.removeEventListener('popstate', onLocationChange);
  }, []);

  // 🔒 If the URL path is exactly '/admin', switch to the Admin page
  if (currentPath === '/admin') {
    return <Admin />;
  }

  // 🌐 Otherwise, show your public portfolio website
  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen font-sans scroll-smooth">
      {/* Navigation Bar */}
      <nav className="sticky top-0 bg-slate-900/80 backdrop-blur-md z-50 border-b border-slate-800 px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          MT.
        </div>
        <div className="flex gap-6 text-sm font-medium text-slate-400">
          <a href="#about" className="hover:text-cyan-400 transition">About</a>
          <a href="#skills" className="hover:text-cyan-400 transition">Skills</a>
          <a href="#projects" className="hover:text-cyan-400 transition">Projects</a>
          <a href="#contact" className="hover:text-cyan-400 transition">Contact</a>
        </div>
      </nav>

      {/* Portfolio Sections */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 text-center text-sm text-slate-500">
        &copy; {new Date().getFullYear()} Muhammad Taha. All rights reserved.
      </footer>
    </div>
  );
}

export default App;