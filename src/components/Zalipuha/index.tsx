import { geoOrthographic, geoPath, geoGraticule10, GeoPermissibleObjects } from 'd3-geo'
import { useRef, useEffect, useState, memo } from 'react'
import { useRafLoop, createBreakpoint } from 'react-use'

interface ZalipuhaProps {
    mouse: number
    rotation: number
    setRotation: (rotation: number) => void
}

const breakpoint = createBreakpoint({ mobile: 0, desktop: 1025 })

const Zalipuha: React.FC<ZalipuhaProps> = memo(({ mouse, rotation, setRotation }) => {
    const points = [
        [-12.471514065069812, 29.96032823460071],
        [-66.14344941751239, -33.78218055874478],
        [-163.20801211427406, 75.19405530640374],
        [-60.1468537118777, 31.68887138113911],
        [98.919861719307818, 14.327280220478983],
        [19.505171745122794, 68.34049434153212],
        [112.2117919210032, -28.50740286402985],
        [-180.72891972601244, 18.236456875202094],
        [-144.70567276094468, 42.757649149605925],
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
    ].sort((a, b) => a[0] - b[0])
    const catPaths = points.map((x, i) => `/static/cats/${i % 8}.jpg`)
    const refCats = useRef(catPaths.map(() => useRef(null))) // ref[]

    const [width, setWidth] = useState(window.innerHeight)
    let height = width
    const isMobile = breakpoint() === 'mobile'

    const refCanvas = useRef(null)
    const ctx = refCanvas.current?.getContext('2d')
    const refPointCanvas = useRef(null)
    const pointCtx = refPointCanvas.current?.getContext('2d')

    useEffect(() => {
        isMobile
            ? setWidth(Math.max(window.innerHeight, window.innerWidth))
            : setWidth(window.innerWidth)
        height = width
    }, [width, isMobile, window.innerWidth])

    const [canvasScaledFlag, setCanvasScaledFlag] = useState(false)
    useEffect(() => {
        if (canvasScaledFlag) {
            ctx?.scale(devicePixelRatio, devicePixelRatio)
            pointCtx?.scale(devicePixelRatio, devicePixelRatio)
        }
        setCanvasScaledFlag(true)
    }, [ctx, pointCtx, width, canvasScaledFlag])

    const projection = geoOrthographic()
    const wirframe = geoGraticule10()

    useEffect(() => {
        projection.fitExtent([[0, 0], [width, height]], wirframe)
    }, [projection, width])

    const colorSecondary = '#BB86FC'
    const colorPrimary = '#03DAC5'

    const [stop, start, isActive] = useRafLoop(time => {
        mouse === null
            ? setRotation(rotation + .05 % 360)
            : setRotation(rotation + mouse)

        projection.rotate([rotation, -33, 15]) // animate + rotate

        const path = geoPath(projection, ctx)

        ctx.clearRect(0, 0, width, height)

        const r = projection.rotate() // front layer rotation

        // project as back layer
        // @ts-ignore
        projection.reflectX(true).rotate([r[0] + 180, -r[1], -r[2]])

        path.pointRadius(3)

        // draw back wireframe
        ctx.beginPath()
        path(wirframe)
        ctx.lineWidth = .5
        ctx.strokeStyle = `${colorSecondary}44`
        ctx.stroke()

        // draw points back
        ctx.beginPath()
        path({ type: "MultiPoint", coordinates: points })
        ctx.fillStyle = `${colorSecondary}44`
        ctx.fill()

        // project as front layer
        // @ts-ignore
        projection.reflectX(false).rotate(r)

        // simple circle
        ctx.beginPath()
        path({ type: 'Sphere' })
        ctx.lineWidth = 1
        ctx.strokeStyle = `${colorSecondary}88`
        ctx.stroke()

        // draw continents mask
        // ctx.save()
        // ctx.beginPath()
        // ctx.rect(0, (time*.2 - height/2) % (Math.max(height*2, 3000)), width, -height*.1)
        // ctx.clip()

        // draw continents
        // ctx.beginPath()
        // path(land)
        // ctx.strokeStyle = `${colorPrimary}`
        // ctx.stroke()
        // ctx.restore()

        // draw points front
        ctx.beginPath()
        path({ type: "MultiPoint", coordinates: points })
        ctx.fillStyle = `${colorSecondary}88`
        ctx.fill()

        // draw front wireframe
        ctx.beginPath()
        path(wirframe)
        ctx.lineWidth = 1
        ctx.strokeStyle = `${colorSecondary}88`
        ctx.stroke()

        // draw offscreen canvas
        points.map((coords, index) => {
            let cursor: number[] = path.centroid({ type: "Point", coordinates: coords })
            cursor[0] -= 1
            cursor[1] -= 101

            ctx.drawImage(refPointCanvas.current, ...cursor, 202, 102)
        })

        // draw avatars
        ctx.save()
        ctx.beginPath()
        points.map((coords, index) => {
            let cursor: number[] = path.centroid({ type: "Point", coordinates: coords })
            cursor = [cursor[0] + 53, cursor[1] - 70]
            ctx.moveTo(...cursor)
            ctx.arc(cursor[0] - 23, cursor[1], 23, 0, Math.PI * 2)
        })
        ctx.clip()

        points.map((coords, index) => {
            let cursor: number[] = path.centroid({ type: "Point", coordinates: coords })
            cursor = [cursor[0] + 5, cursor[1] - 45]
            ctx.drawImage(refCats.current[index].current, ...cursor, 50, -50)
        })
        ctx.restore()
    })

    // draw squares and lines in offscreen canvas
    useEffect(() => {
        if (pointCtx) {
            let cursor = [1, 101]
            pointCtx.lineWidth = 1

            // palochka
            pointCtx.beginPath()
            pointCtx.moveTo(...cursor)
            cursor = [cursor[0], cursor[1] - 40]
            pointCtx.lineTo(...cursor)
            pointCtx.strokeStyle = `${colorPrimary}88`
            pointCtx.stroke()

            // big rect
            pointCtx.fillStyle = `${colorPrimary}44`
            pointCtx.fillRect(...cursor, 200, -60)
            pointCtx.strokeStyle = `${colorPrimary}88`
            pointCtx.strokeRect(...cursor, 200, -60)

            // avatar frame
            cursor = [cursor[0] + 5 + 50, cursor[1] - 5 - 25]
            pointCtx.moveTo(...cursor)
            pointCtx.arc(cursor[0] - 25, cursor[1], 25, 0, Math.PI * 2)
            pointCtx.strokeStyle = `${colorPrimary}88`
            pointCtx.stroke()

            cursor = [cursor[0] - 50, cursor[1] + 25]

            // text rects
            cursor = [cursor[0] + 55, cursor[1] - 50]
            pointCtx.fillRect(...cursor, 40, 10)

            cursor = [cursor[0] + 45, cursor[1] - 0]
            pointCtx.fillRect(...cursor, 90, 10)

            // text second row
            cursor = [cursor[0] - 45, cursor[1] + 13]
            pointCtx.fillRect(...cursor, 35 / 2, 5)
            cursor = [cursor[0] + 35 / 2 + 5, cursor[1]]
            pointCtx.fillRect(...cursor, 35 / 2, 5)

            // text long rows
            cursor = [cursor[0] - 35 / 2 - 5, cursor[1] + 8]
            for (let i = 0; i < 4; i++) {
                pointCtx.fillRect(...cursor, 135, 5)
                cursor = [cursor[0], cursor[1] + 8]
            }
        }
    }, [pointCtx])

    return (
        <div style={{
            position: 'absolute',
            left: '20%',
            top: isMobile ? '0' : '-50%',
            overflow: 'hidden',
            maxWidth: '80%', // 100 - left
        }}>
            {catPaths.map((item, index) => ( // render images to assign refCats
                <img
                    key={index}
                    ref={refCats.current[index]}
                    src={item}
                    style={{ display: 'none' }}
                />
            ))}
            <canvas // offscreen canvas
                ref={refPointCanvas}
                width={202 * devicePixelRatio}
                height={102 * devicePixelRatio}
                style={{
                    width: 202,
                    height: 102,
                    display: 'none',
                }}
            />
            <canvas
                ref={refCanvas}
                width={width * devicePixelRatio}
                height={height * devicePixelRatio}
                style={{
                    width: width,
                    height: height,
                    willChange: 'width, height'
                }}
            />
        </div>
    )
})

export default Zalipuha