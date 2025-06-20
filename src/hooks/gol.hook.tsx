import {useCallback, useEffect, useRef, useState} from "react";
import {INITIAL_SPEED} from "@/helpers/constant.helper";
import {createEmptyGrid} from "@/helpers/preset.helper";
import {GolService} from '@/services/gol.service';

/**
 * @summary Custom Hook to manage the state and logic of Conway's Game of Life.
 * This hook encapsulates game state and delegates game logic to GolService.
 * It's designed to be independent of the UI components rendering the game.
 *
 * @returns An object containing the game state and functions to manipulate it.
 */
export const useGameOfLife = () => {
    const [grid, setGrid] = useState(() => createEmptyGrid());
    const [isRunning, setIsRunning] = useState(false);
    const [generation, setGeneration] = useState(0);
    const [population, setPopulation] = useState(0);
    const [speed, setSpeed] = useState(INITIAL_SPEED);

    const runningRef = useRef(isRunning);
    runningRef.current = isRunning;

    const gridRef = useRef(grid);
    useEffect(() => {
        gridRef.current = grid;

        const currentPopulation = grid.reduce((acc, row) =>
            acc + row.reduce((rowAcc, cell) => rowAcc + cell, 0), 0
        );
        setPopulation(currentPopulation);
    }, [grid]);

    useEffect(() => {
        let intervalId: NodeJS.Timeout | undefined;

        if (isRunning) {
            const intervalCallback = async () => {
                if (!runningRef.current || !gridRef.current) {
                    return;
                }
                try {
                    const {board: newGrid, hasChanged} = await GolService.move(gridRef.current, 1);

                    if (hasChanged) {
                        setGrid(newGrid);
                        setGeneration(g => g + 1);
                    } else {
                        setIsRunning(false);
                    }
                } catch (error) {
                    console.error("Error in simulation interval:", error);
                    setIsRunning(false);
                }
            };
            intervalId = setInterval(intervalCallback, speed);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isRunning, speed]);

    /**
     * Toggles a single cell's state between alive (1) and dead (0).
     * @param {number} i - The row index of the cell.
     * @param {number} j - The column index of the cell.
     */
    const toggleCell = useCallback((i: number, j: number) => {
        if (isRunning) return;

        const newGrid = grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
                if (rowIndex === i && colIndex === j) {
                    return cell ? 0 : 1;
                }
                return cell;
            })
        );
        setGrid(newGrid);
    }, [grid, isRunning]);


    /**
     * Starts or stops the continuous simulation.
     */
    const togglePlay = useCallback(() => {
        setIsRunning(prevIsRunning => !prevIsRunning);
    }, []);


    /**
     * Advances the simulation by a specified number of steps, if not already running.
     * @param {number} stepsToAdvance - The number of generations to advance.
     */
    const advanceBySteps = useCallback(async (stepsToAdvance: number) => {
        if (isRunning || isNaN(stepsToAdvance) || stepsToAdvance <= 0) return;
        try {
            const {board: newGrid, hasChanged} = await GolService.move(grid, stepsToAdvance);

            if (hasChanged) {
                setGrid(newGrid);
                setGeneration(g => g + stepsToAdvance);
            }
        } catch (error) {
            console.error("Error in advanceBySteps:", error);
        }
    }, [grid, isRunning]);


    /**
     * Resets the grid to an empty state and stops the simulation.
     */
    const resetGrid = useCallback(() => {
        setIsRunning(false);
        setGrid(createEmptyGrid());
        setGeneration(0);
    }, []);

    /**
     * Fills the grid with a random pattern of alive/dead cells, if not running.
     */
    const randomizeGrid = useCallback(async () => {
        if (isRunning) return;
        try {
            const newGrid = await GolService.randomizeGrid();
            setGrid(newGrid);
            setGeneration(0);
        } catch (error) {
            console.error("Error in randomizeGrid:", error);
        }
    }, [isRunning]);

    return {
        grid,
        isRunning,
        generation,
        population,
        speed,
        setSpeed,
        toggleCell,
        togglePlay,
        resetGrid,
        randomizeGrid,
        advanceBySteps,
    };
};