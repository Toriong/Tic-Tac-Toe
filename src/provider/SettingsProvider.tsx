import React, { useState, createContext } from 'react'

import { FC } from 'react';


export const SettingContext = createContext({});

interface ProviderProps{
    [key: string]: any
}

export const SettingProvider:FC<ProviderProps> = props => {
    const [isSelectedWeatherModalOn, setIsSelectedWeatherModalOn] = useState(false);
    const [isSearchAndUnitTypesModalOn, setIsSearchAndUnitTypesModalOn] = useState(false);
    const [isUnitsSelectionModalOn, setIsUnitsSelectionModalOn] = useState(false);
    const [isSearchTypesModalOn, setIsSearchTypesModalOn] = useState(false);

    return (
        <SettingContext.Provider
            value={{
                _isSelectedWeatherModalOn: [isSelectedWeatherModalOn, setIsSelectedWeatherModalOn],
                _isSearchAndUnitTypesModalOn: [isSearchAndUnitTypesModalOn, setIsSearchAndUnitTypesModalOn],
                _isUnitsSelectionModalOn: [isUnitsSelectionModalOn, setIsUnitsSelectionModalOn],
                _isSearchTypesModalOn: [isSearchTypesModalOn, setIsSearchTypesModalOn]
            }}
        >
            {props.children}
        </SettingContext.Provider>
    )
}