import { geoOrthographic, geoPath, geoGraticule10 } from 'd3-geo'
import { useRef, useEffect, useState } from 'react'
import { useRafLoop } from 'react-use'

interface ZalipuhaProps {
    mouse: number
}

export const Zalipuha: React.FC<ZalipuhaProps> = ({ mouse }) => {
    const refCanvas = useRef(null)

    const points = [
        [92.73155090832148, 47.16596893825039],
        [19.132628654502923, 35.039348548331574],
        [37.31543475729569, 34.46056229374538],
        [-20.765518244299386, 43.338006534457236],
        [-31.443787532690408, -59.69168193662301],
        [118.22862289917595, 17.99353267630819],
        [-158.9689380119718, -62.27347567250755],
        [92.28875715411232, 44.109642767772044],
        [119.95772833109527, -12.797784283319075],
        [-161.8430884240895, 51.64504746943459],
        [-149.1741307823769, 16.682015994228635],
        [88.00745075566459, 33.88691278199536],
        [59.40336125781505, 25.547842245365388],
        [155.7874150155539, -22.107449819512468],
        [-35.04694841793901, -47.85976618463772],
        [172.15360096273315, 84.1934940963882],
        [-100.52373469077385, 86.45006869090278],
        [128.5351509152004, -10.060852009035841],
        [-111.30435268403878, 37.66299870594008],
        [178.10492208929008, 40.61821469473912]
    ]

    const data = points.map(x => '/static/cat.png')
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
    const font = '14px Roboto Mono'

    const [rotation, setRotation] = useState(0)

    const [stop, start, isActive] = useRafLoop(time => {
        mouse === null
            ? setRotation(rotation + .2 % 360)
            : setRotation(rotation + mouse)

        projection.rotate([rotation, -33, 15]) // animate + rotate 

        const context = refCanvas.current.getContext('2d') // CanvasRenderingContext2D
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
        context.strokeStyle = `${colorSecondary}88`
        context.stroke()

        // draw points back
        context.beginPath()
        path({type: "MultiPoint", coordinates: points})
        context.fillStyle = `${colorSecondary}88`
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

        points.map((coords, index) => {
            let cursor: number[] = path.centroid({type: "Point", coordinates: coords})
                
            // palochka
            context.beginPath()
            context.moveTo(...cursor)
            cursor = [cursor[0], cursor[1] - 40]
            context.lineTo(...cursor)
            context.strokeStyle = colorPrimary
            context.stroke()

            // big rect
            context.fillStyle = `${colorPrimary}88`
            context.fillRect(...cursor, 200, -60)
            context.strokeRect(...cursor, 200, -60)

            // avatar
            cursor = [cursor[0] + 5 + 25, cursor[1] - 5 - 25] // cursor + padding + radius
            context.moveTo(...cursor)
            context.arc(...cursor, 25, 0, Math.PI*2)
            context.strokeStyle = colorPrimary
            context.stroke()
            
            context.save()
            context.clip()
            cursor = [cursor[0] - 25, cursor[1] + 25] // move to top left of avatar
            context.drawImage(refCats.current[index].current, ...cursor, 50, -50)
            context.restore()

            // text rects
            cursor = [cursor[0] + 55, cursor[1] - 50] // move to top left text
            context.fillRect(...cursor, 40, 10)

            cursor = [cursor[0] + 45, cursor[1] - 0]
            context.fillRect(...cursor, 90, 10)

            // text second row
            cursor = [cursor[0] - 45, cursor[1] + 15]
            context.fillRect(...cursor, 35/2, 5)
            cursor = [cursor[0] + 35/2 + 5, cursor[1]]
            context.fillRect(...cursor, 35/2, 5)

            // text long rows
            cursor = [cursor[0] - 35/2 - 5, cursor[1] + 10]
            for (let i = 0; i < 4; i++) {
                context.fillRect(...cursor, 135, 4)
                cursor = [cursor[0], cursor[1] + 7]                                
            }
        })
    })
    
    return (
        <>
        {data.map((item, index) => { // render images to assign refCats
            return (
                <img 
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