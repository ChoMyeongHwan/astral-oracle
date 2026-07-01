// ==========================================================================
// 3. Web Audio API 사운드 합성기 (Audio & BGM Helpers)
// ==========================================================================
window.AudioHelper = {
  ctx: null,

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  },

  playFlip() {
    try {
      this.init();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.12);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch (e) {
      console.warn(e);
    }
  },

  playChime() {
    try {
      this.init();
      const now = this.ctx.currentTime;
      const freqs = [523.25, 659.25, 783.99, 1046.50];
      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.08, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.5);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.5);
      });
    } catch (e) {
      console.warn(e);
    }
  },

  playShuffle() {
    try {
      this.init();
      const now = this.ctx.currentTime;
      const duration = 0.8;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(100, now);
      osc.frequency.linearRampToValueAtTime(50, now + duration);
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(400, now);
      filter.frequency.linearRampToValueAtTime(600, now + duration);
      filter.Q.setValueAtTime(5, now);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {
      console.warn(e);
    }
  }
};

window.BGMHelper = {
  ctx: null,
  oscillators: [],
  gainNodes: [],
  filterNode: null,
  masterGain: null,
  lfo: null,
  lfoGain: null,
  isPlaying: false,

  init() {
    if (!this.ctx) {
      this.ctx = window.AudioHelper.ctx || new (window.AudioContext || window.webkitAudioContext)();
    }
  },

  start() {
    this.init();
    if (this.isPlaying) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    const now = this.ctx.currentTime;
    this.filterNode = this.ctx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.setValueAtTime(220, now);
    this.filterNode.Q.setValueAtTime(1.5, now);

    const freqs = [110, 164.81, 220, 293.66];
    this.oscillators = [];
    this.gainNodes = [];

    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      const volume = idx === 0 ? 0.08 : 0.04;
      gain.gain.setValueAtTime(volume, now);
      osc.connect(gain);
      gain.connect(this.filterNode);
      osc.start(now);
      this.oscillators.push(osc);
      this.gainNodes.push(gain);
    });

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, now);
    this.masterGain.gain.linearRampToValueAtTime(0.5, now + 2.0);
    this.filterNode.connect(this.masterGain);
    this.masterGain.connect(this.ctx.destination);

    this.lfo = this.ctx.createOscillator();
    this.lfoGain = this.ctx.createGain();
    this.lfo.type = 'sine';
    this.lfo.frequency.setValueAtTime(0.06, now);
    this.lfoGain.gain.setValueAtTime(70, now);
    this.lfo.connect(this.lfoGain);
    this.lfoGain.connect(this.filterNode.frequency);
    this.lfo.start(now);
    this.isPlaying = true;
  },

  stop() {
    if (!this.isPlaying) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(0, now + 1.5);
    const oscs = this.oscillators;
    const currentLfo = this.lfo;
    setTimeout(() => {
      oscs.forEach(osc => {
        try { osc.stop(); } catch(e) {}
      });
      if (currentLfo) {
        try { currentLfo.stop(); } catch(e) {}
      }
      this.isPlaying = false;
    }, 1600);
  }
};
