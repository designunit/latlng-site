import { geoOrthographic, geoGraticule10, GeoProjection } from 'd3-geo'
import { useRef } from 'react'

export function useGeoshere(): [GeoProjection, GeoJSON.MultiLineString] {
    const projection = useRef(geoOrthographic())
    const wireframe = useRef(geoGraticule10())

    return [projection.current, wireframe.current]
}
