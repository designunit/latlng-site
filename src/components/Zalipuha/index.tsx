// import s from './styles.module.css'
import { geoOrthographic, geoPath, geoGraticule10, geoIdentity } from 'd3-geo'
import { useRef } from 'react'
import { useRafLoop } from 'react-use'

export const Zalipuha: React.FC = props => {
    const ref = useRef(null)
    const refOverlay = useRef(null)
    const width = 1000
    const height = 1000

    let projection = geoOrthographic()

    const points = [[20.123, 30.456], [-20.78, 1.56]]

    const wirframe = geoGraticule10()
    projection.fitExtent([[0,0], [width, height]], wirframe)

    const colorSecondary = '#BB86FC'

    const [stop, start, isActive] = useRafLoop(time => {
        const speed = time / 360 * 2 // 1 angle/sec * speed
        projection.rotate([speed, -30, 15]) // animate 

        const context = ref.current.getContext('2d')
        const path = geoPath(projection, context)

        context.clearRect(0, 0, width, height)
        
        const r = projection.rotate() // normal layer rotation 

        // project as back layer

        // WRONG PROJECTION ! ! !
        projection.rotate([-r[0] + 180, -r[1], r[2]]) 
        // I CANT projection.reflectX(true).rotate([r[0] + 180, -r[1], -r[2]])

        // draw back wireframe
        context.beginPath()
        path(wirframe)
        context.lineWidth = 0.5
        context.strokeStyle = colorSecondary
        context.stroke()

        // draw points back
        context.beginPath()
        path({type: "MultiPoint", coordinates: points})
        context.fillStyle = colorSecondary
        context.fill()

        // project as front layer
        projection.rotate(r)
        
        // simple circle
        context.beginPath()
        path({type: 'Sphere'})
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
        context.lineWidth = 0.5
        context.strokeStyle = colorSecondary
        context.stroke()

        const contextOverlay = refOverlay.current.getContext('2d')

        contextOverlay.clearRect(0, 0, width, height);

        points.map(coords => {
            const pointPx = path.centroid({type: "Point", coordinates: coords})
            contextOverlay.fillStyle = '#fff'
            contextOverlay.fillRect(...pointPx, 100, -100)
        })
    })      

    return (
        <>
        <canvas ref={ref}
            width={width}
            height={height}
        />
        <canvas ref={refOverlay}
            width={width}
            height={height}
            style={{
                position: 'absolute',
                right: 0,
            }}
        />
        </>
    )
}