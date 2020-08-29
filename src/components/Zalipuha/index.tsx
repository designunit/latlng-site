import dynamic from 'next/dynamic'
import { useEffect, useState, forwardRef, MutableRefObject } from 'react'
import { GeoMarker } from './Geosphere'
import { useRafLoop } from 'react-use'
import { useSpeedCurve } from './lib'

const Geosphere = dynamic(import('./Geosphere').then(m => m.Geosphere), {
    ssr: false,
})

interface ZalipuhaProps {
}

type Ref = HTMLDivElement

export const Zalipuha = forwardRef<Ref, ZalipuhaProps>((props, ref: MutableRefObject<Ref>) => {
    const [rotation, , , setAcceleration] = useSpeedCurve({
        initialAcceleration: 0.25,
        stableAcceleration: 0.05,
        dump: 0.99,
        startingDump: 1.025,
    })
    const points: GeoMarker[] = [
        { location: [-12.471514065069812, 29.96032823460071], imageSrc: '/static/cats/1.jpg' },
        { location: [-66.14344941751239, -33.78218055874478], imageSrc: '/static/cats/2.jpg' },
        { location: [-163.20801211427406, 75.19405530640374], imageSrc: '/static/cats/3.jpg' },
        { location: [-60.1468537118777, 31.68887138113911], imageSrc: '/static/cats/4.jpg' },
        { location: [98.919861719307818, 34.327280220478983], imageSrc: '/static/cats/5.jpg' },
        { location: [19.505171745122794, 68.34049434153212], imageSrc: '/static/cats/6.jpg' },
        { location: [112.2117919210032, -28.50740286402985], imageSrc: '/static/cats/7.jpg' },
        { location: [-180.72891972601244, 18.236456875202094], imageSrc: '/static/cats/8.jpg' },
        { location: [-144.70567276094468, 42.757649149605925], imageSrc: '/static/cats/1.jpg' },
        { location: [16.677754391339704, 23.15973160196448], imageSrc: '/static/cats/2.jpg' },
        { location: [123.39126029072082, 23.943962457354814], imageSrc: '/static/cats/3.jpg' },
        { location: [34.53401051124965, -35.26060695811529], imageSrc: '/static/cats/4.jpg' },
        { location: [-54.89336410836961, 7.03808627812122], imageSrc: '/static/cats/5.jpg' },
        { location: [167.93694930066998, -7.75296599062257], imageSrc: '/static/cats/6.jpg' },
        { location: [50.24396406944393, 30.558119182431568], imageSrc: '/static/cats/7.jpg' },
        { location: [-136.37355654473666, -18.713657944900017], imageSrc: '/static/cats/8.jpg' },
        { location: [88.72475330521985, 10.451665787038394], imageSrc: '/static/cats/1.jpg' },
        { location: [72.42099035441424, -29.84503313630067], imageSrc: '/static/cats/2.jpg' },
        { location: [-92.40387452005182, 20.1722585434017], imageSrc: '/static/cats/3.jpg' },
        { location: [154.88855888496272, -45.3358210847797], imageSrc: '/static/cats/4.jpg' },
    ]

    useEffect(() => {
        const target = ref.current

        const mouseMove = function (event: MouseEvent) {
            const mouseSpeed = 0.1
            const eventDelta = event.movementX * mouseSpeed * devicePixelRatio
            if (event.buttons !== 1) {
                return
            }

            setAcceleration(eventDelta)
        }

        target.addEventListener('mousemove', mouseMove)

        return () => {
            target.removeEventListener('mousemove', mouseMove)
        }
    }, [ref])

    return (
        <Geosphere
            rotation={rotation}
            points={points}
        />
    )
})
