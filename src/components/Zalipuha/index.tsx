// import s from './styles.module.css'
import { geoOrthographic, geoPath, geoGraticule as geoGraticule10 } from 'd3-geo'
import { useRef } from 'react'
import { useRafLoop } from 'react-use'

export const Zalipuha: React.FC = props => {
    const ref = useRef(null)
    const width = 1000
    const height = 1000

    const projection = geoOrthographic()

    const points = [[20.123, 30.456]]
    const wirframe = geoGraticule10()

    const [stop, start, isActive] = useRafLoop(time => {
        const speed = time / 360 * 2 // 1 angle/sec * 2
        projection.rotate([speed, -30, 15]); // animate 
        
        const r = projection.rotate(); // front layer rotation 

        const context = ref.current.getContext('2d')
        const path = geoPath(projection, context)

        context.clearRect(0, 0, width, height);
        
        // projection.rotate([r[0] + 180, -r[1], -r[2]]); // back layer rotation

        // // draw back layer
        // context.beginPath();
        // path(wirframe());
        // context.lineWidth = 0.5;
        // context.strokeStyle = '#fff'
        // context.stroke()
        
        // // draw points back
        // context.beginPath();
        // path({type: "MultiPoint", coordinates: points});
        // context.fillStyle = '#fff'
        // context.fill();

        // FRONT
        
        // simple circle
        context.beginPath()
        path({type: 'Sphere'})
        context.strokeStyle = "#fff"
        context.stroke()

        // draw points front
        context.beginPath();
        path({type: "MultiPoint", coordinates: points});
        context.fillStyle = "#fff";
        context.fill();

        // draw front layer
        context.beginPath()
        path(wirframe())
        context.lineWidth = 0.5
        context.strokeStyle = "#fff"
        context.stroke()
    })      

    return (
        <canvas ref={ref}
            width={width}
            height={height}
        />
    )
}