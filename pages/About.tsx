
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 prose prose-blue lg:prose-xl">
      <h1 className="game-font text-4xl text-blue-600 mb-8">About Tooth Racer</h1>
      <p className="text-lg">
        Tooth Racer: Cavity Escape was born from a simple mission: <strong>make dental hygiene fun for everyone.</strong> By transforming the struggle of avoiding cavities into an addictive high-speed arcade experience, we help players visualize the impact of sugary foods versus dental care tools.
      </p>
      
      <div className="bg-blue-50 p-8 rounded-2xl my-12 not-prose border border-blue-100">
        <h2 className="game-font text-blue-800 mb-4">Educational Impact</h2>
        <ul className="space-y-4 text-blue-900/80">
          <li className="flex gap-4">
            <span className="text-2xl shrink-0">🍏</span>
            <span>Reinforces the idea that "enemies" like burgers and candy cause "health loss" (decay) in a tooth character.</span>
          </li>
          <li className="flex gap-4">
            <span className="text-2xl shrink-0">🦷</span>
            <span>Shows how "protectors" like toothpaste and brushes provide "shields" and "speed bonuses" (strength).</span>
          </li>
          <li className="flex gap-4">
            <span className="text-2xl shrink-0">🧠</span>
            <span>Utilizes game-based learning to improve recall of hygiene habits.</span>
          </li>
        </ul>
      </div>

      <h2 className="game-font text-2xl text-blue-600">The Team</h2>
      <p>
        Our team consists of game designers, educators, and dental professionals who believe that interactive media is the best way to teach preventative health.
      </p>
    </div>
  );
};

export default About;
