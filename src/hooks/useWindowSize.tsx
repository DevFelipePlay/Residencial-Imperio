import { useEffect, useState } from 'react';

export default function useWindowSize() {

    const [windowSize, setWindowSize] = useState(window.innerWidth);

    const isMobile = windowSize <= 768;

    //Pega o tamanho da janela em tempo real
    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(window.innerWidth);
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return { isMobile, windowSize };
}
