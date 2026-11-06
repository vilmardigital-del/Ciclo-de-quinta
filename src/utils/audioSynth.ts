import { InstrumentType } from '../types/music';

// Frequency table for scientific pitch notation
const NOTE_FREQUENCIES: Record<string, number> = {
  C3: 130.81, 'C#3': 138.59, Db3: 138.59, D3: 146.83, 'D#3': 155.56, Eb3: 155.56,
  E3: 164.81, F3: 174.61, 'F#3': 185.0, Gb3: 185.0, G3: 196.0, 'G#3': 207.65,
  Ab3: 207.65, A3: 220.0, 'A#3': 233.08, Bb3: 233.08, B3: 246.94,
  C4: 261.63, 'C#4': 277.18, Db4: 277.18, D4: 293.66, 'D#4': 311.13, Eb4: 311.13,
  E4: 329.63, F4: 349.23, 'F#4': 369.99, Gb4: 369.99, G4: 392.0, 'G#4': 415.3,
  Ab4: 415.3, A4: 440.0, 'A#4': 466.16, Bb4: 466.16, B4: 493.88,
  C5: 523.25, 'C#5': 554.37, Db5: 554.37, D5: 587.33, 'D#5': 622.25, Eb5: 622.25,
  E5: 659.25, F5: 698.46, 'F#5': 739.99, Gb5: 739.99, G5: 783.99, 'G#5': 830.61,
  Ab5: 830.61, A5: 880.0, 'A#5': 932.33, Bb5: 932.33, B5: 987.77,
  C6: 1046.5,
};

function pitchToFrequency(pitch: string): number {
  if (NOTE_FREQUENCIES[pitch]) {
    return NOTE_FREQUENCIES[pitch];
  }
  // Fallback regex parser
  const match = pitch.match(/^([A-G][#b]?)([0-9])$/);
  if (!match) return 440;
  const note = match[1];
  const octave = parseInt(match[2], 10);
  const baseSemitones: Record<string, number> = {
    C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3, E: 4, F: 5, 'F#': 6, Gb: 6,
    G: 7, 'G#': 8, Ab: 8, A: 9, 'A#': 10, Bb: 10, B: 11,
  };
  const semitones = (baseSemitones[note] ?? 0) + (octave - 4) * 12;
  return 440 * Math.pow(2, (semitones - 9) / 12);
}

class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.75;

  private initContext() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : this.volume, this.ctx.currentTime);
    }
  }

  public getVolume() {
    return this.volume;
  }

  public getIsMuted() {
    return this.isMuted;
  }

  public playSingleNote(pitch: string, instrument: InstrumentType = 'piano', duration = 1.2, startTimeOffset = 0) {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const freq = pitchToFrequency(pitch);
    const now = this.ctx.currentTime + startTimeOffset;

    switch (instrument) {
      case 'rhodes':
        this.synthesizeRhodes(freq, now, duration);
        break;
      case 'guitar':
        this.synthesizeAcousticGuitar(freq, now, duration);
        break;
      case 'pad':
        this.synthesizeWarmPad(freq, now, duration);
        break;
      case 'piano':
      default:
        this.synthesizePiano(freq, now, duration);
        break;
    }
  }

  public playChord(pitches: string[], instrument: InstrumentType = 'piano', duration = 1.6, arpeggiate = true) {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    pitches.forEach((pitch, idx) => {
      // Natural subtle strum / humanization delay
      const strumDelay = arpeggiate ? idx * 0.035 : 0;
      this.playSingleNote(pitch, instrument, duration, strumDelay);
    });
  }

  // Realistic Grand Piano Emulation
  private synthesizePiano(freq: number, startTime: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;

    const harmonics = [
      { mult: 1, gain: 0.6, decay: duration },
      { mult: 2, gain: 0.35, decay: duration * 0.75 },
      { mult: 3, gain: 0.15, decay: duration * 0.5 },
      { mult: 4, gain: 0.08, decay: duration * 0.35 },
      { mult: 5, gain: 0.03, decay: duration * 0.25 },
    ];

    harmonics.forEach(({ mult, gain: baseGain, decay }) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc.type = mult === 1 ? 'sine' : mult % 2 === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq * mult, startTime);

      // Acoustic Hammer attack and exponential decay
      gainNode.gain.setValueAtTime(0.0001, startTime);
      gainNode.gain.exponentialRampToValueAtTime(baseGain * 0.7, startTime + 0.008);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + decay);

      osc.connect(gainNode);
      gainNode.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(startTime + decay);
    });
  }

  // Vintage Electric Rhodes / E-Piano with bell chime
  private synthesizeRhodes(freq: number, startTime: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;

    // Fundamental tine
    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, startTime);

    // Bell overtone (7x harmonic for classic Rhodes bell sparkle)
    const osc2 = this.ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 3.98, startTime);

    const gain1 = this.ctx.createGain();
    const gain2 = this.ctx.createGain();

    // Rhodes envelope: snappy punch, long sweet sustain
    gain1.gain.setValueAtTime(0.0001, startTime);
    gain1.gain.linearRampToValueAtTime(0.65, startTime + 0.01);
    gain1.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 1.3);

    // Bell decays very fast
    gain2.gain.setValueAtTime(0.0001, startTime);
    gain2.gain.linearRampToValueAtTime(0.2, startTime + 0.006);
    gain2.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.28);

    osc1.connect(gain1);
    gain1.connect(this.masterGain);
    osc2.connect(gain2);
    gain2.connect(this.masterGain);

    osc1.start(startTime);
    osc2.start(startTime);
    osc1.stop(startTime + duration * 1.35);
    osc2.stop(startTime + 0.3);
  }

  // Acoustic Guitar / Nylon Pluck
  private synthesizeAcousticGuitar(freq: number, startTime: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, startTime);

    // Filter to simulate wooden body resonance
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(Math.min(3200, freq * 4), startTime);
    filter.frequency.exponentialRampToValueAtTime(freq * 1.2, startTime + duration * 0.7);

    const gainNode = this.ctx.createGain();
    gainNode.gain.setValueAtTime(0.0001, startTime);
    gainNode.gain.linearRampToValueAtTime(0.8, startTime + 0.005);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 0.9);

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  // Lush Warm Synth Pad
  private synthesizeWarmPad(freq: number, startTime: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc2.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, startTime);
    // Slight detune for chorus width
    osc2.frequency.setValueAtTime(freq * 1.003, startTime);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, startTime);
    filter.frequency.linearRampToValueAtTime(1400, startTime + duration * 0.4);
    filter.frequency.exponentialRampToValueAtTime(300, startTime + duration * 1.4);

    const gainNode = this.ctx.createGain();
    // Soft lush attack and gentle release
    gainNode.gain.setValueAtTime(0.0001, startTime);
    gainNode.gain.linearRampToValueAtTime(0.4, startTime + 0.25);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 1.5);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);

    osc1.start(startTime);
    osc2.start(startTime);
    osc1.stop(startTime + duration * 1.55);
    osc2.stop(startTime + duration * 1.55);
  }
}

export const soundEngine = new AudioEngine();
