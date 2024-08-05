'use client'
import { useState, useEffect } from 'react';

const useOnline = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    const checkOnlineStatus = async () => {
        try {
            // Use a request that will fail when offline
            const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
                method: 'HEAD',
                cache: 'no-cache',
            });
            setIsOnline(response.ok);
        } catch (error) {
            setIsOnline(false);
        }
    };

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const updateOnlineStatus = () => {
            setIsOnline(navigator.onLine);
            if (navigator.onLine) {
                checkOnlineStatus();
            }
        };

        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);

        // Initial check
        checkOnlineStatus();

        // Cleanup listeners on unmount
        return () => {
            window.removeEventListener('online', updateOnlineStatus);
            window.removeEventListener('offline', updateOnlineStatus);
        };
    }, []);

    return isOnline;
};

export default useOnline;