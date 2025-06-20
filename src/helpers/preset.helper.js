import {NUM_COLS, NUM_ROWS} from "./constant.helper.js";

/**
 * Creates an empty grid.
 * @returns {number[][]} A 2D array initialized to all 0s (dead cells).
 */
export const createEmptyGrid = () => {
    const rows = [];
    for (let i = 0; i < NUM_ROWS; i++) {
        rows.push(Array.from(Array(NUM_COLS), () => 0));
    }
    return rows;
};