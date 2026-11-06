import { ChordDegree, KeyDefinition, Mode, ProgressionPreset } from '../types/music';

// 12 keys in Circle of Fifths order (Clockwise: C, G, D, A, E, B, F#/Gb, Db/C#, Ab, Eb, Bb, F)
export const CIRCLE_KEYS: KeyDefinition[] = [
  {
    index: 0,
    majorRoot: 'C',
    majorRootClean: 'C',
    minorRoot: 'Am',
    minorRootClean: 'A',
    color: '#E53935', // Red
    textColor: '#ffffff',
    accidentalsCount: 0,
    accidentalsDescription: 'Nenhum acidente (Natural)',
    keySignatureNotes: [],
    scaleNotesMajor: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    scaleNotesMinor: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
  },
  {
    index: 1,
    majorRoot: 'G',
    majorRootClean: 'G',
    minorRoot: 'Em',
    minorRootClean: 'E',
    color: '#FB8C00', // Orange
    textColor: '#ffffff',
    accidentalsCount: 1,
    accidentalsDescription: '1 sustenido (F#)',
    keySignatureNotes: ['F#'],
    scaleNotesMajor: ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
    scaleNotesMinor: ['E', 'F#', 'G', 'A', 'B', 'C', 'D'],
  },
  {
    index: 2,
    majorRoot: 'D',
    majorRootClean: 'D',
    minorRoot: 'Bm',
    minorRootClean: 'B',
    color: '#FFA000', // Amber
    textColor: '#ffffff',
    accidentalsCount: 2,
    accidentalsDescription: '2 sustenidos (F#, C#)',
    keySignatureNotes: ['F#', 'C#'],
    scaleNotesMajor: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
    scaleNotesMinor: ['B', 'C#', 'D', 'E', 'F#', 'G', 'A'],
  },
  {
    index: 3,
    majorRoot: 'A',
    majorRootClean: 'A',
    minorRoot: 'F#m',
    minorRootClean: 'F#',
    color: '#FDD835', // Yellow
    textColor: '#333333',
    accidentalsCount: 3,
    accidentalsDescription: '3 sustenidos (F#, C#, G#)',
    keySignatureNotes: ['F#', 'C#', 'G#'],
    scaleNotesMajor: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
    scaleNotesMinor: ['F#', 'G#', 'A', 'B', 'C#', 'D', 'E'],
  },
  {
    index: 4,
    majorRoot: 'E',
    majorRootClean: 'E',
    minorRoot: 'C#m',
    minorRootClean: 'C#',
    color: '#AEEA00', // Lime
    textColor: '#222222',
    accidentalsCount: 4,
    accidentalsDescription: '4 sustenidos (F#, C#, G#, D#)',
    keySignatureNotes: ['F#', 'C#', 'G#', 'D#'],
    scaleNotesMajor: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
    scaleNotesMinor: ['C#', 'D#', 'E', 'F#', 'G#', 'A', 'B'],
  },
  {
    index: 5,
    majorRoot: 'B',
    majorRootClean: 'B',
    minorRoot: 'G#m',
    minorRootClean: 'G#',
    color: '#43A047', // Green
    textColor: '#ffffff',
    accidentalsCount: 5,
    accidentalsDescription: '5 sustenidos (F#, C#, G#, D#, A#)',
    keySignatureNotes: ['F#', 'C#', 'G#', 'D#', 'A#'],
    scaleNotesMajor: ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'],
    scaleNotesMinor: ['G#', 'A#', 'B', 'C#', 'D#', 'E', 'F#'],
  },
  {
    index: 6,
    majorRoot: 'F#/Gb',
    majorRootClean: 'F#',
    minorRoot: 'D#m',
    minorRootClean: 'D#',
    color: '#1B5E20', // Forest Green
    textColor: '#ffffff',
    accidentalsCount: 6,
    accidentalsDescription: '6 sustenidos / 6 bemóis',
    keySignatureNotes: ['F#', 'C#', 'G#', 'D#', 'A#', 'E#'],
    scaleNotesMajor: ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#'],
    scaleNotesMinor: ['D#', 'E#', 'F#', 'G#', 'A#', 'B', 'C#'],
  },
  {
    index: 7,
    majorRoot: 'Db/C#',
    majorRootClean: 'Db',
    minorRoot: 'A#m',
    minorRootClean: 'A#',
    color: '#00897B', // Teal
    textColor: '#ffffff',
    accidentalsCount: -5,
    accidentalsDescription: '5 bemóis (Bb, Eb, Ab, Db, Gb)',
    keySignatureNotes: ['Bb', 'Eb', 'Ab', 'Db', 'Gb'],
    scaleNotesMajor: ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C'],
    scaleNotesMinor: ['Bb', 'C', 'Db', 'Eb', 'F', 'Gb', 'Ab'],
  },
  {
    index: 8,
    majorRoot: 'Ab',
    majorRootClean: 'Ab',
    minorRoot: 'Fm',
    minorRootClean: 'F',
    color: '#0288D1', // Royal Blue
    textColor: '#ffffff',
    accidentalsCount: -4,
    accidentalsDescription: '4 bemóis (Bb, Eb, Ab, Db)',
    keySignatureNotes: ['Bb', 'Eb', 'Ab', 'Db'],
    scaleNotesMajor: ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G'],
    scaleNotesMinor: ['F', 'G', 'Ab', 'Bb', 'C', 'Db', 'Eb'],
  },
  {
    index: 9,
    majorRoot: 'Eb',
    majorRootClean: 'Eb',
    minorRoot: 'Cm',
    minorRootClean: 'C',
    color: '#039BE5', // Bright Blue
    textColor: '#ffffff',
    accidentalsCount: -3,
    accidentalsDescription: '3 bemóis (Bb, Eb, Ab)',
    keySignatureNotes: ['Bb', 'Eb', 'Ab'],
    scaleNotesMajor: ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'],
    scaleNotesMinor: ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb'],
  },
  {
    index: 10,
    majorRoot: 'Bb',
    majorRootClean: 'Bb',
    minorRoot: 'Gm',
    minorRootClean: 'G',
    color: '#3949AB', // Indigo Blue
    textColor: '#ffffff',
    accidentalsCount: -2,
    accidentalsDescription: '2 bemóis (Bb, Eb)',
    keySignatureNotes: ['Bb', 'Eb'],
    scaleNotesMajor: ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'],
    scaleNotesMinor: ['G', 'A', 'Bb', 'C', 'D', 'Eb', 'F'],
  },
  {
    index: 11,
    majorRoot: 'F',
    majorRootClean: 'F',
    minorRoot: 'Dm',
    minorRootClean: 'D',
    color: '#8E24AA', // Purple
    textColor: '#ffffff',
    accidentalsCount: -1,
    accidentalsDescription: '1 bemol (Bb)',
    keySignatureNotes: ['Bb'],
    scaleNotesMajor: ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
    scaleNotesMinor: ['D', 'E', 'F', 'G', 'A', 'Bb', 'C'],
  },
];

// Note name to semitone (C = 0)
export const NOTE_TO_SEMITONE: Record<string, number> = {
  C: 0, 'B#': 0,
  'C#': 1, Db: 1,
  D: 2,
  'D#': 3, Eb: 3,
  E: 4, Fb: 4,
  F: 5, 'E#': 5,
  'F#': 6, Gb: 6,
  G: 7,
  'G#': 8, Ab: 8,
  A: 9,
  'A#': 10, Bb: 10,
  B: 11, Cb: 11,
};

export const SEMITONE_TO_NOTE_SHARP = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
export const SEMITONE_TO_NOTE_FLAT = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

/**
 * Get MIDI/frequency notes for a given chord
 */
export function getChordMidiNotes(rootNote: string, chordType: string, baseOctave = 4): number[] {
  // Clean root like F#/Gb to F#
  const cleanRoot = rootNote.includes('/') ? rootNote.split('/')[0] : rootNote;
  const rootSemi = NOTE_TO_SEMITONE[cleanRoot] ?? 0;
  const rootMidi = 12 * (baseOctave + 1) + rootSemi; // e.g. C4 = 60

  switch (chordType) {
    case 'major':
      return [rootMidi, rootMidi + 4, rootMidi + 7];
    case 'minor':
      return [rootMidi, rootMidi + 3, rootMidi + 7];
    case 'diminished':
      return [rootMidi, rootMidi + 3, rootMidi + 6];
    case 'major7':
      return [rootMidi, rootMidi + 4, rootMidi + 7, rootMidi + 11];
    case 'dominant7':
      return [rootMidi, rootMidi + 4, rootMidi + 7, rootMidi + 10];
    case 'minor7':
      return [rootMidi, rootMidi + 3, rootMidi + 7, rootMidi + 10];
    case 'm7b5':
      return [rootMidi, rootMidi + 3, rootMidi + 6, rootMidi + 10];
    default:
      return [rootMidi, rootMidi + 4, rootMidi + 7];
  }
}

/**
 * Returns formatted pitch strings like ['C4', 'E4', 'G4']
 */
export function midiToPitchName(midi: number): string {
  const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const octave = Math.floor(midi / 12) - 1;
  const note = noteNames[midi % 12];
  return `${note}${octave}`;
}

/**
 * Build the 7 harmonic field degrees for a given Key index and Mode
 */
export function getHarmonicField(keyDef: KeyDefinition, mode: Mode = 'major'): ChordDegree[] {
  if (mode === 'major') {
    const scale = keyDef.scaleNotesMajor;
    return [
      {
        roman: 'I',
        degreeNumber: 1,
        triad: scale[0],
        tetrad: `${scale[0]}maj7`,
        root: scale[0],
        type: 'major',
        role: 'Tônica',
        colorTag: 'bg-emerald-500 text-white',
        notes: getChordMidiNotes(scale[0], 'major').map(midiToPitchName),
        description: 'Tônica principal (Repouso absoluto, ponto de partida e chegada)',
      },
      {
        roman: 'ii',
        degreeNumber: 2,
        triad: `${scale[1]}m`,
        tetrad: `${scale[1]}m7`,
        root: scale[1],
        type: 'minor',
        role: 'Subdominante',
        colorTag: 'bg-blue-500 text-white',
        notes: getChordMidiNotes(scale[1], 'minor').map(midiToPitchName),
        description: 'Supertônica (Função subdominante preparatória, conduz ao V)',
      },
      {
        roman: 'iii',
        degreeNumber: 3,
        triad: `${scale[2]}m`,
        tetrad: `${scale[2]}m7`,
        root: scale[2],
        type: 'minor',
        role: 'Tônica',
        colorTag: 'bg-teal-500 text-white',
        notes: getChordMidiNotes(scale[2], 'minor').map(midiToPitchName),
        description: 'Mediante (Função tônica secundária, transição suave e introspectiva)',
      },
      {
        roman: 'IV',
        degreeNumber: 4,
        triad: scale[3],
        tetrad: `${scale[3]}maj7`,
        root: scale[3],
        type: 'major',
        role: 'Subdominante',
        colorTag: 'bg-indigo-500 text-white',
        notes: getChordMidiNotes(scale[3], 'major').map(midiToPitchName),
        description: 'Subdominante (Afastamento da tônica, sensação de movimento e abertura)',
      },
      {
        roman: 'V',
        degreeNumber: 5,
        triad: scale[4],
        tetrad: `${scale[4]}7`,
        root: scale[4],
        type: 'dominant7',
        role: 'Dominante',
        colorTag: 'bg-amber-500 text-white',
        notes: getChordMidiNotes(scale[4], 'dominant7').map(midiToPitchName),
        description: 'Dominante (Máxima tensão que pede resolução urgente na tônica I)',
      },
      {
        roman: 'vi',
        degreeNumber: 6,
        triad: `${scale[5]}m`,
        tetrad: `${scale[5]}m7`,
        root: scale[5],
        type: 'minor',
        role: 'Tônica',
        colorTag: 'bg-purple-500 text-white',
        notes: getChordMidiNotes(scale[5], 'minor').map(midiToPitchName),
        description: 'Superdominante / Relativa Menor (Tônica alternativa, tom melancólico)',
      },
      {
        roman: 'vii°',
        degreeNumber: 7,
        triad: `${scale[6]}°`,
        tetrad: `${scale[6]}m7b5`,
        root: scale[6],
        type: 'diminished',
        role: 'Sensível',
        colorTag: 'bg-rose-500 text-white',
        notes: getChordMidiNotes(scale[6], 'm7b5').map(midiToPitchName),
        description: 'Sensível diminuta (Tensão muito alta, substituto natural do dominante V7)',
      },
    ];
  } else {
    // Natural Minor Field
    const scale = keyDef.scaleNotesMinor;
    return [
      {
        roman: 'i',
        degreeNumber: 1,
        triad: `${scale[0]}m`,
        tetrad: `${scale[0]}m7`,
        root: scale[0],
        type: 'minor',
        role: 'Tônica',
        colorTag: 'bg-emerald-600 text-white',
        notes: getChordMidiNotes(scale[0], 'minor').map(midiToPitchName),
        description: 'Tônica menor (Centro tonal, repouso melancólico)',
      },
      {
        roman: 'ii°',
        degreeNumber: 2,
        triad: `${scale[1]}°`,
        tetrad: `${scale[1]}m7b5`,
        root: scale[1],
        type: 'diminished',
        role: 'Subdominante',
        colorTag: 'bg-rose-500 text-white',
        notes: getChordMidiNotes(scale[1], 'm7b5').map(midiToPitchName),
        description: 'Supertônica diminuta (Prepara o V menor ou dominante)',
      },
      {
        roman: 'III',
        degreeNumber: 3,
        triad: scale[2],
        tetrad: `${scale[2]}maj7`,
        root: scale[2],
        type: 'major',
        role: 'Tônica',
        colorTag: 'bg-teal-500 text-white',
        notes: getChordMidiNotes(scale[2], 'major').map(midiToPitchName),
        description: 'Mediante / Relativa Maior (Iluminação brilhante no modo menor)',
      },
      {
        roman: 'iv',
        degreeNumber: 4,
        triad: `${scale[3]}m`,
        tetrad: `${scale[3]}m7`,
        root: scale[3],
        type: 'minor',
        role: 'Subdominante',
        colorTag: 'bg-blue-500 text-white',
        notes: getChordMidiNotes(scale[3], 'minor').map(midiToPitchName),
        description: 'Subdominante menor (Profundo sentimento de afastamento)',
      },
      {
        roman: 'v',
        degreeNumber: 5,
        triad: `${scale[4]}m`,
        tetrad: `${scale[4]}7`, // often altered to major 7 in harmonic minor
        root: scale[4],
        type: 'minor',
        role: 'Dominante',
        colorTag: 'bg-amber-500 text-white',
        notes: getChordMidiNotes(scale[4], 'minor').map(midiToPitchName),
        description: 'Dominante menor (Natural) ou V7 maior (Harmônica)',
      },
      {
        roman: 'VI',
        degreeNumber: 6,
        triad: scale[5],
        tetrad: `${scale[5]}maj7`,
        root: scale[5],
        type: 'major',
        role: 'Subdominante',
        colorTag: 'bg-purple-500 text-white',
        notes: getChordMidiNotes(scale[5], 'major').map(midiToPitchName),
        description: 'Subdominante Maior (Impacto épico, clímax emocional)',
      },
      {
        roman: 'VII',
        degreeNumber: 7,
        triad: scale[6],
        tetrad: `${scale[6]}7`,
        root: scale[6],
        type: 'major',
        role: 'Dominante',
        colorTag: 'bg-indigo-500 text-white',
        notes: getChordMidiNotes(scale[6], 'major').map(midiToPitchName),
        description: 'Subtônica maior (Típica de rock clássico, folk e baladas)',
      },
    ];
  }
}

/**
 * Rich preset chord progressions with famous references
 */
export const PROGRESSION_PRESETS: ProgressionPreset[] = [
  {
    id: 'pop-hit-1',
    name: 'Progressão dos 4 Acordes de Ouro',
    category: 'Popular / Hits',
    degrees: ['I', 'V', 'vi', 'IV'],
    description: 'A progressão mais famosa da história do Pop e Rock. Presente em mais de 100 sucessos mundiais.',
    famousSongs: ["Let It Be (Beatles)", "With or Without You (U2)", "Someone Like You (Adele)", "Pais e Filhos (Legião)"],
  },
  {
    id: 'pop-melancholic',
    name: 'Sensível / Emotiva Pop',
    category: 'Popular / Hits',
    degrees: ['vi', 'IV', 'I', 'V'],
    description: 'Inicia pela relativa menor criando um tom melancólico e misterioso antes de explodir no refrão.',
    famousSongs: ["Faded (Alan Walker)", "Africa (Toto - Refrão)", "Despacito", "Save Yours Tears (The Weeknd)"],
  },
  {
    id: 'classic-50s',
    name: 'Doo-Wop & Baladas dos Anos 50/60',
    category: 'Clássico & Baladas',
    degrees: ['I', 'vi', 'IV', 'V'],
    description: 'O molde clássico do rockabilly, baladas românticas e anos dourados.',
    famousSongs: ["Stand By Me (Ben E. King)", "Every Breath You Take (The Police)", "Unchained Melody"],
  },
  {
    id: 'rock-classic-three',
    name: 'Rock ‘n’ Roll dos 3 Acordes',
    category: 'Rock & Blues',
    degrees: ['I', 'IV', 'V', 'IV'],
    description: 'A fundação pura do rock and roll, blues, punk e folk mundial.',
    famousSongs: ["Wild Thing (The Troggs)", "Twist and Shout (Beatles)", "La Bamba (Ritchie Valens)"],
  },
  {
    id: 'jazz-ii-v-i',
    name: 'Cadência 2 - 5 - 1 (Pilar do Jazz & MPB)',
    category: 'Jazz & Bossa',
    degrees: ['ii', 'V', 'I', 'I'],
    description: 'A espinha dorsal harmônica do Jazz, Bossa Nova e Música Popular Brasileira refinada.',
    famousSongs: ["Autumn Leaves", "Garota de Ipanema (Trecho)", "Chega de Saudade", "Fly Me to the Moon"],
  },
  {
    id: 'pachelbel-canon',
    name: 'Cânone de Pachelbel (A Base Clássica)',
    category: 'Clássico & Baladas',
    degrees: ['I', 'V', 'vi', 'iii', 'IV', 'I', 'IV', 'V'],
    description: 'Progressão barroca atemporal que gerou incontáveis canções no pop moderno.',
    famousSongs: ["Canon in D", "Basket Case (Green Day)", "Memories (Maroon 5)", "Graduation (Vitamin C)"],
  },
  {
    id: 'andalusian-cadence',
    name: 'Cadência Andaluza / Flamenco',
    category: 'Cadências Essenciais',
    degrees: ['vi', 'V', 'IV', 'III'],
    description: 'Descida cromática dramática do flamenco espanhol e rock latino.',
    famousSongs: ["Hit the Road Jack", "Sultans of Swing", "Hotel California (Solo)", "Smooth (Santana)"],
  },
  {
    id: 'plagal-amen',
    name: 'Cadência Plagal (Acorde do Amém)',
    category: 'Cadências Essenciais',
    degrees: ['I', 'IV', 'I', 'V'],
    description: 'Resolução nobre e suave da quarta para a primeira, muito usada em hinos e baladas.',
    famousSongs: ["Imagine (John Lennon)", "Hallelujah (Leonard Cohen)", "Hey Jude"],
  },
  {
    id: 'bossa-turnaround',
    name: 'Turnaround da Bossa Nova (I - vi - ii - V)',
    category: 'Jazz & Bossa',
    degrees: ['I', 'vi', 'ii', 'V'],
    description: 'O giro circular eterno com tétrades ricas que embala a Bossa Nova.',
    famousSongs: ["Wave (Tom Jobim)", "Corcovado", "Samba de Uma Nota Só"],
  },
];

/**
 * Resolves chord text and notes from degree roman numeral in given key
 */
export function resolveChordFromDegree(
  roman: string,
  harmonicField: ChordDegree[],
  useTetrads: boolean
): { name: string; notes: string[]; role: string; colorTag: string } {
  const match = harmonicField.find((ch) => ch.roman.toLowerCase() === roman.toLowerCase());
  if (match) {
    return {
      name: useTetrads ? match.tetrad : match.triad,
      notes: match.notes,
      role: match.role,
      colorTag: match.colorTag,
    };
  }

  // Fallback for special degrees like III in minor
  return {
    name: roman,
    notes: harmonicField[0]?.notes ?? ['C4', 'E4', 'G4'],
    role: 'Tônica',
    colorTag: 'bg-slate-500 text-white',
  };
}
