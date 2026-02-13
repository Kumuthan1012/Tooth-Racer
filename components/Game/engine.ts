
import { GameState, Entity, EntityType } from './types';

export class GameEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private updateUICallback: (data: any) => void;
  
  private state: GameState;
  private entities: Entity[] = [];
  private particles: any[] = [];
  private animationId: number | null = null;
  private lastTime: number = 0;
  private spawnTimer: number = 0;
  private speedTimer: number = 0;
  private audioEnabled: boolean = true;
  private audioContext: AudioContext | null = null;

  // Audio Nodes
  private engineOsc: OscillatorNode | null = null;
  private engineGain: GainNode | null = null;
  private musicInterval: number | null = null;

  constructor(canvas: HTMLCanvasElement, updateUICallback: (data: any) => void) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error("Could not get context");
    this.ctx = ctx;
    this.updateUICallback = updateUICallback;
    
    this.state = this.getInitialState();
    this.handleInput();
  }

  private getInitialState(): GameState {
    const highScore = parseInt(localStorage.getItem('toothRacerHighScore') || '0');
    return {
      score: 0,
      health: 3,
      speed: 5,
      laneCount: 4,
      currentLane: 1,
      targetLane: 1,
      isGameOver: false,
      powerUps: {
        shield: 0,
        doubleScore: 0,
        slowMo: 0
      },
      highScore
    };
  }

  public reset() {
    this.stopContinuousSounds();
    this.state = this.getInitialState();
    this.entities = [];
    this.particles = [];
    this.spawnTimer = 0;
    this.speedTimer = 0;
    this.lastTime = performance.now();
  }

  public start() {
    if (this.animationId) cancelAnimationFrame(this.animationId);
    this.animationId = requestAnimationFrame(this.loop.bind(this));
    this.initAudio();
    this.startContinuousSounds();
  }

  public toggleAudio(enabled: boolean) {
    this.audioEnabled = enabled;
    if (enabled) {
      this.initAudio();
      this.startContinuousSounds();
    } else {
      this.stopContinuousSounds();
    }
  }

  private initAudio() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  private startContinuousSounds() {
    if (!this.audioEnabled || !this.audioContext) return;
    this.stopContinuousSounds();

    // Engine Sound
    this.engineOsc = this.audioContext.createOscillator();
    this.engineGain = this.audioContext.createGain();
    this.engineOsc.type = 'triangle';
    this.engineOsc.frequency.setValueAtTime(60, this.audioContext.currentTime);
    this.engineGain.gain.setValueAtTime(0.05, this.audioContext.currentTime);
    this.engineOsc.connect(this.engineGain);
    this.engineGain.connect(this.audioContext.destination);
    this.engineOsc.start();

    // Background Arcade Music (Simple procedural melody)
    const melody = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
    let noteIdx = 0;
    this.musicInterval = window.setInterval(() => {
      if (this.audioEnabled && !this.state.isGameOver) {
        this.playSound(melody[noteIdx], 'sine', 0.2, 0.03);
        noteIdx = (noteIdx + 1) % melody.length;
      }
    }, 250);
  }

  private stopContinuousSounds() {
    if (this.engineOsc) {
      try { this.engineOsc.stop(); } catch(e) {}
      this.engineOsc = null;
    }
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  private playSound(freq: number, type: OscillatorType = 'square', duration: number = 0.1, volume: number = 0.1) {
    if (!this.audioEnabled || !this.audioContext) return;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.audioContext.currentTime);
    osc.connect(gain);
    gain.connect(this.audioContext.destination);
    gain.gain.setValueAtTime(volume, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime + duration);
    osc.start();
    osc.stop(this.audioContext.currentTime + duration);
  }

  private playCrashSound() {
    if (!this.audioEnabled || !this.audioContext) return;
    // White noise like sound for crash
    const bufferSize = this.audioContext.sampleRate * 0.2;
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.audioContext.createBufferSource();
    noise.buffer = buffer;
    const gain = this.audioContext.createGain();
    gain.gain.setValueAtTime(0.2, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime + 0.2);
    noise.connect(gain);
    gain.connect(this.audioContext.destination);
    noise.start();
  }

  private handleInput() {
    window.addEventListener('keydown', (e) => {
      if (this.state.isGameOver) return;
      if (e.key === 'ArrowLeft') this.moveLane(-1);
      if (e.key === 'ArrowRight') this.moveLane(1);
    });

    let touchStartX = 0;
    this.canvas.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    this.canvas.addEventListener('touchend', (e) => {
      if (this.state.isGameOver) return;
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 30) {
        this.moveLane(diff > 0 ? 1 : -1);
      }
    }, { passive: true });
  }

  private moveLane(dir: number) {
    const next = this.state.targetLane + dir;
    if (next >= 0 && next < this.state.laneCount) {
      this.state.targetLane = next;
      this.playSound(400, 'sine', 0.05, 0.05);
    }
  }

  private loop(time: number) {
    const dt = (time - this.lastTime) / 1000;
    this.lastTime = time;

    this.update(dt);
    this.draw();

    if (!this.state.isGameOver) {
      this.animationId = requestAnimationFrame(this.loop.bind(this));
    }
  }

  private update(dt: number) {
    const lerpSpeed = 10;
    this.state.currentLane += (this.state.targetLane - this.state.currentLane) * lerpSpeed * dt;

    this.speedTimer += dt;
    if (this.speedTimer > 20) {
      this.state.speed += 0.5;
      this.speedTimer = 0;
    }

    const currentSpeed = this.state.powerUps.slowMo > 0 ? this.state.speed * 0.5 : this.state.speed;

    // Update Engine Pitch based on speed
    if (this.engineOsc && this.audioContext) {
      this.engineOsc.frequency.setTargetAtTime(60 + (currentSpeed * 5), this.audioContext.currentTime, 0.1);
    }

    const multiplier = this.state.powerUps.doubleScore > 0 ? 2 : 1;
    this.state.score += this.state.speed * dt * 10 * multiplier;

    if (this.state.powerUps.shield > 0) this.state.powerUps.shield -= dt;
    if (this.state.powerUps.doubleScore > 0) this.state.powerUps.doubleScore -= dt;
    if (this.state.powerUps.slowMo > 0) this.state.powerUps.slowMo -= dt;

    this.spawnTimer -= dt;
    if (this.spawnTimer <= 0) {
      this.spawnEntity();
      this.spawnTimer = 1.5 - (this.state.speed * 0.05);
    }

    this.entities.forEach((ent, index) => {
      ent.y += currentSpeed * 100 * dt;
      const playerX = this.getLaneX(this.state.currentLane);
      const playerY = this.canvas.height - 100;
      const dist = Math.hypot(playerX - ent.x, playerY - ent.y);
      
      if (dist < 40) {
        this.handleCollision(ent);
        this.entities.splice(index, 1);
      }
      if (ent.y > this.canvas.height + 100) {
        this.entities.splice(index, 1);
      }
    });

    this.particles.forEach((p, i) => {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.alpha -= dt * 2;
      if (p.alpha <= 0) this.particles.splice(i, 1);
    });

    this.updateUICallback({
      score: this.state.score,
      health: this.state.health,
      speed: currentSpeed,
      highScore: this.state.highScore,
      gameOver: this.state.isGameOver
    });
  }

  private handleCollision(ent: Entity) {
    if (ent.type === EntityType.ENEMY) {
      if (this.state.powerUps.shield <= 0) {
        this.state.health -= 1;
        this.createExplosion(ent.x, ent.y, '#f00');
        this.playCrashSound();
        if (this.state.health <= 0) {
          this.gameOver();
        }
      } else {
        this.createExplosion(ent.x, ent.y, '#fff');
        this.playSound(800, 'square', 0.1, 0.1);
      }
    } else {
      // Powerups collect sound (Arpeggio)
      this.playSound(600, 'sine', 0.1, 0.1);
      setTimeout(() => this.playSound(800, 'sine', 0.1, 0.1), 50);
      setTimeout(() => this.playSound(1000, 'sine', 0.1, 0.1), 100);
      
      this.createExplosion(ent.x, ent.y, '#0ff');
      switch (ent.variant) {
        case 'toothbrush': this.state.powerUps.shield = 5; break;
        case 'toothpaste': this.state.powerUps.doubleScore = 10; break;
        case 'floss': 
          this.entities = this.entities.filter(e => e.type !== EntityType.ENEMY);
          this.createExplosion(this.canvas.width/2, this.canvas.height/2, '#fff', 50);
          this.playSound(1200, 'triangle', 0.5, 0.2);
          break;
        case 'mouthwash': this.state.powerUps.slowMo = 5; break;
      }
    }
  }

  private gameOver() {
    this.state.isGameOver = true;
    this.stopContinuousSounds();
    if (this.state.score > this.state.highScore) {
      this.state.highScore = Math.floor(this.state.score);
      localStorage.setItem('toothRacerHighScore', this.state.highScore.toString());
    }
    // Descending Game Over Sound
    this.playSound(200, 'sawtooth', 0.5, 0.2);
    setTimeout(() => this.playSound(150, 'sawtooth', 0.5, 0.2), 200);
    setTimeout(() => this.playSound(100, 'sawtooth', 1.0, 0.3), 400);
  }

  private spawnEntity() {
    const lane = Math.floor(Math.random() * this.state.laneCount);
    const isEnemy = Math.random() > 0.2;
    const entity: Entity = {
      x: this.getLaneX(lane),
      y: -50,
      type: isEnemy ? EntityType.ENEMY : EntityType.POWERUP,
      variant: ''
    };

    if (isEnemy) {
      const enemies = ['🍔', '🍭', '🥤', '🍦'];
      entity.variant = enemies[Math.floor(Math.random() * enemies.length)];
    } else {
      const powerups = ['toothbrush', 'toothpaste', 'floss', 'mouthwash'];
      entity.variant = powerups[Math.floor(Math.random() * powerups.length)];
    }
    this.entities.push(entity);
  }

  private getLaneX(lane: number) {
    const laneWidth = this.canvas.width / this.state.laneCount;
    return lane * laneWidth + laneWidth / 2;
  }

  private draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawRoad();

    this.entities.forEach(ent => {
      this.ctx.save();
      this.ctx.translate(ent.x, ent.y);
      this.ctx.font = '40px serif';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      
      let label = ent.variant;
      if (ent.type === EntityType.POWERUP) {
        const icons: any = { toothbrush: '🪥', toothpaste: '🧴', floss: '🧵', mouthwash: '🧪' };
        label = icons[ent.variant];
        this.ctx.shadowBlur = 15;
        this.ctx.shadowColor = '#0cf';
      }
      
      this.ctx.fillText(label, 0, 0);
      this.ctx.restore();
    });

    this.particles.forEach(p => {
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
    });
    this.ctx.globalAlpha = 1;

    this.drawPlayer();
  }

  private drawRoad() {
    const laneWidth = this.canvas.width / this.state.laneCount;
    const roadSpeed = (this.state.powerUps.slowMo > 0 ? this.state.speed * 0.5 : this.state.speed) * 10;
    const offset = (performance.now() * roadSpeed) % 100;

    this.ctx.fillStyle = '#334155';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.strokeStyle = '#94a3b8';
    this.ctx.setLineDash([40, 60]);
    this.ctx.lineDashOffset = -offset;
    this.ctx.lineWidth = 4;
    for (let i = 1; i < this.state.laneCount; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(i * laneWidth, 0);
      this.ctx.lineTo(i * laneWidth, this.canvas.height);
      this.ctx.stroke();
    }
    this.ctx.setLineDash([]);
  }

  private drawPlayer() {
    const x = this.getLaneX(this.state.currentLane);
    const y = this.canvas.height - 100;

    this.ctx.save();
    this.ctx.translate(x, y);

    if (this.state.speed > 6) {
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      this.ctx.fillRect(-15, 20, 30, 40);
    }

    if (this.state.powerUps.shield > 0) {
      this.ctx.beginPath();
      this.ctx.arc(0, 0, 45, 0, Math.PI * 2);
      this.ctx.strokeStyle = '#0ff';
      this.ctx.lineWidth = 3;
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = '#0ff';
      this.ctx.stroke();
    }

    this.ctx.font = '50px serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText('🦷', 0, 0);
    
    if (Math.random() > 0.5) {
        this.particles.push({
            x: x + (Math.random() - 0.5) * 20,
            y: y + 30,
            vx: (Math.random() - 0.5) * 50,
            vy: 100 + Math.random() * 100,
            size: 2 + Math.random() * 3,
            color: '#fff',
            alpha: 0.5
        });
    }

    this.ctx.restore();
  }

  private createExplosion(x: number, y: number, color: string, count = 10) {
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 300,
        vy: (Math.random() - 0.5) * 300,
        size: Math.random() * 5 + 2,
        color,
        alpha: 1
      });
    }
  }
}
