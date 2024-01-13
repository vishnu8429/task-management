import { useRef, useEffect } from 'react';

const useDebounce = (callback: any, delay: any) => {

    const timeoutRef: any = useRef(null);

    useEffect(() => {
        // Cleanup the previous timeout on re-render
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const debouncedCallback = (...args: any[]) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            callback(...args);
        }, delay);
    };

    return debouncedCallback;
};

export default useDebounce;