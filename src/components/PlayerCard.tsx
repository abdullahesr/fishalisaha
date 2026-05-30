import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Gauge, Shield, Swords, Trash2, Edit3 } from 'lucide-react';

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

interface PlayerCardProps {
  player: Player;
  onEdit: (player: Player) => void;
  onDelete: (id: string) => void;
  index: number;
}

const statIcons = [
  { key: 'power', icon: Zap, color: 'text-yellow-400' },
  { key: 'speed', icon: Gauge, color: 'text-blue-400' },
  { key: 'passing', icon: Swords, color: 'text-green-400' },
  { key: 'defense', icon: Shield, color: 'text-purple-400' },
];

export default function PlayerCard({ player, onEdit, onDelete, index }: PlayerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-zinc-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all duration-300 group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center shadow-md"
            style={{ backgroundColor: player.jerseyColor }}
          >
            <span className="text-white font-bold text-xs">
              {player.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
            </span>
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">{player.name}</h3>
            <span className="text-zinc-400 text-xs">{player.position}</span>
          </div>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(player)}
            className="p-1.5 rounded-lg hover:bg-zinc-700 text-zinc-400 hover:text-white transition-all"
            aria-label="Edit player"
          >
            <Edit3 size={14} />
          </button>
          <button
            onClick={() => onDelete(player.id)}
            className="p-1.5 rounded-lg hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-all"
            aria-label="Delete player"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {statIcons.map(({ key, icon: Icon, color }) => (
          <div key={key} className="flex items-center gap-2">
            <Icon size={12} className={color} />
            <div className="flex-1 h-1.5 bg-zinc-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${player[key as keyof typeof player] as number}%` }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`h-full rounded-full ${
                  key === 'power' ? 'bg-yellow-500' :
                  key === 'speed' ? 'bg-blue-500' :
                  key === 'passing' ? 'bg-green-500' : 'bg-purple-500'
                }`}
              />
            </div>
            <span className="text-zinc-400 text-xs w-6 text-right font-mono">
              {player[key as keyof typeof player]}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
