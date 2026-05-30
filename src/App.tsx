import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Users, Shirt, Settings2 } from 'lucide-react';
import Pitch from './components/Pitch';
import PlayerCard from './components/PlayerCard';
import PlayerForm from './components/PlayerForm';
import TeamStats from './components/TeamStats';

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

const initialPlayers: Player[] = [
  { id: '1', name: 'Ahmet Yılmaz', position: 'GK', power: 85, speed: 60, passing: 65, defense: 88, jerseyColor: '#eab308' },
  { id: '2', name: 'Mehmet Demir', position: 'CB', power: 78, speed: 70, passing: 72, defense: 85, jerseyColor: '#3b82f6' },
  { id: '3', name: 'Ali Kaya', position: 'LB', power: 75, speed: 82, passing: 74, defense: 78, jerseyColor: '#3b82f6' },
  { id: '4', name: 'Can Öztürk', position: 'RB', power: 76, speed: 80, passing: 76, defense: 76, jerseyColor: '#3b82f6' },
  { id: '5', name: 'Emre Şahin', position: 'CM', power: 82, speed: 74, passing: 85, defense: 72, jerseyColor: '#22c55e' },
  { id: '6', name: 'Burak Aydın', position: 'LW', power: 80, speed: 88, passing: 78, defense: 65, jerseyColor: '#22c55e' },
  { id: '7', name: 'Cem Yıldız', position: 'ST', power: 88, speed: 85, passing: 70, defense: 45, jerseyColor: '#ef4444' },
];

export default function App() {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const handleSave = (player: Player) => {
    setPlayers(prev => {
      const exists = prev.find(p => p.id === player.id);
      if (exists) {
        return prev.map(p => p.id === player.id ? player : p);
      }
      return [...prev, player];
    });
  };

  const handleDelete = (id: string) => {
    setPlayers(prev => prev.filter(p => p.id !== id));
    if (selectedPlayer?.id === id) setSelectedPlayer(null);
  };

  const handleEdit = (player: Player) => {
    setEditingPlayer(player);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setEditingPlayer(null);
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-zinc-900/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg">
                <Shirt size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Saha Kur</h1>
                <p className="text-[11px] text-zinc-500 uppercase tracking-wider">7's Team Builder</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 text-zinc-400 text-sm">
                <Users size={16} />
                <span>{players.length}/7</span>
              </div>
              <button
                onClick={handleAddNew}
                disabled={players.length >= 7}
                className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-xl font-semibold text-sm hover:bg-zinc-200 transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Plus size={16} />
                Add Player
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pitch Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Pitch players={players} onPlayerClick={setSelectedPlayer} />
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <TeamStats players={players} />

            {/* Player List */}
            <div>
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Users size={18} />
                Squad
              </h3>
              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-700">
                <AnimatePresence>
                  {players.map((player, index) => (
                    <PlayerCard
                      key={player.id}
                      player={player}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      index={index}
                    />
                  ))}
                </AnimatePresence>
                {players.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8 text-zinc-500"
                  >
                    <Users size={40} className="mx-auto mb-3 opacity-50" />
                    <p className="text-sm">No players yet</p>
                    <p className="text-xs mt-1">Add players to build your team</p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Player Form Modal */}
      <PlayerForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingPlayer(null);
        }}
        onSave={handleSave}
        editingPlayer={editingPlayer}
      />

      {/* Selected Player Detail Modal */}
      <AnimatePresence>
        {selectedPlayer && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPlayer(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[400px] bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl z-50 p-6"
            >
              <div className="text-center mb-6">
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl"
                  style={{ backgroundColor: selectedPlayer.jerseyColor }}
                >
                  <span className="text-white font-bold text-2xl">
                    {selectedPlayer.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white">{selectedPlayer.name}</h2>
                <span className="text-zinc-400 text-sm">{selectedPlayer.position}</span>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  { label: 'Power', value: selectedPlayer.power, color: 'bg-yellow-500' },
                  { label: 'Speed', value: selectedPlayer.speed, color: 'bg-blue-500' },
                  { label: 'Passing', value: selectedPlayer.passing, color: 'bg-green-500' },
                  { label: 'Defense', value: selectedPlayer.defense, color: 'bg-purple-500' },
                ].map(({ label, value, color }) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="text-zinc-400 text-sm w-16">{label}</span>
                    <div className="flex-1 h-2 bg-zinc-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${color}`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <span className="text-white font-mono text-sm w-8 text-right">{value}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    handleEdit(selectedPlayer);
                    setSelectedPlayer(null);
                  }}
                  className="flex-1 bg-zinc-800 text-white py-2.5 rounded-xl font-medium hover:bg-zinc-700 transition-all"
                >
                  Edit Player
                </button>
                <button
                  onClick={() => {
                    handleDelete(selectedPlayer.id);
                    setSelectedPlayer(null);
                  }}
                  className="flex-1 bg-red-500/20 text-red-400 py-2.5 rounded-xl font-medium hover:bg-red-500/30 transition-all"
                >
                  Remove
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
