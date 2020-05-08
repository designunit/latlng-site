import s from './styles.module.css'
import { CSSProperties } from 'react'

interface RatioProps {
    left: string | number
    right: string | number
    style?: CSSProperties
    spacer?: string | number

    leftContent?: React.ReactNode
    rightContent?: React.ReactNode
}

export const Ratio: React.FC<RatioProps> = ({ spacer = undefined, ...props }) => {
    return (
        <div className={s.container} style={props.style}>
            <div style={{ flex: props.left }}>
                {props.leftContent}
            </div>

            {!spacer ? null : <div style={{ flex: spacer }} />}

            <div style={{ flex: props.right }}>
                {props.rightContent}
            </div>
        </div>
    )
}