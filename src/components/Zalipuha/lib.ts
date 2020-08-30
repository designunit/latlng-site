import { geoOrthographic, geoGraticule10, GeoProjection } from 'd3-geo'
import { useRef, useState, Dispatch, SetStateAction, useEffect } from 'react'
import { useRafLoop } from 'react-use'

export function useGeoshere(): [GeoProjection, GeoJSON.MultiLineString] {
    const projection = useRef(geoOrthographic())
    const wireframe = useRef(geoGraticule10())

    return [projection.current, wireframe.current]
}

type UseSpeedCurveOptions = {
    initialAcceleration: number
    stableAcceleration: number
    dump: number
    startingDump: number
}

type UseSpeedCurveResult = [
    number,
    Dispatch<SetStateAction<number>>,
    number,
    Dispatch<SetStateAction<number>>,
]
export function useSpeedCurve(options: UseSpeedCurveOptions): UseSpeedCurveResult {
    const [velocity, setVelocity] = useState(0)
    const [acceleration, setAcceleration] = useState(options.initialAcceleration)

    const [stop, start, isActive] = useRafLoop(time => {
        setVelocity(velocity + acceleration)
        setAcceleration(a => {
            // Stable velocity in no interaction state
            const A = options.stableAcceleration
            // 0.05

            // Default velocity dump
            let m = options.dump
            // 0.99

            // Reverse negative velocity if it almost 0
            if (a < 0 && a > -0.001) {
                m = -1
            }

            // Speed up velocity if it less than D
            if (a > 0 && a < A) {
                m = options.startingDump
                // 1.025
            }

            return a * m
        })
    })

    return [velocity, setVelocity, acceleration, setAcceleration]
}

export function useMouseMove(target: HTMLElement, callback: (event: MouseEvent) => void) {
    useEffect(() => {
        if (!target) {
            return
        }

        const down = () => {
            console.log('down')
            target.addEventListener('mousemove', callback)
        }

        const up = () => {
            console.log('up')
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
