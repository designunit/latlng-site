import { geoOrthographic, geoPath, geoGraticule10 } from 'd3-geo'
import { useRef, useEffect, useState } from 'react'
import { useRafLoop } from 'react-use'

interface ZalipuhaProps {
    mouse: number
    rotation: number
    setRotation: (rotation: number) => void
}

export const Zalipuha: React.FC<ZalipuhaProps> = ({ mouse, rotation, setRotation, ...props }) => {
    const refCanvas = useRef(null)

    const points = [
        [-12.471514065069812, 29.96032823460071],
        [-66.14344941751239, -33.78218055874478],
        [-163.20801211427406, 75.19405530640374],
        [-60.1468537118777, 31.68887138113911],
        [98.919861719307818, 14.327280220478983],
        [19.505171745122794, 68.34049434153212],
        [112.2117919210032, -28.50740286402985],
        [-180.72891972601244, 18.236456875202094],
        [-144.70567276094468, 58.757649149605925],
        [16.677754391339704, 23.15973160196448],
        [113.39126029072082, 23.943962457354814],
        [34.53401051124965, -35.26060695811529],
        [-54.89336410836961, 7.03808627812122],
        [167.93694930066998, -7.75296599062257],
        [50.24396406944393, 30.558119182431568],
        [-136.37355654473666, -18.713657944900017],
        [88.72475330521985, 10.451665787038394],
        [72.42099035441424, -29.84503313630067],
        [-92.40387452005182, 20.1722585434017],
        [154.88855888496272, -45.3358210847797],
    ].sort((a,b) => a[0] - b[0])

    const data = points.map((x, i) => `/static/cats/${i % 8}.jpg`)
    const refCats = useRef(data.map(() => useRef(null))) // ref[]

    const [width, setWidth] = useState<number>()
    let height = width

    useEffect(() => {
        setWidth(window.innerWidth)
        height = width
    }, [width])

    const projection = geoOrthographic()
    const wirframe = geoGraticule10()

    projection.fitExtent([[0,0], [width, height]], wirframe)

    const colorSecondary = '#BB86FC'
    const colorPrimary = '#03DAC5'

    const [stop, start, isActive] = useRafLoop(time => {
        mouse === null
            ? setRotation(rotation + .05 % 360)
            : setRotation(rotation + mouse)

        projection.rotate([rotation, -33, 15]) // animate + rotate

        const context = refCanvas.current.getContext('2d') // CanvasRenderingContext2D
        const path = geoPath(projection, context)

        context.clearRect(0, 0, width, height)
        
        const r = projection.rotate() // front layer rotation 

        // project as back layer
        // @ts-ignore
        projection.reflectX(true).rotate([r[0] + 180 , -r[1], -r[2]])

        path.pointRadius(3)

        // draw back wireframe
        context.beginPath()
        path(wirframe)
        context.lineWidth = .5
        context.strokeStyle = `${colorSecondary}44`
        context.stroke()

        // draw points back
        context.beginPath()
        path({type: "MultiPoint", coordinates: points})
        context.fillStyle = `${colorSecondary}44`
        context.fill()

        // project as front layer
        // @ts-ignore
        projection.reflectX(false).rotate(r)
        
        // simple circle
        context.beginPath()
        path({type: 'Sphere'})
        context.lineWidth = 1 
        context.strokeStyle = `${colorSecondary}88`
        context.stroke()

        // draw points front
        context.beginPath()
        path({type: "MultiPoint", coordinates: points})
        context.fillStyle = `${colorSecondary}88`
        context.fill()

        // draw front wireframe
        context.beginPath()
        path(wirframe)
        context.lineWidth = 1 
        context.strokeStyle = `${colorSecondary}88`
        context.stroke()

        points.map((coords, index) => {
            let cursor: number[] = path.centroid({type: "Point", coordinates: coords})
                
            // palochka
            context.beginPath()
            context.moveTo(...cursor)
            cursor = [cursor[0], cursor[1] - 40]
            context.lineTo(...cursor)
            context.strokeStyle = `${colorPrimary}88`
            context.stroke()

            // big rect
            context.fillStyle = `${colorPrimary}44`
            context.fillRect(...cursor, 200, -60)
            context.strokeRect(...cursor, 200, -60)

            // avatar
            cursor = [cursor[0] + 5 + 25, cursor[1] - 5 - 25] // cursor + padding + radius
            context.moveTo(...cursor)
            context.arc(...cursor, 25, 0, Math.PI*2)
            context.strokeStyle = `${colorPrimary}88`
            context.stroke()
            
            context.arc(...cursor, 25, 0, Math.PI*2)
            context.arc(...cursor, 23, 0, Math.PI*2)
            
            context.save()
            context.clip('evenodd')
            cursor = [cursor[0] - 25, cursor[1] + 25] // move to top left of avatar
            context.drawImage(refCats.current[index].current, ...cursor, 50, -50)
            context.restore()

            // text rects
            cursor = [cursor[0] + 55, cursor[1] - 50] // move to top left text
            context.fillRect(...cursor, 40, 10)

            cursor = [cursor[0] + 45, cursor[1] - 0]
            context.fillRect(...cursor, 90, 10)

            // text second row
            cursor = [cursor[0] - 45, cursor[1] + 13]
            context.fillRect(...cursor, 35/2, 5)
            cursor = [cursor[0] + 35/2 + 5, cursor[1]]
            context.fillRect(...cursor, 35/2, 5)

            // text long rows
            cursor = [cursor[0] - 35/2 - 5, cursor[1] + 8]
            for (let i = 0; i < 4; i++) {
                context.fillRect(...cursor, 135, 5)
                cursor = [cursor[0], cursor[1] + 8]                                
            }

            // context.font = '20px Roboto Mono'
            // context.fillText(coords, ...cursor.map(x => x+20))
            // context.fillText(projection(coords as [number, number]), ...cursor.map(x => x+50))
        })
    })
    
    return (
        <>
            {data.map((item, index) => { // render images to assign refCats
                return (
                    <img 
                        key={index}
                        ref={refCats.current[index]} 
                        src={item}
                        style={{ display: 'none' }}
                    />
                )
            })}
            <canvas ref={refCanvas}
                width={width}
                height={height}
            ></canvas>
        </>
    )
}