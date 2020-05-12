import { geoOrthographic, geoPath, geoGraticule10 } from 'd3-geo'
import { useRef, useEffect, useState } from 'react'
import { useRafLoop } from 'react-use'

export const Zalipuha: React.FC = props => {
    const ref = useRef(null)

    const [width, setWidth] = useState<number>()
    let height = width

    useEffect(() => {
        setWidth(window.innerWidth)
        height = width
    }, [width])

    const points = [[20.123, 30.456], [-20.78, 1.56]]

    const projection = geoOrthographic()
    const wirframe = geoGraticule10()

    projection.fitExtent([[0,0], [width, height]], wirframe)

    const colorSecondary = '#BB86FC'
    const font = '14px Roboto Mono'

    const [mouse, setMouse] = useState(null)
    const [rotation, setRotation] = useState(0)
    const mouseSpeed = .1

    const [stop, start, isActive] = useRafLoop(time => {
        mouse === null
            ? setRotation(rotation + .2 % 360)
            : setRotation(rotation + mouse)

        projection.rotate([rotation, -33, 15]) // animate + rotate 

        const context = ref.current.getContext('2d')
        const path = geoPath(projection, context)

        context.clearRect(0, 0, width, height)
        
        const r = projection.rotate() // front layer rotation 

        // project as back layer
        // @ts-ignore
        projection.reflectX(true).rotate([r[0] + 180 , -r[1], -r[2]])

        // draw back wireframe
        context.beginPath()
        path(wirframe)
        context.lineWidth = .5
        context.strokeStyle = colorSecondary
        context.stroke()

        // draw points back
        context.beginPath()
        path({type: "MultiPoint", coordinates: points})
        context.fillStyle = colorSecondary
        context.fill()

        // project as front layer
        // @ts-ignore
        projection.reflectX(false).rotate(r)
        
        // simple circle
        context.beginPath()
        path({type: 'Sphere'})
        context.lineWidth = 1 
        context.strokeStyle = colorSecondary
        context.stroke()

        // draw points front
        context.beginPath()
        path({type: "MultiPoint", coordinates: points})
        context.fillStyle = colorSecondary
        context.fill()

        // draw front wireframe
        context.beginPath()
        path(wirframe)
        context.lineWidth = 1 
        context.strokeStyle = colorSecondary
        context.stroke()

        points.map(coords => {
            const pointBasis = path.centroid({type: "Point", coordinates: coords})
                context.fillStyle = '#fff'
                context.fillRect(...pointBasis, 100, -100)

                context.font = font
                context.fillStyle = '#000'
                context.fillText('Котик', ...pointBasis, 100);
        })
    })      

    return (
        <canvas ref={ref}
            width={width}
            height={height}
            onMouseDown={() => {
                setMouse(0)
            }}
            onMouseMove={event => {
                const eventDelta = event.movementX * mouseSpeed
                event.buttons === 1
                    ? setMouse(Math.abs(eventDelta - mouse) < 1 ? 0 : eventDelta)
                    : setMouse(null)
            }}
            onMouseLeave={() => setMouse(null)}
        ></canvas>
    )
}