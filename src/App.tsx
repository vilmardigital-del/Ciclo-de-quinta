import React, { useState, useMemo } from 'react';
import {
  ChordDegree,
  InstrumentType,
  KeyDefinition,
  Mode,
} from './types/music';
import { CIRCLE_KEYS, getHarmonicField } from './utils/musicTheory';
import { soundEngine } from './utils/audioSynth';
import { CircleOfFifthsWheel } from './components/CircleOfFifthsWheel';
import { HarmonicFieldCard } from './components/HarmonicFieldCard';
import { InstrumentVisualizer } from './components/InstrumentVisualizer';
import { EducationalGuide } from './components/EducationalGuide';
import { ReferenceImageModal } from './components/ReferenceImageModal';
import {
  Volume2,
  VolumeX,
  Music,
  Piano,
  BookOpen,
  Image as ImageIcon,
  Disc3,
} from 'lucide-react';

export default function App() {
  const [activeKey, setActiveKey] = useState<KeyDefinition>(CIRCLE_KEYS[0]); // C major default
  const [mode, setMode] = useState<Mode>('major');
  const [useTetrads, setUseTetrads] = useState<boolean>(false);
  const [instrument, setInstrument] = useState<InstrumentType>('piano');
  const [volume, setVolume] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showHarmonicMask, setShowHarmonicMask] = useState<boolean>(true);
  const [playingChordRoman, setPlayingChordRoman] = useState<string | null>(null);
  const [selectedChordForInspect, setSelectedChordForInspect] = useState<ChordDegree | null>(null);
  const [activeTab, setActiveTab] = useState<'harmonics' | 'instruments' | 'guide'>('harmonics');
  const [isReferenceModalOpen, setIsReferenceModalOpen] = useState<boolean>(false);

  // Selected chords (vermelho / red selectable options)
  const [selectedChords, setSelectedChords] = useState<string[]>([]);

  const handleToggleSelectChord = (roman: string) => {
    setSelectedChords((prev) =>
      prev.includes(roman) ? prev.filter((r) => r.toLowerCase() !== roman.toLowerCase()) : [...prev, roman]
    );
  };

  const handleClearSelectedChords = () => {
    setSelectedChords([]);
  };

  // Calculate current harmonic field based on activeKey and mode
  const harmonicField = useMemo(() => {
    return getHarmonicField(activeKey, mode);
  }, [activeKey, mode]);

  // Master volume change handler
  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    soundEngine.setVolume(newVol);
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
      soundEngine.setMuted(false);
    }
  };

  const handleToggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    soundEngine.setMuted(nextMute);
  };

  return (
    <div className="min-h-screen bg-[#070A10] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Mobile-Exclusive Top Header */}
      <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-850 px-3 py-2.5">
        <div className="max-w-md mx-auto flex items-center justify-between gap-2">
          {/* Brand Logo & Compact Mobile Title */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 p-0.5 shadow-md flex items-center justify-center shrink-0">
              <div className="w-full h-full rounded-[10px] bg-slate-950 flex items-center justify-center">
                <span className="text-amber-400 font-serif text-lg font-bold leading-none select-none">
                  𝄞
                </span>
              </div>
            </div>
            <div>
              <h1 className="text-base font-black tracking-tight text-white leading-tight">
                Ciclo de Quinta
              </h1>
              <span className="text-[10px] text-amber-400/90 font-semibold block leading-tight">
                Música & Harmonia
              </span>
            </div>
          </div>

          {/* Top Mobile Quick Controls (Instrument, Volume, Reference) */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Compact Instrument Dropdown */}
            <div className="flex items-center bg-slate-900 border border-slate-750 rounded-lg px-2 py-1">
              <Music className="w-3 h-3 text-amber-400 mr-1" />
              <select
                value={instrument}
                onChange={(e) => setInstrument(e.target.value as InstrumentType)}
                className="bg-transparent text-[11px] font-bold text-slate-200 outline-none cursor-pointer"
              >
                <option value="piano" className="bg-slate-900 text-slate-200">
                  Piano
                </option>
                <option value="rhodes" className="bg-slate-900 text-slate-200">
                  Rhodes
                </option>
                <option value="guitar" className="bg-slate-900 text-slate-200">
                  Violão
                </option>
                <option value="pad" className="bg-slate-900 text-slate-200">
                  Pad
                </option>
              </select>
            </div>

            {/* Mute Button */}
            <button
              type="button"
              onClick={handleToggleMute}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-750 text-slate-300"
              title={isMuted ? 'Ativar som' : 'Silenciar'}
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-rose-400" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-amber-400" />
              )}
            </button>

            {/* View Original Reference Image */}
            <button
              type="button"
              onClick={() => setIsReferenceModalOpen(true)}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-750 text-amber-400"
              title="Ver foto do brinquedo de madeira original"
            >
              <ImageIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Single-Column Mobile Content Container */}
      <main className="flex-1 w-full max-w-md mx-auto px-2 py-3 pb-24 space-y-4">
        {/* Tab 1: Ciclo & Campo Harmônico (Main Hero View) */}
        {activeTab === 'harmonics' && (
          <div className="space-y-4">
            {/* The Maximized Interactive Circle of Fifths Wheel */}
            <div className="w-full bg-slate-900/70 border border-slate-800/80 rounded-3xl p-2.5 sm:p-3 shadow-2xl backdrop-blur-md flex flex-col items-center">
              <CircleOfFifthsWheel
                activeKey={activeKey}
                onSelectKey={setActiveKey}
                mode={mode}
                onToggleMode={setMode}
                instrument={instrument}
                playingChordRoman={playingChordRoman}
                showHarmonicMask={showHarmonicMask}
                onToggleHarmonicMask={() => setShowHarmonicMask(!showHarmonicMask)}
                selectedChords={selectedChords}
                onToggleSelectChord={handleToggleSelectChord}
              />
            </div>

            {/* The Complete Harmonic Field Card */}
            <div className="w-full">
              <HarmonicFieldCard
                activeKey={activeKey}
                mode={mode}
                harmonicField={harmonicField}
                useTetrads={useTetrads}
                onToggleTetrads={() => setUseTetrads(!useTetrads)}
                instrument={instrument}
                playingChordRoman={playingChordRoman}
                onSelectChordForInspect={setSelectedChordForInspect}
                selectedChords={selectedChords}
                onToggleSelectChord={handleToggleSelectChord}
                onClearSelectedChords={handleClearSelectedChords}
              />
            </div>
          </div>
        )}

        {/* Tab 2: Instruments (Piano & Violão) */}
        {activeTab === 'instruments' && (
          <div className="space-y-4">
            <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">Tonalidade Ativa:</span>
                <span className="text-base font-black text-amber-400">
                  {mode === 'major' ? `${activeKey.majorRoot} Maior` : `${activeKey.minorRoot} Menor`}
                </span>
              </div>
              <span className="text-[11px] text-slate-400">Toque no acorde para ver as notas</span>
            </div>

            <InstrumentVisualizer
              activeKey={activeKey}
              mode={mode}
              selectedChord={selectedChordForInspect}
              instrument={instrument}
            />

            <HarmonicFieldCard
              activeKey={activeKey}
              mode={mode}
              harmonicField={harmonicField}
              useTetrads={useTetrads}
              onToggleTetrads={() => setUseTetrads(!useTetrads)}
              instrument={instrument}
              playingChordRoman={playingChordRoman}
              onSelectChordForInspect={setSelectedChordForInspect}
              selectedChords={selectedChords}
              onToggleSelectChord={handleToggleSelectChord}
              onClearSelectedChords={handleClearSelectedChords}
            />
          </div>
        )}

        {/* Tab 3: Guia Teórico & Foto Original */}
        {activeTab === 'guide' && (
          <EducationalGuide
            onSelectKey={(k) => {
              setActiveKey(k);
              setActiveTab('harmonics');
            }}
            activeKey={activeKey}
            onOpenReferenceImageModal={() => setIsReferenceModalOpen(true)}
          />
        )}
      </main>

      {/* Fixed Native-Style Bottom Mobile Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 border-t border-slate-800 backdrop-blur-lg px-2 py-1.5 shadow-2xl">
        <div className="max-w-md mx-auto grid grid-cols-3 gap-1">
          {/* Tab 1: Ciclo & Campo */}
          <button
            type="button"
            onClick={() => setActiveTab('harmonics')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
              activeTab === 'harmonics'
                ? 'bg-amber-500/15 text-amber-400 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Disc3 className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Ciclo & Campo</span>
          </button>

          {/* Tab 2: Instrumentos */}
          <button
            type="button"
            onClick={() => setActiveTab('instruments')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
              activeTab === 'instruments'
                ? 'bg-amber-500/15 text-amber-400 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Piano className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Piano & Violão</span>
          </button>

          {/* Tab 3: Guia Teórico */}
          <button
            type="button"
            onClick={() => setActiveTab('guide')}
            className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
              activeTab === 'guide'
                ? 'bg-amber-500/15 text-amber-400 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Guia Teórico</span>
          </button>
        </div>
      </nav>

      {/* Reference Image Modal */}
      <ReferenceImageModal
        isOpen={isReferenceModalOpen}
        onClose={() => setIsReferenceModalOpen(false)}
      />
    </div>
  );
}
