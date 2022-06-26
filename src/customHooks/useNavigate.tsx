import React from 'react'
import { useContext } from 'react'
import { LocationContext } from '../provider/Providers'

const useNavigate = () => {
    const { setCurrentLocation, currentLocation } = useContext(LocationContext);

    const navigateToSec = (num: Number): void => { setCurrentLocation(num); };

    return { currentLocation, navigateToSec };
}

export default useNavigate