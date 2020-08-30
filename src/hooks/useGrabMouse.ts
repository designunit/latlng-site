import { useEffect } from 'react'

export function useGrabMouse(target: HTMLElement, callback: (event: MouseEvent) => void) {
    useEffect(() => {
        if (!target) {
            return
        }

        const down = () => {
            target.addEventListener('mousemove', callback)
        }

        const up = () => {
            target.removeEventListener('mousemove', callback)
        }

        target.addEventListener('mousedown', down)
        target.addEventListener('mouseup', up)
        target.addEventListener('mouseleave', up)

        return () => {
            target.removeEventListener('mousedown', down)
            target.removeEventListener('mouseup', up)
            target.removeEventListener('mouseleave', up)
        }
    }, [target])
}
