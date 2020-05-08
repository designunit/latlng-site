import s from './styles.module.css'
import { CSSProperties } from 'react'

interface RatioProps {
    left: string | number
    right: string | number
    style?: CSSProperties

    leftContent?: React.ReactNode
    rightContent?: React.ReactNode
}

export const Ratio: React.FC<RatioProps> = props => {
    return (
        <div className={s.container} style={props.style}>
            <div style={{ flex: props.left }}>
                {props.leftContent}
            </div>
            <div style={{ flex: props.right }}>
                {props.rightContent}
            </div>
        </div>
    )
}