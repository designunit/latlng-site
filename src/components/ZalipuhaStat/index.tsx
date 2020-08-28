import numeral from 'numeral'

interface ZalipuhaStatProps {
    rotation: number
    mouseSpeed: number
    mouseX: number
    mouseY: number
    formatPattern: string
}

export const ZalipuhaStat: React.FC<ZalipuhaStatProps> = props => {
    const angle = numeral(Math.abs(props.rotation % 360)).format(props.formatPattern)
    const speed = numeral(Math.abs(props.mouseSpeed)).format(props.formatPattern)
    const mx = numeral(Math.abs(props.mouseX)).format(props.formatPattern)
    const my = numeral(Math.abs(props.mouseY)).format(props.formatPattern)

    return (
        <div style={{
            textAlign: 'end',
        }}>
            <span style={{
                userSelect: 'text',
                WebkitUserSelect: 'text',
            }}>
                angle::{angle} <br />
                speed::{speed} <br />
                cursor_x::{mx} <br />
                cursor_y::{my} <br />
            </span>
        </div>
    )
}
