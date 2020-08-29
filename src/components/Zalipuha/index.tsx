import dynamic from 'next/dynamic'
import { forwardRef, MutableRefObject } from 'react'
import { GeoMarker } from './Geosphere'
import { useSpeedCurve, useMouseMove } from './lib'

const Geosphere = dynamic(import('./Geosphere').then(m => m.Geosphere), {
    ssr: false,
})

interface ZalipuhaProps {
    points: GeoMarker[]
}

type Ref = HTMLDivElement

export const Zalipuha = forwardRef<Ref, ZalipuhaProps>((props, ref: MutableRefObject<Ref>) => {
    const [rotation, , , setAcceleration] = useSpeedCurve({
        initialAcceleration: 0.25,
        stableAcceleration: 0.05,
        dump: 0.99,
        startingDump: 1.025,
    })

    useMouseMove(ref.current, event => {
        const mouseSpeed = 0.1
        const eventDelta = event.movementX * mouseSpeed * devicePixelRatio
        if (event.buttons !== 1) {
            return
        }

        setAcceleration(eventDelta)
    })

    return (
        <Geosphere
            rotation={rotation}
            points={props.points}
        />
    )
})
