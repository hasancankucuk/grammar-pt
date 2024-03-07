import React, { useEffect, useState } from "react";
import { setLanguage } from "../ContentScript/contentScript";

interface Props {
    value: string;
    disabled: boolean;
    options: any[];
}

const Combobox = (props: Props) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value)
        localStorage.setItem('Language', e.target.value);
    };

    return (
        <div className="flex flex-col w-11/12">
            <label htmlFor="combo-box" className="text-left pl-4 text-base font-medium text-gray-800">Language:</label>
            <select
                disabled={props.disabled}
                onChange={handleChange}
                id="combo-box"
                defaultValue={props.value}
                className={`ml-2 mt-4 block w-full px-4 py-2 rounded-lg border ${props.disabled ? 'border-gray-300 bg-gray-200 text-gray-500' : 'border-gray-200 bg-gray-50 text-gray-800'} appearance-none focus:outline-none focus:border-blue-500`}
            >
                {props.options.map((item: any, index: number) => (
                    <option key={item.code} className="text-gray-800">{item.name}</option>
                ))}
            </select>
            <div className="absolute inset-y-0 right-2 flex items-center px-2 pointer-events-none pt-2">
                <svg className={`w-5 h-5 ${props.disabled ? 'text-gray-300' : 'text-gray-400'}`} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 12.5858L14.2929 8.29289C14.6834 7.90237 15.3166 7.90237 15.7071 8.29289C16.0976 8.68342 16.0976 9.31658 15.7071 9.70711L10.7071 14.7071C10.3166 15.0976 9.68342 15.0976 9.29289 14.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L10 12.5858Z" fill="currentColor" />
                </svg>
            </div>
        </div>
    );
}

export default Combobox;