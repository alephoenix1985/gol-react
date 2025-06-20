"use client"
import {useGameOfLife} from "@/hooks/gol.hook";
import {Controls} from "@/components/controls";
import {AdvancedControls} from "@/components/advanced-controls";
import {Board} from "@/components/board";
import {Drawer} from "@/components/drawer";

export const Home = () => {
    const {
        grid,
        isRunning,
        generation,
        population,
        speed,
        toggleCell,
        togglePlay,
        resetGrid,
        randomizeGrid,
        setSpeed,
        advanceBySteps,
    } = useGameOfLife();

    const title = 'Conway\'s Game of Life'
    const description = 'Click cells to bring them to life, then press Play!'
    return (
        <div
            className="min-h-screen bg-black text-cyan-100 flex flex-col items-center p-4 font-sans relative overflow-x-hidden">
            <header className="text-center mb-6 z-10">
                <h1 className="text-4xl md:text-5xl font-bold text-cyan-400">{title}</h1>
                <p className="text-slate-400 mt-2">{description}</p>
            </header>

            <main
                className="flex flex-col items-center z-10 w-full max-w-max">
                <div className="w-full flex justify-between items-center mb-4 px-2">
                    <Controls
                        isRunning={isRunning}
                        togglePlay={togglePlay}
                        stepForward={advanceBySteps}
                        resetGrid={resetGrid}
                        randomizeGrid={randomizeGrid}
                    />
                    <p className="text-lg text-right">
                        Generation: <span className="font-mono font-bold text-cyan-400">{generation}</span><br/>
                        Population: <span className="font-mono font-bold text-cyan-400">{population}</span>
                    </p>
                </div>

                <Board grid={grid} onCellClick={toggleCell}/>
            </main>

            <Drawer>
                <AdvancedControls
                    isRunning={isRunning}
                    speed={speed}
                    setSpeed={setSpeed}
                    advanceBySteps={advanceBySteps}/>
            </Drawer>
        </div>
    );
}