import { useStore } from 'effector-react'
import numeral from 'numeral'
import { store } from '@/store'

interface ZalipuhaStatProps {
    formatPattern: string
}

export const ZalipuhaStat: React.FC<ZalipuhaStatProps> = props => {
    const s = useStore(store)

    const angle = numeral(Math.abs(s.angle % 360)).format(props.formatPattern)
    const speed = numeral(Math.abs(s.speed)).format(props.formatPattern)
    const mx = numeral(Math.abs(s.cursorX)).format(props.formatPattern)
    const my = numeral(Math.abs(s.cursorY)).format(props.formatPattern)

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
