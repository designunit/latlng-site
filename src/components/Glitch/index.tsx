import s from './styles.module.css'
import highlightedStyles from '../Highlighted/styles.module.css'
import { CSSProperties } from 'react'

interface GlitchProps {
    image: string
    style?: CSSProperties
}

export const Glitch: React.FC<GlitchProps> = props => (
    <div className={`${s.imageGlitch} ${highlightedStyles.highlightedParent}`}
        style={props.style}
    >
        <div className={s.imageDistortion}
            style={{
                backgroundImage: props.image,
                zIndex: 0,
            }}
        />
        <div className={s.imageDistortion} id={s.red}
            style={{
                backgroundImage: props.image,
            }}
        />
        <div className={s.imageDistortion} id={s.cyan}
            style={{
                backgroundImage: props.image,
            }}
        />
        <div className={s.imageDistortion} id={s.transparent}
            style={{
                backgroundImage: props.image,
            }}
        />
        {props.children}
    </div>
)