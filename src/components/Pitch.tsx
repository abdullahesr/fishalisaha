import React from 'react';
import { motion } from 'framer-motion';

interface Player {
  id: string;
  name: string;
  position: string;
  power: number;
  speed: number;
  passing: number;
  defense: number;
  jerseyColor: string;
}

interface PitchProps {
  players: Player[];
  onPlayerClick: (player: Player) => void;
}

const positions = [
  { label: 'GK', x: 50, y: 92 },
  { label: 'CB', x: 50, y: 75 },
  { label: 'LB', x: 20, y: 65 },
  { label: 'RB', x: 80, y: 65 },
  { label: 'CM', x: 50, y: 50 },
  { label: 'LW', x: 20, y: 35 },
  { label: 'RW', x: 80, y: 35 },
  { label: 'ST', x: 50, y: 18 },
];

const positionColors: Record<string, string> = {
  GK: 'from-yellow-500 to-yellow-600',
  CB: 'from-blue-500 to-blue-600',
  LB: 'from-blue-500 to-blue-600',
  RB: 'from-blue-500 to-blue-600',
  CM: 'from-green-500 to-green-600',
  LW: 'from-green-500 to-green-600',
  RW: 'from-green-500 to-green-600',
  ST: 'from-red-500 to-red-600',
};

export default function Pitch({ players, onPlayerClick }: PitchProps) {
  return (
    <div className="relative w-full max-w-2xl mx-auto aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
      {/* Grass background */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-700 via-emerald-600 to-emerald-800" />
      
      {/* Field markings */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 400" preserveAspectRatio="xMidYMid meet">
        {/* Outer border */}
        <rect x="10" y="10" width="280" height="380" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" rx="4" />
        
        {/* Center line */}
        <line x1="10" y1="200" x2="290" y2="200" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
        
        {/* Center circle */}
        <circle cx="150" cy="200" r="30" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
        
        {/* Center dot */}
        <circle cx="150" cy="200" r="3" fill="rgba(255,255,255,0.4)" />
        
        {/* Penalty areas */}
        <rect x="60" y="10" width="180" height="60" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" rx="2" />
        <rect x="60" y="330" width="180" height="60" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" rx="2" />
        
        {/* Goal areas */}
        <rect x="100" y="10" width="100" height="25" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
        <rect x="100" y="365" width="100" height="25" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
        
        {/* Goals */}
        <rect x="120" y="5" width="60" height="8" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
        <rect x="120" y="387" width="60" height="8" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
        
        {/* Penalty dots */}
        <circle cx="150" cy="40" r="2" fill="rgba(255,255,255,0.4)" />
        <circle cx="150" cy="360" r="2" fill="rgba(255,255,255,0.4)" />
        
        {/* Arc */}
        <path d="M 120 70 Q 150 85 180 70" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
        <path d="M 120 330 Q 150 315 180 330" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
      </svg>

      {/* Position labels */}
      {positions.map((pos, index) => {
        const player = players.find(p => p.position === pos.label);
        return (
          <motion.button
            key={pos.label}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
            onClick={() => player && onPlayerClick(player)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          >
            {player ? (
              <div className="flex flex-col items-center gap-1">
                <div 
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg border-2 border-white/30 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl"
                  style={{ backgroundColor: player.jerseyColor }}
                >
                  <span className="text-white font-bold text-xs md:text-sm drop-shadow-md">
                    {player.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div className="bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full">
                  <span className="text-white text-[10px] font-semibold">{player.power}</span>
                </div>
              </div>
            ) : (
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 border-2 border-dashed border-white/30 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                <span className="text-white/50 text-xs font-bold">{pos.label}</span>
              </div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
