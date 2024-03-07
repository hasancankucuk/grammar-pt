import React, { useState } from "react";
import Combobox from "./Combobox";
import languages from "../Models/Languages.json";

const Settings = () => {
    const [isEnabled, setIsEnabled] = useState(new Boolean(localStorage.getItem('isEnabled')|| false));
    const toggleSwitch = (e: any) => {
        e.preventDefault();
        setIsEnabled(!isEnabled);
        var item = isEnabled
        localStorage.setItem('isEnabled', item.toString());
    };

    return (
        <>
            <div className="flex flex-col relative">
                {!isEnabled && (
                    <div
                        className="absolute inset-0 bg-gray-500 opacity-50"
                        style={{ pointerEvents: "none" }}
                    />
                )}
                <div className="w-full h-screen bg-gray-100">
                    <div className="flex items-center justify-between px-4 py-3 mt-5">
                        <span className="text-3xl font-medium text-gray-800">Settings</span>
                        <label htmlFor="feature-switch" className={`relative inline-block w-10 h-6 bg-gray-300 rounded-full transition duration-200 ease-in-out ${isEnabled ? 'bg-green-500' : 'bg-red-500'}`} onClick={toggleSwitch}>
                            <input type="checkbox" id="feature-switch" className="opacity-0 w-0 h-0" checked={!!isEnabled} />
                            <span className={`left-0 absolute inline-block w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200 ${isEnabled ? 'translate-x-[16px]' : 'translate-x-[0px]'}`}></span>
                        </label>
                    </div>
                    <hr className="w-full border border-gray-300 my-3" />
                    <div className="mt-5">
                        <Combobox value={localStorage.getItem('Language') || ''} options={languages} disabled={!isEnabled} />
                    </div>
                    <div className="mt-2">
                        {isEnabled ? (
                            <span className="text-xs font-light text-gray-800">Uses LLM for permissions.</span>
                        ) : (
                            <span className="text-xs font-bold text-gray-800 mb-2">Please enable to use.</span>
                        )}
                    </div>
                    <div className="flex items-center ml-16 mt-5">
                        <img className="w-1/4 mr-2" src="/assets/GrammarPTLogo.png" alt="GrammarPT Logo" />
                        <span className="text-xs font-light text-gray-800">GrammarPT</span>
                    </div>
                    <div className="absolute text-xxs font-thin text-stone-600 bottom-0 left-0">
                        Version 1.0
                    </div>
                </div>
            </div>
        </>
    );
};

export default Settings;
