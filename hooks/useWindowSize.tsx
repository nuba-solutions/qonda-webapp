import { useState, useEffect } from 'react'

type TWindowSize = {
    width: number | undefined
    height: number | undefined
}

export function useWindowSize() {
    const [windowSize, setWindowSize] = useState<TWindowSize>({
        width: undefined,
        height: undefined,
    })

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }

        window.addEventListener('resize', handleResize)
        handleResize()

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return windowSize
}
