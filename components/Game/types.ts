
export enum EntityType {
  ENEMY = 'ENEMY',
  POWERUP = 'POWERUP'
}

export interface Entity {
  x: number;
  y: number;
  type: EntityType;
  variant: string;
}

export interface GameState {
  score: number;
  health: number;
  speed: number;
  laneCount: number;
  currentLane: number;
  targetLane: number;
  isGameOver: boolean;
  powerUps: {
    shield: number;
    doubleScore: number;
    slowMo: number;
  };
  highScore: number;
}
