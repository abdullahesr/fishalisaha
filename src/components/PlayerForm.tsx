import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shirt, User, Swords, Gauge, Shield, Zap } from 'lucide-react';

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

interface PlayerFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (player: Player) => void;
  editingPlayer: Player | null;
}

const positions = ['GK', 'CB', 'LB', 'RB', 'CM', 'LW', 'RW', 'ST'];
const jerseyColors = [
  '#ef4444', '#3b82f6', '#22c55e', '#eab308', '#a855f7', 
  '#ec4899', '#f97316', '#14b8a6', '#6366f1', '#84cc16'
];

const defaultPlayer: Player = {
  id: '',
  name: '',
  position: 'CM',
  power: 75,
  speed: 70,
  passing: 70,
  defense: 70,
  jerseyColor: '#ef4444',
};

export default function PlayerForm({ isOpen, onClose, onSave, editingPlayer }: PlayerFormProps) {
  const [player, setPlayer] = useState<Player>(defaultPlayer);

  useEffect(() => {
    if (editingPlayer) {
      setPlayer(editingPlayer);
    } else {
      setPlayer({ ...defaultPlayer, id: crypto.randomUUID() });
    }
  }, [editingPlayer, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(player);
    onClose();
  };

  const updateStat = (key: keyof Player, value: number) => {
    setPlayer(prev => ({ ...prev, [key]: Math.max(0, Math.min(100, value)) }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[480px] bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl z-50 overflow-y-auto max-h-[90vh]"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">
                  {editingPlayer ? 'Edit Player' : 'Add Player'}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="flex items-center gap-2 text-zinc-300 text-sm font-medium mb-2">
                    <User size={16} />
                    Player Name
                  </label>
                  <input
                    type="text"
                    value={player.name}
                    onChange={(e) => setPlayer(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter player name..."
                    className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 transition-colors"
                    required
                  />
                </div>

                {/* Position */}
                <div>
                  <label className="flex items-center gap-2 text-zinc-300 text-sm font-medium mb-2">
                    <Swords size={16} />
                    Position
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {positions.map((pos) => (
                      <button
                        key={pos}
                        type="button"
                        onClick={() => setPlayer(prev => ({ ...prev, position: pos }))}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          player.position === pos
                            ? 'bg-white text-black'
                            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                        }`}
                      >
                        {pos}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Jersey Color */}
                <div>
                  <label className="flex items-center gap-2 text-zinc-300 text-sm font-medium mb-2">
                    <Shirt size={16} />
                    Jersey Color
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {jerseyColors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setPlayer(prev => ({ ...prev, jerseyColor: color }))}
                        className={`w-8 h-8 rounded-full transition-all ${
                          player.jerseyColor === color
                            ? 'ring-2 ring-white ring-offset-2 ring-offset-zinc-900 scale-110'
                            : 'hover:scale-110'
                        }`}
                        style={{ backgroundColor: color }}
                        aria-label={`Select color ${color}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-4">
                  <label className="text-zinc-300 text-sm font-medium">Player Stats</label>
                  
                  {[
                    { key: 'power', label: 'Power', icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-500' },
                    { key: 'speed', label: 'Speed', icon: Gauge, color: 'text-blue-400', bg: 'bg-blue-500' },
                    { key: 'passing', label: 'Passing', icon: Swords, color: 'text-green-400', bg: 'bg-green-500' },
                    { key: 'defense', label: 'Defense', icon: Shield, color: 'text-purple-400', bg: 'bg-purple-500' },
                  ].map(({ key, label, icon: Icon, color, bg }) => (
                    <div key={key} className="flex items-center gap-3">
                      <Icon size={16} className={color} />
                      <span className="text-zinc-400 text-sm w-16">{label}</span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={player[key as keyof Player] as number}
                        onChange={(e) => updateStat(key as keyof Player, parseInt(e.target.value))}
                        className="flex-1 h-2 bg-zinc-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                      />
                      <span className="text-white font-mono text-sm w-8 text-right">
                        {player[key as keyof Player]}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Preview */}
                <div className="bg-zinc-800/50 rounded-xl p-4 flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center shadow-md"
                    style={{ backgroundColor: player.jerseyColor }}
                  >
                    <span className="text-white font-bold text-sm">
                      {player.name ? player.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '??'}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">{player.name || 'Player Name'}</p>
                    <p className="text-zinc-400 text-sm">{player.position} · Power: {player.power}</p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-zinc-200 transition-all active:scale-[0.98]"
                >
                  {editingPlayer ? 'Update Player' : 'Add Player'}
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
