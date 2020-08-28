import s from './styles.module.css'
import { CSSProperties, createElement } from 'react'

type Tag = keyof JSX.IntrinsicElements

interface Highlightedrops {
    as?: Tag
    style?: CSSProperties
    color: string
}

export const Highlighted: React.FC<Highlightedrops> = props => {
    const tag = props.as ?? 'span'
    return createElement(tag, {
        className: s.highlight,
        style: {
            backgroundColor: props.color,
            ...props.style,
        },
    }, props.children)
    // return (
    //     <span className={s.highlight} style={props.style}>
    //         {props.children}
    //     </span>
    // )
}
