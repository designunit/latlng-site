import { useMedia } from "react-use"

interface ZalipuhaStatusProps {
    mouse: number
    rotation: number
    mousePos: any
}

const ZalipuhaStatus: React.FC<ZalipuhaStatusProps> = ({ mouse, rotation, mousePos }) => {
    const isMobile = useMedia('(max-width: 768px)', false)

    return (
        isMobile ? null : (
            <div style={{
                flex: '1 0 50%',
                textAlign: 'end', 
                alignSelf: 'flex-end',
                userSelect: 'text',
            }}>
                angle: {(Math.abs(rotation % 360)).toFixed(4)} <br/>
                speed: {(mouse ?? .05).toFixed(4)} <br/>
                cursor X: {`${!mousePos ? 'not detected' : mousePos[0].toFixed(4)}`} <br/>
                cursor Y: {`${!mousePos ? 'not detected' : mousePos[1].toFixed(4)}`} <br/>
            </div>
        )
    )
}

export default ZalipuhaStatus