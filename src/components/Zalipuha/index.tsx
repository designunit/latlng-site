import dynamic from 'next/dynamic'
import { useEffect, useState, forwardRef, MutableRefObject } from 'react'

const Geosphere = dynamic(import('./Geosphere').then(m => m.Geosphere), {
    ssr: false,
})

interface ZalipuhaProps {
}

type Ref = HTMLDivElement

export const Zalipuha = forwardRef<Ref, ZalipuhaProps>((props, ref: MutableRefObject<Ref>) => {
    const [rotation, setRotation] = useState(0)
    const [mouse, setMouse] = useState(null)
    const mouseSpeed = .1

    useEffect(() => {
        console.log('my target is ', ref.current)
        const target = ref.current

        const mouseDown = () => {
            setMouse(0)
        }

        const mouseUp = () => {
            setMouse(null)
        }

        const mouseMove = function (event: MouseEvent) {
            const eventDelta = event.movementX * mouseSpeed * devicePixelRatio
            if (event.buttons === 1) {
                setMouse(eventDelta)
            } else {
                setMouse(null)
            }
        }

        target.addEventListener('mousedown', mouseDown)
        target.addEventListener('mouseup', mouseUp)
        target.addEventListener('mouseleave', mouseUp)
        target.addEventListener('mousemove', mouseMove)

        return () => {
            target.removeEventListener('mousedown', mouseDown)
            target.removeEventListener('mouseup', mouseUp)
            target.removeEventListener('mouseleave', mouseUp)
            target.removeEventListener('mousemove', mouseMove)
        }
    }, [ref])

    return (
        <Geosphere
            mouse={mouse}
            rotation={rotation}
            setRotation={setRotation}
        />
    )
})
