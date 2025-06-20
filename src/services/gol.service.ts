import {NUM_COLS, NUM_ROWS} from '@/helpers/constant.helper';
import {logger} from './logger.service';
import {beGet, bePost} from "@/services/api.service";

const USE_BACKEND = process.env.USE_BACKEND === 'true';

/**
 * Performs a single step of Conway's Game of Life locally.
 * (Logic from original hook's runSimulation lines 40-68)
 * @param currentGrid The current state of the grid.
 * @returns An object containing the new grid state and a boolean indicating if any cell changed.
 */
export const singleStep = (currentGrid: number[][]): { board: number[][]; hasChanged: boolean } => {
    const newGrid = JSON.parse(JSON.stringify(currentGrid));
    let hasChanged = false;

    for (let i = 0; i < NUM_ROWS; i++) {
        for (let j = 0; j < NUM_COLS; j++) {
            let neighbors = 0;
            /**
             * validate all surrounded cells
             * */
            const positions = [
                [-1, -1], [-1, 0], [-1, 1],
                [0, -1], [0, 1],
                [1, -1], [1, 0], [1, 1]
            ];

            positions.forEach(([x, y]) => {
                const newI = i + x;
                const newJ = j + y;
                if (newI >= 0 && newI < NUM_ROWS && newJ >= 0 && newJ < NUM_COLS) {
                    neighbors += currentGrid[newI][newJ];
                }
            });

            if (currentGrid[i][j] === 1 && (neighbors < 2 || neighbors > 3)) {
                newGrid[i][j] = 0;
                hasChanged = true;
            } else if (currentGrid[i][j] === 0 && neighbors === 3) {
                newGrid[i][j] = 1;
                hasChanged = true;
            }
        }
    }
    return {board: newGrid, hasChanged};
};

export const GolService = {
    /**
     * Generates or fetches a randomized grid.
     * @returns A promise that resolves to the new grid.
     */
    randomizeGrid: async (): Promise<number[][]> => {
        if (USE_BACKEND) {
            return beGet<number[][]>(`/board/random`,{
                params:{
                    nr:NUM_ROWS,
                    nc:NUM_COLS
                }
            });
        } else {
            logger.info("[SERVICE] Generating random grid locally.");
            const rows: number[][] = [];
            for (let i = 0; i < NUM_ROWS; i++) {
                rows.push(Array.from(Array(NUM_COLS), () => (Math.random() > 0.7 ? 1 : 0)));
            }
            return rows;
        }
    },

    /**
     * Advances the game state by a specified number of steps.
     * @param board The current grid state.
     * @param steps The number of steps to advance (default is 1).
     * @returns A promise resolving to an object with the new board, a flag indicating if changes occurred,
     *          and the number of steps actually advanced.
     */
    move: async (
        board: number[][],
        steps: number = 1
    ): Promise<{ board: number[][]; hasChanged: boolean; }> => {
        if (USE_BACKEND) {
            return bePost<{ board: number[][]; hasChanged: boolean }>(
                `/board/move/${steps}`,
                {board}
            );
        } else {
            logger.info(`[SERVICE] Moving ${steps} step(s) locally.`);
            let currentBoard = JSON.parse(JSON.stringify(board));
            let overallHasChanged = false;

            for (let i = 0; i < steps; i++) {
                const {board: nextBoard, hasChanged: stepHasChanged} = singleStep(currentBoard);
                currentBoard = nextBoard;

                if (stepHasChanged) {
                    overallHasChanged = true;
                }

                if (!stepHasChanged) {
                    break;
                }
            }
            return {board: currentBoard, hasChanged: overallHasChanged};
        }
    },
};