import React, { useState } from 'react';
import { KeyDefinition, Mode, InstrumentType } from '../types/music';
import { CIRCLE_KEYS } from '../utils/musicTheory';
import { soundEngine } from '../utils/audioSynth';
import { RotateCw, RotateCcw, Sparkles } from 'lucide-react';

interface CircleOfFifthsWheelProps {
  activeKey: KeyDefinition;
  onSelectKey: (key: KeyDefinition) => void;
  mode: Mode;
  onToggleMode: (newMode: Mode) => void;
  instrument: InstrumentType;
  playingChordRoman?: string | null;
  showHarmonicMask: boolean;
  onToggleHarmonicMask: () => void;
  selectedChords?: string[];
  onToggleSelectChord?: (roman: string) => void;
}

export const CircleOfFifthsWheel: React.FC<CircleOfFifthsWheelProps> = ({
  activeKey,
  onSelectKey,
  mode,
  onToggleMode,
  instrument,
  playingChordRoman,
  showHarmonicMask,
  onToggleHarmonicMask,
  selectedChords = [],
  onToggleSelectChord,
}) => {
  const [wheelRotation, setWheelRotation] = useState<number>(0);
  const [isRotating, setIsRotating] = useState<boolean>(false);

  // Enlarged parameters to maximize visibility and touch area on mobile phones
  const size = 500;
  const center = size / 2; // 250
  const outerRadius = 244; // expanded to outer edge
  const majorInnerRadius = 168; // 76px thickness for giant major letters
  const minorInnerRadius = 106; // 62px thickness for clear relative minors
  const centerHubRadius = 94; // comfortable center hub
  const brassPinRadius = 22; // bold brass pin

  // Degrees per slice
  const sliceAngle = 360 / 12; // 30 degrees

  // Helper to calculate SVG path for an arc wedge
  const createArc = (startAngleDeg: number, endAngleDeg: number, innerR: number, outerR: number) => {
    const startRad = ((startAngleDeg - 90) * Math.PI) / 180;
    const endRad = ((endAngleDeg - 90) * Math.PI) / 180;

    const x1 = center + outerR * Math.cos(startRad);
    const y1 = center + outerR * Math.sin(startRad);
    const x2 = center + outerR * Math.cos(endRad);
    const y2 = center + outerR * Math.sin(endRad);

    const x3 = center + innerR * Math.cos(endRad);
    const y3 = center + innerR * Math.sin(endRad);
    const x4 = center + innerR * Math.cos(startRad);
    const y4 = center + innerR * Math.sin(startRad);

    return `M ${x1} ${y1} A ${outerR} ${outerR} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${innerR} ${innerR} 0 0 0 ${x4} ${y4} Z`;
  };

  // Calculate degree for chord in current harmonic field
  const getDegreeBadge = (keyIdx: number, isMinor: boolean): string | null => {
    const k = activeKey.index;
    if (mode === 'major') {
      if (!isMinor) {
        if (keyIdx === k) return 'I';
        if (keyIdx === (k + 1) % 12) return 'V';
        if (keyIdx === (k + 11) % 12) return 'IV';
      } else {
        if (keyIdx === k) return 'vi';
        if (keyIdx === (k + 1) % 12) return 'iii';
        if (keyIdx === (k + 11) % 12) return 'ii';
        if (keyIdx === (k + 2) % 12) return 'vii°';
      }
    } else {
      // Minor mode
      if (isMinor) {
        if (keyIdx === k) return 'i';
        if (keyIdx === (k + 1) % 12) return 'v';
        if (keyIdx === (k + 11) % 12) return 'iv';
        if (keyIdx === (k + 2) % 12) return 'ii°';
      } else {
        if (keyIdx === k) return 'III';
        if (keyIdx === (k + 1) % 12) return 'VII';
        if (keyIdx === (k + 11) % 12) return 'VI';
      }
    }
    return null;
  };

  // Check if slice is in active harmonic field
  const isInHarmonicField = (keyIdx: number, isMinor: boolean) => {
    return getDegreeBadge(keyIdx, isMinor) !== null;
  };

  // Play audio on slice click
  const handleSliceClick = (keyDef: KeyDefinition, isMinor: boolean) => {
    onSelectKey(keyDef);
    const chordType = isMinor ? 'minor' : 'major';
    const root = isMinor ? keyDef.minorRootClean : keyDef.majorRootClean;
    import('../utils/musicTheory').then(({ getChordMidiNotes, midiToPitchName }) => {
      const midiNotes = getChordMidiNotes(root, chordType);
      soundEngine.playChord(midiNotes.map(midiToPitchName), instrument, 1.4);
    });
  };

  const handleStepWheel = (direction: 'cw' | 'ccw') => {
    setIsRotating(true);
    const step = direction === 'cw' ? 1 : -1;
    const nextIdx = (activeKey.index + step + 12) % 12;
    onSelectKey(CIRCLE_KEYS[nextIdx]);
    setWheelRotation((prev) => prev + (direction === 'cw' ? 30 : -30));
    setTimeout(() => setIsRotating(false), 250);
  };

  return (
    <div className="flex flex-col items-center w-full select-none touch-manipulation">
      {/* Top Mobile Mode Bar */}
      <div className="w-full flex items-center justify-between gap-2 mb-2 px-1">
        {/* Major / Minor Segmented Control */}
        <div className="flex items-center bg-slate-900 border border-slate-750 rounded-xl p-1 shadow-inner">
          <button
            type="button"
            onClick={() => onToggleMode('major')}
            className={`px-3 py-1.5 text-xs font-black rounded-lg transition-all ${
              mode === 'major'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Modo Maior
          </button>
          <button
            type="button"
            onClick={() => onToggleMode('minor')}
            className={`px-3 py-1.5 text-xs font-black rounded-lg transition-all ${
              mode === 'minor'
                ? 'bg-purple-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Modo Menor
          </button>
        </div>

        {/* Toggle Harmonic Field Visual Mask */}
        <button
          type="button"
          onClick={onToggleHarmonicMask}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl border transition-all ${
            showHarmonicMask
              ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 shadow-sm'
              : 'bg-slate-900/60 border-slate-750 text-slate-400'
          }`}
          title="Destacar o campo harmônico na roda"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Máscara {showHarmonicMask ? 'ON' : 'OFF'}</span>
        </button>
      </div>

      {/* Enlarged Circle of Fifths Container: Maximized for mobile viewport */}
      <div className="relative w-full max-w-[395px] aspect-square mx-auto p-1 rounded-full bg-gradient-to-b from-[#8B5A2B] via-[#654321] to-[#3E2723] shadow-2xl border-2 border-[#A0522D]/70">
        <div className="relative w-full h-full rounded-full p-1 bg-gradient-to-tr from-[#2d1b11] via-[#4a2e1d] to-[#1f120a] shadow-inner flex items-center justify-center">
          {/* SVG Wheel scaled to 100% width */}
          <svg
            viewBox={`0 0 ${size} ${size}`}
            className="w-full h-full drop-shadow-2xl select-none"
            style={{
              transition: isRotating ? 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
            }}
          >
            <defs>
              <radialGradient id="hubMetallic" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#FFF2A3" />
                <stop offset="30%" stopColor="#E6B800" />
                <stop offset="70%" stopColor="#B38600" />
                <stop offset="100%" stopColor="#664D00" />
              </radialGradient>

              <radialGradient id="pinGlow" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="60%" stopColor="#F9A825" />
                <stop offset="100%" stopColor="#C47F00" />
              </radialGradient>

              <filter id="activeGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Base Circle */}
            <circle cx={center} cy={center} r={outerRadius + 3} fill="#1c0f08" />

            {/* 12 Slices Rendering with Enlarged Radii and Big Bold Text */}
            {CIRCLE_KEYS.map((keyDef) => {
              const startAngle = keyDef.index * sliceAngle - sliceAngle / 2;
              const endAngle = startAngle + sliceAngle;
              const midAngle = keyDef.index * sliceAngle;
              const midRad = ((midAngle - 90) * Math.PI) / 180;

              const isKeyActive = activeKey.index === keyDef.index;
              const outerDegreeBadge = getDegreeBadge(keyDef.index, false);
              const innerDegreeBadge = getDegreeBadge(keyDef.index, true);

              const isPlayingOuter = playingChordRoman && outerDegreeBadge === playingChordRoman;
              const isPlayingInner = playingChordRoman && innerDegreeBadge === playingChordRoman;

              // SEPARATED RADIAL POSITIONS TO PREVENT ANY OVERLAP:
              // 1. Major Note: centered cleanly at radius 196 (leaves plenty of space from both inner & outer boundaries)
              const majorNoteR = 196;
              const majorX = center + majorNoteR * Math.cos(midRad);
              const majorY = center + majorNoteR * Math.sin(midRad);

              // 2. Major Degree Badge (quadradinho: I, V, IV): placed along the outer rim at radius 229 (33px away from note!)
              const majorBadgeR = 229;
              const badgeMajorX = center + majorBadgeR * Math.cos(midRad);
              const badgeMajorY = center + majorBadgeR * Math.sin(midRad);

              // 3. Minor Note: centered cleanly at radius 146 in the upper region of the minor ring
              const minorNoteR = 146;
              const minorX = center + minorNoteR * Math.cos(midRad);
              const minorY = center + minorNoteR * Math.sin(midRad);

              // 4. Minor Degree Badge (quadradinho: vi, ii, iii, vii°): placed along the inner rim near the center hub at radius 120 (26px away from note!)
              const minorBadgeR = 120;
              const badgeMinorX = center + minorBadgeR * Math.cos(midRad);
              const badgeMinorY = center + minorBadgeR * Math.sin(midRad);

              const isOuterInField = isInHarmonicField(keyDef.index, false);
              const isInnerInField = isInHarmonicField(keyDef.index, true);

              const outerOpacity = showHarmonicMask ? (isOuterInField ? 1 : 0.35) : 1;
              const innerOpacity = showHarmonicMask ? (isInnerInField ? 1 : 0.4) : 1;

              const isOuterSelectedRed = outerDegreeBadge && selectedChords.includes(outerDegreeBadge);
              const isInnerSelectedRed = innerDegreeBadge && selectedChords.includes(innerDegreeBadge);

              return (
                <g key={`slice-${keyDef.index}`}>
                  {/* MAJOR (OUTER) ARC */}
                  <path
                    d={createArc(startAngle, endAngle, majorInnerRadius, outerRadius)}
                    fill={keyDef.color}
                    opacity={outerOpacity}
                    stroke="#22140d"
                    strokeWidth="1.8"
                    className="cursor-pointer transition-all duration-200 active:brightness-125"
                    onClick={() => handleSliceClick(keyDef, false)}
                  />

                  {/* Playing Highlight Ring */}
                  {isPlayingOuter && (
                    <path
                      d={createArc(startAngle, endAngle, majorInnerRadius + 1, outerRadius - 1)}
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="5"
                      className="animate-pulse"
                      filter="url(#activeGlow)"
                    />
                  )}

                  {/* Active Key indicator outline */}
                  {isKeyActive && mode === 'major' && (
                    <path
                      d={createArc(startAngle, endAngle, majorInnerRadius + 2, outerRadius - 2)}
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="4"
                      strokeDasharray="5 2.5"
                    />
                  )}

                  {/* Major Note Text - COMPLETELY UNOBSTRUCTED, 100% VISIBLE */}
                  <text
                    x={majorX}
                    y={majorY + 8}
                    textAnchor="middle"
                    fill={keyDef.textColor}
                    fontSize={
                      keyDef.majorRoot.length > 4 ? '19' : keyDef.majorRoot.length > 2 ? '23' : '30'
                    }
                    fontWeight="900"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    className="pointer-events-none drop-shadow-md select-none"
                    opacity={outerOpacity}
                  >
                    {keyDef.majorRoot}
                  </text>

                  {/* Roman Numeral badge on outer ring - POSITIONED AT OUTER PERIMETER (ZERO OVERLAP) */}
                  {showHarmonicMask && outerDegreeBadge && (
                    <g
                      transform={`translate(${badgeMajorX}, ${badgeMajorY})`}
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onToggleSelectChord && outerDegreeBadge) {
                          onToggleSelectChord(outerDegreeBadge);
                        }
                      }}
                    >
                      {isOuterSelectedRed ? (
                        <>
                          <rect
                            x="-12"
                            y="-9.5"
                            width="24"
                            height="19"
                            rx="4.5"
                            fill="#DC2626"
                            stroke="#FFFFFF"
                            strokeWidth="1.5"
                            className="shadow-lg"
                          />
                          <text
                            x="0"
                            y="4.5"
                            textAnchor="middle"
                            fill="#FFFFFF"
                            fontSize="11"
                            fontWeight="900"
                            fontFamily="JetBrains Mono, monospace"
                          >
                            {outerDegreeBadge}
                          </text>
                        </>
                      ) : (
                        <>
                          <rect
                            x="-11"
                            y="-9"
                            width="22"
                            height="18"
                            rx="4"
                            fill="#0F172A"
                            fillOpacity="0.9"
                            stroke="#F8FAFC"
                            strokeWidth="1.2"
                            className="shadow-sm"
                          />
                          <text
                            x="0"
                            y="4"
                            textAnchor="middle"
                            fill="#FACC15"
                            fontSize="11"
                            fontWeight="900"
                            fontFamily="JetBrains Mono, monospace"
                          >
                            {outerDegreeBadge}
                          </text>
                        </>
                      )}
                    </g>
                  )}

                  {/* MINOR (INNER) ARC */}
                  <path
                    d={createArc(startAngle, endAngle, minorInnerRadius, majorInnerRadius)}
                    fill={isInnerInField && showHarmonicMask ? '#EEF2FF' : '#E2E8F0'}
                    opacity={innerOpacity}
                    stroke="#475569"
                    strokeWidth="1.2"
                    className="cursor-pointer transition-all duration-200 active:brightness-90"
                    onClick={() => handleSliceClick(keyDef, true)}
                  />

                  {/* Playing Highlight for minor chord */}
                  {isPlayingInner && (
                    <path
                      d={createArc(startAngle, endAngle, minorInnerRadius + 1, majorInnerRadius - 1)}
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="4"
                      className="animate-pulse"
                      filter="url(#activeGlow)"
                    />
                  )}

                  {/* Active Key indicator outline for Minor */}
                  {isKeyActive && mode === 'minor' && (
                    <path
                      d={createArc(startAngle, endAngle, minorInnerRadius + 2, majorInnerRadius - 2)}
                      fill="none"
                      stroke="#8B5CF6"
                      strokeWidth="3.5"
                      strokeDasharray="4 2"
                    />
                  )}

                  {/* Minor Note Text - COMPLETELY UNOBSTRUCTED, 100% VISIBLE */}
                  <text
                    x={minorX}
                    y={minorY + 5}
                    textAnchor="middle"
                    fill="#0F172A"
                    fontSize={keyDef.minorRoot.length > 3 ? '14' : '18'}
                    fontWeight="800"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    className="pointer-events-none select-none"
                    opacity={innerOpacity}
                  >
                    {keyDef.minorRoot}
                  </text>

                  {/* Roman Numeral badge on inner ring - POSITIONED AT INNER PERIMETER (ZERO OVERLAP) */}
                  {showHarmonicMask && innerDegreeBadge && (
                    <g
                      transform={`translate(${badgeMinorX}, ${badgeMinorY})`}
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onToggleSelectChord && innerDegreeBadge) {
                          onToggleSelectChord(innerDegreeBadge);
                        }
                      }}
                    >
                      {isInnerSelectedRed ? (
                        <>
                          <rect
                            x="-10"
                            y="-8.5"
                            width="20"
                            height="17"
                            rx="3.5"
                            fill="#DC2626"
                            stroke="#FFFFFF"
                            strokeWidth="1.5"
                          />
                          <text
                            x="0"
                            y="4"
                            textAnchor="middle"
                            fill="#FFFFFF"
                            fontSize="10"
                            fontWeight="900"
                            fontFamily="JetBrains Mono, monospace"
                          >
                            {innerDegreeBadge}
                          </text>
                        </>
                      ) : (
                        <>
                          <rect
                            x="-9.5"
                            y="-8"
                            width="19"
                            height="16"
                            rx="3"
                            fill="#1E293B"
                            fillOpacity="0.92"
                            stroke="#A78BFA"
                            strokeWidth="1.2"
                          />
                          <text
                            x="0"
                            y="4"
                            textAnchor="middle"
                            fill="#C4B5FD"
                            fontSize="10"
                            fontWeight="800"
                            fontFamily="JetBrains Mono, monospace"
                          >
                            {innerDegreeBadge}
                          </text>
                        </>
                      )}
                    </g>
                  )}
                </g>
              );
            })}

            {/* White/Cream Center Hub */}
            <circle
              cx={center}
              cy={center}
              r={minorInnerRadius}
              fill="#FDFBF7"
              stroke="#D4AF37"
              strokeWidth="2.5"
              className="drop-shadow-md"
            />

            <circle
              cx={center}
              cy={center}
              r={centerHubRadius}
              fill="#FAF7EE"
              stroke="#E2D9BC"
              strokeWidth="1.5"
            />

            {/* QUINTAS (Clockwise top arrow & text) */}
            <g className="cursor-pointer" onClick={() => handleStepWheel('cw')}>
              <text
                x={center}
                y={center - 44}
                textAnchor="middle"
                fill="#1E293B"
                fontSize="15"
                fontWeight="900"
                fontFamily="Plus Jakarta Sans, sans-serif"
                letterSpacing="0.5"
              >
                Quintas
              </text>
              <path
                d={`M ${center - 36} ${center - 28} A 42 42 0 0 1 ${center + 36} ${center - 28}`}
                fill="none"
                stroke="#1E293B"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <polygon
                points={`${center + 40},${center - 24} ${center + 36},${center - 34} ${center + 27},${center - 28}`}
                fill="#1E293B"
              />
            </g>

            {/* QUARTAS (Counter-clockwise bottom arrow & text) */}
            <g className="cursor-pointer" onClick={() => handleStepWheel('ccw')}>
              <text
                x={center}
                y={center + 52}
                textAnchor="middle"
                fill="#1E293B"
                fontSize="15"
                fontWeight="900"
                fontFamily="Plus Jakarta Sans, sans-serif"
                letterSpacing="0.5"
              >
                Quartas
              </text>
              <path
                d={`M ${center + 36} ${center + 30} A 42 42 0 0 1 ${center - 36} ${center + 30}`}
                fill="none"
                stroke="#1E293B"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <polygon
                points={`${center - 40},${center + 26} ${center - 36},${center + 36} ${center - 27},${center + 30}`}
                fill="#1E293B"
              />
            </g>

            {/* Center Brass Pin Knob */}
            <circle
              cx={center}
              cy={center}
              r={brassPinRadius}
              fill="url(#hubMetallic)"
              stroke="#8B6508"
              strokeWidth="2"
              className="drop-shadow-lg cursor-pointer"
              onClick={() => handleSliceClick(activeKey, mode === 'minor')}
            />
            <circle cx={center - 4} cy={center - 4} r="7" fill="url(#pinGlow)" opacity="0.85" />
          </svg>
        </div>

        {/* Small Wooden Base Trim */}
        <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-48 h-3.5 bg-gradient-to-r from-[#5D4037] via-[#8D6E63] to-[#5D4037] rounded-b-md shadow-lg border-t border-[#3E2723]" />
      </div>

      {/* Touch-Friendly Step & Key Info Bar for Mobile */}
      <div className="w-full max-w-[395px] mt-4 flex items-center justify-between gap-1.5 px-1">
        <button
          type="button"
          onClick={() => handleStepWheel('ccw')}
          className="flex-1 py-2.5 px-2 bg-slate-900 hover:bg-slate-800 active:scale-95 text-slate-200 text-xs font-bold rounded-xl border border-slate-750 shadow-md flex items-center justify-center gap-1.5 transition-transform"
        >
          <RotateCcw className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span>-5ª (Quartas)</span>
        </button>

        <div className="flex-1 py-2 px-1 bg-slate-950 border border-amber-500/40 rounded-xl text-center shadow-inner">
          <span className="text-[10px] text-slate-400 block font-semibold leading-tight">Tom Ativo</span>
          <span className="text-base font-black text-amber-400 leading-tight block">
            {mode === 'major' ? `${activeKey.majorRoot} Maior` : `${activeKey.minorRoot} Menor`}
          </span>
        </div>

        <button
          type="button"
          onClick={() => handleStepWheel('cw')}
          className="flex-1 py-2.5 px-2 bg-slate-900 hover:bg-slate-800 active:scale-95 text-slate-200 text-xs font-bold rounded-xl border border-slate-750 shadow-md flex items-center justify-center gap-1.5 transition-transform"
        >
          <span>+5ª (Quintas)</span>
          <RotateCw className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        </button>
      </div>

      {/* Compact Mobile Key Signature Pill */}
      <div className="w-full max-w-[395px] mt-2 px-1 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300">
          <span className="text-slate-400">Armadura:</span>
          <strong className="text-emerald-400 font-bold">{activeKey.accidentalsDescription}</strong>
          {activeKey.keySignatureNotes.length > 0 && (
            <span className="text-amber-300 font-mono font-bold">
              [{activeKey.keySignatureNotes.join(', ')}]
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
