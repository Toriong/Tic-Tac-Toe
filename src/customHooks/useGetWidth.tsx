import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

const useGetWidth = () => {
    const [widthPixels, setWidthPixels] = useState(0);

    const handleViewPortResize = () => {
        const innerWidth = window.innerWidth;
        setWidthPixels(innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleViewPortResize);
        const innerWidth = window.innerWidth;
        setWidthPixels(innerWidth);

        return () => {
            window.removeEventListener('resize', handleViewPortResize);
        }
    }, []);

    return { widthPixels };
}

export default useGetWidth