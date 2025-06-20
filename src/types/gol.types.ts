export interface GameState {
    /**
     * The current state of the game grid.
     */
    grid: number[][];
    /**
     * Indicates if the simulation is currently running.
     */
    isRunning: boolean;
    generation: number;
    speed: number;
}

export type PatternName = 'glider' | 'pulsar';