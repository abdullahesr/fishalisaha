import React from 'react';
import { motion } from 'framer-motion';
import { Users, Zap, Gauge, Shield, Swords, Trophy } from 'lucide-react';

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

interface TeamStatsProps {
  players: Player[];
}

export default function TeamStats({ players }: TeamStatsProps) {
  const totalPower = players.reduce((sum, p) => sum + p.power, 0);
  const avgPower = players.length > 0 ? Math.round(totalPower / players.length) : 0;
  const avgSpeed = players.length > 0 ? Math.round(players.reduce((sum, p) => sum + p.speed, 0) / players.length) : 0;
  const avgPassing = players.length > 0 ? Math.round(players.reduce((sum, p) => sum + p.passing, 0) / players.length) : 0;
  const avgDefense = players.length > 0 ? Math.round(players.reduce((sum, p) => sum + p.defense, 0) / players.length) : 0;

  const stats = [
    { label: 'Avg Power', value: avgPower, icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
    { label: 'Avg Speed', value: avgSpeed, icon: Gauge, color: 'text-blue-400', bg: 'bg-blue-500/20' },
    { label: 'Avg Passing', value: avgPassing, icon: Swords, color: 'text-green-400', bg: 'bg-green-500/20' },
    { label: 'Avg Defense', value: avgDefense, icon: Shield, color: 'text-purple-400', bg: 'bg-purple-500/20' },
  ];

  const getTeamRating = () => {
    if (avgPower >= 85) return { label: 'Legendary', color: 'text-yellow-400' };
    if (avgPower >= 75) return { label: 'Elite', color: 'text-purple-400' };
    if (avgPower >= 65) return { label: 'Strong', color: 'text-blue-400' };
    if (avgPower >= 55) return { label: 'Average', color: 'text-green-400' };
    return { label: 'Developing', color: 'text-zinc-400' };
  };

  const rating = getTeamRating();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold flex items-center gap-2">
          <Users size={18} />
          Team Overview
        </h3>
        <div className="flex items-center gap-2">
          <Trophy size={16} className={rating.color} />
          <span className={`font-bold text-sm ${rating.color}`}>{rating.label}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {stats.map(({ label, value, icon: Icon, color, bg }, index) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`${bg} rounded-lg p-3`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Icon size={14} className={color} />
              <span className="text-zinc-400 text-xs">{label}</span>
            </div>
            <span className="text-white text-2xl font-bold font-mono">{value}</span>
          </motion.div>
        ))}
      </div>

      <div className="bg-zinc-900/50 rounded-lg p-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-zinc-400">Total Players</span>
          <span className="text-white font-semibold">{players.length}/7</span>
        </div>
        <div className="mt-2 h-2 bg-zinc-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(players.length / 7) * 100}%` }}
            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
          />
        </div>
      </div>

      {players.length === 7 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg p-3 text-center"
        >
          <p className="text-yellow-400 font-semibold text-sm">✓ Squad Complete!</p>
          <p className="text-zinc-400 text-xs mt-1">Your team is ready for the match</p>
        </motion.div>
      )}
    </motion.div>
  );
}
