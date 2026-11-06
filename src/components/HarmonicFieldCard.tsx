import React from 'react';
import { ChordDegree, InstrumentType, KeyDefinition, Mode } from '../types/music';
import { soundEngine } from '../utils/audioSynth';
import { Volume2, Play, Trash2 } from 'lucide-react';

interface HarmonicFieldCardProps {
  activeKey: KeyDefinition;
  mode: Mode;
  harmonicField: ChordDegree[];
  useTetrads: boolean;
  onToggleTetrads: () => void;
  instrument: InstrumentType;
  playingChordRoman?: string | null;
  onSelectChordForInspect?: (chord: ChordDegree) => void;
  selectedChords: string[];
  onToggleSelectChord: (roman: string) => void;
  onClearSelectedChords: () => void;
}

export const HarmonicFieldCard: React.FC<HarmonicFieldCardProps> = ({
  activeKey,
  mode,
  harmonicField,
  useTetrads,
  onToggleTetrads,
  instrument,
  playingChordRoman,
  onSelectChordForInspect,
  selectedChords,
  onToggleSelectChord,
  onClearSelectedChords,
}) => {
  const handlePlayChord = (degree: ChordDegree) => {
    soundEngine.playChord(degree.notes, instrument, 1.5);
    if (onSelectChordForInspect) {
      onSelectChordForInspect(degree);
    }
  };

  const handlePlaySelectedSequence = () => {
    const matched = selectedChords
      .map((r) => harmonicField.find((ch) => ch.roman.toLowerCase() === r.toLowerCase()))
      .filter((ch): ch is ChordDegree => !!ch);

    if (matched.length === 0) return;
    matched.forEach((chord, idx) => {
      setTimeout(() => {
        soundEngine.playChord(chord.notes, instrument, 1.4);
        if (onSelectChordForInspect) {
          onSelectChordForInspect(chord);
        }
      }, idx * 750);
    });
  };

  const getRoleBadgeStyle = (role: string) => {
    switch (role) {
      case 'Tônica':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'Subdominante':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'Dominante':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Sensível':
      default:
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
    }
  };

  return (
    <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-3 sm:p-5 shadow-xl backdrop-blur-md w-full">
      {/* Header with Title and Triad/Tetrad switch */}
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div>
          <h2 className="text-base sm:text-lg font-black text-slate-100 flex items-center gap-1.5">
            <span>Campo Harmônico</span>
            <span className="text-amber-400">
              {mode === 'major' ? `${activeKey.majorRoot} Maior` : `${activeKey.minorRoot} Menor`}
            </span>
          </h2>
          <span className="text-[11px] text-slate-400 hidden sm:block">
            Toque para ouvir ou marcar cada cifra em vermelho
          </span>
        </div>

        {/* Triads vs Tetrads Toggle */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
          <button
            type="button"
            onClick={() => useTetrads && onToggleTetrads()}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
              !useTetrads
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Tríades
          </button>
          <button
            type="button"
            onClick={() => !useTetrads && onToggleTetrads()}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
              useTetrads
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Tétrades 7ª
          </button>
        </div>
      </div>

      {/* Selected Chords Ribbon Bar when any chord is marked in red */}
      {selectedChords.length > 0 && (
        <div className="mt-3 p-2.5 rounded-xl bg-red-950/40 border border-red-600/40 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-sm shadow-red-600/80 animate-pulse shrink-0" />
            <span className="text-xs font-bold text-red-200">
              {selectedChords.length} {selectedChords.length === 1 ? 'marcada:' : 'marcadas:'}
            </span>
            <div className="flex items-center gap-1 flex-wrap">
              {selectedChords.map((roman) => {
                const match = harmonicField.find((c) => c.roman.toLowerCase() === roman.toLowerCase());
                const name = match ? (useTetrads ? match.tetrad : match.triad) : roman;
                return (
                  <span
                    key={`marked-${roman}`}
                    className="px-2 py-0.5 rounded-md bg-red-600 text-white font-black text-xs shadow-sm"
                  >
                    {name}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              type="button"
              onClick={handlePlaySelectedSequence}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow transition-all active:scale-95"
              title="Tocar cifras marcadas"
            >
              <Play className="w-3 h-3 fill-white" />
              <span>Ouvir</span>
            </button>
            <button
              type="button"
              onClick={onClearSelectedChords}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
              title="Desmarcar todas"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 7 Chords Grid - 2 COLUMNS ON MOBILE, 7th chord centered */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mt-3">
        {harmonicField.map((chord, idx) => {
          const chordName = useTetrads ? chord.tetrad : chord.triad;
          const isPlaying = playingChordRoman && playingChordRoman.toLowerCase() === chord.roman.toLowerCase();
          const isSelected = selectedChords.includes(chord.roman);
          const isLastSingle = idx === 6; // vii° chord spans 2 columns on mobile

          return (
            <div
              key={chord.roman}
              className={`relative rounded-xl p-2.5 flex flex-col justify-between transition-all duration-200 border cursor-pointer ${
                isLastSingle ? 'col-span-2 sm:col-span-1' : ''
              } ${
                isPlaying
                  ? 'bg-amber-500/20 border-amber-400 shadow-lg shadow-amber-500/20 ring-2 ring-amber-400 scale-[1.02]'
                  : isSelected
                  ? 'bg-slate-850/90 border-red-500 shadow-lg shadow-red-950/50 ring-1 ring-red-500/60'
                  : 'bg-slate-850/80 hover:bg-slate-800/90 border-slate-750'
              }`}
              onClick={() => handlePlayChord(chord)}
            >
              {/* Top Row: Roman degree and Role badge */}
              <div className="flex items-center justify-between">
                <span
                  className={`font-mono text-xs font-black px-1.5 py-0.5 rounded border ${
                    isSelected
                      ? 'bg-red-950 text-red-300 border-red-600'
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  {chord.roman}
                </span>
                <span
                  className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full border ${getRoleBadgeStyle(
                    chord.role
                  )}`}
                >
                  {chord.role}
                </span>
              </div>

              {/* Center: Big Chord Name */}
              <div className="my-2.5 text-center">
                <span
                  className={`text-xl sm:text-2xl font-black block tracking-tight ${
                    isPlaying
                      ? 'text-amber-300 animate-bounce'
                      : isSelected
                      ? 'text-red-400'
                      : 'text-white group-hover:text-amber-300'
                  }`}
                >
                  {chordName}
                </span>
                <span className="text-[11px] text-slate-400 block font-mono mt-0.5">
                  {chord.notes.map((n) => n.replace(/[0-9]/g, '')).join(' - ')}
                </span>
              </div>

              {/* OPÇÃO SELECIONÁVEL DENTRO DA CIFRA:
                  Cor inicial: Transparente (bg-transparent).
                  Ao clicar: Fica da cor VERMELHA (bg-red-600 text-white border-red-500). */}
              <div className="my-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSelectChord(chord.roman);
                  }}
                  className={`w-full py-1 px-2 rounded-lg text-[11px] font-bold border transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-red-600 hover:bg-red-700 text-white border-red-500 shadow-md shadow-red-600/40 ring-1 ring-red-400'
                      : 'bg-transparent hover:bg-red-950/20 text-slate-400 hover:text-red-300 border-slate-650 hover:border-red-400/60'
                  }`}
                  title={isSelected ? 'Opção marcada em vermelho (clique para desmarcar)' : 'Marcar opção em vermelho'}
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      isSelected ? 'bg-white shadow' : 'bg-transparent border border-slate-400'
                    }`}
                  />
                  <span>{isSelected ? 'Marcado (Vermelho)' : 'Selecionar'}</span>
                </button>
              </div>

              {/* Bottom Action: Ouvir Acorde */}
              <div className="flex items-center justify-center pt-2 border-t border-slate-800/80 mt-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayChord(chord);
                  }}
                  className="w-full py-1 rounded-md bg-slate-800/70 hover:bg-slate-750 flex items-center justify-center gap-1.5 text-[11px] text-slate-300 hover:text-white transition-colors"
                  title="Tocar acorde"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Ouvir</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
