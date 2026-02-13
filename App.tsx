
import React from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Play from './pages/Play';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Contact from './pages/Contact';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-blue-100 shadow-sm px-4 py-3">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white text-2xl group-hover:rotate-12 transition-transform">🦷</div>
          <span className="game-font text-xl text-blue-600 tracking-wider">TOOTH RACER</span>
        </Link>
        
        <div className="flex gap-4 md:gap-8 font-bold text-gray-600">
          <Link to="/" className={`${isActive('/') ? 'text-blue-500 border-b-2 border-blue-500' : 'hover:text-blue-400'} transition-colors`}>Home</Link>
          <Link to="/play" className={`${isActive('/play') ? 'text-blue-500 border-b-2 border-blue-500' : 'hover:text-blue-400'} transition-colors`}>Play Game</Link>
          <Link to="/about" className={`${isActive('/about') ? 'text-blue-500 border-b-2 border-blue-500' : 'hover:text-blue-400'} transition-colors`}>About</Link>
          <Link to="/contact" className={`${isActive('/contact') ? 'text-blue-500 border-b-2 border-blue-500' : 'hover:text-blue-400'} transition-colors`}>Contact</Link>
        </div>
      </div>
    </nav>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-gray-100 border-t border-gray-200 py-10 px-4 mt-20">
    <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-sm text-gray-600">
      <div>
        <h3 className="game-font text-blue-600 mb-4">TOOTH RACER</h3>
        <p>Keeping smiles bright through competitive racing. Avoid the sugar, keep the shine!</p>
      </div>
      <div>
        <h4 className="font-bold mb-4">Quick Links</h4>
        <ul className="space-y-2">
          <li><Link to="/privacy" className="hover:text-blue-500">Privacy Policy</Link></li>
          <li><Link to="/about" className="hover:text-blue-500">Education Portal</Link></li>
          <li><Link to="/contact" className="hover:text-blue-500">Support</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-4">Follow the Smile</h4>
        <div className="flex gap-4 text-2xl">
          <span>🐦</span><span>📘</span><span>📷</span>
        </div>
      </div>
    </div>
    <div className="text-center mt-10 border-t border-gray-200 pt-6 text-gray-400">
      © 2024 Tooth Racer: Cavity Escape. Educational & Entertaining.
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/play" element={<Play />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
