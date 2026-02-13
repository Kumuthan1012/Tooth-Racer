
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { GameEngine } from './engine';

const ToothRacerGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GameEngine | null>(null);
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'GAMEOVER'>('START');
  const [stats, setStats] = useState({ score: 0, health: 3, speed: 0, highScore: 0 });
  const [soundEnabled, setSoundEnabled] = useState(true);

  const updateUI = useCallback((data: any) => {
    setStats({
      score: Math.floor(data.score),
      health: data.health,
      speed: Math.floor(data.speed * 10),
      highScore: data.highScore
    });
    if (data.gameOver) {
      setGameState('GAMEOVER');
    }
  }, []);

  useEffect(() => {
    if (canvasRef.current && !engineRef.current) {
      engineRef.current = new GameEngine(canvasRef.current, updateUI);
    }
  }, [updateUI]);

  const startGame = () => {
    if (engineRef.current) {
      engineRef.current.reset();
      engineRef.current.start();
      setGameState('PLAYING');
    }
  };

  const toggleSound = () => {
    if (engineRef.current) {
      const newVal = !soundEnabled;
      setSoundEnabled(newVal);
      engineRef.current.toggleAudio(newVal);
    }
  };

  return (
    <div className="relative w-full h-full bg-blue-100 flex items-center justify-center overflow-hidden">
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={600} 
        className="w-full h-full max-w-full max-h-full object-contain"
      />

      {/* Start Screen */}
      {gameState === 'START' && (
        <div className="absolute inset-0 bg-blue-600/90 flex flex-col items-center justify-center text-white p-6">
          <h2 className="game-font text-4xl md:text-6xl mb-2 text-center drop-shadow-lg">TOOTH RACER</h2>
          <p className="game-font text-blue-200 text-xl mb-8">CAVITY ESCAPE</p>
          <div className="flex gap-4">
            <button 
              onClick={startGame}
              className="px-10 py-4 bg-white text-blue-600 rounded-full font-bold text-2xl hover:scale-105 transition-transform shadow-xl"
            >
              START GAME
            </button>
            <button 
              onClick={toggleSound}
              className="w-16 h-16 bg-blue-500/50 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors"
            >
              {soundEnabled ? '🔊' : '🔇'}
            </button>
          </div>
          <div className="mt-8 text-center text-blue-100 text-sm max-w-xs">
            Use Left/Right keys or swipe to avoid junk food!
          </div>
        </div>
      )}

      {/* In-Game HUD */}
      {gameState === 'PLAYING' && (
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start pointer-events-none">
          <div className="space-y-1">
            <div className="game-font text-2xl text-white drop-shadow-md">Score: {stats.score}</div>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <span key={i} className={`text-2xl transition-opacity duration-300 ${i < stats.health ? 'opacity-100' : 'opacity-20'}`}>🦷</span>
              ))}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-white/70 uppercase tracking-widest font-bold">Speed</div>
            <div className="game-font text-xl text-yellow-300">{stats.speed} km/h</div>
          </div>
        </div>
      )}

      {/* Game Over Screen */}
      {gameState === 'GAMEOVER' && (
        <div className="absolute inset-0 bg-red-600/90 flex flex-col items-center justify-center text-white p-6 animate-in fade-in zoom-in duration-300">
          <h2 className="game-font text-6xl mb-2 text-center text-yellow-300">GAME OVER!</h2>
          <div className="mb-8 text-center bg-black/20 p-6 rounded-2xl w-full max-w-sm border border-white/10">
            <div className="text-xl opacity-80">Distance Covered</div>
            <div className="game-font text-4xl mb-4">{stats.score}m</div>
            <div className="text-sm opacity-80 uppercase tracking-widest">All Time Best</div>
            <div className="game-font text-xl text-blue-200">{stats.highScore}m</div>
          </div>
          
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <button 
              onClick={startGame}
              className="w-full py-4 bg-white text-red-600 rounded-full font-bold text-2xl hover:scale-105 transition-transform shadow-xl"
            >
              PLAY AGAIN
            </button>
            
            {/* Game Over Ad Popup Placeholder */}
            <div className="w-full h-16 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center text-xs text-white/40 uppercase tracking-widest">
              Ad Slot
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToothRacerGame;
