
import React from 'react';
import ToothRacerGame from '../components/Game/ToothRacerGame';

const Play: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col items-center">
      {/* Top Banner Ad Placeholder */}
      <div className="w-full h-24 bg-gray-100 border border-gray-200 rounded-lg mb-8 flex items-center justify-center text-gray-400 overflow-hidden">
        <div className="text-center">
          <div className="text-xs uppercase font-bold tracking-widest">Advertisement</div>
          <div className="text-lg">Google AdSense Banner Slot</div>
        </div>
      </div>

      <div className="w-full relative bg-gray-900 rounded-2xl shadow-2xl overflow-hidden aspect-[4/3] max-h-[70vh]">
        <ToothRacerGame />
      </div>

      {/* Bottom Banner Ad Placeholder */}
      <div className="w-full h-24 bg-gray-100 border border-gray-200 rounded-lg mt-8 flex items-center justify-center text-gray-400 overflow-hidden">
        <div className="text-center">
          <div className="text-xs uppercase font-bold tracking-widest">Advertisement</div>
          <div className="text-lg">Google AdSense Footer Slot</div>
        </div>
      </div>

      <div className="mt-12 w-full grid md:grid-cols-2 gap-8 bg-blue-50 p-8 rounded-2xl border border-blue-100">
        <div>
          <h2 className="game-font text-2xl text-blue-600 mb-4 underline">How to Play</h2>
          <ul className="space-y-3 text-blue-900">
            <li><strong>Desktop:</strong> Use <span className="bg-white px-2 py-1 rounded border shadow-sm">Left/Right Arrow Keys</span> to switch lanes.</li>
            <li><strong>Mobile:</strong> <span className="italic">Swipe Left or Right</span> to dodge enemies.</li>
            <li><strong>Objective:</strong> Survive as long as possible! Collecting healthy items boosts your score.</li>
          </ul>
        </div>
        <div>
          <h2 className="game-font text-2xl text-blue-600 mb-4 underline">Power-Ups</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🪥</span>
              <span><strong>Toothbrush:</strong> Invincible Shield</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🧪</span>
              <span><strong>Mouthwash:</strong> Slow Motion</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🧵</span>
              <span><strong>Floss:</strong> Clear Enemies</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🧴</span>
              <span><strong>Paste:</strong> 2x Score Multiplier</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Play;
