import { geoPath } from 'd3-geo'
import { useRef, useEffect, useState, memo, useMemo } from 'react'
import { createBreakpoint } from 'react-use'
import { useGeoshere } from './lib'

export type GeoMarker = {
    location: [number, number],
    imageSrc: string,
}

export type GeosphereProps = {
    mouse: number
    rotation: number
    setRotation: (rotation: number) => void
    points: GeoMarker[]
}

const breakpoint = createBreakpoint({ mobile: 0, desktop: 1025 })

export const Geosphere: React.FC<GeosphereProps> = memo(({ mouse, rotation, setRotation, ...props }) => {
    const catPaths = props.points.map((x, i) => `/static/cats/${i % 8}.jpg`)
    const refCats = useRef(catPaths.map(() => useRef(null))) // ref[]

    const [projection, wireframe] = useGeoshere()

    const points = useMemo(
        () => props.points.map(x => x.location),
        [props.points],
    )

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

    useEffect(() => {
        projection.fitExtent([[0, 0], [width, height]], wireframe)
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
        path(wireframe)
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
        ctx.lineWidth = 2
        ctx.strokeStyle = `${colorSecondary}95`
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
        path(wireframe)
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
