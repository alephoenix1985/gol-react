import {useState} from "react";
import Image from 'next/image';

interface AdvancedControlsProps {
    isRunning: boolean;
    speed: number;
    setSpeed: (speed: number) => void;
    advanceBySteps: (steps: number) => void;
}

/**
 * Renders the advanced control panel with inputs for the simulation.
 */
export const AdvancedControls = ({
                                     isRunning,
                                     speed,
                                     setSpeed,
                                     advanceBySteps
                                 }: AdvancedControlsProps) => {
    const [steps, setSteps] = useState(10);

    const handleAdvance = () => {
        const numSteps = steps;
        if (!isNaN(numSteps) && numSteps > 0) {
            advanceBySteps(numSteps);
        } else {
            console.error("Please enter a valid positive number of steps.");
        }
    }


    const fieldsetClassName = "flex border rounded-md justify-between p-1 h-18 flex-col items-center"

    return (
        <div
            className="w-full max-w-md p-4 space-y-2 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-4 sm:gap-y-6 sm:items-start text-cyan-100">
            <fieldset className={fieldsetClassName}>
                <label htmlFor="adv-steps" className="text-white w-full whitespace-nowrap mb-1">
                    Advance by:
                </label>
                <div className="flex items-center space-x-2 gap-2 w-full">
                    <input
                        type="number"
                        id="adv-steps"
                        value={steps}
                        onChange={e => setSteps(parseInt(e.target.value, 10))}
                        className="w-full p-1 text-center bg-slate-700 text-white rounded-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        disabled={isRunning}
                    />
                    <button onClick={handleAdvance} disabled={isRunning}
                            className="px-3 py-1 font-semibold text-black bg-cyan-400 hover:bg-cyan-500 rounded-lg transition-colors disabled:bg-gray-600 disabled:opacity-70 disabled:cursor-not-allowed">
                        <Image
                            src="/images/next.svg"
                            alt="Next"
                            width={24}
                            height={24}
                            title="Next"
                        />
                    </button>
                </div>
            </fieldset>

            <fieldset className={fieldsetClassName}>
                <label className={"flex justify-between w-full items-center"}>
                    <span className="text-white">Slow</span>
                    <span className="text-white">Fast</span>
                </label>
                <input
                    type="range"
                    min="50"
                    max="1000"
                    step="50"
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    className="w-full h-10 cursor-pointer appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-black/25 [&::-webkit-slider-runnable-track]:border [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[10px] [&::-webkit-slider-thumb]:w-[10px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-500 disabled:opacity-50 bg-transparent"
                    disabled={isRunning}
                    style={{direction: 'rtl'}}
                />
            </fieldset>
        </div>
    );
};