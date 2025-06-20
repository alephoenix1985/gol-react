import {memo} from "react";


interface CellProps {
    isAlive: boolean;
    onClick: () => void;
}

/**
 * A memoized component for a single cell on the grid.
 * Using memo prevents the cell from re-rendering if its props haven't changed.
 * This is a key performance optimization for a large grid.
 */
export const Cell = memo(({isAlive, onClick}: CellProps) => {
    return <div
        onClick={onClick}
        className={`w-4 h-4 border border-gray-700 transition-colors duration-200 ${
            isAlive ? 'bg-red-400' : 'bg-gray-800'
        }`}
    />
});

Cell.displayName = 'Cell';