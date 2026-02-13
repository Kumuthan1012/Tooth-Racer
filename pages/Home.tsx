
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="game-font text-5xl md:text-7xl text-blue-600 leading-tight mb-6">
            CAVITY ESCAPE IS HERE!
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            The ultimate dental racing challenge. Jump into your Shiny Tooth Car, dodge the Sugar Rush, and collect healthy power-ups to climb the leaderboard!
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/play" 
              className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-xl font-bold shadow-lg shadow-blue-200 transition-all hover:-translate-y-1"
            >
              PLAY NOW 🦷
            </Link>
            <Link 
              to="/about" 
              className="px-8 py-4 bg-white border-2 border-blue-500 text-blue-500 hover:bg-blue-50 rounded-full text-xl font-bold transition-all"
            >
              LEARN MORE
            </Link>
          </div>
        </div>
        
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-white p-2 rounded-2xl shadow-2xl overflow-hidden">
            <img 
              src="https://picsum.photos/seed/racing/800/600" 
              alt="Game Preview" 
              className="rounded-xl w-full"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
              <Link to="/play" className="bg-white text-blue-600 px-6 py-2 rounded-full font-bold">Watch Trailer</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-24 grid md:grid-cols-3 gap-8">
        <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100 text-center">
          <div className="text-4xl mb-4">🍔</div>
          <h3 className="game-font text-blue-800 text-xl mb-2">Avoid Junk</h3>
          <p className="text-blue-900/60">Burgers, soda, and candies are your enemies! One hit and you lose health.</p>
        </div>
        <div className="p-8 bg-green-50 rounded-3xl border border-green-100 text-center">
          <div className="text-4xl mb-4">🪥</div>
          <h3 className="game-font text-green-800 text-xl mb-2">Clean Power</h3>
          <h3 className="game-font text-green-800 text-xl mb-2">Up</h3>
          <p className="text-green-900/60">Grab toothbrushes and floss to activate shields and clear the road.</p>
        </div>
        <div className="p-8 bg-purple-50 rounded-3xl border border-purple-100 text-center">
          <div className="text-4xl mb-4">🏆</div>
          <h3 className="game-font text-purple-800 text-xl mb-2">High Scores</h3>
          <p className="text-purple-900/60">Race as far as possible to claim your spot on the daily dental hall of fame.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
