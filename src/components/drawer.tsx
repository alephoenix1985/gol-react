import React, {useState} from 'react';

interface DrawerProps {
    children: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({children}) => {


    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
    return <>
        <button
            onClick={toggleDrawer}
            className="mt-8 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-opacity-75 transition-colors duration-150 z-20"
            aria-controls="controls-drawer"
            aria-expanded={isDrawerOpen}
        >
            {isDrawerOpen ? "Hide Advanced Controls" : "Show Advanced Controls"}
        </button>
        <div
            id="controls-drawer"
            className={`
                fixed bottom-0 left-0 right-0
                bg-slate-950 border-t-2 border-cyan-500
                p-6 transform transition-transform duration-300 ease-in-out
                ${isDrawerOpen ? "translate-y-0" : "translate-y-full"}
                z-30 shadow-2xl
                max-h-[75vh] overflow-y-auto
            `}
            role="dialog"
            aria-modal="true"
            aria-labelledby="advanced-controls-drawer-title"
        >
            <div className="container mx-auto flex flex-col items-center relative">
                <button
                    onClick={toggleDrawer}
                    className="absolute top-0 right-0 -mt-2 -mr-2 text-cyan-300 hover:text-cyan-100 p-2 z-40"
                    aria-label="Close advanced controls panel"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2}
                         stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
                    </svg>
                </button>
                <h2 id="advanced-controls-drawer-title" className="text-3xl font-semibold text-cyan-400 mb-6">Advanced
                    Controls</h2>
                {children}
            </div>
        </div>
    </>

};