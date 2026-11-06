export type Mode = 'major' | 'minor';

export type InstrumentType = 'piano' | 'rhodes' | 'guitar' | 'pad';

export interface KeyDefinition {
  index: number; // 0 to 11 (0 = C, 1 = G, 2 = D, 3 = A, 4 = E, 5 = B, 6 = F#/Gb, 7 = Db/C#, 8 = Ab, 9 = Eb, 10 = Bb, 11 = F)
  majorRoot: string; // e.g. "C", "G", "F#/Gb"
  majorRootClean: string; // "C", "G", "F#"
  minorRoot: string; // e.g. "Am", "Em"
  minorRootClean: string; // "A", "E"
  color: string; // slice background color
  textColor: string; // slice text color
  accidentalsCount: number; // positive = sharps, negative = flats
  accidentalsDescription: string; // e.g. "0 acidentes", "1 sustenido (F#)", "2 bemóis (Bb, Eb)"
  keySignatureNotes: string[]; // ['F#'], ['Bb', 'Eb'], etc.
  scaleNotesMajor: string[]; // e.g. ['C', 'D', 'E', 'F', 'G', 'A', 'B']
  scaleNotesMinor: string[]; // e.g. ['A', 'B', 'C', 'D', 'E', 'F', 'G']
}

export type DegreeFunction = 'Tônica (Repouso)' | 'Subdominante (Afastamento)' | 'Dominante (Tensão)' | 'Sensível';

export interface ChordDegree {
  roman: string; // e.g. "I", "ii", "iii", "IV", "V", "vi", "vii°"
  degreeNumber: number; // 1 to 7
  triad: string; // e.g. "C", "Dm", "G", "B°"
  tetrad: string; // e.g. "Cmaj7", "Dm7", "G7", "Bm7b5"
  root: string; // "C", "D", "G"
  type: 'major' | 'minor' | 'diminished' | 'dominant7' | 'major7' | 'minor7';
  role: 'Tônica' | 'Subdominante' | 'Dominante' | 'Sensível';
  colorTag: string; // badge color
  notes: string[]; // e.g. ['C4', 'E4', 'G4', 'B4']
  description: string;
}

export interface ProgressionPreset {
  id: string;
  name: string;
  category: 'Popular / Hits' | 'Rock & Blues' | 'Jazz & Bossa' | 'Clássico & Baladas' | 'Cadências Essenciais';
  degrees: string[]; // e.g. ['I', 'V', 'vi', 'IV']
  description: string;
  famousSongs: string[];
}

export interface CustomProgressionItem {
  chord: string;
  roman: string;
  notes: string[];
}
