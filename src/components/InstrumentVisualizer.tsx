import React, { useState } from 'react';
import { ChordDegree, InstrumentType, KeyDefinition, Mode } from '../types/music';
import { soundEngine } from '../utils/audioSynth';
import { Piano, Guitar, Info } from 'lucide-react';

interface InstrumentVisualizerProps {
  activeKey: KeyDefinition;
  mode: Mode;
  selectedChord?: ChordDegree | null;
  instrument: InstrumentType;
}

export const InstrumentVisualizer: React.FC<InstrumentVisualizerProps> = ({
  activeKey,
  mode,
  selectedChord,
  instrument,
}) => {
  const [viewMode, setViewMode] = useState<'piano' | 'guitar'>('piano');

  const scaleNotes = mode === 'major' ? activeKey.scaleNotesMajor : activeKey.scaleNotesMinor;
  const activeChordNotes = selectedChord ? selectedChord.notes.map((n) => n.replace(/[0-9]/g, '')) : [];

  // 2 Octaves Piano definition (C3 to B4)
  const pianoWhiteKeys = [
    { note: 'C', octave: 3, isBlack: false },
    { note: 'D', octave: 3, isBlack: false },
    { note: 'E', octave: 3, isBlack: false },
    { note: 'F', octave: 3, isBlack: false },
    { note: 'G', octave: 3, isBlack: false },
    { note: 'A', octave: 3, isBlack: false },
    { note: 'B', octave: 3, isBlack: false },
    { note: 'C', octave: 4, isBlack: false },
    { note: 'D', octave: 4, isBlack: false },
    { note: 'E', octave: 4, isBlack: false },
    { note: 'F', octave: 4, isBlack: false },
    { note: 'G', octave: 4, isBlack: false },
    { note: 'A', octave: 4, isBlack: false },
    { note: 'B', octave: 4, isBlack: false },
  ];

  const pianoBlackKeys = [
    { note: 'C#', alt: 'Db', octave: 3, offsetLeftPct: 4.8 },
    { note: 'D#', alt: 'Eb', octave: 3, offsetLeftPct: 12.0 },
    { note: 'F#', alt: 'Gb', octave: 3, offsetLeftPct: 26.3 },
    { note: 'G#', alt: 'Ab', octave: 3, offsetLeftPct: 33.4 },
    { note: 'A#', alt: 'Bb', octave: 3, offsetLeftPct: 40.5 },
    { note: 'C#', alt: 'Db', octave: 4, offsetLeftPct: 54.8 },
    { note: 'D#', alt: 'Eb', octave: 4, offsetLeftPct: 62.0 },
    { note: 'F#', alt: 'Gb', octave: 4, offsetLeftPct: 76.3 },
    { note: 'G#', alt: 'Ab', octave: 4, offsetLeftPct: 83.4 },
    { note: 'A#', alt: 'Bb', octave: 4, offsetLeftPct: 90.5 },
  ];

  const isNoteInChord = (noteName: string, altName?: string) => {
    if (activeChordNotes.length === 0) return false;
    return activeChordNotes.includes(noteName) || (altName && activeChordNotes.includes(altName));
  };

  const isNoteInScale = (noteName: string, altName?: string) => {
    return scaleNotes.includes(noteName) || (altName && scaleNotes.includes(altName));
  };

  const playKey = (note: string, octave: number) => {
    soundEngine.playSingleNote(`${note}${octave}`, instrument, 1.0);
  };

  // Guitar Standard Tuning (from 1st string High E to 6th string Low E)
  const guitarStrings = [
    { name: 'e (1ª)', openNote: 'E', openSemi: 4, octave: 4 },
    { name: 'B (2ª)', openNote: 'B', openSemi: 11, octave: 3 },
    { name: 'G (3ª)', openNote: 'G', openSemi: 7, octave: 3 },
    { name: 'D (4ª)', openNote: 'D', openSemi: 2, octave: 3 },
    { name: 'A (5ª)', openNote: 'A', openSemi: 9, octave: 2 },
    { name: 'E (6ª)', openNote: 'E', openSemi: 4, octave: 2 },
  ];

  const semitoneNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const semitoneAltNames = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
  const fretMarkers = [3, 5, 7, 9, 12];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-base sm:text-lg font-black text-slate-100 flex items-center gap-2">
            Visualizador de Instrumento: {viewMode === 'piano' ? 'Teclado / Piano' : 'Braço de Violão / Guitarra'}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {selectedChord ? (
              <span>
                Mostrando notas do acorde <strong className="text-amber-400">{selectedChord.triad}</strong> (
                {selectedChord.notes.map((n) => n.replace(/[0-9]/g, '')).join(' - ')})
              </span>
            ) : (
              <span>Mostrando todas as notas da escala de {activeKey.majorRoot}</span>
            )}
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setViewMode('piano')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              viewMode === 'piano'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Piano className="w-3.5 h-3.5" />
            <span>Piano</span>
          </button>
          <button
            onClick={() => setViewMode('guitar')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              viewMode === 'guitar'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Guitar className="w-3.5 h-3.5" />
            <span>Violão / Guitarra</span>
          </button>
        </div>
      </div>

      {/* PIANO VIEW */}
      {viewMode === 'piano' && (
        <div className="mt-5 select-none">
          <div className="relative w-full max-w-2xl mx-auto h-36 sm:h-44 bg-slate-950 rounded-xl p-2 border-2 border-slate-800 shadow-2xl flex">
            {/* White Keys */}
            {pianoWhiteKeys.map((k, idx) => {
              const inChord = isNoteInChord(k.note);
              const inScale = isNoteInScale(k.note);

              return (
                <div
                  key={`white-${idx}`}
                  onClick={() => playKey(k.note, k.octave)}
                  className={`relative flex-1 h-full rounded-b-md border-r border-slate-400 last:border-r-0 cursor-pointer transition-colors duration-100 flex flex-col justify-end items-center pb-2 ${
                    inChord
                      ? 'bg-amber-400 text-slate-950 font-black shadow-inner'
                      : inScale
                      ? 'bg-amber-50 hover:bg-amber-100 text-slate-800'
                      : 'bg-white hover:bg-slate-100 text-slate-400'
                  }`}
                >
                  <span className="text-[11px] sm:text-xs font-bold">{k.note}</span>
                  {inChord && <div className="w-1.5 h-1.5 rounded-full bg-slate-950 mt-0.5" />}
                </div>
              );
            })}

            {/* Black Keys */}
            {pianoBlackKeys.map((k, idx) => {
              const inChord = isNoteInChord(k.note, k.alt);
              const inScale = isNoteInScale(k.note, k.alt);

              return (
                <div
                  key={`black-${idx}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    playKey(k.note, k.octave);
                  }}
                  style={{ left: `${k.offsetLeftPct}%` }}
                  className={`absolute top-2 w-[5.5%] h-[60%] rounded-b-md z-10 cursor-pointer transition-colors flex flex-col justify-end items-center pb-1.5 border border-slate-900 shadow-lg ${
                    inChord
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : inScale
                      ? 'bg-slate-700 hover:bg-slate-600 text-amber-200'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-500'
                  }`}
                >
                  <span className="text-[9px] font-mono leading-none">{k.note}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* GUITAR FRETBOARD VIEW */}
      {viewMode === 'guitar' && (
        <div className="mt-5 overflow-x-auto no-scrollbar">
          <div className="min-w-[680px] bg-gradient-to-r from-[#3e2723] via-[#4e342e] to-[#2d1b11] p-3 rounded-xl border border-amber-950 shadow-2xl">
            {/* Fretboard Strings */}
            <div className="flex flex-col gap-2 relative">
              {guitarStrings.map((str, strIdx) => (
                <div key={`str-${strIdx}`} className="flex items-center relative py-1">
                  {/* String label */}
                  <span className="w-12 text-xs font-mono font-bold text-amber-200/90 text-right pr-2">
                    {str.name}
                  </span>

                  {/* String metal wire representation */}
                  <div
                    className="flex-1 flex relative"
                    style={{
                      borderBottom: `${1 + strIdx * 0.4}px solid ${strIdx > 2 ? '#b0bec5' : '#ffd54f'}`,
                    }}
                  >
                    {/* Frets (0 = Open to 12) */}
                    {Array.from({ length: 13 }).map((_, fret) => {
                      const noteSemi = (str.openSemi + fret) % 12;
                      const noteSharp = semitoneNames[noteSemi];
                      const noteFlat = semitoneAltNames[noteSemi];
                      const inChord = isNoteInChord(noteSharp, noteFlat);
                      const inScale = isNoteInScale(noteSharp, noteFlat);

                      return (
                        <div
                          key={`fret-${fret}`}
                          onClick={() => {
                            const calculatedOctave = str.octave + Math.floor((str.openSemi + fret) / 12);
                            playKey(noteSharp, calculatedOctave);
                          }}
                          className={`flex-1 h-7 border-r border-[#8d6e63]/70 flex items-center justify-center relative cursor-pointer group ${
                            fret === 0 ? 'border-r-4 border-slate-200 bg-black/30' : ''
                          }`}
                        >
                          {/* Note marker dot if in scale or chord */}
                          {(inChord || inScale) && (
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black transition-transform group-hover:scale-110 shadow-md ${
                                inChord
                                  ? 'bg-amber-400 text-slate-950 ring-2 ring-white font-black'
                                  : 'bg-slate-900/90 text-slate-200 border border-slate-600'
                              }`}
                            >
                              {noteSharp}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Fret Number Markers (1 to 12) */}
              <div className="flex items-center pl-12 pt-1 text-[11px] font-mono text-amber-300/70">
                <span className="w-7 text-center">0</span>
                {Array.from({ length: 12 }).map((_, f) => (
                  <span
                    key={`fnum-${f + 1}`}
                    className={`flex-1 text-center ${
                      fretMarkers.includes(f + 1) ? 'font-black text-amber-400' : ''
                    }`}
                  >
                    {f + 1}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legend Footer */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-400" />
            <span className="text-slate-300">Notas do Acorde Selecionado</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-slate-700 border border-slate-500" />
            <span className="text-slate-400">Notas da Escala</span>
          </div>
        </div>
        <span className="text-slate-500">Clique nas teclas ou trastes para ouvir cada nota individualmente</span>
      </div>
    </div>
  );
};
