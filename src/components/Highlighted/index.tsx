import s from './styles.module.css'
import { CSSProperties } from 'react'

interface Highlightedrops {
    style?: CSSProperties
}

export const Highlighted: React.FC<Highlightedrops> = props => {
    return (
        <span className={s.highlight} style={props.style}>
            {props.children}
        </span>
    )
}