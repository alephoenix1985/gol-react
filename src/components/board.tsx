import {Cell} from "./cell";

interface BoardProps {
    grid: number[][];
    onCellClick: (row: number, col: number) => void;
}

/**
 * Renders the game board grid.
 */
export const Board = ({ grid, onCellClick }: BoardProps) => {
    return (
        <div className="flex flex-col items-center p-2 bg-gray-900 rounded-lg shadow-lg">
            <div suppressHydrationWarning
                className="grid"
                style={{
                    gridTemplateColumns: `repeat(${process.env.NUM_COLS}, 1rem)`,
                }}

            >
                {grid.map((rows, i) =>
                    rows.map((col, j) => (
                        <Cell
                            key={`${i}-${j}`}
                            isAlive={!!grid[i][j]}
                            onClick={() => onCellClick(i, j)}
                        />
                    ))
                )}
            </div>
        </div>
    );
};