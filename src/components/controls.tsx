// src/components/controls.tsx
import React from 'react';
import Image from 'next/image';

interface ControlsProps {
    isRunning: boolean;
    togglePlay: () => void;
    stepForward: (steps:number) => void;
    resetGrid: () => void;
    randomizeGrid: () => void;
}

interface ActionButtonConfig {
    id: string;
    getIconName: () => string;
    getAltText: () => string;
    getTitleText: () => string;
    action: () => void;
    isDisabled: () => boolean;
}

export const Controls = ({
                             isRunning,
                             togglePlay,
                             stepForward,
                             resetGrid,
                             randomizeGrid,
                         }: ControlsProps) => {
    const iconBasePath = "/images/";

    const actionButtonConfigs: ActionButtonConfig[] = [
        {
            id: 'play-pause',
            getIconName: () => (isRunning ? 'pause.svg' : 'play.svg'),
            getAltText: () => (isRunning ? 'Pause Simulation' : 'Play Simulation'),
            getTitleText: () => (isRunning ? 'Pause' : 'Play'),
            action: togglePlay,
            isDisabled: () => false,
        },
        {
            id: 'next-step',
            getIconName: () => 'next.svg',
            getAltText: () => 'Advance to Next Step',
            getTitleText: () => 'Next Step',
            action: ()=>stepForward(1),
            isDisabled: () => isRunning,
        },
        {
            id: 'reset',
            getIconName: () => 'reset.svg',
            getAltText: () => 'Reset Grid to Empty State',
            getTitleText: () => 'Reset',
            action: resetGrid,
            isDisabled: () => false,
        },
        {
            id: 'randomize',
            getIconName: () => 'random.svg',
            getAltText: () => 'Randomize Grid Pattern',
            getTitleText: () => 'Randomize',
            action: randomizeGrid,
            isDisabled: () => isRunning,
        },
    ];

    const baseButtonClass = "p-3 font-bold text-white bg-cyan-500 hover:bg-cyan-600 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-300 disabled:bg-gray-600 disabled:opacity-70 disabled:cursor-not-allowed";

    return (
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
            {actionButtonConfigs.map(config => (
                <button
                    key={config.id}
                    onClick={config.action}
                    className={baseButtonClass}
                    disabled={config.isDisabled()}
                    aria-label={config.getTitleText()}
                    title={config.getTitleText()}
                >
                    <Image
                        src={`${iconBasePath}${config.getIconName()}`}
                        alt={config.getAltText()}
                        width={24}
                        height={24}
                        title="Next"
                    />
                </button>
            ))}
        </div>
    );
};